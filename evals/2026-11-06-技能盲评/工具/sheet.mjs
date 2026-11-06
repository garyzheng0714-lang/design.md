#!/usr/bin/env node
// 拼图：node /tmp/skill-bench/tools/sheet.mjs <shots目录> <输出png>
// 把一份产出的交互场景截图按顺序缩小拼成一张总览（每张上方标场景名），给评审先看全貌，细节再开原图。
import { readdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { open } from "/Users/simba/Agentic-Engineering/Su-Design/scripts/lib/cdp.mjs"

const [dir, out] = process.argv.slice(2)
const order = ["S3-进度-700", "S4-切论坛-90", "S4-切论坛-700", "S5-改状态-打开-500", "S5-改状态-选好-90", "S5-改状态-选好-700", "S6-开详情-90", "S6-开详情-700", "S7-下一位-90", "S7-下一位-700", "S8-记日志-700", "S9-新增-90", "S9-新增-700", "S11-搜索-700"]
const have = new Set(readdirSync(dir).map((f) => f.replace(/\.png$/, "")))
const wide = order.filter((n) => have.has(n))
const narrow = ["390", "S10-窄屏详情-90", "S10-窄屏详情-700"].filter((n) => have.has(n))
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
