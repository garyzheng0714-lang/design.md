# 摘要卡片

原文：https://developer.apple.com/cn/design/human-interface-guidelines/snippets

当用户通过 Siri 或 App 快捷指令执行任务时，摘要卡片会显示结果或请求确认。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-snippets-intro@2x.png)

当用户使用 [Siri](siri.md)、“聚焦”或“快捷指令” App 执行操作时，会出现紧凑视图进行响应。此类视图称为摘要卡片。

你可以通过融合设计的 [App 意图](https://developer.apple.com/cn/documentation/appintents)来呈现与 App 操作相关的摘要卡片，从而满足任务的特定需要。例如，你可以设计一个摘要卡片，用于查看天气预报或更新每日目标的进度。

摘要卡片有两种类型：确认和结果。*确认*摘要卡片可让用户确认或取消操作，并可能包括影响结果的选项。相比之下，*结果*摘要卡片会提供无需进一步操作的信息（有可能是确认的结果）。展示摘要卡片的 App 意图始终会显示结果，而不一定显示确认步骤。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/snippets-confirmation-type@2x.png)
*确认摘要卡片需要额外输入才能继续操作。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/snippets-result-type@2x.png)
*结果摘要卡片提供无需进一步操作的信息。*

有关开发者指南，请参阅 [Displaying static and interactive snippets](https://developer.apple.com/cn/documentation/appintents/displaying-static-and-interactive-snippets)。

## 剖析

摘要卡片由以下元素组成：

- **对话**。即 Siri 朗读的 App 意图对话，用于传达摘要卡片的信息。系统默认包括对话文本并将其放置在自定义视图上方。
- **自定义视图**。这是一种以视觉方式传达摘要卡片信息的视图。自定义视图可包括一个或多个按钮，用于修改摘要卡片内容、获取更多信息或执行其他操作。
- **系统提供的按钮**。确认摘要卡片在自定义视图下包括两个系统提供的按钮：辅助按钮“取消”和显示可自定义标签的主要按钮。结果摘要卡片仅包括单个“完成”按钮，用于关闭视图。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/snippets-custom-view-layout@2x.png)

## 最佳实践

**确保易读性**。检查摘要卡片的自定义内容与系统在浅色和深色外观下所提供的背景之间的对比度是否足够，并保持视图中内容的外边距一致。这可使布局更清晰，并帮助用户快速、可靠地理解摘要卡片。

**保持内容精简**。摘要卡片旨在促进快速轻量交互，因此保持其内容简短易读十分重要。为确保所有内容可见，请创建最大高度不超过 400 点的自定义视图。在考虑要包含的文本量时需注意，字体大小会因用户的首选文字大小设置而异。对于结果摘要卡片而言，如需提供更多详细信息，请使用可前往 App 中内容的深度链接，而非将其包含在自定义视图中。

**为确认摘要卡片的主要按钮选取描述性标签**。你可以从[系统提供](https://developer.apple.com/cn/documentation/appintents/confirmationactionname)的标签中选取合适的标签，也可以提供自定义标签。例如，在设计用于买咖啡的摘要卡片时，相比于“好”或“继续”，将主要按钮标记为“下单”会更清晰。若未指定标签，系统会默认使用“继续”。

**通过视觉方式传达摘要卡片的用途**。不要依赖显示对话文本来传达摘要卡片的用途。即使 App 意图对话语音对于没看屏幕的用户而言是非常必要的交互，也请优先在摘要卡片的视觉化展现中省略此类对话，而使用自定义视图传达其信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/snippet-response-heavy-dialogue-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/snippet-response-light-dialogue-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

## 平台考量因素

*无针对 iOS、iPadOS 或 macOS 的额外考量因素。在 Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[Siri](siri.md)

[App 快捷指令](app-shortcuts.md)

[实时活动](live-activities.md)

#### 开发者文档

[App Intents](https://developer.apple.com/cn/documentation/appintents)

#### 视频

- [设计交互式摘要卡片](https://developer.apple.com/cn/videos/play/wwdc2025/281)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 6 月 8 日 | 新页面。 |
