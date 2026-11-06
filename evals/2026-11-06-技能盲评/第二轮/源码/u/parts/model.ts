// 展商页的数据小工具：视图、进度、截止日、推进、新增。只读原始数据，改动都在页面状态里。
import { EXHIBITORS, ME, PACKAGE_RIGHTS, RIGHT_FLOW, TODAY, isOverdue, type Exhibitor, type Pkg, type Right, type RightStatus } from "~bench/data/expo"

export type Scope = "全部" | Pkg | "逾期"
export const scopeTitle = (s: Scope) => (s === "全部" ? "全部展商" : s)

export const cloneExhibitors = (): Exhibitor[] => structuredClone(EXHIBITORS)

/** 2026-11-20 → 11 月 20 日 */
export const md = (d: string) => `${Number(d.slice(5, 7))} 月 ${Number(d.slice(8, 10))} 日`
export const daysLate = (due: string) => Math.round((Date.parse(TODAY) - Date.parse(due)) / 864e5)

export const doneOf = (rights: Right[]) => rights.filter((r) => r.status === "已交付").length
export const lateOf = (e: Exhibitor) => e.rights.filter((r) => isOverdue(r))
/** 还没交付的里最早到期的一项 */
export const nextOf = (e: Exhibitor) =>
  e.rights.filter((r) => r.status !== "已交付").sort((a, b) => a.due.localeCompare(b.due))[0] ?? null

export const inScope = (e: Exhibitor, s: Scope) => (s === "全部" ? true : s === "逾期" ? lateOf(e).length > 0 : e.pkg === s)

export function progressOf(list: Exhibitor[], s: Scope) {
  const rights = list.filter((e) => inScope(e, s)).flatMap((e) => e.rights)
  return { done: doneOf(rights), total: rights.length }
}
export const lateCount = (list: Exhibitor[]) => list.reduce((n, e) => n + lateOf(e).length, 0)

/** 推进一步：待提交物料 → 待审核 → 已交付 */
export const nextStatus = (s: RightStatus): RightStatus | null => RIGHT_FLOW[RIGHT_FLOW.indexOf(s) + 1] ?? null
export const ADVANCE_LABEL: Record<RightStatus, string | null> = { 待提交物料: "收到物料", 待审核: "审核通过", 已交付: null }

export const blankDraft = (pkg: Pkg): Draft => ({ company: "", pkg, owner: ME, name: "", title: "", phone: "", email: "", wechat: "" })

export type Draft = { company: string; pkg: Pkg; owner: string; name: string; title: string; phone: string; email: string; wechat: string }

export function rightsFor(pkg: Pkg, prefix: string): Right[] {
  return PACKAGE_RIGHTS[pkg].map(([name, kind, due], i) => ({ id: `${prefix}-${i + 1}`, name, kind, status: "待提交物料", due, material: null }))
}

/** 边填边存：套餐一换，权益照新套餐重新带出 */
export function applyPatch(e: Exhibitor, p: Partial<Draft>): Exhibitor {
  const { company, pkg, owner, ...contact } = p
  return {
    ...e,
    company: company ?? e.company,
    owner: owner ?? e.owner,
    pkg: pkg ?? e.pkg,
    rights: pkg && pkg !== e.pkg ? rightsFor(pkg, e.id) : e.rights,
    contact: { ...e.contact, ...contact },
  }
}

export function createExhibitor(d: Draft, seq: number): Exhibitor {
  const id = `n${seq}`
  return {
    id,
    company: d.company.trim(),
    pkg: d.pkg,
    owner: d.owner,
    signedAt: TODAY,
    booth: null,
    contact: { name: d.name.trim(), title: d.title.trim(), phone: d.phone.trim(), email: d.email.trim(), wechat: d.wechat.trim() },
    rights: rightsFor(d.pkg, id),
    reminders: [],
  }
}
