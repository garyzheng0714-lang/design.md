# 搜索

原文：https://developer.apple.com/cn/design/human-interface-guidelines/searching

用户使用各种搜索技术查找设备上、App 内和文稿或文件中的内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-searching-intro@2x.png)

为了搜索 App 内的内容，用户通常期望使用[搜索栏](search-fields.md)。如果了解用户与你 App 的交互方式，你可以利用这一点适时提供个性化的搜索体验。例如，你可以基于用户之前在你 App 中使用的搜索词来显示最近的搜索、搜索建议、补全或改正。

在某些情况下，用户期望能够限定搜索范围或过滤搜索结果。例如，用户可能想要通过指定创建日期、文件大小或文件类型等属性搜索项目。有关指南，请参阅：[范围栏和令牌](search-fields.md#Scope-bars-and-tokens)。你也可以在你的 iOS、iPadOS 或 macOS App 中采用各种方法查找窗口或页面中的内容，从而帮助用户找到所打开文稿或文件中的内容。

在 iOS、iPadOS 和 macOS 中，“聚焦”可帮助用户找到系统所有 App 中的内容以及网页内容。当你对 App 内容建立索引并提供相关信息时，用户无需先打开 App，便可使用“聚焦”查找其中包含的内容。有关指南，请参阅[系统级搜索](searching.md#Systemwide-search)。

## 最佳实践

**如果搜索很重要，请将其放在 App 或视图中的主要位置**。例如，在“备忘录” App 中，搜索栏与其他重要操作一起位于底部[工具栏](toolbars.md)中。在“照片”和 Apple TV 等使用[标签页栏](tab-bars.md)的 App 中，搜索有其专用标签页。

**力求通过单个位置让 App 内容可供搜索**。用户希望通过一个清晰易辨的位置查找 App 中的任何所需内容。对于版块划分明确的 App 来说，提供局部搜索仍可能非常有用。例如，在 iOS 版“音乐” App 中搜索歌曲和专辑时，搜索会用作当前视图的过滤器。

**明确显示当前的搜索范围**。使用描述性占位符文本、[范围栏](search-fields.md#Scope-bars-and-tokens)或标题帮助强化用户当前搜索的内容。例如，“邮件” App 中始终会有用户所搜索邮箱的明确参考。

**提供让搜索更简单的建议**。在用户开始键入前显示其最近搜索项或随用户键入提供预测搜索建议时，你可以帮助用户更快搜索和键入更少内容。有关开发者指南，请参阅：[searchSuggestions(_:)](https://developer.apple.com/cn/documentation/swiftui/view/searchsuggestions(_:))。

**显示搜索历史记录前，考虑用户隐私**。用户可能不希望自己的搜索历史记录出现在他人可能看到的地方。如果确实要显示搜索历史记录，为用户提供按需清除历史记录的方式。

## 系统级搜索

**让 App 内容在“聚焦”中可供搜索**。你可以使内容可索引并指定称为“*元数据*”的描述性属性来与“聚焦”共享这些内容。“聚焦”会提取、储存并整理此类信息，以实现快速、全面的搜索。

**定义所处理自定义文件类型的元数据**。提供“聚焦”文件导入程序插件，描述文件格式包含的元数据类型。有关开发者指南，请参阅 [CSImportExtension](https://developer.apple.com/cn/documentation/corespotlight/csimportextension)。

**使用“聚焦”在 App 环境中提供高级的文件搜索功能**。例如，你可以包括一个按钮，根据当前所选内容立即启动“聚焦”搜索。接着显示一个自定义视图，在其中呈现搜索结果或过滤后的部分搜索结果。

**优先采用系统提供的打开和保存视图**。系统提供的打开和保存视图通常包括一个内建搜索栏，可让用户搜索并过滤整个系统。相关指南，请参阅[文件管理](file-management.md)。

**如果 App 生成自定义文件类型，请采用“快速查看”生成器**。“快速查看”生成器有助于“聚焦”和其他 App 显示文稿预览。有关开发者指南，请参阅 [Quick Look](https://developer.apple.com/cn/documentation/quicklook)。

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS、visionOS 或 watchOS 的额外考量因素。*

## 资源

#### 相关内容

[搜索栏](search-fields.md)

#### 开发者文档

[Adding your app’s content to Spotlight indexes](https://developer.apple.com/cn/documentation/corespotlight/adding-your-app-s-content-to-spotlight-indexes) — Core Spotlight

#### 视频

- [设计直观的搜索体验](https://developer.apple.com/cn/videos/play/wwdc2026/292)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 6 月 8 日 | 更新了术语并优化了最佳实践。 |
| 2025 年 6 月 9 日 | 更新了最佳实践中的搜索栏通用指南，以及重新整理了系统级搜索的指南。 |
