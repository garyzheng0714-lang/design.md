// 名单：电脑上是表格（展商 / 逾期权益两种行），手机上是列表；点一行打开那家展商。
import { motion } from "motion/react"
import { Button, Chip, ListBox, Table, type SortDescriptor } from "@heroui/react"
import { Check, SearchX } from "lucide-react"
import type { Exhibitor } from "~bench/data/expo"
import { ADVANCE_LABEL, TONE_TEXT, doneCount, dueLabel, fmtAgo, fmtDate, nextDue, type OverdueRow } from "./model"
import { EASE_OUT, Progress } from "./Detail"

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2, ease: EASE_OUT },
}

const ACTIVE_ROW = "[&>td]:!bg-accent-soft"

function NextDueCell({ ex }: { ex: Exhibitor }) {
  const nd = nextDue(ex)
  if (!nd)
    return (
      <span className="inline-flex items-center gap-1 text-success-soft-foreground">
        <Check className="size-3.5" />
        全部交付
      </span>
    )
  const { text, tone } = dueLabel(nd)
  return (
    <span className="flex min-w-0 items-baseline gap-2">
      <span className={`shrink-0 tabular-nums ${TONE_TEXT[tone]}`}>{text}</span>
      <span className="truncate text-muted">{nd.name}</span>
    </span>
  )
}

function LastRemindCell({ ex }: { ex: Exhibitor }) {
  const last = ex.reminders[0]
  if (!last) return <span className="text-muted">—</span>
  return (
    <span className="flex min-w-0 items-baseline gap-2">
      <span className="shrink-0 tabular-nums">
        {fmtAgo(last.date)} · {last.channel}
      </span>
      <span className="truncate text-muted">{last.note}</span>
    </span>
  )
}

function Empty({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-sm text-muted">
      <SearchX className="size-5" />
      <span>没有叫「{query}」的展商</span>
      <Button size="sm" variant="secondary" onPress={onClear}>
        清除搜索
      </Button>
    </div>
  )
}

function SortLabel({ children, dir }: { children: string; dir?: "ascending" | "descending" }) {
  return <Table.SortableColumnHeader sortDirection={dir}>{children}</Table.SortableColumnHeader>
}

