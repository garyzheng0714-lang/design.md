import { ListBox, ProgressBar, Tabs } from "@heroui/react"
import { memo } from "react"
import { PACKAGES, type Exhibitor } from "~bench/data/expo"
import { progressOf, type Scope } from "./model"

type Props = { scope: Scope; onScope: (s: Scope) => void; list: Exhibitor[]; overdue: number }

const label = (s: Scope) => (s === "all" ? "全部展商" : s === "overdue" ? "逾期权益" : s)

function Bar({ list, name }: { list: Exhibitor[]; name: string }) {
  const p = progressOf(list)
  return (
    <ProgressBar aria-label={`${name}已交付 ${p.done} / ${p.total} 项`} size="sm" color="success" value={p.value} className="w-14">
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  )
}

const itemClass =
  "grid grid-cols-[1fr_56px] items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted data-[selected=true]:bg-default data-[selected=true]:font-medium data-[selected=true]:text-foreground"

export const ScopeSidebar = memo(function ScopeSidebar({ scope, onScope, list, overdue }: Props) {
  const items: Scope[] = ["all", "overdue"]
  return (
    <nav className="sticky top-0 flex h-dvh w-[232px] shrink-0 flex-col gap-4 border-r border-separator px-3 py-6" aria-label="范围">
      <div className="px-3 text-sm font-semibold">FBIF 2027</div>
      <ListBox
        aria-label="范围"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={new Set([scope])}
        onSelectionChange={(keys) => {
          const k = [...keys][0]
          if (k) onScope(k as Scope)
        }}
        className="gap-1 p-0"
      >
        <ListBox.Section className="grid gap-1 border-b border-separator pb-3">
          {items.map((s) => (
            <ListBox.Item key={s} id={s} textValue={label(s)} className={itemClass}>
              <span>{label(s)}</span>
              {s === "all" ? <Bar list={list} name="全部" /> : overdue > 0 ? <span className="text-right font-medium text-danger tabular-nums">{overdue}</span> : null}
            </ListBox.Item>
          ))}
        </ListBox.Section>
        <ListBox.Section className="grid gap-1 pt-2">
          {PACKAGES.map((p) => (
            <ListBox.Item key={p} id={p} textValue={p} className={itemClass}>
              <span>{p}</span>
              <Bar list={list.filter((e) => e.pkg === p)} name={p} />
            </ListBox.Item>
          ))}
        </ListBox.Section>
      </ListBox>
    </nav>
  )
})

export const ScopeTabs = memo(function ScopeTabs({ scope, onScope, overdue }: Omit<Props, "list">) {
  const items: Scope[] = ["all", "overdue", ...PACKAGES]
  return (
    <Tabs variant="secondary" selectedKey={scope} onSelectionChange={(k) => onScope(k as Scope)}>
      <Tabs.ListContainer>
        <Tabs.List aria-label="范围">
          {items.map((s) => (
            <Tabs.Tab key={s} id={s}>
              <span className="flex items-center gap-1 whitespace-nowrap">
                {s === "all" ? "全部" : s === "overdue" ? "逾期" : s}
                {s === "overdue" && overdue > 0 && <span className="text-danger tabular-nums">{overdue}</span>}
              </span>
              <Tabs.Indicator />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  )
})

export const scopeTitle = (s: Scope) => (s === "all" ? "全部展商" : s === "overdue" ? "逾期权益" : `${s}展商`)
