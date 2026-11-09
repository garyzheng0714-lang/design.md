# 隐私

原文：https://developer.apple.com/cn/design/human-interface-guidelines/privacy

隐私保护至关重要：对于所需要的隐私相关数据和资源保持透明和保护用户允许你访问的数据十分重要。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/foundations-privacy-intro@2x.png)

用户以非常个性化的方式使用自己的设备，并期望 App 能够帮助他们保护隐私。

提交全新或更新的 App 时，你必须提供隐私惯例和所收集的隐私相关数据的详细信息，以便让 App Store 在你的产品页面展示该信息。（你可以在 [App Store Connect](https://help.apple.com/app-store-connect/#/dev1b4647c5b) 中随时管理此信息。）用户会先了解你产品页面的隐私详细信息后再决定是否下载 App。若要进一步了解，请参阅 [App Store 上 App 隐私保护的详细说明](https://developer.apple.com/app-store/app-privacy-details/)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-social-media-app-store-nutrition-labels@2x.png)
*App 的 App Store 产品页面可帮助用户在下载 App 前了解它的隐私惯例。*

## 最佳实践

**仅请求访问你实际需要的数据**。请求访问功能所需之外的更多数据，或者在用户对功能表示感兴趣前请求数据，这样做会让用户很难信任你的 App。尽量细化许可请求，让用户精准控制自己的数据。

**对 App 如何收集和使用用户数据保持透明**。如果用户不能充分理解你计划如何使用其数据，那么用户不太可能愿意共享数据。始终遵照用户的选择来使用“隐藏邮件地址”和“邮件隐私保护”等系统功能，以及务必知晓 App 跟踪相关的义务。若要进一步了解 Apple 隐私功能，请参阅[隐私](https://www.apple.com/privacy/)；有关开发者指南，请参阅[用户隐私和数据使用](https://developer.apple.com/app-store/user-privacy-and-data-use/)。

**尽量在设备端处理数据**。例如，在 iOS 中，你可以充分利用 Apple 神经网络引擎和定制 CreateML 模型直接在设备端处理数据，从而帮助你避免与远程服务器之间的耗时且有潜在风险的来回通信。

**采用系统定义的隐私保护措施并遵守安全保护最佳实践**。例如，在 iOS 15 及更高版本中，你可以依赖 CloudKit 为字符串、数字和日期等更多数据类型提供加密和密钥管理。

## 请求权限

以下是你必须请求访问权限的几个示例：

- 个人数据，包括位置、健康、财务、联系方式和其他可识别个人身份的信息
- 用户生成的内容，如电子邮件、信息、日历数据、联系人、游戏信息、Apple Music 活动、HomeKit 数据以及音频、视频和照片内容
- 受保护的资源，如蓝牙外围设备、家庭自动化功能、无线局域网连接和本地网络
- 设备功能，如摄像头和麦克风
- ARKit 数据，例如手部跟踪、平面估算、图像锚定和世界跟踪（对于在全空间中运行的 visionOS App）
- 设备的广告标识符，用于支持 App 跟踪

系统会提供标准提醒，让用户查看你提出的每个请求。你需要提供文件描述你的 App 为什么需要访问权限，系统会在提醒中显示该描述。用户也可以查看这个描述，并在“设置”>“隐私”中更新其选择。

**仅在 App 明确需要访问数据或资源时才请求权限**。对访问个人信息或设备功能的请求产生怀疑是人之常情，尤其是在没有明确需求的情况下。理想情况下，应等到用户实际使用需要访问权限的 App 功能时再请求权限。例如，你可以在用户表示对需要位置信息的功能感兴趣后，再使用[位置按钮](privacy.md#Location-button)给用户提供共享位置的方式。

**避免在启动时请求权限，除非该数据或资源对 App 正常运行必不可少**。当你的请求原因显而易见时，用户不太可能被启动阶段的此类请求打扰。例如，用户理解导航 App 需要访问其位置，他们才能从中获益。与之类似，如果用户想要玩可让其将虚拟对象击向四周中的墙体并反弹的 visionOS 游戏，他们先需要允许该游戏访问四周相关的信息。

**撰写清晰描述 App 如何使用所请求的功能、数据或资源的文件**。标准提醒会在你的 App 名称后和用户用于授予或拒绝权限的按钮前显示你的文件（称为*目的字符串*或*用途描述字符串*）。文件应使用直截了当、具体且易于理解的完整短句。使用句首字母大写、避免被动语态，并以句号结尾。有关开发者指南，请参阅 [Requesting access to protected resources](https://developer.apple.com/cn/documentation/uikit/requesting-access-to-protected-resources) 和 [App Tracking Transparency](https://developer.apple.com/cn/documentation/apptrackingtransparency)。

|  | 目的字符串示例 | 注 |
| --- | --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 该 App 会在夜间进行记录以检测鼾声。 | 主动句，清晰描述 App 如何以及为何收集该数据。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | 需要访问麦克风以提供更好的体验。 | 被动句，提供的理由模糊且未定义。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | 打开麦克风访问。 | 祈使句，未提供任何理由。 |

以下是标准系统提醒的几个示例：

**示例 1**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-social-media-post-location-alert@2x.png)

**示例 2**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-social-media-post-photo-alert@2x.png)

**示例 3**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-social-media-friends-contacts-alert@2x.png)

### 预提醒屏幕、窗口或视图

理想情况下，当前的上下文应帮助用户理解你为什么要请求权限。如果有必要提供额外的详细信息，你可以在系统提醒出现前显示自定义屏幕或窗口。以下指南适用于在请求权限以访问受保护数据和资源（包括相机、麦克风、位置、通讯录、日历和跟踪）的系统提醒前显示的自定义视图。

**仅包括一个按钮并清楚表明它会打开系统提醒**。当自定义屏幕或窗口还包括一个不打开提醒的按钮时，用户可能会觉得自己被操纵了，因为这种体验会让他们偏离自己的选择。另一种被操纵的体验是使用“允许”之类的词作为自定义屏幕按钮的标题。如果自定义按钮的含义和视觉效果看起来与提醒中的允许按钮类似，用户更有可能在无意中选取提醒的允许按钮。使用“继续”或“下一步”之类的词给自定义屏幕或窗口中的单个按钮命名，阐明其操作是为了打开系统提醒。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-custom-messaging-correct@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

**除非为获得法律同意所必需，否则请勿在自定义屏幕或窗口中包括额外操作**。例如，不要提供可让用户不查看系统提醒就退出屏幕或窗口的方式，如提供关闭或取消选项。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-custom-messaging-incorrect-cancel-button@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*不包括用于取消的选项。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-custom-messaging-incorrect-close-button@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*不包括用于关闭视图的选项。*

### 跟踪请求

App 跟踪是一个敏感的问题。在某些情况下，显示描述跟踪好处的自定义屏幕或窗口可能有意义。如果你想在用户一启动 App 时就执行 App 跟踪，那就必须先显示系统提供的提醒，才能收集任何跟踪数据。

**切勿在系统提供的提醒前显示可能迷惑或误导用户的自定义屏幕或窗口**。用户有时会在不阅读提醒的情况下快速将它关闭。自定义信息屏幕、窗口或视图如利用此类行为影响了用户的选择，将可能导致被 App Store 审查拒绝。

有几种自定义屏幕设计禁止使用，否则将被拒绝。例如，提供奖励、显示看似请求的屏幕或窗口、显示提醒图像，以及在提醒后面的屏幕上显示注解（如下所示）。为避免混淆，允许在 [App Tracking Transparency](https://developer.apple.com/cn/documentation/apptrackingtransparency) 系统提醒之前或之后显示同意屏幕或窗口以遵守当地的隐私法律。若要进一步了解，请参阅：[App Review Guidelines: 5.1.1 (iv)](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage)。

**奖励**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-custom-messaging-prohibited-incentive@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*不要为授权请求提供奖励。你不能因为用户授予权限而提供补偿，也不能在用户允许跟踪前保留功能或内容或者让 App 无法使用。*

**仿制请求**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-custom-messaging-prohibited-imitation@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*不要显示模仿系统提醒功能的自定义屏幕，尤其不要创建使用“允许”或类似字眼的按钮标题，因为用户不会允许预提醒屏幕中的任何东西。*

**提醒图像**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-custom-messaging-prohibited-alert@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*不要显示标准提醒的图像并以任何方式修改它。*

**提醒注解**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-custom-messaging-prohibited-alert-annotation@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*不要添加视觉提示，将用户的注意力吸引至系统提醒的“允许”按钮。*

## 位置按钮

在 iOS、iPadOS 和 watchOS 中，Core Location 提供了一个按钮，让用户在任务需要访问其位置时授予 App 临时权限。位置按钮的外观可以根据 App 的用户界面而变化，并且它始终以一种可立即识别的方式传达位置共享操作。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/location-button@2x.png)

用户首次打开 App 并轻点位置按钮时，系统会显示标准提醒。该提醒可帮助用户了解如何使用这个按钮来限制 App 对其位置的访问，并提醒他们共享开始时会出现位置指示符。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/privacy-social-media-map-location-alert@2x.png)

