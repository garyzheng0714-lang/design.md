import { Button, FieldError, Input, ListBox, Select, Table, TextField, Tooltip } from "@heroui/react"
import { AnimatePresence, motion } from "motion/react"
import { Plus, Undo2, X } from "lucide-react"
import { useLayoutEffect, useRef, useState, type ComponentProps, type KeyboardEvent, type ReactNode, type UIEvent } from "react"
import { ME, OWNERS, PACKAGES, PACKAGE_RIGHTS, type Exhibitor, type Pkg, type Right } from "~bench/data/expo"
import { NEXT_ACTION, delivered, dueText, nextRight, whenText, type LateRow, type Scope } from "./model"
import { Clip, Dot, DueButton, EASE, OUT, Progress, Shift } from "./parts"

/**
 * 列宽 = 这一列最长的内容 + 留白（宽屏 44、窄屏 32），相邻两列内容之间的空一样宽；多出来的给最后一列。
 * 推进列多留一个撤销的位置。宽屏打开详情时它还露在面板左边；窄屏紧跟截止日，不横滑就够得着。
 */
const WIDE = { company: 140, pkg: 72, owner: 88, progress: 172, next: 128, due: 112, push: 124, last: 114, right: 136, status: 128 }
const NARROW = { company: 136, pkg: 72, owner: 88, progress: 170, next: 124, due: 108, push: 116, last: 112, right: 124, status: 112 }
type Widths = typeof WIDE
const NOTE_MIN = 200

/** 拖过的列宽，翻页、换范围都留着 */
export type Sizes = Parameters<NonNullable<ComponentProps<typeof Table.ResizableContainer>["onResizeEnd"]>>[0]
type SizeProps = { sizes?: Sizes; onSizes: (m: Sizes) => void }

const pinL = "sticky left-0 z-[1] bg-surface group-data-[sl=true]/t:shadow-[inset_-1px_0_0_var(--separator)]"
const pinLHead = "sticky left-0 z-[3] bg-surface-secondary"
const rowTone = "[&>td]:transition-colors [&>td]:duration-150 data-[selected=true]:[&>td]:!bg-accent-soft"
const landTone = "[&>td]:!bg-accent-soft"
/** 拖宽窄的手柄：指到表头、键盘进到表头、正在拖时才露出；没有指针悬停的设备一直露着 */
const handle =
  "invisible group-hover/h:visible group-focus-within/h:visible data-[resizing=true]:visible [@media(hover:none)]:visible"
const headRow = "group/h sticky top-0 z-[2]"

export type RowActions = {
  open: string | null
  undoEx: string | null
  undoRight: string | null
  landed: { id: string; quiet: boolean } | null
  /** 新增行打开时实心按钮让给「新增展商」 */
  adding: boolean
  onOpen: (exId: string, rightId?: string) => void
  onAdvance: (exId: string, rightId: string) => void
  onDue: (exId: string, rightId: string, iso: string) => void
  onUndo: () => void
}

/** 展商名单的列：宽屏照原表的顺序，窄屏把截止日和推进提到公司后面 */
export type ExCol = "company" | "pkg" | "owner" | "progress" | "next" | "due" | "push" | "last" | "note"
export function exColumns(scope: Scope, narrow: boolean): ExCol[] {
  const cols: ExCol[] = narrow
    ? ["company", "due", "push", "next", "pkg", "owner", "progress", "last", "note"]
    : ["company", "pkg", "owner", "progress", "next", "due", "push", "last", "note"]
  return scope === "all" ? cols : cols.filter((c) => c !== "pkg")
}
const EX_HEAD: Record<ExCol, string> = {
  company: "公司",
  pkg: "套餐",
  owner: "负责人",
  progress: "交付进度",
  next: "下一项权益",
  due: "下一个截止日",
  push: "",
  last: "最近催办",
  note: "",
}
/** 按钮和催办内容自己说得清，表头留空，读屏照样念 */
const SILENT: Record<string, string> = { push: "推进", note: "催办内容" }

/** 横滑位置写到容器上，左边钉住的列据此决定要不要露分隔 */
function useEdges() {
  const [l, setL] = useState(false)
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const v = e.currentTarget.scrollLeft > 0
    if (v !== l) setL(v)
  }
  return { onScroll, "data-sl": l, className: "group/t min-h-0" }
}

