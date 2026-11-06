# m · 演讲嘉宾（照 su-design 技能：rules → mockup → build）

## 照做的步骤
1. 定这一屏：策划同学来**推进**某论坛的嘉宾邀请（看进度 → 改状态 / 记联络），做完留在名单上。功能清单 = brief 8 条，没加任何东西（没做批量、导入、排序、筛选器）。
2. Mobbin 先例 3 次搜索、36 张：整页（CRM 联系人表）、部件（浮在表上的详情 + 上下条切换；单元格里改状态）、之后（详情里记笔记）。
   先例拆解：Attio People（侧栏列视图 · 表头吸顶 · 首列冻结 · 右上「New Person」）；Unify Person Details（右侧浮层压在变暗的列表上，头部 ↑↓× 切上一位 / 下一位，Notes 顶上一个输入框、下面一条条）；Tana / Notion（点状态格就地弹出选项、选中带勾）。Twenty、Calendly、HoneyBook、Remote、incident.io 印证。
   共性 → 做法：侧栏切视图 → 论坛放左栏 NavItem，行尾 已确认/计划；名词标题 + 右端主按钮 → PageHeader「乳品创新」+「新增嘉宾」；搜索贴着表 → SearchField 紧贴表头；全宽表、表头吸顶、首列冻结 → Table；详情右侧浮层 + ↑↓ → Drawer，标题行放上一位 / 下一位；状态格点开就改 → DropdownMenu 单选；新建 → Dialog。
3. stageshow 方案图与排练：按测试台要求跳过。
4. 评审 7 条（用在真页面截图上）：①分区、主动作、搜索位置、表格、详情打开方式与共性一致 是；②标题=当前导航项名词、不复述按钮 是；③控件挨着对象（状态在格里、↑↓ 在详情标题行、搜索贴表）是；④并排结构相同（论坛行同构、日志条同构）是；⑤每块对应 @su 组件 是，除了「邀请流程节点」Su 没有步骤条，用 Button+lucide 图标拼；⑥stageshow 的关 跳过；⑦390 宽顺序与可用性 是（表换成 ListItem 实体行，不横滚）。
5–6. 写真页面 + 十问：否的有 ⑥loading 无（本地数据，不涉及）；⑨空搜索有 EmptyState（一句事实 + 清除）；其余是。copy-audit 无输出。

## 没照做 / 偏离及原因
- 进行中黄：Su 的 warning 是近黑，用户原话要黄，流程节点写死 #d99a00 并注明（裁定：用户的话 > Su）。名单里的状态点仍用 Su 的配色。
- 详情遮罩：Su Drawer 自带模糊遮罩（不可配），比 brief「一点阴影」重，没覆盖组件内部样式；点遮罩收回成立。
- 邀请流程节点：Su 缺步骤条组件，就地拼（应补进 Su）。
- 和先例比不如它的：Attio 的状态格是彩色胶囊、对齐更稳；我们 Tag 在 sm 按钮里比同行文字高约 2px。

## 布局（5 行）
- 分区：左栏 256（品牌 + 全部论坛 10/45 + 7 个论坛 已确认/计划）· 主区 Page app（标题 + 新增嘉宾 → 搜索 → 名单铺满、内部滚动）。
- 主次：名单是主物体；进度只在左栏，一眼看全部，当前论坛高亮 + 标题同名。
- 组件：Sidebar/NavItem、PageHeader、SearchField、Table（th sticky、首列 sticky）、DropdownMenu+Tag（状态）、Drawer+Tabs+Input/Select/DatePicker/Textarea（详情）、Dialog+Field（新增，预填论坛、负责人默认我）、ListItem（窄屏）、EmptyState。
- 渐进披露：详情三块用 Tabs；记日志只露一个输入框，聚焦/有字才出日期、方式、「记下」；改状态在格里点开。
- 动效：全用组件自带（Drawer 弹簧滑入、标题换字、表格行增删 layout、菜单进出），页面没写自己的动画。
