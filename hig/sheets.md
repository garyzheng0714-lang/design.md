# 表单

原文：https://developer.apple.com/cn/design/human-interface-guidelines/sheets

表单可帮助用户执行与其当前环境密切相关的小范围任务。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-sheet-intro@2x.png)

在向用户请求特定信息或呈现用户可在返回父视图前完成的简单任务时，表单非常有用。例如，表单可能会让用户提供完成操作所需的信息，如附上文件或选取其保存位置。

## 剖析

在 macOS、Apple tvOS、visionOS 和 watchOS 中，表单始终为*模态*。模态表单会呈现一种有针对性的体验，让用户在关闭表单前无法与父视图交互（有关模态呈现方式的更多信息，请参阅[模态化](modality.md)）。

在 iOS 和 iPadOS 中，表单可以为模态或*非模态*。当屏幕上显示非模态表单时，用户可以使用其功能影响父视图，而无需关闭表单。例如，iPhone 和 iPad 上的“备忘录”使用非模态表单，让用户在编辑备忘录时可格式化各种所选文本。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-nonmodal-notes-text-regular@2x.png)
*“备忘录”格式表单可让用户在编辑视图中将格式应用到所选文本。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-nonmodal-notes-text-italic@2x.png)
*由于这是非模态表单，用户无需关闭表单即可执行更多文本选择。*

以下是一些常用按钮，可帮助用户导览和关闭表单。

- **取消**（或“关闭”）按钮会关闭表单，而不保存任何更改。此类按钮在大多数表单中较为常见。
- **完成**按钮会在完成任务或明确保存更改后关闭表单。
- **返回**按钮可让用户在多步流程中导览到上一步或在层级中导览到父视图。此按钮并非用于关闭表单。

这些按钮的放置方式在不同平台之间各异；请参阅[平台考量因素](sheets.md#Platform-considerations)。

## 最佳实践

**对于复杂或冗长的用户流程，考虑用其他方式替代表单**。例如，iOS 和 iPadOS 提供全屏样式的模态视图，非常适用于显示视频、照片或相机视图等内容或帮助用户执行文稿或照片编辑这样的多步任务。（有关开发者指南，请参阅 [UIModalPresentationStyle.fullScreen](https://developer.apple.com/cn/documentation/uikit/uimodalpresentationstyle/fullscreen)。）在 macOS 体验中，你不妨打开新窗口或让用户进入全屏幕模式，而不是使用表单。例如，编辑文稿等自含式任务往往更适合在单独的窗口中执行，而[全屏显示](going-full-screen.md)则可以帮助用户查看媒体。在 visionOS 中，你可以为用户提供一种方式将 App 转换到全空间，以便用户在其中深入了解内容或任务；有关指南，请参阅[沉浸式体验](immersive-experiences.md)。

**一次只从主界面显示一个表单**。用户关闭表单时期望返回到父视图或窗口。如果关闭表单会将用户导航回另一个表单，他们可能会忘记在你 App 中的位置。如果用户在表单中执行的某些操作会导致出现另一个表单，那么请先关闭第一个表单，再显示新表单。如有必要，你可以在用户关闭第二个表单后，再次显示第一个表单。

**如果想呈现影响父视图中主任务的补充项，请使用非模态视图**。若要让用户访问所需的信息和操作并同时继续与主窗口交互，考虑在 visionOS 中使用[拆分视图](split-views.md)或在 macOS 中使用[面板](panels.md)；在 iOS 和 iPadOS 中，你可以使用非模态表单实现此工作流程。有关指南，请参阅 [iOS、iPadOS](sheets.md#iOS-iPadOS)。

**提供“完成”按钮的替代方案**。如果你提供“完成”按钮，请始终搭配“取消”按钮，为用户提供明确的方式以在不确认或不保存更改的情况下关闭表单，也可以搭配“返回”按钮以移至表单中的上一步。仅依赖“完成”按钮意味着，完成任务是退出表单的唯一方法，这可能会让用户感到受限或误导。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-buttons-placement-done-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-buttons-placement-cancel-done@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

避免同时显示“取消”、“完成”和“返回”三个按钮。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-buttons-placement-back-cancel-done-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

## 平台考量因素

*无针对 Apple tvOS 的额外考量因素。*

### iOS、iPadOS

在 iOS 和 iPadOS 中，对于单视图表单，“取消”按钮位于顶部工具栏的前缘。“完成”按钮（若存在）位于后缘。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-buttons-placement-cancel-done@2x.png)

对于具有多步流程的表单，按钮的放置方式在各步骤中可能有所不同。

**第一步**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-buttons-placement-navigation-first-page@2x.png)
*在第一步中，没有“返回”按钮，“取消”按钮位于前缘。“完成”按钮（若存在）位于后缘且处于非活跃状态，表示任务尚未完成。*

**后续步骤**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-buttons-placement-navigation-subsequent-page@2x.png)
*在后续步骤中，“返回”按钮会取代“取消”按钮，让用户可以返回。*

**最后一步**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-buttons-placement-navigation-final-page@2x.png)
*在最后的确认步骤中，“完成”按钮变为活跃状态，让用户确认任务已完成并关闭表单。*

当用户滚动表单内容或拖移*控制柄*时，可调整大小的表单会展开。控制柄是一个小的水平指示符，可出现在表单的顶部边缘。表单根据其*定位*来调整大小，即表单自然放置的特定高度。定位专为 iPhone 设计，指定了表单自然放置时的特定高度。系统定义了两种定位：*大号*是完全展开的表单的高度，*中号*约为完全展开高度的一半。表单可以有一个或多个自定义定位值。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-large-detent@2x.png)
*大号定位*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-medium-detent@2x.png)
*中号定位*

