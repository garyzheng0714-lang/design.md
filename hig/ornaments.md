# 挂饰

原文：https://developer.apple.com/cn/design/human-interface-guidelines/ornaments

在 visionOS 中，挂饰呈现了与窗口相关的控制和信息，而不会挤占或遮挡窗口内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-ornaments-intro@2x.png)

挂饰悬浮在与其关联窗口平行的平面中，并且沿着 z 轴稍微位于窗口前面。如果关联窗口移动，挂饰也会随之移动，以保持其相对位置不变；如果窗口内容滚动，挂饰中的控制或信息保持不变。

挂饰可以出现在窗口的任何边缘并包含诸如按钮、分段控制等用户界面组件和其他视图。系统使用挂饰来创建和管理[工具栏](toolbars.md)、[标签页栏](tab-bars.md)和视频播放控制等组件；你可以使用挂饰来创建自定义组件。

## 最佳实践

**考虑使用挂饰在不会导致窗口塞满的一致位置来呈现经常需要使用的控制或信息**。因为挂饰紧靠其窗口，所以用户始终知道其位置。例如，“音乐”使用挂饰来提供“播放中”控制，确保这些控制一直处在容易找到的可预测位置。

**一般而言，保持挂饰可见**。当用户深度沉浸在窗口内容中（例如，观看视频或查看照片）时，隐藏挂饰十分合理；但在大多数情况下，用户希望能够持续访问挂饰的控制。

**如果需要显示多个挂饰，应优先考虑窗口的整体视觉平衡**。挂饰有助于突显重要操作，但有时会分散用户对内容的注意力。必要时，考虑限制挂饰的总数量以避免增加窗口的视重和 App 的复杂程度。如果决定移除挂饰，你可以将其元素重新放在主窗口中。

**尽量保持挂饰的宽度小于等于关联窗口的宽度**。如果挂饰比其窗口更宽，则可能会干扰窗口一边的标签页栏或其他垂直内容。

**考虑在挂饰中使用无边框按钮**。挂饰的背景默认为[玻璃](materials.md#visionOS)，因此如果你将按钮直接放在背景上，它可能不需要可见的边框。当用户注视挂饰中的无边框按钮时，系统会自动为其应用悬停效果（有关指南，请参阅[眼睛](eyes.md)）。

**使用系统提供的工具栏和标签页栏，除非你需要创建自定义组件**。在 visionOS 中，工具栏和标签页栏自动显示为挂饰，因此你无需使用挂饰来创建这些组件。有关开发者指南，请参阅：[Toolbars](https://developer.apple.com/cn/documentation/swiftui/toolbars) 和 [TabView](https://developer.apple.com/cn/documentation/swiftui/tabview)。

## 平台考量因素

*在 iOS、iPadOS、macOS、Apple tvOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[布局](layout.md)

[工具栏](toolbars.md)

#### 开发者文档

[ornament(visibility:attachmentAnchor:contentAlignment:ornament:)](https://developer.apple.com/cn/documentation/swiftui/view/ornament(visibility:attachmentanchor:contentalignment:ornament:)) — SwiftUI

#### 视频

- [设计空间用户界面](https://developer.apple.com/cn/videos/play/wwdc2023/10076)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 2 月 2 日 | 新增了使用多个挂饰的指南。 |
| 2023 年 12 月 5 日 | 移除了使用挂饰来呈现补充项的相关说明。 |
| 2023 年 6 月 21 日 | 新页面。 |
