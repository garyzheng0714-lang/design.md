# 表盘

原文：https://developer.apple.com/cn/design/human-interface-guidelines/watch-faces

表盘视图是被用户选取用作 watchOS 的主视图。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-faces-intro@2x.png)

表盘是 watchOS 体验的核心。用户可选取想在每次抬腕时看到的表盘，并使用其喜爱的复杂功能进行自定义。用户甚至可为不同的活动自定义各种不同表盘，以便可以切换到适合其当前环境的表盘。

在 watchOS 7 及更高版本中，用户可以共享其配置的表盘。例如，健身教练可以通过选取“渐变”表盘、自定义颜色以及添加学员喜爱的健康和健身复杂功能来配置要与学员共享的表盘。当学员将共享表盘添加到其 Apple Watch 或 iPhone 上的 Watch App 时，无需自己配置即可获得自定义体验。

你还可以配置表盘以从你的 App 内、网站上或者通过“信息”、“邮件”或社交媒体进行共享。提供可共享的表盘有助于让更多用户了解你的复杂功能和 App。

## 最佳实践

**通过共享具有复杂功能的表盘，帮助用户探索你的 App**。理想情况下，你可以支持多种复杂功能，以便在可共享的表盘中进行展示，并提供量身打造的体验。对于部分表盘，你还可以指定系统强调色、图像或样式。如果用户添加了你的表盘，但尚未安装你的 App，系统会提示其安装。

**显示你共享的各个表盘的预览**。显示突显你表盘优点的预览可帮助用户直观看到其好处。你可以使用 iOS Watch App 将表盘通过电子邮件发送给自己，以获得预览。该预览包括围着表盘的设备边框插图，并且适合在网站上以及 watchOS 和 iOS App 中显示。或者，你还可以将插图边框替换为高保真硬件边框，后者可从 [Apple 设计资源](https://developer.apple.com/design/resources/#product-bezels)下载并合成到预览上。有关开发者指南，请参阅 [Sharing an Apple Watch face](https://developer.apple.com/cn/documentation/clockkit/sharing-an-apple-watch-face)。

**旨在为所有 Apple Watch 设备提供可共享的表盘**。部分表盘在 Series 4 及后续机型上可用，如“加州”、“计时码表专业”、“渐变”、“图文”、“图文模块”、“子午线”、“紧凑模块”和“太阳刻度盘”。“探索者”在 Series 3（蜂窝网络版本）及后续机型上可用。如果你的配置中使用了这些表盘中的一个，请考虑再使用一个 Series 3 及更早机型上可用的表盘来提供类似的配置。为帮助用户做出选择，你可以为每个可共享的表盘清晰标上其支持的设备。

**如果用户选取了不兼容的表盘，请妥善进行处理**。当用户尝试在 Series 3 或更早机型上使用不兼容的表盘时，系统会向你的 App 发送错误。在这种情况下，考虑立即提供使用兼容表盘的备选配置，而非显示错误。在提供预览的同时，还要帮助用户了解：如果选取了与其 Apple Watch 不兼容的表盘，可能会收到备选表盘。

## 平台考量因素

*在 iOS、iPadOS、macOS、Apple tvOS 或 visionOS 中不受支持。*

## 资源

#### 相关内容

[Apple 设计资源 — 产品边框](https://developer.apple.com/design/resources/#product-bezels)

#### 开发者文档

[Sharing an Apple Watch face](https://developer.apple.com/cn/documentation/clockkit/sharing-an-apple-watch-face) — ClockKit
