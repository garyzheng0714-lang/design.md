import { Button, Input, ListBox, Pagination, Table, TextField, ToggleButton, ToggleButtonGroup } from "@heroui/react"
import { Plus } from "lucide-react"
import { motion } from "motion/react"
import { memo, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import { ME, OWNERS, PACKAGES, PACKAGE_RIGHTS, type Exhibitor, type Pkg } from "~bench/data/expo"
import { PAGE_SIZE, deliveredCount, nextRight, shortDate, stepLabel, type OverdueRow } from "./model"
import { DueText, Progress, StatusChip, ease, useGlide } from "./parts"

export type Enter = { key: string; dir: 1 | -1 | 0 }

const enterFrom = (dir: 1 | -1 | 0) => (dir === 0 ? { opacity: 0.4, y: 8 } : { opacity: 0.4, x: dir * 16 })

// 换范围、翻页：新的一页从翻页方向（或从下方）淡入，不重建表格
function useEnter(ref: React.RefObject<HTMLElement | null>, enter: Enter) {
  const first = useRef(true)
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const from = enter.dir === 0 ? "translateY(8px)" : `translateX(${enter.dir * 16}px)`
    ref.current?.animate([{ opacity: 0.4, transform: from }, { opacity: 1, transform: "none" }], { duration: 240, easing: "cubic-bezier(0.2, 0, 0, 1)" })
  }, [ref, enter.key, enter.dir])
}

export function Pager({ page, pages, total, unit, onPage }: { page: number; pages: number; total: number; unit: string; onPage: (p: number, dir: 1 | -1) => void }) {
  if (pages <= 1) return null
  const start = (page - 1) * PAGE_SIZE + 1
  const end = Math.min(page * PAGE_SIZE, total)
  return (
    <Pagination size="sm" className="ml-auto w-auto gap-4">
      <Pagination.Summary className="tabular-nums">
        {start}–{end}，共 {total} {unit}
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous aria-label="上一页" isDisabled={page === 1} onPress={() => onPage(page - 1, -1)}>
            <Pagination.PreviousIcon />
          </Pagination.Previous>
        </Pagination.Item>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link isActive={p === page} aria-label={`第 ${p} 页`} onPress={() => p !== page && onPage(p, p > page ? 1 : -1)}>
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next aria-label="下一页" isDisabled={page === pages} onPress={() => onPage(page + 1, 1)}>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  )
}

const lastReminder = (e: Exhibitor) => {
  const r = e.reminders[0]
  return r ? `${shortDate(r.date)} · ${r.channel}` : "—"
}

const rowClass = (flash: boolean) => (flash ? "cursor-pointer w-flash" : "cursor-pointer")

type GridProps = { rows: Exhibitor[]; enter: Enter; flashId: string | null; onOpen: (id: string) => void; draft: ReactNode; empty: ReactNode }

export function ExhibitorTable({ footer, ...grid }: GridProps & { footer: ReactNode }) {
  return (
    <Table className="w-table">
      <ExhibitorGrid {...grid} />
      <Table.Footer className="gap-4">{footer}</Table.Footer>
    </Table>
  )
}

const ExhibitorGrid = memo(function ExhibitorGrid({ rows, enter, flashId, onOpen, draft, empty }: GridProps) {
  const box = useRef<HTMLDivElement>(null)
  useGlide(box, enter.key, rows.map((r) => r.id).join())
  useEnter(box, enter)
  const body = useMemo(
    () =>
      rows.map((e) => {
        const nr = nextRight(e)
        return (
          <Table.Row key={e.id} id={e.id} data-row={e.id} data-glide={e.id} className={rowClass(e.id === flashId)}>
            <Table.Cell>
              <span className="font-medium">{e.company}</span>
            </Table.Cell>
            <Table.Cell>{e.pkg}</Table.Cell>
            <Table.Cell>{e.owner}</Table.Cell>
            <Table.Cell>
              <Progress done={deliveredCount(e)} total={e.rights.length} />
            </Table.Cell>
            <Table.Cell>{nr ? <DueText due={nr.due} suffix={nr.name} /> : <span className="text-muted">—</span>}</Table.Cell>
            <Table.Cell>
              <span className="whitespace-nowrap text-muted">{lastReminder(e)}</span>
            </Table.Cell>
          </Table.Row>
        )
      }),
    [rows, flashId],
  )
  return (
    <div ref={box}>
      <Table.ScrollContainer>
        <Table.Content aria-label="展商" className="table-fixed" onRowAction={(k) => k !== "draft" && onOpen(String(k))}>
          <Table.Header>
            <Table.Column isRowHeader className="w-[136px]">
              公司
            </Table.Column>
            <Table.Column className="w-[68px]">套餐</Table.Column>
            <Table.Column className="w-[84px]">负责人</Table.Column>
            <Table.Column className="w-[184px]">交付进度</Table.Column>
            <Table.Column className="w-[196px]">下一个截止</Table.Column>
            <Table.Column>最近催办</Table.Column>
          </Table.Header>
          <Table.Body renderEmptyState={() => empty}>
            {body}
            {draft ? (
              <Table.Row key="draft" id="draft">
                <Table.Cell colSpan={6}>{draft}</Table.Cell>
              </Table.Row>
            ) : null}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </div>
  )
})

