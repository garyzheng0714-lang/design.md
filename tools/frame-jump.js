// 逐帧看动画有没有一帧跳变（2026-11-24 资讯订阅热点展开：骨架到真内容同一帧整块换掉，下一行跳 146px，截图根本看不出来）。
// 在 Claude in Chrome 的 javascript_tool 里：
//   eval(await (await fetch('http://localhost:5291/frame-jump.js', { cache: 'no-store' })).text())
//   await frameJump(() => document.querySelector('…').click(), ['选择器1', '选择器2'], { ms: 1500 })
// 每一帧记下每个选择器第一个元素的 top、height、opacity。弹簧动画每帧走十几二十 px 是正常的；算毛病的是「停着的东西一帧挪了 px 以上、下一帧又停住」，
// 和不透明度一帧从 0 到 1（或反过来）的硬切。数据到了才换的情况，先把接口拖慢再看（fetch 包一层 setTimeout），不然一帧就过去了。
// 盯看得见的东西（下面一行、外框），别盯被外层裁住、自己先撑到最终高度的内层（Fluid 侧栏子菜单的 ul 就是这样，外层在做高度动画）。
window.frameJump = async (act, selectors, { ms = 1500, px = 8 } = {}) => {
  const sample = () => selectors.map(sel => { const el = document.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(); return [r.top, r.height, Number(getComputedStyle(el).opacity)]; });
  const frames = [];
  const t0 = performance.now();
  let run = true;
  const tick = () => { frames.push([performance.now() - t0, sample()]); if (run) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  await new Promise(r => requestAnimationFrame(r));
  await act();
  await new Promise(r => setTimeout(r, ms));
  run = false;
  const jumps = [];
  selectors.forEach((sel, k) => {
    const v = frames.map(([t, s]) => [Math.round(t), s[k]]);
    for (let i = 1; i < v.length; i++) {
      const [t, cur] = v[i], prev = v[i - 1][1], before = v[i - 2]?.[1], after = v[i + 1]?.[1];
      if (!cur || !prev) { if (cur !== prev && i > 1) jumps.push(`${sel} 在 ${t}ms ${cur ? '冒出来' : '没了'}`); continue; }
      for (const [j, what] of [[0, '位置'], [1, '高度']]) {
        const d = cur[j] - prev[j];
        const still = (a, b) => !a || !b || Math.abs(a[j] - b[j]) < 1;
        if (Math.abs(d) > px && still(before, prev) && still(cur, after)) jumps.push(`${sel} 的${what}在 ${t}ms 一帧${d > 0 ? '+' : ''}${Math.round(d)}px`);
      }
      if (Math.abs(cur[2] - prev[2]) > 0.9) jumps.push(`${sel} 在 ${t}ms 一帧从不透明度 ${prev[2]} 硬切到 ${cur[2]}`);
    }
  });
  const end = frames.at(-1)?.[1] ?? [];
  return { 帧数: frames.length, 一帧跳变: jumps.length ? jumps : '没有', 最后: selectors.map((sel, k) => end[k] ? `${sel}: top ${Math.round(end[k][0])} 高 ${Math.round(end[k][1])}` : `${sel}: 不在`) };
};
