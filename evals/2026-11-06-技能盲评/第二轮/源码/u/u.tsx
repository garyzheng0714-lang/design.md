// 展商权益交付：左栏是视图（每个套餐一条进度、逾期单列），中间是展商名单，点一家在右侧浮板里推进、改截止日、记催办。
import { Button, SearchField } from "@heroui/react"
import { Plus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react"
import type { Exhibitor, Pkg, Reminder } from "~bench/data/expo"
import { DraftFields, type Patch } from "./u/create"
import { Detail, DetailHead } from "./u/detail"
import { applyPatch, blankDraft, cloneExhibitors, createExhibitor, inScope, nextStatus, scopeTitle, type Scope } from "./u/model"
import { Neighbors, Panel, Sheet } from "./u/panel"
import { OpenRowStyle, RosterList, RosterTable } from "./u/roster"
import { ScopeNav, ScopeSelect } from "./u/scopes"

const NARROW = "(max-width: 767px)"
function useNarrow() {
  return useSyncExternalStore(
    (cb) => {
      const m = matchMedia(NARROW)
      m.addEventListener("change", cb)
      return () => m.removeEventListener("change", cb)
    },
    () => matchMedia(NARROW).matches,
  )
}

/** 这次操作是不是键盘发起的：键盘连按不播滑换 */
function useLastInput() {
  const viaKey = useRef(false)
  useEffect(() => {
    const key = () => (viaKey.current = true)
    const pointer = () => (viaKey.current = false)
    addEventListener("keydown", key, true)
    addEventListener("pointerdown", pointer, true)
    return () => {
      removeEventListener("keydown", key, true)
      removeEventListener("pointerdown", pointer, true)
    }
  }, [])
  return viaKey
}

const FADE = { type: "spring", duration: 0.45, bounce: 0 } as const

export default function Page() {
  const narrow = useNarrow()
  const viaKey = useLastInput()
  const [list, setList] = useState(cloneExhibitors)
  const [scope, setScope] = useState<Scope>("全部")
  const [query, setQuery] = useState("")
  const [openId, setOpenId] = useState<string | null>(null)
  // 刚插进名单、正在填的那一家；没起名就离开，这一行收回
  const [draftId, setDraftId] = useState<string | null>(null)
  const [dir, setDir] = useState(0)
  const [freshId, setFreshId] = useState<string | null>(null)
  const seq = useRef(1)
  // 首屏不播切换动画；不用 AnimatePresence 的 initial={false}，它会一直压住名单里后来插入的行的入场
  const painted = useRef(false)
  const firstPaint = !painted.current
  useEffect(() => {
    painted.current = true
  }, [])

  const open = list.find((e) => e.id === openId) ?? null
  const q = query.trim().toLowerCase()
  // 打开着的那家改完不再属于当前视图时，先留在名单里，换到别家再走
  const keep = open && !inScope(open, scope) ? open.id : null
  const rows = useMemo(
    () => list.filter((e) => (inScope(e, scope) || e.id === keep) && (e.id === draftId || e.company.toLowerCase().includes(q))),
    [list, scope, keep, draftId, q],
  )
  // 名单和左栏是大块：让它们在后台跟上，浮板里的反馈先出来、动画不被卡住
  const tableRows = useDeferredValue(rows)
  const navList = useDeferredValue(list)
  const tableFresh = useDeferredValue(freshId)
  const at = open ? rows.findIndex((e) => e.id === open.id) : -1
  const prev = at > 0 ? rows[at - 1] : null
  const next = at > -1 ? (rows[at + 1] ?? null) : (rows[0] ?? null)

  useEffect(() => {
    if (!freshId) return
    const t = setTimeout(() => setFreshId(null), 1200)
    return () => clearTimeout(t)
  }, [freshId])

  const leaveDraft = () => {
    if (!draftId) return
    setList((l) => l.filter((e) => e.id !== draftId || e.company.trim()))
    setDraftId(null)
  }

  const close = () => {
    leaveDraft()
    setOpenId(null)
  }

  useEffect(() => {
    if (narrow || !openId) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) close()
    }
    addEventListener("keydown", onKey)
    return () => removeEventListener("keydown", onKey)
  })

  const go = (id: string, d?: number) => {
    if (id === openId) return
    const from = openId ? rows.findIndex((e) => e.id === openId) : -1
    const to = rows.findIndex((e) => e.id === id)
    setDir(!openId || viaKey.current ? 0 : (d ?? (to >= from ? 1 : -1)))
    leaveDraft()
    setOpenId(id)
  }

  const changeScope = (s: Scope) => {
    setScope(s)
    if (open && !inScope(open, s)) close()
  }

  // 新增：名单顶上先插一行（套餐照当前视图预填），详情同时打开，光标在公司名
  const startCreate = () => {
    const blank = list.find((e) => e.id === draftId && !e.company.trim())
    if (blank) return setOpenId(blank.id)
    leaveDraft()
    const pkg: Pkg = scope === "全部" || scope === "逾期" ? "展位" : scope
    const e = createExhibitor(blankDraft(pkg), seq.current++)
    setList((l) => [e, ...l])
    if (scope === "逾期") setScope("全部")
    setQuery("")
    setDir(openId ? 1 : 0)
    setDraftId(e.id)
    setOpenId(e.id)
    setFreshId(e.id)
    document.querySelector("[data-roster-scroll]")?.scrollTo({ top: 0, behavior: "smooth" })
    scrollTo({ top: 0, behavior: "smooth" })
  }

  const edit = (id: string, f: (e: Exhibitor) => Exhibitor) => setList((l) => l.map((e) => (e.id === id ? f(e) : e)))
  const advance = (eid: string, rid: string) =>
    edit(eid, (e) => ({ ...e, rights: e.rights.map((r) => (r.id === rid ? { ...r, status: nextStatus(r.status) ?? r.status } : r)) }))
  const setDue = (eid: string, rid: string, due: string) =>
    edit(eid, (e) => ({ ...e, rights: e.rights.map((r) => (r.id === rid ? { ...r, due } : r)) }))
  const remind = (eid: string, r: Reminder) => edit(eid, (e) => ({ ...e, reminders: [r, ...e.reminders] }))

  const patch = (id: string, p: Patch) => edit(id, (e) => applyPatch(e, p))

  // 名单和左栏只在自己的数据变了才重画：回调走 ref，身份不变
  const latest = useRef({ go, changeScope })
  latest.current = { go, changeScope }
  const onOpen = useCallback((id: string) => latest.current.go(id), [])
  const onScope = useCallback((s: Scope) => latest.current.changeScope(s), [])

  let content: { k: string; body: ReactNode; foot: ReactNode } | null = null
  if (open) {
    const isDraft = open.id === draftId
    content = {
      k: open.id,
      body: (
        <div className="flex flex-col gap-5">
          {isDraft ? (
            <DraftFields e={open} onChange={(p) => patch(open.id, p)} />
          ) : (
            <div className="pr-10">
              <DetailHead e={open} />
            </div>
          )}
          <Detail
            e={open}
            touch={narrow}
            contact={!isDraft}
            onAdvance={(rid) => advance(open.id, rid)}
            onDue={(rid, due) => setDue(open.id, rid, due)}
            onRemind={(r) => remind(open.id, r)}
          />
        </div>
      ),
      foot: <Neighbors prev={prev} next={next} onGo={go} />,
    }
  }
  // 抽屉关上的那几帧还要显示刚才的内容
  const last = useRef(content)
  if (content) last.current = content
  const shown = content ?? last.current

  const search = (
    <SearchField aria-label="搜索公司" data-roster-search value={query} onChange={setQuery} className={narrow ? "w-full" : "w-60"}>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input placeholder="搜索公司" />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  )
  const count = <footer className="px-6 py-3 text-xs tabular-nums text-muted">{tableRows.length} 家</footer>

  if (narrow) {
    return (
      <div className="flex min-h-dvh flex-col bg-surface">
        <header className="sticky top-0 z-10 flex flex-col gap-2 bg-surface px-4 pb-3 pt-3 shadow-[0_1px_0_var(--separator)]">
          <div className="flex items-center gap-2">
            <ScopeSelect list={navList} scope={scope} onChange={onScope} />
            <Button isIconOnly variant="primary" aria-label="新增展商" onPress={startCreate}>
              <Plus className="size-4" />
            </Button>
          </div>
          {search}
        </header>
        <div className="relative flex-1">
          <AnimatePresence mode="popLayout">
            <motion.div key={scope} initial={firstPaint ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={FADE}>
              <RosterList rows={tableRows} query={query} openId={openId} freshId={tableFresh} onOpen={onOpen} />
            </motion.div>
          </AnimatePresence>
        </div>
        {count}
        {shown && <Sheet open={!!content} k={shown.k} dir={0} body={shown.body} foot={shown.foot} onClose={close} />}
      </div>
    )
  }

  return (
    <div className="flex h-dvh bg-background text-foreground">
      <OpenRowStyle id={openId} />
      <nav aria-label="视图" className="flex w-56 shrink-0 lg:w-64 flex-col gap-4 px-3 py-5">
        <div className="px-2 text-sm font-semibold">FBIF 2027 展商权益</div>
        <ScopeNav list={navList} scope={scope} onChange={onScope} />
      </nav>
      <main className="my-2 mr-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl bg-surface shadow-surface">
        <header className="flex items-center gap-3 px-6 pb-3 pt-5">
          <h1 className="mr-auto text-lg font-semibold">{scopeTitle(scope)}</h1>
          {search}
          <Button variant="primary" onPress={startCreate}>
            <Plus className="size-4" />
            新增展商
          </Button>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="relative min-h-0 flex-1">
            <AnimatePresence>
              <motion.div
                key={scope}
                initial={firstPaint ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={FADE}
                className="absolute inset-0"
              >
                <RosterTable rows={tableRows} scope={scope} query={query} freshId={tableFresh} onOpen={onOpen} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="border-t border-separator">{count}</div>
          <Panel open={!!content} k={shown?.k ?? ""} dir={dir} body={shown?.body} foot={shown?.foot} onClose={close} />
        </div>
      </main>
    </div>
  )
}
