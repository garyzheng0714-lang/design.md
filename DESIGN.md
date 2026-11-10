# 设计总纲

**设计观、设计原则、布局和整体以苹果《人机界面指南》原文为准，一字不落，严格执行；组件的样式和质感以 HeroUI 为准。**

用户 2026-11-10：「我们自己的东西一个不留，全面都按照这个苹果的来」「你要做的就是一字不落的，让他们严格执行」「这个design.md将指导一切设计，负责引领，像是目录一般」「组件，例如圆角啊，样式啊，还是以 HeroUI 为准」「apple design更多指导的是设计观和设计原则上的内容」。

- 怎么用：先读下面的设计原则；再在目录里找到这次要用的章，打开从头读完，逐句照做。
- 原文在 `hig/`：苹果官方简体中文版，一章一个文件；英文原文在 `hig/en/` 同名文件。目录里标了中文版落后的章，那几章以英文为准。
- 网页组件用 HeroUI v3 原样：圆角、颜色、尺寸、阴影这些组件样式以 HeroUI 为准，不为贴近苹果去改，也不写主题覆盖。
- 冲突时：用户当下的话 > 苹果原文。
- 苹果更新了就跑 `python3 -I hig/sync.py`：重抓 `hig/` 和本文标记行以下的部分，逐字核对，少一个字就不写。

<!-- 下面由 hig/sync.py 从苹果原文生成，不手改 -->

## 设计原则

更成功且经久不衰的设计基于对用户如何思考、感受和与世界交互的深刻理解。下述原则体现了这一事实，并构成了贯穿《人机界面指南》的指导基础。这些原则的应用并非千篇一律，而是作为工具助你在实现优秀设计的过程中权衡优先级冲突和作出关键决策。

#### 目标感

**创造有意义的产品。**

设计始于意图。识别对设计受众而言最重要的内容。专注于打磨这些内容，你将会打造出对用户真正有价值的体验。

#### 能动性

**让用户随心所欲地使用。**

界面存在的意义在于帮助用户实现其目标。让用户可以自由操作、了解当下情况，并可轻松从误操作中恢复。

#### 责任感

**以用户最佳利益为核心。**

作品会影响用户的生活。为赢得其信任，优先考虑安全性和隐私，并使产品的用途和意图公开透明。

#### 熟悉感

**基于用户既有认知。**

利用用户已了解的概念可帮助其快速适应。基于既有的现实和数字模式打造体验，并在整个设计应用中保持一致。

#### 灵活

**适应各种不同的情境和需求。**

用户使用软件的方式因人而异。设计之中越认可这一点，用户越能在使用时感受到接纳。留意其他软件的体验，并尽量支持尽可能多的设备、交互类型和视角。

#### 简洁

**清晰直接。**

设计良好的体验中会去除不必要的内容，使每个元素各得其所。逻辑清晰且易于导览的界面有助于更轻松达成目的。

#### 匠心

**重视每一个细节。**

你的设计体现了你的用心程度，展示了你对为用户提供最佳体验的奉献。投入时间才能做好作品。

#### 愉悦感

**融入人文关怀。**

用户会记住产品带来的感受。考虑符合体验的情绪，并力求以令人满意、丰富且具有使用乐趣的形式传达。

全文：[设计原则](hig/design-principles.md)

## 目录

### [入门指南](hig/getting-started.md)

在你支持的各个平台上创造可自在使用的 App 或游戏。

