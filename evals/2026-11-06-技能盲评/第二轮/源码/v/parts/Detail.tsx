// 一家展商：头部（公司、套餐、展位、负责人、上一家 / 下一家）→ 对接人 → 权益（推进、改截止日）→ 催办（记一条、历史）。
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  Avatar,
  Button,
  Chip,
  Kbd,
  ProgressBar,
  ScrollShadow,
  TextArea,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  toast,
} from "@heroui/react"
import {
  ChevronDown,
  ChevronUp,
  CircleCheck,
  CircleDashed,
  CircleDot,
  Mail,
  MapPin,
  MessageCircle,
  Paperclip,
  Phone,
  Plus,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"
import { ME, TODAY, type Channel, type Exhibitor, type Reminder, type Right, type RightStatus } from "~bench/data/expo"
import { ADVANCE_LABEL, doneCount, fmtDate, sortRights } from "./model"
import { DateButton, DuePicker } from "./DuePicker"

export const EASE_OUT = [0.23, 1, 0.32, 1] as const
const SNAP = { type: "spring", duration: 0.35, bounce: 0 } as const

export const CHANNEL_ICON: Record<Channel, LucideIcon> = { 电话: Phone, 微信: MessageCircle, 邮件: Mail, 面谈: Users }
const CHANNELS: Channel[] = ["电话", "微信", "邮件", "面谈"]

const STATUS_ICON: Record<RightStatus, { Icon: LucideIcon; tone: string }> = {
  待提交物料: { Icon: CircleDashed, tone: "text-muted" },
  待审核: { Icon: CircleDot, tone: "text-warning" },
  已交付: { Icon: CircleCheck, tone: "text-success" },
}

export function Progress({ done, total, className }: { done: number; total: number; className?: string }) {
  return (
    <ProgressBar
      aria-label={`已交付 ${done} / ${total}`}
      value={done}
      maxValue={Math.max(total, 1)}
      size="sm"
      color={total > 0 && done === total ? "success" : "accent"}
      className={className}
    >
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  )
}

type DetailProps = {
  ex: Exhibitor
  dir: number
  hasPrev: boolean
  hasNext: boolean
  onPrev: () => void
  onNext: () => void
  onClose: () => void
  onAdvance: (rightId: string) => void
  onDue: (rightId: string, iso: string) => void
  onRemind: (r: Reminder) => void
  focusRight: string | null
  touch?: boolean
}

export function Detail(p: DetailProps) {
  const { ex } = p
  const reduce = useReducedMotion()
  const enter = {
    initial: { opacity: 0, y: reduce ? 0 : p.dir * 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.24, ease: EASE_OUT },
  }
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-start gap-3 px-5 pt-4 pb-3">
        <motion.div key={ex.id} {...enter} className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <h2 className="truncate text-lg leading-7 font-semibold">{ex.company}</h2>
            <Chip size="sm" variant="soft" className="shrink-0">
              {ex.pkg}
            </Chip>
          </div>
          <div className="mt-0.5 flex items-center gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {ex.booth ?? "未分配展位"}
            </span>
            <span>{ex.owner === ME ? "我负责" : `${ex.owner}负责`}</span>
          </div>
        </motion.div>
        <div className="flex shrink-0 items-center gap-0.5">
          <NavButton label="上一家" keyHint="K" icon={ChevronUp} isDisabled={!p.hasPrev} onPress={p.onPrev} touch={p.touch} />
          <NavButton label="下一家" keyHint="J" icon={ChevronDown} isDisabled={!p.hasNext} onPress={p.onNext} touch={p.touch} />
          <Button isIconOnly size="sm" variant="ghost" aria-label="关闭" onPress={p.onClose}>
            <X className="size-4" />
          </Button>
        </div>
      </div>
      <ScrollShadow size={24} className="min-h-0 flex-1 overflow-y-auto">
        <motion.div key={ex.id} {...enter} className="pb-6">
          <ContactCard ex={ex} touch={p.touch} />
          <Rights ex={ex} onAdvance={p.onAdvance} onDue={p.onDue} focusRight={p.focusRight} />
          <Reminders ex={ex} onRemind={p.onRemind} />
        </motion.div>
      </ScrollShadow>
    </div>
  )
}

function NavButton(props: {
  label: string
  keyHint: string
  icon: LucideIcon
  isDisabled: boolean
  onPress: () => void
  touch?: boolean
}) {
  const Icon = props.icon
  const button = (
    <Button isIconOnly size="sm" variant="ghost" aria-label={props.label} isDisabled={props.isDisabled} onPress={props.onPress}>
      <Icon className="size-4" />
    </Button>
  )
  if (props.touch) return button
  return (
    <Tooltip delay={500}>
      {button}
      <Tooltip.Content className="flex items-center gap-2">
        {props.label}
        <Kbd>
          <Kbd.Content>{props.keyHint}</Kbd.Content>
        </Kbd>
      </Tooltip.Content>
    </Tooltip>
  )
}

