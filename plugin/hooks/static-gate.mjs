#!/usr/bin/env node
// 改后检查（design 插件；2026-11-07 从 Su Design 的 su-design 插件搬来）：使用方项目里改完界面文件，马上照设计总纲查这个文件的文案、圆角、配色、间距、原生日期框，不合规就把问题退回给智能体。
// 用户 2026-10-15：「给 su-design 插件加改界面文件后自动跑文案、圆角、颜色检查的钩子」。起因：7 个用 @su 的项目没有一个接 Su 的检查，
// 说明句、圆角、颜色这几类纠正在不同项目里反复出现。规则本体在 lib/static-rules.mjs（最早和 Su 仓库的 copy-audit、radius-static、color-static 共用，现在以这份为准）。
// 查：Claude 的 Write / Edit / MultiEdit、Codex 的 apply_patch 刚写过的文件。.tsx / .ts 查文案（句子、日期紧贴）；.tsx / .ts / .jsx / .js 查圆角；再加 .css 查拐角形状、配色与间距（4 的倍数，2026-10-30）。
// 使用方项目有两种（2026-11-06 起用 HeroUI）：package.json 依赖 @heroui/react 的是 HeroUI 项目；components.json 引了 @su、没有 HeroUI 的是还没换的旧项目（两样都有时算 HeroUI）。
//   HeroUI 项目照 HeroUI 原样（用户 2026-11-06「HeroUI 原样，只改红线」）：不查圆角与拐角形状、不查文字块外边距（扣半行距是 @su/theme 给的），
//   文案、配色、间距、原生日期框是设计总纲的红线，两种项目都查；旧项目的圆角照它自己装的 ds-theme.css 查，换完 HeroUI 就不查了。
// 不查：不是使用方项目；装进来的文件（components/ui、styles/ds-*.css、styles/heroui-theme.css）、lib/、demo/、测试；
//   stageshow 方案图目录（往上三层内有 kit/stageshow.css；用户 2026-11-02「一切都以他为准」，那里的阴影、取景、动效、占位照 stageshow）。
// 圆角要用使用方项目里的 typescript 和 ds-theme.css，任一找不到就只跳过圆角这一项。
// 放行：上一行写「必要提示：理由」的句子；上一行写「参考图：出处」的圆角、配色与间距（照用户参考图写死的值）；上一行写「非间距：理由」的几何（滚动条离边这类）。
// 退回 = 退出码 2 + stderr（文件已经写进去了，智能体看到后接着改）。脚本自己出错一律放行（退出码 0），不卡住会话；用例审计 scripts/static-gate-audit.mjs。
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join, relative, resolve } from "node:path"
import { colorProblems, nativeDateProblems, radiusAllowed, radiusProblems, sentenceProblems, shapeProblems, spaceProblems, tightProblems } from "./lib/static-rules.mjs"

const MAX_LINES = 30
const SKIP = /(^|\/)(node_modules|dist|build|\.next|coverage|components\/ui|lib|demo)\/|(^|\/)styles\/(ds-[\w-]+|heroui-theme)\.css$|\.(test|spec|stories)\.[jt]sx?$|\.d\.ts$/

let input = {}
try { input = JSON.parse(readFileSync(0, "utf8") || "{}") } catch { process.exit(0) }
let report = []
try { report = check() } catch { process.exit(0) }
if (!report.length) process.exit(0)
const shown = report.slice(0, MAX_LINES)
process.stderr.write(
  `改后检查：刚改的文件里有 ${report.length} 处不合设计总纲，先改掉再继续（标准见 design 技能 DESIGN.md 红线 2、6、7、11、14）。\n` +
  shown.join("\n") + (report.length > shown.length ? `\n……还有 ${report.length - shown.length} 处` : "") + "\n" +
  "写给用户的句子确实要留：上一行加 // 必要提示：理由。照用户参考图写死的圆角、颜色或间距：上一行加 // 参考图：出处。\n",
)
process.exit(2)

function check() {
  const cwd = input.cwd || process.cwd()
  const out = []
  for (const file of new Set(changedPaths(input.tool_name, input.tool_input || {}).map((p) => resolve(cwd, p)))) {
    if (!/\.(tsx?|jsx?|css)$/.test(file) || !existsSync(file)) continue
    const found = consumerRoot(dirname(file))
    if (!found || SKIP.test(relative(found.root, file)) || inScene(file)) continue
    const { root, heroui } = found
    const text = readFileSync(file, "utf8")
    const problems = [
      ...(/\.tsx?$/.test(file) ? [...sentenceProblems(text), ...tightProblems(text)] : []),
      ...(/\.[jt]sx?$/.test(file) && !heroui ? radius(root, file, text) : []),
      ...(/\.[jt]sx?$/.test(file) ? nativeDateProblems(text) : []),
      ...(heroui ? [] : shapeProblems(text)),
      ...colorProblems(text),
      ...spaceProblems(text, file, { textMargin: !heroui }),
    ].sort((a, b) => a.line - b.line)
    for (const { line, message } of problems) out.push(`${relative(cwd, file) || file}:${line}  ${message}`)
  }
  return out
}

/** stageshow 方案图目录里的文件（kit 本身和场景） */
function inScene(file) {
  for (let d = dirname(file), i = 0; i < 4; i++, d = dirname(d)) if (existsSync(join(d, "kit", "stageshow.css"))) return true
  return false
}

function radius(root, file, text) {
  let ts
  try { ts = createRequire(join(root, "package.json"))("typescript") } catch { return [] }
  const theme = findTheme(root)
  return theme ? radiusProblems(ts, file, text, radiusAllowed(readFileSync(theme, "utf8"))) : []
}

/** 旧项目装进来的 @su/theme：styles/ds-theme.css（各项目放的层级不同，往下找三层） */
function findTheme(dir, depth = 0) {
  const here = join(dir, "styles", "ds-theme.css")
  if (existsSync(here)) return here
  if (depth >= 3) return null
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || /^(node_modules|dist|build|\.git|\.next)$/.test(e.name)) continue
    const found = findTheme(join(dir, e.name), depth + 1)
    if (found) return found
  }
  return null
}

/** 使用方项目的根：package.json 依赖 @heroui/react（HeroUI 项目）或 components.json 引了 @su 的那一层；遇到 git 根就停 */
function consumerRoot(dir) {
  for (let d = dir, i = 0; i < 12; i++, d = dirname(d)) {
    const pj = join(d, "package.json")
    if (existsSync(pj) && /"@heroui\/react"\s*:/.test(readFileSync(pj, "utf8"))) return { root: d, heroui: true }
    const cj = join(d, "components.json")
    if (existsSync(cj) && /@su\b/.test(readFileSync(cj, "utf8"))) return { root: d, heroui: false }
    if (existsSync(join(d, ".git")) || dirname(d) === d) return null
  }
  return null
}

/** 这次工具调用写过的文件 */
function changedPaths(tool, ti) {
  if (/^(Write|Edit|MultiEdit)$/.test(tool || "") && ti.file_path) return [ti.file_path]
  const patch = Object.values(ti).find((v) => typeof v === "string" && v.includes("*** Begin Patch"))
  if (!patch) return []
  return [...patch.matchAll(/^\*\*\* (?:Add File|Update File|Move to): (.+)$/gm)].map((m) => m[1].trim())
}
