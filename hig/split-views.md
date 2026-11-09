# 拆分视图

原文：https://developer.apple.com/cn/design/human-interface-guidelines/split-views

拆分视图管理多个相邻内容面板的呈现，每个面板均可包含各种组件，包括表格、集合、图像和自定义视图。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-split-view-intro@2x.png)

通常情况下，你可以使用拆分视图一次性显示 App 的多个层级结构并支持在各层级间导览。在此情景中，在视图的主要面板中选择项目会将该项目的内容显示在二级面板中。同样，如果二级面板中的项目包含额外内容，拆分视图可显示三级面板。

拆分视图通常用于显示导览用[边栏](sidebars.md)，其中主面板列出 App 中的顶层项目或集合，二级面板和可选的三级面板可呈现子集合和项目详细信息。在极少数情况下，你还可能使用拆分视图提供用于补充主要视图的功能组，例如，macOS 中的 Keynote 讲演使用拆分视图面板在围绕主幻灯片画布的区域中呈现幻灯片导航器、演讲者注释和检查器面板。

## 最佳实践

**为了支持导航，请持续高亮标记通向详细信息视图的每个面板中的当前选择**。这种选中的外观清晰展示了各个面板中内容之间的关系，并帮助用户保持方向性。

**考虑让用户在面板之间拖放内容**。拆分视图提供了对多个层级结构的访问，因此用户可以将项目拖动到不同的面板，以方便地将内容从 App 的一部分移动到另一部分。有关指南，请参阅[拖放](drag-and-drop.md)。

## 平台考量因素

### iOS

**优先在常规而不是紧凑环境中使用拆分视图**。拆分视图需要水平空间以显示多个面板。在紧凑环境（如竖排方向的 iPhone）中，很难在不换行或截断内容的情况下显示多个面板，而换行或截断会导致内容难以阅读和交互。

### iPadOS

在 iPadOS 中，拆分视图可包括两个垂直面板（例如“邮件”）或三个垂直面板（例如 Keynote 讲演）。

**将狭窄、紧凑和中等窗口宽度考虑在内**。由于 iPad 窗口大小可灵活调整，因此设计时考虑多种宽度的拆分视图布局十分重要。尤其是要确保能够采用合理方式在不同面板之间导览。有关指南，请参阅[布局](layout.md)。有关开发者指南，请参阅 [NavigationSplitView](https://developer.apple.com/cn/documentation/swiftui/navigationsplitview) 和 [UISplitViewController](https://developer.apple.com/cn/documentation/uikit/uisplitviewcontroller)。

### macOS

在 macOS 中，你可以垂直和/或水平排列拆分视图的面板。拆分视图的面板之间包括分隔线，可支持拖移以调整面板大小。有关开发者指南，请参阅：[VSplitView](https://developer.apple.com/cn/documentation/swiftui/vsplitview) 和 [HSplitView](https://developer.apple.com/cn/documentation/swiftui/hsplitview)。

**垂直**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/vertical-split-view@2x.png)

**水平**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/horizontal-split-view@2x.png)

**多种**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/multiple-split-view@2x.png)

**为最小和最大面板大小设定合理的默认值**。如果用户可在你 App 的拆分视图中调整面板的大小，请确保使用保持分隔线可见的大小。如果面板变得太小，分隔线可能会看起来消失，导致难以使用。

**考虑在可行时让用户隐藏面板**。例如，如果 App 包括编辑区域，请考虑让用户隐藏其他面板以减少干扰或留出更多编辑空间。在 Keynote 讲演中，用户在想要编辑幻灯片内容时，可以隐藏导航器和演讲者注释面板。

**提供多种方式以显示隐藏的面板**。例如，你可以提供工具栏按钮或菜单命令，包括键盘快捷键，供用户恢复隐藏的面板。

**首选细分隔线样式**。细分隔线宽度为 1 点，为内容提供最大的空间的同时保证用户仍可轻松使用。除非有特殊需求，否则请避免使用较粗的分隔线样式。例如，如果分隔线的两侧都显示使用深色线性元素的表格行，此时使用细分隔线可能难以区分，而较粗的分隔线可能效果更好。有关开发者指南，请参阅 [NSSplitView.DividerStyle](https://developer.apple.com/cn/documentation/appkit/nssplitview/dividerstyle-swift.enum)。

### Apple tvOS

在 Apple tvOS 中，拆分视图非常适合帮助用户过滤内容。当用户在主要面板中选取过滤器类别时，你的 App 可以在二级面板中显示结果。

**选择使面板看起来平衡的拆分视图布局**。拆分视图默认将屏幕宽度的三分之一用于主要面板，三分之二用于二级面板，不过你也可以指定对半布局。

**在拆分视图上方显示单个标题，帮助用户理解整体内容**。用户已经知道如何使用拆分视图来导航和过滤内容；他们不需要描述每个面板所包含内容的标题。

**根据二级面板包含的内容类型选取标题的对齐方式**。具体来说，当二级面板包含内容集合时，请考虑将标题置于窗口的中心。相比之下，如果二级面板包含重要内容的单个主视图，请考虑将标题放在主要视图上方，以便为内容留出更多空间。

### visionOS

**若要显示补充信息，优先使用拆分视图而非新窗口**。拆分视图让用户无需离开当前环境即可便捷访问更多信息，而新窗口可能会使正尝试导览内容或调整其位置的用户感到困惑。打开更多窗口还需要你仔细管理 App 或游戏中视图之间的关系。如果需要请求少量信息或者呈现用户在返回主要任务之前必须完成的简单任务，请使用[表单](sheets.md)。

### watchOS

在 watchOS 中，拆分视图以全屏视图形式显示列表视图或详细信息视图。

**自动显示最相关的详细信息视图**。App 启动时，向用户显示最相关的信息。例如，显示与用户位置、时间或其最近操作有关的信息。

**如果 App 显示多个详细信息页面，则将这些详细信息视图置于垂直[标签页视图](tab-views.md)中**。然后用户即可使用数码表冠在详细信息视图标签页之间滚动。watchOS 还会在数码表冠旁边显示页面指示符，以表示标签页数和当前所选标签页。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/split-view-watch-vertical-tab@2x.png)

## 资源

#### 相关内容

[边栏](sidebars.md)

[标签页栏](tab-bars.md)

[布局](layout.md)

#### 开发者文档

[NavigationSplitView](https://developer.apple.com/cn/documentation/swiftui/navigationsplitview) — SwiftUI

[UISplitViewController](https://developer.apple.com/cn/documentation/uikit/uisplitviewcontroller) — UIKit

[NSSplitViewController](https://developer.apple.com/cn/documentation/appkit/nssplitviewcontroller) — AppKit

#### 视频

- [让你的 UIKit App 更加灵活](https://developer.apple.com/cn/videos/play/wwdc2025/282)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 新增了 iOS 和 iPadOS 平台考量因素。 |
| 2023 年 12 月 5 日 | 新增针对 visionOS 中拆分视图的指南。 |
| 2023 年 6 月 5 日 | 新增针对 watchOS 中拆分视图的指南。 |
