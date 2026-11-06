// FBIF 2027 展商权益交付 ·「展商」一屏。
// 电脑：左边是套餐进度（兼作筛选）+ 名单表格，点一行右侧推出这家展商；手机：列表 + 底部抽屉。
import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import {
  Button,
  Drawer,
  I18nProvider,
  Kbd,
  SearchField,
  Tabs,
  Toast,
  toast,
  useMediaQuery,
  type SortDescriptor,
} from "@heroui/react"
import { Check, Plus } from "lucide-react"
import { EXHIBITORS, PACKAGES, type Exhibitor, type Reminder, type Right } from "~bench/data/expo"
import {
  advanced,
  doneCount,
  makeExhibitor,
  nextDue,
  overdueRows,
  pkgStats,
  type PkgStat,
  type View,
} from "./v/model"
import { Detail, Progress } from "./v/Detail"
import { OverdueList, OverdueTable, RosterList, RosterTable } from "./v/Roster"
import { NewExhibitor, type NewInput } from "./v/NewExhibitor"

// 电脑上「逾期」放在最右，手机上横向滑动会把它藏起来，所以紧跟「全部」
const VIEWS_WIDE: View[] = ["全部", ...PACKAGES, "逾期"]
const VIEWS_NARROW: View[] = ["全部", "逾期", ...PACKAGES]
const PANEL_W = 480

