# 搜索栏

原文：https://developer.apple.com/cn/design/human-interface-guidelines/search-fields

搜索栏可让用户按输入的特定词来搜索一系列内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-search-field-intro@2x.png)

搜索栏是一个可编辑的文本栏，显示“搜索”图标、“清除”按钮和占位符文本，用户可在此处输入要搜索的内容。搜索栏可使用[范围栏](search-fields.md#Scope-bars-and-tokens)和[令牌](search-fields.md#Scope-bars-and-tokens)帮助过滤和细化搜索范围。在各个平台上，搜索访问模式会根据 App 的目标和设计而各有不同。

有关开发者指南，请参阅 [Adding a search interface to your app](https://developer.apple.com/cn/documentation/swiftui/adding-a-search-interface-to-your-app)；有关系统全局搜索的相关指南，请参阅[搜索](searching.md)。

## 最佳实践

**使用占位符文本帮助用户了解其可搜索的内容**。在需要强化搜索范围或向用户介绍搜索可访问的内容类型时，占位符文本会很有帮助。

**尽可能在用户键入时立即开始搜索**。在用户键入的同时搜索可让搜索体验感觉响应更快，因为其提供的结果会随着文本更加具体而不断细化。

**考虑显示建议搜索词**。例如，你可以在搜索开始前显示最近搜索项，或随用户键入显示预测搜索建议。这可帮助用户更快进行搜索，即使搜索本身并未立即开始执行。

**简化搜索结果**。首先提供最相关的搜索结果，尽量降低用户滚动查找目标内容的必要性。除了优先显示最可能的结果外，考虑将结果分类以帮助用户找到想要的结果。

**考虑让用户过滤搜索结果**。例如，你可以在搜索结果内容区域中包括范围栏，帮助用户快速轻松地过滤搜索结果。

## 范围栏和令牌

范围栏和令牌是可让用户在执行搜索前后缩小搜索参数范围的组件。

- *范围栏*是用于过滤和调整搜索范围的控制。
- *令牌*是搜索词的视觉化展现，用户可进行选择和编辑，令牌还可在搜索中充当针对任何额外搜索词的过滤条件。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/search-fields-scope-control-tokens@2x.png)

**使用范围栏过滤明确定义的搜索类别**。范围栏可帮助用户从较广范围切换至较窄范围。例如，在 iPhone 上的“邮件”中，范围栏可帮助用户将搜索范围从全部邮箱切换至正在查看的特定邮箱。有关开发者指南，请参阅：[Scoping a search operation](https://developer.apple.com/cn/documentation/swiftui/scoping-a-search-operation)。

**默认使用较广范围，并让用户按需细化**。较广范围可为全部可用结果提供上下文，有助于在用户选择缩小范围时为其指引有用的方向。

**使用令牌按常见搜索词或项目过滤**。在你定义令牌后，其所代表的搜索词会进行视觉封装处理，表示用户可以将其作为单项进行选择和编辑。令牌可以解释搜索词，如在“邮件”中按特定联系人过滤，还可以将搜索聚焦于特定属性组，如在“信息”中按照片过滤。若要了解相关的 macOS 组件，请参阅[令牌栏](token-fields.md)。

**考虑将令牌与搜索建议搭配使用**。用户可能不知道哪些令牌可用，因此将其与搜索建议搭配使用可帮助用户了解其使用方式。

## 平台考量因素

*无针对 visionOS 的额外考量因素。*

### iOS

你可以将搜索入口点放置在以下三个主要位置：

- 作为标签页栏中的标签页
- 屏幕底部或顶部的工具栏中
- 直接与内容内联显示

最合理的搜索位置取决于 App 的布局、内容和导览。

#### 将搜索作为标签页

你可以将搜索作为标签页放置在标签页栏中，这样在用户切换 App 各个部分时，搜索仍保持可见且始终可用。搜索标签页有两种样式：

- **标准标签页**。此样式以统一方式显示搜索标签页和标签页栏的其余部分。轻点搜索标签页可使用户导览到顶部带搜索栏的搜索着陆页。
- **按钮外观**。此样式将搜索标签页显示为单独按钮，并可让用户立即开始搜索。轻点搜索标签页可使搜索栏成为焦点并显示键盘。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/search-fields-search-as-tab-standard@2x.png)
*标准标签页*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/search-fields-search-as-tab-prominent@2x.png)
*按钮外观*

