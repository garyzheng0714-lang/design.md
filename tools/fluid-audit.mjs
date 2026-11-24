#!/usr/bin/env node
// 把 Fluid 官方技能的实测脚本（fluid-functionalism/scripts/audit.mjs）里在页面里跑的那几段原样取出来，拼成一段能贴进 Claude in Chrome 的代码。
// 官方脚本用无头浏览器跑，我们的规矩不准用无头浏览器，所以只借它的量法：每次现读官方文件，不抄一份，官方更新了这里自动跟上。
//   node tools/fluid-audit.mjs > tools/ffaudit.gen.js，在 tools 目录起一个允许跨域的本机服务，Chrome 里 (0,eval)(await fetch(本机地址/ffaudit.gen.js).then(r=>r.text()))
//   页面里得到 window.__ffAudit：probe() 一次量完过渡时长、控件高度、字体、横向溢出；lists() 标出会悬停的列表，
//   readList(i) 读第 i 个列表当前悬停状态（配合 Claude in Chrome 的 hover 一行一行指、指到行间空隙再读）。
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const SRC = join(homedir(), ".agents/skills/fluid-functionalism/scripts/audit.mjs");
const NAMES = ["installHelpers", "tagLists", "readList", "probeTransitions", "probeLadder", "probeFonts", "probeOverflow"];

const text = readFileSync(SRC, "utf8");

// 必要提示：官方文件里顶格的函数都以顶格的「}」收尾，照这个切，不自己数括号（正则、字符串里的括号会数错）
function extract(name) {
  const start = text.search(new RegExp(`^function ${name}\\(`, "m"));
  if (start < 0) throw new Error(`官方 audit.mjs 里找不到 ${name}，官方改了结构，先读一遍再改这里`);
  const end = text.indexOf("\n}\n", start);
  if (end < 0) throw new Error(`${name} 找不到顶格的收尾括号`);
  return text.slice(start, end + 2);
}

const tokens = text.match(/export const DURATION_TOKENS_MS = (\[[^\]]*\])/)[1];
const body = NAMES.map(extract).join("\n\n");
process.stdout.write(`(() => {
${body}
const DURATION_TOKENS_MS = ${tokens};
installHelpers();
window.__ffAudit = {
  lists: (max = 12) => tagLists(max),
  readList,
  probe: () => ({ transitions: probeTransitions(DURATION_TOKENS_MS), ladder: probeLadder(), fonts: probeFonts(), overflow: probeOverflow() }),
};
return Object.keys(window.__ffAudit);
})()
`);
