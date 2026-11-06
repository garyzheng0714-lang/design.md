// 详情的容器：宽屏是名单右侧的浮板（不加遮罩，名单照常能点），窄屏是从底部上来的抽屉。底部钉着上一家 / 下一家或「添加」。
import { Button, CloseButton, Drawer, ScrollShadow } from "@heroui/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import type { ReactNode } from "react"
import type { Exhibitor } from "~bench/data/expo"

const SLIDE = { type: "spring", duration: 0.45, bounce: 0 } as const
const PAGE = {
  enter: (d: number) => ({ opacity: 0, x: d * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -24 }),
}

type Content = { k: string; dir: number; body: ReactNode; foot: ReactNode }

export function Panel({ open, k, dir, body, foot, onClose }: Content & { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="panel"
          aria-label="详情"
          data-panel
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 32, transition: { duration: 0.18 } }}
          transition={{ x: SLIDE, opacity: { duration: 0.12 } }}
          className="absolute bottom-2 right-2 top-0 z-20 flex w-110 flex-col overflow-hidden rounded-2xl bg-overlay shadow-overlay"
        >
          <CloseButton aria-label="关闭" onPress={onClose} className="absolute right-4 top-4 z-10" />
          <div className="relative min-h-0 flex-1">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={k}
                custom={dir}
                variants={PAGE}
                initial="enter"
                animate="center"
                exit="exit"
                transition={dir ? SLIDE : { duration: 0 }}
                className="absolute inset-0"
              >
                <ScrollShadow size={24} className="h-full px-4 pb-6 pt-5">
                  {body}
                </ScrollShadow>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex min-h-13 items-center justify-between gap-2 border-t border-separator px-3 py-2">{foot}</div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export function Sheet({ open, k, body, foot, onClose }: Content & { open: boolean; onClose: () => void }) {
  return (
    <Drawer.Backdrop isOpen={open} onOpenChange={(o) => !o && onClose()}>
      <Drawer.Content placement="bottom">
        <Drawer.Dialog aria-label="详情" className="px-4 pb-3 pt-3" data-panel>
          <Drawer.Handle />
          <Drawer.CloseTrigger aria-label="关闭" />
          <Drawer.Body className="text-foreground">
            <div key={k}>{body}</div>
          </Drawer.Body>
          <Drawer.Footer className="justify-between border-t border-separator pt-2">{foot}</Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  )
}

/** 上一家 / 下一家：写出邻居的名字，按名单当前的顺序 */
export function Neighbors({ prev, next, onGo }: { prev: Exhibitor | null; next: Exhibitor | null; onGo: (id: string, dir: number) => void }) {
  return (
    <>
      {prev ? (
        <Button size="sm" variant="ghost" aria-label={`上一家：${prev.company}`} onPress={() => onGo(prev.id, -1)} className="text-muted">
          <ChevronLeft aria-hidden className="size-4" />
          {prev.company}
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button size="sm" variant="ghost" aria-label={`下一家：${next.company}`} onPress={() => onGo(next.id, 1)} className="text-muted">
          {next.company}
          <ChevronRight aria-hidden className="size-4" />
        </Button>
      ) : (
        <span />
      )}
    </>
  )
}
