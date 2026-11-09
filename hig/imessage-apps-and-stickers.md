# iMessage 信息 App 和贴纸

原文：https://developer.apple.com/cn/design/human-interface-guidelines/imessage-apps-and-stickers

iMessage 信息 App 可以帮助用户在对话中共享内容、协作，甚至与其他人玩游戏；贴纸是用户可以用于装饰对话的图像。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-iMessage-Apps-intro@2x.png)

iMessage 信息 App 或贴纸包可以在“信息”对话的上下文中使用，也可以在“信息”和 FaceTime 通话的效果中使用。iMessage 信息 App 或贴纸包可以作为独立的 App 创建，也可以作为 iOS 或 iPadOS App 内的 App 扩展创建。有关开发者指南，请参阅 [Messages](https://developer.apple.com/cn/documentation/messages) 和 [Adding Sticker packs and iMessage apps to the system Stickers app, Messages camera, and FaceTime](https://developer.apple.com/cn/documentation/messages/adding-sticker-packs-and-imessage-apps-to-the-system-stickers-app-messages-camera-and-facetime)。

## 最佳实践

**优先在 iMessage 信息 App 中提供一种主要体验**。选择你的 App 时用户处于对话流程中，因此你的功能或内容必须易于理解且立即可用。如果想要提供多种类型的功能或不同的内容集合，可以考虑针对每种功能或内容创建单独的 iMessage 信息 App。

**考虑在你的 iOS 或 iPadOS App 中展示的内容**。例如，iMessage 信息 App 可以提供用户可能想要共享的 App 特定信息（如购物清单或行程安排），也可以支持简单的协作型任务（如决定去哪里用餐或观看什么电影）。

**在紧凑视图中呈现基本功能**。用户可以在信息记录下方显示的紧凑视图中体验你的 iMessage 信息 App，也可以扩展该视图以占据大部分窗口。确保在紧凑视图中提供最常使用的项目，而将附加内容和功能保留在扩展视图中。

**通常仅允许用户在扩展视图中编辑文本**。紧凑视图占据的空间与键盘大致相同。为了确保 iMessage 信息 App 的内容在用户编辑时保持可见，请在扩展视图中显示键盘。

**创建富有表现力、包容性和通用性的贴纸**。无论贴纸是丰富的静态图像还是简短动画，都请确保每张贴纸在各种背景下以及在旋转或缩放时保持清晰可辨。此外，你还可以借助透明度来帮助用户从视觉上将贴纸与文本、照片和其他贴纸融为一体。

**提供每张贴纸的本地化备选描述**。借助“旁白”，用户可通过说出贴纸的备选描述来使用你的贴纸包。

## 规范

### 图标大小

iMessage 信息 App 或贴纸包的图标可以显示在“信息”、App Store、通知和“设置”中。用户安装你的 iMessage 信息 App 或贴纸包之后，其图标还会显示在“信息” App 的 App 抽屉中。

请为你提供的每个扩展提供一个方角图标，系统会自动应用设定圆角的遮罩。

为了确保你的图标在任何环境中以及各种设备上都良好呈现，请创建以下大小的方角图标：

| 用途 | @2x（像素） | @3x（像素） |
| --- | --- | --- |
| 信息、通知 | 148x110 |  |
|  | 143x100 |  |
|  | 120x90 | 180x135 |
|  | 64x48 | 96x72 |
|  | 54x40 | 81x60 |
| 设置 | 58x58 | 87x87 |
| App Store | 1024x1024 | 1024x1024 |

### 贴纸大小

“信息”支持小号、常规和大号贴纸。选择最适合内容的大小，并准备好该大小的所有贴纸；单个贴纸包内勿包含多种大小。“信息”在网格中显示贴纸，其中贴纸根据不同的大小以不同的方式整理。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sticker-sizes-small@2x.png)
*小号*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sticker-sizes-regular@2x.png)
*常规*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/sticker-sizes-large@2x.png)
*大号*

根据所选贴纸大小，创建以下 @3x 尺寸的贴纸图像。如有必要，系统会在运行时通过缩小图像尺寸来生成 @2x 和 @1x 版本。有关开发者指南，请参阅 [MSStickerSize](https://developer.apple.com/cn/documentation/messages/msstickersize)。

| 贴纸大小 | @3x 尺寸（像素） |
| --- | --- |
| 小号 | 300x300 |
| 常规 | 408x408 |
| 大号 | 618x618 |

贴纸文件大小必须小于等于 500 KB。对于每种支持的格式，下表提供了有关使用透明度和动画的指南。

| 格式 | 透明 | 动画 |
| --- | --- | --- |
| PNG | 8位 | 否 |
| APNG | 8位 | 是 |
| GIF | 单色 | 是 |
| JPEG | 否 | 否 |

## 平台考量因素

*无针对 iOS 或 iPadOS 的额外考量因素。在 macOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[iMessage Apps and Stickers](https://developer.apple.com/imessage/)

#### 开发者文档

[Messages](https://developer.apple.com/cn/documentation/messages)

[Adding Sticker packs and iMessage apps to the system Stickers app, Messages camera, and FaceTime](https://developer.apple.com/cn/documentation/messages/adding-sticker-packs-and-imessage-apps-to-the-system-stickers-app-messages-camera-and-facetime) — Messages

#### 视频

- [表达自我！](https://developer.apple.com/cn/videos/play/wwdc2017/820)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 5 月 2 日 | 已将指南整合为一页。 |
