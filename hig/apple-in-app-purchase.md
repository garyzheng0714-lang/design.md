# Apple App 内购买

原文：https://developer.apple.com/cn/design/human-interface-guidelines/apple-in-app-purchase

用户可以使用 Apple App 内购买在你的 App 内安全地为高级内容和订阅等数字商品及服务付款。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-IAP-intro@2x.png)

你还可以直接通过 App Store 推广和提供 Apple App 内购买项目。

> **提示**
>
> Apple App 内购买和 [Apple Pay](apple-pay.md) 是支持不同用例的不同技术。使用 Apple App 内购买在 App 中销售虚拟商品，如适用于你 App 的高级内容和针对数字内容的订阅。使用 Apple Pay 在 App 中销售实物商品（如食品杂货、服装和家电）、提供各种服务（如俱乐部会员、酒店预订和活动门票）以及捐赠款项。

Apple App 内购买支持四种类型的内容：

- *消耗型*内容，如游戏中的生命或宝石。购买后，消耗型内容会随着用户的使用而耗尽，并且用户可以再次购买。
- *非消耗型*内容，如 App 中的高级功能。购买的非消耗型内容不会过期。
- *自动续期订阅*，持续订阅 App 中的虚拟内容、服务或高级功能。自动续期订阅会在每个订阅期结束时继续自动续期，直到用户选择取消。
- *非续期订阅*，订阅持续时间有限的服务或内容，例如使用游戏内的战斗通行证。用户每次希望延长对服务或内容的访问时，就会购买非续期订阅产品。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/iap-intro@2x.png)

