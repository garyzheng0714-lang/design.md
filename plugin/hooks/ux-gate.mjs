#!/usr/bin/env node
// 体验关卡（design 插件，Stop 钩子；用户 2026-11-07：体验员「自己去乱点，怎么点都行，想办法让客户用最小的步骤完成任务。多一步就是比少一步差」）。
// 本会话写过真页面（precedent-gate 放行新页面或整页改版时记下 <会话>.page），而最后一块写完之后还没让体验员走过一遍，就不让收尾：
//   Claude Code：起过 design:ux 或 SendMessage 给它；Codex 起不了子智能体：从头到尾读过插件的 agents/ux.md（照它自己走）。
// 同一块只拦一次（记下 <会话>.ux-asked），钩子接着跑（stop_hook_active）时不拦；体验员还在后台跑时等它；用户说过「跳过体验」不拦。
// 拦 = 输出 { decision: "block", reason }，退出码 0。读不到会话记录或自己出错一律放行。用例审计：scripts/precedent-gate-audit.mjs 末尾。
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { AGENTS, agentTrail, isCodex, readStamp, transcriptFiles, userSkipped, writeStamp } from "./lib/trail.mjs"

let input = {}
try { input = JSON.parse(readFileSync(0, "utf8") || "{}") } catch { process.exit(0) }
try { check() } catch { process.exit(0) }
process.exit(0)

function check() {
  const session = input.session_id
  if (!session || input.stop_hook_active) return
  const page = readStamp(session, "page")
  if (!page) return
  const key = JSON.stringify(page)
  if (readStamp(session, "ux-asked") === key) return
  if ((input.background_tasks || []).some((t) => /(^|:)ux$/.test(t.agent_type || ""))) return
  const files = transcriptFiles(input)
  if (!files.length || userSkipped(files, /跳过体验/)) return
  const codex = isCodex(files)
  const ux = agentTrail(files, "ux")
  if (codex ? ux.reads > (page.uxReads ?? 0) : ux.calls > (page.ux ?? 0)) return
  writeStamp(session, "ux-asked", key)
  const reason =
    `设计体验关卡：本会话写了真页面（${(page.files || []).join("、")}），最后一块写完之后还没让体验员走一遍，先别收尾。\n` +
    (codex
      ? `从头读 ${join(AGENTS, "ux.md")}，照它自己走：乱点（scripts/explore.mjs，1440 和 390 各一次）、每件任务走最短的路并数步数，交回「任务 | 现在几步 | 能少到几步 | 怎么少」，改完再交（汇报里标「自审」）。\n`
      : "用 Agent 工具起 design:ux，给它页面地址、功能清单和源码目录；它乱点、数每件任务几步、找死点，交回「任务 | 现在几步 | 能少到几步 | 怎么少」。照它改完再交（build.md 第 6 步）。\n") +
    "用户明确不要这一步时，请用户说一句「跳过体验」。\n"
  process.stdout.write(JSON.stringify({ decision: "block", reason }))
}
