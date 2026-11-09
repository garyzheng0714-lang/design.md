# 小组件

原文：https://developer.apple.com/cn/design/human-interface-guidelines/widgets

小组件可让用户在其他环境快速访问 App 或游戏中的重要信息和重点交互。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-widgets-intro@2x.png)

小组件通过显示可一目了然的即时内容并提供特定功能，协助用户整理和个性化其设备。小组件可在各种环境中出现，在不同平台间提供一致的体验。例如，用户可能会在以下位置放置“天气”小组件：

- iPhone 和 iPad 的主屏幕和锁屏
- Mac 的桌面和通知中心
- 佩戴 Apple Vision Pro 时所见的水平或垂直表面
- Apple Watch 智能叠放中的固定位置

## 剖析

小组件具有不同尺寸，其中涵盖 iPhone、iPad 和 Apple Watch 上的小尺寸补充小组件，以及 iPad、Mac 和 Apple Vision Pro 上包括特大尺寸在内的系统自带小组件等。此外，小组件还会根据其显示环境调整外观，并对用户的设备自定义情况作出响应。设计小组件时，应考虑以下方面：

- 要支持的小组件尺寸
- 小组件可能的显示环境（设备和系统体验）
- 小组件基于尺寸和环境所接收的渲染模式和颜色处理方式

WidgetKit 框架为每种小组件尺寸提供了默认外观和处理方式，使其适合所在的系统体验或设备。然而，考虑设计在各种特定环境中都可提供最佳内容体验的自定义小组件仍十分重要。

### 系统自带小组件

系统自带小组件提供多种多样的尺寸，并可能包含一个或多个交互式元素。

**小**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-calendar-small@2x.png)

**中**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-calendar-medium@2x.png)

**大**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-calendar-large@2x.png)

**特大**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-calendar-extra-large-landscape@2x.png)

**特大（竖排）**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-music-extra-large-portrait@2x.png)

下表显示每种系统自带小组件尺寸的受支持环境：

| 小组件尺寸 | iPhone | iPad | Mac | Apple Vision Pro |
| --- | --- | --- | --- | --- |
| 系统小尺寸 | 主屏幕、“今天”视图、待机显示和 CarPlay 车载 | 主屏幕、“今天”视图和锁屏 | 桌面和“通知中心” | 水平和垂直表面 |
| 系统中尺寸 | 主屏幕和“今天”视图 | 主屏幕和“今天”视图 | 桌面和“通知中心” | 水平和垂直表面 |
| 系统大尺寸 | 主屏幕和“今天”视图 | 主屏幕和“今天”视图 | 桌面和“通知中心” | 水平和垂直表面 |
| 系统特大尺寸 | 不受支持 | 主屏幕和“今天”视图 | 桌面和“通知中心” | 水平和垂直表面 |
| 系统特大尺寸（竖排） | 不受支持 | 不受支持 | 不受支持 | 水平和垂直表面 |

### 补充小组件

由于尺寸原因，补充小组件显示的信息量非常有限。

**补充圆形**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-accessory-calendar-circular@2x.png)

**补充圆角**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-accessory-corner-widget-watch@2x.png)

**补充内联**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-accessory-calendar-inline@2x.png)

**补充矩形**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-accessory-calendar-rectangular@2x.png)

这些小组件可显示在以下设备上：

| 小组件尺寸 | iPhone | iPad | Apple Watch |
| --- | --- | --- | --- |
| 补充圆形 | 锁屏 | 锁屏 | 手表复杂功能和在智能叠放中 |
| 补充圆角 | 不受支持 | 不受支持 | 手表复杂功能 |
| 补充内联 | 锁屏 | 锁屏 | 手表复杂功能 |
| 补充矩形 | 锁屏 | 锁屏 | 手表复杂功能和在智能叠放中 |

### 外观

小组件的显示样式有全彩、单色调或透明（半透明）。系统可能会为小组件及其所含全彩图像、符号和图形应用色调外观或透明外观，具体取决于位置、设备和用户自定义情况。

例如，小尺寸系统小组件的外观会因设备和位置而异：

- 在 iPhone 和 iPad 的主屏幕上，用户可为小组件选取不同外观：浅色、深色、透明和色调。浅色和深色外观下的小组件使用全彩设计。对于透明外观下的小组件，系统会降低其饱和度并添加半透明、高光和 Liquid Glass 材质效果。对于色调外观下的小组件，系统会降低其自身及内容的饱和度，然后应用用户所选色调。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/widgets-stocks-default@2x.png)
*全彩*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-stocks-clear@2x.png)
*透明*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-stocks-tinted@2x.png)
*色调*

- 在 Apple Vision Pro 上，小组件以 3D 对象形式显示，且周围具有边框。其呈现全彩外观，并使用可响应不同光线条件的玻璃感或纸张感涂层。此外，用户还可选取色调外观，从系统提供的调色盘中应用一种颜色。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-stocks-visionos-frame@2x.png)

