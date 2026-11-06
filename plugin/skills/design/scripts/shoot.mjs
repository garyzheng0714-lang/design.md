#!/usr/bin/env node
// 验收截图：node shoot.mjs <页面地址> [--out 目录] [--widths 1440,390] [--states 场景.json] [--only 场景名]
// 默认拍首屏（1440×900、390×844）；--states 里每个场景从新打开的页面开始，按步骤用真实指针操作，再按 frames（毫秒）各拍一张：
// [{ "name": "开详情", "width": 1440, "steps": [{ "clickText": "王磊" }], "frames": [90, 700] }]
// 步骤：click（CSS 选择器）· clickText（看得见的文字，取最小的那个元素）· hover · hoverText · key（Escape、Enter、ArrowDown…）· type（往焦点处打字）· wait（毫秒）· scroll（{selector, y}）
// 90ms 那张要看得出正在过渡、700ms 那张是结果（layout.md §6、§7）。输出：<out>/<宽>.png、<out>/<场景名>-<帧>.png；页面报错打印在最后。
// 途中帧（< 400ms）取自录屏（Page.startScreencast：浏览器每画出一帧不同的画面就送一张、带出画时刻），按时刻挑，不靠「睡到点再截」——
// 机器忙时截一张图要一两百毫秒，拍到的已接近停稳（2026-11-07 第二轮盲评实测）。每个场景另报「点后 400ms 画了几帧」，写进 <out>/frames.json：
// ≤ 1 帧 = 一下子换好、没有过渡；≥ 3 帧才算真有过渡。
// 要登录的页面：先在浏览器里登录，把 Cookie 写进地址能带的参数，或在本机开发服务器上关掉登录再拍。
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { open } from "./lib/cdp.mjs"

const args = process.argv.slice(2)
const url = args[0]
if (!url || !/^https?:\/\//.test(url)) { console.error("用法：shoot.mjs <页面地址> [--out 目录] [--widths 1440,390] [--states 场景.json] [--only 场景名]"); process.exit(1) }
const opt = (name, fallback) => { const i = args.indexOf(name); return i > -1 ? args[i + 1] : fallback }
const out = opt("--out", "shots")
const widths = opt("--widths", "1440,390").split(",").map(Number)
const statesFile = opt("--states")
const only = opt("--only")
mkdirSync(out, { recursive: true })

const heightFor = (w) => (w < 500 ? 844 : 900)
const b = await open({ width: widths[0], height: heightFor(widths[0]) })
const errors = []
const cast = { frames: [] }
const painted = {}
b.ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data)
  if (m.method === "Page.screencastFrame") {
    b.send("Page.screencastFrameAck", { sessionId: m.params.sessionId }).catch(() => {})
    cast.frames.push({ t: m.params.metadata.timestamp * 1000, data: m.params.data })
  }
  if (m.method === "Runtime.exceptionThrown") errors.push(m.params.exceptionDetails?.exception?.description ?? m.params.exceptionDetails?.text)
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") errors.push(m.params.args.map((a) => a.value ?? a.description).join(" "))
})
await b.send("Runtime.enable")

async function size(w) {
  await b.send("Emulation.setDeviceMetricsOverride", { width: w, height: heightFor(w), deviceScaleFactor: w < 500 ? 2 : 1, mobile: w < 500 })
}
async function shot(file) {
  const { data } = await b.send("Page.captureScreenshot", { format: "png" })
  writeFileSync(join(out, file), Buffer.from(data, "base64"))
  console.log("  拍好", join(out, file))
}
async function load() {
  await b.go(url, 300)
  // 等字体和懒加载的页面
  for (let i = 0; i < 40; i++) {
    const ready = await b.eval(`document.fonts.status === "loaded" && document.body.innerText.trim().length > 0`)
    if (ready) break
    await b.sleep(100)
  }
  await b.sleep(900)
}
const FIND = `(sel, text) => {
  const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.opacity !== "0" && r.bottom > 0 && r.top < innerHeight }
  let list = sel ? [...document.querySelectorAll(sel)] : [...document.querySelectorAll("body *")].filter((el) => (el.innerText || el.getAttribute("aria-label") || "").trim().includes(text))
  list = list.filter(visible)
  if (!sel) list.sort((a, b) => (a.innerText || "").length - (b.innerText || "").length)
  const el = list[0]; if (!el) return null
  const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}`
