# 图像

原文：https://developer.apple.com/cn/design/human-interface-guidelines/images

为了确保插图在所有受支持设备上保持美观，请了解系统如何显示内容，以及如何以适当的缩放系数呈现艺术感。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/foundations-images-intro@2x.png)

## 分辨率

不同设备可使用不同分辨率显示图像。例如，2D 设备根据其屏幕分辨率显示图像。

*点*是一种抽象计量单位，可帮助视觉内容在任何显示方式下都保持一致。在 2D 平台中，一个点会映射到一定数量的像素，该数量可因显示屏分辨率而异；在 visionOS 中，一个点是一个角度值，可允许视觉内容根据其距观看者的距离缩放。

创建位图图像时，你可以指定能确定图像分辨率的*缩放系数*。你可以考虑不同分辨率 2D 显示屏中每个点的像素密度，以将缩放系数可视化。例如，缩放系数 1（也称为 @1x）描述的是 1:1 像素密度，其中一个像素等于一个点。高分辨率 2D 显示屏的像素密度会更高，如 2:1 或 3:1。2:1 密度（称为 @2x）的缩放系数为 2，而 3:1 密度（称为 @3x）的缩放系数为 3。由于像素密度更高，高分辨率显示器需要像素更多的图像。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/image-resolution-1x@2x.png)
*1x（10x10 个像素）*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/image-resolution-2x@2x.png)
*2x（20x20 个像素）*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/image-resolution-3x@2x.png)
*3x（30x30 个像素）*

**在支持的每台设备上，为 App 中的所有位图图像提供高分辨率资源**。将每个图像添加到项目的素材目录时，通过在其文件名后面添加“@1x”、“@2x”或“@3x”来确认其缩放系数。请参考使用以下值；如需更多缩放系数，请参阅[布局](layout.md)。

