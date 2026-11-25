#!/usr/bin/env python3
"""检查记录（验收.md「存证」）：说「检查过」之前，截图、过程、标注都要落进一个文件夹。

  evidence.py new <项目文件夹名> <事项>        建记录文件夹（~/Agentic-Engineering/检查记录/<项目>/<时间-事项>/），放好 记录.md 模板，打印路径
  evidence.py add <记录文件夹> <图片> [新文件名]  把截图（Chrome 截图 save_to_disk 给的路径）拷进记录文件夹
  evidence.py check <记录文件夹> [--ui]         核对，不过就列出缺什么、退出码 1；--ui 时至少要有一张截图
  evidence.py build <记录文件夹> [--ui]         核对通过后生成 index.html（给用户在浏览器看）

核对的规矩：最上面「结果」一段写「结果：」「要你做的：」各一句大白话；三段标题齐全（查了什么、没查什么、审出什么）；
看得见的字（代码块、组件对照、自查脚本以外）不放提交号、命令、文件路径和 `代码`，这些放代码块，网页里收起（用户 2026-11-25：「我极度讨厌这种汇报」）；--ui 时要贴自查脚本完整输出且没有 ✗（别人设计里原来就有、用户定了不改的，写进「原设计保留」一段、点出那条的名字才放过；用户 2026-11-25：「恢复原先的吧，尊重一下他们」）；--ui 时还要有「组件对照」一段表格（每块是不是 Fluid、比过哪些、为什么选它）；每一项「### 」都有「结论：」；
每张图文件都在、紧跟着有「标注：」一行写清框出了什么；模板里的占位字一个不剩；至少一张图或一段命令输出；
正文（不算代码块里的命令输出、图片地址和 Markdown 记号）不超过 500 字，能画成 SVG 的不写成字（用户 2026-11-24 定）。
"""
import html
import os
import re
import shutil
import sys
import time

ROOT = os.path.expanduser("~/Agentic-Engineering/检查记录")
RESULT = "## 结果"
SECTIONS = [RESULT, "## 查了什么", "## 没查什么", "## 审出什么"]
OPEN = (RESULT, "## 查了什么")
UI_SECTION = "## 组件对照"
KEPT = "## 原设计保留"
TECH = (UI_SECTION, "## 自查脚本")
JARGON = [
    (re.compile(r"(?<![0-9A-Za-z])(?=[0-9a-f]*[a-f])(?=[0-9a-f]*\d)[0-9a-f]{7,40}(?![0-9A-Za-z])"), "提交号或哈希"),
    (re.compile(r"`"), "代码"),
    (re.compile(r"^\s*\$ "), "命令"),
    (re.compile(r"(?:^|[\s（(：:，])[~/][\w.\-]+/[\w.\-/]+"), "文件路径或接口地址"),
]
PLACEHOLDER = re.compile(r"……|<哪一处>|<写清楚>")
IMG = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)\)")
MAX_WORDS = 500  # 用户 2026-11-24：「你的汇报不允许超过500个字」「能用svg就不用文字」


def words(text):
    """正文字数：去掉代码块（命令原输出是证据，不算汇报）、图片地址、Markdown 记号和空白。"""
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    text = IMG.sub("", text)
    return len(re.sub(r"[\s#|*`>-]", "", text))

TEMPLATE = """# {item}（{project}，{date}）

## 结果

结果：……（一句大白话：成了没有、用户能看到什么变化）
要你做的：……（没有就写「没有」）

## 组件对照

| 哪一块 | 用的 Fluid 组件或区块 | 比过的同类 | 为什么选它（不是 Fluid 的写为什么不换） |
| --- | --- | --- | --- |
| <哪一处> | <写清楚> | <写清楚> | <写清楚> |

## 查了什么、怎么查的

窗口：<写清楚>（宽×高、缩放、滚动条开着没有）；对照的参考：<写清楚>（Fluid 官网哪一页、旧版哪个提交或截图）

### 1. <哪一处>

参考：![参考](01-参考.png)
标注：……
改前：![改前](02-改前.png)
标注：……
改后：![改后](03-改后.png)
标注：……
结论：……

## 自查脚本

每种布局、每个状态（详情开、关）各跑一次 tools/page-check.js，输出原样贴进来，不能有一条 ✗（别人设计里原来就有、用户定了不改的，另起「## 原设计保留」一段点出名字）：

```
<写清楚>
```

## 没查什么

- ……

## 审出什么、改了什么

- ……
"""


