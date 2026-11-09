# 文本栏

原文：https://developer.apple.com/cn/design/human-interface-guidelines/text-fields

文本栏是一个矩形区域，用户可以在其中输入或编辑特定的小段文本。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-text-field-intro@2x.png)

## 最佳实践

**使用文本栏请求少量信息，如姓名或电子邮件地址**。若要让用户输入大量文本，请改用[文本视图](text-views.md)。

**在文本栏中显示提示以帮助传达其目的**。文本栏在没有其他文本时可以包含占位符文本，例如“电子邮件”或“密码”。因为占位符文本会在用户开始键入时就消失，所以包含一个描述该栏位的单独标签以提醒用户其用途也很有用。

**使用安全文本栏隐藏隐私数据**。App 请求密码等敏感数据时，始终使用安全文本栏。有关开发者指南，请参阅 [SecureField](https://developer.apple.com/cn/documentation/swiftui/securefield)。

**尽可能使文本栏的大小与预期的文本数量相匹配**。文本栏的大小可以帮助用户从视觉上衡量要提供的信息量。

**均匀间隔多个文本栏**。如果布局包含多个文本栏，请在它们之间留出足够的空间，以便用户可以轻松地看到每个介绍性标签对应哪个输入栏。尽可能垂直叠放多个文本栏，并使用一致的宽度来创建一个更加整洁有序的布局。例如，地址表单中姓和名栏位的宽度可能相同，而地址和城市栏位的宽度可能不同。

**确保在多个栏位之间按用户预期的方式切换**。在栏位之间切换时，按逻辑顺序移动焦点。系统会尝试自动实现这个结果，所以你不需要经常去自定义它。

**适时验证栏位**。例如，如果某个栏位的唯一合法值是数字字符串，那么你的 App 需要在用户输入非数字字符时发出提醒。检查数据的合适时机取决于上下文：输入电子邮件地址时，最好是在用户切换到另一个栏位时进行验证；创建用户名或密码时，需要在用户切换到另一个栏位之前进行验证。

**使用数字格式器帮助处理数值数据**。数字格式器会自动将文本栏配置为仅接受数值。它还能够以特定方式显示值，如带有特定小数位数、百分比或货币。但是，请不要假设数据实际表示的值，因为格式化可能会因用户所在的地区而有很大的差异。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/text-fields-formatted-text@2x.png)
*格式化文本*

**根据栏位需要调整换行**。系统默认会裁剪超出文本栏边界的任何文本。你也可以设置一个文本栏，使其在字符或单词级别将文本换到另一行，或者在开头、中间或结尾处截断（由省略号表示）。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/text-fields-clipped-text@2x.png)
*裁剪文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/text-fields-wrapped-text@2x.png)
*换行文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/text-fields-truncated-text@2x.png)
*截断文本*

**考虑使用扩展工具提示显示被裁剪或被截断文本的完整版本**。扩展工具提示的行为类似于常规[工具提示](https://developer.apple.com/cn/design/human-interface-guidelines/offering-help#macOS-visionOS)，在用户将指针放在栏位上时出现。

**在 iOS、iPadOS、Apple tvOS 和 visionOS App 中，显示适当的键盘类型**。有几种不同的键盘类型可供选择，每一种都是为方便不同类型的输入（例如数字或 URL）而设计。为了简化数据输入，显示的键盘需适合用户正输入的内容类型。有关指南，请参阅[虚拟键盘](virtual-keyboards.md)。

**最大程度减少 Apple tvOS 和 watchOS App 中的文本输入**。在 Apple TV 和 Apple Watch 上输入长段文本或填写大量文本栏非常耗时。应最大程度减少文本输入并考虑更高效地收集信息，例如使用按钮。

## 平台考量因素

*无针对 Apple tvOS 或 visionOS 的额外考量因素。*

### iOS、iPadOS

**在文本栏后端显示一个“清除”按钮以帮助用户抹除其输入**。当这个元素出现时，用户可以轻点它来清除文本栏的内容，而不必一直轻点删除键。

**使用图像和按钮在文本栏中提供清晰的环境和功能**。你可以在文本栏的两端显示自定义图像，也可以添加系统提供的按钮，例如“书签”按钮。一般情况下，使用文本栏的前端来指示栏位的意图，使用后端来提供额外的功能，例如加入书签。

### macOS

**如果需要使文本输入匹配选项列表，请考虑使用组合框**。相关指南，请参阅[组合框](combo-boxes.md)。

### watchOS

**仅在必要时才显示文本栏**。尽可能优先显示选项列表，而非要求输入文本。

## 资源

#### 相关内容

[文本视图](text-views.md)

[组合框](combo-boxes.md)

[数据输入](entering-data.md)

#### 开发者文档

[TextField](https://developer.apple.com/cn/documentation/swiftui/textfield) — SwiftUI

[SecureField](https://developer.apple.com/cn/documentation/swiftui/securefield) — SwiftUI

[UITextField](https://developer.apple.com/cn/documentation/uikit/uitextfield) — UIKit

[NSTextField](https://developer.apple.com/cn/documentation/appkit/nstextfield) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 5 日 | 更新了指南以反映 watchOS 10 中的变化。 |
