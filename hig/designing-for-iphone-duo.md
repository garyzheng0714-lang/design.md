# 针对 iPhone Duo 设计

原文：https://developer.apple.com/cn/design/human-interface-guidelines/designing-for-iphone-duo

专为 iPhone Duo 设计的 App 应无缝适配双屏，随设备开合提供连贯的使用体验。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/platforms-designing-for-iphone-intro@2x.png)

iPhone Duo 配备双显示屏，均自带前置相机。中间铰链可让用户开合设备，并支持多种握持和放置方式。这种屏幕尺寸和姿态的多样性，让自适应[布局](layout.md)变得空前重要。如果你的 App 使用标准系统组件，且在设计时已考虑到支持调整大小，则无需进行太多调整，就能自动适配设备的各种姿态。有关开发者指南，请参阅：[Preparing your app for iPhone Duo](https://developer.apple.com/cn/documentation/technologyoverviews/preparing-your-app-for-iphone-duo)。

**外屏**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-hero-outside@2x.png)

**内屏**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-hero-inside@2x.png)

尽管 iPhone Duo 是一种全新形态，但请记住，你依然是在针对 iPhone 进行设计，因此[针对 iOS 设计](designing-for-ios.md)的模式和最佳实践仍然适用。

## 剖析

iPhone Duo 配备内屏和外屏。设备折叠时，用户与外屏进行交互，系统会将工具栏和标签页栏置于侧边，从而最大限度地为内容留出垂直空间。当设备在横屏状态下展开时，控制仍保留在侧边，确保用户在不同屏幕间切换时获得一致的使用体验。

中间铰链支持多种设备握持和放置方式。设备折叠时，铰链也会影响可用于显示内容的空间。

外屏前置相机位于角落且始终可见，与侧边控制垂直对齐。内屏相机隐藏于屏下，只有在相机启用时才会显现。

**外屏**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-device-layout-outer@2x.png)

**内屏**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-device-layout-inner@2x.png)

### 设备姿态

用户会以多种方式握持和放置 iPhone Duo：像书本一样部分折放、平放在表面上，或者借助边缘立放。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-poses@2x.png)

