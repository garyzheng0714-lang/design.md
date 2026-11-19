// 页面自查：把用户发现过的毛病查一遍，交付前在 Chrome 里跑。
// 在开发者工具的控制台里粘贴运行，或者交给 Claude in Chrome 的 javascript_tool。
// 页面和它里面同源的 iframe 都查；会把每个滚动区滚到中间再滚回去。查不出问题时只说查了什么，不说「都正常」。
(async () => {
  const docs = [document, ...[...document.querySelectorAll('iframe')].map(f => { try { return f.contentDocument; } catch { return null; } }).filter(Boolean)];
  const out = [];
  const name = el => (el.id ? `#${el.id}` : el.tagName.toLowerCase()) + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : '');
  const frame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  for (const doc of docs) {
    const win = doc.defaultView, css = el => win.getComputedStyle(el);
    const where = doc === document ? '页面' : 'iframe 里的页面';
    out.push(`—— ${where}（${doc.documentElement.clientWidth}×${doc.documentElement.clientHeight}）`);
    const all = [...doc.querySelectorAll('*')];
    const scrollers = all.filter(el => /(auto|scroll)/.test(css(el).overflowY + css(el).overflowX) && (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1));

    // 1. 到头回弹、带着整页晃：contain 只挡住连带滚动，回弹还在，要 none。
    const bounce = [doc.documentElement, doc.body, ...scrollers].filter(el => css(el).overscrollBehaviorY !== 'none' || css(el).overscrollBehaviorX !== 'none');
    out.push(bounce.length ? `✗ 回弹：${bounce.length} 处不是 overscroll-behavior: none：${bounce.slice(0, 5).map(el => `${name(el)}（${css(el).overscrollBehaviorY}）`).join('，')}` : `✓ 回弹：html、body 和 ${scrollers.length} 个滚动区都是 none（触控板手感没实测）`);

    // 2. 横向溢出：整页不该横向滚；滚动区里的横向滚动列出来自己判断。
    const pageWide = doc.documentElement.scrollWidth > doc.documentElement.clientWidth + 1;
    const wide = scrollers.filter(el => el.scrollWidth > el.clientWidth + 1);
    out.push(pageWide ? `✗ 横向溢出：整页宽 ${doc.documentElement.scrollWidth}，窗口 ${doc.documentElement.clientWidth}` : wide.length ? `△ 横向溢出：整页没有；${wide.length} 个区域能横向滚：${wide.slice(0, 3).map(name).join('，')}` : '✓ 横向溢出：没有');

    // 3. 「·」分隔。
    const dots = [];
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = walker.nextNode());) if (n.textContent.includes('·')) dots.push(n.textContent.trim().slice(0, 20));
    out.push(dots.length ? `✗ 「·」：${dots.length} 处，例：${dots.slice(0, 3).join(' / ')}` : '✓ 「·」：没有');

    // 4. 固定的表头、栏头被滚上来的内容盖住（组件里的 z-index 互相打架时会这样）。
    const covered = [];
    for (const sc of scrollers) {
      const top = sc.scrollTop;
      sc.scrollTop = (sc.scrollHeight - sc.clientHeight) / 2;
      await frame();
      for (const st of [...sc.querySelectorAll('*')].filter(el => css(el).position === 'sticky')) {
        const r = st.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        for (let x = r.left + 4; x < r.right; x += 8) {
          const hit = doc.elementFromPoint(x, r.top + r.height / 2);
          if (hit && hit !== sc && !st.contains(hit) && sc.contains(hit)) { covered.push(`${name(st)} 被 ${name(hit)} 盖住`); break; }
        }
      }
      sc.scrollTop = top;
    }
    out.push(covered.length ? `✗ 固定表头被盖：${[...new Set(covered)].slice(0, 3).join('；')}` : '✓ 固定表头被盖：滚到中间看过，没有');

    // 5. 字体：第一个要是页面自己加载的字体，系统字体名打头时用户的 Chrome 会显示成宋体。
    const firsts = new Set(all.filter(el => el.childNodes.length && [...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim())).map(el => css(el).fontFamily.split(',')[0].trim().replace(/"/g, '')));
    const system = [...firsts].filter(f => /^(-apple-system|system-ui|BlinkMacSystemFont|PingFang|Microsoft YaHei|sans-serif|serif)/i.test(f));
    out.push(system.length ? `✗ 字体：${system.join('、')} 打头` : `✓ 字体：打头的是 ${[...firsts].join('、')}`);
  }
  return out.join('\n');
})();
