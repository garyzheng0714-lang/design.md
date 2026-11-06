// 新增展商：公司 → 套餐（选了就带出整套权益与默认截止日）→ 负责人、对接人。
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@heroui/react"
import { ME, OWNERS, PACKAGES, PACKAGE_RIGHTS, TODAY, type Pkg } from "~bench/data/expo"
import { fmtDate } from "./model"
import { EASE_OUT } from "./Detail"

export type NewInput = { company: string; pkg: Pkg; owner: string; contactName: string; phone: string }

export function NewExhibitor({
  isOpen,
  onOpenChange,
  onCreate,
  taken,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (input: NewInput) => void
  taken: (company: string) => boolean
}) {
  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container size="md" scroll="inside">
        <Modal.Dialog>{isOpen && <Form onCreate={onCreate} taken={taken} />}</Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}

function Form({ onCreate, taken }: { onCreate: (input: NewInput) => void; taken: (company: string) => boolean }) {
  const [company, setCompany] = useState("")
  const [pkg, setPkg] = useState<Pkg | null>(null)
  const [owner, setOwner] = useState(ME)
  const [contactName, setContactName] = useState("")
  const [phone, setPhone] = useState("")
  const duplicate = company.trim() !== "" && taken(company.trim())
  const ready = company.trim() !== "" && !duplicate && pkg !== null

  return (
    <>
      <Modal.CloseTrigger />
      <Modal.Header>
        <Modal.Heading>新增展商</Modal.Heading>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-5">
        <form
          id="new-exhibitor"
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            if (ready) onCreate({ company, pkg: pkg!, owner, contactName, phone })
          }}
        >
          <TextField autoFocus isRequired value={company} onChange={setCompany} isInvalid={duplicate}>
            <Label>公司</Label>
            <Input placeholder="公司名称" />
            {duplicate && <p className="text-xs text-danger">名单里已经有这家了</p>}
          </TextField>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium" id="pkg-label">
              套餐
            </span>
            <ToggleButtonGroup
              aria-labelledby="pkg-label"
              selectionMode="single"
              disallowEmptySelection
              fullWidth
              selectedKeys={pkg ? [pkg] : []}
              onSelectionChange={(keys) => {
                const k = [...keys][0]
                if (k) setPkg(k as Pkg)
              }}
            >
              {PACKAGES.map((p) => (
                <ToggleButton key={p} id={p}>
                  {p}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <AnimatePresence initial={false}>
              {pkg && (
                <motion.div
                  key="rights"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                  className="overflow-hidden"
                >
                  <motion.ul
                    key={pkg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="mt-1 rounded-2xl bg-surface-secondary px-3 py-1.5"
                    aria-label={`${pkg}套餐权益`}
                  >
                    {PACKAGE_RIGHTS[pkg].map(([name, kind, due]) => (
                      <li key={name} className="flex items-baseline gap-2 py-1 text-sm">
                        <span className="truncate">{name}</span>
                        <span className="text-xs text-muted">{kind}</span>
                        <span className={`ms-auto shrink-0 tabular-nums ${due < TODAY ? "text-danger" : "text-muted"}`}>
                          {fmtDate(due)}
                        </span>
                      </li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Select value={owner} onChange={(v) => v && setOwner(String(v))}>
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
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            <TextField value={contactName} onChange={setContactName}>
              <Label>对接人</Label>
              <Input placeholder="姓名" />
            </TextField>
            <TextField value={phone} onChange={setPhone} type="tel">
              <Label>电话</Label>
              <Input placeholder="手机号" inputMode="tel" />
            </TextField>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button slot="close" variant="secondary">
          取消
        </Button>
        <Button type="submit" form="new-exhibitor" isDisabled={!ready}>
          添加
        </Button>
      </Modal.Footer>
    </>
  )
}
