# 提供帮助

原文：https://developer.apple.com/cn/design/human-interface-guidelines/offering-help

虽然最高效的体验是易操作且直观的，但你仍可根据需要提供关联帮助。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-offering-help-intro@2x.png)

## 最佳实践

**根据 App 的任务决定用户可能需要的帮助类型**。例如，你可以通过显示简明描述任务的内联视图，来帮助用户执行包含一两步操作的简单任务。相比之下，如果你的 App 或游戏支持复杂或多步骤的任务，不妨提供教程来指导用户如何实现更大的目标。一般情况下，请将你提供的帮助直接关联到用户当前正在执行的确切操作或任务，并让用户可在不需要时轻松关闭或跳过帮助。

**在帮助内容中使用相关且一致的语言和图像**。始终确保指引内容适用于当前的语境。例如，如果用户正在你所打造的 Apple tvOS 体验中使用 Apple TV Remote，则不要显示针对游戏控制器的提示或图像。另外确保使用与平台相一致的术语和描述。例如，材料中不要出现让用户在 iPhone 上点按按钮或在 Mac 上轻点菜单项的措辞。

**确保所有帮助内容都具有包容性**。有关指南，请参阅[包容性](inclusion.md)。

**避免因解释标准组件或模式的运作原理而使帮助内容冗长**。相反，应描述 App 或游戏中标准元素执行的特定操作或任务。如果你所打造的体验采用独特的控制方式或期待用户以非标准的方式使用输入设备（例如手持旋转 90 度的 Apple TV Remote），请优先使用动画或图形（而非冗长的描述）进行教学，以让用户快速熟悉。

## 创建提示

提示是一个瞬态小视图，可简要描述如何使用 App 中的功能。提示可很好地应用于教用户使用 App 中全新或不太明显的功能，或者帮助其发现完成任务的更快方式。有关开发者指南，请参阅 [TipKit](https://developer.apple.com/documentation/TipKit)。

**为 App 的用户界面使用最合适的提示类型**。在想要保留内容流时显示弹出式提示，或在想要确保周围信息可见时显示内联提示。你可以使用注解式内联提示指向特定用户界面元素，或在提示与特定用户界面部分不相关时，使用示意式提示。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/offering-help-tip-popover@2x.png)
*弹出式*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/offering-help-tip-annotation@2x.png)
*注解式*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/offering-help-tip-hint@2x.png)
*示意式*

**为简单功能使用提示**。提示最适用于易于描述且用户通过几个简单步骤就能完成的功能。如果某项功能需要不止三步操作，则可能对于提示而言过于复杂。

**做到提示简短、可供操作且有吸引力**。提示的目标在于鼓励用户试用新功能。使用直白、面向操作的语言来描述功能实现的效果并解释使用方法。将提示保持在一两句话，避免包括宣传性内容或者与其他功能或用户流程相关的内容。宣传性内容是与广告或销售相关的任何内容，或者与用户当前所执行操作的环境不符的内容。

**定义相关规则以帮助确保提示可显示给目标受众**。并非所有用户都会从每则提示中受益。例如，已经使用过某项功能的用户不希望看到描述该功能的提示。使用基于参数或基于事件的条件符合规则来控制提示显示的时间，并仅在用户可能从中受益时显示提示。如果 App 包含多则提示，请设定显示频率以便提示按照合理的频率显示，例如每隔 24 小时显示一次。

**如果图像或符号可让用户关联到某项功能，应考虑在提示中包括该图像，并优先使用填充变体**。例如，包含星形的提示可帮助用户了解该提示与个人收藏相关。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/offering-help-tip-symbol-usage-unfilled-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/offering-help-tip-symbol-usage-filled-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

如果表示功能的图像与提示直接相关，应避免同时在提示和用户界面中重复使用相同图像。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/offering-help-tip-symbol-usage-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/offering-help-tip-symbol-usage-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

**使用按钮将用户导向信息或选项**。如果功能包含用户可自定义的设置，或者你想要将用户重新导向可进一步了解功能的区域，请考虑添加按钮。按钮可直接将用户导向能够进行调整的设置。或者如果有更多用户可能觉得有用的信息，请添加按钮将用户导向额外的资源，例如设置流程。

## 平台考量因素

*无针对 iOS、iPadOS、Apple tvOS 或 watchOS 的额外考量因素。*

### macOS、visionOS

工具提示（在用户文档中称为*帮助标记*）会显示一个瞬态小视图，可简要描述界面中组件的使用方式。在 Mac 上运行的 App（包括 iPhone 和 iPad App）中，工具提示可在用户将指针放在元素上时出现；在 visionOS App 中，工具提示可在用户注视元素或者将指针放在元素上时出现。有关开发者指南，请参阅 [help(_:)](https://developer.apple.com/cn/documentation/swiftui/view/help(_:)-6oiyb)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/offering-help-macos-tooltip-help-tag@2x.png)

**仅描述用户表现出兴趣的控制**。当用户想要知道如何使用特定控制时，他们并不是想了解如何使用附近的控制或如何执行更大的任务。

**解释控制可发起的操作或任务**。使用动词开头的描述通常效果不错，例如，“恢复默认设置”或“从列表添加或移除语言”。

**一般应避免在控制的工具提示中重复其名称**。重复名称会占据工具提示的空间，且对描述几乎没有价值。

**精简内容**。尽可能将工具提示内容限制在 60 至 75 字符以内（注意：本地化通常会使文本长度发生更改）。若要使描述简短直接，请考虑使用不完整句并省略冠词。如果需要大量文字来描述控制，请考虑精简你的界面设计。

**使用句子首字母大写**。句子首字母大写一般会让用户感到更加随意和亲和。如果编写完整的句子，请省略结尾的标点符号，除非需要和 App 风格保持一致。

**考虑提供上下文关联工具提示**。例如，你可以为控制的各种状态提供不同文本。

## 资源

#### 相关内容

[用户引导](onboarding.md)

[反馈](feedback.md)

[编写](writing.md)

[“帮助”菜单](the-menu-bar.md#Help-menu)

#### 开发者文档

[TipKit](https://developer.apple.com/cn/documentation/tipkit)

[NSHelpManager](https://developer.apple.com/cn/documentation/appkit/nshelpmanager) — AppKit

#### 视频

- [使用 TipKit 以提升功能的可发现性](https://developer.apple.com/cn/videos/play/wwdc2023/10229)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 12 月 5 日 | 在创建工具提示的指南中包括了 visionOS。 |
| 2023 年 9 月 12 日 | 新增了创建提示的指南。 |
