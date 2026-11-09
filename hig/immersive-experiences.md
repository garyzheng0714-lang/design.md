# 沉浸式体验

原文：https://developer.apple.com/cn/design/human-interface-guidelines/immersive-experiences

在 visionOS 中，你可以设计延伸出窗口和视体的 App 和游戏，使用户沉浸在你的内容中。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/foundations-immersive-experiences-intro@2x.png)

你可以选择是在共享空间还是全空间中启动 visionOS App 或游戏。在*共享空间*中，你的软件与其他体验一起运行，用户可以通过与 Mac 上几乎相同的方式在 App 间切换；在*全空间*中，你的 App 或游戏单独运行，其他体验会隐藏，帮助用户沉浸在你的内容中。App 和游戏可支持各种沉浸类型，还可随时在共享空间和全空间之间流畅转换。

## 沉浸和透视

在 visionOS 中，用户会使用透视看清现实环境。*透视*提供来自设备外置相机的实时视频，帮助用户感觉舒适并保持与实际环境的联系。

用户还可以随时使用[数码旋钮](digital-crown.md)管理 App 或游戏内容，或者调整透视。例如，用户可以按住数码旋钮将视场中的内容重新居中，或者按两下暂时隐藏所有内容并显示透视以看清四周。

系统在某些情况下还会自动更改内容的不透明度，以帮助用户保持舒适。例如，如果用户在 `mixed` 沉浸中太靠近实际物体，其面前的内容会短暂调暗，以便更清楚看到身边的现实环境。在更沉浸的体验（例如下述的 `progressive` 和 `full` 风格）中，系统会定义一个从佩戴者头部初始位置起延伸约 1.5 米的边界。随着其头部靠近此边界，整个体验会开始减弱，透视会增加。其头部移出此边界时，空间中的沉浸式视觉效果会替换为 App 图标；佩戴者回到其原始位置或使用数码旋钮将视野重新居中时，视觉效果会恢复。

### 沉浸风格

你的 App 或游戏转换到全空间时，系统会隐藏其他 App，以便用户专注于你的内容。在全空间中，除了标准窗口和视体中的内容，你还可以显示不受窗口所限的 3D 内容。有关开发者指南，请参阅 [automatic](https://developer.apple.com/cn/documentation/swiftui/immersionstyle/automatic)。

visionOS 提供了多种方式让用户在共享空间和转换到全空间时沉浸在你的内容中。例如，你可以：

- **使用暗透视将注意力集中到内容**。你可以在共享空间中对透视及其他可见内容进行轻微调暗或调色，这样无需隐藏其他 App 和游戏就能将注意力集中到你的 App；你还可以在全空间中创建更专注的体验。尽管透视的色调默认为黑色，但你可以应用自定义色调在 App 中创建动态体验。有关开发者指南，请参阅 [SurroundingsEffect](https://developer.apple.com/cn/documentation/swiftui/surroundingseffect)。

**无暗透视**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/immersive-spaces-shared-space-regular-content@2x.png)

**有暗透视**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/immersive-spaces-shared-space-dimmed-content@2x.png)

