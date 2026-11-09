# 打印

原文：https://developer.apple.com/cn/design/human-interface-guidelines/printing

iOS、iPadOS、macOS 或 visionOS App 可合理整合系统提供的打印功能，并根据需要显示打印机/文稿特定的自定义选项。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-printing-intro@2x.png)

## 最佳实践

**将打印放在易发现的位置**。将打印操作放在标准系统位置，方便用户轻松找到。例如，在 macOS App 的“文件”菜单中包括“打印”项；在 iOS 或 iPadOS App 中，添加一个可打开[操作表单](https://developer.apple.com/cn/design/human-interface-guidelines/action-sheets)的工具栏按钮。如果 macOS App 包含工具栏，你不妨也在其中加一个“打印”按钮，但是考虑以可选按钮形式提供，以便用户在自定义工具栏时添加。

**仅在可能时呈现打印选项**。如果屏幕上没有可打印的内容或者打印机不可用，请在 macOS App 的“文件”菜单中调暗“打印”项，并从 iOS 或 iPadOS App 的操作表单中移除打印操作。如果应用自定义打印按钮，请在不可打印时将其调暗或隐藏。

**呈现相关打印选项**。如果有必要提供页面范围选择、文件多份打印或者双面打印等选项，且打印机支持这些选项，请使用系统提供的视图来呈现。

## 平台考量因素

*无针对 iOS、iPadOS 或 visionOS 的额外考量因素。在 Apple tvOS 或 watchOS 中不受支持。*

### macOS

**如果系统未提供你 macOS App 所提供的 App 特定打印选项，请考虑为打印面板创建一个自定义类别**。打印面板默认提供多类设置，例如“布局”、“纸张处理”和“介质和质量”。使用 App 名称这类唯一的名称给自定义类别命名，并在 App 中包括可为用户带来良好打印体验的选项。例如，Keynote 讲演提供了演示文稿特定的选项，比如可打印演讲者注释、幻灯片背景和跳过的幻灯片。

**如果你的 App 支持文稿特定的页面设置，请考虑显示页面设置对话框**。*页面设置对话框*包括在打印特定文稿时才会用到的页面大小、方向和缩放这类鲜少更改的设置。如果你的 App 属于这种情况，请避免应用系统已经提供的功能。例如，不需要包括更改页面方向或反序打印等选项，因为系统提供了这类选项。

**确保选项间的互依性清晰明了**。例如，如果双面打印选项可用，则在透明介质上打印的选项便不可用。

**将高级功能和常用功能分开**。考虑在用户需要前，使用显示控制来隐藏高级选项。将高级选项标记为*高级选项*。

**考虑让用户预览设置效果**。例如，你可以更新缩略图图像来显示色调控制更改带来的效果。

**考虑随文稿储存修改后的设置**。至少有必要在文稿关闭前储存打印设置，以防用户要再次打印。

## 资源

#### 相关内容

[文件管理](file-management.md)

[“文件”菜单](the-menu-bar.md#File-menu)

#### 开发者文档

[UIPrintInteractionController](https://developer.apple.com/cn/documentation/uikit/uiprintinteractioncontroller) — UIKit

[NSDocument](https://developer.apple.com/cn/documentation/appkit/nsdocument) — AppKit
