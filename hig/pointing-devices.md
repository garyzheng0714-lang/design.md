# 指针设备

原文：https://developer.apple.com/cn/design/human-interface-guidelines/pointing-devices

用户可以使用触控板或鼠标这样的指针设备来导航界面和发起操作。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/inputs-pointing-devices-intro@2x.png)

用户喜欢指针设备带来的精确性和灵活性。用户在 Mac 上导航 App 和系统时，通常希望将指针设备与键盘结合使用。在 iPad 和 Apple Vision Pro 上，指针设备在并未替代触控、眼睛或手势的情况下，为用户提供了一种与 App 和内容交互的额外方式。

## 最佳实践

**响应鼠标和触控板手势时保持一致性**。用户希望大多数手势在整个系统中都能发挥相同的作用，无论他们使用的是什么 App 或游戏。例如，在 Mac 上，无论是浏览单个文稿页面、网页还是图像，用户都依赖于“在页面之间轻扫”手势来发挥相同的作用。

**避免重新定义系统范围的触控板手势**。即使是在一款以自定义方式使用 App 特定手势的游戏中，用户也希望能够使用系统范围的手势；例如，在 macOS 中，用户希望通过熟悉的手势来显示程序坞或调度中心。别忘了 Mac 用户可以自定义手势来执行系统范围的操作。

**无论用户是使用手势、眼睛、指针设备还是键盘，请在你的 App 中提供一致的使用体验**。用户期望在多种输入类型之间流畅地切换，他们不想为每一种模式或所使用的每一款 App 学习不同的交互方式。

**让用户使用指针来显示和隐藏可自动最小化或淡出的控制**。例如，在 iPadOS 中，用户可以将指针放在最小化的 Safari 浏览器工具栏上来显示它（移走指针时，工具栏会再次最小化）。观看全屏幕视频时，用户还可以移动指针来显示或隐藏播放控制。

**用户按住修饰键并与 App 中的对象交互时，提供一致的使用体验**。例如，如果用户可以通过按住 Option 键拖移对象来复制该对象，那么无论他们使用触控还是指针进行拖移，应确保结果一致。

## 平台考量因素

*无针对 iOS 的额外考量因素。在 Apple tvOS 或 watchOS 中不受支持。*

### iPadOS

iPadOS 基于传统指针体验而构建，可自动调整指针以适应当前环境，并精确提供了丰富的视觉反馈，从而提高了生产率并简化了触控屏设备上的常见任务。iPadOS 指针系统为用户提供了一种与 App 和内容交互的额外方式，它不会取代触控。

**必要时允许在自定义视图中进行多重选择**。在 iPadOS 15 及更高版本中，用户可以点按并将指针拖过多个项目来选择它们。当用户以这种方式使用指针时，它会展开成一个可见的矩形并选择其中所包含的项目。标准的非列表集合视图默认支持此类交互；如果想在自定义视图中支持多重选择，那么你需要自行实现。有关开发者指南，请参阅 [UIBandSelectionInteraction](https://developer.apple.com/cn/documentation/uikit/uibandselectioninteraction)。

**仅当有价值时，才区分指针输入和手指输入**。例如，当用户使用指针时，滑动条可为他们提供一种额外的方法在视频中定位。在这种情况下，用户可以使用指针或触控来拖移播放头，但他们也可以使用指针来点按一个确切的目的位置。

#### 指针形状和内容效果

iPadOS 集成了指针及其停留的元素的外观和行为，将焦点移至指针所指的项目。你可以支持系统提供的指针效果，也可以修改效果以适合你的使用体验。

指针的形状默认为圆形，不过当用户将指针移到特定元素或区域上时，它可以显示系统定义的形状或自定义形状。例如，当用户将指针移到文本输入区上方时，指针会自动使用熟悉的工字型形状。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/text-entry-pointer.mp4)

