# 轻 App

原文：https://developer.apple.com/cn/design/human-interface-guidelines/app-clips

轻 App 是 App 或游戏的轻量级版本，提供了立即可用的便捷或演示体验。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-app-clips-intro@2x.png)

轻 App 让用户无需从 App Store 下载完整 App，即可体验你的 App 或游戏。轻 App 主要提供任务的快速解决方案或者包含展示完整 App 或游戏的演示，其在保护用户隐私的同时会在有限时间段内保留在设备上。

用户可在不同场景和环境中发现和启动轻 App。在实际场所，用户可通过扫描轻 App 码、NFC 标签或二维码启动轻 App。轻 App 码往往是用户发现和启动轻 App 的最佳方式，因为它采用让人一目了然的独特设计，并且用户相信它能够提供一种快速、安全的方式来启动轻 App。

用户可在其设备上，通过在 Siri 建议、“地图” App、网站上的智能 App 横幅、Safari 浏览器内轻 App 卡片中允许的基于位置的建议，以及在“信息” App 中轻点他人共享的链接来启动轻 App。从 iOS 17 起，App 可以包括链接和轻 App 预览，用户轻点即可启动另一个 App 的轻 App。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-clips-hero-1@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-clips-hero-2@2x.png)

如果你的 App 提供即时体验，可帮助用户在有限的时间内执行某项任务，请考虑创建轻 App。例如：

- 租赁自行车可能附带轻 App 码，用户轻点或扫描该图形码即可启动轻 App，以便租赁自行车。
- 咖啡店可以针对快速预购提供轻 App，顾客可以通过咖啡店网站上的智能 App 横幅或轻 App 卡片启动该轻 App。顾客可以通过“信息” App 分享该网站的链接，然后收件人轻点该链接即可从“信息”中启动轻 App。
- 流动餐车可以制作包含轻 App 码的营销材料（例如，宣传时令菜肴的海报）。用户可以使用设备上的“相机” App 扫描轻 App 码，然后立即启动轻 App 来订购时令菜肴。
- 餐厅可以让用餐者通过以下方式支付餐费：从“地图” App 或 Siri 建议提供的建议启动轻 App，或者将设备靠近餐桌上的轻 App 码或 NFC 标签。
- 博物馆可以让参观者扫描所展示作品旁边标签上的轻 App 码或二维码启动轻 App，以显示增强现实内容或提供音频解说。

考虑创建可让用户在购买或订阅前体验你 App 或游戏的轻 App。专注于向用户提供体验并了解你 App 或游戏的机会。例如：

- 游戏可能提供轻 App 让用户试玩游戏的演示版本，并在其中包含游戏教程和第一关。
- 健身 App 可能提供包含免费体能训练和引导式冥想的轻 App。
- 文本编辑程序可能允许用户使用演示轻 App 创建并保存文稿。