/** 列头：最后一列（催办内容）吃掉多出来的宽度，其余都能拖宽窄 */
function head(c: string, label: string, W: Record<string, number>, sizes: Sizes | undefined, pin: boolean, rowHeader: boolean) {
  const last = c === "note"
  return (
    <Table.Column
      key={c}
      id={c}
      isRowHeader={rowHeader}
      defaultWidth={sizes?.get(c) ?? (last ? "1fr" : W[c])}
      minWidth={last ? NOTE_MIN : 56}
      aria-label={label ? undefined : SILENT[c]}
      className={pin ? pinLHead : undefined}
    >
      {label}
      {last ? null : <Table.ColumnResizer className={handle} />}
    </Table.Column>
  )
}

/** 最近催办分两格：哪天、说了什么 */
function LastDate({ ex }: { ex: Exhibitor }) {
  const r = ex.reminders[0]
  return <span className="whitespace-nowrap text-muted">{r ? <Shift>{whenText(r.date)}</Shift> : "没催过"}</span>
}
function LastNote({ ex }: { ex: Exhibitor }) {
  const r = ex.reminders[0]
  return r ? <Clip text={r.note} /> : null
}

/** 推进格：下一步按钮；刚推过的那一行在它右边原位留一个撤销 */
function PushCell({
  id,
  right,
  primary,
  undo,
  onAdvance,
  onUndo,
}: {
  id: string
  right: Right | null
  primary: boolean
  undo: boolean
  onAdvance: () => void
  onUndo: () => void
}) {
  const label = right && NEXT_ACTION[right.status]
  return (
    <div className="flex items-center">
      <AnimatePresence initial={false} mode="popLayout">
        {label ? (
          <motion.span key="go" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: OUT }}>
            <Button size="sm" variant={primary ? "primary" : "secondary"} data-push={id} onPress={onAdvance}>
              <Shift>{label}</Shift>
            </Button>
          </motion.span>
        ) : null}
        {undo ? (
          <motion.span
            key="undo"
            layout="position"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.18, ease: EASE } }}
            exit={{ opacity: 0, transition: OUT }}
          >
            <Tooltip delay={300} closeDelay={0}>
              <Button isIconOnly size="sm" variant="ghost" aria-label="撤销" data-undo onPress={onUndo} className="group">
                <Undo2 size={16} strokeWidth={1.5} className="group-hover:stroke-2" />
              </Button>
              <Tooltip.Content>撤销</Tooltip.Content>
            </Tooltip>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

/** 新的一行先从上面落下来再亮一下（键盘建的不动） */
function Land({ on, quiet, children }: { on: boolean; quiet: boolean; children: ReactNode }) {
  if (!on || quiet) return <>{children}</>
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.26, ease: EASE }}>
      {children}
    </motion.div>
  )
}

