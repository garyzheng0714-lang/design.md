# 操作表单

原文：https://developer.apple.com/cn/design/human-interface-guidelines/action-sheets

操作表单是一种模态视图，呈现与用户所发起操作相关的选项。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-action-sheet-intro@2x.png)

> **开发者注释**
>
> 使用 SwiftUI 时，你可以通过为确认对话框指定 [presentation modifier](https://developer.apple.com/documentation/swiftui/view-presentation) 以在所有平台中提供操作表单功能。如果使用 UIKit，则可以通过 [UIAlertController.Style.actionSheet](https://developer.apple.com/cn/documentation/uikit/uialertcontroller/style/actionsheet)在 iOS、iPadOS 和 Apple tvOS 中显示操作表单。

## 最佳实践

**使用操作表单而非提醒来提供特意操作相关的选项**。例如，当用户在 iPhone 上的“邮件”中取消编辑的邮件时，操作表单会提供两个选项：删除草稿或保存草稿。尽管提醒也可以帮助用户确认或取消带来破坏性后果的操作，但它不提供与该操作相关的附加选项。更重要的是，提醒通常是非预期的，一般告诉用户当前情境中出现问题或变化，并可能需要他们采取行动。有关指南，请参阅[提醒](alerts.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/action-sheet-iphone-mail@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/action-sheet-iphone-mail-delete-action@2x.png)

**谨慎使用操作表单**。操作表单可向用户提供重要信息和选项，但这样做的前提是打断当前任务。为鼓励用户重视操作表单，请避免在非必要时使用。

**力求标题简短以在一行显示**。长标题难以快速阅读，并可能被截断或需要用户滚动查看。

**仅在必要时提供信息**。一般来说，标题结合当前操作的上下文，提供了足够的信息帮助用户理解其选择。

**根据需要提供“取消”按钮，让用户拒绝可能破坏数据的操作**。将“取消”按钮置于操作表单的底部（或者在 watchOS 中，置于表单的左上角）。SwiftUI 确认对话框默认包括“取消”按钮。

**在视觉上突出破坏性选项**。为执行破坏性操作的按钮使用破坏性样式，并将这些按钮置于操作表单的顶部，这里往往最引人注目。有关开发者指南，请参阅 [destructive](https://developer.apple.com/cn/documentation/swiftui/buttonrole/destructive) (SwiftUI) 或 [UIAlertAction.Style.destructive](https://developer.apple.com/cn/documentation/uikit/uialertaction/style-swift.enum/destructive) (UIKit)。

## 平台考量因素

*无针对 macOS 或 Apple tvOS 的额外考量因素。在 visionOS 中不受支持。*

### iOS、iPadOS

**使用操作表单而非菜单来提供操作相关的选项**。用户习惯在执行可能需要明确选择的操作时看到操作表单。相比之下，用户期望菜单在其选择显示时才出现。

**避免让操作表单滚动**。操作表单提供的按钮越多，就意味着用户选择时所需的时间和精力越多。另外，滚动操作表单时很容易会意外轻点按钮。

### watchOS

系统定义的操作表单样式包括标题、可选信息、“取消”按钮和一个或多个附加按钮。此界面的外观因设备而异。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/action-sheet-watch-system-defined@2x.png)

每个按钮都有一个关联样式，用于传达有关按钮效果的信息。系统定义的按钮样式共有三种：

| 样式 | 含义 |
| --- | --- |
| 默认 | 按钮没有特殊含义。 |
| 破坏性 | 按钮会在 App 中破坏用户数据或执行破环性操作。 |
| 取消 | 按钮会关闭视图而不执行任何操作。 |

**避免在操作表单中显示四个以上（含“取消”按钮）的按钮**。屏幕上的按钮越少，用户就可更轻松地一览所有选项。“取消”按钮为必需项，因此提供的附加选项务必不要超过三个。

## 资源

#### 相关内容

[模态化](modality.md)

[表单](sheets.md)

[提醒](alerts.md)

#### 开发者文档

[confirmationDialog(_:isPresented:titleVisibility:actions:)](https://developer.apple.com/cn/documentation/swiftui/view/confirmationdialog(_:ispresented:titlevisibility:actions:)-46zbb) — SwiftUI

[UIAlertController.Style.actionSheet](https://developer.apple.com/cn/documentation/uikit/uialertcontroller/style/actionsheet) — UIKit