有关开发者指南，请参阅 [App Clips](https://developer.apple.com/cn/documentation/appclip)。

## 设计轻 App

**允许用户在轻 App 中完成任务或演示**。不要求用户必须安装完整版 App 才能体验整个演示、完成任务或通过游戏某一关卡。

**专注于必需功能**。与轻 App 的交互应快速且有针对性。将功能限制为完成手头任务所需的功能，为 App 保留高级或复杂功能。如果提供完整 App 的演示版本，请专注于向用户提供良好游戏或 App 功能感受的必需功能。

**不要仅出于营销目的使用轻 App**。轻 App 需要提供真正的价值，帮助用户完成任务。不要将它们用作宣传服务或产品的手段，也不要在轻 App 中显示广告。

**避免在轻 App 中使用网页视图**。轻 App 使用原生组件和框架提供 App 质量的体验。如果只能使用网页组件，请提供网站的快速链接而不是轻 App。

**设计线性、易用且有针对性的用户界面**。轻 App 不需要标签页栏、复杂的导航或设置。尽量减少屏幕和输入表单的数量。尽可能移除无关信息并降低用户界面的复杂性。

**启动时显示轻 App 中最相关的部分**。跳过不必要的步骤，让用户立即进入轻 App 中最切合其使用环境的部分。

**确保用户可以立即使用轻 App**。轻 App 需要包括所有必需的资源，省略启动画面，绝不要让用户等待启动。

**确保轻 App 的小巧**。轻 App 越小，它在用户设备上启动的速度就越快。在带宽有限的情况下，保持轻 App 的小巧尤其重要。尽可能减少不必要的代码并移除未使用的资源。避免下载额外的数据，这可能会消除即时性。

**使轻 App 可共享**。当用户在“信息” App 中共享轻 App 的链接时，收件人可以从“信息” App 中启动该轻 App。提供共享轻 App 中特定点的链接的功能，并鼓励用户与他人共享轻 App。

**轻松为服务或产品付款**。输入付款信息可能是一项漫长且容易出错的任务。考虑支持 [Apple Pay](apple-pay.md) 以实现快速结账，让用户无需键入即可输入送货信息。

**在用户可以从轻 App 中受益之前，避免要求其创建账户**。创建账户是一项复杂的任务，需要耗费时间和精力。考虑不需要账户，或考虑要求用户在完成任务后创建账户。如果轻 App 需要账户才能提供价值，请限制用户需要提供的信息量，例如提供[通过 Apple 登录](sign-in-with-apple.md)来进行限制。

**在 App 中提供熟悉、有针对性的体验**。当用户安装完整版 App 时，它会替换用户设备上的轻 App。从这一刻起，本应启动轻 App 的调用将改为启动完整版 App。确保你的 App 为之前使用轻 App 的用户提供有针对性且熟悉的体验。不要让会减慢用户速度的额外步骤成为必需；例如，当用户从轻 App 过渡到 App 时，不需要用户重新登录。

### 保护隐私

系统对轻 App 施加了限制，以确保用户的隐私。例如，轻 App 无法执行后台操作。有关开发者指南，请参阅 [Choosing the right functionality for your App Clip](https://developer.apple.com/cn/documentation/appclip/choosing-the-right-functionality-for-your-app-clip)。

**限制自行储存和处理的数据量**。如果你需要储存用户数据（例如，登录信息），请安全地储存。此外，不要依赖之前储存在设备上的数据，系统可能在每次启动时从设备中移除了轻 App 并删除了它的所有数据。如果要储存登录信息，请将其安全地储存在设备之外。

**考虑提供“通过 Apple 登录”**。“通过 Apple 登录”可以在用户的设备之外安全地保留登录信息并保护其隐私。有关指南，请参阅[通过 Apple 登录](sign-in-with-apple.md)。

**提供一种安全的方式为服务或产品付款，同时尊重用户隐私**。例如，考虑提供 [Apple Pay](apple-pay.md)。

### 展示你的 App

用户无需自行管理轻 App，并且轻 App 不会显示在主屏幕上。相反，系统会在轻 App 处于非活跃状态一段时间后将其移除。

由于 App 仍然是用户长期保持参与度的最佳方式，系统可帮助其发现并安装完整版 App：

- 在轻 App 卡片上，用户可以启动轻 App 或访问 App Store 中的完整版 App 页面。
- 当用户首次启动轻 App 时，系统会在屏幕顶部显示 App 横幅。与轻 App 卡片一样，横幅可让用户访问 App Store 中该 App 的页面。

此外，你还可以在轻 App 中显示一个叠层，以便用户从轻 App 中下载完整版 App。

**不要要求用户安装完整版 App，从而影响用户体验**。如果轻 App 提供随时可用的体验，应考虑轻 App 卡片和系统提供的 App 横幅是否足够激励用户下载完整版 App。如果轻 App 提供演示体验，请在询问用户安装完整版 App 前让其充分体验演示。

**选择合适的时机推荐你的 App。**  当用户完成某项任务或者自然暂停时，显示 [SKOverlay](https://developer.apple.com/cn/documentation/storekit/skoverlay) 以允许用户从轻 App 环境启动完整版 App 或游戏下载。

**通过自然、礼貌的方式推荐你的 App**。不要反复要求用户安装完整版 App，也不要在用户执行任务期间打断。推送通知也并非要求用户安装 App 的良策。清晰地传达 App 的附加功能。

有关开发者指南，请参阅 [Recommending your app to App Clip users](https://developer.apple.com/cn/documentation/appclip/recommending-your-app-to-app-clip-users)。

### 限制通知

轻 App 提供在启动后最长 8 小时内定时推送和接收通知的选项，并且有足够的时间跟进和完成大多数常见任务。

**仅在确实需要时请求长时间使用通知的许可**。如果轻 App 功能跨越的时间超过一天，请明确请求定时推送和接收通知的许可。例如，汽车租赁公司的轻 App 可以请求发送通知的许可，提醒用户需要尽快归还租赁的汽车。

**确保通知具有针对性**。不要发送纯粹的促销通知，并且仅使用通知来响应明确的用户操作。如果用户在不离开轻 App 的情况下完成其任务，你可能根本不需要发送任何通知。

**利用通知来帮助用户完成任务**。轻 App 的通知与轻 App 协助完成的任务直接相关。例如，帮助用户订餐的轻 App 可以发送与定时送货相关的通知。

有关开发者指南，请参阅 [Enabling notifications in App Clips](https://developer.apple.com/cn/documentation/appclip/enabling-notifications-in-app-clips)。

### 为商户创建轻 App

如果你是为商户提供服务的平台提供商，可以在 [App Store Connect](https://appstoreconnect.apple.com) 中打造多种轻 App 体验，并使用单个轻 App 为其提供支持。对于使用轻 App 的用户而言，它显示的是单个商户或营业地点的品牌，而不是你自己的品牌。

**使用一致的品牌**。当用户看到一家商户的轻 App 卡片时，该商户的品牌位于最显眼、最核心的位置。淡化你自己的品牌并确保该商户的品牌清晰可见，以避免用户在体验轻 App 时感到困惑。

**考虑多个商户**。轻 App 可以为多个不同的商户或拥有多个营业地点的商户提供支持。在这两种情况下，用户最终可能一次性将轻 App 用于多个商户或营业地点。轻 App 必须处理该用例并相应地更新其用户界面。例如，考虑以下方式，即在轻 App 内的最近商户或营业地点之间切换，并在用户启动时验证其位置。

有关开发者指南，请参阅 [Configuring App Clip experiences](https://developer.apple.com/cn/documentation/appclip/configuring-the-launch-experience-of-your-app-clip)。

## 为轻 App 卡片创建内容

系统提供的轻 App 卡片是用户与轻 App 的首次交互，因此需要仔细考量其图像和文案。

**提供有用信息**。确保轻 App 卡片上的图像清楚地传达了其提供的功能、支持的任务或内容。

**首选照片和图形**。避免使用 App 用户界面的截屏，因为它不太可能传达轻 App 的用途。应使用有助于用户了解轻 App 价值的图像，或其相关业务地点或兴趣点的照片。

**避免使用文本**。标题图像中的文本不可进行本地化，不易阅读，并且可能会降低卡片图像的美观性。

**遵循图像要求**。使用不透明的 1800x1200 个像素 PNG 或 JPEG 图像。

**使用简洁的文案**。轻 App 卡片需要标题和副标题。在可用空间内清晰地表达轻 App 的用途，以便用户可以一目了然地阅读和理解。创建不超过 30 个字符的标题和不超过 56 个字符的副标题。

**为最适合轻 App 的操作按钮选择一个动词**。可能的动词包括*查看*、*播放*或*打开*。对于媒体或在轻 App 提供信息性或教育性内容时，选择*查看*。对于游戏，选择*开始游戏*。对于所有其他轻 App，选择*打开*。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-clips-card@2x.png)

## 轻 App 码

轻 App 码是让用户发现你的轻 App 的最佳方式。它采用让人一目了然的独特设计，并且可提供一种快速、安全的方式来启动你的轻 App。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/with-appclip-logo@2x.png)
*带轻 App 标志的轻 App 码*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/without-appclip-logo@2x.png)
*不带轻 App 标志的轻 App 码*

轻 App 码始终使用 Apple 提供的设计，并遵循大小、位置和打印指南。选取使用轻 App 标志（ 轻 App）的标记设计或（在空间有限时）不使用轻 App 标志的标记设计。创建使用默认颜色对的轻 App 码，或者选取自定义前景颜色和背景颜色。有关开发者指南，请参阅：[Creating App Clip Codes](https://developer.apple.com/cn/documentation/appclip/creating-app-clip-codes)。

### 与轻 App 码交互

轻 App 码有两种变体：*仅扫描*或带有嵌入式 NFC 标签（*集成 NFC*）。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/scan-only@2x.png)

仅扫描变体使用位于其中心处的相机图标，让用户了解其可以使用“相机” App 或“控制中心”中的“扫码器”扫描轻 App 码。集成 NFC 变体使用位于其中心处的 iPhone 图标，引导用户将设备靠近轻 App 码或使用“控制中心”中的“NFC 标签读卡器”扫描轻 App 码。用户还可以使用“相机” App 或“控制中心”中的“扫码器”扫描集成 NFC 的轻 App 码。例如：

- 咖啡店可以在菜单中放置轻 App 码。顾客可以将其设备靠近轻 App 码，然后立即启动咖啡店的轻 App 点一杯饮料。
- 加油站可以在每个泵上附加集成 NFC 的轻 App 码。游客可以将其设备靠近该轻 App 码来启动加油站的轻 App，并用它来支付加油费用。
- 电子游戏开发者可以在行业活动上分发包含轻 App 码的营销材料。活动参与者可以扫描该轻 App 码以启动演示最新电子游戏的试玩版轻 App。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/interacting-coffee-shop-example@2x.png)

### 展示轻 App 码

当你开始设计轻 App 码时，选择最适合用户使用轻 App 的方式的变体。如果用户可以实际访问轻 App 码，请使用集成 NFC 变体。例如：

- 餐厅桌面上
- 零售店收银台附近
- 商店橱窗里
- 标牌上
- 礼品卡或优惠券上

如果你需要将轻 App 码放置在无法实际访问的区域或者你需要以数字方式展示它，请使用仅扫描轻 App 码。例如：

- 海报或印刷广告上
- 柜台后或商店内无法触及的标牌上
- 数字媒介（例如数字显示）、电子邮件、或发布到社交媒体上的图像中

无论使用这两种变体中的哪一种，请务必仔细考虑轻 App 码的放置位置，以确保可靠的扫描体验。

**在空间允许时包括轻 App 标志**。该标志有助于清楚地表明此图形码会启动轻 App；但是，如果无法满足净间距要求，请使用不带轻 App 标志的轻 App 码设计。此外，如果将轻 App 码放置在一次性纸张或塑料物品上，或者与博彩或饮酒相关的物品上，请使用不带轻 App 标志的设计。例如，在扑克牌、扑克筹码或酒吧杯垫上，使用不带轻 App 标志的轻 App 码。轻 App 标志始终是标记设计的一部分，它显示在轻 App 码的下方；切勿单独使用轻 App 标志。

**仅将轻 App 码放置在平面或圆柱面上**。如果将轻 App 码放置在圆柱面上（例如，滑板车的车把上），请确保轻 App 码的宽度不超过圆柱体周长的六分之一。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-clips-slice@2x.png)

**让轻 App 码尽可能保持平整，以便用户轻松扫描**。为了提供最佳扫描体验，请避免在容易折叠或起皱的可变形材料（例如，纸张、塑料或织物）上展示轻 App 码。如果你需要在袋子、弹性盒子或其他可变形物品上提供轻 App 码，请在附加到该物品的刚性物品（例如，卡片）上展示该轻 App 码。如果要制作轻 App 码贴纸，请确保它牢牢粘附在平面上。

**将轻 App 码放置在有助于确保可靠扫描的位置**。例如，将仅扫描轻 App 码放置在以下位置：可提供足够的光线以确保可靠扫描，同时不需要用户从较大角度进行扫描。

**确保轻 App 码无遮挡**。不要用文本、标志或图像覆盖轻 App 码。切勿动态展示轻 App 码或将其调暗。

**竖直展示轻 App 码**。不要旋转所生成的轻 App 码，或以一定角度显示中心图形。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/upright-display-right@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/upright-display-wrong-1@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/upright-display-wrong-2@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

**不要创建太小的轻 App 码**。轻 App 码必须遵守以下规范。

| 类型 | 最小尺寸 |
| --- | --- |
| 印刷通信 | 最小直径为 1.9 厘米（3/4 英寸）。 |
| 数字通信 | 最小尺寸为 256×256 个像素。使用 PNG 或 SVG 文件。 |
| 集成 NFC 的轻 App 码 | 嵌入式 NFC 标签的直径必须至少为 35 毫米或同等尺寸。例如，如果嵌入式 NFC 标签的直径为 35 毫米，所打印轻 App 码的直径必须至少为 3.48 厘米（1.37 英寸）。 |

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sizing-minimum-rectangle@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sizing-minimum-circular@2x.png)

在确定轻 App 码的尺寸时，请考虑距离与轻 App 码尺寸比例不超过 20:1 。如有可能，使用 10:1 的比例以确保可靠扫描。例如，用户从 101 厘米（40 英寸）的距离处扫描的轻 App 码的直径必须至少为 10.16 厘米（4 英寸）。

如果在二维码或其他可扫描物品附近展示轻 App 码，应为轻 App 码选择至少为其他图形码或物品尺寸的大小。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/app-clip-with-qr-code@2x.png)