export function ExhibitorTable({
  rows,
  scope,
  act,
  narrow,
  addRow,
  empty,
  sizes,
  onSizes,
}: {
  rows: Exhibitor[]
  scope: Scope
  act: RowActions
  narrow: boolean
  addRow: ReactNode
  empty: ReactNode
} & SizeProps) {
  const W: Widths = narrow ? NARROW : WIDE
  const cols = exColumns(scope, narrow)
  const edges = useEdges()

  const cell = (c: ExCol, e: Exhibitor, i: number, nr: Right | null, land: boolean) => {
    switch (c) {
      case "company":
        return (
          <Table.Cell key={c} className={`${pinL} font-medium`}>
            <Land on={land} quiet={!!act.landed?.quiet}>
              <span data-row={e.company} className="block">
                <Clip text={e.company} />
              </span>
            </Land>
          </Table.Cell>
        )
      case "pkg":
        return (
          <Table.Cell key={c} className="whitespace-nowrap">
            {e.pkg}
          </Table.Cell>
        )
      case "owner":
        return (
          <Table.Cell key={c} className="whitespace-nowrap">
            {e.owner}
          </Table.Cell>
        )
      case "progress":
        return (
          <Table.Cell key={c}>
            <Progress done={delivered(e)} total={e.rights.length} label={e.company} />
          </Table.Cell>
        )
      case "next":
        return <Table.Cell key={c}>{nr ? <Shift>{nr.name}</Shift> : null}</Table.Cell>
      case "due":
        return (
          <Table.Cell key={c} className="whitespace-nowrap">
            {nr ? <DueButton right={nr} label={`${e.company} ${nr.name}`} onChange={(iso) => act.onDue(e.id, nr.id, iso)} /> : null}
          </Table.Cell>
        )
      case "push":
        return (
          <Table.Cell key={c}>
            <PushCell
              id={e.company}
              right={nr}
              primary={i === 0 && !act.adding}
              undo={act.undoEx === e.id}
              onAdvance={() => nr && act.onAdvance(e.id, nr.id)}
              onUndo={act.onUndo}
            />
          </Table.Cell>
        )
      case "last":
        return (
          <Table.Cell key={c}>
            <LastDate ex={e} />
          </Table.Cell>
        )
      case "note":
        return (
          <Table.Cell key={c}>
            <LastNote ex={e} />
          </Table.Cell>
        )
    }
  }

  return (
    <Table.ResizableContainer {...edges} onResizeEnd={onSizes}>
      <Table.Content
        aria-label="展商名单"
        selectionMode="single"
        selectionBehavior="replace"
        disabledBehavior="selection"
        disabledKeys={["add"]}
        selectedKeys={act.open ? [act.open] : []}
        onSelectionChange={(keys) => {
          const k = [...(keys as Set<string>)][0]
          if (k && k !== "add") act.onOpen(k)
        }}
      >
        <Table.Header className={headRow}>{cols.map((c) => head(c, EX_HEAD[c], W, sizes, c === "company", c === "company"))}</Table.Header>
        <Table.Body renderEmptyState={() => empty}>
          {rows.length === 0 ? null : (
            <>
              {rows.map((e, i) => {
                const nr = nextRight(e)
                const land = act.landed?.id === e.id
                return (
                  <Table.Row key={e.id} id={e.id} className={`${rowTone} ${land ? landTone : ""}`}>
                    {cols.map((c) => cell(c, e, i, nr, land))}
                  </Table.Row>
                )
              })}
              {addRow}
            </>
          )}
        </Table.Body>
      </Table.Content>
    </Table.ResizableContainer>
  )
}

/** 逾期：一行一项权益，带上它是哪家的，行里直接推 */
type LateCol = "right" | "company" | "due" | "status" | "push" | "last" | "note"
const LATE_HEAD: Record<LateCol, string> = { right: "权益", company: "公司", due: "截止日", status: "状态", push: "", last: "最近催办", note: "" }

