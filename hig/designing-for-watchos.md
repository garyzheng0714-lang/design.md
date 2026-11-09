# 针对 watchOS 设计

原文：https://developer.apple.com/cn/design/human-interface-guidelines/designing-for-watchos

无论处于静止还是运动状态，用户看一眼 Apple Watch 就知道自己能够访问基本信息和执行简单的即时任务。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/platforms-watchOS-intro@2x.png)

当你着手为 Apple Watch 设计 App 时，首先要了解以下区分 watchOS 使用体验的基本设备特征和模式。利用这些特征和模式来指导你的设计决策，可以帮助你制作出 Apple Watch 用户喜爱的 App。

**显示屏**。Apple Watch 的小屏幕将易于阅读且高分辨率的使用体验置于腕上的方寸之间。

**人体工程学**。由于 Apple Watch 佩戴在手上，用户抬腕查看并使用另一只手与设备交互时，与显示屏的距离通常不超过 30 厘米（1 英尺）。另外，全天候显示屏可让用户在放下手腕时查看表盘上的信息。

**输入**。用户可以旋转[数码表冠](digital-crown.md)来垂直导航或检查数据，数码表冠可在表盘、主屏幕以及 App 中提供一致的控制。即使在运动中，他们也可以通过轻点、轻扫和拖移等标准[手势](gestures.md)来提供输入。按下[操作按钮](action-button.md)可让用户在不看屏幕的情况下发起基本操作，使用[快捷指令](siri.md#Shortcuts-and-suggestions)可帮助用户快速轻松执行日常任务。用户还可以利用设备功能提供的数据，如 GPS、血氧和心脏功能传感器、高度计、加速计和陀螺仪。

**App 交互**。用户一天中会多次查看全天候显示屏，以执行简明的 App 交互，每次交互时长不到一分钟。相比于 App 本身，用户通常会更频繁地使用 watchOS App 的相关体验，如复杂功能、通知和 Siri 交互。

**系统功能**。watchOS 提供了一些功能，帮助用户以熟悉且一致的方式与系统和 App 交互。

- [复杂功能](complications.md)
- [通知](notifications.md)
- [全天候显示](always-on.md)
- [表盘](watch-faces.md)

## 最佳实践

出色的 Apple Watch 使用体验精简且有针对性，并且整合了用户最看重的平台和设备功能。为使你的设计让 watchOS 用户感到自在，请优先考虑以下方法来整合这些特性和功能。

- 支持可快速一览的单屏交互方式，简洁明了地推送重要信息，并帮助用户通过一两个简单手势执行针对性操作。
- 尽量减少 App 导航中的层级结构深度，并使用[数码表冠](digital-crown.md)提供垂直导航，以便在屏幕间滚动或切换。
- 主动预测用户的需求，并使用设备端数据提供当前相关或即将相关的可操作内容，以使体验个性化。
- 使用[复杂功能](complications.md)直接在表盘上提供相关数据和图形（可以是动态数据和图形），让用户每次抬腕即可在表盘上进行查看，还可轻点它们以直接进入你的 App。
- 使用[通知](notifications.md)推送高价值的即时信息，并让用户无需打开 App 即可执行重要操作。
- 使用[颜色](color.md)等背景内容传达有用的支持信息，并使用[材质](materials.md)来说明层级结构和位置感。
- 将你的 App 设计为独立运行，并提供额外的详细信息和功能来丰富通知和复杂功能。

## 资源

#### 相关内容

[Apple Design Resources](https://developer.apple.com/design/resources/#watchos-apps)

#### 开发者文档

[watchOS Pathway](https://developer.apple.com/watchos/get-started/)

#### 视频

- [watchOS 26 的新功能](https://developer.apple.com/cn/videos/play/wwdc2025/334)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 6 月 5 日 | 完善的指南提供了简洁明了且有针对性的 App 使用体验，并强调了数码表冠在导航中的重要性。 |