- [设计原则](hig/design-principles.md)：探索指导 Apple 平台设计的基本原则。
- [针对 iOS 设计](hig/designing-for-ios.md)：用户依赖 iPhone 随时随地保持联系、玩游戏、观看媒体、完成各种任务和跟踪个人数据。
- [针对 iPadOS 设计](hig/designing-for-ipados.md)：用户在欣赏媒体、玩游戏、执行细致的生产力任务以及将创意变成现实时，十分看重 iPad 带来的强大性能、移动性和灵活性。
- [针对 macOS 设计](hig/designing-for-macos.md)：用户在执行复杂的生产力任务、观看媒体或内容以及玩游戏时，通常会一次性使用多个 App，这一切都离不开 Mac 所带来的卓越性能、宽屏体验和高度灵活性。（中文版没有更改日志，英文 2026-10-28 更新过，以[英文](hig/en/designing-for-macos.md)为准）
- [针对 Apple tvOS 设计](hig/designing-for-tvos.md)：用户享受 Apple tvOS 在媒体和游戏、健身、教育以及家庭实用 App 中带来的生动内容、沉浸式体验和流畅交互。
- [针对 visionOS 设计](hig/designing-for-visionos.md)：用户佩戴 Apple Vision Pro 时会进入无边际的 3D 空间，在这里他们可以与你的 App 或游戏交互，同时与四周保持联系。
- [针对 watchOS 设计](hig/designing-for-watchos.md)：无论处于静止还是运动状态，用户看一眼 Apple Watch 就知道自己能够访问基本信息和执行简单的即时任务。
- [针对游戏设计](hig/designing-for-games.md)：当用户在 Apple 设备上玩游戏时，他们会沉浸在你所设计的世界中并同时依赖喜爱的平台功能。
- [针对 iPhone Duo 设计](hig/designing-for-iphone-duo.md)：专为 iPhone Duo 设计的 App 应无缝适配双屏，随设备开合提供连贯的使用体验。

### [基础](hig/foundations.md)

了解基础设计元素如何帮助你打造丰富的使用体验。

- [无障碍](hig/accessibility.md)：无障碍用户界面让每个人都能获得极佳的 App 或游戏使用体验。
- [App 图标](hig/app-icons.md)：一个独特、好记的图标可表达你 App 或游戏的用途和个性，还可帮助用户一眼识别你的产品。（中文版停在 2026-06-08，英文 2026-10-28 更新过，以[英文](hig/en/app-icons.md)为准）
- [品牌](hig/branding.md)：App 和游戏通过彰显其独特的品牌标识，让用户一眼即可识别，在平台上得心应手地使用，并拥有一致的使用体验。
- [颜色](hig/color.md)：巧妙地使用颜色可以增强沟通感，体现品牌形象，提供视觉连续性，传达状态和反馈，以及帮助用户理解信息。
- [深色模式](hig/dark-mode.md)：深色模式是一种系统范围的外观设置，使用深色调色盘为低光环境提供舒适的浏览体验。
- [图标](hig/icons.md)：作为图形资源的有效图标能以用户立即理解的方式表达单个概念。
- [图像](hig/images.md)：为了确保插图在所有受支持设备上保持美观，请了解系统如何显示内容，以及如何以适当的缩放系数呈现艺术感。
- [沉浸式体验](hig/immersive-experiences.md)：在 visionOS 中，你可以设计延伸出窗口和视体的 App 和游戏，使用户沉浸在你的内容中。
- [包容性](hig/inclusion.md)：具有包容性的 App 和游戏会将用户放在首位，在表达沟通中以尊重他人作为前提，并以所有用户都能访问和理解的方式呈现内容和功能。
- [布局](hig/layout.md)：适配各种显示尺寸、方向和多任务处理配置的一致布局可帮助用户在其所有设备上理解并享受你的 App 或游戏。
- [材质](hig/materials.md)：材质是指在前景和背景元素间创建景深感、分层感和层次感的视觉效果。
- [动态效果](hig/motion.md)：美观流畅的动态效果赋予界面活力，从而传达状态、提供反馈和指示以及丰富你 App 或游戏的视觉体验。
- [隐私](hig/privacy.md)：隐私保护至关重要：对于所需要的隐私相关数据和资源保持透明和保护用户允许你访问的数据十分重要。
- [从右到左](hig/right-to-left.md)：按需反转界面方向以匹配相关文字的阅读方向，通过这种方式来支持从右到左的语言，如阿拉伯语和希伯来语。
- [SF 符号](hig/sf-symbols.md)：SF 符号提供了数千个风格一致且可配置性高的符号，这些符号可与 San Francisco 系统字体无缝整合且可自动适配所有粗细和字号的文本。
- [空间布局](hig/spatial-layout.md)：空间布局技术帮助你充分利用 Apple Vision Pro 的无边际画布，并以极具吸引力且舒适的方式呈现你的内容。
- [字体排印](hig/typography.md)：你选择的字体排印方式有助于显示清晰易读的文本、传达信息层级结构、传递重要内容，以及宣传你的品牌或风格。
- [编写](hig/writing.md)：你选择的 App 用词是用户体验的重要组成部分。

