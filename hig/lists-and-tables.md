# 列表和表格

原文：https://developer.apple.com/cn/design/human-interface-guidelines/lists-and-tables

列表和表格在行中的一列或多列内呈现数据。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-lists-and-tables-intro@2x.png)

表格或列表可呈现以群组或层级结构组织的数据，还可支持选择、添加、删除和重新排序等用户交互。所有平台中的 App 和游戏都可使用表格来呈现内容和选项；许多 App 使用列表来展现整体信息层级结构以及帮助用户导览。例如，iOS 中的“设置”使用列表层级结构帮助用户选取选项，部分 App（如 iPadOS 和 macOS 中的“邮件”）在[拆分视图](https://developer.apple.com/cn/design/human-interface-guidelines/split-views)内使用表格。

用户有时需要处理多列表格或电子表格中的复杂数据。提供生产力任务的 App 通常使用表格在单独的可排序列中呈现数据的各种特性或属性。

## 最佳实践

**优先在列表或表格中显示文本**。表格可包括任何类型的内容，但基于行的格式尤其适合用来让文本易于浏览和阅读。如果项目的大小差异较大，或者如果你需要显示大量图像，请考虑改用[集合](https://developer.apple.com/cn/design/human-interface-guidelines/collections)。

**适用时让用户编辑表格**。用户希望能够重新排列列表，即使其无法添加或移除项目。在 iOS 和 iPadOS 中，用户必须进入编辑模式后才能选择表格项。

**在用户选择列表项时提供适当反馈**。根据选择项目会显示新视图还是切换项目的状态，反馈可能有所不同。一般而言，帮助用户导览层级结构的表格会持续高亮标记所选行，以明示用户经过的路径。相反，列出选项的表格通常会短暂高亮标记行后添加勾号等图像，以表示该项目已选中。

## 内容

**保持项目文本简洁以使行内容易于阅读**。简短的文本有助于最大程度减少截断和换行，让文本更易于阅读和浏览。如果每个项目包含大量文本，请考虑有助于避免显示过大表格行的替代方案。例如，你可以仅列出项目标题，让用户选取项目以在详细信息视图中显示其内容。

**设法保持文本的易读性，以免被裁剪或截断**。表格非常窄时（例如用户可改变其宽度的情况），你需要让内容保持可识别且易于阅读。有时文本中间的省略号可让项目更易于辨认，因为其同时保留了内容的开头和结尾。

**在多列表格中使用描述性列标题**。使用名词或名词短语以及 [title-style capitalization](https://support.apple.com/guide/applestyleguide/c-apsgb744e4a3/web#apdca93e113f1d64)（标题式大写），勿添加结尾标点符号。如果单列表格视图中未包括列标题，请使用标签或表头来帮助用户了解上下文。

## 样式

**选取与你的数据和平台协调的表格或列表样式**。某些样式使用视觉细节来帮助传达分组方式和层级结构，或者提供特定的体验。例如，在 iOS 和 iPadOS 中，分组样式使用表头、表尾和额外间距来分隔数据组；watchOS 中提供的椭圆样式让项目看起来像是随着用户的滚动操作从圆形表面上滚离一样；macOS 中还定义了一种边框样式，它使用的交替行背景有助于让大表格更易用。有关开发者指南，请参阅 [ListStyle](https://developer.apple.com/cn/documentation/swiftui/liststyle)。

**选取适合你需要显示的信息的行样式**。例如，你可能需要在行前端显示小图像，后接简短的解释性标签。部分平台提供了内建行样式，供你用来排列列表行中的内容，例如，你可以使用 [UIListContentConfiguration](https://developer.apple.com/cn/documentation/uikit/uilistcontentconfiguration-swift.struct) API，来在 iOS、iPadOS 和 Apple tvOS 中为列表行、表头和表尾中的内容布局。

## 平台考量因素

### iOS、iPadOS、visionOS

**仅将信息按钮用于显示有关行内容的更多信息**。信息按钮（显示在列表行中时称为*详细信息显示按钮*）不支持导览分层表格或列表。如果需要让用户进入列表或表格行的子视图，请使用显示指示符补充控制。有关开发者指南，请参阅 [UITableViewCell.AccessoryType.disclosureIndicator](https://developer.apple.com/cn/documentation/uikit/uitableviewcell/accessorytype-swift.enum/disclosureindicator)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/info-button-in-list@2x.png)
*信息按钮显示列表项的相关详细信息；它不支持导览。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/disclosure-indicator-in-list@2x.png)
*显示指示符会显示层级结构中的下一级，而不会显示项目相关的详细信息。*

**避免为行后端显示控制（如显示指示符）的表格添加索引**。*索引*通常由字母表中的字母组成，并垂直显示在列表后端。用户可选取索引字母以跳到列表中该字母映射到的特定部分。索引和显示指示符等元素都会显示在列表后端，因此用户可能难以在不激活一种元素的情况下使用另一种元素。

### macOS

**表格提供值时，让用户可点按列标题来基于该列为表格视图排序**。如果用户点按已排序的列的标题，请反向重新排列数据。

**允许用户调整列大小**。表格视图中显示的数据通常具有不同的宽度。用户希望调整列大小以帮助其专注于不同的区域或显示截断的数据。

**考虑在多列表格中使用交替行颜色**。交替颜色可帮助用户跨列跟踪行值，尤其是在宽表格中。

**使用大纲视图而非表格视图来呈现分层数据**。[大纲视图](https://developer.apple.com/cn/design/human-interface-guidelines/outline-views)看起来类似于表格视图，但包括用于展开数据嵌套层的显示三角形。例如，大纲视图可能会显示文件夹及其包含的项目。

### Apple tvOS

**当表格中的每一行获得焦点后高亮标记并稍微变大时，确认表格附近的图像仍良好呈现**。获得焦点的行还可变为圆角，可能影响其任一侧图像的外观。准备图像时请考虑此效果，勿自行添加遮罩来设定圆角。

### watchOS

**尽可能限制行数**。短列表更易于用户浏览，但有时用户喜欢较长的项目列表。例如，如果用户订阅了大量播客但无法查看其全部项目，可能会认为出现了问题。你可以通过列出最相关的项目并为用户提供查看更多项目的方式，来让长列表更易管理。

**若要支持基于页面的垂直导航，应限制详细信息视图的长度**。用户使用基于页面的垂直导航来在不同列表行的详细信息项目之间垂直轻扫。通过这种方式导航可节省时间，因为用户无需返回列表以轻点新的详细信息项，但这种方式仅在详细信息视图较短时才适用。如果你的详细信息视图可滚动，用户将无法使用基于页面的垂直导航来在其间轻扫。

## 资源

#### 相关内容

[集合](collections.md)

[大纲视图](outline-views.md)

[布局](layout.md)

#### 开发者文档

[List](https://developer.apple.com/cn/documentation/swiftui/list) — SwiftUI

[Tables](https://developer.apple.com/cn/documentation/swiftui/tables) — SwiftUI

[UITableView](https://developer.apple.com/cn/documentation/uikit/uitableview) — UIKit

[NSTableView](https://developer.apple.com/cn/documentation/appkit/nstableview) — AppKit

#### 视频

- [SwiftUI 中的叠放、网格和大纲](https://developer.apple.com/cn/videos/play/wwdc2020/10031)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
| 2023 年 6 月 5 日 | 更新了指南以反映 watchOS 10 中的变化。 |
