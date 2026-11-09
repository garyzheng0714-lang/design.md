# Apple Pay

原文：https://developer.apple.com/cn/design/human-interface-guidelines/apple-pay

Apple Pay 是一种安全便捷的付款方式，可针对实物商品和服务、捐款和 App 内订阅以及在任何浏览器中付款。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-Apple-Pay-intro@2x.png)

使用 Apple Pay 销售实物商品（如食品杂货、服装和家电），也可用于提供各种服务（如俱乐部会员、酒店预订和活动门票）以及捐赠款项。接受 Apple Pay 的 App 和网站会将其显示为可用付款选项，并在购买流程中包括 Apple Pay 按钮，供用户调出付款表单。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pay-sheet@2x.png)

结账时，付款表单可显示关联 Apple Pay 的信用卡或借记卡、购买金额（含税费和相关费用）、送货选项、联系信息及其他相关详细信息。用户可以进行任何必要的调整，然后使用在设备端安全储存的凭证授权付款并完成购买。

用户可在支持的设备上使用面容 ID、触控 ID 或视控 ID 付款，或在 Apple Watch 上连按两下付款。在浏览器中，用户还可使用身边的 iPhone 或 Apple Watch 付款，或使用 iPhone 或 iPad 扫码付款。

有关开发者指南，请参阅 [Apple Pay](https://developer.apple.com/cn/documentation/passkit/apple-pay) 和 [Apple Pay on the Web](https://developer.apple.com/cn/documentation/applepayontheweb)。有关网页版 Apple Pay 的实际操作演示，请参阅 [Apple Pay on the web interactive demo](https://applepaydemo.apple.com)。

> **注**
>
> 使用 [Apple App 内购买](apple-in-app-purchase.md)在 App 中销售虚拟商品，如增值内容以及数字内容订阅。

## 提供 Apple Pay

**在所有支持的设备和浏览器上提供 Apple Pay**。如果设备不支持 Apple Pay，不要显示 Apple Pay 作为付款选项。有关开发者指南，请参阅 [PKPaymentAuthorizationController](https://developer.apple.com/cn/documentation/passkit/pkpaymentauthorizationcontroller)（iOS、watchOS）和 [applePayCapabilities](https://developer.apple.com/cn/documentation/applepayontheweb/applepaysession/applepaycapabilities)（网页）。

**凭证可用时，将 Apple Pay 设为首选付款选项**。如果使用 Apple Pay API 来了解用户的“钱包”中是否包括有效卡片，你必须在使用 API 的各个位置将 Apple Pay 设为首选（但不一定是唯一）付款选项。不要将 Apple Pay 单独作为某一步骤或流程。例如，当 Apple Pay 与其他选项一同显示时，你可以预先选择 Apple Pay。有关开发者指南，请参阅 [Offering Apple Pay in Your App](https://developer.apple.com/cn/documentation/passkit/offering-apple-pay-in-your-app)（iOS、watchOS）和 [Checking for Apple Pay availability](https://developer.apple.com/cn/documentation/applepayontheweb/checking-for-apple-pay-availability)（网页）。

**仅使用 Apple Pay 按钮发起付款或 Apple Pay 设置流程（适用时）**。当用户选取 Apple Pay 按钮进行购买但其设备尚未设置 Apple Pay 时，用户有机会设置 Apple Pay。不要以任何其他方式使用 Apple Pay 按钮。

**如果使用自定义按钮启动 Apple Pay 付款流程，确保自定义按钮不会显示“Apple Pay”或 Apple Pay 标志**。在这种情况下，必须在显示付款按钮的同一页面上显示 [Apple Pay 标记](apple-pay.md#Apple-Pay-mark)图形或引用文字“Apple Pay”，来告知用户你接受 Apple Pay。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/custom-button-yes@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/custom-button-no@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

**仅使用 Apple Pay 标记图形表示接受 Apple Pay**。Apple Pay 标记并不会协助付款，因此不要将其用作付款按钮，或放置在按钮位置。使用 Apple Pay 标记指示 Apple Pay 作为选定付款方式时，可以根据 App 或网站设计创建一个单独的自定义按钮来发起 Apple Pay 付款。

**不要隐藏 Apple Pay 按钮或使其看起来不可用**。如果 Apple Pay 按钮尚不可用（例如在未选择产品大小或颜色时），请在用户轻点或点按该按钮后妥善指出问题所在。

**告知搜索引擎你的网站接受 Apple Pay**。如果你的网站使用语义标记向搜索引擎提供产品详细信息，请列出 Apple Pay 作为付款选项。

> **重要信息**
>
> 所有提供 Apple Pay 的网站都必须包含隐私声明，并遵守网页版 Apple Pay 的可接受使用情况指南。

## 精简结账流程

**提供连贯一致的结账体验**。最好让整个结账流程与你的 App 或网站紧密集成。在整个结账体验过程中使用你的品牌，避免打开不同的页面或窗口。尤其是对于网站结账流程，在结账流程中打开新的窗口可能会造成混淆，甚至可能会让用户认为已切换到不同的网站。

**Apple Pay 可用时，假定用户想要使用它**。考虑将 Apple Pay 按钮作为首选付款选项，以比其他选项更大的尺寸显示该选项，或使用一条线直观地将该选项与其他选项区分开来。

**在产品详细信息页面上使用 Apple Pay 按钮加速单项目购买**。除了购物车，请考虑在产品详细信息页面上提供 Apple Pay 按钮，让用户可以快速购买单个项目。通过这种方式发起的购买必须仅适用于单个项目，不适用于已在购物车内的任何项目。如果购物车包含已购买的项目，请在完成购买后将其立即从购物车移除。

**使用快速结账加速多项目购买**。快速结账功能会立即显示付款表单，让用户可以使用单一送货方式和目的地快速购买购物车内的所有项目。

**在付款表单中支持优惠券和促销码**。如果提供优惠券或促销码，让用户直接在付款表单中输入而无需单独步骤。这对于快速结账流程尤其重要，因为用户会跳过标准结账体验。

**在用户触及 Apple Pay 按钮前，收集颜色和大小选项等必要信息**。如果结账时缺少信息（可能是因为用户忘记选取选项），请妥善指出问题所在并帮助改正问题。使用高亮标记或提醒文本来标识缺少的信息，并自动导览至有问题的栏位，让用户可以快速改正问题并完成购买。

**在开始结账前先收集选填信息**。付款表单不提供选填数据（如礼品信息或交付说明）的输入方式，因此需要提前或者甚至在完成购买后收集此类信息。

**在显示付款表单前，收集多种送货方式和多个目的地**。付款表单让用户可以为整个订单选择同一送货方式和目的地。如果用户可为订单中的各个项目选择不同的送货方式和目的地，请在 Apple Pay 结账前收集此类详细信息。

**对于到店提货，在显示付款表单前帮助用户选择提货地点**。用户选择提货地点后，在付款表单上显示该地点的地址。有关开发者指南，请参阅 [Displaying a Read-Only Pickup Address](https://developer.apple.com/cn/documentation/passkit/displaying-a-read-only-pickup-address)。

**优先使用来自 Apple Pay 的结账信息**。相信 Apple Pay 信息是完整且最新的。即使你的 App 或网站已存在联系方式、送货和付款信息，也请考虑在结账时获取来自 Apple Pay 的最新信息，以减少可能需要的改正。

**避免需要在购买前创建账户**。如果希望用户注册账户，请要求其在订单确认页面执行此操作。使用在结账时提供的信息，预填充尽可能多的注册栏。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/payment-sheet-before-account@2x.png)

**在付款表单中报告交易结果**。在错误地址等失败情况下，请提供错误信息，以便用户可以采取措施来修复该问题。

**显示订单确认或感谢页面**。在付款表单显示交易结果后，显示订单确认页面以感谢用户购买，提供有关订单送货时间的详细信息，并指示如何检查订单状态。无需在确认页面上列出 Apple Pay，但如果你要执行此操作，将其显示在用于处理交易的账户的最后四位数字之后，或将其显示为单独的备注。例如，“1234 (Apple Pay)”或“已使用 Apple Pay 支付”。

### 自定义付款表单

**仅显示并请求基本信息**。如果付款表单上包含无关信息，用户可能会感到困惑或担心涉及隐私。例如，如果购买的是以电子方式递送的礼品卡，则有必要查看联系人电子邮件地址而非送货地址。在这种情况下，显示或询问送货地址可能会给人造成错觉，误以为物品是以物理方式递送。

**显示有效的优惠券或促销码，或让用户输入**。如果用户可以在付款表单显示前输入代码，请将该代码显示在表单上，让用户确信你已应用该代码。也可以考虑允许用户在付款表单上输入代码，特别是在快速结账流程中。

**让用户在付款表单上选择送货方式**。在空间允许的范围内，显示每个可用选项的清晰描述和费用，还可选择显示预计的交货或提货日期（或日期范围）。利用送货方式的日历和时区支持来提供准确的交货或提货信息，无论用户当前位置在何处。有关开发者指南，请参阅 [PKDateComponentsRange](https://developer.apple.com/cn/documentation/passkit/pkdatecomponentsrange)。

**对于到店提货，考虑让用户选择适合自己的提货窗口**。你可以根据送货方式提供日期和时间范围，以供用户选择。

**使用行项目来解释额外费用、折扣、待定费用、附加捐款、定期付款和未来付款**。行项目包括标签和费用；用于定期付款的行项目还可以包括频率。不要使用行项目来显示构成购买项目的分项列表。有关开发者指南，请参阅 [paymentSummaryItems](https://developer.apple.com/cn/documentation/passkit/pkpaymentrequest/paymentsummaryitems)；有关捐款指南，请参阅[支持捐款](apple-pay.md#Supporting-donations)。

**iOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/payment-sheet-ios@2x.png)

**网页**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/payment-sheet-web@2x.png)

**精简行项目**。使行项目具体、易于理解且一目了然。尽可能将行项目放在一行。

**在与总计同一行的*支付*字眼后提供商户名称**。使用用户在其银行或信用卡对账单上看到的相同商户名称，从而保证付款流向正确。例如，“付给：[*商户_名称*]”。

**如果你不是终端商家，请在付款表单中同时标识两家商户**。当你的 App、轻 App 或网站充当中介（例如，用户从第三方卖家处购买商品的市场）时，用户可能没有意识到有两家商户参与其中。在“支付”行中清楚描述两者关系，例如使用“*付给：[终端_商家_商户_名称（经由你的_商户_名称）]*”。

**清楚地披露授权付款后用户何时可能要承担额外费用**。在某些情况下，你可能不知道结账时的总费用。例如，在结账后，基于距离或时间的乘车价格可能会发生变化。或者，用户可能想要在收货后提供小费。在此类情况下，如果当地法规允许，你可以在付款表单中提供清晰的说明，并提供标记为“待付额”的小计。如果预先授权了特定金额，请确保付款表单中准确地反映了此信息。

**妥善地处理数据输入和付款错误**。如果在结账时发生错误，请帮助用户快速解决该错误，以便完成交易。相关指南，请参阅[数据验证错误](apple-pay.md#Data-validation-errors)。

**付款期间，将进度信息委托给付款表单**。付款表单已清晰呈现加载状态和进度。额外的旋转或进度指示符可能会混淆交易状态。

## 显示网站图标

许多网站都会提供与书签一起显示在 URL 栏中以及设备主屏幕上的图标。支持 Apple Pay 的网站还可以在付款授权期间（尤其是在用户于已连接设备上授权付款的接力期间）使用此图标，以在视觉上保证付款流向正确。对于订阅付款流程，该图标还可显示在“钱包”中。

如果你的网站支持 Apple Pay，请提供以下尺寸的图标：

| @2x | @3x |
| --- | --- |
| 60x60 点（120x120 个像素 @2x） | 60x60 点（180x180 个像素 @3x） |

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/web-icon-payment@2x.png)

## 处理问题

当结账或付款处理期间出现问题时，提供清晰、可操作的指南，让用户可以快速解决问题并完成交易。

### 数据验证错误

当付款表单显示时、用户更改付款表单上的某些栏位值时以及用户认证交易后，你的 App 或网站可对用户输入做出响应。使用这些机会，检查数据输入问题，并提供清晰且统一的信息。

**iOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pay-sheet-error-ios@2x.png)
*付款表单错误信息*

**网页**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pay-sheet-error-web@2x.png)
*付款表单错误信息*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/detail-view-error-web@2x.png)
*自定义详细信息视图错误信息*

当数据无效时，系统提供的错误信息会高亮标记付款表单上的相关栏位。用户可以选取一个栏位来查看其他详细信息并解决问题。当用户选取有问题的栏位时，为出现的详细信息视图提供自定义错误信息。

有关开发者指南，请参阅 [PKPaymentAuthorizationViewControllerDelegate](https://developer.apple.com/cn/documentation/passkit/pkpaymentauthorizationviewcontrollerdelegate)（iOS、watchOS）和 [Apple Pay on the Web](https://developer.apple.com/cn/documentation/applepayontheweb)（网站）。

> **注**
>
> 出于隐私原因，在用户尝试授权交易前，你的 App 或网站对数据的访问有限。在授权前，仅卡片类型和已编校的送货地址可供访问。在授权失败时显示错误十分重要，但你还需要尽可能尝试在授权前验证可用信息并报告问题。

**避免强制遵守你的业务逻辑**。设计足够智能的数据验证流程，以忽略不相关的数据，并尽可能推断缺失的数据。例如，如果你的 App 需要五位数字的邮政编码，但用户输入的邮政编码多了 4 位数字，则忽略额外的数字，而不是请求改正。让用户以多种格式（如含破折号、不含破折号、含国家/地区代码、不含国家/地区代码）输入电话号码，而不产生错误。

**向系统准确报告问题**。出现问题时，提供自定义错误信息和正确的状态代码，以便系统可以在付款表单上显示最相关的错误。有关开发者指南，请参阅 [PKPaymentError](https://developer.apple.com/cn/documentation/passkit/pkpaymenterror)（iOS、watchOS）和 [Apple Pay Status Codes](https://developer.apple.com/cn/documentation/applepayontheweb/apple-pay-status-codes)（网页）。

**当数据无效或格式不正确时，请简明扼要地解释问题**。引用相关栏位，并准确指明预期内容。例如，如果用户输入的邮政编码无效，系统会显示一条特定的信息（如“邮政编码与城市不匹配”），而不是显示“地址无效”。如果送货地址不适用，请通过信息指明原因，如“无法为该省送货”。使用句子式大写且无结尾标点符号的名词短语。力求信息不超过 128 个字符以避免截断。

### 付款处理问题

**正确处理中断**。取消或超时等事件可能会中断付款流程，导致付款表单关闭。当此类事件发生时，你必须取消任何正在进行的付款。在付款表单关闭后，用户可以通过再次选取 Apple Pay 按钮来重启该流程。有关开发者指南，请参阅 [PKPaymentAuthorizationViewControllerDelegate](https://developer.apple.com/cn/documentation/passkit/pkpaymentauthorizationviewcontrollerdelegate)（iOS、watchOS）和 [oncancel](https://developer.apple.com/cn/documentation/applepayontheweb/applepaysession/oncancel)（网页）。

## 支持订阅

你的 App 或网站可以使用 Apple Pay 请求授权定期付款。定期付款可以是固定金额（如每月电影票订阅），如果当地法规允许，也可以是可变金额（如每周杂货订单）。初次授权还可以包括折扣和额外费用。

**iOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/fixed-subscription-ios@2x.png)
*固定式订阅*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/variable-subscription-ios@2x.png)
*可变订阅（如果当地法规允许）*

**网页**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/fixed-subscription-web@2x.png)
*固定式订阅*

**在显示付款表单前阐明订阅详细信息**。在要求用户授权定期付款前，确保用户完全了解计费频率和任何其他服务条款。你可以在付款表单上显示计费频率。

**包括重申计费频率、折扣和额外预付费用的行项目**。使用这些行项目来提醒用户正在授权什么内容。如果授权时无需付款，请清楚地披露账单出现的时间。

**iOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/no-payment-required-ios@2x.png)
*授权时无需付款。*

