# 钱包

原文：https://developer.apple.com/cn/design/human-interface-guidelines/wallet

“钱包”可帮助用户在 iPhone 和 Apple Watch 上安全地储存信用卡和借记卡、驾照或州证件、交通卡、活动门票和钥匙等。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-Wallet-intro@2x.png)

用户在“钱包”中使用其卡片和凭证通过 Apple Pay 购物、跟踪其订单、确认其身份，并简化登机、参加音乐会或享受折扣等活动。

将 Apple 钱包整合到 App 时，你可以创建自定义凭证并在用户需要时出示，安全地验证个人身份以便他们可以访问个人内容，并在最便利的情况下提供详细收据和跟踪信息。有关开发者指南，请参阅：[Wallet](https://developer.apple.com/cn/documentation/passkit/wallet)。

## 凭证

凭证是信息的数字表现形式，可让用户添加到“钱包”中，如活动门票、登机牌、会员奖励卡和优惠券。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-hero@2x.png)

**建议向“钱包”添加新凭证**。当操作会产生新凭证（如购买活动门票或注册商店奖励计划）时，你可以呈现系统用户界面，以便一键将凭证添加到“钱包”。对于可预测的频繁操作（如办理登机手续），你可以在用户授予一次性授权后于后台中添加凭证，用户便无需每次都轻点“添加到 Apple 钱包”按钮。“钱包”会在凭证添加后通知用户。如果用户想要先查看凭证，你可以显示包含“添加到 Apple 钱包”按钮的自定义视图。有关开发者指南，请参阅：[addPasses(_:withCompletionHandler:)](https://developer.apple.com/cn/documentation/passkit/pkpasslibrary/addpasses(_:withcompletionhandler:))、[PKPassLibrary.Capability.backgroundAddPasses](https://developer.apple.com/cn/documentation/passkit/pkpasslibrary/capability/backgroundaddpasses) 和 [PKAddPassesViewController](https://developer.apple.com/cn/documentation/passkit/pkaddpassesviewcontroller)。

**帮助用户添加在你的 App 外创建的凭证**。如果用户使用你的网站或其他设备创建凭证，在他们下次打开你的 App 时建议其将该凭证添加到钱包。如果用户拒绝该建议，不要再次询问。

**将相关凭证成组添加**。如果你的 App 生成多个凭证（如多程联运航班的登机牌），请一次添加所有凭证，这样用户无需逐个添加。如果你的网站分发一组凭证（如一组活动门票），请将这些凭证捆绑在一起，以便用户可以一次下载所有凭证。有关开发者指南，请参阅：[Distributing and updating a pass](https://developer.apple.com/cn/documentation/walletpasses/distributing-and-updating-a-pass)。

**显示“添加到 Apple 钱包”按钮，让用户添加“钱包”中尚不存在的现有凭证**。如果用户先前拒绝了将凭证添加到“钱包”的建议，或者已移除凭证，此时提供一个按钮可让其在改变主意的情况下轻松添加凭证。你可以在 App 中显示相应凭证信息的任何位置显示“添加到 Apple 钱包”按钮。有关开发者指南，请参阅：[PKAddPassButton](https://developer.apple.com/cn/documentation/passkit/pkaddpassbutton)。“添加到 Apple 钱包”标记还适用于电子邮件和网页；有关指南，请参阅：“添加到 Apple 钱包”指南。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-add-to-apple-wallet@2x.png)

**让用户从你的 App 跳转到其在“钱包”中的凭证**。无论你的 App 在何处显示有关“钱包”中现有凭证的信息，你都可以提供直接打开该凭证的链接。标记链接，例如“在‘钱包’中查看”。

**将凭证到期时间告知系统**。“钱包”会自动隐藏已过期的凭证以减少拥挤，并提供一个按钮，可让用户重新访问这些凭证。为了帮助确保系统正确隐藏凭证，请正确设定每个凭证的有效期、相关日期和无效属性；有关开发者指南，请参阅：[Pass](https://developer.apple.com/cn/documentation/walletpasses/pass)。

**从“钱包”删除凭证前，始终获得许可**。例如，你可以包括 App 内设置，让用户指定是手动删除还是允许自动移除凭证。如有必要，你可以在删除凭证前显示提醒。

**协助系统在相关时建议凭证**。理想情况下，凭证会在需要时自动显示，无需用户手动查找。当你提供凭证时间地点相关的信息时，系统可以在用户最有可能需要时在锁屏上显示凭证链接。例如，当用户进入健身房时，健身房会员卡可能会显示在锁屏上。对于活动门票等特定类型的凭证，系统还可开始实时活动。有关开发者指南，请参阅：[Showing a Pass on the Lock Screen](https://developer.apple.com/cn/documentation/walletpasses/showing-a-pass-on-the-lock-screen)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-pass-notification@2x.png)
*锁屏横幅*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-pass-live-activity@2x.png)
*实时活动*

**保持凭证为最新**。实体凭证通常不会更改，但数字凭证可实时反映变动。例如，航空公司登机牌可自动更新，显示航班延误和登机口变动。

**仅将更改信息用于更新时间关键信息**。更改信息会打断用户，因此仅针对用户需要了解的更新发送更改信息。例如，用户需要知道航班登机口的变动，但不需要知道客服电话号码的变动。切勿将更改信息用于营销或其他非关键通信。你可按栏位提供更改信息；有关开发者指南，请参阅：[Adding a Web Service to Update Passes](https://developer.apple.com/cn/documentation/walletpasses/adding-a-web-service-to-update-passes)。

## 凭证剖析

你可以使用凭证栏和语义标签组合来定义凭证的内容和结构。凭证栏定义凭证上显示的信息及其排列方式。语义标签向系统描述凭证内容，从而实现功能（如需要时显示凭证）以及精选操作（场地路线或活动指南等相关内容的快速链接）。海报活动凭证和语义登机牌需要使用语义标签，并实现自动布局。请也为这些凭证类型包括凭证栏及语义标签，以便凭证在运行旧版 iOS 的设备上正确显示。

在某些情况下，你可以提供补充信息，让用户可从凭证正面链接的表单访问。凭证背面包含用户很少需要访问的设置和信息，如法律文本。

有关开发者指南，请参阅：[Wallet Passes](https://developer.apple.com/cn/documentation/walletpasses)。

### 凭证栏位类型

凭证栏位分为以下区域：

- 标志和标志文本栏位：显示品牌图标和名称；在“钱包”中折叠凭证后仍可见。
- 标头栏位：显示在凭证折叠时保持可见的关键信息。
- 主要栏位：显示用户需要的最重要信息。
- 二级和辅助栏位：显示有用但不太重要的信息。
- 脚注栏位：显示补充信息，例如凭证类别（如“家庭”或“年度”）。
- 背面栏位：显示补充详细信息（显示在“钱包”中的凭证详细信息内）。

布局因凭证样式而异。有关开发者指南，请参阅：[Defining the metadata of your Wallet Pass](https://developer.apple.com/cn/documentation/walletpasses/defining-the-metadata-of-your-wallet-pass)。

## 设计凭证

“钱包”使用一致的视觉风格构建熟悉感和信任感。设计整洁简单的凭证，让其在“钱包”中感觉如原生一般，而不仅仅是复制实物的外观。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-wallet-app@2x.png)

使用 Pass Designer 设计和预览 Apple 钱包凭证。从 Apple 提供的模板或空白凭证着手，你可以创建登机牌、优惠券、活动门票、商店卡、通用凭证和海报通用凭证。有关更多信息，请参阅：[Creating a pass with Pass Designer](https://developer.apple.com/cn/documentation/walletpasses/creating-a-pass-with-pass-designer)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/wallet-pass-pass-designer-overview@2x.png)

**设计美观且适用于所有设备的凭证**。凭证外观可能因设备而异。例如，Apple Watch 上的凭证比其在 iPhone 上出现时显示更少信息和图像。不要将基本信息放在某些设备上可能不可用的元素中。此外，避免给图像添加内边距；例如，watchOS 会裁剪一些图像的空白区域。有关指南，请参阅：[watchOS](wallet.md#watchOS)。

**保持凭证正面整洁**。在标头中显示基本信息（如活动日期或账户余额），以便凭证在“钱包”中折叠时，用户可以看到。将凭证正面的其余部分用于提供用户需要快速访问的信息。将用户不常需要的详细信息放在附加凭证信息表单上。

**让你的凭证可被立即识别**。使用品牌颜色和图像、图标和全图背景等视觉元素，帮助用户一眼识别你的凭证。

**确保背景和文本颜色的对比度充足**。选择标签颜色，使文本在纯色背景和背景图像上均易于阅读。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-text-sufficient-contrast@2x.png)
*纯色背景与标签文本之间的对比度充足*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-text-insufficient-contrast@2x.png)
*纯色背景与标签文本之间的对比度不足*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-background-sufficient-contrast@2x.png)
*图像背景与标签文本之间的对比度充足*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-background-insufficient-contrast@2x.png)
*图像背景与标签文本之间的对比度不足*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

**使用适用于任何设备的语言**。凭证可以显示在多台设备上，因此请使用在任何位置都适用的文本。例如，“滑动以查看”在 iPhone 上有意义，但在 Apple Watch 上却不适用。

## 凭证样式

你可以选取各种凭证样式。每种样式定义了凭证的外观和布局。

### 登机牌

登机牌样式适用于旅行票据：航空公司登机牌、火车票、汽车票、船票和通用交通凭证。每个凭证通常对应于有特定起点和终点的单程。将语义标签用于航空公司登机牌；将凭证栏用于所有其他交通类型。有关开发者指南，请参阅：[Creating an airline boarding pass using semantic tags](https://developer.apple.com/cn/documentation/walletpasses/creating-an-airline-boarding-pass-using-semantic-tags)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-types-airline-boarding@2x.png)

### 优惠券

优惠券样式适用于优惠券、特惠和其他折扣。有关开发者指南，请参阅：[Creating a coupon pass](https://developer.apple.com/cn/documentation/walletpasses/creating-a-coupon-pass)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-types-coupon@2x.png)

### 活动门票

活动门票凭证样式适用于活动入场，如体育赛事、音乐会、电影和戏剧。每个凭证通常对应于特定活动，但你也可以将单个凭证用于多个活动，就像季票一样。活动门票支持全图背景，以营造活动风格和氛围。有关开发者指南，请参阅：[Creating a poster event pass using semantic tags](https://developer.apple.com/cn/documentation/walletpasses/creating-an-event-pass-using-semantic-tags)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-types-poster-event-ticket@2x.png)

非海报样式活动门票使用标准凭证栏，并且可以使用背景图像和缩略图。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-types-event-ticket-background@2x.png)
*带背景和缩略图的活动门票*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-types-event-ticket@2x.png)
*带缩略图的活动门票*

### 商店卡

商店卡样式适用于商店会员卡、折扣卡、积分卡和礼品卡。如果账户有余额，凭证通常会显示。有关开发者指南，请参阅：[Creating a store card pass](https://developer.apple.com/cn/documentation/walletpasses/creating-a-store-card-pass)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-types-store-card@2x.png)

### 海报通用凭证

海报通用凭证样式包含全背景图像和不同于其他凭证样式的凭证栏布局，提供了支持广泛用例的灵活选项。它不与特定类别绑定，因此你可以在其他凭证样式不适用时使用它。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-types-generic-poster-pass@2x.png)

### 通用凭证

通用样式适用于不属于其他类别的凭证，如健身房会员卡或衣帽寄存提领单。有关开发者指南，请参阅：[Creating a Poster Generic Pass](https://developer.apple.com/cn/documentation/walletpasses/creating-a-poster-generic-pass)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-types-generic-pass@2x.png)

## 凭证图像

凭证支持各种图像类型。以 @2x 和 @3x 的 PNG 格式创建凭证图像。

**将凭证图像预留给视觉内容**。嵌入文本不可访问，且如果图像不会在所有设备上显示，其可能不可见。对于文本信息，请改用文本栏和语义标签。使用 Pass Designer 或相应的 API 添加条形码，不要将其嵌入凭证图像中。

**保持较小的图像文件大小**。用户可通过电子邮件或网页接收凭证。为了实现尽可能快的下载，请在保持图像美观的同时使用最小的图像文件。

**提供凭证图标**。系统使用凭证图标在锁屏上、“邮件”中和“钱包”凭证上代表你的凭证。你可以使用你的 App 图标或单独设计图标。

### 标志

标志显示在带凭证栏的凭证左上角，通常为代表你品牌的水平文本标志，也可组合图形元素。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-logo@2x.png)

|  |  |
| --- | --- |
| **支持的凭证样式** | 非语义航空公司登机牌、非航空公司登机牌样式、优惠券、非海报活动门票、通用凭证、商店卡 |
| **文件名** | logo.png |
| **最小宽度** | 50 点 |
| **最大宽度** | 160 点 |
| **高度** | 50 点 |

**避免在标志插图上添加内部投影**。当标志渲染在凭证上时，内部投影会降低可读性。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-logo-no-shadow@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-logo-with-shadow-incorrect@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

### 主要标志

与标志一样，主要标志显示在凭证的顶部前缘角处，但专用于语义凭证。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-primary-logo-square@2x.png)
*带标志文本的正方形主要标志*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-primary-logo-wide@2x.png)
*无标志文本的矩形主要标志*

|  |  |
| --- | --- |
| **支持的凭证样式** | 航空公司登机牌、海报活动门票和海报通用凭证 |
| **文件名** | primaryLogo.png |
| **最小宽度** | 30 点 |
| **最大宽度** | 126 点 |
| **高度** | 30 点 |

### 二级标志

二级标志显示票据发行商或活动组织者的其他标志，出现在海报活动门票的底部后缘角处。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-secondary-logo@2x.png)

|  |  |
| --- | --- |
| **支持的凭证样式** | 海报活动门票 |
| **文件名** | secondaryLogo.png |
| **最小宽度** | 12 点 |
| **最大宽度** | 135 点 |
| **高度** | 12 点 |

### 图标

图标为正方形，并在凭证出现在锁屏上、“邮件”中和“钱包”凭证上时代表公司或品牌。系统会自动应用圆角，因此你无需将其设为圆角。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-icon-notification@2x.png)
*锁屏横幅中的图标*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-icon-wallet@2x.png)
*“钱包”中凭证上显示的图标*