function copy(label: string, value: string) {
  navigator.clipboard?.writeText(value).catch(() => {})
  toast(`已复制${label}`, { description: value })
}

function ContactCard({ ex, touch }: { ex: Exhibitor; touch?: boolean }) {
  const c = ex.contact
  if (!c.name && !c.phone) return null
  const dial = () => (window.location.href = `tel:${c.phone.replace(/\s/g, "")}`)
  return (
    <div className="mx-5 flex items-center gap-3 rounded-2xl bg-surface-secondary py-2 ps-3 pe-1.5">
      <Avatar size="sm" className="shrink-0">
        <Avatar.Fallback>{(c.name || ex.company).slice(0, 1)}</Avatar.Fallback>
      </Avatar>
      {touch ? (
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="truncate text-sm font-medium">{c.name || "对接人"}</span>
            {c.title && <span className="truncate text-xs text-muted">{c.title}</span>}
          </div>
          {c.phone && <div className="text-xs text-muted tabular-nums">{c.phone}</div>}
        </div>
      ) : (
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{c.name || "对接人"}</div>
          {c.title && <div className="truncate text-xs text-muted">{c.title}</div>}
        </div>
      )}
      {c.phone &&
        (touch ? (
          <Button isIconOnly size="sm" variant="ghost" aria-label={`拨打 ${c.phone}`} onPress={dial}>
            <Phone className="size-4" />
          </Button>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            className="shrink-0 px-2 font-normal tabular-nums"
            aria-label={`复制电话 ${c.phone}`}
            onPress={() => copy("电话", c.phone)}
          >
            <Phone className="size-3.5" />
            {c.phone}
          </Button>
        ))}
      {c.wechat && <CopyIcon label="微信号" value={c.wechat} icon={MessageCircle} />}
      {c.email && <CopyIcon label="邮箱" value={c.email} icon={Mail} />}
    </div>
  )
}

function CopyIcon({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <Tooltip delay={300}>
      <Button isIconOnly size="sm" variant="ghost" aria-label={`复制${label} ${value}`} onPress={() => copy(label, value)}>
        <Icon className="size-4" />
      </Button>
      <Tooltip.Content>{value}</Tooltip.Content>
    </Tooltip>
  )
}

function Rights({
  ex,
  onAdvance,
  onDue,
  focusRight,
}: {
  ex: Exhibitor
  onAdvance: (id: string) => void
  onDue: (id: string, iso: string) => void
  focusRight: string | null
}) {
  const done = doneCount(ex)
  return (
    <section className="px-3 pt-5">
      <div className="flex items-center gap-3 px-2 pb-1.5">
        <h3 className="text-sm font-medium">权益</h3>
        <Progress done={done} total={ex.rights.length} className="ms-auto w-20" />
        <span className="text-xs text-muted tabular-nums">
          {done}/{ex.rights.length}
        </span>
      </div>
      <ul>
        {sortRights(ex.rights).map((r) => (
          <RightRow
            key={r.id}
            right={r}
            highlight={focusRight === r.id}
            onAdvance={() => onAdvance(r.id)}
            onDue={(iso) => onDue(r.id, iso)}
          />
        ))}
      </ul>
    </section>
  )
}

function RightRow({
  right: r,
  highlight,
  onAdvance,
  onDue,
}: {
  right: Right
  highlight: boolean
  onAdvance: () => void
  onDue: (iso: string) => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  const label = ADVANCE_LABEL[r.status]
  const delivered = r.status === "已交付"
  const { Icon, tone } = STATUS_ICON[r.status]
  useEffect(() => {
    if (highlight) ref.current?.scrollIntoView({ block: "nearest" })
  }, [highlight])
  return (
    <motion.li
      ref={ref}
      layout="position"
      transition={SNAP}
      data-right={r.id}
      className="relative grid grid-cols-[20px_minmax(0,1fr)_auto_84px] items-center gap-x-3 rounded-2xl px-2 py-2"
    >
      {highlight && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-danger-soft"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 1.4, ease: "easeOut" }}
        />
      )}
      <span className="relative grid size-5 place-items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={r.status}
            className={`grid place-items-center ${tone}`}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.35 }}
          >
            <Icon className="size-[18px]" strokeWidth={2} />
          </motion.span>
        </AnimatePresence>
      </span>
      <div className="relative min-w-0">
        <div className={`truncate text-sm ${delivered ? "text-muted" : "font-medium"}`}>{r.name}</div>
        <div className="mt-0.5 flex min-w-0 items-center gap-1 text-xs text-muted">
          <span className="shrink-0">{r.status}</span>
          {r.material && (
            <>
              <span aria-hidden className="shrink-0">
                ·
              </span>
              <Paperclip className="size-3 shrink-0" />
              <span className="truncate">{r.material}</span>
            </>
          )}
        </div>
      </div>
      <div className="relative flex justify-end">
        {delivered ? (
          <span className="px-2 text-sm text-muted tabular-nums">{fmtDate(r.due)}</span>
        ) : (
          <DuePicker right={r} onChange={onDue} />
        )}
      </div>
      <div className="relative flex justify-end">
        <AnimatePresence initial={false} mode="popLayout">
          {label && (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
            >
              <Button size="sm" variant="secondary" data-advance={r.id} onPress={onAdvance}>
                {label}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  )
}

