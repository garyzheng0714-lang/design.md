# 实时活动

原文：https://developer.apple.com/cn/design/human-interface-guidelines/live-activities

实时活动可让用户一目了然地跟踪活动、事件或任务的进度。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-live-activities-intro@2x.png)

实时活动可让用户在各设备的醒目位置跟踪任务和事件。  不仅仅局限于推送通知，实时活动会在数小时内频繁更新内容和状态，并可让用户与显示的信息交互。

例如，实时活动可能显示外卖订单的剩余送达时间、足球比赛的实时赛况信息，或者实时健身指标和可暂停或取消体能训练的交互式控制。

实时活动在 iPhone 或 iPad 上启动，并自动显示在用户设备间的各个系统位置：

| 平台或系统体验 | 位置 |
| --- | --- |
| iPhone 和 iPad | 锁屏、主屏幕、iPhone 上的灵动岛和待机显示中 |
| Mac | 菜单栏 |
| Apple Watch | 智能叠放 |
| CarPlay 车载 | CarPlay 车载仪表盘 |

## 剖析

实时活动显示在系统的不同位置，例如*灵动岛*和锁屏。它是提醒和进行中活动指示符集中显示的大本营。系统会选取*展示区*样式或各种样式组合来构成实时活动的外观，具体取决于设备和实时活动显示的系统位置。因此，实时活动必须支持：