def section_text(lines, head):
    """某一段（## 标题）底下到下一段之前的字，没有这段就是空的。"""
    at = next((i for i, line in enumerate(lines) if line.startswith(head)), None)
    if at is None:
        return ""
    body = []
    for line in lines[at + 1:]:
        if line.startswith("## "):
            break
        body.append(line)
    return "\n".join(body)


def new(project, item):
    stamp = time.strftime("%Y%m%d-%H%M")
    safe = re.sub(r"[\\/:\s]+", "-", item).strip("-")
    folder = os.path.join(ROOT, project, f"{stamp}-{safe}")
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, "记录.md")
    if not os.path.exists(path):
        with open(path, "w", encoding="utf-8") as f:
            f.write(TEMPLATE.format(item=item, project=project, date=time.strftime("%Y-%m-%d")))
    print(folder)


def add(folder, src, name=None):
    name = name or os.path.basename(src)
    dst = os.path.join(folder, name)
    shutil.copyfile(src, dst)
    print(dst)


def problems(folder, ui):
    path = os.path.join(folder, "记录.md")
    if not os.path.isfile(path):
        return [f"没有 {path}"]
    text = open(path, encoding="utf-8").read()
    lines = text.splitlines()
    out = []
    for head in SECTIONS:
        if not any(line.startswith(head) for line in lines):
            out.append(f"缺一段「{head[3:]}」")
    for m in PLACEHOLDER.finditer(text):
        out.append(f"模板占位字没填：第 {text[:m.start()].count(chr(10)) + 1} 行「{m.group(0)}」")
    result = next((i for i, line in enumerate(lines) if line.startswith(RESULT)), None)
    if result is not None:
        part = []
        for line in lines[result + 1:]:
            if line.startswith("## "):
                break
            part.append(line.strip())
        for key in ("结果：", "要你做的："):
            if not any(x.startswith(key) and len(x) > len(key) + 1 for x in part):
                out.append(f"「结果」一段缺「{key}」一句大白话")
    section, fenced = "", False
    for i, line in enumerate(lines):
        if line.startswith("```"):
            fenced = not fenced
            continue
        if fenced:
            continue
        if line.startswith("## "):
            section = line
            continue
        if section.startswith(TECH) or line.lstrip().startswith("|"):
            continue
        seen = IMG.sub("", line)
        for pattern, kind in JARGON:
            m = pattern.search(seen)
            if m:
                out.append(f"第 {i + 1} 行看得见的字里有{kind}「{m.group(0).strip()}」：换成大白话，原样的放进代码块（网页里收起）")
                break
    images = 0
    for i, line in enumerate(lines):
        for m in IMG.finditer(line):
            images += 1
            ref = m.group(2)
            if not ref.startswith(("http://", "https://")) and not os.path.isfile(os.path.join(folder, ref)):
                out.append(f"第 {i + 1} 行的图不存在：{ref}")
            after = [x.strip() for x in lines[i + 1:i + 4] if x.strip()]
            note = next((x for x in after if x.startswith("标注：")), None)
            if not note or len(note) < 8:
                out.append(f"第 {i + 1} 行的图下面没有「标注：」写清框出了什么")
    items = [i for i, line in enumerate(lines) if line.startswith("### ")]
    for n, start in enumerate(items):
        end = items[n + 1] if n + 1 < len(items) else len(lines)
        block = lines[start:end]
        if not any(x.strip().startswith("结论：") and len(x.strip()) > 4 for x in block):
            out.append(f"「{lines[start][4:]}」这一项没有「结论：」")
    if not items:
        out.append("一项检查（### 标题）都没有")
    if ui and images == 0:
        out.append("改了界面却一张截图都没有")
    if ui:
        at = next((i for i, line in enumerate(lines) if line.startswith(UI_SECTION)), None)
        if at is None:
            out.append("缺一段「组件对照」（每块是不是 Fluid、比过哪些、为什么选它）")
        else:
            rows = []
            for line in lines[at + 1:]:
                if line.startswith("## "):
                    break
                if line.startswith("|") and not set(line.replace("|", "").strip()) <= set("-: "):
                    rows.append(line)
            if len(rows) < 2:
                out.append("「组件对照」表格里一块都没写")
    if ui:
        blocks = re.findall(r"```[^\n]*\n(.*?)```", text, re.S)
        runs = [b for b in blocks if "字的上下" in b and "—— " in b]
        if not runs:
            out.append("改了界面却没贴自查脚本（tools/page-check.js）的完整输出（要有「—— 页面」开头和「字的上下」那一行）")
        kept = section_text(lines, KEPT)
        bad = [l.strip() for b in blocks for l in b.splitlines() if l.strip().startswith("✗")]
        bad = [l for l in bad if not (kept and l[1:].split("：")[0].strip() in kept)]
        if bad:
            out.append(f"自查脚本还有 {len(bad)} 条 ✗ 没改（原设计就有、用户定了不改的，写进「原设计保留」一段点出名字）：" + "；".join(x[:60] for x in bad[:3]))
    if images == 0 and "```" not in text:
        out.append("既没有截图也没有命令输出，等于没查")
    n = words(text)
    if n > MAX_WORDS:
        out.append(f"正文 {n} 字，超过 {MAX_WORDS} 字：能画成 SVG 的（前后对比、流程、数字）画成图，其余删到只剩结论")
    return out


