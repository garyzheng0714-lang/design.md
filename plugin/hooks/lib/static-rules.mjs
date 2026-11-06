// 静态红线的规则本体（DESIGN.md 红线 2 文案、6 圆角与拐角形状、7 配色、11 间距，加原生日期框）：只管「一个文件的文本 → 问题列表」，不找文件、不打印。
// 用它的地方：scripts/radius-static.mjs、color-static.mjs、copy-audit.mjs（查 Su 仓库或传进来的使用方目录），
// 以及 hooks/static-gate.mjs（使用方项目里改完界面文件就查那一个文件）。改规则只改这里，两边自动一致。
// 问题一律是 { line, message }，line 从 1 起。
// 「参考图：」放行（用户 2026-10-15）：照用户参考图写死的圆角与颜色，在那一行或上一行写「参考图：出处」就不报，确认后补进 Su。

const REFERENCE = "参考图："
const fromReference = (lines, line) => [lines[line - 2] ?? "", lines[line - 1] ?? ""].some((l) => l.includes(REFERENCE))

export function radiusAllowed(themeCss) {
  const levels = [...themeCss.matchAll(/--radius-([\w-]+):/g)].map((m) => m[1])
  // 贴角的嵌套圆角 rounded-<外层>-<间距>：ds-theme.css 里写了 @utility rounded-<外层>-* 的外层才有
  const gapped = new Set([...themeCss.matchAll(/@utility rounded-([\w-]+)-\* /g)].map((m) => m[1]))
  const set = new Set(["none", "full", ...levels])
  return { has: (name) => set.has(name) || (/^[a-z]+-\d+$/.test(name) && gapped.has(name.replace(/-\d+$/, ""))) }
}

