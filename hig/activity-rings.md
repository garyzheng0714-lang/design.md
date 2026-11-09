# 健身圆环

原文：https://developer.apple.com/cn/design/human-interface-guidelines/activity-rings

健身圆环显示个人在“活动”、“锻炼”和“站立”目标方面的每日进展。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-activity-ring-intro@2x.png)

在 watchOS 中，健身圆环元素始终包含三个圆环，其颜色和含义与“健身记录” App 中提供的相符。在 iOS 中，健身圆环元素包含代表活动近似值的单个“活动”圆环；如果已与 Apple Watch 配对，则会包含所有三个圆环。

## 最佳实践

**在与 App 用途相关时显示健身圆环**。如果你的 App 与健康或健身相关，尤其是它向 HealthKit 提供信息时，用户一般期望在你的界面中找到健身圆环。例如，如果你围绕健身圆环的闭合构建体能训练或健康会话，请考虑在体能训练指标屏幕上显示该元素，以便用户可以在会话期间跟踪自己的进度。同样，如果提供一个在体能训练结束时出现的摘要屏幕，你可以显示健身圆环以帮助用户检查其在达成每日目标方面的进度。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/activity-rings-summary@2x.png)

**仅使用健身圆环显示“活动”、“锻炼”和“站立”信息**。健身圆环专为持续表现这些特定领域的进度而设计。请勿出于其他目的复制或修改健身圆环。绝不要使用健身圆环显示其他类型的数据，绝不要在其他类圆环元素中显示“活动”、“锻炼”和“站立”进度。

**使用健身圆环显示一个人的进度**。绝不要使用健身圆环表现多个人的数据，并确保使用标签、照片或头像来清楚显示该进度属于谁。

**无论健身圆环在何处显示，始终保持其视觉外观的一致性**。遵循以下指南来提供一致的使用体验：

- 切勿更改圆环的颜色；例如，不使用滤镜或修改不透明度。
- 始终在黑色背景上显示健身圆环。
- 优先将圆环和背景放在圆圈内。为此，请调整封闭视图的圆角半径，而不是应用圆形遮罩。
- 确保黑色背景在最外圈圆环的周围保持可见。如有必要，沿着圆环外边缘添加一条黑色的细线，并避免加入渐变、阴影或任何其他视觉效果。
- 始终适当缩放圆环，以免它们看起来脱节或错位。
- 需要时，将周围的界面设计成与圆环融为一体；切勿改变圆环以使其与周围的界面融为一体。

**若要显示与健身圆环有直接关联的标签或值，请使用对应的颜色**。若要显示圆环特定的标签（*活动*、*锻炼*和*站立*）或显示用户各圆环的当前值和目标值，请使用下列以 RGB 值指定的颜色。

| 活动 | 锻炼 | 站立 |
| --- | --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/activity-rings-color-swatch-red@2x.png) | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/activity-rings-color-swatch-green@2x.png) | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/activity-rings-color-swatch-blue@2x.png) |

**保持健身圆环外边距**。健身圆环元素的最小外边距必须不小于各圆环的间距。绝不要让其他元素裁剪、遮挡或侵占此边距或圆环本身。

**区分健身圆环与其他类圆环元素**。混合使用不同的圆环样式可能会让界面在视觉上产生混乱效果。如果必须包括其他圆环元素，请使用内边距、线条或标签将其与健身圆环分开。颜色和比例也有助于提供视觉分离效果。

**发送的通知不要重复“健身记录” App 发送的相同信息**。系统已经提供了“活动”、“锻炼”和“站立”进度的更新，因此用户从你的 App 收到多余的信息时会感到困惑。另外，不要在 App 的通知中显示健身圆环元素。你可以在通知中引用“健身记录”进度，但请以独特于你 App 的方式呈现，而不是复制系统提供的相同信息。

**不要将健身圆环用于装饰**。健身圆环用于向用户提供信息，而不仅仅是美化 App 设计。绝不要在标签或背景图形中显示健身圆环。

**不要将健身圆环用于品牌宣传**。在 App 中严格将健身圆环用于显示“健身记录”进度。绝不要在 App 图标或营销材料中使用健身圆环。

## 平台考量因素

*无针对 iPadOS 或 watchOS 的额外考量因素。在 macOS、Apple tvOS 或 visionOS 中不受支持。*

### iOS

健身圆环通过 [HKActivityRingView](https://developer.apple.com/cn/documentation/healthkitui/hkactivityringview) 在 iOS 中可用。健身圆环元素的外观根据是否配对了 Apple Watch 而自动更改：

- 与 Apple Watch 配对时，iOS 显示全部三个健身圆环。
- 未与 Apple Watch 配对时，iOS 仅显示“活动”圆环，它代表一个人的活动近似值，该数值根据此人在其他 App 中的步数和体能训练信息而得出。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/activity-rings-watch-paired@2x.png)
*已与 Apple Watch 配对*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/activity-rings-no-watch-paired@2x.png)
*未与 Apple Watch 配对*

无论是否与 Apple Watch 配对，iOS 都会显示健身圆环，因此活动历史可以包括两种样式的组合。例如，“健身”中的健身圆环在用户配对 Apple Watch 锻炼时会显示三个圆环，而在不使用 Apple Watch 锻炼时只显示“活动”圆环。

## 资源

#### 相关内容

[体能训练](workouts.md)

#### 开发者文档

[HKActivityRingView](https://developer.apple.com/cn/documentation/healthkitui/hkactivityringview) — HealthKit

#### 视频

- [使用 iOS 和 iPadOS 上的 HealthKit 跟踪体能训练](https://developer.apple.com/cn/videos/play/wwdc2025/322)
- [为 Apple Watch 构建体能训练 app](https://developer.apple.com/cn/videos/play/wwdc2021/10009)
- [使用 WorkoutKit 构建自定义训练](https://developer.apple.com/cn/videos/play/wwdc2023/10016)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 3 月 29 日 | 完善了显示健身圆环的指南，以及列出了显示相关内容的特定颜色。 |
| 2023 年 12 月 5 日 | 新增了表示 iOS 中健身圆环的插图。 |
