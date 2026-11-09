# 主屏幕快速操作

原文：https://developer.apple.com/cn/design/human-interface-guidelines/home-screen-quick-actions

主屏幕快速操作让用户可从主屏幕执行 App 特定的操作。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-home-screen-quick-actions-intro@2x.png)

用户可在按住 App 图标时查看可用快速操作的菜单（在支持三维触控的设备上，用户可用力按下图标以查看该菜单）。例如，“邮件”包括打开收件箱或 VIP 邮箱、发起搜索以及创建新邮件的快速操作。除了 App 特定操作，主屏幕快速操作菜单还列出了用于移除 App 和编辑主屏幕的选项。

每个主屏幕快速操作都包括标题、左侧或右侧（取决于 App 在主屏幕上的位置）的界面图标以及可选副标题。标题和副标题在从左到右的语言中始终为左对齐。你的 App 甚至可在有新信息可用时动态更新其快速操作。例如，“信息”提供了用于打开最近对话的快速操作。

## 最佳实践

**为有吸引力的高价值任务创建快速操作**。例如，“地图”可让用户无需先打开“地图” App 即可在其当前位置附近搜索或者获取回家路线。用户往往希望每个 App 提供至少一个有用的快速操作；你一共可以提供四个。

**避免快速操作发生意外变化**。动态快速操作是保持操作具有相关性的绝佳方法。例如，基于当前位置或在 App 中的最近活动、一天中的时间或者设置的变化来更新快速操作可能会有意义。请确保操作以用户可预测的方式变化。

**为每个快速操作提供可立即传达出操作结果的简洁标题**。例如，“回家路线”、“新建联系人”和“新建邮件”等标题可帮助用户理解选取对应操作时会发生的情况。如果需要给出更多上下文，请一并提供副标题。“邮件”使用副标题来指示收件箱和 VIP 文件夹中是否有未读邮件。标题或副标题中请勿包括你的 App 名称或任何无关信息，保持文本简短以避免截断，并在编写文本时将本地化纳入考虑。

**为每个快速操作提供熟悉的界面图标**。优先使用 [SF 符号](sf-symbols.md)代表操作。对于表示常用操作的图标列表，请参阅[标准图标](icons.md#Standard-icons)；有关更多指南，请参阅[菜单](menus.md)。

如果你自行设计界面图标，请使用 [Apple 设计资源（iOS 和 iPadOS）](https://developer.apple.com/design/resources/#ios-apps)中包括的“快速操作图标模板”。

**请勿使用表情符号代替符号或界面图标**。表情符号为全彩，而快速操作符号为单色，并且会在深色模式下改变外观以保持对比度。

## 平台考量因素

*无针对 iOS 或 iPadOS 的额外考量因素。在 macOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[菜单](menus.md)

#### 开发者文档

[Add Home Screen quick actions](https://developer.apple.com/cn/documentation/uikit/add-home-screen-quick-actions) — UIKit