function Reminders({ ex, onRemind }: { ex: Exhibitor; onRemind: (r: Reminder) => void }) {
  const [composing, setComposing] = useState(false)
  const seen = new Map<string, number>()
  const keyed = ex.reminders.map((r) => {
    const base = `${r.date}|${r.channel}|${r.note}`
    const n = seen.get(base) ?? 0
    seen.set(base, n + 1)
    return { r, key: `${base}|${n}` }
  })
  return (
    <section className="px-5 pt-6">
      <div className="flex h-8 items-center justify-between">
        <h3 className="text-sm font-medium">催办</h3>
        <AnimatePresence initial={false}>
          {!composing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Button size="sm" variant="secondary" onPress={() => setComposing(true)}>
                <Plus className="size-4" />
                记催办
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false}>
        {composing && (
          <motion.div
            key="composer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0 }}
            className="-mx-1 overflow-hidden px-1"
          >
            <Composer
              onCancel={() => setComposing(false)}
              onSave={(r) => {
                onRemind(r)
                setComposing(false)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {keyed.length === 0 && !composing && <p className="pt-2 text-sm text-muted">还没有催办记录</p>}
      <ol className="pt-1">
        <AnimatePresence initial={false}>
          {keyed.map(({ r, key }) => {
            const Icon = CHANNEL_ICON[r.channel]
            return (
              <motion.li
                key={key}
                layout="position"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={SNAP}
                className="overflow-hidden"
              >
                <div className="flex gap-3 py-2.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-default text-muted">
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 text-xs text-muted">
                      <span>
                        {r.channel} · {r.by}
                      </span>
                      <span className="ms-auto tabular-nums">{r.date === TODAY ? "今天" : fmtDate(r.date)}</span>
                    </div>
                    <p className="mt-0.5 text-sm leading-5">{r.note}</p>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ol>
    </section>
  )
}

function Composer({ onCancel, onSave }: { onCancel: () => void; onSave: (r: Reminder) => void }) {
  const [channel, setChannel] = useState<Channel>("电话")
  const [date, setDate] = useState(TODAY)
  const [note, setNote] = useState("")
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])
  const save = () => {
    if (!note.trim()) return
    onSave({ date, channel, by: ME, note: note.trim() })
  }
  return (
    <div className="mt-2 mb-2 flex flex-col gap-2 rounded-2xl bg-surface-secondary p-2.5">
      <div className="flex items-center gap-2">
        <ToggleButtonGroup
          size="sm"
          aria-label="方式"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[channel]}
          onSelectionChange={(keys) => {
            const k = [...keys][0]
            if (k) setChannel(k as Channel)
          }}
        >
          {CHANNELS.map((c) => {
            const Icon = CHANNEL_ICON[c]
            return (
              <ToggleButton key={c} id={c}>
                <Icon className="size-3.5" />
                {c}
              </ToggleButton>
            )
          })}
        </ToggleButtonGroup>
        <DateButton
          value={date}
          maxValue={TODAY}
          onChange={setDate}
          label="催办日期"
          className="ms-auto px-2 font-normal tabular-nums"
        >
          {date === TODAY ? "今天" : fmtDate(date)}
        </DateButton>
      </div>
      <TextArea
        ref={ref}
        aria-label="催办内容"
        placeholder="催了什么，对方怎么回"
        rows={2}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            save()
          }
          if (e.key === "Escape") {
            e.stopPropagation()
            onCancel()
          }
        }}
        className="w-full resize-none"
      />
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="tertiary" onPress={onCancel}>
          取消
        </Button>
        <Button size="sm" variant="primary" isDisabled={!note.trim()} onPress={save}>
          保存
        </Button>
      </div>
    </div>
  )
}
