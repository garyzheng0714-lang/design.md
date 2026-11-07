import { parseDate, type CalendarDate } from "@internationalized/date"
import { PACKAGE_RIGHTS, RIGHT_FLOW, TODAY, isOverdue, type Channel, type Exhibitor, type Pkg, type Right, type RightStatus } from "~bench/data/expo"

export type Scope = "all" | "late" | Pkg
export type Tone = "danger" | "warning" | "plain" | "done"

const DAY = 86_400_000
const toTime = (iso: string) => Date.parse(iso + "T00:00:00Z")

/** b 比 a 晚几天 */
export const daysBetween = (a: string, b: string) => Math.round((toTime(b) - toTime(a)) / DAY)

export const md = (iso: string) => {
  const [, m, d] = iso.split("-").map(Number)
  return `${m} 月 ${d} 日`
}

/** 截止日：逾期写逾期几天，一周内写还剩几天，远的写日期 */
export function dueText(r: Right): { text: string; tone: Tone } {
  if (r.status === "已交付") return { text: md(r.due), tone: "done" }
  const left = daysBetween(TODAY, r.due)
  if (left < 0) return { text: `逾期 ${-left} 天`, tone: "danger" }
  if (left === 0) return { text: "今天到期", tone: "warning" }
  if (left <= 7) return { text: `还剩 ${left} 天`, tone: "warning" }
  return { text: md(r.due), tone: "plain" }
}

export const TONE_CLASS: Record<Tone, string> = {
  danger: "text-danger-soft-foreground",
  warning: "text-warning-soft-foreground",
  plain: "text-foreground",
  done: "text-muted",
}

/** 过去的日期：一周内写今天、昨天、几天前，再远写几月几日 */
export function whenText(iso: string) {
  const n = daysBetween(iso, TODAY)
  if (n <= 0) return "今天"
  if (n === 1) return "昨天"
  if (n <= 7) return `${n} 天前`
  return md(iso)
}

export const NEXT_ACTION: Record<RightStatus, string | null> = {
  待提交物料: "收到物料",
  待审核: "审核通过",
  已交付: null,
}

export const STATUS_COLOR: Record<RightStatus, "default" | "warning" | "success"> = {
  待提交物料: "default",
  待审核: "warning",
  已交付: "success",
}

export const nextStatus = (s: RightStatus): RightStatus => RIGHT_FLOW[Math.min(RIGHT_FLOW.indexOf(s) + 1, RIGHT_FLOW.length - 1)]

const byDue = (a: Right, b: Right) => a.due.localeCompare(b.due) || a.id.localeCompare(b.id)

/** 还没交付的里截止最早的一项 */
export const nextRight = (e: Exhibitor) => e.rights.filter((r) => r.status !== "已交付").sort(byDue)[0] ?? null

/** 详情里的权益：没交付的按截止日在前，已交付的沉底 */
export const orderedRights = (e: Exhibitor) => [
  ...e.rights.filter((r) => r.status !== "已交付").sort(byDue),
  ...e.rights.filter((r) => r.status === "已交付").sort(byDue),
]

export const delivered = (e: Exhibitor) => e.rights.filter((r) => r.status === "已交付").length

/** 名单默认按下一个截止日升序，全部交付的排最后 */
export function sortExhibitors(list: Exhibitor[]) {
  return [...list].sort((a, b) => {
    const na = nextRight(a), nb = nextRight(b)
    if (!na || !nb) return na ? -1 : nb ? 1 : a.company.localeCompare(b.company, "zh")
    return byDue(na, nb) || a.company.localeCompare(b.company, "zh")
  })
}

export type LateRow = { exId: string; rightId: string }

export function lateRows(list: Exhibitor[]): LateRow[] {
  return list
    .flatMap((e) => e.rights.filter((r) => isOverdue(r)).map((r) => ({ e, r })))
    .sort((a, b) => byDue(a.r, b.r) || a.e.company.localeCompare(b.e.company, "zh"))
    .map(({ e, r }) => ({ exId: e.id, rightId: r.id }))
}

export const lateCount = (list: Exhibitor[]) => list.reduce((n, e) => n + e.rights.filter((r) => isOverdue(r)).length, 0)

export function pkgProgress(list: Exhibitor[], pkg?: Pkg) {
  let done = 0, total = 0
  for (const e of list) {
    if (pkg && e.pkg !== pkg) continue
    done += delivered(e)
    total += e.rights.length
  }
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
}

/** 收到物料时按现有物料的命名记下文件名；票务类没有文件 */
export function materialFor(company: string, r: Right) {
  if (r.kind === "票务") return null
  return `${company}-${r.name.replace(/\s+/g, "")}-v1.${r.kind === "线上" ? "png" : "pdf"}`
}

/** 改一项权益的状态，物料跟着状态走 */
export function withStatus(company: string, r: Right, status: RightStatus): Right {
  if (status === "待提交物料") return { ...r, status, material: null }
  return { ...r, status, material: r.material ?? materialFor(company, r) }
}

export function newExhibitor(id: string, company: string, pkg: Pkg, owner: string): Exhibitor {
  return {
    id,
    company,
    pkg,
    owner,
    signedAt: TODAY,
    booth: null,
    contact: { name: "", title: "", phone: "", email: "", wechat: "" },
    rights: PACKAGE_RIGHTS[pkg].map(([name, kind, due], i) => ({ id: `${id}-${i + 1}`, name, kind, status: "待提交物料", due, material: null })),
    reminders: [],
  }
}

const CHANNEL_WORDS: [Channel, RegExp][] = [
  ["电话", /电话|打电话|致电|来电/],
  ["微信", /微信/],
  ["邮件", /邮件|邮箱|email/i],
  ["面谈", /面谈|拜访|见面|碰面|上门/],
]

/** 内容里提到了方式就用它，否则沿用这家上次的方式 */
export function guessChannel(text: string, fallback: Channel): Channel {
  return CHANNEL_WORDS.find(([, re]) => re.test(text))?.[0] ?? fallback
}

export const toCal = (iso: string): CalendarDate => parseDate(iso)
export const fromCal = (d: CalendarDate) => d.toString()