**网页**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/no-payment-required-web@2x.png)
*授权时无需付款。*

**清晰传达试用期条款**。对于有试用期的订阅，使用行项目显示试用金额（免费时为 ¥0）、试用后的常规金额和常规计费的开始日期。

**在总计行中阐明当前付款金额**。确保用户知道其在授权时的计费金额。

**仅在订阅更改产生额外费用时显示付款表单**。当用户更改订阅时，如果费用减少或保持不变，则无需授权。

> **重要信息**
>
> 将账单协议栏视为明语摘要，不替代正式条款。如果使用此栏，应简明扼要并避免在 App、网站或行项目中的其他位置重复显示信息。如有疑问，请将此栏留空以保持付款表单简洁。

## 支持捐款

[受批准的非营利组织](https://developer.apple.com/support/apple-pay-nonprofits/)可以使用 Apple Pay 来接受捐款。

**使用行项目来标识捐款**。在付款表单上显示一个可提醒用户正在授权捐款的行项目，例如，显示“*捐款 ¥50.00*”。

**提供预定义捐款金额，精简结账流程**。你可以通过提供推荐捐款金额（如 ¥25、¥50、¥100）来精简捐款过程中的步骤。还应包括“其他金额”选项，以便用户可以根据自己的偏好自定义捐款金额。

## 使用 Apple Pay 按钮

Apple Pay 按钮有多种类型和样式，以适应不同的情境和购买流程。使用 Apple 提供的 API 创建按钮。这样可实现：

- 带有 Apple 核准的说明、字体、颜色和样式的按钮
- 可按比例缩放任何尺寸的内容
- 自动本地化成设备语言
- 匹配你界面的圆角半径自定义
- 带有自动备选文本的内建旁白支持

**始终使用 Apple 提供的 API 显示 Apple Pay 按钮**。与按钮图形不同，API 生成的按钮始终具有正确的外观并且自动本地化。不要创建自定义 Apple Pay 按钮设计，或尝试复制 Apple 提供的按钮设计。有关开发者指南，请参阅 [PKPaymentButtonType](https://developer.apple.com/cn/documentation/passkit/pkpaymentbuttontype) 和 [PKPaymentButtonStyle](https://developer.apple.com/cn/documentation/passkit/pkpaymentbuttonstyle)（iOS 和 macOS）、[WKInterfacePaymentButton](https://developer.apple.com/cn/documentation/watchkit/wkinterfacepaymentbutton) (watchOS) 和 [Apple Pay on the Web](https://developer.apple.com/cn/documentation/applepayontheweb)（网页）。

> **提示**
>
> 在高亮标记付款选项的位置，使用 [Apple Pay 标记](apple-pay.md#Apple-Pay-mark)图形传达 Apple Pay 的可用性。

### 按钮类型

选取最适合你的购买或付款体验术语和流程的按钮类型。

#### Apple Pay 按钮

使用下方的按钮发起付款。在某些语境中，系统会在付款按钮上自动显示默认卡片的图像，让用户知道 Apple Pay 已设置并可供使用。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pay-card-on-button@2x.png)

| 付款按钮类型 | 使用示例 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-buy-with@2x.png) | App 或网站中供用户在其中进行购买的一个区域，如产品详细信息页面或购物车页面。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-pay-with@2x.png) | 一种 App 或网站，供用户支付账单或发票，例如，针对有线电视或电力等公用事业或室内给排水或汽车维修等服务的账单或发票。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-check-out-with@2x.png) | 一种提供购物车或购买体验的 App 或网站，其中包括以文本*结账*开头的其他付款按钮。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-continue-with@2x.png) | 一种提供购物车或购买体验的 App 或网站，其中包括以文本*继续*开头的其他付款按钮。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-book-with@2x.png) | 一种可帮助用户预订航班、行程或其他体验的 App 或网站。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-donate-with@2x.png) | 一种[受批准的非营利组织](https://developer.apple.com/support/apple-pay-nonprofits/)的 App 或网站，供用户进行捐款。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-subscribe-with@2x.png) | 一种供用户购买订阅的 App 或网站，例如购买健身房会员卡或美食套餐外送服务。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-reload-with@2x.png) | 一种帮助用户给卡片、账户或服务（如交通卡或预付手机套餐）相关付款系统充值的 App 或网站，其中使用术语*充值*。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-add-money-with@2x.png) | 一种帮助用户给卡片、账户或服务（如交通卡或预付手机套餐）相关付款系统充值的 App 或网站，其中使用术语*充值*。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-top-up-with@2x.png) | 一种帮助用户给卡片、账户或服务（如交通卡或预付手机套餐）相关付款系统充值的 App 或网站，其中使用术语*充值*。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-order-with@2x.png) | 一种供用户下单物品（如美食或鲜花）的 App 或网站。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-rent-with@2x.png) | 一种供用户租借物品（如汽车或滑板车）的 App 或网站。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-support-with@2x.png) | 一种帮助用户向项目、事业、组织和其他实体提供资金的 App 或网站，其中使用术语*支持*。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-contribute-with@2x.png) | 一种帮助用户向项目、事业、组织和其他实体提供资金的 App 或网站，其中使用术语*捐赠*。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-tip-with@2x.png) | 一种供用户为商品或服务付小费的 App 或网站。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ap-button@2x.png) | 一种 App 或网站，出于风格原因，所使用的按钮最小宽度较小或未指定行动号召。如果你选择的付款按钮类型在你的 App 或网站运行的操作系统版本上不受支持，系统可能会用此按钮替换。 |

#### 设置 Apple Pay 按钮

当设备支持 Apple Pay 但用户尚未设置时，你可以使用“设置 Apple Pay”按钮表示接受 Apple Pay，并为用户提供明确的机会进行设置。在“设置”、用户个人资料或插播式页面中显示“设置 Apple Pay”按钮。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/button-set-up@2x.png)

