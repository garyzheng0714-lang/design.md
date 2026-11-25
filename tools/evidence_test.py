#!/usr/bin/env python3
"""evidence.py 的回归检查：python3 tools/evidence_test.py，全过打印「过」。

2026-11-25 黄区工作台：自查脚本要零 ✗，逼着把 daisy 原设计里本来就有的 ✗ 改掉，用户叫停「恢复原先的吧，尊重一下他们」。
别人设计里原有、用户定了不改的 ✗，写进「原设计保留」一段点出名字才放过；没点名的、新冒出来的照样拦。
"""
import os
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import evidence  # noqa: E402

RUN = "```\n—— 页面（1470×608）\n✓ 字的上下：3 行裁切框里的字都完整\n✗ 回弹：8 处不是 overscroll-behavior: none\n✗ 带字的按钮没有底色：67 个\n```\n"


def record(kept):
    folder = tempfile.mkdtemp()
    open(os.path.join(folder, "a.png"), "wb").close()
    body = ("# 事（项目，2026-11-25）\n\n## 结果\n\n结果：看板恢复成原来的样子。\n要你做的：没有。\n\n"
            "## 组件对照\n\n| 哪一块 | 组件 | 比过 | 为什么 |\n| --- | --- | --- | --- |\n| 看板 | 原设计 | 没比 | 恢复原样 |\n\n"
            "## 查了什么\n\n### 1. 看板\n\n![改后](a.png)\n标注：和原设计一模一样。\n结论：恢复了。\n\n"
            f"## 自查脚本\n\n{RUN}\n{kept}## 没查什么\n\n- 别的页。\n\n## 审出什么\n\n- 没有。\n")
    open(os.path.join(folder, "记录.md"), "w", encoding="utf-8").write(body)
    return [p for p in evidence.problems(folder, True) if "✗" in p]


assert record("") and "2 条" in record("")[0], record("")
assert record("## 原设计保留\n\n- 回弹：用户定了不改。\n\n") and "1 条" in record("## 原设计保留\n\n- 回弹：用户定了不改。\n\n")[0]
assert record("## 原设计保留\n\n- 回弹、带字的按钮没有底色：用户定了不改。\n\n") == []
assert record("## 没查什么之前\n\n- 回弹、带字的按钮没有底色\n\n"), "别的段落里提到不算"
print("过")