type OverdueGridProps = {
  rows: OverdueRow[]
  enter: Enter
  undo: Record<string, unknown>
  onOpen: (id: string) => void
  onAdvance: (row: OverdueRow) => void
  onRevert: (row: OverdueRow) => void
  empty: ReactNode
}

export function OverdueTable({ footer, ...grid }: OverdueGridProps & { footer: ReactNode }) {
  return (
    <Table className="w-table">
      <OverdueGrid {...grid} />
      <Table.Footer className="gap-4">{footer}</Table.Footer>
    </Table>
  )
}

const OverdueGrid = memo(function OverdueGrid({ rows, enter, undo, onOpen, onAdvance, onRevert, empty }: OverdueGridProps) {
  const box = useRef<HTMLDivElement>(null)
  useEnter(box, enter)
  return (
    <div ref={box}>
      <Table.ScrollContainer>
        <Table.Content aria-label="逾期权益" className="table-fixed" onRowAction={(k) => onOpen(String(k).split("|")[0])}>
          <Table.Header>
            <Table.Column isRowHeader className="w-[172px]">
              公司
            </Table.Column>
            <Table.Column className="w-[160px]">权益</Table.Column>
            <Table.Column className="w-[124px]">状态</Table.Column>
            <Table.Column className="w-[112px]">截止</Table.Column>
            <Table.Column className="w-[84px]">负责人</Table.Column>
            <Table.Column>
              <span className="sr-only">推进</span>
            </Table.Column>
          </Table.Header>
          <Table.Body renderEmptyState={() => empty}>
            {rows.map((row) => {
              const { e, r } = row
              const step = stepLabel[r.status]
              const canUndo = Boolean(undo[r.id])
              return (
                <Table.Row key={r.id} id={`${e.id}|${r.id}`} data-row={r.id} className={`group ${rowClass(false)}`}>
                  <Table.Cell>
                    <span className="font-medium">{e.company}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="whitespace-nowrap">{r.name}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <StatusChip status={r.status} />
                  </Table.Cell>
                  <Table.Cell>{r.status === "已交付" ? <span className="text-muted">{shortDate(r.due)}</span> : <DueText due={r.due} />}</Table.Cell>
                  <Table.Cell>{e.owner}</Table.Cell>
                  <Table.Cell className="py-2">
                    <span className={`flex transition-opacity duration-150 ${canUndo ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"}`}>
                      {canUndo ? (
                        <Button size="sm" variant="ghost" onPress={() => onRevert(row)}>
                          撤销
                        </Button>
                      ) : step ? (
                        <Button size="sm" variant="secondary" onPress={() => onAdvance(row)}>
                          {step}
                        </Button>
                      ) : null}
                    </span>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </div>
  )
})

export const MobileList = memo(function MobileList(props: { rows: Exhibitor[]; enter: Enter; flashId: string | null; onOpen: (id: string) => void; empty: ReactNode }) {
  const { rows, enter, flashId, onOpen, empty } = props
  if (!rows.length) return <>{empty}</>
  return (
    <motion.div key={enter.key} initial={enterFrom(enter.dir)} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.24, ease }}>
      <ListBox aria-label="展商" selectionMode="none" onAction={(k) => onOpen(String(k))} className="w-full gap-0 p-0">
        {rows.map((e) => {
          const nr = nextRight(e)
          return (
            <ListBox.Item key={e.id} id={e.id} textValue={e.company} className={`grid w-full grid-cols-1 gap-2 rounded-xl px-3 py-3 ${e.id === flashId ? "w-flash-item" : ""}`}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium">{e.company}</span>
                {nr ? <DueText due={nr.due} /> : <span className="text-muted">—</span>}
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-muted">
                  {e.pkg} · {e.owner}
                </span>
                <Progress done={deliveredCount(e)} total={e.rights.length} />
              </div>
            </ListBox.Item>
          )
        })}
      </ListBox>
    </motion.div>
  )
})

export const MobileOverdue = memo(function MobileOverdue(props: { rows: OverdueRow[]; enter: Enter; onOpen: (id: string) => void; empty: ReactNode }) {
  const { rows, enter, onOpen, empty } = props
  if (!rows.length) return <>{empty}</>
  return (
    <motion.div key={enter.key} initial={enterFrom(enter.dir)} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.24, ease }}>
      <ListBox aria-label="逾期权益" selectionMode="none" onAction={(k) => onOpen(String(k).split("|")[0])} className="w-full gap-0 p-0">
        {rows.map(({ e, r }) => (
          <ListBox.Item key={r.id} id={`${e.id}|${r.id}`} textValue={`${e.company} ${r.name}`} className="grid w-full grid-cols-1 gap-2 rounded-xl px-3 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium">{e.company}</span>
              {r.status === "已交付" ? <span className="text-xs text-muted">{shortDate(r.due)}</span> : <DueText due={r.due} />}
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted">{r.name}</span>
              <StatusChip status={r.status} />
            </div>
          </ListBox.Item>
        ))}
      </ListBox>
    </motion.div>
  )
})

