# 大纲视图

原文：https://developer.apple.com/cn/design/human-interface-guidelines/outline-views

大纲视图以滚动的单元格列表形式呈现分层数据，这些单元格按行和列组织。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-outline-view-intro@2x.png)

大纲视图至少包括一个带有主要分层数据（例如一组父容器及其子容器）的列。你可以根据需要添加列，以显示可补充主要数据的属性，例如大小和修改日期。父容器具有可展开以显示其子容器的显示三角形。

“访达”窗口为导览文件系统提供了大纲视图。

## 最佳实践

大纲视图适用于显示基于文本的内容，并且通常显示在[拆分视图](https://developer.apple.com/cn/design/human-interface-guidelines/split-views)的前端，而相关内容则显示在另一端。

**使用表格而非大纲视图来呈现非分层数据**。有关指南，请参阅[列表和表格](lists-and-tables.md)。

**仅在第一列中展示数据层级**。其他列可显示应用于主列中分层数据的属性。

**使用描述性列标题提供语境**。使用 [title-style capitalization](https://help.apple.com/applestyleguide/#/apsgb744e4a3?sub=apdca93e113f1d64)（标题式大写）和不带标点符号的名词或名词短语，尤其要避免在末尾添加冒号。始终在多列大纲视图中提供列标题。如果单列大纲视图中不包括列标题，请使用标签或其他方式确保提供足够的语境。

**考虑允许用户点按列标题以对大纲视图排序**。在可排序的大纲视图中，用户可以点按列标题以基于该列执行升序或降序排序。如有必要，你可以在后台基于次级列实施额外的排序。如果用户点按主列标题，则在每个分层级别进行排序。例如，在“访达”中，所有顶层文件夹都会排序，然后每个文件夹内的项目也会排序。如果用户点按已排序的列的标题，文件夹及其内容会以反向再次排序。

**允许用户调整列大小**。大纲视图中显示的数据通常在宽度上有所不同。允许用户根据需要调整列宽以显示更宽的数据非常重要。

**让用户轻松展开或收起嵌套容器**。例如，在“访达”窗口中点按文件夹的显示三角形时仅可展开该文件夹。但是，按住 Option 键点按显示三角形则可展开其所有子文件夹。

**保留用户的展开选择**。如果用户展开了大纲视图的各级以到达特定的项目，请储存该状态以便下次可以再显示。这样一来，用户便无需再次导览回相同的位置。

**考虑在多列大纲视图中使用交替行颜色**。颜色交替可以使用户更容易跨列跟踪行值，尤其是在宽大纲视图中。

**如果在你的 App 中适用，应让用户编辑数据**。在可编辑的大纲视图单元格中，用户期望能够点按一下单元格来编辑其内容。请注意，单元格可能会对连按两下作出不同响应。例如，列出文件的大纲视图可能会让用户点按一下文件名以编辑它，而连按两下文件名则打开文件。如果有用，你还可以允许用户重新排序、添加和移除行。

**考虑在中间使用省略号来截断单元格文本，而非裁剪文本**。中间的省略号会保留单元格文本的开头和结尾，使内容比裁剪的文本更清晰可辨。

**考虑提供搜索栏，以帮助用户在冗长的大纲视图中快速查找值**。以大纲视图为主要功能的窗口通常会在工具栏中包括一个搜索栏。有关指南，请参阅[搜索栏](search-fields.md)。

## 平台考量因素

*在 iOS、iPadOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[分栏视图](column-views.md)

[列表和表格](lists-and-tables.md)

[拆分视图](split-views.md)

#### 开发者文档

[OutlineGroup](https://developer.apple.com/cn/documentation/swiftui/outlinegroup) — SwiftUI

[NSOutlineView](https://developer.apple.com/cn/documentation/appkit/nsoutlineview) — AppKit

#### 视频

- [SwiftUI 中的叠放、网格和大纲](https://developer.apple.com/cn/videos/play/wwdc2020/10031)
