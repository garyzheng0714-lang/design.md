# 下拉式按钮

原文：https://developer.apple.com/cn/design/human-interface-guidelines/pull-down-buttons

下拉式按钮显示与按钮用途直接相关的项目或操作菜单。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-pull-down-button-intro@2x.png)

用户在下拉式按钮的菜单中选择一项后，菜单会关闭，App 会执行所选操作。

## 最佳实践

**使用下拉式按钮呈现与按钮操作直接相关的命令或项目**。菜单可让你帮助用户弄清按钮的目标或自定义其行为，而无需在界面中使用额外的按钮。例如：

- “添加”按钮可以呈现让用户指定所要添加项目的菜单。
- “排序”按钮可以使用菜单让用户选择排序所基于的属性。
- “返回”按钮可让用户选择重新访问的特定位置，而不是打开前一个位置。

如果需要提供一系列非命令的互斥选项，请转为使用[弹出式按钮](pop-up-buttons.md)。

**避免将视图的所有操作都放在一个下拉式按钮中**。视图的主要操作需要能被用户轻松发现，因此最好不要将这类操作隐藏在下拉式按钮中，否则用户必须打开才能执行相关操作。

**平衡菜单长度和易用性**。因为用户必须先与下拉式按钮交互才能查看其菜单，最少列出三个项目可让用户觉得值得交互。如果只需列出一到两个项目，应考虑使用替代组件来呈现这些项目，例如使用按钮来执行操作和使用开关或切换来呈现所选内容。相比之下，在下拉式按钮的菜单中列出过多项目可能降低用户的速度，因为需要更长时间来找到特定项目。

**仅在有意义时显示简洁的菜单标题**。一般而言，下拉式按钮的内容连同描述性的菜单项提供了用户需要的所有上下文，从而让菜单标题显得多余。

**当下拉式按钮的菜单项具有破坏性时，告知用户并让其确认自己的意图**。菜单使用红色文本高亮标记你识别为具有潜在破坏性的操作。当用户选取破坏性操作时，系统会显示[操作表单](action-sheets.md) (iOS) 或[弹出窗口](popovers.md) (iPadOS)，用户可以在其中确认所做的选择或取消操作。操作表单显示的位置与菜单不同并需要特意关闭，因而可以帮助用户避免由于疏忽而丢失数据。

**如果有价值，随菜单项包括界面图标**。如果需要清晰表达项目的含义，你可以在其标签后显示[图标](icons.md)或图像。将 [SF 符号](sf-symbols.md)用于此目的可帮助你提供熟悉的用户体验，同时确保符号在每种缩放级别都能与文本协调一致。

## 平台考量因素

*无针对 macOS 或 visionOS 的额外考量因素。在 Apple tvOS 或 watchOS 中不受支持。*

### iOS、iPadOS

> **注**
>
> 你也可以让用户在按钮上执行特定手势来显示下拉菜单。例如，在 iOS 14 及更高版本中，当用户按住“标签页”按钮时，Safari 浏览器会显示与标签页相关操作（例如“新建标签页”和“关闭所有标签页”）的菜单，来响应用户手势。

**考虑使用“更多”下拉式按钮来呈现不需要在主界面中占据突出位置的项目**。“更多”按钮可帮助你在空间受限时提供一系列项目，但也可能会妨碍其可寻性。虽然用户通常知道“更多”按钮会提供与当前上下文相关的额外功能，但省略号图标不一定会帮助用户预测按钮的内容。若要设计出有效的“更多”按钮，请权衡按钮大小带来的便利及其对可寻性的影响，从而在 App 中找到二者之间的平衡点。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/menu-secondary-actions-collapsed@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/menu-secondary-actions-expanded@2x.png)

## 资源

#### 相关内容

[弹出式按钮](pop-up-buttons.md)

[按钮](buttons.md)

[菜单](menus.md)

#### 开发者文档

[MenuPickerStyle](https://developer.apple.com/cn/documentation/swiftui/menupickerstyle) — SwiftUI

[showsMenuAsPrimaryAction](https://developer.apple.com/cn/documentation/uikit/uicontrol/showsmenuasprimaryaction) — UIKit

[pullsDown](https://developer.apple.com/cn/documentation/appkit/nspopupbutton/pullsdown) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2022 年 9 月 14 日 | 优化了设计出实用菜单长度的相关指南。 |