### 按钮样式

使用*自动*样式让当前系统外观决定 Apple Pay 按钮的外观。有关开发者指南，请参阅 [PKPaymentButtonStyle.automatic](https://developer.apple.com/cn/documentation/passkit/pkpaymentbuttonstyle/automatic) (App) 和 [ApplePayButtonStyle](https://developer.apple.com/cn/documentation/applepayontheweb/applepaybuttonstyle)（网页）。若要自行控制按钮外观，请选取以下选项。

#### 黑色

在对比强烈的白色或浅色背景上使用。不要在黑色或深色背景上使用。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pay-black-yes@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pay-black-no@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

#### 带有边框的白色

在对比不强烈的白色或浅色背景上使用。不要放在深色或颜色饱和的背景上。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pay-outline-yes@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pay-outline-no@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

#### 白色

适用于提供足够对比度的深色背景。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pay-white-yes@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/apple-pay-white-no@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

### 按钮大小和位置

**突出显示 Apple Pay 按钮**。确保 Apple Pay 按钮不小于其他付款按钮，避免让用户需要滚动才能查看该按钮。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ap-same-size-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ap-smaller-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

**相对于“添加到购物车”按钮正确放置 Apple Pay 按钮**。在并排布局中，将 Apple Pay 按钮放在“添加到购物车”按钮右侧。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ap-right-side-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ap-left-side-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

在堆叠式布局中，将 Apple Pay 按钮放在“添加到购物车”按钮上方。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ap-top-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ap-below-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

**调整圆角半径以匹配其他按钮的外观**。Apple Pay 按钮默认具有圆角。你可以更改圆角半径以形成方角按钮或胶囊状按钮。有关开发者指南，请参阅 [cornerRadius](https://developer.apple.com/cn/documentation/passkit/pkpaymentbutton/cornerradius)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/minimum-corner-radii@2x.png)
*最小圆角半径*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/default-corner-radii@2x.png)
*默认圆角半径*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/maximum-corner-radii@2x.png)
*最大圆角半径*

