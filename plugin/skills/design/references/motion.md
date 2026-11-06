# 动画：加动效或改动效

## 0. 先分清范围

动效不改骨架和数据：要挪位置、换组件组合的，先走 [mockup.md](mockup.md)；只调静态外观的，走 [polish.md](polish.md)。重构或打磨途中碰到动效，读完本文件做完这一处，再回原流程。

## 1. 读

- 总纲 §5（动效）和 [layout.md](layout.md) §6：每个动作画面怎么变，以及盲评里扣分的反例（先空再跳、只淡入、toast 复述、新旧叠影、宽度动画推窄名单）。
- HeroUI 组件自带的进出场原样用（CSS 动画，不改时长）；插入、让位、滑入、换字这些它不管的，用 `motion/react`（`AnimatePresence`、`layout`、`layoutId`），参数照 [emil-design-eng](../methods/emil-design-eng/SKILL.md)：进场 ease-out、≤ 300ms、退场更快、弹簧不过冲（`{ type: "spring", duration: 0.3, bounce: 0 }` 一类）、能被打断。切换内容用 `AnimatePresence mode="wait"`（旧的先走、新的再来）。
- GSAP 只在长时间线、跟着滚动走、逐字出现时用（总纲 §9）。
- 方法：先 [custom-motion](../methods/fluid-functionalism/references/custom-motion.md)，再 [emil-design-eng](../methods/emil-design-eng/SKILL.md)。冲突按 [rules.md](rules.md) 的「裁定」。

## 2. 做

- 只用成熟动画库文档里写明的机制（Motion、GSAP、组件库自带的）：不自己写每帧逻辑，不每帧拼样式字符串，布局变化用 layout / FLIP。
- 两个 motion 元素不绑同一个 MotionValue；要一起动就装进同一个定位盒子。
- 每个动效答得出「它让哪个状态变化看得懂」（新内容从哪来、回哪去）；答不出就不加。键盘触发的不做动画，减少动态只留透明度。

## 3. 审，再交

- 按 [review-animations](../methods/review-animations/SKILL.md) 和它的 [STANDARDS.md](../methods/review-animations/STANDARDS.md) 审这次碰到的每个动效：表格 `Before | After | Why`，最后写通过或阻断。
- 静态截图证明不了时序：用 `node <本技能目录>/scripts/shoot.mjs <页面地址> --states <场景.json>` 拍点后 90ms 与 700ms（同时报点后 400ms 画了几帧，≥ 3 帧才算有过渡），或在真实页面录屏；覆盖正常一次、中途打断（动到一半反向）、键盘触发、减少动态。
- 「只审不改」到审完交表为止。
- 汇报写：审查表与结论、录屏、没录到的情形写「未验证」。
