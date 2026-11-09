# 状态栏

原文：https://developer.apple.com/cn/design/human-interface-guidelines/status-bars

状态栏出现在屏幕的上边缘，它会显示有关设备当前状态的信息，如时间、蜂窝网络运营商和电池电量。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-status-bar-intro@2x.png)

## 最佳实践

**模糊状态栏底下的内容**。状态栏的背景默认是透明的，因此可以显现其底下的内容。背景透明可能会导致状态栏中显示的信息难以看清。如果状态栏底下的控制可见，用户可能会尝试与其交互，但这是徒劳之举。确保状态栏始终易读，同时不要让其底下的内容看似可交互。优先使用滚动边缘效果在状态栏底下放置模糊的视图。有关开发者指南，请参阅 [ScrollEdgeEffectStyle](https://developer.apple.com/cn/documentation/swiftui/scrolledgeeffectstyle) 和 [UIScrollEdgeEffect](https://developer.apple.com/cn/documentation/uikit/uiscrolledgeeffect)。

**考虑在显示全屏幕媒体时暂时隐藏状态栏**。当用户将注意力放在媒体上时，状态栏可能会令其分心。暂时隐藏这些元素以提供更令人沉浸的体验。例如，“照片” App 在用户以全屏幕浏览照片时会隐藏状态栏及其他界面元素。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/status-bar-visible@2x.png)
*显示状态栏的“照片” App*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/status-bar-hidden@2x.png)
*隐藏状态栏的“照片” App*

**避免永久隐藏状态栏**。如果没有状态栏，用户就必须离开 App 才能查看时间或无线局域网连接状态。让用户通过简单且可发现的手势来重新显示隐藏的状态栏。例如，在“照片” App 中以全屏幕浏览照片时，轻点一下即可再次显示状态栏。

## 平台考量因素

*无针对 iOS 或 iPadOS 的额外考量因素。在 macOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 开发者文档

[UIStatusBarStyle](https://developer.apple.com/cn/documentation/uikit/uistatusbarstyle) — UIKit

[preferredStatusBarStyle](https://developer.apple.com/cn/documentation/uikit/uiviewcontroller/preferredstatusbarstyle) — UIKit
