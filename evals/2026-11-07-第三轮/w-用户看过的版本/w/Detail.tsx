import { Button, Chip, Input, Popover, Separator, TextField, ToggleButton, ToggleButtonGroup } from "@heroui/react"
import { ChevronLeft, ChevronRight, Mail, MessageCircle, Phone, Users, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { memo, useRef, useState } from "react"
import { ME, TODAY, type Channel, type Exhibitor, type Reminder } from "~bench/data/expo"
import { deliveredCount, shortDate, stepLabel } from "./model"
import { DateCalendar, DueButton, Pop, StatusChip, Swap, ease, useGlide } from "./parts"
import type { Expo } from "./useExpo"

const CHANNELS: Channel[] = ["电话", "微信", "邮件", "面谈"]
const channelIcon = { 电话: Phone, 微信: MessageCircle, 邮件: Mail, 面谈: Users } as const

const reminderKeys = new WeakMap<Reminder, string>()
let reminderSeq = 0
const keyOf = (r: Reminder) => {
  let k = reminderKeys.get(r)
  if (!k) reminderKeys.set(r, (k = `r${++reminderSeq}`))
  return k
}

export const DetailHeader = memo(function DetailHeader({ e, onClose }: { e: Exhibitor; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3 text-foreground">
      <div className="grid min-w-0 gap-2">
        <h2 className="text-base font-semibold">{e.company}</h2>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <Chip size="sm" variant="soft">
            {e.pkg}
          </Chip>
          {e.booth && <span>{e.booth}</span>}
          {e.booth && <span aria-hidden>·</span>}
          <span>{e.owner}负责</span>
        </div>
      </div>
      <Button isIconOnly size="sm" variant="ghost" aria-label="关闭" onPress={onClose}>
        <X size={16} />
      </Button>
    </div>
  )
})

type Actions = Pick<Expo, "advance" | "revert" | "setDue" | "addReminder" | "undo">

export const DetailBody = memo(function DetailBody({ e, x }: { e: Exhibitor; x: Actions }) {
  const rights = [...e.rights].sort((a, b) => a.due.localeCompare(b.due))
  const suggested = rights.find((r) => r.status !== "已交付" && !x.undo[r.id])
  const done = deliveredCount(e)
  const list = useRef<HTMLUListElement>(null)
  useGlide(list, e.id, rights.map((r) => r.id).join())
  return (
    <div className="grid gap-5 text-foreground">
      <section className="grid gap-1" aria-label="权益">
        <p className="text-sm text-muted">
          已交付{" "}
          <Swap k={String(done)} className="font-medium text-foreground">
            {done}
          </Swap>{" "}
          / {e.rights.length} 项
        </p>
        <ul ref={list} className="grid">
          {rights.map((r) => {
            const step = stepLabel[r.status]
            const canUndo = Boolean(x.undo[r.id])
            const lead = suggested?.id === r.id
            return (
              <li key={r.id} data-glide={r.id} data-right={r.id} className="group grid gap-1 border-b border-separator py-3 last:border-b-0">
                <div className="flex min-h-8 items-center gap-2">
                  <span className={`min-w-0 flex-1 text-sm font-medium ${r.status === "已交付" ? "text-muted" : ""}`}>{r.name}</span>
                  {r.status !== "已交付" && <DueButton name={r.name} due={r.due} onChange={(iso) => x.setDue(e.id, r.id, iso)} />}
                  {canUndo ? (
                    <Pop k="undo">
                      <Button size="sm" variant="ghost" onPress={() => x.revert(e.id, r.id)}>
                        撤销
                      </Button>
                    </Pop>
                  ) : step ? (
                    <Pop k={step} className={lead ? "" : "opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100 [@media(hover:none)]:opacity-100"}>
                      <Button size="sm" data-step variant={lead ? "primary" : "secondary"} onPress={() => x.advance(e.id, r.id, r.status)}>
                        {step}
                      </Button>
                    </Pop>
                  ) : null}
                </div>
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <StatusChip status={r.status} />
                  {r.material && <span className="text-xs text-muted">{r.material}</span>}
                </div>
              </li>
            )
          })}
        </ul>
      </section>
      <Separator />
      <Reminders key={e.id} e={e} onAdd={(rem) => x.addReminder(e.id, rem)} />
      <Separator />
      <Contact e={e} />
    </div>
  )
})

function Reminders({ e, onAdd }: { e: Exhibitor; onAdd: (r: Reminder) => void }) {
  const [note, setNote] = useState("")
  const [date, setDate] = useState(TODAY)
  const [channel, setChannel] = useState<Channel>(e.reminders[0]?.channel ?? "电话")
  const [dateOpen, setDateOpen] = useState(false)
  const typing = note.trim().length > 0
  const save = () => {
    if (!typing) return
    onAdd({ date, channel, by: ME, note: note.trim() })
    setNote("")
    setDate(TODAY)
  }
  return (
    <section className="grid gap-3" aria-label="催办">
      <TextField aria-label="记一条催办" value={note} onChange={setNote}>
        <Input
          placeholder="记一条催办"
          onKeyDown={(ev) => {
            if (ev.key === "Enter" && !ev.nativeEvent.isComposing) save()
          }}
        />
      </TextField>
      <AnimatePresence initial={false}>
        {typing && (
          <motion.div
            key="meta"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.22, ease }}
            className="-mt-3 overflow-hidden"
          >
            <div className="flex items-center gap-2 pt-3">
              <Popover isOpen={dateOpen} onOpenChange={setDateOpen}>
                <Button size="sm" variant="secondary" aria-label={`催办日期 ${date}`}>
                  {date === TODAY ? "今天" : shortDate(date)}
                </Button>
                <Popover.Content placement="bottom start">
                  <Popover.Dialog aria-label="催办日期">
                    <DateCalendar
                      label="催办日期"
                      value={date}
                      max={TODAY}
                      onChange={(iso) => {
                        setDate(iso)
                        setDateOpen(false)
                      }}
                    />
                  </Popover.Dialog>
                </Popover.Content>
              </Popover>
              <ToggleButtonGroup
                aria-label="方式"
                size="sm"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={new Set([channel])}
                onSelectionChange={(keys) => {
                  const k = [...keys][0]
                  if (k) setChannel(k as Channel)
                }}
              >
                {CHANNELS.map((c, i) => (
                  <ToggleButton key={c} id={c}>
                    {i > 0 && <ToggleButtonGroup.Separator />}
                    {c}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Button size="sm" variant="primary" className="ml-auto" onPress={save}>
                记下
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {e.reminders.length > 0 && (
        <ul className="grid">
          <AnimatePresence initial={false}>
            {e.reminders.map((r) => {
              const Icon = channelIcon[r.channel]
              return (
                <motion.li
                  key={keyOf(r)}
                  layout="position"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.28, ease }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-[16px_1fr] gap-3 py-2">
                    <span className="flex h-5 items-center text-muted">
                      <Icon size={16} aria-hidden />
                    </span>
                    <div className="grid gap-1">
                      <p className="text-sm">{r.note}</p>
                      <span className="text-xs text-muted">
                        {shortDate(r.date)} · {r.channel} · {r.by}
                      </span>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      )}
    </section>
  )
}

function Contact({ e }: { e: Exhibitor }) {
  const c = e.contact
  if (!c.name) return <p className="text-sm text-muted">还没有对接人</p>
  const lines = [
    { Icon: Phone, v: c.phone, label: "电话" },
    { Icon: MessageCircle, v: c.wechat, label: "微信" },
    { Icon: Mail, v: c.email, label: "邮箱" },
  ].filter((l) => l.v)
  return (
    <section className="grid gap-2" aria-label="对接人">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-medium">{c.name}</span>
        <span className="text-xs text-muted">{c.title}</span>
      </div>
      <ul className="grid gap-1">
        {lines.map(({ Icon, v, label }) => (
          <li key={label} className="flex items-center gap-3 text-sm">
            <Icon size={16} className="shrink-0 text-muted" aria-label={label} />
            <span className="select-all">{v}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export const DetailNav = memo(function DetailNav({ prev, next, onGo }: { prev?: Exhibitor; next?: Exhibitor; onGo: (id: string, dir: 1 | -1) => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Button size="sm" variant="secondary" isDisabled={!prev} aria-label={prev ? `上一家 ${prev.company}` : "上一家"} onPress={() => prev && onGo(prev.id, -1)}>
        <ChevronLeft size={16} />
        {prev?.company}
      </Button>
      <Button size="sm" variant="secondary" isDisabled={!next} aria-label={next ? `下一家 ${next.company}` : "下一家"} onPress={() => next && onGo(next.id, 1)}>
        {next?.company}
        <ChevronRight size={16} />
      </Button>
    </div>
  )
})
