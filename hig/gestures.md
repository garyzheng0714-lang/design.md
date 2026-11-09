# 手势

原文：https://developer.apple.com/cn/design/human-interface-guidelines/gestures

手势是用户用于直接影响设备上 App 或游戏中对象的物理动作。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/inputs-gestures-intro@2x.png)

取决于使用的设备，用户可在触控屏上、空中或者触控板、鼠标、遥控器或包含触控表面的游戏控制器等各种输入设备上执行手势。

每个平台都支持轻点、轻扫和拖移等基本手势。虽然构成基本手势的准确动作因平台和输入设备而异，但用户熟悉这些手势的底层功能并希望能在任何位置使用它们。有关这些手势的列表，请参阅[标准手势](gestures.md#Standard-gestures)。

## 最佳实践

**为用户提供不止一种与 App 交互的方式**。用户通常更喜欢或需要使用语音、键盘或切换控制等其他输入方式与设备交互。不要假设用户可以使用特定手势执行给定任务。有关指南，请参阅[无障碍](accessibility.md)。

**响应手势的方式一般应与用户预期保持一致**。用户希望大多数手势无论在任何当前情境中都具有相同效果。例如，用户希望轻点以激活或选择对象。请避免使用轻点或轻扫等熟悉的手势执行专属于你 App 的操作；同样，请避免创建独特手势来执行标准操作，如激活按钮或在长视图中滚动。

**尽可能快地处理手势**。有用的手势可优化直接操控的体验并提供即时反馈。用户在你的 App 中执行手势时，请提供反馈以帮助其预测结果，并在必要时告知完成操作所需的移动范围和类型。

**向用户表明手势不可用的情况**。如果不清楚说明手势为何不可用，用户可能认为你的 App 已停止响应或者自己未正确执行手势，从而引起挫败感。例如，如果用户尝试拖移锁定的对象，用户界面可能不会表明对象的位置已被锁定；或者如果用户尝试激活不可用的按钮，按钮的不可用状态可能与可用状态不会有明显区别。

## 自定义手势

**仅在必要时添加自定义手势**。当游戏或绘图等 App 中用户经常执行的特定任务无法通过现有手势执行时，最适合为其专门设计自定义手势。如果你决定实施自定义手势，请确保其：

- 易于发现
- 操作直观
- 区别于其他手势
- 不是在你 App 或游戏中执行重要操作的唯一方式

**让自定义手势简单易学**。在 App 中提供帮助用户快速学习和执行自定义手势的机会，并确保在真实使用场景中测试交互。如果你发现难以使用简单的语言和图形来描述手势，这可能意味着用户会觉得该手势难以学习和执行。

**使用快捷手势来补充而非替换标准手势**。虽然你可能会提供可快速访问 App 各部分内容的自定义手势，用户仍需要使用简单熟悉的方式来导览和执行操作，即使这意味着需要多轻点一两下。例如，在支持于视图层级结构之间导航的 App 中，用户希望在顶部工具栏中找到“返回”按钮，用于轻点一下返回上个视图。若要帮助加速此操作，许多 App 在继续提供“返回”按钮的同时还提供快捷手势，如从窗口或触控屏的一侧轻扫。

**避免与访问系统用户界面的手势形成冲突**。多个平台都提供了用于访问系统行为的手势，例如在 watchOS 中轻扫边缘，或者在 visionOS 中翻手来访问系统叠层。避免定义可能与这些交互形成冲突的自定义手势，因为用户会希望此类控制表现一致，这一点非常重要。在游戏或沉浸式体验中的特定环境下，开发者可推迟系统手势来使用这类区域。有关更多信息，请参阅 iOS、iPadOS、watchOS 和 visionOS 的平台考量因素。

## 平台考量因素

### iOS、iPadOS

除了所有平台都支持的[标准手势](gestures.md#Standard-gestures)，iOS 和 iPadOS 还支持用户期望的一些其他手势。

| 手势 | 常用操作 |
| --- | --- |
| 三指轻扫 | 发起撤销（向左轻扫）；发起重做（向右轻扫）。 |
| 三指开合 | 拷贝所选文本（捏合手指）；粘贴拷贝的文本（张开手指）。 |
| 四指轻扫（仅限 iPadOS） | 在 App 之间切换。 |
| 摇动 | 发起撤销；发起重做。 |

**如果能优化体验，考虑允许同时识别多个手势**。虽然在非游戏 App 中同时执行的手势可能不太有用，但游戏中可能包括用户可同时操作的多个屏幕控制，如摇杆和发射按钮。有关在 iPadOS App 中集成触控屏输入与 Apple Pencil 输入的指南，请参阅 [Apple Pencil 和随手写](apple-pencil-and-scribble.md)。

### macOS

用户主要使用[键盘](keyboards.md)和鼠标与 macOS 交互。此外，他们还可以在妙控板、妙控鼠标或包含触控表面的[游戏控制器](game-controls.md)上使用[标准手势](gestures.md#Standard-gestures)。

### Apple tvOS

用户希望通过兼容的遥控器、Apple TV Remote 或包含触控表面的[游戏控制器](game-controls.md)并使用[标准手势](gestures.md#Standard-gestures)来导览 Apple tvOS App 和游戏。有关指南，请参阅[遥控器](remotes.md)。

### visionOS

visionOS 支持两类手势：间接和直接。

用户使用*间接*手势时先通过注视将对象定为目标，然后用手从远处间接操控该对象。例如，用户可以注视某个按钮进行聚焦，并快速互点拇指与其他手指进行选择。间接手势可在任意距离舒适执行，且可让用户在不同对象间快速改变焦点并通过最小的动作来选择项目。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-spatial-gesture-indirect.mp4)

用户使用*直接*手势来实际接触交互式对象。例如，用户可以轻点虚拟按键来直接在 visionOS 键盘上键入。直接手势在可触及范围内时效果最理想。由于长时间举手臂可能会让用户感到疲劳，直接手势不宜频繁使用。visionOS 还支持所有标准手势的直接版本，这可让用户与任何标准组件进行直接或间接交互。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-spatial-gesture-direct.mp4)

以下是用户在 visionOS 中使用的标准直接手势；请参阅[规范](gestures.md#Specifications)以查看标准间接手势的列表。

| 直接手势 | 常见用途 |
| --- | --- |
| 轻触 | 直接选择或激活对象。 |
| 按住 | 打开关联菜单。 |
| 轻触并拖移 | 将对象移到新位置。 |
| 轻触两下 | 预览对象或文件；在编辑情境中选择字词。 |
| 轻扫 | 显示操作和控制；关闭视图；滚动。 |
| 双手捏合并拖移 | 放大或缩小。 |
| 双手捏合并沿圆弧拖移 | 旋转对象。 |

**尽可能支持标准手势**。例如，用户注视 App 或游戏中的对象后，如果想要选择或激活对象，轻点很可能是其执行的第一个手势。即使你还支持自定义手势，但支持轻点等标准手势可帮助用户快速适应你的 App 或游戏。

**尽可能同时提供间接和直接交互方式**。优先为用户界面和按钮等常见组件使用间接手势。为需要近距离交互的对象或者游戏或交互式体验中的特定动作保留直接手势和自定义手势。

**避免需要特定身体移动或姿势来输入**。不论是由于残障、空间限制还是其他环境因素，并非所有人都始终能够执行特定身体动作或者以某种方式做出相应姿势。如果体验涉及动作，请考虑支持备选输入方式以便用户可以选择最理想的交互方式。

#### 设计 visionOS 中的自定义手势

如果想要为体验提供用户无法通过现有系统手势执行的特定交互，请考虑设计自定义手势。若要提供此类交互，你的 App 需要在全空间中运行，且必须请求用户许可来访问其手部相关信息。有关开发者指南，请参阅 [Setting up access to ARKit data](https://developer.apple.com/cn/documentation/visionos/setting-up-access-to-arkit-data)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-custom-spatial-gesture-happy-beam@2x.png)

**优先考虑舒适性**。持续测试需要自定义手势的所有交互中的人体工程学。需要用户保持手臂举起（即使只有一小会）的自定义交互可能会让身体感到劳累，连续多次重复相似的动作也可能会对用户的肌肉和关节造成压力。

**谨慎考虑涉及多指或双手的复杂自定义手势**。用户使用 App 或玩游戏时并非总能腾出双手。如果体验需要更复杂的手势，请考虑一并提供不需要太多动作的备选手势。

**避免需要用某一只手才能执行的自定义手势**。需要用户记住用哪只手来触发自定义手势会增加其认知负荷，同时还可能使体验对有强势惯用手或四肢缺陷的用户不够友好。

#### 在 visionOS 中使用系统叠层

在 visionOS 2 及更高版本中，用户可以注视某只手的掌心并使用手势来快速访问主屏幕和控制中心的系统叠层。这些交互在系统范围内可用，且专门为访问系统叠层保留。

> **注**
>
> 在 visionOS 2 及更高版本中，系统叠层是访问控制中心的默认方式。visionOS 1 行为（向上看）仍可作为无障碍设置使用。

设计使用自定义手势或将内容锚定在用户手部的 App 和游戏时，将与系统叠层的交互考虑在内十分重要。

**将用户手部周围的区域留给系统叠层及其相关手势**。尽量不将内容锚定在用户的手部或手腕上。如果你设计的游戏涉及手部锚定内容，请将该内容放在用户触手可及的区域外，以避免与主屏幕指示符形成冲突。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-hand-area-of-focus@2x.png)
*预留的区域用于与系统叠层交互。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-spatial-gesture-home-indicator@2x.png)
*这个人注视手掌以显示主屏幕指示符。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-spatial-gesture-control-center@2x.png)
*一个人转动手部以显示状态栏，并可轻点以打开控制中心。*

**设计沉浸式 App 或游戏时，考虑推迟系统叠层行为**。特定环境下，你可能不想让主屏幕指示符在用户注视其手心时出现。例如，即使用户可能会碰巧从不同角度注视自己的手，使用虚拟手或手套的游戏也会想让用户能一直沉浸在故事世界中。在这种情况下，当 App 在全空间中运行时，你可以选择改为要求轻点一下来显示主屏幕指示符。有关开发者指南，请参阅 [persistentSystemOverlays(_:)](https://developer.apple.com/cn/documentation/swiftui/view/persistentsystemoverlays(_:))。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/gestures-default-home-indicator@2x.png)
*共享空间中的默认行为*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/gestures-home-indicator-in-immersive-space@2x.png)
*全空间中的默认行为*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/gestures-fully-immersive-game-with-glove@2x.png)
*全空间中的推迟行为*

