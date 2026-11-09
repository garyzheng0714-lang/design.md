# 标签页栏

原文：https://developer.apple.com/cn/design/human-interface-guidelines/tab-bars

标签页栏可让用户在 App 的各顶层部分间导航。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-tab-bar-intro@2x.png)

标签页栏可帮助用户理解 App 提供的不同类型信息或功能，还可让用户在视图的不同部分之间快速切换，同时保留各个部分中的当前导览状态。

## 最佳实践

**使用标签页栏支持导航，而非提供操作**。标签页栏可让用户在 App 的不同部分之间导航，如“时钟” App 中的“闹钟”、“秒表”和“计时器”标签页。如果你需要提供可操作当前视图中元素的控制，请改用[工具栏](toolbars.md)。

**确保当用户导航至 App 的不同部分时，标签页栏可见**。如果你隐藏标签页栏，用户可能会忘记自己处于 App 中的哪个区域。模态视图覆盖标签页栏的情况除外，因为模态是暂时的自含式内容。

**使用适当数量的标签页来帮助用户在你的 App 中导航**。作为 App 层级结构的表示方式，在更多标签页带来的复杂性和用户频繁访问每个部分的需求之间权衡非常重要；请记住通常标签页越少，导航越轻松。对于包含复杂信息结构的 App，应在可用时考虑使用边栏或可变为边栏作为替代的标签页栏。

**避免溢出标签页**。根据设备尺寸和方向，可见标签页的数量可能比标签页总数量要小。如果水平空间限制了可见标签页的数量，则 iOS 和 iPadOS 中的末尾标签页会变为“更多”标签页，在单独列表中显示剩余项目。“更多”标签页会让用户难以前往和注意到隐藏标签页上的内容，因此请限制在 App 中出现这种情况。

**不要停用或隐藏标签页栏按钮，即使在其内容不可用时**。如果让标签页栏按钮在某些情况下可用，但在其他情况下不可用，App 的界面会显得不稳定和不可预测。如果某个部分为空，请解释其内容不可用的原因。

**包括标签页标签以帮助导览**。标签页标签会出现在标签页栏图标的下方或旁边，可通过清晰地描述标签页所含内容的类型或功能来辅助导览。尽可能使用单个字词。

**考虑使用 SF 符号提供熟悉的可缩放标签页栏图标**。使用 [SF 符号](sf-symbols.md)时，标签页栏图标会自动适配不同的环境。例如，标签页栏可以是常规型或紧凑型，具体取决于设备和方向。紧凑视图下，标签页栏图标会显示在标签页标签的上方，而在常规视图下，图标和标签会并排显示。为了与平台保持一致，请优先使用实心符号或图标。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tab-bar-landscape@2x.png)

