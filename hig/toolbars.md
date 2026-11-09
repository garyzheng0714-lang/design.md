# 工具栏

原文：https://developer.apple.com/cn/design/human-interface-guidelines/toolbars

工具栏可方便地访问常用命令、控制、导览和搜索。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-toolbar-intro@2x.png)

工具栏由一组或多组控制组成，沿视图顶部或底部边缘水平排列，并分组到合理的分区。

工具栏用于视图中的内容，便于导览以及在 App 中帮助指引用户。工具栏包括三种类型的内容：

- 当前视图的标题
- 导览控制（如返回与前进）和[搜索栏](search-fields.md)
- 操作或栏项目，如[按钮](buttons.md)和[菜单](menus.md)

与工具栏不同，[标签页栏](tab-bars.md)专用于在 App 的各区域间导览。

## 最佳实践

**谨慎选取项目以避免过度拥挤**。用户需要能够辨别和激活每一项，因此工具栏不应放置过多项目。考虑到视图宽度可变，请定义在工具栏变窄时哪些项目会移至溢出菜单。

> **注**
>
> macOS 或 iPadOS 系统会在项目不再能容纳时自动添加溢出菜单。请勿手动添加溢出菜单，并避免使用默认会导致工具栏项目溢出的布局。

**添加“更多”菜单以包含其他操作**。将不太重要的操作优先放入“更多”菜单中。尽量尝试在工具栏中包括所有操作，在的确需要时才添加此菜单。

**标准**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-notes-app-expanded-icons@2x.png)
*macOS 版“备忘录”中的标准工具栏包括内含额外命令的“更多”菜单。*

**紧凑**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-notes-app-collapsed-icons@2x.png)
*随着窗口变窄，“更多”菜单会与其他不再能容纳的工具栏项目一并移入溢出菜单。*

**在 iPadOS 和 macOS App 中，考虑让用户自定义工具栏以包括其最常用项目**。对于提供许多项目或包括并非每个人都需要的高级功能的 App，以及用户倾向于长时间使用的 App，工具栏自定义特别有用。例如，为工具栏自定义提供一系列编辑操作很有用，因为用户会经常根据其工作风格及其当前项目使用不同类型的编辑命令。

