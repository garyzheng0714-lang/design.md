#!/usr/bin/env node
// 拼图：node /tmp/skill-bench/tools/sheet.mjs <shots目录> <输出png>
// 把一份产出的交互场景截图按顺序缩小拼成一张总览（每张上方标场景名），给评审先看全貌，细节再开原图。
import { readdirSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { open } from "/Users/simba/Agentic-Engineering/Su-Design/scripts/lib/cdp.mjs"

const [dir, out] = process.argv.slice(2).map((p) => resolve(p)) // 相对路径会拼成 file://out/… 打不开（11-07 第二轮踩过）
const order = ["S3-进度-700", "S4-切论坛-90", "S4-切论坛-700", "S5-改状态-打开-500", "S5-改状态-选好-90", "S5-改状态-选好-700", "S6-开详情-90", "S6-开详情-700", "S7-下一位-90", "S7-下一位-700", "S8-记日志-700", "S9-新增-90", "S9-新增-700", "S11-搜索-700"]
const have = new Set(readdirSync(dir).map((f) => f.replace(/\.png$/, "")))
// 第二轮起场景名不同：没有命中固定顺序时按场景号、帧排；窄屏 = 390 与名字带「窄屏」的
const key = (n) => { const m = n.match(/^S(\d+)-.*?-(\d+)$/) ?? n.match(/^S(\d+).*?(\d+)?$/); return m ? Number(m[1]) * 10000 + Number(m[2] ?? 0) : 1e9 }
const dynamic = [...have].filter((n) => /^S\d+/.test(n)).sort((x, y) => key(x) - key(y))
const fixed = order.filter((n) => have.has(n))
const wide = fixed.length >= 6 ? fixed : dynamic.filter((n) => !/窄屏/.test(n))
const narrow = fixed.length >= 6 ? ["390", "S10-窄屏详情-90", "S10-窄屏详情-700"].filter((n) => have.has(n)) : ["390", ...dynamic.filter((n) => /窄屏/.test(n))].filter((n) => have.has(n))
const W = 1800, COLS = 3, CW = Math.floor((W - 16 * (COLS + 1)) / COLS)
const cell = (n, w) => `<figure style="margin:0;width:${w}px"><figcaption style="font:600 15px system-ui;margin:0 0 4px">${n}</figcaption><img src="file://${join(dir, n + ".png")}" style="width:${w}px;display:block;border:1px solid #ccc"></figure>`
const html = `<!doctype html><body style="margin:0;padding:16px;background:#fff;width:${W - 32}px">
<div style="display:flex;flex-wrap:wrap;gap:16px">${wide.map((n) => cell(n, CW)).join("")}</div>
<div style="display:flex;gap:16px;margin-top:16px">${narrow.map((n) => cell(n, 260)).join("")}</div></body>`
const page = join(dir, "..", "sheet.html")
writeFileSync(page, html)
const b = await open({ width: W, height: 900 })
try {
  await b.go("file://" + page, 1500)
  const h = await b.eval("document.body.scrollHeight")
  await b.send("Emulation.setDeviceMetricsOverride", { width: W, height: h, deviceScaleFactor: 1, mobile: false })
  await new Promise((r) => setTimeout(r, 500))
  const { data } = await b.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true })
  writeFileSync(out, Buffer.from(data, "base64"))
  console.log("拼好", out, wide.length + narrow.length, "张")
} finally { await b.close() }
