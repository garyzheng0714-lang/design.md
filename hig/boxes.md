# 方框

原文：https://developer.apple.com/cn/design/human-interface-guidelines/boxes

方框为在逻辑上相关的信息和组件创建了具有独特视觉特征的分组。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-box-intro@2x.png)

方框默认使用可见边框或背景颜色将其内容与界面的其他部分分开。方框也可以包括标题。

## 最佳实践

**尽量使方框相较于其包含视图来说相对较小**。当方框大小与其内含窗口或屏幕大小接近时，它在传达分组内容的分隔方面变得不那么有效，并且还会挤占其他内容。

**考虑使用内边距和对齐来传达方框内的其他分组**。方框的边界是独特的视觉元素，通过添加内嵌方框来定义子组会让界面显得杂乱拥挤。

## 内容

**如果有助于阐明方框的内容，请提供一个简洁的介绍性标题**。虽然方框的外观有助于用户理解其中的内容具有关联性，但提供更多内容关联的细节可能会更好。另外，标题可帮助旁白用户预测其在方框内遇到的内容。

**如果需要标题，编写一个描述内容的简洁短语**。使用句子式大写。避免使用结尾标点符号，除非是在设置面板中使用方框，这种情况下你需要在标题后添加冒号。

## 平台考量因素

*无针对 visionOS 的额外考量因素。在 Apple tvOS 或 watchOS 中不受支持。*

### iOS、iPadOS

iOS 和 iPadOS 默认在方框中使用二级和三级背景[颜色](https://developer.apple.com/cn/design/human-interface-guidelines/color)。

### macOS

macOS 默认在方框上方显示其标题。

## 资源

#### 相关内容

[布局](layout.md)

#### 开发者文档

[GroupBox](https://developer.apple.com/cn/documentation/swiftui/groupbox) — SwiftUI

[NSBox](https://developer.apple.com/cn/documentation/appkit/nsbox) — AppKit
