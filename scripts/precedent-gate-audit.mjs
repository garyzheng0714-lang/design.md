// 先例 / 方案图关卡（plugin/hooks/precedent-gate.mjs）的用例审计：输出为空表示通过。
// 2026-10-08 起因：关卡脚本自己报错时退出码是 1，Claude Code 与 Codex 都当成「不拦」，等于悄悄失效（当天一次 const 先用后声明就把整个关卡变成了放行）。
// 用临时目录造两个使用方项目（web/components.json 引 @su 的旧项目、package.json 依赖 @heroui/react 的）和几份假会话记录，逐条喂给关卡，核对退出码（第四项给了就再核对提示里提到它）。
// 用法：node scripts/precedent-gate-audit.mjs
import { spawnSync } from "node:child_process"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

const GATE = resolve(process.env.GATE ?? "plugin/hooks/precedent-gate.mjs") // GATE：反证时指向改坏的副本
const root = mkdtempSync(join(tmpdir(), "design-gate-"))
const app = join(root, "app")
const pages = join(app, "web/src/pages")
mkdirSync(pages, { recursive: true })
mkdirSync(join(app, ".git"))
writeFileSync(join(app, "web/components.json"), JSON.stringify({ registries: { "@su": "https://su.xzzj.party/r/{name}.json" } }))
writeFileSync(join(pages, "create.tsx"), '<section className="mx-auto w-full max-w-xl"><CreateLink /></section>\n')
// stageshow 方案图目录：kit 拷在旁边（2026-11-02 线框换成方案图）
const scene = join(app, "web/design/orders")
mkdirSync(join(scene, "kit"), { recursive: true })
writeFileSync(join(scene, "kit/stageshow.css"), "@layer stageshow {}\n")
// HeroUI 项目（2026-11-06 起组件用 HeroUI，布局与流程照 design 技能）；旁边一个只用别的库的项目不查
const hero = join(root, "hero"), plain = join(root, "plain")
for (const [dir, deps] of [[hero, { "@heroui/react": "^3.2.7", "@heroui/styles": "^3.2.7" }], [plain, { "@mui/material": "^7.0.0" }]]) {
  mkdirSync(join(dir, "src/pages"), { recursive: true })
  mkdirSync(join(dir, ".git"))
  writeFileSync(join(dir, "package.json"), JSON.stringify({ name: "x", description: "not @heroui/react", dependencies: deps }))
  writeFileSync(join(dir, "src/pages/create.tsx"), '<section className="mx-auto w-full max-w-xl"><CreateLink /></section>\n')
}

