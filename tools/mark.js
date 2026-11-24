// 在页面上画框标注，给检查记录截图用（验收.md「存证」）。
// 用法：在 Chrome 里 (0,eval)(await fetch('http://localhost:5291/mark.js').then(r=>r.text()))
//   __mark([{ sel: '.card', label: '① 滚动条压住卡片', tone: 'bad' }, { rect: [x, y, w, h], label: '② 官网写法', tone: 'ref' }])
//   截图（save_to_disk）后 __unmark()。tone：bad 红（问题）、ok 绿（改好）、ref 蓝（参考）；all: true 框出全部匹配；below: true 标签放框下面（上面要看的东西别被标签盖住）
(() => {
  const ID = "__evidence_marks"
  const TONES = { bad: "#e5484d", ok: "#30a46c", ref: "#3e63dd" }
  window.__unmark = () => document.getElementById(ID)?.remove()
  window.__mark = (items) => {
    window.__unmark()
    const root = document.createElement("div")
    root.id = ID
    Object.assign(root.style, { position: "fixed", inset: "0", pointerEvents: "none", zIndex: "2147483647" })
    document.body.appendChild(root)
    const missing = []
    items.forEach((item) => {
      let rects
      if (item.rect) rects = [{ x: item.rect[0], y: item.rect[1], width: item.rect[2], height: item.rect[3] }]
      else {
        const els = [...document.querySelectorAll(item.sel)].filter((el) => el.getClientRects().length)
        if (!els.length) return missing.push(item.sel)
        rects = els.slice(0, item.all ? 50 : 1).map((el) => el.getBoundingClientRect())
      }
      const color = TONES[item.tone || "bad"]
      const pad = item.pad ?? 3
      rects.forEach((r, i) => {
        const box = document.createElement("div")
        Object.assign(box.style, {
          position: "fixed", left: `${r.x - pad}px`, top: `${r.y - pad}px`, width: `${r.width + pad * 2}px`, height: `${r.height + pad * 2}px`,
          border: `2px solid ${color}`, borderRadius: "4px", boxSizing: "border-box",
        })
        root.appendChild(box)
        if (i > 0 || !item.label) return
        const tag = document.createElement("div")
        tag.textContent = item.label
        Object.assign(tag.style, {
          position: "fixed", background: color, color: "#fff", font: "600 12px/18px -apple-system, 'PingFang SC', sans-serif",
          padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap",
        })
        root.appendChild(tag)
        const w = tag.offsetWidth
        const above = r.y - pad - 24
        tag.style.top = `${above >= 0 && !item.below ? above : r.y + r.height + pad + 2}px`
        tag.style.left = `${Math.min(Math.max(0, r.x - pad), innerWidth - w - 4)}px`
      })
    })
    return { marked: items.length - missing.length, missing }
  }
})()