const stopGrid = (ev: KeyboardEvent) => ev.stopPropagation()

export function DraftRow({ list, defaultPkg, onAdd, onCancel, stacked }: { list: Exhibitor[]; defaultPkg?: Pkg; onAdd: (company: string, pkg: Pkg, owner: string) => void; onCancel: () => void; stacked?: boolean }) {
  const [name, setName] = useState("")
  const [pkg, setPkg] = useState<Pkg | null>(defaultPkg ?? null)
  const [owner, setOwner] = useState(ME)
  const trimmed = name.trim()
  const dup = trimmed.length > 0 && list.some((e) => e.company.replace(/\s+/g, "").toLowerCase() === trimmed.replace(/\s+/g, "").toLowerCase())
  const ready = trimmed.length > 0 && !dup && pkg !== null
  const submit = () => ready && pkg && onAdd(trimmed, pkg, owner)
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease }}
      className={stacked ? "grid gap-3" : "flex flex-wrap items-center gap-3"}
      onKeyDown={stopGrid}
      onPointerDown={(ev) => ev.stopPropagation()}
    >
      <TextField aria-label="公司名" value={name} onChange={setName} isInvalid={dup} className={stacked ? "" : "w-[172px]"}>
        <Input
          autoFocus
          placeholder="公司名"
          onKeyDown={(ev) => {
            if (ev.key === "Enter" && !ev.nativeEvent.isComposing) submit()
            if (ev.key === "Escape") onCancel()
          }}
        />
      </TextField>
      <ToggleButtonGroup aria-label="套餐" selectionMode="single" disallowEmptySelection selectedKeys={pkg ? new Set([pkg]) : new Set()} onSelectionChange={(k) => setPkg(([...k][0] as Pkg) ?? null)}>
        {PACKAGES.map((p, i) => (
          <ToggleButton key={p} id={p}>
            {i > 0 && <ToggleButtonGroup.Separator />}
            {p}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup aria-label="负责人" selectionMode="single" disallowEmptySelection selectedKeys={new Set([owner])} onSelectionChange={(k) => setOwner(String([...k][0] ?? ME))}>
        {OWNERS.map((o, i) => (
          <ToggleButton key={o} id={o}>
            {i > 0 && <ToggleButtonGroup.Separator />}
            {o}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <span role={dup ? "alert" : undefined} className={`min-w-16 text-xs tabular-nums ${dup ? "text-danger" : "text-muted"}`}>
        {dup ? "名单里已有这家" : pkg ? `0 / ${PACKAGE_RIGHTS[pkg].length} 项` : ""}
      </span>
      <span className={`flex gap-2 ${stacked ? "" : "ml-auto"}`}>
        <Button variant="ghost" onPress={onCancel}>
          取消
        </Button>
        <Button variant="primary" isDisabled={!ready} onPress={submit}>
          添加
        </Button>
      </span>
    </motion.div>
  )
}

export function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <Button size="sm" variant="ghost" onPress={onPress}>
      <Plus size={16} />
      新增展商
    </Button>
  )
}
