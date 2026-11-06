// 催办：时间线顶上一个输入框，打字后才露出日期、方式和「记下」；记下的一条从最上面长出来，新的在前。
import { Button, TextArea, ToggleButton, ToggleButtonGroup } from "@heroui/react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { ME, TODAY, type Channel, type Reminder } from "~bench/data/expo"
import { DateButton } from "./date-button"
import { md } from "./model"

const CHANNELS: Channel[] = ["电话", "微信", "邮件", "面谈"]
const GROW = { type: "spring", duration: 0.4, bounce: 0 } as const

export function Reminders({ list, onAdd }: { list: Reminder[]; onAdd: (r: Reminder) => void }) {
  const [note, setNote] = useState("")
  const [date, setDate] = useState(TODAY)
  const [channel, setChannel] = useState<Channel>("电话")
  const ready = note.trim().length > 0

  const save = () => {
    if (!ready) return
    onAdd({ date, channel, by: ME, note: note.trim() })
    setNote("")
    setDate(TODAY)
    setChannel("电话")
  }

  return (
    <section aria-label="催办" className="flex flex-col">
      <h3 className="px-2 pb-2 text-xs font-medium text-muted">催办</h3>
      <div className="px-2">
        <TextArea
          aria-label="记一条催办"
          placeholder="记一条催办…"
          rows={1}
          fullWidth
          value={note}
          data-note
          className="resize-none"
          onChange={(event) => setNote(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              event.preventDefault()
              save()
            }
          }}
        />
        <AnimatePresence initial={false}>
          {ready && (
            <motion.div
              key="compose"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={GROW}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <ToggleButtonGroup
                  aria-label="方式"
                  size="sm"
                  selectionMode="single"
                  disallowEmptySelection
                  selectedKeys={[channel]}
                  onSelectionChange={(keys) => {
                    const k = [...keys][0]
                    if (k) setChannel(k as Channel)
                  }}
                >
                  {CHANNELS.map((c) => (
                    <ToggleButton key={c} id={c}>
                      {c}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
                <DateButton value={date} onChange={setDate} label="催办日期" />
                <Button size="sm" variant="primary" className="ml-auto" onPress={save}>
                  记下
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ol className="mt-2 flex flex-col">
        <AnimatePresence initial={false}>
          {list.map((r, i) => (
            <motion.li
              key={list.length - i}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={GROW}
              className="overflow-hidden"
            >
              <div className="px-2 py-2">
                <div className="text-xs text-muted">
                  {md(r.date)} · {r.channel} · {r.by}
                </div>
                <p className="mt-1 text-sm">{r.note}</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </section>
  )
}