**选取标准标签页样式提供建议、促进发现和鼓励探索**。此样式的搜索标签页会为搜索创建专用着陆页，从而在用户轻点搜索栏开始搜索前，提供显示可能有用的内容或建议的机会。此方式非常适合于包含各种丰富内容的 App，用户可能会想在其中进行探索。例如，Apple TV 使用此搜索标签页样式展示其各种类型和分类，帮助用户在搜索前先了解可用内容。

**选取可帮助用户快速查找所需内容的按钮外观**。当用户与此样式的搜索标签页交互时，键盘会立即显示在搜索栏下方，供用户开始搜索。此方式提供了一种更瞬态的体验，让用户可在退出搜索后直接返回上一个标签页，且十分适合于快速无缝地执行搜索。

#### 工具栏搜索

作为标签页栏搜索的替代方案，你也可以将搜索放置在屏幕底部或顶部的工具栏中。

- 你可以在底部工具栏中包括搜索，并根据可用空间大小将其显示为展开的栏或工具栏按钮。用户轻点时，按钮会动态变为搜索栏显示在键盘上方，供用户开始键入。
- 你可以在顶部工具栏（也称为导航栏）中以工具栏按钮形式包括搜索。用户轻点时，按钮会动态变为搜索栏，显示在键盘上方或顶部（若底部空间不足）。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/search-fields-ios-toolbar-with-items@2x.png)
*底部工具栏搜索*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/search-fields-ios-navigation-bar-item@2x.png)
*顶部工具栏搜索*

**若空间足够，将搜索放置在底部**。你可以将搜索栏添加到现有工具栏，也可以将其作为唯一项目单独显示为新工具栏。底部搜索可保持搜索易于触及，因此在看重搜索的任何情况下都非常实用。在各种工具栏布局中，底部显示搜索的 App 示例包括“设置”、“邮件”和“备忘录”，搜索在前者中作为唯一项目单独显示，在后两者中则与其他重要控制一同显示。

**当务必优先显示屏幕底部的内容或者不存在底部工具栏时，将搜索放置在顶部**。如果覆盖内容可能会干扰 App 的主要功能，可在顶部使用搜索。例如，“钱包” App 会在屏幕底部叠放活动凭证，使其易于访问且一目了然。

#### 内联栏搜索

在某些情况下，不妨将 App 包括的搜索栏与内容内联显示。

**当搜索位置与搜索内容并排摆放可强化两者间的关联时，将搜索作为内联栏放置**。需要在单个视图内进行过滤或搜索时，让搜索直接显示在内容旁边会很有帮助，这可说明搜索仅适用于该内容，而非全局内容。如果你的App 有多个搜索栏且位置在搜索范围中起关键作用时，这种模式会很有用。例如，虽然“音乐” App 的主要搜索位于标签页栏中，但用户可以导览至其资料库，并使用内联搜索栏过滤其歌曲和专辑。

**位于顶部时，将内联搜索栏放置在搜索范围列表上方，并考虑在列表滚动时将其固定到顶部工具栏**。这有助于将其与出现在其他位置的搜索区分开来。

### iPadOS、macOS

iPadOS 与 macOS 在搜索栏放置方式和行为上很相似。如果 App 同时在 iPad 和 Mac 上提供，尽量让这两个平台上的搜索体验保持一致。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/search-fields-toolbar-search-ipad@2x.png)
*iPadOS*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/search-fields-toolbar-search-mac@2x.png)
*macOS*

**将搜索栏放置在常用工具栏后端**。许多 App 均受益于在工具栏中搜索这种熟悉的模式，尤其是具有拆分视图且需要跨多列信息搜索的 App，如“邮件”、“备忘录”和“语音备忘录”。此放置方式充分利用了空间，因其可让用户在导览结果的同时，保持所选内容在详细信息视图中可见。此外，如果结果显示在 App 的详细信息视图中，考虑将搜索放置在工具栏中。以“无边记”为例，其工具栏中的搜索会在下方详细信息视图中过滤白板。