|  |  |
| --- | --- |
| **支持的凭证样式** | 全部 |
| **文件名** | icon.png |
| **宽度** | 38 点 |
| **高度** | 38 点 |

### 条形图像

条形图像显示在优惠券和商店卡上，用于加强你的品牌或优惠。由于文本可能会出现在条形图像上，请确保文本与图像之间的对比度充足。保持文本之后的区域整洁，并将重要的视觉元素放置在底部或后缘。避免将文本嵌入条形图像中。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-strip-image@2x.png)

|  |  |
| --- | --- |
| **支持的凭证样式** | 优惠券、商店卡 |
| **文件名** | strip.png |
| **宽度** | 375 点 |
| **高度** | 144 点 |

### 缩略图

缩略图是电影海报等小型图像，显示在活动门票和通用凭证上。缩略图为正方形，因此请在插图上使用圆角并导出为透明 PNG。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-thumbnail@2x.png)

|  |  |
| --- | --- |
| **支持的凭证样式** | 活动门票、通用凭证 |
| **文件名** | thumbnail.png |
| **最小宽度** | 60 点 |
| **最大宽度** | 90 点 |
| **高度** | 90 点 |

### 背景

背景图像是凭证的视觉焦点。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-types-event-ticket-background@2x.png)
*在旧版活动门票上，背景在内容后模糊显示。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-background-unblurred@2x.png)
*在海报活动门票和海报通用凭证上，背景不会模糊显示。*

