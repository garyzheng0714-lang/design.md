import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import { EXHIBITORS, type Exhibitor, type Reminder, type RightStatus } from "~bench/data/expo"
import { nextStatus } from "./model"

const UNDO_MS = 5000

export function useExpo() {
  const [list, setList] = useState<Exhibitor[]>(() => structuredClone(EXHIBITORS))
  const [undo, setUndo] = useState<Record<string, RightStatus>>({})
  const timers = useRef(new Map<string, number>())

  useEffect(() => {
    const t = timers.current
    return () => t.forEach((id) => window.clearTimeout(id))
  }, [])

  const patchRight = useCallback((eid: string, rid: string, patch: Partial<Exhibitor["rights"][number]>) => {
    setList((all) =>
      all.map((e) => (e.id !== eid ? e : { ...e, rights: e.rights.map((r) => (r.id === rid ? { ...r, ...patch } : r)) })),
    )
  }, [])

  const dropUndo = useCallback((rid: string) => {
    window.clearTimeout(timers.current.get(rid))
    timers.current.delete(rid)
    setUndo((u) => {
      const { [rid]: _, ...rest } = u
      return rest
    })
  }, [])

  const advance = useCallback(
    (eid: string, rid: string, from: RightStatus) => {
      patchRight(eid, rid, { status: nextStatus(from) })
      window.clearTimeout(timers.current.get(rid))
      setUndo((u) => ({ ...u, [rid]: from }))
      timers.current.set(rid, window.setTimeout(() => dropUndo(rid), UNDO_MS))
    },
    [patchRight, dropUndo],
  )

  const revert = useCallback(
    (eid: string, rid: string) => {
      const prev = undo[rid]
      if (!prev) return
      patchRight(eid, rid, { status: prev })
      dropUndo(rid)
    },
    [undo, patchRight, dropUndo],
  )

  const setDue = useCallback((eid: string, rid: string, due: string) => patchRight(eid, rid, { due }), [patchRight])

  const addReminder = useCallback((eid: string, rem: Reminder) => {
    setList((all) =>
      all.map((e) => {
        if (e.id !== eid) return e
        const at = e.reminders.findIndex((x) => x.date <= rem.date)
        const reminders = [...e.reminders]
        reminders.splice(at < 0 ? reminders.length : at, 0, rem)
        return { ...e, reminders }
      }),
    )
  }, [])

  const addExhibitor = useCallback((e: Exhibitor) => setList((all) => [...all, e]), [])

  return { list, undo, advance, revert, setDue, addReminder, addExhibitor }
}

export type Expo = ReturnType<typeof useExpo>

function subscribeMedia(query: string) {
  return (cb: () => void) => {
    const m = window.matchMedia(query)
    m.addEventListener("change", cb)
    return () => m.removeEventListener("change", cb)
  }
}

export function useMedia(query: string) {
  const subscribe = useMemo(() => subscribeMedia(query), [query])
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches)
}
