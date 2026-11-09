# 提醒

原文：https://developer.apple.com/cn/design/human-interface-guidelines/alerts

提醒会为用户提供其立即所需的关键信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-alert-intro@2x.png)

例如，提醒可以告诉用户出现的问题，在操作可能破坏数据时发出警告，并让其有机会确认购买或发起的其他重要操作。

## 最佳实践

**谨慎使用提醒**。提醒可向用户提供重要信息，但这样做的前提是打断当前任务。确保每个提醒都只提供必要的信息和有用的操作，从而鼓励用户重视提醒。

**避免仅为了提供信息而使用提醒**。用户不喜欢被信息丰富却不可操作的提醒打断。如果只需要提供信息，优先寻求另一种可在相关环境中传达信息的方式。例如，服务器连接不可用时，“邮件”会显示用户可选取以进一步了解的指示符。

**避免为常见且可撤销的操作显示提醒，即使这类操作具有破坏性**。例如，不需要在用户每次删除电子邮件或文件时提醒他们这样做会造成数据丢失，因为其目的正是为了丢弃数据，并且此操作可撤销。相比之下，当用户执行了无法撤销的罕见破坏性操作时，显示提醒就非常重要，以防他们意外发起该操作。

**避免在 App 启动时显示提醒**。如果需要在用户打开 App 时通知他们新信息或重要信息，请设计一种使信息易于发现的方式。如果 App 在启动时检测到问题，如无网络连接，请考虑通过其他方式告知用户。例如，你可以显示缓存或占位符数据，以及描述问题的非侵入式标签。

## 剖析

提醒是一种模态视图，在不同平台和设备上可能看起来有所不同。

**iOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/alert-ios@2x.png)

**macOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/alert-macos@2x.png)

**Apple tvOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/alert-tvos@2x.jpg)

**visionOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/alert-visionos@2x.png)

**watchOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/alert-watchos@2x.png)

## 内容

在所有平台中，提醒会显示标题、可选的信息文本和最多三个按钮。在部分平台上，提醒可包括额外元素。

