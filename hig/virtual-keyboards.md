# 虚拟键盘

原文：https://developer.apple.com/cn/design/human-interface-guidelines/virtual-keyboards

在未配备实体键盘的设备上，系统提供了各种类型的虚拟键盘，供用户用于输入数据。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/components-virtual-keyboard-intro@2x.png)

虚拟键盘可以提供一组针对当前任务优化的特定按键；例如，支持输入电子邮件地址的键盘可包括“@”字符和句点，甚至还包括“.com”。  虚拟键盘不支持键盘快捷键。

如果在你的 App 中可行，你可以将系统提供的键盘替换为支持 App 特定数据输入的自定义视图。  在 iOS、iPadOS 和 Apple tvOS 中，你还可以创建提供自定义键盘的 App 扩展，用户可安装该键盘并用其代替标准键盘。

## 最佳实践

**选取与用户正编辑的内容类型相匹配的键盘**。例如，你可以通过提供数字和标点符号键盘来帮助用户输入数字数据。当你为文本输入区域指定语义时，系统可以自动提供与你期望的输入类型相匹配的键盘，并可能使用此信息改进其提供的键盘改正。有关开发者指南，请参阅 [keyboardType(_:)](https://developer.apple.com/cn/documentation/swiftui/view/keyboardtype(_:)) (SwiftUI)、[textContentType(_:)](https://developer.apple.com/cn/documentation/swiftui/view/textcontenttype(_:)) (SwiftUI)、[UIKeyboardType](https://developer.apple.com/cn/documentation/uikit/uikeyboardtype) (UIKit) 和 [UITextContentType](https://developer.apple.com/cn/documentation/uikit/uitextcontenttype) (UIKit)。

**支持 ASCII**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-ascii-capable@2x.png)

**支持 ASCII 的数字小键盘**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-ascii-capable-number-pad@2x.png)

**小数小键盘**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-decimal-pad@2x.png)

**默认**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-default@2x.png)

**电子邮件地址**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-email-address@2x.png)

**姓名电话键盘**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-name-phone-pad@2x.png)

**数字小键盘**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-number-pad@2x.png)

**数字和标点符号**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-numbers-and-punctuation@2x.png)

**拨号键盘**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-phone-pad@2x.png)

**Twitter**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-twitter@2x.png)

**URL**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-url@2x.png)

**网页搜索**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/virtual-keyboard-web-search@2x.png)