**减少使用工具栏背景和色调控制**。你使用的任何自定义背景和外观可能会覆盖或干扰系统提供的背景效果。应改为使用内容层来传达工具栏的颜色和外观，并按需使用 [ScrollEdgeEffectStyle](https://developer.apple.com/cn/documentation/swiftui/scrolledgeeffectstyle) 来区分工具栏区域与内容区域。此方法有助于 App 展现其独特个性，同时不分散对内容的注意力。

**避免为工具栏项目标签和内容层背景应用相似颜色**。如果 App 内容层中已有鲜艳的多彩内容，请为工具栏优先使用默认单色外观。有关更多指南，请参阅：[Liquid Glass 颜色](color.md#Liquid-Glass-color)。

**优先在工具栏中使用标准组件**。标准按钮、文本栏、标题和脚注默认的圆角半径与工具栏圆角同心。如果需要创建自定义组件，请确保其圆角半径也与工具栏圆角同心。

**考虑暂时隐藏工具栏以提供无干扰的体验**。用户有时喜欢极简界面以减少干扰或显示更多内容。若支持此功能，请在最合适的环境中这么做，并提供可靠的方法来恢复隐藏的界面元素。有关指南，请参阅[全屏显示](going-full-screen.md)。有关特定于 visionOS 的指南，请参阅[沉浸式体验](immersive-experiences.md)。

## 标题

**为各个窗口提供有用的标题**。当用户在 App 中导览时，标题可帮助用户确定其所在位置，并区分多个已打开窗口的内容。如果标题对工具栏而言显得多余，你可以将标题区域留空。例如，“备忘录”打开单个窗口时，当前备忘录没有标题，因为第一行内容通常会提供足够的语境。但在不同窗口中打开备忘录时，系统会将第一行内容用作标题以便用户能够区分。

**不要将 App 名称用作窗口标题**。App 名称不提供 App 中有关内容层级结构或任何窗口或区域的有用信息，因此不适合用作标题。

**编写一个精简的标题**。尽量使用可提炼窗口或视图用途的字词或短语，并保持标题少于 15 个字符以便为其他控制留出足够的空间。

## 导览

包含导览控制的工具栏出现在窗口顶部，帮助用户在内容层级间移动。工具栏通常还包含[搜索栏](search-fields.md)，用于快速导览各个区域或内容片段。在 iOS 中，导览特定的工具栏有时会称为导航栏。

**使用标准返回和关闭按钮**。用户知道标准返回按钮可让其沿信息层级回溯每一个步骤，而标准关闭按钮可关闭模态视图。为每个按钮优先使用标准符号，不要使用*返回*或*关闭*文本标签。若要创建自定义版本的按钮，请确保其在外观上仍保持一致、在表现上满足用户的预期、与界面其他元素相配，并确保在应用至整个 App 或游戏时保持一致。有关指南，请参阅[图标](icons.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-navigation-action-back-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-navigation-action-back-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

## 操作

**提供支持用户所执行主要任务的操作**。一般应优先显示用户最有可能使用的命令。此类命令通常是用户最频繁使用的命令，但在某些 App 中，优先显示映射到用户所使用的最高级别或最重要对象的命令可能较为合理。

**确保每个控制的含义明确**。不要让用户通过猜测或试验才能了解工具栏项目的功能。为项目优先使用简单易识别的符号而非文本，*编辑*等无法通过符号较好体现的操作除外。有关常见操作符号的指南，请参阅[标准图标](icons.md#Standard-icons)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-prefer-symbols-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-prefer-symbols-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

**首选系统提供的无边框符号**。系统提供的符号有熟悉感，可自动接收适当的着色和虚化效果，并对用户交互的响应保持一致。边框（如轮廓圆圈符号）不是必要的，因为该分区提供了可见容器，且系统会自动定义悬停和选择状态的外观。有关指南，请参阅 [SF 符号](sf-symbols.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-icons-circle-outline-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-icons-no-outline-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

**为“完成”或“提交”等关键操作使用 `.prominent` 样式**。这会分离操作并为其着色，从而形成清晰的焦点。仅指定一个主要操作，并将其放在工具栏的后端。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-prominent-action-tinted@2x.png)

## 项目分组

你可以将工具栏项目放在三个位置：工具栏的前缘、中间区域和后缘。这些区域为导览控制、窗口或文稿标题、常见操作以及搜索提供了熟悉的存放位置。

- **前缘**。可让用户返回之前文稿以及显示或隐藏边栏的元素显示在最前缘，其后接视图标题。在标题旁边，工具栏可显示包含标准命令和 App 特定命令的文稿菜单，这些命令影响文稿整体，如“复制”、“重新命名”、“移动”和“导出”。为确保这些项目始终可用，工具栏前缘的项目不可自定义。
- **中间区域**。常见的有用控制出现在中间区域，不在前缘的视图标题可以出现在这里。在 macOS 和 iPadOS 中，如果允许用户自定义工具栏，那么用户可以在这里添加、移除和重新排列项目。当窗口缩到足够小时，此分区中的项目会自动收起至系统管理的溢出菜单中。
- **后缘**。后缘包含需要保持可用的重要项目、打开附近检查器的按钮、可选搜索栏以及包含附加项目和支持工具栏自定义的“更多”菜单。它还包括“完成”等主要操作（若存在）。后缘的项目在所有窗口大小中都保持可见。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-ipad-anatomy@2x.png)

若要将项目放入你想要的分组，请将其固定在前缘、中间或后缘，并在按钮或其他项目之间适当地插入间距。

**按功能和使用频率合理分组工具栏项。**  例如，Keynote 讲演有多个基于功能的分区，包括针对演示文稿级命令、播放命令以及对象插入的分区。

**将导览控制和关键操作（如“完成”、“关闭”或“保存”）分组到常见且有显著区别的专用分区**。这反映了其重要性并帮助用户发现和了解这些操作。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-layout-grouping-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-layout-grouping-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

**保持不同平台间的分组和放置位置一致**。这可帮助用户培养对 App 的熟悉度，并信任其在各平台上的表现都将类似。

**尽量减少群组数量**。控制群组过多会使工具栏看起来杂乱和造成困扰，即使空间更大的 iPad 和 Mac 也是如此。一般来说，尽量不要超过三个。

**分开带有文本标签的操作**。将带文本标签和带符号的操作放在一起可能会产生文本和符号组合在同一操作中的错觉，从而造成混淆和误解。如果工具栏包括多个含文本标签的按钮，这些按钮的文本可能会连在一起，使得按钮不易于分辨。在按钮之间插入固定间距以作分隔。有关开发者指南，请参阅 [UIBarButtonItem.SystemItem.fixedSpace](https://developer.apple.com/cn/documentation/uikit/uibarbuttonitem/systemitem/fixedspace)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-layout-text-action-grouping-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-layout-text-action-grouping-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

## 平台考量因素

*无针对 Apple tvOS 的额外考量因素。*

### iOS

**只将最重要的项目优先加入主工具栏区域**。由于空间十分有限，请谨慎考虑哪些操作对于 App 而言至关重要并优先加入这些操作。创建“更多”菜单以包含附加项目。

**使用大标题帮助用户在导航和滚动时始终清楚其所在位置**。当用户开始滚动内容时，大标题会默认转换为标准标题，并在用户滚动到顶部时变回大标题，从而提醒当前的所在位置。有关开发者指南，请参阅 [prefersLargeTitles](https://developer.apple.com/cn/documentation/uikit/uinavigationbar/preferslargetitles)。

### iPadOS

**考虑合并工具栏与标签页栏**。在 iPadOS 中，工具栏和[标签页栏](tab-bars.md)可在视图顶部的同一水平空间中共存。这对于需要在几个 App 主区域间导览，同时又需要保持窗口完整宽度用于显示内容的布局来说特别有用。有关指南，请参阅[布局](layout.md)和[窗口](windows.md)。

### macOS

在 macOS App 中，工具栏放置在窗口顶部的框架中，位于标题栏下方或与其结合在一起。请注意，窗口标题可与控制内联显示，并且工具栏项不包括边框。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/toolbars-mac-window-anatomy@2x.png)

**让每个工具栏项都可以在菜单栏中作为命令使用**。用户可能会自定义或隐藏工具栏，因此工具栏不能是呈现命令的唯一位置。与之相反，为每个菜单项提供工具栏项没有意义，因为并非所有菜单命令都具有足以占据工具栏空间的重要程度或使用频次。

### visionOS

在 visionOS 中，系统提供的工具栏沿窗口的底部边缘显示，位于窗口管理控制的上方，处于沿 z 轴方向稍微位于窗口前方的平行平面中。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-toolbar-notes-app@2x.png)

当内容在工具栏后面滚动时，为了维持工具栏项目的易读性，visionOS 在工具栏背景中使用可变模糊。可变模糊将导航栏锚定在滚动内容上方，同时让视图的玻璃材质保持统一和完整。

在 visionOS 中，你可以为每个工具栏项目提供符号或文本标签。当用户注视包含符号的工具栏项目时，visionOS 会显示文本标签来提供额外信息。

**优先使用系统提供的工具栏**。标准工具栏拥有一致且用户熟悉的外观，且经过优化可良好搭配眼睛和手部输入使用。此外，系统还会自动将标准工具栏放在相对其窗口的正确位置。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-toolbar-standard-layout@2x.png)

**避免创建垂直工具栏**。在 visionOS 中，[标签页栏](tab-bars.md)是垂直的，因此呈现垂直工具栏会让用户混淆。

**尽量避免将窗口宽度调整到小于工具栏宽度。** visionOS 不包括每个 App 在其中列出所有操作的菜单栏，因此不论窗口的大小如何，让用户通过工具栏可靠访问基本控制非常重要。

**如果 App 可以进入模态状态，考虑提供上下文相关的工具栏控制**。例如，照片编辑 App 可能进入模态状态以帮助用户执行多步编辑任务。在这种情形下，模态编辑视图中的控制与主窗口中的控制不同。当 App 退出模态状态时，务必恢复窗口的标准工具栏控制。

**避免在工具栏中使用下拉式菜单**。下拉式菜单可让你提供与工具栏项目相关的额外操作，但难以被用户发现且可能会导致界面杂乱。因为 visionOS 中的工具栏位于窗口的底部边缘，下拉式菜单可能会遮挡出现在底部边缘下方的标准窗口控制。有关指南，请参阅[下拉式按钮](pull-down-buttons.md)。

### watchOS

工具栏按钮可让你在显示相关内容的视图中提供重要的 App 功能。你可以将工具栏按钮放在顶角或底部。如果将这些按钮放在滚动内容上方，按钮会始终保持可见，内容则会在其下方滚动。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/toolbars-watch-top-buttons@2x.png)
*顶部工具栏按钮*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/toolbars-watch-bottom-buttons@2x.png)
*底部工具栏按钮*

