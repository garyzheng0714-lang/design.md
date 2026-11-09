# CareKit

原文：https://developer.apple.com/cn/design/human-interface-guidelines/carekit

用户可以使用 CareKit App 来管理与糖尿病等慢性病相关的护理计划，进行伤后或术后恢复，或实现健康目标。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-CareKit-intro@2x.png)

若要进一步了解 CareKit，请参阅：[Research & Care > CareKit](https://www.researchandcare.org/carekit/)。

CareKit 2.0 包含两个项目：CareKit 用户界面和 CareKit Store。CareKit 用户界面提供各种预构建视图，你可以使用这些视图来创建自定义 CareKit App。CareKit Store 定义了一个包含 CareKit 实体（例如，患者、护理计划、任务和联系人）的数据库方案，以便你可以在患者设备上储存并管理数据。CareKit 2.0 提供数据库与用户界面之间的无缝同步，因此可始终使护理计划保持最新状态。有关开发者指南，请参阅 [CareKit](https://carekit-apple.github.io/CareKit/documentation/carekit)。

## 数据和隐私

保护用户的隐私并保证 CareKit App 收集和储存的极其敏感的数据安全最为重要。

**提供一致的隐私政策**。在 App 提交过程中，必须提供明确声明隐私政策的 URL，以便用户点按 App 在 App Store 页面中的链接即可查看该政策。有关开发者指南，请参阅 [App 信息 > App Store Connect 帮助](https://help.apple.com/app-store-connect/#/dev219b53a88)。

除用户输入到 CareKit App 的数据之外，你还可以通过 iOS 特性和功能访问数据。在通过这些特性访问数据之前，必须获得用户的许可，并且无论是用户将数据输入到 App 还是你从设备或系统获取数据，都必须保护用户的数据。有关开发者指南，请参阅 [Protecting user privacy](https://developer.apple.com/cn/documentation/healthkit/protecting-user-privacy)。

### HealthKit 集成

HealthKit 是 iOS 和 watchOS 中健康和健身数据的中央储存库。在 CareKit App 中支持 HealthKit 时，可以请求用户许可来访问其健康和健身数据，并与指定看护者共享数据。

**仅在需要时请求访问健康数据**。例如，在用户记录其体重后，请求访问体重信息十分合理，而不应在 App 启动后立即请求访问。如果请求与当前上下文明显相关，你可以帮助用户了解 App 的意图。此外，用户可以更改其授予的许可，因此最好在每次 App 需要访问时发出请求。有关开发者指南，请参阅 [requestAuthorization(toShare:read:completion:)](https://developer.apple.com/cn/documentation/healthkit/hkhealthstore/requestauthorization(toshare:read:completion:))。

**通过向标准许可屏幕添加描述性信息来阐明 App 的意图**。用户希望在收到批准访问健康数据的请求时，看到由系统提供的许可屏幕。编写一些简洁的句子来解释为什么需要这些信息以及用户如何从与 App 共享信息中受益。避免添加复制标准许可屏幕行为或内容的自定义屏幕。

**仅通过系统的隐私设置管理健康数据共享**。用户希望在“设置”>“隐私”中全局管理对其健康信息的访问。请勿在 App 中构建影响健康数据流的额外屏幕，以免用户感到困惑。

相关设计指南，请参阅 [HealthKit](healthkit.md)。有关开发者指南，请参阅 [HealthKit](https://developer.apple.com/cn/documentation/healthkit)。

### 运动数据

如果有助于治疗且用户授予许可，你的 App 可以从设备中获取运动信息，以确定用户是站立不动、步行、跑步、骑自行车还是开车。当用户在步行或跑步时，你还可以确定步数、配速和上下楼梯的层数。

运动信息还可以包括作为物理治疗的一部分收集的自定义数据。例如，一些 ResearchKit 任务使用设备传感器来测试灵活度、运动范围和行走能力。

有关开发者指南，请参阅 [Core Motion](https://developer.apple.com/cn/documentation/coremotion)。

### 照片

照片是传达治疗进度的绝佳方式。在获得用户许可的情况下，App 可以访问设备的摄像头和照片，与医护团队共享照片。例如，护理计划可能包括要求用户定期分享伤口的照片，这样医生就可以监测愈合过程。

有关开发者指南，请参阅 [UIImagePickerController](https://developer.apple.com/cn/documentation/uikit/uiimagepickercontroller)。

### ResearchKit 集成

ResearchKit App 可以让用户参与重要的医学研究。在适当情况下，CareKit App 可以整合 ResearchKit 功能来显示相关调查、任务和图表。ResearchKit 还包括一个知情同意模块，CareKit App 可以使用它来请求用户授予数据收集和共享许可。

相关设计指南，请参阅：[ResearchKit](researchkit.md)。有关开发者指南，请参阅：[Research & Care > Developers](https://www.researchandcare.org/developers/)。

## CareKit 视图

CareKit 用户界面提供可自定义的视图（分为三类：任务、图表和联系人），并在每个类别中定义几种默认视图样式。若要设计 CareKit App，只需选择所需的视图样式并提供要在其中显示的 CareKit Store 数据即可。

每个视图类别都旨在支持特定类型的内容和交互。为了确保一致的体验，请将每种视图类型用于其预期用途。

| 类别 | 用途 |
| --- | --- |
| [任务](carekit.md#Tasks) | 显示任务，例如服药或进行物理治疗。支持患者症状和其他数据的记录。 |
| [图表](carekit.md#Charts) | 显示图形数据，帮助用户了解其治疗进展情况。 |
| [联系人视图](carekit.md#Contact-views) | 显示联系信息。支持通过电话、信息和电子邮件进行沟通，并链接到联系人所在位置的地图。 |

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-tasks-and-charts@2x.png)
*任务和图表*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-contacts@2x.png)
*联系人*

CareKit 用户界面视图由标头组成，并且可以包括一堆内容子视图。标头位于视图的顶部，可以显示文本、符号和显示指示符，并且可以在其底部边缘包括分隔符。内容堆叠显示在标头下方，并以垂直排列方式显示内容子视图。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-view-components@2x.png)

CareKit 用户界面负责处理视图中的所有布局约束，因此在向堆叠中添加新的子视图时，不必担心打破现有约束。

### 任务

护理计划通常提供一套规定的操作供用户执行，例如服药、食用特定食物、锻炼或报告症状。CareKit 用户界面定义了几种样式的任务视图，你可以使用它们来显示规定的操作。通常，可以通过提供要显示的信息来自定义任务视图，这通常是通过指定储存在设备上的 CareKit Store 数据库中的数据来实现的。在某些情况下，还可以提供自定义用户界面元素。

任务可以包含下列类型的信息。

| 信息 | 必需 | 描述 | 示例值 |
| --- | --- | --- | --- |
| 标题 | 是 | 介绍任务的字词或短语。 | *布洛芬* |
| 日程表 | 是 | 必须完成某项任务的日程表。 | *一天四次* |
| 说明 | 否 | 详细说明、建议和警告。 | *每 4-6 小时服用 1 片（每天不超过 4 片）。* |
| 群组 ID | 否 | 用于在 App 中以合理的方式对类似任务进行分组的标识符。 | *服药*或*锻炼*等类别标识符。 |

在 CareKit 2.0 中，CareKit 用户界面定义了五种样式的任务视图：简单、说明、日志、核对清单和网格。每种样式都旨在支持特定的用例。

**使用简单样式完成单步任务**。默认的简单样式视图由包含标题、副标题和按钮的标头区域组成。你可以提供标题和副标题，并且还可以提供自定义图像以在任务完成时显示在按钮中。如果不提供图像，CareKit 会通过填充按钮并显示勾号来显示任务已完成。由于默认的简单样式视图不包括内容堆叠，因此如果需要显示附加内容，可考虑使用其他任务样式。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-simple-task@2x.png)

**使用说明样式以满足向简单任务添加信息文本的需要**。例如，如果单步服药任务需要包括附加信息（例如“空腹服用”或“睡前服用”），可以使用说明样式任务来显示该信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-instructions-task@2x.png)

**使用日志样式来帮助用户记录事件**。例如，可以使用此任务样式显示一个按钮，当用户感到恶心时可以轻点该按钮。日志样式任务可以在患者每次记录事件时自动显示时间戳。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-log-task@2x.png)

**使用核对清单样式显示多步骤任务中的操作或步骤列表**。例如，如果用户每天必须服用三次药物，你可以在核对清单中显示这三次设定时间。每个核对清单项可以包含一个文本描述和一个按钮，用户可以轻点该按钮将项目标记为已完成。默认情况下，核对清单任务还可以在列表下方显示说明性文本。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-checklist-task@2x.png)

**使用网格样式在多步骤任务中显示按钮网格**。与核对清单样式一样，网格样式也支持多步骤任务，但它以更紧凑的排列方式显示各个步骤。你可以为每个按钮提供简洁的标题（如果需要为每个按钮提供更多描述，不妨改用核对清单样式）。默认情况下，网格样式任务还可以在按钮网格下方显示说明性文本。与其他任务样式不同，网格样式允许你访问其底层集合视图，这意味着可以在网格布局中显示自定义用户界面元素。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-grid-task@2x.png)

**考虑使用颜色来强化任务项的含义**。颜色可以是帮助用户一目了然地了解信息的绝佳方式。例如，可以使用一种颜色表示药物，另一种颜色表示体育活动。始终避免将颜色用作传达信息的唯一方式。有关指南，请参阅[颜色](color.md)。

**描述任务及其步骤时将准确性与简单性相结合**。例如，使用药物的市场名称而不是其化学名称。此外，当某项任务的上下文有助于阐明含义时，尽量减少所使用的字词数。例如，日常服药任务通常会告知用户何时服用特定药物，因此可能没有必要重复*服用*等字词。

**考虑使用视频或图像对多步骤或复杂任务进行补充**。直观地演示如何执行任务可以帮助用户避免错误。

### 图表

图表视图可以让你以图形方式显示数据和趋势，以帮助用户直观地看到护理计划的进度。CareKit 图表视图可以显示当前和历史数据，并使用新数据自动更新。

在 CareKit 2.0 中，CareKit 用户界面提供三种图表样式：条形图、散点图和折线图。对于每种样式，你需要提供描述性标题和副标题，提供轴标记（如，星期几），并指定数据集。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-bar-chart@2x.png)
*条形图*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-scatter-chart@2x.png)
*散点图*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-line-chart@2x.png)
*折线图*

**考虑高亮标记叙述和趋势，以展示进展情况**。例如，你的 App 可以展示一个条形图，以显示用户服药次数与其疼痛程度之间的相关性。显示此类数据可以鼓励用户更好地遵守护理计划。

**清晰而简洁地标注图表元素**。冗长、详细的标签会使图表难以阅读和理解。保持标签简短，避免重复相同的信息。例如，心率图可能在轴标签中使用术语*次/分*，而不是在每个数据点的标签中使用该术语。

**使用不同的颜色**。一般而言，避免使用同一种颜色的不同色调来指代不同的东西。另外，请确保所用的颜色具有足够的对比度。相关指南，请参阅[无障碍](accessibility.md)。

**考虑提供图例以增加清晰度**。如果你用来表示不同类型数据的颜色并非一目了然，可加入清晰简洁地描述这些颜色的图例。

**明确指示时间单位**。用户需要及时了解基于时间的数据是以秒、分钟、小时、天、周、月还是年表示的。如果你不想将此类信息包含在单个数据值标签中，请将其包含在轴标签中或图表上的其他位置。

**合并大型数据集，以提高可读性**。大量数据可能会缩小单个数据点的大小并显示过多可见信息，从而使图表不可读。寻找方法来分组和整理数据，以实现清晰性和简单性。

**如有必要，偏移数据以使图表保持协调**。在包含非常大的数据点的图表中，非常小的数据点很容易丢失或变得不可读。如果数据点之间的差异很大，请找到偏移或重组数据的方法，以确保所有数据点均可读。

有关开发者指南，请参阅 [CareKit > Chart Interfaces](https://carekit-apple.github.io/CareKit/documentation/carekit/chart-interfaces)。若要了解 ResearchKit 图表，请参阅 [ResearchKit GitHub 项目](https://github.com/ResearchKit/ResearchKit)。

### 联系人视图

护理计划通常包括医护团队和其他可以帮助患者遵守计划的受信任个人。CareKit 用户界面定义了联系人视图，你可以用来帮助患者与其护理计划中的人员进行交流。

在 CareKit 2.0 中，CareKit 用户界面提供了两种样式的联系人视图：简单和详细。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-simple-contact@2x.png)
*简单*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/carekit-detailed-contact@2x.png)
*详细*