**在轻 App 码与相邻的轻 App 码、图形或媒介之间提供足够的空间**。轻 App 码周围的最小净间距等于中心图形与圆形图形码之间的间距。如果将轻 App 码放置在另一个轻 App 码或其他可机读图形码旁边，请留出足够的净间距以便可靠地扫描每个图形码。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-clip-spacing@2x.png)

### 使用清晰的文字信息

添加清晰的文字信息，告知用户如何使用轻 App 码启动轻 App，尤其是在使用不带轻 App 标志的设计时。例如，在电子邮件或海报中显示的轻 App 码旁边添加行动号召。使用建议的号召性文字信息或你自己的文案。始终使用简单、清晰的行动号召。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/clear-messaging@2x.png)

对于仅扫描轻 App 码，可以使用以下行动号召：

- 扫描以[*描述用户可以使用轻 App 执行的操作*]。
- 使用 iPhone 或 iPad 上的摄像头扫描以[*描述用户可以使用轻 App 执行的操作*]。

对于集成 NFC 的轻 App 码，可以使用以下行动号召：

- 扫描以[*描述用户可以使用轻 App 执行的操作*]。
- 将 iPhone 靠近[*物品名称*]以启动轻 App，该 App [*描述用户可以使用轻 App 执行的操作*]。

