# App 快捷指令

原文：https://developer.apple.com/cn/design/human-interface-guidelines/app-shortcuts

App 快捷指令可让用户在整个系统中访问 App 的关键功能或内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-app-shortcuts-intro@2x.png)

若要启动 App 快捷指令，用户可使用 Siri、聚焦和“快捷指令” App 等功能，iPhone 或 Apple Watch 上的[操作按钮](action-button.md)等硬件功能，或者[轻捏](apple-pencil-and-scribble.md#Squeeze) Apple Pencil。

App 快捷指令是 App 的一部分，因此在安装完成后会立即可用。例如，手记 App 可提供用于新建手记的 App 快捷指令，用户首次打开 App 前就能使用。用户开始使用 App 后，App 快捷指令便可反映用户的选择，如 FaceTime 通话中呼叫最近联系人的选择。

App 快捷指令使用 [App Intents](https://developer.apple.com/cn/documentation/appintents) 定义 App 内提供给系统的操作。每个 App 快捷指令都包括一个或多个操作，表示用户可能想要执行以完成某项任务的一系列步骤。例如，家庭安全 App 可将用户晚上睡前关灯和锁户外门这两个常用操作组合到单个 App 快捷指令中。每个 App 可包括最多 10 个 App 快捷指令。

有关开发者指南，请参阅：[App Shortcuts](https://developer.apple.com/cn/documentation/appintents/app-shortcuts)。

> **注**
>
> 使用 App Intents 将 App 的操作提供给系统时，除了 App 提供的 App 快捷指令，用户还可在“快捷指令” App 中组合操作来创建自定义快捷指令。自定义快捷指令可让用户灵活配置操作行为，还可实现跨多个 App 执行任务的工作流程。有关更多指南，请参阅[《快捷指令使用手册》](https://support.apple.com/guide/shortcuts/welcome/ios)。

## 最佳实践

**若要让常见类型的 App 功能在整个系统中可见，请考虑改用 App 模式**。常见领域中的 App 可采用 [App 模式](https://developer.apple.com/cn/documentation/appintents/app-schema-domains)，让其操作和内容可供 Apple 智能使用。在支持的设备上，这可让 Siri 和其他系统体验根据语境显示 App 功能，无需采用单独的 App 快捷指令。有关指南，请参阅：[Siri](siri.md)。有关开发者指南，请参阅：[Apple Intelligence and Siri AI](https://developer.apple.com/cn/documentation/appintents/apple-intelligence-and-siri-ai) 和 [Making actions and content discoverable by Apple Intelligence](https://developer.apple.com/cn/documentation/appintents/making-actions-and-content-discoverable-by-apple-intelligence)。

App 快捷指令非常适用于在 App 模式未涵盖的区域向系统呈现独特功能或自定义内容。

**为 App 最常用和最重要的任务提供 App 快捷指令**。用户无需离开其当前环境即可完成的简单任务效果更佳，但如果有助于用户更轻松完成多步骤任务，你还可以打开你的 App。

**让用户可从一系列选项中选取，以提高灵活性**。App 快捷指令可包括单个可选值或参数（如有意义）。例如，冥想 App 可提供让用户开始特定类型冥想的 App 快捷指令：“开始[早上、每日、睡前]冥想。”用户没有列表可供参考，因此应将其熟悉的可预测值作为选项。有关开发者指南，请参阅 [Adding parameters to an app intent](https://developer.apple.com/cn/documentation/appintents/adding-parameters-to-an-app-intent)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-intents-parameter-diagram@2x.png)

**响应缺少可选信息的请求时，要求进一步说明**。例如，用户可能会说“开始冥想”而不指定类型（早上、每日或睡前）；你可以在跟进中建议其最近使用的类型或基于一天中的当前时间来建议。如果某个选项最有可能，请考虑将其作为默认项，并提供用户不想选择默认项时可选的替代项简短列表。

**保持语音交互简短**。如果你朗读指令时感觉过于复杂，则指令可能很难记住或正确说出。例如，“开始[睡前]冥想并播放自然声音”似乎有两个可能的参数：冥想类型和配乐。如果绝对需要额外信息，请在后续步骤中请求用户提供。有关编写语音交互对话文本的其他指南，请参阅 [Siri](siri.md)。

**使 App 快捷指令在 App 中可被发现**。用户发现针对其常用任务的 App 快捷指令可用时，就很有可能记住和使用这些快捷指令。考虑当用户执行常用操作时在你的 App 中显示临时提示，告知其存在 App 快捷指令。有关开发者指南，请参阅 [SiriTipUIView](https://developer.apple.com/cn/documentation/appintents/siritipuiview)。

### 响应 App 快捷指令

用户使用 App 快捷指令时，App 可通过各种方式响应，包括 Siri 说出的对话以及摘要卡片和实时活动等自定义视觉效果。

- [摘要卡片](snippets.md)非常适用于显示静态信息或对话选项的自定义视图，如显示用户所在位置的天气或确认订单。有关开发者指南，请参阅：[Displaying static and interactive snippets](https://developer.apple.com/cn/documentation/appintents/displaying-static-and-interactive-snippets)。
- [实时活动](live-activities.md)可持续显示在一段时间内很可能始终相关且会发生变化的信息，非常适用于事件完成前持续显示的计时器和倒计时。有关开发者指南，请参阅 [LiveActivityIntent](https://developer.apple.com/cn/documentation/appintents/liveactivityintent)。

**提供足够的详细信息，用于在纯音频设备上交互**。用户也可在 AirPods 和 HomePod 等纯音频设备上接收响应，且并非始终都能看到屏幕上的内容。请在 App 快捷指令的完整对话文本中包括所有关键信息。有关开发者指南，请参阅 [init(full:supporting:systemImageName:)](https://developer.apple.com/cn/documentation/appintents/intentdialog/init(full:supporting:systemimagename:))。

## 编辑指南

**提供简短好记的激活指令和自然的变体**。用户会说出 App 快捷指令的语音指令（或你定义的变体）来通过 Siri 运行 App 快捷指令，因此保持简短以更易于记住非常重要。快捷指令名称中必须包括 App 名称，但你可以在起名时发挥创意。例如，Keynote 讲演同时接受“创建 Keynote”和“在 Keynote 讲演中添加新演示文稿”，作为创建新文稿的 App 快捷指令语音指令。有关开发者指南，请参阅 [AppShortcutPhrase](https://developer.apple.com/cn/documentation/appintents/appshortcutphrase)。

**提及 App Shortcuts 或 Shortcuts App 时，请务必使用标题式大小写并确保 *Shortcuts* 是复数**。例如，*MyApp integrates with Shortcuts to provide a quick way to get things done with just a tap or by asking Siri, and offers App Shortcuts you can place on the Action button.*

**指代单个 shortcut（而不是 App Shortcuts 或 Shortcuts App）时，请使用小写**。例如，*Run a shortcut by asking Siri or tapping a suggestion on the Lock Screen.*

## 平台考量因素

*无针对 visionOS 或 watchOS 的额外考量因素。在 Apple tvOS 中不受支持。*

### iOS、iPadOS

用户搜索你的 App 时，App 快捷指令可显示在聚焦的“最佳搜索结果”区域，或下方的“快捷指令”区域中。每个 App 快捷指令都包括你选择用于代表其功能的 [SF 符号](sf-symbols.md)中的符号，或该快捷指令直接链接到的项目的预览图像。

**按重要性排序快捷指令**。你选取的顺序决定了 App 快捷指令最初在聚焦和“快捷指令” App 中显示的方式，因此首先包括通常最有用的快捷指令会很有帮助。用户开始使用 App 快捷指令后，系统会更新以优先显示其最频繁使用的快捷指令。

### macOS

macOS 不支持 App 快捷指令，但是支持使用 App Intents 为 App 创建的操作，而且用户可以在 Mac 上通过“快捷指令” App 使用这些操作构建自定义快捷指令。

## 资源

#### 相关内容

[Siri](siri.md)

[Siri Style Guide](https://developer.apple.com/siri/style-guide/)

[快捷指令使用手册](https://support.apple.com/guide/shortcuts/welcome/ios)

#### 开发者文档

[App Intents](https://developer.apple.com/cn/documentation/appintents)

[SiriKit](https://developer.apple.com/cn/documentation/sirikit)

[Getting started with the App Intents framework](https://developer.apple.com/cn/documentation/appintents/getting-started-with-the-app-intents-framework) — App Intents

[Defining app entities for your custom data types](https://developer.apple.com/cn/documentation/appintents/defining-app-entities-for-your-custom-data-types) — App Intents

#### 视频

- [快捷指令的新功能](https://developer.apple.com/cn/videos/play/wwdc2026/310)
- [设计交互式摘要卡片](https://developer.apple.com/cn/videos/play/wwdc2025/281)
- [了解 App Intents](https://developer.apple.com/cn/videos/play/wwdc2025/244)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 6 月 8 日 | 新增了针对采用 App 模式的指南。 |
| 2025 年 1 月 17 日 | 更新和精简了指南。 |
| 2023 年 6 月 5 日 | 新页面。 |
