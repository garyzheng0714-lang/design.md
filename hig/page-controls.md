# 页面控制

原文：https://developer.apple.com/cn/design/human-interface-guidelines/page-controls

页面控制显示一行指示符图像，其中每个都代表扁平列表中的一个页面。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-page-dots-intro@2x.png)

指示符的滚动行可帮助用户导览列表以找到其想要的页面。页面控制可处理任意数量的页面，因而在用户可创建自定义列表的情况下特别有用。

页面控制默认显示为一系列小指示点，代表了可用的页面。实心圆点表示当前页面。这些圆点在视觉上始终保持等距，并且如果圆点太多导致窗口无法容纳，则会被裁剪。

## 最佳实践

**使用页面控制来表示页面有序列表之间的移动**。页面控制不表示分层或无序的页面关系。对于更复杂的导览，请考虑改用边栏或拆分视图。

**使页面控制在视图或窗口底部居中**。为了确保用户始终知道页面控制的位置，请将其水平居中，并放置在视图底部附近。

**虽然页面控制可处理任意数量的页面，但不要显示过多**。超过约 10 个圆点便很难一眼看出数量。如果你的 App 需要显示 10 个以上相互对等的页面，请考虑使用不同的排列方式（例如网格），从而让用户按照任意顺序导览内容。

## 自定义指示符

页面控制对所有指示符默认使用系统提供的圆点图像，但也可以显示独特的图像来帮助用户识别特定的页面。例如，“天气”使用 `location.fill` 符号来区分当前位置的页面。

如果能增强你的 App 或游戏，你可以提供自定义图像作为所有指示符的默认图像，还可以为特定页面提供不同的图像。有关开发者指南，请参阅 [preferredIndicatorImage](https://developer.apple.com/cn/documentation/uikit/uipagecontrol/preferredindicatorimage) 和 [setIndicatorImage(_:forPage:)](https://developer.apple.com/cn/documentation/uikit/uipagecontrol/setindicatorimage(_:forpage:))。

**确保自定义指示符图像简单清晰**。避免复杂的形状，不要包括负空间、文本或内部线条，因为这些细节可能会使图标在非常小的尺寸下显得模糊不清、难以辨认。考虑使用简单的 [SF 符号](sf-symbols.md)作为指示符或设计自己的图标。有关指南，请参阅[图标](icons.md)。

**仅自定义可增强页面控制整体含义的默认指示符图像**。例如，如果你列出的每个页面都包含书签，则可以使用 `bookmark.fill` 符号作为默认指示符图像。

**避免在一个页面控制中使用两个以上不同指示符图像**。如果你的列表包含一个具有特殊含义的页面（如“天气”中的当前位置页面），你可以通过为其提供独特的指示符图像来使该页面易于查找。相反，使用多个独特图像来标记多个重要页面的页面控制则难以使用，因为用户必须要记住每个图像的含义。如果页面控制显示两种以上类型的指示符图像，即使每个图像都清晰，该控制往往也会显得杂乱无序。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/page-indicator-customization-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*使用几个不同的指示符可能会使页面控制看起来眼花缭乱，且不易使用。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/page-indicator-customization-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)
*仅使用两个不同的指示符看上去井然有序，并提供了一致的使用体验。*

**避免为指示符图像着色**。自定义颜色可能会降低用于区分当前页面指示符并使页面控制在屏幕上可见的对比度。为了确保你的页面控制易于使用，并且在不同的环境中看起来美观，请让系统自动为指示符着色。

## 平台考量因素

*在 macOS 中不受支持。*

### iOS、iPadOS

页面控制可调整指示符的外观，以提供列表的更多相关信息。例如，控制会高亮标记当前页面的指示符，以便用户可以估计该页面在列表中的相对位置。当指示符多于空间中可容纳的数量时，控制可以缩小两侧的指示符，以暗示有更多页面可用。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/page-controls-many-indicators@2x.png)

用户通过轻点或左右滑动来与页面控制交互（若要*左右滑动*，用户需按住控制并左右拖移）。轻点当前页面指示符的前端或后端可显示下一页或上一页；在 iPadOS 中，用户还可以使用指针来触及特定的指示符。左右滑动可按顺序打开页面，左右滑过控制的前缘或后缘可帮助用户快速到达第一页或最后一页。

> **开发者注释**
>
> 在 API 中，*轻点*属于*离散交互*，而*左右滑动*属于*连续交互*；有关开发者指南，请参阅 [UIPageControl.InteractionState](https://developer.apple.com/cn/documentation/uikit/uipagecontrol/interactionstate-swift.enum)。

**避免在左右滑动过程中添加页面过渡动画**。用户左右滑动的速度可能会非常快，并且在每个过渡中使用滚动动画可能会使你的 App 卡顿，并导致令人分心的视觉闪烁。仅对轻点使用动画滚动过渡。

页面控制可以包括半透明的圆角矩形背景外观，为指示符提供视觉对比。你可以选取以下其中一个背景样式：

- 自动 — 仅当用户与控制交互时才显示背景。当页面控制不是用户界面中的主要导览元素时，请使用此样式。
- 突显 — 始终显示背景。仅当控制是屏幕中的主要导览控制时，才使用此样式。
- 极简 — 从不显示背景。当你只想显示当前页面在列表中的位置而无需在左右滑动过程中提供视觉反馈时，请使用此样式。

有关开发者指南，请参阅 [backgroundStyle](https://developer.apple.com/cn/documentation/uikit/uipagecontrol/backgroundstyle-swift.property)。

**使用极简背景样式时，避免支持滑动条**。极简样式在左右滑动过程中不提供视觉反馈。如果要让用户在你的 App 中可左右滑动页面列表，请使用自动或突显背景样式。

### Apple tvOS

**在全屏页面集上使用页面控制**。页面控制专为在全屏幕环境中操作而设计，其中多个内容丰富的页面在页面层级中是对等的。包括其他控制会导致在页面间移动时很难保持聚焦。

### visionOS

在 visionOS 中，页面控制代表可用的页面并指示当前页面，但用户不会与之交互。

### watchOS

在 watchOS 中，页面控制可显示在屏幕底部以进行水平分页，或者在呈现垂直[标签页视图](https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization/tab-views)时显示在数码表冠旁边。在垂直标签页视图中导航时，页面指示符会显示用户在当前页面内和多个页面之间的位置。页面控制会在滚动浏览页面内容和滚动至其他页面之间过渡。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/page-controls-watch-vertical@2x.png)
*垂直页面控制*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/page-controls-watch-horizontal@2x.png)
*水平页面控制*

**使用垂直分页将多个视图分割成针对特定用途的不同页面**。赋予每个页面明确的用途，并让用户使用数码表冠滚动浏览页面。在 watchOS 中，这种设计比水平分页或包含多个层级的层级导航更为有效。

**考虑将单个页面的内容限制为一屏高度**。采用这种限制可赋予每个页面各不相同的明确用途，并让设计更方便查看。谨慎使用可变高度的页面，尽可能在 App 设计中仅将其放在固定高度页面之后。

## 资源

#### 相关内容

[滚动视图](scroll-views.md)

#### 开发者文档

[PageTabViewStyle](https://developer.apple.com/cn/documentation/swiftui/pagetabviewstyle) — SwiftUI

[UIPageControl](https://developer.apple.com/cn/documentation/uikit/uipagecontrol) — UIKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
| 2023 年 6 月 5 日 | 更新了在 watchOS 中使用页面控制的指南。 |