有关营销和业务指南，请参阅：[Apple In-App Purchase](https://developer.apple.com/in-app-purchase/) 和 [Auto-renewable subscriptions](https://developer.apple.com/app-store/subscriptions/)。有关 App 中可售和不可售内容的信息，包括 Apple App 内购买使用要求和限制，请参阅：[App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)。有关开发者指南，请参阅：[Apple In-App Purchase](https://developer.apple.com/cn/documentation/storekit/in-app-purchase)。

> **注**
>
> 如果 App 包含目录特别大且更新频繁的一次性购买项目或来自多位创作者的订阅内容，或者在提供的订阅中包含可选附加内容作为 App 内单个购买项目，Advanced Commerce API 可让你直接管理 Apple App 内购买项目目录。有关概览，请参阅：[the Advanced Commerce API App Store support page](https://developer.apple.com/in-app-purchase/advanced-commerce-api/)；有关开发者指南，请参阅：[Advanced Commerce API](https://developer.apple.com/cn/documentation/advancedcommerceapi)。

## 最佳实践

**让用户在购买之前体验 App**。用户在享受 App 并发现其价值之后，更有可能会购买付费项目或功能。如果提供[自动续期订阅](apple-in-app-purchase.md#Auto-renewable-subscriptions)，请考虑支持对内容的有限免费访问。

**设计一体化购物体验**。你不应让用户在浏览和购买数字产品时产生进入其他 App 的感觉。以反映 App 风格的方式展示产品并处理交易。

**使用简单明了的产品名称和描述**。不截断或换行的标题和简单直接的语言可以帮助用户快速找到产品。

**无论是哪种类型，显示你提供的每个 App 内购买项目的计费总价**。用户需要了解其考虑的每次购买的计费总额。

**仅在用户可以付款时显示商店**。如果用户无法付款（例如，由于家长访问限制），请考虑隐藏商店或显示解释为何无法使用商店的用户界面。有关开发者指南，请参阅 [canMakePayments](https://developer.apple.com/cn/documentation/storekit/appstore/canmakepayments)。

**使用默认确认表单**。当用户使用 Apple App 内购买进行购买时，系统会显示确认表单，帮助防止意外购买。不要修改或复制该表单。

### 支持家人共享

用户可以使用“家人共享”，在所有 Apple 设备上与最多五名其他家庭成员共享对购买内容的访问，例如自动续期订阅和非消耗型 App 内购买项目。为了鼓励用户充分利用你提供的“家人共享”支持，请考虑以下指南。

**在用户了解所提供内容的位置着重提及“家人共享”**。例如，在订阅或项目名称中包含“家人”或“可共享”并在注册屏幕中提及“家人共享”可以强调该功能并帮助用户做出明智的选择。

**帮助用户了解“家人共享”的好处以及参与方式**。打开“家人共享”后，用户可以根据其当前设置接收有关更改的通知。例如，共享设置关闭（默认）的现有订阅者会收到 Apple 的通知，邀请其与家庭成员共享订阅项目。同样，家庭成员可以收到与其共享内容相关的通知。若要进一步了解用户可以接收的通知类型，请参阅[自动续期订阅](https://developer.apple.com/app-store/subscriptions/)。

**致力于自定义你的 App 内通信，使其对购买者和家庭成员都有意义**。例如，当某个家庭成员第一次查看共享内容时，不妨使用“你的家庭订阅项目包括…”之类的措辞来欢迎他们。

### 提供帮助

有时，用户在购买时需要帮助或想要请求退款。为了使这种体验更便捷，可以在 App 内显示自定义用户界面，以提供帮助和替代解决方案，并帮助用户发起系统提供的退款流程。有关开发者指南，请参阅：[beginRefundRequest(for:in:)](https://developer.apple.com/cn/documentation/storekit/transaction/beginrefundrequest(for:in:)-65tph)；有关自动续期订阅的特定相关指南，请参阅：[帮助用户管理订阅](apple-in-app-purchase.md#Helping-people-manage-their-subscriptions)。

**提供客户在请求退款前可查看的帮助**。除了包括系统提供的退款流程链接之外，自定义购买帮助屏幕还可以提供针对你 App 量身定制的帮助。例如，你的自定义屏幕可以帮助用户解决丢失购买项目的问题，回答有关所提供 App 内购买项目的常见问题，并且可让用户提交反馈或直接联系你以获取支持。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/custom-purchase-help@2x.png)

**为退款操作使用简单的标题，如“退款”或“请求退款”**。系统提供的退款流程会清楚表明用户请求 Apple 退款，因此无需重申此信息。

**帮助用户找到有问题的购买项目**。对于所显示的每个最近购买项目，请包括有助于用户识别其想要的购买项目的关联信息。例如，你可以显示产品的图像及其名称和描述，并列出原始购买日期。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/custom-refund-request@2x.png)

**考虑提供替代解决方案**。例如，如果客户未收到其购买的项目，你可以提供立即履行或调解项目。无论提供何种替代方案，明确表明用户仍然可以请求退款。

**让用户轻松请求退款**。虽然购买帮助屏幕可以提供有用信息和替代解决方案，但请确保该内容不会造成请求退款的障碍。例如，避免让用户滚动或打开另一个屏幕来显示退款请求按钮。如果用户选取退款请求项目，其会自动进入如下所示的系统提供的退款流程。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/system-refund-flow-1@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/system-refund-flow-2@2x.png)

**避免对 Apple 的退款政策进行表征或提供指南**。例如，不要猜测客户是否会收到其请求的退款。为了帮助用户了解退款请求过程，你可以提供链接[针对从 Apple 购买的 App 或内容申请退款](https://support.apple.com/en-us/HT204084)。

## 自动续期订阅

**在用户引导流程中吸引用户关注订阅的好处**。在用户首次启动 App 时向其展示订阅的价值，以此指导用户如何使用 App，并帮助用户了解订阅能为其带来哪些好处。包括强有力的行动号召和清晰的订阅条款摘要（请参阅：[轻松完成注册](apple-in-app-purchase.md#Making-signup-effortless)）。相关指南，请参阅：[用户引导](onboarding.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/iphone-onboarding@2x.png)

**提供一系列内容选项、服务等级和时长**。用户喜欢灵活地选取最符合其需求的订阅。

**考虑让用户在注册之前免费试用内容**。有限的免费访问让用户有机会试用部分内容并鼓励已经与内容交互的用户注册。例如，可以提供免费增值 App、计量式付费墙或免费试用。

**免费增值 App**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/freemium-app@2x.png)

**计量式付费墙**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/paywall-meter@2x.png)

**免费试用**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/iphone-free-trial@2x.png)

**适时提示用户订阅，例如当用户接近每月免费内容限额时**。此外，考虑在整个 App 的相关点提供提示，让用户能够随时轻松地进行订阅。

**仅当用户尚未订阅时才鼓励进行新的订阅**。否则，用户可能会认为其现有订阅已经失效，但实则不然。如果在多个 App 中或通过网站提供相同的订阅选项，请提供登录选项，这样用户就不会认为其必须为同一服务支付多次费用。

### 轻松完成注册

简单且信息丰富的注册体验可以让用户轻松地根据对内容的兴趣采取行动，无论是在 App 中还是查看 App Store 产品页面。

**提供清晰、可辨识的订阅选项**。使用简短、不言自明的名称来区分订阅选项，并指定每个选项的价格和时长。如果提供推介促销价，请确保列出推介促销价、优惠期限以及优惠结束后客户支付的标准价格。

**只要求提供必要的信息，简化初始注册**。冗长的注册流程可能会降低订阅转化率。将要求提供其他信息的时间推迟到用户注册之后。

**在 Apple tvOS App 中，帮助用户使用另一台设备注册或认证**。不要求用户在 Apple tvOS App 中输入信息，而是将验证码发送到另一台设备，用户可以在其中输入你需要的信息。

**在 App 注册屏幕上为用户提供更多信息**。除了在 App 和 App Store 元数据中包括服务条款和隐私政策的链接之外，App 内注册屏幕还需要包括：

- 订阅名称、时长以及每个订阅期内提供的内容或服务
- 计费金额，已针对订阅销售地区正确本地化并使用相应货币
- 现有订阅者登录或恢复购买的方法

例如，“森林探险”注册屏幕在最显眼的位置显示每月、每半年和每年订阅的计费总额。该屏幕在次要位置显示半年和一年的价格明细，以便用户可以比价并做出明智的选择。注册屏幕还包含一个按钮，现有订阅者可以使用它来恢复其购买。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/iphone-upgrade@2x.png)

**清晰地描述免费试用的流程**。尤其重要的是确保用户知道，当免费试用结束后，系统会为下一个订阅期自动发起扣款。例如，“海洋日志”注册屏幕明确说明了免费试用的时长和结束时的计费金额。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/watch-onboarding@2x.png)

