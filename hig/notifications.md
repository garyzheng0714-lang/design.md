# 通知

原文：https://developer.apple.com/cn/design/human-interface-guidelines/notifications

通知为用户提供可一目了然的高价值即时信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-notification-intro@2x.png)

向用户发送任何通知前，你必须先获得其同意（有关开发者指南，请参阅 [Asking permission to use notifications](https://developer.apple.com/cn/documentation/usernotifications/asking-permission-to-use-notifications)）。在同意后，用户通常会使用设置来指定其想要接收的通知样式，还会为具有不同紧急程度的通知指定推送时间。若要进一步了解用户可自定义通知体验的方式，请参阅[管理通知](managing-notifications.md)。

## 剖析

根据不同的平台，通知可以使用各种样式，例如：

- 锁屏、主屏幕、主屏幕视图或桌面上的横幅或视图
- App 图标上的标记
- 通知中心中的项目

此外，与直接通信（如电话或信息）相关的通知还可以提供与非通信通知不同的界面，主要显示联系人图像（或*头像*）和群组名称，而非 App 图标。

## 最佳实践

**提供简明扼要的通知**。用户打开通知是为了获取快速更新，因此你应简洁地提供有价值的信息。

**避免为同一内容发送多个通知，即使用户尚未回应**。用户会在方便时处理通知。如果你为同一内容发送多个通知，通知中心会被塞满，用户就可能会关闭来自你 App 的所有通知。

**避免发送通知让用户在你的 App 内执行特定任务**。如果提供用户不打开 App 即可执行的简单任务可行，你可以提供[通知操作](notifications.md#Notification-actions)。否则，避免让用户执行操作，因为用户很难在关闭通知后记住此类指示。

**使用提醒（而非通知）来显示错误信息**。用户对提醒和通知都十分熟悉，因此不该因用错组件而造成混淆。有关指南，请参阅[提醒](alerts.md)。

**当你的 App 在前台时，请妥善处理通知**。当你的 App 在前台时，其通知不会出现，但 App 仍会接收对应信息。在这种情况下，请以一种可被发现但不令人分心或不具侵入性的方式呈现信息，如递增标记数字，或将新数据巧妙插入到当前视图中。例如，当一封新邮件到达用户当前正在查看的邮箱时，“邮件”仅会将其添加到未读邮件列表中，因为就该邮件发送通知没有必要且会造成干扰。

**避免在通知中包括敏感、个人或机密信息**。你无法预测用户是在什么情况下收到通知，因此避免包括可能会被他人看到的隐私信息至关重要。

## 内容

当通知包括标题时，系统会将其显示在最显眼的顶部位置。在与直接通信相关的通知中，系统会自动在标题区域中显示发件人的姓名；在非通信通知中，如果你不提供标题，系统会显示你的 App 名称。

**创建可提供通知内容语境的短标题**。优先使用用户可一目了然的简短标题，尤其是在空间有限的 Apple Watch 上。如果可能，请充分利用显眼的通知标题区域来提供有用的信息，如提要、活动名称或电子邮件主题。如果只能为非通信通知提供通用标题（如“新文稿”），则最好改为让系统显示你的 App 名称。使用无结尾标点符号的标题式[大写](https://support.apple.com/guide/applestyleguide/c-apsgb744e4a3/web#apdca93e113f1d64)。

**编写简明易读的通知内容**。使用完整句子、句首字母大写和适当标点符号，并且不要截断信息，因为系统会在必要时自动执行截断。

**提供在通知预览不可用时显示的一般描述性文本**。在“设置”中，用户可以选择隐藏所有 App 的通知预览。在这种情况下，系统仅会显示你的 App 图标和默认标题*通知”*。若要为用户提供足以了解是否要查看完整通知的语境，请编写可简明描述通知内容而不显示过多细节的正文文本，如“交友邀请”、“新评论”、“提醒”或“物流”（有关开发者指南，请参阅 [hiddenPreviewsBodyPlaceholder](https://developer.apple.com/cn/documentation/usernotifications/unnotificationcategory/hiddenpreviewsbodyplaceholder)）。为此文本使用句子式[大写](https://support.apple.com/guide/applestyleguide/c-apsgb744e4a3/web#apdca93e113f1d64)。

**避免包括你的 App 名称或图标**。系统会自动在每个通知的前缘显示你 App 图标的大尺寸版本；在通信通知中，系统会显示发件人的联系人图像，并标上图标的小尺寸版本。

**考虑提供声音作为通知的补充**。声音是区分你 App 通知的好方法，并可在用户未注视设备时引起其注意。你可以创建与 App 风格相协调的自定义声音，或使用系统提供的提醒声音。如果你使用自定义声音，请确保其简短、独特且经过专业制作。通知声音可以优化用户体验，但不要依赖它来传达重要信息，因为用户可能会漏听。虽然用户还可能想要振动伴随提醒声音出现，但你无法以编程方式提供此类振动。有关开发者指南，请参阅 [UNNotificationSound](https://developer.apple.com/cn/documentation/usernotifications/unnotificationsound)。

## 通知操作

通知可以呈现可自定义的详细信息视图，其中最多包含四个按钮，供用户在不打开 App 的情况下执行操作。例如，“日历”日程通知提供了一个“稍后提醒”按钮，可将日程闹钟推迟几分钟。有关开发者指南，请参阅 [Handling notifications and notification-related actions](https://developer.apple.com/cn/documentation/usernotifications/handling-notifications-and-notification-related-actions)。

**提供适合通知语境的有用操作**。首选让用户无需打开 App 即可执行常用和省时任务的操作。针对每个按钮使用首字母大写的简短术语或短语来清晰描述操作的结果。不要在按钮标签中包括你的 App 名称或任何无关的信息，保持文本精简以免被截断，并在编写时将本地化考虑在内。

**避免提供仅会打开 App 的操作**。当用户轻点通知或其预览时，他们期望你的 App 会显示相关内容，因此显示实现相同功能的操作按钮会使详细信息视图变得杂乱，并可能会令人困惑。

**优先使用非破坏性的操作**。如果必须要提供具有破坏性的操作，请确保为用户提供足够的语境，以免产生意外后果。系统会为你标识为破坏性的操作提供独特的外观。

**为每个通知操作提供简单且易于识别的界面图标**。界面图标可强化操作的含义，帮助用户立即理解其功能。系统会在操作标题的后端显示界面图标。使用 [SF 符号](sf-symbols.md)时，你可以选取可代表命令的现有符号或编辑相关符号来创建自定义图标。

## 标记

标记是一种包含数字的小实心椭圆，可显示在 App 图标上以指示可查看的未读通知的数量。标记会在用户处理未读通知后从 App 图标上消失，在新通知到达时重新出现。用户可在其通知设置中选择是否允许 App 显示标记。

**仅将标记用于向用户显示其未读通知的数量**。不要使用标记来传达与通知无关的数字信息，例如与天气相关的数据、日期和时间、股票价格或游戏分数。

**确保标记并非你用于传达重要信息的唯一方法**。用户可能会关闭 App 的标记，因此如果你依赖它来向用户显示何时有重要信息，他们可能会错过该信息。始终确保用户一打开 App 就能轻松找到重要信息。

**让标记保持最新状态**。在用户打开相应通知时立即更新你 App 的标记。你不应让用户在以为有新的通知可查看时，却发现他们早已查看过这些通知。请注意，标记数量清零会从通知中心移除所有相关通知。

**避免创建模仿标记外观或行为的自定义图像或组件**。用户可以自由关闭通知标记，如果在关闭后看到类似标记的内容，会感到不满。

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS 或 visionOS 的额外考量因素。*

### watchOS

在 Apple Watch 上，通知以两种状态出现：*短通知*和*长通知*。用户还可以在通知中心中查看通知。在受支持的设备上，用户可以互点两下来回应通知。

通过设计 Apple Watch 上 App 特定的相关资源和操作，你可以帮助用户获得出色的通知体验。如果你的 watchOS App 具有支持通知的 iPhone 配套 App，watchOS 可以在必要时自动提供默认的短通知和长通知。

#### 短通知

短通知会在佩戴者抬腕时出现，并在其放下手腕时消失。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/notifications-short-looks@2x.png)

**避免使用短通知作为传达重要信息的唯一方式**。短通知仅在较短时间内显示，让用户刚好足够查看通知是与什么相关以及发送自哪个 App。如果通知信息十分重要，请确保你同时还使用了其他推送方式。

**注重隐私**。短通知旨在谨慎保密，因此仅提供基本信息十分重要。避免在通知标题中包括可能敏感的信息。

#### 长通知

长通知提供与通知相关的更多详细信息。如有必要，用户可以垂直轻扫或使用数码表冠滚动长通知。在查看长通知后，用户可以通过轻点或简单放下手腕来将其关闭。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/notifications-long-looks@2x.png)

自定义的长通知界面可为静态或动态。*静态*界面可让你显示通知信息以及其他静态文本和图像。*动态*界面则可让你访问通知的完整内容，并提供更多用于配置界面外观的选项。

你可以自定义静态和动态长通知的内容区域，但无法更改界面的整体结构。系统定义的结构包括位于界面顶部的*饰带*以及位于底部和所有自定义按钮下方的“关闭”按钮。

**考虑使用内容丰富的自定义长通知，让用户无需启动你的 App 即可获得所需的信息**。你可以使用 SwiftUI [Animations](https://developer.apple.com/cn/documentation/swiftui/animations) 创建具有吸引力且可中断的动画，也可以使用 [SpriteKit](https://developer.apple.com/cn/documentation/spritekit) 或 [SceneKit](https://developer.apple.com/cn/documentation/scenekit)。

**至少提供一个静态界面，最好也另外提供一个动态界面**。当动态界面不可用时，例如无网络或无法访问 iPhone 配套 App 时，系统默认使用静态界面。确保提前为静态界面创建资源，并将其与你的 App 打包在一起。

**为饰带选取背景外观**。系统提供的饰带位于长通知界面的顶部，显示你 App 的图标和名称。你可以自定义饰带的颜色或赋予其模糊的外观。如果你在内容区域顶部显示照片，则可能需要使用模糊的饰带，它具有明亮的半透明外观，可带来叠加在图像之上的视觉效果。

**为内容区域选取背景颜色**。长通知的背景默认为透明。如果要匹配其他系统通知的背景颜色，请使用不透明度为 18% 的白色；或者你也可以使用自定义颜色，例如你的品牌调色盘内的颜色。

**在内容区域下方最多提供四个自定义操作**。对于每个长通知，系统会使用通知的类型来确定在通知用户界面中将哪些自定义操作显示为按钮。此外，系统还会始终在长通知界面底部及所有自定义按钮下方显示“关闭”按钮。如果你的 watchOS App 具有支持通知的 iPhone 配套 App，系统会共享该 iPhone App 已注册的可操作通知类型，并将其用于配置自定义操作按钮。

#### 互点两下

用户可以在受支持的设备上互点两下来回应通知。当用户互点两下来回应通知时，系统会选择第一个非破坏性操作作为回应。

**选取作为通知回应而呈现的自定义操作的顺序时，请将互点两下纳入考虑范围**。因为互点两下会运行第一个非破坏性操作，因此请考虑将用户最常用的操作放在列表顶部。例如，提供自定义操作以延长付费停车位时间的停车 App 可以提供将时间延长 5 分钟、15 分钟或 1 个小时的选项，优先列出用户最常用的选项。

## 资源

#### 相关内容

[管理通知](managing-notifications.md)

[提醒](alerts.md)

#### 开发者文档

[Asking permission to use notifications](https://developer.apple.com/cn/documentation/usernotifications/asking-permission-to-use-notifications) — User Notifications

[User Notifications UI](https://developer.apple.com/cn/documentation/usernotificationsui)

[User Notifications](https://developer.apple.com/cn/documentation/usernotifications)

#### 视频

- [发送通信和时效性通知](https://developer.apple.com/cn/videos/play/wwdc2021/10091)
- [

推送通知入门 ](https://developer.apple.com/cn/videos/play/wwdc2020/10095)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 10 月 24 日 | 更新了 watchOS 平台考量因素，包含呈现回应互点两下通知的指南。 |
