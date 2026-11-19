#!/usr/bin/env python3
"""把苹果《人机界面指南》整套原文抓成 Markdown：中文（苹果官方译文）写到 hig/，英文写到 hig/en/。
这是 DESIGN.md 里八条设计原则的出处，备查；DESIGN.md 本身由人写，这个脚本不碰它。

用法：python3 -I hig/sync.py
- 从目录页顺着往下抓全部章节，一章一个文件，文件名用苹果网址里的那一段（layout.md、buttons.md）。
- 逐字核对：苹果数据里的每一段字都必须出现在生成的文件里，少一个字就报错退出，不写半成品。
- 苹果删掉的章，本地对应文件一起删；中文版更新日期落后于英文的章，跑完列出来，那几章以英文为准。

为什么不直接上网页：developer.apple.com 的 HIG 页面是脚本渲染的，普通抓取只拿到空壳；
页面背后的数据在 /tutorials/data/{cn/}design/human-interface-guidelines/<章>.json。
"""
import concurrent.futures
import datetime
import json
import os
import re
import sys
import time
import urllib.request

ROOT = "design/human-interface-guidelines"
DATA = {"cn": "https://developer.apple.com/tutorials/data/cn/", "en": "https://developer.apple.com/tutorials/data/"}
SITE = {"cn": "https://developer.apple.com/cn/", "en": "https://developer.apple.com/"}
ASSETS = "https://developer.apple.com/tutorials"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = {"cn": HERE, "en": os.path.join(HERE, "en")}
CJK_PUNCT = "。，、；：！？）」』"


def fetch(lang, path):
    url = f"{DATA[lang]}{path}.json"
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "hig-sync"})
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except Exception as e:  # 网络抖动：退避重试，第 4 次还不行就让它报出来
            if attempt == 3:
                raise RuntimeError(f"{url}: {e}")
            time.sleep(2 ** attempt)


def slug_of(path):
    return path[len(ROOT) + 1:] if path.startswith(ROOT + "/") else path


def path_of_url(url):
    m = re.match(r"^/(?:cn/)?(design/human-interface-guidelines/[^#?]+)", url or "")
    return m.group(1) if m else None


