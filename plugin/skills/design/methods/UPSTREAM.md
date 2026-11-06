# 第三方方法来源

`design` 技能（11-07 之前叫 su-design）把下面几套第三方技能原样内置在本目录（`methods/<名字>/`），作为做界面、审界面、出方案的方法；HeroUI 的技能只管组件写法，布局、披露、动效的取舍照设计总纲和 design 自己的流程（用户 2026-11-06）。stageshow 管它自己那一摊（用户 2026-11-02：「一切都以他为准」），其余 Fluid Functionalism > Emil > Jakub；先后与总纲的关系写在 `../references/rules.md` 的「裁定」。

| 来源 | 固定版本 | 目录 | 许可证 |
| --- | --- | --- | --- |
| [emilkowalski/skills](https://github.com/emilkowalski/skills)（用户 2026-09-30 指定） | [`e8a175de`](https://github.com/emilkowalski/skills/tree/e8a175de22ae1e49370fc144c1f3bb9aeedf988d)（两个目录与 2026-09-30 固定的 `d16ebe60` 内容相同） | `emil-design-eng`、`review-animations` | [MIT](LICENSE.emilkowalski) |
| [mickadesign/fluid-functionalism](https://github.com/mickadesign/fluid-functionalism)（用户 2026-10-07 指定，仅次于 stageshow） | [`c367a0d0`](https://github.com/mickadesign/fluid-functionalism/tree/c367a0d066bc10e663b3d269bc40539ea8417b25) | `fluid-functionalism`（只当知识读：references/craft.md、custom-motion.md；不装 `@fluid` 组件） | [MIT](LICENSE.mickadesign) |
| [benjitaylor/skills](https://github.com/benjitaylor/skills)（用户 2026-11-02 指定，冲突时最优先） | [`80205740`](https://github.com/benjitaylor/skills/tree/802057409787133703c56001080169e347305572)（目录树 `5f24a58c`，与用户 2026-10-31 装的那份相同） | `stageshow`（含 kit、examples、teaching、scripts；`node_modules` 不进仓库，用 `film.mjs` 前在该目录 `npm install`；舞台里用项目自己的 HeroUI 组件，不改上游） | [MIT](LICENSE.benjitaylor)；图标、照片、品牌标志另有出处，见 `stageshow/NOTICE.md` |
| [heroui-inc/heroui](https://github.com/heroui-inc/heroui/tree/v3/skills/heroui-react)（用户 2026-11-06：新项目组件用 HeroUI 原样） | [`b2c65a5b`](https://github.com/heroui-inc/heroui/tree/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/skills/heroui-react)（技能 3.0.1，配 `@heroui/react` 3.2.7 实测） | `heroui-react`（只管组件怎么写：复合组件、`onPress`、变体、取文档的脚本，脚本只读 heroui.com 的文档；装包和主题照 `../references/connect.md`，不用它的 `curl … \| bash`，红线覆盖是 `../assets/heroui-theme.css`） | [Apache-2.0](heroui-react/LICENSE.txt) |
| [jakubkrehel/skills](https://github.com/jakubkrehel/skills)（用户 2026-10-06 指定） | [`d574cc8a`](https://github.com/jakubkrehel/skills/tree/d574cc8a576dc24256ad38268b8d03d86724a1b3) | `better-interface`、`better-ui`、`better-typography`、`better-colors`、`better-accessibility`、`better-layout`、`better-writing`、`interface-review`、`build-design`、`state-machine`、`break`、`variant`、`explain-interface` | [MIT](LICENSE.jakubkrehel) |

- 上游文件保持原文，只删了各目录下给 OpenAI 用的 `agents/openai.yaml`，换成我们自己的一份：只写 `policy.allow_implicit_invocation: false`（2026-10-16 实测 Codex 会把 `methods/` 下每个 `SKILL.md` 都当成插件技能列给模型、不认 `disable-model-invocation`；方法只经 design 的流程按路径读，不自己触发）。
- 本仓库的 `.agents/skills/<名字>`（Codex）与 `.claude/skills/<名字>`（Claude Code）是指向这里的软链接，同一份文件。
- 更新时先审上游差异，再替换目录、改本表的版本，检查软链接可读，`claude plugin validate`，`plugin.json` 版本号加一。不静默跟随上游最新版。