若要创建自定义标签页栏图标，请参阅 [Apple 设计资源](https://developer.apple.com/design/resources/)了解标签页栏图标尺寸。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tab-bar-anatomy-callouts@2x.png)

**使用标记指示有关键信息可用**。你可以在标签页上显示一个标记（包含白色文本和数字或感叹号的红色椭圆），以指示该部分有值得用户注意的全新或更新信息。为关键信息保留标记以便其影响和含义不被削弱。有关指南，请参阅[通知](notifications.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/tab-bar-badges-iphone@2x.png)

**避免为标签页标签和内容层背景应用相似颜色**。如果 App 内容层中已有鲜艳的多彩内容，请为标签页栏优先使用单色外观，或选取有足够视觉区分度的强调色。有关更多指南，请参阅 [Liquid Glass 颜色](color.md#Liquid-Glass-color)。

## 平台考量因素

*无针对 macOS 的额外考量因素。在 watchOS 中不受支持。*

### iOS

屏幕底部的标签页栏悬浮于内容之上。其项目放在 [Liquid Glass](materials.md#Liquid-Glass) 背景上，可让下方内容被透视。

对于带有附加组件（如“音乐”中的迷你播放程序）的标签页栏，你可以选择在用户向下滚动时，最小化标签页栏并随之移动该组件。用户可以轻点标签页或滚动到视图顶部来退出最小化状态。有关开发者指南，请参阅 [TabBarMinimizeBehavior](https://developer.apple.com/cn/documentation/swiftui/tabbarminimizebehavior) 和 [UITabBarController.MinimizeBehavior](https://developer.apple.com/cn/documentation/uikit/uitabbarcontroller/minimizebehavior)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tab-bar-with-accessory-expanded@2x.png)
*带有附加组件的标签页栏已展开*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tab-bar-with-accessory-collapsed@2x.png)
*带有附加组件的标签页栏已最小化*

标签页栏可在后端包括一个专用搜索标签页。有关指南，请参阅：[搜索栏](search-fields.md)。

### iPadOS

系统会在屏幕顶部附近显示标签页栏。你可以选择让标签页栏以固定元素形式出现，或者包含可将其转换为边栏的按钮。有关开发者指南，请参阅 [tabBarOnly](https://developer.apple.com/cn/documentation/swiftui/tabviewstyle/tabbaronly) 和 [sidebarAdaptable](https://developer.apple.com/cn/documentation/swiftui/tabviewstyle/sidebaradaptable)。

**标签页栏**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ipad-tab-bar-music-app@2x.png)

**边栏**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ipad-sidebar-music-app@2x.png)

> **注**
>
> 若要显示边栏而不提供将其转换为标签页栏的选项，请使用 [navigation split view](https://developer.apple.com/documentation/swiftui/navigationsplitview) 而非标签页视图。有关指南，请参阅[边栏](sidebars.md)。

**首选使用标签页栏进行导航**。标签页栏可让用户访问 App 中最常使用的部分。如果 App 复杂度更高，你可以提供将标签页栏转换为边栏的选项，以便用户访问更多导航选项。

**让用户自定义标签页栏**。如果 App 包含用户可能想要访问的许多部分，让用户选择其频繁使用的项目并添加到标签页栏或者移除不常用的项目可能会很有用。例如，在“音乐” App 中，用户可以选择喜爱的播放列表以显示在标签页栏中。如果让用户自行选择标签页，请尽量将默认列出的标签页数量控制在五个或以下，以保持紧凑视图与常规视图尺寸之间的连续性。有关开发者指南，请参阅 [TabViewCustomization](https://developer.apple.com/cn/documentation/swiftui/tabviewcustomization) 和 [UITab.Placement](https://developer.apple.com/cn/documentation/uikit/uitab/placement)。

### Apple tvOS

标签页栏可高度自定义。例如，你可以：

- 指定标签页栏背景的色调、颜色或图像
- 为标签页项目选取字体，包括为已选择的项目选取另一种字体
- 为已选择和未选择的项目指定色调
- 添加设置和搜索等按钮图标

标签页栏默认是半透明的，只有已选择的标签页是不透明的。当用户使用遥控器聚焦于标签页栏时，已选择的标签页会包含一个投影，用以强调其已选择状态。标签页栏的高度是 68 点，其上边缘距离屏幕顶部 46 点；你不能更改这些值。

如果项目太多，超出了标签页栏的容纳范围，系统会从标签页栏的右侧开始应用渐变效果，从而截断最右边的项目。如果有足够多的项目可进行滚动，系统还会从左侧开始应用截断渐变效果。

**注意标签页栏的滚动行为**。在当前标签页包含一个主视图时，用户默认可以将标签页栏滚动到屏幕外。你可以在 TV App 的“立即观看”、“电影”、“电视节目”、“体育”和“儿童”标签页中看到此类行为的例子。但在屏幕包含分屏浏览时例外，如 TV App 的“资料库”标签页或 App 的“设置”屏幕。在这种情况下，当用户在分屏浏览的主要和次要面板内滚动内容时，标签页栏仍然会固定在视图的顶部。不管标签页的内容是什么，当用户按下遥控器上的菜单键时，焦点始终会回到页面顶部的标签页栏。

**在直播观看 App 中，以一致的方式整理标签页**。为了获得最佳体验，请按照以下顺序使用标签页整理直播流媒体 App 中的内容。

- 直播内容
- 云端 DVR 或其他录制的内容
- 其他内容

有关更多指南，请参阅[直播观看 App](live-viewing-apps.md)。

### visionOS

在 visionOS 中，标签页栏始终垂直，悬浮在相对于窗口前沿而言固定的位置。当用户注视标签页栏时，它会自动展开；若要打开特定标签页，用户可注视标签页并轻点。标签页栏展开后，它可能会暂时遮挡后面的内容。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-tab-bar-expanding-animation.mp4)

**为每个标签页提供符号和文本标签**。标签页的符号在标签页栏中始终可见。当用户注视标签页栏时，系统也会显示标签页标签。虽然标签页栏会展开，但你需要保持标签页标签简短，以便用户可以一目了然。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-tab-bar-collapsed@2x.png)
*收起*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-tab-bar-expanded@2x.png)
*展开*

**视情况考虑在 App 的标签页内使用边栏**。如果 App 的层级结构较深，你不妨使用[边栏](sidebars.md)来支持在标签页内进行二级导航。如果使用边栏，请务必防止在边栏中进行的选择操作更改当前打开的标签页。

## 资源

#### 相关内容

[标签页视图](tab-views.md)

[工具栏](toolbars.md)

[边栏](sidebars.md)

[材质](materials.md)

#### 开发者文档

[TabView](https://developer.apple.com/cn/documentation/swiftui/tabview) — SwiftUI

[TabViewBottomAccessoryPlacement](https://developer.apple.com/cn/documentation/swiftui/tabviewbottomaccessoryplacement) — SwiftUI

[Enhancing your app’s content with tab navigation](https://developer.apple.com/cn/documentation/swiftui/enhancing-your-app-content-with-tab-navigation) — SwiftUI

[UITabBar](https://developer.apple.com/cn/documentation/uikit/uitabbar) — UIKit

[Elevating your iPad app with a tab bar and sidebar](https://developer.apple.com/cn/documentation/uikit/elevating-your-ipad-app-with-a-tab-bar-and-sidebar) — UIKit

#### 视频

- [了解全新设计系统](https://developer.apple.com/cn/videos/play/wwdc2025/356)
- [提升 iPad App 设计](https://developer.apple.com/cn/videos/play/wwdc2025/208)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 6 月 8 日 | 更新了术语和插图。 |
| 2025 年 12 月 16 日 | 更新了 Liquid Glass 指南。 |
| 2025 年 7 月 28 日 | 新增了 Liquid Glass 指南。 |
| 2024 年 9 月 9 日 | 新增了表示 iPadOS 18 中标签页栏的插图。 |
| 2024 年 8 月 6 日 | 更新中包含针对 iPadOS 18 中标签页栏的指南。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