export function LateTable({
  rows,
  byId,
  act,
  narrow,
  empty,
  sizes,
  onSizes,
}: {
  rows: LateRow[]
  byId: Map<string, Exhibitor>
  act: RowActions
  narrow: boolean
  empty: ReactNode
} & SizeProps) {
  const W: Widths = narrow ? NARROW : WIDE
  // 窄屏三行可能都是「官网 logo」，先给出是哪家
  const cols: LateCol[] = narrow
    ? ["company", "right", "push", "due", "status", "last", "note"]
    : ["right", "company", "due", "status", "push", "last", "note"]
  const edges = useEdges()
  const openKey = rows.find((r) => r.exId === act.open)?.rightId
  const pin = (c: LateCol) => c === cols[0]
  return (
    <Table.ResizableContainer {...edges} onResizeEnd={onSizes}>
      <Table.Content
        aria-label="逾期的权益"
        selectionMode="single"
        selectionBehavior="replace"
        selectedKeys={openKey ? [openKey] : []}
        onSelectionChange={(keys) => {
          const k = [...(keys as Set<string>)][0]
          const row = rows.find((r) => r.rightId === k)
          if (row) act.onOpen(row.exId, row.rightId)
        }}
      >
        <Table.Header className={headRow}>{cols.map((c) => head(c, LATE_HEAD[c], W, sizes, pin(c), c === "right"))}</Table.Header>
        <Table.Body renderEmptyState={() => empty}>
          {rows.map(({ exId, rightId }, i) => {
            const e = byId.get(exId)!
            const r = e.rights.find((x) => x.id === rightId)!
            const tone = dueText(r).tone
            const cell = (c: LateCol) => {
              switch (c) {
                case "right":
                  return (
                    <Table.Cell key={c} className={`${pin(c) ? pinL : ""} font-medium`}>
                      <Clip text={r.name} />
                    </Table.Cell>
                  )
                case "company":
                  return (
                    <Table.Cell key={c} className={pin(c) ? `${pinL} font-medium` : ""}>
                      <span data-row={e.company} className="block">
                        <Clip text={e.company} />
                      </span>
                    </Table.Cell>
                  )
                case "due":
                  return (
                    <Table.Cell key={c} className="whitespace-nowrap">
                      <DueButton right={r} label={`${e.company} ${r.name}`} onChange={(iso) => act.onDue(exId, rightId, iso)} />
                    </Table.Cell>
                  )
                case "status":
                  return (
                    <Table.Cell key={c} className="whitespace-nowrap">
                      <span className="inline-flex items-center gap-2">
                        <Dot status={r.status} quiet={tone === "danger" || tone === "warning"} />
                        <Shift>{r.status}</Shift>
                      </span>
                    </Table.Cell>
                  )
                case "push":
                  return (
                    <Table.Cell key={c}>
                      <PushCell
                        id={`${e.company} ${r.name}`}
                        right={r}
                        primary={i === 0}
                        undo={act.undoRight === rightId}
                        onAdvance={() => act.onAdvance(exId, rightId)}
                        onUndo={act.onUndo}
                      />
                    </Table.Cell>
                  )
                case "last":
                  return (
                    <Table.Cell key={c}>
                      <LastDate ex={e} />
                    </Table.Cell>
                  )
                case "note":
                  return (
                    <Table.Cell key={c}>
                      <LastNote ex={e} />
                    </Table.Cell>
                  )
              }
            }
            return (
              <Table.Row key={rightId} id={rightId} className={rowTone}>
                {cols.map(cell)}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Content>
    </Table.ResizableContainer>
  )
}

/** 表尾最后一行：静止是「新增展商」，点了原地变成输入；宽屏按列摆，窄屏收成一块 */
export function AddRow({
  cols,
  scope,
  narrow,
  adding,
  seed,
  names,
  onStart,
  onCancel,
  onCreate,
}: {
  cols: ExCol[]
  scope: Scope
  narrow: boolean
  adding: boolean
  seed: string
  names: Set<string>
  onStart: () => void
  onCancel: () => void
  onCreate: (d: { company: string; pkg: Pkg; owner: string }, viaKey: boolean) => void
}) {
  const fixedPkg = scope !== "all" && scope !== "late" ? scope : null
  const [company, setCompany] = useState(seed)
  const [pkg, setPkg] = useState<Pkg | null>(fixedPkg)
  const [owner, setOwner] = useState(ME)
  const [tried, setTried] = useState(false)
  const name = company.trim()
  const nameError = !name ? "填公司名" : names.has(name) ? "已有这家" : null
  const chosen = fixedPkg ?? pkg

  // 打开和出报错时这一行会变高，把整行带进视野，报错不会落在表外
  const anchor = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (adding) anchor.current?.closest("tr")?.scrollIntoView({ block: "nearest" })
  }, [adding, tried])

  const submit = (viaKey: boolean) => {
    setTried(true)
    if (nameError || !chosen) return
    onCreate({ company: name, pkg: chosen, owner }, viaKey)
    setCompany("")
    setPkg(fixedPkg)
    setTried(false)
  }
  // 输入框里的回车、Esc 归这一行；表格自己的方向键和按字跳行不该吃掉
  const keys = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault()
      onCancel()
    } else if (e.key === "Enter" && !e.nativeEvent.isComposing && (e.target as HTMLElement).tagName === "INPUT") {
      e.preventDefault()
      submit(true)
    }
    e.stopPropagation()
  }
  const fade = {
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } },
    exit: { opacity: 0, y: -4, transition: OUT },
    onKeyDown: keys,
  }

  if (!adding) {
    return (
      <Table.Row key="rest" id="add" className="[&>td]:!bg-surface">
        <Table.Cell colSpan={cols.length} className="py-2">
          <motion.span className="sticky left-4 inline-block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.16 }}>
            <Button size="sm" variant="ghost" onPress={onStart} data-add className="group -mx-2">
              <Plus size={16} strokeWidth={1.5} className="group-hover:stroke-2" />
              新增展商
            </Button>
          </motion.span>
        </Table.Cell>
      </Table.Row>
    )
  }

  const nameField = (
    <TextField aria-label="公司" autoFocus value={company} onChange={setCompany} maxLength={40} isInvalid={tried && !!nameError} className="w-full">
      <Input placeholder="公司名" />
      <FieldError>{nameError}</FieldError>
    </TextField>
  )
  const pkgField = (
    <Select aria-label="套餐" placeholder="套餐" value={pkg} onChange={(v) => setPkg(v as Pkg)} isInvalid={tried && !pkg} className="w-full">
      <Select.Trigger data-pick="pkg">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {PACKAGES.map((p) => (
            <ListBox.Item key={p} id={p} textValue={p}>
              {p}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
      <FieldError>选套餐</FieldError>
    </Select>
  )
  const create = (
    <Button size="sm" variant="primary" onPress={() => submit(false)} data-create>
      新增展商
    </Button>
  )

  if (narrow) {
    // 窄屏：公司名和套餐并排，按钮在下面靠右；负责人先记成自己，详情里再改
    return (
      <Table.Row key="form-n" id="add" className="[&>td]:!bg-surface">
        <Table.Cell colSpan={cols.length} className="py-3">
          <motion.div ref={anchor} {...fade} className="sticky left-4 flex w-[calc(100vw-4rem)] flex-col gap-3">
            <div className={`grid items-start gap-2 ${fixedPkg ? "grid-cols-1" : "grid-cols-[minmax(0,1fr)_96px]"}`}>
              {nameField}
              {fixedPkg ? null : pkgField}
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button size="sm" variant="ghost" onPress={onCancel}>
                取消
              </Button>
              {create}
            </div>
          </motion.div>
        </Table.Cell>
      </Table.Row>
    )
  }

  const cell = (c: ExCol) => {
    switch (c) {
      case "company":
        return (
          <Table.Cell key={c} className={`${pinL} py-2 ps-2`}>
            <motion.div ref={anchor} {...fade}>
              {nameField}
            </motion.div>
          </Table.Cell>
        )
      case "pkg":
        return (
          <Table.Cell key={c} className="px-2 py-2">
            <motion.div {...fade}>{pkgField}</motion.div>
          </Table.Cell>
        )
      case "owner":
        return (
          <Table.Cell key={c} className="px-2 py-2">
            <motion.div {...fade}>
              <Select aria-label="负责人" value={owner} onChange={(v) => setOwner(String(v))} className="w-full">
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {OWNERS.map((o) => (
                      <ListBox.Item key={o} id={o} textValue={o}>
                        {o}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </motion.div>
          </Table.Cell>
        )
      case "progress":
        return (
          <Table.Cell key={c} className="py-2">
            <span className="flex h-9 items-center">{chosen ? <Progress done={0} total={PACKAGE_RIGHTS[chosen].length} label={name || "新展商"} /> : null}</span>
          </Table.Cell>
        )
      case "push":
        return (
          <Table.Cell key={c} className="py-2">
            <motion.div {...fade} className="flex h-9 items-center">
              {create}
              <Tooltip delay={300} closeDelay={0}>
                <Button isIconOnly size="sm" variant="ghost" aria-label="取消" onPress={onCancel} className="group">
                  <X size={16} strokeWidth={1.5} className="group-hover:stroke-2" />
                </Button>
                <Tooltip.Content>取消</Tooltip.Content>
              </Tooltip>
            </motion.div>
          </Table.Cell>
        )
      default:
        return <Table.Cell key={c}>{null}</Table.Cell>
    }
  }

  return (
    // 静止和填写是两种格子结构，换一个 key 让表格重新数格子
    <Table.Row key="form" id="add" className="align-top [&>td]:!bg-surface">
      {cols.map(cell)}
    </Table.Row>
  )
}
