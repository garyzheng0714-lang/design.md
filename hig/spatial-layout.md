# 空间布局

原文：https://developer.apple.com/cn/design/human-interface-guidelines/spatial-layout

空间布局技术帮助你充分利用 Apple Vision Pro 的无边际画布，并以极具吸引力且舒适的方式呈现你的内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/foundations-spatial-layout-intro@2x.png)

## 视场

用户的*视场*是无需移动头部就能看到的空间。个人佩戴 Apple Vision Pro 时视场的维度因各种因素而异，例如用户配置遮光罩的方式以及边缘视敏度的范围等等。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-field-of-view-layout@2x.png)

> **重要信息**
>
> 系统不会提供有关用户视场的信息。

**将重要内容居中放在视场内**。visionOS 默认会直接在用户面前启动 App，将其放在用户的视场中。在沉浸式体验中，你可以居中显示重要内容并且不在边缘处显示干扰性动态效果或明亮的高对比度对象，帮助用户持续专注于这些重要内容。

**垂直观看**

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-window-placement-standard.mp4)

**斜角观看**

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-window-placement-tilted.mp4)

**避免将内容锚定到佩戴者头部**。虽然通常想要 App 保留在视场内，但如果锚定的内容在用户面前保持静止，这会让用户感到卡顿、受限且不舒服，尤其是当内容遮挡了很多透视且降低了用户四周的明显稳定性。相反，请将内容锚定在用户的空间中，让用户自由且自然地注视各处并查看不同位置的不同对象。

## 深度

用户依赖距离、遮挡和阴影等视觉提示来感知深度和理解四周。在 Apple Vision Pro 中，系统自动使用色温、反射和阴影等视觉效果来帮助用户感知虚拟内容的深度。当用户在空间中移动虚拟对象或者更改自身相对于该对象的位置时，视觉效果会更改对象的外观深度，让体验更加逼真。

因为用户可以从任何角度查看你的内容，在整个界面（甚至在标准窗口）中融合少量深度可帮助让其看起来更加自然。使用 SwiftUI 时，系统会在 2D 窗口的视图中添加视觉效果，让其看起来具有深度。有关开发者指南，请参阅 [Adding 3D content to your app](https://developer.apple.com/cn/documentation/visionos/adding-3d-content-to-your-app)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-spatial-layout-2d-window@2x.png)

如果需要呈现包含额外深度的内容，你可以使用 RealityKit 创建 3D 对象（有关开发者指南，请参阅 [RealityKit](https://developer.apple.com/cn/documentation/realitykit)）。你可以在任意位置显示 3D 对象，也可以使用显示 3D 内容的*视体*组件。视体与窗口类似，但没有可见的框架。有关指南，请参阅 [visionOS 视体](windows.md#visionOS-volumes)。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-spatial-layout-3d-volume.mp4)

**提供精确传达内容深度的视觉提示**。如果视觉提示缺失或者与用户的真实世界体验相冲突，用户可能会在视觉上感到不适。

**使用深度传达层级结构**。深度可帮助对象看起来相较于四周内容更为突出，让其更加显而易见。用户通常也会注意到深度变化：例如，当表单显示在窗口上方时，窗口会沿着 z 轴后退，从而让表单浮现出来并在视觉上更为突出。

**一般而言，避免为文本添加深度**。看起来悬浮在背景上方的文本不仅难以阅读，还会降低用户的速度，有时还会导致视觉不适。

**确保深度可提供价值**。一般而言，你可以使用深度带来清晰感和愉悦感，但无需在每个地方都使用。在设计中添加深度时，考虑对象的大小和相对重要性。深度非常适合用于从视觉上分离 App 中大型且重要的元素，例如让标签页栏或工具栏从窗口中突出显示，但可能不适合用于小型对象。例如，使用深度让按钮的符号从其背景中突出显示可能会降低按钮的辨识度和易用性。另外检查在整个 App 中使用不同深度的频率。用户需要调整眼睛的焦点来感知每个不同深度，调整过于频繁或过快会让用户感到疲劳。

## 缩放

visionOS 定义了两种类型的缩放，既保留了深度的外观又优化了可用性。

*动态缩放*帮助内容保持清晰可辨且充满交互性，而不管内容距离用户的远近。具体而言，visionOS 会在窗口远离佩戴者时自动放大窗口，在靠近时缩小窗口，从而让窗口在所有距离上看起来都大小相同。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-dynamic-window-scaling.mp4)

*固定缩放*意味着对象无论距离用户的远近如何，都会保持相同比例。固定缩放对象会在沿着 z 轴逐渐远离观看者时看起来越来越小，这与用户现实环境中的对象类似：远处的对象比近处的对象看起来要更小。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-fixed-window-scaling.mp4)

