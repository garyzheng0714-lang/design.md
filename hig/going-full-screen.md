# 全屏显示

原文：https://developer.apple.com/cn/design/human-interface-guidelines/going-full-screen

iPhone、iPad 和 Mac 所提供的全屏幕模式让用户可扩展窗口以填满屏幕，从而隐藏系统控制并提供无干扰的环境。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-going-full-screen-intro@2x.png)

Apple TV 和 Apple Watch 不提供全屏幕模式，因为 App 和游戏默认已填满屏幕。Apple Vision Pro 并不提供全屏幕模式，因为用户可以扩展窗口来占用更多视野，或者使用数码旋钮来隐藏透视并转换到更具沉浸感的体验（有关指南，请参阅[沉浸式体验](immersive-experiences.md)）。

## 最佳实践

**对使用体验有帮助时，支持全屏幕模式**。用户喜欢在全屏幕模式下专注处理任务或沉浸于内容中。如果你提供的体验是让用户玩游戏，观看视频或照片幻灯片放映等媒体，或者在无干扰的环境中执行深度任务，请考虑提供全屏幕模式。

**如有必要，调整全屏幕模式下的布局，但避免以编程方式调整窗口大小**。当窗口在全屏幕模式下比在非全屏幕模式下更大时，不妨突出显示重要内容并充分利用额外空间。例如，调整界面比例而不更改显示的项目可能会比较合理。如果你进行了此类调整，确保调整足够精细，以保持界面一致，并避免导致模式间的转换在视觉上不协调。

**继续提供对必要功能和控制的访问，以便用户无需退出全屏幕模式即可完成任务**。例如，全屏幕媒体播放体验需要使播放控制持续可用，或者在用户需要时易于显示。

**让用户在 iPadOS 或 macOS App 处于全屏幕模式时能够显示程序坞（在游戏中例外）**。在 iPadOS 和 macOS 中，保持程序坞可访问十分重要，这样用户便可以快速打开其他 App 和程序坞项目。为防止用户在全屏玩游戏时意外显示程序坞，你可以让 iPadOS 忽略首次从屏幕底部边缘向上轻扫，或者在 macOS 中完全隐藏程序坞。有关开发者指南，请参阅 [preferredScreenEdgesDeferringSystemGestures](https://developer.apple.com/cn/documentation/swiftui/uihostingcontroller/preferredscreenedgesdeferringsystemgestures) (SwiftUI)、[preferredScreenEdgesDeferringSystemGestures](https://developer.apple.com/cn/documentation/uikit/uiviewcontroller/preferredscreenedgesdeferringsystemgestures) (UIKit) 和 [hideDock](https://developer.apple.com/cn/documentation/appkit/nsapplication/presentationoptions-swift.struct/hidedock) (AppKit)。

**用户切离全屏幕体验后再返回时，帮助他们从离开的位置继续**。例如，当用户离开全屏幕体验时，游戏或幻灯片放映需要自动暂停，以免其错过任何内容。

**让用户选择何时退出全屏幕模式**。用户通常不希望在切换到其他体验或完成引人入胜的活动（如玩游戏或观影）时自动结束全屏幕模式。

**通过暂时隐藏工具栏和导览控制来优先显示内容**。当内容为主要关注点时（如查看全屏幕照片或阅读文稿时），你可以隐藏元素来提供无干扰的环境。若应用此类行为，请让用户通过轻点、向下轻扫或者将光标移至屏幕顶部等常见手势或操作来恢复隐藏的元素。当控制对于导览或执行任务必不可少时，请确保控制始终可见。虽然 visionOS 窗口可隐藏其工具栏或导览控制，但用户在佩戴 Apple Vision Pro 时通常会期望不同类型的沉浸式体验；有关指南，请参阅[沉浸式体验](immersive-experiences.md)。

## 平台考量因素

*在 Apple tvOS、visionOS 或 watchOS 中不受支持。*

### iOS、iPadOS

**考虑推迟系统手势以防止意外退出全屏幕 App 或游戏**。默认情况下，主屏幕指示符会在用户切换至你的 App 或游戏后很快自动隐藏。当用户与屏幕底部交互时会重新出现，以便轻扫一次退出。请尽可能保留此行为，因为常见且符合用户预期。如果支持此行为导致意外退出，你可以启用轻扫两次而非一次来退出。有关开发者指南，请参阅 [preferredScreenEdgesDeferringSystemGestures](https://developer.apple.com/cn/documentation/swiftui/uihostingcontroller/preferredscreenedgesdeferringsystemgestures)。

### macOS

**使用系统提供的全屏幕体验**。使用系统的全屏幕支持来确保全屏幕窗口在所有环境下都可正常使用。例如，部分 Mac 机型自带相机防护罩，它会占据屏幕顶部中央的一块区域。使用系统的全屏幕支持会自动适应这个区域。有关开发者指南，请参阅 [toggleFullScreen(_:)](https://developer.apple.com/cn/documentation/appkit/nswindow/togglefullscreen(_:))。

**在游戏中，避免在玩家进入全屏幕模式时改变显示模式**。用户期望可掌控显示模式，而且自动改变显示模式并不会提高性能。

有关更多开发者指南，请参阅 [Managing your game window for Metal in macOS](https://developer.apple.com/cn/documentation/metal/managing-your-game-window-for-metal-in-macos)。

**始终让用户选择何时进入全屏幕模式**。优先让用户使用窗口的“进入全屏幕”按钮、“显示”菜单项或 Control-Command-F 键盘快捷键。避免提供自定义的窗口模式菜单。在游戏中，你还可能提供可开关全屏幕模式的自定义[切换](https://developer.apple.com/cn/design/human-interface-guidelines/toggles)。

## 资源

#### 相关内容

[布局](layout.md)

[多任务处理](multitasking.md)

[窗口](windows.md)

[菜单栏](the-menu-bar.md)

#### 开发者文档

[fullScreenCover(item:onDismiss:content:)](https://developer.apple.com/cn/documentation/swiftui/view/fullscreencover(item:ondismiss:content:)) — SwiftUI

[NSScreen](https://developer.apple.com/cn/documentation/appkit/nsscreen) — AppKit

[NSWindow.CollectionBehavior](https://developer.apple.com/cn/documentation/appkit/nswindow/collectionbehavior-swift.struct) — AppKit

[Managing your game window for Metal in macOS](https://developer.apple.com/cn/documentation/metal/managing-your-game-window-for-metal-in-macos) — Swift, Objective-C

#### 视频

- [提升 iPad App 设计](https://developer.apple.com/cn/videos/play/wwdc2025/208)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 更新了在全屏幕 iOS 和 iPadOS App 及游戏中隐藏工具栏和导览控制，以及推迟主屏幕指示符手势的指南。 |
| 2024 年 6 月 10 日 | 完善了在全屏幕模式下玩游戏的指南。 |