**保持最小按钮大小和按钮周围的外边距**。请注意，根据地区设置，按钮标题的长度可能会有所不同。

> **注**
>
> 如果你指定的大小不适合正在使用的付款按钮类型的翻译标题，系统会自动将其替换为如下左侧所示的普通 Apple Pay 按钮。系统不会自动替换“设置 Apple Pay”按钮。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/minimum-apple-pay@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/minimum-apple-pay-donate@2x.png)

使用以下值作为指导。

| 按钮 | 最小宽度 | 最小高度 | 最小外边距 |
| --- | --- | --- | --- |
| Apple Pay | 100 点（100 个像素 @1x、200 个像素 @2x） | 30 点（30 个像素 @1x、60 个像素 @2x） | 按钮高度的 1/10 |
| 用 Apple Pay 预订 | 140 点（140 个像素 @1x、280 个像素 @2x） | 30 点（30 个像素 @1x、60 个像素 @2x） | 按钮高度的 1/10 |
| 用 Apple Pay 购买 |  |  |  |
| 用 Apple Pay 结账 |  |  |  |
| 用 Apple Pay 捐款 |  |  |  |
| 设置 Apple Pay |  |  |  |
| 用 Apple Pay 订阅 |  |  |  |

### Apple Pay 标记

显示其他可用付款选项时，使用 Apple Pay 标记图形表明 Apple Pay 为可用的付款选项。Apple Pay 标记并非按钮；如需 Apple Pay 按钮，请选取[按钮类型](apple-pay.md#Button-types)中所述按钮之一。有关将 Apple Pay 显示为付款选项的设计指南，请参阅[提供 Apple Pay](apple-pay.md#Offering-Apple-Pay)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-pay-mark-with-payment-options@2x.png)

**仅使用 Apple 提供的插图，且不要进行除高度外的任何更改**。你可以指定 Apple Pay 标记的高度，但要确保所使用的高度等于或大于付款流程中的其他付款品牌标记。不要调整插图的宽度、圆角半径或宽高比；不要添加商标符号或任何其他内容；不要移除边框；不要为标记添加视觉效果，如阴影、发光或倒影效果；不要翻转、旋转 Apple Pay 标记，或为其添加动画效果。

**在标记附近保持其高度 1/10 的最小净间距**。Apple Pay 标记不能与其他图形或按钮共用包围边框。

从 [Apple Pay 营销准则页面](https://developer.apple.com/apple-pay/marketing/)下载 Apple Pay 标记图形和完整使用指南。

## 指代 Apple Pay

你可以使用纯文本来推广 Apple Pay，并指明 Apple Pay 是一个付款选项。与使用所有 Apple 产品名称一样，请完全按照 [Apple Trademark List](https://www.apple.com/legal/intellectual-property/trademark/appletmlist.html) 中所示指南使用 Apple Pay，不要使用复数或所有格形式，同时遵守 [Guidelines for Using Apple Trademarks](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)。

**在文本中将 Apple Pay 首字母大写，与其在 Apple Trademark List 中显示的方式一致**。对这两个单词分别大写 *A* 和 *P*，并将所有其他字母小写。仅当需要与所有字母大写的既定排版风格保持一致时，才以全部大写的形式显示 Apple Pay。

**请勿在文本中使用 Apple 标志来代表 *Apple* 这一名称**。在美国，正文中首次提到 Apple Pay 时，请使用注册商标符号 (®)。不要在作为结账时的选择选项出现的 Apple Pay 中包括注册商标符号。

|  | 示例文本 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 用 Apple Pay 购买 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 用 Apple Pay® 购买 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | 用 ApplePay 购买 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | 用  Pay 购买 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | 用 APPLE PAY 购买（当不符合仅使用大写字母的界面风格时） |

**为你的 App 或网站使用协调的字体和大小**。不要模仿 Apple 的字体排印，而应使用与 App 或网站其余部分一致的文本属性。

**不要翻译 *Apple Pay* 或任何其他 Apple 商标**。Apple 商标务必始终使用英语格式，即使出现在非英语文本中也是如此。

**在付款选择情境中，你可以在仅当所有付款选项都有纯文本描述时，才显示 Apple Pay 的纯文本描述**。如果任何其他付款选项描述包含图标或标志，你必须使用 Apple Pay 标记图形，如[提供 Apple Pay](apple-pay.md#Offering-Apple-Pay) 中所述。

**在 App 中推广 Apple Pay 时，请遵守 App Store 指南**。有关特定指南，请参阅 App Store 营销指南。

## 平台考量因素

*无针对 iOS、iPadOS、macOS、visionOS 或 watchOS 的额外考量因素。在 Apple tvOS 中不受支持。*

## 资源

#### 相关内容

[Apple Pay 营销准则](https://developer.apple.com/apple-pay/marketing/)

#### 开发者文档

[Apple Pay](https://developer.apple.com/cn/documentation/passkit/apple-pay) — PassKit

[Apple Pay on the Web](https://developer.apple.com/cn/documentation/applepayontheweb)

[WKInterfacePaymentButton](https://developer.apple.com/cn/documentation/watchkit/wkinterfacepaymentbutton) — WatchKit

#### 视频

- [Apple Pay 的新功能](https://developer.apple.com/cn/videos/play/wwdc2025/201)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 6 月 8 日 | 优化了指南以反映最新 Apple Pay 外观和功能。 |
| 2025 年 12 月 16 日 | 阐明了支持的平台，包括网页浏览器和 Apple Vision Pro。 |
| 2024 年 6 月 10 日 | 更新了提供网页版 Apple Pay 的开发者指南链接。 |
| 2023 年 9 月 12 日 | 更新了插图。 |
| 2023 年 5 月 2 日 | 已将指南整合为一页。 |
