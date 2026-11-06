// 展商名单：宽屏是表格（列序照用户原表），窄屏是实体行（主字 + 一行灰字，状态靠右）。点一行打开详情。
import { EmptyState, Table } from "@heroui/react"
import { motion } from "motion/react"
import { memo, type ReactNode } from "react"
import type { Exhibitor } from "~bench/data/expo"
import { Seats } from "./glyph"
import { daysLate, lateOf, md, nextOf, type Scope } from "./model"

/** 下一个截止日：逾期时红字写逾期几天，是这一行唯一的状态色 */
export const NextDue = memo(function NextDue({ e, short }: { e: Exhibitor; short?: boolean }) {
  const late = lateOf(e).sort((a, b) => a.due.localeCompare(b.due))
  if (late.length) {
    return (
      <span className="whitespace-nowrap">
        <span className="text-danger">逾期 {daysLate(late[0].due)} 天</span>
        {!short && <span className="text-muted"> {late[0].name}{late.length > 1 ? ` 等 ${late.length} 项` : ""}</span>}
      </span>
    )
  }
  const next = nextOf(e)
  if (!next) return <span className="text-muted">—</span>
  return (
    <span className="whitespace-nowrap">
      {md(next.due)}
      {!short && <span className="text-muted"> {next.name}</span>}
    </span>
  )
})

const lastReminder = (e: Exhibitor) => (e.reminders[0] ? `${md(e.reminders[0].date)} · ${e.reminders[0].channel}` : "—")

/** 新插的那一行从 0 高长出来，下面的行跟着让位（pad 抵掉单元格的上下内边距） */
function Fresh({ on, pad = 0, children }: { on: boolean; pad?: number; children: ReactNode }) {
  if (!on) return <>{children}</>
  return (
    <motion.div
      initial={{ height: 0, opacity: 0, marginTop: -pad, marginBottom: -pad }}
      animate={{ height: "auto", opacity: 1, marginTop: 0, marginBottom: 0 }}
      transition={{ type: "spring", duration: 0.45, bounce: 0 }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  )
}

const name = (e: Exhibitor) => e.company || <span className="text-muted">新展商</span>

function Empty({ query }: { query: string }) {
  return (
    <EmptyState className="flex h-40 items-center justify-center text-sm text-muted">
      {query ? `没有叫「${query}」的展商` : "这里没有展商"}
    </EmptyState>
  )
}

type Props = { rows: Exhibitor[]; scope: Scope; query: string; freshId: string | null; onOpen: (id: string) => void }

/** 打开着的那一行留底：只换一条样式，不让整张表重画 */
export function OpenRowStyle({ id }: { id: string | null }) {
  if (!id) return null
  return <style>{`[data-roster] tr[data-key="${id}"] > td { background-color: var(--default); }`}</style>
}

export const RosterTable = memo(function RosterTable({ rows, scope, query, freshId, onOpen }: Props) {
  const showPkg = scope === "全部" || scope === "逾期"
  return (
    <Table variant="secondary" data-roster className="h-full grid-rows-[minmax(0,1fr)]">
      <Table.ScrollContainer data-roster-scroll className="overflow-y-auto px-4">
        <Table.Content
          aria-label="展商名单"
          onRowAction={(key) => onOpen(String(key))}
        >
          <Table.Header className="sticky top-0 z-10">
            <Table.Column isRowHeader id="company" className="min-w-40">公司</Table.Column>
            {showPkg ? <Table.Column id="pkg" className="w-20">套餐</Table.Column> : null}
            <Table.Column id="owner" className="w-22">负责人</Table.Column>
            <Table.Column id="progress" className="w-56">交付进度</Table.Column>
            <Table.Column id="due">下一个截止日</Table.Column>
            <Table.Column id="last" className="w-36">最近催办</Table.Column>
          </Table.Header>
          <Table.Body items={rows} dependencies={[showPkg]} renderEmptyState={() => <Empty query={query} />}>
            {(e) => {
              const fresh = e.id === freshId
              return (
                <Table.Row id={e.id} className="cursor-pointer" data-company={e.company}>
                  <Table.Cell className="whitespace-nowrap font-medium"><Fresh on={fresh} pad={12}>{name(e)}</Fresh></Table.Cell>
                  {showPkg ? (
                    <Table.Cell className="whitespace-nowrap"><Fresh on={fresh} pad={12}>{e.pkg}</Fresh></Table.Cell>
                  ) : null}
                  <Table.Cell className="whitespace-nowrap"><Fresh on={fresh} pad={12}>{e.owner}</Fresh></Table.Cell>
                  <Table.Cell><Fresh on={fresh} pad={12}><Seats rights={e.rights} /></Fresh></Table.Cell>
                  <Table.Cell><Fresh on={fresh} pad={12}><NextDue e={e} /></Fresh></Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-muted"><Fresh on={fresh} pad={12}>{lastReminder(e)}</Fresh></Table.Cell>
                </Table.Row>
              )
            }}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
})

export const RosterList = memo(function RosterList({ rows, query, openId, freshId, onOpen }: Omit<Props, "scope"> & { openId: string | null }) {
  if (!rows.length) return <Empty query={query} />
  return (
    <ul aria-label="展商名单" className="flex flex-col">
      {rows.map((e) => (
        <li key={e.id} className="border-b border-separator">
          <Fresh on={e.id === freshId}>
            <button
              type="button"
              onClick={() => onOpen(e.id)}
              data-company={e.company}
              aria-current={e.id === openId || undefined}
              className="flex w-full flex-col gap-2 px-4 py-3 text-left outline-none active:bg-default focus-visible:bg-default"
            >
              <span className="flex w-full items-center justify-between gap-3">
                <span className="truncate font-medium">{name(e)}</span>
                <span className="shrink-0 text-sm"><NextDue e={e} short /></span>
              </span>
              <span className="flex w-full items-center justify-between gap-3">
                <Seats rights={e.rights} />
                <span className="shrink-0 text-xs text-muted">{e.pkg} · {e.owner}</span>
              </span>
            </button>
          </Fresh>
        </li>
      ))}
    </ul>
  )
})
