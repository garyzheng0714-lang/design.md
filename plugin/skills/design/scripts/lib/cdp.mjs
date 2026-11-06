// 验收脚本共用的无头 Chrome（最早复制自 Su Design 仓库的 scripts/lib/cdp.mjs，现在以这份为准）；独立所有者负责进程与临时目录，调用方必须 await close()。
import { fork } from "node:child_process"
import { readFileSync } from "node:fs"
import { join } from "node:path"

// 本机 Chrome；装在别处时设 CHROME_PATH
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
/** 非字符键要带 Windows 键码，浏览器才会执行默认行为（焦点移动、按钮点击）。
 * 2026-10-06：原来没有 Backspace / Delete，键码落成首字母 "B" / "D"，输入框里删不掉字（input-e2e 清不掉搜索框初值） */
const VK = { ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40, Enter: 13, Tab: 9, Escape: 27, " ": 32, PageUp: 33, PageDown: 34, End: 35, Home: 36, Backspace: 8, Delete: 46, F10: 121 }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
function deadline(promise, ms, message) {
  let timer
  return Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), ms) })]).finally(() => clearTimeout(timer))
}

export async function open({ width = 1470, height = 900, executablePath = CHROME, profile } = {}) {
  // 与调用方分离的进程组：Ctrl+C 不会同时杀死负责回收的所有者。
  const owner = fork(new URL("./browser-owner.mjs", import.meta.url), [executablePath, ...(profile ? [profile] : [])], {
    detached: true, execArgv: [], stdio: ["ignore", "ignore", "inherit", "ipc"],
  })
  let ws, ownerError, closing, id = 0
  const pending = new Map()
  const rejectPending = (error) => { for (const request of pending.values()) request.reject(error); pending.clear() }
  const finished = new Promise((resolve) => owner.once("exit", (code, signal) => {
    rejectPending(ownerError ?? new Error("浏览器所有者已退出"))
    ws?.close()
    resolve({ code, signal })
  }))
  owner.on("message", (message) => { if (message.error) ownerError = new Error(message.error) })
  const close = () => closing ??= (async () => {
    rejectPending(new Error("浏览器已关闭"))
    ws?.close()
    if (owner.connected) owner.disconnect()
    const exit = await deadline(finished, 10000, "浏览器回收超时")
    if (exit.code !== 0) throw ownerError ?? new Error(`浏览器回收失败：${exit.code ?? exit.signal}`)
  })()

  try {
    const { dir } = await deadline(new Promise((resolve, reject) => {
      owner.once("error", reject)
      owner.on("message", (message) => { if (message.error) reject(new Error(message.error)); else if (message.dir) resolve(message) })
      owner.once("exit", () => reject(ownerError ?? new Error("Chrome 未能启动")))
    }), profile ? 30000 : 10000, "浏览器所有者启动超时")
    let target, lastError
    for (let i = 0; i < 50 && !target; i++) {
      if (owner.exitCode !== null || owner.signalCode !== null) throw ownerError ?? new Error("Chrome 在启动期间退出")
      try {
        const port = readFileSync(join(dir, "profile", "DevToolsActivePort"), "utf8").split("\n")[0]
        const response = await fetch(`http://127.0.0.1:${port}/json`, { signal: AbortSignal.timeout(500) })
        target = (await response.json()).find((t) => t.type === "page")
      } catch (error) { lastError = error } // Chrome 写端口文件前的有限重试；最终保留失败原因。
      if (!target) await sleep(200)
    }
    if (!target) throw new Error("Chrome 调试页面未能就绪", { cause: lastError })
    ws = new WebSocket(target.webSocketDebuggerUrl)
    ws.addEventListener("close", () => rejectPending(new Error("Chrome 调试连接已断开")))
    ws.addEventListener("error", () => rejectPending(new Error("Chrome 调试连接失败")))
    await deadline(new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true })
      ws.addEventListener("error", () => reject(new Error("无法连接 Chrome")), { once: true })
      ws.addEventListener("close", () => reject(new Error("Chrome 在连接期间关闭")), { once: true })
    }), 5000, "Chrome 调试连接超时")
    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data)
      const request = pending.get(message.id)
      if (!request) return
      pending.delete(message.id)
      if (message.error) request.reject(new Error(message.error.message))
      else request.resolve(message.result)
    })
    const send = (method, params = {}) => {
      if (closing || ws.readyState !== WebSocket.OPEN) return Promise.reject(new Error("浏览器已关闭"))
      const requestId = ++id
      return deadline(new Promise((resolve, reject) => {
        pending.set(requestId, { resolve, reject })
        ws.send(JSON.stringify({ id: requestId, method, params }))
      }), 30000, `Chrome 命令超时：${method}`).finally(() => pending.delete(requestId))
    }
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false })
    await send("Page.enable")
    return {
      ws, tempDir: dir, ownerPid: owner.pid, send, sleep, close,
      go: async (url, wait = 1500) => { await send("Page.navigate", { url }); await sleep(wait) },
      eval: async (expression) => {
        const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })
        if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text)
        return result.result?.value
      },
      key: async (key, code = key, modifiers = 0) => {
        const vk = VK[key] ?? key.toUpperCase().charCodeAt(0)
        // Enter 需要字符事件才会触发按钮的默认点击；只有 keydown 会让检查动作未真正生效。
        await send("Input.dispatchKeyEvent", { type: "keyDown", key, code, modifiers, windowsVirtualKeyCode: vk, text: key === "Enter" ? "\r" : key.length === 1 && !modifiers ? key : undefined })
        await send("Input.dispatchKeyEvent", { type: "keyUp", key, code, modifiers, windowsVirtualKeyCode: vk })
      },
    }
  } catch (error) {
    try { await close() } catch (cleanupError) { throw new AggregateError([error, cleanupError], "浏览器未能启动或正常关闭") }
    throw error
  }
}
