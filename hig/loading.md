# 加载

原文：https://developer.apple.com/cn/design/human-interface-guidelines/loading

最佳的内容加载体验应在用户意识到加载之前完成。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-loading-intro@2x.png)

如果 App 或游戏会加载资源、关卡或其他内容，请设计不会对用户体验造成干扰或负面影响的行为。

## 最佳实践

**尽快显示内容**。如果要让用户等待加载完成后才显示内容，用户可能会将内容缺失理解为 App 或游戏存在的问题。相反，应考虑随内容加载显示占位符文本、图形或动画，并在内容变为可用时替换这些元素。

**当用户等待内容加载时，让其可在 App 或游戏中执行其他操作**。在后台加载内容有助于让用户访问其他操作。例如，当玩家了解下一关卡或查看游戏内菜单时，游戏可在后台加载内容。有关开发者指南，请参阅 [Improving the player experience for games with large downloads](https://developer.apple.com/cn/documentation/gamekit/improving-the-player-experience-for-games-with-large-downloads)。

**如果加载不可避免地需要较长时间，向用户提供等待时可观看的有趣内容**。例如，你可以提供游戏玩法窍门、显示提示或向用户介绍新功能。尽可能准确地估计剩余加载时长，以帮助避免留给用户的时间过短而来不及欣赏占位符内容，或者时间过长以至于需要重复内容。

**通过在后台下载大型资源来优化安装和启动时间**。考虑使用 [Background Assets](https://developer.apple.com/cn/documentation/backgroundassets) 框架将资源下载（如游戏关卡包、3D 角色模型和纹理）安排在安装后立即进行、或者在更新期间或在其他不干扰时段进行。

## 显示进度

**清楚说明内容正在加载和完成可能需要的时长**。理想情况下，内容会立即显示，但在加载需要几秒以上的情况下，你可以使用系统提供的组件（称为*进度指示符*）来显示正在进行加载。一般而言，在你知道加载所需时长时可使用*确定型*进度指示符，在无法得知时可使用*不确定型*进度指示符。有关指南，请参阅[进度指示符](progress-indicators.md)。

**考虑为游戏创建自定义加载视图**。虽然标准进度指示符在大多数 App 中效果很好，但在游戏中有时会格格不入。考虑使用符合你游戏风格的自定义动画和元素来设计更有吸引力的体验。

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS 或 visionOS 的额外考量因素。*

### watchOS

**尽可能避免在 watchOS 体验中显示加载指示符**。用户希望与其 Apple Watch 进行快速交互，因此要致力于立即显示内容。在加载内容需要一两秒钟的情况下，最好显示加载指示符，而不是显示空白屏幕。

## 资源

#### 相关内容

[启动](launching.md)

[进度指示符](progress-indicators.md)

#### 开发者文档

[Background Assets](https://developer.apple.com/cn/documentation/backgroundassets)

#### 视频

- [探索 Apple 托管的 Background Assets](https://developer.apple.com/cn/videos/play/wwdc2025/325)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 修改了储存下载的指南以反映后台大型资源的下载。 |
| 2024 年 6 月 10 日 | 新增了显示进度和储存下载的指南，以及完善了针对游戏的指南。 |