- **打造无边界的 3D 体验**。在全空间中使用 `mixed` 沉浸风格将内容融入透视。在全空间中运行 App 或游戏时，你可以请求访问附近实际物体和房间布局的相关信息，帮助你在用户四周显示虚拟内容。`mixed` 沉浸风格不定义边界。相反，当用户太靠近实际物体时，系统会自动以半透明显示附近内容，帮助用户持续注意四周。有关开发者指南，请参阅 [mixed](https://developer.apple.com/cn/documentation/swiftui/immersionstyle/mixed) 和 [ARKit](https://developer.apple.com/cn/documentation/arkit)。
- **使用 `progressive` 沉浸将自定义环境融入用户四周**。你可以在全空间中使用 `progressive` 风格显示局部替代透视的自定义环境。你也可以定义最适合 App 或游戏的特定沉浸度范围，以及采用竖排或横排方向显示内容。在沉浸式体验中，用户可以使用数码旋钮在默认范围（120 至 360 度）或指定的自定义范围内调整沉浸度。体验转换到 `progressive` 风格时，系统会自动定义一个约 1.5 米的边界。有关开发者指南，请参阅 [progressive](https://developer.apple.com/cn/documentation/swiftui/immersionstyle/progressive)。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-immersion-level-adjustment.mp4)

- **使用 `full` 沉浸创建全沉浸式体验**。你可以在全空间中使用 `full` 风格显示 360 度自定义环境，其中透视会被完全替换且用户会感到仿佛置身于全新地点。和 `progressive` 风格一样，系统会在全沉浸式体验开始时定义一个约 1.5 米的边界。有关开发者指南，请参阅 [full](https://developer.apple.com/cn/documentation/swiftui/immersionstyle/full)。

**全空间（混合式）**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/immersive-spaces-full-space-mixed-style@2x.png)
*全空间中的混合式沉浸风格将 App 内对象融入真实环境*

**全空间（渐进式）**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/immersive-spaces-full-space-progressive-style@2x.png)
*全空间中的渐进式沉浸风格将 App 自定义环境融入真实环境*

**全空间（沉浸式）**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/immersive-spaces-full-space-full-style@2x.png)
*全空间中的全沉浸式风格显示 360 度自定义环境*

## 最佳实践

**提供使用 App 或游戏的多种方式**。除了让用户自由选择其体验，将软件设计为支持无障碍功能，供用户用于个性化其与设备的交互方式也至关重要。有关指南，请参阅[无障碍](accessibility.md)。

**首选在共享空间中或使用 `mixed` 沉浸风格启动 App 或游戏**。在共享空间中启动可让用户在使用其他运行的软件时参考你的 App 或游戏并实现无缝切换。如果你的 App 或游戏提供了全沉浸式或 `progressive` 风格的体验，使用 `mixed` 沉浸风格启动或者在共享空间中通过基于窗口的体验启动可给予用户更多控制权，让用户可以选择什么时候增加沉浸感。

**将沉浸感留给有意义的时刻和内容**。沉浸感并非对每种任务都有用，沉浸式任务也并非都需要完全沉浸。虽然用户有时想要进入完全不同的世界，但在使用 App 或游戏期间通常想要密切注意其四周，也可能希望能够同时使用其他软件和系统功能。设法让用户沉浸在作为体验特色的单独任务和内容中，而不应假设 App 或游戏在大多数时间内都需要完全沉浸。例如，用户可在共享空间中使用熟悉的 App 窗口浏览其“照片”相簿，但在想要检查单张照片时，可暂时转换到全空间中更有沉浸感的体验，并在其中放大照片和欣赏细节。