**非海报凭证背景**

|  |  |
| --- | --- |
| **支持的凭证样式** | 活动门票 |
| **文件名** | background.png |
| **宽度** | 343 点 |
| **高度** | 503 点 |

**海报凭证背景**

|  |  |
| --- | --- |
| **支持的凭证样式** | 海报活动门票、海报通用凭证 |
| **文件名** | artwork.png |
| **宽度** | 358 点 |
| **高度** | 448 点 |

将内容置于安全区内。在海报通用凭证和海报活动门票上，素材条会覆盖图像的底部边缘。如果凭证包含条形码，请在背景设计中考虑条形码。你可以在 Pass Designer 中预览凭证布局以验证位置。有关开发者指南，请参阅 [Pass](https://developer.apple.com/cn/documentation/walletpasses/pass) 中的 `footerBackgroundColor`。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-background-layout-qr-code@2x.png)
*凭证布局*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-background-layout-qr-code-safe-areas@2x.png)
*安全区*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-background-layout-barcode@2x.png)
*凭证布局*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-passes-images-background-layout-barcode-safe-areas@2x.png)
*安全区*

### 脚注

脚注仅适用于航空公司登机牌。

|  |  |
| --- | --- |
| **支持的凭证样式** | 航空公司登机牌 |
| **文件名** | footer.png |
| **宽度** | 268 点 |
| **高度** | 15 点 |

