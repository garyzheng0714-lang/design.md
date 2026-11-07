// 会话记录里的痕迹：precedent-gate（写界面前）与 ux-gate（收尾前）共用。
// 监工、体验两个子智能体在 plugin/agents/（用户 2026-11-07 要的两个智能体）：Claude Code 里认「成功起过它」和「之后 SendMessage 给它」，
// Codex 和子智能体里起不了子智能体，认「从头到尾读过 agents/<名字>.md」（照它自审）。
// 只认结构化的工具调用和结果，不认正文里提到的名字（关卡的提示里就有这些字）。
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { basename, dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

export const AGENTS = join(dirname(fileURLToPath(import.meta.url)), "../../agents")

/** 本会话的记录：主记录、子智能体记录 */
export function transcriptFiles(i) {
  const list = [i.transcript_path, i.agent_transcript_path].filter((p) => p && existsSync(p))
  if (i.transcript_path && i.session_id) {
    const sub = join(dirname(i.transcript_path), i.session_id, "subagents")
    if (existsSync(sub)) for (const f of readdirSync(sub)) if (f.endsWith(".jsonl")) list.push(join(sub, f))
  }
  return [...new Set(list)].filter((p) => statSync(p).isFile())
}

/** Codex 的记录每行带 payload（Claude Code 的没有） */
export function isCodex(paths) {
  for (const p of paths) {
    const first = readFileSync(p, "utf8").split("\n").find((l) => l.trim())
    if (!first) continue
    try { return JSON.parse(first).payload !== undefined } catch { return false }
  }
  return false
}

/** 这一行是用户亲口说的话（不是工具结果、不是关卡的提示、不是技能正文） */
export function userSaid(line, re) {
  let d
  try { d = JSON.parse(line) } catch { return false }
  const text = (c) => (typeof c === "string" ? c : Array.isArray(c) ? c.filter((x) => x.type === "text" || x.type === "input_text").map((x) => x.text).join("\n") : "")
  const gate = /Base directory for this skill|<skill>|precedent-gate|先例关卡|方案图关卡|监工关卡|体验关卡/
  if (d.type === "user" && !d.isMeta) return re.test(text(d.message?.content)) && !gate.test(text(d.message?.content))
  if (d.payload?.type === "message" && d.payload.role === "user") return re.test(text(d.payload.content)) && !gate.test(text(d.payload.content))
  return false
}
export const userSkipped = (paths, re) => paths.some((p) => readFileSync(p, "utf8").split("\n").some((line) => re.test(line) && userSaid(line, re)))

/** 关卡之间传话的小文件：<tmp>/design-gate/<会话>.<名字> */
const stampPath = (session, name) => join(tmpdir(), "design-gate", `${String(session).replace(/[^\w-]/g, "_")}.${name}`)
export const readStamp = (session, name) => { try { return session ? JSON.parse(readFileSync(stampPath(session, name), "utf8")) : null } catch { return null } }
export const writeStamp = (session, name, value) => { if (!session) return; mkdirSync(join(tmpdir(), "design-gate"), { recursive: true }); writeFileSync(stampPath(session, name), JSON.stringify(value)) }

/** 读全一份智能体文件的凭据：frontmatter 之后第一行和末行 */
function proofOf(kind) {
  const lines = readFileSync(join(AGENTS, `${kind}.md`), "utf8").split("\n").map((l) => l.trim()).filter(Boolean)
  return [lines.find((l) => l !== "---"), lines.at(-1)]
}

/** 工具结果里的文字 */
function textOf(v) {
  if (typeof v === "string") {
    if (!v.startsWith("{")) return v
    try { return textOf(JSON.parse(v)) } catch { return v }
  }
  if (Array.isArray(v)) return v.map(textOf).join("\n")
  return v && typeof v === "object" ? textOf(v.text ?? v.content ?? v.output ?? v.stdout ?? v.aggregated_output ?? "") : ""
}

/** kind = "supervisor" | "ux"：calls = 成功起过它、成功 SendMessage 给它的次数；reads = 从头到尾读过 agents/<kind>.md 的次数 */
export function agentTrail(paths, kind) {
  const type = new RegExp(String.raw`(^|:)${kind}$`)
  const file = `agents/${kind}.md`
  const [head, tail] = proofOf(kind)
  const ids = new Set() // 这个子智能体的 agentId
  for (const p of paths) {
    const m = basename(p).match(/^agent-(\w+)\.jsonl$/)
    const meta = m && join(dirname(p), `agent-${m[1]}.meta.json`)
    if (meta && existsSync(meta)) { try { if (type.test(JSON.parse(readFileSync(meta, "utf8")).agentType || "")) ids.add(m[1]) } catch {} }
  }
  const spawns = new Set(), sends = new Map(), readCalls = new Set()
  const called = new Set(), read = new Set() // 按调用去重（同一次调用的结果可能记两遍）
  const isRead = (s) => s.includes(file)
  for (const p of paths) {
    for (const line of readFileSync(p, "utf8").split("\n")) {
      if (!line.includes(kind) && !line.includes("SendMessage") && !line.includes("payload") && ![...spawns, ...sends.keys(), ...readCalls].some((id) => line.includes(id))) continue
      let d
      try { d = JSON.parse(line) } catch { continue }
      const content = d?.message?.content
      if (Array.isArray(content)) for (const c of content) {
        if (c.type === "tool_use" && /^(Agent|Task)$/.test(c.name) && type.test(c.input?.subagent_type || "")) spawns.add(c.id)
        if (c.type === "tool_use" && c.name === "SendMessage") sends.set(c.id, String(c.input?.to ?? ""))
        if (c.type === "tool_use" && isRead(JSON.stringify(c.input ?? ""))) readCalls.add(c.id)
        if (c.type !== "tool_result" || c.is_error) continue
        const t = textOf(c.content)
        if (spawns.has(c.tool_use_id) && !/^(Error|错误)|not found|Unknown agent/i.test(t.trim())) {
          called.add(c.tool_use_id)
          for (const m of t.matchAll(/agentId:\s*(\w+)/g)) ids.add(m[1])
        }
        const to = sends.get(c.tool_use_id)
        if (to !== undefined && (ids.has(to) || type.test(to) || (kind === "supervisor" ? /监工/ : /体验/).test(to))) called.add(c.tool_use_id)
        if (readCalls.has(c.tool_use_id) && t.includes(head) && t.includes(tail)) read.add(c.tool_use_id)
      }
      const pl = d?.payload
      if (pl && typeof pl === "object") {
        const call = /function_call|custom_tool_call/.test(pl.type || "") && !/output/.test(pl.type || "")
        if (call && isRead(JSON.stringify(pl.arguments ?? pl.input ?? ""))) readCalls.add(pl.call_id)
        if (/output/.test(pl.type || "") && readCalls.has(pl.call_id)) { const t = textOf(pl.output); if (t.includes(head) && t.includes(tail)) read.add(pl.call_id) }
        const done = pl.type === "item_completed" && pl.item?.type === "CommandExecution" ? pl.item : pl.type === "exec_command_end" ? pl : null
        if (done && done.exit_code === 0) { const t = String(done.aggregated_output ?? done.stdout ?? ""); if (t.includes(head) && t.includes(tail)) read.add(done.call_id || done.id || `${p}:${read.size}`) }
      }
    }
  }
  return { calls: called.size, reads: read.size }
}
