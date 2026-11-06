# h · HeroUI v3 + 官方智能体技能

## 照方法做的步骤
1. 从头读完 heroui-react 的 SKILL.md：只用 v3 写法（不加 Provider、用复合组件 `Table.Header` / `Drawer.Dialog`、用 `onPress`、语义 variant、主题变量，不写原色）。
2. 技能要求「实现前先取组件文档」：没跑它的 scripts，改用 curl 取它给的 Direct MDX 地址（WebFetch 访问 heroui.com 返回 404，curl 是 200），读了 table、drawer、select、tabs、progress-bar、search-field、list-box、text-field、chip、input 的示例、构成和 API 表。
3. 对照 `node_modules/@heroui/styles` 的组件 CSS（table、list-box-item、drawer、select）确认类名和默认外观，再决定要覆盖什么（比如粘性列、ListBox 选中态的底色）。
4. 写页面 → tsc → shoot 截图迭代 3 轮（修了：首列太窄截断、状态列挪到第 2 列方便手机看、抽屉阴影、状态选取器统一用 secondary）。

## 没照做的地方
- 技能的 scripts/*.mjs 一个没运行（测试规则禁止），文档改用 MDX 地址加本地源码。
- HeroUI 没有步骤条组件：流程节点用普通 button 加主题色（success / warning / default）自己拼。
- 动效：技能说「v3 用 CSS 动画，不用 framer-motion」。抽屉、弹层都用 HeroUI 自带的 CSS 动效；切上一位 / 下一位的内容交叉淡入和日志表单展开用了 motion/react（测试允许），算是偏离技能。

## 布局决定
- 分区：左栏 256px（总进度 + 7 个分论坛，各自「已确认/计划」+ 进度条）；右侧主区是标题行 + 名单；详情从右侧浮出（手机从底部升起）。
- 主次：当前论坛名做 h1（2xl），旁边小字写日期 · 厅 · 已确认数；名单是主体，填满剩下的高度，自己滚动。
- 组件：左栏 ListBox（单选、不能取消）+ ProgressBar；搜索 SearchField；新增 Button primary；名单 Table（表头每格 sticky top、首列 sticky left 148px、显示全部不分页、11 列用原叫法）；邀请状态直接在格子里用 Select 改；详情 Drawer（透明遮罩，名单不变暗、不挤压，点空白收回），里面 TextField / Select / TextArea。
- 渐进披露：日志表单默认收着，点「记一条」才展开（日期默认今天、方式、内容）；新增嘉宾共用这只抽屉、预填当前论坛；搜索跨全部论坛，标题换成「搜索『…』· N 位」。
- 手机：左栏换成标题处的论坛 Select（列表里带 x/y）+ 一条进度条；新增按钮只留图标；表格横向滚动，首列固定。

## 场景
10 个场景都做了并拍出来。S9 用的是按钮选择器（`button[aria-label="新增嘉宾"]`）：按文字点会命中包着搜索框的那个容器。
