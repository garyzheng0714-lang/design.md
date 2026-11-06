#!/usr/bin/env node
// 汇总页：node /tmp/skill-bench/tools/report.mjs → /tmp/skill-bench/report.html
import { writeFileSync } from "node:fs"

const O = "/tmp/skill-bench/out"
const rows = [
  { id: "x", name: "ui-ux-pro-max", r1: 74, r2: 66, good: "切论坛整块淡入不跳；页头一行「已确认 n/m」+ 细进度条，改状态时弹簧长；宽屏右出、窄屏底出同一个抽屉", bad: "新增后弹 toast 复述；详情模糊遮罩糊掉名单；状态列挪到第 2 列" },
  { id: "t", name: "impeccable", r1: 76, r2: 63, good: "新增 = 名单顶上插一行并打开详情，不弹表单；详情不遮名单、能继续点别的行；席位条（确认绿 / 推进黄 / 空格灰），改状态原地变色", bad: "原生日期框两处；面板只淡入，途中和表格文字叠影；「全部」时页头 7 组无名席位点" },
  { id: "k", name: "不用技能（对照组）", r1: 72, r2: 64, good: "标题拉开有重心；字段照原顺序；状态 inline Select + 换字滚动；日志插入用 layout 让位", bad: "切论坛时空行再跳；toast 复述；左栏 32px 迷你进度条读不出差别；手机第一屏看不到状态" },
  { id: "r", name: "frontend-design（Anthropic）", r1: 60, r2: 72, good: "「计划几位就画几个座位」，进论坛后座位上写人名、点名开详情；非模态抽屉；记日志表单弹簧展开", bad: "同一份进度画三遍；淡绿底人名卡；首列截断人名；切论坛跳" },
  { id: "h", name: "HeroUI 组件库 + 它的技能", r1: 64, r2: 60, good: "侧栏每个论坛名下一根带 2/8 的进度条，最好读；窄屏顶部「全部论坛 ⌄」", bad: "每行一颗灰底胶囊下拉，压过人名；灰底输入框 + 原生日期（你的两条红线）；除抽屉外几乎不动" },
  { id: "w", name: "interface-design", r1: 62, r2: 62, good: "详情底部钉「8 / 37 · 上一位 / 下一位」，翻人时位置不动；流程当前步空心圈 + 黄点", bad: "改状态、新增、记日志都弹 toast；页头无名席位点阵，窄屏折成两行；新增用对话框" },
  { id: "m", name: "我们的 su-design", r1: 60, r2: 58, good: "首屏最克制；日志框写了字才露出日期 / 方式 / 记下；手机换成两行列表", bad: "进度只有数字没有形状；页面没写任何过渡，切论坛空行再跳；详情三块藏进标签页、下半屏空；模糊遮罩；新增弹对话框" },
]
const img = (id, n, w) => `<figure><figcaption>${n}</figcaption><img loading="lazy" src="file://${O}/${id}/shots/${n}.png" style="width:${w}px"></figure>`
const card = (r, i) => `<section>
<h2>${i + 1}. ${r.name}<span>${((r.r1 + r.r2) / 2).toFixed(1)}</span><small>Opus ${r.r1} · Sonnet ${r.r2}</small></h2>
<div class="pair"><p><b>好</b>${r.good}</p><p><b>坏</b>${r.bad}</p></div>
<div class="shots">${img(r.id, "1440", 560)}${img(r.id, "S4-切论坛-90", 560)}${img(r.id, "S6-开详情-700", 560)}${img(r.id, "390", 180)}</div>
</section>`
const html = `<!doctype html><meta charset="utf-8"><title>7 份盲评</title>
<style>
body{font:15px/1.6 -apple-system,"PingFang SC",sans-serif;margin:32px auto;max-width:1960px;padding:0 32px;color:#1d1d1f;background:#f5f5f7}
section{background:#fff;border-radius:16px;padding:24px;margin:0 0 24px}
h2{margin:0 0 12px;font-size:20px;font-weight:600;display:flex;gap:12px;align-items:baseline}
h2 span{font-size:28px;color:#0a5}h2 small{font-size:13px;color:#86868b;font-weight:400}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:0 0 16px}.pair p{margin:0}.pair b{margin-right:8px}
.shots{display:flex;gap:16px;align-items:flex-start;overflow-x:auto}
figure{margin:0}figcaption{font-size:12px;color:#86868b;margin:0 0 4px}img{display:block;border:1px solid #e5e5ea;border-radius:8px}
</style>
<h1 style="font-size:24px;font-weight:600">同一题（FBIF 演讲嘉宾工作台），7 种做法，两位评审盲评（按平均分排）</h1>
${rows.map(card).join("\n")}`
writeFileSync("/tmp/skill-bench/report.html", html)
console.log("写好 /tmp/skill-bench/report.html")