支持设备的姿态变化并不意味着要为每种姿态设计自定义布局，而是使用[尺寸分类](layout.md#Size-classes)，让 App 在尺寸变化时自然适配。外屏采用紧凑宽度布局，内屏采用常规宽度布局，即可为所有姿态奠定基础。不要在 App 尺寸调整时重新设计，而应让现有布局基于可用空间进行扩展。有关指南，请参阅：[动态布局](designing-for-iphone-duo.md#Dynamic-layouts)。

你可以在 Xcode 中使用 [Device Hub](https://developer.apple.com/cn/documentation/xcode/device-hub) 预览你的 App 在 iPhone Duo 上的效果，并测试 App 在其各种姿态下的显示效果。

## 最佳实践

**构建尺寸可调整的 App**。由于设备配备双显示屏，并支持多种姿态和分屏浏览多任务处理，你的 App 可能会以多种不同尺寸呈现。使用尺寸分类、布局外边距和安全区内边距来布置控制和内容。避免使用固定宽度以及对特定显示屏的依赖。有关指南，请参阅下述[动态布局](designing-for-iphone-duo.md#Dynamic-layouts)和[布局](layout.md)。

**在不同显示屏之间打造一致的使用体验**。保持各显示屏间功能和元素状态一致。维持 App 的信息层级结构，但如果内容适合，可在更大的内屏上显示额外的层级结构。例如，“邮件”在设备折叠时，仅显示电子邮件列表（主视图），或仅显示单封电子邮件（辅视图）；当设备展开时，则并排显示两者。

**外屏**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-mail-compact@2x.png)

**内屏**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-mail-full@2x.png)

**在不同设备姿态下保持相同功能**。随着界面适配可用区域，控制可能会溢出，内容也可能会移动或改变大小。无论用户如何握持或查看设备，都要确保其能够访问相同的控制和内容。有关指南，请参阅：[动态布局](designing-for-iphone-duo.md#Dynamic-layouts)和[垂直控制](designing-for-iphone-duo.md#Vertical-controls)。

**遵循系统为工具栏、标签页栏和导览控制采用的垂直布局**。由于外屏比其他 iPhone 设备的显示屏更宽且更短，系统会将控制移至侧边，以便为内容保留垂直空间并体现显示屏的非对称特性。在内屏上，控制在横屏模式下仍保留在侧边，以便在相同垂直高度上维持连贯的使用体验。如果你使用标准系统组件，便会自动获得这种布局，但你不妨根据 App 的需求对其进行优化。有关指南，请参阅：[垂直控制](designing-for-iphone-duo.md#Vertical-controls)。

**让你的游戏在任何设备姿态下都可玩**。你可以选择锁定为竖屏或横屏方向，但请确保在设备姿态变化时填满整个屏幕。调整尺寸时，尽量保持文字和控制的大小一致。在游戏中，优先更改宽高比，而不是使用信箱模式或邮筒模式；如果无法避免使用这两种模式，请在内边距区域中添加插图，协助营造全屏体验。有关更多指南，请参阅：[针对游戏设计](designing-for-games.md)。

## 动态布局

针对 iPhone Duo 设计意味着要考虑各种硬件和软件配置。与所有 iOS 设备一样，请通过布局外边距和安全区内边距构建布局，同时避免使用固定宽度或任何与特定显示屏绑定的设计。

有关指南，请参阅：[布局](layout.md)。有关外边距和安全区的信息，请参阅：[Apple Design Resources](https://developer.apple.com/design/resources/)。有关开发者指南，请参阅：[safeAreaInsets](https://developer.apple.com/cn/documentation/swiftui/geometryproxy/safeareainsets) (SwiftUI) 和 [safeAreaInsets](https://developer.apple.com/cn/documentation/uikit/uiview/safeareainsets) (UIKit)。

### 保留区

除了安全区的常规考量外，iPhone Duo 上的可用空间还受到*保留区*的影响。这类区域表示显示屏内部内容需避免覆盖或组件需适配调整的区域。如果你已针对其他平台上的类似区域（如 iPad 上的窗口控制）调整过布局，对此应该不会陌生。

iPhone Duo 上的保留区包括：

- **外屏前置相机**。此区域始终显现，并会扩展至显示实时活动的灵动岛。当控制位于侧边时，系统会自动将其纳入考量并相应排列各项元素。
- **内屏前置相机**。此区域仅在相机启用时显现。相机在未启用时不可见；相机启用后，用户界面会移开以表明相机的存在。
- **折叠区**。此区域取决于用户使用设备的方式。当设备部分展开时，折叠区会将内屏划分为多个可用区域，但不包括显示屏折叠时的中心区。

**外屏**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-safe-area-outer-camera@2x.png)

**内屏**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-safe-area-inner-camera@2x.png)

许多系统组件会自动适配保留区。提醒、上下文菜单和表单等组件会自动根据折叠状态进行移动，而[分屏浏览](designing-for-iphone-duo.md#Split-views)等较大组件会根据内屏的对称性调整其列宽和外边距。对于自定义组件，[ReservedRegion](https://developer.apple.com/cn/documentation/swiftui/reservedregion) (SwiftUI) 和 [UIView.ReservedRegion](https://developer.apple.com/cn/documentation/uikit/uiview/reservedregion) (UIKit) 提供了将内容移离保留区的方法。

**设备折叠时调整布局**。优先使用能够自动适配的布局容器，例如，设备折叠时，“备忘录”中的分屏浏览会调整每个面板的宽度以保持清晰可见。在网格样式布局中，优先使用偶数列，以便内容整齐划分。使用 `ReservedRegion` API 可在系统未自动移动重要元素时，使其避开中心区。

**完全展开**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-notes-sidebar-open@2x.png)

**部分折叠**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-notes-sidebar-folded@2x.png)

**当用户折叠设备时，应避免极端的布局变化**。仅移动必要的元素，使其保持可见且方便轻点。突然消失或大幅移位的控制更难查找和追踪，因此应优先进行小幅调整，而非重新排列。

### 分屏浏览

分屏浏览会在 iPhone Duo 的内屏上展开，在外屏上折叠为单个面板，其适配方式与在其他 iPhone 设备的常规环境和紧凑环境间切换时相同。使用标准组件构建时，分屏浏览会自动适配保留区，通过调整宽度和外边距适应折叠状态。

有关通用指南，请参阅：[分屏浏览](split-views.md)。有关开发者指南，请参阅：[NavigationSplitView](https://developer.apple.com/cn/documentation/swiftui/navigationsplitview) (SwiftUI) 和 [UISplitViewController](https://developer.apple.com/cn/documentation/uikit/uisplitviewcontroller) (UIKit)。

### 排列视图

*排列视图*是一种布局容器，其中包含主视图和辅视图这两个视图，并会根据显示屏尺寸、方向和保留区动态排布。

排列视图分为两种类型：分屏和叠放。

- *分屏*排列会在主视图和辅视图之间分割其区域。当排列的宽度大于高度时，采用水平分割；当高度大于宽度时，则采用垂直分割。
- *叠放*排列会将主视图和辅视图彼此叠放。当显示屏部分折叠时，这两个视图会分别移至两侧；而在其他时候，主视图会移至辅视图之上。

**分屏排列**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-view-layout-split@2x.png)

**叠放排列**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-view-layout-overlay@2x.png)

