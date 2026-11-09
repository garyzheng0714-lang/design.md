# 标签页视图

原文：https://developer.apple.com/cn/design/human-interface-guidelines/tab-views

标签页视图会在同一区域中显示多个互斥的内容面板，用户可以使用标签页控制在这些面板之间进行切换。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-tab-view-intro@2x.png)

## 最佳实践

**使用标签页视图来显示密切相关的内容区域**。标签页视图的外观提供了强烈的围护视觉指示。用户希望每个标签页显示的内容在某种程度上与其他标签页中的内容相似或相关。

**确保面板中的控制只影响同一面板中的内容**。面板互相排斥，因此请确保它们完全独立。

**为每个标签页提供一个描述其面板内容的标签**。好的标签可以帮助用户在点按或轻点面板的标签页之前预测其内容。一般来说，标签页标签应使用名词或名词短语，但在某些环境中动词或动词短语也可能合理。标签页标签应采用标题式大写。

**避免使用弹出式按钮在标签页之间切换**。标签页控制是高效的，因为它只需要点按或轻点一下就可以进行选择，而弹出式按钮则需要两下。标签页控制同时还会在屏幕上显示所有选项，而用户必须点按弹出式按钮才能看到其选项。请注意，当内容面板过多而导致不能合理地通过标签页进行显示时，弹出式按钮可能是一个合理的选择。

**避免在一个标签页视图中提供超过六个标签页**。超过六个标签页可能会让人眼花缭乱并产生布局问题。如果需要呈现六个或更多标签页，请考虑通过另一种方式来实现界面。例如，你可以改为将每个标签页呈现为弹出式按钮菜单中的显示选项。

有关开发者指南，请参阅 [NSTabView](https://developer.apple.com/cn/documentation/appkit/nstabview)。

## 剖析

标签页控制显示在内容区域的顶部边缘。你可以选择隐藏控制，这适合于以编程方式切换面板的 App。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tab-views-top@2x.png)

隐藏标签页控制时，内容区域可以无边框、带外框或者以线条为界。无边框的视图可为纯色或透明。

**一般通过在标签页视图的每边留出窗体区域的外边距来插入标签页视图**。这种布局看起来很整洁，并为与标签页视图内容没有直接关系的其他控制留出了空间。你可以扩展标签页视图以贴合窗口边缘，但这种布局并不常见。

## 平台考量因素

*在 iOS、iPadOS、 Apple tvOS 或 visionOS 中不受支持。*

### iOS、iPadOS

请考虑改用[分段控制](https://developer.apple.com/cn/design/human-interface-guidelines/segmented-controls)实现类似功能。

### watchOS

watchOS 使用[页面控制](https://developer.apple.com/design/human-interface-guidelines/components/presentation/page-controls)显示标签页视图。有关开发者指南，请参阅：[TabView](https://developer.apple.com/cn/documentation/swiftui/tabview)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tab-view-watch-vertical@2x.png)

## 资源

#### 相关内容

[标签页栏](tab-bars.md)

[分段控制](segmented-controls.md)

#### 开发者文档

[TabView](https://developer.apple.com/cn/documentation/swiftui/tabview) — SwiftUI

[NSTabView](https://developer.apple.com/cn/documentation/appkit/nstabview) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 5 日 | 新增在 watchOS 中使用标签页视图的指南。 |