### [模式](hig/patterns.md)

获取用于支持常见用户操作、任务和体验的设计指南。

- [数据图表化](hig/charting-data.md)：在图表中展示数据可让信息传达更清晰和更具吸引力。
- [协作和共享](hig/collaboration-and-sharing.md)：出色的协作和共享体验简单且响应迅速，可让用户专注于内容的同时与他人进行有效的沟通。
- [拖放](hig/drag-and-drop.md)：用户可以使用拖放将所选照片、文本和其他内容从一个位置拖到另一个位置来移动或复制所选内容。
- [数据输入](hig/entering-data.md)：需要从用户处获取信息时，请设法让用户在不出错的情况下轻松提供信息。
- [反馈](hig/feedback.md)：反馈可帮助用户了解正在进行的操作，发现下一步可执行的操作，理解操作的结果，以及避免错误。
- [文件管理](hig/file-management.md)：部分 App 支持用户期望在整个系统层面管理的文稿和文件。
- [全屏显示](hig/going-full-screen.md)：iPhone、iPad 和 Mac 所提供的全屏幕模式让用户可扩展窗口以填满屏幕，从而隐藏系统控制并提供无干扰的环境。
- [启动](hig/launching.md)：流畅的启动体验可帮助用户立即开始使用 App 或游戏。
- [直播观看 App](hig/live-viewing-apps.md)：设计直播观看 App 时，优先呈现内容并创建有趣、流畅的交互，以促进用户沉浸在直播观看的体验中。
- [加载](hig/loading.md)：最佳的内容加载体验应在用户意识到加载之前完成。
- [管理账户](hig/managing-accounts.md)：账户可成为用户访问其内容和跟踪个人详细信息的便捷方式，只要这种方式不会为体验带来不必要的障碍。
- [管理通知](hig/managing-notifications.md)：通知可向用户提供即时的重要信息，无论设备处于锁定状态或正在使用中。
- [模态化](hig/modality.md)：模态化是一种在单独的专用模式中呈现内容的设计技术，这种模式可阻止与父视图交互且需要进行确切的操作来关闭。
- [多任务处理](hig/multitasking.md)：多任务处理可让用户快速从一个 App 切换到另一个，以在每个 App 中执行任务。
- [提供帮助](hig/offering-help.md)：虽然最高效的体验是易操作且直观的，但你仍可根据需要提供关联帮助。
- [用户引导](hig/onboarding.md)：用户引导可帮助用户快速上手使用 App 或游戏。
- [播放音频](hig/playing-audio.md)：用户期待拥有可随设备上环境的变化而自动调整的丰富音频体验。
- [提供触感反馈](hig/playing-haptics.md)：提供触感反馈可调动用户的触觉，并将对现实世界的熟悉感带入 App 或游戏中。
- [播放视频](hig/playing-video.md)：无论使用 App 还是游戏，用户都期待在设备上享受丰富的视频体验。
- [打印](hig/printing.md)：iOS、iPadOS、macOS 或 visionOS App 可合理整合系统提供的打印功能，并根据需要显示打印机/文稿特定的自定义选项。
- [评分和评论](hig/ratings-and-reviews.md)：用户在下载 App 或游戏前，通常会查看相关评分和评论。
- [搜索](hig/searching.md)：用户使用各种搜索技术查找设备上、App 内和文稿或文件中的内容。
- [设置](hig/settings.md)：用户期望 App 和游戏能够完美运行，同时也希望可自定义使用体验来满足自身需求。
- [撤销和重做](hig/undo-and-redo.md)：撤销和重做可让用户轻松反转多类操作，还可在用户了解新的界面或任务时帮助他们安全探索和试验。
- [体能训练](hig/workouts.md)：出色的体能训练或健身体验可激励用户专注于当前的健身活动并协助其在设备上跟踪自己的进度。

### [组件](hig/components.md)

了解如何使用和自定义系统定义的组件为用户提供熟悉且一致的体验。

