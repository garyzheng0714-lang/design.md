# 活动视图

原文：https://developer.apple.com/cn/design/human-interface-guidelines/activity-views

活动视图通常称为*共享表单*，呈现用户在当前环境中可执行的一系列任务。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-activity-view-intro@2x.png)

除了快速访问常用 App 外，活动视图还呈现共享活动（如信息收发）和操作（如拷贝和打印）。用户通常在查看页面或文稿或在选择了某个项目后，通过选取“操作”按钮来显示共享表单。活动视图可显示为表单或弹出窗口，视设备和方向而定。

你可以提供特定于 App 的活动，当用户在你的 App 或游戏中将其打开时，这些活动可以显示在共享表单中。例如，“照片”提供特定于 App 的操作，如“拷贝照片”、“添加到相簿”和“调整位置”。系统默认先列出特定于 App 的操作，再提供可在多个 App 或整个系统中使用的操作，如“添加到文件”或“隔空播放”。用户可以编辑操作列表，确保其显示最常使用的操作和添加新操作。

你还可以创建 App 扩展以提供用户可在其他 App 中使用的自定义共享和操作活动。（*App 扩展*是你提供的代码，可供用户在你的 App 之外安装并使用。）例如，你可以创建一个自定义共享活动，供用户安装以帮助其通过特定社交媒体服务共享网页。即使 macOS 不提供活动视图，你也可以创建用户可在 Mac 上使用的共享和操作 App 扩展。有关指南，请参阅[共享和操作扩展](activity-views.md#Share-and-action-extensions)。

## 最佳实践

**避免创建活动视图中已有的常见操作的重复版本**。例如，提供重复的“打印”操作没有必要并会令人困惑，因为用户不知道你的操作与系统提供的操作有什么区别。如果需要提供的特定于 App 的功能与现有操作类似，请自定义其标题。例如，如果你让用户可使用自定义格式打印银行交易，请使用有助于用户理解该打印活动内容的标题，如“打印交易”。

**考虑使用符号来代表自定义活动**。[SF 符号](sf-symbols.md)提供了一整套可配置的符号，供你在活动视图中传达项目和概念。如果你需要创建自定义界面图标，请将它放置在约为 70x70 个像素的区域中心。有关指南，请参阅[图标](icons.md)。

**为你提供的每个自定义操作编写简洁的描述性标题**。如果标题太长，系统会将其换行并可能造成截断。优先使用单个动词或简短的动词短语来清晰表达操作的内容。避免在操作标题中包括你的公司或产品名。相比之下，共享表单在代表它的图标下方显示共享活动的标题，通常是公司名。

**确保活动适合当前语境**。虽然你无法在活动视图中重新排序系统提供的任务，但可以排除不适合你 App 的任务。例如，如果打印在你的 App 中没有意义，那么你可以排除“打印”活动。你还可以确认在给定时间显示哪些自定义任务。

**使用“共享”按钮显示活动视图**。用户习惯在选取“共享”按钮时访问系统提供的活动。避免提供另一种执行相同任务的方式，否则可能会令用户感到困惑。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/activity-views-share-button@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/activity-views-share-sheet@2x.png)

## 共享和操作扩展

共享扩展为用户提供了一种便捷的方式与 App、社交媒体账户和其他服务共享当前环境中的信息。操作扩展可让用户在不离开当前环境的情况下发起特定于内容的任务，如添加书签、拷贝链接、编辑内联图像或以另一种语言显示所选文本。

系统根据平台以不同方式呈现共享和操作扩展：

- 在 iOS 和 iPadOS 中，共享和操作扩展显示在用户选取“操作”按钮时出现的共享表单中。
- 在 macOS 中，用户通过点按工具栏中的“共享”按钮或在上下文菜单中选取“共享”来访问共享扩展。用户可以将指针悬停在某类嵌入内容（如添加到“邮件”编写窗口的图像）上、点按工具栏按钮或在“访达”窗口中选择快速操作来访问操作扩展。

**根据需要创建用户熟悉的自定义界面**。对于共享扩展，优先采用系统提供的合成视图，因为它提供的共享体验与用户熟知的一致。对于操作扩展，请包括你的 App 名称。如果需要呈现界面，请包括你 App 界面的元素，以帮助用户了解扩展与你的 App 相关。

**简化并限制交互**。用户喜欢只需几步即可完成某项任务的扩展。例如，共享扩展可能让用户轻点或点按一下，便可立即将图像发布到社交媒体账户。

**避免将模态视图放在扩展上方**。系统默认将扩展显示在模态视图中。在扩展上方显示提醒可能有必要，但要避免在此处显示额外的模态视图。

**根据需要提供表示扩展用途的图像**。共享扩展自动使用你的 App 图标，有助于用户相信该扩展由你的 App 提供。对于操作扩展，优先采用[符号](https://developer.apple.com/cn/design/human-interface-guidelines/sf-symbols)或创建界面[图标](https://developer.apple.com/cn/design/human-interface-guidelines/icons)来清晰地标识任务。

**使用你的主 App 指示冗长操作的进度**。用户在你的共享或操作扩展中完成任务后，活动视图会立即关闭。如果任务过于耗时，请让它在后台继续执行，并为用户提供在你的主 App 中检查任务状态的方式。虽然你可以使用通知来告诉用户出现的问题，但不要仅仅因为某项任务完成就给他们发送通知。

## 平台考量因素

*无针对 iOS、iPadOS 或 visionOS 的额外考量因素。在 macOS、Apple tvOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[表单](sheets.md)

[弹出窗口](popovers.md)

#### 开发者文档

[UIActivityViewController](https://developer.apple.com/cn/documentation/uikit/uiactivityviewcontroller) — UIKit

[UIActivity](https://developer.apple.com/cn/documentation/uikit/uiactivity) — UIKit

[App Extension Support](https://developer.apple.com/cn/documentation/foundation/app-extension-support) — Foundation

#### 视频

- [利用“信息”设计协作体验](https://developer.apple.com/cn/videos/play/wwdc2022/10015)
