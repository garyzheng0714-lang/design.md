# App 图标

原文：https://developer.apple.com/cn/design/human-interface-guidelines/app-icons

一个独特、好记的图标可表达你 App 或游戏的用途和个性，还可帮助用户一眼识别你的产品。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/foundations-app-icons-intro@2x.png)

App 图标是 App 或游戏品牌推广和用户体验的重要组成部分。它显示在主屏幕上和系统中的各个关键位置，包括显示在搜索结果、通知、系统设置和共享表单中。设计巧妙的 App 图标会在所有 Apple 平台上清晰连贯地传达 App 或游戏的特性。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-icons-platform-appearance-overview@2x.png)

## 分层设计

虽然你可以为图标提供扁平图像，但分层可让你最大程度控制图标设计呈现的方式。分层的 App 图标组合在一起会产生深度感和活力感。在每个平台上，系统会应用响应周围环境和用户交互的视觉效果。

iOS、iPadOS、macOS 和 watchOS App 图标包括一个背景层以及一个或多个前景层，它们组合在一起可产生维度感。这些图标具有镜面高光、折射和半透明等 Liquid Glass 属性。这些效果会自动适配图标大小、在平台间一致地应用，并可在系统版本间以不同方式呈现。

Apple tvOS App 图标使用二至五个叠层，以在用户聚焦到这些图标时营造动态感。获得焦点时，App 图标会响应用户手指在其遥控器上的移动而提升至前景，并在表面发光时轻微摇摆。层与层之间的分离和透明度的使用形成了视差效果期间的深度感。

visionOS App 图标包括一个背景层及其上方的一至两层，以生成在用户查看时会巧妙展开的三维对象。系统通过添加阴影体现各层之间的深度感并使用上层的 Alpha 通道打造浮凸感外观，以增强图标的视觉维度。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-app-icon-showcase.mp4)
*visionOS App 图标*

使用喜爱的设计工具为 App 图标打造各个前景层。对于 iOS、iPadOS、macOS 和 watchOS 图标，你可以之后将图标层导入 Xcode 附带的设计工具 Icon Composer 中，该工具可从 [Apple 开发者网站](https://developer.apple.com/icon-composer)下载。在 Icon Composer 中，你可定义图标的背景层，调整前景层的放置，应用镜面高光和折射等视觉效果，注释默认、深色和单色外观变体，在系统版本间测试和预览图标，以及导出图标供用于 Xcode 中。有关更多指南，请参阅：[Creating your app icon using Icon Composer](https://developer.apple.com/cn/documentation/xcode/creating-your-app-icon-using-icon-composer)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-icons-icon-composer-overview-photos@2x.png)
*Icon Composer*

对于 Apple tvOS 和 visionOS App 图标，你可以在 Xcode 中将图标层直接添加到图像叠层以形成完整图标。你可以从 [Apple 设计资源](https://developer.apple.com/design/resources/)下载 Parallax Previewer 和 Parallax Exporter 插件，从而预览和测试视差视觉效果。有关开发者指南，请参阅 [Configuring your app icon using an asset catalog](https://developer.apple.com/cn/documentation/xcode/configuring-your-app-icon)。

**首选在前景层中使用清晰边缘**。为确保系统绘制的高光和阴影效果更佳，请避免为前景层形状使用柔和和羽化边缘。

**改变前景层中的不透明度，增加深度感和生动感**。例如，“照片”图标将其中心图案分隔成包含半透明部件的多个层，让设计更具有动感。在 Icon Composer 中导入完全不透明的层并调整透明度，即可基于透明度和系统效果互相影响的方式预览和调整设计。

**设计醒目且同时强调前景内容的背景**。如果为背景层选取渐变，确保其能良好响应系统光效。Icon Composer 支持纯色和渐变背景层，因此在大多数情况下无需导入自定义背景图像。如果确实要导入背景层，确保其为全幅且不透明。

**将层导入 Icon Composer 时，首选矢量图形**。与光栅图像不同，矢量图形（如 SVG 或 PDF）缩放平滑且在任何大小下都可锐利清晰显示。在设计中为插图绘制轮廓并将文本转换为轮廓。网格渐变和光栅插图首选 PNG 格式，因为这是一种无损的图像格式。

## 图标形状

App 图标的形状因平台视觉语言而异。在 iOS、iPadOS 和 macOS 中，图标为正方形，且系统会应用遮罩生成圆角，以精确匹配整个系统中其他圆角界面元素和实体设备本身外框的曲度。在 Apple tvOS 中，图标为矩形，同样带有同心边缘。在 visionOS 和 watchOS 中，图标为正方形，且系统会应用圆形遮罩。

**iOS、iPadOS、macOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-icons-settings-app-grid-square@2x.png)

**Apple tvOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-icons-settings-app-grid-rectangle@2x.png)

