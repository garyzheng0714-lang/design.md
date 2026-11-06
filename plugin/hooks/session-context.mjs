#!/usr/bin/env node
// 会话开场提醒（design 插件）：在使用方项目里（package.json 依赖 @heroui/react，或 components.json 引了 @su 的旧项目）开会话时，告诉智能体改界面先走 design 技能。
// 2026-11-06 起组件用 HeroUI 原样（红线覆盖 heroui-theme.css）；@su 的旧项目下次动界面时整个换成 HeroUI。2026-11-07 从 Su Design 搬来，技能改名 design。
// 起因（2026-10-08）：短链项目整段会话没有加载技能——用户说的是「太乱」「有点设计感」「只有一个输入框」，不是点名技能，技能描述没命中；
// 智能体照模板拼页面。提醒放在开场，配合 precedent-gate.mjs 在写界面文件时把关。
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"

let input = {}
try { input = JSON.parse(readFileSync(0, "utf8") || "{}") } catch {}
const cwd = input.cwd || process.cwd()

const has = (file, re) => existsSync(file) && re.test(readFileSync(file, "utf8"))
const HEROUI = /"@heroui\/react"\s*:/
const SU = /@su\b/

/** "heroui" | "su" | false；前端放在 web/ app/ frontend/ client/ 下的也认 */
function projectKind(dir) {
  for (let d = dir, i = 0; i < 12; i++, d = dirname(d)) {
    for (const sub of ["", "web", "app", "frontend", "client"]) {
      if (has(join(d, sub, "package.json"), HEROUI)) return "heroui"
      if (has(join(d, sub, "components.json"), SU)) return "su"
    }
    if (existsSync(join(d, ".git")) || dirname(d) === d) return false
  }
  return false
}
const kind = projectKind(cwd)
if (!kind) process.exit(0)

const components = {
  heroui: "本项目的组件用 HeroUI v3 原样（红线覆盖 heroui-theme.css）。",
  su: "本项目还是旧的 @su 组件：这次动界面就先把整个项目换成 HeroUI（design 技能 references/connect.md），不在一个项目里混两套。",
}[kind]
const context =
  components +
  "凡是做页面、改排版、换组件组合、调样式（用户说丑、乱、没设计感、重做、改成某样子，都算），动手前先加载 design 技能，把设计总纲 DESIGN.md、references/rules.md 和这次的流程从头读到尾再照做：" +
  "先用 Mobbin 看同任务的先例（整页 + 每个部件 + 做完之后那一屏），写出先例拆解；新做或重做一屏先读布局手册（references/layout.md）定骨架，再用 stageshow 做像真产品的方案图（references/mockup.md）、评审，通过后照它写真页面，评审没有致命才交。" +
  "没读总纲、规则和流程，没看够先例，新页面没读布局手册或没做方案图时，写界面文件会被 precedent-gate 拦下；只改逻辑不动排版的编辑不受限。"
process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: context } }))
