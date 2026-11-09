# 滚动视图

原文：https://developer.apple.com/cn/design/human-interface-guidelines/scroll-views

滚动视图让用户通过垂直或水平移动内容来查看超出视图边框的内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-scroll-view-intro@2x.png)

滚动视图本身没有外观，但是它可以显示通常在用户开始滚动视图内容后出现的半透明*滚动指示符*。虽然滚动指示符的外观和行为可能会因各个平台而异，但所有指示符都会提供有关滚动操作的视觉反馈。例如，在 iOS、iPadOS、macOS、visionOS 和 watchOS 中，指示符会显示当前可见内容是位于视图的开头、中间还是结尾附近。

## 最佳实践

**支持默认滚动手势和键盘快捷键**。用户习惯于系统范围内的滚动行为并期望到处都适用。如果为视图构建自定义滚动行为，确保滚动指示符使用符合用户预期的弹性行为。

**显而易见的表示内容可滚动**。滚动指示符不是一直可见，因此当内容从视图中溢出时，清晰表示需要滚动内容非常有益。例如，在视图边缘显示部分内容表示该方向有更多内容。虽然大多数用户会立即尝试滚动视图来发现是否有更多内容可用，但最好细致入微地让用户注意这一点。

**避免将滚动视图放在方向相同的另一个滚动视图内**。嵌套方向相同的滚动视图可能会产生难以控制且不可预测的界面。但是将水平滚动视图放在垂直滚动视图内（或者反之亦然）这种做法可行。

**从内容的角度考虑支持逐页滚动**。在某些情况下，用户期望每次交互按固定量的内容滚动而非持续滚动。在大多数平台上，你可以定义此类*页面*的大小（通常是视图的当前高度或宽度），并定义一次滚动一页的交互。为了协助在逐页滚动期间保持上下文清晰，你可以定义一个重叠单位，例如一行文本、一行图形或者图片的一部分，并从页面大小中减去该单位。有关开发者指南，请参阅 [PagingScrollTargetBehavior](https://developer.apple.com/cn/documentation/swiftui/pagingscrolltargetbehavior)。

**在某些情况下，自动滚动以帮助用户找到其位置**。虽然几乎所有滚动都由用户发起，但是当相关内容不在视图中时，自动滚动可能很有用，例如：

- App 执行的操作会选择当前处于隐藏状态的区域中的内容或将插入点放在其中。例如，当 App 找到用户搜索的文本时，可以滚动内容将新的所选内容显示在视图中。
- 用户开始在当前不可见的位置输入信息。例如，如果插入点位于某个页面上，而用户导航至另一个页面，那么在用户开始输入文本时，尽快滚动回插入点。
- 当用户进行选择时，指针移过视图边缘。在这种情况下，跟随指针移动的方向滚动。
- 用户选择某些内容并滚动至新的位置，然后才会处理所选内容。在这种情况下，滚动直至所选内容出现在视图中，然后执行操作。

在所有情况下，尽量只在有必要帮助用户记住环境时才自动滚动内容。例如，如果所选内容部分可见，便无需将整个所选内容滚动至视图中。

**如果支持缩放，设定合适的最大和最小缩放值**。例如，将文本一直放大到其单个字符填满屏幕，这种做法在大多数情况下并不合理。

## 滚动边缘效果

在 iOS、iPadOS 和 macOS 中，*滚动边缘效果*在[工具栏](toolbars.md)等特定界面元素及其后面的滚动内容区域之间提供了视觉分离效果。如果使用自定义工具栏且界面顶层需要提高清晰度，不妨手动添加此效果，或者将其样式从自动调整为硬样式或软样式。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/scroll-views-scroll-edge-effect-hard@2x.png)
*硬滚动边缘效果*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/scroll-views-scroll-edge-effect-soft@2x.png)
*软滚动边缘效果*