**visionOS、watchOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-icons-settings-app-grid-circle@2x.png)

**创建形状合适的未遮罩层**。系统会为所有层边缘添加遮罩，生成图标的最终形状。对于 iOS、iPadOS 和 macOS 图标，请提供正方形层供系统应用圆角。对于 visionOS 和 watchOS，请提供正方形层供系统创建圆形图标形状。对于 Apple tvOS，请提供矩形层供系统应用圆角。提供带预定义遮罩的层会对镜面高光效果产生负面影响，并使边缘看起来有锯齿。

**保持主要内容居中，避免其在系统调整圆角或应用遮罩时被截断**。在 visionOS 和 watchOS 图标中，请特别注意将内容居中。为协助放置图标，请使用 App 图标制作模板中的网格，模板可在 [Apple 设计资源](https://developer.apple.com/design/resources/)中找到。

## 设计

图标设计应拥抱简洁。简单的图标往往更容易被用户理解和识别。经系统提供的阴影和高光渲染后，包含精细视觉特征的图标可能看起来非常杂乱，且在较小尺寸下，细节还可能很难辨别。找到可抓住 App 或游戏精髓的概念或元素，使之成为图标的核心理念，并以简洁、独特且使用最少形状的方式表达出来。优先使用简单的背景（如纯色或渐变），将重点放在主要设计上，你不需要在整个图标画布上填满内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-icons-embrace-simplicity-podcasts@2x.png)
*“播客” App 图标*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-icons-embrace-simplicity-home@2x.png)
*“家庭” App 图标*

**为 App 支持的所有平台提供视觉上一致的图标设计**。无论 App 显示在何处，一致的设计有助于用户快速找到它，并防止用户将你的 App 与多个其他 App 混淆。

**考虑基于实心的重叠形状图标设计**。前景中重叠的实心形状可为图标带来深度感，与透明和模糊效果搭配时更是如此。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-icons-element-outline-shape@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-icons-element-filled-shape@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

**仅在文本对体验或品牌不可或缺时，才包括文本**。图标中的文本不支持无障碍或本地化，通常太小而难以看清，且可能使图标看起来杂乱。在部分环境中，App 名称已显示在附近，因此在图标本身内部显示名称有些累赘。虽然显示助记符（如 App 名称的首字母）可以帮助用户识别你的 App 或游戏，但请避免包括一些告诉用户如何操作的非必要字词（如“观看”或“播放”），或者语境特定词（如“全新”或“visionOS 版”）。如果要在 Apple tvOS App 图标中包括文本，请确保其位于其他层上方，以防止被视差效果裁剪。

**优先采用插图而非照片，并避免重复出现用户界面组件**。照片细节丰富，在不同外观中显示、以较小尺寸查看或拆分成多层时并非都能良好呈现。与其使用照片，不如创建表示内容的图形，并在其中强调你希望用户注意到的特征。务必避免使用极细的线条和锐角，因为在分辨率较低的较小尺寸图标中，它们往往会失去细节和清晰度。如果 App 具有用户认识的界面，请勿仅复制标准用户界面组件或在图标中使用 App 截屏。

**不要以 Apple 硬件产品为设计原型**。Apple 产品受版权保护，不能在你的 App 图标中再现。

## 视觉效果

**让系统处理模糊及其他视觉效果**。系统会为 App 图标层动态应用视觉效果，因此无需包括镜面高光、层间投影、斜角边缘、模糊、光晕及其他效果。除了会干扰系统提供的效果外，自定义效果为静态，而系统提供的效果则为动态。如果确实要在图标层上包括自定义视觉效果，请有意识地使用并在 Icon Composer、Device Hub 中的模拟设备或实体设备上仔细测试，确保其按预期显示且不会与系统效果产生冲突。

**创建层群组以将效果一次性应用到多层**。系统效果通常对各层单独生效。但如果适用于你的设计，你可以在 Icon Composer 或设计工具中将多层组合在一起，使效果以群组为单位生效。对于群组，Icon Composer 提供 Liquid Glass 效果的附加自定义选项，因此你可以配置镜面高光、折射和半透明等属性。

## 外观

在 iOS、iPadOS 和 macOS 中，用户可为其主屏幕 App 图标选取默认、深色、透明色或色调外观。例如，用户可能希望个性化其 App 图标外观来适配墙纸。你可以为每种外观变体设计 App 图标变体，系统还会自动生成你未提供的变体。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-icons-rendering-modes@2x.png)

