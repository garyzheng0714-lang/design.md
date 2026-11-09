# 复杂功能

原文：https://developer.apple.com/cn/design/human-interface-guidelines/complications

复杂功能会在表盘上显示及时的相关信息，用户每次抬起手腕都可以看到。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-complications-intro@2x.png)

用户通常更喜欢提供多种强大复杂功能的 App，因为它能让用户快速查看关心的数据，即使他们没有打开 App。

大多数表盘可以显示至少一个复杂功能，有些可以显示四个或更多。

从 watchOS 9 开始，系统将复杂功能（也称为*附属功能*）组织成多个系列（如[圆形](https://developer.apple.com/cn/design/human-interface-guidelines/complications#Circular)和[内联](https://developer.apple.com/cn/design/human-interface-guidelines/complications#Inline)），并定义了一些可用于显示复杂功能数据的推荐布局。表盘可以在各个复杂功能栏中指定它支持的系列。在早期版本的 watchOS 中运行的复杂功能可以使用[旧版模板](https://developer.apple.com/cn/design/human-interface-guidelines/complications#Legacy-templates)，它定义了不采用佩戴者所选颜色的非图形复杂功能样式。

> **开发者注释**
>
> 为 watchOS 9 及更高版本优先使用 [WidgetKit](https://developer.apple.com/cn/documentation/widgetkit) 来开发复杂功能。有关指南，请参阅 [Migrating ClockKit complications to WidgetKit](https://developer.apple.com/cn/documentation/widgetkit/converting-a-clockkit-app)。若要支持早期版本的 watchOS，请继续执行 ClockKit 复杂功能数据源协议（请参阅 [CLKComplicationDataSource](https://developer.apple.com/cn/documentation/clockkit/clkcomplicationdatasource)）。

## 最佳实践

**标识用户想要一眼就能看到的重要动态内容**。尽管用户可以使用复杂功能来快速启动 App，但他们更青睐的复杂功能行为是显示始终为最新的相关信息。不显示有意义数据的静态复杂功能不太可能保留在表盘的显眼位置。

**尽可能支持所有复杂功能系列**。支持更多的系列意味着你的复杂功能可在更多表盘上使用。如果你无法通过特定复杂功能系列显示有用信息，请提供一个代表 App 的图像（如 App 图标），以让用户仍可从表盘启动 App。

**考虑为各个系列创建多个复杂功能**。支持多个复杂功能可帮助你利用可共享的表盘，并可让用户配置专注于他们所喜爱 App 的表盘。例如，帮助用户进行铁人三项训练的 App 可以提供三个圆形复杂功能（分别对应比赛的每一分段），每一个圆形都与 App 中的分段特定区域有深层链接。此 App 还可以提供一款可共享的表盘，预配置以包括其游泳、骑行和跑步复杂功能，以及使用其自定义的图像和颜色。当用户选取这款表盘时，他们无需进行任何配置即可开始使用。有关指南，请参阅[表盘](watch-faces.md)。

**为你支持的每个复杂功能定义不同的深层链接**。最理想的效果是各复杂功能都能打开到 App 的最相关区域。如果你支持的所有复杂功能都打开了 App 中的同一区域，那么它们似乎不那么有用。

**注重隐私**。对于全天候视网膜显示屏，表盘上的信息可能会被佩戴者以外的其他人看到。请确保帮助用户防止潜在的敏感信息被其他人看到。有关指南，请参阅[全天候显示](always-on.md)。

**仔细考虑更新数据的时间**。你以时间线的形式提供复杂功能的数据，其中每个条目都包含一个值，该值指定在表盘上显示数据的时间。不同的数据集可能需要不同的时间值。例如，会议 App 可能会在会议开始前一小时显示即将召开的会议的相关信息，而天气 App 则可能会在天气状况预期发生时显示预报信息。时间线每天可更新的次数有限，系统会为每个 App 储存有限数量的时间线条目，因此你需要选取可以增强数据实用性的时间。有关开发者指南，请参阅 [Migrating ClockKit complications to WidgetKit](https://developer.apple.com/cn/documentation/widgetkit/converting-a-clockkit-app)。

## 视觉设计

**根据需要显示的数据选取圆环或仪表样式**。许多系列都支持圆环或仪表布局，这些布局提供了一致的方式来表示可能随时间变化的数值。例如：

- 闭合样式可以传达整体的百分比值，例如电池仪表。
- 当最小值和最大值是任意的，或者不代表整体的百分比时（例如速度指示符），非闭合样式的效果会很好。
- 与非闭合样式类似，分段样式也在 App 定义的范围内显示值，并且可以传达快速的值变化，例如在“噪声”复杂功能中。

**确保图像在着色模式下看起来很好**。在着色模式下，系统会为复杂功能的文本、仪表和图像应用纯色，并降低全彩图像的饱和度，除非你提供了其着色版本。有关开发者指南，请参阅 [WidgetRenderingMode](https://developer.apple.com/cn/documentation/widgetkit/widgetrenderingmode)。（如果使用的是旧版模板，着色模式只会应用于图形复杂功能。）为了让你的复杂功能在着色模式下表现良好：

- 避免将颜色用作传达重要信息的唯一方式。你希望用户在着色模式下获得与在非着色模式下相同的信息。
- 必要时，请提供另一个着色模式版本的全彩图像。如果全彩图像在不饱和的情况下效果不太好，你可以提供一个不同版本的图像供系统在着色模式下使用。

**要意识到用户可能更喜欢为复杂功能使用着色模式，而非查看全彩版本**。当用户选取着色模式时，系统会自动降低复杂功能的饱和度，将其转换为灰度，并根据佩戴者所选颜色使用单色为其图像、仪表和文本着色。

**创建复杂功能内容时，通常使用两点或以上的线宽**。较细的线很难一眼就看到，尤其是当佩戴者在运动时。使用适合图像大小和复杂度的线条粗细。

**为你支持的每个复杂功能提供一组静态占位符图像**。当复杂功能的数据没有其他内容可显示时，系统会使用占位符图像。例如，当用户第一次安装 App 时，系统可以显示一个静态占位符，同时检查 App 是否可以生成一个本地化占位符来代替使用。占位符图像也可以出现在用户选择复杂功能的循环展示中。请注意，各个布局（以及各个旧版模板）的复杂功能图像大小有所不同，占位符图像的大小可能与你为该复杂功能提供的实际图像的大小不符。有关开发者指南，请参阅 [placeholder(in:)](https://developer.apple.com/cn/documentation/widgetkit/timelineprovider/placeholder(in:))。

## 圆形

圆形布局可以在“图文”和“图文模块”表盘的圆形区域中包括文本、仪表和全彩图像。圆形系列还定义了超大尺寸的布局，用于在“大文字”表盘上显示内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/circular-closed-gauge-image@2x.png)
*闭合仪表图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/circular-closed-gauge-text@2x.png)
*闭合仪表文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/circular-open-gauge-image@2x.png)
*非闭合仪表图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/circular-open-gauge-simple-text@2x.png)
*非闭合仪表文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/circular-open-gauge-range-text@2x.png)
*非闭合仪表范围*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/graphic-circular-image@2x.png)
*图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-graphic-circular-stack@2x.png)
*堆叠图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-graphic-circular-stack-text@2x.png)
*堆叠文本*