**考虑使用颜色对医护团队成员进行分类**。颜色可以帮助用户一目了然地识别医护团队成员。

## 通知

通知可以告知用户何时该服用药物或完成一项任务，并且标记 App 图标可以显示有来自看护者的未读消息。Apple Watch 也可以显示来自 App 的通知；有关指南，请参阅[通知](notifications.md)。

**尽量减少通知**。不同患者的护理计划会有所不同。虽然某个人可能只有几项日常任务需要完成，但另一个人可能有很多任务需要完成。谨慎使用通知，以免用户感到不知所措。如有可能，可考虑将多个项目合并为一条通知。

**考虑提供详细信息视图**。除提供更多信息之外，通知详细信息视图还可以帮助用户立即采取行动，而无需离开当前上下文来打开你的 App。例如，你可以使用通知详细信息视图来显示待处理任务的列表，以便用户可以快速将其标记为已完成。

## 符号和品牌

CareKit 使用各种内建符号来帮助用户了解其可在护理类 App 中执行的操作。例如，CareKit 可以在联系人视图中显示电话、消息和信封符号，在日志样式任务视图中显示时钟符号。

虽然可以自定义默认符号，但大多数视图样式最好与 CareKit 提供的符号搭配使用。例外情况是高度可自定义的网格样式任务视图，它可以在网格布局中显示自定义用户界面。