**需要在边栏中过滤内容或导览时，将搜索放在其顶部**。“设置”等 App 会利用搜索来快速过滤边栏和显示可能层级较多的部分，从而为用户搜索、预览和导览至要查找的部分或设置提供了一种简单的方式。如果 App 具有丰富的详细信息视图，并且需要在正在过滤的边栏与相邻视图间营造明显的分离效果，此方式很有用。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/search-fields-ipad-search-in-sidebar@2x.png)

**需要为发现内容打造专区时，将搜索作为单独一项放在边栏或标签页栏中**。如果与搜索搭配出现的建议、类别或内容丰富且需要更多空间，为其打造一个专区会很有帮助。这对浏览与搜索紧密相连的 App 而言尤为有用，如“音乐”和“视频”，其中均提供了一个统一位置来突显建议内容、类别和最近搜索。专区还可确保在用户导览和切换 App 不同部分时搜索始终可用。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/search-fields-ipad-search-in-tab-bar@2x.png)

**考虑在用户导览至专区时立即聚焦于其中的搜索栏，从而帮助其更快进行搜索并更轻松找到该栏**。但这在 iPad 上仅可用虚拟键盘时例外，这种情况下最好不聚焦于搜索栏，以防键盘意外覆盖视图。

**将窗口大小调整与搜索栏放置方式结合考虑**。与 Mac 相似，iPad 上的搜索栏大小会随 App 窗口流畅调整。但对于 iPad 的紧凑视图而言，确保在上下文最实用的位置提供搜索十分重要。例如，“备忘录”和“邮件”缩小为紧凑视图时，会将搜索放置在内容列表栏的上方。

### Apple tvOS

搜索屏幕是帮助用户输入搜索文本的专门键盘屏幕，在可完全自定义的视图中将搜索结果显示在键盘下方。有关开发者指南，请参阅 [UISearchController](https://developer.apple.com/cn/documentation/uikit/uisearchcontroller)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/search-fields-tvos-search@2x.png)

**提供让搜索更简单的建议**。用户一般不会在 Apple tvOS 中键入太多内容。为了改善搜索体验，应提供常用和上下文特定的搜索建议，包括可用的最近搜索。有关开发者指南，请参阅 [Using suggested searches with a search controller](https://developer.apple.com/cn/documentation/uikit/using-suggested-searches-with-a-search-controller)。

### watchOS

用户轻点搜索栏时，系统会显示覆盖整个屏幕的文本输入控制。只有当用户轻点“取消”或“搜索”按钮时，App 才会返回搜索栏。

## 资源

#### 相关内容

[搜索](searching.md)

[令牌栏](token-fields.md)

#### 开发者文档

[Adding a search interface to your app](https://developer.apple.com/cn/documentation/swiftui/adding-a-search-interface-to-your-app) — SwiftUI

[searchable(text:placement:prompt:)](https://developer.apple.com/cn/documentation/swiftui/view/searchable(text:placement:prompt:)) — SwiftUI

[UISearchBar](https://developer.apple.com/cn/documentation/uikit/uisearchbar) — UIKit

[UISearchTextField](https://developer.apple.com/cn/documentation/uikit/uisearchtextfield) — UIKit

[NSSearchField](https://developer.apple.com/cn/documentation/appkit/nssearchfield) — AppKit

#### 视频

- [设计直观的搜索体验](https://developer.apple.com/cn/videos/play/wwdc2026/292)
- [了解全新设计系统](https://developer.apple.com/cn/videos/play/wwdc2025/356)
- [可被发现的设计](https://developer.apple.com/cn/videos/play/wwdc2021/10126)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 6 月 8 日 | 更新了术语并优化了 iOS 中将搜索作为标签页的指南。 |
| 2025 年 6 月 9 日 | 更新了有关 iOS 中搜索放置方式的指南，整合了 iPadOS 和 macOS 平台考量因素，以及新增了有关令牌的指南。 |
| 2023 年 9 月 12 日 | 整合了所有平台通用的指南。 |
| 2023 年 6 月 5 日 | 新增在 watchOS 中使用搜索栏的指南。 |
