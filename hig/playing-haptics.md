# 提供触感反馈

原文：https://developer.apple.com/cn/design/human-interface-guidelines/playing-haptics

提供触感反馈可调动用户的触觉，并将对现实世界的熟悉感带入 App 或游戏中。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-playing-haptics-intro@2x.png)

基于用户使用的平台和设备，系统除了提供视觉和听觉反馈外，还会提供触感反馈。例如，在支持的 iPhone 机型上，开关、滑块和选择器等组件会自动提供触感反馈；在 Apple Watch 上，触感引擎会为一系列内建反馈模式生成触感反馈，而 watchOS 会将可听声与这些触感反馈相结合。在配备力度触控板的 Mac 上，当用户拖移内容或者用力点按以更改媒体控制的速度时，App 可提供触感反馈。

除了内建触感反馈功能，部分外部输入设备也能提供触感反馈。例如：

- 在 iPadOS、macOS、Apple tvOS 或 visionOS App 或游戏中，[游戏控制器](game-controls.md)可提供触感反馈（有关开发者指南，请参阅 [Playing Haptics on Game Controllers](https://developer.apple.com/cn/documentation/corehaptics/playing-haptics-on-game-controllers)）。
- 连接到某些 iPad 机型时，[Apple Pencil Pro](apple-pencil-and-scribble.md) 和部分触控板可提供触感反馈。（有关 Apple Pencil 功能和兼容性的详细信息，请参阅 [Apple Pencil](https://www.apple.com/apple-pencil/)。）

## 最佳实践

**根据文档所述的含义来使用系统提供的触感反馈模式**。系统会在与标准控制的交互中提供一致的触感反馈，因此用户可识别出标准触感反馈。如果文档所述的模式用例不适用于你的 App 或游戏，请避免将该模式用于表达其他含义。相反，请使用通用模式或创建自己的模式（如果支持）。有关指南，请参阅[自定义触感反馈](playing-haptics.md#Custom-haptics)。

**在整个 App 或游戏中使用一致的触感反馈**。在每个触感反馈及其来源操作之间建立清晰、具有因果关系的联系十分重要，这样用户可学会将特定触感模式与特定体验联系起来。如果触感反馈无法加强因果关系，则可能会显得毫无来由并令人困惑。例如，如果你的游戏在角色任务失败时提供特定的触感反馈模式，用户会将该模式与消极结果联系起来。如果再将同一触感反馈模式用于通关等积极结果，用户将会感到困惑。

**首选在 App 或游戏中将触感反馈用作其他反馈的补充**。当视觉、听觉和触觉反馈像在现实世界中般协调时，用户体验会更连贯，并且感觉更自然。例如，通常会让触感反馈与其搭配的动画在强度和锐度上相匹配。你还可以将声音与触感反馈同步；有关开发者指南，请参阅 [Delivering Rich App Experiences with Haptics](https://developer.apple.com/cn/documentation/corehaptics/delivering-rich-app-experiences-with-haptics)。

**避免滥用触感反馈**。有时，偶尔出现的触感反馈会使人感觉恰到好处，但频繁出现就会变得令人厌倦。进行用户测试可以帮助你探索出最受用户青睐的平衡。最佳的触感反馈体验通常可能不会被用户注意到，但在关闭后他们会不习惯。

**在大多数 App 中，首选提供与离散事件互补的短暂触感反馈**。虽然伴随游戏流程的持续触感反馈可增强用户体验，但 App 中的持续触感反馈可能会淡化反馈的意义并分散用户对任务的注意力。例如在 Apple Pencil Pro 上，连续或长时间持续的触感反馈不容易区分书写或涂鸦体验，甚至可能会让手握体验变糟。

**将触感反馈设为可选**。允许用户关闭或静音触感反馈，并确保在无触感反馈的情况下，用户仍可享受你的 App 或游戏。

**注意提供触感反馈可能会影响其他用户体验**。触感反馈设计为可产生足以让用户感受振动的作用力。确保触感反馈振动不会干扰涉及相机、陀螺仪或麦克风等设备功能的使用体验。

## 自定义触感反馈

游戏通常使用自定义触感反馈来增强可玩性。虽然不常见，但非游戏 App 也可能使用自定义触感反馈来提供更丰富轻松的体验。

你可以基于用户输入或环境，设计动态变化的自定义触感反馈。例如，玩家在游戏角色从树上跳跃时获得的冲击感可以比角色原地跳跃时更强烈，大动作的体验（如碰撞或击打）也可与微妙的体验（如脚步靠近或危险逼近）截然不同。

以下是可用于生成自定义触感反馈模式的两种基础构建块。

- *瞬态*事件是简短紧凑的，通常感觉像轻敲或脉冲。在主屏幕上轻点“手电筒”按钮的体验就是一个瞬态事件的示例。
- *持续*事件感觉像持续振动，例如在信息中的镭射光线效果体验。

无论将哪类触感反馈事件用于生成自定义触感反馈，你都可以控制其*锐度*和*强度*。你可以把锐度当作是将触感反馈体验抽象为可形成相应身体感觉的波形的方式。指定锐度可让你将体验的意图传达给系统。例如，你可能会使用锐度值来传递柔软、圆润或自然感的体验，或者是清脆、精细或机械感的体验。如字面意思而言，强度意味着触感反馈的力度。

通过结合瞬态事件和持续事件、更改锐度和强度以及包括可选音频内容，你可以创造各式各样的不同触感反馈体验。有关开发者指南，请参阅 [Core Haptics](https://developer.apple.com/cn/documentation/corehaptics)。

## 平台考量因素

### iOS

在支持的 iPhone 机型上，你可以使用以下方法来为你所打造的体验添加触感反馈：

- 使用默认提供由 Apple 设计的系统触感反馈的标准用户界面组件，如[切换](https://developer.apple.com/cn/design/human-interface-guidelines/toggles)、[滑块](https://developer.apple.com/cn/design/human-interface-guidelines/sliders)和[选择器](https://developer.apple.com/cn/design/human-interface-guidelines/pickers)。
- 适用时，使用反馈生成器提供[通知](https://developer.apple.com/cn/design/human-interface-guidelines/playing-haptics#Notification)、[冲击](https://developer.apple.com/cn/design/human-interface-guidelines/playing-haptics#Impact)和[选择](https://developer.apple.com/cn/design/human-interface-guidelines/playing-haptics#Selection)类别中的其中一种预定义触感反馈模式（有关开发者指南，请参阅 [UIFeedbackGenerator](https://developer.apple.com/cn/documentation/uikit/uifeedbackgenerator)）。

#### 通知

通知触感反馈提供与任务或操作结果相关的反馈，例如存入支票或解锁车辆。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/success.mp4)
***成功**。表示任务或操作已经完成。*

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/warning.mp4)
***警告**。表示任务或操作产生了某类警告。*

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/error.mp4)
***错误**。表示发生了错误。*

#### 冲击

冲击触感反馈提供实感象征，可作为视觉体验的补充。例如，用户可能会在视图卡入到位时感受到轻敲，或者在两个重物相碰撞时感受到砰击。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/impact-light.mp4)
***轻型**。表示尺寸较小或轻型用户界面对象之间的碰撞。*

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/impact-medium.mp4)
***中型**。表示中等尺寸或中型用户界面对象之间的碰撞。*

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/impact-heavy.mp4)
***重型**。表示尺寸较大或重型用户界面对象之间的碰撞。*

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/impact-rigid.mp4)
***刚硬**。表示坚硬或非弹性用户界面对象之间的碰撞。*

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/impact-soft.mp4)
***柔软**。表示柔软或弹性用户界面对象之间的碰撞。*