有关开发者指南，请参阅 [topBarLeading](https://developer.apple.com/cn/documentation/swiftui/toolbaritemplacement/topbarleading)、[topBarTrailing](https://developer.apple.com/cn/documentation/swiftui/toolbaritemplacement/topbartrailing) 或 [bottomBar](https://developer.apple.com/cn/documentation/swiftui/toolbaritemplacement/bottombar)。

你还可以将按钮放在滚动视图中。滚动工具栏按钮默认保持隐藏，直至用户向上滚动以显示它。用户会频繁滚动到滚动视图的顶部，因此可以很自然地找到工具栏按钮。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/toolbars-watch-primary-button-hidden@2x.png)
*工具栏按钮已隐藏*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/toolbars-watch-primary-button-visible@2x.png)
*工具栏按钮已显示*

有关开发者指南，请参阅 [primaryAction](https://developer.apple.com/cn/documentation/swiftui/toolbaritemplacement/primaryaction)。

**将滚动工具栏按钮用于非 App 主要功能的重要操作**。在主要用途与某项重要功能相关（但可能并不相同）的视图中，你可以使用工具栏按钮灵活地提供该功能。例如，“邮件”通过收件箱视图顶部的工具栏按钮提供了基本的“新建邮件”操作。收件箱的主要用途是显示可滚动的电子邮件列表，因此通过视图顶部的工具栏按钮提供密切相关的编写操作很有意义。

## 资源

#### 相关内容

[边栏](sidebars.md)

[标签页栏](tab-bars.md)

[布局](layout.md)

[按钮](buttons.md)

[搜索栏](search-fields.md)

[Apple Design Resources](https://developer.apple.com/design/resources/)

#### 开发者文档

[Toolbars](https://developer.apple.com/cn/documentation/swiftui/toolbars) — SwiftUI

[UIToolbar](https://developer.apple.com/cn/documentation/uikit/uitoolbar) — UIKit

[NSToolbar](https://developer.apple.com/cn/documentation/appkit/nstoolbar) — AppKit

#### 视频

- [了解全新设计系统](https://developer.apple.com/cn/videos/play/wwdc2025/356)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 12 月 16 日 | 更新了 Liquid Glass 指南。 |
| 2025 年 6 月 9 日 | 新增了分组栏项目的指南，更新了使用符号的指南，以及整合了导航栏指南。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
| 2023 年 6 月 5 日 | 更新了在 watchOS 中使用工具栏的指南。 |
