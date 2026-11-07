// 改后检查（plugin/hooks/static-gate.mjs）的用例审计：输出为空表示通过。
// 钩子自己出错时一律放行（退出码 0），所以「该退回的没退回」只有逐条喂用例才看得出来；改了钩子或 lib/static-rules.mjs 必跑。
// 用临时目录造三个使用方项目（@su 旧项目一个带 typescript 与 ds-theme.css、一个都没有；HeroUI 项目一个带 typescript）和一个不是使用方的项目，逐条写文件、喂给钩子，核对退出码与退回的内容。
// 用法：先 npm install（要 typescript），再 node scripts/static-gate-audit.mjs；STATIC_GATE=<钩子副本> 反证时指向改坏的副本。
import { spawnSync } from "node:child_process"
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"

const GATE = resolve(process.env.STATIC_GATE ?? "plugin/hooks/static-gate.mjs")
const root = mkdtempSync(join(tmpdir(), "design-static-gate-"))
const app = join(root, "app"), bare = join(root, "bare"), other = join(root, "other")
for (const [dir, theme] of [[app, true], [bare, false]]) {
  mkdirSync(join(dir, ".git"), { recursive: true })
  mkdirSync(join(dir, "web/src/styles"), { recursive: true })
  writeFileSync(join(dir, "web/components.json"), JSON.stringify({ registries: { "@su": "https://su.xzzj.party/r/{name}.json" } }))
  if (theme) {
    copyFileSync("scripts/fixtures/ds-theme.css", join(dir, "web/src/styles/ds-theme.css"))
    mkdirSync(join(dir, "web/node_modules"), { recursive: true })
    symlinkSync(resolve("node_modules/typescript"), join(dir, "web/node_modules/typescript"))
  }
}
mkdirSync(join(other, ".git"), { recursive: true })
// HeroUI 项目（2026-11-06 起新项目）：圆角、拐角形状、文字块外边距照 HeroUI 不查；文案、配色、间距、原生日期框照查
const hero = join(root, "hero")
mkdirSync(join(hero, ".git"), { recursive: true })
mkdirSync(join(hero, "web/node_modules"), { recursive: true })
writeFileSync(join(hero, "web/package.json"), JSON.stringify({ dependencies: { "@heroui/react": "^3.2.7", "@heroui/styles": "^3.2.7" } }))
symlinkSync(resolve("node_modules/typescript"), join(hero, "web/node_modules/typescript"))

const write = (dir, rel, content) => { const p = join(dir, rel); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, content); return p }
const viaWrite = (dir, rel, content) => ({ cwd: dir, tool_name: "Write", tool_input: { file_path: write(dir, rel, content), content } })
const viaPatch = (dir, rel, content) => { write(dir, rel, content); return { cwd: dir, tool_name: "apply_patch", tool_input: { command: `*** Begin Patch\n*** Update File: ${rel}\n@@\n+${content}\n*** End Patch` } } }

