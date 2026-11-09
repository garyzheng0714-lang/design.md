# 弹出式按钮

原文：https://developer.apple.com/cn/design/human-interface-guidelines/pop-up-buttons

弹出式按钮显示互相排斥选项的菜单。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-pop-up-button-intro@2x.png)

当用户从弹出式按钮的菜单中选取一个项目后，菜单会关闭，按钮可更新其内容以指示当前所选内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pop-up-button-closed@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pop-up-button-open@2x.png)

## 最佳实践

**使用弹出式按钮来呈现互相排斥选项或状态的扁平列表**。弹出式按钮可帮助用户选择影响其内容或周边视图的选项。以下情况，请使用[下拉式按钮](https://developer.apple.com/cn/design/human-interface-guidelines/pull-down-buttons)：

- 提供操作列表
- 让用户选择多个项目
- 包括子菜单

**提供有用的默认选项**。弹出式按钮可以更新其内容以指示当前所选内容，但如果用户尚未选择，则会显示你指定的默认项。尽量将默认选项设为大多数用户可能想要选择的项目。

**让用户能够在不打开弹出式按钮的情况下预测其中的选项**。例如，你可以使用描述按钮效果的介绍性标签或按钮标签，为选项提供上下文。

**当空间有限且不需要一直显示所有选项时，应考虑使用弹出式按钮**。弹出式按钮是一种充分利用空间的方式，可呈现各种各样的选项。

**如有必要，在弹出式按钮的菜单中包括“自定义”选项，以在某些情况下提供有用的额外项目**。提供“自定义”选项可帮助你避免因在界面中提供用户只是偶尔需要的项目或控制而让界面变得杂乱。你还可以在列表下方显示解释性文本，帮助用户理解选项如何工作。

## 平台考量因素

*无针对 iOS、macOS 或 visionOS 的额外考量因素。在 Apple tvOS 或 watchOS 中不受支持。*

### iPadOS

**在弹出窗口或模态视图中，考虑使用弹出式按钮而非详情指示符来呈现列表项目的多个选项**。例如，用户可以快速从弹出式按钮的菜单中选取一个选项，而不用导航至详细信息视图。如果适合以菜单形式呈现一组相对较小且定义完善的选项，在这种情况下应考虑使用弹出式按钮。

## 资源

#### 相关内容

[下拉式按钮](pull-down-buttons.md)

[按钮](buttons.md)

[菜单](menus.md)

#### 开发者文档

[MenuPickerStyle](https://developer.apple.com/cn/documentation/swiftui/menupickerstyle)  — SwiftUI

[changesSelectionAsPrimaryAction](https://developer.apple.com/cn/documentation/uikit/uibutton/changesselectionasprimaryaction) — UIKit

[NSPopUpButton](https://developer.apple.com/cn/documentation/appkit/nspopupbutton) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 10 月 24 日 | 新增了插图。 |
| 2022 年 9 月 14 日 | 增加了在 iPadOS 的弹出窗口或模态视图中使用弹出式按钮的指南。 |
