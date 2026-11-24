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

    // 6. 悬停底色要跟手：要一行行扫的列表（6 行以上），鼠标换到下一行，底色马上滑到那一行。
    // Fluid 的悬停底色用 spring.fast（80ms）滑过去，等 250ms 还没到，就是停在半路、看着错位。
    // 只能查脚本画出来的底色（不接鼠标、有底色的那层）；CSS :hover 脚本触发不了，要人眼看。
    const hit = el => (el.matches('li') ? el.querySelector('a[href], button') : el);
    const lists = [...new Set([...doc.querySelectorAll('button, a[href], li')].map(el => el.parentElement))]
      .map(p => [...p.children].filter(c => c.matches('button, a[href], li') && hit(c)))
      .filter(items => items.length >= 6);
    const lag = [];
    // 底色画在「不接鼠标、有底色」的那层；悬停前就在的（选中项的底色）不算
    const painted = box => [...box.querySelectorAll('*')].filter(el => {
      const s = css(el), r = el.getBoundingClientRect();
      return s.pointerEvents === 'none' && r.height > 8 && Number(s.opacity) > 0.1 && s.backgroundColor !== 'rgba(0, 0, 0, 0)';
    });
    // 有的按 mouseover 认行，有的（Fluid 的 useFluidHover）按 mousemove 的坐标认行，两样都发、带上那一行中心的坐标
    const at = el => { const r = el.getBoundingClientRect(); return { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }; };
    const move = (el, from) => {
      el.dispatchEvent(new win.MouseEvent('mouseover', { bubbles: true, relatedTarget: from, ...at(el) }));
      el.dispatchEvent(new win.MouseEvent('mousemove', { bubbles: true, ...at(el) }));
    };
    let untested = 0;
    for (const items of lists) {
      const [a, b] = items.map(hit);
      const box = items[0].parentElement;
      const before = new Set(painted(box));
      move(a, doc.body);
      await new Promise(r => setTimeout(r, 500));
      // React 从 mouseout 算「离开 a、进入 b」，所以两个事件都发。
      a.dispatchEvent(new win.MouseEvent('mouseout', { bubbles: true, relatedTarget: b, ...at(b) }));
      move(b, a);
      await new Promise(r => setTimeout(r, 250));
      const top = items[1].getBoundingClientRect().top;
      const marks = painted(box).filter(m => !before.has(m) || Math.abs(m.getBoundingClientRect().top - top) <= 2);
      if (!marks.length) untested++;
      const off = Math.max(0, ...marks.map(m => Math.round(Math.abs(m.getBoundingClientRect().top - top))));
      if (off > 2) lag.push(`${name(box)} 慢了 ${off}px`);
      b.dispatchEvent(new win.MouseEvent('mouseout', { bubbles: true, relatedTarget: doc.body }));
      box.dispatchEvent(new win.MouseEvent('mouseleave', { bubbles: false }));
    }
    out.push(lag.length ? `✗ 悬停底色 250ms 还没滑到鼠标那一行：${lag.slice(0, 3).join('；')}` : `✓ 悬停底色：${lists.length - untested} 组列表 250ms 内都到位${untested ? `，${untested} 组脚本没让底色出来（CSS 悬停之类），要人眼看` : ''}`);

    // 7. 选中、正在看、当前页的那一项，描边和外圈要整圈看得见：贴边的栏头、相邻的块、父级裁切都可能盖掉一条边。
    const cut = [];
    const clear = c => c === 'rgba(0, 0, 0, 0)' || c === 'transparent';
    // 收起的下拉里也有「选中」的选项，看不见的不算
    const marked = all.filter(el => el.matches('[data-selected],[aria-pressed="true"],[aria-current]:not([aria-current="false"]),[aria-selected="true"]') && el.checkVisibility({ opacityProperty: true, visibilityProperty: true }));
    // 每个都先像键盘移过去那样滚进视野（nearest），再看四条边；查完滚回原处
    const scrolled = el => { const keep = []; for (let a = el.parentElement; a; a = a.parentElement) keep.push([a, a.scrollTop, a.scrollLeft]); return keep; };
    for (const el of marked) {
      const keep = scrolled(el);
      el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      await frame();
      const r = el.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) { for (const [a, t, l] of keep) { a.scrollTop = t; a.scrollLeft = l; } continue; }
      // 外圈有多宽：box-shadow 的扩展半径、outline 的宽加偏移，取最大；没有外圈就查描边本身
      const spreads = [...css(el).boxShadow.matchAll(/0px 0px 0px (\d+(?:\.\d+)?)px(?! inset)/g)].map(x => +x[1]);
      if (css(el).outlineStyle !== 'none') spreads.push(parseFloat(css(el).outlineWidth) + parseFloat(css(el).outlineOffset));
      const g = Math.max(0, ...spreads), d = g ? -(g - 0.5) : 0.5;
      const pts = [[r.left + r.width / 2, r.top + d], [r.left + r.width / 2, r.bottom - d], [r.left + d, r.top + r.height / 2], [r.right - d, r.top + r.height / 2]];
      for (const [x, y] of pts) {
        if (y < 0 || y > win.innerHeight || x < 0 || x > win.innerWidth) continue;
        const hit = doc.elementFromPoint(x, y);
        if (hit && hit !== el && !el.contains(hit) && !hit.contains(el)) { cut.push(`${name(el)} 被 ${name(hit)} 盖住`); break; }
      }
      for (let a = el.parentElement; a && a !== doc.body; a = a.parentElement) {
        const o = css(a).overflowX + css(a).overflowY;
        if (!/(hidden|clip|auto|scroll)/.test(o)) continue;
        const ar = a.getBoundingClientRect(), m = parseFloat(css(a).overflowClipMargin) || 0;
        if (r.top - g < ar.top - m - 0.5 || r.bottom + g > ar.bottom + m + 0.5 || r.left - g < ar.left - m - 0.5 || r.right + g > ar.right + m + 0.5) { cut.push(`${name(el)} 被 ${name(a)} 裁掉`); break; }
      }
      // Mac 默认的滚动条浮在内容上，鼠标靠近会变宽到约 15px，盖住贴边的外圈；脚本看不见它，只能量留白。
      // 藏了原生滚动条、自己画的（滚动区外面一层里贴着它右边的那条），就量自己画的轨道和滑块有没有压到。
      for (let a = el.parentElement; a && a !== doc.body; a = a.parentElement) {
        if (!/(auto|scroll)/.test(css(a).overflowY) || a.scrollHeight <= a.clientHeight + 1) continue;
        const ar = a.getBoundingClientRect();
        if (css(a).scrollbarWidth === 'none') {
          const strips = [...(a.parentElement?.querySelectorAll('*') ?? [])].filter(t => !a.contains(t) && css(t).position === 'absolute' && (() => { const q = t.getBoundingClientRect(); return q.width > 0 && q.width < 24 && Math.abs(q.right - ar.right) < 2; })());
          const drawn = strips.flatMap(t => [t, ...t.querySelectorAll('*')]).filter(t => !clear(css(t).backgroundColor)).map(t => t.getBoundingClientRect()).filter(q => q.width > 0 && q.top < r.bottom && q.bottom > r.top);
          const lap = drawn.length ? r.right + g - Math.min(...drawn.map(q => q.left)) : 0;
          if (lap > 0.5) cut.push(`${name(el)} 被自己画的滚动条压住 ${Math.round(lap)}px`);
        } else {
          const room = ar.right - (a.offsetWidth - a.clientWidth) - (r.right + g);
          if (a.offsetWidth === a.clientWidth && room < 16) cut.push(`${name(el)} 离滚动区右边只有 ${Math.round(room)}px，浮动滚动条会盖住`);
        }
        break;
      }
      for (const [a, t, l] of keep) { a.scrollTop = t; a.scrollLeft = l; }
    }
    out.push(cut.length ? `✗ 选中描边被盖或被裁：${[...new Set(cut)].slice(0, 3).join('；')}` : `✓ 选中描边：${marked.length} 个选中、正在看的项整圈都看得见`);

    // 8. 指着和选中要分得清：选中那项旁边的一项被指着时，两样不能差不多，底色的圆角也要一样，不然两项挨着就糊成一块。
    // 脚本画的悬停底色（滑块）直接比；CSS :hover 的，把命中的悬停规则临时贴到旁边那项上（关掉过渡）再比。
    // 底色按明度（L*）比：指着的和选中的至少差 3，而且不能比它离原本的底色还近不少（至少是那段的八成），不然挨着选中的一行看着像两行都选中了
    // （7 级灰：221 和 228 压在 #f3f3f3 上，就是这样）。底色分不清时，细边框按「色差 × 线宽 ÷ 4」算分，线宽或外圈多出 1px 算 6 分，阴影不同加 2 分，到 6 分也算分得清。
    // 两行的字一样深、一样粗时只剩底色这一条线索，要求更严：和选中的差距至少是离原本底色的两倍（2026-11-23：指着 4%、选中 9% 压在 #f3f3f3 上，
    // 差 4.2 过了上面那条，可指着的字也变黑，挨着选中的一行看着还是两块一样的灰）。指着选中那一项自己时，选中的底色要是实色，半透明的会让下面的指着色块透上来、选中的变深。
    const cv = doc.createElement('canvas'); cv.width = cv.height = 1;
    const g = cv.getContext('2d', { willReadFrequently: true });
    const over = (color, under) => { g.globalCompositeOperation = 'copy'; g.fillStyle = under; g.fillRect(0, 0, 1, 1); g.globalCompositeOperation = 'source-over'; g.fillStyle = color; g.fillRect(0, 0, 1, 1); const d = g.getImageData(0, 0, 1, 1).data; return `rgb(${d[0]}, ${d[1]}, ${d[2]})`; };
    const backdrop = el => { const layers = []; for (let a = el.parentElement; a; a = a.parentElement) { const b = css(a).backgroundColor; if (!clear(b)) layers.push(b); } return layers.reverse().reduce((acc, b) => over(b, acc), 'rgb(255, 255, 255)'); };
    const levels = (a, b) => { const x = a.match(/\d+/g).map(Number), y = b.match(/\d+/g).map(Number); return Math.max(...[0, 1, 2].map(i => Math.abs(x[i] - y[i]))); };
    const lstar = c => { const [r, gg, b] = c.match(/\d+/g).slice(0, 3).map(v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); const y = 0.2126 * r + 0.7152 * gg + 0.0722 * b; return y > 216 / 24389 ? 116 * Math.cbrt(y) - 16 : (24389 / 27) * y; };
    const apart = (hover, picked, base, only = false) => { const d = Math.abs(lstar(hover) - lstar(picked)), e = Math.abs(lstar(hover) - lstar(base)); return { ok: d >= 3 && d >= (only ? 2 : 0.8) * e, text: `明度差 ${d.toFixed(1)}，离原本底色 ${e.toFixed(1)}${only ? '，字一样深一样粗' : ''}` }; };
    const translucent = c => over(c, 'rgb(0, 0, 0)') !== over(c, 'rgb(255, 255, 255)');
    // 一项里字最多的那层，看它的字色和字重；指着的规则先贴到这一项上，字色是继承来的也算进去
    const mainText = el => [el, ...el.querySelectorAll('*')].map(e => [e, [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('').length]).sort((a, b) => b[1] - a[1])[0][0];
    const inkOf = (el, rules) => {
      const keep = el.getAttribute('style');
      if (rules) { el.style.setProperty('transition', 'none', 'important'); for (const st of rules) for (let i = 0; i < st.length; i++) el.style.setProperty(st[i], st.getPropertyValue(st[i]), st.getPropertyPriority(st[i])); }
      const s = css(mainText(el)), v = { color: over(s.color, 'rgb(255, 255, 255)'), weight: Number(s.fontWeight) || 400 };
      if (rules) { if (keep === null) el.removeAttribute('style'); else el.setAttribute('style', keep); }
      return v;
    };
    const sameInk = (a, b) => Math.abs(lstar(a.color) - lstar(b.color)) < 10 && Math.abs(a.weight - b.weight) < 100;
    const ring = s => Math.max(0, ...[...s.matchAll(/0px 0px 0px (\d+(?:\.\d+)?)px(?! inset)/g)].map(x => +x[1]));
    const SEL = '[aria-current]:not([aria-current="false"]),[aria-selected="true"],[data-selected]';
    const ITEM = 'button, a[href], [role="treeitem"], [role="option"], [role="tab"]';
    const isItem = c => c.matches(ITEM) || !!c.querySelector(ITEM);
    // 选中的样子画在哪：自己有底色就是自己，不然找和它一样大、有底色的那层（菜单的选中块常是里面一层）
    const layerOf = el => {
      if (!clear(css(el).backgroundColor)) return el;
      const r = el.getBoundingClientRect();
      return [...el.querySelectorAll('*')].find(d => { const q = d.getBoundingClientRect(); return !clear(css(d).backgroundColor) && Math.abs(q.width - r.width) < 3 && Math.abs(q.height - r.height) < 3; }) || null;
    };
    // 类名里转义的「\:hover」（hover:、not-aria-selected:hover: 这类写法）不是伪类，只认没转义的
    const HOVER = /(?<!\\):hover/, HOVERS = /(?<!\\):hover/g;
    const spec = sel => {
      const t = sel.replace(/:where\((?:[^()]|\([^()]*\))*\)/g, '');
      let ids = 0, cls = 0;
      for (let i = 0; i < t.length; i++) {
        if (t[i - 1] === '\\') continue;
        if (t[i] === '#') ids++;
        else if (t[i] === '.' || t[i] === '[') cls++;
        else if (t[i] === ':' && t[i + 1] !== ':' && t[i - 1] !== ':' && !/^:(not|is|has)\(/.test(t.slice(i))) cls++;
      }
      return ids * 100 + cls;
    };
    const hoverRules = el => {
      const found = [];
      const walk = (rules, parents) => {
        for (const r of rules) {
          if (r instanceof win.CSSMediaRule) { if (win.matchMedia(r.media.mediaText).matches) walk(r.cssRules, parents); }
          else if (r instanceof win.CSSStyleRule) {
            const own = r.selectorText.split(/,(?![^(]*\))/).map(s => s.trim());
            const full = parents ? own.flatMap(s => parents.map(p => (s.includes('&') ? s.replaceAll('&', p) : `${p} ${s}`))) : own;
            const hit = full.filter(s => HOVER.test(s) && (() => { try { return el.matches(s.replace(HOVERS, '')); } catch { return false; } })());
            if (r.style.length && hit.length) found.push([r.style, Math.max(...hit.map(spec))]);
            if (r.cssRules?.length) walk(r.cssRules, full);
          } else if (win.CSSNestedDeclarations && r instanceof win.CSSNestedDeclarations) {
            const hit = (parents || []).filter(s => HOVER.test(s) && (() => { try { return el.matches(s.replace(HOVERS, '')); } catch { return false; } })());
            if (r.style.length && hit.length) found.push([r.style, Math.max(...hit.map(spec))]);
          } else if (r.cssRules) walk(r.cssRules, parents);
        }
      };
      for (const sheet of doc.styleSheets) { try { walk(sheet.cssRules, null); } catch { /* 跨域样式表读不了 */ } }
      // 按选择器的权重排，后贴的盖前面的，和浏览器一样（not-aria-selected:hover: 比 hover: 重，指着时字不变深的写法才算得对）
      return found.sort((a, b) => a[1] - b[1]).map(([st]) => st);
    };
    const looks = (el, rules) => {
      const keep = el.getAttribute('style');
      if (rules) { el.style.setProperty('transition', 'none', 'important'); for (const st of rules) for (let i = 0; i < st.length; i++) el.style.setProperty(st[i], st.getPropertyValue(st[i]), st.getPropertyPriority(st[i])); }
      const s = css(el), bg = over(s.backgroundColor, backdrop(el));
      const v = { bg, border: over(s.borderTopColor, bg), width: parseFloat(s.borderTopWidth) || 0, ring: ring(s.boxShadow), shadow: s.boxShadow };
      if (rules) { if (keep === null) el.removeAttribute('style'); else el.setAttribute('style', keep); }
      return v;
    };
    const blur = [];
    let paired = 0;
    for (const S of all.filter(el => el.matches(SEL) && el.checkVisibility({ opacityProperty: true, visibilityProperty: true }))) {
      const P = layerOf(S);
      if (!P) continue;
      let I = S;
      while (I.parentElement && [...I.parentElement.children].filter(isItem).length < 2) I = I.parentElement;
      if (!I.parentElement) continue;
      const sibs = [...I.parentElement.children], k = sibs.indexOf(I);
      const N = [...sibs.slice(0, k).reverse(), ...sibs.slice(k + 1)].find(c => isItem(c) && !c.matches(SEL) && !c.querySelector(SEL) && c.checkVisibility());
      if (!N) continue;
      const T = N.matches(ITEM) ? N : N.querySelector(ITEM);
      const path = [];
      for (let a = S; a !== I; a = a.parentElement) path.unshift([...a.parentElement.children].indexOf(a));
      const C = path.reduce((c, i) => c?.children[i], N) || T;
      paired++;
      T.dispatchEvent(new win.MouseEvent('mouseover', { bubbles: true, relatedTarget: doc.body }));
      await frame();
      const tr = T.getBoundingClientRect(), cx = tr.left + tr.width / 2, cy = tr.top + tr.height / 2;
      const M = [...I.parentElement.querySelectorAll('*')].find(el => { const s = css(el), r = el.getBoundingClientRect(); return s.pointerEvents === 'none' && !clear(s.backgroundColor) && Number(s.opacity) > 0.1 && r.height > 8 && r.left <= cx && cx <= r.right && r.top <= cy && cy <= r.bottom; });
      const sel = looks(P, null);
      const ST = S.matches(ITEM) ? S : S.querySelector(ITEM) || S;
      if (M) {
        const a = apart(over(css(M).backgroundColor, backdrop(M)), sel.bg, backdrop(M), sameInk(inkOf(T, hoverRules(T)), inkOf(ST, null)));
        if (!a.ok) blur.push(`${name(S)} 和指着的 ${name(T)} 底色分不清（${a.text}）`);
        const rm = parseFloat(css(M).borderTopLeftRadius), rp = parseFloat(css(P).borderTopLeftRadius);
        if (Math.abs(rm - rp) > 1) blur.push(`${name(S)} 选中的圆角 ${rp}px、指着的 ${rm}px`);
      } else {
        const hov = looks(C, hoverRules(C)), still = looks(C, null);
        const a = apart(hov.bg, sel.bg, still.bg, sameInk(inkOf(C, hoverRules(C)), inkOf(ST, null)));
        const score = Math.max(Math.round((levels(hov.border, sel.border) * Math.min(1, hov.width, sel.width)) / 4), Math.abs(hov.width - sel.width) >= 1 || Math.abs(hov.ring - sel.ring) >= 1 ? 6 : 0) + (hov.shadow !== sel.shadow ? 2 : 0);
        if (!a.ok && score < 6) blur.push(`${name(S)} 选中的样子和指着别的项时差不多（底色${a.text}，边框和阴影 ${score} 分）`);
      }
      T.dispatchEvent(new win.MouseEvent('mouseout', { bubbles: true, relatedTarget: doc.body }));
      if (M && ST !== T) {
        ST.dispatchEvent(new win.MouseEvent('mouseover', { bubbles: true, relatedTarget: doc.body }));
        await frame();
        const sr = ST.getBoundingClientRect(), sx = sr.left + sr.width / 2, sy = sr.top + sr.height / 2;
        const under = [...I.parentElement.querySelectorAll('*')].find(el => { const s = css(el), r = el.getBoundingClientRect(); return el !== P && s.pointerEvents === 'none' && !clear(s.backgroundColor) && Number(s.opacity) > 0.1 && r.height > 8 && r.left <= sx && sx <= r.right && r.top <= sy && sy <= r.bottom; });
        if (under && translucent(css(P).backgroundColor)) blur.push(`${name(S)} 选中的底色是半透明的，指着它时下面的色块透上来、选中的变深`);
        ST.dispatchEvent(new win.MouseEvent('mouseout', { bubbles: true, relatedTarget: doc.body }));
      }
    }
    out.push(blur.length ? `✗ 指着和选中分不清：${[...new Set(blur)].slice(0, 4).join('；')}` : `✓ 指着和选中：${paired} 个选中项和旁边一项比过，分得清`);

    // 9. 一行写不下打省略号的字，自己要比外面裁切的框窄：grid 的列没写 minmax(0, 1fr)、flex 子项没写 min-w-0 时，这一行会撑到整句那么宽，
    // 省略号跑到框外被裁掉，看着像字被切了一半。外层能横向滚的归第 2 项，这里只查 hidden、clip 裁掉的。
    const clipped = [];
    const dotted = all.filter(el => css(el).textOverflow === 'ellipsis' && el.checkVisibility({ opacityProperty: true, visibilityProperty: true }));
    for (const el of dotted) {
      const r = el.getBoundingClientRect();
      if (r.width < 1) continue;
      for (let a = el.parentElement; a && a !== doc.documentElement; a = a.parentElement) {
        const o = css(a).overflowX;
        if (o === 'visible') continue;
        if (o === 'hidden' || o === 'clip') {
          const ar = a.getBoundingClientRect(), m = parseFloat(css(a).overflowClipMargin) || 0;
          const off = Math.max(r.right - ar.right - m, ar.left - m - r.left);
          if (off > 1) clipped.push(`${name(el)}「${el.textContent.trim().slice(0, 12)}」超出 ${name(a)} ${Math.round(off)}px`);
        }
        break;
      }
    }
    out.push(clipped.length ? `✗ 省略号被裁掉：${clipped.length} 处，例：${clipped.slice(0, 3).join('；')}` : `✓ 省略号：${dotted.length} 处打省略号的字都在框里`);
  }
  return out.join('\n');
})();
