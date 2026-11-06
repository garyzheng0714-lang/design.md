// 一家展商的详情：头部（公司、套餐、展位与负责人）→ 对接人 → 权益 → 催办，往下排，不分标签页。
import { Mail, MessageCircle, Phone } from "lucide-react"
import { useState } from "react"
import type { Exhibitor, Reminder } from "~bench/data/expo"
import { Reminders } from "./reminders"
import { RightRow } from "./right-row"

type Props = {
  e: Exhibitor
  touch: boolean
  contact: boolean
  onAdvance: (rightId: string) => void
  onDue: (rightId: string, due: string) => void
  onRemind: (r: Reminder) => void
}

function Contact({ c }: { c: Exhibitor["contact"] }) {
  const ways = [
    c.phone && { icon: Phone, text: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}`, label: "电话" },
    c.email && { icon: Mail, text: c.email, href: `mailto:${c.email}`, label: "邮箱" },
    c.wechat && { icon: MessageCircle, text: c.wechat, href: null, label: "微信" },
  ].filter((w) => !!w)
  if (!c.name && !ways.length) return null
  return (
    <div className="flex flex-col gap-1 px-2 text-sm">
      {c.name && (
        <div>
          <span className="font-medium">{c.name}</span>
          {c.title && <span className="ml-2 text-muted">{c.title}</span>}
        </div>
      )}
      {ways.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted">
          {ways.map(({ icon: Icon, text, href, label }) => {
            const inner = (
              <>
                <Icon aria-label={label} className="size-3.5 shrink-0" strokeWidth={1.75} />
                {text}
              </>
            )
            return href ? (
              <a key={label} href={href} className="inline-flex items-center gap-1.5 rounded-md hover:text-foreground focus-visible:text-foreground">
                {inner}
              </a>
            ) : (
              <span key={label} className="inline-flex items-center gap-1.5 select-all">
                {inner}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function DetailHead({ e }: { e: Exhibitor }) {
  const meta = [e.pkg, e.booth && `展位 ${e.booth}`, e.owner].filter(Boolean).join(" · ")
  return (
    <header className="px-2">
      <h2 className="text-lg font-semibold">{e.company}</h2>
      <p className="mt-1 text-sm text-muted">{meta}</p>
    </header>
  )
}

export function Detail({ e, touch, contact, onAdvance, onDue, onRemind }: Props) {
  const [picked, setPicked] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-6">
      {contact && <Contact c={e.contact} />}
      <section aria-label="权益">
        <h3 className="px-2 pb-1 text-xs font-medium text-muted">权益</h3>
        <ul className="flex flex-col">
          {e.rights.map((r) => (
            <RightRow
              key={r.id}
              r={r}
              touch={touch}
              picked={touch && picked === r.id}
              onPick={touch ? () => setPicked(r.id) : undefined}
              onAdvance={() => onAdvance(r.id)} onDue={(d) => onDue(r.id, d)} />
          ))}
        </ul>
      </section>
      <Reminders list={e.reminders} onAdd={onRemind} />
    </div>
  )
}
