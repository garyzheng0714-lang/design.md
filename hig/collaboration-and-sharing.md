# 协作和共享

原文：https://developer.apple.com/cn/design/human-interface-guidelines/collaboration-and-sharing

出色的协作和共享体验简单且响应迅速，可让用户专注于内容的同时与他人进行有效的沟通。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-collaboration-and-sharing-intro@2x.png)

系统界面和“信息” App 可帮助你为用户提供一致且方便的协作和共享方式。例如，用户要共享内容或开始协作时，可以将文稿拖放到“信息”对话中，或在熟悉的共享表单中选择一个目的位置。

协作开始后，用户可以使用你 App 中的“协作”按钮与他人沟通、执行自定义操作和管理详细信息。此外，在协作者提及用户、更改、加入或退出时，用户可以收到“信息”通知。

无论是通过 CloudKit、iCloud 云盘还是自定义解决方案实现协作和共享，你都可以利用“信息”集成和系统提供的共享界面。若要在使用自定义协作基础架构时提供这些功能，请确保你的 App 也支持通用链接（有关开发者指南，请参阅 [Supporting universal links in your app](https://developer.apple.com/cn/documentation/xcode/supporting-universal-links-in-your-app)）。

借助同播共享，用户还可从自己的设备实时共同参与你 App 中的活动。有关指南，请参阅：[同播共享](shareplay.md)。

## 最佳实践

**将“共享”按钮放在工具栏等方便的位置，让用户轻松开始共享或协作**。在 iOS 16 中，系统提供的共享表单包括几种选取文件共享和为新协作设定许可的方式；iPadOS 16 和 macOS 13 在共享弹出窗口中引入了类似的外观和功能。在 SwiftUI App 中，你还可以通过显示一个共享链接来实现共享，该链接可在用户选取它时打开系统提供的共享表单；有关开发者指南，请参阅 [ShareLink](https://developer.apple.com/cn/documentation/swiftui/sharelink)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/collaboration-share-button@2x.png)

**如有必要，自定义共享表单或共享弹出窗口以提供 App 支持的文件共享类型**。如果使用 CloudKit，你可以通过将文件和协作对象传递到共享表单来支持发送文件副本。由于共享表单内建了对多项目的支持，它会自动检测文件并实现“发送副本”功能。若使用 iCloud 云盘，你的协作对象默认支持“发送副本”功能。对于自定义协作，你可以在协作对象中包括一个文件或它的纯文本表现形式来支持共享表单中的“发送副本”功能。

**撰写简洁的语句总结所支持的共享权限**。例如，你可以编写“仅受邀用户可编辑”或“任何用户均可更改”这样的语句。系统会在一个按钮中使用你的权限摘要，该按钮显示了一组用户用于定义协作的共享选项。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/collaboration-sharing-permission-invited@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/collaboration-sharing-permission-everyone@2x.png)

**提供一组简单的共享选项以精简协作设置**。你可以自定义用户选取权限摘要按钮时显示的视图，以提供可反映协作功能的选项。例如，你可以提供选项让用户指定谁可以访问内容、他们是可以编辑还是只能查看，以及协作者是否可以添加新参与者。尽可能使用最少数量的自定义选项，并以有助于用户快速了解的方式进行分组。

**协作开始时立即突显“协作”按钮**。系统提供的“协作”按钮提醒了用户该内容已共享并标识出共享者。由于“协作”按钮通常在用户与共享表单或共享弹出窗口交互后显示，将它放在“共享”按钮旁边效果不错。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/collaboration-status-active-collaboration-button@2x.png)

**仅在需要时于协作弹出窗口中提供自定义操作**。在 App 中选取“协作”按钮会呈现一个由三部分组成的弹出窗口。顶部会列出协作者并提供可打开“信息”或 FaceTime 通话的沟通按钮，中部包含自定义项，底部显示一个用户用于管理共享文件的按钮。应避免过多的信息使得用户不知所措，因此在用户使用 App 协作时只提供他们最需要的基本项目非常重要。例如，“备忘录”会总结最近的更新，并提供按钮让用户获取有关更新的更多信息或查看更多活动。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/collaboration-custom-popover-notes@2x.png)

**如在你的 App 中可行，自定义模态视图中协作管理按钮的标题**。此按钮默认标题为“管理共享文件”，用户选取它来显示协作管理视图，供他们更改设置和添加或移除协作者。如果使用 CloudKit 共享，系统会为你提供一个管理视图；否则，你要自己创建一个。

**考虑在“信息”中发布协作事件通知**。选取发生的事件类型，如内容或协作成员变动或者提及参与者，并包括用户可用来在你的 App 中打开相关视图的通用链接。有关开发者指南，请参阅 [SWHighlightEvent](https://developer.apple.com/cn/documentation/sharedwithyou/swhighlightevent)。

## 平台考量因素

*无针对 iOS、iPadOS 或 macOS 的额外考量因素。在 Apple tvOS 中不可用。*

### visionOS

系统针对共享空间中运行的 App 默认支持屏幕共享，方法是将当前窗口流传输给其他协作者。如果共享期间其中一人将该 App 转换到全空间，系统会为其他人暂停流传输，直至 App 转换回共享空间。有关指南，请参阅[沉浸式体验](immersive-experiences.md)。

### watchOS

对于在 watchOS 中运行的 SwiftUI App，请使用 [ShareLink](https://developer.apple.com/cn/documentation/swiftui/sharelink) 显示系统提供的共享表单。

## 资源

#### 相关内容

[活动视图](activity-views.md)

#### 开发者文档

[Shared with You](https://developer.apple.com/cn/documentation/sharedwithyou)

[ShareLink](https://developer.apple.com/cn/documentation/swiftui/sharelink) — SwiftUI

#### 视频

- [利用“信息”设计协作体验](https://developer.apple.com/cn/videos/play/wwdc2022/10015)
- [利用“信息”提升协作体验](https://developer.apple.com/cn/videos/play/wwdc2022/10095)
- [集成你的自定义协作 App 到“信息”](https://developer.apple.com/cn/videos/play/wwdc2022/10093)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 12 月 5 日 | 新增了展示按钮放置方式和各种类型协作许可的插图。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
| 2022 年 9 月 14 日 | 新页面。 |
