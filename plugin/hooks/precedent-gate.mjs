#!/usr/bin/env node
// 设计先例 / 方案图关卡（design 插件；2026-11-07 从 Su Design 的 su-design 插件搬来，技能改名 design）。
// 用户 2026-10-08：「Mobbin 看人家优秀的设计将作为强制性流程。必须先看人家的排版和页面布局的细节、交互逻辑，
// 你才能自己基于我们的组件库来挑选合适的组件或者布局或者模板来生成」；同日：「看完 mcp 这边，记得先画线框图。然后评审，
// 再将对应的组件填入线框图内，替换掉」。2026-11-02 线框换成 stageshow 方案图：「画线框图的流程可以去掉了……你就按照我们 STAGESHOW 的 skill 来」
// 「把这个 skill 也内化到我的 su-design 里……一切都以他为准」。
// 起因：短链项目的会话从没加载 su-design 技能，只在规划时搜过一次 Mobbin，几小时后照模板拼出了「标题复述按钮、筛选被拉到两端、
// KPI 夹在筛选和表格之间」的首页。技能里写「必做」拦不住，所以在写文件这一步拦。
//
// 第一道（先例）：使用方项目里（package.json 依赖 @heroui/react，或 components.json 引了 @su 的旧项目）改界面文件，本会话还没有
//   ① 读过 design 技能的设计总纲 DESIGN.md（首尾两行出现在任意读取结果里即可，27KB 可能分几次读），
//      从头到尾读过 references/rules.md 和一份流程（mockup / build / polish / motion / connect，或 methods/stageshow/SKILL.md），
//   ② 至少 2 次成功的 Mobbin search_screens、合计 ≥ 10 张图。
//   ① 认读文件的工具结果，不认技能名（原先调用技能失败、命令里只提到路径也算读过）。2026-11-07 起只有一个自动分流的技能，没有手动入口。
// 第二道（布局手册 + 方案图）：使用方项目里新建页面（新文件、≥ 3 个 JSX 标签）或整页改版（排版记号增删 ≥ 20），
//   ① 本会话还没从头到尾读过 references/layout.md（2026-11-06 盲评后写的布局手册：姿态、三版骨架、形状、区域 → 组件、披露、因果、预算），方案图本身也要先读；
//   ② 本会话还没做过方案图（没写过含 <Stage 的代码），而且目标文件不在方案图目录里（祖先目录有 kit/stageshow.css 的就是方案图本身）。
// 第三道（设计法则 + 监工，用户 2026-11-07）：同样的真页面（不是方案图），
//   ① 本会话还没从头到尾读过 methods/better-layout 与 better-writing 的 SKILL.md（11-07 实测：做页面的会话一份设计法则都没读）；
//   ② Claude Code 主会话：还没起过监工（Agent 工具，subagent_type 为 design:supervisor），或上一块真页面写完之后没再叫过它（起它或 SendMessage 给它）；
//      Codex 和子智能体里起不了子智能体：还没从头到尾读过插件的 agents/supervisor.md（照它自审）。放行时记下这一块，体验关卡（ux-gate，收尾前）接着用。
//   用户说过「跳过监工」只放监工那一项。
// 不拦：不是使用方项目；不是界面文件；components/ui（旧项目装进来的 @su 组件，换 HeroUI 时整个删）；只改逻辑、不动排版的编辑
//   （前后的 JSX 标签、className、样式类与 style 完全一样）；技能自带的文件（skills/<名字>/assets、methods）；
//   用户在本会话亲口说过「跳过先例」（两道都放）或「跳过方案图」「跳过线框」（只放方案图那一项，布局手册照读）；
//   读不到会话记录（无法判定时放行，免得把会话卡死）。
// Claude Code 与 Codex 共用：Claude 的 Write / Edit / MultiEdit，Codex 的 apply_patch，以及两边的 Bash 里写界面文件的命令
// （sed -i、重定向、tee、cp / mv 目标、脚本里写文件调用的目标路径；2026-10-08 实测被拦的会话提出过「换一种方式改」）；拦截 = 退出码 2 + stderr。
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { homedir, tmpdir } from "node:os"
import { basename, dirname, extname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { AGENTS, agentTrail, isCodex, readStamp, transcriptFiles, userSaid, writeStamp } from "./lib/trail.mjs"

const NEED_SEARCHES = 2
const NEED_IMAGES = 10
const BIG_DELTA = 20
const UI_EXT = new Set([".tsx", ".jsx", ".vue", ".svelte", ".astro", ".html", ".css", ".scss"])
const SKIP_PATH = /(^|\/)(node_modules|dist|build|\.next|coverage)\/|(^|\/)components\/ui\/|(^|\/)skills\/[^/]+\/(assets|methods)\/|\.(test|spec|stories)\.[jt]sx?$|\.d\.ts$/
const UI_FILE = String.raw`(['"\x60]?)([^\s'"\x60|;&<>]+\.(?:tsx|jsx|vue|svelte|astro|html|css|scss))\1`
const STRING = /(?<!\w)[rbfuRBFU]{0,2}(['"`])(?:\\.|(?!\1)[^\\])*\1/g
/** 模板字符串的 ${…}、f-string 的 {…} 折成 {}：里面的引号、括号不算路径（2026-10-16 `${root.split("/").pop()}.css` 被认成 ").pop()}.css"） */
const flatten = (s) => {
  const [, pre, q] = s.match(/^([rbfuRBFU]{0,2})(['"`])/)
  const holes = /\$?\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g
  return q === "`" ? s.replace(holes, (h) => (h[0] === "$" ? "{}" : h)) : /f/i.test(pre) ? s.replace(holes, "{}") : s
}
const PATH_STRING = new RegExp(String.raw`^[rbfuRBFU]{0,2}${UI_FILE}$`)
const REF_PATH = "design/references/"
const STAGESHOW_PATH = "design/methods/stageshow/"
const CHARTER_PATH = "design/DESIGN.md"
/** 工具调用的参数里提到这些路径，才去看它的结果（技能目录、总纲；仓库根的 DESIGN.md 也算） */
const TRACK = /design\/(references|methods\/(stageshow|better-layout|better-writing))\/|DESIGN\.md/
/** 写真页面前要读完的设计法则（用户 2026-11-07：「很多设计法则、人家现成的 skill 让你去参考，你也不去参考，自己在那里乱搞」） */
const METHODS = ["better-layout", "better-writing"].map((m) => `design/methods/${m}/SKILL.md`)
const SKILLS = join(dirname(fileURLToPath(import.meta.url)), "../skills")
const FLOWS = ["mockup.md", "build.md", "polish.md", "motion.md", "connect.md"].map((f) => REF_PATH + f).concat(STAGESHOW_PATH + "SKILL.md")
/** 读全一份文件的凭据：它的首行和末行都出现在同一次读取的结果里 */
const proof = (path) => { const lines = readFileSync(join(SKILLS, path), "utf8").split("\n").map((l) => l.trim()).filter(Boolean); return [lines.find((l) => l !== "---"), lines.at(-1)] } // 带 frontmatter 的文件首行是 ---，取它后面那行
/** 总纲的凭据：YAML 里的 name 行（「version: alpha」别的 DESIGN.md 也有）和末行 */
const charterProof = () => { const lines = readFileSync(join(SKILLS, CHARTER_PATH), "utf8").split("\n").map((l) => l.trim()).filter(Boolean); return [lines.find((l) => /^name:/.test(l)), lines.at(-1)] }

let input = {}
try { input = JSON.parse(readFileSync(0, "utf8") || "{}") } catch { process.exit(0) }
const cwd = input.cwd || process.cwd()

const targets = collectTargets(input.tool_name, input.tool_input || {})
  .map((t) => ({ ...t, path: resolve(cwd, t.path) }))
  .filter((t) => UI_EXT.has(extname(t.path)) && !SKIP_PATH.test(t.path))
  .map((t) => ({ ...t, kind: suProject(dirname(t.path)) }))
  .filter((t) => t.kind && (t.shell || extname(t.path).startsWith(".css") || extname(t.path) === ".scss" || layoutSig(t.before) !== layoutSig(t.after)))
if (!targets.length) process.exit(0)

const files = transcriptFiles(input)
if (!files.length) process.exit(0)
const sessionId = input.session_id || ""
const stampFile = (name) => join(tmpdir(), "design-gate", `${sessionId.replace(/[^\w-]/g, "_")}.${name}`)
const stamped = (name) => sessionId && existsSync(stampFile(name))
const stamp = (name) => { if (!sessionId) return; mkdirSync(join(tmpdir(), "design-gate"), { recursive: true }); writeFileSync(stampFile(name), new Date().toISOString()) }
const userSkipped = (re) => files.some((p) => readFileSync(p, "utf8").split("\n").some((line) => re.test(line) && userSaid(line, re)))
const names = (list) => list.map((t) => basename(t.path)).join("、")

let seen
const scanned = () => (seen ??= scan(files))

// 第一道：先例
if (!stamped("precedent")) {
  scanned()
  if (seen.charter && seen.rules && seen.flow && seen.searches >= NEED_SEARCHES && seen.images >= NEED_IMAGES) stamp("precedent")
  else if (!userSkipped(/跳过先例/)) {
    const missing = [
      !seen.charter && "还没读完设计总纲（design 技能的 DESIGN.md，开头到末行）",
      !seen.rules && "还没从头到尾读过 design 技能的 references/rules.md",
      seen.rules && !seen.flow && "还没读这次的流程（design 技能 references/ 里的 mockup、build、polish、motion、connect 之一，或 methods/stageshow/SKILL.md，从头读到尾）",
      seen.searches < NEED_SEARCHES && `Mobbin 只搜了 ${seen.searches} 次（至少整页一次 + 每个部件一次）`,
      seen.images < NEED_IMAGES && `只看了 ${seen.images} 张先例图（至少 ${NEED_IMAGES} 张）`,
    ].filter(Boolean)
    process.stderr.write(
      `设计先例关卡：要改的是界面（${names(targets)}），但本会话：${missing.join("；")}。\n` +
      "先加载 design 技能，把它指的 DESIGN.md、references/rules.md 和这次的流程从头读到尾；" +
      "再用 Mobbin search_screens 搜同任务的整页（web；有移动端再搜 ios），再给每个部件、做完之后的那一屏各搜一次，" +
      "每张图都看；写出「先例拆解」表和「共性 → 我们的做法」，再照流程往下做。没有 Mobbin 工具就停下告诉用户，不要绕过。\n" +
      "只改逻辑、不动排版的编辑（标签、className、样式不变）不受此限；用户明确不要先例流程时，请用户说一句「跳过先例」。不要用 shell 命令绕过。\n",
    )
    process.exit(2)
  }
}

// 第二道：布局手册 + 方案图（只查使用方项目里的新页面与整页改版；方案图本身也要先读布局手册）
const big = targets.filter((t) => t.kind === "consumer" && isBig(t))
const needMockup = big.filter((t) => !t.after.includes("<Stage") && !inScene(t.path))
const missLayout = big.length && !stamped("layout") && !(scanned().layout && (stamp("layout"), true))
const missMockup = needMockup.length && !stamped("mockup") && !(madeMockup(files) && (stamp("mockup"), true))
const skipAll = (missLayout || missMockup) && userSkipped(/跳过先例/)
const skipMockup = missMockup && !skipAll && userSkipped(/跳过方案图|跳过线框/)
if (!skipAll && (missLayout || (missMockup && !skipMockup))) {
  const list = names(missLayout ? big : needMockup)
  process.stderr.write(
    `设计方案图关卡：${list} 是新页面或整页改版，本会话还没${[missLayout && "从头到尾读过布局手册（design 技能 references/layout.md）", missMockup && !skipMockup && "做方案图"].filter(Boolean).join("，也还没")}。\n` +
    (missLayout ? "先读 layout.md，照 mockup.md 2.5 写出六样：姿态、三版骨架（选哪版、为什么）、数据画成什么形状、每个区域用哪个组件、披露分几层、每个动作画面怎么变。\n" : "") +
    (missMockup && !skipMockup
      ? "再照 references/mockup.md 用 stageshow 做方案图：把 design 技能的 methods/stageshow/kit/ 拷进项目的 design/<这件事>/kit/，用 <Stage> 搭出像真产品的画面（主任务一段动画、其余静图）；" +
        "舞台里的控件用项目自己的 HeroUI 组件和样式入口。" +
        "和先例并排评审，通过后再照 build.md 写真页面。用户明确不要方案图时，请用户说一句「跳过方案图」。\n"
      : ""),
  )
  process.exit(2)
}

// 第三道：设计法则 + 监工（用户 2026-11-07：监工「对每一个操作细节和交互做审核……目的就是不让做设计的智能体偷懒」）。
// 只查真页面（新页面、整页改版，不是方案图）。Claude Code 主会话：第一次写之前起过 design:supervisor，之后每写一块之前，
// 上一块写完以后至少再叫过它一次（起它或 SendMessage 给它）。Codex 与子智能体起不了子智能体：读完 agents/supervisor.md 照它自审。
if (needMockup.length && !skipAll) {
  const methods = scanned().methods
  const selfReview = isCodex(files) || Boolean(input.agent_id)
  const sup = agentTrail(files, "supervisor"), ux = agentTrail(files, "ux")
  const last = readStamp(sessionId, "page")
  const supOk = userSkipped(/跳过监工/) || (selfReview ? sup.reads > 0 : sup.calls > (last?.sup ?? 0))
  if (!methods || !supOk) {
    const missing = [
      !methods && "还没从头到尾读过 better-layout 和 better-writing（design 技能 methods/ 下的两份 SKILL.md）",
      !supOk && (selfReview ? "还没读完监工的清单" : last ? `上一块（${last.files.join("、")}）写完还没送监工看` : "还没起监工"),
    ].filter(Boolean)
    process.stderr.write(
      `设计监工关卡：${names(needMockup)} 是真页面，本会话${missing.join("；")}。\n` +
      (!methods ? "先从头读 design 技能的 methods/better-layout/SKILL.md 和 methods/better-writing/SKILL.md（布局与文案的法则），写的时候照它们。\n" : "") +
      (!supOk
        ? selfReview
          ? `这里起不了子智能体：从头读 ${join(AGENTS, "supervisor.md")}，照它逐处自审每一块（汇报里标「自审」）。\n`
          : "写真页面时监工一直开着（build.md 第 5 步）：第一次用 Agent 工具起 design:supervisor，把功能清单、2.5 的六样和方案图给它，先审组件；" +
            "之后每写完一块就 SendMessage 告诉它「写好了 <文件>」，照它交回的表改完再写下一块。用户明确不要监工时，请用户说一句「跳过监工」。\n"
        : ""),
    )
    process.exit(2)
  }
  writeStamp(sessionId, "page", { sup: sup.calls, ux: ux.calls, uxReads: ux.reads, files: needMockup.map((t) => basename(t.path)) })
}
process.exit(0)

/** 新页面（新文件且 ≥ 3 个 JSX 标签）或整页改版（排版记号增删 ≥ 20） */
function isBig(t) {
  if (t.before === "") return (t.after.match(/<[A-Za-z][\w.]*/g) || []).length >= 3
  const a = layoutTokens(t.before), b = layoutTokens(t.after)
  const count = (list) => list.reduce((m, k) => m.set(k, (m.get(k) || 0) + 1), new Map())
  const ca = count(a), cb = count(b)
  let delta = 0
  for (const k of new Set([...a, ...b])) delta += Math.abs((ca.get(k) || 0) - (cb.get(k) || 0))
  return delta >= BIG_DELTA
}

/** 目标文件在 stageshow 方案图目录里（往上三层内有 kit/stageshow.css）：它就是方案图本身，不拦 */
function inScene(path) {
  for (let d = dirname(path), i = 0; i < 4; i++, d = dirname(d)) if (existsSync(join(d, "kit", "stageshow.css"))) return true
  return false
}

/** 本会话做过方案图：工具调用的输入里出现 <Stage（只认工具调用，不认正文和技能） */
function madeMockup(paths) {
  for (const p of paths) {
    for (const line of readFileSync(p, "utf8").split("\n")) {
      if (!line.includes("<Stage")) continue
      let d
      try { d = JSON.parse(line) } catch { continue }
      const content = d?.message?.content
      if (Array.isArray(content) && content.some((c) => c.type === "tool_use" && JSON.stringify(c.input ?? "").includes("<Stage"))) return true
      const pl = d?.payload
      if (pl && /function_call|custom_tool_call/.test(pl.type || "") && JSON.stringify(pl.arguments ?? pl.input ?? "").includes("<Stage")) return true
    }
  }
  return false
}

/** 一次工具调用要写的文件：{ path, before, after }；before / after 只取被改的那段 */
function collectTargets(tool, ti) {
  if (tool === "Write" && ti.file_path) {
    const p = resolve(cwd, ti.file_path)
    return [{ path: ti.file_path, before: existsSync(p) ? readFileSync(p, "utf8") : "", after: ti.content || "" }]
  }
  if (tool === "Edit" && ti.file_path) return [{ path: ti.file_path, before: ti.old_string || "", after: ti.new_string || "" }]
  if (tool === "MultiEdit" && ti.file_path) {
    const edits = ti.edits || []
    return [{ path: ti.file_path, before: edits.map((e) => e.old_string || "").join("\n"), after: edits.map((e) => e.new_string || "").join("\n") }]
  }
  const patch = Object.values(ti).find((v) => typeof v === "string" && v.includes("*** Begin Patch"))
  if (patch) return parsePatch(patch)
  if (tool === "Bash" && typeof ti.command === "string") return shellWrites(ti.command)
  return []
}

/** Bash 里写界面文件的目标（看不到前后内容，before 记成空、after 记成命令，按改排版处理）。
 *  重定向、tee、sed -i、cp / mv 只在 shell 这一层找；脚本里的写文件调用另看 scriptWrites */
function shellWrites(cmd) {
  const sh = shellText(cmd)
  const steps = cdSteps(sh)
  const at = (m) => resolve(dirAt(steps, m.index), m[2])
  const hits = [
    ...[...sh.matchAll(new RegExp(String.raw`(?:>>?|\btee(?:\s+-a)?)\s*` + UI_FILE, "g"))].map(at),
    ...(/\b(sed|perl)\b[^|;&]*\s-[a-z]*i/.test(sh) ? [...sh.matchAll(new RegExp(String.raw`\s` + UI_FILE + String.raw`(?=\s*(?:$|[|;&]))`, "gm"))].map(at) : []),
    ...[...sh.matchAll(new RegExp(String.raw`\b(?:cp|mv)\b(?:[^|;&\n]|\\\n)*\s` + UI_FILE + String.raw`(?=\s*(?:$|[|;&]))`, "gm"))].map(at), // 目标只在同一行（含 \ 续行）找
    ...scriptWrites(cmd).map((p) => resolve(dirAt(steps, Infinity), p)), // 脚本在最后一次 cd 之后运行（脚本自己 chdir 的不管）
  ]
  return [...new Set(hits)].map((path) => ({ path, before: "", after: cmd, shell: true }))
}

/** shell 这一层的 cd / pushd：[{ at, dir }]，相对路径接着上一次算；目标取不到（cd -、cd "$X"）就当没换。
 *  相对路径按写入那一刻所在的目录算（2026-11-07 第四轮：会话先 cd 进方案图的 kit/，再「cd 项目 && cat > src/pages/y-design/main.tsx」，
 *  原先按会话目录拼成 kit/src/pages/…，认不出它在方案图目录里，误当真页面拦下；反过来从项目外 cd 进去写真页面会漏拦） */
function cdSteps(sh) {
  const steps = []
  let dir = cwd
  for (const m of sh.matchAll(/(?:^|[;&|(\n]|\b(?:do|then)\b)\s*(?:builtin\s+)?(?:cd|pushd)(?:\s+--)?\s+(?:(['"])([^'"\n]*)\1|([^\s;&|)]+))/g)) {
    const raw = m[2] ?? m[3]
    if (raw === "-" || raw.includes("$") || raw.includes("`")) continue
    dir = resolve(dir, raw === "~" ? homedir() : raw.replace(/^~(?=\/)/, homedir()))
    steps.push({ at: m.index + m[0].length, dir })
  }
  return steps
}
function dirAt(steps, at) { return steps.filter((s) => s.at <= at).at(-1)?.dir ?? cwd }

/** 命令里 shell 自己执行的那一层。heredoc 正文、python -c / node -e 的脚本是数据，去掉：
 *  2026-10-16 heredoc 里的 JS 箭头 `=> "web/src/styles/app.css"` 被当成重定向 `> app.css` 拦下。
 *  本身就是 shell 命令的 heredoc 留下：喂给 bash / sh / zsh 的（含 | bash），写进 .sh 文件的（之后多半会运行它） */
function shellText(cmd) {
  const shell = String.raw`(?:(?:sudo|env|exec|command|nohup|time)\s+(?:-\S+\s+|\w+=\S*\s+)*)*(?:\S*/)?(?:bash|sh|zsh)\b` // 可带路径和 sudo / env 前缀
  const isScript = (head, rest) =>
    new RegExp(String.raw`(?:^|[;&|(]|\b(?:do|then)\b)\s*(?:\w+=\S*\s+)*${shell}[^;&|]*$`).test(head) ||
    new RegExp(String.raw`\|\s*${shell}`).test(rest) ||
    /\.(?:sh|bash|zsh)\b/.test(head + rest)
  return cmd
    .replace(/^([^\n]*?)<<-?\s*(['"]?)(\w+)\2([^\n]*)\n(?:([\s\S]*?)\n)??[ \t]*\3[ \t]*(?=\n|$)/gm, (_m, head, _q, _tag, rest, body = "") =>
      isScript(head, rest) ? `${head}${rest}\n${body}` : head + rest)
    .replace(/(\b(?:python3?|node|bun|deno|perl|ruby)\b[^|;&\n]*?\s-(?:c|e|p|-eval)\s+)(['"])(?:\\[\s\S]|(?!\2)[\s\S])*\2/g, "$1")
}

/** 脚本（node -e、python heredoc…）里写文件的目标：只认写入调用的路径参数，和它用到的变量在命令里的赋值。
 *  脚本里别的字符串不算：2026-10-16 一段 python heredoc 改 scripts/static-gate-audit.mjs，替换进去的用例里写着 e.css、app.css，
 *  原先只要命令里有 open(…'w') / .write( 就把这些都当成写入目标，拦了下来。 */
function scriptWrites(cmd) {
  const isMode = (a = "") => /^\s*(?:mode\s*=\s*)?\\?['"][rbt+]*[wax][rbt+]*\\?['"]\s*$/.test(a)
  const exprs = []
  for (const m of cmd.matchAll(/\b(?:(?:writeFile|appendFile)(?:Sync)?|createWriteStream|Bun\.write|open)\s*\(|\.write_text\s*\(/g)) {
    const args = segments(cmd, m.index + m[0].length)
    if (m[0].startsWith(".")) exprs.push(receiver(cmd, m.index))
    else if (!m[0].startsWith("open")) exprs.push(args[0])
    else if (isMode(args[0]) && cmd[m.index - 1] === ".") exprs.push(receiver(cmd, m.index - 1)) // Path(…).open("w")
    else if (args.slice(1).some(isMode)) exprs.push(args[0])
  }
  return exprs.flatMap((e) => pathsIn(e, cmd, new Set()))
}

/** 路径表达式里的界面文件。变量（p、out、$OUT、f"{root}/x" 里的 root）顺着命令里的定义再找，最多三层：
 *  赋值（p = …、p, q = …）、for 循环（for p, pairs in edits.items()、for (const [file, reps] of specs)）、
 *  函数参数（def edit(p, pairs) → 每处 edit('x.tsx', …) 的同一位置）；右边按括号配平读到语句结束，跨行的字典、列表也读全。
 *  路径取自命令行参数（sys.argv、process.argv）时，看 shell 这一层里运行脚本的那条命令（python / node / bun / deno 开头）的参数，
 *  "$f" 照样顺着 for 循环、赋值找 */
function pathsIn(expr = "", cmd, seen, depth = 0) {
  const flat = expr.replace(STRING, flatten)
  // root + '/registry/…'：拼上 root 在命令里的字面量取值；取不到（os.getcwd() 之类）就按 cwd 下的相对路径算
  const found = [...flat.matchAll(new RegExp(UI_FILE, "g"))].flatMap((m) => {
    const id = m[2].startsWith("/") && flat.slice(0, m.index).match(/([A-Za-z_]\w*)\s*\+\s*$/)?.[1]
    if (!id) return [m[2]]
    const roots = literalsOf(id, cmd)
    return roots.length ? roots.map((r) => r.replace(/\/+$/, "") + m[2]) : [m[2].slice(1)]
  })
  if (depth >= 3) return found
  const more = (text) => found.push(...pathsIn(text, cmd, seen, depth + 1))
  // 字符串里的变量也顺着找；本身就是界面文件路径的字符串（`/tmp/out-${name}.css`）除外：路径已经认出来了，变量只是其中一段
  const code = expr.replace(STRING, (s) => (PATH_STRING.test(flatten(s)) ? "" : (s.match(/\{[^}]*\}|\$\w+/g) || []).join(" ")))
  if (/\bargv\b/.test(code) && !seen.has("argv")) {
    seen.add("argv")
    more(shellText(cmd).split(/[;\n|&]+|\b(?:do|then)\b/).filter((c) => /^\s*(?:\w+=\S*\s+)*(?:python3?|node|bun|deno)\b/.test(c)).join("\n"))
  }
  for (const [id] of code.matchAll(/(?<![\w.])[A-Za-z_]\w*/g)) {
    if (seen.has(id)) continue
    seen.add(id)
    for (const m of cmd.matchAll(new RegExp(String.raw`(?<![\w.$])${id}\s*(?:[,\])][\w\s,()[\]]*)?=(?![=>])`, "g"))) more(segments(cmd, m.index + m[0].length, "\n;").join())
    for (const m of cmd.matchAll(/\bfor\s*\(?\s*(?:const|let|var)?\s*([\w\s,()[\]{}]*?)\s+(?:in|of)\s/g)) {
      if (new RegExp(String.raw`(?<![\w$])${id}(?![\w$])`).test(m[1])) more(segments(cmd, m.index + m[0].length, "\n;:").join())
    }
    for (const m of cmd.matchAll(/\b(?:def|function)\s+([A-Za-z_]\w*)\s*\(|\b([A-Za-z_]\w*)\s*=\s*(?:async\s*)?(?:function\s*)?\(/g)) {
      const k = segments(cmd, m.index + m[0].length).map((a) => a.trim().replace(/^[*.]+/, "").split(/[\s=:]/)[0]).indexOf(id)
      if (k < 0) continue
      for (const c of cmd.matchAll(new RegExp(String.raw`(?<![\w.])(?<!\b(?:def|function)\s+)${m[1] || m[2]}\s*\(`, "g"))) more(segments(cmd, c.index + c[0].length)[k])
    }
  }
  return found
}

/** 变量在命令里的字符串取值：赋值右边、for 循环列表里的字面量（拼路径时当前缀） */
function literalsOf(id, cmd) {
  const strs = (text) => [...text.matchAll(/(['"])((?:\\.|(?!\1)[^\\\n])*)\1/g)].map((m) => m[2])
  return [
    ...[...cmd.matchAll(new RegExp(String.raw`(?<![\w.$])${id}\s*=(?![=>])`, "g"))].flatMap((m) => strs(segments(cmd, m.index + m[0].length, "\n;").join())),
    ...[...cmd.matchAll(new RegExp(String.raw`\bfor\s*\(?\s*(?:const|let|var)?\s*${id}\s+(?:in|of)\s`, "g"))].flatMap((m) => strs(segments(cmd, m.index + m[0].length, "\n;:").join())),
  ]
}

/** 从 start 起按顶层逗号切段，遇到没配对的右括号、或顶层出现 stops 里的字符就停。
 *  字符串整段跳过：三引号、反斜杠转义；单行引号遇到换行算断（注释里的撇号不会吞掉后面的代码） */
function segments(s, start, stops = "") {
  const out = []
  let cur = "", depth = 0
  for (let i = start; i < s.length; i++) {
    const c = s[i]
    if (c === "'" || c === '"' || c === "`") {
      const q = c !== "`" && s.startsWith(c.repeat(3), i) ? c.repeat(3) : c
      let j = i + q.length
      while (j < s.length && !s.startsWith(q, j) && !(q === c && c !== "`" && s[j] === "\n")) j += s[j] === "\\" ? 2 : 1
      const end = s[j] === "\n" ? j : Math.min(j + q.length, s.length)
      cur += s.slice(i, end)
      i = end - 1
      continue
    }
    if (c === "\\") { cur += c + (s[++i] ?? ""); continue }
    if ("([{".includes(c)) depth++
    else if (")]}".includes(c) && !depth--) break
    else if (!depth && stops.includes(c)) break
    else if (c === "," && !depth) { out.push(cur); cur = ""; continue }
    cur += c
  }
  return [...out, cur]
}

/** 方法调用前面的对象：Path("x.css").write_text( 里的 Path("x.css")、p.write_text( 里的 p */
function receiver(s, dot) {
  let i = dot
  while (i > 0) {
    const c = s[i - 1]
    if (c === ")" || c === "]") {
      let depth = 0
      do { const d = s[--i]; if (d === ")" || d === "]") depth++; else if (d === "(" || d === "[") depth-- } while (depth && i > 0)
    } else if (/[\w.$]/.test(c)) i--
    else break
  }
  return s.slice(i, dot)
}

/** Codex apply_patch：*** Add File / *** Update File 段里的 + / - 行 */
function parsePatch(text) {
  const out = []
  let cur = null
  for (const line of text.split("\n")) {
    const head = line.match(/^\*\*\* (Add|Update|Delete) File: (.+)$/)
    if (head) {
      cur = head[1] === "Delete" ? null : { path: head[2].trim(), before: "", after: "" }
      if (cur) out.push(cur)
      continue
    }
    if (!cur || line.startsWith("***") || line.startsWith("@@")) continue
    if (line.startsWith("+")) cur.after += line.slice(1) + "\n"
    else if (line.startsWith("-")) cur.before += line.slice(1) + "\n"
  }
  return out
}

/** 排版记号：JSX 标签、className / style 出现次数、带连字符的类名与属性名（Tailwind 类都在这里）。前后相同 = 只动了逻辑 */
function layoutTokens(s) {
  return [
    ...[...s.matchAll(/<([A-Za-z][\w.]*)/g)].map((m) => "<" + m[1]),
    ...[...s.matchAll(/\b(className|class|style)=/g)].map((m) => m[1] + "="),
    ...[...s.matchAll(/(?<![\w$])-?[a-z][a-z0-9]*(?:-[a-z0-9.\/\[\]%#()]+)+/g)].map((m) => m[0]),
    ...[...s.matchAll(/["'`\s](flex|grid|hidden|block|inline|contents|truncate|sticky|fixed|absolute|relative|container)(?=["'`\s])/g)].map((m) => m[1]),
  ].sort()
}
function layoutSig(s) { return layoutTokens(s).join(" ") }

/** 向上找使用方项目（"consumer"：依赖 @heroui/react，或引了 @su 的旧项目），遇到 git 根就停 */
function suProject(dir) {
  for (let d = dir, i = 0; i < 12; i++, d = dirname(d)) {
    const pj = join(d, "package.json")
    if (existsSync(pj) && /"@heroui\/react"\s*:/.test(readFileSync(pj, "utf8"))) return "consumer"
    const cj = join(d, "components.json")
    if (existsSync(cj) && /@su\b/.test(readFileSync(cj, "utf8"))) return "consumer"
    if (existsSync(join(d, ".git")) || dirname(d) === d) return false
  }
  return false
}

/** 只认结构化的工具调用和它的结果，不认正文里提到的名字和路径（本关卡的提示里就有这些字） */
function scan(paths) {
  const seen = { charter: false, rules: false, flow: false, layout: false, methods: false, searches: 0, images: 0 }
  const calls = new Map() // Mobbin 调用 → 图数
  const codexCalls = new Set() // 其中 Codex function_call 记下的那些
  const codexItems = new Map() // Codex 跑完的 McpToolCall → 图数（code-mode 里嵌套的调用只有这一条记录）
  const reads = new Set() // 读 references/ 的调用
  const rules = proof(REF_PATH + "rules.md"), layout = proof(REF_PATH + "layout.md"), flows = FLOWS.map(proof), methods = METHODS.map(proof)
  const methodRead = methods.map(() => false)
  const [charterHead, charterTail] = charterProof()
  let head = false, tail = false
  const readAll = (out) => {
    const t = textOf(out)
    if (t.includes(charterHead)) head = true
    if (t.includes(charterTail)) tail = true
    if (head && tail) seen.charter = true
    if (rules.every((l) => t.includes(l))) seen.rules = true
    if (layout.every((l) => t.includes(l))) seen.layout = true
    if (flows.some((f) => f.every((l) => t.includes(l)))) seen.flow = true
    methods.forEach((m, i) => { if (m.every((l) => t.includes(l))) methodRead[i] = true })
    seen.methods = methodRead.every(Boolean)
  }
  for (const p of paths) {
    for (const line of readFileSync(p, "utf8").split("\n")) {
      // 大多数行与本关卡无关；只解析提到 mobbin / references 的行，和已记下的调用的返回
      if (!line.includes("mobbin") && !line.includes(REF_PATH) && !line.includes(STAGESHOW_PATH) && !line.includes("design/methods/better-") && !line.includes("DESIGN.md") && ![...calls.keys(), ...reads].some((id) => id && line.includes(id))) continue
      let d
      try { d = JSON.parse(line) } catch { continue }
      // Claude Code：assistant 的 tool_use，user 的 tool_result
      const content = d?.message?.content
      if (Array.isArray(content)) {
        for (const c of content) {
          if (c.type === "tool_use" && /mobbin/i.test(c.name) && /search_screens/.test(c.name)) calls.set(c.id, 0)
          if (c.type === "tool_use" && TRACK.test(JSON.stringify(c.input ?? ""))) reads.add(c.id)
          if (c.type === "tool_result" && !c.is_error && calls.has(c.tool_use_id)) {
            const n = Array.isArray(c.content) ? c.content.filter((x) => x.type === "image").length : 0
            calls.set(c.tool_use_id, n || -1)
          }
          if (c.type === "tool_result" && !c.is_error && reads.has(c.tool_use_id)) readAll(c.content)
        }
      }
      // Codex：function_call / mcp / custom_tool_call 与各自的输出；命令跑完的 CommandExecution（exec_command_end）带退出码
      const pl = d?.payload
      if (pl && typeof pl === "object") {
        const name = pl.name || pl.tool || ""
        const call = /function_call|mcp_tool_call|custom_tool_call/.test(pl.type || "") && !/output/.test(pl.type || "")
        if (call && /mobbin/i.test(`${pl.server || ""}${name}`) && /search_screens/.test(name)) { calls.set(pl.call_id || pl.id, 0); codexCalls.add(pl.call_id || pl.id) }
        if (call && TRACK.test(JSON.stringify(pl.arguments ?? pl.input ?? ""))) reads.add(pl.call_id)
        if (/output/.test(pl.type || "") && calls.has(pl.call_id)) {
          const raw = JSON.stringify(pl.output ?? "")
          const n = (raw.match(/"type":"(input_)?image"/g) || []).length || (raw.match(/\.webp|\.png|\.jpe?g/g) || []).length
          calls.set(pl.call_id, n || -1)
        }
        if (/output/.test(pl.type || "") && reads.has(pl.call_id)) readAll(pl.output)
        const done = pl.type === "item_completed" && pl.item?.type === "CommandExecution" ? pl.item : pl.type === "exec_command_end" ? pl : null
        if (done && done.exit_code === 0) readAll(done.aggregated_output ?? done.stdout ?? "")
        const mcp = pl.type === "item_completed" && pl.item?.type === "McpToolCall" ? pl.item : null
        if (mcp && /mobbin/i.test(mcp.server || "") && /search_screens/.test(mcp.tool || "")) {
          const n = mcp.status === "completed" && !mcp.error ? (mcp.result?.content || []).filter((x) => /image/.test(x?.type || "")).length : 0
          codexItems.set(mcp.id, n || -1)
        }
      }
    }
  }
  // 同一次调用 Codex 可能两种记录都有：有 McpToolCall 就只数它
  if (codexItems.size) for (const id of codexCalls) calls.delete(id)
  for (const n of [...calls.values(), ...codexItems.values()]) if (n > 0) { seen.searches++; seen.images += n }
  return seen
}

/** 工具结果里的文字：字符串、{ type: text } 数组、Codex 包成 JSON 字符串的 { output } */
function textOf(v) {
  if (typeof v === "string") {
    if (!v.startsWith("{")) return v
    try { return textOf(JSON.parse(v)) } catch { return v }
  }
  if (Array.isArray(v)) return v.map(textOf).join("\n")
  return v && typeof v === "object" ? textOf(v.text ?? v.content ?? v.output ?? v.stdout ?? "") : ""
}