**在各种外观下保持图标特征一致**。为打造无缝体验，请保持图标的核心视觉特征在默认、深色、透明色和色调外观下都相同。避免在创建自定义图标变体时来回替换每种变体中的元素，这样可能导致用户在切换外观后更难找到你的 App。

**设计的深色和色调图标与系统 App 图标和小组件放在一起时应看起来与原生无异**。你可以保留默认图标的调色盘，但请注意，深色图标看起来更为柔和，透明色和色调图标看起来更甚。优秀的 App 图标在各种外观变体下都应看起来清晰、易读且容易识别。

**将浅色 App 图标用作深色图标的基础**。选取反映默认设计的补充颜色，且避免采用过亮图像。颜色背景通常可为深色图标提供更好的对比度。有关指南，请参阅[深色模式](dark-mode.md)。

**考虑提供备选 App 图标**。在 iOS、iPadOS、Apple tvOS 中和 visionOS 上运行的兼容 App 中，你可以让用户访问 App 的设置来选取 App 图标的备选版本。例如，体育 App 可为不同的球队提供不同的图标，让用户选取自己的最爱。如果提供此功能，请确保设计的每个图标都尽可能贴近你的内容和体验。避免创建用户可能误认作其他 App 的图标。

> **注**
>
> iOS 和 iPadOS 中的备选 App 图标需要各自的深色、透明色和色调变体。与默认 App 图标一样，所有备选和变体图标均需接受 App 审核，并且必须遵守 [App 审核指南](https://developer.apple.com/app-store/review/guidelines/#design)。

## 平台考量因素

*无针对 iOS、iPadOS 或 macOS 的额外考量因素。*

### Apple tvOS

**包括安全区域，确保系统不会裁剪内容**。用户聚焦于 App 图标时，系统可能会随着图标缩放和移动而裁剪边缘周围的内容。为确保图标内容始终可见，请在其四周保留安全区域。请注意，安全区域可能会根据图像大小、图层深度和运动而变化，且系统对前景层的裁剪多于背景层。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tvos-app-icon-safe-zone@2x.png)

### visionOS

**避免在背景层中添加看起来像孔洞或凹面区域的形状**。系统添加的阴影和镜面高光可使此类形状看起来突出而非内凹。

### watchOS

**避免使用黑色的图标背景**。调亮黑色背景，使图标不会融入显示屏背景中。

## 规范

App 图标的布局、大小、样式和外观因平台而异。

| 平台 | 布局形状 | 系统遮罩后的图标形状 | 布局大小 | 样式 | 外观 |
| --- | --- | --- | --- | --- | --- |
| iOS、iPadOS、macOS | 正方形 | 圆角矩形（正方形） | 1024x1024 个像素 | 分层 | 默认、深色、透明浅色、透明深色、色调浅色、色调深色 |
| Apple tvOS | 矩形（横向） | 圆角矩形（矩形） | 800x480 个像素 | 分层（视差） | 不适用 |
| visionOS | 正方形 | 圆形 | 1024x1024 个像素 | 分层 (3D) | 不适用 |
| watchOS | 正方形 | 圆形 | 1088x1088 个像素 | 分层 | 不适用 |

系统会自动缩放图标，生成在“设置”和通知等某些位置显示的较小变体。

App 图标支持以下色彩空间：

- sRGB（颜色）
- 灰度系数 2.2（灰度）
- Display P3（广色域仅限 iOS、iPadOS、macOS、Apple tvOS 和 watchOS）

## 资源

#### 相关内容

[Apple 设计资源](https://developer.apple.com/design/resources/)

[Icon Composer](https://developer.apple.com/icon-composer/)

[图标](icons.md)

[图像](images.md)

[深色模式](dark-mode.md)

#### 开发者文档

[Creating your app icon using Icon Composer](https://developer.apple.com/cn/documentation/xcode/creating-your-app-icon-using-icon-composer)

[Configuring your app icon using an asset catalog](https://developer.apple.com/cn/documentation/xcode/configuring-your-app-icon)

#### 视频

- [了解焕然一新的 App 图标](https://developer.apple.com/cn/videos/play/wwdc2025/220)
- [使用 Icon Composer 构建图标](https://developer.apple.com/cn/videos/play/wwdc2025/361)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 6 月 8 日 | 优化了 Liquid Glass 指南。 |
| 2025 年 6 月 9 日 | 更新了指南以反映分层图标、平台间一致性和 Liquid Glass 最佳实践。 |
| 2024 年 6 月 10 日 | 新增了为 iOS 和 iPadOS 创建深色和色调 App 图标变体的指南。 |
| 2024 年 1 月 31 日 | 阐明了备选 App 图标的平台可用性。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
| 2022 年 9 月 14 日 | 新增适用于 Apple Watch Ultra 的规范。 |
