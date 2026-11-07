#!/usr/bin/env node
// 乱点：node explore.mjs <页面地址> [--width 1440] [--out 目录] [--max 80]
// 体验员（agents/ux.md，用户 2026-11-07：「自己去乱点，怎么点都行，想办法让客户用最小的步骤完成任务」）用的机器手：
// 列出页面上所有看得见、能操作的元素（按钮、链接、输入、选项卡、复选、开关、可点的行，以及指针是小手的最外层元素），
// 每个都从刚打开的页面真实指针点一次，等 700ms，记下变了什么：地址、弹出层（对话框、菜单、下拉、浮层）、焦点、元素自己的选中 / 展开 / 按下状态、页面文字。
// 什么都没变的是「死点」（点了没反应，RULES 与总纲都不许）；点完报错的是「坏点」。输出 <out>/explore.json，并打印一张表。
// 只点不打字；打字、按键、多步任务用 shoot.mjs 的场景走。
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { open } from "./lib/cdp.mjs"

const args = process.argv.slice(2)
const url = args[0]
if (!url || !/^https?:\/\//.test(url)) { console.error("用法：explore.mjs <页面地址> [--width 1440] [--out 目录] [--max 80]"); process.exit(1) }
const opt = (name, fallback) => { const i = args.indexOf(name); return i > -1 ? args[i + 1] : fallback }
const width = Number(opt("--width", "1440"))
const out = opt("--out", "explore")
const max = Number(opt("--max", "80"))
mkdirSync(out, { recursive: true })

// 能操作的元素：语义上的控件，加上指针是小手、父级不是小手的最外层元素（div 写的可点行、卡片）
const LIST = `(() => {
  const CONTROL = 'button, a[href], input:not([type=hidden]), textarea, select, summary, [role=button], [role=link], [role=tab], [role=menuitem], [role=option], [role=checkbox], [role=switch], [role=radio], [role=slider], [role=combobox], [role=row][tabindex], [role=gridcell][tabindex], [tabindex="0"]'
  const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 2 && r.height > 2 && s.visibility !== "hidden" && Number(s.opacity) > 0.05 && !el.closest("[inert],[aria-hidden=true]") }
  const pointer = (el) => getComputedStyle(el).cursor === "pointer"
  const all = [...document.querySelectorAll("body *")]
  const set = new Set(all.filter((el) => el.matches(CONTROL) || (pointer(el) && !(el.parentElement && pointer(el.parentElement)))))
  // 容器（表格、列表框这类装着别的控件的 tabindex 元素）不算一个；表格行算一个，行里的格子不再分开点（格子里自己的按钮照算）
  const LEAF = 'button, a[href], input, textarea, select, summary, [role=button], [role=link], [role=tab], [role=menuitem], [role=option], [role=checkbox], [role=switch], [role=radio], [role=slider], [role=combobox], [role=row]'
  const list = [...set].filter((el) => visible(el)
    && !(el.matches("[role=gridcell], td, [role=cell]") && set.has(el.closest("[role=row], tr")))
    && (el.matches(LEAF) || ![...set].some((o) => o !== el && el.contains(o))))
  const label = (el) => (el.getAttribute("aria-label") || el.innerText || el.getAttribute("placeholder") || el.getAttribute("title") || el.value || el.getAttribute("role") || el.tagName).replace(/\\s+/g, " ").trim().slice(0, 40)
  window.__explore = list
  return list.map((el) => ({ tag: el.tagName.toLowerCase(), role: el.getAttribute("role") || "", label: label(el), input: el.matches("input, textarea, select, [role=combobox], [contenteditable=true]") }))
})()`
const STATE = `((i) => {
  const el = i == null ? null : window.__explore[i]
  const OVER = '[role=dialog], [role=alertdialog], [role=menu], [role=listbox], [role=tooltip], [data-slot=popover], [data-slot=drawer], [data-slot=modal]'
  const shown = [...document.querySelectorAll(OVER)].filter((o) => { const r = o.getBoundingClientRect(); return r.width > 0 && r.height > 0 }).length
  const text = document.body.innerText
  let h = 0; for (let k = 0; k < text.length; k++) h = (h * 31 + text.charCodeAt(k)) | 0
  const a = document.activeElement
  const off = !!el && (el.disabled === true || el.getAttribute("aria-disabled") === "true" || el.hasAttribute("data-disabled"))
  const own = el ? ["aria-current", "aria-pressed", "aria-selected", "aria-expanded", "aria-checked", "data-selected", "data-pressed", "data-expanded", "data-state"].map((n) => el.getAttribute(n)).join("|") + "|" + (el.checked ?? "") + "|" + (el.value ?? "") : ""
  return { href: location.href, shown, hash: h, chars: text.length, focus: a ? a.tagName + (a.getAttribute("aria-label") || a.getAttribute("placeholder") || (a.innerText || "").slice(0, 20)) : "", typing: !!a && a.matches("input, textarea, [contenteditable=true], [role=combobox]"), own, off, scrollY: Math.round(scrollY) }
})`

const b = await open({ width, height: width < 500 ? 844 : 900 })
let errors = []
b.ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data)
  if (m.method === "Runtime.exceptionThrown") errors.push(m.params.exceptionDetails?.exception?.description ?? m.params.exceptionDetails?.text)
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") errors.push(m.params.args.map((a) => a.value ?? a.description).join(" "))
})
await b.send("Runtime.enable")
if (width < 500) await b.send("Emulation.setDeviceMetricsOverride", { width, height: 844, deviceScaleFactor: 2, mobile: true })

