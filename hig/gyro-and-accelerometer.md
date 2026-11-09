# 陀螺仪和加速计

原文：https://developer.apple.com/cn/design/human-interface-guidelines/gyro-and-accelerometer

设备上的陀螺仪和加速计可提供设备在物理世界中运动的相关数据。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/inputs-gyroscope-intro@2x.png)

你可以使用加速计和陀螺仪数据，在 iOS、iPadOS 和 watchOS 上运行的 App 和游戏中提供以基于运动的实时信息为基础的体验。Apple tvOS App 可使用来自 Apple TV Remote 的陀螺仪数据。有关开发者指南，请参阅 [Core Motion](https://developer.apple.com/cn/documentation/coremotion)。

## 最佳实践

**将运动数据仅用于让用户切实受益之处**。例如，健身 App 可能会将数据用于提供与用户活动和整体健康相关的反馈，而游戏可能会将数据用于增强可玩性。避免纯粹为了拥有数据而收集数据。

> **重要信息**
>
> 如果你所打造的体验需要访问设备上的运动数据，必须提供解释访问缘由的内容。当你的 App 或游戏首次尝试访问此类数据时，系统会将该内容包括在许可请求中，用户可在此接受或拒绝访问。

**除了进行游戏外，避免将加速计或陀螺仪用于直接操纵界面**。某些基于运动的手势可能难以准确模仿，对部分用户而言可能是身体上的挑战，还可能会影响电池用量。

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS、visionOS 或 watchOS 的额外考量因素。*

## 资源

#### 相关内容

[反馈](feedback.md)

#### 开发者文档

[Getting processed device-motion data](https://developer.apple.com/cn/documentation/coremotion/getting-processed-device-motion-data) — Core Motion

#### 视频

- [通过运动衡量健康状态](https://developer.apple.com/cn/videos/play/wwdc2021/10287)