const img = { type: "image", source: { type: "base64", media_type: "image/webp", data: "x" } }
const line = (o) => JSON.stringify(o)
// 读技能文件：Claude 的 Read 结果带行号；内容取仓库里的真文件，改了文件首末行也照样成立
const SKILL = resolve("plugin/skills/design")
const REFS = join(SKILL, "references")
const STAGESHOW = join(SKILL, "methods/stageshow")
const numbered = (t) => t.split("\n").map((l, i) => `${String(i + 1).padStart(6)}\t${l}`).join("\n")
const read = (id, file, { via = "Read", result = (t) => numbered(t), is_error = false, dir = REFS } = {}) => [
  line({ type: "assistant", message: { content: [{ type: "tool_use", id, name: via, input: via === "Read" ? { file_path: join(dir, file) } : { command: `cat ${join(dir, file)}` } }] } }),
  line({ type: "user", message: { content: [{ type: "tool_result", tool_use_id: id, content: result(readFileSync(join(dir, file), "utf8")), is_error }] } }),
]
const skillCall = line({ type: "assistant", message: { content: [{ type: "tool_use", id: "s1", name: "Skill", input: { skill: "design:design" } }] } })
// 设计总纲（2026-11-07 起也要读完；27KB 可能分几次读，首尾两行出现在任意读取结果里即可）
const charter = read("r0", "DESIGN.md", { dir: SKILL })
const skill = [skillCall, ...charter, ...read("r1", "rules.md"), ...read("r2", "polish.md")]
// Codex：命令跑完的 CommandExecution（parsed_cmd 是 read，退出码、输出都在同一条）
const codexRead = (file, { exit_code = 0, dir = REFS, cmd = `cat ${join(dir, file)}`, out = (t) => t } = {}) => line({
  type: "event_msg",
  payload: { type: "item_completed", item: { type: "CommandExecution", command: ["/bin/zsh", "-lc", cmd], parsed_cmd: [{ type: "read", path: join(dir, file) }], status: exit_code ? "failed" : "completed", exit_code, aggregated_output: out(readFileSync(join(dir, file), "utf8")) } },
})
const codexCharter = codexRead("DESIGN.md", { dir: SKILL })
const search = (n, imgs) => [
  line({ type: "assistant", message: { content: [{ type: "tool_use", id: `m${n}`, name: "mcp__mobbin__search_screens", input: { query: "q", platform: "web" } }] } }),
  line({ type: "user", message: { content: [{ type: "tool_result", tool_use_id: `m${n}`, content: Array(imgs).fill(img) }] } }),
]
const transcript = (name, rows) => { const p = join(root, `${name}.jsonl`); writeFileSync(p, rows.join("\n") + "\n"); return p }
const none = transcript("none", [line({ type: "user", message: { role: "user", content: "改一下页面" } })])
const thin = transcript("thin", [...skill, ...search(1, 6)])
const ok = transcript("ok", [...skill, ...search(1, 6), ...search(2, 6)])
const wired = transcript("wired", [...skill, ...search(1, 6), ...search(2, 6), line({ type: "assistant", message: { content: [{ type: "tool_use", id: "w1", name: "Write", input: { file_path: "x.tsx", content: '<Wire label="表" use="Table" />' } }] } })])
// 布局手册（2026-11-06）：新页面、整页改版、方案图本身都要先从头到尾读过 references/layout.md
const layout = read("r3", "layout.md")
const stageWrite = line({ type: "assistant", message: { content: [{ type: "tool_use", id: "w1", name: "Write", input: { file_path: "web/design/orders/hero.tsx", content: '<Stage width={1100} height={560} />' } }] } })
const laidOut = transcript("laid-out", [...skill, ...layout, ...search(1, 6), ...search(2, 6)])
const layoutHalf = transcript("layout-half", [...skill, ...read("r3", "layout.md", { result: (t) => numbered(t.slice(0, t.length / 2)) }), ...search(1, 6), ...search(2, 6)])
const staged = transcript("staged", [...skill, ...layout, ...search(1, 6), ...search(2, 6), stageWrite])
const stagedNoLayout = transcript("staged-no-layout", [...skill, ...search(1, 6), ...search(2, 6), stageWrite])
const skipMockup = transcript("skip-mockup", [...skill, ...layout, ...search(1, 6), ...search(2, 6), line({ type: "user", message: { role: "user", content: "这页很简单，跳过方案图" } })])
const skipMockupNoLayout = transcript("skip-mockup-no-layout", [...skill, ...search(1, 6), ...search(2, 6), line({ type: "user", message: { role: "user", content: "这页很简单，跳过方案图" } })])
const skipWire = transcript("skip-wire", [...skill, ...layout, ...search(1, 6), ...search(2, 6), line({ type: "user", message: { role: "user", content: "这页很简单，跳过线框" } })])
const skipAll = transcript("skip-all", [line({ type: "user", message: { role: "user", content: "就改这一行，跳过先例" } })])
const searched = [...search(1, 6), ...search(2, 6)]
const stageshowFlow = transcript("stageshow-flow", [...charter, ...read("r1", "rules.md"), ...read("r2", "SKILL.md", { dir: STAGESHOW }), ...searched])
const stageshowHead = transcript("stageshow-head", [...charter, ...read("r1", "rules.md"), ...read("r2", "SKILL.md", { dir: STAGESHOW, result: (t) => numbered(t.split("\n").slice(0, 3).join("\n")) }), ...searched])
const skillOnly = transcript("skill-only", [skillCall, ...searched])
const readFailed = transcript("read-failed", [...charter, ...read("r1", "rules.md", { is_error: true }), ...read("r2", "polish.md"), ...searched])
const readHalf = transcript("read-half", [...charter, ...read("r1", "rules.md", { result: (t) => numbered(t.slice(0, t.length / 2)) }), ...read("r2", "polish.md"), ...searched])
const pasted = transcript("pasted", [...charter, line({ type: "assistant", message: { content: [{ type: "text", text: readFileSync(join(REFS, "rules.md"), "utf8") + readFileSync(join(REFS, "polish.md"), "utf8") }] } }), ...searched])
const noFlow = transcript("no-flow", [...charter, ...read("r1", "rules.md"), ...searched])
// 总纲：没读、只读了开头、分两次读完（Read 的 offset / limit）、只出现在正文里
const noCharter = transcript("no-charter", [...read("r1", "rules.md"), ...read("r2", "polish.md"), ...searched])
const charterHead = transcript("charter-head", [...read("r0", "DESIGN.md", { dir: SKILL, result: (t) => numbered(t.slice(0, t.length / 2)) }), ...read("r1", "rules.md"), ...read("r2", "polish.md"), ...searched])
const charterSplit = transcript("charter-split", [...read("r0", "DESIGN.md", { dir: SKILL, result: (t) => numbered(t.slice(0, t.length / 2)) }), ...read("r9", "DESIGN.md", { dir: SKILL, result: (t) => numbered(t.slice(t.length / 2)) }), ...read("r1", "rules.md"), ...read("r2", "polish.md"), ...searched])
const charterPasted = transcript("charter-pasted", [line({ type: "assistant", message: { content: [{ type: "text", text: readFileSync(join(SKILL, "DESIGN.md"), "utf8") }] } }), ...read("r1", "rules.md"), ...read("r2", "polish.md"), ...searched])
const bashRead = transcript("bash-read", [...read("r0", "DESIGN.md", { dir: SKILL, via: "Bash", result: (t) => t }), ...read("r1", "rules.md", { via: "Bash", result: (t) => t }), ...read("r2", "motion.md", { via: "Bash", result: (t) => t }), ...searched])
const codexOk = transcript("codex-ok", [codexCharter, codexRead("rules.md"), codexRead("mockup.md"), ...searched])
const codexFailed = transcript("codex-failed", [codexCharter, codexRead("rules.md", { exit_code: 1 }), codexRead("mockup.md"), ...searched])
const codexMention = transcript("codex-mention", [codexCharter, codexRead("rules.md", { cmd: `ls ${join(REFS, "rules.md")}`, out: () => join(REFS, "rules.md") }), codexRead("mockup.md"), ...searched])
// Codex code-mode 里嵌套的 Mobbin 调用：只有一条 item_completed / McpToolCall（2026-10-16 实测的结构）
const codexSearch = (id, imgs, status = "completed") => line({
  type: "event_msg",
  payload: { type: "item_completed", item: { type: "McpToolCall", id, server: "mobbin", tool: "search_screens", arguments: { platform: "web", query: "q" }, status, result: { content: [{ type: "text", text: "{}" }, ...Array(imgs).fill({ type: "image", data: "x", mimeType: "image/webp" })] } } },
})
const codexLegacy = (id, imgs) => [
  line({ type: "response_item", payload: { type: "function_call", name: "mcp__mobbin__search_screens", call_id: id, arguments: "{}" } }),
  line({ type: "response_item", payload: { type: "function_call_output", call_id: id, output: Array(imgs).fill({ type: "input_image", image_url: "x" }) } }),
]
const codexRules = [codexCharter, codexRead("rules.md"), codexRead("polish.md")]
const codexMcp = transcript("codex-mcp", [...codexRules, codexSearch("c1", 6), codexSearch("c2", 6)])
const codexMcpFailed = transcript("codex-mcp-failed", [...codexRules, codexSearch("c1", 6), codexSearch("c2", 6, "failed")])
const codexMcpThin = transcript("codex-mcp-thin", [...codexRules, codexSearch("c1", 4), codexSearch("c2", 4)])
const codexBoth = transcript("codex-both", [...codexRules, ...codexLegacy("c1", 6), codexSearch("c1", 6)])
const writeAt = (t, path, content) => ({ session_id: `w${++n}`, transcript_path: t, cwd: app, tool_name: "Write", tool_input: { file_path: path, content } })
const gateEcho = transcript("gate-echo", [line({ type: "user", message: { content: [{ type: "tool_result", tool_use_id: "x", content: "设计先例关卡：……请用户说一句「跳过先例」" }] } })])

