# 面板

原文：https://developer.apple.com/cn/design/human-interface-guidelines/panels

在 macOS App 中，面板通常悬浮于其他打开窗口之上，提供与活跃窗口或当前所选内容相关的补充控制、选项或信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-panel-intro@2x.png)

一般而言，面板的外观不像 App 的[主窗口](windows.md#macOS-window-states)那么突出。在适当情况下，面板也可以采用深色的半透明样式来支持抬头显示器（或者 *HUD*）体验。

如果 App 在其他平台中运行，应考虑使用模态视图来呈现与当前任务或所选内容相关的补充内容。有关指南，请参阅[模态化](modality.md)。

## 最佳实践

**使用面板，以让用户快速访问与其所处理内容相关的重要控制或信息**。例如，你可以使用面板来提供影响活跃文稿或窗口中所选项目的控制或设置。

**考虑使用面板来呈现检查器功能**。*检查器*显示当前所选项目的详细信息，并在项目更改或用户选择新项目时自动更新其内容。相比之下，如果需要呈现*简介*窗口，请使用常规窗口而非面板。*简介*窗口始终保持显示相同的内容，即使所选项目发生更改也是如此。你也可以考虑使用[拆分视图](split-views.md)面板来呈现检查器，具体取决于 App 的布局。

**首选在面板中使用简单的调整控制**。尽量避免包括需要键入文本或选择项目才能进行操作的控制，因为这些操作可能需要多个步骤。相反，应考虑使用滑块和步进器这样的控制，因为这些组件可让用户实现更为直接的控制。

**采用描述面板用途的简短标题**。面板通常悬浮于 App 中其他打开窗口之上，因此你需要为面板提供一个标题栏，以便用户可将其放在想要的任何位置。使用名词或者符合 [title-style capitalization](https://support.apple.com/guide/applestyleguide/c-apsgb744e4a3/web#apdca93e113f1d64)（标题式大写）的名词短语来创建短标题，从而帮助用户识别屏幕上的面板。例如，macOS 提供了用户熟知且标题为“字体”和“颜色”的面板，同时很多 App 使用“检查器”作为标题。

**适时显示和隐藏面板**。App 处于活跃状态的情况下，不论面板打开时哪个窗口正在使用中，将 App 所有打开的面板调到前面。当 App 不活跃时，隐藏其所有面板。

**避免在窗口菜单的文稿列表中包括面板**。尽管可以在[“窗口”菜单](the-menu-bar.md#Window-menu)中包括显示或隐藏面板的命令，但面板不是文稿或标准 App 窗口，因此不应包括在窗口菜单的列表中。

**一般而言，避免提供面板的最小化按钮**。用户通常不需要最小化面板，因为面板仅会按需显示并在 App 不活跃时消失。

**在界面和帮助文稿中通过标题引用面板**。在菜单中，使用面板的标题，但不要包括*面板*一词：例如，“显示字体”、“显示颜色”和“显示检查器”。在帮助文稿中，引入“面板”作为不同类型的窗口会让用户感到困惑，因此，一般最好通过面板的标题来引用面板，或者在标题后面追加*窗口*以使其更加清晰。例如，“检查器”这个标题本身通常足以提供充分的上下文信息，但相较于仅仅使用“字体”和“颜色”，使用“字体窗口”和“颜色窗口”可能更为清楚。

## 平视画面样式面板

平视画面 (HUD) 样式面板的功能与标准面板相同，但是其外观颜色更深且半透明。HUD 非常适用于呈现高度可视化内容或提供沉浸式体验（例如媒体编辑或全屏幻灯片放映）的 App。例如，QuickTime Player 使用 HUD 来显示检查器信息，而不遮挡太多内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/hud-style-panel@2x.png)

**首选标准面板**。如果在没有逻辑依据的地方使用 HUD，用户可能会受到干扰或感到困惑。另外，HUD 可能与当前外观设置不相符。一般而言，仅在下述情况下使用 HUD：

- 在呈现影片、照片或幻灯片的媒体导向型 App 中
- 当标准面板会遮挡基本内容时
- 当你不需要包括控制时；显示三角形除外，大多数系统提供的控制与 HUD 的外观不相符。

**App 切换模式时，保持使用一种面板样式**。例如，如果 App 处于全屏幕模式时使用 HUD，在用户退出 App 全屏幕模式时，最好保持使用 HUD 样式。

**在 HUD 中谨慎使用颜色**。深色外观的 HUD 中出现太多颜色可能会分散用户注意力。通常，你只需要使用少量高对比度颜色来高亮标记 HUD 中的重要信息。

**保持 HUD 尽量小**。HUD 旨在无形发挥作用，因此让 HUD 变得太大违背了设计初衷。不要让 HUD 遮挡其调整的内容，并且确保它不会与内容争夺用户的注意力。

有关开发者指南，请参阅 [hudWindow](https://developer.apple.com/cn/documentation/appkit/nswindow/stylemask-swift.struct/hudwindow)。

## 平台考量因素

*在 iOS、iPadOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[窗口](windows.md)

[模态化](modality.md)

#### 开发者文档

[NSPanel](https://developer.apple.com/cn/documentation/appkit/nspanel) — AppKit

[hudWindow](https://developer.apple.com/cn/documentation/appkit/nswindow/stylemask-swift.struct/hudwindow) — AppKit