#### 选择

选择触感反馈在用户界面元素的值正在变化时提供反馈。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/retarget.mp4)
***选择**。表示用户界面元素的值发生更改。*

### macOS

妙控板可用时，你的 App 可以提供以下三种触感反馈模式中的其中一种来响应拖移操作或用力点按。

| 触感反馈模式 | 描述 |
| --- | --- |
| 对齐 | 指示拖移项目的对齐状态。例如，此模式可能会用于绘图 App 中，在用户将形状拖移至与其他形状对齐时使用。此类反馈还可用于其他场景，可能包括：缩放对象以适合特定的尺寸，将对象放置到想要的位置，或者触及某个项目（例如视频 App 中滑动条）的起点/终点、最大范围/最小范围。 |
| 水平变化 | 指示不连续压力水平之间的活动。例如，当用户按下视频播放器上的快进按钮后，播放速度可能会加快或减慢，并根据达到的不同压力水平提供触感反馈。 |
| 通用 | 旨在当其他模式均不适用时提供通用反馈。 |

有关开发者指南，请参阅 [NSHapticFeedbackPerformer](https://developer.apple.com/cn/documentation/appkit/nshapticfeedbackperformer)。

### watchOS

Apple Watch Series 4 及后续机型在数码表冠上提供了触感反馈，为用户滚动浏览内容带来更多触觉体验。系统默认提供线性触感反馈定位，用户在旋转数码表冠时能感受到。某些系统控制（例如表格视图）会在新项目滚动到屏幕上时提供定位。有关开发者指南，请参阅 [WKHapticType](https://developer.apple.com/cn/documentation/watchkit/wkhaptictype)。

watchOS 定义了以下这组触感反馈，其中每种都向用户传递了特有的含义。

**通知**

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/haptics-notification.mp4)

**通知**。告知用户有重要或异常事件发生，需要引起注意。当本机或远程通知到达时，系统会提供此触感反馈。

**上升**

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/haptics-levelup.mp4)

**上升**。告知用户重要值已升至关键阈值以上。

**下降**

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/haptics-leveldown.mp4)

**下降**。告知用户重要值已降至关键阈值以下。

**成功**

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/haptics-success.mp4)

**成功**。告知用户操作成功完成。

**失败**

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/haptics-failure.mp4)

**失败**。告知用户操作失败。

**重试**

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/haptics-retry.mp4)

**重试**。告知用户操作失败，但可以重试。

**开始**

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/haptics-start.mp4)

**开始**。告知用户活动已开始。在开始计时或用户可明确开始和停止的任何其他活动时，使用此触感反馈。此触感反馈后通常紧跟停止触感反馈。

**停止**

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/haptics-stop.mp4)

**停止**。告知用户活动已停止。在停止计时或用户之前已开始的其他活动时，使用此触感反馈。

**点击**

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/haptics-click.mp4)

**点击**。提供拨号盘点击感，帮助你按预定义增量或区间传达进度。滥用点击触感反馈往往会减弱其实用性，在点击相互重叠时还会令人困惑。

## 资源

#### 相关内容

[反馈](feedback.md)

[手势](gestures.md)

#### 开发者文档

[Core Haptics](https://developer.apple.com/cn/documentation/corehaptics)

#### 视频

- [实践音频触感设计](https://developer.apple.com/cn/videos/play/wwdc2021/10278)
- [Core Haptics 简介](https://developer.apple.com/cn/videos/play/wwdc2019/520)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 5 月 7 日 | 新增了在 Apple Pencil Pro 上提供触感反馈的指南。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
