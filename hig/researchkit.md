# ResearchKit

原文：https://developer.apple.com/cn/design/human-interface-guidelines/researchkit

研究 App 让世界各地的用户都能参与重要的医学研究。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-ResearchKit-intro@2x.png)

ResearchKit 框架提供预设计的屏幕和过渡，可用于轻松设计并构建具有吸引力的自定义研究 App。有关开发者指南，请参阅：[Research & Care > ResearchKit](https://www.researchandcare.org/researchkit/)。

这些指南仅供参考，不构成法律建议。联系律师获取有关研究 App 开发和任何适用法律的建议。

## 打造用户引导体验

首次打开研究 App 时，用户会看到一系列屏幕，向其介绍研究、确定其参与资格、请求继续研究的许可以及（在适当时）允许访问个人数据。用户通常不会在看完这些屏幕后重新访问，因此清晰易懂至关重要。

**始终以正确的顺序显示用户引导屏幕。**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/researchkit-diagram@2x.png)

### 1.简介

**提供简介以告知信息并提供行动号召**。清晰描述研究的主题和目的。另外，允许现有参与者快速登录并继续正在进行的研究。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/introduction-screen@2x.png)

### 2.确定资格

**尽快确定资格**。如果用户不具备参与研究的资格，其不需要进入同意部分。仅显示研究所必需的资格要求。使用简单明了的语言描述要求，并使用户可以轻松输入信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/eligibility-screen@2x.png)

### 3.获得知情同意

**确保参与者了解研究，然后再获得其同意**。ResearchKit 可以帮助你实现简洁友好的同意过程，同时仍然允许你将任何法律要求或者机构审查委员会或伦理审查委员会设定的要求纳入同意书中。确保你的 App 符合适用的 App Store 指南，包括同意要求。同意部分通常会阐述研究的开展方式，确保参与者了解研究及其责任，并获得参与者的同意。

**将冗长的同意书分成几个易于理解的部分**。每个部分可以涵盖研究的一个方面，例如数据收集、数据使用、潜在好处、可能的风险、投入的时间、退出方式等。对于每个部分，使用简单明了的语言提供简要概述。如有必要，请提供该部分的更详细说明，参与者可以通过轻点“了解更多”按钮进行阅读。参与者必须能够查看整个同意书，然后再同意参与。

**如果适用，请提供测试参与者理解程度的测验**。对于在当面获得同意时参与者可能会被问到的问题，你可以提供此类测验。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/consent-quiz-screen@2x.png)

**获得参与者的同意，并在适当时获取一些联系信息**。同意加入研究后，参与者会收到一个确认对话框，其后是提供签名和联系人详细信息的屏幕。大多数研究 App 会通过电子邮件向参与者发送 PDF 版本的同意表单，以留作记录。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/consent-signature-screen@2x.png)

### 4.请求数据访问许可

**获取访问参与者设备或数据以及发送通知的许可**。清楚地说明为什么研究 App 需要访问位置、“健康”或其他数据，勿请求访问对研究并非至关重要的数据。如果你的 App 需要向参与者设备发送通知，也应请求许可。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/permissions-health-data-screen@2x.png)

## 开展研究

为了从参与者处获取输入，你的研究可以采用调查和/或活跃任务。根据研究架构的不同，参与者可能会与每个部分交互多次或仅一次。

**创建使参与者保持参与度的调查**。ResearchKit 提供可在调查中使用的许多可自定义屏幕，还可让你轻松呈现需要不同类型答案的问题，例如对或错、多项选择、日期和时间、滑动标尺和开放式文本输入。使用 ResearchKit 屏幕设计调查时，请遵循以下指南来提供出色的体验：

- 告知参与者问题个数以及调查所需的大致时长。
- 每个问题使用一个屏幕。
- 向参与者显示调查进度。
- 使调查尽可能简短。几项简短的调查往往比一项冗长的调查效果更好。
- 对于需要一些附加说明的问题，请为问题使用标准字体并为解释性文本使用稍小的字体。
- 当调查完成时告知参与者。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/survey-question-type1-screen@2x.png)

**使活跃任务易于理解**。活跃任务要求参与者参与某项活动，例如对着麦克风说话、用手指在屏幕上轻点、步行或进行记忆测试。遵循以下指南，以鼓励参与者执行活跃任务并尽可能提高其成功的可能性：

- 使用清晰、简单的语言描述如何执行任务。
- 说明任何要求，例如任务是否必须在特定时间或特定情况下执行。
- 确保参与者可以分辨任务已完成。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/active-tasks-screen@2x.png)

## 管理个人信息和鼓励用户

ResearchKit 提供个人资料屏幕，你可以使用该屏幕让参与者在研究 App 中管理个人信息。设计自定义屏幕来激励用户并让其能够跟踪研究进度也是一种不错的做法。理想情况下，App 中的这两个屏幕均始终可访问。

**使用个人资料帮助参与者管理与研究相关的个人数据**。个人资料屏幕可以让用户编辑研究过程中可能发生变化的数据（例如，体重或睡眠习惯），并提醒用户临近的活动。个人资料屏幕还可以提供一种简单的方式来退出研究及查看重要信息，例如同意文稿和隐私政策。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/profile-screen@2x.png)

**使用仪表盘显示进度并激励参与者继续**。在你的研究中适用时，可使用仪表盘提供鼓励式反馈，例如每日进度、每周评估、特定活动的结果，甚至是将参与者的结果与该研究中其他人的聚合结果进行比较得出的结果。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/dashboard-screen@2x.png)

## 平台考量因素

*无针对 iOS 或 iPadOS 的额外考量因素。在 macOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[Research & Care > ResearchKit](https://www.researchandcare.org/researchkit/)

#### 开发者文档

[Research & Care > Developers](https://www.researchandcare.org/developers/)

[Protecting user privacy](https://developer.apple.com/cn/documentation/healthkit/protecting-user-privacy) — HealthKit

[ResearchKit GitHub project](https://github.com/ResearchKit/ResearchKit)

#### 视频

- [CareKit 有哪些更新](https://developer.apple.com/cn/videos/play/wwdc2020/10151)
- [构建研究和护理 app，第 1 部分：设置新用户引导](https://developer.apple.com/cn/videos/play/wwdc2021/10068)
- [重新构思的 ResearchKit 和 CareKit](https://developer.apple.com/cn/videos/play/wwdc2019/217)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 9 月 12 日 | 更新了插图。 |
