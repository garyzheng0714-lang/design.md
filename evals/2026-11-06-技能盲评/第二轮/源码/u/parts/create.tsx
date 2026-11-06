// 新加的展商：名单顶上已经插好一行，这里边填边存——公司名、套餐、负责人、对接人，改一个字名单那一行跟着变。
import { Input, Label, ListBox, Select, TextField, ToggleButton, ToggleButtonGroup, type Key } from "@heroui/react"
import { OWNERS, PACKAGES, type Exhibitor, type Pkg } from "~bench/data/expo"
import type { Draft } from "./model"

export type Patch = Partial<Draft>

const CONTACT: [keyof Exhibitor["contact"], string, string?][] = [
  ["name", "对接人"],
  ["title", "职位"],
  ["phone", "电话", "tel"],
  ["email", "邮箱", "email"],
  ["wechat", "微信"],
]

export function DraftFields({ e, onChange }: { e: Exhibitor; onChange: (p: Patch) => void }) {
  return (
    <div className="flex flex-col gap-4 px-2">
      <TextField autoFocus value={e.company} onChange={(company) => onChange({ company })} className="w-full pr-10" data-draft-company>
        <Label>公司</Label>
        <Input className="w-full" />
      </TextField>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <span id="draft-pkg" className="text-sm font-medium">
            套餐
          </span>
          <ToggleButtonGroup
            aria-labelledby="draft-pkg"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[e.pkg]}
            onSelectionChange={(keys) => {
              const k = [...keys][0]
              if (k) onChange({ pkg: k as Pkg })
            }}
          >
            {PACKAGES.map((p) => (
              <ToggleButton key={p} id={p}>
                {p}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <Select value={e.owner} onChange={(k: Key | Key[] | null) => k && onChange({ owner: String(k) })} className="min-w-28 flex-1">
          <Label>负责人</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {OWNERS.map((o) => (
                <ListBox.Item key={o} id={o} textValue={o}>
                  {o}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {CONTACT.map(([k, label, type]) => (
          <TextField key={k} type={type ?? "text"} value={e.contact[k]} onChange={(v) => onChange({ [k]: v })} className="w-full">
            <Label>{label}</Label>
            <Input className="w-full" />
          </TextField>
        ))}
      </div>
    </div>
  )
}