有关更多信息，请参阅 [NFC](nfc.md)。

**在指代轻 App 和轻 App 码时，遵守 [Guidelines for Using Apple Trademarks](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)**。例如，你的 App 名称或图像中不能出现 Apple 商标，并且在使用轻 App 或轻 App 码等术语时始终采用首字母大写的形式。有关更多信息，请参阅[法律要求](app-clips.md#Legal-requirements)。

### 自定义你的轻 App 码

使用 [App Store Connect](https://appstoreconnect.apple.com) 或[轻 App 码生成器](https://developer.apple.com/app-clips/resources/)命令行工具创建轻 App 码，并遵循最佳实践以确保可靠的扫描体验。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/app-clips-customizing@2x.png)

**始终使用生成的轻 App 码**。不要打造自己的轻 App 码设计或以任何方式修改生成的轻 App 码。不要使用滤镜、增强颜色，或添加光影、阴影、渐变或反光效果。这些会对用户的扫描体验产生负面影响。在缩放生成的轻 App 码时，不要更改所生成图形码的宽高比，并确保缩放轻 App 码的所有属性，例如描边宽度。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/customizing-wrong-1@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/customizing-wrong-2@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/customizing-wrong-3@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

**选取具有足够对比度的颜色，以确保准确扫描**。每个轻 App 码都使用三种颜色：前景颜色、背景颜色及基于前景颜色和背景颜色生成的第三种颜色。[App Store Connect](https://appstoreconnect.apple.com) 和[轻 App 码生成器](https://developer.apple.com/app-clips/resources/)命令行工具都提供了一系列默认颜色对。或者，你可以选取自定义前景颜色和背景颜色。请注意，不能选取会导致扫描体验欠佳的自定义颜色。如果所选的颜色效果不佳，App Store Connect 或命令行工具都不会生成轻 App 码。为了帮助你选取效果良好的颜色组合，这两种工具都包含根据自定义背景颜色建议不同前景颜色的功能。有关更多信息，请参阅 [Creating App Clip Codes with the App Clip Code Generator](https://developer.apple.com/cn/documentation/appclip/creating-app-clip-codes-with-the-app-clip-code-generator) 和 [Creating App Clip Codes with App Store Connect](https://developer.apple.com/cn/documentation/appclip/creating-app-clip-codes-with-app-store-connect)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/app-clip-colors@2x.png)

## 打印指南

轻 App 码可提供轻 App 的最佳启动体验。因此，制作和展示能够长期提供可靠扫描体验的轻 App 码非常重要。你可以自行打印轻 App 码，也可以寻求使用专业的打印服务，例如 [RR Donnelley](https://touchless.acc.rrd.com/)。

在分发所打印的轻 App 码之前务必进行测试，以确保其可以从各种角度进行扫描。

**使用高质量、无纹理的印刷材料**。在哑光面上打印轻 App 码。避免使用闪光、光面、反光或全息覆盖层，以及薄层压表面或材料。如果需要层压其上带有轻 App 码的印刷材料，可使用哑光层压材料以避免闪光和反光。如果将轻 App 码放在户外，可使用防紫外线材料或涂层，来防止因暴露于阳光、雨水和其他天气条件下而出现褪色。如果寻求使用专业的打印服务，可使用柔性版印刷以获得最佳效果。如果你使用台式打印机自行打印轻 App 码，可使用喷墨打印机以获得最佳效果。

**使用高分辨率图像和打印机设置**。栅格化 SVG 文件时，将图像分辨率设置为至少 600 ppi，并以至少 300 dpi 的最小分辨率打印轻 App 码。考虑在打印之前调平和校准打印机以确保高质量的打印，并避免颜色通道对齐不佳、灰度系数值不准确、伪影，或者打印出椭圆形或以其他方式扭曲的轻 App 码。使用收据打印机时，尽量采用纸张的最大尺寸来打印轻 App 码。

**将生成的 SVG 文件转换为 CMYK 图像时使用正确的颜色设置**。[轻 App 码生成器](https://developer.apple.com/app-clips/resources/)命令行工具和 [App Store Connect](https://appstoreconnect.apple.com) 均将轻 App 码生成为使用 sRGB 色彩空间的 SVG 文件。若要打印与 SVG 文件匹配的颜色，可将 sRGB 图像转换为 CMYK 图像。执行转换时使用相对色度（介质相关）意图。在 CMYK 打印机上使用“普通 CMYK ICC 描述文件”，或在 CMYKOV 打印机上使用“Gracol 2013 ICC 描述文件”，并且允许颜色容差 CIELab Delta E 为 2.5。

**如果你使用的打印机仅以灰度打印，那么仅生成灰度轻 App 码**。以彩色生成然后以灰度打印的图形码可能不太可靠。

**对于集成 NFC 的轻 App 码，选取第 5 类 NFC 标签**。嵌入式 NFC 标签的直径必须至少为 35 毫米或同等尺寸。

**如果要创建大量轻 App 码，应全面测试打印工作流程，并验证所打印的轻 App 码**。例如，使用一部分图形码来进行少量价格低廉的打印。在带有额外内边距区域的打印模板上打印轻 App 码，这些区域可以让你在每个图形码旁边显示编码的调用 URL 和 SVG 文件名，以便在打印时进行验证。

如果要使用 [轻 App 码生成器](https://developer.apple.com/app-clips/resources/)工具或 [App Store Connect](https://appstoreconnect.apple.com) 创建多个轻 App 码，你可能需要寻求使用专业的打印服务。如果是这种情况，你需要处理大量 SVG 文件。因为你无法通过查看轻 App 码来了解哪个轻 App 码对哪个 URL 进行编码，因此需要使用一个包含有关哪个 SVG 文件映射到哪个调用 URL 的信息的文件。在任何情况下，谨慎的文件管理、版本控制和修改跟踪都是避免印量错误的关键。有关更多信息，请参阅 [Preparing multiple App Clip Codes for production](https://developer.apple.com/cn/documentation/appclip/preparing-multiple-app-clip-codes-for-production)。

### 验证打印机的校准

可靠的扫描体验取决于所打印的轻 App 码的质量。为了确保打印轻 App 码带来可靠的扫描体验并避免使用无法打印高质量轻 App 码的打印机，Apple 提供了[打印机校准测试表](https://developer.apple.com/app-clips/resources/printer-calibration-test-sheets.zip)，你可以用来验证打印机的设置和打印质量。

**使用打印机校准测试表验证所选颜色对的打印质量，该测试表显示每个默认颜色对的文本框**。按照表中的说明以正确的比例打印该测试表，并验证你的打印机是否可以创建高质量的轻 App 码。

**通过打印显示两个灰度条的打印机校准测试表，来验证打印机的灰度设置**。如果任何特定的灰色较浅或完全缺失，打印机可能需要校准，或者可能不适合打印能够进行可靠扫描的轻 App 码。

## 法律要求

只有在 App Store Connect 中或使用轻 App 码生成器命令行工具创建并遵循这些指南的 Apple 提供的轻 App 码才能获准使用。

轻 App 码获准用于指示轻 App 的可用性。Apple 可能会自行决定不定期更新轻 App 码设计。

如果你的轻 App 失效，还应停止展示与该无效轻 App 关联的轻 App 码。

不得将轻 App 码（包括但不限于，Apple 标志、轻 App 标记和轻 App 码设计）用作你自己的公司名称或产品名称的一部分。不得为轻 App 码或其中包含的任何元素进行版权或商标注册。

不得以下列任何方式使用本指南中描述的轻 App 码：可能降低、削弱或损害与 Apple 或轻 App 关联的商誉、价值或声誉；或者，侵犯或违反任何第三方的商标或其他专有权利；或者，可能导致混淆产品或服务的来源。

Apple 保留对本文提供使用的材料中所包含商标、版权或其他知识产权的所有权利，包括但不限于轻 App 码和其中包含的任何元素。

请勿将符号添加至在 App Store Connect 中或使用轻 App 码生成器命令行工具创建的轻 App 码中。

请勿翻译任何 Apple 商标。Apple 商标必须保留为英语，即使它们出现在非英语的语言文本中也应如此。经 Apple 批准，法律条文和所有权声明（但不包括商标）的翻译版本可用于在美国以外分发的材料。

有关使用 Apple 商标的更多信息，请参阅 [Guidelines for Using Apple Trademarks](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)。

## 平台考量因素

*无针对 iOS 或 iPadOS 的额外考量因素。在 macOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[Apple Pay](apple-pay.md)

[通过 Apple 登录](sign-in-with-apple.md)

[Guidelines for Using Apple Trademarks and Copyrights](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)

#### 开发者文档

[App Clips](https://developer.apple.com/cn/documentation/appclip)

[App Store Connect](https://appstoreconnect.apple.com/)

#### 视频

- [轻 App 中的新功能](https://developer.apple.com/cn/videos/play/wwdc2021/10012)
- [构建轻便快捷的轻 App](https://developer.apple.com/cn/videos/play/wwdc2021/10013)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 更新了指南以包括轻 App 演示。 |
| 2023 年 5 月 2 日 | 已将指南整合为一页。 |