表单自动支持大号定位。增加中号定位可让表单以两种高度放置，而仅指定中号可防止表单扩展至完整高度。有关开发者指南，请参阅 [detents](https://developer.apple.com/cn/documentation/uikit/uisheetpresentationcontroller/detents)。

**在 iPhone App 中，考虑支持中号定位以允许表单内容渐进显示**。例如，共享表单在中号定位中显示大部分相关项目，无需调整大小即可看到这些项目。若要查看更多项目，用户可以滚动或展开表单。相比之下，如果表单的内容在以完整高度显示时更有用，你可能就无需考虑支持中号定位。例如，“信息”和“邮件”中的编写表单仅以完整高度显示，为用户提供足够的空间创建内容。

**在可调整大小的表单中包括一个控制柄**。控制柄向用户展示其可拖移表单以调整大小；用户还可以轻点控制柄以在不同定位间循环。除了提供调整大小的视觉指示符外，控制柄还可与“旁白”搭配使用，以便用户不看屏幕就可以调整表单大小。有关开发者指南，请参阅 [prefersGrabberVisible](https://developer.apple.com/cn/documentation/uikit/uisheetpresentationcontroller/prefersgrabbervisible)。

**支持轻扫以关闭表单**。用户期望可通过垂直轻扫来关闭表单，而不是轻点关闭按钮。如果用户开始轻扫以关闭表单时，其中有未保存的更改，请使用操作表单让用户确认操作。

**优先在 iPadOS App 中使用页面或表格表单呈现样式**。每种样式均使用默认的表单大小，将其内容居中在暗色背景视图上，并提供一致的体验。有关开发者指南，请参阅 [UIModalPresentationStyle](https://developer.apple.com/cn/documentation/uikit/uimodalpresentationstyle)。

### macOS

在 macOS 中，表单是一个圆角的卡片状视图，悬浮在其父窗口之上。表单在屏幕上显示时，父窗口会变暗，表示用户在关闭表单前无法与之交互。但是，用户期望在关闭表单前可与其他 App 窗口交互。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-macos-notes@2x.png)

**以合理的默认大小呈现表单**。用户一般不期望调整表单大小，因此使用适合你显示内容的大小非常重要。但在某些情况下，用户喜欢可调整大小的表单（如需要展开内容以更清晰查看时），因此最好支持调整大小功能。

**让用户无需先关闭表单即可与其他 App 窗口交互**。表单打开时，其父窗口会前置。如果父窗口是文稿窗口，其文稿相关的非模态面板也会前置。用户想要与 App 中的其他窗口交互时，请确保即使其尚未关闭表单，也可将这些窗口前置。

**如果用户需要重复提供输入并观察结果，请使用面板而非表单**。例如，查找并替换面板可能让用户发起逐个替换，以便观察每次搜索的结果是否正确。有关指南，请参阅[面板](panels.md)。

### visionOS

在 visionOS App 中可见的表单会悬浮在其父窗口前方，让父窗口变暗并成为用户与 App 交互时的目标。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-modal-sheet.mp4)

**避免显示从窗口底部边缘出现的表单**。为了帮助用户查看表单，首选将表单放在用户[视场](spatial-layout.md#Field-of-view)的中心。

**呈现默认大小的表单以帮助用户保留其环境**。避免显示覆盖大部分或整个窗口的表单，但考虑让用户按需调整表单的大小。

### watchOS

在 watchOS 中，表单是滑过 App 当前内容的全屏视图。表单外观为半透明，以帮助保持当前上下文，但系统会为背景应用材质以对被覆盖内容进行模糊化和降低饱和度处理。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sheets-watch-overlay@2x.png)

**仅在模态任务需要自定义标题或自定义内容呈现方式时使用表单**。如果需要向用户提供重要信息或呈现一组选项，请考虑使用[提醒](alerts.md)或[操作表单](action-sheets.md)。

**保持表单交互短暂而临时**。仅将表单用于临时中断当前的工作流程，并且仅用于推动重要任务。避免使用表单来帮助用户导航 App 内容。

**如果更改默认标签，优先使用 SF 符号代表操作**。避免使用可能误导用户认为表单是层级导航界面一部分的标签。另外，如果位于顶部前缘角处的文本看起来像页面或 App 标题，用户将不知道如何关闭表单。有关指南，请参阅[标准图标](icons.md#Standard-icons)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/modal-sheet-watchos-do-not-1@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/modal-sheet-watchos-do-not-2@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/modal-sheet-watchos-do@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

## 资源

#### 相关内容

[模态化](modality.md)

[操作表单](action-sheets.md)

[弹出窗口](popovers.md)

[面板](panels.md)

#### 开发者文档

[sheet(item:onDismiss:content:)](https://developer.apple.com/cn/documentation/swiftui/view/sheet(item:ondismiss:content:)) — SwiftUI

[UISheetPresentationController](https://developer.apple.com/cn/documentation/uikit/uisheetpresentationcontroller) — UIKit

[presentAsSheet(_:)](https://developer.apple.com/cn/documentation/appkit/nsviewcontroller/presentassheet(_:)) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 3 月 24 日 | 更新了有关按钮放置的指南。 |
| 2024 年 3 月 29 日 | 新增了在 iPadOS App 中使用表格或页面表单样式的指南。 |
| 2023 年 12 月 5 日 | 建议在 visionOS App 中使用拆分视图提供补充项。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
| 2023 年 6 月 5 日 | 更新在 watchOS 中使用表单的指南。 |