**帮助用户体验 App 或游戏中的关键时刻，无论沉浸程度如何**。调暗、调色、[动态效果](motion.md)、[缩放](spatial-layout.md#Scale)和[空间音频](playing-audio.md#visionOS)等提示有助于吸引用户注意内容的特定区域，无论是位于共享空间的窗口中还是全空间的完全沉浸式体验中。首先使用温和引导用户注意力的微小提示，只有在必要时才加强提示。

**为透视首选淡色调**。在 visionOS 2 及更高版本中，你可以调色透视以促进用户四周与你内容的视觉协调，同时使他们的手看起来融入到体验中。避免使用可能干扰用户和削弱沉浸感的明亮或夸张色调。有关开发者指南，请参阅 [SurroundingsEffect](https://developer.apple.com/cn/documentation/swiftui/surroundingseffect)。

## 提升舒适度

**关注用户的视觉舒适度**。例如，虽然 App 或游戏在全空间中运行时你可以将 3D 内容放在任何位置，但优先将其放在用户的[视场](spatial-layout.md#Field-of-view)内。另外，请确保软件在全空间中运行时以舒适的方式显示动态效果，避免造成干扰、混淆或不适。有关指南，请参阅[动态效果](motion.md)。

**选取的沉浸风格应支持用户在你的 App 或游戏中可能做出的动作**。为沉浸式体验选取正确的风格至关重要，因为这样可让系统在用户移动时进行适当响应。虽然用户在处于沉浸式体验时可进行小幅身体活动，例如移动身体重心、转身或者坐立变换，但大幅度动作可能会导致系统中断某些体验。如果你认为用户可能需要移出 1.5 米的边界，尤其要避免使用 `progressive` 或 `full` 沉浸风格，或者转换回 `mixed` 沉浸风格。

**用户处于渐进式或全沉浸式体验时，避免鼓励其移动**。一些用户可能不想移动，或者因残障或现实环境而无法移动。为用户设计无需移动就能与内容交互的方式。例如，让用户拉近虚拟对象，而非期望用户自身更靠近对象。

**使用 `mixed` 沉浸风格时，避免过多遮挡透视**。用户使用透视来帮助自己了解现实环境并找到方向，因此显示虚拟对象时避免过多遮挡用户视野这一点十分重要。如果 App 或游戏显示的虚拟对象可能大幅遮挡透视，请使用 `full` 或 `progressive` 沉浸风格，而非 `mixed` 风格。

**如果想融合自定义内容与用户的四周，可采用 ARKit**。例如，你不妨将虚拟内容整合进用户的四周，或者使用佩戴者的手部姿态来影响体验。如果需要访问这些类型的敏感数据，你必须请求用户许可。有关指南，请参阅[隐私](privacy.md)；有关开发者指南，请参阅 [SceneReconstructionProvider](https://developer.apple.com/cn/documentation/arkit/scenereconstructionprovider)。

## 在沉浸风格间转换

**为沉浸体验变化设计可预测的平滑转换**。提供可让用户从视觉上追踪变化的平缓转换，以帮助其为不同体验做好准备。避免可能让用户迷失方向或感到不适的突发刺眼转换。有关开发者指南，请参阅 [CoordinateSpaceProtocol](https://developer.apple.com/cn/documentation/swiftui/coordinatespaceprotocol)。

**让用户选择何时进入或退出更有沉浸感的体验**。如果用户在非预期的情况下突然进入更有沉浸感的体验，可能会让其失去方向感。相反，请提供明确操作以进入或退出沉浸体验，以便用户决定何时进一步沉浸在你的内容中和何时离开。例如，Keynote 讲演在其全沉浸式预演环境中提供了显眼的“退出”按钮，帮助用户返回幻灯片查看窗口。避免要求用户使用系统控制降低体验沉浸感。

**表明退出控制的用途**。请确保你的按钮清晰表达会将用户带回之前沉浸感较弱的环境还是完全退出体验。如果退出沉浸式体验会同时退出 App 或游戏，请考虑提供控制来让用户暂停或者回到可在退出前保存其进度的位置。

## 显示虚拟手

沉浸式 App 或游戏转换至全空间时，其可以请求许可来隐藏用户的手并显示相应的虚拟手。

**优先采用与用户熟悉特征匹配的虚拟手**。例如，匹配观看者的手所处的位置和手势，以便他们可以继续以自然的方式与 App 或游戏交互。以用户熟悉方式工作的手有助于在完全虚拟的世界中帮助用户维持沉浸式体验。

**谨慎创建比观看者的手更大的虚拟手**。显著大于人手的虚拟手会遮挡用户感兴趣的内容并让交互变得困难。此外，虚拟手过大会显得与空间不协调，看起来距观看者的脸部过近。

**如果手部跟踪数据中断，请淡出虚拟手并显示观看者自己的手**。不要让虚拟手无响应且看起来僵硬。手部跟踪数据返回时，重新淡入虚拟手。

## 创建环境

App 或游戏转换至全空间时，你可以将透视替换为部分或完全包围用户的自定义环境，使用户置身于全新地点。参考以下指南来设计用户喜欢的优美环境。

**尽量减少干扰内容**。为帮助用户沉浸在观看视频等主要任务中，应避免在环境中显示大量移动或高对比度细节。或者，当你想要让用户注意环境的特定区域时，请考虑在重要区域使用最高质量的纹理和形状，在次要区域使用较低质量的资源并降低亮度等技术。

**帮助用户辨认环境中的交互式对象**。用户通常根据对象远近来决定可否与其交互。例如，如果你将 3D 对象放在远离用户的位置，用户一般不会尝试触控或靠近对象，但如果将 3D 对象放在靠近用户的位置，则用户更愿意尝试与之交互。

**动画应保持微妙**。微妙的小幅度移动（如云朵飘浮或变化）可以丰富你的自定义环境，而不分散用户的注意力或引起不适。始终避免在用户的视场边缘附近显示过多的移动。有关指南，请参阅[动态效果](motion.md)。

**创建开阔的环境，不管描绘的是什么地方**。受限的小环境会让用户感觉不适甚至幽闭恐惧。

**使用空间音频营造氛围**。在 visionOS 中，你可以使用空间音频来播放声音，让用户感觉到声音来自空间中的特定位置，而不仅仅来自扬声器（有关指南，请参阅[播放音频](playing-audio.md)）。设计增强自定义环境的声景时，避免过多的重复或循环，由此保持体验的新鲜感和吸引力。如果用户可以在你的环境中播放其他音频，请确保播放期间（例如，看电影期间）降低声景的音量或者完全停止声景播放。

**一般应避免使用 360 度平面图像来创建环境**。用户在环境中查看 360 度图像时无法感知范围的大小，因此体验的沉浸感会被削弱。优先创建包含光线的对象网格，并使用着色器实现精细的动画，如云朵或树叶的运动或物体的反光。

**帮助用户感到脚踏实地**。始终提供地平面网格来让用户没有飘浮感。如果必须在环境中使用 360 度平面图像，添加地平面网格可以让环境更有真实感。

**尽量减少资源冗余**。过于频繁使用同一资源或模型往往会削弱环境的真实感。

## 平台考量因素

*在 iOS、iPadOS、macOS、Apple tvOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[空间布局](spatial-layout.md)

[动态效果](motion.md)

#### 开发者文档

[Creating fully immersive experiences in your app](https://developer.apple.com/cn/documentation/visionos/creating-fully-immersive-experiences) — visionOS

[Incorporating real-world surroundings in an immersive experience](https://developer.apple.com/cn/documentation/visionos/incorporating-real-world-surroundings-in-an-immersive-experience) — visionOS

[ImmersionStyle](https://developer.apple.com/cn/documentation/swiftui/immersionstyle) — visionOS

[Immersive spaces](https://developer.apple.com/cn/documentation/swiftui/immersive-spaces) — SwiftUI

#### 视频

- [为 visionOS App 和空间网络设计沉浸式环境](https://developer.apple.com/cn/videos/play/wwdc2026/234)
- [空间设计的原则](https://developer.apple.com/cn/videos/play/wwdc2023/10072)
- [设计空间同播共享体验 ](https://developer.apple.com/cn/videos/play/wwdc2023/10075)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 阐明并注明了竖排方向渐进式沉浸的可用性指南。 |
| 2024 年 11 月 19 日 | 优化了沉浸风格指南，新增了插图。 |
| 2024 年 6 月 10 日 | 新增了调色透视以及指定初始、最小和最大沉浸程度的指南。 |
| 2024 年 5 月 7 日 | 新增了创建环境的指南。 |
| 2024 年 2 月 2 日 | 阐明了选取沉浸风格时应与 App 提供的体验相匹配的指南。 |
| 2023 年 10 月 24 日 | 更新了插图。 |
| 2023 年 6 月 21 日 | 新页面。 |