你还可以在常规大小的圆形图像上添加文本，使用沿着部分表盘的外框使文本弯曲的设计，如“图文”。文本可以填充外框接近 180 度而不出现截断。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/bezel-circular-text@2x.png)
*闭合仪表图像*

在为常规大小的圆形复杂功能设计图像时，请使用以下值作为指导。

| 图像 | 40 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- |
| 图像 | 42x42 点（84x84 个像素 @2x） | 44.5x44.5 点（89x89 个像素 @2x） | 47x47 点（94x94 个像素 @2x） | 50x50 点（100x100 个像素 @2x） |
| 闭合仪表 | 27x27 点（54x54 个像素 @2x） | 28.5x28.5 点（57x57 个像素 @2x） | 31x31 点（62x62 个像素 @2x） | 32x32 点（64x64 个像素 @2x） |
| 非闭合仪表 | 11x11 点（22x22 个像素 @2x） | 11.5x11.5 点（23x23 个像素 @2x） | 12x12 点（24x24 个像素 @2x） | 13x13 点（26x26 个像素 @2x） |
| 堆叠（非文本） | 28x14 点（56x28 个像素 @2x） | 29.5x15 点（59x30 个像素 @2x） | 31x16 点（62x32 个像素 @ 2x） | 33.5x16.5 点（67x33 个像素 @2x） |

