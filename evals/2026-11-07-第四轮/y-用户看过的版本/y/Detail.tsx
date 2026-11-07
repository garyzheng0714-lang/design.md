import { Button, Calendar, FieldError, Input, Label, Link, Popover, Separator, TextArea, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from "@heroui/react"
import { AnimatePresence, motion } from "motion/react"
import { CalendarDays, Check, Copy, Mail, MapPin, MessageCircle, Paperclip, Phone, Undo2, UserRound, Users, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from "react"
import { ME, TODAY, type Channel, type Contact, type Exhibitor, type Reminder, type RightStatus } from "~bench/data/expo"
import { NEXT_ACTION, dueText, fromCal, guessChannel, orderedRights, toCal, whenText } from "./model"
import { DueButton, EASE, OUT, Shift, StatusMenu } from "./parts"

type Icon = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
const CHANNELS: Channel[] = ["电话", "微信", "邮件", "面谈"]
const CHANNEL_ICON: Record<Channel, Icon> = { 电话: Phone, 微信: MessageCircle, 邮件: Mail, 面谈: Users }

/** 用回车记下的催办：时间线里直接出现，不做长出来的动画 */
const typed = new WeakSet<Reminder>()

export type DetailActions = {
  undoRight: string | null
  onAdvance: (rightId: string) => void
  onStatus: (rightId: string, s: RightStatus) => void
  onDue: (rightId: string, iso: string) => void
  onUndo: () => void
  onContact: (c: Contact) => void
  onBooth: (b: string) => void
  onLog: (r: Reminder) => void
  onClose: () => void
}

export function DetailHead({ ex, act }: { ex: Exhibitor; act: DetailActions }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-medium">{ex.company}</h2>
        <Button isIconOnly size="sm" variant="ghost" aria-label="关闭详情" onPress={act.onClose} className="group -me-2">
          <X size={16} strokeWidth={1.5} className="group-hover:stroke-2" />
        </Button>
      </div>
      <div className="flex min-h-8 flex-wrap items-center gap-x-4 gap-y-1 text-muted">
        <span>{ex.pkg}</span>
        <span className="inline-flex items-center gap-1">
          <UserRound size={14} strokeWidth={1.5} />
          {ex.owner}
        </span>
        <Booth booth={ex.booth} onSave={act.onBooth} />
      </div>
    </div>
  )
}

/** 展位：有就显示，没有就是一个「分配展位」，原地弹出填 */
function Booth({ booth, onSave }: { booth: string | null; onSave: (b: string) => void }) {
  const [open, setOpen] = useState(false)
  const [v, setV] = useState("")
  const save = () => {
    if (!v.trim()) return
    onSave(v.trim().toUpperCase())
    setOpen(false)
  }
  if (booth)
    return (
      <span className="inline-flex items-center gap-1">
        <MapPin size={14} strokeWidth={1.5} />
        {booth}
      </span>
    )
  return (
    <Popover
      isOpen={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (o) setV("")
      }}
    >
      <Button size="sm" variant="ghost" className="group -mx-2 gap-1 px-2 font-normal text-muted">
        <MapPin size={14} strokeWidth={1.5} className="group-hover:stroke-2" />
        分配展位
      </Button>
      <Popover.Content placement="bottom start" offset={4}>
        <Popover.Dialog aria-label="分配展位" className="flex items-end gap-2 p-3">
          <TextField
            autoFocus
            value={v}
            onChange={setV}
            className="w-32"
            onKeyDown={(e) => {
              if (e.key === "Enter") save()
            }}
          >
            <Label>展位号</Label>
            <Input placeholder="如 B12" />
          </TextField>
          <Button size="sm" variant="secondary" onPress={save}>
            保存
          </Button>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}

/** 权益 → 对接人 → 催办记录，往下排；面板不够高就滚动 */
export function DetailBody({
  ex,
  act,
  flash,
  drafting,
}: {
  ex: Exhibitor
  act: DetailActions
  flash: { id: string; n: number } | null
  drafting: boolean
}) {
  // 打开时定一次顺序：面板开着时推进不挪行，按钮和撤销都在原位
  const order = useMemo(() => orderedRights(ex).map((r) => r.id), [ex.id]) // eslint-disable-line react-hooks/exhaustive-deps
  const rights = order.map((id) => ex.rights.find((r) => r.id === id)!).filter(Boolean)
  const urgent = rights.find((r) => r.status !== "已交付")?.id
  const flashRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (flash) flashRef.current?.scrollIntoView({ block: "nearest" })
  }, [flash?.n]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-3" aria-label="权益">
        {rights.map((r) => {
          const next = NEXT_ACTION[r.status]
          const hit = r.id === flash?.id
          const tone = dueText(r).tone
          const undo = act.undoRight === r.id
          return (
            <div
              key={r.id}
              ref={hit ? flashRef : undefined}
              data-right={r.name}
              className="relative col-span-full grid grid-cols-subgrid items-center gap-y-1 py-2"
            >
              {hit && (
                <motion.span
                  key={flash!.n}
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-2 inset-y-0 rounded-lg bg-accent-soft"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                />
              )}
              <span className="relative col-span-2 font-medium">{r.name}</span>
              <span className="relative row-span-2 flex items-center justify-end self-center">
                <AnimatePresence initial={false} mode="popLayout">
                  {undo ? (
                    <motion.span
                      key="undo"
                      layout="position"
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0, transition: { duration: 0.18, ease: EASE } }}
                      exit={{ opacity: 0, transition: OUT }}
                    >
                      <Tooltip delay={300} closeDelay={0}>
                        <Button isIconOnly size="sm" variant="ghost" aria-label="撤销" onPress={act.onUndo} className="group">
                          <Undo2 size={16} strokeWidth={1.5} className="group-hover:stroke-2" />
                        </Button>
                        <Tooltip.Content>撤销</Tooltip.Content>
                      </Tooltip>
                    </motion.span>
                  ) : null}
                  {next ? (
                    <motion.span key="go" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: OUT }}>
                      <Button
                        size="sm"
                        variant={r.id === urgent && !drafting ? "primary" : "secondary"}
                        onPress={() => act.onAdvance(r.id)}
                        data-advance={r.name}
                      >
                        <Shift>{next}</Shift>
                      </Button>
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </span>
              <span className="relative">
                <DueButton right={r} label={r.name} onChange={(iso) => act.onDue(r.id, iso)} />
              </span>
              <span className="relative min-w-0">
                <StatusMenu status={r.status} label={r.name} quiet={tone === "danger" || tone === "warning"} onChange={(s) => act.onStatus(r.id, s)} />
              </span>
              <AnimatePresence initial={false}>
                {r.material && (
                  <motion.span
                    key={r.material}
                    className="relative col-span-full flex items-center gap-1 overflow-hidden text-xs text-muted"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1, transition: { duration: 0.2, ease: EASE } }}
                    exit={{ height: 0, opacity: 0, transition: OUT }}
                  >
                    <Paperclip size={12} strokeWidth={1.5} className="shrink-0" />
                    <span className="break-all pt-1">{r.material}</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </section>

      <Separator />

      <ContactBlock contact={ex.contact} onSave={act.onContact} />

      <Separator />

      <Timeline reminders={ex.reminders} />
    </div>
  )
}

const BLANK: Contact = { name: "", title: "", phone: "", email: "", wechat: "" }
const FIELDS: { key: keyof Contact; label: string }[] = [
  { key: "name", label: "姓名" },
  { key: "title", label: "职务" },
  { key: "phone", label: "电话" },
  { key: "email", label: "邮箱" },
  { key: "wechat", label: "微信" },
]

/** 对接人：没有时原地补；有了就是能直接拨、发、复制的几行 */
function ContactBlock(props: { contact: Contact; onSave: (c: Contact) => void }) {
  const [editing, setEditing] = useState(false)
  const mode = editing ? "edit" : props.contact.name ? "view" : "empty"
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } }}
        exit={{ opacity: 0, transition: OUT }}
      >
        <ContactInner {...props} editing={editing} setEditing={setEditing} />
      </motion.div>
    </AnimatePresence>
  )
}

