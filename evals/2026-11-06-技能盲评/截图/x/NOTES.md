# x · 演讲嘉宾工作台

## 照方法做的几步
1. 第 1 步，分析需求：产品类型是内部后台 / 工作台，电脑为主、手机偶尔看；技术栈从项目里认出来是 React + shadcn 式组件（Su）。
2. 第 2 步，`--design-system "CRM admin dashboard productivity" --density 8 --variance 3 --motion 3`：风格给的是 Minimalism & Swiss（适合企业后台），密度高 → 间距 8–32。它给的「Pattern」是营销落地页（Hero / How it works），和这一屏对不上，没用。配色（深色加绿）和 Fira 字体只拿来对照，皮肤还是 Su 的。
3. 第 3 步，按 `--domain ux` 细查：表格放不下（窄屏横向滚动）、行内编辑与校验（失焦时校验、错误贴着字段）、多步进度（要有步骤指示）、搜索没结果（给下一步建议）、手机端表格。`drawer side panel dismiss` 搜不到，换成 `modal escape close` 又只回了焦点环，所以抽屉的规则用的是 quick-reference 里的 `modal-escape` / `escape-routes`，不是检索结果。`--domain chart "progress goal completion"` → 多个指标对目标时，用条 + 数字，不能只靠颜色。
4. 第 4 步，`--stack shadcn "table sheet select"`：数据用 Table，侧边面板用 Sheet（这里是 Su 的 Drawer），选项用 Select。
5. 交付前按 quick-reference §1–§3 和 pro-rules 的检查清单过了一遍：图标都是 lucide、可点的地方都有 cursor-pointer 和键盘焦点环、动画尊重减少动态、颜色之外还有文字或形状、只有一个主按钮、动画只改 transform / opacity、窄屏不出整页横向滚动。

## 没照做的和原因
- 没加 `--persist` 写 MASTER.md：规则只许写自己的页面文件。
- 皮肤没换，配色、字体、间距、圆角用的都是 Su 的。brief 要求流程节点「进行中」是黄色，可 Su 的 warning 是墨色，所以进行中的节点用墨色的 CircleDot，外面再垫一圈 Su 的马克笔黄（`--ds-marker`）。
- 检查清单里要拍 375 宽、横屏、深色，这次只拍了 1440 和 390（测试只要这两个宽度）。
- 没有在 shadcn 风格下加批量操作（检索结果 Bulk Actions），brief 里没有这项。
- 10 个场景都做了，没有空着的。

## 布局决定
- 分区：左栏放「全部论坛」和 7 个分论坛（Sidebar + NavMenu/NavItem，每项带图标和「已确认/计划」数字，满额变绿）；右边是页头加名单。
- 主次：页头的 h1 是当前论坛名，旁边是「已确认 n / 计划」和一根进度条（只用 scaleX 弹簧，满足「切论坛时顶部明显显示」）。右边是搜索（SearchField）和唯一的主按钮「新增嘉宾」。
- 名单：用 Table，表头吸顶、首列冻结（sticky，加 1px 分隔线），一页显示全部。邀请状态挪到第二列，方便手机上第一屏就能看到；状态用行内 Select 直接改。「分论坛」这一列只在「全部」里出现。
- 渐进披露：点一行，Drawer 从右侧浮出（窄屏从底部拉出，可以往下拖关），点遮罩或按 Esc 收回。抽屉顶部是可点的邀请流程，下面依次是基本信息 → 联络日志（「记一条」点开才出表单）→ 联系方式；右上角可以切上一位 / 下一位，也可以按 ↑ ↓。新增也用 Drawer，在哪个论坛下打开就预填哪个论坛。
- 动效：切论坛时名单淡入 0.16s；换嘉宾时抽屉内容淡入；进度条和流程节点颜色有过渡；行的插入和删除用 Table 自带的动画。都可以打断，减少动态时会收掉。
