# 相机控制

原文：https://developer.apple.com/cn/design/human-interface-guidelines/camera-control

相机控制可让用户直达体验你 App 中的相机体验。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/inputs-camera-control-intro@2x.png)

在 iPhone 16 和 iPhone 16 Pro 机型上，相机控制可快速启动 App 的相机体验以拍摄精彩瞬间。用户轻按相机控制时，系统会显示从设备外框延伸的叠层。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/camera-control-button-callout@2x.png)

该叠层允许用户快速调整控制。用户轻按两下相机控制即可查看可用控制。选择控制后，用户可以在相机控制上滑动手指来调整值，从而按照想要的方式拍摄内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/camera-control-picker@2x.png)
*叠层中的控制*

## 剖析

相机控制提供了两类控制用于调整值或更改选项：

- *滑块*提供了可供选择的一系列值，例如应用到内容对比度。
- *选择器*提供了独立选项，例如打开和关闭取景器中的网格。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/camera-control-slider-control@2x.png)
*滑块控制*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/camera-control-picker-control@2x.png)
*选择器控制*

除了你创建的自定义控制外，系统还提供了一组标准控制，可供你选择性地包括在叠层中，从而允许用户调整相机的缩放和曝光。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/system-control-type-zoom-factor@2x.png)
*缩放系数控制*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/system-control-type-exposure-bias@2x.png)
*曝光偏移控制*

## 最佳实践

**使用 SF 符号表示控制功能**。系统不支持自定义符号，请改为从 SF 符号挑选能够清晰表达控制行为的符号。iOS 提供了数千个符号，可供你用于表示 App 在叠层中显示的控制。控制的符号并不表示其当前状态。若要查看可用的符号，请参阅 [SF 符号 App](https://developer.apple.com/sf-symbols/) 中的“相机与照片”部分。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/camera-control-picker-sf-symbols-flash@2x.png)
*`bolt.fill` 符号表示相机闪光灯控制*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/camera-control-picker-sf-symbols-filters@2x.png)
*`camera.filters` 符号表示滤镜控制*

**保持控制名称简短**。控制标签遵循动态字体字号，名称较长可能会让相机取景器含义模糊。

**使滑块控制值附带单位或符号，以提供语境**。在叠层中提供 EV、% 或自定义字符串等描述性信息，有助于用户理解滑块控制的内容。有关开发者指南，请参阅 [localizedValueFormat](https://developer.apple.com/cn/documentation/avfoundation/avcaptureslider/localizedvalueformat)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/system-control-with-label@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)
*有语境的值*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/system-control-no-label@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*无语境的值*

**为滑块控制定义显著值**。显著值是用户最常选择或者均匀分布的值，例如缩放系数的主要增量。当用户在相机控制上滑动以调整滑块控制时，系统会更容易停留在所定义的显著值。有关开发者指南，请参阅 [prominentValues](https://developer.apple.com/cn/documentation/avfoundation/avcaptureslider/prominentvalues-199dz)。

**为取景器中的叠层预留空间**。叠层和控制标签会在竖排和横排方向下占据相机控制附近的屏幕区域。为避免与相机拍摄体验中的界面元素重叠，请将你的用户界面放在叠层区域之外。充分利用取景器的高度和宽度，并允许叠层在其上方出现和消失。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/camera-control-portrait-landscape-orientation@2x.png)

**尽量减少取景器中的干扰元素**。拍摄照片或视频时，用户期望看到大幅预览图像，且视觉干扰元素越少越好。当系统显示叠层时，避免在用户界面和叠层中包含重复控制，例如滑块和开关。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/camera-control-screen-ui-good-example@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)
*保持用户界面极简。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/camera-control-screen-ui-bad-example@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*避免在取景器中显示用户在叠层中访问的控制。*

**根据相机模式启用或停用控制**。例如，拍照时停用视频控制。叠层支持多个控制，但你无法在运行时移除或添加控制。

**考虑如何排列控制**。将常用控制靠中间排列以便快速访问，将使用频率较低的控制排列在任一端。当用户轻按相机控制重新打开叠层时，系统会记住其上次在 App 中使用的控制。

**允许用户从任意位置使用相机控制启动你提供的体验**。创建锁定相机拍摄扩展以允许用户配置相机控制从其锁定设备、主屏幕或者其他 App 内部启动你的 App 相机体验。有关指南，请参阅[锁定设备上的相机体验](controls.md#Camera-experiences-on-a-locked-device)。

## 平台考量因素

*在 iPadOS、macOS、watchOS、Apple tvOS 或 visionOS 中不受支持。*

## 资源

#### 相关内容

[SF 符号](sf-symbols.md)

[控制](controls.md)

#### 开发者文档

[Enhancing your app experience with the Camera Control](https://developer.apple.com/cn/documentation/avfoundation/enhancing-your-app-experience-with-the-camera-control) — AVFoundation

[AVCaptureControl](https://developer.apple.com/cn/documentation/avfoundation/avcapturecontrol) — AVFoundation

[LockedCameraCapture](https://developer.apple.com/cn/documentation/lockedcameracapture)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 9 月 9 日 | 新页面。 |
