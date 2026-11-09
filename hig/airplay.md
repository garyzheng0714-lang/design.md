# 隔空播放

原文：https://developer.apple.com/cn/design/human-interface-guidelines/airplay

“隔空播放”可让用户以无线方式将 iOS、iPadOS、macOS 和 Apple tvOS 设备中的媒体内容流播放到 Apple TV、HomePod 和支持“隔空播放”的电视及扬声器。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-AirPlay-intro@2x.png)

## 最佳实践

**首选系统提供的媒体播放器**。内建媒体播放器提供一组标准控制，并支持章节导航、字幕、隐藏式字幕和“隔空播放”流播放等功能。它还易于实施，在整个系统中提供一致且熟悉的播放体验，并满足大多数媒体 App 的需求。仅当系统提供的播放器无法满足 App 的需求时，才考虑设计自定义视频播放器。有关开发者指南，请参阅 [AVPlayerViewController](https://developer.apple.com/cn/documentation/avkit/avplayerviewcontroller)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/airplay-video-screen@2x.png)

**提供分辨率可能最高的内容**。你的 [HTTP Live Streaming](https://developer.apple.com/documentation/http-live-streaming) (HLS) 播放列表需要包括所有可用的分辨率，以便用户能够以适合其所用设备的分辨率体验你的内容（AVFoundation 会根据设备自动选择分辨率）。如果不包括一系列分辨率，当用户将你的内容流播放到能够以更高分辨率播放的设备时，这些内容看起来画质较差。例如，当用户使用“隔空播放”将内容流播放到 4K 电视时，在 iPhone 上以 720p 看起来画质较好的内容会以较差画质呈现。

**仅流播放符合用户期望的内容**。避免流播放仅在 App 本身环境中才有意义的背景循环和短视频体验等内容。有关开发者指南，请参阅 [usesExternalPlaybackWhileExternalScreenIsActive](https://developer.apple.com/cn/documentation/avfoundation/avplayer/usesexternalplaybackwhileexternalscreenisactive)。

**同时支持“隔空播放”流播放和镜像**。同时支持这两种功能可为用户提供最大的灵活性。

**支持远程控制事件**。支持该功能时，用户可以在锁屏上和通过与 Siri 或 HomePod 交互选取播放、暂停和快进等操作。有关开发者指南，请参阅：[Remote command center events](https://developer.apple.com/cn/documentation/mediaplayer/remote-command-center-events)。

**当 App 进入后台或设备锁定时，不要停止播放**。例如，用户期望在检查邮件或让设备进入睡眠状态时，从 App 开始流播放的电视节目可以继续播放。在这种情况下，避免自动镜像也至关重要，因为用户不想在没有明确做出选择时流播放设备上的其他内容。

**除非 App 开始播放沉浸式内容，否则不要中断其他 App 的播放**。例如，如果 App 在启动时播放视频或自动播放内联视频，你应当仅在本地设备上播放此内容，同时允许当前内容继续播放。有关开发者指南，请参阅 [ambient](https://developer.apple.com/cn/documentation/avfaudio/avaudiosession/category-swift.struct/ambient)。

**让用户在播放期间使用 App 的其他部分**。“隔空播放”启用时，App 需要保持正常运行。如果用户离开播放屏幕，请确保其他 App 内视频不会开始播放并中断流播放内容。

**根据需要提供控制媒体播放的自定义界面**。如果无法使用系统提供的媒体播放器，你可以创建一个自定义媒体播放器，为用户提供一种直观的方式使用“隔空播放”。如果需要这样做，请务必使所提供自定义按钮的外观和行为与系统提供的匹配，包括指示播放开始时间、正在播放或不可用的不同视觉状态。在启动“隔空播放”的自定义控制中仅使用 Apple 提供的符号，并在自定义播放器中正确放置“隔空播放”图标，即放置在右下角（iOS 16 和 iPadOS 16 及更高版本）。

## 使用“隔空播放”图标

你可以在资源中下载“隔空播放”图标。你可以通过以下选项在 App 中显示“隔空播放”图标。

### 黑色的“隔空播放”图标

当其他技术图标也以黑色显示时，在白色或浅色背景上使用黑色“隔空播放”图标。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/airplay-black-icon-set@2x.png)

### 白色的“隔空播放”图标

当其他技术图标也以白色显示时，在黑色或深色背景上使用白色“隔空播放”图标。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/airplay-white-icon-set@2x.png)

### 自定义颜色的“隔空播放”图标

当其他技术图标也以相同颜色显示时，使用自定义颜色。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/airplay-custom-color-icon-set@2x.png)

**使“隔空播放”图标的位置与其他技术图标保持一致**。如果在形状内显示其他技术图标，你可以通过相同的方式显示“隔空播放”图标。

**不要在自定义按钮或交互元素中使用“隔空播放”图标或名称**。仅以非交互方式使用图标和名称*隔空播放*。

**将图标与名称*隔空播放*正确配对**。你可以在图标下方或旁边显示名称（如果还以同样方式指代其他技术）。使用与布局中其余部分相同的字体。避免在文本中使用“隔空播放”图标，或将其作为名称*隔空播放*的替换项。

**凸显 App 而不是“隔空播放”**。确保对“隔空播放”的指代不像 App 名称或主要标识那么突出。

## 指代“隔空播放”

**使用术语“*AirPlay*（隔空播放）”时，请使用正确的大小写形式**。*AirPlay* 是一个词，有一个大写字母 *A* 和一个大写字母 *P*，每个大写字母后跟小写字母。如果布局仅显示全大写名称，你可以将 *AirPlay* 排印为全大写字母，以匹配布局中其余部分的样式。

**始终将*隔空播放*用作名词。**

|  | 示例文本 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 使用“隔空播放”通过扬声器聆听 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | “隔空播放”到扬声器 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | 你可以通过 [App 名称] “隔空播放” |

**使用*搭配使用*、*使用*、*支持*和*兼容*等术语。**

|  | 示例文本 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | [App 名称] 兼容“隔空播放” |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 支持“隔空播放”的扬声器 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 你可以搭配 [App 名称] 使用“隔空播放” |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | [App 名称] 配备“隔空播放” |

**如有需要，使用名称 *Apple* 和*隔空播放*。**

|  | 示例文本 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 兼容 Apple “隔空播放” |

**在有利于清晰展示的适当情况下指代“隔空播放”**。如果你的内容专门针对“隔空播放”，可以使用“隔空播放”来明确这一点。你还可以在技术规范中指代“隔空播放”。

|  | 示例文本 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | [App 名称] 现支持“隔空播放” |

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS 或 visionOS 的额外考量因素。在 watchOS 中不受支持。*

## 资源

#### 相关内容

[Apple 设计资源](https://developer.apple.com/design/resources/)

[Apple Trademark List](https://www.apple.com/legal/intellectual-property/trademark/appletmlist.html)

[Guidelines for Using Apple Trademarks and Copyrights](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)

#### 开发者文档

[AVFoundation](https://developer.apple.com/cn/documentation/avfoundation)

[AVKit](https://developer.apple.com/cn/documentation/avkit)

#### 视频

- [通过隔空播放 2 走向大屏幕](https://developer.apple.com/cn/videos/play/wwdc2019/501)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 5 月 2 日 | 已将指南整合为一页。 |
