# Apple Pencil 和随手写

原文：https://developer.apple.com/cn/design/human-interface-guidelines/apple-pencil-and-scribble

Apple Pencil 除了充当指针和用户界面交互工具，还有助于让涂鸦、手写和标记变得轻松自如。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/inputs-apple-pencil-and-scribble-intro@2x.png)

Apple Pencil 是专用于 iPad App 的一种工具，用途广泛，使用直观，可为做笔记、速绘、绘画、标记文稿等任务提供像素级精确度。“随手写”功能让用户可使用 Apple Pencil 通过快速且私密的设备端手写识别功能在任何文本栏中输入文本。

有关 Apple Pencil 功能和兼容性的详细信息，请参阅 [Apple Pencil](https://www.apple.com/apple-pencil/)。

## 最佳实践

**支持用户在使用标记工具时凭直觉期望的行为**。大多数用户拥有许多在现实世界中使用标记工具的经验，这类意识会影响其在将 Apple Pencil 与你 App 搭配使用时的期望。为了提供令人愉悦的体验，请借鉴用户与铅笔、钢笔及其他非数字标记工具的交互方式，并主动支持用户可能自然会尝试的操作。例如，用户通常会想在文稿或书的页边空白处书写。

**让用户可选取何时在 Apple Pencil 和手指输入之间切换**。例如，如果你的 App 支持使用 Apple Pencil 进行标记，请同时确保 App 的控制也可响应 Apple Pencil，以便用户无需改用手指激活控制。在这种情况下，不支持 Apple Pencil 输入的控制可能会看似无响应，让用户误认为是出现故障或者电量不足。（“随手写”功能仅支持 Apple Pencil 输入。）

**让用户可在 Apple Pencil 触及屏幕时留下标记**。你会希望在屏幕上使用 Apple Pencil 的体验与在纸上使用传统铅笔的体验相同，所以避免让用户在做标记之前需要轻点某个按钮或进入某个特殊模式是非常必要的。

**通过响应用户使用 Apple Pencil 的方式来帮助用户表达自己**。Apple Pencil 可能会感知倾斜（高度）、作用力（压力）、方向（方位）和[侧旋](apple-pencil-and-scribble.md#Barrel-roll)。利用此信息来影响 Apple Pencil 留下的笔触，例如改变粗细和强度。响应压力时，保持内容简单直观。例如，通过压力变化来影响持续属性（如墨水不透明度或笔刷大小）可带来自然的体验。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-pencil-altitude@2x.png)
*高度*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pencil-pressure@2x.png)
*压力*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-pencil-azimuth@2x.png)
*方位*

**提供视觉反馈以表明与内容的直接联系**。确保 Apple Pencil 表现得可直接且立即操作其在屏幕上所触及的内容。避免让 Apple Pencil 发起看似不相关的操作，或是影响屏幕其他部分上的内容。

**设计出色的左右手体验**。避免将控制放置在可能会受任一只手遮挡的位置。如果控制有可能被遮挡，请考虑让用户可调整其位置。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pencil-controls-moved-right@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pencil-controls-moved-left@2x.png)

## 悬停

**利用悬停来帮助用户预测在 Apple Pencil 触及屏幕时会发生什么**。例如，当用户握住 Apple Pencil 放到屏幕上方时，悬停预览可显示当前工具能生成的标记的尺寸和颜色。尽可能避免随用户将 Apple Pencil 移近或移远屏幕而不断修改预览。随高度变化的预览可能无法清晰表现出 Apple Pencil 将要生成的标记，而且频繁的视觉变化可能会非常使人分心。

**避免使用悬停来发起操作**。与轻点按钮或在屏幕上标记不同，悬停是一种相对不精确的动作，不需要用户考虑 Apple Pencil 与屏幕之间的实际距离。你不会希望用户仅仅因为在屏幕附近拿着 Apple Pencil，就无意间执行了某个操作，尤其还是执行了用户可能想要撤销的破坏性操作。

**优先显示靠近中间动态值的预览值**。对于不透明度或流动性等动态属性，要描述出范围内最高端或最低端的效果可能非常困难。例如，预览使用最大压力生成的笔刷标记外观可能会遮挡用户正在标记的区域。相比之下，描述使用最小压力生成的标记则难以被用户察觉，使实际标记的预览不准确，甚至于看不见。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pencil-preview-small@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pencil-preview-medium@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pencil-preview-large@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

