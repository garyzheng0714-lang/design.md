# 多任务处理

原文：https://developer.apple.com/cn/design/human-interface-guidelines/multitasking

多任务处理可让用户快速从一个 App 切换到另一个，以在每个 App 中执行任务。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-multitasking-intro@2x.png)

用户希望在其设备上使用多任务处理，如果你的 App 不支持，用户可能会认为出现了问题。每个 App 都需要良好适配多任务处理，但有极少数情况例外，例如部分游戏和在全空间中运行的 Apple Vision Pro App。

除 App 切换外，多任务处理还可在不同的设备上带来不同的体验；请参阅[平台考量因素](multitasking.md#Platform-considerations)。

## 最佳实践

优秀的多任务处理体验可让用户在各种同步环境中管理内容，帮助用户在多个 App 中完成任务。你不知道用户何时会发起多任务处理，因此你的 App 或游戏始终需要准备好保存和恢复其运行环境。

**当用户切离时，暂停需要其关注或主动参与的活动**。例如，如果你的 App 是游戏或媒体查看 App，请确保用户切换到其他 App 时不会错过任何内容。用户切回时，让其继续使用并感到似乎从未离开。

**流畅响应音频中断**。来自其他 App 或系统本身的音频有时可能打断你 App 的音频。例如，来电或由 Siri 启动的音乐播放列表可能会打断你 App 的音频。发生这种情况时，用户希望你的 App 通过以下方式响应：

- 为主要音频中断（如播放音乐、播客或有声书）无限时暂停音频。
- 为较短中断（如 GPS 路线通知）暂时降低音量或暂停音频，然后在中断结束时恢复原始音量或播放。

有关指南，请参阅[播放音频](playing-audio.md)。

**在后台完成用户发起的任务**。发起下载资源或处理视频文件等任务时，用户希望即使切离你的 App，任务也能完成。如果你的 App 正在执行不需要额外输入的任务，请于暂停前在后台完成它。

**有节制地使用通知**。你的 App 可在暂停或后台运行时发送通知。如果用户在你的 App 中发起了重要或即时任务，然后从中切离，他们可能希望在任务完成时收到通知，以便切回你的 App 并进行下一步。与之相反，用户通常不需要立即知道常规或次要任务已完成。在这种情况下，避免发送非必要的通知，而应让用户在返回你的 App 时检查该任务。有关指南，请参阅[管理通知](managing-notifications.md)。

## 平台考量因素

*在 watchOS 中不受支持。*

### iOS

在 iPhone 上，多任务处理可让用户在使用其他 App 的同时使用 FaceTime 通话或以画中画观看视频。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/multitasking-app-switcher-iphone@2x.png)
*App 切换器显示当前所有打开的 App。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/multitasking-pip-iphone@2x.png)
*当前的 FaceTime 通话可在用户使用其他 App 期间继续。*

### iPadOS

在 iPad 上，用户可同时查看多个不同 App 的[窗口](windows.md)并进行交互。单个 App 也可支持多个打开的窗口，让用户在相同 App 中一次查看多个窗口并进行交互。

用户可在全屏幕或窗口化 App 中使用 iPad。全屏幕使用时，App 占据整个屏幕，用户可通过 App 切换器切换各个 App 窗口。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/multitasking-ipad-app-switcher@2x.png)

使用窗口化 App 时，App 窗口可调整大小且用户可根据需要排列窗口，操作行为与 macOS 类似。系统会提供窗口控制，用于常见的平铺配置、进入全屏幕、最小化和关闭窗口。系统通过为最前面窗口的窗口控制设定颜色并在其后的窗口上投射阴影来标识最前面的窗口。有关指南，请参阅[窗口 > iPadOS](windows.md#iPadOS)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/multitasking-ipad-windows-maps-landmarks@2x.png)

此外，视频和 FaceTime 通话还可以在其他内容之上的画中画叠层中播放，不管 App 是全屏幕还是窗口化。

> **注**
>
> App 不会控制多任务配置，也不会收到用户所选配置的说明。

用户在窗口化模式下打开你的 App 时，为帮助 App 正确响应，请确保其完美适配不同的屏幕尺寸。有关指南，请参阅：[布局](layout.md)和[窗口](windows.md)；有关开发者指南，请参阅：[Multitasking on iPad, Mac, and Apple Vision Pro](https://developer.apple.com/cn/documentation/uikit/multitasking-on-ipad-mac-and-apple-vision-pro)。若要进一步了解用户使用 iPad 多任务处理功能的方式，请参阅：[在 iPad 上使用多任务处理功能](https://support.apple.com/en-us/HT207582)。

### macOS

在 Mac 上，多任务处理是默认的体验，因为用户通常会一次运行多个 App，使用时在窗口和任务之间切换。在打开多个 App 窗口时，macOS 会应用投影从而让窗口看起来像分层叠放在桌面上，并应用其他视觉效果以帮助用户区别不同的窗口状态；有关指南，请参阅 [macOS 窗口状态](windows.md#macOS-window-states)。

### Apple tvOS

在 Apple TV 上，用户可在播放或浏览内容的同时以画中画播放电影或电视节目（如果支持）。

### visionOS

在 Apple Vision Pro 上，用户可以在共享空间中同时运行多个 App，并在整个空间中查看和切换窗口和视体。

一次只能有一个窗口在共享空间中处于活跃状态。当用户从一个窗口注视另一个窗口时，当前注视的窗口会处于活跃状态，之前的窗口会变得更半透明并看似沿着 z 轴后退。关闭共享空间中的 App 窗口会将该 App 转换到后台，而不会退出。

> **注**
>
> 如果 App 是“播放中” App，关闭其窗口会自动暂停音频播放；如果用户想要继续播放，可以在控制中心中进行此类操作，无需打开窗口。

**避免干扰系统提供的多任务处理行为**。当用户从一个窗口注视另一个窗口时，visionOS 会将羽化遮罩应用到视线离开的窗口以阐明其状态更改。为了避免干扰此视觉反馈，请勿更改窗口边缘的外观。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-multiple-windows.mp4)

**当用户视线离开窗口时，不要暂停窗口的视频播放**。与在 macOS 中一样，visionOS 用户希望当他们在其他窗口中查看或执行任务时，在另一个窗口中开始的视频播放会继续。

**事先考虑音频可能闪避的情况**。如果当前 App 不是“播放中” App，当用户从该 App 注视另一个 App 时，其音频可能会闪避。

## 资源

#### 相关内容

[布局](layout.md)

[窗口](windows.md)

[播放视频](playing-video.md)

#### 开发者文档

[Responding to the launch of your app](https://developer.apple.com/cn/documentation/uikit/responding-to-the-launch-of-your-app) — UIKit

[Multitasking on iPad, Mac, and Apple Vision Pro](https://developer.apple.com/cn/documentation/uikit/multitasking-on-ipad-mac-and-apple-vision-pro) — UIKit

#### 视频

- [提升 iPad App 设计](https://developer.apple.com/cn/videos/play/wwdc2025/208)
- [让你的 UIKit App 更加灵活](https://developer.apple.com/cn/videos/play/wwdc2025/282)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 重新整理了平台考量因素中的指南，并新增了在 iPadOS 中对多个窗口进行多任务处理的指南。 |
| 2023 年 12 月 5 日 | 新增了 iPadOS 中主要窗口和辅助窗口的插图。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
