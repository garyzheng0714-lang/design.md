# 证件校验器

原文：https://developer.apple.com/cn/design/human-interface-guidelines/id-verifier

证件校验器可让 iPhone App 当面读取移动证件，而无需使用外部硬件。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-ID-Verifier-Apps-intro@2x.png)

从 iOS 17 开始，你可以在 App 中集成证件校验器，从而让 iPhone 读取符合 ISO18013-5 标准的移动证件并帮助你支持当面证件验证。例如，音乐会场地的工作人员可在 iPhone 上使用你的 App 来验证客户的年龄。

使用证件校验器可让客户和组织实现双赢。

- 客户只需出示证明其年龄或身份的最少量数据，而无需交出其证件或出示其设备。
- Apple 提供了证书颁发、管理和验证过程的关键组件，简化了 App 开发过程并实现了一致、可信赖的证件验证体验。

根据 App 的需求，你可以使用证件校验器发出以下类型的请求：

- **“仅显示”请求**。使用“仅显示”请求在请求方 iPhone 上系统提供的用户界面中显示数据，例如用户的姓名或年龄连同其人像照片，以便请求方可直观确认用户的身份。发出“仅显示”请求时，客户的数据仍保留在系统提供的用户界面中，不会传输到你的 App。有关开发者指南，请参阅 [MobileDriversLicenseDisplayRequest](https://developer.apple.com/cn/documentation/proximityreader/mobiledriverslicensedisplayrequest)。
- **“数据传输”请求**。仅当你有依法验证的需求并需要储存或处理用户的地址或出生日期等信息时，才能使用“数据传输”请求。你必须请求额外的授权来发出“数据传输”请求。若要进一步了解，请参阅 [Get started with ID Verifier](https://developer.apple.com/wallet/id-verifier/)；有关开发者指南，请参阅 [MobileDriversLicenseDataRequest](https://developer.apple.com/cn/documentation/proximityreader/mobiledriverslicensedatarequest) 和 [MobileDriversLicenseRawDataRequest](https://developer.apple.com/cn/documentation/proximityreader/mobiledriverslicenserawdatarequest)。

## 最佳实践

**仅要求提供需要的数据**。如果你请求的数据多于完成当前验证所需的数据，用户可能会对这种体验失去信任。例如，如需确保客户至少达到最低年龄，请使用指定年龄阈值的请求，避免要求客户提供当前年龄或出生日期。有关开发者指南，请参阅 [ageAtLeast(_:)](https://developer.apple.com/cn/documentation/proximityreader/mobiledriverslicensedatarequest/element/ageatleast(_:))。

**如果 App 满足 Apple Business Register 条件，请注册证件校验器以确保当你发出请求时，用户可查看你组织相关的基本信息**。通过 Apple Business Register 注册证件校验器可让你向系统提供你的官方组织名称和标志，以作为证件验证用户界面的一部分显示在客户设备上。若要了解 App 是否满足条件以及如何注册，请参阅 [Apple Business Register](https://register.apple.com/services/login?returnTo=/signin/tap-to-present-id-on-iphone)。

**提供发起验证过程的按钮**。在执行简单年龄检查的按钮中使用“验证年龄”这样的标签，或者为更详细的身份数据请求使用“验证身份”。避免包括指明特定通信类型（例如 NFC 或二维码）的符号。绝不要在任何按钮标签中包括 Apple 标志。

| 按钮类型 | 使用示例 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/id-verifier-button-age@2x.png) | 检查用户是否达到出席活动或进入音乐厅场地等场所规定年龄的 App。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/id-verifier-button-identity@2x.png) | 验证特定身份信息是否匹配预期值（例如，提取租赁车辆时提供的姓名和出生日期）的 App。 |

**在“仅显示”请求中，帮助使用你 App 的用户为其执行的视觉确认提供反馈**。例如，如果读卡器显示客户的人像照片，你可以提供标签为“与本人相符”和“与本人不符”的按钮，以便 App 可以在响应中收到批准或拒绝值。

## 平台考量因素

*无针对 iOS 的额外考量因素。在 iPadOS、macOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[Apple Business Register](https://register.apple.com/services/login?returnTo=/signin/tap-to-present-id-on-iphone)

[IDs in Wallet](https://learn.wallet.apple/id)

[身份验证](wallet.md#Identity-verification)

#### 开发者文档

[Adopting the Verifier API in your iPhone app](https://developer.apple.com/cn/documentation/proximityreader/adopting-the-verifier-api-in-your-iphone-app) — ProximityReader

#### 视频

- [“钱包”和 Apple Pay 的新功能](https://developer.apple.com/cn/videos/play/wwdc2023/10114)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 9 月 12 日 | 新页面。 |
