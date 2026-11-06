# design.md · 仓库规则

设计总纲 `DESIGN.md` 和 design 插件（Claude Code 与 Codex 装的是同一个）。2026-11-07 从 Su Design 仓库搬来（用户：「su-design的项目应该不久后会直接删掉。」「这个仓库应该叫 design.md」）。仓库私密。

## 目录

- `DESIGN.md`：设计总纲（用户 11-07：「他应该是我的设计总纲领，组件是其中的设计工具」）。做页面的智能体和评审的智能体都只读它；改设计标准只改它，带日期原话；超过 30KB 就要拆或删。根目录这份是软链，真文件在 `plugin/skills/design/DESIGN.md`，随插件发出去。
- `plugin/skills/design/`：唯一的技能，自动判断这次走哪个流程。`references/` 是流程正文：`rules`（所有活共读）、`mockup` → `layout` → `build`（新做、重做）、`polish`、`motion`、`connect`，不抄两份。`assets/heroui-theme.css` 是 HeroUI 的红线覆盖，使用方项目整份拷过去、不手改。`scripts/` 是拍图（`shoot.mjs`）和探针（`probe.mjs`）。`methods/` 是第三方方法原文（来源、版本、许可证见 `methods/UPSTREAM.md`），原文不改、不受 500 行上限约束。
- `plugin/hooks/`：`session-context`（开场提醒）、`precedent-gate`（写界面文件前：读完总纲、规则和流程，Mobbin ≥ 2 次 ≥ 10 张图；新页面还要读布局手册、做过方案图）、`static-gate`（写完查文案、配色、间距、原生日期框，旧 `@su` 项目再查圆角）；规则本体在 `lib/static-rules.mjs`；配置 `design-hooks.json`，由 `plugin.json` 的 `hooks` 指过去。
- `evals/`：评测集与盲评记录（第一、二轮在 `2026-11-06-技能盲评/`）。`docs/用户口味/`、`docs/决策日志.md`：原话出处。
- `scripts/`：钩子的用例审计；`scripts/fixtures/ds-theme.css` 是旧 `@su` 项目的主题样本，给圆角用例用。
- `.agents/skills/`、`.claude/skills/`：指向 `methods/` 的软链，在本仓库里能直接调用这些方法。

## 改了要做的

- 钩子或 `lib/static-rules.mjs`：`npm install` 后 `npm run audit`，输出为空才算过。新检查先在副本里改回原错，证明抓得到（`GATE=` / `STATIC_GATE=` 指向副本）；钩子出错会悄悄放行，所以改了必跑。
- 插件任何文件：`claude plugin validate plugin`，`plugin/.claude-plugin/plugin.json` 版本号加一，提交推送到 main。`design-hooks.json` 的 matcher、命令、timeout 一改，Codex 要用户重新信任一次钩子。
- 用户反馈：所有项目都该这样的（口味、红线、讨厌）带日期原话写进 `DESIGN.md`，再改对应流程；能机器查的加进 `static-rules` 并在审计里加用例。

## 安装

- Claude Code：`claude plugin marketplace add garyzheng0714-lang/design.md --sparse .claude-plugin plugin`，`claude plugin install design@design`。
- Codex：`~/.codex/config.toml` 里 `[marketplaces.design]`（git 源 `https://github.com/garyzheng0714-lang/design.md.git`，`sparse_paths = [".claude-plugin", "plugin"]`）和 `[plugins."design@design"]`；钩子要用户在 Codex 里信任一次。

## 定了不做的事

- 2026-11-07：不设手动入口命令（方案、重构、打磨、动画），只有一个自动分流的 `design` 技能（用户：「不，没有什么方案，七七八八的。他应该是自动路由」）。
- 2026-11-07：不再投入 `@su` 组件和 HeroUI 桥接；`@su` 的旧项目下次动界面时整个换成 HeroUI（用户 11-06 选定，11-07：「su-design的项目应该不久后会直接删掉。」）。
