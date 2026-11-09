# Tap to Pay on iPhone

原文：https://developer.apple.com/cn/design/human-interface-guidelines/tap-to-pay-on-iphone

Tap to Pay on iPhone 允许商家使用其 iPhone 上的 App 接受免接触式付款，而无需连接外接硬件。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-TapToPay-intro@2x.png)

在 iOS 付款 App 中支持 Tap to Pay on iPhone 时，你应协助商家向顾客提供一致、可信赖的付款体验。

> **注**
>
> Tap to Pay on iPhone 可与现有的付款接受硬件和配件协同工作。

在将 Tap to Pay on iPhone 整合进 iOS App 前，你需要与受支持的支付服务提供商 (PSP) 合作、申请 Tap to Pay on iPhone 授权，以及通过 PSP 的 SDK 或采用框架来使用 [ProximityReader](https://developer.apple.com/cn/documentation/proximityreader) API。有关高级指南，包括让用户获知 App 新功能的营销建议，请参阅 [Tap to Pay on iPhone](https://developer.apple.com/tap-to-pay/)；有关开发者指南，请参阅 [Setting up Tap to Pay on iPhone](https://developer.apple.com/cn/documentation/proximityreader/setting-up-the-entitlement-for-tap-to-pay-on-iphone)。

> **注**
>
> 如果你的 PSP 提供的 SDK 提供显示轻触结果等体验的用户界面，请参阅 PSP 提供的文稿。

## 启用 Tap to Pay on iPhone

在 App 能够启用 Tap to Pay on iPhone 和配置商家设备前，商家必须接受相关的条款与条件。你可以借助 ProximityReader API 来帮助获取当前状态，并仅在必要时才显示接受流程。有关开发者指南，请参阅 [Adding support for Tap to Pay on iPhone to your app](https://developer.apple.com/cn/documentation/proximityreader/adding-support-for-tap-to-pay-on-iphone-to-your-app)。

**在商家开始与顾客互动之前，帮助商家接受 Tap to Pay on iPhone 条款与条件**。商家必须接受这些条款与条件后，你才能执行设备初始配置，因此最好允许商家在开始结账或其他面向顾客的流程之前就可以这样做。例如，你可以提供按钮，让用户在 [in-app messaging](https://developer.apple.com/tap-to-pay/marketing-guidelines/#in-your-app)（App 内通信）或引导流程中接受 Tap to Pay on iPhone 条款与条件。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tap-to-pay-introduction-screen@2x.png)
*App 屏幕提供接受 Tap to Pay on iPhone 条款与条件的方式*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tap-to-pay-confirmation-screen@2x.png)
*App 屏幕显示 Tap to Pay on iPhone 已启用并提供试用方式*

**仅向管理员用户展示 Tap to Pay on iPhone 条款与条件**。如果非管理员试图激活该功能，请显示一条信息，说明需要管理员访问许可。如果 App 的主要用户为企业或非管理员用户，你可以让管理员通过网页界面或其他 App（包括可在 iPhone 之外的设备上运行的 App）接受 Tap to Pay on iPhone 条款与条件。请联系你的 PSP 以了解实施细节。

**如有必要，帮助商家确保其设备操作系统为最新版本**。如果 PSP 要求特定版本的 iOS，确保仅在商家更新其设备后，才显示条款与条件。

## 指导商家

部分商家可能对 Tap to Pay on iPhone 不熟悉，因此为其提供快速且简单的入门方法十分重要。

**提供教程以描述受支持的支付类型，并展示如何使用 Tap to Pay on iPhone 接受每种类型**。你可以通过以下方式提供此教程：

- 包括在 App 内通信的“进一步了解”选项中
- 在商家接受 Tap to Pay on iPhone 条款与条件后自动显示
- 自动显示给 App 新用户
- 将其放在 App 帮助内容或设置区域等同一位置以便于找到

你可以使用 [Tap to Pay on iPhone 营销指南](https://developer.apple.com/tap-to-pay/marketing-guidelines/)中 Apple 批准的资源打造 App 教程，还可以使用 [ProximityReaderDiscovery](https://developer.apple.com/cn/documentation/proximityreader/proximityreaderdiscovery) API 提供预设的商家指导体验。Apple 确保 API 已为最新且针对商家所在地区本地化。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/tap-to-pay-merchant-settings-tutorials@2x.png)
*App 的设置区域非常适合用于提供教程以确保其始终可用。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/tap-to-pay-merchant-education-contactless-cards@2x.png)
*由 `ProximityReaderDiscovery` API 提供的商家指导教程。*

如果自行设计教程，确保其展示如何执行以下操作：

- 为各种付款类型启动结账流程
- 协助顾客将其免接触式卡片或电子钱包放在商家设备上进行付款
- 处理卡片的 PIN 码输入，包括无障碍模式

最后，在教程末尾为尚未接受 Tap to Pay on iPhone 条款与条件的商家提供接受机会。

## 结账

结账是一个时效性操作，商家需要该流程才能顺利运作。设计结账流程时，你需要准备以下内容：

- 必要时提供 Tap to Pay on iPhone 之外的支付选项
- 快速回应（若商家在启用 Tap to Pay on iPhone 之前发起结账）
- 帮助商家执行结账，即使设备仍在配置中
- 在结账完成前显示影响最终总额的预支付操作

**无论功能是否启用，均将 Tap to Pay on iPhone 作为结账选项提供**。包括 Tap to Pay on iPhone 按钮可让商家灵活使用该功能，而无需退出结账流程。商家轻触该按钮时，根据需要显示条款与条件，并在配置完成时自动显示 Tap to Pay on iPhone 屏幕。

**避免让商家等待使用 Tap to Pay on iPhone**。除了为每台设备执行初始配置，你还需要在每次 App 切换到最前端时执行后续配置。为尽量缩短潜在的等待时间，在 App 启动时以及每次过渡到前台时立即准备该功能。有关开发者指南，请参阅 [prepare(using:)](https://developer.apple.com/cn/documentation/proximityreader/paymentcardreader/prepare(using:))。

**即使在后台继续配置，也要确保 Tap to Pay on iPhone 结账选项可用**。商家必须始终能够在结账流程中选择 Tap to Pay on iPhone 结账选项。配置期间，让商家选择结账选项，然后显示进度指示符，避免等待配置完成后才提供该选项。在绝大部分场景中，你可以显示不确定型进度指示符，但如果 ProximityReader API 显示配置正在进行中，则显示确定型进度指示符。有关指南，请参阅[进度指示符](progress-indicators.md)；有关开发者指南，请参阅 [PaymentCardReader.Event.updateProgress(_:)](https://developer.apple.com/cn/documentation/proximityreader/paymentcardreader/event/updateprogress(_:))。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tap-to-pay-processing-screen-determinate-progress@2x.png)
*App 屏幕显示配置期间所显示的确定型进度指示符*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tap-to-pay-processing-screen-indeterminate-progress@2x.png)
*App 屏幕显示配置期间所显示的不确定型进度指示符*

**如果 App 支持多种付款接受方式，将 Tap to Pay on iPhone 按钮放在可轻松找到的位置**。避免让商家滚动访问该功能。如果 App 不支持其他付款接受选项，请在开始结账时自动打开 Tap to Pay on iPhone。

**让商家可以在 Tap to Pay on iPhone 与你支持的硬件配件之间轻松切换**。虽然对 Tap to Pay on iPhone 的支持与对蓝牙芯片 PIN 码读卡器等硬件配件的支持不同，但你可以帮助商家同时设置两种方式来优化用户体验。设置后，确保商家可以在结账流程中选取合适的付款接受方式，而无需访问 App 设置。

**对于激活该功能的按钮标签，使用“Tap to Pay on iPhone”，如有空间限制，则使用“Tap to Pay”**。有一种例外情况，即 Tap to Pay on iPhone 是你所支持的唯一付款接受方式。在这种情况下，你可以重复使用现有的“收费”或“结账”按钮来激活 Tap to Pay on iPhone。如果支持多种付款接受方式且在用于激活这些方式的按钮中使用图标，请在 Tap to Pay on iPhone 按钮中使用 `wave.3.right.circle` 或 `wave.3.right.circle.fill` [SF 符号](sf-symbols.md)。始终避免在 Tap to Pay on iPhone 按钮中包括 Apple 标志。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tap-to-pay-on-iphone-symbol-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tap-to-pay-on-iphone-logo-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

> **重要信息**
>
> 仅将“Tap to Pay on iPhone”标签用于支付操作。对于可将其用作非支付操作的语言，请参阅[其他互动](tap-to-pay-on-iphone.md#Additional-interactions)。

**Tap to Pay on iPhone 按钮的设计应与 App 中的其他按钮相匹配**。虽然必须按照上述使用“Tap to Pay on iPhone”或“Tap to Pay”标签，但你可以使用看起来与界面最为协调的按钮颜色和形状。

**在商家启动 Tap to Pay on iPhone 体验之前，确定顾客需要支付的最终金额**。例如，如果 App 支持小费或其他可能影响总额的顾客交互，请确保商家在显示 Tap to Pay on iPhone 屏幕之前提供这些交互。尽量在 Tap to Pay on iPhone 屏幕中显示顾客需要支付的最终金额。

**如果在结账流程中支持预支付选项，请在 Tap to Pay on iPhone 屏幕之前显示这些选项**。例如，如果支持选择不同的支付类型，你可以在商家轻点 Tap to Pay on iPhone 按钮后和你打开 Tap to Pay on iPhone 屏幕前在结账屏幕中显示这些选项。

## 显示结果

顾客通过*轻触*来支付，即将免接触式卡片或电子钱包靠近你 App 中的 Tap to Pay on iPhone 屏幕附近。在成功轻触（和成功输入 PIN 码，如有必要）后，Tap to Pay on iPhone 会显示一个勾号，并向你的 App 提供一个对象，其中包含你要发送给 PSP 进行处理的加密支付信息。轻触失败时，Tap to Pay on iPhone 会显示错误屏幕。成功轻触或在轻触不成功而提供替代支付选项后，你的 App 负责显示交易结果。

**尽快开始处理交易**。你可以使用系统提供的 API，以在 Tap to Pay on iPhone 屏幕完成显示表明轻触成功的勾号动画前，请求轻触成功的结果。有关开发者指南，请参阅 [returnReadResultImmediately](https://developer.apple.com/cn/documentation/proximityreader/paymentcardreader/options-swift.struct/returnreadresultimmediately)。

**授权付款时，在显示交易结果屏幕前，显示进度指示符**。交易授权需数秒才能完成，具体取决于各种因素，如 PSP 和商家设备的连接性。为确保平滑的视觉过渡，请在 Tap to Pay on iPhone 屏幕动画结束后显示授权[进度指示符](progress-indicators.md)（有关开发者指南，请参阅 [PaymentCardReader.Event.readyForTap](https://developer.apple.com/cn/documentation/proximityreader/paymentcardreader/event/readyfortap)）。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tap-to-pay-authorizing-payment@2x.png)

**清楚显示交易结果，不论交易遭拒还是成功**。交易可能由于各种原因而遭拒，例如金额不足、涉嫌欺诈或顾客输入的 PIN 码错误。尽可能也向商家提供一些为顾客开电子收据的方法，如通过二维码或短信。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tap-to-pay-confirmed-payment@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tap-to-pay-unconfirmed-payment@2x.png)

**无法通过 Tap to Pay on iPhone 完成支付时，帮助商家完成结账流程**。例如，卡片不可读、来自不支持的支付网络、不允许交易规定金额或不允许在线输入 PIN 码时，可能导致轻触失败。在此类情况下，你可以：

- 显示新屏幕或重新使用结账屏幕，让商家接受现金等其他支付形式
- 支持通过其他方式结账，如外部硬件或支付链接
- 重新开启 Tap to Pay on iPhone（若顾客想尝试其他卡片）

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tap-to-pay-unsuccessful-transaction@2x.png)

在收到付款卡数据后，你还可能遇到以下所列的情形。如果出现此类情形，请联系你的 PSP 以获得解决问题的指导。

- 某些地区需要强客户身份验证 (SCA) 支持，这意味着即使付款卡在轻触期间无需卡片 PIN 码，发卡行也会在收到交易处理请求后要求输入 PIN 码。在这种情形下，App 可能需要显示 PIN 码输入屏幕，而非交易结果。
- 在某些地区，App 可能需要满足额外条件才能解决部分卡片的限制，例如线下 PIN 码市场中的限制。某些 PSP 支持更多 PIN 码回退功能以收集来自轻触的部分数据，让商家可通过支付链接等其他方式继续支付流程。

**如果系统返回了商家必须解决的错误，请显示问题的清晰描述并建议合适的解决方案**。例如，如果设备的 iOS 版本不支持 Tap to Pay on iPhone，请显示建议更新到最新版本的[提醒](alerts.md)。有关开发者指南，请参阅 [PaymentCardReaderSession.ReadError](https://developer.apple.com/cn/documentation/proximityreader/paymentcardreadersession/readerror)。

**让商家在遇到其无法解决的问题时轻松获得帮助**。例如，将商家引导至 App 或网站中的帮助内容，以及提供可联系支持团队的操作。

## 其他互动

Tap to Pay on iPhone 可让商家在无交易金额时读取付款卡以支持此类用例：查询过去交易，或保留卡片信息以确保后续支付、处理退款或验证顾客信息。

**为打开 Tap to Pay on iPhone 屏幕以在无交易金额时读取付款卡的按钮使用通用标签**。不要在此类标签中包括“Tap to Pay on iPhone”或“Tap to Pay”，而是使用“查询”、“商店卡”、“验证”或“退款”等通用标签。

当顾客在 Apple “钱包”中持有其他类型的 NFC 兼容卡或凭证（例如，会员卡、折扣卡和积分卡）时，Tap to Pay on iPhone 允许商家在读取付款卡的同时读取这些项目或单独进行读取。

**如果 App 支持独立的会员卡交易，请将此流程与使用 Tap to Pay on iPhone 的付款接受流程区分开来**。为商家提供清晰标示的单独按钮以发起会员卡交易十分有效。为帮助商家避免意外选取错误的按钮，尽量不要在会员卡交易按钮的标签中包括“Tap to Pay on iPhone”、“Tap to Pay”或其他付款相关的术语。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/loyalty-card@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tap-to-pay-on-iphone-loyalty@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

## 平台考量因素

*无针对 iOS 的额外考量因素。在 iPadOS、macOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[Tap to Pay on iPhone Marketing guidelines](https://developer.apple.com/tap-to-pay/marketing-guidelines/)

#### 开发者文档

[Adding support for Tap to Pay on iPhone to your app](https://developer.apple.com/cn/documentation/proximityreader/adding-support-for-tap-to-pay-on-iphone-to-your-app) — ProximityReader

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 1 月 17 日 | 更新了商家指导指南。 |
| 2024 年 5 月 7 日 | 更新以包括启用该功能和指导商家的指南。 |
| 2023 年 3 月 3 日 | 完善了用于指导商家以及改善体验的指南。 |
| 2022 年 9 月 14 日 | 优化了有关准备 Tap to Pay on iPhone 以及帮助商家了解如何使用该功能的指南。 |
