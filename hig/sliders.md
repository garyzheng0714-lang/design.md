# 滑块

原文：https://developer.apple.com/cn/design/human-interface-guidelines/sliders

滑块是一个包含称为“滚动块”的控制的水平轨道，可让用户在最小值和最大值之间进行调整。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-slider-intro@2x.png)

随着滑块值的变化，最小值和滚动块之间的轨道部分会用颜色填充。你可以选择为滑块显示分别表示最小值和最大值含义的左右图标。

## 最佳实践

**为滑块自定义能够提供更多价值的外观**。你可以调整滑块的外观（包括轨道颜色、滚动块图像和着色）以及左右图标，以融入你的 App 设计并传达用途。例如，调整图像大小的滑块可在左侧显示一个较小图像图标，在右侧显示一个较大图像图标。

**使用熟悉的滑块方向**。用户期望滑块的最小端和最大端在所有 App 中都保持一致。对于水平滑块来说，最小值位于前缘侧，最大值位于后缘侧；而对于垂直滑块来说，最小值位于底部，最大值位于顶部。例如，用户期望可以将表示百分比的水平滑块从前缘侧的 0% 移动到后缘侧的 100%。

**考虑通过相应的文本栏和步进器补充滑块功能**。尤其是当滑块代表较大的值范围时，用户可能希望看到确切的滑块值，并能够在文本栏中输入特定值。添加步进器可为用户提供一种按整数递增值的便捷方式。相关指南，请参阅[文本栏](text-fields.md)和[步进器](steppers.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sliders-text-field@2x.png)

## 平台考量因素

*在 Apple tvOS 中不受支持。*

### iOS、iPadOS

**勿使用滑块调整音频音量**。如果需要在 App 中提供音量控制，请使用音量视图，它可自定义，并包括一个音量滑块和一个用于更改活跃音频输出设备的控制。有关指南，请参阅[播放音频](playing-audio.md)。

### macOS

macOS 中的滑块也可包括刻度标记，更便于用户精确找到范围内的特定值。

在线性滑块（无论有无刻度标记）中，滚动块为窄菱形，并且最小值和滚动块之间的轨道部分会用颜色填充。线性滑块通常包括分别表示最小值和最大值含义的补充图标。

在圆形滑块中，滚动块会显示为小的圆形。刻度标记呈现时会显示为围绕滑块圆周均匀分布的圆点。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sliders-no-tick-marks@2x.png)
*无刻度标记的线性滑块*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sliders-tick-marks@2x.png)
*有刻度标记的线性滑块*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sliders-circular@2x.png)
*圆形滑块*

**考虑在滑块值发生更改时提供实时反馈**。实时反馈向用户实时显示结果。例如，在“程序坞”设置中调整“大小”滑块时，程序坞图标会动态缩放。

**选取符合用户期望的滑块样式**。在固定的起点和终点之间移动时，水平滑块是理想选择。例如，图形 App 可能提供一个水平滑块，用于在 0% 到 100% 之间设定对象的不透明度。当值重复或无限连续时，使用圆形滑块。例如，图形 App 可能使用圆形滑块，以在 0 到 360 度之间调整对象的转动。动画 App 可能使用圆形滑块调整对象在添加动画时旋转的次数：四次完整的转动等于四次旋转，或 1440 度转动。

**考虑使用标签来介绍滑块**。标签一般使用 [sentence-style capitalization](https://help.apple.com/applestyleguide/#/apsgb744e4a3?sub=apdca93e113f1d64)（句子式大写），并以冒号结尾。有关指南，请参阅[标签](labels.md)。

**使用刻度标记以增加清晰度和准确性**。刻度标记可帮助用户理解测量标度以及更轻松地找到特定值。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sliders-labels@2x.png)

**考虑将标签添加到刻度标记以进一步提高清晰度**。标签可以是数字或文字，具体取决于滑块的值。你不需要给每个刻度标记添加标签，除非需要这样做才能减少混淆。在许多情况下，仅为最小值和最大值添加标签就已足够。当滑块的值是非线性（如“节能”设置面板中的值）时，请使用阶段性标签提供上下文。提供[工具提示](https://developer.apple.com/cn/design/human-interface-guidelines/offering-help#macOS-visionOS)也是一个不错的思路，当用户将指针悬停在滚动块上时，它会显示滚动块的值。

### visionOS

**首选水平滑块**。相比于上下方向的手势，用户通常更容易执行从一侧到另一侧的手势。

### watchOS

滑块是代表有限值范围的水平轨道，显示为一组离散的步长或一个连续的条形。用户可轻点滑块两侧的按钮以按预定义的量增加或减少其值。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sliders-watchos-discrete@2x.png)
*离散*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sliders-watchos-continuous@2x.png)
*连续*

**根据需要创建自定义图形以传达滑块的用途**。系统默认显示加号和减号。

## 资源

#### 相关内容

[步进器](steppers.md)

[选择器](pickers.md)

#### 开发者文档

[Slider](https://developer.apple.com/cn/documentation/swiftui/slider) — SwiftUI

[UISlider](https://developer.apple.com/cn/documentation/uikit/uislider) — UIKit

[NSSlider](https://developer.apple.com/cn/documentation/appkit/nsslider) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