- [内容](hig/content.md)
  - [图表](hig/charts.md)：以图表形式组织数据可让信息传达更清晰并更具视觉吸引力。
  - [图像视图](hig/image-views.md)：图像视图在透明或不透明背景上显示单张图像（某些情况下显示图像的动态序列）。
  - [文本视图](hig/text-views.md)：文本视图会显示样式化的多行文本内容，这些内容可否编辑是可选的。
  - [网页视图](hig/web-views.md)：网页视图可直接在你的 App 内加载和显示丰富的网页内容，例如嵌入的 HTML 和网站。
- [布局和组织](hig/layout-and-organization.md)
  - [方框](hig/boxes.md)：方框为在逻辑上相关的信息和组件创建了具有独特视觉特征的分组。
  - [集合](hig/collections.md)：集合管理一组有序的内容，并以可自定义和高度可视化的布局呈现。
  - [分栏视图](hig/column-views.md)：分栏视图也叫做*浏览器*，可让用户使用一系列垂直栏查看和导航数据层级。
  - [显示控制](hig/disclosure-controls.md)：显示控制用于显示和隐藏特定控制或视图相关的信息和功能。
  - [标签](hig/labels.md)：标签是一段可供用户阅读的静态文本，通常可以拷贝，但不能编辑。
  - [列表和表格](hig/lists-and-tables.md)：列表和表格在行中的一列或多列内呈现数据。
  - [联锁](hig/lockups.md)：联锁将多个独立视图组合成为单个交互式单元。
  - [大纲视图](hig/outline-views.md)：大纲视图以滚动的单元格列表形式呈现分层数据，这些单元格按行和列组织。
  - [拆分视图](hig/split-views.md)：拆分视图管理多个相邻内容面板的呈现，每个面板均可包含各种组件，包括表格、集合、图像和自定义视图。
  - [标签页视图](hig/tab-views.md)：标签页视图会在同一区域中显示多个互斥的内容面板，用户可以使用标签页控制在这些面板之间进行切换。
- [菜单和操作](hig/menus-and-actions.md)
  - [活动视图](hig/activity-views.md)：活动视图通常称为*共享表单*，呈现用户在当前环境中可执行的一系列任务。
  - [按钮](hig/buttons.md)：按钮用于发起瞬时操作。
  - [上下文菜单](hig/context-menus.md)：上下文菜单可让用户访问与项目直接相关的功能，并且不会导致界面杂乱。
  - [程序坞菜单](hig/dock-menus.md)：在 Mac 上，用户可以在程序坞中辅助点按 App 或游戏的图标来显示程序坞菜单，其中包括系统提供的项目和自定义项目。
  - [编辑菜单](hig/edit-menus.md)：编辑菜单除了提供“拷贝”、“选择”、“翻译”和“查询”等相关命令，还可让用户在当前视图中对所选内容进行更改。
  - [主屏幕快速操作](hig/home-screen-quick-actions.md)：主屏幕快速操作让用户可从主屏幕执行 App 特定的操作。
  - [菜单](hig/menus.md)：菜单会在与用户与其交互时显示其选项，从而在 App 或游戏中以高效利用空间的方式呈现命令。
  - [挂饰](hig/ornaments.md)：在 visionOS 中，挂饰呈现了与窗口相关的控制和信息，而不会挤占或遮挡窗口内容。
  - [弹出式按钮](hig/pop-up-buttons.md)：弹出式按钮显示互相排斥选项的菜单。
  - [下拉式按钮](hig/pull-down-buttons.md)：下拉式按钮显示与按钮用途直接相关的项目或操作菜单。
  - [菜单栏](hig/the-menu-bar.md)：在 Mac 或 iPad 上，屏幕顶部的菜单栏会显示 App 或游戏中的顶层菜单。
  - [工具栏](hig/toolbars.md)：工具栏可方便地访问常用命令、控制、导览和搜索。
- [导览和搜索](hig/navigation-and-search.md)
  - [路径控制](hig/path-controls.md)：路径控制显示所选文件或文件夹的文件系统路径。
  - [搜索栏](hig/search-fields.md)：搜索栏可让用户按输入的特定词来搜索一系列内容。
  - [边栏](hig/sidebars.md)：边栏显示在视图前缘侧，可让用户在 App 区域或顶层内容集合（如文件夹和播放列表）之间导览。
  - [标签页栏](hig/tab-bars.md)：标签页栏可让用户在 App 的各顶层部分间导航。
  - [令牌栏](hig/token-fields.md)：令牌栏是一种文本栏，可将文本转换为能轻松选择和操作的*令牌*。
