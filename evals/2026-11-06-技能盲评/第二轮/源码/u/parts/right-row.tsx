// 一项权益：字形 + 名字，下一行灰字是状态与物料；行尾是推进按钮（宽屏指向这一行才出现）和截止日。
import { Button } from "@heroui/react"
import { Paperclip } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { isOverdue, type Right } from "~bench/data/expo"
import { DateButton } from "./date-button"
import { Glyph } from "./glyph"
import { ADVANCE_LABEL } from "./model"

const SWAP = { type: "spring", duration: 0.3, bounce: 0 } as const

/** 字换字：旧的往上走、新的从下面上来，宽度跟着变 */
function Swap({ text }: { text: string }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span key={text} className="inline-block" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={SWAP}>
        {text}
      </motion.span>
    </AnimatePresence>
  )
}

type Props = { r: Right; touch?: boolean; picked: boolean; onPick?: () => void; onAdvance: () => void; onDue: (d: string) => void }

/** 推进按钮平时不占眼：宽屏指向这一行、键盘聚焦进来时出现（位置先留好，不挤字）；触屏点一下这一行才长出来，别的行不留空 */
export function RightRow({ r, touch, picked, onPick, onAdvance, onDue }: Props) {
  const label = ADVANCE_LABEL[r.status]
  const show = label && (!touch || picked)
  return (
    <li
      data-right={r.name}
      data-picked={picked || undefined}
      onClick={onPick}
      className="group flex items-start gap-3 rounded-xl px-2 py-2 hover:bg-default/50 focus-within:bg-default/50 data-[picked]:bg-default/50"
    >
      <span className="flex h-5 items-center">
        <Glyph status={r.status} size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{r.name}</div>
        <div className="mt-0.5 text-xs text-muted [overflow-wrap:anywhere]">
          <Swap text={r.status} />
          {r.material && (
            <span>
              {"  "}
              <Paperclip aria-hidden className="mx-1 inline size-3 align-[-1px]" />
              {r.material}
            </span>
          )}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {show && (
          <motion.span
            key="advance"
            initial={touch ? { opacity: 0, width: 0 } : false}
            animate={{ opacity: 1, width: "auto" }}
            exit={touch ? { opacity: 0, width: 0 } : { opacity: 0, scale: 0.96 }}
            transition={touch ? SWAP : { duration: 0.15 }}
            className={touch ? "shrink-0 overflow-hidden" : "shrink-0"}
          >
            <Button
              size="sm"
              variant="secondary"
              data-advance
              onPress={onAdvance}
              className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 group-data-[picked]:opacity-100 focus-visible:opacity-100"
            >
              <Swap text={label} />
            </Button>
          </motion.span>
        )}
      </AnimatePresence>
      <DateButton value={r.due} onChange={onDue} label={`${r.name}截止日`} danger={isOverdue(r)} marker="due" />
    </li>
  )
}
