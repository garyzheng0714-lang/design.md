#!/bin/bash
# 把 feel-good-ui 里的两份原文更新到上游最新版：只拷 Markdown 和 LICENSE，不跑上游的任何东西。
# 跑完看 git diff，确认后提交。我们自己写的 SKILL.md 不动。
set -euo pipefail
here="$(cd "$(dirname "$0")/.." && pwd)"
dest="$here/skills/feel-good-ui"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

git clone -q --depth 1 https://github.com/emilkowalski/skills.git "$tmp/emil"
git clone -q --depth 1 https://github.com/jakubkrehel/make-interfaces-feel-better.git "$tmp/jakub"

copy() { # 上游技能文件夹 → 目标子文件夹，SKILL.md 改名 guide.md，免得被当成单独的技能
  local src="$1" name="$2" license="$3"
  rm -rf "$dest/$name"; mkdir -p "$dest/$name"
  (cd "$src" && find . -type f -name '*.md' -not -path './agents/*' \
    -exec sh -c 'mkdir -p "$0/$(dirname "$1")" && cp "$1" "$0/$1"' "$dest/$name" {} \;)
  mv "$dest/$name/SKILL.md" "$dest/$name/guide.md"
  cp "$license" "$dest/$name/LICENSE"
}
copy "$tmp/emil/skills/apple-design" apple-design "$tmp/emil/LICENSE"
copy "$tmp/emil/skills/animation-performance" animation-performance "$tmp/emil/LICENSE"
copy "$tmp/jakub/skills/make-interfaces-feel-better" make-interfaces-feel-better "$tmp/jakub/LICENSE"
sed -i.bak 's#\.\./animation-performance/SKILL\.md#../animation-performance/guide.md#g' "$dest/apple-design/guide.md" && rm "$dest/apple-design/guide.md.bak"

{
  echo "emilkowalski/skills $(git -C "$tmp/emil" log -1 --format='%h %cs')  → apple-design/ animation-performance/"
  echo "jakubkrehel/make-interfaces-feel-better $(git -C "$tmp/jakub" log -1 --format='%h %cs')  → make-interfaces-feel-better/"
} > "$dest/UPSTREAM"

# 子文件夹里不许再有 SKILL.md：有了 Claude Code 或 Codex 会把它当成另一个技能
if find "$dest" -mindepth 2 -name SKILL.md | grep -q .; then echo "子文件夹里还有 SKILL.md" >&2; exit 1; fi
grep -rn 'SKILL\.md' "$dest"/*/ && { echo "原文里还有指向 SKILL.md 的链接" >&2; exit 1; }
echo "已更新：$(cat "$dest/UPSTREAM" | tr '\n' ' ')"
