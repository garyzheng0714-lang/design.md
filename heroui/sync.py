#!/usr/bin/env python3
"""HeroUI 照苹果改的样式：先核对对比度，再把副本写进所有用 HeroUI 的项目。

用法：python3 -I heroui/sync.py
- 找 Agentic-Engineering 下 `@import "@heroui/styles";` 的样式文件。
- 用这些项目装的 HeroUI 默认主题叠上 heroui/apple.css，浅色深色各算一遍字和底色的对比度；
  有一对不到 4.5:1（苹果《无障碍》）就退出，什么都不写。
- 在每个样式文件旁边写 heroui-apple.css，并在 HeroUI 那行后面接 `@import "./heroui-apple.css";`。
- 只改文件不提交：跑完到各仓库看 git diff，再提交推送。
"""

import math
import os
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SOURCE = HERE / "apple.css"
ROOT = HERE.parents[1]
COPY = "heroui-apple.css"
HEROUI_IMPORT = re.compile(r"""^@import\s+["']@heroui/styles["'];\s*$""", re.M)
COPY_IMPORT = f'@import "./{COPY}";'
SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "public", ".venv", "vendor"}
NEED = 4.5

# 字 / 底 / 底下面垫的颜色（底半透明时才用到）
PAIRS = []
for hue in ("accent", "danger", "success", "warning"):
    PAIRS += [
        (f"{hue}-foreground", hue, None),
        (f"{hue}-foreground", f"{hue}-hover", None),
        (f"{hue}-soft-foreground", f"{hue}-soft", "surface"),
        (f"{hue}-soft-foreground", f"{hue}-soft", "background"),
        (hue, "surface", None),
        (hue, "background", None),
        (hue, "overlay", None),
    ]
PAIRS += [
    ("accent-soft-foreground", "default", None),
    ("accent-soft-foreground", "default-hover", None),
    ("default-foreground", "default", None),
    ("field-foreground", "field-background", None),
    ("field-placeholder", "field-background", None),
]
for bg in ("background", "surface", "surface-secondary", "surface-tertiary", "overlay", "default", "field-background"):
    PAIRS += [("foreground", bg, None), ("muted", bg, None)]


# ---------- 读 CSS 变量 ----------

def blocks(css):
    """返回 [(选择器列表, {变量: 值})]，只取最内层、带自定义属性的块。"""
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    out = []
    for sel, body in re.findall(r"([^{};]+)\{([^{}]*)\}", css):
        decls = {}
        for part in body.split(";"):
            m = re.match(r"\s*(--[\w-]+)\s*:\s*(.+)", part, re.S)
            if m:
                decls[m.group(1)] = " ".join(m.group(2).split())
        if decls:
            out.append(([s.strip() for s in sel.split(",")], decls))
    return out


def kind(selectors):
    if any("vibrant" in s for s in selectors):
        return None
    if ".dark" in selectors:
        return "dark"
    if ".light" in selectors:
        return "light"
    if ":root" in selectors:
        return "common"
    return None


def themes(heroui_css, apple_css):
    """按层叠顺序合并：HeroUI 的公共、浅色、深色，再叠我们的浅色、深色。
    html.dark 上 :root 和 .dark 都命中，后写的赢，所以深色要把所有块按出现顺序叠上去。"""
    seq = [(kind(s), d) for s, d in blocks(heroui_css)] + [(kind(s), d) for s, d in blocks(apple_css)]
    light, dark = {}, {}
    for k, d in seq:
        if k in ("common", "light"):
            light.update(d)
        if k in ("common", "light", "dark"):
            dark.update(d)
    return {"浅色": light, "深色": dark}


# ---------- 算颜色 ----------

def split_args(s):
    depth, cur, out = 0, "", []
    for ch in s:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if ch == "," and depth == 0:
            out.append(cur.strip())
            cur = ""
        else:
            cur += ch
    out.append(cur.strip())
    return out


def num(s):
    return float(s[:-1]) / 100 if s.endswith("%") else float(s)


def color(expr, env, depth=0):
    """返回 OKLab (L, a, b, alpha)。"""
    if depth > 30:
        raise ValueError(f"变量绕圈：{expr}")
    expr = expr.strip()
    if expr == "transparent":
        return (0.0, 0.0, 0.0, 0.0)
    m = re.fullmatch(r"var\((--[\w-]+)(?:,\s*(.+))?\)", expr)
    if m:
        name, fallback = m.groups()
        if name in env:
            return color(env[name], env, depth + 1)
        if fallback:
            return color(fallback, env, depth + 1)
        raise KeyError(name)
    m = re.fullmatch(r"oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)\s*\)", expr)
    if m:
        L, C, H = num(m.group(1)), float(m.group(2)), math.radians(float(m.group(3)))
        return (L, C * math.cos(H), C * math.sin(H), 1.0)
    m = re.fullmatch(r"color-mix\(\s*in oklab\s*,(.+)\)", expr)
    if m:
        (c1, p1), (c2, p2) = [mix_arg(a) for a in split_args(m.group(1))]
        if p1 is None and p2 is None:
            p1 = p2 = 50.0
        p1 = 100 - p2 if p1 is None else p1
        p2 = 100 - p1 if p2 is None else p2
        a, b = color(c1, env, depth + 1), color(c2, env, depth + 1)
        w1, w2 = p1 / (p1 + p2), p2 / (p1 + p2)
        alpha = a[3] * w1 + b[3] * w2
        if alpha == 0:
            return (0.0, 0.0, 0.0, 0.0)
        mixed = [(a[i] * a[3] * w1 + b[i] * b[3] * w2) / alpha for i in range(3)]
        return (*mixed, alpha * min(1.0, (p1 + p2) / 100))
    raise ValueError(f"算不了：{expr}")