> **注**
>
> 系统会为每个图像应用一个圆形遮罩。

实现常规大小的圆形复杂功能的 SwiftUI 视图会使用以下默认文本值：

- 样式：圆体
- 粗细：中黑体
- 文字大小：12 点（40 毫米）、12.5 点（41 毫米）、13 点（44 毫米）、14.5 点（45 毫米/49 毫米）

如果想要设计可以出现在“大文字”表盘上的超大尺寸重要信息处理（例如，包含联系人照片的“通讯录”复杂功能），请使用超大尺寸版本的圆形系列布局。下面的布局可让你在大圆形区域中显示全彩图像、文本和仪表，该区域占据了“大文字”表盘的绝大部分区域。部分文本栏可以支持多色文本。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-graphic-xl-circular-closed-gauge-image@2x.png)
*闭合仪表图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-graphic-xl-circular-closed-gauge-text@2x.png)
*闭合仪表文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-graphic-xl-circular-open-gauge-image@2x.png)
*非闭合仪表图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-graphic-xl-circular-open-gauge-simple-text@2x.png)
*非闭合仪表文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-graphic-xl-circular-open-gauge-range-text@2x.png)
*非闭合仪表范围*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-graphic-xl-circular-image@2x.png)
*图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-graphic-xl-circular-stack-image@2x.png)
*堆叠图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-graphic-xl-circular-stack-text@2x.png)
*堆叠文本*

为超大尺寸的圆形复杂功能创建图像时，请使用以下值作为指导。

| 图像 | 40 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- |
| 图像 | 120x120 点（240x240 个像素 @2x） | 127x127 点（254x254 个像素 @2x） | 132x132 点（264x264 个像素 @2x） | 143x143 点（286x286 个像素 @2x） |
| 非闭合仪表 | 31x31 点（62x62 个像素 @2x） | 33x33 点（66x66 个像素 @2x） | 33x33 点（66x66 个像素 @2x） | 37x37 点（74x74 个像素 @2x） |
| 闭合仪表 | 77x77 点（154x154 个像素 @2x） | 81.5x81.5 点（163x163 个像素 @2x） | 87x87 点（174x174 个像素 @2x） | 91.5x91.5 点（183x183 个像素 @2x） |
| 堆叠 | 80x40 点（160x80 个像素 @2x） | 85x42 点（170x84 个像素 @2x） | 87x44 点（174x88 个像素 @2x） | 95x48 点（190x96 个像素 @2x） |

> **注**
>
> 系统会为圆形、非闭合仪表和闭合仪表图像应用一个圆形遮罩。

使用下列值为圆形系列复杂功能创建无内容的占位符图像。

| 布局 | 38 毫米 | 40 毫米/42 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- | --- |
| 圆形 | – | 42x42 点（84x84 个像素 @2x） | 44.5x44.5 点（89x89 个像素 @2x） | 47x47 点（94x94 个像素 @2x） | 50x50 点（100x100 个像素 @2x） |
| 外框 | – | 42x42 点（84x84 个像素 @2x） | 44.5x44.5 点（89x89 个像素 @2x） | 47x47 点（94x94 个像素 @2x） | 50x50 点（100x100 个像素 @2x） |
| 超大尺寸 | – | 120x120 点（240x240 个像素 @2x） | 127x127 点（254x254 个像素 @2x） | 132x132 点（264x264 个像素 @2x） | 143x143 点（286x286 个像素 @2x） |

