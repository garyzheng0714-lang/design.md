# 文本视图

原文：https://developer.apple.com/cn/design/human-interface-guidelines/text-views

文本视图会显示样式化的多行文本内容，这些内容可否编辑是可选的。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-text-view-intro@2x.png)

文本视图可以是任意高度，并在内容扩展到视图之外时允许滚动。文本视图中的内容默认与前缘对齐，并使用系统标签颜色。在 iOS、iPadOS 和 visionOS 中，如果文本视图可编辑，键盘会在用户选择该视图时出现。

## 最佳实践

**当需要显示较长的、可编辑的或特殊格式的文本时，请使用文本视图**。文本视图与[文本栏](text-fields.md)和[标签](labels.md)的不同之处在于，文本视图为显示特定的文本和接收文本输入提供了最多的选项。如果需要显示少量文本，则使用标签会更简单；如果这些文本可编辑，则使用文本栏。

**保持文本清晰易读**。虽然你可以创造性地使用多种字体、颜色和对齐方式，但保持内容的可读性是至关重要的。采用动态字体是个好主意，这样当用户在其设备上更改文本字号时，你的文本仍然看起来很美观。确保打开无障碍选项（如粗体文本）来测试你的内容。有关指南，请参阅[无障碍](accessibility.md)和[字体排印](typography.md)。

**让有用的文本可选择**。如果文本视图包含有用的信息（如错误信息、序列号或 IP 地址），请考虑让用户选择这些信息以拷贝到其他位置。

## 平台考量因素

*无针对 macOS、visionOS 或 watchOS 的额外考量因素。*

### iOS、iPadOS

**显示适合的键盘类型**。有几种不同的键盘类型可供选择，每一种都是为方便不同类型的输入而设计的。为了简化数据输入，编辑文本视图时显示的键盘需要适合内容类型。有关指南，请参阅[虚拟键盘](virtual-keyboards.md)。

### Apple tvOS

你可以使用文本视图在 Apple tvOS 中显示文本。Apple tvOS 设计为尽量避免文本输入，因此 Apple tvOS 会为可编辑文本改用[文本栏](text-fields.md)。

## 资源

#### 相关内容

[标签](labels.md)

[文本栏](text-fields.md)

[组合框](combo-boxes.md)

#### 开发者文档

[Text](https://developer.apple.com/cn/documentation/swiftui/text) — SwiftUI

[UITextView](https://developer.apple.com/cn/documentation/uikit/uitextview) — UIKit

[NSTextView](https://developer.apple.com/cn/documentation/appkit/nstextview) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 5 日 | 更新了指南以反映 watchOS 10 中的变化。 |