> **注**
>
> 针对 visionOS 1 构建的 App 和游戏默认会推迟系统叠层行为。当用户注视手心且 App 在全空间中运行时，主屏幕指示符不会出现，除非用户先互点一下。

**谨慎设计需要转动手部、手腕和前臂动作的自定义手势**。此特定动作为显示系统叠层而保留。因为系统叠层始终显示在 App 内容上方且你的 App 不知道其何时可见，测试可能存在冲突的任何自定义手势或内容十分重要。

### watchOS

#### 互点两下

在 watchOS 11 及更高版本中，用户可以使用互点两下手势来滚动浏览列表和滚动视图，以及在垂直标签页视图间导览。此外，你还可以将切换或按钮指定为 App、小组件或系统在智能叠放中显示的实时活动的主要操作。在包含主要操作的视图中互点两下会高亮标记该控制，然后执行操作。系统还支持将互点两下用于你在[通知](notifications.md)中提供的自定义操作，该操作会作为通知中的第一个非破坏性操作。

**避免在包含列表的视图、滚动视图或垂直标签页中设置主要操作**。这与用户互点两下时预期的默认导览行为相冲突。

**选取用户最常使用的按钮作为视图中的主要操作**。在非滚动视图中，互点两下执行用户最常用的操作非常有用。例如，在媒体控制视图中，你可以将主要操作分配给播放/暂停按钮。有关开发者指南，请参阅 [handGestureShortcut(_:isEnabled:)](https://developer.apple.com/cn/documentation/swiftui/view/handgestureshortcut(_:isenabled:)) 和 [primaryAction](https://developer.apple.com/cn/documentation/swiftui/handgestureshortcut/primaryaction)。

## 规范

### 标准手势

系统提供了 API 以支持用户通过其设备使用的熟悉手势，无论是使用触控屏、visionOS 中的间接手势还是触控板、鼠标、遥控器或游戏控制器等输入设备。有关开发者指南，请参阅：[Gestures](https://developer.apple.com/cn/documentation/swiftui/gestures)。

| 手势 | 支持系统 | 常用操作 |
| --- | --- | --- |
| 轻点 | iOS、iPadOS、macOS、Apple tvOS、visionOS、watchOS | 激活控制；选择项目。 |
| 轻扫 | iOS、iPadOS、macOS、Apple tvOS、visionOS、watchOS | 显示操作和控制；关闭视图；滚动。 |
| 拖移 | iOS、iPadOS、macOS、Apple tvOS、visionOS、watchOS | 移动用户界面元素。 |
| 按住（或捏住） | iOS、iPadOS、Apple tvOS、visionOS、watchOS | 显示更多控制或功能。 |
| 轻点两下 | iOS、iPadOS、macOS、Apple tvOS、visionOS、watchOS | 放大；如果已经放大，则缩小；在 Apple Watch Series 9 和 Apple Watch Ultra 2 上执行主要操作。 |
| 缩放 | iOS、iPadOS、macOS、Apple tvOS、visionOS | 缩放视图；放大内容。 |
| 旋转 | iOS、iPadOS、macOS、Apple tvOS、visionOS | 旋转所选项目。 |

有关在特定输入设备上支持更多手势和按钮按下操作的指南，请参阅[指针设备](pointing-devices.md)、[遥控器](remotes.md)和[游戏控制](game-controls.md)。

## 资源

#### 相关内容

[反馈](feedback.md)

[眼睛](eyes.md)

[提供触感反馈](playing-haptics.md)

#### 开发者文档

[Gestures](https://developer.apple.com/cn/documentation/swiftui/gestures) — SwiftUI

[UITouch](https://developer.apple.com/cn/documentation/uikit/uitouch) — UIKit

#### 视频

- [提升 UI 动画和过渡效果](https://developer.apple.com/cn/videos/play/wwdc2024/10145)
- [空间输入设计](https://developer.apple.com/cn/videos/play/wwdc2023/10073)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 9 月 9 日 | 新增了在 visionOS 中使用系统叠层的指南，以及进行了内容组织上的更新。 |
| 2023 年 9 月 15 日 | 更新规范以包括 watchOS 中的轻点两下手势。 |
| 2023 年 6 月 21 日 | 更改了页面标题“触控屏手势”并更新以包括针对 visionOS 的指南。 |
