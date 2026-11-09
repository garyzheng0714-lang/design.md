# 选择器

原文：https://developer.apple.com/cn/design/human-interface-guidelines/pickers

选择器显示包含不同值的一个或多个可滚动列表供用户从中选择。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-pickers-intro@2x.png)

系统提供了多种样式的选择器，每种选择器又提供了不同类型的可选择值且外观各异。选择器中所显示的确切值及其顺序取决于设备语言。

选择器通过让用户选择单个或多部分值来帮助用户输入信息。日期选择器专门提供了额外的方式来选择值，例如在日历视图中选择某一天或者使用数字键盘输入日期和时间。

## 最佳实践

**考虑使用提供中等到较长项目列表的选择器**。如果需要显示相当短的选项列表，请考虑使用[下拉式按钮](pull-down-buttons.md)，而非选择器。虽然选择器可让用户轻松滚动来快速浏览很多项目，但可能为短列表项目增加了太多视重。另一方面，如果需要呈现庞大的一组项目，请考虑使用[列表或表格](lists-and-tables.md)。列表和表格的高度可调，而且表格可以包括索引，让用户更快速定位列表中的某一部分。

**使用按逻辑顺序排列的可预测值**。在用户与选择器交互之前，选择器的许多值可能处于隐藏状态。最好可以让用户预测出隐藏的值是什么，例如采用按照字母顺序排列的国家/地区列表，以便用户可以在项目间快速移动。

**避免切换视图来显示选择器**。选择器最适合显示在上下文中，位于用户正在编辑的栏位下方或附近。选择器通常出现在窗口底部或弹出窗口中。

**在日期选择器中指定分钟数时，应考虑避免细化**。分钟列表默认包括 60 个值（0 到 59）。你可以选择性地增加分钟数间隔，只要它能被 60 整除即可。例如，你可以采用一刻钟间隔（0、15、30 和 45）。

## 平台考量因素

*无针对 visionOS 的额外考量因素。*

### iOS、iPadOS

日期选择器是一种高效界面，可让用户通过触控、键盘或指针设备选择特定日期、时间或者二者。你可以采用以下样式之一来显示日期选择器：

- 紧凑 — 按钮在模态视图中显示可编辑的日期和时间内容。
- 内联 — 仅限于时间，按钮显示数值滚轮；对于日期和时间，内联日历视图。
- 滚轮 — 一套滚轮，也支持通过内建或外接键盘输入数据。
- 自动 — 基于当前平台和日期选择器模式由系统确定样式。

日期选择器有四种模式，每种模式呈现不同系列的可选择值。

- 日期 — 显示月份、当月的日期和年份。
- 时间 — 显示小时、分钟和（可选）上午/下午标示。
- 日期和时间 — 显示日期、小时、分钟和（可选）上午/下午标示。
- 倒数计时器 — 显示小时和分钟，最大可达 23 小时 59 分钟。此模式在内联或紧凑样式中不可使用。

日期选择器中所显示的确切值及其顺序取决于设备位置。

以下是几个显示不同样式和模式组合的日期选择器示例。

**紧凑**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pickers-date-picker-compact-expanded@2x.png)
*在紧凑布局中，选择器作为弹出式菜单在内容上方打开。*

**内联**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pickers-date-picker-inline-expanded@2x.png)
*在内联布局中，选择器在内容中内联打开。*

**滚轮**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pickers-time-picker-inline-wheel@2x.png)
*另一个内联选择器示例使用滚轮选取日期和时间值。*

**在空间受限时，使用紧凑日期选择器**。紧凑样式显示的按钮以 App 的强调色显示当前值。用户轻点该按钮时，日期选择器会打开一个模态视图，可让用户访问熟悉的日历样式编辑器和时间选择器。在模态视图内，用户可以多次编辑日期和时间，然后在视图外轻点即可确认所做的选择。

### macOS

**选择与 App 搭配的日期选择器样式**。macOS 提供了两种样式的日期选择器：文本和图形。如果空间有限且你期望用户选择特定日期和时间，文本样式非常有用。如果想让用户可选择滚动浏览日历中的日期或者选择日期范围，或者钟面的外观适合 App，图形样式非常有用。

有关开发者指南，请参阅 [NSDatePicker](https://developer.apple.com/cn/documentation/appkit/nsdatepicker)。

### Apple tvOS

在 Apple tvOS 中，可通过 SwiftUI 使用选择器。有关开发者指南，请参阅 [Picker](https://developer.apple.com/cn/documentation/swiftui/picker)。

### watchOS

选择器显示了用户可通过数码表冠进行导览的项目列表，可帮助用户以精确且富有吸引力的方式管理所选内容。

选择器可使用滚轮样式显示项目列表。watchOS 也可以使用滚轮样式显示日期和时间选择器。有关开发者指南，请参阅 [Picker](https://developer.apple.com/cn/documentation/swiftui/picker) 和 [DatePicker](https://developer.apple.com/cn/documentation/swiftui/datepicker)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pickers-wheel-watch@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pickers-date-watch@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pickers-time-watch@2x.png)

你可以配置选择器来显示边框、字幕和滚动指示符。

对于较长的列表，导航链接会将选择器显示为按钮。用户轻点该按钮时，系统会显示选项列表。用户也可以使用数码表冠来上下滑动选项，而无需轻点该按钮。有关开发者指南，请参阅 [navigationLink](https://developer.apple.com/cn/documentation/swiftui/pickerstyle/navigationlink)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pickers-navigation-button-watch@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pickers-navigation-list-watch@2x.png)

## 资源

#### 相关内容

[下拉式按钮](pull-down-buttons.md)

[列表和表格](lists-and-tables.md)

#### 开发者文档

[Picker](https://developer.apple.com/cn/documentation/swiftui/picker) — SwiftUI

[UIDatePicker](https://developer.apple.com/cn/documentation/uikit/uidatepicker) — UIKit

[UIPickerView](https://developer.apple.com/cn/documentation/uikit/uipickerview) — UIKit

[NSDatePicker](https://developer.apple.com/cn/documentation/appkit/nsdatepicker) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 5 日 | 更新了在 watchOS 中使用选择器的指南。 |