function ContactInner({
  contact,
  onSave,
  editing,
  setEditing,
}: {
  contact: Contact
  onSave: (c: Contact) => void
  editing: boolean
  setEditing: (v: boolean) => void
}) {
  const [draft, setDraft] = useState<Contact>(BLANK)
  const [tried, setTried] = useState(false)

  if (editing) {
    const save = () => {
      setTried(true)
      if (!draft.name.trim()) return
      onSave({ ...draft, name: draft.name.trim() })
      setEditing(false)
    }
    return (
      <section
        aria-label="对接人"
        className="grid grid-cols-2 gap-3"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault()
            e.stopPropagation()
            setEditing(false)
          } else if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            e.preventDefault()
            save()
          }
        }}
      >
        {FIELDS.map((f, i) => (
          <TextField
            key={f.key}
            autoFocus={i === 0}
            value={draft[f.key]}
            onChange={(v) => setDraft((d) => ({ ...d, [f.key]: v }))}
            isInvalid={f.key === "name" && tried && !draft.name.trim()}
            className={f.key === "email" ? "col-span-2" : ""}
          >
            <Label>{f.label}</Label>
            <Input />
            {f.key === "name" ? <FieldError>填姓名</FieldError> : null}
          </TextField>
        ))}
        <div className="col-span-2 flex justify-end gap-2">
          <Button size="sm" variant="ghost" onPress={() => setEditing(false)}>
            取消
          </Button>
          <Button size="sm" variant="secondary" onPress={save}>
            保存对接人
          </Button>
        </div>
      </section>
    )
  }

  if (!contact.name)
    return (
      <section aria-label="对接人" className="flex items-center justify-between gap-4">
        <span className="text-muted">还没有对接人</span>
        <Button
          size="sm"
          variant="ghost"
          className="-me-2"
          onPress={() => {
            setDraft(BLANK)
            setTried(false)
            setEditing(true)
          }}
        >
          添加对接人
        </Button>
      </section>
    )

  return (
    <section className="flex flex-col gap-2" aria-label="对接人">
      <div className="flex items-center gap-2">
        <span className="font-medium">{contact.name}</span>
        {contact.title ? <span className="text-muted">{contact.title}</span> : null}
      </div>
      {contact.phone ? (
        <Line icon={Phone}>
          <Link href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="tabular-nums">
            {contact.phone}
          </Link>
        </Line>
      ) : null}
      {contact.email ? (
        <Line icon={Mail}>
          <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
        </Line>
      ) : null}
      {contact.wechat ? (
        <Line icon={MessageCircle}>
          <span className="group/c flex items-center gap-1">
            {contact.wechat}
            <CopyButton text={contact.wechat} />
          </span>
        </Line>
      ) : null}
    </section>
  )
}

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setDone(false), 1500)
    return () => clearTimeout(t)
  }, [done])
  return (
    <Button
      isIconOnly
      size="sm"
      variant="ghost"
      aria-label={done ? "已复制微信号" : "复制微信号"}
      className="size-7 opacity-0 transition-opacity group-hover/c:opacity-100 data-[focus-visible=true]:opacity-100 [@media(hover:none)]:opacity-100"
      onPress={() => {
        void navigator.clipboard?.writeText(text)
        setDone(true)
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span key={String(done)} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, transition: OUT }}>
          {done ? <Check size={14} strokeWidth={2} className="text-success-soft-foreground" /> : <Copy size={14} strokeWidth={1.5} />}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}

