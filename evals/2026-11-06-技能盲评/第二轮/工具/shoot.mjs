#!/usr/bin/env node
// 测试台截图：node /tmp/skill-bench/tools/shoot.mjs <页面id> [--out 目录] [--widths 1440,390] [--states 状态.json] [--only 状态名]
// 默认拍首屏（1440×900、390×844）；--states 里每个状态从新打开的页面开始，按步骤用真实指针操作，再按 frames（毫秒）各拍一张：
// [{ "name": "打开详情", "width": 1440, "steps": [{ "clickText": "王磊" }, { "wait": 200 }], "frames": [90, 800] }]
// 步骤：click（CSS 选择器）· clickText（看得见的文字，取最小的那个元素）· hover · hoverText · key（Escape、Enter、ArrowDown…）· type（往焦点处打字）· wait（毫秒）· scroll（{selector, y}）
// 输出：<out>/<宽>.png、<out>/<状态名>-<帧>.png；控制台报错打印在最后。
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { open } from "/Users/simba/Agentic-Engineering/Su-Design/scripts/lib/cdp.mjs"

const args = process.argv.slice(2)
const id = args[0]
if (!id) { console.error("用法：shoot.mjs <页面id> [--out 目录] [--widths 1440,390] [--states 状态.json] [--only 状态名]"); process.exit(1) }
const opt = (name, fallback) => { const i = args.indexOf(name); return i > -1 ? args[i + 1] : fallback }
const out = opt("--out", `/tmp/skill-bench/out/${id}/shots`)
const widths = opt("--widths", "1440,390").split(",").map(Number)
const statesFile = opt("--states")
const only = opt("--only")
const base = opt("--base", "http://127.0.0.1:5410")
mkdirSync(out, { recursive: true })

const heightFor = (w) => (w < 500 ? 844 : 900)
const b = await open({ width: widths[0], height: heightFor(widths[0]) })
const errors = []
b.ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data)
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
  await b.go(`${base}/${id}`, 300)
  // 等字体和懒加载的页面
  for (let i = 0; i < 40; i++) {
    const ready = await b.eval(`document.fonts.status === "loaded" && document.querySelector("#root")?.children.length > 0`)
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
      console.log(`状态：${s.name}`)
      await size(s.width ?? 1440)
      await load()
      try {
        const steps = s.steps ?? []
        for (const step of steps) await run(step)
        let t = 0
        for (const f of s.frames ?? [800]) { await b.sleep(Math.max(0, f - t)); t = f; await shot(`${s.name}-${f}.png`) }
      } catch (e) { console.log(`  失败：${e.message}`); errors.push(`状态「${s.name}」：${e.message}`) }
    }
  }
} finally {
  await b.close()
}
if (errors.length) { console.log("页面报错："); for (const e of [...new Set(errors)]) console.log("  " + e) } else console.log("页面没有报错")