| 平台 | 缩放系数 |
| --- | --- |
| iPadOS、watchOS | @2x |
| iOS | @2x 和 @3x |
| visionOS | @2x 或更高（请参阅 [visionOS](images.md#visionOS)） |
| macOS、Apple tvOS | @1x 和 @2x |

**一般来说，以最低分辨率设计图像，并将其放大以创建高分辨率素材**。使用可缩放的矢量化形状时，你不妨将控制点放在整数值上，以便它们在 1x 下整齐对齐。这样放置可让点在更高的分辨率下保持与光栅网格整齐对齐，因为 2x 和 3x 是 1x 的倍数。

## 格式

创建不同类型的图像时，应考虑以下建议。

| 图像类型 | 格式 |
| --- | --- |
| 位图或光栅插图 | 去交错 PNG 文件 |
| 不需要 24 位真彩的 PNG 图形 | 8 位调色盘 |
| 照片 | JPEG 文件（根据需要进行优化）或 HEIC 文件 |
| 立体或空间照片 | 立体 HEIC |
| 需要高分辨率缩放的扁平化图标、界面图标以及其他扁平化插图 | PDF 或 SVG 文件 |

## 最佳实践

**每个图像包含一个颜色描述文件**。颜色描述文件可帮助确保 App 的颜色在不同显示器上按预期显示。有关指南，请参阅[颜色管理](color.md#Color-management)。

**始终在一系列实际设备上测试图像**。设计时看起来很棒的图像在各种设备上查看时可能会被像素化、拉伸或压缩。

## 平台考量因素

*无针对 iOS、iPadOS 或 macOS 的额外考量因素。*

### Apple tvOS

分层图像是 Apple TV 用户体验的核心。系统结合了分层图像、透明度、缩放和运动来营造真实感和活力感，在用户与屏幕内容交互时唤起一种个人联系。

#### 视差效果

*视差*是一种微妙的视觉效果，当元素获得焦点时，系统会使用该效果来传达深度和动态。当元素获得焦点时，系统会将它提升至前景，使其轻微摇摆的同时应用照明，让元素的表面看起来有光泽。在一段时间的不活跃之后，失去焦点的内容会变暗，获得焦点的元素则会变大。

需要分层图像来支持视差效果。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/tvos-app-icon-parallax-effect-animation.mp4)

#### 分层图像

*分层图像*由两个到五个不同的层组成，将它们叠加在一起便组成了单个图像。层与层之间的分离以及透明度的使用形成了深度感。当有人与图像交互时，靠近表面的层会被提升并缩放，底下的层会向后重叠，从而产生三维效果。

> **重要信息**
>
> 你的 Apple tvOS [App 图标](app-icons.md#tvOS)必须使用分层图像。对于 App 中的其他可获得焦点图像（包括[推荐项目](top-shelf.md)图像），强烈建议使用分层图像，不过这并非为强制要求。

你可以在 App 中嵌入分层图像，或者在运行时从内容服务器检索它们。有关将分层图像添加到 App 的指南，请参阅[《Parallax Previewer 用户指南》](https://help.apple.com/itc/parallaxpreviewer/)。

> **开发者注释**
>
> 如果 App 在运行时从内容服务器检索分层图像，那么你必须提供运行时分层图像 (`.lcr`)。你可以使用 Xcode 提供的 `layerutil` 命令行工具从 LSR 文件或 Photoshop 文件生成。运行时分层图像用于下载，请勿将其嵌入到 App 中。

**使用标准界面元素来显示分层图像**。如果使用标准视图和系统提供的焦点 API（如 [FocusState](https://developer.apple.com/cn/documentation/swiftui/focusstate)），当用户聚焦到分层图像时，后者会自动应用视差效果。

**识别逻辑前景、中间和背景元素**。在前景层中显示重要的元素，如游戏中的角色或者专辑封面或电影海报上的文本。中间层是二级内容和效果（如阴影）的最佳位置。背景层是不透明的背景，它展示了前景层和中间层的同时又不抢其风头。

**文本通常应放在前景中**。除非你想要模糊文本，否则应将它放在前景层，使其清晰可辨。

**背景层应保持不透明**。你可以使用不同的不透明度让内容穿透过更高的层，但背景层必须是不透明的，否则会报错。不透明的背景层可以确保插图在有视差效果、投影和系统背景时看起来效果不错。

**分层应保持简单且不易察觉**。视差被设计成几乎不可察觉。过度的三维效果会显得不真实且不协调。保持深度简单，从而使内容变得生动并增添乐趣。

**在图像的前景层周围留出安全区域**。某些分层上的内容在聚焦时可能会随分层图像缩放和移动而被裁剪。为了确保重要内容始终可见，请将其放在安全区域内。有关指南，请参阅 [App 图标](app-icons.md)。

**始终预览分层图像**。为了确保分层图像在 Apple TV 上看起来效果不错，请使用 Xcode、macOS 版 Parallax Previewer App 或 Adobe Photoshop 的 Parallax Exporter 插件在整个设计过程中进行预览。要特别注意缩放和被截的情况，并根据需要重新调整图像以确保重要内容不出问题。分层图像最终完成后，请在实际的电视上进行预览，以最准确地呈现用户将看到的内容。若要下载 Parallax Previewer 和 Parallax Exporter，请参阅资源。

### visionOS

在 visionOS 中，用户能够以远大于任何其他平台的尺寸范围查看图像，同时系统也会动态缩放图像分辨率以匹配当前尺寸。由于你可按特定角度将图像放在用户的四周，因此图像像素可能并非与屏幕像素 1:1 对应。

**创建分层 App 图标**。visionOS 中的 App 图标由两到三个分层组成，这些分层会在图标聚焦时以略微不同的速度移动来提供深度外观。有关指南，请参阅[分层设计](app-icons.md#Layer-design)。

**为 2D 图像首选基于矢量的插图**。避免使用位图内容，因为其在被系统放大时可能无法良好呈现。如果使用 Core Animation 层，请参阅 [Drawing sharp layer-based content in visionOS](https://developer.apple.com/cn/documentation/visionos/drawing-sharp-layer-based-content) 以了解开发者指南。

**如果需要使用栅格化图像，在选取分辨率时注意平衡质量和性能**。虽然 @2x 图像从常规视距看起来美观，但其固定分辨率意味着系统不会动态缩放图像，近距离观看时图像可能不会那么清晰锐利。为了有助于用户从各种距离都能看到清晰锐利的栅格化图像，你可以使用更高的分辨率，但是分辨率的每次增加都会导致文件大小变大，且可能影响 App 的运行时性能，分辨率超过 @6x 时尤其如此。如果所使用图像的分辨率高于 @2x，请务必同时应用高质量图像滤波以帮助平衡质量和性能（有关开发者指南，请参阅 [filters](https://developer.apple.com/cn/documentation/quartzcore/calayer/filters)）。

#### 空间照片和空间场景

除了 2D 和立体图像之外，visionOS App 和游戏可使用 RealityKit 显示空间照片和空间场景。*空间照片*是带有额外空间元数据的立体照片，采用 iPhone 15 Pro 或后续机型、Apple Vision Pro 或者其他兼容相机拍摄。*空间场景*是从 2D 图像生成的 3D 图像，会添加响应头部移动的视差效果。有关开发者指南，请参阅 [ImagePresentationComponent](https://developer.apple.com/cn/documentation/realitykit/imagepresentationcomponent)。

**确保 App 中的空间照片渲染正确**。使用立体高效图像编解码器 (HEIC) 格式在 App 中显示空间照片。将空间元数据添加到立体 HEIC 后，visionOS 会将照片识别为空间照片，并包括视觉处理方法，帮助最大程度减轻立体观看时常引起的不适感。

**在空间照片上显示文本时，首选羽化玻璃背景效果**。如果需要在 App 或游戏中的空间照片上放置文本，请使用羽化玻璃背景效果。该效果可增强对比度，使文本更具可读性，同时还会对细节进行模糊化处理，帮助减轻用户查看空间照片上的文本时产生的视觉不适感。有关开发者指南，请参阅 [GlassBackgroundEffect](https://developer.apple.com/cn/documentation/swiftui/glassbackgroundeffect)。

**从现有 2D 内容制作空间照片时，考虑视觉舒适度**。为 App 或游戏中的照片调整空间元数据时，请将你希望用户如何查看内容纳入考量。视差调整等元数据可改变用户感知 3D 场景的方式，且在某些视角下可能导致视觉不适感。有关开发者指南，请参阅 [Creating spatial photos and videos with spatial metadata](https://developer.apple.com/cn/documentation/imageio/creating-spatial-photos-and-videos-with-spatial-metadata)。

**在独立视图中显示空间照片和空间场景**。避免将空间照片与其他内容内联显示，这样做可能会导致视觉不适感。相反，应当将空间照片或空间场景显示在单独的视图中，如表单或窗口。如果必须内联显示立体图像，请在图像和任何内联内容之间留出充足的间距，帮助用户的眼睛适应深度变化。

**在 App 中为特定时刻使用空间场景**。从现有图像生成每个空间场景可能需数秒才能完成。设计使用体验时，请牢记这一局限性。例如，“照片” App 提供了一个明确的操作，可在沉浸于单张照片时创建空间场景。避免一次显示过多空间场景，而应使用滚动视图、分页或明确操作以移动到新照片，同时保持视觉信息层次简单。

**沉浸显示时，首选极简用户界面**。例如，“空间画廊” App 显示一条内容以及一小段说明和单个“返回”按钮，依赖轻扫手势在项目间导览。

**优先显示较大空间场景且放置在用户视野中央**。用户查看空间场景时，可能会左右转动头部来查看视差效果。较小的空间场景提供的视差效果较弱，对观众的视觉冲击力可能不足。

### watchOS

**一般来说，避免使用透明度以保持图像文件较小**。如果你总是在相同的纯色背景上合成图像，那么将背景包含在图像中会更高效。然而，透明度在复杂功能图像、菜单图标和其他作为模板图像的界面图标中是必要的，因为系统使用它来确定颜色的应用位置。

**使用自动缩放 PDF 可让你为所有屏幕尺寸提供单一素材**。为 40 毫米和 42 毫米的屏幕设计 2x 的图像。加载 PDF 时，WatchKit 会根据设备的屏幕尺寸使用下方列出的值自动缩放图像：

| 屏幕尺寸 | 图像缩放 |
| --- | --- |
| 38 毫米 | 90% |
| 40 毫米 | 100% |
| 41 毫米 | 106% |
| 42 毫米 | 100% |
| 44 毫米 | 110% |
| 45 毫米 | 119% |
| 49 毫米 | 119% |

## 资源

#### 相关内容

[Apple Design Resources](https://developer.apple.com/design/resources/)

#### 开发者文档

[Drawing sharp layer-based content in visionOS](https://developer.apple.com/cn/documentation/visionos/drawing-sharp-layer-based-content) — visionOS

[Images](https://developer.apple.com/cn/documentation/swiftui/images) — SwiftUI

[UIImageView](https://developer.apple.com/cn/documentation/uikit/uiimageview) — UIKit

[NSImageView](https://developer.apple.com/cn/documentation/appkit/nsimageview) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 12 月 16 日 | 新增针对 visionOS 中空间照片和空间场景的指南。 |
| 2023 年 12 月 5 日 | 阐明了在 visionOS App 中为栅格化图像选取分辨率的指南。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
| 2022 年 9 月 14 日 | 新增适用于 Apple Watch Ultra 的规范。 |
