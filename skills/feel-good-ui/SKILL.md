---
name: feel-good-ui
description: 让界面看着舒服、用着顺手：交互、动效、手势、字、表面、阴影、圆角、图标和各种细节怎么做。只要在做或改界面、网页、卡片、版面、组件，调样式或动效，审界面，或者用户说「不舒服」「不好看」「感觉不对」「改改界面」，都用这个技能，不等用户点名。和设计总纲 DESIGN.md 配套使用。
---

# feel-good-ui

用户 2026-11-20 从三轮设计技能比拼里挑定的做法：Emil Kowalski 的 apple-design 定交互和样子，Jakub Krehel 的 make-interfaces-feel-better 打磨细节，两个一起用最舒服。原文都放在本文件夹里。

## 怎么用

1. **定交互和样子**：读 [apple-design/guide.md](apple-design/guide.md)，内容包括反馈、空间一致、克制、手势和弹簧动效、材质和层次、字的光学尺寸、字距和行距、减少动态。动效卡顿、掉帧时，读 [animation-performance/guide.md](animation-performance/guide.md)。
2. **打磨细节**：读 [make-interfaces-feel-better/guide.md](make-interfaces-feel-better/guide.md)，照它的清单逐条过，需要时再读同一文件夹里的 typography、surfaces、animations、icons、performance。
3. 两份说法不一样时，自己权衡，交付时说一句选了哪边、为什么。

## 边界

- 先照设计总纲 `/Users/simba/Agentic-Engineering/design.md/DESIGN.md` 做。总纲、项目规矩和用户最新的话，都比这两份原文优先。
- 组件只用 Fluid Functionalism，原样用，不为了像苹果去改它的圆角、颜色、尺寸（用户 2026-11-10 定，保留组件库原本的质感）。Fluid 的原生规范（fluid-functionalism 技能）是唯一标准：动效时长只用它的三档弹簧，悬停、字号、表面、滚动条都照它；这两份原文只补它没管到的，说法冲突时听 Fluid。

## 来源

- `apple-design/`、`animation-performance/`：github.com/emilkowalski/skills，MIT。
- `make-interfaces-feel-better/`：github.com/jakubkrehel/make-interfaces-feel-better，MIT。
- 各自的许可证在对应文件夹的 LICENSE 里，版本记在 `UPSTREAM`。更新时在 design.md 仓库跑 `tools/sync-feel-good-ui.sh`，看过 `git diff` 再提交。原文不手改，唯一改动是把 apple-design 指向 `SKILL.md` 的链接改成 `guide.md`。