实现超大尺寸的圆形布局的 SwiftUI 视图会使用以下默认文本值：

- 样式：圆体
- 粗细：中黑体
- 文字大小：34.5 点（40 毫米）、36.5 点（41 毫米）、36.5 点（44 毫米）、41 点（45 毫米/49 毫米）

## 角落

角落布局可让你在“图文”等表盘的角落处显示全彩图像、文本和仪表。部分模板还支持多色文本。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/corner-circular-image@2x.png)
*圆形图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/corner-gauge-image@2x.png)
*仪表图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/corner-gauge-text@2x.png)
*仪表文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/corner-stack-text@2x.png)
*堆叠文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/corner-text-image@2x.png)
*文本图像*

在为角落复杂功能设计图像时，请使用以下值作为指导。

| 图像 | 40 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- |
| 圆形 | 32x32 点（64x64 个像素 @2x） | 34x34 点（68x68 个像素 @2x） | 36x36 点（72x72 个像素 @2x） | 38x38 点（76x76 个像素 @2x） |
| 仪表 | 20x20 点（40x40 个像素 @2x） | 21x21 点（42x42 个像素 @2x） | 22x22 点（44x44 个像素 @2x） | 24x24 点（48x48 个像素 @2x） |
| 文本 | 20x20 点（40x40 个像素 @2x） | 21x21 点（42x42 个像素 @2x） | 22x22 点（44x44 个像素 @2x） | 24x24 点（48x48 个像素 @2x） |

> **注**
>
> 系统会为每个图像应用一个圆形遮罩。

使用下列值为角落系列复杂功能创建无内容的占位符图像。

| 38 毫米 | 40 毫米/42 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- |
| – | 20x20 点（40x40 个像素 @2x） | 21x21 点（42x42 个像素 @2x） | 22x22 点（44x44 个像素 @2x） | 24x24 点（48x48 个像素 @2x） |

实现角落布局的 SwiftUI 视图会使用以下默认文本值：

- 样式：圆体
- 粗细：中粗体
- 文字大小：10 点（40 毫米）、10.5 点（41 毫米）、11 点（44 毫米）、12 点（45 毫米/49 毫米）

## 内联

内联布局包括实用的小布局和大布局。

实用的小布局会在表盘（如“计时码表”和“简约”表盘）的角落处占据一块矩形区域。内容可以包括图像、界面图标或圆形图形。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-utility-small-flat@2x.png)
*平面*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-utility-small-ring-image@2x.png)
*圆环图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-utility-small-ring-text@2x.png)
*圆环文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-utility-small-square@2x.png)
*正方形*

在为实用的小布局设计图像时，请使用以下值作为指导。

| 内容 | 38 毫米 | 40 毫米/42 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- | --- |
| 平面 | 9-21x9 点（18-42x18 个像素 @2x） | 10-22x10 点（20-44x20 个像素 @2x） | 10.5-23.5x21 点 (21-47x21 @2x) | 不适用 | 12-26x12 点（24-52x24 个像素 @2x） |
| 圆环 | 14x14 点（28x28 个像素 @2x） | 14x14 点（28x28 个像素 @2x） | 15x15 点（30x30 个像素 @2x） | 16x16 点（32x32 个像素 @2x） | 16.5x16.5 点（33x33 个像素 @2x） |
| 正方形 | 20x20 点（40x40 个像素 @2x） | 22x22 点（44x44 个像素 @2x） | 23.5x23.5 点（47x47 个像素 @2x） | 25x25 点（50x50 个像素 @2x） | 26x26 点（52x52 个像素 @2x） |

