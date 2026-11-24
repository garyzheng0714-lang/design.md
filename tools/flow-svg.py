#!/usr/bin/env python3
"""把改前、改后的流程画成一张 SVG，放进检查记录，代替成段的字（验收.md「存证」：能画成 SVG 的不写成字）。

  python3 tools/flow-svg.py <说明.json> <输出.svg>

说明.json：{"rows": [{"label": "改前", "steps": [{"text": "按姓名找资料行", "tone": "bad"}, ...]}, ...]}
tone：bad 红（问题）、ok 绿（改好）、省略为灰；text 里用 \\n 换行；一排最多 5 步。
"""
import html
import json
import sys

FONT = 13
PAD, GAP, LABEL, LINE = 16, 30, 52, 18
TONES = {
    None: ("#fafafa", "#d4d4d8", "#27272a"),
    "bad": ("#fef2f2", "#f87171", "#991b1b"),
    "ok": ("#f0fdf4", "#4ade80", "#166534"),
}


def width(s):
    return sum(FONT if ord(c) > 255 else FONT * 0.6 for c in s)


def render(spec):
    rows, y, right = [], PAD, 0
    for row in spec["rows"]:
        lines = [s["text"].split("\n") for s in row["steps"]]
        h = max(len(l) for l in lines) * LINE + 18
        x, out = PAD + LABEL, []
        out.append(f'<text x="{PAD}" y="{y + h / 2 + 4.5}" font-size="{FONT}" font-weight="600" fill="#52525b">{html.escape(row["label"])}</text>')
        for i, (step, ls) in enumerate(zip(row["steps"], lines)):
            fill, stroke, ink = TONES[step.get("tone")]
            w = max(width(l) for l in ls) + 24
            if i:
                out.append(f'<path d="M{x - GAP + 6} {y + h / 2}H{x - 6}m-5 -4l5 4l-5 4" fill="none" stroke="#a1a1aa" stroke-width="1.5"/>')
            out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{fill}" stroke="{stroke}"/>')
            top = y + h / 2 - (len(ls) - 1) * LINE / 2 + 4.5
            for k, l in enumerate(ls):
                out.append(f'<text x="{x + w / 2}" y="{top + k * LINE}" text-anchor="middle" font-size="{FONT}" fill="{ink}">{html.escape(l)}</text>')
            x += w + GAP
        right = max(right, x - GAP)
        rows.extend(out)
        y += h + 16
    W, H = right + PAD, y - 16 + PAD
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" viewBox="0 0 {W:.0f} {H:.0f}" '
            f'font-family="PingFang SC, -apple-system, sans-serif"><rect width="100%" height="100%" fill="#fff"/>'
            + "".join(rows) + "</svg>\n")


if __name__ == "__main__":
    open(sys.argv[2], "w", encoding="utf-8").write(render(json.load(open(sys.argv[1], encoding="utf-8"))))
    print(sys.argv[2])
