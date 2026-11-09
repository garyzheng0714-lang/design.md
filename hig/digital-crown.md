# 数码旋钮/表冠

原文：https://developer.apple.com/cn/design/human-interface-guidelines/digital-crown

数码旋钮/表冠是 Apple Vision Pro 和 Apple Watch 上的重要硬件输入。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/inputs-digital-crown-intro@2x.png)

在 Apple Vision Pro 和 Apple Watch 上，用户可使用数码旋钮/表冠与系统交互；在 Apple Watch 上，用户还可使用数码表冠与 App 交互。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/digital-crown-apple-vision-pro@2x.png)
*Apple Vision Pro 上的数码旋钮*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/digital-crown-apple-watch@2x.png)
*Apple Watch 上的数码表冠*

## Apple Vision Pro

在 Apple Vision Pro 上，用户可使用数码旋钮：

- 调整音量
- 调整在传送门、环境或在全空间中运行的 App 或游戏的沉浸程度（有关指南，请参阅[沉浸式体验](immersive-experiences.md)）
- 重新居中内容以将其置于用户面前
- 打开“无障碍”设置
- 退出 App 并返回主屏幕视图

## Apple Watch

用户旋转数码表冠时，它会生成可供你用于增强或促进 App 交互的信息，如滚动或者操作标准或自定义控制。

从 watchOS 10 开始，数码表冠作为导航的主要输入方式，发挥了更重要的作用。在表盘上，用户旋转数码表冠来查看智能叠放中的小组件；在主屏幕上，用户用它来垂直浏览其 App 集。在 App 内，用户旋转数码表冠来垂直切换编页的标签页，以及滚动浏览列表视图和高度可变的页面。

除了其导航的用途之外，旋转数码表冠还可生成可用于增强或促进 App 交互的信息，例如检查数据或者操作标准或自定义控制。

> **注**
>
> App 不会响应按下数码表冠的行为，因为 watchOS 为系统提供的功能（例如显示主屏幕）保留了此类交互方式。

大多数 Apple Watch 机型在数码表冠上提供了触感反馈，为用户滚动浏览内容带来更多触觉体验。当用户将数码表冠旋转到一定幅度时，系统会默认提供线性触感反馈*定位*或轻点反馈。某些系统控制（例如表格视图）会在新项目滚动到屏幕上时提供定位。

**将 App 的导航锚定到数码表冠上**。从 watchOS 10 开始，旋转数码表冠是用户在 App 内和 App 间导航的主要方式。列表、标签页和滚动视图以垂直方向布局，以便用户可使用数码表冠轻松地在 App 界面的重要元素间移动。将交互锚定到数码表冠上时，还应确保使用相应的触控屏交互来作为备选方案。

**考虑在不需要导航的情况下使用数码表冠检查数据**。在数码表冠不需要在列表中或页面间导航的情况下，它是检查 App 数据的绝佳工具。例如，在“世界时钟”中，旋转数码表冠会前进至所选位置的时间，以便用户可以将不同的时间与其当前时间作比较。

**提供响应数码表冠交互的视觉反馈**。例如，用户使用数码表冠时，选择器会更改当前显示的值。如果你直接跟踪转数，请使用此数据以编程方式更新界面。如果不提供视觉反馈，用户很可能会认为旋转数码表冠在你的 App 中不起效果。

**更新界面以匹配用户旋转数码表冠的速度**。用户期望旋转数码表冠可让其精确控制界面，因此使用此速度来确定要以什么速度作出更改将会获得不错的效果。避免以用户难以选择值的速度更新内容。

**如果在你的 App 中可行，请使用默认触感反馈**。如果触感反馈在你 App 的环境中不适用，例如在默认定位与 App 动画不匹配时，请关闭此类定位。你还可以调整用于表格的触感反馈行为，让其使用线性定位，而非基于行的定位。例如，如果表格中具有高度明显不同的行，线性定位可能会为用户带来更一致的体验。

## 平台考量因素

*在 iOS、iPadOS、macOS 或 Apple tvOS 中不受支持。*

## 资源

#### 相关内容

[反馈](feedback.md)

[操作按钮](action-button.md)

[沉浸式体验](immersive-experiences.md)

#### 开发者文档

[WKCrownDelegate](https://developer.apple.com/cn/documentation/watchkit/wkcrowndelegate) — WatchKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 12 月 5 日 | 新增了 Apple Vision Pro 和 Apple Watch 的插图，以及阐明了 visionOS App 不会收到来自数码旋钮的直接信息。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
| 2023 年 6 月 5 日 | 新增强调数码表冠在导航时发挥核心作用的指南。 |
