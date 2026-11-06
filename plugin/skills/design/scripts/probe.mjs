#!/usr/bin/env node
// 量化探针：node probe.mjs <页面地址> [--src 页面源码目录或文件] [--out 结果.json]
// 在 1440×900 与 390×844 的首屏量「看得见的设计感」：字号级数、字重、文字色数、常驻控件数（重复行只数一行）、文字密度、
// 文字与控件盖住的面积、左对齐线、贴得太近的块、线条数、实心强调按钮数、横向溢出、被截断的字、表格相邻列距、长名单有没有翻页条；--src 再从源码数用了哪些组件与动效。
// 最后对照 layout.md §7 的预算打印「超预算」；全在预算内打印「预算内」。预算来自 2026-11-06 同一题 7 种做法的盲评（design.md 仓库 evals/2026-11-06-技能盲评/）。
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { open } from "./lib/cdp.mjs"

const args = process.argv.slice(2)
const url = args[0]
if (!url || !/^https?:\/\//.test(url)) { console.error("用法：probe.mjs <页面地址> [--src 页面源码目录或文件] [--out 结果.json]"); process.exit(1) }
const opt = (n, f) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : f }
const src = opt("--src")
const outFile = opt("--out")

const MEASURE = String.raw`(() => {
  const vw = innerWidth, vh = innerHeight
  const inView = (r) => r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw
  const shown = (el) => { const s = getComputedStyle(el); return s.visibility !== "hidden" && s.display !== "none" && Number(s.opacity) > 0.05 }
  // 文字块：直接装着非空文字节点的元素
  const blocks = []
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const seen = new Set()
  while (walker.nextNode()) {
    const t = walker.currentNode
    if (!t.textContent.trim()) continue
    const el = t.parentElement
    if (!el || seen.has(el) || !shown(el)) continue
    const range = document.createRange(); range.selectNodeContents(t)
    const r = range.getBoundingClientRect()
    if (!inView(r)) continue
    seen.add(el)
    const s = getComputedStyle(el)
    blocks.push({ el, r, size: parseFloat(s.fontSize), weight: s.fontWeight, color: s.color, text: t.textContent.trim() })
  }
  const sizes = [...new Set(blocks.map((b) => b.size))].sort((a, b) => a - b)
  const styles = [...new Set(blocks.map((b) => b.size + "/" + b.weight))]
  const colors = [...new Set(blocks.map((b) => b.color))]
  const chars = blocks.reduce((n, b) => n + b.text.length, 0)
  // 常驻控件：首屏看得见的可交互元素
  const ctrlSel = 'button, a[href], input, select, textarea, [role=button], [role=tab], [role=switch], [role=checkbox], [role=combobox], [role=menuitem], [role=link], [role=radio], summary'
  const ctrls = [...document.querySelectorAll(ctrlSel)].filter((el) => shown(el) && inView(el.getBoundingClientRect()) && !el.closest('[aria-hidden=true]'))
  const uniqCtrls = ctrls.filter((el) => !ctrls.some((o) => o !== el && o.contains(el)))
  // 不算重复行：表格行、列表项里的控件只数每个集合的第一行（看「这一屏有多少种要学的控件」）
  const ROW = 'tr, [role=row], li, [data-slot=list-item]'
  const distinctCtrls = uniqCtrls.filter((el) => { const row = el.closest(ROW); if (!row || !row.parentElement) return true; const sibs = [...row.parentElement.children].filter((c) => c.matches(ROW) && c.querySelector('*')); return sibs.indexOf(row) <= 0 }).length
  // 实心强调按钮：底色饱和（非灰非白）
  const cv = document.createElement("canvas"); cv.width = cv.height = 1; const cx = cv.getContext("2d", { willReadFrequently: true })
  const rgba = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); return [...cx.getImageData(0, 0, 1, 1).data] }
  const sat = (c) => { const [r, g, b, a] = rgba(c); if (a < 128) return 0; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx === 0 ? 0 : (mx - mn) / mx }
  // 底色可能画在按钮里面的一层（面）上：自己或任一覆盖 ≥ 60% 面积的后代是饱和底色就算
  const solid = uniqCtrls.filter((el) => { const A = el.getBoundingClientRect(); const area = A.width * A.height; return [el, ...el.querySelectorAll("*")].some((n) => { const r = n.getBoundingClientRect(); return r.width * r.height >= area * 0.6 && sat(getComputedStyle(n).backgroundColor) > 0.35 }) })
  // 线：看得见的边框边 + hr
  let lines = 0
  for (const el of document.querySelectorAll("body *")) {
    if (!shown(el)) continue
    const r = el.getBoundingClientRect(); if (!inView(r) || r.width < 24 && r.height < 24) continue
    const s = getComputedStyle(el)
    for (const side of ["Top", "Right", "Bottom", "Left"]) if (parseFloat(s["border" + side + "Width"]) >= 1 && s["border" + side + "Style"] !== "none" && sat(s["border" + side + "Color"]) < 0.35 && rgba(s["border" + side + "Color"])[3] > 0) lines++
    if (el.tagName === "HR") lines++
  }
  // 左对齐线：文字块左缘（取整到 2px），被 ≥ 3 个块共用的算一条线
  const lefts = new Map(); for (const b of blocks) { const x = Math.round(b.r.left / 2) * 2; lefts.set(x, (lefts.get(x) || 0) + 1) }
  const strongLines = [...lefts.values()].filter((n) => n >= 3).length
  const onLines = blocks.filter((b) => (lefts.get(Math.round(b.r.left / 2) * 2) || 0) >= 3).length
  // 贴得太近：上下相邻、横向重叠的两个文字块，竖向空隙 < 2px（不同块却几乎贴住）
  let tight = 0
  const sorted = blocks.slice().sort((a, b) => a.r.top - b.r.top)
  for (let i = 0; i < sorted.length; i++) for (let j = i + 1; j < sorted.length; j++) {
    const a = sorted[i].r, b = sorted[j].r
    if (b.top - a.bottom > 40) break
    const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left)
    const gap = b.top - a.bottom
    // 同一个件里的两行（主字 + 灰字）本来就该紧，不算：两块的最近公共祖先离两边都在 3 层以内
    const up = (el, n) => { const out = []; for (let e = el; e && out.length <= n; e = e.parentElement) out.push(e); return out }
    const sameGroup = up(sorted[i].el, 3).some((x) => up(sorted[j].el, 3).includes(x))
    if (!sameGroup && overlapX > 8 && gap >= -1 && gap < 2 && Math.abs(a.top - b.top) > 4) tight++
  }
  // 留白：文字与控件盒子覆盖首屏的比例（越高越满）
  const cell = 8, cols = Math.ceil(vw / cell), rows = Math.ceil(vh / cell), grid = new Uint8Array(cols * rows)
  const paint = (r) => { for (let y = Math.max(0, Math.floor(r.top / cell)); y < Math.min(rows, Math.ceil(r.bottom / cell)); y++) for (let x = Math.max(0, Math.floor(r.left / cell)); x < Math.min(cols, Math.ceil(r.right / cell)); x++) grid[y * cols + x] = 1 }
  blocks.forEach((b) => paint(b.r)); uniqCtrls.forEach((el) => paint(el.getBoundingClientRect()))
  const coverage = grid.reduce((n, v) => n + v, 0) / grid.length
  // 截断与溢出
  const truncated = [...document.querySelectorAll("body *")].filter((el) => { if (!shown(el)) return false; const s = getComputedStyle(el); return (s.textOverflow === "ellipsis" || s.webkitLineClamp !== "none") && el.scrollWidth > el.clientWidth + 1 && inView(el.getBoundingClientRect()) }).length
  const overflowX = document.documentElement.scrollWidth > vw + 1
  const smallText = blocks.filter((b) => b.size < 12).length
  // 表格列距（11-07 用户：「第一个字段跟第二个字段离得这么远，间距这些都没有统一」）：这一列内容的最右缘 → 下一列内容的最左缘
  const contentBox = (cell) => {
    let l = Infinity, r = -Infinity
    const add = (q) => { if (q.width > 0 && q.height > 0) { l = Math.min(l, q.left); r = Math.max(r, q.right) } }
    const tw = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT)
    while (tw.nextNode()) { const t = tw.currentNode; if (!t.textContent.trim() || !shown(t.parentElement)) continue; const rg = document.createRange(); rg.selectNodeContents(t); add(rg.getBoundingClientRect()) }
    for (const e of cell.querySelectorAll("svg, img, canvas, input, [role=progressbar], [role=meter]")) if (shown(e)) add(e.getBoundingClientRect())
    return l < r ? { l, r } : null
  }
  const CELL = "th, td, [role=columnheader], [role=rowheader], [role=gridcell], [role=cell]"
  const tables = [...document.querySelectorAll("table, [role=grid], [role=table], [role=treegrid]")].filter((t) => shown(t) && inView(t.getBoundingClientRect()) && !t.parentElement.closest("table, [role=grid], [role=table], [role=treegrid]"))
  const rowsOf = (t) => [...t.querySelectorAll("tr, [role=row]")].filter((r) => r.closest("table, [role=grid], [role=table], [role=treegrid]") === t)
  const tableGaps = []
  for (const t of tables) {
    const cols = []
    let n = 0
    for (const row of rowsOf(t)) {
      if (!inView(row.getBoundingClientRect())) continue
      const cells = [...row.children].filter((c) => c.matches(CELL) && shown(c))
      if (cells.some((c) => (c.colSpan || 1) > 1)) continue
      n++
      cells.forEach((c, i) => { const b = contentBox(c); if (!b) return; const k = cols[i] || (cols[i] = { l: Infinity, r: -Infinity }); k.l = Math.min(k.l, b.l); k.r = Math.max(k.r, b.r) })
    }
    if (n < 3 || cols.length < 3) continue
    const gaps = []
    for (let i = 0; i + 1 < cols.length; i++) if (cols[i] && cols[i + 1] && isFinite(cols[i].r) && isFinite(cols[i + 1].l)) gaps.push(Math.round(cols[i + 1].l - cols[i].r))
    if (gaps.length >= 2) tableGaps.push(gaps)
  }
  // 翻页（11-07：「没有考虑到翻页的情况」）：表格行排到首屏以下，页面上却没有翻页条
  const hasPagination = !!document.querySelector("[data-slot=pagination], nav[aria-label*=pagination i], [role=navigation][aria-label*=页]")
  const longTables = tables.filter((t) => { const rows = rowsOf(t); const last = rows[rows.length - 1]; return rows.length > 3 && last.getBoundingClientRect().bottom > vh + 1 }).length
  return {
    viewport: vw + "x" + vh,
    fontSizes: sizes, fontSizeCount: sizes.length, typeStyles: styles.length, textColors: colors.length,
    textBlocks: blocks.length, chars, charsPer100kPx: Math.round(chars / (vw * vh) * 100000),
    controls: uniqCtrls.length, controlsExcludingRepeatedRows: distinctCtrls, solidAccentControls: solid.length,
    coverage: Math.round(coverage * 100) + "%",
    alignmentLines: strongLines, blocksOnLines: Math.round(onLines / Math.max(1, blocks.length) * 100) + "%",
    tightPairs: tight, borderEdges: lines, truncated, overflowX, smallTextBlocks: smallText,
    tableGaps, longTableWithoutPagination: longTables > 0 && !hasPagination,
  }
})()`