**优先采用自动滚动边缘效果样式**。可用时，使用默认的[自动](https://developer.apple.com/cn/documentation/swiftui/scrolledgeeffectstyle/automatic)样式滚动边缘效果。此样式提供了更不透明的视觉分离效果，适用于包含大量控制的顶部工具栏、在 [Liquid Glass](materials.md#Liquid-Glass) 控制之外显示的文本，以及固定表格标题。如果改为使用软滚动边缘效果样式，请全面测试你的界面，确保控制在各种语境中均保持易读性。

**仅当滚动视图在悬浮界面元素之后时，才使用滚动边缘效果**。滚动边缘效果并非装饰性效果，不会像叠层那样遮挡或变暗，其存在意义是确保控制在视觉上保持清晰可见。

**每个视图应用一个滚动边缘效果**。在 iPad 和 Mac 上的拆分视图布局中，每个面板都可以有自己的滚动边缘效果；在这种情况下，请保持其高度一致以保持对齐。

有关开发者指南，请参阅：[ScrollEdgeEffectStyle](https://developer.apple.com/cn/documentation/swiftui/scrolledgeeffectstyle)、[UIScrollEdgeEffect.Style](https://developer.apple.com/cn/documentation/uikit/uiscrolledgeeffect/style-swift.class) 和 [NSScrollEdgeEffectStyle](https://developer.apple.com/cn/documentation/appkit/nsscrolledgeeffectstyle)。

## 平台考量因素

### iOS、iPadOS

**当滚动视图处于逐页模式时，考虑显示页面控制**。[页面控制](page-controls.md)显示有多少页面、屏幕或其他内容块可用并指示当前可见的内容。例如，“天气”使用页面控制来表示用户在已保存位置间的移动。如果随滚动视图显示页面控制，请勿显示相同轴上的滚动指示符以避免控制过多而困扰用户。

### macOS

在 macOS 中，*滚动指示符*通常称为*滚动条*。

**按需在面板中使用小或迷你滚动条**。如果空间紧凑，你可以在面板中使用需要与其他窗口共存的较小滚动条。确保在此类面板中为所有控制使用相同尺寸。

### Apple tvOS

Apple tvOS 中的视图可以滚动，但不会被视为带有滚动指示符的不同对象。相反，当内容超出屏幕尺寸时，系统会自动滚动界面以保持获得焦点的项目可见。

### visionOS

在 visionOS 中，滚动指示符的尺寸较小且固定，有助于告诉用户无需大幅移动即可高效滚动。为了方便用户找到，滚动指示符始终显示在相对于窗口的可预测位置：垂直滚动时垂直居中于后缘，水平滚动时水平居中于窗口的底部边缘。

当用户朝想要滚动的方向轻扫内容时，滚动指示符会显示在窗口的边缘，以视觉方式强调用户手势的效果并提供内容当前位置和总长度的反馈。当用户注视滚动指示符并开始拖移手势时，指示符可实现慢速条使用体验，从而让用户操控滚动速度而非内容的位置。在这种使用体验中，当用户稍微改变手势时，滚动指示符会显示加速或减速刻度标记，提供的这种视觉反馈有助于用户精准控制滚动加减速幅度。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-scroll-indicator-jog-bar.mp4)

**如有必要，考虑滚动指示符的尺寸**。虽然指示符的总体尺寸较小，但它比 iOS 中的相同组件要稍微粗一些。如果内容使用紧凑外边距，请考虑增加外边距以防止滚动指示符与内容重叠。

#### 注视滚动

在支持“注视滚动”的视图中，用户仅使用眼睛就可执行滚动。当用户注视滚动视图边界附近时，即会沿着垂直滚动视图的顶部和底部或者水平滚动视图的两侧开始滚动。例如，用户可注视 Safari 浏览器窗口的底部边缘向下滚动网页，或者注视“音乐” App 后缘上的专辑朝页面中心水平滚动专辑。“注视滚动”可与现有行为协同使用，因此用户可选择通过手势还是眼睛执行滚动。有关开发者指南，请参阅：[look](https://developer.apple.com/cn/documentation/swiftui/scrollinputkind/look)。

**在阅读或浏览视图中支持“注视滚动”**。由于“注视滚动”默认不会生效，你需要在每个单独的滚动视图中支持该功能。如果你的 App 包含阅读或浏览视图，请添加“注视滚动”支持，提供解放双手的舒适体验。有关开发者指南，请参阅：[ScrollInputKind](https://developer.apple.com/cn/documentation/swiftui/scrollinputkind)。

**避免将“注视滚动”用于二级内容**。一般而言，在包含用户界面控制或需要用户快速、精准滚动的信息密集视图中，支持标准手势而非“注视滚动”。例如，“备忘录” App 在主视图内提供“注视滚动”功能，让用户轻松阅读自己的内容，但在备忘录列表中不支持该功能。

**保持内容间的一致性**。如果在 App 的一个视图中支持“注视滚动”，请确保所有类似视图均支持该功能。例如，如果你在整个 App 中提供多个视频合集视图，请为每个此类视图增加“注视滚动”支持，让用户形成明确预期。

**在 App 中定义清晰的滚动区域**。在支持“注视滚动”的视图中，首选让视图占据窗口的全宽或全高。这样可为用户提供充足的滚动空间和清晰的边缘。如果在窗口内（比如在“备忘录” App 中）嵌入滚动视图，请提供清晰的边界，以便用户清楚应注视的位置。

**如果你的 App 使用自定义滚动效果或动画，请在支持“注视滚动”前将其移除**。视差效果和动画等这类使用滚动位置更改内容的自定义效果可能导致“注视滚动”行为异常。

### watchOS

**首选垂直滚动内容**。用户习惯在 Apple Watch 上使用数码表冠导航至 App 和在 App 中导航。如果 App 包含单个列表或内容视图，且 App 内容高于屏幕高度时，旋转数码表冠会垂直滚动。

**使用标签页视图提供逐页滚动**。watchOS 会将标签页视图显示为页面。如果将标签页视图放在垂直堆栈中，用户可以旋转数码表冠在全屏内容页面之间垂直移动。在这种情况下，系统会在数码表冠旁边显示页面指示符，以显示用户在当前页面内容中的位置以及在多个页面之间的位置。有关指南，请参阅[标签页视图](tab-views.md)。

**显示分页内容时，考虑将单个页面的内容限制为一屏高度**。采用这种限制可清晰传达每页的用途，有助于让你的设计更方便查看。但是，如果 App 具有较长的页面，用户仍然可以使用数码表冠在多个较短页面之间导航以及在单个较长页面内容中滚动，因为页面指示符会根据需要扩展为滚动指示符。谨慎使用可变高度的页面并尽可能将其放在固定高度页面之后。

## 资源

#### 相关内容

[页面控制](page-controls.md)

[手势](gestures.md)

[指针设备](pointing-devices.md)

#### 开发者文档

[ScrollView](https://developer.apple.com/cn/documentation/swiftui/scrollview) — SwiftUI

[UIScrollView](https://developer.apple.com/cn/documentation/uikit/uiscrollview) — UIKit

[NSScrollView](https://developer.apple.com/cn/documentation/appkit/nsscrollview) — AppKit

[WKPageOrientation](https://developer.apple.com/cn/documentation/watchkit/wkpageorientation) — WatchKit

[look](https://developer.apple.com/cn/documentation/swiftui/scrollinputkind/look) — SwiftUI

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 6 月 8 日 | 更新了有关滚动边缘效果的指南。 |
| 2026 年 3 月 24 日 | 新增针对 visionOS 中注视滚动的指南。 |
| 2025 年 7 月 28 日 | 新增了滚动边缘效果的指南。 |
| 2024 年 2 月 2 日 | 新增了显示 visionOS 滚动指示符行为的插图。 |
| 2023 年 12 月 5 日 | 描述了 visionOS 滚动指示符，以及新增了将滚动指示符与窗口布局整合的指南。 |
| 2023 年 6 月 5 日 | 更新了在 watchOS 中使用滚动视图的指南。 |