使用*内容效果*后，当用户将指针放在用户界面元素或区域上时，指针下方的元素或区域也可以改变其外观。取决于内容效果的类型，指针可以保留其当前形状或转换为与元素的新外观融为一体的形状。

iPadOS 定义了三种可聚焦 App 中不同类型的交互元素的内容效果：高亮标记、提升和悬停。

*高亮标记*效果会将指针转换为半透明的圆角矩形，作为控制的背景并包含轻微的视差。轻微的高亮标记和移动可聚焦控制而不分散用户执行任务时的注意力。iPadOS 默认会为栏按钮、标签页栏、分段控制和编辑菜单应用高亮标记效果。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/highlight-content-effect.mp4)

*提升*效果结合了轻微的视差和升高外观，让元素看起来像是悬浮在屏幕上。当指针在元素下方淡出时，iPadOS 会将元素放大，同时在其下方添加阴影并在顶部添加柔和的镜面高光，从而产生提升的错觉。iPadOS 默认会为 App 图标和控制中心内的按钮应用提升效果。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/lift-content-effect-home-screen.mp4)

*悬停*是一种通用的效果，当指针移到元素上时，可以为该元素应用自定义的缩放、着色或阴影值。悬停效果结合了你的自定义值聚焦某个项目，但它不会转换默认的指针形状。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/hover-content-effect-calendar-popover.mp4)

#### 指针配件

指针配件为视觉指示符，可帮助用户了解该如何使用指针来与当前的用户界面元素交互。例如，接近可调整大小元素的指针可能会显示小箭头，表示该元素允许沿某一个轴调整大小。

与指针形状和内容效果不同，配件是可以与任何指针结合以传递额外信息的辅助项目。有关开发者指南，请参阅 [UIPointerAccessory](https://developer.apple.com/cn/documentation/uikit/uipointeraccessory)。

**使用清晰且简单的图像来创建自定义配件**。指针配件很小，因此有必要创建一个不使用过多细节来表示指针交互的图像。

**考虑使用配件过渡来表示元素状态或行为的改变**。除了动画展现指针配件的出现和消失，系统还会动画展现可伴随内容效果的配件形状及位置之间的过渡。例如，你可以通过将指针配件从 `plus` 符号过渡到 `circle.slash` 符号来表示添加操作不可用。

#### 指针磁吸

iPadOS 通过使元素像是在吸引指针来帮助用户使用指针定位该元素。将指针移近某个元素或者将指针快速移向某个元素时，用户就能体验到这种磁吸效果。

当用户将指针移近某个元素时，指针一到达该元素的点击区域系统就会开始转换指针的形状。由于元素的点击区域通常会超出其可见边界，因此指针在似乎接触到元素本身之前就开始转换，从而产生元素正在将指针吸向它的错觉。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/magnetics-clock.mp4)

当用户将指针快速移向某个元素时，iPadOS 会检查指针的轨迹以发现最有可能为目标的元素。当指针的路径中存在元素时，系统会利用磁吸将指针吸向该元素的中心。

iPadOS 默认会为使用提升效果（如 App 图标）和高亮标记效果（如栏按钮）的元素应用磁吸，但使用悬停效果的元素除外。由于支持悬停的元素不会转换默认的指针形状，因此添加磁吸可能会产生不协调感，让用户觉得失去了对指针的控制。

系统还会为文本输入区应用磁吸，如果用户在选择文本时无意中进行了垂直移动，它可以帮助用户避免跳到另一行。

#### 标准指针和效果

**尽可能支持系统提供的内容效果**。用户很快就会习惯他们在整个系统中看到的内容效果，并且通常希望这种体验适用于所使用的每一款 App。为了提供一致的用户体验，请根据每种效果的设计意图来调整交互方式。具体而言：

