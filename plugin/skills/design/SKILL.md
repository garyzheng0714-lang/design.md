---
name: design
description: 做任何界面之前必须先加载：新页面、改版、出方案、布局、列表、表单、后台、侧栏、抽屉、动效、产品演示动画与插图、审查界面，新起一个前端项目，或在 package.json 有 @heroui/react、components.json 有 @su 的项目里动界面。用户说「丑」「界面乱」「布局太糟糕」「界面看不懂」「AI 味」「没高级感」「一塌糊涂」「重做」「排一下」「优化界面 / 体验」，或贴截图批评界面时也必须加载；说「设计总纲」「DESIGN.md」「HeroUI」「设计系统」时同样加载。MUST be loaded before writing UI code, when starting a new frontend, and whenever the user builds, redesigns, lays out, mocks up, demos, polishes, reviews or complains about UI.
---

# 设计

**Avoid unnecessary secondary labels and descriptions. Let the layout do the explaining.**（设计纲领，排在一切之前）

先从头到尾读两份：[DESIGN.md](DESIGN.md)（设计总纲：合格线、红线、布局、交互、动效、工具，做和评都只认它）和 [references/rules.md](references/rules.md)（边界、版面、审查、裁定）。再按这次要做的事读流程，自己判断走哪一行，不等用户点名。

| 这次要做的事 | 读 | 做到哪 |
| --- | --- | --- |
| 新做一屏、重做、动骨架（换分区、挪主动作、换组件组合、改信息归属或任务路径） | [mockup.md](references/mockup.md) → [layout.md](references/layout.md) → [build.md](references/build.md)（写时监工在旁，写完体验员走一遍） | 评审无致命，交付 |
| 用户只要先看方案、效果图 | [mockup.md](references/mockup.md) → [layout.md](references/layout.md) | 评审通过就停，给用户看 |
| 产品演示动画、带光标的走查、官网或文档的产品插图、功能卡配图 | [stageshow](methods/stageshow/SKILL.md)（舞台里用项目自己的组件） | 排练通过（`rehearsal passed`）就交 |
| 骨架不动，改间距、对齐、字、颜色、圆角、图标、文案、状态 | [polish.md](references/polish.md) | 交付 |
| 加动效、改动效 | [motion.md](references/motion.md) | 交付 |
| 新项目装 HeroUI；`components.json` 有 `@su` 的旧项目第一次动界面（先整个换成 HeroUI） | [connect.md](references/connect.md) | 接好；页面再按上面各行 |

- 一件事跨几行就都读：重做途中要加动效，接着读 motion.md，做完那一处回原流程。
- 看不出属于哪行：先看现状（读代码、看页面），用一句话告诉用户你判断是哪种、为什么，再动手；不默认当成重做。
- 用户说看看、审一下、只审不改：读对应流程，只出报告，不写任何文件。
