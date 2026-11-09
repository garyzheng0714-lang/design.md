# NFC

原文：https://developer.apple.com/cn/design/human-interface-guidelines/nfc

近场通信 (NFC) 允许彼此相距几厘米的设备以无线方式交换信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-nfc-intro@2x.png)

在受支持设备上运行的 iOS App 可以使用 NFC 扫描来读取真实世界物品上所附电子标签中的数据。例如，用户可以扫描玩具将它与电子游戏连接，购物者可以扫描商店内的标志来获取优惠券，零售店店员可以扫描产品来跟踪库存。

## App 内标签读取

App 处于活跃状态时可支持单个或多个物品扫描，并可在用户即将扫描某物时显示扫描表单。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/nfc-ready-to-scan@2x.png)

**不要鼓励用户接触实际物品**。若要扫描标签，iOS 设备必须（也只需）靠近标签，而不需要实际接触标签。要求用户扫描物品时，请使用*扫描*和*靠近*等术语，而不是*轻触*和*触碰*。

**使用易于理解的术语**。近场通信可能对一些用户来说比较陌生。为了使其易于理解，请避免指代 *NFC*、*Core NFC*、*近场通信*和*标签*等面向开发人员的技术术语，而是使用大多数用户都能理解的对话式友好术语。

| 使用 | 不使用 |
| --- | --- |
| 扫描[*物品名称*]。 | 扫描 NFC 标签。 |
| 将 iPhone 靠近[*物品名称*]以了解更多信息。 | 若要使用 NFC 扫描，请将手机轻触[*物品*]。 |

**为扫描表单提供简洁的说明性文本**。提供句首字母大写并带有结尾标点符号的完整句子。识别要扫描的物品，并适当修改文本以进行后续扫描。保持文本简短以避免被截断。

| 首次扫描 | 后续扫描 |
| --- | --- |
| 将 iPhone 靠近[*物品名称*]以了解更多信息。 | 现在将 iPhone 靠近另一个[*物品名称*]。 |

## 后台标签读取

后台标签读取允许用户随时快速扫描标签，而无需先打开 App 再启动扫描。在支持后台标签读取的设备上，只要屏幕点亮，系统就会自动查找附近的兼容标签。在检测到标签并将其与 App 匹配后，系统会显示一条通知，告知用户可以轻点以将标签数据发送到 App 进行处理。请注意，在以下情况下后台读取不可用：NFC 扫描表单可见、“钱包”或 Apple Pay 正在使用、相机正在使用、设备处于飞行模式以及设备重新启动后处于锁定状态。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/nfc-background@2x.png)

**同时支持后台标签读取和 App 内标签读取**。对于使用不支持后台标签读取的设备的用户，你的 App 必须仍提供 App 内扫描标签的方式。

## 平台考量因素

*无针对 iOS 或 iPadOS 的额外考量因素。在 macOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 开发者文档

[Core NFC](https://developer.apple.com/cn/documentation/corenfc)