- [呈现方式](hig/presentation.md)
  - [操作表单](hig/action-sheets.md)：操作表单是一种模态视图，呈现与用户所发起操作相关的选项。
  - [提醒](hig/alerts.md)：提醒会为用户提供其立即所需的关键信息。
  - [页面控制](hig/page-controls.md)：页面控制显示一行指示符图像，其中每个都代表扁平列表中的一个页面。
  - [面板](hig/panels.md)：在 macOS App 中，面板通常悬浮于其他打开窗口之上，提供与活跃窗口或当前所选内容相关的补充控制、选项或信息。
  - [弹出窗口](hig/popovers.md)：弹出窗口是一种瞬态视图，当用户点按或轻点控制或交互区域时，它会显示在其他内容之上。
  - [滚动视图](hig/scroll-views.md)：滚动视图让用户通过垂直或水平移动内容来查看超出视图边框的内容。
  - [表单](hig/sheets.md)：表单可帮助用户执行与其当前环境密切相关的小范围任务。
  - [窗口](hig/windows.md)：窗口在 App 或游戏中呈现用户界面视图和组件。
- [选择和输入](hig/selection-and-input.md)
  - [颜色池](hig/color-wells.md)：颜色池可让用户调整文本、形状、参考线和其他屏幕元素的颜色。
  - [组合框](hig/combo-boxes.md)：组合框将文本栏和下拉式按钮组合在一个控制中。
  - [数字输入视图](hig/digit-entry-views.md)：数字输入视图填充整个屏幕，并提示用户使用数字专用键盘输入一系列数字，如 PIN 码。
  - [图像池](hig/image-wells.md)：图像池是图像视图的可编辑版本。
  - [选择器](hig/pickers.md)：选择器显示包含不同值的一个或多个可滚动列表供用户从中选择。
  - [分段控制](hig/segmented-controls.md)：分段控制是两个或多个分段组成的线性集，每个分段用作一个按钮。
  - [滑块](hig/sliders.md)：滑块是一个包含称为“滚动块”的控制的水平轨道，可让用户在最小值和最大值之间进行调整。
  - [步进器](hig/steppers.md)：步进器是一个两段式控制，可用于增加或减少增量值。
  - [文本栏](hig/text-fields.md)：文本栏是一个矩形区域，用户可以在其中输入或编辑特定的小段文本。
  - [切换](hig/toggles.md)：切换可以让用户在一对相反的状态（比如开和关）之间进行选择，它会使用不同的外观来指示每个状态。
  - [虚拟键盘](hig/virtual-keyboards.md)：在未配备实体键盘的设备上，系统提供了各种类型的虚拟键盘，供用户用于输入数据。
- [状态](hig/status.md)
  - [健身圆环](hig/activity-rings.md)：健身圆环显示个人在“活动”、“锻炼”和“站立”目标方面的每日进展。
  - [仪表](hig/gauges.md)：仪表显示某个值范围内的特定数值。
  - [进度指示符](hig/progress-indicators.md)：进度指示符告知用户 App 在加载内容或执行长时间操作时未卡死。
  - [评分指示符](hig/rating-indicators.md)：评分指示符使用一系列水平排列的图形符号（默认采用星形）来表示排名高低。
