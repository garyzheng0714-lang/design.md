# design.md · 仓库规则

设计总纲 `DESIGN.md` 和 HeroUI 的红线主题 `heroui-theme.css`。2026-11-07 从 Su Design 仓库搬来（用户：「su-design的项目应该不久后会直接删掉。」「这个仓库应该叫 design.md」）。仓库私密。

## 怎么用（11-07 起）

- 组件写法：HeroUI 官方技能 `heroui-react`，全局装一次 `npx skills add heroui-inc/heroui -g -s heroui-react -a claude-code codex -y`（装在 `~/.agents/skills/`，Claude Code 是软链）。更新 `npx skills update -g`。
- 设计标准：全局的 `~/.claude/CLAUDE.md` 和 `~/.codex/AGENTS.md` 里各有一句「做界面先读 `DESIGN.md`」，所有项目都读这一份，不往项目里拷。
- 新项目装 HeroUI 后，把 `heroui-theme.css` 整份拷进项目，在 `@import "@heroui/styles"` 之后引入；项目里不手改，要改皮肤改这里再拷。

## 目录

- `DESIGN.md`：设计总纲（用户 11-07：「他应该是我的设计总纲领，组件是其中的设计工具」）。改设计标准只改它，带日期原话；超过 30KB 就要拆或删。格式照 Google 的 DESIGN.md，改完 `npx @google/design.md lint DESIGN.md` 没有 error。
- `heroui-theme.css`：HeroUI v3 的红线覆盖（控件白底加框线、不叠投影、遮罩、secondary 变体），只写进 HeroUI 自己的层。
- `evals/`：评测与盲评记录（第一到第四轮）。`docs/用户口味/`、`docs/决策日志.md`：原话出处。

## 改了要做的

- 用户反馈：所有项目都该这样的（口味、红线、讨厌）带日期原话写进 `DESIGN.md`；皮肤问题改 `heroui-theme.css`。改完提交推送到 main。

## 定了不做的事

- 2026-11-07：删掉 design 插件（技能、流程、钩子、监工和体验员两个子智能体、先例与方案图关卡），不再做自己的设计技能或插件（用户：「把我们的design插件删掉」，同意「布局你来定，AI 照 DESIGN.md 加 HeroUI 官方技能拼」）。第四轮实测加了监工和体验员，一屏一个多小时，用户：「还是不好看……布局上还是有点怪、不是很合理」。旧代码在 git 历史里（最后一版 `6669071`）。
- 2026-11-07：不再内置第三方技能副本；HeroUI 用官方的装法，跟官方更新。
- 2026-11-07：不再投入 `@su` 组件和 HeroUI 桥接；`@su` 的旧项目下次动界面时整个换成 HeroUI（用户 11-06 选定，11-07：「su-design的项目应该不久后会直接删掉。」）。