export default function Page() {
  const isDesktop = useMediaQuery("(min-width: 900px)", { initializeWithValue: true })
  const [list, setList] = useState<Exhibitor[]>(() => structuredClone(EXHIBITORS))
  const [view, setView] = useState<View>("全部")
  const [query, setQuery] = useState("")
  const [openId, setOpenId] = useState<string | null>(null)
  const [dir, setDir] = useState(0)
  const [focusRight, setFocusRight] = useState<string | null>(null)
  const [sort, setSort] = useState<SortDescriptor>({ column: "due", direction: "ascending" })
  const [adding, setAdding] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const VIEWS = isDesktop ? VIEWS_WIDE : VIEWS_NARROW

  const q = query.trim().toLowerCase()
  const match = (e: Exhibitor) => !q || e.company.toLowerCase().includes(q)
  const stats = useMemo(() => pkgStats(list), [list])
  const overdue = useMemo(() => overdueRows(list), [list])
  const overdueShown = overdue.filter((r) => match(r.ex))

  const rows = useMemo(() => {
    const base = list.filter((e) => (view === "全部" || view === "逾期" || e.pkg === view) && match(e))
    if (!sort?.column) return base
    const key = (e: Exhibitor): number | string =>
      sort.column === "progress"
        ? doneCount(e) / Math.max(1, e.rights.length)
        : sort.column === "due"
          ? (nextDue(e)?.due ?? "9999")
          : (e.reminders[0]?.date ?? "0000")
    return [...base].sort((a, b) => {
      const ka = key(a)
      const kb = key(b)
      const c = ka < kb ? -1 : ka > kb ? 1 : 0
      return sort.direction === "descending" ? -c : c
    })
    // match 只依赖 q
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, view, q, sort])

  // 上一家 / 下一家：按眼前这张表的顺序走；这家不在表里时按全部名单
  const order = view === "逾期" ? [...new Set(overdueShown.map((r) => r.ex.id))] : rows.map((e) => e.id)
  const seq = openId && order.includes(openId) ? order : list.filter(match).map((e) => e.id)
  const idx = openId ? seq.indexOf(openId) : -1
  const current = list.find((e) => e.id === openId) ?? null
  const lastShown = useRef<Exhibitor | null>(null)
  if (current) lastShown.current = current
  const shown = current ?? lastShown.current

  const open = (id: string, rightId: string | null = null) => {
    setDir(0)
    setFocusRight(rightId)
    setOpenId(id)
  }
  const go = (step: 1 | -1) => {
    const id = seq[idx + step]
    if (!id) return
    setDir(step)
    setFocusRight(null)
    setOpenId(id)
  }
  const close = () => setOpenId(null)

  useEffect(() => {
    if (openId) document.querySelector(`[data-row="${openId}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }, [openId])

  const goRef = useRef(go)
  goRef.current = go
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      const typing = !!target?.closest("input, textarea, [contenteditable=true]")
      if (e.key === "/" && !typing) {
        e.preventDefault()
        searchRef.current?.focus()
        return
      }
      if (!openId || typing || document.querySelector("[role=dialog]")) return
      if (e.key === "j" || e.key === "k") {
        // 焦点留在点过的那一行会和当前行对不上
        if (target?.closest("table")) target.blur()
        goRef.current(e.key === "j" ? 1 : -1)
      }
      else if (e.key === "Escape") setOpenId(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [openId])

  const patchRight = (exId: string, rightId: string, fn: (r: Right) => Right) =>
    setList((prev) =>
      prev.map((e) => (e.id !== exId ? e : { ...e, rights: e.rights.map((r) => (r.id === rightId ? fn(r) : r)) })),
    )

  const advance = (exId: string, rightId: string) => {
    const ex = list.find((e) => e.id === exId)
    const before = ex?.rights.find((r) => r.id === rightId)
    if (!ex || !before || before.status === "已交付") return
    const after = advanced(ex.company, before)
    patchRight(exId, rightId, () => after)
    const id = toast(`${before.name} → ${after.status}`, {
      description: ex.company,
      actionProps: {
        children: "撤销",
        variant: "tertiary",
        onPress: () => {
          patchRight(exId, rightId, (r) => ({ ...r, status: before.status, material: before.material }))
          toast.close(id)
        },
      },
    })
  }

  const setDue = (exId: string, rightId: string, iso: string) => patchRight(exId, rightId, (r) => ({ ...r, due: iso }))

  const remind = (exId: string, rem: Reminder) =>
    setList((prev) =>
      prev.map((e) =>
        e.id !== exId ? e : { ...e, reminders: [rem, ...e.reminders].sort((a, b) => b.date.localeCompare(a.date)) },
      ),
    )

  const create = (input: NewInput) => {
    const ex = makeExhibitor(list, input)
    setList((prev) => [...prev, ex])
    setAdding(false)
    if (view !== "全部" && view !== ex.pkg) setView("全部")
    if (!match(ex)) setQuery("")
    open(ex.id)
    toast.success(`已添加${ex.company}`, { description: `${ex.pkg} · ${ex.rights.length} 项权益` })
  }

  const detail = shown && (
    <Detail
      ex={shown}
      dir={dir}
      hasPrev={idx > 0}
      hasNext={idx > -1 && idx < seq.length - 1}
      onPrev={() => go(-1)}
      onNext={() => go(1)}
      onClose={close}
      onAdvance={(rightId) => advance(shown.id, rightId)}
      onDue={(rightId, iso) => setDue(shown.id, rightId, iso)}
      onRemind={(r) => remind(shown.id, r)}
      focusRight={focusRight}
      touch={!isDesktop}
    />
  )

  const clearQuery = () => setQuery("")
  const panelContent =
    view === "逾期" ? (
      isDesktop ? (
        <OverdueTable
          rows={overdueShown}
          activeId={openId}
          onOpen={open}
          onAdvance={advance}
          query={query}
          onClearQuery={clearQuery}
        />
      ) : (
        <OverdueList rows={overdueShown} onOpen={open} query={query} onClearQuery={clearQuery} />
      )
    ) : isDesktop ? (
      <RosterTable
        rows={rows}
        activeId={openId}
        onOpen={(id) => open(id)}
        sort={sort}
        onSort={setSort}
        query={query}
        onClearQuery={clearQuery}
      />
    ) : (
      <RosterList rows={rows} onOpen={(id) => open(id)} query={query} onClearQuery={clearQuery} />
    )

  const search = (
    <SearchField aria-label="搜索公司" value={query} onChange={setQuery} className={isDesktop ? "w-64" : "w-full"}>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input ref={searchRef} placeholder="搜索公司" />
        {query ? (
          <SearchField.ClearButton />
        ) : (
          isDesktop && (
            <Kbd className="me-2 shrink-0">
              <Kbd.Content>/</Kbd.Content>
            </Kbd>
          )
        )}
      </SearchField.Group>
    </SearchField>
  )

  const tiles = (
    <Tabs.ListContainer>
      <Tabs.List aria-label="按套餐看" className={isDesktop ? "w-full gap-1" : "gap-1"}>
        {VIEWS.map((v) => (
          <Tabs.Tab
            key={v}
            id={v}
            data-view={v}
            className={`h-auto flex-col items-stretch justify-start gap-2 rounded-2xl px-4 py-3 text-start hover:opacity-100 data-[hovered=true]:opacity-100 ${
              isDesktop ? "flex-1" : "w-32 flex-none"
            }`}
          >
            {v === "逾期" ? <OverdueTile count={overdue.length} /> : <PkgTile label={v} stat={stats[v]} />}
            <Tabs.Indicator className="rounded-2xl" />
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.ListContainer>
  )

  const newModal = (
    <NewExhibitor
      isOpen={adding}
      onOpenChange={setAdding}
      onCreate={create}
      taken={(c) => list.some((e) => e.company === c)}
    />
  )

  if (isDesktop)
    return (
      <I18nProvider locale="zh-CN">
        <MotionConfig reducedMotion="user">
          <div className="flex h-dvh overflow-hidden bg-background text-foreground">
            <main className="flex min-w-0 flex-1 flex-col">
              <header className="flex items-center gap-3 px-6 pt-5 pb-4">
                <h1 className="text-xl font-semibold">展商</h1>
                <div className="ms-auto flex items-center gap-2">
                  {search}
                  <Button onPress={() => setAdding(true)}>
                    <Plus className="size-4" />
                    新增展商
                  </Button>
                </div>
              </header>
              <Tabs
                selectedKey={view}
                onSelectionChange={(k) => setView(k as View)}
                className="min-h-0 flex-1 gap-4"
              >
                <div className="px-6">{tiles}</div>
                {VIEWS.map((v) => (
                  <Tabs.Panel key={v} id={v} className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 outline-none">
                    {panelContent}
                  </Tabs.Panel>
                ))}
              </Tabs>
            </main>
            <AnimatePresence initial={false}>
              {current && (
                <motion.aside
                  key="detail"
                  aria-label={`${current.company}详情`}
                  initial={{ width: 0 }}
                  animate={{ width: PANEL_W }}
                  exit={{ width: 0, transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] } }}
                  transition={{ type: "spring", duration: 0.45, bounce: 0 }}
                  className="shrink-0 overflow-hidden"
                >
                  <div style={{ width: PANEL_W }} className="h-full py-3 pe-3">
                    <div className="h-full overflow-hidden rounded-3xl bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-8px_rgb(0_0_0/0.08)]">
                      {detail}
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
          {newModal}
          <Toast.Provider placement="bottom" />
        </MotionConfig>
      </I18nProvider>
    )

  return (
    <I18nProvider locale="zh-CN">
      <MotionConfig reducedMotion="user">
        <div className="min-h-dvh bg-background pb-10 text-foreground">
          <header className="flex items-center gap-2 px-4 pt-4 pb-3">
            <h1 className="text-xl font-semibold">展商</h1>
            <Button isIconOnly aria-label="新增展商" className="ms-auto" onPress={() => setAdding(true)}>
              <Plus className="size-5" />
            </Button>
          </header>
          <div className="px-4 pb-3">{search}</div>
          <Tabs selectedKey={view} onSelectionChange={(k) => setView(k as View)} className="gap-3">
            <div className="px-4">{tiles}</div>
            {VIEWS.map((v) => (
              <Tabs.Panel key={v} id={v} className="px-4 outline-none">
                {panelContent}
              </Tabs.Panel>
            ))}
          </Tabs>
        </div>
        <Drawer>
          <Drawer.Backdrop isOpen={!!current} onOpenChange={(o) => !o && close()}>
            <Drawer.Content placement="bottom">
              <Drawer.Dialog aria-label={shown?.company ?? "展商"} className="h-[92dvh] p-0">
                <Drawer.Handle />
                {detail}
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
        {newModal}
        <Toast.Provider placement="top" />
      </MotionConfig>
    </I18nProvider>
  )
}

function PkgTile({ label, stat }: { label: string; stat: PkgStat }) {
  return (
    <>
      <span className="flex w-full items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs font-normal text-muted tabular-nums">
          {stat.done}/{stat.total}
        </span>
      </span>
      <Progress done={stat.done} total={stat.total} className="w-full" />
    </>
  )
}

function OverdueTile({ count }: { count: number }) {
  return (
    <>
      <span className="flex w-full items-baseline justify-between gap-2">
        <span className={`text-sm font-medium ${count ? "text-danger" : "text-foreground"}`}>逾期</span>
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className={`text-xs font-normal tabular-nums ${count ? "text-danger" : "text-muted"}`}
        >
          {count ? `${count} 项` : <Check className="size-3.5 text-success" />}
        </motion.span>
      </span>
      <span className="flex h-1 w-full gap-1" aria-hidden>
        {Array.from({ length: Math.max(count, 1) }, (_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-xs ${count ? "bg-danger" : "bg-default"}`} />
        ))}
      </span>
    </>
  )
}