/** 圆角：只许 ds-theme.css 的语义类；borderRadius 只许 var(--ds-r-*) 或 useTransform / useMotionValue 驱动的值。ts 由调用方给（Su 仓库的或使用方项目的）。 */
export function radiusProblems(ts, file, text, allowed) {
  const out = []
  const lines = text.split("\n")
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const fail = (node, message) => {
    const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
    if (!fromReference(lines, line)) out.push({ line, message })
  }
  function classPosition(node) {
    for (let p = node.parent; p; p = p.parent) {
      if (ts.isJsxAttribute(p)) return p.name.getText() === "className"
      if (ts.isCallExpression(p)) return /^(cn|cva|clsx|twMerge)$/.test(p.expression.getText())
      if (ts.isVariableDeclaration(p)) return /class(Name|es)?$/i.test(p.name.getText())
      if (ts.isPropertyAssignment(p) && /^(className|class)$/.test(p.name.getText().replace(/["']/g, ""))) return true
      if (ts.isBindingElement(p) || ts.isParameter(p) || ts.isPropertyAssignment(p) || ts.isArrayLiteralExpression(p)) return false
    }
    return false
  }
  const motion = new Set()
  const collectMotion = (node) => { if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && ts.isCallExpression(node.initializer) && /^(useTransform|useMotionValue)$/.test(node.initializer.expression.getText(source))) motion.add(node.name.text); ts.forEachChild(node, collectMotion) }
  collectMotion(source)
  function visit(node) {
    // 只查类字串；shape="rounded"、注释中的反例与标识符不是工具类。
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      const value = node.text
      // 单独一个「rounded」只有写在类名位置（className、cn / cva / clsx 参数）才是工具类；
      // 其余位置是 Avatar 的 shape 取值：参数默认值 shape = "rounded"、play 旋钮的枚举与标签、shape="rounded"。
      const avatarShape = value === "rounded" && !classPosition(node)
      if (!avatarShape) {
        for (const match of value.matchAll(/(?<![\w-])rounded(?:-(?:tl|tr|bl|br|t|b|l|r|s|e))?(?:-\[[^\n]*?\]|-[a-z][\w-]*)?(?![\w-])/g)) {
          if (match[0] === "rounded" && file.endsWith("/doc.ts")) continue // Avatar 的 shape 枚举是内容数据。
          const radius = match[0].replace(/^rounded-/, "").replace(/^(?:tl|tr|bl|br|t|b|l|r|s|e)-/, "")
          if (!allowed.has(radius)) fail(node, `圆角类 ${match[0]} 不合规：只许 ds-theme.css 的语义类`)
        }
      }
    }
    if ((ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) && /^border(?:TopLeft|TopRight|BottomLeft|BottomRight)?Radius$/.test(node.name.getText(source).replace(/["'\[\]]/g, ""))) {
      const value = ts.isShorthandPropertyAssignment(node) ? node.name : node.initializer
      if (!(ts.isStringLiteralLike(value) && /^var\(--ds-r-[\w-]+\)$/.test(value.text)) && !(ts.isIdentifier(value) && motion.has(value.text))) fail(node, "borderRadius 手写值不合规：改用语义圆角或 token 驱动的变形")
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return out
}

// 拐角形状（2026-10-17，总账本侧栏：项目映射 --radius-md 拿到 15px、形状没跟上，32 高的选中项在 Chrome 里成了胶囊）：
// 形状由 @su/theme 给所有元素，正圆由 rounded-full 回到 round；项目里手写形状只会和数值对不上，只许 inherit（子层跟外层，同 Su 的按钮）。
// style 对象里只查写死的字串；变量驱动的（形变面照抄量到的形状）和 borderRadius 一样放行。
// --radius-* 是 @su/theme 语义类的来源，项目里再映射一套就是兼容层。
const SHAPE_RULES = [
  [/(?<![\w-])corner(?:-[a-z]+){0,2}-shape["'`]?\s*:\s*(?!["'`]?inherit\b)[^;,}\]\n]*/g, "拐角形状由 @su/theme 给，项目里不写（正圆写 rounded-full）"],
  [/(?<![\w-])corner(?:[A-Z][a-z]+){0,2}Shape["'`]?\s*:\s*["'`](?!inherit\b)[^;,}\]\n]*/g, "拐角形状由 @su/theme 给，项目里不写（正圆写 rounded-full）"],
  [/(?<![\w-])--radius-[\w-]+\s*:/g, "不在项目里映射 --radius-*：圆角只写 Su 的语义类"],
]

/** 拐角形状与 --radius-* 映射：任何文件都查（类名、style、CSS），注释不算。 */
export function shapeProblems(text) {
  const out = []
  const lines = text.split("\n")
  const source = stripComments(text)
  for (const [regex, message] of SHAPE_RULES) for (const match of source.matchAll(regex)) {
    const line = source.slice(0, match.index).split("\n").length
    if (!fromReference(lines, line)) out.push({ line, message: `${message}：${match[0].trim()}` })
  }
  return out
}

const alpha = String.raw`(?:rgb|rgba)\(\s*(?:(?:0\s+0\s+0|255\s+255\s+255)\s*/|(?:0\s*,\s*0\s*,\s*0|255\s*,\s*255\s*,\s*255)\s*,)\s*0?\.\d+\s*\)`

/** 从「(」后一位起按顶层逗号切参数（括号配平），到配对的「)」为止；end 是「)」之后的位置。 */
function callArgs(value, open) {
  const args = []
  for (let i = open, depth = 0, start = open; i < value.length; i++) {
    if (value[i] === "(") depth++
    else if (value[i] === ")" && depth-- === 0) { args.push(value.slice(start, i)); return { args, end: i + 1 } }
    else if (value[i] === "," && !depth) { args.push(value.slice(start, i)); start = i + 1 }
  }
  return { args, end: value.length }
}
const flat = (s) => { for (let t; (t = s.replace(/\([^()]*\)/g, "")) !== s;) s = t; return s } // 去掉嵌套括号，只看这一层

// 文字 token 的值带透明度才算违规（2026-10-16）：transparent、rgba / hsla、4 / 8 位十六进制、颜色函数里的「/ 透明度」或旧写法第 4 个参数、
// 两个百分比都写了且加起来不到 100% 的 color-mix（CSS Color 5：差额变成透明度）。两种实色的 color-mix 混出来还是实色，放行
// （ds-theme.css 里深色次级字随层提亮就是这么写的）。返回带透明度的那一段，没有返回 null。
function translucent(value) {
  const plain = value.match(/transparent|\b(?:rgba|hsla)\(|#(?:[\da-f]{8}|[\da-f]{4})\b/i)
  if (plain) return plain[0]
  for (const m of value.matchAll(/\b(rgb|hsl|hwb|lab|lch|oklab|oklch|color|color-mix)\(/gi)) {
    const { args, end } = callArgs(value, m.index + m[0].length)
    const call = value.slice(m.index, end)
    if (m[1].toLowerCase() !== "color-mix") {
      if (flat(args.join(",")).includes("/") || (/^(rgb|hsl)$/i.test(m[1]) && args.length === 4)) return call
      continue
    }
    const share = args.slice(1, 3).map((a) => flat(a).match(/(?:^|[\s_])(\d*\.?\d+)%(?=[\s_]|$)/)?.[1])
    if (share.length === 2 && share.every(Boolean) && Number(share[0]) + Number(share[1]) < 100) return call
  }
  return null
}

const COLOR_RULES = [
  [/\bfont-(?:light|extralight|thin)\b|font-\[(?:300|350)\]|fontWeight:\s*(?:300|350)\b|font-weight:\s*(?:300|350)\b/g, "文字字重只用 400 / 500 / 600"],
  // 例外：Su 的侧栏面板（同一行改写了 --base-sidebar-fg）照 Attio 用 400，中文苹方中黑太重
  [/(?<!--base-sidebar-fg[^\n]*)--(?:base|ds)-weight-nav\s*:\s*400\b/g, "导航默认字重必须 500"],
  [/text-fg(?:-muted|-subtle)?\/\d+/g, "文字不许透明度修饰（SVG 图形填充除外）"],
  // 值读到分号、花括号、引号或「]」（Tailwind 任意属性，下划线当空格）为止，跨行写的 color-mix 也看全。第三项从命中里挑出要显示的原文，挑不出就不算违规。
  [/(--(?:base|ds)-(?:ink|muted|subtle|fg(?:-muted|-subtle)?))\s*:([^;{}"'`\]]*)/g, "文字 token 必须实色", (m) => { const hit = translucent(m[2]); return hit && `${m[1]}: ${hit}` }],
  [/(?:focus(?:-visible|-within)?[^\s"'`]*:|data-[^\s"'`]*:)?ring-focus\/\d+/g, "焦点环不许透明度修饰"],
  [/(?:focus(?:-visible|-within)?[^\s"'`]*:)ring-[\w-]+\/\d+/g, "焦点环必须不透明"],
  [/(?:border|divide)-(?:line|line-strong)\/\d+/g, "结构线必须实色"],
  [new RegExp(String.raw`(?:border(?:Color)?\s*[:=][^;\n]*|--(?:base|ds)-line[\w-]*\s*:[^;\n]*)${alpha}`, "g"), "边线不许半透明黑白"],
  [/--(?:base|ds)-(?:line|line-strong|table-line)\s*:[^;\n]*transparent/g, "边线 token 不许透明派生"],
  [new RegExp(String.raw`(?:inset\s+)?0(?:px)?[ _]+0(?:px)?[ _]+0(?:px)?[ _]+1px[ _]+${alpha}`, "g"), "阴影边界必须是 1px 实色线"],
]

/** 配色：实线、不透明焦点环、文字实色与三档字重。message 带上命中的原文。 */
export function colorProblems(text) {
  const out = []
  const lines = text.split("\n")
  // 保留换行以便给出可复查的位置；注释里的研究反例不作为实现。
  const source = text.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, (v) => v.replace(/[^\n]/g, " "))
  for (const [regex, message, pick] of COLOR_RULES) for (const match of source.matchAll(regex)) {
    const shown = pick ? pick(match) : match[0]
    if (!shown) continue
    // SVG 绘图区的 currentColor 是图形填充，图表配色不属于文字；只豁免明确的图形标签行。
    const at = source.indexOf("\n", match.index)
    const row = source.slice(source.lastIndexOf("\n", match.index) + 1, at < 0 ? source.length : at)
    if (message.startsWith("文字不许透明度") && /<(?:rect|path|circle|line|polygon)\b/.test(row)) continue
    const line = source.slice(0, match.index).split("\n").length
    if (!fromReference(lines, line)) out.push({ line, message: `${message}：${shown}` })
  }
  return out
}

// 间距只取 4 的倍数（DESIGN.md 红线 11、SPEC.md §3.1，用户 2026-10-30：「所有的px间距应该是4px的倍数，间距太重要了」）。
// 间距 = 自己选的两个东西之间、东西到它容器边的距离：内外边距、gap、定位偏移（inset / top…）、弹层离锚点（sideOffset 这类）、间距变量。
// 只查写死的数：Tailwind 的半档（-0.5、-1.5…）、任意值里的 px / rem、style 与 CSS 里的数、偏移 props、--*-pad / gap / inset 变量。
// 不查：calc() / var() 算出来的（居中余数、内圆角、图标留白的光学推移、热区补足都写成算式）、em 与百分比、1px（线与线的补偿）、
// translate（动效与光学）、尺寸（w / h / size）。不是间距的几何（滚动条离边这类）在那一行或上一行写「非间距：理由」；照参考图写死的写「参考图：出处」。
const SPACE_UTIL = /(?<![\w-])-?(?:p[xytblrse]?|m[xytblrse]?|gap(?:-[xy])?|space-[xy]|inset(?:-[xy])?|top|right|bottom|left|start|end|scroll-[mp][xytblrse]?)-(\d+\.5|\[[^\]\s]+\])(?![\w.\-\]])/g
const SPACE_STYLE = /(?<![\w-])(?:padding|margin|inset|scrollPadding|scrollMargin)(?:Top|Right|Bottom|Left|Inline|Block|InlineStart|InlineEnd|BlockStart|BlockEnd)?["'`]?\s*:\s*(["'`]?)(-?\d*\.?\d+(?:px|rem)?)\1(?=\s*[,}\n])|(?<![\w-])(?:gap|rowGap|columnGap|top|right|bottom|left)["'`]?\s*:\s*(["'`]?)(-?\d*\.?\d+(?:px|rem)?)\3(?=\s*[,}\n])/g
const SPACE_PROP = /(?<![\w-])(sideOffset|alignOffset|collisionPadding)\s*(?:=\s*\{?|:)\s*(-?\d+(?:\.\d+)?)/g
const SPACE_CSS = /(?<![\w-])((?:padding|margin|inset|scroll-padding|scroll-margin)(?:-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)?|(?:row-|column-)?gap|top|right|bottom|left|--(?![\w-]*(?:shadow|radius|ring))[\w-]*(?:pad|gap|inset|gutter|space|offset)(?![\w-]*(?:ratio|basis|divisor))[\w-]*)\s*:\s*([^;{}"'`]+)/g
const NOT_SPACE = "非间距："
// 文字块（p、h1–h6，或写了 leading-trim 的元素）自己不写竖向外边距：外边距会盖掉扣半行距的那条（SPEC.md §3 量看得见的字），间距写在容器的 gap 或内边距上
const TEXT_TAG = /<(?:p|h[1-6])\b[^>]*>|<[A-Za-z][\w.]*\b[^>]*\bleading-trim\b[^>]*>/g
const BLOCK_MARGIN = /(?<![\w-])-?m[tby]?-(?!0(?![\w.\-\[]))(?:\d+(?:\.5)?|px|\[[^\]\s]+\])(?![\w.\-\]])/
const toPx = (v) => (/rem$/.test(v) ? parseFloat(v) * 16 : parseFloat(v))
// 不带单位、绝对值小于 1 的是比例（d3 的 padding: 0.2 这类），不是像素
const offGrid = (v) => { const n = Math.abs(toPx(v)); if (!/px|rem/.test(v) && n < 1) return false; return n !== 0 && n !== 1 && n % 4 !== 0 }
/** 一段 CSS 值里不在算式里的长度（calc / clamp / max / min / var 里的都跳过） */
const looseLengths = (value) => flat(value).match(/-?\d*\.?\d+(?:px|rem)\b/g) ?? []

/** 间距：写死的数一律是 4 的倍数（0 与 1px 线除外）。.css 只查 CSS 声明，脚本查类名、style、偏移 props 和 CSS 字串。
 * textMargin：查文字块上的竖向外边距（扣半行距是 @su/theme 给的；HeroUI 项目没有这一层，传 false） */
export function spaceProblems(text, file = "", { textMargin = true } = {}) {
  const out = []
  const lines = text.split("\n")
  const source = stripComments(text)
  const exempt = (line) => fromReference(lines, line) || [lines[line - 2] ?? "", lines[line - 1] ?? ""].some((l) => l.includes(NOT_SPACE))
  const push = (index, message) => { const line = source.slice(0, index).split("\n").length; if (!exempt(line)) out.push({ line, message }) }
  const css = /\.(?:s?css)$/.test(file)
  if (!css) {
    for (const m of source.matchAll(SPACE_UTIL)) {
      const v = m[1]
      if (v.endsWith(".5")) push(m.index, `间距 ${m[0]} 是 ${parseFloat(v) * 4}px，不是 4 的倍数：换整档，或写成算式说明它从哪来`)
      else { const inner = v.slice(1, -1); if (/^-?\d*\.?\d+(?:px|rem)$/.test(inner) && offGrid(inner)) push(m.index, `间距 ${m[0]} 不是 4 的倍数`) }
    }
    for (const m of source.matchAll(SPACE_STYLE)) { const v = m[2] ?? m[4]; if (offGrid(v)) push(m.index, `style 里的间距 ${m[0].trim()} 不是 4 的倍数`) }
    for (const m of source.matchAll(SPACE_PROP)) if (offGrid(m[2])) push(m.index, `${m[1]} ${m[2]} 不是 4 的倍数`)
    if (textMargin) for (const m of source.matchAll(TEXT_TAG)) {
      const mm = BLOCK_MARGIN.exec(m[0])
      if (mm) push(m.index + mm.index, `文字块上的外边距 ${mm[0]}：会盖掉扣半行距（量看得见的字），间距写在容器的 gap 或内边距上`)
    }
  }
  for (const m of source.matchAll(SPACE_CSS)) {
    if (!css && !/[;{]\s*$|^\s*$/.test(source.slice(source.lastIndexOf("\n", m.index) + 1, m.index)) && !/["'`]\s*$/.test(source.slice(Math.max(0, m.index - 2), m.index))) continue
    const bad = looseLengths(m[2]).filter(offGrid)
    if (bad.length) push(m.index, `${m[1]}: ${bad.join(" ")} 不是 4 的倍数`)
  }
  return out
}

// 原生日期框（用户 2026-11-06 盲评：7 份里用了原生日期框的都被两位评审判为致命项）：日期一律用日期选择器（HeroUI DatePicker / @su date-picker）
const NATIVE_DATE = /(?<![\w-])type\s*=\s*\{?\s*["'`](date|datetime-local|month|week)["'`]/g

/** 原生日期框：input 的 type 写成 date、datetime-local、month、week。注释不算。 */
export function nativeDateProblems(text) {
  const out = []
  const source = stripComments(text)
  for (const m of source.matchAll(NATIVE_DATE)) out.push({ line: source.slice(0, m.index).split("\n").length, message: `原生日期框 type="${m[1]}"（盲评致命项）：改用日期选择器（HeroUI 的 DatePicker）` })
  return out
}

// 注释整段换成等量空白（行号不变），再去掉行尾的 // 注释（网址里的 :// 不算）
export const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:])\/\/.*$/gm, "$1")

// 一句写给人看的话：含汉字，以句号或感叹号结尾（引号、括号里的也算）
const SENTENCE = /[一-鿿][^"'`<>{}\n]*[。！]/g

/** 文案（§6 提示三问）：每一句写给用户的完整句子，上一行或同一行要有「必要提示：理由」。skip 是不查的行号（从 0 起，例如模板的内容数据）。 */
export function sentenceProblems(text, skip = new Set()) {
  const out = []
  const lines = text.split("\n")
  const code = stripComments(text).split("\n")
  lines.forEach((line, i) => {
    if (skip.has(i)) return
    const found = code[i].match(SENTENCE)
    if (!found) return
    if ([lines[i - 1] ?? "", line].some((l) => l.includes("必要提示："))) return
    for (const s of found) out.push({ line: i + 1, message: `「${s.trim()}」没有写明它过了哪一问（上一行加 // 必要提示：…，否则删掉）` })
  })
  return out
}

// 日期与数字紧贴汉字（「9月30日」「${m}月」「第${n}月」）：SPEC.md §6 混排，汉字与数字之间一个半角空格。正则字面量、注释不查。
const TIGHT = /(\d|\})(年|月|日)|(年|月)(\d|\$\{)|第(\d|\$\{)/

export function tightProblems(text) {
  const out = []
  stripComments(text).split("\n").forEach((line, i) => {
    if (/RegExp|\/[^/\n]*\\d[^/\n]*\/[gimsuy]*/.test(line)) return
    const m = line.match(TIGHT)
    if (m) out.push({ line: i + 1, message: `日期 / 数字紧贴汉字「${m[0]}」：汉字与数字之间手写一个半角空格（9 月 30 日，设计总纲 §7）` })
  })
  return out
}

/** 交付时线框占位一个都不能剩（2026-10-08 线框流程；11-02 起默认出 stageshow 方案图，Wire 只在用户点名要线框时用）。只在交付审计里查，写的过程中不查。 */
export function wireProblems(text) {
  const out = []
  text.split("\n").forEach((l, i) => {
    if (/<Wire\b|from ["']@\/components\/ui\/wireframe["']/.test(l)) out.push({ line: i + 1, message: "线框占位没换成组件：评审通过后把每个 Wire 原位换成它 use 写的组件" })
  })
  return out
}
