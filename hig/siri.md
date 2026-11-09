# Siri

原文：https://developer.apple.com/cn/design/human-interface-guidelines/siri

用户使用 Siri 协助其查找内容、了解信息或处理日常事务。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-Siri-intro@2x.png)

Siri 是个人助理，可协助用户在系统和使用的 App 中获取信息和执行快速操作。用户可通过多种方式与 Siri 交互，如使用其声音、从灵动岛向下轻扫或在 Siri App 中。

在支持的设备上，Siri AI 推出了由 Apple 智能驱动的 Siri 版本。在 App 中内容和功能与 Apple 智能集成的情况下，用户可使用 Siri 的自然语言感知和语境理解从系统中的任何位置发起 App 操作、与屏幕上的内容交互，以及快速访问原本需要深入 App 才能获取的功能。

例如，用户可从系统中的任何位置说“在 *AppName* 中给丽莎发信息”，Siri 即会以适合语境的方式帮助其完成该任务。屏幕上显示照片时，用户可以说“将这张照片添加到我的风景相簿中”，再说“用电子邮件发给卓文”，即会打开电子邮件编写视图并将卓文添加为收件人。若要将图像转换为灰度，说“将这个变成黑白的”也比导览菜单查找相同命令更快捷。

## 让 App 与 Siri 配合使用