## 订单跟踪

如果你支持订单跟踪，当用户通过你的 App 或网站下单后，“钱包”可显示订单相关信息，并在订单状态发生变化时更新这些信息。在 iOS 17 及更高版本中，你可以帮助用户直接从 App 或网站开始跟踪订单，并提供更多方式让其将订单添加到“钱包”。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-ot-status-order-placed@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-ot-status-delivered@2x.png)

“钱包”呈现了一个仪表盘，其中显示了客户的活跃订单和已完成订单。用户可以选择一个订单来查看它的详细信息，如订购的物品以及送货和取货的履行信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-ot-dashboard@2x.png)
*仪表盘*

[Wallet Orders](https://developer.apple.com/cn/documentation/walletorders) 方案定义了你用于提供产品描述、订单状态、联系信息以及送货和取货详细信息等订单数据的属性，包括预计到达日期、地址、物流跟踪编号和取货说明。“钱包”会在系统定义的一致界面中显示你提供的信息。为了帮助用户快速方便地获取所需信息，请使用与你的订单流程相匹配的属性来提供尽可能多的信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-ot-status-on-the-way-fields@2x.png)

**让用户轻松将订单添加到“钱包”**。例如，当客户在你的 App 或网站中完成 Apple Pay 交易时，使用 [PKPaymentOrderDetails](https://developer.apple.com/cn/documentation/passkit/pkpaymentorderdetails) (App) 或 [ApplePayPaymentOrderDetails](https://developer.apple.com/cn/documentation/applepayontheweb/applepaypaymentorderdetails)（网站）自动将订单添加到“钱包”。在 iOS 17 及更高版本中，你可以在 App 或网站的相关区域（例如订单确认、状态或跟踪页面）或者电子邮件中使用 [AddOrderToWalletButton](https://developer.apple.com/cn/documentation/financekitui/addordertowalletbutton) 向客户显示系统提供的“通过 Apple 钱包跟踪”按钮。如果用户已经将订单添加到了“钱包”，尝试再次添加会打开“钱包”并显示该订单。

**在用户下单后，立即提供有关订单的信息**。用户需要确认其订单已被对方收到，即使付款、处理和履行操作仍在进行中。如果你稍后才能获得详细信息，请提供下单时获取的数据，以及“稍后检查订单的完整详细信息”等状态 [description](https://developer.apple.com/documentation/walletorders/order)。

**尽快提供履行信息，并保持最新状态**。当你提供履行数据或更改订单状态时，系统会更新订单信息，并可自动向客户发送通知。系统会使用你报告的履行状态，将订单的当前状态更新为一个值，如“已下单”、“正在处理”、“待取单”、“已取单”、“派送中”、“已送达”，或者（若出现问题）“问题”或“已取消”。有关描述状态的指南，请参阅[显示订单和履行详细信息](wallet.md#Displaying-order-and-fulfillment-details)。

**提供使用非透明背景的高分辨率标志图像**。系统会在仪表盘和详细信息视图中显示你的标志图像，因此你需要确保用户可立即识别各种大小的标志图像。使用 PNG 或 JPEG 格式创建 300x300 个像素的标志图像。为了帮助确保你的标志图像正确呈现，请务必使用非透明背景。有关开发者指南，请参阅 [logo](https://developer.apple.com/documentation/walletorders/merchant)。

**提供使用非透明背景的清晰、高分辨率产品图像**。系统会在详细信息视图、订单仪表盘以及订单或履行通知中显示产品图像以及你提供的描述性信息。创建产品图像时，使用简洁的描述和纯色的不透明背景。在“生活方式”情境或杂乱的背景中展示产品可能会使小尺寸项目难以区分。对于每个产品，使用 PNG 或 JPEG 格式创建 300x300 个像素的图像。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-ot-product-images@2x.png)

**通常保持文本精简**。用户希望能够一目了然地阅读文本，系统也会截断太长的文本。

**使用清晰易懂的语言，并本地化你提供的文本**。你需要确保所有客户都能阅读订单中的信息，以及你显示的价格与客户确认的最终价格相匹配。

### 显示订单和履行详细信息

订单可让用户联系商家，并显示有关其 Apple Pay 购买的详细信息，包括履行状态和每个项目的信息。

**提供用户管理其订单的区域的链接**。如果你提供一个通用链接，用户即使没有安装你的 App，也可以打开你的订单管理区域。若要进一步了解通用链接，请参阅：[Allowing apps and websites to link to your content](https://developer.apple.com/cn/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content)；有关开发者指南，请参阅：[Order](https://developer.apple.com/cn/documentation/walletorders/order)。

**清晰描述每个项目，以便用户可验证订单包含其期望的所有内容**。你可以使用 [LineItem](https://developer.apple.com/cn/documentation/walletorders/lineitem) 属性来提供产品价格、名称和图像等信息。订单列出了客户订购的每个项目的行项目；履行仅列出了履行包括的行项目。你还可以根据情况附加与订单相关的单笔交易的 PDF 收据。

**提供设备上可能安装的 App 的优先列表**。当需要在订单详细信息视图中显示你 App 的链接时，系统会使用此列表。例如，如果你提供了多个 App，并且设备上安装了其中的几个，系统会显示列表中最靠前的已安装 App 的链接。如果你的 App 均未在设备上安装，系统会显示列表中第一个 App 的链接。有关开发者指南，请参阅 [Order](https://developer.apple.com/cn/documentation/walletorders/order)。

**避免发送重复通知**。例如，如果客户安装了你的关联 App 之一，你可以告知系统避免通过“钱包”发送订单相关的通知。

**让客户可轻松联系商家**。提供多种联系方式，以便用户可选择最适合自己的一种。你至少需要提供商家网站或着陆页的链接，但也可以提供 Messages for Business 链接、电话号码、电子邮件地址和支持页面的链接。如果用户在订单中选择“联系”按钮，系统会显示你提供的联系方式菜单。有关开发者指南，请参阅：[Merchant](https://developer.apple.com/cn/documentation/walletorders/merchant)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-ot-contacts@2x.png)

**帮助用户跟踪其订单**。多物品订单可以包含多个履行类型，其中每个履行可以是送货或取货。例如，如果客户订购了一双鞋和一件 T 恤，客户可能希望其中一个物品已发货，而另一个在取货。无论履行类型如何，你都需要为用户提供足够的信息，让他们跟踪物品物流，并预计物品到达指定目的地的时间。除了预计到达时间外，用户还特别希望获取以下信息：

- 用于打开承运人网站的链接，可前往包含有关送货履行信息的页面。如果可能，除了物流跟踪编号外，还请提供直接链接，以便用户可轻松查看最新送货信息。如有必要，在打开的任何订单跟踪中间页面上显示此链接。
- 在取货履行中取货时所需的可扫描条形码。这可便于用户从“钱包”中提供条形码，而不是在电子邮件或网页中查找条形码。
- 明确的详细说明，可帮助用户接收订单或取单。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-ot-status-pickup-details@2x.png)

**保持履行屏幕着重于订单跟踪**。例如，如果你向客户推荐你的 App 或其他服务，请务必优先于屏幕中的其他内容来显示订单跟踪信息。

**选择与你获取的送货流程详细信息相匹配的送货履行值**。如果你知道承运人，请在 `carrier` 属性中输入其名称；否则，保留默认的“跟踪物流”值。如果你可访问承运人临时送货步骤（如正在运输中或正在派送）的详细信息，请使用特定的状态值（如 `onTheWay`、`outForDelivery` 或 `delivered`）来指示每个步骤。相反，如果你无法访问承运人的送货详细信息，请使用 `shipped` 状态。在这两种情况下，均提供一个物流跟踪链接（如有），以便用户可以自行跟踪订单。有关开发者指南，请参阅 [ShippingFulfillment](https://developer.apple.com/cn/documentation/walletorders/shippingfulfillment)。

**通过相关履行状态描述，让客户实时了解情况**。绝佳的状态信息应准确易懂，且与所描述的状态明确相关。除了提供可帮助用户了解其订单状态的信息外，状态信息还可让你有机会使用你品牌的表达风格。

**在描述“问题”或“已取消”状态时，力求直截了当且详尽无遗**。用户通常需要了解出现问题的原因以及解决办法。

## 身份验证

在运行 iOS 16 及更高版本的 iPhone 上，用户可将身份证件储存在“钱包”中，稍后允许 App 或轻 App 访问卡片上的信息以验证其身份，而无需离开当前环境。例如，当在银行 App 中申请信用卡时，用户可能需要确认其身份。若要了解如何支持当面移动证件验证，请参阅[证件校验器](id-verifier.md)。

> **开发者注释**
>
> Apple 不会创建或查看用户添加到“钱包”中的身份文件，并且当用户同意与你的 App 共享身份信息时，你只会收到设备上无法读取的加密数据。有关开发者指南，请参阅 [Requesting identity data from a Wallet pass](https://developer.apple.com/cn/documentation/passkit/requesting-identity-data-from-a-wallet-pass)。

为了帮助你提供用户可信任的一致体验，Apple 提供“通过钱包验证”按钮。当需要请求身份验证时，你可以在 App 中使用该按钮。该按钮会显示描述你请求的表单，并让用户同意共享其信息或取消。

**仅在设备支持时呈现“钱包”验证选项**。如果当前设备无法返回你请求的身份信息，请勿显示“通过 Apple 钱包验证”按钮。如果“通过 Apple 钱包验证”不可用，请准备好呈现提供不同验证方法的回退视图；有关开发者指南，请参阅：[VerifyIdentityWithWalletButton](https://developer.apple.com/cn/documentation/passkit/verifyidentitywithwalletbutton)。

**仅在需要身份信息的确切时刻询问该信息**。如果要求提供个人信息的请求看似与用户的当前行为无关，他们可能会对此产生怀疑。例如，如果你的 App 需要身份验证，请等待用户完成需要此信息的流程或交易后，再要求提供此信息；不要在用户准备开始该流程前或只是创建账户时就请求进行验证。

**清晰且简明地描述需要所请求信息的原因**。你必须编写解释用户为何需要与 App 共享身份信息的文本（此文本称为*目的字符串*或*用途描述字符串*）。系统会在验证表单中显示你的目的字符串，以便用户作出明智的决定。以下是几个示例：

| 验证对象… | 用于支持… | 目的字符串示例 |
| --- | --- | --- |
| 身份 | 开立账户，法律要求提供身份证明以防范欺诈行为 | 联邦法律要求提供此信息来验证你的身份，并帮助 [App 名称] 防范欺诈行为。 |
| 驾驶特权 | 租用需要合法驾驶特权的车辆 | 适用的州法律要求 [App 名称] 验证你的驾驶特权。 |

对于每个目的字符串，应使用直截了当、具体且易于所有人理解的完整短句。使用句首字母大写、避免被动语态，并以句号结尾。

**仅要求提供实际需要的数据**。如果你请求的数据多于完成当前任务或操作所需的数据，用户可能会失去对你 App 的信任。例如，如需确保客户至少达到特定年龄，请使用指定年龄阈值的请求，避免要求客户提供当前年龄或出生日期。有关开发者指南，请参阅 [age(atLeast:)](https://developer.apple.com/cn/documentation/passkit/pkidentityelement/age(atleast:))。

**清楚地指明你是否会保留数据；如需保留，请说明保留时长**。为了让用户信任你的 App，有必要说明需要将他们同意与你共享的个人信息保留多长时间。当你使用 PassKit API 来指定保留时长（如特定时间段、无限期或仅在完成当前验证所需的时间内），系统会自动在验证表单中显示说明性内容。有关开发者指南，请参阅 [PKIdentityIntentToStore](https://developer.apple.com/cn/documentation/passkit/pkidentityintenttostore)。

**选择与你的用例和 App 视觉设计相匹配的系统提供的验证按钮**。系统提供以下按钮标签来支持各种用例：

| 按钮类型 | 应考虑的使用场景… |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-button-verify-age@2x.png) | 验证用户的年龄后，你的 App 即可完成当前交易。一个交易示例是提供汽车租赁。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-button-verify-identity@2x.png) | 验证用户的身份后，你的 App 即可完成当前交易。一个交易示例是汽车租赁。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-button-continue-with@2x.png) | “通过钱包验证”是验证流程的一部分，还要求用户提供“通过钱包验证”所未提供的其他信息，如社会安全号或电话号码。示例包括开立金融账户或执行背景调查。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/wallet-button-verify-with@2x.png) | App 可完成当前验证流程，而无需执行其他步骤，但“验证年龄”、“验证身份”和“继续”按钮标签却不适用于你的用例。一个示例是帮助用户注册政府服务的 App。 |

所有按钮标签还可采用多行变体，当水平空间受限时，系统会自动使用该变体。有关开发者指南，请参阅 [PKIdentityButton.Label](https://developer.apple.com/cn/documentation/passkit/pkidentitybutton/label)。

验证按钮始终在黑色背景上使用白色字母。如需确保按钮与你 App 中的深色背景形成鲜明对比，你可选择包括浅色外框的样式。此外，你可以使用 [cornerRadius](https://developer.apple.com/cn/documentation/passkit/pkidentitybutton/cornerradius) 属性来调整验证按钮的四角，以匹配界面中的其他相关按钮。有关开发者指南，请参阅 [PKIdentityButton.Style.blackOutline](https://developer.apple.com/cn/documentation/passkit/pkidentitybutton/style/blackoutline)。

## 平台考量因素

*无针对 iOS、iPadOS、macOS 或 visionOS 的额外考量因素。在 Apple tvOS 中不受支持。*

### watchOS

在 Apple Watch 上，“钱包”以滚动轮播卡片的方式显示凭证。即使你没有创建手表特定的 App，用户也可以将你的凭证添加到 Apple Watch，因此了解凭证在设备上的外观至关重要。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/watch-card-and-details@2x.png)

用户可在其 Apple Watch 上轻点凭证显示详细信息屏幕，并以滚动视图显示更多信息。在某些情况下，用户还可以轻点特定交易，以获取更多信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/watch-pass-design-intro@2x.png)

每个凭证样式指定了栏位和图像，可显示在如下所示的基本布局区域中：

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/watch-layout-diagram@2x.png)

如果某些信息不适合布局区域，系统会将其显示在滚动的详细信息屏幕中。

> **重要信息**
>
> 在每种样式中，watchOS 都会裁剪条形图像以适合卡片界面的宽高比，并且可能会裁剪其他图像的空白区域。

**登机**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/watch-layout-boarding-pass@2x.png)

**优惠券**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/watch-layout-coupon@2x.png)

**商店**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/watch-layout-store-card@2x.png)

**活动**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/watch-layout-event-ticket@2x.png)

**通用**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/watch-layout-generic-pass@2x.png)

## 资源

#### 相关内容

[Apple Pay](apple-pay.md)

[证件校验器](id-verifier.md)

#### 开发者文档

[FinanceKitUI](https://developer.apple.com/cn/documentation/financekitui)

[FinanceKit](https://developer.apple.com/cn/documentation/financekit)

[PassKit (Apple Pay and Wallet)](https://developer.apple.com/cn/documentation/passkit)

[Wallet Passes](https://developer.apple.com/cn/documentation/walletpasses)

[Wallet Orders](https://developer.apple.com/cn/documentation/walletorders)

#### 视频

- [“钱包”的新功能](https://developer.apple.com/cn/videos/play/wwdc2026/209)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 6 月 8 日 | 更新以反映 iOS 27 和 Pass Designer App 的指南。 |
| 2025 年 1 月 17 日 | 新增适用于凭证图像尺寸的规范。 |
| 2024 年 12 月 18 日 | 新增了有关海报式活动门票样式的指南。 |
| 2023 年 9 月 12 日 | 增加了帮助用户将订单添加到“钱包”的指南。 |
| 2023 年 2 月 20 日 | 完善了用于呈现订单跟踪信息的指南，并添加了插图。 |
| 2022 年 11 月 30 日 | 新增在送货履行状态信息中包括承运人名称的指南。 |
| 2022 年 9 月 14 日 | 新增使用“通过钱包验证”的指南，并更新了关于提供送货状态值和描述的指南，并将指南整合为一页。 |