const PAGE = '<Page><PageHeader title="订单" /><FilterToolbar /><Table /></Page>'
const BIG_OLD = '<div className="grid gap-12 pt-10"><section className="grid gap-4"><h1 className="text-2xl font-semibold">生成短链</h1></section><section className="@container/data grid gap-6"><div className="flex flex-wrap items-center gap-2"><Select /><SearchField className="w-full @xl/data:ml-auto @xl/data:w-64" /></div></section></div>'
const BIG_NEW = '<Page width="wide"><PageHeader title="短链访问数据" actions={<Segmented items={x} />} /><MetricGroup><MetricCard /><MetricCard /></MetricGroup><LineChart className="h-64" /><Tabs><TabsList><TabsTrigger value="a" /></TabsList></Tabs></Page>'
let n = 0
const write = (t, file, content) => ({ session_id: `w${++n}`, transcript_path: t, cwd: app, tool_name: "Write", tool_input: { file_path: join(pages, file), content } })
const edit = (t, file, o, s) => ({ session_id: `e${++n}`, transcript_path: t, cwd: app, tool_name: "Edit", tool_input: { file_path: join(pages, file), old_string: o, new_string: s } })
const writeHero = (t, file, content, dir = hero) => ({ session_id: `h${++n}`, transcript_path: t, cwd: dir, tool_name: "Write", tool_input: { file_path: join(dir, "src/pages", file), content } })
const editHero = (t, o, s2) => ({ session_id: `h${++n}`, transcript_path: t, cwd: hero, tool_name: "Edit", tool_input: { file_path: join(hero, "src/pages/create.tsx"), old_string: o, new_string: s2 } })
const bash = (t, command) => ({ session_id: `b${++n}`, transcript_path: t, cwd: app, tool_name: "Bash", tool_input: { command } })
const patch = (t, body) => ({ session_id: `p${++n}`, transcript_path: t, cwd: app, tool_name: "apply_patch", tool_input: { command: `*** Begin Patch\n${body}\n*** End Patch` } })