const OK = 'export function A() { return <div className="rounded-control border-line p-4">订单</div> }\n'
const cases = [
  ["合规文件", 0, viaWrite(app, "web/src/pages/ok.tsx", OK)],
  ["任意值圆角", 2, viaWrite(app, "web/src/pages/a.tsx", 'export const A = () => <div className="rounded-[18px]" />\n'), "圆角类 rounded-[18px]"],
  ["手写 borderRadius", 2, viaWrite(app, "web/src/pages/b.tsx", "export const B = () => <div style={{ borderRadius: 12 }} />\n"), "borderRadius"],
  // 拐角形状（10-17 总账本）：手写形状、项目映射 --radius-* 都退回；inherit 放行（子层跟外层）
  ["手写拐角形状", 2, viaWrite(app, "web/src/pages/s.tsx", 'export const S = () => <a className="rounded-control [corner-shape:round]" />\n'), "拐角形状"],
  ["style 里的拐角形状", 2, viaWrite(app, "web/src/pages/t.tsx", 'export const T = () => <a className="rounded-control" style={{ cornerTopLeftShape: "squircle" }} />\n'), "拐角形状"],
  ["变量驱动的拐角形状", 0, viaWrite(app, "web/src/pages/w.tsx", 'export const W = ({ corner }) => <motion.div className="rounded-control" style={{ cornerShape: corner }} />\n')],
  ["拐角形状跟外层", 0, viaWrite(app, "web/src/pages/u.tsx", 'export const U = () => <span className="rounded-inherit [corner-shape:inherit]" />\n')],
  ["项目映射 --radius-*", 2, viaWrite(app, "web/src/styles/legacy.css", "@theme inline {\n  --radius-md: var(--ds-r-control);\n}\n"), "--radius-*"],
  ["CSS 里手写拐角形状", 2, viaWrite(app, "web/src/styles/nav.css", ".nav a { corner-shape: round; }\n"), "拐角形状"],
  ["没有 typescript：拐角形状照查", 2, viaWrite(bare, "web/src/pages/v.tsx", 'export const V = () => <a className="[corner-shape:round]" />\n'), "拐角形状"],
  ["半透明焦点环", 2, viaWrite(app, "web/src/pages/c.tsx", 'export const C = () => <a className="focus-visible:ring-focus/50" />\n'), "焦点环"],
  ["细字重", 2, viaWrite(app, "web/src/pages/d.tsx", 'export const D = () => <p className="font-light">x</p>\n'), "字重"],
  ["CSS 里的半透明边线", 2, viaWrite(app, "web/src/pages/e.css", ".x { border: 1px solid rgba(0, 0, 0, 0.1); }\n"), "边线"],
  // 文字 token：两种实色的 color-mix 混出来还是实色（10-16 误报）；和 transparent 混、两个百分比不到 100%、带透明度的颜色要退回。
  ["文字 token 两种实色混合", 0, viaWrite(app, "web/src/styles/app.css", ":root { --ds-fg-muted: color-mix(in srgb, var(--base-fg) calc(var(--lift) * 2), var(--base-muted)); }\n")],
  ["文字 token 和 transparent 混", 2, viaWrite(app, "web/src/styles/brand.css", ":root {\n  --ds-fg-muted: color-mix(in srgb, var(--base-fg) 60%,\n    transparent);\n}\n"), "文字 token 必须实色"],
  ["文字 token 两个百分比不到 100%", 2, viaWrite(app, "web/src/styles/dim.css", ":root { --ds-fg: color-mix(in srgb, var(--base-fg) 40%, var(--base-muted) 40%); }\n"), "文字 token 必须实色"],
  ["文字 token 带透明度的颜色", 2, viaWrite(app, "web/src/styles/ink.css", ":root { --ds-fg-subtle: oklch(0.4 0 0 / 0.7); }\n"), "文字 token 必须实色"],
  // 间距只取 4 的倍数（10-30）：半档、任意 px、style、偏移、CSS 都退回；算式、1px 线、比例、参考图、非间距放行
  ["半档间距", 2, viaWrite(app, "web/src/pages/p1.tsx", 'export const P = () => <div className="flex gap-1.5 px-2.5" />\n'), "gap-1.5"],
  ["任意值间距", 2, viaWrite(app, "web/src/pages/p2.tsx", 'export const P = () => <div className="mt-[6px] pl-[0.625rem]" />\n'), "mt-[6px]"],
  ["style 里的间距", 2, viaWrite(app, "web/src/pages/p3.tsx", "export const P = () => <div style={{ padding: 10, marginTop: \"6px\" }} />\n"), "padding: 10"],
  ["弹层偏移", 2, viaWrite(app, "web/src/pages/p4.tsx", "export const P = () => <PopoverContent sideOffset={6} />\n"), "sideOffset 6"],
  ["CSS 里的间距", 2, viaWrite(app, "web/src/styles/space.css", ".card { padding: 10px 16px; gap: 6px; }\n:root { --app-gap: 14px; }\n"), "padding: 10px"],
  ["合规间距", 0, viaWrite(app, "web/src/pages/p5.tsx", 'export const P = () => <div className="gap-2 p-4 -mt-px pl-[calc(var(--ds-icon)+8px)]" style={{ padding: 12, opacity: 0.5 }}><Popover sideOffset={8} /></div>\n')],
  // 量看得见的字（10-30）：文字块自己写竖向外边距会盖掉扣半行距；内边距、容器上的外边距放行
  ["文字块上的外边距", 2, viaWrite(app, "web/src/pages/p7.tsx", 'export const P = () => <div><h3 className="text-sm">标题</h3><p className="mt-2 text-sm">正文</p></div>\n'), "mt-2"],
  ["文字块用内边距、容器用外边距", 0, viaWrite(app, "web/src/pages/p8.tsx", 'export const P = () => <div className="mt-4 grid gap-2"><p className="pt-2 text-sm">正文</p><span className="leading-trim pointer-coarse:my-0">字</span></div>\n')],
  ["参考图写死的间距", 0, viaWrite(app, "web/src/pages/p6.tsx", 'export const P = () => (\n  // 参考图：Attio 侧栏，行左右 15\n  <nav className="px-[15px]" />\n)\n')],
  // 布局优先于文字（红线 1，用户 11-07「永远不能再出现这样的设计」）：内容之间的点一律退回、没有放行写法；数数句退回；密码掩码与注释不算
  ["JSX 里的点分隔", 2, viaWrite(hero, "web/src/pages/dot1.tsx", "export const D = ({ a, b }) => <span>{a} · {b}</span>\n"), "用点「·」"],
  ["模板字串里的点分隔", 2, viaWrite(hero, "web/src/pages/dot2.tsx", "export const label = (r) => `${r.owner} • ${r.code}`\n"), "用点「•」"],
  ["单独一个点当分隔符", 2, viaWrite(app, "web/src/pages/dot3.tsx", 'export const D = () => <p>D07<span aria-hidden>・</span>孙婷</p>\n'), "用点「・」"],
  ["点的实体与转义", 2, viaWrite(hero, "web/src/pages/dot4.tsx", 'export const D = () => <p>A&middot;B{"\\u00b7"}</p>\n'), "&middot;"],
  ["CSS 伪元素画的点", 2, viaWrite(hero, "web/src/styles/sep.css", '.x::before { content: "·"; }\n'), "用点「·」"],
  ["CSS 转义写的点", 2, viaWrite(hero, "web/src/styles/sep2.css", '.meta > * + *::before { content: "\\00b7"; }\n'), "用点「\\00b7」"],
  ["点分隔写了必要提示也不放行", 2, viaWrite(hero, "web/src/pages/dot5.tsx", "// 必要提示：省地方\nexport const D = () => <span>金牌 · 6 项</span>\n"), "用点"],
  ["数数写成句子", 2, viaWrite(hero, "web/src/pages/cnt.tsx", "export const C = ({ n }) => <Pagination.Summary>共 {n} 家</Pagination.Summary>\n"), "数数写成句子"],
  ["模板里的数数句", 2, viaWrite(hero, "web/src/pages/cnt2.tsx", "export const c = (n) => `1–14，共 ${n} 条`\n"), "共 ${n} 条"],
  ["密码掩码与注释里的点不算", 0, viaWrite(hero, "web/src/pages/dot6.tsx", '// 反例：A · B\nexport const M = () => <span>••••</span>\n')],
  ["说明句", 2, viaWrite(app, "web/src/pages/f.tsx", "export const F = () => <p>点这里可以复制链接。</p>\n"), "必要提示"],
  ["说明句写了必要提示", 0, viaWrite(app, "web/src/pages/g.tsx", "export const G = () => (\n  // 必要提示：不可撤回操作的后果\n  <p>删除后无法恢复。</p>\n)\n")],
  ["日期紧贴汉字", 2, viaWrite(app, "web/src/pages/h.tsx", "export const H = () => <p>{m}月{d}日</p>\n"), "紧贴"],
  ["参考图写死的圆角与颜色", 0, viaWrite(app, "web/src/pages/i.tsx", 'export const I = () => (\n  // 参考图：登录页选项块\n  <div className="rounded-[18px] focus-visible:ring-focus/50" />\n)\n')],
  // stageshow 方案图目录（往上三层内有 kit/stageshow.css）：阴影、取景、圆角、占位照 stageshow（用户 2026-11-02「一切都以他为准」）
  ["方案图场景不查", 0, (write(app, "web/design/orders/kit/stageshow.css", "@layer stageshow {}\n"), viaWrite(app, "web/design/orders/hero.tsx", 'export const H = () => <div className="rounded-[18px] gap-1.5" style={{ padding: 10 }}>点这里可以复制链接。</div>\n'))],
  ["方案图的 kit 不查", 0, viaWrite(app, "web/design/orders/kit/parts/row.css", ".ss-row { border-radius: 7px; padding: 6px 10px; }\n")],
  ["方案图目录旁边的真页面照查", 2, viaWrite(app, "web/src/pages/q.tsx", 'export const Q = () => <div className="rounded-[18px]" />\n'), "rounded-[18px]"],
  ["线框占位不查", 0, viaWrite(app, "web/src/pages/j.tsx", '<Page><Wire label="订单表" use="Table" rows={6} /></Page>\n')],
  ["components/ui 不查", 0, viaWrite(app, "web/src/components/ui/k.tsx", 'export const K = () => <div className="rounded-[18px]">点这里。</div>\n')],
  ["装进来的主题文件不查", 0, viaWrite(app, "web/src/styles/ds-tokens.css", ":root { --ds-fg-muted: color-mix(in srgb, black 60%, transparent); }\n")],
  ["Codex 补丁", 2, viaPatch(app, "web/src/pages/l.tsx", 'export const L = () => <div className="rounded-[7px]" />'), "rounded-[7px]"],
  ["没有 typescript：圆角跳过", 0, viaWrite(bare, "web/src/pages/m.tsx", 'export const M = () => <div className="rounded-[18px]" />\n')],
  ["没有 typescript：配色照查", 2, viaWrite(bare, "web/src/pages/n.tsx", 'export const N = () => <a className="focus-visible:ring-focus/50" />\n'), "焦点环"],
  // 原生日期框（11-06 盲评致命项）：两种项目都退回
  ["原生日期框", 2, viaWrite(app, "web/src/pages/dt.tsx", 'export const D = () => <input type="date" />\n'), "原生日期框"],
  ["原生日期时间框（花括号）", 2, viaWrite(app, "web/src/pages/dt2.tsx", "export const D = () => <input type={'datetime-local'} />\n"), "datetime-local"],
  ["注释里的原生日期框不算", 0, viaWrite(app, "web/src/pages/dt3.tsx", '// 不用 <input type="date" />\nexport const D = () => <DatePicker />\n')],
  ["HeroUI 项目：原生日期框", 2, viaWrite(hero, "web/src/pages/dt.tsx", 'export const D = () => <input type="month" />\n'), "原生日期框"],
  ["HeroUI 项目：圆角类与拐角形状不查", 0, viaWrite(hero, "web/src/pages/r.tsx", 'export const R = () => <div className="rounded-lg rounded-[18px] [corner-shape:round]" />\n')],
  ["HeroUI 项目：文字块外边距不查", 0, viaWrite(hero, "web/src/pages/m.tsx", 'export const M = () => <div><p className="mt-2 text-sm">正文</p></div>\n')],
  ["HeroUI 项目：说明句照查", 2, viaWrite(hero, "web/src/pages/f.tsx", "export const F = () => <p>点这里可以复制链接。</p>\n"), "必要提示"],
  ["HeroUI 项目：半档间距照查", 2, viaWrite(hero, "web/src/pages/p.tsx", 'export const P = () => <div className="gap-1.5" />\n'), "gap-1.5"],
  ["HeroUI 项目：细字重照查", 2, viaWrite(hero, "web/src/pages/w.tsx", 'export const W = () => <p className="font-light">x</p>\n'), "字重"],
  ["HeroUI 项目：装进来的红线覆盖不查", 0, viaWrite(hero, "web/src/styles/heroui-theme.css", ".input { padding-block: 7px; }\n:root { --radius-md: 9px; }\n")],
  ["不是使用方项目不查", 0, viaWrite(other, "src/o.tsx", 'export const O = () => <div className="rounded-[18px]">点这里。</div>\n')],
  ["读文件等别的工具", 0, { cwd: app, tool_name: "Read", tool_input: { file_path: join(app, "web/src/pages/a.tsx") } }],
]

try {
  for (const [name, want, payload, mention] of cases) {
    const r = spawnSync(process.execPath, [GATE], { input: JSON.stringify(payload), encoding: "utf8" })
    if (r.status !== want) console.log(`${name}：退出码 ${r.status}，应为 ${want}${r.stderr ? `（${r.stderr.split("\n").slice(0, 2).join(" ")}）` : ""}`)
    else if (mention && !r.stderr.includes(mention)) console.log(`${name}：退回了，但没提到「${mention}」`)
  }
  const broken = spawnSync(process.execPath, [GATE], { input: "不是 JSON", encoding: "utf8" })
  if (broken.status !== 0) console.log(`输入不是 JSON：退出码 ${broken.status}，应为 0（放行）`)
} finally {
  rmSync(root, { recursive: true, force: true })
}
