# 参赛规则（所有参赛智能体一样）

你在一场「设计技能对比测试」里，用指定的一套设计方法（或不用方法）做同一个题目。题目在 `/tmp/skill-bench/brief.md`，先读完。

## 技术栈（固定，所有人一样）

- 只写一个页面：`/tmp/skill-bench/app/src/pages/<你的页面id>.tsx`（默认导出页面组件）。要拆文件就放 `/tmp/skill-bench/app/src/pages/<你的页面id>/` 下面再 import。别的目录一个字都不改。
- 组件只用 Su Design 的组件：`import { … } from "@/registry/default/ui/<名字>"`。源码在 `/Users/simba/Agentic-Engineering/Su-Design/registry/default/ui/`，每个组件的用法与示例在 `/Users/simba/Agentic-Engineering/Su-Design/src/docs/<名字>/`（`doc.ts` 是事实，`examples/*.tsx` 是写法）。**Su Design 仓库只读，不许改任何文件。**
- 图标只用 `lucide-react`；动画用 `motion/react`（Su 的动效数值在 `registry/default/ui/ease.tsx`）；样式用 Tailwind 加 Su 的语义类和变量（`registry/default/styles/ds-theme.css`、`ds-tokens.css`）。颜色、字号刻度、圆角、间距这些皮肤用 Su 的，布局、组件怎么选、交互、动效由你决定。不装任何新依赖。
- 交互都要真的能用（本地 React 状态），不许有点了没反应的按钮。
- 代码注释里不要提你用的设计方法、技能或这场测试的名字（评审是盲评）。

## 怎么看自己的页面

- 开发服务器已经在跑：`http://127.0.0.1:5410/<你的页面id>`（关了热更新，改完重新截图就是新的）。不要自己再起服务器，也不要关它。
- 截图：`node /tmp/skill-bench/tools/shoot.mjs <页面id>`（默认拍 1440 与 390 首屏，图在 `/tmp/skill-bench/out/<页面id>/shots/`），加 `--states /tmp/skill-bench/out/<页面id>/states.json` 拍交互状态，`--only <状态名>` 只拍一个。用 Read 打开 png 看。
- 量化探针：`node /tmp/skill-bench/tools/probe.mjs <页面id>`（字号级数、首屏控件数、留白、对齐线、溢出等）。
- 类型检查：`cd /tmp/skill-bench/app && /Users/simba/Agentic-Engineering/Su-Design/node_modules/.bin/tsc --noEmit -p .`
- 同一时间只开一个无头浏览器（脚本拍完自己关）。截图迭代最多 4 轮，够用就停。

## 交付三样

1. 页面文件。
2. `/tmp/skill-bench/out/<页面id>/states.json`：用你页面里的选择器或看得见的文字，实现下面这些操作场景（格式见 `shoot.mjs` 文件头；每个状态从刚打开的页面开始）。场景名照写：
   - `S3-进度`：看到所有分论坛的进度要做的操作（首屏就能看到就写空步骤），frames [700]
   - `S4-切论坛`：切到「乳品创新」，frames [90, 700]
   - `S5-改状态-打开`：在名单里打开「黄子涵」（乳品创新）的邀请状态控件，frames [500]
   - `S5-改状态-选好`：把黄子涵改成「已确认」，frames [90, 700]
   - `S6-开详情`：打开「李佳音」的详情，frames [90, 700]
   - `S7-下一位`：在李佳音的详情里切到下一位，frames [90, 700]
   - `S8-记日志`：在李佳音的详情里开始记一条联络日志并输入「电话沟通，对方确认档期」，frames [700]
   - `S9-新增`：在「乳品创新」下开始新增一位嘉宾，frames [90, 700]
   - `S10-窄屏详情`：width 390，打开任意一位嘉宾的详情，frames [90, 700]
   - `S11-搜索`：搜「禾川」，frames [700]
   做不到的场景（比如你的设计里没有这个操作）也写上，步骤留空，并在 NOTES 里写为什么。
3. `/tmp/skill-bench/out/<页面id>/NOTES.md`（≤ 30 行）：你照方法做了哪几步、哪里没照做和为什么、布局决定用 5 行说清（分区、主次、每块用了哪个组件、渐进披露、动效）。

最后跑一遍 `shoot.mjs --states …` 全部场景，确认每个场景都拍出来、页面没有报错，再交。