export function RosterTable(props: {
  rows: Exhibitor[]
  activeId: string | null
  onOpen: (id: string) => void
  sort: SortDescriptor | undefined
  onSort: (s: SortDescriptor) => void
  query: string
  onClearQuery: () => void
}) {
  return (
    <motion.div {...fadeIn}>
      <Table>
        <Table.ScrollContainer className="overflow-visible">
          <Table.Content
            aria-label="展商名单"
            className="table-fixed"
            onRowAction={(key) => props.onOpen(String(key))}
            sortDescriptor={props.sort}
            onSortChange={props.onSort}
          >
            <Table.Header className="sticky top-0 z-10">
              <Table.Column isRowHeader id="company" className="w-[18%]">
                公司
              </Table.Column>
              <Table.Column id="pkg" className="w-[9%]">
                套餐
              </Table.Column>
              <Table.Column id="owner" className="w-[9%]">
                负责人
              </Table.Column>
              <Table.Column id="progress" allowsSorting className="w-[14%]">
                {({ sortDirection }) => <SortLabel dir={sortDirection}>交付进度</SortLabel>}
              </Table.Column>
              <Table.Column id="due" allowsSorting className="w-[22%]">
                {({ sortDirection }) => <SortLabel dir={sortDirection}>下一个截止</SortLabel>}
              </Table.Column>
              <Table.Column id="remind" allowsSorting className="w-[28%]">
                {({ sortDirection }) => <SortLabel dir={sortDirection}>最近催办</SortLabel>}
              </Table.Column>
            </Table.Header>
            <Table.Body renderEmptyState={() => <Empty query={props.query} onClear={props.onClearQuery} />}>
              {props.rows.map((ex) => {
                const done = doneCount(ex)
                return (
                  <Table.Row
                    key={ex.id}
                    id={ex.id}
                    data-row={ex.id}
                    className={`cursor-pointer ${props.activeId === ex.id ? ACTIVE_ROW : ""}`}
                  >
                    <Table.Cell>
                      <span className="block truncate font-medium">{ex.company}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Chip size="sm" variant="soft">
                        {ex.pkg}
                      </Chip>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap text-muted">{ex.owner}</Table.Cell>
                    <Table.Cell>
                      <span className="flex items-center gap-2.5">
                        <Progress done={done} total={ex.rights.length} className="w-16" />
                        <span className="text-xs text-muted tabular-nums">
                          {done}/{ex.rights.length}
                        </span>
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <NextDueCell ex={ex} />
                    </Table.Cell>
                    <Table.Cell>
                      <LastRemindCell ex={ex} />
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </motion.div>
  )
}

export function OverdueTable(props: {
  rows: OverdueRow[]
  activeId: string | null
  onOpen: (exId: string, rightId: string) => void
  onAdvance: (exId: string, rightId: string) => void
  query: string
  onClearQuery: () => void
}) {
  return (
    <motion.div {...fadeIn}>
      <Table>
        <Table.ScrollContainer className="overflow-visible">
          <Table.Content
            aria-label="逾期权益"
            className="table-fixed"
            onRowAction={(key) => {
              const row = props.rows.find((r) => r.right.id === key)
              if (row) props.onOpen(row.ex.id, row.right.id)
            }}
          >
            <Table.Header className="sticky top-0 z-10">
              <Table.Column isRowHeader className="w-[20%]">
                权益
              </Table.Column>
              <Table.Column className="w-[24%]">展商</Table.Column>
              <Table.Column className="w-[20%]">截止日</Table.Column>
              <Table.Column className="w-[12%]">状态</Table.Column>
              <Table.Column className="w-[9%]">负责人</Table.Column>
              <Table.Column className="w-[15%]">
                <span className="sr-only">推进</span>
              </Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() =>
                props.query ? (
                  <Empty query={props.query} onClear={props.onClearQuery} />
                ) : (
                  <div className="flex flex-col items-center gap-2 py-16 text-sm text-muted">
                    <Check className="size-5 text-success" />
                    没有逾期的权益
                  </div>
                )
              }
            >
              {props.rows.map(({ ex, right }) => {
                const label = ADVANCE_LABEL[right.status]
                return (
                  <Table.Row
                    key={right.id}
                    id={right.id}
                    data-row={right.id}
                    className={`cursor-pointer ${props.activeId === ex.id ? ACTIVE_ROW : ""}`}
                  >
                    <Table.Cell>
                      <span className="block truncate font-medium">{right.name}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="truncate">{ex.company}</span>
                        <Chip size="sm" variant="soft" className="shrink-0">
                          {ex.pkg}
                        </Chip>
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="flex items-baseline gap-2 whitespace-nowrap tabular-nums">
                        <span className="text-danger">{dueLabel(right).text}</span>
                        <span className="text-xs text-muted">{fmtDate(right.due)}</span>
                      </span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">{right.status}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap text-muted">{ex.owner}</Table.Cell>
                    <Table.Cell className="text-end">
                      {label && (
                        <Button size="sm" variant="secondary" data-advance={right.id} onPress={() => props.onAdvance(ex.id, right.id)}>
                          {label}
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </motion.div>
  )
}

export function RosterList(props: {
  rows: Exhibitor[]
  onOpen: (id: string) => void
  query: string
  onClearQuery: () => void
}) {
  if (props.rows.length === 0) return <Empty query={props.query} onClear={props.onClearQuery} />
  return (
    <motion.div {...fadeIn} className="rounded-3xl bg-surface p-1.5">
      <ListBox aria-label="展商名单" selectionMode="none" onAction={(key) => props.onOpen(String(key))}>
        {props.rows.map((ex) => {
          const done = doneCount(ex)
          return (
            <ListBox.Item key={ex.id} id={ex.id} textValue={ex.company} className="flex-col items-stretch gap-1.5 py-2.5">
              <span className="flex items-center gap-2">
                <span className="truncate text-sm font-medium">{ex.company}</span>
                <Chip size="sm" variant="soft" className="shrink-0">
                  {ex.pkg}
                </Chip>
                <span className="ms-auto shrink-0 text-xs text-muted tabular-nums">
                  {done}/{ex.rights.length}
                </span>
              </span>
              <span className="flex items-center gap-3 text-xs">
                <span className="min-w-0 flex-1">
                  <NextDueCell ex={ex} />
                </span>
                <Progress done={done} total={ex.rights.length} className="w-14 shrink-0" />
              </span>
            </ListBox.Item>
          )
        })}
      </ListBox>
    </motion.div>
  )
}

export function OverdueList(props: {
  rows: OverdueRow[]
  onOpen: (exId: string, rightId: string) => void
  query: string
  onClearQuery: () => void
}) {
  if (props.rows.length === 0)
    return props.query ? (
      <Empty query={props.query} onClear={props.onClearQuery} />
    ) : (
      <div className="flex flex-col items-center gap-2 py-16 text-sm text-muted">
        <Check className="size-5 text-success" />
        没有逾期的权益
      </div>
    )
  return (
    <motion.div {...fadeIn} className="rounded-3xl bg-surface p-1.5">
      <ListBox
        aria-label="逾期权益"
        selectionMode="none"
        onAction={(key) => {
          const row = props.rows.find((r) => r.right.id === key)
          if (row) props.onOpen(row.ex.id, row.right.id)
        }}
      >
        {props.rows.map(({ ex, right }) => (
          <ListBox.Item key={right.id} id={right.id} textValue={right.name} className="flex-col items-stretch gap-1 py-2.5">
            <span className="flex items-center gap-2">
              <span className="truncate text-sm font-medium">{right.name}</span>
              <span className="ms-auto shrink-0 text-xs text-danger tabular-nums">{dueLabel(right).text}</span>
            </span>
            <span className="flex items-center gap-2 text-xs text-muted">
              <span className="truncate">{ex.company}</span>
              <span className="ms-auto shrink-0">{right.status}</span>
            </span>
          </ListBox.Item>
        ))}
      </ListBox>
    </motion.div>
  )
}
