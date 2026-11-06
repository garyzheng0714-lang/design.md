# 参赛规则（两位参赛者一样）

你在一场设计对比测试里做一个题目。题目在 `/tmp/skill-bench/round2/brief.md`，先读完。

## 技术栈（固定）

- 只写一个页面：`/tmp/skill-bench/hero/src/pages/<你的页面id>.tsx`（默认导出页面组件，已有空占位，先 Read 再覆盖）。要拆文件就放 `/tmp/skill-bench/hero/src/pages/<你的页面id>/` 下面再 import。别的目录一个字都不改（数据文件只读）。
- 组件只用 HeroUI v3：`import { … } from "@heroui/react"`（已装 3.2.7）。HeroUI 自己的技能在 `/Users/simba/Agentic-Engineering/Su-Design/plugin/skills/su-design/methods/heroui-react/SKILL.md`，取组件文档：`node /Users/simba/Agentic-Engineering/Su-Design/plugin/skills/su-design/methods/heroui-react/scripts/get_component_docs.mjs <组件名…>`。样式用 Tailwind v4 加 HeroUI 自己的主题变量；主题已经装好（`src/app.css`），不改主题。
- 图标只用 `lucide-react`；动画可以用 HeroUI 自带的，也可以用 `motion/react`（已装）。不装任何新依赖。
- 交互都要真的能用（本地 React 状态），不许有点了没反应的按钮。
- 代码注释里不要提你用的设计方法、技能或这场测试的名字（评审是盲评）。

## 怎么看自己的页面

- 开发服务器已经在跑：`http://127.0.0.1:5411/<你的页面id>`（关了热更新，改完重新截图就是新的）。不要自己再起服务器，也不要关它。
- 截图：`node /tmp/skill-bench/tools/shoot.mjs <页面id> --base http://127.0.0.1:5411`（所有 shoot 命令都要带这个 --base；默认拍 1440 与 390 首屏，图在 `/tmp/skill-bench/out/<页面id>/shots/`），加 `--states /tmp/skill-bench/out/<页面id>/states.json` 拍交互状态，`--only <状态名>` 只拍一个。用 Read 打开 png 看。
- 量化探针：`node /tmp/skill-bench/tools/probe.mjs <页面id> --base http://127.0.0.1:5411 --src /tmp/skill-bench/hero/src/pages`。
- 类型检查：`cd /tmp/skill-bench/hero && node_modules/.bin/tsc --noEmit -p .`
- 同一时间只开一个无头浏览器（脚本拍完自己关）。另一位参赛者也在用同一台开发服务器，别动它的文件。

## 交付三样

1. 页面文件。
2. `/tmp/skill-bench/out/<页面id>/states.json`：用你页面里的选择器或看得见的文字，实现下面这些操作场景（格式见 `shoot.mjs` 文件头；每个状态从刚打开的页面开始）。场景名照写：
   - `S1-总进度`：看到每个套餐的总进度要做的操作（首屏就能看到就写空步骤），frames [700]
   - `S2-逾期`：找出所有逾期的权益，frames [90, 700]
   - `S3-切套餐`：只看「金牌」的展商，frames [90, 700]
   - `S4-开详情`：打开「青屿饮品」，frames [90, 700]
   - `S5-推进`：把青屿饮品的「会刊整页广告」往下推一步，frames [90, 700]
   - `S6-改截止日`：打开青屿饮品「会刊整页广告」的截止日控件，frames [500]
   - `S7-记催办`：在青屿饮品开始记一条催办并输入「电话催物料，对方周五前发终稿」，frames [700]
   - `S8-下一家`：在青屿饮品的详情里切到下一家，frames [90, 700]
   - `S9-新增`：开始新增一家展商，frames [90, 700]
   - `S10-窄屏详情`：width 390，打开任意一家展商，frames [90, 700]
   - `S11-搜索`：搜「禾川」，frames [700]
   做不到的场景也写上，步骤留空，并在 NOTES 里写为什么。
3. `/tmp/skill-bench/out/<页面id>/NOTES.md`（≤ 30 行）：你做了哪几步、布局决定用 5 行说清（分区、主次、每块用了哪个组件、渐进披露、动效）。

最后跑一遍 `shoot.mjs --states …` 全部场景，确认每个场景都拍出来、页面没有报错，再交。