实用的大布局主要是基于文本的，但也支持放在文本前缘的界面图标。此布局横跨表盘的底部，如“实用”或“动态”表盘。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-utility-large-flat@2x.png)
*大平面*

在为实用的大布局设计图像时，请使用以下值作为指导。

| 内容 | 38 毫米 | 40 毫米/42 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- | --- |
| 平面 | 9-21x9 点（18-42x18 个像素 @2x） | 10-22x10 点（20-44x20 个像素 @2x） | 10.5-23.5x10.5 点（21-47x21 个像素 @2x） | 不适用 | 12-26x12 点（24-52x24 个像素 @2x） |

## 矩形

矩形布局可以在大矩形区域中显示全彩图像、文本、仪表和可选的标题。部分文本栏可以支持多色文本。

大矩形区域可以很好地显示随时间变化的值或进度的详细信息，因为它为多信息图表、图形和示意图提供了空间。例如，“心率”复杂功能会显示 24 小时内的心率值的图形。该图形为主要内容使用了高对比度的白色和红色，为图形线和标签使用了低对比度的灰色，使数据一目了然。

从 watchOS 10 开始，如果为 watchOS App 创建了矩形布局，系统可能会将其显示在智能叠放中。你可以通过几种方式来优化此呈现方式：

- 提供可传达信息或有助于识别的背景颜色或内容
- 使用 [intents](https://developer.apple.com/documentation/appintents/app-intents) 指定相关性，并帮助确保小组件在最合适的时间以对用户最有用的方式显示在智能叠放中
- 为信息创建专为智能叠放而优化的自定义布局

有关开发者指南，请参阅 [WidgetFamily.accessoryRectangular](https://developer.apple.com/cn/documentation/widgetkit/widgetfamily/accessoryrectangular)。请参阅[小组件](widgets.md)来了解为智能叠放设计小组件的更多指南。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/rectangular-standard-body@2x.png)
*标准正文*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/rectangular-text-gauge@2x.png)
*文本仪表*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/rectangular-large-image@2x.png)
*大图像*

为矩形布局创建图像时，请使用以下值作为指导。

| 内容 | 40 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- |
| 包含标题的大图像 * | 150x47 点（300x94 个像素 @2x） | 159x50 点（318x100 个像素 @2x） | 171x54 点（342x108 个像素 @2x） | 178.5x56 点（357x112 个像素 @2x） |
| 不包含标题的大图像 * | 162x69 点（324x138 个像素 @2x） | 171.5x73 点（343x146 个像素 @2x） | 184x78 点（368x156 个像素 @2x） | 193x82 点（386x164 个像素 @2x） |
| 标准正文 | 12x12 点（24x24 个像素 @2x） | 12.5x12.5 点（25x25 个像素 @2x） | 13.5x13.5 点（27x27 个像素 @2x） | 14.5x14.5 点（29x29 个像素 @2x） |
| 文本仪表 | 12x12 点（24x24 个像素 @2x） | 12.5x12.5 点（25x25 个像素 @2x） | 13.5x13.5 点（27x27 个像素 @2x） | 14.5x14.5 点（29x29 个像素 @2x） |

> **注**
>
> 这两种大图像布局会自动包含一个四点圆角半径。

实现矩形布局的 SwiftUI 视图会使用以下默认文本值：

- 样式：圆体
- 粗细：中黑体
- 文字大小：16.5 点（40 毫米）、17.5 点（41 毫米）、18 点（44 毫米）、19.5 点（45 毫米/49 毫米）

## 旧版模板

### 小圆形

小圆形模板会显示一个小图像或几个字符的文本。它们显示在表盘（例如，在“彩色”表盘中）的角落处。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-circular-small-ring-image@2x.png)
*圆环图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-circular-small-ring-text@2x.png)
*圆环文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-circular-small-simple-image@2x.png)
*简单图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-circular-small-simple-text@2x.png)
*简单文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-circular-small-stack-image@2x.png)
*堆叠图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-circular-small-stack-text@2x.png)
*堆叠文本*