- [紧凑式](live-activities.md#Compact)
- [极简式](live-activities.md#Minimal)
- [扩展式](live-activities.md#Expanded)
- [锁屏](live-activities.md#Lock-Screen)

在 iOS 和 iPadOS 中，实时活动会使用这些展示区贯穿整个系统显示。此外，系统会使用这些展示区为其他环境创建默认外观。例如，紧凑式展示区显示在 iPhone 上的灵动岛中，其中包含的两个元素会由系统合并为单个视图以显示在 Apple Watch 和 CarPlay 车载中。

### 紧凑式

在灵动岛中，如果只有一个活跃的实时活动，系统会使用紧凑式展示区。展示区由两个单独的元素组成：一个位于原深感摄像头的前端，另一个位于后端。虽然空间有限，但紧凑式展示区会显示 App 实时活动有关的最新信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/type-compact@2x.png)

有关设计指南，请参阅[紧凑式展示区](live-activities.md#Compact-presentation)。

### 极简式

有多个活跃的实时活动时，系统会使用极简式展示区在灵动岛中显示其中的两个实时活动。一个看起来与灵动岛相连，另一个则看起来分离。分离的极简式展示区会显示为圆形或椭圆形，具体取决于其内容大小。和紧凑式展示区一样，用户可轻点极简式展示区打开其 App 或者按住以查看扩展式展示区。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/type-minimal@2x.png)

有关设计指南，请参阅[极简式展示区](live-activities.md#Minimal-presentation)。

### 扩展式

用户按住紧凑式或极简式展示区中的实时活动时，系统会显示扩展式展示区。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/type-expanded@2x.png)

有关设计指南，请参阅[扩展式展示区](live-activities.md#Expanded-presentation)。

### 锁屏

系统会使用锁屏展示区在锁屏底部显示横幅。在此展示区中，使用与扩展式展示区类似的布局。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activity-lock-screen@2x.png)

在不支持灵动岛的设备上提醒用户有关实时活动更新时，锁屏展示区会以横幅形式短暂显示，覆盖在主屏幕或其他 App 之上。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activity-notch@2x.png)

有关设计指南，请参阅[锁屏展示区](live-activities.md#Lock-Screen-presentation)。

### 待机显示

在 iPhone 待机显示下，实时活动会显示在极简式展示区中。用户轻点时，实时活动会过渡到锁屏展示区并放大 2 倍填充整个屏幕。如果锁屏展示区使用自定义背景颜色，系统会自动将其延伸至整个屏幕，从而形成无缝的全屏设计。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activity-standby-default-outline@2x.png)

有关设计指南，请参阅[待机显示展示区](live-activities.md#StandBy-presentation)。

## 最佳实践

**为已定义开始和结束的任务和事件提供实时活动**。实时活动最适用于跟踪不超过八小时的短时长至中等时长活动。

**聚焦于用户需要一眼便能看到的重要信息**。实时活动不必显示所有内容。思考哪种信息对用户最有用，并优先通过简明方式共享。用户想要进一步了解时，可以轻点实时活动打开 App 并查看你在其中提供的额外详细信息。

**请勿使用实时活动显示广告或推广信息**。实时活动有助于用户随时掌握进行中的事件和任务，因此仅显示有关这些事件和任务的信息非常重要。

**避免显示敏感信息**。实时活动非常醒目，可能被旁人偶然看到，例如在锁屏上或全天候显示屏中。对于用户可能觉得敏感或私密的内容，请显示无害的摘要并让用户轻点实时活动在 App 中查看敏感信息。或者，编校可能包含敏感信息的视图并让用户配置是否显示敏感数据。有关开发者指南，请参阅 [Creating a widget extension](https://developer.apple.com/cn/documentation/widgetkit/creating-a-widget-extension)。

**创建在深色和浅色外观下与 App 的视觉审美和特性适配的实时活动**。这可让用户更容易识别实时活动并搭建与 App 之间的视觉连接。

**如果包括标志，请在不使用容器的情况下显示该标志**。这可让标志与实时活动布局更好融合。请勿使用整个 App 图标。

**不要在 App 中添加引起对灵动岛关注的元素**。当你的 App 未使用时，其实时活动会显示在灵动岛中，而当 App 打开时，其他项目可能会显示在灵动岛中。

**确保文本易读**。使用中等粗细或更粗的大号较粗文本。谨慎使用小号文本并确保关键信息一目了然。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-text-incorrect-size@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-text-correct-size@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

### 创建实时活动布局

**适配不同的屏幕尺寸和展示区**。实时活动会缩放以适配各种设备屏幕。针对各种设备和缩放系数创建布局和资源，意识到屏幕上的实际大小可能会各不相同或发生变化。使用[规范](live-activities.md#Specifications)中的值作为指南并提供相应大小的内容，确保其在各处均看起来美观。

**调整元素大小和摆放位置，有效利用空间**。创建的布局应仅使用清晰呈现其内容所需的空间大小。调整实时活动中元素的大小和摆放位置，让其完美适配。

**为自定义视图和布局使用用户熟悉的布局**。请参阅 [Apple 设计资源](https://developer.apple.com/design/resources/)来获取采用默认系统外边距和建议文本字号的模板。使用这些模板有助于让实时活动一目了然并与其四周的视觉语言协调一致，例如 Apple Watch 上的智能叠放。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-margins@2x.png)

**使用一致的外边距和同心摆放方式**。在圆角形状和实时活动的边缘（包括圆角）之间使用均匀、匹配的外边距以确保外观协调。这可防止元素侵入实时活动的圆角形状并形成视觉冲突感。例如，将圆角矩形放在实时活动的圆角附近时，通过减去外边距和使用 SwiftUI 容器应用正确的圆角半径，从而使其圆角半径匹配实时活动的外圆角半径。有关开发者指南，请参阅 [ContainerRelativeShape](https://developer.apple.com/cn/documentation/swiftui/containerrelativeshape)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-rounded-shapes@2x.png)

确保内容紧凑并紧贴到与实时活动外边缘同心的外边距内侧。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-content-incorrect-position@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-content-correct-position@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

**分隔内容块时，将内容块放在嵌入式容器形状中或使用粗线条**。不要将内容一直绘制到灵动岛的边缘。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-separating-content-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-separating-content-pill@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-separating-content-separator@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

> **提示**
>
> 若要对齐实时活动视图圆角中的非圆角内容，模糊化绘制工具中的非圆角内容可能有所帮助。内容模糊化后，可能更容易找到与视图外周完美对齐的位置。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-blur-content-incorrect-position@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-blur-content-correct-position@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

**动态更改锁屏上或扩展式展示区中实时活动的高度**。显示更少的信息量时，请降低实时活动的高度以仅使用该内容所需的空间。显示的信息量增加时，请增加该高度以显示更多内容。例如，叫车 App 在寻找司机时可能显示不包含额外详细信息的更紧凑实时活动。当更多信息可用于显示预计接客时间、司机详细信息等内容时，App 的高度会延伸。

### 选取颜色

**慎重考虑使用自定义背景颜色和不透明度**。你不能自定义紧凑式、极简式和扩展式展示区的背景颜色。但是，可以针对锁屏展示区使用自定义背景颜色。如果为锁屏展示区设定自定义背景颜色或图像，请确保对比度充足，尤其是支持低亮度全天候显示的设备上的色调。

**使用颜色表达 App 的特征和识别度**。灵动岛中的实时活动使用黑色不透明背景。考虑为文本和对象使用醒目的颜色来传达 App 的特性和品牌。醒目的颜色可让你的实时活动一眼可辨、从其他实时活动中脱颖而出，并让人感觉其是 App 简单明了的一小部分。此外，醒目的颜色有助于强调实时活动本身中元素之间的关系。

**为实时活动的关键线着色，使其与内容匹配**。背景为深色时，例如在深色模式下，灵动岛周围会显示关键线，将其与其他内容区分开来。选取与实时活动中其他元素的颜色一致的关键线颜色。有关开发者指南，请参阅 [Creating custom views for Live Activities](https://developer.apple.com/cn/documentation/activitykit/creating-custom-views-for-live-activities)。

### 添加过渡和内容更新动画

除了展开和收缩过渡外，实时活动会使用最长 2 秒钟的系统和自定义动画。请注意，系统不会在亮度较低的全天候显示屏上播放动画。

**使用动画强调你要传达的信息以及让用户注意到更新**。除了移动元素的位置外，你可以使用默认的内容替换过渡通过动画展现元素的出现和消失，或者使用缩放、不透明度和移动来创建自定义过渡。例如，体育赛事 App 可能使用数字内容过渡来展现比分变化，或者在计时器即将归零时淡入和淡出计时器。

**使用动画展现布局更改**。内容更新可能需要实时活动布局随之更改，例如在待机显示下内容扩展至填充整个屏幕或者更多信息变得可用。过渡到新布局时，采用动画展现已有元素移到新位置，而非移除元素并使用动画让其重新出现，从而尽量保留现有布局。

**尽量避免使元素重叠**。有时候，最好使用动画展现某些元素消失，然后在新位置重新出现，从而避免与过渡的其他部分冲突。例如，使用动画展现列表中的项目时，仅使用动画展现移到新位置的元素，而为其他列表项使用淡入和淡出过渡。

有关开发者指南，请参阅 [Animating data updates in widgets and Live Activities](https://developer.apple.com/cn/documentation/widgetkit/animating-data-updates-in-widgets-and-live-activities)。

### 提供交互

**确保轻点实时活动会打开 App 正确的位置**。让用户直接跳转至相关的详细信息和操作，不要让其导览才能找到相关信息。有关支持深度链接至特定屏幕的 SwiftUI 视图的开发者指南，请参阅 [Linking to specific app scenes from your widget or Live Activity](https://developer.apple.com/cn/documentation/widgetkit/linking-to-specific-app-scenes-from-your-widget-or-live-activity)。

**聚焦于简单、直接的操作**。按钮或开关会占据原本显示有用信息的空间。仅在与实时活动直接相关且用户会激活一次或暂时暂停和继续的基本功能中包括交互式元素，例如音乐播放、体能训练或访问麦克风以录制实时音频的 App。如果提供交互，请首选将交互限制为单个元素，协助用户避免意外轻点错误的控制。

**考虑让用户响应事件或进度更新**。如果实时活动更新是用户可以响应的内容，请考虑提供按钮或开关让用户执行操作。例如，叫车 App 的实时活动可包括按钮，让用户在等待车辆到达期间联系司机。

### 启动、更新和结束实时活动

**在适当时间启动实时活动，并让用户轻松在 App 中将其关闭**。用户期望实时活动能针对手头任务或在特定时间，自动启动并提供重要更新。例如，用户可能期望实时活动在点餐、叫车或喜爱的球队比赛开始后启动。但是非预期出现的实时活动可能令用户感到惊讶，甚至讨厌。考虑提供可让用户在与活动对应的 App 视图中关闭实时活动的控制。例如，体育赛事 App 可能提供让用户取消关注赛事或球队的按钮。如果用户无法轻易从 App 控制实时活动的外观，可能会选择在“设置”中完全关闭实时活动。

**提供启动实时活动的 App 快捷指令**。App 快捷指令向系统公开功能，以便在各种情况下访问。例如，创建一个允许用户使用 iPhone 上的操作按钮启动实时活动的 App 快捷指令。有关更多信息，请参阅 [App 快捷指令](app-shortcuts.md)。

**仅在新内容可用时更新实时活动**。如果底层内容或状态并未更改，请保持相同的显示，直至底层内容或状态发生更改。

**仅在重要更新需要关注时才提醒用户**。实时活动提醒会点亮屏幕，并默认播放通知声音以提醒用户不应错过的更新。同时提醒会在灵动岛中显示扩展式展示区，或者在不支持灵动岛的设备上显示横幅。为确保实时活动发挥最大价值，请避免过于频繁或就非关键更新提醒用户，且不要为同一更新同时使用推送通知和实时活动。

**让用户通过单个实时活动高效跟踪多个事件**。相对于创建用户需要在之间跳转才能跟踪不同事件的单独实时活动，应首选创建使用动态布局并交替显示事件的单个实时活动。例如，体育赛事 App 可提供单个实时活动，循环显示多场比赛的得分、换人和犯规情况。

**始终在任务或事件结束后立即结束实时活动，并考虑设置自定义关闭时间**。实时活动结束后，系统会立即将其从灵动岛和 CarPlay 车载中移除。在锁屏、Mac 菜单栏和 watchOS 智能叠放中，实时活动会保留最长四小时。显示摘要可能仅在实时活动结束后的短时间内相关，具体取决于实时活动。考虑选取与实时活动的时长相称的自定义关闭时间。大多数情况下，15 到 30 分钟就已足够。例如，叫车 App 可在行程完结后结束其实时活动并继续显示 30 分钟，允许用户查看行程摘要和打赏司机。有关开发者指南，请参阅 [Displaying live data with Live Activities](https://developer.apple.com/cn/documentation/activitykit/displaying-live-data-with-live-activities)。

## 展示区

实时活动需要支持所有位置、设备及其对应的外观。因为实时活动以不同尺寸显示在各系统中，因此请创建完美支持各显示位置的实时活动布局。

**从 iPhone 设计入手，然后为其他环境优化**。首先为每个展示区创建标准设计，然后基于实时活动提供的功能，为 iPhone 待机显示、CarPlay 车载或 Apple Watch 等特定环境设计额外的自定义布局。有关自定义布局的更多信息，请参阅[待机显示](live-activities.md#StandBy)、[CarPlay 车载](live-activities.md#CarPlay)和 [watchOS](live-activities.md#watchOS)。

### 紧凑式展示区

**聚焦于最重要的信息**。使用紧凑式展示区显示对实时活动至关重要且易于理解的最新动态信息。例如，体育赛事 App 可显示两支球队的标志和比分。

**确保在灵动岛的紧凑式展示区中使用统一的信息和设计**。虽然原深感摄像头将前端和后端元素分隔开来，但请将其设计为传达单条信息，并使用一致的颜色和字体排印以协助在这两个元素之间形成关联。

**尽量压缩内容的宽度并确保其贴近原深感摄像头**。尽量不要遮挡状态栏中的关键信息，且不要在内容和原深感摄像头之间添加内边距。为前端和后端元素使用大小类似的视图来维持布局平衡，例如使用缩写单位或精确度较低的数据来保持相应的宽度和平衡。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-unbalanced-content@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-balanced-content@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

**链接至相关 App 内容**。用户轻点紧凑式实时活动时，直接在 App 中打开相关详细信息。确保前端和后端元素均链接至相同屏幕。

### 极简式展示区

**确保实时活动在极简式展示区中易于识别**。尽量显示更新信息而非仅呈现标志，同时确保用户能够快速识别出你的 App。例如，计时器 App 的实时活动极简式展示区显示剩余时间，而非使用静态图标。

### 扩展式展示区

**维持元素的相对摆放位置，在展示区之间形成连贯的布局**。扩展式展示区是紧凑式或极简式展示区的扩大版本。确保实时活动扩展时，对应信息和布局按预期扩展。

**在原深感摄像头周围紧凑绕排内容**。将内容放在靠近原深感摄像头的位置，并尽量避免在其四周留出太多空间，从而更高效使用空间并有助于削弱摄像头的存在感。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-layout-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-layout-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

### 锁屏展示区

**不要复制通知布局**。为实时活动中显示的信息创建特定的唯一布局。

**选取适合个性化锁屏的颜色**。用户会使用墙纸、自定义色调和小组件来个性化其锁屏。若要让实时活动契合自定义锁屏的美感并且保持可读性，请谨慎使用自定义背景或色调和不透明度。

**确保你的设计、资源和颜色在深色模式和全天候显示屏上看起来美观并提供足够的对比度**。锁屏上的实时活动默认在浅色外观下使用浅色背景颜色，在深色外观下使用深色背景颜色。如果使用自定义背景颜色，请选取完美适配这两种模式的颜色或者为每种外观选取不同颜色。在亮度降低的全天候显示屏设备上验证你的选择，因为系统会在这种外观下按需对颜色进行调整。有关指南，请参阅[深色模式](dark-mode.md)和[全天候显示](always-on.md)；有关开发者指南，请参阅 [About asset catalogs](https://help.apple.com/xcode/mac/current/#/dev10510b1f7)。

**验证关闭按钮的生成颜色**。系统会基于实时活动的背景和前景颜色自动生成匹配的关闭按钮。  验证生成的颜色是否与设计相配并根据需要使用 [activitySystemActionForegroundColor(_:)](https://developer.apple.com/cn/documentation/swiftui/view/activitysystemactionforegroundcolor(_:)) 进行调整。

**使用标准外边距将设计与通知对齐**。锁屏上实时活动的标准布局外边距为 14 点。对于图形或按钮等元素，更窄的外边距可能比较合适，但要避免挤到边缘和造成外观杂乱。有关开发者指南，请参阅 [padding(_:_:)](https://developer.apple.com/cn/documentation/swiftui/view/padding(_:_:))。

### 待机显示展示区

**为待机显示更新布局**。确保资源在放大比例下看起来美观，并考虑创建可利用额外空间的自定义布局。有关开发者指南，请参阅 [Creating custom views for Live Activities](https://developer.apple.com/cn/documentation/activitykit/creating-custom-views-for-live-activities)。

**考虑在待机显示下使用默认背景颜色**。默认背景颜色可将实时活动无缝融入设备边框，形成与用户四周融合的更柔和外观，并允许系统稍微放大实时活动，因为其无需考虑原深感摄像头周围的外边距。

**使用标准外边距并避免将图形元素延伸至屏幕边缘**。如果不使用标准外边距，内容会在实时活动延伸时被截断，从而造成损坏感。

**在夜间模式下验证你的设计**。在夜间模式下，系统会为实时活动应用红色色调。请检查实时活动设计所使用的颜色在夜间模式下可提供足够的对比度。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activity-standby-night-mode@2x.png)

## CarPlay 车载

在 CarPlay 车载中，系统会自动将紧凑式展示区的前端和后端元素合并入单个布局，以便显示在 CarPlay 车载仪表盘中。

实时活动设计会同时应用于 CarPlay 车载和 Apple Watch，因此请针对这两种环境设计。Apple Watch 上的实时活动可进行交互，而在 CarPlay 车载中系统会取消激活交互式元素。有关更多信息，请参阅下述的 [watchOS](live-activities.md#watchOS)。有关开发者指南，请参阅 [Creating custom views for Live Activities](https://developer.apple.com/cn/documentation/activitykit/creating-custom-views-for-live-activities)。

**如果使用更大字体或显示额外信息对实时活动有益，请考虑创建自定义布局**。声明支持 [ActivityFamily.small](https://developer.apple.com/cn/documentation/widgetkit/activityfamily/small) 补充活动系列，而非在 CarPlay 车载中使用默认外观。

**慎重考虑在自定义布局中包括按钮或开关**。在 CarPlay 车载中，系统会取消激活实时活动中的交互式元素。如果用户有可能在驾驶期间启动或查看实时活动，请首选显示适时内容，而非按钮和开关。

## 平台考量因素

*无针对 iOS 或 iPadOS 的额外考量因素。在 Apple tvOS 或 visionOS 中不受支持。*

### macOS

活跃的实时活动会使用紧凑式、极简式和扩展式展示区自动显示在配对 Mac 的菜单栏中。点按“实时活动”会启动 iPhone 镜像以显示你的 App。

### watchOS

实时活动在 iPhone 上启动后，它会显示在配对 Apple Watch 智能叠放的顶部。智能叠放中显示的视图默认会结合 iPhone 上实时活动紧凑式展示区中的前端和后端元素。

如果提供 watchOS App，用户轻点智能叠放中的实时活动会打开 watchOS App。如果不提供 watchOS App，轻点会打开全屏幕视图，其中包含在配对 iPhone 上打开 App 的按钮。

**考虑创建自定义 watchOS 布局**。虽然系统会自动提供默认视图，但专门为 Apple Watch 设计的自定义布局可显示更多信息，并增加按钮或开关等交互式功能。

**慎重考虑在自定义布局中包括按钮或开关**。自定义 watchOS 布局还会应用于 CarPlay 车载中的实时活动，系统会在后者中取消激活交互式元素。如果用户有可能在驾驶期间启动或查看实时活动，请不要在自定义 watchOS 布局中包括按钮或开关。有关开发者指南，请参阅 [Creating custom views for Live Activities](https://developer.apple.com/cn/documentation/activitykit/creating-custom-views-for-live-activities)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activities-ios-dynamic-island-default@2x.png)
*iPhone 紧凑视图*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activity-watch-default-implementation@2x.png)
*默认智能叠放视图*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-activity-watch-custom-implementation@2x.png)
*自定义智能叠放视图*

**聚焦于基本信息和重大更新**。尽量高效使用智能叠放中的空间，并思考实时活动可传达的最有用信息：

- 进度，例如外卖的预计送达时间
- 交互式元素，例如秒表或计时器控制
- 重大更新，例如体育赛事比分更新

## 规范

设计实时活动时，请使用以下值作为指南。

### CarPlay 车载尺寸

系统可能会缩放实时活动以完美适配车辆的屏幕大小和分辨率。使用所列值验证你的设计：

| 实时活动大小（点） |
| --- |
| 240x78 |
| 240x100 |
| 170x78 |

使用 CarPlay 车载模拟器测试你的设计以及“智能缩放显示”（在 CarPlay 车载的“设置”>“显示”中可用）的下列配置：

| 配置 | 分辨率（点） |
| --- | --- |
| 宽屏 | 1920x720 |
| 竖排 | 900x1200 |
| 标准 | 800x480 |

### iOS 尺寸

下表所列值的单位均为点。

| 屏幕尺寸（竖排） | 紧凑式前端 | 紧凑式后端 | 极简式（给定宽度范围） | 扩展式（给定高度范围） | 锁屏（给定高度范围） |
| --- | --- | --- | --- | --- | --- |
| 430x932 | 62.33x36.67 | 62.33x36.67 | 36.67–45x36.67 | 408x84-160 | 408x84-160 |
| 393x852 | 52.33x36.67 | 52.33x36.67 | 36.67–45x36.67 | 371x84-160 | 371x84-160 |

灵动岛使用 44 点的圆角半径，并且其圆角形状与原深感摄像头相符。

| 展示区类型 | 设备 | 灵动岛宽度（点） |
| --- | --- | --- |
| 紧凑式或极简式 | iPhone 17 Pro Max | 250 |
|  | iPhone 17 Pro | 230 |
|  | iPhone Air | 250 |
|  | iPhone 17 | 230 |
|  | iPhone 16 Pro Max | 250 |
|  | iPhone 16 Pro | 230 |
|  | iPhone 16 Plus | 250 |
|  | iPhone 16 | 230 |
|  | iPhone 15 Pro Max | 250 |
|  | iPhone 15 Pro | 230 |
|  | iPhone 15 Plus | 250 |
|  | iPhone 15 | 230 |
|  | iPhone 14 Pro Max | 250 |
|  | iPhone 14 Pro | 230 |
| 扩展式 | iPhone 17 Pro Max | 408 |
|  | iPhone 17 Pro | 371 |
|  | iPhone Air | 408 |
|  | iPhone 17 | 371 |
|  | iPhone 16 Pro Max | 408 |
|  | iPhone 16 Pro | 371 |
|  | iPhone 16 Plus | 408 |
|  | iPhone 16 | 371 |
|  | iPhone 15 Pro Max | 408 |
|  | iPhone 15 Pro | 371 |
|  | iPhone 15 Plus | 408 |
|  | iPhone 15 | 371 |
|  | iPhone 14 Pro Max | 408 |
|  | iPhone 14 Pro | 371 |

### iPadOS 尺寸

下表所列值的单位均为点。

| 屏幕尺寸（竖排） | 锁屏（给定高度范围） |
| --- | --- |
| 1366x1024 | 500x84-160 |
| 1194x834 | 425x84-160 |
| 1012x834 | 425x84-160 |
| 1080x810 | 425x84-160 |
| 1024x768 | 425x84-160 |

### macOS 尺寸

使用提供的 iOS 尺寸。

### watchOS 尺寸

智能叠放中的实时活动使用与 watchOS 小组件相同的尺寸。

| Apple Watch 尺寸 | 智能叠放中实时活动的大小（点） |
| --- | --- |
| 40 毫米 | 152x69.5 |
| 41 毫米 | 165x72.5 |
| 44 毫米 | 173x76.5 |
| 45 毫米 | 184x80.5 |
| 49 毫米 | 191x81.5 |

## 资源

#### 开发者文档

[ActivityKit](https://developer.apple.com/cn/documentation/activitykit)

[SwiftUI](https://developer.apple.com/cn/documentation/swiftui)

[WidgetKit](https://developer.apple.com/cn/documentation/widgetkit)

[Developing a WidgetKit strategy](https://developer.apple.com/cn/documentation/widgetkit/developing-a-widgetkit-strategy) — WidgetKit

#### 视频

- [实时活动基础知识](https://developer.apple.com/cn/videos/play/wwdc2026/223)
- [针对 CarPlay 车载优化你的 App](https://developer.apple.com/cn/videos/play/wwdc2025/216)
- [小组件的新功能](https://developer.apple.com/cn/videos/play/wwdc2025/278)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 12 月 16 日 | 更新了针对所有平台的指南，并增加了 macOS 和 CarPlay 车载适用的指南。 |
| 2024 年 6 月 10 日 | 新增针对 watchOS 中实时活动的指南。 |
| 2023 年 10 月 24 日 | 扩展和更新了指南，并新增了插图。 |
| 2023 年 6 月 5 日 | 更新了指南以包括 iOS 17 和 iPadOS 17 的功能。 |
| 2022 年 11 月 3 日 | 更新插图和规范。 |
| 2022 年 9 月 23 日 | 新页面。 |