def check(folder, ui):
    bad = problems(folder, ui)
    if bad:
        print("检查记录不合格：\n- " + "\n- ".join(bad))
        return 1
    print("检查记录合格")
    return 0


def inline(s):
    s = html.escape(s)
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", s)
    return s


def build(folder, ui):
    if check(folder, ui):
        return 1
    text = open(os.path.join(folder, "记录.md"), encoding="utf-8").read()
    body, code, table = [], None, []

    def flush_table():
        if not table:
            return
        cells = lambda row: [c.strip() for c in row.strip().strip("|").split("|")]
        rows = [r for r in table if not re.fullmatch(r"\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*", r.strip())]
        head, rest = rows[0], rows[1:]
        out = "<table><thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in cells(head)) + "</tr></thead><tbody>"
        out += "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in cells(r)) + "</tr>" for r in rest)
        body.append(out + "</tbody></table>")
        table.clear()

    figs, opened, section, raw = [], [False], [""], []

    def flush_raw():
        body.extend(raw)
        raw.clear()

    def flush_figs():
        if figs:
            (raw if section[0].startswith(OPEN) else body).append("<div class=row>" + "".join(figs) + "</div>")
            figs.clear()

    for line in text.splitlines():
        if code is None and line.lstrip().startswith("|"):
            flush_figs()
            table.append(line)
            continue
        flush_table()
        m = IMG.search(line) if code is None else None
        if m:
            label = inline(line[:m.start()].strip().rstrip("：:"))
            src = html.escape(m.group(2))
            figs.append(f"<figure><figcaption>{label}</figcaption><a href=\"{src}\" target=_blank><img src=\"{src}\" alt=\"{html.escape(m.group(1))}\"></a></figure>")
            continue
        if code is None and line.startswith("标注：") and figs:
            figs[-1] = figs[-1].replace("</figure>", f"<p class=note>{inline(line[3:])}</p></figure>")
            continue
        flush_figs()
        if line.startswith("```"):
            if code is None:
                code = []
            else:
                pre = "<pre>" + html.escape("\n".join(code)) + "</pre>"
                if section[0].startswith(OPEN):
                    raw.append(f"<details class=raw><summary>原始输出</summary>{pre}</details>")
                else:
                    body.append(pre)
                code = None
            continue
        if code is not None:
            code.append(line)
            continue
        if line.startswith(("# ", "## ", "### ")):
            flush_raw()
        if line.startswith("### "):
            body.append(f"<h3>{inline(line[4:])}</h3>")
        elif line.startswith("## "):
            if opened[0]:
                body.append("</details>")
                opened[0] = False
            if section[0].startswith(RESULT):
                body.append("</section>")
            section[0] = line
            if line.startswith(RESULT):
                body.append("<section class=result>")
            elif line.startswith(OPEN):
                body.append(f"<h2>{inline(line[3:])}</h2>")
            else:
                body.append(f"<details><summary>{inline(line[3:])}</summary>")
                opened[0] = True
        elif line.startswith(("结果：", "要你做的：")) and section[0].startswith(RESULT):
            key, _, value = line.partition("：")
            body.append(f"<p class={'lead' if key == '结果' else 'todo'}><span>{key}</span>{inline(value)}</p>")
        elif line.startswith("# "):
            body.append(f"<h1>{inline(line[2:])}</h1>")
        elif line.startswith("- "):
            body.append(f"<li>{inline(line[2:])}</li>")
        elif line.startswith("标注："):
            body.append(f"<p class=note>{inline(line[3:])}</p>")
        elif line.startswith("结论："):
            body.append(f"<p class=verdict>{inline(line[3:])}</p>")
            flush_raw()
        elif line.strip():
            body.append(f"<p class=text>{inline(line)}</p>")
    flush_figs()
    flush_table()
    flush_raw()
    if opened[0]:
        body.append("</details>")
    if section[0].startswith(RESULT):
        body.append("</section>")
    page = (
        "<!doctype html><meta charset=utf-8><title>检查记录</title><style>"
        "html,body{overscroll-behavior:none}html{font:15px/1.7 'Inter Variable',Inter,-apple-system,'PingFang SC',sans-serif}"
        "body{max-width:1600px;margin:24px auto;padding:0 24px;color:#111}"
        ".result{background:#f5f5f5;border-radius:12px;padding:16px 20px;margin:16px 0 8px}.result p{margin:4px 0}.result span{color:#737373;margin-right:12px}"
        ".lead{font-size:17px;font-weight:600}.todo{font-size:15px}"
        ".raw{border:0;margin:4px 0 0;padding:0}.raw summary{font-size:12px}"
        "h1{font-size:20px}h2{font-size:16px;margin-top:24px}h3{font-size:15px;margin:28px 0 8px}"
        ".row{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:12px;align-items:start}"
        "figure{margin:0}figcaption{color:#666;font-size:12px;margin-bottom:4px}img{max-width:100%;height:auto;border:1px solid #ddd;border-radius:6px;display:block}"
        ".note{color:#444;font-size:12px;margin:4px 0 0}.verdict{margin:4px 0}h3+.verdict{margin-top:-4px}.text{color:#666;font-size:13px}"
        "details{margin-top:16px;border-top:1px solid #eee;padding-top:8px}summary{cursor:pointer;color:#666}"
        "table{border-collapse:collapse;width:100%;margin:12px 0;font-size:13px}th,td{border:1px solid #ddd;padding:6px 10px;text-align:left;vertical-align:top}th{background:#f6f6f6}"
        "pre{background:#f6f6f6;padding:10px;border-radius:6px;white-space:pre-wrap;font-size:12px}code{background:#f2f2f2;padding:0 4px;border-radius:4px}"
        "</style>" + "\n".join(body)
    )
    out = os.path.join(folder, "index.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(page)
    print(out)
    return 0


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    cmd, args = argv[1], [a for a in argv[2:] if a != "--ui"]
    ui = "--ui" in argv
    if cmd == "new" and len(args) == 2:
        new(*args)
    elif cmd == "add" and len(args) in (2, 3):
        add(*args)
    elif cmd == "check" and len(args) == 1:
        return check(args[0], ui)
    elif cmd == "build" and len(args) == 1:
        return build(args[0], ui)
    else:
        print(__doc__)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