你可以限制分屏排列时使用的轴，并在不需要显示叠放排列中的辅视图时将其折叠。

有关开发者指南，请参阅：[ArrangementView](https://developer.apple.com/cn/documentation/swiftui/arrangementview) (SwiftUI) 和 [UIArrangementViewController](https://developer.apple.com/cn/documentation/uikit/uiarrangementviewcontroller) (UIKit)。

**当布局本身已类似于某种排列视图时，不妨考虑直接使用对应的排列视图**。将两个视图并排或上下放置的布局（例如 [HStack](https://developer.apple.com/cn/documentation/swiftui/hstack) 或 [VStack](https://developer.apple.com/cn/documentation/swiftui/vstack)）会直接转换为分屏排列。将一个视图叠放在另一个视图上的布局（例如 [ZStack](https://developer.apple.com/cn/documentation/swiftui/zstack)）会转换为叠放排列。

**将导览放在排列视图之外**。排列视图负责排布内容，但不处理导览，因此请将导览容器（如导览分屏视图和标签页视图）放在排列视图外部，而非内部。

## 垂直控制

在 iPhone Duo 上，通常位于显示屏顶部和底部的工具栏、标签页栏和导览控制会移至侧边，从而为内容保留垂直空间并使控制触手可及。不过也有例外情况，即竖屏模式下的内屏，其垂直空间足够容纳标准的水平栏。

侧边控制同时包括系统和 App 元素：灵动岛、状态栏、工具栏（包括导览按钮）和标签页栏。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-tab-bar-toolbar-layout@2x.png)

当两个 App 通过分屏浏览多任务处理共享内屏时，每个 App 都会沿其外侧边缘放置控制，因此左侧 App 的控制位于左侧。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-multitasking@2x.png)

由于竖轴上的控制与硬件保持对齐，它们相对于外屏相机的位置也保持不变，并且在从右向左书写的语言中也固定在同一侧。

**在布局中考虑不对称性**。由于控制位于一侧边缘，因此内容空间并不对称。使用安全区可确保控制不会遮挡内容，包括对侧边缘的控制，例如当两个 App 通过分屏浏览多任务处理共享内屏时。

**在不同设备姿态下保持控制布局一致**。并非所有姿态都会将控制垂直排列在侧边，且可用空间也不尽相同，因此，请务必保持控制的相对位置一致，这样用户在不同握姿间切换时，无需重新熟悉各项操作的位置。

**遵循工具栏项目的标准排列顺序**。将竖轴顶部位置留给主要导览控制，例如“返回”或“关闭”，然后放置醒目操作，例如“完成”。这样既保留了用户熟悉的导览模式，又让重要操作触手可及。其余工具栏项目应保持原有的分组方式；系统在顶栏和底栏的项目之间留出垂直空间，保持彼此区分。

**优先显示常用工具栏项目，以便轻松访问**。默认情况下，项目从底部向顶部依次排列。为每个项目分配可见性优先级可更改该顺序，先从整个组着手，然后在需要更精细的控制时再调整组内的单个项目。有关开发者指南，请参阅：[ToolbarItemVisibilityPriority](https://developer.apple.com/cn/documentation/swiftui/toolbaritemvisibilitypriority) (SwiftUI) 或 [UIBarButtonItemVisibilityPriority](https://developer.apple.com/cn/documentation/uikit/uibarbuttonitemvisibilitypriority) (UIKit)。

优先保留常用操作，例如“邮件”中的“编写”或“备忘录”中的“新建备忘录”，并让传达重要状态的控制（如带标记的项目）更长时间保持可见，以便用户一目了然。

**一般情况下，请勿覆盖默认栏位置**。竖轴上控制的位置是 iPhone Duo 的核心设计模式之一。将控制保持在熟悉的位置，有助于用户立即上手你的 App，同时还能强化统一的平台体验。

**对于不需要栏的界面，考虑使用整个显示屏宽度**。某些布局可以横跨整个显示屏，这非常适合不会滚动的沉浸式视觉界面，但前提是没有任何内容与灵动岛或状态栏冲突。例如，“计算器”会占据显示屏的整个宽度。你也可以结合这两种方法，让背景图像或标题横跨整个屏幕宽度，同时保持可滚动内容内嵌。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-calculator-full-screen@2x.png)