class Renderer:
    def __init__(self, doc, lang, prefix=""):
        self.doc, self.lang, self.prefix = doc, lang, prefix
        self.refs = doc.get("references", {})

    # ---------- 行内 ----------
    def wrap(self, mark, inner, nxt):
        # 记号里头不能挨着空白，挪到外面；中文里「**提供价值。**最佳」Markdown 认不出粗体，收尾标点也挪到外面。字不变
        core = inner.strip()
        lead, trail = inner[:len(inner) - len(inner.lstrip())], inner[len(inner.rstrip()):]
        if not core:
            return inner
        if core[-1] in CJK_PUNCT and not trail and nxt and not nxt[0].isspace():
            return f"{lead}{mark}{core[:-1]}{mark}{core[-1]}"
        return f"{lead}{mark}{core}{mark}{trail}"

    def para(self, xs):
        # 苹果数据里有的字带换行和缩进，照搬会被 Markdown 当成代码块：只去掉换行两边的空白
        return re.sub(r"[ \t]*\n[ \t]*", "\n", self.inl(xs)).strip()

    def inl(self, xs):
        parts = []
        xs = xs or []
        for i, x in enumerate(xs):
            t = x.get("type")
            if t == "text":
                parts.append(x["text"])
            elif t in ("strong", "emphasis"):
                inner = self.inl(x.get("inlineContent"))
                nxt = self.inl(xs[i + 1:i + 2]) if i + 1 < len(xs) else ""
                parts.append(self.wrap("**" if t == "strong" else "*", inner, nxt))
            elif t == "codeVoice":
                parts.append(f"`{x['code']}`")
            elif t == "reference":
                parts.append(self.ref_link(x))
            elif t == "link":
                parts.append(f"[{x.get('title') or x.get('destination')}]({x.get('destination')})")
            elif t == "image":
                parts.append(self.image(x["identifier"], x.get("metadata")))
            else:  # newTerm、inlineHead、superscript 之类：只取字
                parts.append(self.inl(x.get("inlineContent")))
        return "".join(parts)

    def ref_link(self, x):
        r = self.refs.get(x.get("identifier"), {})
        if x.get("overridingTitleInlineContent"):
            title = self.inl(x["overridingTitleInlineContent"])
        else:
            title = x.get("overridingTitle") or r.get("title") or x.get("identifier", "")
        url = r.get("url", "")
        page = path_of_url(url)
        if page:
            anchor = url.split("#", 1)[1] if "#" in url else ""
            return f"[{title}]({self.prefix}{slug_of(page)}.md{'#' + anchor if anchor else ''})"
        if url.startswith("/"):
            url = SITE[self.lang].rstrip("/") + url if not url.startswith("/cn/") else "https://developer.apple.com" + url
        return f"[{title}]({url})" if url else title

    def image(self, ident, meta=None):
        caption = " ".join(filter(None, [(meta or {}).get("title"), self.inl((meta or {}).get("abstract"))]))
        r = self.refs.get(ident, {})
        vs = r.get("variants", [])
        v = next((v for v in vs if "light" in v.get("traits", [])), vs[0] if vs else {})
        url = v.get("url", "")
        if url.startswith("/"):
            url = ASSETS + url
        img = f"![{r.get('alt') or ''}]({url})"
        return f"{img}\n*{caption}*" if caption else img

    # ---------- 块 ----------
    def blocks(self, bs):
        return "\n\n".join(s for s in (self.block(b) for b in bs or []) if s.strip())

    def indent(self, text, prefix, first):
        lines = text.split("\n")
        return "\n".join((first if i == 0 else (prefix if l else "")) + l for i, l in enumerate(lines))

    def block(self, b):
        t = b.get("type")
        if t == "heading":
            return "#" * b["level"] + " " + b["text"]
        if t in ("paragraph", "small"):
            return self.para(b.get("inlineContent"))
        if t in ("unorderedList", "orderedList"):
            out = []
            for n, it in enumerate(b.get("items", []), 1):
                mark = "- " if t == "unorderedList" else f"{n}. "
                out.append(self.indent(self.blocks(it.get("content")), " " * len(mark), mark))
            return "\n".join(out)
        if t == "aside":
            name = b.get("name") or b.get("style", "")
            body = self.blocks(b.get("content"))
            return "\n".join("> " + l if l else ">" for l in (f"**{name}**\n\n" + body).split("\n"))
        if t == "table":
            rows = [[self.cell(c) for c in r] for r in b.get("rows", [])]
            if not rows:
                return ""
            width = max(len(r) for r in rows)
            rows = [r + [""] * (width - len(r)) for r in rows]
            head = rows[0] if b.get("header") == "row" else [""] * width
            body = rows[1:] if b.get("header") == "row" else rows
            lines = ["| " + " | ".join(head) + " |", "|" + " --- |" * width]
            lines += ["| " + " | ".join(r) + " |" for r in body]
            return "\n".join(lines)
        if t == "row":
            return "\n\n".join(self.blocks(c.get("content")) for c in b.get("columns", []))
        if t == "tabNavigator":
            return "\n\n".join(f"**{tab.get('title')}**\n\n" + self.blocks(tab.get("content")) for tab in b.get("tabs", []))
        if t == "links":
            return "\n".join("- " + self.ref_link({"identifier": i}) for i in b.get("items", []))
        if t == "image":
            return self.image(b.get("identifier"), b.get("metadata"))
        if t == "video":
            r = self.refs.get(b.get("identifier"), {})
            label = r.get("alt") or ("视频" if self.lang == "cn" else "Video")
            vs = r.get("variants", [])
            url = vs[0].get("url", "") if vs else ""
            meta = b.get("metadata") or {}
            caption = " ".join(filter(None, [meta.get("title"), self.inl(meta.get("abstract"))]))
            link = f"[{label}]({ASSETS + url if url.startswith('/') else url})"
            return f"{link}\n*{caption}*" if caption else link
        if t == "codeListing":
            return "```\n" + "\n".join(b.get("code", [])) + "\n```"
        if t == "termList":
            return "\n\n".join(f"**{self.inl(i['term']['inlineContent'])}**\n\n{self.blocks(i['definition']['content'])}" for i in b.get("items", []))
        # 没见过的块：尽量取出里面的字，不丢
        return self.blocks(b.get("content")) or self.inl(b.get("inlineContent"))

    def cell(self, c):
        return self.blocks(c).replace("\n\n", "<br>").replace("\n", "<br>").replace("|", "\\|")

    def page(self, path):
        d = self.doc
        title = d["metadata"].get("title", slug_of(path))
        out = [f"# {title}", f"原文：{SITE[self.lang]}{path}"]
        if d.get("abstract"):
            out.append(self.inl(d["abstract"]))
        for s in d.get("primaryContentSections", []):
            out.append(self.blocks(s.get("content")))
        for s in d.get("topicSections", []):
            if s.get("title"):
                out.append("## " + s["title"])
            out.append("\n".join("- " + self.ref_link({"identifier": i}) for i in s.get("identifiers", [])))
        return "\n\n".join(x for x in out if x.strip()) + "\n"


