# 启动

原文：https://developer.apple.com/cn/design/human-interface-guidelines/launching

流畅的启动体验可帮助用户立即开始使用 App 或游戏。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-launching-intro@2x.png)

启动会在用户打开你的 App 或游戏时开始，包括初始下载，并在首屏就绪时结束。启动完成后，你可以提供[用户引导](onboarding.md)体验，使用户对你的 App 或游戏具有更高程度的理解。

## 最佳实践

**立即启动**。用户希望可立即开始与 App 或游戏交互，有时甚至几秒钟都不想等待。

**按照平台需要提供启动屏幕**。在 iOS、iPadOS 和 Apple tvOS 中，系统会在 App 或游戏启动时显示启动屏幕，然后迅速替换为首屏，让用户享受畅快的使用体验。有关指南，请参阅[启动屏幕](launching.md#Launch-screens)。macOS、visionOS 和 watchOS 不需要启动屏幕。

**如果需要启动画面，考虑在用户引导流程开始时显示**。启动画面是可简洁传达品牌和所需提供的其他信息的精美图形。如果不提供用户引导体验，你可以在启动完成时立即显示启动画面。

**App 重新启动后恢复之前的状态，以便用户可以从离开的位置继续**。避免让用户在 App 或游戏中回溯步骤来返回之前的位置。尽可能恢复之前状态的细枝末节。例如，将视图滚动到用户最近查看的位置，并显示与用户离开时相同状态和位置的窗口。

## 启动屏幕

*不适用于 macOS、visionOS 或 watchOS。*

**淡化启动体验**。启动屏幕并不属于用户引导体验或启动画面，也不用于艺术表达。启动屏幕的唯一功能在于增强对快速启动且立即可用这种体验的感知。

**设计与 App 或游戏首屏几乎相同的启动屏幕**。如果在启动完成时加入不协调的元素，用户可能会在启动屏幕和首屏之间有不愉快的观感。如果 App 或游戏在过渡到首屏前显示纯色，请创建只显示该纯色的启动屏幕。此外，还应确保启动屏幕匹配设备的当前方向和外观模式。

**避免在启动屏幕中包含文本，即使首屏显示文本**。由于启动屏幕中的内容不会改变，所以显示的任何文本都不会被本地化。

**不打广告**。启动屏幕不用于品牌宣传。避免创建看起来像启动画面或“关于”窗口的屏幕，不要包含标志或其他品牌元素，除非它们是 App 首屏的固定部分。

## 平台考量因素

*无针对 macOS 或 watchOS 的额外考量因素。*

### iOS、iPadOS

**以适当的方向启动**。如果 App 或游戏同时支持竖排和横排模式，请按设备的当前方向启动。如果界面只在一个方向运行，请按该方向启动并让用户在需要时旋转设备。确保只能横排显示的界面可以正确响应，无论用户向左还是向右旋转设备进入横排方向。有关指南，请参阅[布局](layout.md)。

### Apple tvOS

> **注**
>
> 不同于 Apple tvOS App 中随处可见的[分层图像](images.md#Layered-images)，启动屏幕是静态的。

**在直播观看 App 中，应考虑在用户启动 App 后立即自动开始播放**。用户使用你的 App 是为了观看电视，因此不妨在不活跃几秒钟后便开始播放新的或最近观看过的直播内容。有关指南，请参阅[直播观看 App](live-viewing-apps.md)。

### visionOS

**即使 App 为全沉浸式，也考虑在共享空间中启动**。在共享空间中打开窗口可让你在给 App 或游戏时间加载的同时提供更多相关使用环境，还可让你呈现供用户用于打开全沉浸式体验的控制。一般而言，用户希望能够选择何时转换到全空间，尤其是当前正在共享空间中运行其他 App 时。有关指南，请参阅[沉浸式体验](immersive-experiences.md)。

## 资源

#### 相关内容

[用户引导](onboarding.md)

[加载](loading.md)

#### 开发者文档

[Specifying your app’s launch screen](https://developer.apple.com/cn/documentation/xcode/specifying-your-apps-launch-screen) — Xcode

[Responding to the launch of your app](https://developer.apple.com/cn/documentation/uikit/responding-to-the-launch-of-your-app) — UIKit

#### 视频

- [优化 App 启动](https://developer.apple.com/cn/videos/play/wwdc2019/423)
- [一用倾心](https://developer.apple.com/cn/videos/play/wwdc2017/816)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 6 月 10 日 | 新增了显示启动画面的指南。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
