import { Button, Drawer, EmptyState, ScrollShadow, SearchField, Surface, Table } from "@heroui/react"
import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react"
import { Plus } from "lucide-react"
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import { EXHIBITORS, PACKAGES, type Contact, type Exhibitor, type Pkg, type Reminder, type Right, type RightStatus } from "~bench/data/expo"
import { Composer, DetailBody, DetailHead, type DetailActions } from "./y/Detail"
import { lateCount, lateRows, newExhibitor, nextStatus, pkgProgress, sortExhibitors, withStatus, type LateRow, type Scope } from "./y/model"
import { EASE, Pager, ScopeTabs, type ScopeItem } from "./y/parts"
import { AddRow, ExhibitorTable, LateTable, exColumns, type RowActions, type Sizes } from "./y/Tables"

/** 表格里各部分的高度先按宽屏估，渲染后按实际量到的改，用来算一页放得下几行（不用表内再滚） */
const DIMS = { row: 57, head: 41, foot: 53, add: 49, bar: 0 }

function useWide() {
  const q = "(min-width: 768px)"
  const sub = useCallback((cb: () => void) => {
    const m = matchMedia(q)
    m.addEventListener("change", cb)
    return () => m.removeEventListener("change", cb)
  }, [])
  return useSyncExternalStore(sub, () => matchMedia(q).matches)
}

const matches = (e: Exhibitor, q: string) => !q || e.company.includes(q) || e.contact.name.includes(q) || e.owner.includes(q)
const inScope = (e: Exhibitor, s: Scope) => s === "all" || s === "late" || e.pkg === s
const byDateDesc = (a: Reminder, b: Reminder) => b.date.localeCompare(a.date)

/** 换展商上下走，方向按先后定 */
const slideY: Variants = {
  enter: (d: number) => ({ opacity: 0, y: d * 12 }),
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } },
  leave: (d: number) => ({ opacity: 0, y: d * -12, transition: { duration: 0.1 } }),
}

