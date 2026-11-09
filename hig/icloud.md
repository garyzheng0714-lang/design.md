# iCloud

原文：https://developer.apple.com/cn/design/human-interface-guidelines/icloud

iCloud 这项服务可让用户无需执行显式同步，即可从任何设备无缝访问其关心的内容，例如照片、视频和文稿等。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-iCloud-intro@2x.png)

iCloud 的一个基本方面是透明度。用户不需要知道内容的确切位置，只需相信自己访问的总是最新版本即可。

## 最佳实践

**借助 iCloud 让你的 App 简单易用**。用户可在“设置”中打开 iCloud，并期望 App 自动与 iCloud 搭配使用。如果你认为用户可能想要选择是否搭配 iCloud 使用你的 App，则在 App 首次打开时显示一个简单选项，让其在针对所有数据使用 iCloud 和完全不使用 iCloud 之间进行选择。

**避免询问在 iCloud 中保留哪些文稿**。大多数用户期望其所有内容在 iCloud 中都可用，不希望管理单个文稿的保存事宜。考虑你的 App 如何处理和呈现内容，并尝试自动执行更多文件管理任务。

**尽可能让内容保持最新状态**。在支持 iCloud 的 App 中，最好可以让用户始终能够访问最新内容。但是，你需要在设备储存空间和带宽限制方面平衡这一体验。如果你的 App 处理非常大的文稿，让用户控制何时下载更新内容可能会更好。如果你的 App 恰属此类，请设计一种方式来指示 iCloud 中提供了更新版本的文稿。文稿更新时，如果下载时间超过几秒钟，请提供微反馈。

**重视 iCloud 储存空间**。iCloud 是用户可付费使用的有限资源。使用 iCloud 储存用户创建和了解的信息，但避免将 iCloud 用于 App 资源或你可以重新生成的内容。即使你的 App 未实施 iCloud 支持，也请记住 iCloud 备份包括每个 App 的“文稿”文件夹中的内容。为了避免占用太多空间，请谨慎选择放置在“文稿”文件夹中的内容。

**确保你的 App 在 iCloud 不可用时能够正常运行**。如果用户手动关闭 iCloud 或打开飞行模式，无需显示 iCloud 不可用的提醒，但如果通过不过于显眼的方式告知用户，其所做更改在恢复 iCloud 访问后才在其他设备上可用，可能仍会很有帮助。

**将 App 状态信息保留在 iCloud 中**。除了储存文稿和其他文件之外，你还可以使用 iCloud 储存设置以及有关 App 状态的信息。例如，杂志 App 可能会储存上次查看的页面，因此当 App 在另一台设备上打开时，用户可以从离开的位置继续阅读。如果使用 iCloud 储存设置，请确保储存的是用户想要应用到其所有设备的设置。例如，一些设置在工作中可能比在家中更有用。

**提醒删除文稿的后果**。如果用户在支持 iCloud 的 App 中删除文稿，该文稿也会从 iCloud 以及所有其他设备中移除。在执行删除之前，显示提醒并请求确认。

**快速、轻松地解决冲突**。尽可能尝试自动检测并解决版本冲突。如果无法实现，请显示不过于显眼的通知，让用户轻松在有冲突的版本之间进行区分和选择。冲突最好尽早解决，以免将时间浪费在错误版本上。

**将 iCloud 内容包含在搜索结果中**。拥有 iCloud 账户的用户认为他们的内容全局可用，并期望搜索结果反映这一观点。

**对于游戏，考虑在 iCloud 中保存玩家进度**。虽然你可以自行实现此功能，但 GameSave 框架提供了有效的解决方案。该框架可跨设备同步已存数据并提供内建提醒，可供你用于帮助玩家处理离线游戏期间或存在冲突时的同步问题。或者，你也可以实现使用 GameSave 数据的自定义用户界面来解决这类情况。有关开发者指南，请参阅 [GameSave](https://developer.apple.com/cn/documentation/gamesave)。

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS、visionOS 或 watchOS 的额外考量因素。*

## 资源

#### 开发者文档

[CloudKit](https://developer.apple.com/cn/documentation/cloudkit)

[GameSave](https://developer.apple.com/cn/documentation/gamesave)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 新增了通过 iCloud 同步游戏数据的指南。 |
