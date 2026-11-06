// 独立持有一次审计的 Chrome 进程组和临时目录；调用方退出（包括 SIGKILL）后由 IPC 断连触发回收。
// 只删除本进程亲自创建的目录，不扫描其他任务。整机断电/本所有者遭 SIGKILL 无法即时回收。
import { spawn, execFileSync } from "node:child_process"
import { mkdtempSync, existsSync } from "node:fs"
import { rm, cp } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, basename, dirname, resolve } from "node:path"
import { setTimeout as sleep } from "node:timers/promises"

if (!process.connected) throw new Error("browser-owner 只能经 IPC 启动")
let dir, chrome, closed, closing, signalError, preparing
function groupAlive() {
  if (!chrome?.pid) return false
  const rows = execFileSync("ps", ["-axo", "pgid=,state="], { encoding: "utf8" }).trim().split("\n")
  return rows.some((row) => { const [group, state] = row.trim().split(/\s+/); return Number(group) === chrome.pid && !state.startsWith("Z") })
}
function signalGroup(signal) {
  if (!chrome?.pid) return
  try { process.kill(-chrome.pid, signal) }
  catch (error) {
    if (error.code === "ESRCH") return
    // macOS 沙盒辅助进程可能拒绝组信号。不能绕过；后面必须等 ps 证实退出，否则报告失败并保留目录。
    if (error.code === "EPERM") { signalError = error; return }
    throw error
  }
}
function notify(message) {
  if (process.connected) process.send(message, (error) => { if (error) shutdown(error) })
}
function shutdown(cause) {
  return closing ??= (async () => {
    let failure = cause
    try {
      await preparing?.catch(() => {}) // 等 profile 副本写完再回收，不能边复制边删除。
      signalGroup("SIGTERM")
      if (closed) await Promise.race([closed, sleep(1000)])
      signalGroup("SIGKILL")
      // 等整个组消失再删目录，避免仍在退出的 renderer 把缓存写回来。
      for (let i = 0; i < 50 && groupAlive(); i++) await sleep(100)
      if (groupAlive()) throw new Error(`Chrome 进程组未退出，保留 ${dir}`, { cause: signalError })
      if (closed) await closed
      if (dir) await rm(dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 })
    } catch (error) {
      failure = failure ? new AggregateError([failure, error], "浏览器失败且回收失败") : error
    }
    if (failure) { console.error(failure); notify({ error: failure.message }) }
    process.exit(failure ? 1 : 0)
  })()
}
process.once("disconnect", () => shutdown())
process.once("SIGINT", () => shutdown())
process.once("SIGTERM", () => shutdown())

try {
  dir = mkdtempSync(join(tmpdir(), "ds-audit-"))
  if (process.argv[3]) {
    // 已登录 profile 只读复制；不让 Chrome 写使用方目录，也不复用它的进程锁和缓存。
    const source = resolve(process.argv[3]), target = join(dir, "profile")
    const oneProfile = existsSync(join(source, "Preferences"))
    const filter = (p) => !/^(Singleton.*|LOCK|DevToolsActivePort|RunningChromeVersion|Cache|Code Cache|GPUCache|ShaderCache|GrShaderCache|DawnCache|Crashpad|BrowserMetrics|CacheStorage)$/.test(basename(p))
    preparing = (async () => {
      await cp(source, oneProfile ? join(target, "Default") : target, { recursive: true, dereference: true, filter })
      if (oneProfile && existsSync(join(dirname(source), "Local State"))) await cp(join(dirname(source), "Local State"), join(target, "Local State"))
    })()
    await preparing
    if (closing) await closing
  }
  chrome = spawn(process.argv[2], ["--headless=new", "--mute-audio", "--remote-debugging-port=0", `--user-data-dir=${join(dir, "profile")}`, "about:blank"], {
    detached: true, stdio: "ignore",
  })
  closed = new Promise((resolve) => chrome.once("close", resolve))
  chrome.once("error", (error) => shutdown(error))
  chrome.once("exit", (code, signal) => { if (!closing) shutdown(new Error(`Chrome 意外退出：${code ?? signal}`)) })
  chrome.once("spawn", () => notify({ dir }))
  if (!process.connected) shutdown()
} catch (error) {
  shutdown(error)
}