**在 App 设置中提供注册机会**。App 和账户设置是通常用户寻找订阅方式的位置。

### 支持优惠码

在 iOS 和 iPadOS 中，订阅优惠码可以让你利用线上和线下渠道，让新订阅者、现有订阅者和已流失订阅者免费或以折扣价访问订阅内容。例如，你可以通过电子邮件提供优惠码、在商店或活动中分发，或者将代码打印在实际产品上。

你可以支持两种类型的优惠码：

- *一次性代码*是你在 App Store Connect 中生成的唯一代码。用户可以通过兑换 URL（可共享链接）、在 App 内操作（支持兑换时）或在 App Store 中输入来兑换一次性代码，如果尚未安装 App，系统会提示进行安装。分发量较小或者需要限制对代码的访问时，可以考虑使用一次性代码。
- *自定义代码*是你创建的代码，例如 NEWYEAR 或 SPRINGSALE。用户可以通过兑换 URL 或在 App 内（支持兑换时）兑换自定义代码。当你想要支持需要大规模分发代码的大型活动时，可以考虑使用自定义代码。

有关实施优惠代码的开发者指南，请参阅：[Offer codes](https://developer.apple.com/app-store/subscriptions/#offer-codes) 和 [Set up offer codes](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-subscription-offer-codes)。有关其他优惠类型的指南，请参阅：[Providing subscription offers](https://developer.apple.com/app-store/subscriptions/#providing-subscription-offers)。

**清楚地说明优惠详情**。为了帮助用户做出明智的选择，在营销材料中对优惠进行简单明了的描述。

**遵循创建自定义代码的指南**。自定义代码只能包含字母数字 ASCII 字符。不要使用特殊字符，包括中文和阿拉伯字符。

**告知用户如何兑换自定义代码**。由于用户无法通过在其 App Store 账户设置中输入自定义代码进行兑换，因此让用户知道其可以通过兑换 URL 或在 App 内兑换代码非常重要。

**考虑在 App 中支持优惠兑换**。无论用户是在 App 中还是在 App Store 中兑换优惠，系统都会自动提供显示优惠兑换流程的屏幕。当你使用 StoreKit API 让用户在 App 中兑换优惠码时，你需要创建的唯一自定义用户界面是启动系统所提供流程的用户界面。有关开发者指南，请参阅：[presentOfferCodeRedeemSheet(from:options:)](https://developer.apple.com/cn/documentation/storekit/appstore/presentoffercoderedeemsheet(from:options:)-89agc) 和 [offerCodeRedemption(options:isPresented:onCompletion:)](https://developer.apple.com/cn/documentation/swiftui/view/offercoderedemption(options:ispresented:oncompletion:))。有几个合适的位置可用于提供此自定义用户界面。例如，可以在付费模式、用户引导屏幕或 App 设置屏幕中添加“兑换代码”按钮。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/iphone-custom-redeem@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/subscription-management@2x.png)

用户轻点自定义兑换按钮后，系统会自动提供一系列代码兑换屏幕，如下所示。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/system-provided-redemption-1@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/system-provided-redemption-3@2x.png)

**提供具有吸引力且信息丰富的推广图像**。创建此可选图像可以帮助用户了解你内容的价值所在。如果不提供推广图像，代码兑换屏幕会默认使用 App 图标。若要进一步了解，请参阅[推广你的 App 内购买项目](https://developer.apple.com/app-store/promoting-in-app-purchases/)。

**帮助用户在完成兑换流程后尽快从解锁内容中受益**。思考如何使 App 中的兑换后体验与订阅者的新状态保持一致。例如，可以为新订阅者提供欢迎体验，或者为已解锁附加功能的现有订阅者简要介绍新功能。尤其是要准备好欢迎在首次打开 App 之前订阅的用户。例如，如果要求用户在使用 App 之前创建账户或登录，请确保之前未体验过的新订阅者尽可能顺畅地完成此过程。

### 帮助用户管理订阅

支持订阅管理意味着用户无需离开 App 即可升级、降级或取消订阅。在 App 中提供订阅管理还可为你提供一个合适的位置以解决常见的订阅者问题，并呈现可供用户考虑的备选优惠。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/subscription-management@2x.png)

**提供客户订阅摘要**。用户尤其喜欢在不需要搜索的情况下查看即将到来的续订日期。考虑在订阅管理选项附近的设置或账户屏幕中显示该信息。有关开发者指南，请参阅 [Product.SubscriptionInfo](https://developer.apple.com/cn/documentation/storekit/product/subscriptioninfo)。

**考虑使用系统提供的订阅管理用户界面**。使用 StoreKit API 可以提供一致的体验，帮助用户在不离开 App 的情况下管理或取消订阅。有关开发者指南，请参阅 [showManageSubscriptions(in:)](https://developer.apple.com/cn/documentation/storekit/appstore/showmanagesubscriptions(in:))。

**鼓励订阅者保持订阅或以后重新订阅**。当有人尝试取消时，考虑提醒其将失去哪些访问，建议不同的方案或提供折扣鼓励其继续订阅。如果有人仍取消，考虑稍后通过个性化折扣优惠重新吸引其订阅。有关开发者指南，请参阅：[Retention Messaging API](https://developer.apple.com/cn/documentation/retentionmessaging) 和 [Win-back offers](https://developer.apple.com/app-store/subscriptions/#win-back-offers)。

**始终让客户轻松取消自动续期订阅**。如果管理订阅操作深入到 App 内部或者难以识别，订阅者可能会认为其被劝阻或被阻止取消。

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS 或 visionOS 的额外考量因素。*

### watchOS

watchOS App 中的注册屏幕需要显示在其他版本 App 中显示的同一组订阅选项相关信息。有关所需项目的完整列表，请参阅：[轻松完成注册](apple-in-app-purchase.md#Making-signup-effortless)。以下指南可以帮助你设计可自在使用 Apple Watch 的注册屏幕。

**清晰地描述在不同设备上运行的 App 版本之间的差异**。如果 watchOS App 支持不同的功能或提供其他设备上的部分可用内容，请确保在描述中阐明这些差异。直截了当地说明通过 watchOS App 访问订阅内容的优势，但不要暗示这种体验与其他版本 App 中的体验相同。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/clarify-description-before@2x.png)
*可能会让用户期望在其 Apple Watch 上访问 90000 张地图的描述*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/clarify-description-after@2x.png)
*阐明相较于其他设备订阅如何在 Apple Watch 上工作的描述*

**考虑使用模态表单显示必需信息**。在用户响应行动号召进一步了解订阅优惠后，你可以使用模态表单在单个视图中呈现所有必需项目。尽管用户必须滚动视图才能访问所有信息，但在模态表单中显示信息有助于保持流畅和精简的 App 用户界面。此外，模态表单的默认“关闭”按钮使用户只需轻点一下即可轻松返回免费内容。如果创建了自定义注册视图而非使用模态表单，请设计完整且高效的流程，并包括“关闭”或“取消”按钮以便用户可以返回免费内容。

**确保可在小屏幕上轻松比较订阅选项**。用户需要先了解每个订阅选项的条款，然后才能从中选取一个。力求以易于浏览和对比的紧凑方式显示每个选项的时长和折扣信息。你可以通过以下两种方式在 watchOS App 中呈现订阅选项：

- 在单独的按钮中显示每个选项。每个付款选项使用一个按钮，用户只需轻点一下即可开始注册流程。在这种设计中，锁定每个按钮及其描述十分重要，这样用户即可看到这些元素是如何关联的，尤其是在滚动时。
- 显示选项列表，接着是供用户轻点以开始注册流程的按钮。使用列表每行显示一个选项可提供紧凑的设计，从而最大程度地减少滚动，同时使订阅选项易于浏览和理解。在这种设计中，按钮的标题可以更新，以反映选取的选项。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/lock-up-option-information@2x.png)
*每个按钮各有一个付款选项*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/list-option-information@2x.png)
*列表每行各有一个付款选项，接着是一个按钮，该按钮可更新以显示选取的选项*

## 资源

#### 相关内容

[Apple App 内购买](https://developer.apple.com/in-app-purchase/)

[提供订阅](https://developer.apple.com/app-store/subscriptions/)

[App 审核指南](https://developer.apple.com/app-store/review/guidelines/)

#### 开发者文档

[Apple In-App Purchase](https://developer.apple.com/cn/documentation/storekit/in-app-purchase) — StoreKit

#### 视频

- [Apple App 内购买项目的新功能](https://developer.apple.com/cn/videos/play/wwdc2026/210)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 9 月 17 日 | 更名为 Apple App 内购买并优化了指南以反映当前最佳实践。 |
| 2023 年 9 月 12 日 | 更新了兑换优惠码的插图和指南。 |
| 2022 年 11 月 3 日 | 增加了为每个 App 内购买项目显示计费总价的指南并将相关指南整合到单个页面中。 |
