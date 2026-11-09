# 聚焦和选择

原文：https://developer.apple.com/cn/design/human-interface-guidelines/focus-and-selection

聚焦可帮助用户从视觉上确认其交互的目标对象。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/inputs-focus-and-selection-intro@2x.png)

聚焦支持基于组件的简化导航。通过遥控器、游戏控制器或键盘等输入方式，用户可聚焦到想要交互的组件上。

在许多情况下，聚焦也会同时选择项目。自动选择可能导致令人分心的环境转换（如打开新视图）的情况例外。例如，在 Apple tvOS 中寻找想要的项目时，用户会使用遥控器将焦点在项目之间移动，但选择获得焦点的项目会打开或激活它，因此需要单独的手势进行选择。

不同平台使用不同的方式来表示焦点。例如，iPadOS 和 macOS 通过在项目周围绘制圆环或高亮标记它来显示焦点；Apple tvOS 通常使用[视差效果](images.md#Parallax-effect)为获得焦点的项目赋予有深度和活力的外观。聚焦效果和交互的组合有时称为*聚焦系统*或*聚焦模型*。

## 最佳实践

**借助系统提供的聚焦效果**。系统定义的聚焦效果经过精确调整以辅助与 Apple 设备进行交互，从而为用户提供快速、流畅和生动的体验。集成系统提供的聚焦行为可为你的 App 带来一致性和可预测性，有助于用户快速理解。仅在确实有必要时，才考虑创建自定义聚焦效果。

**避免在用户未交互时更改焦点**。用户依赖聚焦系统来帮助其了解在 App 中所处的位置。如果在未交互时更改焦点，用户必须花时间找到新获得焦点的项目，从而耽误其当前任务。例外情况是用户使用可让其进行不连续的定向移动的输入设备（如键盘、遥控器或游戏控制器）来移动焦点时，之前获得焦点的项目会消失。在这种情况下，之前获得焦点项目的单个离散步进范围内只有少量项目，因此将焦点移到这些剩余项目中的一个可确保焦点指示符位于用户可轻易找到的位置。用户未使用此类输入设备移动焦点时，你无法预测其下一步的目标项目，因此获得焦点的对象消失时直接隐藏焦点指示符通常是最佳做法。

**帮助用户聚焦 App 中的项目上时，与系统保持一致**。例如，在 iPadOS 和 macOS 中，全键盘控制模式可帮助用户使用键盘访问每个控制，因此你只需要支持针对列表项、文本栏和搜索栏等内容元素的聚焦，不需要支持针对按钮、滑块和切换等控制的聚焦。相反，Apple tvOS 用户需要在遥控器或游戏控制器上使用定向手势（或按下已连接键盘上的箭头键）来访问每个屏幕元素，因此你需要确保用户可聚焦 App 中的每个元素上。

**使用与系统一致的视觉外观来表示焦点**。例如，考虑包含项目列表的窗口。在 iPadOS 和 macOS 中，系统会使用白色文本以及与 App 强调色匹配的背景高亮标记来绘制获得焦点的列表项，并使用标准文本颜色以及灰色背景高亮标记来绘制未获得焦点的项目（有关开发者指南，请参阅 [UICollectionView](https://developer.apple.com/cn/documentation/uikit/uicollectionview) 和 [NSTableView](https://developer.apple.com/cn/documentation/appkit/nstableview)）。

**一般应为文本或搜索栏使用焦点环，在列表或集合中使用高亮标记**。虽然你可以使用焦点环来吸引用户关注填充单元格的项目（如照片），但高亮标记一整行通常更便于用户查看列表和集合。

## 平台考量因素

*在 iOS 或 watchOS 中不受支持。*

### iPadOS

iPadOS 15 及更高版本定义了一个聚焦系统，支持通过键盘交互导航文本栏、文本视图和边栏，以及 App 中各种类型的集合视图和其他自定义视图。

iPadOS 和 Apple tvOS 的聚焦系统类似。用户通过将焦点指示符移到项目并进行选择来执行操作（有关指南，请参阅 [Apple tvOS](focus-and-selection.md#tvOS)）。虽然底层系统相同，但用户体验却略有不同。Apple tvOS 使用*定向焦点*，这意味着用户可以使用相同的交互，即轻扫 Apple TV Remote 或仅使用所连接键盘上的箭头键，来导航每个屏幕组件。相比之下，iPadOS 定义了*焦点组*，它代表了 App 中的特定区域，如边栏、网格或列表。使用焦点组的 iPadOS 可以支持两种不同的键盘交互。

- 按下 Tab 键可在焦点组间移动焦点，让用户导航到边栏、网格和其他 App 区域。
- 按下箭头键可进行与 Apple tvOS 类似的定向焦点交互，但仅限于在同一个焦点组中的项目间导航。例如，用户可以使用箭头键在列表或边栏中的项目间移动。

屏幕组件可通过使用光环效果或高亮标记外观来指示焦点。

*光环*焦点效果也称为*焦点环*，会在组件周围显示可自定义外框。你可以将光环效果应用到自定义视图以及集合或列表单元格中完全不透明的内容，如图像。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/focus-and-selection-halo-focus-effect@2x.png)

**必要时自定义光环焦点效果**。系统默认使用项目的形状以推断其光环的形状。如果系统提供的光环无法提供想要的外观，你可以改进它以匹配圆角等轮廓或由贝塞尔路径定义的形状。如果另一个组件遮挡或截断光环，你也可以调整光环的位置。例如，你可能需要确保标记显示在光环上方，或者光环不被父视图截断。有关开发者指南，请参阅 [UIFocusHaloEffect](https://developer.apple.com/cn/documentation/uikit/uifocushaloeffect)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/focus-and-selection-customized-halo@2x.png)

*高亮标记*外观中组件的文本使用 App 的强调色，这也指示了焦点，但不是焦点效果。当用户选择你已设定内容配置的集合视图单元格时，高亮标记外观会自动出现（有关开发者指南，请参阅 [UICollectionViewCell](https://developer.apple.com/cn/documentation/uikit/uicollectionviewcell)）。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/focus-and-selection-highlighted-appearance@2x.png)

**确保焦点以可行的方式在自定义视图中移动**。当用户继续按下 Tab 键时，焦点会以阅读顺序在焦点组中移动：从开头到末尾，从顶部到底部。虽然焦点按用户期望的方式在系统提供的视图中移动，但你可能需要调整聚焦系统访问你自定义视图的顺序。例如，如果想让焦点先向下移过自定义视图的垂直堆栈，再朝末尾方向移到下一个视图，你需要将堆栈容器标识为单个焦点组。有关开发者指南，请参阅 [focusGroupIdentifier](https://developer.apple.com/cn/documentation/uikit/uifocusenvironment/focusgroupidentifier)。

**调整项目的优先级以反映其在焦点组中的重要性**。如果一个组获得焦点，其*主要项*也会自动获得焦点，使用户可以轻松选择他们最有可能想要的项目。你可以通过增加项目的优先级来将其设为主要项目。有关开发者指南，请参阅 [UIFocusGroupPriority](https://developer.apple.com/cn/documentation/uikit/uifocusgrouppriority)。

### Apple tvOS

**在全屏幕体验中，让用户使用手势与内容交互，而非移动焦点**。项目全屏幕显示时不会包含焦点，因此用户自然会认为其手势会影响该对象，而不是对象的聚焦状态。

**避免显示指针**。用户希望通过更改焦点来在固定数量的项目之间导航，不希望在大屏幕上尝试拖移很小的指针。自由移动在玩游戏期间可能有意义（如寻找隐藏物品或开飞机），但在用户导航菜单和其他界面元素时请使用聚焦模型。如果你的 App 需要指针，请确保其非常显眼并且与你打造的体验高度协调。

**设计界面时应顾及组件的各种聚焦状态**。在 Apple tvOS 中，可聚焦项目最多有五种不同状态，每种状态看起来各不相同。将焦点移到项目通常会放大其比例，因此你需要提供获得焦点的更大尺寸资源，以确保其看起来始终清晰突显；你还需要确保更大的项目不会挤到周围的界面。

| 状态 | 描述 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/focus-and-selection-state-unfocused@2x.png) | 查看者尚未聚焦到该项目。未获得焦点的项目不如已获得焦点的项目看起来显眼。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/focus-and-selection-state-focused@2x.png) | 查看者聚焦到该项目。获得焦点的项目通过升高至前景以及添加高亮和动画的方式，看起来比其他屏幕内容更突出。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/focus-and-selection-state-highlighted@2x.png) | 查看者选取获得焦点的项目。用户选取时，获得焦点的项目会提供即时视觉反馈。例如，按钮可能会短暂反转其颜色并显示动画，然后过渡到其已选中外观。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/focus-and-selection-state-selected@2x.png) | 查看者已通过某种方式选取或激活该项目。例如，用户可用于收藏照片的心形按钮在已选中状态可能显示为实心，在未选中状态显示为空心。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/focus-and-selection-state-unavailable@2x.png) | 查看者无法聚焦该项目或选取它。不可用项目显示为不活跃状态。 |

有关开发者指南，请参阅 [Adding user-focusable elements to a tvOS app](https://developer.apple.com/cn/documentation/uikit/adding-user-focusable-elements-to-a-tvos-app)。

### visionOS

visionOS 支持 iPadOS 和 Apple tvOS 中的相同聚焦系统，可让用户使用键盘或游戏控制器等已连接的输入设备与 App 和系统进行交互。

> **注**
>
> 当用户注视虚拟对象以将其识别为要交互的对象时，系统使用*悬停效果*而不是聚焦效果来提供视觉反馈（有关指南，请参阅[眼睛](eyes.md)）。悬停效果与聚焦系统无关。

## 资源

#### 相关内容

[眼睛](eyes.md)

[键盘](keyboards.md)

#### 开发者文档

[Focus Attributes](https://developer.apple.com/cn/documentation/tvml/focus-attributes) — TVML

[Focus-based navigation](https://developer.apple.com/cn/documentation/uikit/focus-based-navigation) — UIKit

[About focus interactions for Apple TV](https://developer.apple.com/cn/documentation/uikit/about-focus-interactions-for-apple-tv) — UIKit

#### 视频

- [空间输入设计](https://developer.apple.com/cn/videos/play/wwdc2023/10073)
- [设计空间用户界面](https://developer.apple.com/cn/videos/play/wwdc2023/10076)
- [iPadOS 光标设计](https://developer.apple.com/cn/videos/play/wwdc2020/10640)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 10 月 24 日 | 阐明了聚焦效果和 visionOS 悬停效果之间的区别。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
