import { PACKAGE_RIGHTS, RIGHT_FLOW, TODAY, isOverdue, type Exhibitor, type Pkg, type Right, type RightStatus } from "~bench/data/expo"

export type Scope = "all" | "overdue" | Pkg
export type Tone = "danger" | "warning" | "muted"

export const PAGE_SIZE = 14

export const days = (a: string, b: string) => Math.round((Date.parse(a) - Date.parse(b)) / 86400000)

export const shortDate = (iso: string) => `${Number(iso.slice(5, 7))} 月 ${Number(iso.slice(8, 10))} 日`

export function dueLabel(due: string): { text: string; tone: Tone } {
  const d = days(due, TODAY)
  if (d < 0) return { text: `逾期 ${-d} 天`, tone: "danger" }
  if (d === 0) return { text: "今天到期", tone: "warning" }
  if (d <= 7) return { text: `还剩 ${d} 天`, tone: "warning" }
  return { text: shortDate(due), tone: "muted" }
}

export const toneClass: Record<Tone, string> = {
  danger: "text-danger font-medium",
  warning: "text-warning",
  muted: "text-muted",
}

export const deliveredCount = (e: Exhibitor) => e.rights.filter((r) => r.status === "已交付").length

export const nextRight = (e: Exhibitor): Right | undefined =>
  e.rights.filter((r) => r.status !== "已交付").sort((a, b) => a.due.localeCompare(b.due))[0]

export const stepLabel: Record<RightStatus, string | null> = {
  待提交物料: "收到物料",
  待审核: "审核通过",
  已交付: null,
}

export const nextStatus = (s: RightStatus): RightStatus => RIGHT_FLOW[Math.min(RIGHT_FLOW.indexOf(s) + 1, RIGHT_FLOW.length - 1)]

export const statusColor: Record<RightStatus, "default" | "warning" | "success"> = {
  待提交物料: "default",
  待审核: "warning",
  已交付: "success",
}

// 下一个截止日升序；同一天先排交付少的；全部交付的放最后
export function byNextDue(a: Exhibitor, b: Exhibitor) {
  const da = nextRight(a)?.due ?? "9999"
  const db = nextRight(b)?.due ?? "9999"
  if (da !== db) return da.localeCompare(db)
  const ra = deliveredCount(a) / a.rights.length
  const rb = deliveredCount(b) / b.rights.length
  if (ra !== rb) return ra - rb
  return a.company.localeCompare(b.company, "zh")
}

export type OverdueRow = { e: Exhibitor; r: Right }

export function overdueRows(list: Exhibitor[], keep: ReadonlySet<string>): OverdueRow[] {
  return list
    .flatMap((e) => e.rights.filter((r) => isOverdue(r) || keep.has(r.id)).map((r) => ({ e, r })))
    .sort((x, y) => x.r.due.localeCompare(y.r.due) || x.e.company.localeCompare(y.e.company, "zh"))
}

export function progressOf(list: Exhibitor[]) {
  const rights = list.flatMap((e) => e.rights)
  const done = rights.filter((r) => r.status === "已交付").length
  return { done, total: rights.length, value: rights.length ? (done / rights.length) * 100 : 0 }
}

export function makeExhibitor(id: string, company: string, pkg: Pkg, owner: string): Exhibitor {
  return {
    id,
    company,
    pkg,
    owner,
    signedAt: TODAY,
    booth: null,
    contact: { name: "", title: "", phone: "", email: "", wechat: "" },
    rights: PACKAGE_RIGHTS[pkg].map(([name, kind, due], i) => ({
      id: `${id}-${i + 1}`,
      name,
      kind,
      status: "待提交物料" as RightStatus,
      due,
      material: null,
    })),
    reminders: [],
  }
}

export const sameName = (a: string, b: string) => a.replace(/\s+/g, "").toLowerCase() === b.replace(/\s+/g, "").toLowerCase()
