#!/usr/bin/env node
// 打包盲评：node /tmp/skill-bench/tools/pack.mjs id1,id2,…  → 随机分配字母，拷 shots / sheet / probe / 源码到 review/entries/<字母>/，对照表写在 review 目录外。
import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync, readFileSync } from "node:fs"
import { randomInt } from "node:crypto"

const ids = process.argv[2].split(",")
const letters = "ABCDEFGHIJ".slice(0, ids.length).split("")
for (let i = letters.length - 1; i > 0; i--) { const j = randomInt(i + 1); [letters[i], letters[j]] = [letters[j], letters[i]] }
const root = "/tmp/skill-bench/review/entries"
rmSync(root, { recursive: true, force: true })
const map = {}
ids.forEach((id, i) => {
  const L = letters[i], dst = `${root}/${L}`
  map[L] = id
  mkdirSync(dst, { recursive: true })
  cpSync(`/tmp/skill-bench/out/${id}/shots`, `${dst}/shots`, { recursive: true })
  cpSync(`/tmp/skill-bench/out/${id}/sheet.png`, `${dst}/sheet.png`)
  // 探针去掉 id
  const probe = JSON.parse(readFileSync(`/tmp/skill-bench/out/${id}/probe.json`, "utf8")); delete probe.id
  writeFileSync(`${dst}/probe.json`, JSON.stringify(probe, null, 2))
  const app = existsSync(`/tmp/skill-bench/app/src/pages/${id}.tsx`) && id !== "h" ? "/tmp/skill-bench/app/src/pages" : "/tmp/skill-bench/hero/src/pages"
  mkdirSync(`${dst}/src`, { recursive: true })
  cpSync(`${app}/${id}.tsx`, `${dst}/src/page.tsx`)
  if (existsSync(`${app}/${id}`)) cpSync(`${app}/${id}`, `${dst}/src/parts`, { recursive: true })
})
writeFileSync("/tmp/skill-bench/.mapping.json", JSON.stringify(map, null, 2))
console.log("打包好", Object.keys(map).sort().join(" "))