const cases = [
  ["没加载技能就改排版", 2, edit(none, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["技能 + 1 次 Mobbin 6 张", 2, edit(thin, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["只改逻辑", 0, edit(none, "create.tsx", "const a = 1", "const a = 2")],
  ["components/ui 不查", 0, { ...edit(none, "x.tsx", "<a className=\"x\">", "<b className=\"y\">"), tool_input: { file_path: join(app, "web/src/components/ui/button.tsx"), old_string: "<a className=\"x\">", new_string: "<b className=\"y\">" } }],
  ["不是使用方项目不查", 0, { ...edit(none, "x.tsx", "<a className=\"x\">", "<b className=\"y\">"), cwd: "/", tool_input: { file_path: "/tmp/no-su/App.tsx", old_string: "<a className=\"x\">", new_string: "<b className=\"y\">" } }],
  ["用户说跳过先例", 0, edit(skipAll, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["只有关卡提示里出现「跳过先例」", 2, edit(gateEcho, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["Bash sed 改页面", 2, bash(none, "sed -i '' 's/max-w-xl/max-w-lg/' web/src/pages/create.tsx")],
  ["Bash cp 覆盖页面", 2, bash(none, "cp /tmp/new.tsx web/src/pages/create.tsx")],
  ["Bash 读文件", 0, bash(none, "grep -n max-w web/src/pages/create.tsx")],
  ["Bash 重定向写 .css", 2, bash(none, "echo ':root {}' >> web/src/styles/app.css")],
  ["Bash heredoc 写 .tsx", 2, bash(none, `cat <<'EOF' > web/src/pages/new.tsx\n<Page />\nEOF`)],
  ["Bash heredoc 写 .mjs，正文里有箭头和 .css", 0, bash(none, `cat > scripts/demo.mjs <<'JS'\nconst pick = (f) => "web/src/styles/app.css"\nJS`)],
  ["Bash python heredoc 正文里写着 cp … .tsx", 0, bash(none, `python3 - <<'EOF'\n# 下一步：cp web/src/pages/create.tsx web/src/pages/create.bak.tsx\nprint('ok')\nEOF`)],
  ["Bash node -e 脚本里有箭头和 .tsx", 0, bash(none, `node -e 'const f = (x) => "web/src/pages/create.tsx"; console.log(f())'`)],
  ["Bash perl -pi -e 改 .tsx", 2, bash(none, "perl -pi -e 's/max-w-xl/max-w-lg/' web/src/pages/create.tsx")],
  ["Bash 喂给 bash 的 heredoc 里重定向写 .css", 2, bash(none, `bash <<'EOF'\necho ':root {}' > web/src/styles/app.css\nEOF`)],
  ["Bash heredoc 经管道喂给 bash，里面 cp 到 .tsx", 2, bash(none, `cat <<'EOF' | bash\ncp /tmp/new.tsx web/src/pages/create.tsx\nEOF`)],
  ["Bash heredoc 喂给 sudo /bin/bash，里面 tee 写 .css", 2, bash(none, `sudo /bin/bash -s <<'EOF'\necho ':root {}' | tee web/src/styles/app.css\nEOF`)],
  ["Bash 空 heredoc 之后 sed -i 改 .tsx", 2, bash(none, `cat > /tmp/note.txt <<'EOF'\nEOF\nsed -i '' 's/max-w-xl/max-w-lg/' web/src/pages/create.tsx\npython3 - <<'EOF'\nprint('ok')\nEOF`)],
  ["Bash cp 到 .tsx，下一行读项目外的 .tsx", 2, bash(none, "cp /tmp/sheet.tsx web/src/pages/sheet.tsx\ngrep -n Kbd /tmp/old/sheet.tsx")],
  ["Bash python 用 os.getcwd() + '/…' 拼路径写 .tsx", 2, bash(none, `python3 - <<'EOF'\nimport os\nroot = os.getcwd()\np = root + '/web/src/pages/create.tsx'\nopen(p, 'w').write('x')\nEOF`)],
  ["Bash python 循环两个 root 拼路径写 .tsx", 2, bash(none, `python3 - <<'EOF'\nfor root in ['.', '/tmp/copy']:\n    p = root + '/web/src/pages/create.tsx'\n    open(p, 'w').write('x')\nEOF`)],
  ["Bash python 拼到项目外的目录写 .tsx", 0, bash(none, `python3 - <<'EOF'\nS = '/tmp/scratch'\np = S + '/web/src/pages/create.tsx'\nopen(p, 'w').write('x')\nEOF`)],
  ["Bash node 脚本往 /tmp 写模板路径的 .css，参数里有入口 .css", 0, { ...bash(none, `cat > /tmp/diff.mjs <<'EOF'\nimport { readFileSync, writeFileSync } from "node:fs"\nconst [root, entry] = process.argv.slice(2)\nconst css = readFileSync(entry, "utf8")\nwriteFileSync(\`/tmp/out-\${css ? "new" : "old"}-\${root.split("/").pop()}.css\`, css)\nEOF\nnode /tmp/diff.mjs . src/styles/app.css`), cwd: join(app, "web") }],
  ["Bash python 往 /tmp 写 f-string 路径的 .css，参数里有入口 .css", 0, { ...bash(none, `python3 - src/styles/app.css <<'EOF'\nimport sys\nname = sys.argv[1]\nopen(f"/tmp/out-{name.split('/')[-1]}.css", "w").write("x")\nEOF`), cwd: join(app, "web") }],
  ["Bash node 脚本用模板路径写页面", 2, bash(none, `cat > /tmp/gen.mjs <<'EOF'\nimport { writeFileSync } from "node:fs"\nconst name = "create"\nwriteFileSync(\`web/src/pages/\${name}.tsx\`, "x")\nEOF\nnode /tmp/gen.mjs`)],
  ["Bash node 脚本写命令行参数给的 .css", 2, bash(none, `cat > /tmp/fix.mjs <<'EOF'\nimport { writeFileSync } from "node:fs"\nconst [out] = process.argv.slice(2)\nwriteFileSync(out, ":root {}")\nEOF\nnode /tmp/fix.mjs web/src/styles/app.css`)],
  ["Bash 写 .sh 再运行，脚本里 sed 改 .tsx", 2, bash(none, `cat > /tmp/fix.sh <<'EOF'\nsed -i '' 's/max-w-xl/max-w-lg/' web/src/pages/create.tsx\nEOF\nbash /tmp/fix.sh`)],
  ["Bash python heredoc 改 .mjs，内容里提到 .css", 0, bash(none, `python3 - <<'EOF'\np='scripts/static-gate-audit.mjs'\ns=open(p,encoding='utf8').read()\na='''  ["边线", 2, viaWrite(app, "web/src/pages/e.css", ".x {}"), "边线"],\n'''\nb=a+'''  ["实色混合", 0, viaWrite(app, "web/src/styles/app.css", ":root {}")],\n'''\nassert a in s; s=s.replace(a,b)\nopen(p,'w',encoding='utf8').write(s)\nEOF`)],
  ["Bash node heredoc 改 .mjs，内容里提到 .tsx", 0, bash(none, `node - <<'EOF'\nconst fs = require("fs")\nconst out = "scripts/check.mjs"\nfs.writeFileSync(out, fs.readFileSync(out, "utf8").replace("[]", '["web/src/pages/create.tsx"]'))\nEOF`)],
  ["Bash python 只读 .css", 0, bash(none, `python3 -c "print(open('web/src/styles/app.css').read())"`)],
  ["Bash python 写 .css", 2, bash(none, `python3 - <<'EOF'\nopen('web/src/styles/app.css', 'w').write(':root { --x: 1px }')\nEOF`)],
  ["Bash python 经变量改 .tsx", 2, bash(none, `python3 - <<'EOF'\np = 'web/src/pages/create.tsx'\ns = open(p).read()\nopen(p, 'w').write(s.replace('max-w-xl', 'max-w-lg'))\nEOF`)],
  ["Bash python 用改文件函数改 .tsx", 2, bash(none, `python3 - <<'EOF'\ndef edit(p, pairs):\n    s = open(p, encoding='utf-8').read()\n    for a, b in pairs: s = s.replace(a, b)\n    open(p, 'w', encoding='utf-8').write(s)\nedit('web/src/pages/create.tsx', [('max-w-xl', 'max-w-lg')])\nEOF`)],
  ["Bash python 跨行字典循环改 .tsx", 2, bash(none, `python3 - <<'EOF'\nedits = {\n    'web/src/pages/create.tsx': [('max-w-xl', 'max-w-lg')],\n}\nfor p, pairs in edits.items():\n    s = open(p).read()\n    for a, b in pairs: s = s.replace(a, b)\n    open(p, 'w').write(s)\nEOF`)],
  ["Bash node 拆包循环改 .tsx", 2, bash(none, `node - <<'EOF'\nconst fs = require("fs")\nconst specs = [\n  ["web/src/pages/create.tsx", [["max-w-xl", "max-w-lg"]]],\n]\nfor (const [file, reps] of specs) {\n  let src = fs.readFileSync(file, "utf8")\n  for (const [a, b] of reps) src = src.replace(a, b)\n  fs.writeFileSync(file, src)\n}\nEOF`)],
  ["Bash python 经命令行参数改 .tsx", 2, bash(none, `for f in web/src/pages/create.tsx; do python3 - "$f" <<'EOF'\nimport sys\np = sys.argv[1]\ns = open(p).read()\nopen(p, 'w').write(s.replace('max-w-xl', 'max-w-lg'))\nEOF\ndone`)],
  ["Bash node 经命令行参数写 .txt，脚本和后面命令里提到 .tsx", 0, bash(none, `node -e 'require("fs").writeFileSync(process.argv[1], "web/src/pages/create.tsx")' notes.txt && grep -n max-w web/src/pages/create.tsx`)],
  ["Bash pathlib 写 .css", 2, bash(none, `python3 -c "from pathlib import Path; Path('web/src/styles/app.css').write_text('')"`)],
  ["Bash node 写 .tsx", 2, bash(none, `node -e "const { join } = require('path'); require('fs').writeFileSync(join(process.cwd(), 'web/src/pages/new.tsx'), '<Page />')"`)],
  ["Codex 补丁改排版", 2, patch(none, '*** Update File: web/src/pages/create.tsx\n@@\n-<section className="max-w-xl">\n+<section className="max-w-lg">')],
  ["没读设计总纲", 2, edit(noCharter, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"'), "设计总纲"],
  ["设计总纲只读了开头", 2, edit(charterHead, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"'), "设计总纲"],
  ["设计总纲分两次读完", 0, edit(charterSplit, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["设计总纲只出现在正文里", 2, edit(charterPasted, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"'), "设计总纲"],
  ["调了技能但没读规则", 2, edit(skillOnly, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["读规则失败", 2, edit(readFailed, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["规则只读了一半", 2, edit(readHalf, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["规则全文只出现在正文里", 2, edit(pasted, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["读了规则没读流程", 2, edit(noFlow, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["Bash cat 读规则与流程", 0, edit(bashRead, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["Codex 读规则与流程", 0, edit(codexOk, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["Codex 读规则退出码 1", 2, edit(codexFailed, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["Codex 命令里只提到规则路径", 2, edit(codexMention, "create.tsx", 'className="max-w-xl"', 'className="max-w-lg"')],
  ["Codex code-mode 搜 Mobbin 两次 12 张", 0, patch(codexMcp, '*** Update File: web/src/pages/create.tsx\n@@\n-<section className="max-w-xl">\n+<section className="max-w-lg">')],
  ["Codex code-mode 第二次搜索失败", 2, patch(codexMcpFailed, '*** Update File: web/src/pages/create.tsx\n@@\n-<section className="max-w-xl">\n+<section className="max-w-lg">')],
  ["Codex code-mode 两次只有 8 张", 2, patch(codexMcpThin, '*** Update File: web/src/pages/create.tsx\n@@\n-<section className="max-w-xl">\n+<section className="max-w-lg">')],
  ["Codex 一次搜索两种记录都有，只算一次", 2, patch(codexBoth, '*** Update File: web/src/pages/create.tsx\n@@\n-<section className="max-w-xl">\n+<section className="max-w-lg">')],
  ["Codex exec_command（Bash）perl 改页面", 2, bash(codexMcpThin, "perl -pi -e 's/max-w-xl/max-w-lg/' web/src/pages/create.tsx")],
  ["先例够了·小改宽度", 0, edit(ok, "create.tsx", 'className="mx-auto w-full max-w-xl"', 'className="mx-auto w-full max-w-lg"')],
  ["先例够了·新页面没做方案图", 2, write(ok, "orders.tsx", PAGE)],
  ["先例够了·整页改版没做方案图", 2, edit(ok, "create.tsx", BIG_OLD, BIG_NEW)],
  ["先例够了·Bash 写新页面没做方案图", 2, bash(ok, `cat > web/src/pages/new.tsx <<'EOF'\n${PAGE}\nEOF`)],
  ["本会话做过方案图·新页面", 0, write(staged, "orders.tsx", PAGE)],
  ["做过方案图但没读布局手册·新页面", 2, write(stagedNoLayout, "orders.tsx", PAGE), "layout.md"],
  ["布局手册只读了一半", 2, write(layoutHalf, "orders.tsx", PAGE), "layout.md"],
  ["读了布局手册·没做方案图", 2, write(laidOut, "orders.tsx", PAGE), "做方案图"],
  ["只画过线框不算方案图", 2, write(wired, "orders.tsx", PAGE)],
  ["写方案图入口（含 <Stage）", 0, write(ok, "orders.tsx", '<Stage><Window /></Stage>')],
  ["方案图目录里的新文件", 0, writeAt(laidOut, join(scene, "stills.tsx"), PAGE)],
  ["方案图目录里没读布局手册", 2, writeAt(ok, join(scene, "stills.tsx"), PAGE), "layout.md"],
  ["方案图目录里也要先看先例", 2, writeAt(none, join(scene, "stills.tsx"), PAGE)],
  ["读规则 + stageshow 技能算读了流程", 0, writeAt(stageshowFlow, join(scene, "hero.tsx"), '<Stage />')],
  ["stageshow 技能只读了开头", 2, writeAt(stageshowHead, join(scene, "hero.tsx"), '<Stage />')],
  ["技能自带的主题文件不查", 0, writeAt(none, join(app, "web/vendor/skills/design/assets/heroui-theme.css"), ":root { --field-border-width: 1px }")],
  ["用户说跳过方案图", 0, write(skipMockup, "orders.tsx", PAGE)],
  ["跳过方案图，布局手册照读", 2, write(skipMockupNoLayout, "orders.tsx", PAGE), "layout.md"],
  ["用户说跳过先例，两道都放", 0, write(skipAll, "orders.tsx", PAGE)],
  // HeroUI 项目：两道照查；提示里舞台用项目自己的组件
  ["HeroUI 项目没加载技能就改排版", 2, editHero(none, 'className="max-w-xl"', 'className="max-w-lg"')],
  ["HeroUI 项目先例够了·小改宽度", 0, editHero(ok, 'className="mx-auto w-full max-w-xl"', 'className="mx-auto w-full max-w-lg"')],
  ["HeroUI 项目新页面没读布局手册、没做方案图", 2, writeHero(ok, "orders.tsx", PAGE), "HeroUI 组件"],
  ["HeroUI 项目读了布局手册、做过方案图", 0, writeHero(staged, "orders.tsx", PAGE)],
  ["只用别的库的项目不查", 0, writeHero(none, "orders.tsx", PAGE, plain)],
  ["用户说跳过线框（旧说法）", 0, write(skipWire, "orders.tsx", PAGE)],
]

try {
  for (const [name, want, payload, mention] of cases) {
    const r = spawnSync(process.execPath, [GATE], { input: JSON.stringify(payload), encoding: "utf8", env: { ...process.env, TMPDIR: root } })
    if (r.status === want && mention && !r.stderr.includes(mention)) console.log(`${name}：拦了，但提示里没提到「${mention}」`)
    if (r.status !== want) console.log(`${name}：退出码 ${r.status}，应为 ${want}${r.status !== 0 && r.status !== 2 ? `（关卡脚本自己出错：${r.stderr.split("\n").find((l) => /Error/.test(l)) ?? r.stderr.slice(0, 120)}）` : ""}`)
  }
} finally {
  rmSync(root, { recursive: true, force: true })
}