function files(p) { const st = statSync(p); if (st.isFile()) return [p]; return readdirSync(p).filter((f) => f !== "node_modules").flatMap((f) => files(join(p, f))) }
function sourceStats() {
  const list = files(src).filter((f) => /\.(tsx|jsx|ts)$/.test(f))
  const code = list.map((f) => readFileSync(f, "utf8")).join("\n")
  const heroui = new Set(), su = new Set()
  for (const m of code.matchAll(/import\s*\{([^}]*)\}\s*from\s*["']@heroui\/react["']/g)) for (const n of m[1].split(",")) { const k = n.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0]; if (k && /^[A-Z]/.test(k)) heroui.add(k) }
  // 装进项目的 @su 组件在 components/ui/<名字>（Su 仓库里是 registry/default/ui/<名字>）
  for (const m of code.matchAll(/["']@\/(?:components|registry\/default)\/ui\/([\w-]+)["']/g)) su.add(m[1])
  const animated = (code.match(/<motion\.|layoutId=|\blayout(?:=\{|\s|>)|AnimatePresence|animate=\{/g) || []).length
  return { files: list.length, lines: code.split("\n").length, heroui: [...heroui], su: [...su], usesMotion: /from ["']motion\/react["']/.test(code), motionSites: animated }
}

// layout.md §7
function overBudget(r) {
  const w = r[1440], n = r[390], out = []
  if (w.fontSizeCount > 4) out.push(`字号 ${w.fontSizeCount} 种（≤ 4）：${w.fontSizes.join(" / ")}`)
  if (w.solidAccentControls > 2) out.push(`实心强调按钮 ${w.solidAccentControls} 个（整屏 ≤ 2）`)
  if (w.controlsExcludingRepeatedRows > 15) out.push(`常驻控件 ${w.controlsExcludingRepeatedRows} 个（重复行只数一行，≤ 15）`)
  const cov = parseInt(w.coverage)
  if (cov < 35) out.push(`文字与控件只盖住 ${w.coverage}（35%–55%）：下半屏空、太素`)
  if (cov > 55) out.push(`文字与控件盖住 ${w.coverage}（35%–55%）：太挤`)
  if (w.truncated || n.truncated) out.push(`被截断的字：1440 有 ${w.truncated} 处、390 有 ${n.truncated} 处（关键字要 0）`)
  if (n.overflowX) out.push("390 宽横向溢出")
  if (w.tightPairs || n.tightPairs) out.push(`不同的块贴在一起：1440 ${w.tightPairs} 对、390 ${n.tightPairs} 对`)
  for (const g of w.tableGaps || []) if (Math.max(...g) - Math.min(...g) > 16) out.push(`表格列距不统一：相邻两列内容之间 ${g.join(" / ")}px（差 ≤ 16；列宽按内容定，多出来的宽度留在最右边）`)
  if (w.longTableWithoutPagination) out.push("名单排到首屏以下却没有翻页条（Table.Footer + Pagination）")
  if (r.source && r.source.motionSites === 0) out.push("源码里没有写任何过渡（layout.md §6 每个动作都要有）")
  return out
}

const b = await open({ width: 1440, height: 900 })
const result = { url, ...(src ? { source: sourceStats() } : {}) }
try {
  for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
    await b.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile: w < 500 })
    await b.go(url, 2200)
    result[w] = await b.eval(MEASURE)
  }
} finally { await b.close() }
result.overBudget = overBudget(result)
if (outFile) writeFileSync(outFile, JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
console.log(result.overBudget.length ? "超预算：\n  " + result.overBudget.join("\n  ") : "预算内")