用户确认其理解按钮的操作后，只需轻点位置按钮，即可为 App 授予访问其位置的一次性权限。虽然每个一次性授权都会在用户停止使用 App 时过期，但他们不需要重新确认对按钮行为的理解。

> **注**
>
> 如果你的 App 没有授权状态，轻点位置按钮与用户选取标准提醒中的“*允许一次*”具有相同效果。如果用户之前选取了“*使用 App 期间*”，轻点位置按钮不会更改 App 的状态。有关开发者指南，请参阅 [LocationButton](https://developer.apple.com/cn/documentation/corelocationui/locationbutton) (SwiftUI) 和 [CLLocationButton](https://developer.apple.com/cn/documentation/corelocationui/cllocationbutton) (Swift)。

**考虑使用位置按钮为用户提供一种轻量级方式以针对特定 App 功能共享其位置**。例如，App 可让用户将其位置附加到信息或帖子、查找商店，或识别在其位置遇到的建筑、植物或动物。如果知道用户经常授予你的 App *允许一次*权限，可以考虑使用位置按钮来简化用户共享其位置的操作，无需重复与提醒交互。

**考虑自定义位置按钮以与用户界面协调一致**。具体来说，你可以：

- 从系统提供的标题中选取最适合相应功能的标题，如“当前位置”或“共享我当前的位置”。
- 选取实心或空心位置图形。
- 选择背景颜色以及标题和图形的颜色。
- 调整按钮的圆角半径。

为了帮助用户识别和信任位置按钮，你无法自定义按钮的其他视觉属性。系统还会提醒你颜色组合对比度低或半透明度过高等问题，以此来确保位置按钮始终清晰可见。除了修复此类问题以外，还应确保文字适合按钮，例如，在以所有可访问性文字大小显示和翻译成其他语言时，按钮文字都需要完整显示而不被截断。

> **重要信息**
>
> 如果系统识别到你的自定义位置按钮存在相符的问题，就不会在用户轻点该按钮时授予 App 访问设备位置的权限。虽然此类按钮可以执行其他 App 特定操作，但如果位置按钮不能按预期工作，用户可能会对你的 App 失去信任。

## 保护数据

保护用户的信息至关重要。当你需要在本地储存信息、授权用户特定操作以及通过网络传输信息时，利用系统提供的安全技术，让用户信赖你的 App 安全性并且帮助他们保护隐私。

以下是一些高级指南。

**避免仅依靠密码进行认证**。尽可能使用 [passkeys](https://developer.apple.com/documentation/authenticationservices/public-private_key_authentication/supporting_passkeys/) 来代替密码。如果需要继续使用密码认证，则要求进行双重认证来增强安全性（有关开发者指南，请参阅 [Securing Logins with iCloud Keychain Verification Codes](https://developer.apple.com/cn/documentation/authenticationservices/securing-logins-with-icloud-keychain-verification-codes)）。为进一步保护对用户在设备上保持登录 App 的访问，请使用生物识别认证，例如面容 ID、视控 ID 或触控 ID。有关开发者指南，请参阅 [Local Authentication](https://developer.apple.com/cn/documentation/localauthentication)。

**将敏感信息储存在钥匙串中**。钥匙串在处理个人隐私信息时，可以提供安全且可预见的用户体验。有关开发者指南，请参阅：[Keychain services](https://developer.apple.com/cn/documentation/security/keychain-services)。

**切勿将密码或其他安全内容储存在纯文本文件中**。即使使用了文件权限来限制访问，将敏感信息保存在加密的钥匙串中仍然会更安全。

**避免创造自定义认证方案**。如果你的 App 需要认证，请首选系统提供的功能，如 [passkeys](https://developer.apple.com/documentation/authenticationservices/public-private_key_authentication/supporting_passkeys/)、[通过 Apple 登录](sign-in-with-apple.md)或 [Password AutoFill](https://developer.apple.com/cn/documentation/security/password-autofill)。相关指南，请参阅：[管理账户](managing-accounts.md)。

## 平台考量因素

*无针对 iOS、iPadOS、Apple tvOS 或 watchOS 的额外考量因素。*

### macOS

**使用有效的 Developer ID 给 App 签名**。如果选择在商店以外的地方分发 App，使用 Developer ID 给 App 签名可将你识别为 Apple 开发者，并确认你的 App 可供安全使用。有关开发者指南，请参阅 [Xcode Help](https://developer.apple.com/go/?id=ios-app-distribution-guide)。

**通过 App 沙盒化保护用户的数据**。沙盒化可让你的 App 有权限访问系统资源和用户数据，同时保护它免受恶意软件的侵害。所有提交到 Mac App Store 的 App 都需要经过沙盒化。有关开发者指南，请参阅 [Configuring the macOS App Sandbox](https://developer.apple.com/cn/documentation/xcode/configuring-the-macos-app-sandbox)。

**避免假设登录者的身份。** 由于快速用户切换功能，同一个系统上可能存在多个活跃的用户。

### visionOS

visionOS 默认使用 ARKit 算法来处理视觉暂留、世界映射、分割、抠图和环境光线等功能。这些算法始终运行，从而允许共享空间中的 App 和游戏自动利用 ARKit。

ARKit 不会将数据发送给共享空间中的 App；若要访问 ARKit API，你的 App 必须打开全空间。此外，平面估算、场景重建、图像锚定和手部跟踪等功能需要用户许可才能访问任何信息。有关开发者指南，请参阅 [Setting up access to ARKit data](https://developer.apple.com/cn/documentation/visionos/setting-up-access-to-arkit-data)。

visionOS 在设计上注重保护用户输入的隐私。当用户注视你通过 SwiftUI 或 RealityKit 创建的交互式组件时，系统会自动显示悬停效果，为用户提供了所需的视觉反馈，同时在用户轻点之前不会透露其注视的位置。有关指南，请参阅[眼睛](eyes.md)和[“手势”> visionOS](gestures.md#visionOS)。

开发者在 visionOS 中对设备相机的访问方式与其他平台有所不同。具体来说，后置相机会提供空白输入并仅用作兼容性目的；前置相机为[空间自影像](shareplay.md#visionOS)提供输入，但前提是需要用户许可。如果登陆 visionOS 的 iOS 或 iPadOS App 包括需要访问相机的功能，请移除该功能或将该功能替换为让用户导入内容的选项。有关开发者指南，请参阅 [Making your existing app compatible with visionOS](https://developer.apple.com/cn/documentation/visionos/making-your-app-compatible-with-visionos)。

## 资源

#### 相关内容

[数据输入](entering-data.md)

[用户引导](onboarding.md)

#### 开发者文档

[Requesting access to protected resources](https://developer.apple.com/cn/documentation/uikit/requesting-access-to-protected-resources) — UIKit

[Security](https://developer.apple.com/cn/documentation/security)

[Requesting authorization to use location services](https://developer.apple.com/cn/documentation/corelocation/requesting-authorization-to-use-location-services) — CoreLocation

[App Tracking Transparency](https://developer.apple.com/cn/documentation/apptrackingtransparency)

#### 视频

- [了解 Trust Insights](https://developer.apple.com/cn/videos/play/wwdc2026/379)
- [将隐私保护融入开发流程](https://developer.apple.com/cn/videos/play/wwdc2025/246)
- [通行密钥的新功能](https://developer.apple.com/cn/videos/play/wwdc2025/279)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 21 日 | 整合指南到全新页面并针对 visionOS 更新。 |
