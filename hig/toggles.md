# 切换

原文：https://developer.apple.com/cn/design/human-interface-guidelines/toggles

切换可以让用户在一对相反的状态（比如开和关）之间进行选择，它会使用不同的外观来指示每个状态。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-toggles-intro@2x.png)

切换可以包含各种样式，例如开关和复选框，且不同的平台能够以各种方式使用这些样式。有关指南，请参阅[平台考量因素](toggles.md#Platform-considerations)。

除了切换外，所有平台也都支持通过对每个状态使用不同的外观而表现得像切换的按钮。有关开发者指南，请参阅 [ToggleStyle](https://developer.apple.com/cn/documentation/swiftui/togglestyle)。

## 最佳实践

**使用切换来帮助用户在影响内容或视图状态的两个相反值之间进行选择**。切换始终允许用户管理某些对象的状态，因此如果需要支持其他类型的操作（例如，从项目列表中选取），请使用[弹出式按钮](pop-up-buttons.md)等其他组件。

**明确切换所影响的设置、视图或内容**。一般来说，四周会为用户提供足够的信息以了解其正在打开或关闭什么。在某些情况下，通常是在 macOS App 中，你还可以提供一个标签来描述切换控制的状态。如果要使用行为类似于切换的按钮，你通常可使用界面图标来传达其用途，并根据当前状态更新其外观（一般是通过更改背景来实现）。

**确保切换状态具有明显的视觉差异**。例如，你可以添加或移除颜色填充，显示或隐藏背景形状，或者更改显示的内部细节（如勾号或点），以表明切换的打开或关闭状态。避免仅仅依靠不同的颜色来传达状态，因为并非每个人都能感知此类差异。

## 平台考量因素

*无针对 Apple tvOS、visionOS 或 watchOS 的额外考量因素。*

### iOS、iPadOS

**仅在列表行中使用开关切换样式**。在这种情况下你不需要提供标签，因为行中的内容为开关所控制的状态提供了上下文。

**仅在必要时更改开关的默认颜色**。在大多数情况下，默认的绿色往往效果最好，但你也可以使用 App 的强调色代替。确保使用的颜色与未着色的外观形成足以被感知的对比。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toggles-ios-default-color@2x.png)
*标准开关颜色*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toggles-ios-custom-color@2x.png)
*自定义开关颜色*

**在列表之外使用行为类似于切换的按钮，而非开关**。例如，“电话” App 在过滤按钮上使用开关，让用户过滤其最近通话。  App 添加了蓝色高亮标记，表示开关为活跃状态，并在开关变为不活跃时将蓝色移除。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toggles-ios-phone-filter-on@2x.png)
*“电话” App 使用开关在所有最近来电和各种过滤选项间切换。有人选取过滤条件时，开关会显示，并在符号后面带有自定义背景。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toggles-ios-phone-filter-off@2x.png)
*有人返回“最近通话”主视图时，开关会显示，符号后面没有任何内容。*