async function point(step) {
  const sel = step.click ?? step.hover ?? null
  const text = step.clickText ?? step.hoverText ?? null
  const p = await b.eval(`(${FIND})(${JSON.stringify(sel)}, ${JSON.stringify(text)})`)
  if (!p) throw new Error(`找不到：${sel ?? text}`)
  return p
}
async function run(step) {
  if (step.wait) return b.sleep(step.wait)
  if (step.key) return b.key(step.key)
  if (step.type) { for (const ch of step.type) await b.send("Input.insertText", { text: ch }); return }
  if (step.scroll) return b.eval(`(document.querySelector(${JSON.stringify(step.scroll.selector ?? "html")}) ?? document.scrollingElement).scrollBy(0, ${step.scroll.y ?? 400})`)
  const p = await point(step)
  await b.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: p.x, y: p.y })
  if (step.hover || step.hoverText) return
  await b.send("Input.dispatchMouseEvent", { type: "mousePressed", x: p.x, y: p.y, button: "left", clickCount: 1 })
  await b.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: p.x, y: p.y, button: "left", clickCount: 1 })
}

try {
  if (!only) {
    for (const w of widths) {
      await size(w)
      await load()
      await shot(`${w}.png`)
    }
  }
  if (statesFile) {
    const states = JSON.parse(readFileSync(statesFile, "utf8"))
    for (const s of states) {
      if (only && s.name !== only) continue
      console.log(`场景：${s.name}`)
      await size(s.width ?? 1440)
      await load()
      try {
        const steps = s.steps ?? []
        const frames = s.frames ?? [800]
        // 触发过渡的是最后一个动作（点、按键、打字）；它之前的步骤照常跑，之后的等待算进时间
        const last = steps.findLastIndex((step) => !step.wait)
        if (last < 0) { for (const step of steps) await run(step); for (const f of frames) { await b.sleep(f); await shot(`${s.name}-${f}.png`) } continue }
        for (const step of steps.slice(0, last)) await run(step)
        cast.frames = []
        await b.send("Page.startScreencast", { format: "png", everyNthFrame: 1 })
        await b.sleep(200)
        const t0 = Date.now()
        for (const step of steps.slice(last)) await run(step)
        for (const f of frames) {
          await b.sleep(Math.max(0, t0 + f - Date.now()))
          if (f >= 400) { await shot(`${s.name}-${f}.png`); continue }
          // 屏幕在 t0 + f 时刻的样子：那之前最后画出的一帧（录屏开头会先送一张当前画面）
          const at = cast.frames.filter((fr) => fr.t <= t0 + f + 8).at(-1)
          if (!at) { await shot(`${s.name}-${f}.png`); continue }
          writeFileSync(join(out, `${s.name}-${f}.png`), Buffer.from(at.data, "base64"))
          console.log("  拍好", join(out, `${s.name}-${f}.png`), at.t < t0 ? `（点后 ${f}ms 屏幕还没变：反应慢于 ${f}ms）` : `（录屏帧，点后 ${Math.round(at.t - t0)}ms）`)
        }
        await b.sleep(Math.max(0, t0 + 400 - Date.now()))
        await b.send("Page.stopScreencast")
        painted[s.name] = cast.frames.filter((fr) => fr.t > t0 && fr.t <= t0 + 400).length
        console.log(`  点后 400ms 画了 ${painted[s.name]} 帧${painted[s.name] <= 1 ? "：一下子换好，没有过渡" : ""}`)
      } catch (e) { console.log(`  失败：${e.message}`); errors.push(`场景「${s.name}」：${e.message}`) }
    }
  }
} finally {
  await b.close()
}
if (Object.keys(painted).length) writeFileSync(join(out, "frames.json"), JSON.stringify(painted, null, 2))
if (errors.length) { console.log("页面报错："); for (const e of [...new Set(errors)]) console.log("  " + e) } else console.log("页面没有报错")