- 在 iPad 锁屏上，小组件呈现未应用色调的单色外观。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-stocks-ipad-lock-screen@2x.png)

- 处于待机显示下的 iPhone 锁屏上，小组件放大显示，且背景已移除。环境光弱于某个阈值时，系统会以红色调单色渲染小组件。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-stocks-standby@2x.png)
*待机显示*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-stocks-standby-night-mode@2x.png)
*弱光条件下处于待机显示的 iPhone*

同样，矩形补充小组件显示如下：

- 在 iPhone 和 iPad 的锁屏上，小组件呈现未应用色调的单色外观。
- 在 Apple Watch 上，小组件可使用全彩外观和色调外观显示为手表复杂功能，还可显示在智能叠放中。

**iPhone 锁屏**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-calendar-rectangular-ios@2x.png)

**手表复杂功能**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-calendar-rectangular-watchos-complication@2x.png)

**Apple Watch 上的智能叠放**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-calendar-rectangular-watchos-smart-stack@2x.png)

上述每种外观都包括[渲染模式](widgets.md#Rendering-modes)，具体取决于平台和用户的外观设置：

- 系统为所有平台上的系统自带小组件使用 [full color](https://developer.apple.com/cn/documentation/widgetkit/widgetrenderingmode/fullcolor)（全彩）渲染模式，以全彩显示小组件。该模式不会更改视图颜色。
- 系统为所有平台上的系统自带小组件和 Apple Watch 上的补充小组件使用 [accented](https://developer.apple.com/cn/documentation/widgetkit/widgetrenderingmode/accented)（强调）渲染模式。在强调渲染模式下，系统会移除背景并转而使用色调效果呈现色调外观，以及使用 Liquid Glass 背景呈现透明外观。此外，系统还会将小组件视图分为强调组和主要组，然后为各组应用一种纯色。
- 系统为 iPhone 和 iPad 锁屏上的小组件以及弱光条件下 iPhone 待机显示上的小组件使用 [vibrant](https://developer.apple.com/cn/documentation/widgetkit/widgetrenderingmode/vibrant)（虚化）渲染模式。其会降低文本、图像和仪表的饱和度，并通过为内容应用适合于锁屏背景或 macOS 桌面的颜色来打造虚化效果。请注意，用户可使用色调自定义锁屏，且系统会为弱光条件下处于待机显示的 iPhone 上显示的小组件应用红色调。

下表列出了每种渲染模式在各平台上的使用环境：

| 平台 | 全彩 | 强调 | 虚化 |
| --- | --- | --- | --- |
| iPhone | 主屏幕、“今天”视图、待机显示和 CarPlay 车载（背景已移除） | 主屏幕和“今天”视图 | 锁屏、弱光条件下的待机显示 |
| iPad | 主屏幕和“今天”视图 | 主屏幕和“今天”视图 | 锁屏 |
| Apple Watch | 智能叠放、复杂功能 | 智能叠放、复杂功能 | 不受支持 |
| Mac | 桌面和“通知中心” | 不受支持 | 桌面 |
| Apple Vision Pro | 水平和垂直表面 | 水平和垂直表面 | 不受支持 |

有关更多设计指南，请参阅[渲染模式](widgets.md#Rendering-modes)。有关开发者指南，请参阅 [Preparing widgets for additional platforms, contexts, and appearances](https://developer.apple.com/cn/documentation/widgetkit/preparing-widgets-for-additional-contexts-and-appearances) 和 [WidgetRenderingMode](https://developer.apple.com/cn/documentation/widgetkit/widgetrenderingmode)。

## 最佳实践

**选择与 App 主要用途相关的简单理念**。将即时内容和相关功能包括在内。例如，使用“天气” App 的用户通常最关心当前最高温和最低温以及天气状况，因此“天气”小组件会优先显示此类信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-ios-weather-small@2x.png)

**尽量创建可让用户快速访问所需内容的小组件**。用户希望小组件显示有意义的内容，并提供实用操作和前往 App 中关键区域的深度链接。复制 App 图标几乎提供不了任何额外价值，用户可能不会将其保留在屏幕上。

**优先提供一天中不断变化的动态信息**。如果小组件的内容似乎从不变化，用户可能不会将其放在显眼的位置。虽然小组件不会每分钟都更新，但找到不断刷新小组件内容从而吸引用户频繁查看的方式十分重要。

**适时呈现惊喜和乐趣**。例如，你不妨为日历小组件设计出独特的视觉效果，在生日或节假日等有意义的场合进行展示。

**提供有价值的多种尺寸小组件**。小尺寸小组件通常将其有限的空间用于显示单一信息，而较大尺寸小组件可支持更多信息层次和操作。避免单为填充更大区域而扩展较小尺寸小组件的内容。相较于提供所有尺寸的小组件，更重要的是创建一个尺寸最适合表现内容的小组件。

**平衡信息密度**。布局稀疏可能会使小组件显得多余，而布局过于紧密则不够简单明了。创建既可让用户一览重要信息，也可细看更多详细信息的布局。如果布局过于紧密，应考虑通过使用更大的小组件尺寸或用图形替代文本来提高其清晰度。

**仅显示与小组件主要用途直接相关的信息**。在较大尺寸的小组件中，你可以显示更多数据或数据更详细的视觉效果，但请勿忽略小组件的主要用途。例如，所有“日历”小组件都显示用户的临近日程。在每种尺寸中，小组件会保持着重于显示日程，并随着尺寸的增加逐渐扩展信息范围。

**谨慎使用品牌元素**。融入品牌颜色、字样和风格化图形可增加小组件的辨识度，但不应盖过有用信息或使小组件看起来不和谐。当你包括品牌元素时，用户很少需要借助标志或 App 图标来识别小组件。如果包括小标志对小组件而言有利（例如，在小组件显示来自多个来源的内容时），在右上角放置一个小标志就已足够。

**在自动显示内容和允许用户自定义所显示信息之间选择**。在某些情况下，用户需要配置小组件以确保显示对其最有用的信息。例如，“股市”小组件可让用户选择其想要跟踪的股票。相比之下，“播客”小组件等部分小组件会自动显示最近内容，这样用户便无需进行自定义。有关开发者指南，请参阅 [Making a configurable widget](https://developer.apple.com/cn/documentation/widgetkit/making-a-configurable-widget)。

**避免在 App 内镜像小组件的外观**。在 App 中包括外观与小组件类似但行为却不相同的元素可能会造成用户困惑。此外，用户也可能不太愿意尝试以其他方式与 App 中的此类元素交互，因为用户会认为这类元素的行为跟小组件类似。

**当认证有价值时，告诉用户这一点**。如果小组件在用户登录 App 后可提供额外功能，确保用户知道这一点。例如，显示临近预订情况的 App 可在用户退出登录时包括“登录以查看预订情况”这样的信息。

### 更新小组件内容

为了保持相关性和实用性，小组件会定期刷新其信息，但不支持连续的实时更新，且系统可能会根据各种因素调整更新的限制。

**让小组件保持最新状态**。找到合适的小组件更新频率取决于对数据变化频率的掌握，以及对用户何时需要看到新数据的预估。例如，虽然潮汐状况不断变化，但提供海滩潮汐状况信息的小组件按小时更新仍十分有用。如果更新小组件的频率赶不上用户可能查看小组件的频率，应考虑显示描述数据上次更新时间的文本。

**使用系统功能刷新小组件中的日期和时间**。由于小组件的更新频率有限，应让系统自动刷新日期和时间信息以保留更新机会。确定适合于所显示数据的更新频率并快速显示内容，无需将过期数据隐藏在占位符内容之后。有关小组件更新的开发者指南，请参阅 [Keeping a widget up to date](https://developer.apple.com/cn/documentation/widgetkit/keeping-a-widget-up-to-date)。

**使用动画过渡让用户注意数据更新**。许多 SwiftUI 视图默认会为内容更新添加动画，还会使用最长两秒钟的标准和自定义动画在新信息可用或内容显示有所不同时告知用户。有关开发者指南，请参阅 [Animating data updates in widgets and Live Activities](https://developer.apple.com/cn/documentation/widgetkit/animating-data-updates-in-widgets-and-live-activities)。

### 增加互动性

用户会轻点或点按小组件来启动其对应 App。小组件还可包括按钮和切换，无需启动 App 即可提供更多功能。例如，“提醒事项”小组件包括可将任务标记为完成的切换。  用户与小组件中除按钮或切换以外的区域交互时，会启动你的 App。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-reminders-large-unselected@2x.png)
*未完成任务*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-reminders-large-selected@2x.png)
*已完成任务*

**提供简单且相关的功能，将复杂功能留给 App**。实用小组件能让用户轻松完成与其内容直接相关的任务或操作。

**确保小组件交互在正确的位置打开 App**。深度链接至与小组件内容直接相关的详细信息和操作，而不应让用户自行导览至 App 中的相关区域。例如，当用户点按或轻点中尺寸的“股市”小组件时，“股市” App 会打开一个显示该代码相关信息的页面。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-stocks-medium@2x.png)

**提供交互的同时保持整洁明了**。SwiftUI 链接、按钮和切换等多个交互目标可能对你的内容很有用，但应避免在小组件中创建类似 App 的布局。注意目标的大小，并确保用户可轻松轻点或点按而不会意外执行非预期的交互。请注意，内联补充小组件仅提供一个轻点目标。

### 选取内外边距

小组件会缩放以适配不同设备的屏幕尺寸和屏幕区域。提供合适尺寸的内容，确保小组件在每台设备上看起来都美观，并让系统按需调整大小或缩放。在 iOS 中，系统会调整你为较大尺寸设备设计的内容大小，从而确保小组件在小尺寸设备上看起来也很美观。在 iPadOS 中，系统会以较大尺寸渲染小组件，然后缩小以将其显示在主屏幕上。

为各种设备和缩放系数设计时，请使用[规范](widgets.md#Specifications)中列出的值和 [Apple 设计资源](https://developer.apple.com/design/resources/)作为指导；对于生产力小组件，请使用 [SwiftUI](https://developer.apple.com/cn/documentation/swiftui) 以确保灵活性。

**一般使用标准外边距确保易读性**。为小组件使用标准外边距宽度（大多数小组件为 16 点），避免内容挤占其边缘并使外观变得杂乱。如果需要使用更窄的外边距（例如，为图形、按钮或背景形状创建内容分组时），将外边距设为 11 点会有不错的效果。此外，请注意小组件在 Mac 上的桌面和锁屏（包括处于待机显示）中会使用较小的外边距。有关开发者指南，请参阅 [padding(_:_:)](https://developer.apple.com/cn/documentation/swiftui/view/padding(_:_:))。

**让内容的圆角半径与小组件的圆角半径看起来协调**。若要确保内容在小组件的圆角内看起来美观，请使用 SwiftUI 容器来应用正确的圆角半径。有关开发者指南，请参阅 [ContainerRelativeShape](https://developer.apple.com/cn/documentation/swiftui/containerrelativeshape)。

### 在小组件中显示文本

**优先使用系统字体、文本样式和 SF 符号**。使用系统字体有助于让小组件在任何平台上看起来如原生一般，同时可让你更轻松以各种粗细、样式和字号显示精美的文本。使用 SF 符号将符号与使用系统字体的文本对齐并相应缩放。如果使用自定义字体，应谨慎使用并确保用户一眼就可轻松阅读。通常最好为小组件中的较大文本使用自定义字体，为较小文本使用 SF Pro。有关指南，请参阅[字体排印](typography.md)和 [SF 符号](sf-symbols.md)。

**避免使用非常小的字号**。一般而言，使用 11 点或更大字号的字体显示文本。字体小于 11 点的文本对于许多用户来说都很难看清。

**避免栅格化文本**。始终使用文本元素和样式，确保文本缩放良好并让“旁白”可朗读内容。

> **注**
>
> 在 iOS、iPadOS 和 visionOS 中，当你使用 [Font](https://developer.apple.com/cn/documentation/swiftui/font) 选取系统字体或使用 [custom(_:size:)](https://developer.apple.com/cn/documentation/swiftui/font/custom(_:size:)) 选取自定义字体时，小组件支持从大号到 AX5 的动态字体字号。有关动态字体字号的更多信息，请参阅[支持动态字体](typography.md#Supporting-Dynamic-Type)。

### 使用颜色

**使用颜色增强小组件的外观，但不与内容争夺用户的注意力**。亮丽的颜色会吸引眼球，但如果颜色不会妨碍用户一瞥即可理解小组件的信息，这样最好。在资源目录中，你还可以指定想要系统使用的颜色，因为系统会生成小组件的编辑模式用户界面。

**在传达含义时不要依赖特定颜色来表现信息**。小组件可能会以单色显示（无论是否应用自定义色调），且在 watchOS 中，系统还可能会基于用户所选表盘反转颜色。除了颜色外，另外使用文本和图示表达含义。

**谨慎使用全彩图像**。当用户为其小组件选取色调外观或透明外观时，系统默认会降低全彩图像的饱和度。即使用户为小组件选取了色调外观或透明外观，你也可以选择以全彩渲染图像。但在这些外观下，全彩图像会使小组件特别显眼，可能会带来小组件在平台中格格不入的感觉。例如，当用户为小组件选取透明外观时，小组件中的全彩图像可能会看起来不和谐。考虑保留用于表现媒体内容（如音乐 App 小组件的专辑插图）的全彩图像，并使所用全彩图像尺寸小于小组件尺寸。

## 渲染模式

### 全彩

**支持浅色和深色外观**。优先为浅色外观使用浅色背景，为深色外观使用深色背景。同时考虑为文本和背景使用具有语义的系统颜色，让颜色动态适配当前外观。你还可以在资源目录中使用颜色变体来支持不同的外观。有关指南，请参阅：[深色模式](dark-mode.md)；有关开发者指南，请参阅：[Asset management](https://developer.apple.com/cn/documentation/xcode/asset-management) 和 [Supporting Dark Mode in your interface](https://developer.apple.com/cn/documentation/uikit/supporting-dark-mode-in-your-interface)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-notes-light-appearance@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-notes-dark-appearance@2x.png)

### 强调

**将小组件组成部分分为强调组和主要组。**  强调渲染模式会将小组件的视图层次分为强调组和主要组。在 iPhone、iPad 和 Mac 上，系统会为主要内容和强调内容使用白色。在 Apple Watch 上，系统会为主要内容使用白色，为强调内容使用表盘颜色。

有关开发者指南，请参阅 [widgetAccentable(_:)](https://developer.apple.com/cn/documentation/swiftui/view/widgetaccentable(_:)) 和 [Optimizing your widget for accented rendering mode and Liquid Glass](https://developer.apple.com/cn/documentation/widgetkit/optimizing-your-widget-for-accented-rendering-mode-and-liquid-glass)。

### 虚化

**提供足够对比度确保易读性**。在虚化渲染模式下，图像中像素的不透明度确定了模糊背景材质效果的强度。完全透明的像素会让背景材质原样透过。像素的亮度确定了其在锁屏上显示的虚化度。更亮的灰色值会增加对比度，更暗的灰色值会降低对比度。

**创建优化资源实现最佳虚化效果**。将图像、数字和文本等内容渲染为完全不透明。为了建立层次，为最显眼的内容使用白色或浅灰色，为二级元素使用更暗的灰度值。确认图像内容在灰度方面有足够的对比度，并使用不透明的灰度值而非白色的不透明度，从而实现最佳虚化材质效果。

## 预览和占位符

**设计逼真预览以显示在小组件库中**。高亮标记小组件的功能，并清晰表示每种小组件类型或尺寸可提供的体验，帮助用户做出明智决定。你可以在小组件预览中显示真实数据，但如果数据需要太长时间生成或加载，应转而显示逼真的模拟数据。

**设计出有助于用户识别小组件的占位符内容**。已安装的小组件会在加载数据时显示占位符内容。将静态界面组件与代表动态内容的半透明形状结合使用，从而创建有效的占位符外观。例如，使用不同宽度的矩形表示文本行，使用圆形或方形代替图形和图像。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-tips-placeholder-content@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-tips-full-content@2x.png)

**编写简洁的小组件描述**。小组件库显示的描述有助于用户理解每个小组件的用途。以操作动词作为描述开头，例如，“查看某地当前的天气状况和预报”或“跟踪临近日程和会议”。避免包括引用小组件本身的不必要短语，例如，“此小组件显示…”、“使用此小组件来…”或“添加此小组件”。使用易于接受的语言和 [sentence-style capitalization](https://support.apple.com/guide/applestyleguide/c-apsgb744e4a3/web#apdca93e113f1d64)（句子式大写）。

**将小组件的各种尺寸分组在一起，并提供单一描述**。如果为小组件提供多个尺寸，请将其分组在一起，以免用户误认为每种尺寸是一个不同的小组件。不管提供多少种尺寸，为小组件提供单一描述有助于避免重复，并帮助用户理解每种尺寸如何从稍微不同的角度呈现相同的内容和功能。

**考虑为“添加”按钮着色**。当用户在小组件库中选择你的 App 后，所提供的一组小组件下方会出现一个“添加”按钮。你可以为此按钮指定颜色，从而提醒用户注意你的品牌。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-add-button-tint-color-notes@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-add-button-tint-color-weather@2x.png)

## 平台考量因素

*无针对 macOS 的额外考量因素。在 Apple tvOS 中不受支持。*

### iOS、iPadOS

锁屏上的小组件在功能上与手表复杂功能类似，并且需要同时遵守适用于小组件和[复杂功能](complications.md)的设计原则。在锁屏小组件中提供有用的信息，不要仅将小组件视为用户启动进入 App 的另一种方法。在很多情况下，复杂功能的设计也适用于锁屏小组件（反之亦然），因此请考虑协同创建二者。

你的 App 可以在锁屏上提供三种不同形状的小组件：显示在时钟上方的内联文本以及显示在时钟下方的圆形和矩形。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widget-lock-screen-display-appearances@2x.png)

**支持 iPhone 上的全天候显示屏**。配备全天候显示屏的设备以降低的亮度渲染锁屏小组件。使用在全天候显示屏中提供足够对比度的灰色色阶，并确保内容保持清晰可见。

有关开发者指南，请参阅 [Creating accessory widgets and watch complications](https://developer.apple.com/cn/documentation/widgetkit/creating-accessory-widgets-and-watch-complications)。

**提供实时活动来显示实时更新**。小组件不会实时显示信息。如果你的 App 可让用户跟踪频繁更新的限时任务或事件的进度，请考虑提供实时活动。小组件和实时活动使用相同的底层框架和相似的设计。因此，相继开发小组件和实时活动并为这两种功能重复使用代码和设计组件可能是个好办法。有关实时活动的设计指南，请参阅[实时活动](live-activities.md)；有关开发者指南，请参阅 [ActivityKit](https://developer.apple.com/cn/documentation/activitykit)。

#### 待机显示和 CarPlay 车载

在处于待机显示的 iPhone 上，系统会并排显示两个小尺寸系统自带小组件，并放大以填充锁屏。通过支持待机显示，你还可确保小组件在 CarPlay 车载中能正常使用。CarPlay 车载和待机显示小组件均使用已移除背景的小尺寸系统自带小组件，且放大以尽量适合“小组件”屏幕上的网格。在 CarPlay 车载中，为使小组件在车载显示屏上易于阅读，简洁明了的信息和大字体尤为重要。

**限制在待机显示下使用丰富的图像或颜色传达含义**。而应通过放大和重新排列文本来利用额外空间，让用户可从较远距离一览小组件内容。若要无缝融入黑色背景，请不要为待机显示下出现的小组件使用背景颜色。

**正确用法**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-standby-removed-background-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

**错误用法**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-standby-with-background-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

有关开发者指南，请参阅 [Displaying the right widget background](https://developer.apple.com/cn/documentation/widgetkit/displaying-the-right-widget-background)。

在弱光条件下处于待机显示的 iPhone 上，系统会使用红色调单色外观渲染小组件。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-standby-low-light@2x.png)
*弱光条件下的 iPhone*

### visionOS

visionOS 中的小组件是由用户放置在水平或垂直表面上的 3D 对象。用户在表面上放置的小组件会保持在该位置，即使用户将 Apple Vision Pro 关机再重启仍不变。小组件具有一致的真实世界比例。其尺寸、*安置样式*和*处理样式*会影响用户对小组件的感知。

visionOS 小组件默认以全彩显示，但当用户使用系统提供的各种调色盘中的色调个性化小组件时，小组件会以强调渲染模式显示。此外，用户可为使用抬高式安置样式的小组件自定义边框宽度，还可使用小组件特有的自定义选项。例如，visionOS 不提供针对系统全局的浅色或深色外观，但“音乐”海报小组件提供了专属的自定义选项，可让用户选取 App 从所显示专辑插图生成的浅色和深色主题。

有关开发者指南，请参阅 [Updating your widgets for visionOS](https://developer.apple.com/cn/documentation/widgetkit/updating-your-widgets-for-visionos)。

**根据 Apple Vision Pro 提供的空间体验调整设计和内容**。在 visionOS 中，小组件不会凭空悬浮，而是成为客厅、厨房、办公室等环境的一部分。将现有小组件迁移至 visionOS 或从头设计小组件时，应尽早考虑这一点，并将小组件视为用户四周的一部分。例如，“音乐”小组件会适配海报感外观，所使用的大字体和高分辨率图像使其在整个房间中可一目了然，而生产力 App 则可能会提供可轻松放置在桌面上的小尺寸小组件。

**使用所有系统调色盘并在不同光线条件下测试小组件**。确保小组件保持一致且称心的色调、对比度和易读性。如果你选择不给用户界面元素上色，请使用提供的每种色调调色盘测试小组件，确保未上色元素在用户使用各种色调自定义小组件后仍保持清晰易读。

#### 阈值和尺寸

Apple Vision Pro 上的小组件可根据用户远近进行调整，visionOS 为小组件设计提供了两种关键阈值：在用户从远距离查看小组件时适用的 [simplified](https://developer.apple.com/cn/documentation/widgetkit/levelofdetail/simplified) 阈值，以及在用户从近距离查看小组件时适用的 [default](https://developer.apple.com/cn/documentation/widgetkit/levelofdetail/default) 阈值。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-extra-large-portrait-far-proximity@2x.png)
*远距离查看*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/widgets-extra-large-portrait-close-proximity@2x.png)
*近距离查看*

由于小组件可出现在用户的整个环境中，使小组件尺寸匹配其所含内容类型，并注意其在各种距离下的显示效果也很重要。

**设计可针对两种阈值分别显示适当细节的响应式布局**。在用户从远距离查看小组件时，显示展示较少细节且使用较大字体字号的简化版小组件，同时移除按钮或切换等交互式元素。在用户从近距离查看小组件时，则展示较多细节并使用较小字体字号。为了打造流畅且一致的体验并使布局看起来连贯，请保留两种距离阈值之间的共享元素。

**提供多种适合用户四周的小组件自带尺寸**。小组件会映射为真实世界尺寸，还会持续存在于用户的空间环境中。考虑用户可能会将小组件放置在何处（例如安到墙上、放在餐柜上或紧挨着工作区域），然后选取适合该环境的小组件自带尺寸。例如，提供小尺寸的系统小组件，让用户可将其内容放置在书桌上。或者提供特大尺寸的小组件，让用户可使用视觉效果丰富的内容（如插图或照片）装饰四周。

**以在不同距离下均可保持清晰易读的方式显示内容**。为了让小组件看起来称心并与其放置位置相称，用户可能会将小组件尺寸在 75% 到 125% 之间缩放。运用印刷设计原理（如清晰的层次、醒目的字体排印和缩放），确保内容保持简洁明了。使用放大至各种尺寸仍可保持美观的高分辨率资源。

#### 安置样式

小组件在表面上的显示方式对用户的感知起着重要的作用。为了让小组件看起来称心并融入四周，用户会将小组件以不同安置样式放置在表面上。

- **[Elevated](https://developer.apple.com/cn/documentation/widgetkit/widgetmountingstyle/elevated)（抬高）式**。  在水平表面上（例如书桌），小组件始终看起来高于表面并稍微向后倾斜，从而形成细微角度提高可读性，同时会在表面上投射柔和的阴影，使其具有真实感。在垂直表面上（例如墙面），小组件看起来高于表面并平齐于表面放置，与挂画框类似。
- **[Recessed](https://developer.apple.com/cn/documentation/widgetkit/widgetmountingstyle/recessed)（嵌入）式**。在垂直表面上（例如墙面），小组件看起来嵌于表面，其内容陷入表面中，从而形成深度效果，制造出表面有凹陷的错觉。水平表面上则无法使用嵌入式安置样式。

由于抬高式安置样式适用于水平和垂直表面，小组件默认会使用该样式。

**根据内容和想要打造的体验选取适合的安置样式**。visionOS 小组件默认使用抬高式安置样式，这十分适合于需要突出显示和有存在感的内容，如提醒事项、媒体或可一目了然的数据。嵌入式小组件则适用于沉浸式或贴合环境的内容，如天气或编辑内容，且用户只能将其放置在垂直表面上。你可为每个小组件选择停用不适合的样式。如果选择仅支持嵌入式安置样式，用户会无法将小组件放置在水平表面上。例如，对于某天气 App，其大尺寸和特大尺寸的系统自带小组件可能仅支持嵌入式安置样式，制造出从窗户向外看的视觉效果，而其小尺寸的系统自带小组件仅支持抬高式安置样式。

> **开发者注释**
>
> 使用 [WidgetConfiguration](https://developer.apple.com/cn/documentation/swiftui/widgetconfiguration) 的 [supportedMountingStyles(_:)](https://developer.apple.com/cn/documentation/swiftui/widgetconfiguration/supportedmountingstyles(_:)) 属性表明配置中包含的所有小组件所支持的安置样式：抬高式或/和嵌入式。提供小组件时，若要让其中一个小组件仅支持一种安置样式，并让其余小组件同时支持两种安置样式，请创建单独的小组件配置。例如，为仅支持嵌入式安置样式的小组件创建一个小组件配置，并为同时支持两种安置样式的小组件创建另一个配置。

**使用系统提供的每种边框宽度测试抬高式小组件的设计**。用户可为使用抬高式安置样式的小组件选取不同的系统定义边框宽度。你无法基于用户所选边框宽度更改布局，因此应确保小组件布局在每种边框宽度下都可保持视觉平衡。

#### 处理样式

除了尺寸和安置样式外，系统还会为 visionOS 小组件应用两种处理样式中的一种。为小组件选取合适的处理方式有助于增强你想要打造的体验。

- [paper](https://developer.apple.com/cn/documentation/widgetkit/widgettexture/paper) 样式可打造更真实可靠的印刷感风格，使小组件仿佛融入四周。当光线条件发生变化时，使用纸张样式的小组件会随之变暗或变亮。
- [glass](https://developer.apple.com/cn/documentation/widgetkit/widgettexture/glass) 样式可打造更明亮的层次感外观，为前景和背景元素间添加深度和视觉分离效果，从而强调清晰度和对比度。前景元素始终保持明亮易读，即使环境光发生变化，也不会变暗或变亮。

**选取纸张样式来打造看似房间中真实物体的印刷感外观**。整个小组件都会响应环境光并自然融入四周。例如，“音乐”海报小组件使用纸张样式在墙上显示专辑和播放列表，像展示带画框的艺术作品一样。

**选取玻璃样式用于多信息小组件**。玻璃会从视觉上分离前景和背景元素，让你可决定界面的哪些部分要适应四周，哪些部分要在视觉上保持一致。前景元素以全彩显示，且不受环境光影响，确保重要内容保持清晰易读。例如，“新闻”小组件在背景中以柔和的印刷感外观显示编辑图像。其标题保持在前景，清晰易读。

### watchOS

**提供可传达含义的彩色背景**。智能叠放中的小组件默认使用黑色背景。请考虑使用提供额外含义的自定义背景颜色。例如，“股市” App 使用红色背景表示股价上涨，绿色背景表示股价下跌。

**鼓励系统在智能叠放中显示 watchOS 小组件或提升其显示位置**。相关性信息可帮助系统在用户最需要时显示你的小组件。相关性可以基于位置或特定于进行中的系统操作，例如体能训练。有关开发者指南，请参阅 [RelevanceKit](https://developer.apple.com/cn/documentation/relevancekit)。

## 规范

设计小组件时，请使用以下值作为指导。

### iOS 尺寸

| 屏幕尺寸（竖排，点） | 小（点） | 中（点） | 大（点） | 圆形（点） | 矩形（点） | 内联（点） |
| --- | --- | --- | --- | --- | --- | --- |
| 430×932 | 170x170 | 364x170 | 364x382 | 76x76 | 172x76 | 257x26 |
| 428x926 | 170x170 | 364x170 | 364x382 | 76x76 | 172x76 | 257x26 |
| 414x896 | 169x169 | 360x169 | 360x379 | 76x76 | 160x72 | 248x26 |
| 414x736 | 159x159 | 348x157 | 348x357 | 76x76 | 170x76 | 248x26 |
| 393x852 | 158x158 | 338x158 | 338x354 | 72x72 | 160x72 | 234x26 |
| 390x844 | 158x158 | 338x158 | 338x354 | 72x72 | 160x72 | 234x26 |
| 375x812 | 155x155 | 329x155 | 329x345 | 72x72 | 157x72 | 225x26 |
| 375x667 | 148x148 | 321x148 | 321x324 | 68x68 | 153x68 | 225x26 |
| 360x780 | 155x155 | 329x155 | 329x345 | 72x72 | 157x72 | 225x26 |
| 320x568 | 141x141 | 292x141 | 292x311 | 无 | 无 | 无 |

### iPadOS 尺寸

| 屏幕尺寸（竖排，点） | 目标 | 小（点） | 中（点） | 大（点） | 特大（点） |
| --- | --- | --- | --- | --- | --- |
| 768x1024 | 画布 | 141x141 | 305.5x141 | 305.5x305.5 | 634.5x305.5 |
|  | 设备 | 120x120 | 260x120 | 260x260 | 540x260 |
| 744x1133 | 画布 | 141x141 | 305.5x141 | 305.5x305.5 | 634.5x305.5 |
|  | 设备 | 120x120 | 260x120 | 260x260 | 540x260 |
| 810x1080 | 画布 | 146x146 | 320.5x146 | 320.5x320.5 | 669x320.5 |
|  | 设备 | 124x124 | 272x124 | 272x272 | 568x272 |
| 820x1180 | 画布 | 155x155 | 342x155 | 342x342 | 715.5x342 |
|  | 设备 | 136x136 | 300x136 | 300x300 | 628x300 |
| 834x1112 | 画布 | 150x150 | 327.5x150 | 327.5x327.5 | 682x327.5 |
|  | 设备 | 132x132 | 288x132 | 288x288 | 600x288 |
| 834x1194 | 画布 | 155x155 | 342x155 | 342x342 | 715.5x342 |
|  | 设备 | 136x136 | 300x136 | 300x300 | 628x300 |
| 954x1373 * | 画布 | 162x162 | 350x162 | 350x350 | 726x350 |
|  | 设备 | 162x162 | 350x162 | 350x350 | 726x350 |
| 970x1389 * | 画布 | 162x162 | 350x162 | 350x350 | 726x350 |
|  | 设备 | 162x162 | 350x162 | 350x350 | 726x350 |
| 1024x1366 | 画布 | 170x170 | 378.5x170 | 378.5x378.5 | 795x378.5 |
|  | 设备 | 160x160 | 356x160 | 356x356 | 748x356 |
| 1192x1590 * | 画布 | 188x188 | 412x188 | 412x412 | 860x412 |
|  | 设备 | 188x188 | 412x188 | 412x412 | 860x412 |

* “缩放显示”设为“更多空间”时。

### visionOS 尺寸

| 小组件 | 尺寸（点） | 尺寸（毫米；100% 比例） |
| --- | --- | --- |
| 小 | 158x158 | 268x268 |
| 中 | 338x158 | 574x268 |
| 大 | 338x354 | 574x600 |
| 特大 | 450x338 | 763x574 |
| 特大（竖排） | 338x450 | 574x763 |

### watchOS 尺寸

| Apple Watch 尺寸 | 智能叠放中小组件的大小（点） |
| --- | --- |
| 40 毫米 | 152x69.5 |
| 41 毫米 | 165x72.5 |
| 44 毫米 | 173x76.5 |
| 45 毫米 | 184x80.5 |
| 49 毫米 | 191x81.5 |

## 资源

#### 相关内容

[布局](layout.md)

#### 开发者文档

[WidgetKit](https://developer.apple.com/cn/documentation/widgetkit)

[Developing a WidgetKit strategy](https://developer.apple.com/cn/documentation/widgetkit/developing-a-widgetkit-strategy) — WidgetKit

#### 视频

- [WidgetKit 基础知识](https://developer.apple.com/cn/videos/play/wwdc2026/277)
- [小组件的新功能](https://developer.apple.com/cn/videos/play/wwdc2025/278)
- [针对 visionOS 设计小组件](https://developer.apple.com/cn/videos/play/wwdc2025/255)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 12 月 16 日 | 更新了适用于所有平台的指南，新增了适用于 visionOS 和 CarPlay 车载的指南。 |
| 2025 年 1 月 17 日 | 改正了 watchOS 小组件尺寸。 |
| 2024 年 6 月 10 日 | 更新以包括针对 iOS 18 和 iPadOS 18 中强调色小组件的指南。 |
| 2023 年 6 月 5 日 | 更新指南以包括 watchOS 小组件、iPad 锁屏小组件，以及针对 iOS 17、iPadOS 17 和 macOS 14 的更新。 |
| 2022 年 11 月 3 日 | 新增关于 iPhone 锁屏上小组件的指南，并更新了 iPhone 14、iPhone 14 Pro 和 iPhone 14 Pro Max 的设计综合资源。 |