**避免提供解释按钮用途的标签**。你创建的界面图标（结合你提供的备选背景外观）会帮助用户理解按钮的作用。有关开发者指南，请参阅 [changesSelectionAsPrimaryAction](https://developer.apple.com/cn/documentation/uikit/uibutton/changesselectionasprimaryaction)。

### macOS

除了开关切换样式，macOS 还支持复选框样式，并定义了可以提供类似行为的单选按钮。

**在窗体而非窗口框架中使用开关、复选框和单选按钮**。特别要避免在工具栏或状态栏中使用这些组件。

#### 开关

**为要强调的设置优先使用开关**。开关比复选框的视重更大，因此当它比一般复选框控制的功能更多时，看起来会更好。例如，你可以使用开关来让用户打开或关闭一组设置而非某个设置。有关开发者指南，请参阅 [switch](https://developer.apple.com/cn/documentation/swiftui/togglestyle/switch)。

**在分组表单内，考虑使用迷你开关来控制单行中的设置**。迷你开关的高度接近于按钮及其他控制的高度，这使得行具有一致的高度。如果需要在分组表单内显示设置的层级结构，你可以为主要设置使用常规开关，为次要设置使用迷你开关。有关开发者指南，请参阅 [GroupedFormStyle](https://developer.apple.com/cn/documentation/swiftui/groupedformstyle) 和 [ControlSize](https://developer.apple.com/cn/documentation/swiftui/controlsize)。

**一般来说，不要用开关替代复选框**。如果你已经在界面中使用了复选框，那么最好继续使用。

#### 复选框

复选框是一个小的正方形按钮，在按钮关闭时是空的，在按钮打开时包含一个勾号，在按钮为混合状态时可以包含一个破折号。通常，复选框会在其后端加入一个标题。在可编辑核对清单中，复选框可以不带标题或任何其他内容。

**如果需要显示设置的层级结构，请使用复选框而非开关**。复选框的视觉风格有助于它们很好地对齐并形成分组。你可以使用对齐（通常是沿着复选框的前缘）和缩进以显示依赖关系，例如当某个复选框的状态控制从属复选框的状态时。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/checkbox-alignment@2x.png)

**如果需要显示一组两个以上互斥的选项，可以考虑使用单选按钮**。当用户需要在“开”或“关”之外的选项中进行选择时，使用多个单选按钮可以帮助你通过唯一的标签来明确每个选项。

**如果复选框之间的关系不明确，可以考虑使用标签来介绍一组复选框**。描述该组选项，并将标签的基线与组中的第一个复选框对齐。

**在外观上准确地反映复选框的状态**。复选框状态可以是打开、关闭或混合状态。如果使用复选框来全局打开和关闭多个从属复选框，则在从属复选框包含不同状态时显示混合状态。例如，你可能需要显示可打开或关闭所有样式的文本样式设置，还需要允许用户选取一部分单个样式设置，如粗体、斜体或下划线。有关开发者指南，请参阅 [allowsMixedState](https://developer.apple.com/cn/documentation/appkit/nsbutton/allowsmixedstate)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/checkbox-selected@2x.png)
*打开*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/checkbox-deselected@2x.png)
*关闭*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/checkbox-mixed@2x.png)
*混合*

#### 单选按钮

单选按钮是一个带有标签的圆形小按钮。单选按钮通常以 2 到 5 个为一组，显示一组互斥的选项。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/radio-button-example@2x.png)

单选按钮的状态为已选中（实心圆圈）或未选中（空心圆圈）。尽管单选按钮也可以显示混合状态（用破折号表示），但这种状态用处不大，因为你可以通过使用额外的单选按钮来传达多个状态。如果需要展示设置或项目具有混合状态，请考虑改用复选框。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/radio-button-selected@2x.png)
*已选中*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/radio-button-deselected@2x.png)
*未选中*

**优先使用一组单选按钮来显示互斥选项**。如果你需要让用户在某一组中选取多个选项，请改用复选框。

**避免在一组中列出太多的单选按钮**。一长串单选按钮会在界面中占据大量空间，可能会让人眼花缭乱。如果需要显示的选项大约超过 5 个，请考虑改用[弹出式按钮](pop-up-buttons.md)等组件。

**若要显示可打开或关闭的单个设置，请优先使用复选框**。虽然单个单选按钮也可以打开或关闭某些内容，但复选框中勾号的出现或消失可以使当前状态更加一目了然。在极少数情况下单个复选框不能清楚地传达相反的状态，此时你可以使用一对单选按钮，每个按钮都有一个指定其所控制状态的标签。

**水平显示单选按钮时使用一致的间距**。测量容纳最长按钮标签所需的空间，并始终使用该测量值。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/radio-button-equal-spacing@2x.png)

## 资源

#### 相关内容

[布局](layout.md)

#### 开发者文档

[Toggle](https://developer.apple.com/cn/documentation/swiftui/toggle) — SwiftUI

[UISwitch](https://developer.apple.com/cn/documentation/uikit/uiswitch) — UIKit

[NSButton.ButtonType.toggle](https://developer.apple.com/cn/documentation/appkit/nsbutton/buttontype/toggle) — AppKit

[NSSwitch](https://developer.apple.com/cn/documentation/appkit/nsswitch) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 3 月 29 日 | 完善了在 macOS App 中使用开关的指南，阐明了复选框何时会有标题，以及新增了单选按钮的插图。 |
| 2023 年 9 月 12 日 | 更新了插图。 |