- 在 iOS、iPadOS、macOS 和 visionOS 中，提醒可包括文本栏。
- macOS 和 visionOS 中的提醒可包括图标和补充视图。
- macOS 提醒可添加抑制[复选框](toggles.md#Checkboxes)和[帮助按钮](buttons.md#Help-buttons)。

**在所有的提醒文案中，采用直接、中立且平易近人的语气**。提醒通常描述了问题和严重情况，因此请避免拐弯抹角或指责，或是掩盖问题的严重性。

**编写清晰且简明描述情况的标题**。你需要帮助用户快速了解情况，因此标题要完整具体，而不啰嗦。尽可能描述所发生的情况，发生的背景及原因。避免编写出无法传达有用信息的标题，如“错误”或“发生错误 329347”，还要避免超过两行的过长标题。如果标题是完整的句子，请使用 [sentence-style capitalization](https://help.apple.com/applestyleguide/#/apsgb744e4a3?sub=apdca93e113f1d64)（句子式大写）和适当的结尾标点符号。如果标题是句子片段，请使用标题式大写，不要添加结尾标点符号。

**仅在有价值时才包括信息文本**。如果需要添加资讯信息，请尽可能保持简短，使用完整的句子、采用句子式大写以及适当的标点符号。

**避免解释提醒类按钮**。如果提醒文字和按钮标题清晰，你就不需要解释按钮的作用。在极少数情况下，你需要提供选取按钮的指南，请使用*选取*这类词来考虑用户的当前设备和交互方式，并使用不带引号的确切标题来引用按钮。有关指南，请参阅[按钮](alerts.md#Buttons)。

**如果支持，仅在需要用户输入以解决问题时才包括文本栏**。例如，你可能需要显示安全文本栏用于接收密码。

## 按钮

**创建简洁且合乎逻辑的按钮标题**。尽量使用一两个词的标题，描述选择按钮的结果。优先采用与提示文字直接相关的动词和动词短语，例如，“全部显示”、“回复”或“忽略”。仅在信息提醒中，你可以使用“好”表示接受，避免使用“是”和“否”。始终使用“取消”作为取消提醒操作的按钮标题。与所有按钮标题一样，使用 [title-style capitalization](https://help.apple.com/applestyleguide/#/apsgb744e4a3?sub=apdca93e113f1d64)（标题式大写），不添加结尾标点符号。

**避免将“好”用作默认按钮标题，除非提醒是纯信息类**。即使是在要求用户确认其意图的提醒中，“好”的含义也可能不清晰。例如，“好”是意味着“好，我想完成操作”，还是“好，我现在已了解此操作可能导致的负面结果”？“抹掉”、“转换”、“清除”或“删除”等具体的按钮标题，可帮助用户了解其正在执行的操作。

**将按钮放在用户期望的位置**。一般来说，将用户最有可能选择的按钮放在一排按钮的尾部或一堆按钮的顶部。始终将默认按钮放在一排按钮的尾部或一堆按钮的顶部。“取消”按钮通常位于一排按钮的开头或一堆按钮的底部。

**当按钮执行用户未特意选择的破坏性操作时，使用破坏性样式标识这类按钮**。例如，当用户特意选择某类破坏性操作（如“清倒废纸篓”）时，显示的提醒不会为“清倒废纸篓”按钮应用破坏性样式，因为该按钮执行的是用户原始意图。在这种情况下，按下 Return 键即可确认特意选择“清倒废纸篓”操作带来的便捷性大于重申该按钮具有破坏性带来的益处。相反，如果按钮能够执行与用户本意不符的破坏性操作，用户希望提醒能让其注意此类按钮。

**针对破坏性操作包括“取消”按钮，为用户提供明确、安全的方式来避开此类操作**。始终为取消提醒操作的按钮使用“取消”标题。请注意，“取消”按钮不应设为默认按钮。若要鼓励用户阅读提醒而非无意识按下 Return 键将其关闭，应避免将任何按钮设为默认按钮。同样，如果显示的提醒必须包含同时作为默认的单个按钮，请使用“完成”按钮，而非“取消”按钮。

**可行时提供取消提醒的替代方式**。除了选择“取消”按钮，用户喜欢使用键盘快捷键或其他快捷方式来取消屏幕提醒。例如：

| 操作 | 平台 |
| --- | --- |
| 退出到主屏幕 | iOS、iPadOS |
| 按下连接键盘上的 Escape (Esc) 键或 Command-句点 (.) 键 | iOS、iPadOS、macOS、visionOS |
| 按下遥控器上的 Menu（菜单） | Apple tvOS |

## 平台考量因素

*无针对 Apple tvOS 或 watchOS 的额外考量因素。*

### iOS、iPadOS

**使用操作表单而非提醒来提供特意操作相关的选项**。例如，当用户在“邮件”中取消正在编辑的邮件时，操作表单提供三个选项，分别是删除编辑内容（或整个草稿）、保存草稿或返回编辑。尽管提醒也可以帮助用户确认或取消带来破坏性后果的操作，但它不提供与该操作相关的附加选项。有关指南，请参阅[操作表单](action-sheets.md)。

**尽量避免显示滚动式提醒**。如果文本字号过大，用户可能需要滚动提醒，你应确保使提醒标题简短并仅在必要时包括简短信息，以最大程度地减少滚动的可能性。

### macOS

macOS 会自动在提醒中显示你的 App 图标，但你可以提供备选图标或符号。macOS 还可让你：

- 配置重复提醒让用户阻止后续出现的相同提醒。
- 在需要时附加自定义视图提供额外信息（有关开发者指南，请参阅 [accessoryView](https://developer.apple.com/cn/documentation/appkit/nsalert/accessoryview)）。
- 包括一个可打开帮助文稿的帮助按钮（请参阅[帮助按钮](buttons.md#Help-buttons)）。

**谨慎使用警告符号**。在提醒中过于频繁地使用 `exclamationmark.triangle` 等警告符号会降低其重要性。仅在确实需要特别注意的情况下才使用该符号，如确认可能导致数据意外丢失的操作。如果任务只是在于覆盖或移除数据，如保存或清倒废纸篓，请勿使用该符号。

### visionOS

App 在共享空间中运行时，visionOS 会在 App 的窗口前方（沿 z 轴稍微偏前）显示提醒。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/alerts-freeform-delete-warning.mp4)

如果用户在未关闭提醒的情况下移动窗口，提醒会持续锚定到窗口。如果 App 在全空间中运行，系统会在佩戴者[视场](spatial-layout.md#Field-of-view)的正中显示提醒。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/alerts-shared-space-pinning-to-window.mp4)

如果需要在 visionOS 提醒中显示补充视图，请创建最大高度为 154 点、圆角半径为 16 点的视图。

## 资源

#### 相关内容

[模态化](modality.md)

[操作表单](action-sheets.md)

[表单](sheets.md)

#### 开发者文档

[alert(_:isPresented:actions:)](https://developer.apple.com/cn/documentation/swiftui/view/alert(_:ispresented:actions:)-1bkka) — SwiftUI

[UIAlertController](https://developer.apple.com/cn/documentation/uikit/uialertcontroller) — UIKit

[NSAlert](https://developer.apple.com/cn/documentation/appkit/nsalert) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 2 月 2 日 | 完善了使用默认和“取消”按钮的指南。 |
| 2023 年 9 月 12 日 | 新增了 visionOS 剖析插图。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