def texts(doc):
    """苹果数据里所有要给人看的字，用来逐字核对。"""
    refs = doc.get("references", {})
    found = []

    def walk(o):
        if isinstance(o, dict):
            t = o.get("type")
            if t == "text":
                found.append(o["text"])
            elif t == "heading":
                found.append(o["text"])
            elif t == "codeVoice":
                found.append(o["code"])
            elif t in ("image", "video") and refs.get(o.get("identifier"), {}).get("alt"):
                found.append(refs[o["identifier"]]["alt"])
            for k, v in o.items():
                if k != "references":
                    walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)

    walk(doc.get("abstract"))
    walk(doc.get("primaryContentSections"))
    return found


def norm(s):
    return re.sub(r"\s+", " ", s.replace("*", "").replace("\\|", "|").replace("<br>", " ")).strip()


def changelog_date(doc, lang):
    d = doc
    for s in d.get("primaryContentSections", []):
        for b in s.get("content", []):
            if b.get("type") == "table":
                rows = b.get("rows", [])
                if len(rows) > 1 and rows[1] and rows[1][0]:
                    txt = "".join(x.get("text", "") for p in rows[1][0] for x in p.get("inlineContent", []))
                    try:
                        if lang == "en":
                            return datetime.datetime.strptime(txt.strip(), "%B %d, %Y").date()
                        m = re.search(r"(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日", txt)
                        if m:
                            return datetime.date(*map(int, m.groups()))
                    except ValueError:
                        pass
    return None


def crawl():
    order, tree, seen = [], {}, set()
    queue = [ROOT]
    docs = {}
    while queue:
        batch = [p for p in queue if p not in seen]
        queue = []
        seen.update(batch)
        with concurrent.futures.ThreadPoolExecutor(6) as ex:
            futs = {ex.submit(lambda p: (fetch("cn", p), fetch("en", p)), p): p for p in batch}
            for f in concurrent.futures.as_completed(futs):
                docs[futs[f]] = f.result()
        for p in batch:
            order.append(p)
            cn = docs[p][0]
            kids = []
            for s in cn.get("topicSections", []):
                for i in s.get("identifiers", []):
                    child = path_of_url(cn.get("references", {}).get(i, {}).get("url"))
                    if child and child not in seen and child not in kids:
                        kids.append(child)
            tree[p] = kids
            queue += kids
    return order, tree, docs


def main():
    order, tree, docs = crawl()
    slugs = [slug_of(p) for p in order]
    dup = {s for s in slugs if slugs.count(s) > 1}
    if dup:
        sys.exit(f"文件名撞了：{dup}")
    os.makedirs(OUT["en"], exist_ok=True)
    pages, misses, lag = {}, [], []
    for p in order:
        if p == ROOT:
            continue
        for k, lang in enumerate(("cn", "en")):
            doc = docs[p][k]
            md = Renderer(doc, lang).page(p)
            flat = norm(md)
            for t in texts(doc):
                if t.strip() and norm(t) not in flat:
                    misses.append(f"{lang}/{slug_of(p)}: {t[:60]!r}")
            pages[(lang, slug_of(p))] = md
        dcn, den = changelog_date(docs[p][0], "cn"), changelog_date(docs[p][1], "en")
        if den and (not dcn or dcn < den):
            lag.append((slug_of(p), docs[p][0]["metadata"].get("title"), dcn, den))
    if misses:
        print("\n".join(misses[:50]))
        sys.exit(f"逐字核对没过：{len(misses)} 段字没进文件，什么都没写。")
    keep = set()
    for (lang, slug), md in pages.items():
        path = os.path.join(OUT[lang], slug + ".md")
        keep.add(path)
        with open(path, "w", encoding="utf-8") as f:
            f.write(md)
    for lang in OUT:
        for name in os.listdir(OUT[lang]):
            path = os.path.join(OUT[lang], name)
            if name.endswith(".md") and path not in keep:
                os.remove(path)
    for slug, title, dcn, den in lag:
        print(f"中文落后：{title}（hig/{slug}.md），中文{'没有更改日志' if not dcn else f'停在 {dcn}'}，英文 {den} 更新过，以 hig/en/{slug}.md 为准")
    print(f"写好 {len(pages) // 2} 章（中英各一份），逐字核对通过；中文落后英文 {len(lag)} 章。")


if __name__ == "__main__":
    main()