**将相关工具栏项目进行分组，而非手动调整间距**。通过 [ToolbarItemGroup](https://developer.apple.com/cn/documentation/swiftui/toolbaritemgroup) (SwiftUI) 或 [UIBarButtonItemGroup](https://developer.apple.com/cn/documentation/uikit/uibarbuttonitemgroup) (UIKit) 创建的群组会自动在项目和其他群组之间提供间距，并根据可用空间的变化进行调整，因此，请避免自行添加固定间距。有关指南，请参阅：[工具栏](toolbars.md)。

**将控制放在其所影响的内容附近**。如果控制属于后缘以外的其他内容区域，请将其保留在该区域，而不要移至侧边。就近放置有助于清晰地体现控制与内容之间的关系。例如，“邮件”中影响电子邮件列表的控制始终位于主面板的上方，表明其适用于列表，而非单封电子邮件的内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-pane-controls@2x.png)

**为每个非纯文本的工具栏项目同时提供标题和符号**。同时提供这两者可让系统根据上下文选择合适的呈现方式。即使项目显示符号，也请包含标题，因为系统会在溢出菜单和展开形态下使用标题。有关开发者指南，请参阅：[Label](https://developer.apple.com/cn/documentation/swiftui/label) (SwiftUI) 和 [UIBarButtonItem](https://developer.apple.com/cn/documentation/uikit/uibarbuttonitem) (UIKit)。

**尽量少用基于文本的按钮**。包含文本的标签会保留在水平栏中，因此只要可行，就应优先使用符号。

**当空间有限时，应根据视图提供的体验，在工具栏和标签页栏之间选择保留其一**。在以导览为核心的体验中，请将工具栏项目移入溢出菜单中，确保标签页栏和主要目标位置始终可访问。这是默认的栏压缩行为。

在以任务为导向的体验中，最小化标签页栏以保留对完成任务至关重要的工具栏操作。这与其他 iPhone 设备上的标签页栏最小化行为一致。有关开发者指南，请参阅：[ToolbarVerticalCompressionBehavior](https://developer.apple.com/cn/documentation/swiftui/toolbarverticalcompressionbehavior) (SwiftUI) 和 [UIVerticalBarCompressionBehavior](https://developer.apple.com/cn/documentation/uikit/uiverticalbarcompressionbehavior) (UIKit)。

**工具栏已压缩**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-compact-layout-tab-bar@2x.png)

**标签页栏已压缩**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/designing-for-iphone-compact-layout-toolbar@2x.png)

**使用系统溢出菜单**。如果你的 App 自带溢出菜单，请将这些操作移入系统菜单中，以便用户集中一处找到所有内容。省略号符号应专用于溢出菜单，其他菜单则需使用不同的符号。有关开发者指南，请参阅：[ToolbarOverflowMenu](https://developer.apple.com/cn/documentation/swiftui/toolbaroverflowmenu) (SwiftUI) 和 [additionalOverflowItems](https://developer.apple.com/cn/documentation/uikit/uinavigationitem/additionaloverflowitems) (UIKit)。

## 资源

#### 相关内容

[Apple Design Resources](https://developer.apple.com/design/resources/#ios-apps)

[Screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications)

[针对 iOS 设计](designing-for-ios.md)

[布局](layout.md)

#### 开发者文档

[Preparing your app for iPhone Duo](https://developer.apple.com/cn/documentation/technologyoverviews/preparing-your-app-for-iphone-duo)

[ReservedRegion](https://developer.apple.com/cn/documentation/swiftui/reservedregion) — SwiftUI

[UIView.ReservedRegion](https://developer.apple.com/cn/documentation/uikit/uiview/reservedregion) — UIKit

[ArrangementView](https://developer.apple.com/cn/documentation/swiftui/arrangementview) — SwiftUI

[UIArrangementViewController](https://developer.apple.com/cn/documentation/uikit/uiarrangementviewcontroller) — UIKit

#### 视频

- [Design for iPhone Duo](https://developer.apple.com/cn/videos/play/tech-talks/111466)
- [Raise the bar with iPhone Duo](https://developer.apple.com/cn/videos/play/tech-talks/111462)
- [Strike a pose with adaptive layouts on iPhone Duo](https://developer.apple.com/cn/videos/play/tech-talks/111463)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 9 月 9 日 | 新页面。介绍针对 iPhone Duo 设计的基本概念，包括设备姿态、跨双屏的动态布局，以及竖轴上的工具栏和标签页栏。 |
