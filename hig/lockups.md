# 联锁

原文：https://developer.apple.com/cn/design/human-interface-guidelines/lockups

联锁将多个独立视图组合成为单个交互式单元。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-lockups-intro@2x.png)

每个联锁由内容视图、标题和脚注组成。标题显示在联锁主内容上方，脚注显示在主内容下方。联锁获得焦点时，三个视图全都会展开并结合在一起。

根据 App 的需要，你可以结合使用四种类型的联锁：卡片、标题按钮、字母图案和海报。

## 最佳实践

**在联锁之间留出充足空间**。获得焦点的联锁的大小会扩展，因此请在联锁之间留出足够空间，以避免重叠或取代其他联锁的位置。有关指南，请参阅[布局](layout.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/lockups-generic@2x.png)

**在一行或一组内使用一致的联锁大小**。一组按钮或一行内容图像在其所有元素的宽和高都匹配时看起来会更有吸引力。

有关开发者指南，请参阅 [TVLockupView](https://developer.apple.com/cn/documentation/tvuikit/tvlockupview) 和 [TVLockupHeaderFooterView](https://developer.apple.com/cn/documentation/tvuikit/tvlockupheaderfooterview)。

## 卡片

卡片结合使用标题、脚注和内容视图来呈现媒体项目的评分和评论。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/lockups-background@2x.png)

有关开发者指南，请参阅 [TVCardView](https://developer.apple.com/cn/documentation/tvuikit/tvcardview)。

## 标题按钮

标题按钮可在按钮下方包括标题和副标题。标题按钮可包含图像或文本。

当用户聚焦到标题按钮时，请确保其随着用户轻扫的动作而倾斜。垂直对齐时，标题按钮应上下倾斜。水平对齐时，标题按钮应左右倾斜。显示在网格中时，标题按钮应垂直和水平倾斜。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/lockups-caption-button@2x.png)

有关开发者指南，请参阅 [TVCaptionButtonView](https://developer.apple.com/cn/documentation/tvuikit/tvcaptionbuttonview)。

## 字母图案

字母图案可识别用户，通常用于媒体项目的演职员表。每个字母图案由用户的圆形图片及其姓名组成。如果图像不可用，用户的姓名首字母会代替图像显示。

**首选图像而非姓名首字母**。用户的图像会比文本带来更密切的联系感。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/lockups-monogram@2x.png)

有关开发者指南，请参阅 [TVMonogramContentView](https://developer.apple.com/cn/documentation/tvuikit/tvmonogramcontentview)。

## 海报

海报由图像和可选的标题和副标题组成，标题和副标题在海报未获得焦点时为隐藏。海报可使用任何大小，但需要与其内容相适应。相关指南，请参阅[图像视图](image-views.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/lockups-poster@2x.png)

有关开发者指南，请参阅 [TVPosterView](https://developer.apple.com/cn/documentation/tvuikit/tvposterview)。

## 平台考量因素

*在 iOS、iPadOS、macOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[针对 Apple tvOS 设计](designing-for-tvos.md)

[布局](layout.md)

#### 开发者文档

[TVLockupView](https://developer.apple.com/cn/documentation/tvuikit/tvlockupview) — TVUIKit

[TVLockupHeaderFooterView](https://developer.apple.com/cn/documentation/tvuikit/tvlockupheaderfooterview) — TVUIKit