- [系统体验](hig/system-experiences.md)
  - [App 快捷指令](hig/app-shortcuts.md)：App 快捷指令可让用户在整个系统中访问 App 的关键功能或内容。
  - [复杂功能](hig/complications.md)：复杂功能会在表盘上显示及时的相关信息，用户每次抬起手腕都可以看到。
  - [控制](hig/controls.md)：控制可让用户从控制中心、锁屏或操作按钮快速访问 App 功能。
  - [实时活动](hig/live-activities.md)：实时活动可让用户一目了然地跟踪活动、事件或任务的进度。（中文版停在 2025-12-16，英文 2026-10-13 更新过，以[英文](hig/en/live-activities.md)为准）
  - [通知](hig/notifications.md)：通知为用户提供可一目了然的高价值即时信息。
  - [摘要卡片](hig/snippets.md)：当用户通过 Siri 或 App 快捷指令执行任务时，摘要卡片会显示结果或请求确认。
  - [状态栏](hig/status-bars.md)：状态栏出现在屏幕的上边缘，它会显示有关设备当前状态的信息，如时间、蜂窝网络运营商和电池电量。
  - [推荐项目](hig/top-shelf.md)：Apple TV 主屏幕上提供了称为“推荐项目”的区域，该区域以丰富且引人注目的方式展示你的内容，还可让用户在程序坞中访问其喜爱的 App。
  - [表盘](hig/watch-faces.md)：表盘视图是被用户选取用作 watchOS 的主视图。
  - [小组件](hig/widgets.md)：小组件可让用户在其他环境快速访问 App 或游戏中的重要信息和重点交互。（中文版停在 2025-12-16，英文 2026-10-13 更新过，以[英文](hig/en/widgets.md)为准）

### [输入](hig/inputs.md)

了解用户用于控制 App 或游戏和输入数据的不同方式。

- [操作按钮](hig/action-button.md)：操作按钮可让用户在受支持的 iPhone 和 Apple Watch 机型上快速访问喜爱的功能。
- [Apple Pencil 和随手写](hig/apple-pencil-and-scribble.md)：Apple Pencil 除了充当指针和用户界面交互工具，还有助于让涂鸦、手写和标记变得轻松自如。
- [相机控制](hig/camera-control.md)：相机控制可让用户直达体验你 App 中的相机体验。
- [数码旋钮/表冠](hig/digital-crown.md)：数码旋钮/表冠是 Apple Vision Pro 和 Apple Watch 上的重要硬件输入。
- [眼睛](hig/eyes.md)：在 visionOS 中，用户通过注视虚拟对象来将它识别为可交互的目标。
- [聚焦和选择](hig/focus-and-selection.md)：聚焦可帮助用户从视觉上确认其交互的目标对象。
- [游戏控制](hig/game-controls.md)：精确直观的游戏控制会增强可玩性，并可提高玩家在游戏中的沉浸感。
- [手势](hig/gestures.md)：手势是用户用于直接影响设备上 App 或游戏中对象的物理动作。（中文版停在 2024-09-09，英文 2026-10-28 更新过，以[英文](hig/en/gestures.md)为准）
- [陀螺仪和加速计](hig/gyro-and-accelerometer.md)：设备上的陀螺仪和加速计可提供设备在物理世界中运动的相关数据。
- [键盘](hig/keyboards.md)：实体键盘是用于输入文本、玩游戏、控制 App 等任务的基本输入设备。
- [附近交互](hig/nearby-interactions.md)：附近交互支持设备端使用体验整合附近环境中存在的人和物。
- [指针设备](hig/pointing-devices.md)：用户可以使用触控板或鼠标这样的指针设备来导航界面和发起操作。（中文版停在 2023-06-21，英文 2026-10-28 更新过，以[英文](hig/en/pointing-devices.md)为准）
- [遥控器](hig/remotes.md)：Apple TV Remote 是 Apple TV 的主要输入方式，帮助用户在房间各处连接屏幕内容。

### [技术](hig/technologies.md)

探索可以整合到 App 或游戏中的 Apple 技术、功能和服务。