默认情况下，系统不会对 App 的功能或包含的信息有具体认知。若要与 Siri 配合使用，App 必须使用 [App Intents](https://developer.apple.com/cn/documentation/appintents) 框架让其功能和内容可供 Apple 智能使用。

当 App 实现意图时，系统可在合适的系统体验中公开 App 的功能（App 操作或*意图*）和内容（App *实体*）。这使 App 的操作和内容可供基于 Apple 智能构建的功能（如 Siri、“聚焦”和“快捷指令” App）使用。有关开发者指南，请参阅：[Getting started with the App Intents framework](https://developer.apple.com/cn/documentation/appintents/getting-started-with-the-app-intents-framework)。

为了充分利用 Siri，App 还可以将其功能和内容与 App
*[模式](https://developer.apple.com/cn/documentation/appintents/app-schema-domains)*
（系统已理解的功能预设模板）关联。电子邮件、音乐或照片等常见领域中的 App 可使用系统的现有知识访问内建逻辑，以便通过结合自然对话的更广泛选项和更深入的语境理解来处理请求。有关开发者指南，请参阅：[Apple Intelligence and Siri AI](https://developer.apple.com/cn/documentation/appintents/apple-intelligence-and-siri-ai) 和 [Making actions and content discoverable by Apple Intelligence](https://developer.apple.com/cn/documentation/appintents/making-actions-and-content-discoverable-by-apple-intelligence)。

### 共享关联信息

除了通过模式呈现操作和内容，App 还可以将有关其内容和功能的语境信息告知系统，从而提供更加个性化的体验。

App 可通过使用 App 实体注释其视图及其他内容，将屏幕上的内容告知系统。这可为系统提供 Siri 所需信息来基于用户当前交互内容改进语境交互。例如，当用户在 Siri 对话中引用 App 局部内容（如按钮或屏幕图形）时，Siri 可使用 App 提供的注释理解用户的意图。有关开发者指南，请参阅：[Providing contextual cues to Apple Intelligence and Siri](https://developer.apple.com/cn/documentation/appintents/providing-contextual-cues-to-apple-intelligence-and-siri)。

若要为系统提供内容信息，App 可以向设备端“聚焦”索引贡献实体，使 App 信息可供在“聚焦”中或通过 Siri 进行搜索的用户使用。有关开发者指南，请参阅：[Defining app entities for your custom data types](https://developer.apple.com/cn/documentation/appintents/defining-app-entities-for-your-custom-data-types) 和 [Making app entities available in Spotlight](https://developer.apple.com/cn/documentation/appintents/making-app-entities-available-in-spotlight)。

App 还可将操作贡献为意图，从而将用户使用该 App 时所执行的操作告知系统。这有助于 Siri 预测用户可能想要执行的后续操作，并在适当时通过各种系统体验呈现。App 的可贡献操作示例包括用户的近期活动或其透露出兴趣的项目。有关开发者指南，请参阅：[Donating your app’s data and actions to the system](https://developer.apple.com/cn/documentation/appintents/donating-your-apps-data-and-actions-to-the-system)。

## 最佳实践

**识别 App 最常用的操作及其使用时间和位置**。了解与此类操作相关的语境（如在免提环境中或特定设备上），可协助你优先考虑将哪些操作和内容作为 App 意图和实体公开，以及协助你设计绝佳 Siri 体验。

**为内容和操作使用熟悉的术语**。创建 App 意图或实体时，应选取代表它的术语。例如，你可以将音频文件称为音轨、歌曲或播客。使用用户最有可能识别的语言来表示功能和内容，可使通过 Siri 与 App 的交互更自然直观。

**提供相关的内容**。与其将你 App 的所有内容告知“聚焦”，不如考虑与用户个人语境特别相关的内容，例如其最近搜索的内容、最喜爱的项目或书签，或者欲购清单的内容。某些 App 类别（如电子邮件或信息）可能有充分的理由将其整个目录视为相关信息；在此类情况下，提供扩展的访问许可会比较合适。

**不打广告**。不要在 Siri 提供的内容中包含广告、营销或 App 内购买项目推销说辞。

**仅在内建响应无法满足 App 需要时才提供自定义响应**。Siri 旨在预测各种自然语言请求并提供有用的响应，而无需其他配置。

## 自定义 App 配合 Siri 使用的体验

对于包含许多常见功能组合的 App，现有的 [App 模式领域](https://developer.apple.com/cn/documentation/appintents/app-schema-domains)可提供 App 所需内建功能来向 Apple 智能和 Siri 呈现其操作和内容，而无需任何额外工作。如果 App 功能超出了这些领域，*App 快捷指令*可提供方式向系统公开自定义操作供 Siri 访问。有关设计指南，请参阅：[App 快捷指令](app-shortcuts.md)。有关开发者指南，请参阅：[App Shortcuts](https://developer.apple.com/cn/documentation/appintents/app-shortcuts)。

若要自定义与现有模式相关的操作或部分内容的体验，App 可以将其他可选属性定义为意图或实体的一部分，以便基于语境增强 Siri 提供的响应。例如，App 可呈现音频文件播放时 Siri 可显示的播放控制[摘要卡片](snippets.md)。有关开发者指南，请参阅：[Displaying static and interactive snippets](https://developer.apple.com/cn/documentation/appintents/displaying-static-and-interactive-snippets)。

> **注**
>
> Siri 由 Apple 智能驱动，可提供与语境相关的响应。由于响应可能出现在各种语境中，其中一些语境并非视觉形式，因此，App 定义的可选意图或实体属性可能不会始终作为响应的一部分出现。

在提供额外自定义属性作为模式响应的一部分时，应考虑以下指南。

**编写清晰且描述性的响应对话**。有效的响应能清晰地传达 Siri 执行操作时发生的情况。如果你提出跟进问题，请务必自定义默认对话以确保清晰。例如，“哪种汤？”比“哪个？”更清晰。

**保持响应尽可能简洁**。用户可能会频繁与 Siri 交互，因此其可能会在回答跟进问题或处理错误时多次听到相同的响应。利用当前对话的语境剔除尽可能多的细节。避免包含不必要的文字或试图展现幽默感，因为随着时间的推移，两者都会变得令人恼火。

**提供 Siri 可通过语音和视觉形式传递的响应**。这可让 Siri 决定哪种交流方式最适合当前情境。例如，若用户使用 iPhone 询问天气，屏幕上会显示预报；若其使用 AirPods，Siri 会转为说出预报。确保语音响应可独立工作，且不依赖视觉元素填充必要信息。

**设计包容性交互**。避免在不必要时使用特定代词，从而创建对所有人友好的交互。例如，在响应“给我的好朋友发信息”时，不要说“他/她叫什么名字？”而是说“我要发给谁？”或“发给谁？”有关指南，请参阅：[编写](writing.md)和[包容性](inclusion.md)。

**当完整选项列表过长时，提出开放式问题**。如果完整选项列表过长而导致 Siri 无法及时读完，请通过开放式问题跟进，以缩小范围或获取更多详细信息。例如，响应购物 App 中可选鞋款的请求时，可以问：“你对什么类型的鞋感兴趣？”

**尽可能使响应与设备无关**。用户可能会在一台设备上发起 Siri 请求，然后让其在另一台设备上生效，因此设备特定用语可能容易造成混淆或误导。如果必须在响应中引用特定设备，请确保其准确且在语境中有意义。

**在响应中省略 App 名称**。响应用户时，系统已经提供了 App 的语音和视觉归因。

**使用恰当的语言并遵循家长控制**。不要在提供的对话文本中包含冒犯性语言。许多家庭使用家长控制限制儿童不宜内容和基于特定分级的其他材料。请注意，Siri 也可能大声响应，附近的人可能会听到响应。

**帮助用户了解错误和故障**。系统提供了一些默认的错误描述，但最好增强错误响应，使其特定于当前环境。例如，若鸡汤面卖完了，诸如“抱歉，鸡汤面卖完了”之类的错误比“抱歉，我们无法完成你的订单”更加清晰。

## 编辑指南

**用名字来指代 Siri**。不要用*她*或*他*之类的代词来指代 Siri。理想情况是只使用 *Siri* 一词。例如，“在将快捷指令添加到 Siri 后，你可以随时通过询问 Siri 运行该快捷指令”。有关更多指南，请参阅 [Guidelines for Using Apple Trademarks](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)。

**留意到系统会为 Siri 预留重要的操作和短语**。切勿冒充 Siri、试图复制 Siri 提供的功能，或提供看似来自 Apple 的响应。不要使用诸如“拨打 110”或“嘿 Siri”的预留短语。

**在本地化语境中，仅翻译“Hey Siri”指令中的单词 *Hey***。切勿翻译作为 Apple 商标的 *Siri*。以下是可接受的“Hey Siri”指令翻译版本列表：

| 语言区域代码 | “Hey Siri”翻译版本 | 语言区域代码 | “Hey Siri”翻译版本 |
| --- | --- | --- | --- |
| ar_AE | يا Siri | fr_CA | Dis Siri |
| ar_SA | يا Siri | fr_CH | Dis Siri |
| da_DK | Hej Siri | fr_FR | Dis Siri |
| de_AT | Hey Siri | it_CH | Ehi Siri |
| de_CH | Hey Siri | it_IT | Ehi Siri |
| de_DE | Hey Siri | ja_JP | Hey Siri |
| en_AU | Hey Siri | ko_KR | Siri야 |
| en_CA | Hey Siri | ms_MY | Hai Siri |
| en_GB | Hey Siri | nb_NO | Hei Siri |
| en_IE | Hey Siri | nl_BE | Hé, Siri |
| en_IN | Hey Siri | nl_NL | Hé Siri |
| en_NZ | Hey Siri | no_NO | Hei Siri |
| en_SG | Hey Siri | pt_BR | E aí Siri |
| en_US | Hey Siri | ru_RU | привет Siri |
| en_ZA | Hey Siri | sv_SE | Hej Siri |
| es_CL | Oye Siri | th_TH | หวัดดี Siri |
| es_ES | Oye Siri | tr_TR | Hey Siri |
| es_MX | Oye Siri | zh_CN | 嘿Siri |
| es_US | Oye Siri | zh_HK | 喂 Siri |
| fi_FI | Hei Siri | zh_TW | 嘿 Siri |
| fr_BE | Dis Siri |  |  |

## 资源

#### 相关内容

[App 快捷指令](app-shortcuts.md)

[摘要卡片](snippets.md)

#### 开发者文档

[App Intents](https://developer.apple.com/cn/documentation/appintents)

[App schema domains](https://developer.apple.com/cn/documentation/appintents/app-schema-domains)

[Apple Intelligence and Siri AI](https://developer.apple.com/cn/documentation/appintents/apple-intelligence-and-siri-ai)

#### 视频

- [使用 App Schemas 打造智能 Siri 体验](https://developer.apple.com/cn/videos/play/wwdc2026/240)
- [探索 App Intents 框架的新功能](https://developer.apple.com/cn/videos/play/wwdc2026/345)
- [探索适用于 Siri 和 Apple 智能的 App Intents 高级功能](https://developer.apple.com/cn/videos/play/wwdc2026/343)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 6 月 8 日 | 修改了针对 Siri AI 的内容。 |
| 2023 年 6 月 5 日 | 移除了“添加到 Siri”指南。新增对新 [App 快捷指令](app-shortcuts.md)页面的引用。 |
| 2023 年 5 月 2 日 | 已将指南整合为一页。 |