**如果有助于使文本输入体验更清晰，可考虑自定义 Return 键类型**。Return 键类型基于你所选的键盘类型，但你可以根据 App 实际情况进行更改。例如，如果 App 启动搜索，你可以使用搜索 Return 键类型而非标准类型，这样体验便会与用户在其他位置启动搜索的体验一致。有关开发者指南，请参阅 [submitLabel(_:)](https://developer.apple.com/cn/documentation/swiftui/view/submitlabel(_:)) (SwiftUI) 和 [UIReturnKeyType](https://developer.apple.com/cn/documentation/uikit/uireturnkeytype) (UIKit)。

## 自定义输入视图

在某些情况下，如果要提供可优化 App 中数据输入任务的自定义功能，你可以创建*输入视图*。例如，Numbers 表格针对编辑电子表格时的数值输入提供了自定义输入视图。用户位于你的 App 中时，自定义输入视图会替换系统提供的键盘。有关开发者指南，请参阅 [ToolbarItemPlacement](https://developer.apple.com/cn/documentation/swiftui/toolbaritemplacement) (SwiftUI) 和 [inputViewController](https://developer.apple.com/cn/documentation/uikit/uiresponder/inputviewcontroller) (UIKit)。

**确保自定义输入视图适用于你 App 的环境**。除了使数据输入简单直观外，你还应该让用户了解使用你的自定义输入视图的好处。不然，用户可能会好奇为什么在你的 App 中无法返回系统键盘。

**在用户键入时，播放标准键盘声音**。当用户轻点系统键盘上的按键时，键盘声音会提供熟悉的反馈，因此当其在自定义输入视图中轻点按键时，很可能会期望听到相同的声音。用户可以在“设置”>“声音”中关闭所有键盘交互的键盘声音。有关开发者指南，请参阅 [playInputClick()](https://developer.apple.com/cn/documentation/uikit/uidevice/playinputclick()) (UIKit)。

## 自定义键盘

在 iOS、iPadOS 和 Apple tvOS 中，你可以通过创建 App 扩展来提供替换系统键盘的自定义键盘。*App 扩展*是你提供的代码，用户可以安装并用来扩展系统特定区域的功能；若要进一步了解，请参阅 [App 扩展](https://developer.apple.com/app-extensions/)。

用户在“设置”中选择自定义键盘后，可以在任何 App 中使用该键盘进行文本输入，但编辑安全文本栏和电话号码栏除外。用户可以选择多个自定义键盘，并随时在它们之间切换。有关开发者指南，请参阅：[Creating a custom keyboard](https://developer.apple.com/cn/documentation/uikit/creating-a-custom-keyboard)。

当你想要在整个系统范围内展示独特的键盘功能（例如以新颖方式输入文本或可键入系统不支持的语言）时，自定义键盘很有意义。如果要为用户提供仅在你 App 中使用的自定义键盘，可考虑改为创建自定义输入视图。

**提供简单明了的键盘切换方式**。用户了解标准键盘上的地球仪键（在多个键盘可用时，会替换专用表情符号键）可快速切换到其他键盘，因而会期望在你的键盘中也获得类似的直观体验。

**避免重复系统提供的键盘功能**。在部分设备上，表情符号/地球仪键和听写键会自动出现在键盘下方，即使用户使用的是自定义键盘。你的 App 无法影响这些键，因而如果你在键盘上重复这些键，很可能会令人困惑。

**考虑在你的 App 中提供键盘教程**。用户习惯使用标准键盘，而且学习新键盘的使用方式可能需要一些时间。你可以通过在 App 中提供使用说明来帮助简化此过程，例如，你可以告诉用户如何选择你的键盘、如何在文本输入期间进行激活、如何使用以及如何切换回标准键盘。避免在键盘本身内显示帮助内容。

## 平台考量因素

*在 macOS 中不受支持。*

### iOS、iPadOS

**使用键盘布局指南，让键盘感觉像是界面的组成部分**。使用布局指南还有助于在屏幕上显示虚拟键盘时仍保持界面的重要部分可见。有关开发者指南，请参阅 [Adjusting your layout with keyboard layout guide](https://developer.apple.com/cn/documentation/uikit/adjusting-your-layout-with-keyboard-layout-guide)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ui-fully-visible@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)
*键盘布局指南有助于确保 App 用户界面与键盘协同工作。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/text-field-hidden@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*如果没有布局指南，键盘可能会让文本输入变得更加困难。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-hidden@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*如果没有布局指南，键盘可能会让轻点按钮变得更加困难。*

**充分考虑自定义控制在键盘上方的放置位置**。部分 App 将包含自定义控制的输入补充视图放在键盘上方，呈现与用户正处理数据相关的 App 特定功能。例如，Numbers 表格显示的控制可帮助用户将标准或自定义计算应用到电子表格数据。如果 App 提供增强键盘功能的自定义控制，请确保其与当前任务相关。如果 App 中的其他视图使用 Liquid Glass，或者视图在键盘上方看起来不协调，请为包含控制的视图应用 Liquid Glass 以保持一致性。如果使用标准工具栏包含控制，其会自动采用 Liquid Glass。使用键盘布局指南和标准内边距以确保系统将控制放在视图中预期的位置。有关开发者指南，请参阅 [ToolbarItemPlacement](https://developer.apple.com/cn/documentation/swiftui/toolbaritemplacement) (SwiftUI)、[inputAccessoryView](https://developer.apple.com/cn/documentation/uikit/uiresponder/inputaccessoryview) (UIKit) 和 [UIKeyboardLayoutGuide](https://developer.apple.com/cn/documentation/uikit/uikeyboardlayoutguide) (UIKit)。

### Apple tvOS

当用户使用 Apple TV Remote 选择文本栏时，Apple tvOS 会显示线性虚拟键盘。

> **注**
>
> 当用户使用 Apple TV Remote 以外的设备时，网格键盘屏幕会出现，且内容的布局会自动适配键盘。

当用户激活数字输入视图时，Apple tvOS 会显示数字专用键盘。有关指南，请参阅[数字输入视图](digit-entry-views.md)。

### visionOS

在 visionOS 中，系统提供的虚拟键盘支持直接手势以及非直接手势，且显示在单独的窗口中供用户移到任意位置。你无需在布局中考虑键盘的位置。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-virtual-keyboard.mp4)

### watchOS

在 Apple Watch 上，如果设备屏幕足够大，文本栏可显示键盘。否则，系统会让用户使用听写或随手写输入信息。你无法更改 watchOS 中的键盘类型，但可设定文本栏的内容类型。系统会使用此信息让文本输入变得更加简单，例如通过提供建议。有关开发者指南，请参阅 [textContentType(_:)](https://developer.apple.com/cn/documentation/swiftui/view/textcontenttype(_:)) (SwiftUI)。

用户还可以使用手边配对的 iPhone 在 Apple Watch 上输入文本。

## 资源

#### 相关内容

[数据输入](entering-data.md)

[键盘](keyboards.md)

[布局](layout.md)

#### 开发者文档

[keyboardType(_:)](https://developer.apple.com/cn/documentation/swiftui/view/keyboardtype(_:)) — SwiftUI

[textContentType(_:)](https://developer.apple.com/cn/documentation/swiftui/view/textcontenttype(_:)) — SwiftUI

[UIKeyboardType](https://developer.apple.com/cn/documentation/uikit/uikeyboardtype) — UIKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 新增了在键盘上方显示自定义控制的指南，以及更新以反映 watchOS 中虚拟键盘的可用性。 |
| 2024 年 2 月 2 日 | 阐明了 visionOS 中虚拟键盘对直接和非直接手势的支持情况。 |
| 2023 年 12 月 5 日 | 新增了 visionOS 的插图。 |
| 2023 年 6 月 21 日 | 更改了页面标题“屏幕键盘”并更新以包括针对 visionOS 的指南。 |
