import { Button, Drawer, ScrollShadow, SearchField } from "@heroui/react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react"
import { I18nProvider } from "react-aria-components"
import { isOverdue, type Exhibitor, type Pkg } from "~bench/data/expo"
import { DetailBody, DetailHeader, DetailNav } from "./w/Detail"
import { AddButton, DraftRow, ExhibitorTable, MobileList, MobileOverdue, OverdueTable, Pager, type Enter } from "./w/Lists"
import { PAGE_SIZE, byNextDue, makeExhibitor, overdueRows, progressOf, type OverdueRow, type Scope } from "./w/model"
import { spring } from "./w/parts"
import { ScopeSidebar, ScopeTabs, scopeTitle } from "./w/ScopeNav"
import { useExpo, useMedia } from "./w/useExpo"
import "./w/w.css"

const inScope = (e: Exhibitor, s: Scope) => s === "all" || s === "overdue" || e.pkg === s

// 回调身份不变、总调用最新的那一版，子组件不必跟着重画
function useStable<A extends unknown[], R>(fn: (...a: A) => R) {
  const ref = useRef(fn)
  ref.current = fn
  return useCallback((...a: A) => ref.current(...a), [])
}

export default function Page() {
  const x = useExpo()
  const narrow = useMedia("(max-width: 767px)")
  const [scope, setScope] = useState<Scope>("all")
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [pageDir, setPageDir] = useState<1 | -1 | 0>(0)
  const [openId, setOpenId] = useState<string | null>(null)
  const [nav, setNav] = useState<string[]>([])
  const [panelDir, setPanelDir] = useState<1 | -1 | 0>(0)
  const [adding, setAdding] = useState(false)
  const [flashId, setFlashId] = useState<string | null>(null)
  const [keep, setKeep] = useState<ReadonlySet<string>>(new Set())

  // 范围、页码、选中高亮先变，名单和详情内容随后跟上
  const live = useMemo(() => ({ scope, query: query.trim(), page, pageDir }), [scope, query, page, pageDir])
  const view = useDeferredValue(live)
  const shownId = useDeferredValue(openId)
  const q = view.query.toLowerCase()
  const exhibitors = useMemo(
    () => x.list.filter((e) => inScope(e, view.scope) && (!q || e.company.toLowerCase().includes(q))).sort(byNextDue),
    [x.list, view.scope, q],
  )
  const overdue = useMemo(() => overdueRows(x.list.filter((e) => !q || e.company.toLowerCase().includes(q)), keep), [x.list, q, keep])
  const overdueCount = useMemo(() => x.list.reduce((n, e) => n + e.rights.filter((r) => isOverdue(r)).length, 0), [x.list])

  const isOverdueScope = view.scope === "overdue"
  const total = isOverdueScope ? overdue.length : exhibitors.length
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const cur = Math.min(view.page, pages)
  const pageRows = useMemo(() => exhibitors.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE), [exhibitors, cur])
  const pageOverdue = useMemo(() => overdue.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE), [overdue, cur])
  const enter: Enter = useMemo(() => ({ key: `${view.scope}|${cur}`, dir: view.pageDir }), [view.scope, cur, view.pageDir])

  const open = shownId ? x.list.find((e) => e.id === shownId) ?? null : null
  const navIdx = openId ? nav.indexOf(openId) : -1
  const byId = (id?: string) => (id ? x.list.find((e) => e.id === id) : undefined)
  const prev = byId(nav[navIdx - 1])
  const next = byId(nav[navIdx + 1])

  const viewOrder = () => (isOverdueScope ? [...new Set(overdue.map((r) => r.e.id))] : exhibitors.map((e) => e.id))

  const changeScope = useStable((s: Scope) => {
    if (s === scope) return
    setScope(s)
    setPage(1)
    setPageDir(0)
    setKeep(new Set())
    setAdding(false)
  })

  const goPage = (p: number, dir: 1 | -1) => {
    setPage(p)
    setPageDir(dir)
  }

  const openExhibitor = useStable((id: string) => {
    if (id === openId) return
    const order = viewOrder()
    setNav(order)
    if (openId) {
      const a = order.indexOf(openId)
      const b = order.indexOf(id)
      setPanelDir(a >= 0 && b >= 0 ? (b > a ? 1 : -1) : 0)
    } else setPanelDir(0)
    setOpenId(id)
    setAdding(false)
  })

  const goNeighbor = useStable((id: string, dir: 1 | -1) => {
    setPanelDir(dir)
    setOpenId(id)
    const i = isOverdueScope ? overdue.findIndex((r) => r.e.id === id) : exhibitors.findIndex((e) => e.id === id)
    if (i >= 0) {
      const p = Math.floor(i / PAGE_SIZE) + 1
      if (p !== cur) goPage(p, p > cur ? 1 : -1)
    }
  })

  const close = useCallback(() => setOpenId(null), [])

  const startAdd = () => {
    setOpenId(null)
    setAdding(true)
  }

  const add = useStable((company: string, pkg: Pkg, owner: string) => {
    const id = `n${Date.now().toString(36)}`
    const ne = makeExhibitor(id, company, pkg, owner)
    x.addExhibitor(ne)
    const target: Scope = scope === "all" || scope === pkg ? scope : "all"
    const landed = [...x.list, ne].filter((e) => inScope(e, target)).sort(byNextDue)
    const p = Math.floor(landed.findIndex((e) => e.id === id) / PAGE_SIZE) + 1
    setScope(target)
    setQuery("")
    setAdding(false)
    setPageDir(p === cur ? 0 : p > cur ? 1 : -1)
    setPage(p)
    setFlashId(id)
  })
  const cancelAdd = useCallback(() => setAdding(false), [])

  useEffect(() => {
    if (!flashId) return
    const t = window.setTimeout(() => setFlashId(null), 1800)
    return () => window.clearTimeout(t)
  }, [flashId])

  // 点名单和面板以外的地方、按 Esc 收起详情
  useEffect(() => {
    if (!openId || narrow) return
    const onDown = (ev: PointerEvent) => {
      const t = ev.target as Element | null
      if (!t?.isConnected || t.closest("[data-w-panel],[data-row],[data-w-keep],[role=dialog],.popover")) return
      close()
    }
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape" && !ev.defaultPrevented) close()
    }
    document.addEventListener("pointerdown", onDown)
    window.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      window.removeEventListener("keydown", onKey)
    }
  }, [openId, narrow])

  const advanceRow = useStable((row: OverdueRow) => {
    setKeep((k) => new Set(k).add(row.r.id))
    x.advance(row.e.id, row.r.id, row.r.status)
  })
  const revertRow = useStable((row: OverdueRow) => x.revert(row.e.id, row.r.id))

  const summary = scope === "overdue"
    ? `${overdueCount} 项，${new Set(overdue.filter((r) => isOverdue(r.r)).map((r) => r.e.id)).size} 家`
    : (() => {
        const p = progressOf(x.list.filter((e) => inScope(e, scope)))
        return `已交付 ${p.done} / ${p.total} 项`
      })()

  const empty = useMemo(
    () => (
      <div className="flex flex-col items-center gap-3 py-12 text-sm text-muted">
        <span>{view.query ? `没有找到「${view.query}」` : view.scope === "overdue" ? "没有逾期的权益" : "还没有展商"}</span>
        {view.query && view.scope !== "all" && (
          <Button size="sm" variant="secondary" onPress={() => changeScope("all")}>
            在全部展商里找
          </Button>
        )}
      </div>
    ),
    [view.query, view.scope, changeScope],
  )

  const pager = <Pager page={Math.min(page, pages)} pages={pages} total={total} unit={isOverdueScope ? "项" : "家"} onPage={goPage} />
  const pkgDefault = view.scope === "all" || view.scope === "overdue" ? undefined : view.scope
  const draft = useMemo(
    () => (adding ? <DraftRow list={x.list} defaultPkg={pkgDefault} onAdd={add} onCancel={cancelAdd} stacked={narrow} /> : null),
    [adding, x.list, pkgDefault, add, cancelAdd, narrow],
  )

  const search = (
    <SearchField aria-label="找展商" value={query} onChange={(v) => { setQuery(v); setPage(1); setPageDir(0) }} className={narrow ? "w-full" : "w-60"}>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input placeholder="找展商" />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  )

  const actions = useMemo(() => ({ advance: x.advance, revert: x.revert, setDue: x.setDue, addReminder: x.addReminder, undo: x.undo }), [x.advance, x.revert, x.setDue, x.addReminder, x.undo])

  return (
    <I18nProvider locale="zh-CN">
      <div className="flex min-h-dvh bg-background text-foreground">
        {openId && <style>{`.w-table tr:is([data-key="${openId}"],[data-key^="${openId}|"]) > .table__cell, [role=listbox] [data-key="${openId}"] { background-color: var(--color-default); }`}</style>}
        {!narrow && <ScopeSidebar scope={scope} onScope={changeScope} list={x.list} overdue={overdueCount} />}
        <main className={`flex min-w-0 flex-1 flex-col ${narrow ? "gap-3 px-4 py-4" : "gap-4 px-6 py-6"}`}>
          <header className={narrow ? "grid gap-3" : "flex min-h-10 items-center justify-between gap-4"}>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl font-semibold">{scopeTitle(scope)}</h1>
              <span className="text-sm text-muted tabular-nums">{summary}</span>
            </div>
            {search}
          </header>
          {narrow && <ScopeTabs scope={scope} onScope={changeScope} overdue={overdueCount} />}

          {narrow ? (
            <section className="grid gap-3">
              {isOverdueScope ? (
                <MobileOverdue rows={pageOverdue} enter={enter} onOpen={openExhibitor} empty={empty} />
              ) : (
                <MobileList rows={pageRows} enter={enter} flashId={flashId} onOpen={openExhibitor} empty={empty} />
              )}
              {!isOverdueScope && (adding ? draft : <div><AddButton onPress={startAdd} /></div>)}
              <div className="flex">{pager}</div>
            </section>
          ) : isOverdueScope ? (
            <OverdueTable
              rows={pageOverdue}
              enter={enter}
              undo={x.undo}
              onOpen={openExhibitor}
              onAdvance={advanceRow}
              onRevert={revertRow}
              empty={empty}
              footer={<div data-w-keep className="flex w-full items-center gap-4">{pager}</div>}
            />
          ) : (
            <ExhibitorTable
              rows={pageRows}
              enter={enter}
              flashId={flashId}
              onOpen={openExhibitor}
              draft={draft}
              empty={empty}
              footer={
                <div data-w-keep className="flex w-full items-center gap-4">
                  {!adding && <AddButton onPress={startAdd} />}
                  {pager}
                </div>
              }
            />
          )}
        </main>

        <AnimatePresence>
          {open && !narrow && (
            <motion.aside
              key="panel"
              data-w-panel
              aria-label={`${open.company}详情`}
              className="fixed inset-y-3 right-3 z-30 flex w-[440px] flex-col overflow-hidden rounded-3xl bg-surface shadow-overlay"
              initial={{ x: 64, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 64, opacity: 0, transition: { duration: 0.16 } }}
              transition={spring}
            >
              <motion.div
                key={open.id}
                className="flex min-h-0 flex-1 flex-col"
                initial={panelDir ? { opacity: 0.4, x: panelDir * 24 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={spring}
              >
                <div className="px-5 pt-5 pb-4">
                  <DetailHeader e={open} onClose={close} />
                </div>
                <ScrollShadow className="min-h-0 flex-1 px-5 pb-5">
                  <DetailBody e={open} x={actions} />
                </ScrollShadow>
              </motion.div>
              <div className="border-t border-separator px-5 py-3">
                <DetailNav prev={prev} next={next} onGo={goNeighbor} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {narrow && (
          <Drawer.Backdrop isOpen={Boolean(open)} onOpenChange={(o) => !o && close()}>
            <Drawer.Content placement="bottom">
              <Drawer.Dialog aria-label={open ? `${open.company}详情` : "详情"} className="max-h-[88dvh]">
                <Drawer.Handle />
                {open && (
                  <motion.div key={open.id} className="flex min-h-0 flex-1 flex-col" initial={panelDir ? { opacity: 0.4, x: panelDir * 24 } : false} animate={{ opacity: 1, x: 0 }} transition={spring}>
                    <Drawer.Header>
                      <DetailHeader e={open} onClose={close} />
                    </Drawer.Header>
                    <Drawer.Body>
                      <DetailBody e={open} x={actions} />
                    </Drawer.Body>
                  </motion.div>
                )}
                <Drawer.Footer className="block">
                  <DetailNav prev={prev} next={next} onGo={goNeighbor} />
                </Drawer.Footer>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        )}
      </div>
    </I18nProvider>
  )
}