def mix_arg(s):
    m = re.fullmatch(r"(.+?)\s+([\d.]+)%", s.strip())
    return (m.group(1), float(m.group(2))) if m else (s.strip(), None)


def srgb(c):
    L, a, b, _ = c
    l_, m_, s_ = (L + 0.3963377774 * a + 0.2158037573 * b,
                  L - 0.1055613458 * a - 0.0638541728 * b,
                  L - 0.0894841775 * a - 1.2914855480 * b)
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    lin = (4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
           -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
           -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s)
    return [12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055
            for x in (min(1.0, max(0.0, v)) for v in lin)]


def over(c, under):
    """半透明颜色叠在不透明的 sRGB 底上。"""
    top = srgb(c)
    return [top[i] * c[3] + under[i] * (1 - c[3]) for i in range(3)]


def luminance(rgb):
    r, g, b = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in rgb]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(x, y):
    a, b = sorted((luminance(x), luminance(y)), reverse=True)
    return (a + 0.05) / (b + 0.05)


def check(env):
    """返回 [(比值, 字, 底)]，按比值从小到大。"""
    rows = []
    for text, bg, under in PAIRS:
        try:
            base = srgb(color(f"var(--{under})", env)) if under else None
            b = color(f"var(--{bg})", env)
            if b[3] < 1 and base is None:
                raise ValueError(f"--{bg} 半透明，要给垫底色")
            bg_rgb = over(b, base) if b[3] < 1 else srgb(b)
            t = color(f"var(--{text})", env)
            rows.append((contrast(over(t, bg_rgb), bg_rgb), text, bg + (f"（垫 {under}）" if under else "")))
        except KeyError as e:
            sys.exit(f"HeroUI 主题里没有变量 {e}：HeroUI 改了变量名，先对一下 heroui/sync.py 的 PAIRS")
    return sorted(rows)


# ---------- 找项目、写副本 ----------

def entries():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith(".")]
        for f in filenames:
            if f.endswith(".css") and f != COPY:
                p = Path(dirpath) / f
                if HEROUI_IMPORT.search(p.read_text(encoding="utf-8", errors="ignore")):
                    yield p


def heroui_theme(css_file):
    for d in [css_file.parent, *css_file.parents]:
        f = d / "node_modules/@heroui/styles/dist/themes/default/variables.css"
        if f.exists():
            return f
        if d == ROOT:
            return None


def main():
    apple = SOURCE.read_text(encoding="utf-8")
    files = sorted(entries())
    if not files:
        sys.exit(f"{ROOT} 下没找到 @import \"@heroui/styles\"; 的样式文件")

    seen, missing = {}, []
    for f in files:
        t = heroui_theme(f)
        if t is None:
            missing.append(f)
        else:
            seen.setdefault(t.read_text(encoding="utf-8"), t)
    if not seen:
        sys.exit("这些项目都没装依赖，找不到 HeroUI 主题文件：先到任意一个项目 npm install")

    bad = []
    for heroui_css, path in seen.items():
        for name, env in themes(heroui_css, apple).items():
            rows = check(env)
            low = rows[0]
            print(f"{name}（{path.relative_to(ROOT)}）：{len(rows)} 对，最低 {low[0]:.2f}:1（{low[1]} 字 / {low[2]} 底）")
            bad += [(name, r) for r in rows if r[0] < NEED]
    if bad:
        for name, (r, text, bg) in bad:
            print(f"  ✗ {name} {r:.2f}:1  {text} 字 / {bg} 底")
        sys.exit(f"{len(bad)} 对不到 {NEED}:1，什么都没写。改 heroui/apple.css 再跑。")

    changed = []
    for f in files:
        copy = f.parent / COPY
        if not copy.exists() or copy.read_text(encoding="utf-8") != apple:
            copy.write_text(apple, encoding="utf-8")
            changed.append(copy)
        css = f.read_text(encoding="utf-8")
        if COPY_IMPORT not in css:
            f.write_text(HEROUI_IMPORT.sub(lambda m: m.group(0).rstrip() + "\n" + COPY_IMPORT, css, count=1), encoding="utf-8")
            changed.append(f)

    print(f"对比度全部达标；{len(files)} 个项目接上了，改了 {len(changed)} 个文件：")
    for p in changed:
        print("  " + str(p.relative_to(ROOT)))
    for f in missing:
        print(f"  （{f.relative_to(ROOT)} 没装依赖，没拿它核对）")


if __name__ == "__main__":
    main()
