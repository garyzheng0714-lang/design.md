// 页面自查：把用户发现过的毛病查一遍，交付前在 Chrome 里跑。
// 在开发者工具的控制台里粘贴运行，或者交给 Claude in Chrome 的 javascript_tool。
// 页面和它里面同源的 iframe 都查；会把每个滚动区滚到中间再滚回去。查不出问题时只说查了什么，不说「都正常」。
(async () => {
  const docs = [document, ...[...document.querySelectorAll('iframe')].map(f => { try { return f.contentDocument; } catch { return null; } }).filter(Boolean)];
  const out = [];
  // 透明的挡板（Fluid 弹层开着时铺满全屏、只拦点击的 popup-shield，背景 rgba(0,0,0,0)、没字没边没影）什么都不画，挡在上面不算盖住（2026-11-24 FBIF-电脑端群发工具会话报的误报）
  const paintsNothing = el => { const c = getComputedStyle(el); return !el.textContent.trim() && !el.querySelector('img, svg, video, canvas') && c.backgroundColor === 'rgba(0, 0, 0, 0)' && c.backgroundImage === 'none' && c.boxShadow === 'none' && !parseFloat(c.borderTopWidth) && !parseFloat(c.borderBottomWidth) && !parseFloat(c.borderLeftWidth) && !parseFloat(c.borderRightWidth) && c.outlineStyle === 'none'; };
  const name = el => (el.id ? `#${el.id}` : el.tagName.toLowerCase()) + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : '');
  const frame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  for (const doc of docs) {
    const win = doc.defaultView, css = el => win.getComputedStyle(el);
    const where = doc === document ? '页面' : 'iframe 里的页面';
    out.push(`—— ${where}（${doc.documentElement.clientWidth}×${doc.documentElement.clientHeight}）`);
    const all = [...doc.querySelectorAll('*')];
    const scrollers = all.filter(el => /(auto|scroll)/.test(css(el).overflowY + css(el).overflowX) && (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1));
    // 弹层（Fluid 的搜索面板、下拉、选择框）里的滚动区是组件自己的，组件原样不改；2026-11-24 对过 Fluid 官网 CommandMenu：视口 overscroll auto、行底色伸进轨道 6px、行尾的字离边 12px，和资讯订阅一模一样
    const POPUP = '[role="dialog"], [role="alertdialog"], [role="menu"], [role="listbox"]';
    const inPopup = el => !!el.closest(POPUP);
    // 开着模态框时，后面的页面被遮罩盖住是设计如此，只查框里的
    const modal = [...doc.querySelectorAll('[role="dialog"], [role="alertdialog"]')].find(d => d.getAttribute('aria-modal') === 'true' || doc.querySelector('[data-base-ui-inert], [data-slot$="overlay"], [data-slot$="backdrop"]'));

    // 1. 到头回弹、带着整页晃：contain 只挡住连带滚动，回弹还在，要 none。
    const bouncy = el => css(el).overscrollBehaviorY !== 'none' || css(el).overscrollBehaviorX !== 'none';
    const bounce = [doc.documentElement, doc.body, ...scrollers.filter(el => !inPopup(el))].filter(bouncy);
    const popupLoose = scrollers.filter(el => inPopup(el) && bouncy(el)).length;
    const popupNote = popupLoose ? `；另有 ${popupLoose} 个在 Fluid 弹层里，照组件原样 auto，不算` : '';
    out.push(bounce.length ? `✗ 回弹：${bounce.length} 处不是 overscroll-behavior: none：${bounce.slice(0, 5).map(el => `${name(el)}（${css(el).overscrollBehaviorY}）`).join('，')}${popupNote}` : `✓ 回弹：html、body 和页面里的滚动区都是 none（触控板手感没实测）${popupNote}`);

    // 2. 横向溢出：整页不该横向滚；滚动区里的横向滚动列出来自己判断。
    const pageWide = doc.documentElement.scrollWidth > doc.documentElement.clientWidth + 1;
    const wide = scrollers.filter(el => el.scrollWidth > el.clientWidth + 1);
    out.push(pageWide ? `✗ 横向溢出：整页宽 ${doc.documentElement.scrollWidth}，窗口 ${doc.documentElement.clientWidth}` : wide.length ? `△ 横向溢出：整页没有；${wide.length} 个区域能横向滚：${wide.slice(0, 3).map(name).join('，')}` : '✓ 横向溢出：没有');

    // 3. 「·」分隔。规矩管的是界面自己拿「·」隔开内容；Fluid .typeset 里排的是文章原文（人名里的间隔号、原站页脚），原文是来源事实、不能改，单列出来不算错
    const dots = [], quoted = [];
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    // 中文的间隔号夹在一个名字中间（「界面新闻·消费」「列夫·托尔斯泰」）是标点，不是分隔；规矩管的是两段内容中间带空格的「 · 」和单独一个「·」
    for (let n; (n = walker.nextNode());) {
      if (!n.textContent.includes('·') || n.parentElement?.closest('script, style, noscript, template')) continue;
      const t = n.textContent.trim();
      if (n.parentElement?.closest('.typeset')) quoted.push(t.slice(0, 20));
      else if (t === '·' || /\s·|·\s/.test(n.textContent)) dots.push(t.slice(0, 20));
    }
    const quotedNote = quoted.length ? `（另有 ${quoted.length} 处在 .typeset 排的文章原文里，不算）` : '';
    out.push(dots.length ? `✗ 「·」：${dots.length} 处，例：${dots.slice(0, 3).join(' / ')}${quotedNote}` : `✓ 「·」：界面里没有${quotedNote}`);

    // 4. 固定的表头、栏头被滚上来的内容盖住（组件里的 z-index 互相打架时会这样）。
    const covered = [];
    for (const sc of scrollers) {
      const top = sc.scrollTop;
      sc.scrollTop = (sc.scrollHeight - sc.clientHeight) / 2;
      await frame();
      // 只往左右冻结的格子（表格冻结的第一列）滚到顶上冻结的表头底下，本来就该被表头盖住，不算
      const frozenBy = el => { for (let e = el; e && e !== sc; e = e.parentElement) if (css(e).position === 'sticky') return e; return null; };
      const atTop = el => css(el).top !== 'auto';
      for (const st of [...sc.querySelectorAll('*')].filter(el => css(el).position === 'sticky')) {
        const r = st.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        for (let x = r.left + 4; x < r.right; x += 8) {
          const hit = doc.elementFromPoint(x, r.top + r.height / 2);
          if (!hit || hit === sc || st.contains(hit) || !sc.contains(hit) || paintsNothing(hit)) continue;
          const over = frozenBy(hit);
          if (over && !atTop(st) && atTop(over)) continue;
          covered.push(`${name(st)} 被 ${name(hit)} 盖住`); break;
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
    // 现查，不用开头存下的 all：上面第 4 项把滚动区滚到中间再滚回来，虚拟列表会把行换成新节点
    const marked = [...doc.querySelectorAll('[data-selected],[aria-pressed="true"],[aria-current]:not([aria-current="false"]),[aria-selected="true"]')].filter(el => el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && (!modal || modal.contains(el)));
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
        // 浏览器插件往 body 里塞的空壳（0×0、内容在封闭的 shadow 里）会抢走点位，它不是页面的东西、本身也画不出来，不算盖住
        const ghost = hit && hit.parentElement === doc.body && !hit.getBoundingClientRect().width && !hit.getBoundingClientRect().height && !hit.attributes.length;
        // 弹层里行的底色被它所在滚动区自己画的滚动条盖住：Fluid 官网 CommandMenu 一样（滚动条平时透明，指着、滚动时才出来），组件原样不改
        const ownBar = hit && inPopup(el) && hit.closest('[data-orientation="vertical"], [class*="group/scrollbar"]');
        if (hit && !ghost && !ownBar && !paintsNothing(hit) && hit !== el && !el.contains(hit) && !hit.contains(el)) { cut.push(`${name(el)} 被 ${name(hit)} 盖住`); break; }
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
        if (inPopup(el)) break;
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
    // 字也变了（Fluid 卡片选中时标题加粗）底色差 2.5 就够：Fluid 官网卡片演示指着 4% 黑、选中 7% 黑，差 2.8（2026-11-24 实测）
    const apart = (hover, picked, base, only = false) => { const d = Math.abs(lstar(hover) - lstar(picked)), e = Math.abs(lstar(hover) - lstar(base)); return { ok: d >= (only ? 3 : 2.5) && d >= (only ? 2 : 0.8) * e, text: `明度差 ${d.toFixed(1)}，离原本底色 ${e.toFixed(1)}${only ? '，字一样深一样粗' : ''}` }; };
    const translucent = c => over(c, 'rgb(0, 0, 0)') !== over(c, 'rgb(255, 255, 255)');
    // 一项里字最多的那层，看它的字色和字重；指着的规则先贴到这一项上，字色是继承来的也算进去
    // 跳过看不见的字：Fluid 的「幽灵字」是一份隐藏的加粗副本，只占宽度
    const mainText = el => [el, ...el.querySelectorAll('*')].filter(e => e === el || css(e).visibility !== 'hidden').map(e => [e, [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('').length]).sort((a, b) => b[1] - a[1])[0][0];
    const inkOf = (el, rules) => {
      const keep = el.getAttribute('style');
      if (rules) { el.style.setProperty('transition', 'none', 'important'); for (const st of rules) for (let i = 0; i < st.length; i++) el.style.setProperty(st[i], st.getPropertyValue(st[i]), st.getPropertyPriority(st[i])); }
      // 卡片的点击层是一块没字的按钮盖在上面：往上找到带字的那一层再量（Fluid Card 2026-11-24）
      // 往上找时取字号最大的那行（卡片的标题，选中时它变粗；一样大取最前面的），不取最长的灰色说明，也不取标题上面的小标签
      const first = a => [a, ...a.querySelectorAll('*')].filter(e => css(e).visibility !== 'hidden' && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())).sort((x, y) => parseFloat(css(y).fontSize) - parseFloat(css(x).fontSize))[0];
      let t = mainText(el);
      for (let a = el; !t.textContent.trim() && a.parentElement && a.parentElement !== doc.body; a = a.parentElement) t = first(a.parentElement) || t;
      // Fluid 加粗靠字体的 wght 轴（font-variation-settings），font-weight 一直是 400，两样都读
      const s = css(t), wght = /"wght"\s+(\d+(?:\.\d+)?)/.exec(s.fontVariationSettings);
      const v = { color: over(s.color, 'rgb(255, 255, 255)'), weight: wght ? Number(wght[1]) : Number(s.fontWeight) || 400 };
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
    for (const S of [...doc.querySelectorAll(SEL)].filter(el => el.checkVisibility({ opacityProperty: true, visibilityProperty: true }))) {
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
      // Fluid 的悬停底色按 mousemove 的坐标认行，带坐标发，等弹簧走完再量
      move(T, doc.body);
      await new Promise(r => setTimeout(r, 300));
      const tr = T.getBoundingClientRect(), cx = tr.left + tr.width / 2, cy = tr.top + tr.height / 2;
      const M = [...I.parentElement.querySelectorAll('*')].find(el => { const s = css(el), r = el.getBoundingClientRect(); return s.pointerEvents === 'none' && !clear(s.backgroundColor) && Number(s.opacity) > 0.1 && r.height > 8 && r.width >= tr.width * 0.5 && r.left <= cx && cx <= r.right && r.top <= cy && cy <= r.bottom; });
      const sel = looks(P, null);
      const ST = S.matches(ITEM) ? S : S.querySelector(ITEM) || S;
      if (M) {
        const a = apart(over(css(M).backgroundColor, backdrop(M)), sel.bg, backdrop(M), sameInk(inkOf(T, hoverRules(T)), inkOf(ST, null)));
        if (!a.ok) blur.push(`${name(S)} 和指着的 ${name(T)} 底色分不清（${a.text}）`);
        const rm = parseFloat(css(M).borderTopLeftRadius), rp = parseFloat(css(P).borderTopLeftRadius);
        if (Math.abs(rm - rp) > 1) blur.push(`${name(S)} 选中的圆角 ${rp}px、指着的 ${rm}px`);
        // 两块底色挨着不留缝，看着像一大块（2026-11-24 资讯订阅列表卡片、演讲嘉宾名单各犯一次；Fluid CardGroup 用 separated 隔开 8px）
        const mr = M.getBoundingClientRect(), pr = P.getBoundingClientRect();
        const gx = Math.max(mr.left - pr.right, pr.left - mr.right), gy = Math.max(mr.top - pr.bottom, pr.top - mr.bottom);
        const gap = Math.max(gx, gy);
        if (gap < 2) blur.push(`${name(S)} 选中的底色和指着旁边一项的底色贴在一起（间隙 ${Math.max(0, Math.round(gap))}px）`);
      } else {
        const hov = looks(C, hoverRules(C)), still = looks(C, null);
        const a = apart(hov.bg, sel.bg, still.bg, sameInk(inkOf(C, hoverRules(C)), inkOf(ST, null)));
        const score = Math.max(Math.round((levels(hov.border, sel.border) * Math.min(1, hov.width, sel.width)) / 4), Math.abs(hov.width - sel.width) >= 1 || Math.abs(hov.ring - sel.ring) >= 1 ? 6 : 0) + (hov.shadow !== sel.shadow ? 2 : 0);
        if (!a.ok && score < 6) blur.push(`${name(S)} 选中的样子和指着别的项时差不多（底色${a.text}，边框和阴影 ${score} 分）`);
      }
      T.dispatchEvent(new win.MouseEvent('mouseout', { bubbles: true, relatedTarget: doc.body }));
      I.parentElement.dispatchEvent(new win.MouseEvent('mouseleave', { bubbles: false }));
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

    // 10. 字的上下被裁：Fluid 把一行收到大写字母那么高（text-box-trim），外面再套一层 overflow hidden、clip（比如 truncate），
    // 汉字高出、低于那条线的笔画就被切掉，「营」看着像「宫」（2026-11-24 资讯订阅热点页、电脑端群发工具执行记录各犯一次）。
    // 字框比裁切框多出字号的 15% 以上才算：行高写成 1 的字，字框本来就比字形高一点。整行藏起来的（line-clamp 后面几行）不算。
    const sliced = [];
    let lines = 0;
    const texts = doc.createTreeWalker(doc.body, win.NodeFilter.SHOW_TEXT);
    for (let n; (n = texts.nextNode());) {
      const el = n.parentElement;
      if (!n.textContent.trim() || !el || !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
      let a = el;
      for (; a && a !== doc.documentElement; a = a.parentElement) {
        const o = css(a).overflowY;
        if (o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll') break;
      }
      if (!a || a === doc.documentElement || /(auto|scroll)/.test(css(a).overflowY)) continue;
      // 只给读屏读的字（sr-only：收成 1px、整块裁掉，比如表格里开关的「取消订阅 某某」）本来就看不见，不算
      const srOnly = e => { const r = e.getBoundingClientRect(), c = css(e); return (r.width <= 1 && r.height <= 1) || c.clip === 'rect(0px, 0px, 0px, 0px)' || c.clipPath === 'inset(50%)'; };
      if (srOnly(a) || srOnly(el)) continue;
      const box = a.getBoundingClientRect(), m = parseFloat(css(a).overflowClipMargin) || 0, size = parseFloat(css(el).fontSize) || 14;
      const range = doc.createRange();
      range.selectNodeContents(n);
      for (const r of range.getClientRects()) {
        if (r.width < 1 || r.bottom <= box.top || r.top >= box.bottom) continue;
        lines++;
        const off = Math.max(box.top - m - r.top, r.bottom - box.bottom - m);
        if (off > size * 0.15 + 1) { sliced.push(`${name(el)}「${n.textContent.trim().slice(0, 12)}」上下被 ${name(a)} 裁掉 ${Math.round(off)}px`); break; }
      }
    }
    out.push(sliced.length ? `✗ 字的上下被裁：${sliced.length} 处，例：${sliced.slice(0, 3).join('；')}` : `✓ 字的上下：${lines} 行裁切框里的字都完整`);

    // 11. 滚动条压内容（2026-09-29、2026-11-24 资讯订阅列表各挨骂一次，同日演讲嘉宾名单又犯）：Mac 的滚动条、Fluid ScrollArea 自己画的滚动条都浮在内容上，
    // 指着时变宽。列表里每一行（卡片、列表项、整行按钮）的右边都要让出滚动条的轨道：自己画的量轨道宽，原生浮动的按 12px 算。占位的经典滚动条不压内容，不查。
    const pressed = [];
    let rowsSeen = 0;
    for (const sc of scrollers) {
      if (!/(auto|scroll)/.test(css(sc).overflowY) || sc.scrollHeight <= sc.clientHeight + 1 || sc.offsetWidth - sc.clientWidth > 2) continue;
      const vr = sc.getBoundingClientRect();
      const strips = [...(sc.parentElement?.querySelectorAll('*') ?? [])].filter(t => !sc.contains(t) && (() => { const q = t.getBoundingClientRect(); return q.width > 0 && q.width < 24 && q.height > 40 && Math.abs(q.right - vr.right) < 2; })());
      const track = strips.length ? Math.max(...strips.map(t => t.getBoundingClientRect().width)) : 12;
      const rows = [...sc.querySelectorAll('[data-slot="card"], [data-fluid-hover-index], li, [role="option"], [role="row"], [role="treeitem"], button, a[href]')]
        .filter(el => { const r = el.getBoundingClientRect(); return r.width > vr.width * 0.5 && r.bottom > vr.top && r.top < vr.bottom && el.checkVisibility({ opacityProperty: true, visibilityProperty: true }); });
      rowsSeen += rows.length;
      // 弹层里的行：底色照 Fluid 原样伸进轨道，查行里的字和图标让没让出轨道
      const edge = el => inPopup(sc) ? Math.max(el.getBoundingClientRect().left, ...[...el.querySelectorAll('*')].filter(e => !e.children.length && e.getBoundingClientRect().width).map(e => e.getBoundingClientRect().right)) : el.getBoundingClientRect().right;
      const worst = rows.reduce((m, el) => (edge(el) > m.right ? { right: edge(el) } : m), { right: -Infinity });
      const lap = worst.right - (vr.right - track);
      if (lap > 0.5) pressed.push(`${name(sc)} 里的行伸进滚动条 ${Math.round(lap)}px（轨道 ${Math.round(track)}px 宽，行的右边离滚动区右边只有 ${Math.round(vr.right - worst.right)}px）`);
    }
    out.push(pressed.length ? `✗ 滚动条压内容：${pressed.slice(0, 3).join('；')}` : `✓ 滚动条压内容：${rowsSeen} 行都让出了滚动条`);

    // 12. 同一排的图标钮一样大（2026-11-24 资讯订阅栏头：侧栏开关 36、旁边的筛选、复制链接 28）。只看栏头、工具条这种横排，列表行里的行尾钮不算。
    // 只有图标没有字的按钮，按中线同高（差 4px 以内）归成一排，一排里高或图标大小不一样就算。带字的按钮高和它们不一样的列出来人眼看。
    const visible = el => el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && el.getBoundingClientRect().width > 0;
    const inRow = el => el.closest('li, [role="row"], [role="option"], [role="treeitem"], [data-slot="card"], table, [data-sidebar="menu-item"], [data-sidebar="menu-sub-item"]');
    const label = el => [...el.childNodes].map(n => (n.nodeType === 3 ? n.textContent : n.nodeType === 1 && !n.matches('svg, [class*="sr-only"]') ? n.textContent : '')).join('').trim();
    const controls = [...doc.querySelectorAll('button, [role="button"], [role="combobox"], a[href]')].filter(el => visible(el) && !inRow(el));
    const bands = [];
    for (const el of controls) {
      const r = el.getBoundingClientRect(), y = r.top + r.height / 2;
      const band = bands.find(b => Math.abs(b.y - y) <= 4) || (bands.push({ y, items: [] }), bands.at(-1));
      band.items.push(el);
    }
    const uneven = [], loose = [];
    for (const b of bands) {
      const icons = b.items.filter(el => el.querySelector('svg') && !label(el));
      if (icons.length < 2) continue;
      const hs = new Set(icons.map(el => Math.round(el.getBoundingClientRect().height)));
      const gs = new Set(icons.map(el => Math.round(el.querySelector('svg').getBoundingClientRect().width)));
      if (hs.size > 1 || gs.size > 1) uneven.push(`中线 y≈${Math.round(b.y)} 的一排：${icons.map(el => `${el.getAttribute('aria-label') || name(el)} ${Math.round(el.getBoundingClientRect().height)}/${Math.round(el.querySelector('svg').getBoundingClientRect().width)}`).join('，')}`);
      const ih = Math.max(...hs);
      for (const el of b.items.filter(e => label(e) && e.tagName !== 'A' && Math.abs(e.getBoundingClientRect().height - ih) > 1)) loose.push(`「${label(el).slice(0, 10)}」${Math.round(el.getBoundingClientRect().height)}（图标钮 ${ih}）`);
    }
    out.push(uneven.length ? `✗ 同一排图标钮大小不一（钮高/图标宽）：${uneven.slice(0, 3).join('；')}` : `✓ 同一排图标钮：${bands.filter(b => b.items.length > 1).length} 排都一样大`);
    if (loose.length) out.push(`△ 同一排里带字的按钮和图标钮不一样高，人眼看是不是该一样：${loose.slice(0, 4).join('，')}`);

    // 13. 行尾操作平时藏着（2026-11-24 资讯订阅左栏渠道行的「＋」一直露着）：Fluid 侧栏的 SidebarMenuAction 要写 showOnHover，指着那一行才出。
    // 真要常驻的，在检查记录里写清为什么。手机宽度（Fluid 侧栏 768 以下变抽屉）和没有指针悬停的设备照 shadcn 侧栏原版一直露着，不算。
    const touch = doc.documentElement.clientWidth < 768 || win.matchMedia('(hover: none)').matches;
    const resting = touch ? [] : [...doc.querySelectorAll('[data-sidebar="menu-action"]')].filter(el => visible(el) && !el.closest('[data-sidebar="menu-item"], [data-sidebar="menu-sub-item"]')?.matches(':hover, :focus-within') && Number(css(el).opacity) > 0.5 && !el.hasAttribute('data-show-on-hover'));
    out.push(touch ? '✓ 行尾操作：手机宽度，照 Fluid 原版一直露着，不查' : resting.length ? `✗ 行尾操作一直露着：${resting.length} 个，例：${resting.slice(0, 3).map(el => el.getAttribute('aria-label') || name(el)).join('，')}（侧栏写 showOnHover）` : '✓ 行尾操作：没有一直露着的');

    // 14. 提示框挂在侧栏行的按钮上（2026-11-24 资讯订阅右栏「其他报道」）：Fluid 侧栏见到行按钮带 data-popup-open 就当成弹出菜单开着，
    // 提示一开整个侧栏的悬停底色都冻在原地，指针移到别的行，底色和深色字还留在上一行。提示挂到整行（SidebarMenuItem）上；行尾操作的提示是 Fluid 自己的做法，不算。
    const tipped = [...doc.querySelectorAll('[data-sidebar="menu-button"], [data-sidebar="menu-sub-button"]')].filter(el => el.hasAttribute('data-base-ui-tooltip-trigger') || /^(delayed|instant)-open$|^closed$/.test(el.getAttribute('data-state') || '') && el.matches('[data-slot="tooltip-trigger"]'));
    out.push(tipped.length ? `✗ 提示挂在侧栏行的按钮上：${tipped.length} 行，例：${tipped.slice(0, 3).map(el => label(el).slice(0, 12) || name(el)).join('，')}（提示一开整栏悬停冻住，挂到 SidebarMenuItem 上）` : '✓ 侧栏行的提示：没有挂在行按钮上的');

    // 15. 时间被省略号截掉（2026-11-24 资讯订阅搜索面板「小食代 2026年11…」、热点报道行长日期压住标题）：行尾的时间、日期要按自己的宽度占位（shrink-0），
    // 截的是标题、来源名。打了省略号、字没放下，而且字的结尾是时间或日期的，都算。
    const DATE_END = /(\d{4}年\d{1,2}月\d{1,2}日|\d{1,2}月\d{1,2}日|\d{1,2}:\d{2}|昨天|前天)(周[一二三四五六日])?$/;
    const cutTimes = [...doc.querySelectorAll('*')].filter(el => visible(el) && css(el).textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 1 && DATE_END.test(el.textContent.trim()));
    out.push(cutTimes.length ? `✗ 时间被省略号截掉：${cutTimes.length} 处，例：${cutTimes.slice(0, 3).map(el => `「${el.textContent.trim().slice(-14)}」`).join('，')}（时间单拎出来 shrink-0，截前面的标题、来源）` : '✓ 时间：没有被省略号截掉的');

    // 16. 骨架和真内容不一样大（2026-11-24 资讯订阅热点展开：三条骨架叠在一格里成了一行，报道到了下面的事件一帧跳 146px；右栏「其他报道」骨架少了行距，跳 5px）：
    // 照 Fluid reveal 的 reveal-swap，一格里只放一块骨架、一块真内容，叠在一起；骨架照真内容的行数、行高、行距做。骨架比真内容高会在下面留白。
    // 同一帧整块换掉、数据到了一帧跳，这里看不出来，用 tools/frame-jump.js 逐帧看。
    const swaps = [...doc.querySelectorAll('.reveal-swap')].filter(el => el.getBoundingClientRect().width > 0);
    const crowded = swaps.filter(el => el.children.length > 2);
    const skelOf = el => [...el.children].find(c => c.getAttribute('aria-hidden') === 'true' || c.matches('[data-slot="skeleton"], [data-sidebar="menu-skeleton"]'));
    const tall = swaps.filter(el => el.children.length === 2 && skelOf(el)).map(el => { const sk = skelOf(el), real = [...el.children].find(c => c !== sk); return [el, Math.round(sk.getBoundingClientRect().height - real.getBoundingClientRect().height)]; }).filter(([, d]) => d > 2);
    out.push(crowded.length ? `✗ 骨架叠成一格：${crowded.length} 处 reveal-swap 里放了 ${crowded[0].children.length} 块（一格只放一块骨架、一块真内容，多行骨架先包成一块）` : tall.length ? `✗ 骨架比真内容高：${tall.length} 处，例：${tall.slice(0, 3).map(([el, d]) => `${name(el)} 高出 ${d}px`).join('，')}（骨架照真内容的行数、行高、行距做）` : `✓ 骨架：${swaps.length} 处 reveal-swap，没有叠成一格或比真内容高的`);

    // 17. 表格行被格子里的控件撑高（2026-11-24 资讯订阅后台来源表：「订阅」开关 36 高、头像 24 高把每行撑到 53，Fluid 表格的骨架行是 37，数据一到整表一帧跳 800px）：
    // 照 Fluid DataTable 的选择框格，高过一行字的控件、头像、徽标用负的上下外边距伸进格子的留白，不撑行。整行每格都只有一行字、行却比「上下留白 + 一行字」高的，算被撑高。
    const textLines = td => { const tops = new Set(); const w = doc.createTreeWalker(td, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { if (!n.textContent.trim()) continue; const r = doc.createRange(); r.selectNodeContents(n); for (const rc of r.getClientRects()) if (rc.height) tops.add(Math.round(rc.top / 6)); } return tops.size; };
    const stretched = [];
    for (const table of doc.querySelectorAll('table')) {
      if (!visible(table)) continue;
      const tr = [...table.querySelectorAll('tbody tr')].find(r => r.getAttribute('aria-hidden') !== 'true' && r.children.length > 1);
      if (!tr) continue;
      const cells = [...tr.children];
      if (cells.some(td => textLines(td) > 1)) continue;
      const c = css(cells[0]);
      const one = parseFloat(c.paddingTop) + parseFloat(c.paddingBottom) + (parseFloat(c.lineHeight) || 20) + parseFloat(c.borderTopWidth) + parseFloat(c.borderBottomWidth);
      const h = tr.getBoundingClientRect().height;
      if (h > one + 2) stretched.push(`${name(table)} 每行 ${Math.round(h)}px（一行字该是 ${Math.round(one)}）`);
    }
    out.push(stretched.length ? `✗ 表格行被控件撑高：${stretched.join('，')}（开关、头像、徽标用负的上下外边距伸进格子留白，照 Fluid 表格的选择框格）` : '✓ 表格行高：没有被格子里的控件撑高的');

    // 18. 截断的字指上去看不到全文（2026-11-24 资讯订阅独立审查：右栏目录、热点事件行、报道子行打了省略号，指上去什么都不出）：
    // 设计总纲《文字排版》「电脑上悬停能看到全文」。打了省略号、字没放下的，往上几层要有提示（Fluid Tooltip 的触发元素）。
    const cutNoTip = [...doc.querySelectorAll('*')].filter(el => visible(el) && css(el).visibility !== 'hidden' && css(el).textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 1 && el.textContent.trim() && !el.closest('[data-base-ui-tooltip-trigger], [data-state][data-slot="tooltip-trigger"], [title], [aria-describedby]'));
    out.push(cutNoTip.length ? `✗ 截断了看不到全文：${cutNoTip.length} 处，例：${cutNoTip.slice(0, 3).map(el => `「${el.textContent.trim().slice(0, 12)}…」`).join('，')}（被截断时挂 Fluid Tooltip 写出全文，照 Fluid 面包屑：截了才出）` : '✓ 截断：打了省略号的都能指上去看全文');

    // 19. 浮层压在滚动条上（2026-11-24 资讯订阅独立审查：正文滚动条的滑块在右栏浮卡底下，x1453–1457，浮卡右边在 1454）：
    // 会滚的区域右边那条轨道（10px）上，不能被不属于它的东西盖住；浮在上面的卡片离右边至少让出轨道。
    // 浏览器插件挂在页面上的按钮（沉浸式翻译之类）不算页面的浮层：它们放在 shadow DOM 里，或者 id、class 带插件名
    const fromExtension = el => { for (let e = el; e && e !== doc.body; e = e.parentElement) if (e.shadowRoot || /^(immersive-translate|grammarly|monica|sider)/i.test(e.id || String(e.className))) return true; return false; };
    const trackCovered = [];
    for (const sc of doc.querySelectorAll('*')) {
      const st = css(sc);
      if (!/(auto|scroll)/.test(st.overflowY) || sc.scrollHeight <= sc.clientHeight + 1 || !visible(sc)) continue;
      const r = sc.getBoundingClientRect();
      if (r.height < 80) continue;
      const root = sc.parentElement?.parentElement || sc;
      for (let y = r.top + 20; y < r.bottom - 20; y += 40) {
        const hit = doc.elementFromPoint(r.right - 5, y);
        if (hit && !root.contains(hit) && !hit.contains(sc) && !fromExtension(hit) && !paintsNothing(hit)) { trackCovered.push(`${name(sc)} 的轨道被 ${name(hit)} 盖住（y${Math.round(y)}）`); break; }
      }
    }
    out.push(trackCovered.length ? `✗ 浮层压在滚动条上：${trackCovered.slice(0, 3).join('，')}（浮层离滚动区右边让出轨道）` : '✓ 滚动条轨道：没有被浮层盖住的');

    // 20. 日期被中英文自动留空拆开（2026-11-24 资讯订阅：整页开了 text-autospace，AI 摘要写成「11 月 25 日至 30 日」，公众号正文把「11」「月」「22」「日」各放一个小标签，写成「11月 22 日」）：
    // 设计总纲《文字排版》：中文和英文、数字之间留空，日期和时间不算在内。同一段的字连起来找年月日、几点几分，每一小块所在的元素都得是 text-autospace: no-autospace（或者字里插了不可见连字符 U+2060，那样认不出日期，自然不算）。
    if (CSS.supports('text-autospace', 'normal')) {
      const DATE = /(?<![\d.])(?:\d{4}年(?:\d{1,2}月(?:\d{1,2}日)?)?|\d{1,2}月(?:\d{1,2}日)?|\d{1,2}日(?![元币])|\d{1,2}[点時时](?:\d{1,2}分)?)/g;
      const BLOCK = 'p, div, li, h1, h2, h3, h4, h5, h6, section, blockquote, td, th, figcaption, dd, dt, table, button, a, label';
      const groups = new Map();
      const tw = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
      for (let n = tw.nextNode(); n; n = tw.nextNode()) {
        const p = n.parentElement;
        if (!p || !/\d/.test(n.data) && !/[年月日点時时分]/.test(n.data) || p.closest('script, style, code, pre, input, textarea') || !visible(p)) continue;
        const b = p.closest(BLOCK) || doc.body;
        if (!groups.has(b)) groups.set(b, []);
        groups.get(b).push(n);
      }
      const split = [];
      for (const nodes of groups.values()) {
        const joined = nodes.map(n => n.data).join('');
        for (const m of joined.matchAll(DATE)) {
          let at = 0, spaced = false;
          for (const n of nodes) { const from = at, to = (at += n.data.length); if (m.index < to && m.index + m[0].length > from && css(n.parentElement).textAutospace !== 'no-autospace') spaced = true; }
          if (spaced) split.push(m[0]);
        }
      }
      out.push(split.length ? `✗ 日期被自动留空拆开：${split.length} 处，例：${[...new Set(split)].slice(0, 4).map(t => `「${t}」`).join('，')}（日期包进 time 或 no-autospace 的标签；只收纯文字的组件在数字和字之间插 U+2060）` : '✓ 日期：开着自动留空，没有被拆开的');
    } else out.push('✓ 日期：这个浏览器不支持 text-autospace，不会被拆开');
  }
  return out.join('\n');
})();
