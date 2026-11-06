# 接入：新项目装 HeroUI，旧项目整个换

## 先看是哪种项目

- `package.json` 有 `@heroui/react`：已经接好，跳到「每次动界面前」。
- 新项目，或前端还没有组件库：照「新项目装 HeroUI」。
- `components.json` 有 `@su`：旧项目，这次动界面就照「旧项目整个换成 HeroUI」（用户 2026-11-06：下次改它时整个项目一起换，不混两套）。
- 用的是别的组件库（不是 HeroUI、不是 `@su`）：先告诉用户总纲 §9 定的是 HeroUI，问要不要换；不换就照项目现有的库做，布局、交互、动效照总纲。

Mobbin 用 `search_screens`（Claude Code 是 `mcp__mobbin__search_screens`，没加载就用 ToolSearch 取）。没有就停下告诉用户，不跳过先例。

## 新项目装 HeroUI（每个项目一次）

- 前提：React + Tailwind CSS v4；不满足先告诉用户，不硬装。
- `npm i @heroui/react @heroui/styles tailwind-variants`。不跑 `shadcn init`、不装第二套组件库。
- 把本技能的 [assets/heroui-theme.css](../assets/heroui-theme.css) 拷进项目（放在样式入口旁，例如 `src/styles/heroui-theme.css`）。样式入口依次写 `@import "tailwindcss";`、`@import "@heroui/styles";`、`@import "./styles/heroui-theme.css";`（路径照实际位置，必须在 HeroUI 之后）。HeroUI v3 不要 Provider。
- 要做插入、让位、滑入、原位换字：`npm i motion`，用 `motion/react`（[motion.md](motion.md)）。
- 组件写法照 [heroui-react](../methods/heroui-react/SKILL.md)，不用它的 `curl … | bash` 安装段。
- HeroUI 没有的件：侧栏用 `ListBox`（单选）加页面布局拼，窄屏换成页顶能横滑的 `Tabs` 或底部 `Drawer`；时间线、步骤条、指标卡用它的零件（按钮、进度条、分隔线、`Surface`）拼；图表、命令面板、画布、富文本用成熟开源库，交付时写明用了哪个。

## 每次动界面前

- 项目里的 `heroui-theme.css` 和本技能 assets 里那份不一样，就整份换成本技能的（项目里不手改它；要改皮肤改本技能那份）。
- 每用一个组件先取文档：`node <本技能目录>/methods/heroui-react/scripts/get_component_docs.mjs <组件名…>`。

## 旧项目整个换成 HeroUI

- 动手前列一张「旧版有什么」（每页的数据、字段、动作，缩略图、时间轴、看图器、键盘操作……），交付时逐项对上，一样不能少、一个数不改。告诉用户要换哪些页，再开始。
- 先装 HeroUI（上一节），再按页换：外框与导航 → 主要页面 → 其余，每页都走 [mockup.md](mockup.md) 和 [build.md](build.md)。业务逻辑、数据、接口沿用。
- 旧的侧栏、图表、指标卡、命令面板照上一节「HeroUI 没有的件」换掉。
- 全部页面换完再删 `@su` 的组件文件（`components/ui` 里装进来的）、`ds-theme.css` / `ds-tokens.css` 的引入、`components.json` 里的 `@su` 源、`.env.local` 里的 `SU_API_KEY` 和只给 `@su` 用的 `MotionConfig` 配置；不留兼容层。删之前给用户看一遍换完的页面。
- 圆角、间距照 HeroUI 自己的刻度；旧代码里 Su 的语义类（`p-inset`、`text-fg`、`rounded-*` 语义名）一并换成 HeroUI 的主题变量类。