function Line({ icon: I, children }: { icon: Icon; children: ReactNode }) {
  return (
    <div className="flex min-h-7 items-center gap-2">
      <I size={16} strokeWidth={1.5} className="shrink-0 text-muted" />
      {children}
    </div>
  )
}

const keys = new WeakMap<Reminder, string>()
let seq = 0
const keyOf = (r: Reminder) => {
  let k = keys.get(r)
  if (!k) keys.set(r, (k = `r${++seq}`))
  return k
}

/** 催办记录：点 + 线的时间线，新的在上 */
function Timeline({ reminders }: { reminders: Reminder[] }) {
  // 刚记下的一条滚到眼前，记完就能看到它落进时间线
  const listRef = useRef<HTMLOListElement>(null)
  const prev = useRef(reminders)
  useEffect(() => {
    const old = prev.current
    prev.current = reminders
    const i = reminders.findIndex((r) => !old.includes(r))
    if (old === reminders || i < 0) return
    const li = listRef.current?.children[i]
    const calm = typed.has(reminders[i]) || matchMedia("(prefers-reduced-motion: reduce)").matches
    requestAnimationFrame(() => li?.scrollIntoView({ block: "center", behavior: calm ? "auto" : "smooth" }))
  }, [reminders])
  if (!reminders.length) return <p className="text-muted" data-timeline>还没有催办记录</p>
  return (
    <ol ref={listRef} className="flex flex-col" aria-label="催办记录" data-timeline>
      <AnimatePresence initial={false}>
        {reminders.map((r, i) => {
          const I = CHANNEL_ICON[r.channel]
          return (
            <motion.li
              key={keyOf(r)}
              layout={typed.has(r) ? false : "position"}
              initial={typed.has(r) ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.24, ease: EASE }}
              className="grid grid-cols-[12px_minmax(0,1fr)] gap-x-3 overflow-hidden"
            >
              <span className="flex flex-col items-center pt-2">
                <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${i === 0 ? "bg-foreground" : "bg-muted"}`} />
                {i < reminders.length - 1 && <Separator orientation="vertical" className="mt-2 flex-1" />}
              </span>
              <span className="flex flex-col gap-1 pb-4">
                <span className="flex flex-wrap items-center gap-x-3 text-muted">
                  <span className="text-foreground">{whenText(r.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <I size={14} strokeWidth={1.5} />
                    {r.channel}
                  </span>
                  <span>{r.by}</span>
                </span>
                <span>{r.note}</span>
              </span>
            </motion.li>
          )
        })}
      </AnimatePresence>
    </ol>
  )
}

/** 钉在详情底部的催办框：打了字才露出日期、方式和记下 */
export function Composer({ ex, onLog, text, onText }: { ex: Exhibitor; onLog: (r: Reminder) => void; text: string; onText: (t: string) => void }) {
  const [date, setDate] = useState(TODAY)
  const [picked, setPicked] = useState<Channel | null>(null)
  const [dateOpen, setDateOpen] = useState(false)
  const [quick, setQuick] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)
  const fallback = ex.reminders[0]?.channel ?? "电话"
  const channel = picked ?? guessChannel(text, fallback)
  const has = text.trim().length > 0

  const submit = (viaKey: boolean) => {
    if (!has) return
    const r: Reminder = { date, channel, by: ME, note: text.trim() }
    if (viaKey) typed.add(r)
    setQuick(viaKey)
    onLog(r)
    onText("")
    setPicked(null)
    setDate(TODAY)
    ref.current?.focus()
  }

  return (
    <div className="flex w-full flex-col" data-composer>
      <TextArea
        ref={ref}
        aria-label="记一条催办"
        placeholder="记一条催办"
        rows={1}
        value={text}
        onChange={(e) => onText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault()
            submit(true)
          }
        }}
        className="max-h-40 w-full resize-none field-sizing-content"
      />
      <AnimatePresence initial={false}>
        {has && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.2, ease: EASE } }}
            exit={{ height: 0, opacity: 0, transition: quick ? { duration: 0 } : OUT }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <Popover isOpen={dateOpen} onOpenChange={setDateOpen}>
                <Button size="sm" variant="secondary" aria-label={`催办日期 ${whenText(date)}`}>
                  <CalendarDays size={16} strokeWidth={1.5} />
                  <Shift>{whenText(date)}</Shift>
                </Button>
                <Popover.Content placement="top start" offset={4}>
                  <Popover.Dialog aria-label="催办日期" className="p-1">
                    <Calendar
                      aria-label="催办日期"
                      value={toCal(date)}
                      maxValue={toCal(TODAY)}
                      onChange={(d) => {
                        if (d) setDate(fromCal(d))
                        setDateOpen(false)
                      }}
                    >
                      <Calendar.Header>
                        <Calendar.Heading />
                        <Calendar.NavButton slot="previous" />
                        <Calendar.NavButton slot="next" />
                      </Calendar.Header>
                      <Calendar.Grid>
                        <Calendar.GridHeader>{(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}</Calendar.GridHeader>
                        <Calendar.GridBody>{(d) => <Calendar.Cell date={d} />}</Calendar.GridBody>
                      </Calendar.Grid>
                    </Calendar>
                  </Popover.Dialog>
                </Popover.Content>
              </Popover>
              <ToggleButtonGroup
                aria-label="方式"
                size="sm"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={new Set([channel])}
                onSelectionChange={(k) => {
                  const v = [...k][0] as Channel | undefined
                  if (v) setPicked(v)
                }}
              >
                {CHANNELS.map((c) => (
                  <ToggleButton key={c} id={c}>
                    {c}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Button size="sm" variant="primary" className="ms-auto" onPress={() => submit(false)}>
                记下催办
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
