# 分段控制

原文：https://developer.apple.com/cn/design/human-interface-guidelines/segmented-controls

分段控制是两个或多个分段组成的线性集，每个分段用作一个按钮。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-segmented-control-intro@2x.png)

分段控制中所有分段的宽度通常都相等。分段与[按钮](buttons.md)类似，也可以包含文本或图像。分段下方（或整个控制下方）也可以有文本标签。

分段控制从一组选项中提供单选；在 macOS 中，则提供单选或多选。例如，在 macOS 的 Keynote 讲演中，用户只可以选择对齐选项控制中的一个分段来对齐所选文本。相比之下，用户可以选择字体属性控制中的多个分段，以组合粗体、斜体和下划线等样式。Keynote 讲演窗口的工具栏也使用分段控制，让用户在主窗口区域中显示和隐藏各种编辑面板。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/segmented-control-one-choice@2x.png)
*单选*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/segmented-control-multiple-choices@2x.png)
*多选*

除了表示单选或多选的选择状态之外，分段控制还可用作一组按钮，执行操作而不显示选择状态。例如，macOS 中“邮件”的“回复”、“回复所有人”和“转发”按钮。有关开发者指南，请参阅 [isMomentary](https://developer.apple.com/cn/documentation/uikit/uisegmentedcontrol/ismomentary) 和 [NSSegmentedControl.SwitchTracking.momentary](https://developer.apple.com/cn/documentation/appkit/nssegmentedcontrol/switchtracking/momentary)。

## 最佳实践

**使用分段控制提供影响对象、状态或视图的密切相关选项**。例如，检查器中的分段控制可让用户选取一个或多个属性以应用到选择，或者工具栏中的分段控制可提供一组操作以在当前视图上执行。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/segmented-controls-activity-charts@2x.png)
*在 iOS 的“健康” App 中，分段控制提供了显示活动图表的时间范围选项。*

**需要将功能分组或明确显示其选择状态时，考虑使用分段控制**。与其他按钮样式不同，分段控制保留了其分组功能，而不受视图尺寸或其显示位置的影响。此分组功能也可帮助用户一目了然地了解当前选中了哪些控制。

**在单个分段控制内保持控制类型一致**。不要将操作分配给控制中表示选择状态的分段，也不要为控制中执行操作的分段显示选择状态。

**限制控制中分段的数量**。过多分段可能造成难以解析且导航耗时。宽界面中的分段尽量不超过约五到七个，iPhone 上则不超过五个。

**通常保持分段大小一致**。当所有分段宽度一样时，分段控制呈现平衡感。在可能的范围内，最好也保持图标和标题宽度一致。

## 内容

**在单个分段控制中优先采用文本或图像，而非混用两者**。虽然单个分段可以包含文本标签或图像，但在单个控制中混用两者可能会导致界面不连贯并令人困惑。

**尽可能在每个分段中使用大小相似的内容**。所有分段通常宽度一样，因此如果有些分段填充了内容，有些却没有内容，看起来就会效果不佳。

**为分段标签使用名词或名词短语**。编写文本来描述每个分段，并采用 [title-style capitalization](https://support.apple.com/guide/applestyleguide/c-apsgb744e4a3/web#apdca93e113f1d64)（标题式大写）。显示文本标签的分段控制不需要介绍性文本。

## 平台考量因素

*在 watchOS 中不受支持。*

### iOS、iPadOS

**考虑使用分段控制在密切相关的子视图间切换**。分段控制可用于在相关的子视图间快速切换。例如，“日历”的“新建日程”表单中的分段控制可在子视图间切换以创建新日程和新提醒事项。若要在 App 中完全独立的部分间切换，请改为使用[标签页栏](tab-bars.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/segmented-controls-calendar-new-event@2x.png)

### macOS

**考虑使用介绍性文本清晰表达分段控制的用途**。当控制使用符号或界面图标时，你还可以在每个分段下方添加标签来清晰表达其含义。如果你的 App 包括工具提示，请为分段控制中的每个分段提供一个工具提示。

**若要在主窗口区域中进行视图切换，请使用标签页视图，而不是分段控制**。[标签页视图](tab-views.md)支持高效的视图切换，与组合了分段控制的[方框](boxes.md)外观类似。考虑使用分段控制帮助用户在工具栏或检查器面板中切换视图。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/macos-calendar-tab-view-segmented-control-comparison@2x.png)

**考虑支持弹性加载**。在配备妙控板的 Mac 上，弹性加载可让用户将所选项目拖到分段上，然后用力点按（而非放置所选项目）来激活分段。用户还可在分段激活后继续拖移项目。

### Apple tvOS

**考虑在执行内容过滤的屏幕上使用拆分视图，而不是分段控制**。使用拆分视图在内容和过滤选项之间来回导航对用户来说通常较轻松。根据放置的位置，分段控制可能不那么容易触及。

**避免将其他可聚焦元素靠近分段控制**。分段会在焦点移至其上时变为选中，而不是在用户点按时选中。仔细考虑分段控制相对于其他界面元素的位置。如果其他可聚焦元素靠得太近，用户尝试在分段之间切换时可能会不小心聚焦到它们。

### visionOS

当用户注视使用图标的分段控制时，系统会显示工具提示，其中包含你所提供的描述性文本。

## 资源

#### 相关内容

[拆分视图](split-views.md)

#### 开发者文档

[segmented](https://developer.apple.com/cn/documentation/swiftui/pickerstyle/segmented) — SwiftUI

[UISegmentedControl](https://developer.apple.com/cn/documentation/uikit/uisegmentedcontrol) — UIKit

[NSSegmentedControl](https://developer.apple.com/cn/documentation/appkit/nssegmentedcontrol) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
