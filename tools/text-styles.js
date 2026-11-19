// 数一屏里用了几种文字样式。在 Chrome 开发者工具的控制台里粘贴运行，
// 或者交给 Claude in Chrome 的 javascript_tool。只数当前窗口里看得见的字。
(() => {
  const h = innerHeight, byStyle = new Map(), sizes = new Map(), weights = new Map(), colors = new Map();
  const add = (m, k, n) => m.set(k, (m.get(k) || 0) + n);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node; (node = walker.nextNode());) {
    const text = node.textContent.trim(), el = node.parentElement;
    if (!text || !el) continue;
    const r = el.getBoundingClientRect(), s = getComputedStyle(el);
    if (!r.width || !r.height || s.visibility === 'hidden' || +s.opacity === 0 || r.bottom < 0 || r.top > h) continue;
    const key = `${s.fontSize} ${s.fontWeight} ${s.color}`;
    const v = byStyle.get(key) || { chars: 0, sample: text.slice(0, 16) };
    v.chars += text.length; byStyle.set(key, v);
    add(sizes, s.fontSize, text.length); add(weights, s.fontWeight, text.length); add(colors, s.color, text.length);
  }
  const list = m => [...m].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k}（${n} 字）`).join('，');
  return [
    `字号 ${sizes.size} 种：${list(sizes)}`,
    `字重 ${weights.size} 种：${list(weights)}`,
    `颜色 ${colors.size} 种：${list(colors)}`,
    `组合 ${byStyle.size} 种：`,
    ...[...byStyle].sort((a, b) => b[1].chars - a[1].chars).map(([k, v]) => `  ${k}  ${v.chars} 字  例：${v.sample}`),
  ].join('\n');
})();
