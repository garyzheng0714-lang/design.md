# 边栏

原文：https://developer.apple.com/cn/design/human-interface-guidelines/sidebars

边栏显示在视图前缘侧，可让用户在 App 区域或顶层内容集合（如文件夹和播放列表）之间导览。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-sidebar-intro@2x.png)

边栏需要大量垂直和水平空间。当空间有限或者你想使用更多屏幕区域显示其他信息或功能时，标签页栏等更紧凑的控制可能会提供更好的导览体验。对于许多 App 而言，你无需为导览选取标签页栏或边栏，而是可以采用同时提供这二者的标签页栏样式。有关指南，请参阅：[标签页栏](tab-bars.md)和[布局](layout.md)。

## 最佳实践

**延伸边栏下方的丰富视觉内容**。在 iOS、iPadOS 和 macOS 中，与工具栏和标签页栏等其他控制一样，边栏可悬浮于内容之上的 [Liquid Glass](materials.md#Liquid-Glass) 层中。若要强化分离感，你可以采用这两种方式之一延伸边栏下方的内容：让边栏水平滚动，或者应用*背景延伸效果*。背景延伸效果会镜像相邻内容，给人一种将内容拉伸到边栏下方的感觉。有关开发者指南，请参阅：[backgroundExtensionEffect()](https://developer.apple.com/cn/documentation/swiftui/view/backgroundextensioneffect())。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sidebars-extend-content-beneath-sidebar-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sidebars-extend-content-beneath-sidebar-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

**尽可能让用户自定义边栏的内容**。边栏可让用户导览至你 App 中的重要区域，因此如果让用户能够决定哪些区域最重要及以什么顺序显示，会有很好的效果。

**如果 App 有大量内容，请使用显示控制给层级分组**。使用[显示控制](disclosure-controls.md)帮助将边栏的垂直空间控制在可管理的范围内。

**考虑使用熟悉的符号来代表边栏中的项目**。[SF 符号](sf-symbols.md)提供了范围广泛的可自定义符号，可用于代表你 App 中的项目。如果需要使用自定义图标，请考虑创建[自定义符号](sf-symbols.md#Custom-symbols)而非使用位图图像。从 [Apple 设计资源](https://developer.apple.com/design/resources/#sf-symbols)下载 SF 符号 App。

**考虑让用户隐藏边栏**。用户有时会想要隐藏边栏，为内容详细信息留出更多空间或减少干扰。尽可能让用户使用其已知的平台特定交互来隐藏和显示边栏。例如，在 iPadOS 中，用户期望使用内建的边缘轻扫手势；在 macOS 中，你可以包括一个显示/隐藏按钮或将“显示边栏”和“隐藏边栏”命令添加到 App 的“显示”菜单中。在 visionOS 中，窗口通常会展开以容纳边栏，因此用户很少需要隐藏边栏。避免默认隐藏边栏，确保它一直可被发现。

**通常在边栏中显示的层级不超过两层**。当数据层级超过两层时，请考虑使用拆分视图界面，即在边栏项目和详细信息视图之间包括一个内容列表。

**如果需要在边栏中包括两层层级，请使用简洁的描述性标签为每个组命名**。为了使标签保持简短，请省略不必要的词。

**确保所选任何边栏图标颜色均有明确用途**。边栏图标默认使用 App 的[强调色](color.md#App-accent-colors)。在 macOS 中，用户可以更改应用于所有 App 的系统强调色。执行此操作时，用户会期望所有边栏图标都以该颜色显示，因此应确保你的边栏图标以用户所选颜色显示。然而，适度使用固定颜色有助于清晰表达图标含义或吸引用户注意。例如，“邮件”中的 VIP 图标使用黄色与其他边栏图标区分开来，从而提供有关其重要性的视觉提示。

## 平台考量因素

*无针对 Apple tvOS 的额外考量因素。在 watchOS 中不受支持。*

### iOS、iPadOS

使用标签页视图的 [sidebarAdaptable](https://developer.apple.com/cn/documentation/swiftui/tabviewstyle/sidebaradaptable) 样式呈现边栏时，你将选取当 App 打开时是显示边栏还是标签页栏。两种变体都包括一个按钮，供用户在两者之间切换。此样式还会在外观上根据平台而适配，并且自动响应旋转和窗口大小调整，从而提供与视图宽度相符的控制版本。

> **开发者注释**
>
> 若要仅显示边栏，请使用 [NavigationSplitView](https://developer.apple.com/cn/documentation/swiftui/navigationsplitview) 在拆分视图的主要面板中呈现边栏，或者使用 [UISplitViewController](https://developer.apple.com/cn/documentation/uikit/uisplitviewcontroller)。

**考虑首先使用标签页栏**。标签页栏为展示内容提供了更多空间，还为在许多 App 的主区域间导览提供了足够的灵活度。相对于适配标签页栏，如果你更需要空出较多区域，则标签页栏的可转换边栏样式外观可让用户访问不常用的内容。有关指南，请参阅[标签页栏](tab-bars.md)。

**按需将正确的外观应用到边栏**。如果不使用 SwiftUI 创建边栏，你可以使用集合视图列表布局的 [UICollectionLayoutListConfiguration.Appearance.sidebar](https://developer.apple.com/cn/documentation/uikit/uicollectionlayoutlistconfiguration-swift.struct/appearance-swift.enum/sidebar) 外观。有关开发者指南，请参阅 [UICollectionLayoutListConfiguration.Appearance](https://developer.apple.com/cn/documentation/uikit/uicollectionlayoutlistconfiguration-swift.struct/appearance-swift.enum)。

### macOS

边栏的行高、文本和图形大小取决于其整体大小，可以是小号、中号或大号。你可通过编程设定大小，但用户也可以通过在“通用”设置中选择不同的边栏图标大小来进行更改。

**考虑在边栏容器窗口调整大小时自动隐藏和显示边栏**。例如，减小“邮件”显示窗口的大小可以自动折叠其边栏，从而为邮件内容留出更多空间。

**避免将关键信息或操作放在边栏底部**。用户在重新放置窗口时，通常会隐藏其底部边缘。

### visionOS

**如果 App 的层级结构较深，考虑在标签页栏的标签页内使用边栏**。在这种情况下，边栏可支持在标签页内进行二级导览。如果使用边栏，请务必防止在边栏中进行的选择操作更改当前打开的标签页。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-sidebar-music@2x.png)

## 资源

#### 相关内容

[拆分视图](split-views.md)

[标签页栏](tab-bars.md)

[布局](layout.md)

#### 开发者文档

[sidebarAdaptable](https://developer.apple.com/cn/documentation/swiftui/tabviewstyle/sidebaradaptable) — SwiftUI

[NavigationSplitView](https://developer.apple.com/cn/documentation/swiftui/navigationsplitview) — SwiftUI

[sidebar](https://developer.apple.com/cn/documentation/swiftui/liststyle/sidebar) — SwiftUI

[UICollectionLayoutListConfiguration](https://developer.apple.com/cn/documentation/uikit/uicollectionlayoutlistconfiguration-swift.struct) — UIKit

[NSSplitViewController](https://developer.apple.com/cn/documentation/appkit/nssplitviewcontroller) — AppKit

#### 视频

- [提升 iPad App 设计](https://developer.apple.com/cn/videos/play/wwdc2025/208)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 6 月 8 日 | 更新了针对边栏图标颜色的指南，以及阐明了针对自适应边栏样式的指南。 |
| 2025 年 6 月 9 日 | 新增了将内容延伸至边栏下方的指南。 |
| 2024 年 8 月 6 日 | 更新了指南以包括 SwiftUI 自适应边栏样式。 |
| 2023 年 12 月 5 日 | 新增了 iPadOS 的插图。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