**考虑在用户正标记的位置附近利用悬停来支持相关的交互**。例如，当用户执行[轻捏](apple-pencil-and-scribble.md#Squeeze)等手势或者按下所连接键盘上的修饰键时，你可以通过显示工具大小的关联菜单来响应悬停。在用户正标记的位置附近显示菜单，使其无需将 Apple Pencil 或手移到屏幕其他部分即可进行选择。

**优先显示 Apple Pencil（而非指针设备）的悬停预览**。虽然指针设备也可以响应悬停手势，但为这两种设备提供相同的视觉反馈可能会令人困惑。如果在你的 App 中可行，你可以将悬停预览限制为仅针对 Apple Pencil。有关开发者指南，请参阅 [Adopting hover support for Apple Pencil](https://developer.apple.com/cn/documentation/uikit/adopting-hover-support-for-apple-pencil)。

## 轻点两下

**在你的 App 中可行时，遵循用户针对轻点两下手势进行的设置**。默认情况下，支持轻点两下手势的 Apple Pencil 型号会通过切换当前工具和橡皮擦来响应，但用户可以将手势设为切换当前工具和上一个工具、显示和隐藏颜色选择器，或者完全无操作。如果你的 App 支持这些行为，请让用户使用其喜欢的手势来执行。如果针对整个系统范围的轻点两下设置在你的 App 中都不可行，你仍可使用手势更改交互模式。例如，提供网格编辑工具的 3D App 可能会使用轻点两下来切换工具的上升和下降模式。

**如有需要，请为用户提供可指定自定义轻点两下行为的方式**。除了部分或全部默认行为外，如果你还提供自定义的轻点两下行为，请同时提供让用户可选取自定义行为模式的控制。用户需要知道自己正使用哪种模式，否则，当你的 App 对交互作出不同的响应时，用户可能会感到困惑。在这种情况下，确保用户可轻松发现你 App 支持的自定义行为，但不要默认打开此类自定义行为。

**避免将轻点两下手势用于执行修改内容的操作**。在极少数情况下，用户有可能在无意间就使用了轻点两下，这意味着用户甚至有可能不会意识到你的 App 已执行了操作。优先将轻点两下用于执行用户易于撤销的操作，尤其是要避免将轻点两下用于执行可能导致数据丢失的潜在破坏性操作。

## 轻捏

使用 Apple Pencil Pro 时，用户可以通过轻捏执行操作。你可以设计响应轻捏的自定义行为，但同时需意识到用户可能会选择将轻捏手势配置为运行 [App 快捷指令](app-shortcuts.md) 而非执行 App 特定操作。

> **注**
>
> 只有当已配对 iPad 屏幕处于点亮状态且 Apple Pencil Pro 未直接与其接触时，才能使用轻捏手势。因为使用轻捏的条件是 Apple Pencil Pro 与 iPad 保持一定距离，用户可能不会始终直观留意到屏幕上的手势结果。

**将轻捏视为单次的快速手势，用于执行离散（不连续）操作**。用户有时会用力轻捏，因此持续轻捏或多次快速轻捏会使用户感到劳累。通过响应单次轻捏并立即显示结果，可帮助用户保持舒适。

**如果使用轻捏显示关联菜单等 App 用户界面，请使其靠近 Apple Pencil Pro 显示**。在 Apple Pencil Pro 笔尖附近显示轻捏结果会强化设备与手势之间的联系，且有助于用户专注于自己的任务。

**将轻捏定义为非破坏性且易于撤销的操作**。和轻点两下手势一样，用户可能在无意间执行轻捏手势，因此避免将轻捏用于执行可能导致数据丢失的操作至关重要。

## 侧旋

通过 Apple Pencil Pro 标记时，用户可以使用侧旋手势更改所做标记的类型。例如，使用 Apple Pencil Pro 高亮标记“备忘录”中的内容时，用户可以侧旋以旋转标记的角度。

**仅将侧旋用于修改标记行为，而非用于实现导航或显示其他控制**。与轻点两下和轻捏不同，侧旋与标记自然相关且不适用于执行界面操作。

## 随手写

通过“随手写”和 Apple Pencil，用户无需先轻点或切换模式，即可在 App 接受文本的任何位置进行书写。由于“随手写”已完全整合到 iPadOS 中，该功能默认对所有 App 都可用。

**使文本输入的体验流畅轻松**。“随手写”默认适用于所有标准文本组件，例如文本栏、文本视图、搜索栏和网页内容中的可编辑栏，但密码栏除外。如果你在 App 中使用了自定义文本栏，请避免让用户要先进行轻点或选择才能开始书写。

**让“随手写”功能在用户可能会想输入文本的任何位置都可用**。与使用键盘不同，Apple Penci 的使用方式提倡用户将屏幕当作纸张一样对待。你可以在你的 App 中强化这种感觉，让“随手写”功能始终可用于合理存在文本输入的位置。例如，在“提醒事项”中创建新的提醒事项时，用户自然会将其写到最后一项下方的空白处，即使该区域不包含文本栏。有关开发者指南，请参阅 [UIIndirectScribbleInteraction](https://developer.apple.com/cn/documentation/uikit/uiindirectscribbleinteraction-1nfjm)。

**避免让用户在书写时分心**。某些文本栏行为适用于键盘输入，但可能会破坏 Apple Pencil 提供的自然书写体验。例如，当用户在文本栏中书写时，最好避免显示自动补全文本，因为这些建议可能会对书写造成视觉干扰。另外，最好在用户开始书写时隐藏栏位中的占位符文本，让输入内容看起来不与其重叠。

**当用户在文本栏中书写时，确保该文本栏保持静止**。在某些情况下，移动聚焦的文本栏是合理的：例如，搜索栏可能会通过移动以腾出更多空间来显示结果。此类移动对于使用键盘的用户而言尚可，但当用户书写时，这可能会让他们感觉失去了对输入方向的控制。如果无法防止文本栏移动或调整大小，请考虑延迟更改，直到用户暂停书写。

**当用户在文本栏中书写和编辑时，防止文本自动滚动**。当转写文本自动滚动时，用户可能会尽量避免在上面书写。甚至如果文本在用户使用 Apple Pencil 进行选择时滚动，用户可能会选择到其他并不想要的文本范围。

**为用户提供足够的书写空间**。在小文本栏中书写的体验可能不佳。当你发现可能会使用 Apple Pencil 输入时，可以通过在用户开始书写前或暂停书写时增加文本栏的大小来改善你 App 中的书写体验，并避免在用户书写期间调整文本栏的大小。有关开发者指南，请参阅 [UIScribbleInteraction](https://developer.apple.com/cn/documentation/uikit/uiscribbleinteraction)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pencil-scribble@2x.png)

## 自定义涂鸦

通过 [PencilKit](https://developer.apple.com/cn/documentation/pencilkit)，你可让用户在做笔记、为文稿和图像添加注解以及涂鸦时享受 iOS 提供的同款低延迟体验。PencilKit 还可让你轻松在 App 中创建自定义的涂鸦画布，并提供顶尖的工具选择器和墨水调色盘。

**帮助用户在现有内容的基础上涂鸦**。PencilKit 画布上的颜色默认会动态调整为深色模式，因此用户可在两种模式的任一种中创建内容，且两种效果都不错。然而，当用户在现有内容（如 PDF 或照片）的基础上涂鸦时，不妨阻止颜色动态调整，以使标记保持清晰可见。

**当 App 在紧凑环境中运行时，考虑显示自定义的撤销和重做按钮**。在常规环境中，工具选择器包括撤销和重做按钮，但在紧凑环境中则不包括。在紧凑环境中，你可以在工具栏中显示撤销和重做按钮。你还可以考虑支持标准的三指撤销/重做手势，以便用户可在任何环境中使用。有关指南，请参阅[撤销和重做](undo-and-redo.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pencil-undo-redo-buttons@2x.png)

## 平台考量因素

*在 iOS、macOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[数据输入](entering-data.md)

#### 开发者文档

[PencilKit](https://developer.apple.com/cn/documentation/pencilkit)

[PaperKit](https://developer.apple.com/cn/documentation/paperkit)

#### 视频

- [使用 PencilKit 解读笔触之间的奥秘](https://developer.apple.com/cn/videos/play/wwdc2026/203)
- [深入探索 PaperKit](https://developer.apple.com/cn/videos/play/wwdc2026/372)
- [了解 PaperKit](https://developer.apple.com/cn/videos/play/wwdc2025/285)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 5 月 7 日 | 新增了处理 Apple Pencil Pro 上轻捏和侧旋的指南。 |
| 2023 年 9 月 12 日 | 更新了插图。 |
| 2022 年 11 月 3 日 | 新增使用悬停增强 App 的指南。 |
