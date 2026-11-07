import { Button, Calendar, Dropdown, Label, Pagination, Popover, ProgressBar, ProgressCircle, Tabs, Tooltip } from "@heroui/react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { startTransition, useLayoutEffect, useRef, useState } from "react"
import { RIGHT_FLOW, type Right, type RightStatus } from "~bench/data/expo"
import { TONE_CLASS, dueText, fromCal, toCal, type Scope } from "./model"

export const EASE = [0.2, 0.8, 0.2, 1] as const
/** 退场比进场快一档 */
export const OUT = { duration: 0.12 }

/** 字原位上下换：旧字往上退，新字从下面进 */
export function Shift({ children, className }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className ?? ""}`}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={children}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.2, ease: EASE } }}
          exit={{ y: "-70%", opacity: 0, transition: OUT }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** 一行字，放不下才截断，截断了指向时看全文 */
export function Clip({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [cut, setCut] = useState(false)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setCut(el.scrollWidth > el.clientWidth + 1))
    ro.observe(el)
    setCut(el.scrollWidth > el.clientWidth + 1)
    return () => ro.disconnect()
  }, [cut, text])
  const span = (
    <span ref={ref} className={`block truncate ${className ?? ""}`}>
      {text}
    </span>
  )
  if (!cut) return span
  return (
    <Tooltip delay={400} closeDelay={0}>
      <Tooltip.Trigger className="block w-full min-w-0">{span}</Tooltip.Trigger>
      <Tooltip.Content placement="top start">{text}</Tooltip.Content>
    </Tooltip>
  )
}

const DOT: Record<RightStatus, string> = {
  待提交物料: "bg-muted",
  待审核: "bg-warning",
  已交付: "bg-success",
}

/** 状态点；同一行截止日已经着色时只留灰点，一行只出一个状态色 */
export function Dot({ status, quiet }: { status: RightStatus; quiet?: boolean }) {
  const c = quiet && status !== "已交付" ? "bg-muted" : DOT[status]
  return <span aria-hidden className={`size-1.5 shrink-0 rounded-full transition-colors duration-200 ${c}`} />
}

/** 每家的交付进度：一条进度条 + 几项 / 共几项 */
export function Progress({ done, total, label, className }: { done: number; total: number; label: string; className?: string }) {
  const text = `${done} / ${total} 项`
  return (
    <ProgressBar
      aria-label={`${label}交付进度`}
      value={done}
      maxValue={total}
      valueLabel={text}
      size="sm"
      color={done === total ? "success" : "accent"}
      className={`inline-flex w-fit flex-row items-center gap-3 ${className ?? ""}`}
    >
      <ProgressBar.Track className="w-16 shrink-0 bg-separator">
        <ProgressBar.Fill className="transition-[width,translate,transform] duration-300" />
      </ProgressBar.Track>
      <ProgressBar.Output className="text-muted tabular-nums">
        <Shift>{text}</Shift>
      </ProgressBar.Output>
    </ProgressBar>
  )
}

/** 指向或键盘聚焦才出现的 ⌄，位置一直留着，字不跟着挪 */
const Caret = () => (
  <ChevronDown
    size={14}
    strokeWidth={1.5}
    aria-hidden
    className="shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100 group-data-[focus-visible=true]:opacity-100 group-data-[pressed=true]:opacity-100"
  />
)

/** 截止日：着色的相对天数，点开日历改 */
export function DueButton({ right, onChange, label }: { right: Right; onChange: (iso: string) => void; label: string }) {
  const [open, setOpen] = useState(false)
  const { text, tone } = dueText(right)
  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Button
        size="sm"
        variant="ghost"
        aria-label={`${label}截止日 ${text}`}
        data-due={right.name}
        className={`group -mx-2 gap-1 px-2 font-normal tabular-nums ${TONE_CLASS[tone]}`}
      >
        <Shift>{text}</Shift>
        <Caret />
      </Button>
      <Popover.Content placement="bottom start" offset={4}>
        <Popover.Dialog aria-label={`${label}截止日`} className="p-1">
          <Calendar
            aria-label={`${label}截止日`}
            value={toCal(right.due)}
            onChange={(d) => {
              if (d) onChange(fromCal(d))
              setOpen(false)
            }}
          >
            <Calendar.Header>
              <Calendar.Heading />
              <Calendar.NavButton slot="previous" />
              <Calendar.NavButton slot="next" />
            </Calendar.Header>
            <Calendar.Grid>
              <Calendar.GridHeader>{(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}</Calendar.GridHeader>
              <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
            </Calendar.Grid>
          </Calendar>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}

/** 状态：静止只显点 + 字，点开可以改成任何一步（含退回） */
export function StatusMenu({ status, onChange, label, quiet }: { status: RightStatus; onChange: (s: RightStatus) => void; label: string; quiet?: boolean }) {
  return (
    <Dropdown>
      <Button size="sm" variant="ghost" aria-label={`${label}状态 ${status}`} className="group -mx-2 gap-2 px-2 font-normal">
        <Dot status={status} quiet={quiet} />
        <Shift>{status}</Shift>
        <Caret />
      </Button>
      <Dropdown.Popover placement="bottom start">
        <Dropdown.Menu
          aria-label={`${label}状态`}
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={new Set([status])}
          onSelectionChange={(keys) => {
            const k = [...(keys as Set<string>)][0] as RightStatus | undefined
            if (k && k !== status) onChange(k)
          }}
        >
          {RIGHT_FLOW.map((s) => (
            <Dropdown.Item key={s} id={s} textValue={s}>
              <Dot status={s} />
              <Label>{s}</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

export type ScopeItem = { id: Scope; label: string; done?: number; total?: number; late?: number }

/**
 * 点下去先在这里换上新的选中（只重画这一小块，马上看得到），整页跟着在后台换；
 * 外面改了值（比如新增后跳回「全部」）也跟上。
 */
function useEager<T>(value: T, onChange: (v: T) => void) {
  const [shown, setShown] = useState(value)
  const [seen, setSeen] = useState(value)
  if (value !== seen) {
    setSeen(value)
    setShown(value)
  }
  const pick = (v: T) => {
    setShown(v)
    startTransition(() => onChange(v))
  }
  return [shown, pick] as const
}

/** 范围：全部、逾期、四个套餐；全部和套餐带总进度环，逾期有才显示数 */
export function ScopeTabs({ scope, onChange, items }: { scope: Scope; onChange: (s: Scope) => void; items: ScopeItem[] }) {
  const [shown, pick] = useEager(scope, onChange)
  return (
    <Tabs selectedKey={shown} onSelectionChange={(k) => pick(k as Scope)} className="min-w-0">
      <Tabs.ListContainer>
        <Tabs.List aria-label="范围" className="isolate">
          {items.map((it) => (
            <Tabs.Tab key={it.id} id={it.id} data-scope={it.id} className="z-auto gap-2 whitespace-nowrap">
              {it.label}
              {it.total != null && <Ring done={it.done ?? 0} total={it.total} label={it.label} />}
              <AnimatePresence initial={false}>
                {it.late ? (
                  <motion.span
                    key="n"
                    className="overflow-hidden font-medium tabular-nums text-danger-soft-foreground"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0, transition: OUT }}
                  >
                    <Shift>{String(it.late)}</Shift>
                  </motion.span>
                ) : null}
              </AnimatePresence>
              <Tabs.Indicator />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  )
}

function Ring({ done, total, label }: { done: number; total: number; label: string }) {
  // 向下取整：没交付完就不显示 100%
  const pct = total ? Math.floor((done / total) * 100) : 0
  return (
    <span className="flex items-center gap-2">
      <ProgressCircle
        aria-label={`${label}总进度`}
        value={done}
        maxValue={Math.max(total, 1)}
        size="sm"
        color={total > 0 && done === total ? "success" : "accent"}
      >
        <ProgressCircle.Track className="size-4">
          <ProgressCircle.TrackCircle className="stroke-separator" />
          <ProgressCircle.FillCircle className="transition-[stroke-dashoffset] duration-500" />
        </ProgressCircle.Track>
      </ProgressCircle>
      <span aria-hidden className="tabular-nums text-muted">
        <Shift>{`${pct}%`}</Shift>
      </span>
    </span>
  )
}

/** 翻页条：页码多了也只有一排小按钮 */
export function Pager({ pages, cur, onGo }: { pages: number; cur: number; onGo: (p: number) => void }) {
  const [shown, pick] = useEager(cur, onGo)
  return (
    <Pagination size="sm" aria-label="翻页">
      <Pagination.Content>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link isActive={p === shown} onPress={() => p !== shown && pick(p)} data-page={p} aria-label={`第 ${p} 页`}>
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
      </Pagination.Content>
    </Pagination>
  )
}