export default function Page() {
  const wide = useWide()
  const [list, setList] = useState<Exhibitor[]>(() => structuredClone(EXHIBITORS))
  const [scope, setScope] = useState<Scope>("all")
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [pageDir, setPageDir] = useState(1)
  const [openId, setOpenId] = useState<string | null>(null)
  const [openDir, setOpenDir] = useState(1)
  const [instant, setInstant] = useState(false)
  const [flash, setFlash] = useState<{ id: string; n: number } | null>(null)
  const [undo, setUndo] = useState<{ exId: string; prev: Right } | null>(null)
  const [adding, setAdding] = useState(false)
  const [seed, setSeed] = useState({ text: "", n: 0 })
  const [landed, setLanded] = useState<{ id: string; quiet: boolean } | null>(null)
  // 催办草稿按展商存：换一家、关掉详情再回来，打了一半的字还在
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  // 拖过的列宽，宽窄屏各记一份
  const [sizes, setSizes] = useState<{ wide?: Sizes; narrow?: Sizes }>({})
  // 排序只在换范围、搜索、新增时重算；原地推进不让行跳走
  const [order, setOrder] = useState(() => sortExhibitors(list).map((e) => e.id))
  const [lateSnap, setLateSnap] = useState<LateRow[]>(() => lateRows(list))
  // 这一下是键盘按的还是指针点的：键盘触发的切换不放动画
  const kbd = useRef(false)

  // 表格区多高，一页就放几行
  const areaRef = useRef<HTMLDivElement>(null)
  const [areaH, setAreaH] = useState(0)
  const [dims, setDims] = useState(DIMS)
  useLayoutEffect(() => {
    const el = areaRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setAreaH(el.clientHeight))
    ro.observe(el)
    setAreaH(el.clientHeight)
    return () => ro.disconnect()
  }, [])
  // 窄屏的行、横滑条都和宽屏不一样高，每次渲染后量一次，变了才更新
  useLayoutEffect(() => {
    const el = areaRef.current
    if (!el) return
    const h = (n: Element | null | undefined) => (n ? Math.ceil(n.getBoundingClientRect().height) : 0)
    const box = el.querySelector<HTMLElement>(".table__resizable-container")
    const rows = [...el.querySelectorAll("tbody tr")]
    const addTr = rows.find((r) => r.getAttribute("data-key") === "add")
    const next = {
      row: h(rows.find((r) => r !== addTr && r.getAttribute("data-key"))) || dims.row,
      head: h(el.querySelector("thead")) || dims.head,
      foot: h(el.querySelector("[data-slot=table-footer]")) || dims.foot,
      add: addTr && !adding ? h(addTr) : dims.add,
      bar: box ? box.offsetHeight - box.clientHeight : dims.bar,
    }
    if (Object.keys(next).some((k) => next[k as keyof typeof next] !== dims[k as keyof typeof dims])) setDims(next)
  })
  const per = Math.max(4, Math.floor((areaH - dims.head - dims.foot - dims.bar - (scope === "late" ? 0 : dims.add) - 4) / dims.row)) || 10

  const byId = useMemo(() => new Map(list.map((e) => [e.id, e])), [list])
  const q = query.trim()

  const resort = (next: Exhibitor[]) => {
    setOrder(sortExhibitors(next).map((e) => e.id))
    setLateSnap(lateRows(next))
  }

  const exRows = order.map((id) => byId.get(id)!).filter((e) => inScope(e, scope) && matches(e, q))
  const late = lateSnap.filter(({ exId, rightId }) => {
    const e = byId.get(exId)!
    return matches(e, q) || e.rights.some((r) => r.id === rightId && r.name.includes(q))
  })
  const total = scope === "late" ? late.length : exRows.length
  const pages = Math.max(1, Math.ceil(total / per))
  const cur = Math.min(page, pages)
  const slice = <T,>(xs: T[]) => xs.slice((cur - 1) * per, cur * per)
  const shownIds = scope === "late" ? [...new Set(slice(late).map((r) => r.exId))] : slice(exRows).map((e) => e.id)

  // 换范围、翻页：表框和表头不动，只让新行从淡处滑到位，中间没有一帧是空的；翻完回到表顶
  const seen = useRef({ scope, cur })
  useLayoutEffect(() => {
    const was = seen.current
    seen.current = { scope, cur }
    if (was.scope === scope && was.cur === cur) return
    const box = areaRef.current?.querySelector<HTMLElement>(".table__resizable-container")
    if (box) box.scrollTop = 0
    const body = box?.querySelector("tbody")
    body?.getAnimations().forEach((a) => a.cancel())
    if (!body || kbd.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const from = was.scope !== scope ? "translateY(8px)" : `translateX(${12 * pageDir}px)`
    body.animate([{ opacity: 0.3, transform: from }, { opacity: 1, transform: "none" }], { duration: 180, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" })
  }, [scope, cur]) // eslint-disable-line react-hooks/exhaustive-deps

  const tabs: ScopeItem[] = [
    { id: "all", label: "全部", ...pkgProgress(list) },
    { id: "late", label: "逾期", late: lateCount(list) },
    ...PACKAGES.map((p) => ({ id: p, label: p, ...pkgProgress(list, p) })),
  ]

  // 点下去旧行先淡下去，新行画好后从淡处滑到位（见下面换范围、翻页的动效）
  const dimRows = () => {
    const body = areaRef.current?.querySelector("tbody")
    if (!body || kbd.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    body.getAnimations().forEach((a) => a.cancel())
    body.animate([{ opacity: 1 }, { opacity: 0.3 }], { duration: 100, easing: "ease-out", fill: "forwards" })
  }
  const changeScope = (s: Scope) => {
    if (s !== scope) dimRows()
    setScope(s)
    setPage(1)
    setAdding(false)
    setUndo(null)
    resort(list)
  }
  const changeQuery = (v: string) => {
    setQuery(v)
    setPage(1)
    resort(list)
  }
  const goPage = (p: number) => {
    if (p !== cur) dimRows()
    setPageDir(p >= cur ? 1 : -1)
    setPage(p)
  }

  const setRight = (exId: string, rightId: string, fn: (r: Right, e: Exhibitor) => Right) =>
    setList((l) => l.map((e) => (e.id === exId ? { ...e, rights: e.rights.map((r) => (r.id === rightId ? fn(r, e) : r)) } : e)))
  const patch = (exId: string, p: Partial<Exhibitor>) => setList((l) => l.map((e) => (e.id === exId ? { ...e, ...p } : e)))

  const remember = (exId: string, rightId: string) => {
    const prev = byId.get(exId)?.rights.find((r) => r.id === rightId)
    if (prev) setUndo({ exId, prev })
  }
  const advance = (exId: string, rightId: string) => {
    remember(exId, rightId)
    setRight(exId, rightId, (r, e) => withStatus(e.company, r, nextStatus(r.status)))
  }
  const status = (exId: string, rightId: string, s: RightStatus) => {
    remember(exId, rightId)
    setRight(exId, rightId, (r, e) => withStatus(e.company, r, s))
  }
  const due = (exId: string, rightId: string, iso: string) => {
    remember(exId, rightId)
    setRight(exId, rightId, (r) => ({ ...r, due: iso }))
  }
  // 撤销放回推进前的那份原样（连物料文件名）
  const undoIt = () => {
    if (!undo) return
    setRight(undo.exId, undo.prev.id, () => undo.prev)
    setUndo(null)
  }
  const log = (exId: string, r: Reminder) =>
    setList((l) => l.map((e) => (e.id === exId ? { ...e, reminders: [r, ...e.reminders].sort(byDateDesc) } : e)))

  const open = (exId: string, rightId?: string) => {
    if (exId !== openId) {
      const a = shownIds.indexOf(openId ?? ""), b = shownIds.indexOf(exId)
      setOpenDir(a < 0 || b >= a ? 1 : -1)
    }
    setInstant(kbd.current)
    setOpenId(exId)
    setFlash(rightId ? { id: rightId, n: Date.now() } : null)
  }
  const close = () => {
    setOpenId(null)
    setFlash(null)
  }

  const create = (d: { company: string; pkg: Pkg; owner: string }, viaKey: boolean) => {
    const ex = newExhibitor(`n${Date.now()}`, d.company, d.pkg, d.owner)
    const next = [...list, ex]
    const s = scope === "all" || scope === d.pkg ? scope : "all"
    const nq = matches(ex, q) ? query : ""
    const ord = sortExhibitors(next)
    const at = ord.filter((e) => inScope(e, s) && matches(e, nq.trim())).findIndex((e) => e.id === ex.id)
    const to = Math.floor(at / per) + 1
    setList(next)
    setScope(s)
    setQuery(nq)
    setOrder(ord.map((e) => e.id))
    setLateSnap(lateRows(next))
    setPageDir(to >= cur ? 1 : -1)
    setPage(to)
    setLanded({ id: ex.id, quiet: viaKey })
  }
  useEffect(() => {
    if (!landed) return
    const t = setTimeout(() => setLanded(null), 1200)
    return () => clearTimeout(t)
  }, [landed])

  // Esc 或点页面空白处收起详情
  useEffect(() => {
    if (!openId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented && !document.querySelector("[data-slot=popover], [role=menu], [role=listbox]")) close()
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement
      if (t.closest("[data-panel], [role=row], button, input, textarea, a, [role=tab], [role=button], [role=dialog], [role=menu], [role=listbox], [data-slot=popover], [data-slot=tooltip]")) return
      close()
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("pointerdown", onDown)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("pointerdown", onDown)
    }
  }, [openId])

  const ex = openId ? byId.get(openId) ?? null : null
  const drafting = !!(openId && drafts[openId]?.trim())
  const draftOf = (e: Exhibitor) => ({ text: drafts[e.id] ?? "", onText: (t: string) => setDrafts((d) => ({ ...d, [e.id]: t })) })
  const sizeKey = wide ? "wide" : "narrow"
  const sizeProps = { sizes: sizes[sizeKey], onSizes: (m: Sizes) => setSizes((s) => ({ ...s, [sizeKey]: m })) }
  const lastEx = useRef<Exhibitor | null>(null)
  if (ex) lastEx.current = ex
  const shownEx = ex ?? lastEx.current

  const rowAct: RowActions = {
    open: openId,
    undoEx: undo?.exId ?? null,
    undoRight: undo?.prev.id ?? null,
    landed,
    adding,
    onOpen: open,
    onAdvance: advance,
    onDue: due,
    onUndo: undoIt,
  }
  const detailAct = (e: Exhibitor): DetailActions => ({
    undoRight: undo && undo.exId === e.id ? undo.prev.id : null,
    onUndo: undoIt,
    onContact: (c: Contact) => patch(e.id, { contact: c }),
    onBooth: (b: string) => patch(e.id, { booth: b }),
    onAdvance: (rid) => advance(e.id, rid),
    onStatus: (rid, s) => status(e.id, rid, s),
    onDue: (rid, iso) => due(e.id, rid, iso),
    onLog: (r) => log(e.id, r),
    onClose: close,
  })

  const scopeName = tabs.find((t) => t.id === scope)?.label
  const empty = (
    <EmptyState className="flex flex-col items-center gap-3 py-12">
      <p className="text-muted">{q ? `${scopeName}里没有「${q}」` : scope === "late" ? "没有逾期的权益" : "还没有展商"}</p>
      {q && scope !== "all" ? (
        <Button size="sm" variant="secondary" onPress={() => changeScope("all")}>
          在全部里找
        </Button>
      ) : q && scope === "all" ? (
        <Button
          size="sm"
          variant="secondary"
          className="group"
          onPress={() => {
            setSeed((s) => ({ text: q, n: s.n + 1 }))
            setQuery("")
            setPage(Math.ceil(order.length / per))
            setAdding(true)
          }}
        >
          <Plus size={16} strokeWidth={1.5} className="group-hover:stroke-2" />
          新增「{q}」
        </Button>
      ) : null}
    </EmptyState>
  )

  const addRow =
    scope === "late" ? null : (
      <AddRow
        key={`${scope}-${seed.n}`}
        cols={exColumns(scope, !wide)}
        narrow={!wide}
        scope={scope}
        adding={adding}
        seed={seed.text}
        names={new Set(list.map((e) => e.company))}
        onStart={() => setAdding(true)}
        onCancel={() => setAdding(false)}
        onCreate={create}
      />
    )

  const t0 = instant ? { duration: 0 } : undefined

  return (
    <MotionConfig reducedMotion="user">
      <main
        className="flex h-dvh flex-col gap-4 bg-background p-6 text-sm text-foreground max-md:p-4"
        onKeyDownCapture={() => {
          kbd.current = true
        }}
        onPointerDownCapture={() => {
          kbd.current = false
        }}
      >
        <h1 className="text-xl font-medium">展商</h1>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <ScrollShadow orientation="horizontal" hideScrollBar className="max-w-full">
            <ScopeTabs scope={scope} onChange={changeScope} items={tabs} />
          </ScrollShadow>
          <SearchField aria-label="搜展商" value={query} onChange={changeQuery} className="w-64 max-md:w-full">
            <SearchField.Group className="h-10 rounded-full">
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="公司、对接人或负责人" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </div>

        <div ref={areaRef} className="relative min-h-0 flex-1">
          <Table className="max-h-full grid-rows-[minmax(0,1fr)_auto]">
            {scope === "late" ? (
              <LateTable rows={slice(late)} byId={byId} act={rowAct} narrow={!wide} empty={empty} {...sizeProps} />
            ) : (
              <ExhibitorTable rows={slice(exRows)} scope={scope} act={rowAct} narrow={!wide} addRow={addRow} empty={empty} {...sizeProps} />
            )}
            {pages > 1 ? (
              <Table.Footer>
                <Pager pages={pages} cur={cur} onGo={goPage} />
              </Table.Footer>
            ) : null}
          </Table>

          <AnimatePresence>
            {wide && ex ? (
              <motion.aside
                key="panel"
                data-panel
                aria-label={`${ex.company}详情`}
                className="absolute inset-y-0 right-0 z-20 flex w-[min(440px,32vw)] max-w-full"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0, transition: t0 ?? { duration: 0.24, ease: EASE } }}
                exit={{ opacity: 0, x: 24, transition: { duration: 0.15 } }}
              >
                <Surface className="flex w-full flex-col overflow-hidden rounded-3xl [box-shadow:var(--overlay-shadow)]">
                  <AnimatePresence mode="wait" initial={false} custom={openDir}>
                    <motion.div
                      key={ex.id}
                      custom={openDir}
                      variants={slideY}
                      initial={instant ? false : "enter"}
                      animate="show"
                      exit={instant ? undefined : "leave"}
                      transition={t0}
                      className="flex min-h-0 flex-1 flex-col"
                    >
                      <div className="px-6 pb-4 pt-5">
                        <DetailHead ex={ex} act={detailAct(ex)} />
                      </div>
                      <ScrollShadow className="min-h-0 flex-1 px-6 pb-4">
                        <DetailBody ex={ex} act={detailAct(ex)} flash={flash} drafting={drafting} />
                      </ScrollShadow>
                      <div className="border-t border-separator px-6 py-4">
                        <Composer ex={ex} onLog={(r) => log(ex.id, r)} {...draftOf(ex)} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </Surface>
              </motion.aside>
            ) : null}
          </AnimatePresence>
        </div>
      </main>

      {!wide && shownEx ? (
        <Drawer.Backdrop isOpen={!!ex} onOpenChange={(o) => !o && close()}>
          <Drawer.Content placement="bottom">
            <Drawer.Dialog key={shownEx.id} aria-label={`${shownEx.company}详情`} className="max-h-[88dvh]">
              <Drawer.Handle />
              <Drawer.Header>
                <DetailHead ex={shownEx} act={detailAct(shownEx)} />
              </Drawer.Header>
              <Drawer.Body className="text-foreground">
                <DetailBody ex={shownEx} act={detailAct(shownEx)} flash={flash} drafting={drafting} />
              </Drawer.Body>
              <Drawer.Footer className="mt-0 border-t border-separator pt-4">
                <Composer ex={shownEx} onLog={(r) => log(shownEx.id, r)} {...draftOf(shownEx)} />
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      ) : null}
    </MotionConfig>
  )
}
