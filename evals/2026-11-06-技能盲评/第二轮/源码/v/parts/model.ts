// 展商页的派生数据与格式化：进度、下一个截止、逾期、相对日期、推进一步。
import {
  PACKAGE_RIGHTS,
  RIGHT_FLOW,
  TODAY,
  isOverdue,
  type Exhibitor,
  type Pkg,
  type Right,
  type RightStatus,
} from "~bench/data/expo"

export type View = "全部" | Pkg | "逾期"

const DAY = 86_400_000
const toTime = (d: string) => Date.parse(`${d}T00:00:00Z`)
export const daysFromToday = (date: string) => Math.round((toTime(date) - toTime(TODAY)) / DAY)

export const fmtDate = (date: string) => {
  const [, m, d] = date.split("-").map(Number)
  return `${m}月${d}日`
}

export const fmtAgo = (date: string) => {
  const n = -daysFromToday(date)
  if (n <= 0) return "今天"
  if (n === 1) return "昨天"
  return `${n} 天前`
}

export type Tone = "danger" | "warning" | "default" | "muted"
export const TONE_TEXT: Record<Tone, string> = {
  danger: "text-danger",
  warning: "text-warning-soft-foreground",
  default: "text-foreground",
  muted: "text-muted",
}

/** 截止日怎么读：逾期、快到、还早、已交付 */
export function dueLabel(r: Right): { text: string; tone: Tone } {
  if (r.status === "已交付") return { text: fmtDate(r.due), tone: "muted" }
  const n = daysFromToday(r.due)
  if (n < 0) return { text: `逾期 ${-n} 天`, tone: "danger" }
  if (n === 0) return { text: "今天截止", tone: "danger" }
  if (n <= 7) return { text: `还剩 ${n} 天`, tone: "warning" }
  return { text: fmtDate(r.due), tone: "default" }
}

export const doneCount = (e: Exhibitor) => e.rights.filter((r) => r.status === "已交付").length

export const nextDue = (e: Exhibitor): Right | null =>
  e.rights.filter((r) => r.status !== "已交付").sort((a, b) => a.due.localeCompare(b.due))[0] ?? null

/** 没交付的按截止日在前，已交付的沉到底 */
export const sortRights = (rights: Right[]) =>
  [...rights].sort(
    (a, b) => Number(a.status === "已交付") - Number(b.status === "已交付") || a.due.localeCompare(b.due),
  )

export const nextStatus = (s: RightStatus): RightStatus | null => RIGHT_FLOW[RIGHT_FLOW.indexOf(s) + 1] ?? null

/** 推进按钮说的是这一步做了什么 */
export const ADVANCE_LABEL: Record<RightStatus, string | null> = {
  待提交物料: "收到物料",
  待审核: "审核通过",
  已交付: null,
}

export function advanced(company: string, r: Right): Right {
  const status = nextStatus(r.status) ?? r.status
  const material =
    r.material ?? (status !== "待提交物料" && r.kind !== "票务"
      ? `${company}-${r.name.replace(/\s+/g, "")}-v1.${r.kind === "线上" ? "png" : "pdf"}`
      : null)
  return { ...r, status, material }
}

export type OverdueRow = { ex: Exhibitor; right: Right }
export const overdueRows = (list: Exhibitor[]): OverdueRow[] =>
  list
    .flatMap((ex) => ex.rights.filter((r) => isOverdue(r)).map((right) => ({ ex, right })))
    .sort((a, b) => a.right.due.localeCompare(b.right.due))

export type PkgStat = { done: number; total: number }
export function pkgStats(list: Exhibitor[]): Record<"全部" | Pkg, PkgStat> {
  const out = { 全部: { done: 0, total: 0 } } as Record<"全部" | Pkg, PkgStat>
  for (const p of Object.keys(PACKAGE_RIGHTS) as Pkg[]) out[p] = { done: 0, total: 0 }
  for (const e of list) {
    const d = doneCount(e)
    out[e.pkg].done += d
    out[e.pkg].total += e.rights.length
    out.全部.done += d
    out.全部.total += e.rights.length
  }
  return out
}

export function makeExhibitor(
  list: Exhibitor[],
  input: { company: string; pkg: Pkg; owner: string; contactName: string; phone: string },
): Exhibitor {
  const n = list.reduce((m, e) => Math.max(m, Number(e.id.slice(1)) || 0), 0) + 1
  const id = `e${String(n).padStart(2, "0")}`
  return {
    id,
    company: input.company.trim(),
    pkg: input.pkg,
    owner: input.owner,
    signedAt: TODAY,
    booth: null,
    contact: { name: input.contactName.trim(), title: "", phone: input.phone.trim(), email: "", wechat: "" },
    rights: PACKAGE_RIGHTS[input.pkg].map(([name, kind, due], i) => ({
      id: `${id}-${i + 1}`,
      name,
      kind,
      status: "待提交物料",
      due,
      material: null,
    })),
    reminders: [],
  }
}