- 为背景透明的小元素使用高亮标记。
- 为背景不透明的小元素使用提升。
- 为大元素使用悬停并按需自定义缩放、着色和阴影属性（有关指南，请参阅[自定义指针](pointing-devices.md#Customizing-pointers)）。

**为标准按钮和文本输入区优先使用系统提供的指针外观**。指针以用户期望的方式运行可以帮助他们更轻松地使用你的 App。

**在交互式元素的四周添加内边距来创建可轻松访问的点击区域**。你可能需要进行试验来确定元素点击区域的合适大小。如果点击区域过小，用户会觉得在与元素交互时必须格外精确。另一方面，当元素的点击区域过大时，用户会觉得将指针拉离该元素很费劲。一般来说，在包含外框的元素四周添加约 12 点的内边距效果很好；对于没有外框的元素，在元素的可见边缘四周添加约 24 点的内边距效果很好。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/padding-for-button-with-bezel@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/padding-for-glyph@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/padding-for-button-without-bezel@2x.png)

**为自定义栏按钮创建连续点击区域**。如果栏中相邻按钮的点击区域之间有间隔，当指针在按钮之间移动而短暂地复原到默认形状时，用户的注意力可能会被分散。

**指定接收提升效果的非标准元素的圆角半径**。使用系统提供的提升效果，指针在淡出时会转换以匹配元素的形状。指针默认使用系统定义的圆角半径转换为圆角矩形。如果元素是圆形等其他形状，那么你需要提供半径以便指针可以无缝动态转换为元素的形状。有关开发者指南，请参阅 [UIPointerShape.roundedRect(_:radius:)](https://developer.apple.com/cn/documentation/uikit/uipointershape-swift.enum/roundedrect(_:radius:))。

#### 自定义指针

**为与标准元素行为类似的自定义元素优先使用系统提供的指针效果**。自定义元素与标准元素行为类似时，用户通常希望使用熟悉的指针交互方式进行交互。例如，如果自定义工具栏中的按钮不使用标准高亮标记效果，那么用户可能会觉得按钮已损坏。

**在整个 App 中使用一致的指针效果**。例如，如果你的 App 用于帮助用户绘图，请在 App 的所有绘图区提供相似的指针体验，以便用户可以将他们对某个区的认知沿用到其他区。

**避免创建不必要的指针和内容效果**。用户会注意到指针的外观或它下面的用户界面元素何时发生了变化，并希望这些变化有用。创建一个没有任何实际价值的纯装饰性指针效果会分散用户的注意力甚至是激怒他们。

**自定义指针形状应保持简单**。理想情况下，指针的形状代表着用户在当前环境中可以执行的操作，且自身不会引起过多的注意。如果用户不能立即理解你的自定义指针形状，他们可能会浪费时间去尝试发现形状的含义。

**考虑通过显示提供有用信息的自定义注解来增强指针使用体验**。例如，当用户将指针放在 App 的绘图区域上时，你可以显示 X 和 Y 值。Keynote 讲演使用注解来显示可调整大小图像的当前宽度和高度。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/useful-pointer-annotation@2x.png)

**避免通过指针显示指导性文本**。显示指导性文本的指针会让 App 变得复杂且难用。与其提供指导，不如把界面的清晰和简洁放在首位，以便用户可以快速掌握如何使用你的 App，无论他们是使用指针还是触控屏幕。

**在定义自定义悬停效果时，考虑阴影、缩放和元素间距的相互作用**。一般来说，为那些在放大时不会挤到附近元素的元素保留缩放功能。例如，缩放不太适用于表格行，因为行无法在不与相邻行重叠的情况下展开。对于周围空间很小的元素，应考虑使用包含着色但不包含缩放和阴影的悬停效果。请注意，使用不包含缩放的阴影效果不佳，因为未缩放的元素即使在其阴影暗示它被提升至屏幕上方时也不会显得更接近观看者。

### macOS

macOS 支持各种用户可自定义的一系列标准鼠标和触控板交互。例如，当点按或手势不是与内容交互的主要方式时，用户通常可以根据当前的工作流程来打开或关闭它。用户还可以选取鼠标或触控板的特定区域来调用辅助点按，并为某些手势选择特定的手指组合和动作。

