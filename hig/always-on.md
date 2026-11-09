# 全天候显示

原文：https://developer.apple.com/cn/design/human-interface-guidelines/always-on

在配备全天候显示屏的设备上，当用户暂停与设备的交互时，系统可以继续显示 App 界面。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-always-on-intro@2x.png)

在“全天候显示”状态下，设备可以通过调暗显示屏并尽量减少屏幕动态效果，以低功耗、保护隐私的方式继续向用户提供有用的概览信息。系统可以显示不同的项目，具体因设备而异。

- 在 iPhone 14 Pro 和 iPhone 14 Pro Max 上，当用户将设备正面朝上搁置一旁并停止与之交互时，系统会显示[小组件](widgets.md)和[实时活动](live-activities.md)和等锁屏项目。
- 如果用户在佩戴 Apple Watch 时放下手腕，系统会调暗表盘，继续显示 App 界面，只要它位于最前端或正在运行后台会话。

在这两种设备上，系统都会在“全天候显示”下显示通知，用户可以轻点显示屏退出“全天候显示”并继续交互。

## 最佳实践

**隐藏敏感信息**。编校用户不希望他人不经意间看到的个人信息，例如银行账户余额或健康数据，这一点至关重要。你还需要隐藏可能在通知中显示的个人信息；有关指南，请参阅[通知](notifications.md)。

**可行时，确保其他类型的个人信息一目了然**。例如，在 Apple Watch 上，用户通常希望在体能训练时获取配速和心率更新；在 iPhone 上，用户希望在航班抵达时获取概览更新，或者在使用拼车服务时接收车辆到达通知。如果用户不想显示任何信息，可以关闭“全天候显示”。

**确保重要内容清晰可读，使无关紧要的内容变暗**。你可以使次要文本、图像和颜色填充变得更暗，从而更加突出对用户重要的信息。例如，待办事项 App 可能会移除行背景并调暗每个项目的其他详细信息，以突出其标题。此外，如果要显示丰富的图像或大面积的颜色，可考虑移除图像并使用暗色。

**保持一致的布局**。在开始或结束使用“全天候显示”时以及在整个“全天候显示”体验中，避免进行分散用户注意力的界面更改。例如，开始使用“全天候显示”时，优先将交互式组件转换为不可用的外观，不要只是将其移除。在使用“全天候显示”的环境中，尽量对界面进行频次较低、细微的更新。例如，体育 App 可能会在“全天候显示”中暂停详细的逐场更新，仅在比分发生变化时进行更新。请注意，在“全天候显示”期间进行不必要的更改可能尤其会将用户的注意力转移到 iPhone 上，因为其通常将设备正面朝上放在平面上，即使不直视屏幕，也可以看到屏幕上的动态效果。

**将动态效果适度地过渡到静止状态，而不是立即停止**。流畅地完成当前的动态效果有助于传达过渡效果，以免让用户认为出现了问题。

## 平台考量因素

*无针对 iOS 或 watchOS 的额外考量因素。在 iPadOS、macOS、Apple tvOS 或 visionOS 中不受支持。*

## 资源

#### 相关内容

[针对 watchOS 设计](designing-for-watchos.md)

#### 开发者文档

[Designing your app for the Always On state](https://developer.apple.com/cn/documentation/watchos-apps/designing-your-app-for-the-always-on-state) — watchOS apps

#### 视频

- [watchOS 8 中的新功能](https://developer.apple.com/cn/videos/play/wwdc2021/10002)
- [为 Apple Watch 构建体能训练 app](https://developer.apple.com/cn/videos/play/wwdc2021/10009)
- [SwiftUI 中的新功能](https://developer.apple.com/cn/videos/play/wwdc2021/10018)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 9 月 12 日 | 更新了介绍图像插图。 |
| 2022 年 9 月 23 日 | 扩展了指南以涵盖 iPhone 14 Pro 和 iPhone 14 Pro Max 上的全天候显示屏。 |
