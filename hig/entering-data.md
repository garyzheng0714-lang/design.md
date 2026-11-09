# 数据输入

原文：https://developer.apple.com/cn/design/human-interface-guidelines/entering-data

需要从用户处获取信息时，请设法让用户在不出错的情况下轻松提供信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-entering-data-intro@2x.png)

无论用户使用何种交互方式，输入信息都是一个乏味的过程。通过以下方式来改进体验：

- 预收集尽可能多的信息，以尽量减少用户需要提供的数据量
- 支持所有可用的输入方式，以便用户选择适合自己的一种

## 最佳实践

**尽可能从系统获取信息**。不要让用户输入你可以自动收集（如从设置中收集）的信息或经用户许可后收集的信息，如其位置或日历信息。

**明确你需要的数据**。例如，你可以在文本栏中显示提示，如“username@company.com”，或提供描述信息的介绍标签，如“电子邮件”。还可以用合理的默认值预填充栏位，这可以最大限度地减少决策制定并加速数据输入。

**适当时使用安全文本输入栏**。如果 App 或游戏需要敏感数据，使用可在用户输入时遮盖输入内容的栏位，通常是为每个字符显示一个小的实心圆圈符号。有关开发者指南，请参阅 [SecureField](https://developer.apple.com/cn/documentation/swiftui/securefield)。在 Apple tvOS 中，你还可以配置[数字输入视图](https://developer.apple.com/cn/design/human-interface-guidelines/digit-entry-views)来遮盖用户输入的数字（有关开发者指南，请参阅 [isSecureDigitEntry](https://developer.apple.com/cn/documentation/tvuikit/tvdigitentryviewcontroller/issecuredigitentry)）。在 visionOS 中使用系统提供的文本栏时，系统会向佩戴者显示输入的数据，但不会向其他任何人显示；例如，当用户使用隔空播放来流播放内容时，安全文本栏会自动模糊。

**切勿预填充密码栏**。始终要求用户输入密码，或者使用生物识别或钥匙串认证。有关指南，请参阅[管理账户](managing-accounts.md)。

**在可能时提供选项，而不是要求输入文本**。从选项列表中进行选择通常比键入信息更轻松且更高效，即使有方便可用的键盘时也是如此。如果可行，考虑使用选择器、菜单或其他选择组件，让用户可以轻松提供你所需的信息。

**尽可能让用户通过拖放或粘贴方式提供数据**。支持这些交互方式可以简化数据输入，并让使用体验与系统的其余部分更加融合。

**动态验证栏位值**。用户在填写了冗长的表单后需要返回并改正错误时，可能会感到特别懊恼。若可在用户输入值后立即进行验证，并在检测到问题时即刻提供反馈，就可让用户有机会立即改正错误。尤其是对于数字数据，你可以考虑使用数字格式化程序，它会自动将文本栏配置为仅接受数字值。还可以将格式化程序配置为以特定方式显示值，如带有特定小数位数、百分比或货币。

**输入数据为必要条件时，确保用户了解必须提供所需数据后才能继续**。例如，如果在一组文本栏之后包括“下一步”或“继续”按钮，请仅在用户输入必填数据后才将按钮变为可用。

## 平台考量因素

*无针对 iOS、iPadOS、Apple tvOS、visionOS 或 watchOS 的额外考量因素。*

### macOS

**考虑使用扩展工具提示在栏位中显示被裁剪或被截断文本的完整版本**。*扩展工具提示*的行为类似于常规工具提示，当指针停留在栏位上时显示。在 macOS 中运行的 App，包括在 Mac 上运行的 iOS 和 iPadOS App，可以使用扩展工具提示来帮助用户在文本栏太小而无法全部显示时，查看他们输入的完整数据。有关指南，请参阅[“提供帮助”> macOS、visionOS](https://developer.apple.com/cn/design/human-interface-guidelines/offering-help#macOS-visionOS)。

## 资源

#### 相关内容

[文本栏](text-fields.md)

[虚拟键盘](virtual-keyboards.md)

[键盘](keyboards.md)

#### 开发者文档

[Input events](https://developer.apple.com/cn/documentation/swiftui/input-events) — SwiftUI

#### 视频

- [UIKit 中的新功能](https://developer.apple.com/cn/videos/play/wwdc2021/10059)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
