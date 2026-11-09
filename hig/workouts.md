# 体能训练

原文：https://developer.apple.com/cn/design/human-interface-guidelines/workouts

出色的体能训练或健身体验可激励用户专注于当前的健身活动并协助其在设备上跟踪自己的进度。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-workouts-intro@2x.png)

用户会在各类体能训练期间佩戴着 Apple Watch，并可能在步行、轮椅推动训练和跑步等健身活动期间携带 iPhone 或 iPad。对比之下，当用户独自或跟他人一起参与实时或录制的体能训练时，往往会使用更大或更为固定的设备，例如 iPad Pro、Mac 和 Apple TV。

你可以打造 Apple Watch、iPhone 或 iPad 专属体能训练体验，利用设备的活动数据并通过用户熟悉的组件来显示健身指标，从而帮助用户达成目标。

## 最佳实践

**在 watchOS 健身 App 中，使用体能训练会话提供有用的数据和相关控制**。在健身 App 中进行活跃体能训练会话期间，watchOS 会在每次抬腕间隔期间持续显示该 App，因此提供用户可能最为关心的体能训练数据十分重要。例如，你可以显示耗时或剩余时间、消耗的热量或者行进距离，并提供圈数或间歇标记等相关控制。

**避免显示无关信息来分散用户体能训练期间的注意力**。例如，用户在体能训练时无需查看你提供的体能训练列表或者访问 App 的其他部分。以下是包括“体能训练”在内的很多 watchOS 体能训练 App 使用的布局方式：

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/workouts-large-buttons@2x.png)
*最左侧屏幕显示的大按钮控制进行中的会话，例如“结束”、“继续”和“新训练”。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/workouts-metrics@2x.png)
*相关指标和其他数据显示在用户可一目了然的专用屏幕上。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/workouts-media-playback@2x.png)
*如果支持，媒体播放控制显示在最右侧屏幕上。*

**使用显眼的视觉外观指示活跃的体能训练**。在体能训练期间，用户期望能一眼识别活跃的会话。使用指标页面来显示会话处于活跃状态是一种不错的选择，因为各种数值会实时更新。除了显示更新的数值外，你可以使用独特的布局来进一步提高指标屏幕的辨识度。

**提供可轻松查找和轻点的体能训练控制**。除了能让用户轻松暂停、继续和停止体能训练外，请务必提供能够清楚指示会话何时开始或结束的反馈。

**如果传感器数据在体能训练期间不可用，帮助用户理解你的 App 记录的健康信息**。例如，入水后可能无法测量心率，但你的 App 仍可记录用户的游泳距离和消耗的热量等数据。如果你的 App 支持“*游泳*”或“*其他*”体能训练类型，可以采用与系统提供的“体能训练” App 中所用的类似语言来解释这种情况，如下所示：

|  | “体能训练” App 中的示例文本 |  |  |
| --- | --- | --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 泳池游泳时不会使用 GPS，且入水后可能无法测量心率，但 Apple Watch 仍将使用内建加速计跟踪你的燃脂信息、趟数和距离。 |  |  |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 此类健身训练的燃脂量相当于传感器读数不可用时，一次快步走消耗的卡路里。 |  |  |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 自由泳时，GPS 将仅提供距离信息。入水后可能无法测量心率，但仍将使用内建加速计跟踪你的燃脂信息。 |  |  |

**会话结束时提供摘要**。摘要屏幕可确认体能训练已经结束并显示记录的信息。考虑包括健身圆环来增强摘要，以便用户轻松查看当前进度。

**丢弃极为短暂的体能训练会话**。如果会话在开始后的几秒钟内结束，要么自动丢弃该数据，要么询问用户是否要将该数据记录为体能训练。

**确保文字在用户运动时清晰易读**。当会话需要用户运动时，请使用较大字体、采用高对比度颜色并排列文本，以便最重要的信息轻松可读。

**正确使用健身圆环**。健身圆环视图是 Apple 设计的一项元素，具有一个或多个圆环，圆环的颜色和含义与“健身记录” App 中的各项活动对应。仅将这些圆环用于文档所述的用途。

## 平台考量因素

*无针对 iOS、iPadOS 或 watchOS 的额外考量因素。在 macOS、Apple tvOS 或 visionOS 中不受支持。*

## 资源

#### 相关内容

[健身圆环](activity-rings.md)

#### 开发者文档

[WorkoutKit](https://developer.apple.com/cn/documentation/workoutkit)

[Workouts and activity rings](https://developer.apple.com/cn/documentation/healthkit/workouts-and-activity-rings) — HealthKit

#### 视频

- [使用 iOS 和 iPadOS 上的 HealthKit 跟踪体能训练](https://developer.apple.com/cn/videos/play/wwdc2025/322)
- [使用 WorkoutKit 构建自定义训练](https://developer.apple.com/cn/videos/play/wwdc2023/10016)
- [为 Apple Watch 构建体能训练 app](https://developer.apple.com/cn/videos/play/wwdc2021/10009)