在为小圆形复杂功能设计图像时，请使用以下值作为指导。

| 图像 | 38 毫米 | 40 毫米/42 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- | --- |
| 圆环 | 20x20 点（40x40 个像素 @2x） | 22x22 点（44x44 个像素 @2x） | 23.5x23.5 点（47x47 个像素 @2x） | 24x24 点（48x48 个像素 @2x） | 26x26 点（52x52 个像素 @2x） |
| 简单 | 16x16 点（32x32 个像素 @2x） | 18x18 点（36x36 个像素 @2x） | 19x19 点（38x38 个像素 @2x） | 20x20 点（40x40 个像素 @2x） | 21.5x21.5 点（43x43 个像素 @2x） |
| 堆叠 | 16x7 点（32x14 个像素 @2x） | 17x8 点（34x16 个像素 @2x） | 18x8.5 点（36x17 个像素 @2x） | 19x9 点（38x18 个像素 @2x） | 19x9.5 点（38x19 个像素 @2x） |
| 占位符 | 16x16 点（32x32 个像素 @2x） | 18x18 点（36x36 个像素 @2x） | 19x19 点（38x38 个像素 @2x） | 20x20 点（40x40 个像素 @2x） | 21.5x21.5 点（43x43 个像素 @2x） |

> **注**
>
> 在每个堆叠测量中，宽度值代表最大尺寸。

### 小模块

小模块模板会显示由图标和内容、圆形图形或单个较大项目组成的两个堆叠行（例如，“模块”表盘的最下面一行的复杂功能）。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-modular-small-columns-text@2x.png)
*列文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-modular-small-ring-image@2x.png)
*圆环图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-modular-small-ring-text@2x.png)
*圆环文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-modular-small-simple-image@2x.png)
*简单图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-modular-small-simple-text@2x.png)
*简单文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-modular-small-stack-image@2x.png)
*堆叠图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-modular-small-stack-text@2x.png)
*堆叠文本*

在为小模块复杂功能设计图标和图像时，请使用以下值作为指导。

| 图像 | 38 毫米 | 40 毫米/42 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- | --- |
| 圆环 | 18x18 点（36x36 个像素 @2x） | 19x19 点（38x38 个像素 @2x） | 20x20 点（40x40 个像素 @2x） | 21x21 点（42x42 个像素 @2x） | 22.5x22.5 点（45x45 个像素 @2x） |
| 简单 | 26x26 点（52x52 个像素 @2x） | 29x29 点（58x58 个像素 @2x） | 30.5x30.5 点（61x61 个像素 @2x） | 32x32 点（64x64 个像素 @2x） | 34.5x34.5 点（69x69 个像素 @2x） |
| 堆叠 | 26x14 点（52x28 个像素 @2x） | 29x15 点（58x30 个像素 @2x） | 30.5x16 点（61x32 个像素 @2x） | 32x17 点（64x34 个像素 @2x） | 34.5x18 点（69x36 个像素 @2x） |
| 占位符 | 26x26 点（52x52 个像素 @2x） | 29x29 点（58x58 个像素 @2x） | 30.5x30.5 点（61x61 个像素 @2x） | 32x32 点（64x64 个像素 @2x） | 34.5x34.5 点（69x69 个像素 @2x） |

> **注**
>
> 在每个堆叠测量中，宽度值代表最大尺寸。

### 大模块

大模块模板提供了一个大画布，用于显示最多三行内容（例如，在“模块”表盘的中心位置）。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-modular-large-columns@2x.png)
*列*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-modular-large-standard-body@2x.png)
*标准正文*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-modular-large-table@2x.png)
*表格*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-modular-large-tall-body@2x.png)
*高正文*

在为大模块复杂功能设计图标和图像时，请使用以下值作为指导。

