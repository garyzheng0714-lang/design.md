// 权益状态字形：虚线空环 = 待提交物料，半圆 = 待审核，实心带勾 = 已交付。名单里一排就是这家的交付进度。
import { motion } from "motion/react"
import { memo } from "react"
import type { Right, RightStatus } from "~bench/data/expo"
import { doneOf } from "./model"

const SPRING = { type: "spring", duration: 0.35, bounce: 0 } as const

export function Glyph({ status, size = 12 }: { status: RightStatus; size?: number }) {
  const half = status === "待审核"
  const done = status === "已交付"
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="shrink-0 overflow-visible" aria-hidden>
      <circle cx="8" cy="8" r="6.5" fill="none" strokeWidth="1.5" strokeDasharray={half || done ? undefined : "3.1 2"} className={`transition-colors duration-200 ${half || done ? "stroke-accent" : "stroke-field-border"}`} />
      <motion.path d="M8 1.5 A6.5 6.5 0 0 1 8 14.5 Z" className="fill-accent" initial={false} animate={{ opacity: half ? 1 : 0 }} transition={{ duration: 0.2 }} />
      <motion.circle cx="8" cy="8" r="7.25" className="fill-accent" style={{ transformOrigin: "8px 8px" }} initial={false} animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.5 }} transition={SPRING} />
      {size > 12 && (
        <motion.path d="M5 8.2 7 10.2 11 6" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="stroke-accent-foreground" initial={false} animate={{ pathLength: done ? 1 : 0, opacity: done ? 1 : 0 }} transition={{ duration: 0.25, delay: done ? 0.08 : 0 }} />
      )}
    </svg>
  )
}

/** 名单里的小格：同一个字形，用 CSS 过渡跟着变（一屏几百个，不挂动画实例） */
function Dot({ status }: { status: RightStatus }) {
  const half = status === "待审核"
  const done = status === "已交付"
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" className="shrink-0 overflow-visible" aria-hidden>
      <circle cx="8" cy="8" r="6.5" fill="none" strokeWidth="1.5" strokeDasharray={half || done ? undefined : "3.1 2"} className={`transition-colors duration-200 ${half || done ? "stroke-accent" : "stroke-field-border"}`} />
      <path d="M8 1.5 A6.5 6.5 0 0 1 8 14.5 Z" className="fill-accent transition-opacity duration-200" style={{ opacity: half ? 1 : 0 }} />
      <circle cx="8" cy="8" r="7.25" className="fill-accent transition-[opacity,scale] duration-300 [transform-box:fill-box] origin-center" style={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.5 }} />
    </svg>
  )
}

/** 一家展商的交付进度：每项权益一格，后跟 已交付 / 共几项 */
export const Seats = memo(function Seats({ rights }: { rights: Right[] }) {
  const done = doneOf(rights)
  return (
    <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap" aria-label={`已交付 ${done} 项，共 ${rights.length} 项`}>
      {rights.map((r) => (
        <Dot key={r.id} status={r.status} />
      ))}
      <span className="ml-2 text-xs tabular-nums text-muted">
        {done} / {rights.length}
      </span>
    </span>
  )
})
