import { Button, Calendar, Chip, Popover, ProgressBar } from "@heroui/react"
import { parseDate } from "@internationalized/date"
import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react"
import type { RightStatus } from "~bench/data/expo"
import { dueLabel, statusColor, toneClass } from "./model"

export const spring = { type: "spring", duration: 0.3, bounce: 0 } as const
export const ease = [0.2, 0, 0, 1] as const

// 原位换字：值变了，新字从下面滚上来；第一次出现不动
export function Swap({ k, children, className = "" }: { k: string; children: ReactNode; className?: string }) {
  const prev = useRef(k)
  const moved = useRef(false)
  if (prev.current !== k) {
    prev.current = k
    moved.current = true
  }
  return (
    <span className={`inline-grid overflow-hidden ${className}`}>
      <span key={k} className={`whitespace-nowrap ${moved.current ? "w-roll" : ""}`}>
        {children}
      </span>
    </span>
  )
}

// 按钮换成另一个动作时，新的那个淡入
export function Pop({ k, children, className = "" }: { k: string; children: ReactNode; className?: string }) {
  const prev = useRef(k)
  const moved = useRef(false)
  if (prev.current !== k) {
    prev.current = k
    moved.current = true
  }
  return (
    <span key={k} className={`inline-flex ${moved.current ? "w-pop" : ""} ${className}`}>
      {children}
    </span>
  )
}

// 同一视图里顺序变了：项从旧位置滑到新位置；新出现的项从下方淡入
export function useGlide(ref: RefObject<HTMLElement | null>, view: string, order: string) {
  const last = useRef<{ view: string; tops: Map<string, number> }>({ view: "", tops: new Map() })
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const items = [...root.querySelectorAll<HTMLElement>("[data-glide]")]
    const tops = new Map(items.map((el) => [el.dataset.glide!, el.offsetTop]))
    if (last.current.view === view) {
      for (const el of items) {
        const before = last.current.tops.get(el.dataset.glide!)
        const now = tops.get(el.dataset.glide!)!
        if (before === undefined) el.animate([{ opacity: 0.4, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 240, easing: "cubic-bezier(0.2, 0, 0, 1)" })
        else if (before !== now) el.animate([{ transform: `translateY(${before - now}px)` }, { transform: "none" }], { duration: 320, easing: "cubic-bezier(0.2, 0, 0, 1)" })
      }
    }
    last.current = { view, tops }
  }, [ref, view, order])
}

export function StatusChip({ status }: { status: RightStatus }) {
  return (
    <Chip size="sm" variant="soft" color={statusColor[status]}>
      <Chip.Label>
        <Swap k={status}>{status}</Swap>
      </Chip.Label>
    </Chip>
  )
}

export function Progress({ done, total, className = "" }: { done: number; total: number; className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <ProgressBar aria-label={`已交付 ${done} / ${total} 项`} size="sm" color="success" value={total ? (done / total) * 100 : 0} className="w-24 shrink-0">
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <span className="whitespace-nowrap text-xs text-muted tabular-nums">
        <Swap k={String(done)}>{done}</Swap> / {total} 项
      </span>
    </span>
  )
}

export function DateCalendar({ value, onChange, max, label }: { value: string; onChange: (iso: string) => void; max?: string; label: string }) {
  return (
    <Calendar aria-label={label} value={parseDate(value)} maxValue={max ? parseDate(max) : undefined} onChange={(d) => onChange(d.toString())}>
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
  )
}

// 截止日：写相对天数，点开日历改
export function DueButton({ due, onChange, name }: { due: string; onChange: (iso: string) => void; name: string }) {
  const [open, setOpen] = useState(false)
  const label = dueLabel(due)
  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Button size="sm" variant="ghost" data-due aria-label={`${name}截止日 ${due}`} className={`${toneClass[label.tone]} px-2`}>
        <Swap k={label.text}>{label.text}</Swap>
      </Button>
      <Popover.Content placement="bottom end">
        <Popover.Dialog aria-label={`${name}截止日`}>
          <DateCalendar
            label={`${name}截止日`}
            value={due}
            onChange={(iso) => {
              onChange(iso)
              setOpen(false)
            }}
          />
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}

export function DueText({ due, suffix }: { due: string; suffix?: string }) {
  const label = dueLabel(due)
  return (
    <span className="flex min-w-0 items-baseline gap-2 whitespace-nowrap">
      <Swap k={label.text} className={toneClass[label.tone]}>
        {label.text}
      </Swap>
      {suffix && <span className="text-xs text-muted">{suffix}</span>}
    </span>
  )
}