为了支持动态缩放和深度外观，visionOS 将一个点定义为一个角度，这一点与其他平台不同：其他平台将一个点定义为一定数量的像素，该数量因 2D 显示器的[分辨率](images.md#Resolution)不同而有所差异。

**如果想要虚拟对象看起来和现实对象完全一样，考虑使用固定缩放**。例如，你不妨为提供的产品维持实物大小的比例，这样产品会在用户的空间中看起来更加逼真。交互式内容需要缩放以在其逐渐靠近或远离时保持易用性，因此应谨慎应用固定缩放，请将固定缩放保留给需要它的非交互式对象。

## 最佳实践

**避免显示过多窗口**。窗口过多会遮挡用户的四周，让其感到压抑、受限，甚至不舒服。用户重新放置 App 的操作也可能变得繁琐，因为要移动许多窗口。

**首选标准的非直接手势**。用户可以使用*非直接*手势，无需将手移入视场中。相比之下，使用*直接*手势需要用户通过手指轻触虚拟对象，这样做可能会让用户感到疲劳，当对象位于用户视线中或上方时尤其如此。在 visionOS 中，用户使用非直接手势来执行他们熟知的标准手势。如果优先采用非直接手势，则无论对象的距离如何，用户都可以使用非直接手势与注视的任何对象交互。如果支持直接手势，考虑将其用于鼓励仔细检查或短时间操作的附近对象。有关指南，请参阅[“手势”> visionOS](gestures.md#visionOS)。

**借助数码旋钮来帮助用户将窗口重新放在视场中间**。当用户移动或转动头部时，内容可能不再出现在用户期望的位置。如果出现这种情况，用户可以按下[数码旋钮](digital-crown.md)将面前的内容重新放在中间。你的 App 无需执行任何操作来支持这种行为。

**在交互式组件周围保留足够的空间，以便用户轻松注视组件**。当用户注视交互式元素时，visionOS 会显示视觉悬停效果，以帮助用户确认该元素就是用户想要的元素。在交互式组件周围保留足够的空间至关重要，这样用户可轻松、舒适地注视组件，同时可防止悬停效果挤压其他内容。例如，放置多个常规尺寸的[按钮](buttons.md#visionOS)以使其中心至少相距 60 点，在它们之间留出至少 16 点的空间。另外，不要将控制与其他交互式元素或视图重叠，因为这样会使选择单个元素变得困难。

**让用户通过极少量或无需身体活动来使用你的 App**。除非某些身体活动对于体验不可或缺，否则请帮助用户在保持不动的情况下享受体验。

**使用地面来帮助你放置大型沉浸式体验**。如果沉浸式体验包括从地面向上延伸的内容，请使用平坦的水平面来放置内容。将此平面与地面对齐有助于内容与用户的四周无缝融合并提供更直观的体验。

若要进一步了解 visionOS 中的窗口和视体，请参阅[“窗口”> visionOS](windows.md#visionOS)；有关在窗口内放置内容的指南，请参阅[“布局”> visionOS](layout.md#visionOS)。

## 平台考量因素

*在 iOS、iPadOS、macOS、Apple tvOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[眼睛](eyes.md)

[布局](layout.md)

[沉浸式体验](immersive-experiences.md)

#### 开发者文档

[Presenting windows and spaces](https://developer.apple.com/cn/documentation/visionos/presenting-windows-and-spaces) — visionOS

[Positioning and sizing windows](https://developer.apple.com/cn/documentation/visionos/positioning-and-sizing-windows) — visionOS

[Adding 3D content to your app](https://developer.apple.com/cn/documentation/visionos/adding-3d-content-to-your-app) — visionOS

#### 视频

- [了解 SwiftUI 空间布局](https://developer.apple.com/cn/videos/play/wwdc2025/273)
- [空间设计的原则](https://developer.apple.com/cn/videos/play/wwdc2023/10072)
- [设计空间用户界面](https://developer.apple.com/cn/videos/play/wwdc2023/10076)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 3 月 29 日 | 强调了避免交互式元素相互重叠的重要性。 |
| 2023 年 6 月 21 日 | 新页面。 |
