# HealthKit

原文：https://developer.apple.com/cn/design/human-interface-guidelines/healthkit

HealthKit 是 iOS、iPadOS 和 watchOS 中健康和健身数据的中央储存库。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-HealthKit-intro@2x.png)

在 App 中支持 HealthKit 时，你可以向用户请求访问许可和更新其健康信息。

> **重要信息**
>
> 如果你的 App 并不提供健康和健身功能，请不要请求访问用户的私人健康数据。

例如，营养 App 可能会请求许可来获取用户的体重和健身记录数据，以便定义卡路里消耗量目标并提供饮食建议。在这种情况下，营养 App 还可以将用户记录的卡路里等数据发送给 HealthKit，以便后者将这些数据包含在其综合进度指标中。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/health-summary@2x.png)

有关开发者指南，请参阅 [HealthKit](https://developer.apple.com/cn/documentation/healthkit)。

## 隐私保护

你必须请求许可来访问用户的数据，并且必须采取所有必要步骤以保护这类数据。在获得许可后，有必要清楚地向用户展示如何使用其数据，从而获得用户的持续信任。有关开发者指南，请参阅 [Protecting user privacy](https://developer.apple.com/cn/documentation/healthkit/protecting-user-privacy)。

**提供一致的隐私政策**。在 App 提交过程中，必须提供明确声明隐私政策的 URL，以便用户点按 App 在 App Store 页面中的链接即可查看该政策。有关开发者指南，请参阅 [App 信息 > App Store Connect 帮助](https://help.apple.com/app-store-connect/#/dev219b53a88)。

**仅在需要时请求访问健康数据**。例如，在用户记录其体重后，请求访问体重信息十分合理，而不应在 App 启动后立即请求访问。如果请求与当前上下文明显相关，你可以帮助用户了解 App 的意图。此外，用户可以更改其授予的许可，因此 App 需要在每次需要访问时发出请求。有关开发者指南，请参阅 [requestAuthorization(toShare:read:completion:)](https://developer.apple.com/cn/documentation/healthkit/hkhealthstore/requestauthorization(toshare:read:completion:))。

**通过向标准许可屏幕添加描述性信息来阐明 App 的意图**。用户希望在收到批准访问健康数据的请求时，看到由系统提供的许可屏幕。编写一些简洁的句子来解释为什么需要这些信息以及用户如何从与 App 共享信息中受益。避免添加复制标准许可屏幕行为或内容的自定义屏幕。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/health-access-requests@2x.png)

**仅通过系统的隐私设置管理健康数据共享**。用户希望在“设置”>“隐私”中全局管理对其健康信息的访问。请勿在 App 中构建影响健康数据流的额外屏幕，以免用户感到困惑。

## 健身圆环

你可以通过显示健身圆环元素来显示用户在“活动”、“锻炼”和“站立”目标方面的进度，从而提升 App 的健康服务。“健身记录” App 定义了每个圆环的位置和颜色，因此用户熟悉该元素并理解其含义。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/activity-months@2x.png)

**仅使用健身圆环显示“活动”、“锻炼”和“站立”信息**。健身圆环持续表现这些特定领域的进度。请勿出于其他目的尝试复制或修改健身圆环或显示其他类型的数据。绝不要在其他类圆环元素中显示“活动”、“锻炼”和“站立”进度。

**使用健身圆环显示一个人的进度**。绝不要使用健身圆环表现多个人的数据，并确保使用标签、照片或头像来清楚显示该进度属于谁。

**不要将健身圆环用于装饰**。健身圆环用于向用户提供信息，而不仅仅是美化 App 设计。绝不要在标签或背景图形中显示健身圆环。

**不要将健身圆环用于品牌宣传**。在 App 中严格将健身圆环用于显示“健身记录”进度。绝不要在 App 图标或营销材料中使用健身圆环。

**保持健身圆环和背景颜色**。为了获得一致的用户体验，无论健身圆环在何种环境中显示，必须始终保持它的视觉外观相同。绝不要通过使用滤镜、更改颜色或修改不透明度来改变圆环或背景的外观，而是将周围的界面设计成与圆环融为一体。例如，将圆环放在圆圈内。始终适当缩放圆环，以免它们看起来脱节或错位。

**保持健身圆环外边距**。健身圆环元素的最小外边距必须不小于各圆环的间距。绝不要让其他元素裁剪、遮挡或侵占此边距或圆环本身。若要在圆圈内显示健身圆环元素，请调整封闭视图的圆角半径，而不是应用圆形遮罩。

**区分健身圆环与其他类圆环元素**。混合使用不同的圆环样式可能会让界面在视觉上产生混乱效果。如果必须包括其他圆环元素，请使用内边距、线条或标签将其与健身圆环分开。颜色和比例也有助于提供视觉分离效果。

**仅在“健身记录”通知中提供 App 特定信息**。系统已经提供了“活动”、“锻炼”和“站立”进度更新。因此，不要重复提供相同的信息，并且绝不要在 App 通知中显示健身圆环元素。你可以在通知中引用“健身记录”进度，但请以独特于你 App 的方式呈现，而不是复制系统提供的相同信息。

有关开发者指南，请参阅 [HKActivityRingView](https://developer.apple.com/cn/documentation/healthkitui/hkactivityringview)。

## Apple 健康图标

Apple 健康图标显示 App 兼容 HealthKit 和“健康” App。参阅以下指南来正确使用该图标。若要了解如何在文档和用户界面文本中指代 HealthKit 和“健康” App，请参阅[编辑指南](healthkit.md#Editorial-guidelines)；若要了解有关在营销信息中使用“Works with Apple Health”徽章的信息，请参阅 [Works with Apple Health](https://developer.apple.com/health-fitness/works-with-apple-health/)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/health-icon-onboard-screen@2x.png)

**仅使用 Apple 提供的图标**。不要自行创建 Apple 健康图标设计，也不要试图模仿 Apple 提供的任何设计。从 [Apple 设计资源](https://developer.apple.com/design/resources/#technologies)下载 Apple “健康” App 图标。

**在 Apple 健康图标旁边显示名称 *Apple 健康***。相邻显示这两个元素会提醒用户，该图标代表“健康” App。

**采用与其他健康相关 App 图标一致的方式显示 Apple 健康图标**。在包含其他 App 图标的视图中，确保 Apple 健康图标不小于其他图标。

**不要将 Apple 健康图标用作按钮**。仅使用该图标指明与“健康” App 的兼容性。

**不要更改 Apple 健康图标的外观**。不要通过遮罩该图标来更改其圆角半径，也不要以圆形呈现该图标。不要添加边框、颜色叠层、渐变、阴影或其他视觉效果等装饰元素。

**在 Apple 健康图标周围预留其 1/10 高度的最小净间距**。不要将图标合成到其他图形元素上。

**不要在文本中使用 Apple 健康图标，也不要使用它来代替术语*健康*、*Apple 健康*或 *HealthKit***。请参阅[编辑指南](healthkit.md#Editorial-guidelines)以了解如何在文本中正确指代“健康” App 和 HealthKit。

**不要显示“健康” App 图像或截屏**。与所有 App 图像一样，这些设计受版权保护，不能出现在你的 App 或营销材料中。你可以在 App 中包含健身圆环元素来显示“活动”、“锻炼”和“站立”进度；有关指南，请参阅[健身圆环](healthkit.md#Activity-rings)。

## 编辑指南

**将“健康” App 称为 *Apple 健康*或 *Apple “健康” App***。在 App 和营销文本中，使用 *Apple 健康*可提高清晰度。

**不要使用术语 *HealthKit***。*HealthKit* 是一个面向开发者的术语，用来命名 App 用于访问健康数据的框架。如需向用户说明 App 如何处理其数据，可以使用术语 *Apple “健康” App*。例如，可以表述为 App “兼容 Apple 健康 App”或“使用 Apple 健康 App 中的数据”。

**使用术语 *Apple Health* 时，请使用正确的大小写形式**。*Apple Health* 是两个单词，其中 A 和 H 大写，后面跟小写字母。只有在需要与既定排版界面样式保持一致时，才能完全大写显示 *Apple Health*，例如在所有文本都大写的 App 中。

**使用系统提供的 *Health* 翻译，以免用户感到困惑**。最好使用用户在设备上看到的翻译来指代 Apple “健康” App。

## 平台考量因素

*无针对 iOS、iPadOS 或 watchOS 的额外考量因素。在 macOS、Apple tvOS 或 visionOS 中不受支持。*

## 资源

#### 相关内容

[Works with Apple Health](https://developer.apple.com/health-fitness/works-with-apple-health/)

[健身圆环](activity-rings.md)

[Apple 设计资源](https://developer.apple.com/design/resources/#technologies)

#### 开发者文档

[HealthKit](https://developer.apple.com/cn/documentation/healthkit)

[Protecting user privacy](https://developer.apple.com/cn/documentation/healthkit/protecting-user-privacy) — HealthKit

#### 视频

- [利用 HealthKit 体能训练区间提供健身洞察](https://developer.apple.com/cn/videos/play/wwdc2026/207)
- [了解 HealthKit Medications API](https://developer.apple.com/cn/videos/play/wwdc2025/321)
- [使用 iOS 和 iPadOS 上的 HealthKit 跟踪体能训练](https://developer.apple.com/cn/videos/play/wwdc2025/322)