| 点按或手势 | 预期行为 | 鼠标 | 触控板 |
| --- | --- | --- | --- |
| 首选点按 | 选择或激活项目，如文件或按钮。 | ● | ● |
| 辅助点按 | 显示关联菜单。 | ● | ● |
| 滚动 | 上、下、左、右移动视图内的内容。 | ● | ● |
| 智能缩放 | 放大或缩小内容，如网页或 PDF。 | ● | ● |
| 在页面之间轻扫 | 向前或向后导览单独显示的页面。 | ● | ● |
| 在全屏幕显示的 App 之间轻扫 | 向前或向后导览全屏幕显示的 App 和空间。 | ● | ● |
| 调度中心（双指轻点两下鼠标或者三指或四指在触控板上向上轻扫） | 激活调度中心。 | ● | ● |
| 查询和数据检测器（单指用力点按或者三指轻点） | 在所选内容上方显示查询窗口。 |  | ● |
| 轻点来点按 | 使用轻点而非点按执行首选点按操作。 |  | ● |
| 用力点按 | 点按，然后用力地按下以在所选内容上方显示“快速查看”窗口或查询窗口。施加可变量的压力来影响压敏式控制，如变速媒体控制。 |  | ● |
| 放大或缩小（双指开合） | 放大或缩小。 |  | ● |
| 旋转（双指做圆周运动） | 旋转内容，如图像。 |  | ● |
| 通知中心（从触控板边缘轻扫） | 显示通知中心。 |  | ● |
| App Exposé（三指或四指向下轻扫） | 在 Exposé 中显示当前 App 的窗口。 |  | ● |
| 启动台（捏合拇指和其他三指） | 显示启动台。 |  | ● |
| 显示桌面（张开拇指和其他三指） | 移走所有窗口以显示桌面。 |  | ● |

#### 指针

macOS 提供了各种标准指针样式，可供 App 用于传达界面元素的交互状态或者拖移操作的结果。