| 内容 | 38 毫米 | 40 毫米/42 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- | --- |
| 列 | 11-32x11 点（22-64x22 个像素 @2x） | 12-37x12 点（24-74x24 个像素 @2x） | 12.5-39x12.5 点（25-78x25 个像素 @2x） | 14-42x14 点（28-84x28 个像素 @2x） | 14.5-44x14.5 点（29-88x29 个像素 @2x） |
| 标准正文 | 11-32x11 点（22-64x22 个像素 @2x） | 12-37x12 点（24-74x24 个像素 @2x） | 12.5-39x12.5 点（25-78x25 个像素 @2x） | 14-42x14 点（28-84x28 个像素 @2x） | 14.5-44x14.5 点（29-88x29 个像素 @2x） |
| 表格 | 11-32x11 点（22-64x22 个像素 @2x） | 12-37x12 点（24-74x24 个像素 @2x） | 12.5-39x12.5 点（25-78x25 个像素 @2x） | 14-42x14 点（28-84x28 个像素 @2x） | 14.5-44x14.5 点（29-88x29 个像素 @2x） |

### 超大尺寸

超大尺寸模板会显示更大的文本和图像（例如，在“大文字”表盘中）。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-extralarge-ring-image@2x.png)
*圆环图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-extralarge-ring-text@2x.png)
*圆环文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-extralarge-simple-image@2x.png)
*简单图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-extralarge-simple-text@2x.png)
*简单文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-extralarge-stack-image@2x.png)
*堆叠图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/complication-extralarge-stack-text@2x.png)
*堆叠文本*

在为超大尺寸复杂功能设计图标和图像时，请使用以下值作为指导。

| 图像 | 38 毫米 | 40 毫米/42 毫米 | 41 毫米 | 44 毫米 | 45 毫米/49 毫米 |
| --- | --- | --- | --- | --- | --- |
| 圆环 | 63x63 点（126x126 个像素 @2x） | 66.5x66.5 点（133x133 个像素 @2x） | 70.5x70.5 点（141x141 个像素 @2x） | 73x73 点（146x146 个像素 @2x） | 79x79 点（158x158 个像素 @2x） |
| 简单 | 91x91 点（182x182 个像素 @2x） | 101.5x101.5 点（203x203 个像素 @2x） | 107.5x107.5 点（215x215 个像素 @2x） | 112x112 点（224x224 个像素 @2x） | 121x121 点（242x242 个像素 @2x） |
| 堆叠 | 78x42 点（156x84 个像素 @2x） | 87x45 点（174x90 个像素 @2x） | 92x47.5 点（184x95 个像素 @2x） | 96x51 点（192x102 个像素 @2x） | 103.5x53.5 点（207x107 个像素 @2x） |
| 占位符 | 91x91 点（182x182 个像素 @2x） | 101.5x101.5 点（203x203 个像素 @2x） | 107.5x107.5 点（215x215 个像素 @2x） | 112x112 点（224x224 个像素 @2x） | 121x121 点（242x242 个像素 @2x） |

> **注**
>
> 在每个堆叠测量中，宽度值代表最大尺寸。

## 平台考量因素

*在 iOS、iPadOS、macOS、Apple tvOS 或 visionOS 中不受支持。*

## 资源

#### 相关内容

[表盘](watch-faces.md)

#### 开发者文档

[WidgetKit](https://developer.apple.com/cn/documentation/widgetkit)

#### 视频

- [为 Apple Watch 的智能叠放设计小组件](https://developer.apple.com/cn/videos/play/wwdc2023/10309)
- [进一步了解 WidgetKit 中的复杂功能](https://developer.apple.com/cn/videos/play/wwdc2022/10051)
- [复杂功能和小组件：重新载入](https://developer.apple.com/cn/videos/play/wwdc2022/10050)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 10 月 24 日 | 将弃用的 ClockKit 文档链接替换为 WidgetKit 文档链接。 |
| 2023 年 6 月 5 日 | 更新了针对矩形复杂功能的指南，支持将其像小组件一样显示在智能叠放中。 |
| 2022 年 9 月 14 日 | 新增适用于 Apple Watch Ultra 的规范。 |
