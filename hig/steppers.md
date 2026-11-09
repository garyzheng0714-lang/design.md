# 步进器

原文：https://developer.apple.com/cn/design/human-interface-guidelines/steppers

步进器是一个两段式控制，可用于增加或减少增量值。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-stepper-intro@2x.png)

步进器位于显示当前值的栏位旁边，因为步进器本身不显示值。

## 最佳实践

**突显出步进器影响的值**。步进器本身不显示任何值，因此请确保用户在使用步进器时知道更改的是哪个值。

**当值可能发生较大变化时，考虑搭配使用步进器和文本栏**。步进器本身很适合于只需要轻点或点按几下的小更改。相比之下，用户会更乐意使用栏位来输入特定值，特别是当他们使用的值可能差异很大时。例如，在打印屏幕上，同时使用步进器和文本栏来设定份数会有所帮助。

## 平台考量因素

*无针对 iOS、iPadOS 或 visionOS 的额外考量因素。在 watchOS 或 Apple tvOS 中不受支持。*

### macOS

**对于较大的值范围，请考虑支持按住 Shift 键点按以快速更改值**。如果步进器值发生较大变化对你的 App 有好处，那么让用户按住 Shift 键点按步进器来以超过默认量的增量（例如，默认增量的 10 倍）更改值可能会很有用。

## 资源

#### 相关内容

[选择器](pickers.md)

[文本栏](text-fields.md)

#### 开发者文档

[UIStepper](https://developer.apple.com/cn/documentation/uikit/uistepper) — UIKit

[NSStepper](https://developer.apple.com/cn/documentation/appkit/nsstepper) — AppKit
