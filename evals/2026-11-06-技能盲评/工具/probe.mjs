#!/usr/bin/env node
// 量化探针：node /tmp/skill-bench/tools/probe.mjs <页面id> [--src 页面源码目录或文件]
// 在 1440×900 与 390×844 的首屏量「看得见的设计感」：字号级数、字重、文字色数、常驻控件数、文字密度、
// 留白、左对齐线、贴得太近的块、线条数、实心主按钮数、横向溢出、被截断的字；再从源码数用了哪些 @su 组件与动效。
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { open } from "/Users/simba/Agentic-Engineering/Su-Design/scripts/lib/cdp.mjs"

const args = process.argv.slice(2)
const id = args[0]
const opt = (n, f) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : f }
const src = opt("--src", `/tmp/skill-bench/app/src/pages`)
const base = opt("--base", "http://127.0.0.1:5410")

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
  return {
    viewport: vw + "x" + vh,
    fontSizes: sizes, fontSizeCount: sizes.length, typeStyles: styles.length, textColors: colors.length,
    textBlocks: blocks.length, chars, charsPer100kPx: Math.round(chars / (vw * vh) * 100000),
    controls: uniqCtrls.length, controlsExcludingRepeatedRows: distinctCtrls, solidAccentControls: solid.length,
    coverage: Math.round(coverage * 100) + "%",
    alignmentLines: strongLines, blocksOnLines: Math.round(onLines / Math.max(1, blocks.length) * 100) + "%",
    tightPairs: tight, borderEdges: lines, truncated, overflowX, smallTextBlocks: smallText,
  }
})()`

function files(p) { const st = statSync(p); if (st.isFile()) return [p]; return readdirSync(p).flatMap((f) => files(join(p, f))) }
function sourceStats() {
  const list = files(src).filter((f) => /\.(tsx|ts)$/.test(f) && (f.includes(`/${id}.tsx`) || f.includes(`/${id}/`)))
  const code = list.map((f) => readFileSync(f, "utf8")).join("\n")
  const su = [...new Set([...code.matchAll(/@\/registry\/default\/ui\/([\w-]+)/g)].map((m) => m[1]))]
  // 别的组件库（HeroUI）：数 import { … } from "@heroui/react" 里的名字
  for (const m of code.matchAll(/import\s*\{([^}]*)\}\s*from\s*"@heroui\/react"/g)) for (const n of m[1].split(",")) { const k = n.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0]; if (k && /^[A-Z]/.test(k) && !su.includes(k)) su.push(k) }
  const motion = /from "motion\/react"/.test(code)
  const animated = (code.match(/<motion\.|layoutId=|AnimatePresence|animate=\{/g) || []).length
  return { files: list.length, lines: code.split("\n").length, suComponents: su, suComponentCount: su.length, usesMotion: motion, motionSites: animated }
}

const b = await open({ width: 1440, height: 900 })
const result = { id, source: sourceStats() }
try {
  for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
    await b.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile: w < 500 })
    await b.go(`${base}/${id}`, 2200)
    result[w] = await b.eval(MEASURE)
  }
} finally { await b.close() }
mkdirSync(`/tmp/skill-bench/out/${id}`, { recursive: true })
writeFileSync(`/tmp/skill-bench/out/${id}/probe.json`, JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
