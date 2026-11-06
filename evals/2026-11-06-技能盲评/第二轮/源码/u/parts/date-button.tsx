// 日期按钮：字就是日期（「11月20日」），点开是日历弹层，选一天就换字、关上。截止日和催办日期共用这一个。
import { Button, Calendar, Popover } from "@heroui/react"
import { parseDate } from "@internationalized/date"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { md } from "./model"

type Props = { value: string; onChange: (d: string) => void; label: string; danger?: boolean; marker?: string }

export function DateButton({ value, onChange, label, danger, marker }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Button
        size="sm"
        variant="ghost"
        aria-label={`${label}：${md(value)}`}
        data-date={marker}
        className={`min-w-22 shrink-0 justify-end overflow-hidden tabular-nums ${danger ? "text-danger" : ""}`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          >
            {md(value)}
          </motion.span>
        </AnimatePresence>
      </Button>
      <Popover.Content placement="bottom end">
        <Popover.Dialog aria-label={label}>
          <Calendar
            aria-label={label}
            value={parseDate(value)}
            onChange={(d) => {
              onChange(d.toString())
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