- [隔空播放](hig/airplay.md)：“隔空播放”可让用户以无线方式将 iOS、iPadOS、macOS 和 Apple tvOS 设备中的媒体内容流播放到 Apple TV、HomePod 和支持“隔空播放”的电视及扬声器。
- [全天候显示](hig/always-on.md)：在配备全天候显示屏的设备上，当用户暂停与设备的交互时，系统可以继续显示 App 界面。
- [轻 App](hig/app-clips.md)：轻 App 是 App 或游戏的轻量级版本，提供了立即可用的便捷或演示体验。
- [Apple App 内购买](hig/apple-in-app-purchase.md)：用户可以使用 Apple App 内购买在你的 App 内安全地为高级内容和订阅等数字商品及服务付款。
- [Apple Pay](hig/apple-pay.md)：Apple Pay 是一种安全便捷的付款方式，可针对实物商品和服务、捐款和 App 内订阅以及在任何浏览器中付款。
- [增强现实](hig/augmented-reality.md)：增强现实简称 AR，可将虚拟对象无缝融入真实世界中，为用户带来引人入胜的沉浸式体验。
- [CareKit](hig/carekit.md)：用户可以使用 CareKit App 来管理与糖尿病等慢性病相关的护理计划，进行伤后或术后恢复，或实现健康目标。
- [CarPlay 车载](hig/carplay.md)：CarPlay 车载让用户可以在车载显示屏上获取路线、拨打电话、收发信息、听音乐等，同时还能专注于路况。
- [Game Center](hig/game-center.md)：Game Center 是 Apple 的社交游戏网络，可让玩家跟踪自身游戏进度以及跨 Apple 平台与朋友建立联系，还可提高你的游戏在玩家设备上的曝光度。
- [生成式 AI](hig/generative-ai.md)：生成式 AI 可让你通过动态内容增强你的 App 或游戏，还可提供智能功能，解锁新质创造力、沟通力和生产力。
- [HealthKit](hig/healthkit.md)：HealthKit 是 iOS、iPadOS 和 watchOS 中健康和健身数据的中央储存库。
- [HomeKit](hig/homekit.md)：借助 HomeKit，用户可以使用 Siri 或 iPhone、iPad、Apple Watch 和 Mac 上的“家庭” App，来安全地控制家中所连接的配件。
- [iCloud](hig/icloud.md)：iCloud 这项服务可让用户无需执行显式同步，即可从任何设备无缝访问其关心的内容，例如照片、视频和文稿等。
- [证件校验器](hig/id-verifier.md)：证件校验器可让 iPhone App 当面读取移动证件，而无需使用外部硬件。
- [iMessage 信息 App 和贴纸](hig/imessage-apps-and-stickers.md)：iMessage 信息 App 可以帮助用户在对话中共享内容、协作，甚至与其他人玩游戏；贴纸是用户可以用于装饰对话的图像。
- [实况照片](hig/live-photos.md)：实况照片可让用户在声音和动作丰富的互动体验中捕捉美好瞬间，为传统的静态照片增添活力感。
- [Mac Catalyst](hig/mac-catalyst.md)：使用 Mac Catalyst 创建 iPad App 的 Mac 版本时，可为用户提供在新环境中享受体验的机会。
- [机器学习](hig/machine-learning.md)：机器学习可让 App 和游戏从数据和使用模式中学习，从而让你改善现有体验并打造出具有吸引力的全新体验。
- [地图](hig/maps.md)：地图在 App 中或网站上显示室外或室内地理数据。
- [NFC](hig/nfc.md)：近场通信 (NFC) 允许彼此相距几厘米的设备以无线方式交换信息。
- [照片编辑](hig/photo-editing.md)：照片编辑扩展可让用户应用滤镜或进行其他更改，以在“照片” App 中修改照片和视频。
- [ResearchKit](hig/researchkit.md)：研究 App 让世界各地的用户都能参与重要的医学研究。
- [同播共享](hig/shareplay.md)：通过同播共享，无论身处何地，用户都能一起看电影、玩游戏或在白板上速绘，共享精彩体验。
- [ShazamKit](hig/shazamkit.md)：ShazamKit 通过将音频样本与 ShazamKit 目录或自定义音频目录进行匹配来支持音频识别。
- [通过 Apple 登录](hig/sign-in-with-apple.md)：“通过 Apple 登录”提供了一种快速且私密的方式来登录 App 和网站，为用户提供可信任的一致体验，并省去记住多个账户和密码的麻烦。
- [Siri](hig/siri.md)：用户使用 Siri 协助其查找内容、了解信息或处理日常事务。
- [Tap to Pay on iPhone](hig/tap-to-pay-on-iphone.md)：Tap to Pay on iPhone 允许商家使用其 iPhone 上的 App 接受免接触式付款，而无需连接外接硬件。
- [旁白](hig/voiceover.md)：旁白是一款屏幕朗读器，可让用户无需看向屏幕即可体验 App 的界面。
- [钱包](hig/wallet.md)：“钱包”可帮助用户在 iPhone 和 Apple Watch 上安全地储存信用卡和借记卡、驾照或州证件、交通卡、活动门票和钥匙等。