| 指针 | 名称 | 含义 | AppKit API |
| --- | --- | --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-arrow@2x.png) | 箭头 | 用于选择内容和界面元素并与之交互的标准指针。 | [arrow](https://developer.apple.com/cn/documentation/appkit/nscursor/arrow) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-closed-hand@2x.png) | 紧握的手 | 在视图中拖移以调整内容显示的位置，例如，在“地图”中四处拖移地图。 | [closedHand](https://developer.apple.com/cn/documentation/appkit/nscursor/closedhand) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-contextual-menu@2x.png) | 关联菜单 | 指针下方的内容有可用的关联菜单。此指针通常只在按下 Control 键时才会显示。 | [contextualMenu](https://developer.apple.com/cn/documentation/appkit/nscursor/contextualmenu) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-crosshair@2x.png) | 十字线 | 可以使用精确的矩形选择，例如在“预览”中查看图像时。 | [crosshair](https://developer.apple.com/cn/documentation/appkit/nscursor/crosshair) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-disappearing-item@2x.png) | 使项目消失 | 拖移的项目在放下时会消失。如果项目引用了原始项，那么原始项不受影响。例如，在“邮件”中将邮箱拖出个人收藏栏时，原始邮箱不会被移除。 | [disappearingItem](https://developer.apple.com/cn/documentation/appkit/nscursor/disappearingitem) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-drag-copy@2x.png) | 拖移副本 | 放入目的位置时，复制拖移而非移动的项目。按下 Option 键进行拖移操作时出现。 | [dragCopy](https://developer.apple.com/cn/documentation/appkit/nscursor/dragcopy) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-drag-link@2x.png) | 拖移链接 | 进行拖放操作时，放下后创建所选文件的替身。替身指向的原始文件不会被移动。按下 Option 和 Command 键进行拖移操作时出现。 | [dragLink](https://developer.apple.com/cn/documentation/appkit/nscursor/draglink) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-horizontal-beam@2x.png) | 水平工字型 | 水平布局下可以选择和插入文本，如“文本编辑”或 Pages 文稿。 | [iBeam](https://developer.apple.com/cn/documentation/appkit/nscursor/ibeam) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-open-hand@2x.png) | 张开的手 | 可以在视图中拖移以调整内容的位置。 | [openHand](https://developer.apple.com/cn/documentation/appkit/nscursor/openhand) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-operation-not-allowed@2x.png) | 操作不被允许 | 不能在当前位置放下拖移的项目。 | [operationNotAllowed](https://developer.apple.com/cn/documentation/appkit/nscursor/operationnotallowed) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-pointing-hand@2x.png) | 指向某处的手 | 指针下方的内容为网页、文稿或其他项目的 URL 链接。 | [pointingHand](https://developer.apple.com/cn/documentation/appkit/nscursor/pointinghand) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-resize-down@2x.png) | 向下调整大小 | 向下移动窗口、视图或元素，或者向下调整其大小。 | [resizeDown](https://developer.apple.com/cn/documentation/appkit/nscursor/resizedown) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-resize-left@2x.png) | 向左调整大小 | 向左移动窗口、视图或元素，或者向左调整其大小。 | [resizeLeft](https://developer.apple.com/cn/documentation/appkit/nscursor/resizeleft) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-resize-left-right@2x.png) | 向左/向右调整大小 | 向左或向右移动窗口、视图或元素，或者向左或向右调整其大小。 | [resizeLeftRight](https://developer.apple.com/cn/documentation/appkit/nscursor/resizeleftright) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-resize-right@2x.png) | 向右调整大小 | 向右移动窗口、视图或元素，或者向右调整其大小。 | [resizeRight](https://developer.apple.com/cn/documentation/appkit/nscursor/resizeright) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-resize-up@2x.png) | 向上调整大小 | 向上移动窗口、视图或元素，或者向上调整其大小。 | [resizeUp](https://developer.apple.com/cn/documentation/appkit/nscursor/resizeup) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-resize-up-down@2x.png) | 向上/向下调整大小 | 向上或向下移动窗口、视图或元素，或者向上或向下调整其大小。 | [resizeUpDown](https://developer.apple.com/cn/documentation/appkit/nscursor/resizeupdown) |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pointers-vertical-beam@2x.png) | 垂直工字型 | 垂直布局下可以选择和插入文本。 | [iBeamCursorForVerticalLayout](https://developer.apple.com/cn/documentation/appkit/nscursor/ibeamcursorforverticallayout) |

### visionOS

在 visionOS 中，用户可以外接指针设备或键盘，并在继续使用其眼睛和手部的同时使用这两种设备。如果用户注视某个元素，然后移动指针，系统会聚焦到指针下方的元素。你的 App 无需执行任何操作来支持这种行为。

连接指针设备后，用户注视的区域决定了指针的上下文。例如，当用户的视线从一个窗口移至另一个窗口时，指针的上下文会无缝转换到新窗口。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-trackpad-pointer-input.mp4)

当用户使用所连接支持手势的指针设备（如触控板或鼠标）时，指针会在用户使用手势时隐藏，从而尽量减少视觉干扰。在这种情形下，指针一直处于隐藏状态，直至用户移动后重新出现在用户注视的位置。

## 资源

#### 相关内容

[数据输入](entering-data.md)

[键盘](keyboards.md)

#### 开发者文档

[Input events](https://developer.apple.com/cn/documentation/swiftui/input-events) — SwiftUI

[Pointer interactions](https://developer.apple.com/cn/documentation/uikit/pointer-interactions) — UIKit

[Mouse, Keyboard, and Trackpad](https://developer.apple.com/cn/documentation/appkit/mouse-keyboard-and-trackpad) — AppKit

#### 视频

- [iPadOS 光标设计](https://developer.apple.com/cn/videos/play/wwdc2020/10640)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