在网格视图中，你可能希望显示与 App 中独特内容和体验相关的自定义符号。你可以使用符号来指示任务的分组；例如，用药片来表示服药任务，用一个人走路来代表锻炼任务。在这种情况下，请考虑使用 [SF 符号](sf-symbols.md)来说明 App 中的自定义项目。

在 App 中使用 SF 符号可提供以下优势：

- 实现与 CareKit 视觉设计语言协调的设计
- 支持创建自定义符号来表示 App 中的独特内容

**设计相关的护理符号**。如果需要自定义符号，确保设计与你的 App 或一般健康概念密切相关。避免创建纯粹的装饰性符号或将公司标志用作自定义符号。

**融入精炼且不突兀的品牌宣传**。用户使用 CareKit App 来帮助其实现健康目标；他们不想看到广告。为了避免分散用户对其护理计划的注意力，可通过在 App 中使用不同的颜色和表达风格，巧妙地将品牌融入其中。

## 平台考量因素

*无针对 iOS 或 iPadOS 的额外考量因素。在 macOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[Research & Care > CareKit](https://www.researchandcare.org/carekit/)

#### 开发者文档

[CareKit](https://carekit-apple.github.io/CareKit/documentation/carekit)

[Research & Care > Developers](https://www.researchandcare.org/developers/)

[Protecting user privacy](https://developer.apple.com/cn/documentation/healthkit/protecting-user-privacy) — HealthKit

[HealthKit](https://developer.apple.com/cn/documentation/healthkit)

[ResearchKit GitHub 项目](https://github.com/ResearchKit/ResearchKit)

#### 视频

- [CareKit 有哪些更新](https://developer.apple.com/cn/videos/play/wwdc2020/10151)
- [构建研究和护理 app，第 1 部分：设置新用户引导](https://developer.apple.com/cn/videos/play/wwdc2021/10068)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 5 月 2 日 | 已将指南整合为一页。 |
