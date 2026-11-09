# 旁白

原文：https://developer.apple.com/cn/design/human-interface-guidelines/voiceover

旁白是一款屏幕朗读器，可让用户无需看向屏幕即可体验 App 的界面。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-VoiceOver-intro@2x.png)

通过支持旁白，你可以帮助盲人或弱视用户在无法看到屏幕的情况下访问 App 中的信息和导览其界面及内容。

针对 Apple 平台构建的 App 和游戏均支持旁白。在 Unity 中开发的 App 和游戏也可以使用 [Apple 的 Unity 插件](https://github.com/apple/unityplugins)支持旁白。相关指南，请参阅[无障碍](accessibility.md)。

## 描述

你可以通过提供说明 App 界面及其所显示内容的备选文本，将 App 内容告知旁白。

**为所有关键界面元素提供备选标签**。旁白使用备选标签（在屏幕上不可见）通过语音描述 App 界面。虽然系统提供的控制默认包括通用标签，但你还应提供更具描述性的标签传达 App 的功能。为 App 使用的任何自定义元素添加标签。确保在 App 界面及内容发生更改时同步更新描述。有关开发者指南，请参阅：[Accessibility modifiers](https://developer.apple.com/cn/documentation/swiftui/view-accessibility)。

**描述有含义的图像**。若不描述 App 内容中的关键图像，用户将无法在 App 内使用旁白完整体验它们。由于旁白还会帮助用户理解图像周围的界面（如附近的说明），只需描述图像本身传达的信息即可。

**使图表和其他信息图形可完整访问**。为每个信息图形提供简洁的描述，解释其传达的内容。如果用户可以与信息图形交互以获取更多或不同信息，请同时让旁白用户可实现这些交互。无障碍 API 提供了表示自定义交互元素的方式，以便辅助技术可帮助用户使用它们。有关指南，请参阅[图表](charts.md)。

**为旁白排除纯装饰性图像**。不必描述装饰性图像和未传达有用或可操作信息的图像。排除这类图像是对用户时间的尊重，还可减少其在使用旁白时的认知负荷。有关开发者指南，请参阅 [accessibilityHidden(_:)](https://developer.apple.com/cn/documentation/swiftui/view/accessibilityhidden(_:))、[accessibilityElement](https://developer.apple.com/cn/documentation/appkit/nsaccessibility-c.protocol/accessibilityelement) 和 [isAccessibilityElement](https://developer.apple.com/cn/documentation/uikit/uiaccessibilityelement/isaccessibilityelement)。

## 导览

**使用标题和小标题帮助用户导览信息层级结构**。用户在到达 App 中的某个页面或屏幕时，标题是其从辅助技术接收到的第一条信息。为各页提供可简洁描述其内容和用途的唯一标题。同理，使用准确的章节小标题帮助用户针对每页的信息层级结构搭建心智模型。

**指定元素的分组、排序或链接方式**。近距离、对齐和其他可见的语境提示可帮助视力正常的用户感知元素之间的关系。检查 App 中元素之间为纯视觉关系的地方，然后向旁白描述这些关系。

旁白会按照用户当前所用语言和所在地区阅读内容的相同顺序朗读元素。例如，使用英语（美国）时，顺序为从上到下、从左到右。在以下未分组示例中，旁白会先描述每个图像，然后才轮到说明。在分组示例中，旁白则会分别描述各图像连同其各自的说明。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/voiceover-incorrect-grouping@2x.png)
*未分组的相关元素会使旁白难以准确描述用户界面。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/voiceover-correct-grouping@2x.png)
*分组的相关元素有助于旁白准确描述用户界面。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

有关开发者指南，请参阅 [shouldGroupAccessibilityChildren](https://developer.apple.com/cn/documentation/objectivec/nsobject-swift.class/shouldgroupaccessibilitychildren)。

**在可见内容或布局发生更改时告知旁白**。用户可能会对非预期的内容或布局变化感到困惑，因为这意味着其针对内容的心理地图不再准确。报告可见的更改至关重要，这样旁白和其他辅助技术才能帮助用户更新其对内容的了解。有关开发者指南，请参阅 [AccessibilityNotification](https://developer.apple.com/cn/documentation/accessibility/accessibilitynotification)。

**尽可能支持旁白转子**。用户可以使用称为旁白转子的界面元素按标题、链接及其他内容类型导览文稿或网页。你可为转子标识相关元素，从而协助用户在 App 中导览内容。转子还可以调出盲文键盘。有关开发者指南，请参阅 [AccessibilityRotorEntry](https://developer.apple.com/cn/documentation/swiftui/accessibilityrotorentry) (SwiftUI)、[UIAccessibilityCustomRotor](https://developer.apple.com/cn/documentation/uikit/uiaccessibilitycustomrotor) (UIKit) 和 [NSAccessibilityCustomRotor](https://developer.apple.com/cn/documentation/appkit/nsaccessibilitycustomrotor) (AppKit)。

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS 或 watchOS 的额外考量因素。*

### visionOS

**注意自定义手势并非始终可用**。在 visionOS 中打开旁白时，使用自定义手势的 App 和游戏默认不会接收手部输入。这可确保用户能通过语音探索界面，避免 App 同时响应手部输入。用户可选择启用直接手势模式更改此行为，这会停用旁白标准手势，并让 App 直接处理手部输入。有关开发者指南，请参阅 [Improving accessibility support in your visionOS app](https://developer.apple.com/cn/documentation/visionos/improving-accessibility-support-in-your-app)。

## 资源

#### 相关内容

[无障碍](accessibility.md)

[包容性](inclusion.md)

#### 开发者文档

[Accessibility](https://developer.apple.com/cn/documentation/accessibility)

[VoiceOver](https://developer.apple.com/cn/documentation/accessibility/voiceover)

[Supporting VoiceOver in your app](https://developer.apple.com/cn/documentation/uikit/supporting-voiceover-in-your-app)

#### 视频

- [编写出色的辅助功能标签](https://developer.apple.com/cn/videos/play/wwdc2019/254)
- [定制富数据 App 中的旁白体验](https://developer.apple.com/cn/videos/play/wwdc2021/10121)
- [自定义转子的旁白效率](https://developer.apple.com/cn/videos/play/wwdc2020/10116)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 3 月 7 日 | 新页面。 |
