// 视图切换：宽屏是左栏列表（每个套餐一条进度），窄屏收进顶上的下拉。「逾期」单独一项，只给红字数。
import { Label, ListBox, ProgressBar, Select, type Key } from "@heroui/react"
import { memo } from "react"
import { PACKAGES, type Exhibitor } from "~bench/data/expo"
import { lateCount, progressOf, scopeTitle, type Scope } from "./model"

const SCOPES: Scope[] = ["全部", ...PACKAGES]

function ScopeLine({ list, scope }: { list: Exhibitor[]; scope: Scope }) {
  const { done, total } = progressOf(list, scope)
  return (
    <span className="grid w-full grid-cols-[64px_1fr_56px] items-center gap-3">
      <span>{scopeTitle(scope)}</span>
      <ProgressBar aria-label={`${scopeTitle(scope)}交付进度`} value={total ? (done / total) * 100 : 0} size="sm">
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <span className="text-right text-xs tabular-nums text-muted">
        {done} / {total}
      </span>
    </span>
  )
}

function LateLine({ list }: { list: Exhibitor[] }) {
  const n = lateCount(list)
  return (
    <span className="flex w-full items-center justify-between">
      <span>逾期</span>
      {n > 0 && <span className="text-xs tabular-nums text-danger">{n}</span>}
    </span>
  )
}

const ITEM = "text-sm data-[selected=true]:bg-default data-[selected=true]:font-medium"

export const ScopeNav = memo(function ScopeNav({ list, scope, onChange }: { list: Exhibitor[]; scope: Scope; onChange: (s: Scope) => void }) {
  return (
    <ListBox
      aria-label="视图"
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[scope]}
      onSelectionChange={(keys) => {
        const k = [...keys][0]
        if (k) onChange(k as Scope)
      }}
      className="p-0"
    >
      {SCOPES.map((s) => (
        <ListBox.Item key={s} id={s} textValue={scopeTitle(s)} className={ITEM}>
          <ScopeLine list={list} scope={s} />
        </ListBox.Item>
      ))}
      <ListBox.Item id="逾期" textValue="逾期" className={`mt-4 ${ITEM}`}>
        <LateLine list={list} />
      </ListBox.Item>
    </ListBox>
  )
})

export function ScopeSelect({ list, scope, onChange }: { list: Exhibitor[]; scope: Scope; onChange: (s: Scope) => void }) {
  const { done, total } = progressOf(list, scope)
  return (
    <Select aria-label="视图" value={scope} onChange={(k: Key | Key[] | null) => k && onChange(k as Scope)} className="min-w-0 flex-1">
      <Label className="sr-only">视图</Label>
      <Select.Trigger>
        <Select.Value>
          {() => (
            <span className="flex items-center gap-2">
              <span className="font-medium">{scopeTitle(scope)}</span>
              {scope !== "逾期" && (
                <span className="text-xs tabular-nums text-muted">
                  {done} / {total}
                </span>
              )}
            </span>
          )}
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {SCOPES.map((s) => (
            <ListBox.Item key={s} id={s} textValue={scopeTitle(s)}>
              <ScopeLine list={list} scope={s} />
            </ListBox.Item>
          ))}
          <ListBox.Item id="逾期" textValue="逾期">
            <LateLine list={list} />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
