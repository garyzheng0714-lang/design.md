# 显示控制

原文：https://developer.apple.com/cn/design/human-interface-guidelines/disclosure-controls

显示控制用于显示和隐藏特定控制或视图相关的信息和功能。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-disclosure-control-intro@2x.png)

## 最佳实践

**使用显示控制隐藏详细信息，直到相关时才显示**。将用户最有可能使用的控制放在显示层级的顶层，使其始终可见，并默认隐藏更高级的功能。这种组织方式有助于用户快速找到最基本的信息，而不会因为详细选项过多感到不知所措。

## 显示三角形

显示三角形显示和隐藏视图或项目列表关联的信息和功能。例如，Keynote 讲演使用显示三角形在导出演示文稿时显示高级选项，“访达”在列表视图中导航文件夹结构时使用显示三角形逐步显示层级。

**收起**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/disclosure-triangle-before@2x.png)

**展开**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/disclosure-triangle-after@2x.png)

显示三角形在其内容隐藏时从前边缘向内指，在其内容可见时向下指。点按或轻点显示三角形会在这两种状态之间切换，视图会相应地展开或收起以适应内容。

**使用显示三角形时提供描述性标签**。确保标签指示显示或隐藏的内容，如“高级选项”。

有关开发者指南，请参阅 [NSButton.BezelStyle.disclosure](https://developer.apple.com/cn/documentation/appkit/nsbutton/bezelstyle-swift.enum/disclosure)。

## 显示按钮

显示按钮显示和隐藏特定控制关联的功能。例如，macOS 的“保存”表单在“保存为”文本栏旁边显示一个显示按钮。用户点按或轻点此按钮时，“保存”对话框会展开以提供高级导览选项，用于选择其文稿的输出位置。

显示按钮在其内容隐藏时向下指，在其内容可见时向上指。点按或轻点显示按钮会在这两种状态之间切换，视图会相应地展开或收起以适应内容。

**收起**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/disclosure-button-before@2x.png)

**展开**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/disclosure-button-after@2x.png)

**将显示按钮放在其显示和隐藏的内容旁边**。在控制和用户点按或轻点按钮时出现的展开选项之间建立清晰的关系。

**在单个视图中使用不超过一个显示按钮**。多个显示按钮增加了复杂性，并可能导致困惑。

有关开发者指南，请参阅 [NSButton.BezelStyle.pushDisclosure](https://developer.apple.com/cn/documentation/appkit/nsbutton/bezelstyle-swift.enum/pushdisclosure)。

## 平台考量因素

*无针对 macOS 的额外考量因素。在 Apple tvOS 或 watchOS 中不受支持。*

### iOS、iPadOS、visionOS

显示控制在 iOS、iPadOS 和 visionOS 中通过 SwiftUI [DisclosureGroup](https://developer.apple.com/cn/documentation/swiftui/disclosuregroup) 视图可用。

## 资源

#### 相关内容

[大纲视图](outline-views.md)

[列表和表格](lists-and-tables.md)

[按钮](buttons.md)

#### 开发者文档

[DisclosureGroup](https://developer.apple.com/cn/documentation/swiftui/disclosuregroup) — SwiftUI

[NSButton.BezelStyle.disclosure](https://developer.apple.com/cn/documentation/appkit/nsbutton/bezelstyle-swift.enum/disclosure) — AppKit

[NSButton.BezelStyle.pushDisclosure](https://developer.apple.com/cn/documentation/appkit/nsbutton/bezelstyle-swift.enum/pushdisclosure) — AppKit

#### 视频

- [SwiftUI 中的叠放、网格和大纲](https://developer.apple.com/cn/videos/play/wwdc2020/10031)
