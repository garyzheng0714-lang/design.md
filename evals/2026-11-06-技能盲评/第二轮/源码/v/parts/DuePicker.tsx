// 日期按钮：按钮上是读得懂的日期，点开是日历，选完就关。权益截止日与催办日期共用。
import { useState, type ReactNode } from "react"
import { Button, Calendar, Popover } from "@heroui/react"
import { parseDate } from "@internationalized/date"
import type { Right } from "~bench/data/expo"
import { TONE_TEXT, dueLabel } from "./model"

type DateButtonProps = {
  value: string
  onChange: (iso: string) => void
  label: string
  className?: string
  children: ReactNode
  maxValue?: string
  dataDue?: string
}

export function DateButton({ value, onChange, label, className, children, maxValue, dataDue }: DateButtonProps) {
  const [open, setOpen] = useState(false)
  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Button size="sm" variant="ghost" aria-label={label} data-due={dataDue} className={className}>
        {children}
      </Button>
      <Popover.Content placement="bottom end">
        <Popover.Dialog aria-label={label}>
          <Calendar
            aria-label={label}
            value={parseDate(value)}
            maxValue={maxValue ? parseDate(maxValue) : undefined}
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

export function DuePicker({ right, onChange }: { right: Right; onChange: (iso: string) => void }) {
  const { text, tone } = dueLabel(right)
  return (
    <DateButton
      value={right.due}
      onChange={onChange}
      label={`${right.name}截止日 ${right.due}`}
      dataDue={right.id}
      className={`min-w-0 px-2 font-normal tabular-nums ${TONE_TEXT[tone]}`}
    >
      {text}
    </DateButton>
  )
}
