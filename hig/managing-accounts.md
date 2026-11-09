# 管理账户

原文：https://developer.apple.com/cn/design/human-interface-guidelines/managing-accounts

账户可成为用户访问其内容和跟踪个人详细信息的便捷方式，只要这种方式不会为体验带来不必要的障碍。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-managing-accounts-intro@2x.png)

仅在你的核心功能需要时才请求用户创建账户，否则让用户无需账户也可享受你的 App 或游戏。如果需要账户，请考虑使用[“通过 Apple 登录”](sign-in-with-apple.md)来为用户提供可信任的一致登录体验，并省去记住多个账户和认证方式的麻烦。

## 最佳实践

**解释创建账户的好处和如何注册**。如果你的 App 或游戏需要账户，请编写简短且友好的描述来解释需要的原因及其好处。在登录视图显示此信息。

**尽可能延迟登录操作**。如果在执行任何有用操作前被迫登录，用户常常会弃用此类 App。为帮助避免这种情况，请在请求用户投入之前让其有机会感受你的 App 或游戏。例如，一个购物 App 可能会让用户尽情浏览内容，并仅在其准备好购买时才要求登录。

**如果未在你的 iOS、iPadOS、macOS 或 visionOS App 中使用“通过 Apple 登录”，则优先使用通行密钥**。通行密钥简化了账户的创建和认证，让用户无需创建或输入密码。App 支持通行密钥时，用户在创建新账户或登录现有账户时只需提供其用户名。有关开发者指南，请参阅 [Supporting passkeys](https://developer.apple.com/cn/documentation/authenticationservices/supporting-passkeys)。如果需要继续使用密码认证，则要求进行双重认证来增强安全性（有关开发者指南，请参阅 [Securing Logins with iCloud Keychain Verification Codes](https://developer.apple.com/cn/documentation/authenticationservices/securing-logins-with-icloud-keychain-verification-codes)）。

**始终标识你提供的认证方式**。例如，如果要显示一个用于通过面容 ID 登录 App 的按钮，请使用诸如“通过面容 ID 登录”的措辞作为标题，而非“登录”等宽泛用语。

**仅提及在当前环境中可用的认证方式**。例如，不要在不提供面容 ID 的设备上提及面容 ID。检查设备功能并使用适当的术语。有关开发者指南，请参阅 [LABiometryType](https://developer.apple.com/cn/documentation/localauthentication/labiometrytype)。

**通常来说，应避免提供选择使用生物识别认证的 App 特定设置**。用户是在系统层面打开生物识别认证，因此显示 App 内设置非常多余并可能造成混淆。

**避免使用术语*密码*来指代账户认证**。用户创建密码是用于解锁其设备或者认证 Apple 设备。如果在你的界面中使用该术语，用户可能会认为你请求其在 App 或游戏中重复使用其密码。

## 删除账户

如果帮助用户在你的 App 或游戏内创建了账户，你还必须帮助其删除账户，而非仅停用账户。除遵循以下指南外，确保了解并遵守你所在地区的与账户删除和被遗忘权相关的法律规定。

> **重要信息**
>
> 如果法律规定要求 App 保留账户或信息（如数字健康记录）或者遵循特定的账户删除流程，请清楚描述情况，以便用户了解此类信息或者你必须保留的账户和你必须遵循的流程。

**在 App 或游戏内提供发起账户删除的明确方式**。如果用户无法在 App 内执行账户删除，你必须提供可执行此操作的网页的直接链接。将链接放在易于发现的位置，例如，不要将其深藏在你的隐私政策或服务条款页面中。

> **开发者注释**
>
> 如果用户使用[“通过 Apple 登录”](sign-in-with-apple.md)在 App 内创建了账户，请在用户删除其账户时撤销关联的令牌。请参阅 [Token revocation](https://developer.apple.com/cn/documentation/signinwithapplerestapi/revoke-tokens)。

**无论用户在 App 或游戏内还是在网站上执行账户删除，应提供一致的体验**。例如，避免使其中一个删除流程版本比另一个版本更长或更复杂。

**考虑让用户计划未来删除账户**。用户可能希望有机会在用完剩余服务之后或直到订阅自动续期之前才删除其账户。如果你提供计划删除账户的方式，请同时提供立即删除的选项。

**告知用户账户删除何时会完成，并在完成后通知用户**。完全删除账户有时可能需要一段时间，因此及时通知删除流程的状态以便用户了解接下来的情况非常重要。

**如果支持 App 内购买，应帮助用户了解删除账户时会如何处理付款和取消**。例如，你可能需要帮助用户了解以下情形：

- 可自动续期的订阅会在用户取消订阅前继续通过 Apple 付款，无论用户是否删除账户。
- 删除账户后，用户需要取消订阅或请求退款。

除帮助用户了解这些情形外，请提供信息来描述如何取消订阅和管理购买项。有关指南，请参阅：[帮助用户管理订阅](apple-in-app-purchase.md#Helping-people-manage-their-subscriptions)和[提供帮助](apple-in-app-purchase.md#Providing-help)。

> **注**
>
> 即使用户未使用你的 App 购买订阅，你仍需要支持账户删除。

## 电视提供商账户

许多热门电视提供商可让用户在系统层面登录其账户，无需基于每个 App 单独认证。如果你的电视提供商 App 需要用户登录，请使用“电视提供商认证”提供最高效的用户引导体验。

**用户已在系统层面登录时，避免显示退出登录选项**。如果 App 必须包括退出登录选项，调用该选项时需要提示用户导览到“设置”>“电视提供商”以退出登录其账户。

**勿指示用户通过调整隐私控制来退出登录**。“设置”>“隐私”中的电视提供商控制并非退出登录机制。这些设置用于帮助用户管理可访问其电视提供商账户的 App。

## 平台考量因素

*无针对 iOS、iPadOS、macOS 或 visionOS 的额外考量因素。*

### Apple tvOS

大多数用户使用遥控器（而非键盘）与 Apple TV 交互，因此仅请求必要的最少量信息。

**优先让用户使用另一台设备注册或认证**。配置了 App 的关联域时，Apple TV 可配合其他设备来安全建议登录凭证，包括[通过 Apple 登录](sign-in-with-apple.md)。有关开发者指南，请参阅 [Configuring an associated domain](https://developer.apple.com/cn/documentation/xcode/configuring-an-associated-domain)。

**用户已登录共享账户时，避免每次其成为当前用户时都请求选取个人资料**。在 Apple tvOS 16 及更高版本中，你的 App 可与所有用户共享其凭证，同时单独储存每个人的个人资料和用户数据。支持这种类型的共享时，App 可自动使用当前用户的个人资料，无需请求每个人单独登录共享账户。有关开发者指南，请参阅 [kSecUseUserIndependentKeychain](https://developer.apple.com/cn/documentation/security/ksecuseuserindependentkeychain) 和 [User Management Entitlement](https://developer.apple.com/cn/documentation/bundleresources/entitlements/com.apple.developer.user-management)。

**尽量减少数据输入**。如果需要收集的信息稍多，请让用户从另一台设备访问网站。如果需要电子邮件地址，请显示电子邮件键盘屏幕，其中包括最近输入的地址的列表。

### watchOS

使用 iCloud 同步来提供钥匙串访问许可，让用户可自动填充用户名和密码并保留 App 设置。

## 资源

#### 相关内容

[用户引导](onboarding.md)

[通过 Apple 登录](sign-in-with-apple.md)

#### 开发者文档

[Supporting passkeys](https://developer.apple.com/cn/documentation/authenticationservices/supporting-passkeys) — Authentication Services

#### 视频

- [通行密钥的新功能](https://developer.apple.com/cn/videos/play/wwdc2025/279)
- [设备管理方面的新动向](https://developer.apple.com/cn/videos/play/wwdc2024/10143)