async function load() {
  await b.go(url, 300)
  for (let i = 0; i < 40; i++) { if (await b.eval(`document.fonts.status === "loaded" && document.body.innerText.trim().length > 0`)) break; await b.sleep(100) }
  await b.sleep(600)
}

const rows = []
try {
  await load()
  const items = await b.eval(LIST)
  const n = Math.min(items.length, max)
  for (let i = 0; i < n; i++) {
    await load()
    const now = await b.eval(LIST)
    const item = now[i]
    if (!item || item.label !== items[i].label) { rows.push({ ...items[i], result: "重开后找不到（页面每次长得不一样）" }); continue }
    await b.eval(`window.__explore[${i}].scrollIntoView({ block: "center", inline: "center" })`)
    await b.sleep(150)
    const p = await b.eval(`(() => { const r = window.__explore[${i}].getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 } })()`)
    const before = await b.eval(`${STATE}(${i})`)
    errors = []
    await b.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: p.x, y: p.y })
    await b.send("Input.dispatchMouseEvent", { type: "mousePressed", x: p.x, y: p.y, button: "left", clickCount: 1 })
    await b.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: p.x, y: p.y, button: "left", clickCount: 1 })
    await b.sleep(700)
    const after = await b.eval(`${STATE}(${i})`).catch(() => ({ href: "（页面跳走了）" }))
    const changed = [
      after.href !== before.href && `地址 → ${after.href}`,
      after.shown > before.shown && `开了 ${after.shown - before.shown} 个弹出层`,
      after.shown < before.shown && "关了弹出层",
      after.own !== before.own && "自己的状态变了",
      after.typing && !before.typing && "可以打字",
      after.hash !== before.hash && `页面文字变了（${after.chars - before.chars >= 0 ? "+" : ""}${after.chars - before.chars} 字）`,
      after.scrollY !== before.scrollY && "滚动了",
    ].filter(Boolean)
    const current = /\btrue\b|\bpage\b|selected|checked|on\b/.test(before.own) && !changed.length
    const result = errors.length ? `坏点：${String(errors[0]).split("\n")[0]}` : changed.length ? changed.join("；") : before.off ? "禁用态，没变" : current ? "已是当前项，没变" : "死点：点了什么都没变"
    rows.push({ ...item, result })
  }
  if (items.length > max) rows.push({ tag: "", role: "", label: `……还有 ${items.length - max} 个没点（--max 调大）`, result: "" })
} finally {
  await b.close()
}

writeFileSync(join(out, "explore.json"), JSON.stringify({ url, width, rows }, null, 2))
console.log(`| # | 元素 | 点了之后 |\n| - | - | - |`)
rows.forEach((r, i) => console.log(`| ${i + 1} | ${r.label}（${r.role || r.tag}） | ${r.result} |`))
const dead = rows.filter((r) => r.result.startsWith("死点")).length, bad = rows.filter((r) => r.result.startsWith("坏点")).length
console.log(`\n能操作 ${rows.length} 个，死点 ${dead} 个，坏点 ${bad} 个。写进 ${join(out, "explore.json")}`)
