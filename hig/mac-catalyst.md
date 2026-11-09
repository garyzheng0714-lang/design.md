# Mac Catalyst

原文：https://developer.apple.com/cn/design/human-interface-guidelines/mac-catalyst

使用 Mac Catalyst 创建 iPad App 的 Mac 版本时，可为用户提供在新环境中享受体验的机会。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-Mac-Catalyst-intro@2x.png)

## 开始基础

许多 iPad App 都非常适合用于创建使用 Mac Catalyst 构建的 Mac App。对于已经在 iPad 上运行良好并支持关键 iPad 功能的 App 而言尤其如此，例如：

**拖放**。当你在 iPad App 中支持拖放时，Mac 版本中也可以支持拖放。

**键盘导航和快捷键**。尽管实体键盘在 iPad 上并非始终可用，iPad 用户仍喜欢使用键盘进行导航并使用键盘快捷键来简化交互。在 Mac 上，用户会期望 App 能同时提供键盘导航和快捷键。

**多任务处理**。App 能够很好地缩放界面以支持“分屏浏览”、“侧拉”和“画中画”，这为支持 Mac 用户所期望的各种窗口大小调整奠定了必要的基础。

**多窗口**。通过在 iPad 上支持多个场景，App 的 macOS 版本中也可以支持多窗口。

虽然出色的 iPad App 可以为创建使用 Mac Catalyst 构建的 Mac App 提供坚实的基础，但一些 App 还会依赖 Mac 上不存在的框架或功能。例如，如果你所提供体验的基本功能需要陀螺仪、加速计或后置相机等功能、HealthKit 或 ARKit 等框架，或者如果你所提供的主要功能是标记、手写或导航等功能，则你的 App 可能不适合 Mac。

使用 Mac Catalyst 创建 iPad App 的 Mac 版本可以让 App 自动支持基本的 macOS 功能，例如：

- 指针交互及基于键盘的聚焦和导航
- 窗口管理
- 工具栏
- 多信息文本交互，包括拷贝和粘贴以及用于编辑的关联菜单
- 文件管理
- 菜单栏菜单
- 系统提供的“设置” App 中的 App 特定设置

系统提供的用户界面元素也呈现出更像 Mac 的外观，例如：

- 拆分视图
- 文件浏览器
- 活动视图
- 表格表单
- 关联操作
- 颜色选择器

若要进一步了解区分 Mac 体验的特征，请参阅：[针对 macOS 设计](designing-for-macos.md)。有关开发者指南，请参阅：[Mac Catalyst](https://developer.apple.com/cn/documentation/uikit/mac-catalyst)。

> **开发者注释**
>
> 若要探索在使用 Mac Catalyst 创建 Mac App 时视图和控制如何变化，请下载 [UIKit Catalog: Creating and customizing views and controls](https://developer.apple.com/cn/documentation/uikit/uikit-catalog-creating-and-customizing-views-and-controls) 并构建 macOS 目标。

## 选取习惯用法

首次使用 Mac Catalyst 创建 Mac App 时，Xcode 默认使用“缩放界面以匹配 iPad”设置或 *iPad 习惯用法*。通过此设置，系统可确保 Mac App 与 macOS 显示环境显示一致，而无需对 App 的布局进行重大更改。然而，文本和图形可能会稍显粗略，因为当你使用 iPad 习惯用法时，iPadOS 视图和文本在 macOS 中会缩小到 77%。例如，在 macOS 中，系统会将使用 iPadOS 基线字体大小（17 点）的文本缩小到 13 点。

如果你的 App 在使用 iPad 习惯用法时可很好地适配 Mac，可考虑切换到 *Mac 习惯用法*。通过此设置，文本和插图可以渲染得更精细，一些界面元素和视图可呈现出更像 Mac 的外观，并且图形密集型 App 可能会实现更优的性能和更低的功耗。

如果你的 App 显示大量文本、精细插图或动画，则最有可能得益于 Mac 习惯用法，但选取此习惯用法也可能意味着需要花费额外的时间更新 Mac App 的布局、文本和图像。

**采用 Mac 习惯用法时，应彻底审核 App 的布局，并计划对其进行更改**。为了帮助完成这项工作，可考虑使用单独的资源目录来包含 Mac App 资源，而不是重复使用包含 iPad App 资源的资源目录。

**根据需要调整字体大小**。使用 Mac 习惯用法时，文本会以其配置大小的 100% 渲染，如果不进行调整，可能会显示过大。如果可能，请使用文本样式并避免使用固定的字体大小。

**确保视图和图像在 App 的 Mac 版本中效果良好**。使用 Mac 习惯用法时，iPadOS 视图会以其大小的 100% 渲染，使其看起来更精细。为了帮助你直观看清差异，可以考虑如下所示的两种图像资源描绘方式。一个版本说明了在使用 iPad 习惯用法时的资源显示方式，另一个版本显示了在采用 Mac 习惯用法时的资源显示方式。这两种描绘方式都已放大以显示在使用 Mac 习惯用法时图像如何以更多细节渲染。

**iPad 习惯用法**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ipad-idiom@2x.png)

**Mac 习惯用法**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/mac-idiom@2x.png)

> **开发者注释**
>
> 采用 Mac 习惯用法时，未缩放的视图和界面元素会报告不同的指标，这通常会导致大量的额外工作。为了减少工作量，请避免使用固定的字体、视图或布局大小。有关开发者指南，请参阅 [Choosing a user interface idiom for your Mac app](https://developer.apple.com/cn/documentation/uikit/choosing-a-user-interface-idiom-for-your-mac-app)。

**将外观自定义限制为与 iPadOS 中可用的相同或相似的标准 macOS 外观自定义**。并非所有可用于 iPadOS 控制的外观自定义都可用于 macOS 控制。

## 整合 Mac 体验

使用 Mac Catalyst 创建 iPad App 的 Mac 版本时，你需要确保 Mac App 为用户提供丰富的 Mac 体验。无论选择何种习惯用法，都必须超越仅仅只是在 macOS 窗口中显示 iPadOS 布局。

iPadOS 和 macOS 各自定义了植根于用户使用设备的不同方式的模式和惯例。在深入了解并更新特定视图和控制前，请先熟悉各平台之间的主要差异，以便打造出色的 Mac App。

### 导航

许多 iPad 和 Mac App 以类似的方式整理数据，但它们使用不同的控制和视觉指示符来帮助用户理解和导航数据。

通常，iPad App 使用以下组件来整理其内容和功能：

- [拆分视图](split-views.md)。拆分视图支持层级导航，其由两列或三列界面组成，界面显示主列、可选的补充列和内容的二级面板。通常，App 使用主列来创建基于边栏的界面，其中边栏中的更改会推动可选补充列中的更改，然后影响内容面板中的内容。
- [标签页栏](tab-bars.md)。标签页栏通过在屏幕底部的固定栏中显示顶层类别来支持平级导航。
- [页面控制](page-controls.md)。页面控制在屏幕底部显示圆点，指示当前页面在页面扁平列表中的位置。

如果在 iPad App 中使用标签页栏，请考虑使用带有边栏的拆分视图或分段控制。这两种项目与 macOS 导航惯例类似。若要在拆分视图或分段控制之间选择，请考虑以下事项：

- 带边栏的拆分视图显示顶层项目列表，每个项目均可显示子项目列表。使用边栏可简化导航，因为每个标签页的内容在边栏中均可用。通过在 iPad 和 Mac 上使用边栏，你可以创建一致的布局，使 iPad 用户可轻松开始使用 App 的 Mac 版本。
- 分段控制和标签页栏都支持类似的交互，例如互斥选项。一般而言，使用拆分视图而非标签页栏比使用分段控制效果更好。然而，如果 App 使用平级导航层级，分段控制在 Mac 上的效果也可以不错。

**确保用户可持续访问 App 的 Mac 版本中的重要标签页栏项目**。无论在 iPad App 中使用拆分视图还是分段控制（而非标签页栏），请确保在 macOS “显示”菜单中列出顶层项目，以便用户能够快速访问这些项目。

**提供多种方式在页面之间移动**。除了可轻扫切换页面的 iPad 或触控板手势，Mac 用户（尤其是使用指针设备或仅使用键盘进行交互的用户）还喜欢使用“下一页”或“上一页”按钮。

### 输入

虽然 iPad 和 Mac 都接受来自键盘、鼠标和触控板等各种设备的用户输入，但触控交互仍是 iPadOS 惯例的基础。相比之下，键盘和鼠标交互会影响大多数 macOS 惯例。

使用 Mac Catalyst 创建 Mac App 时，大多数 iPadOS 手势都会自动转换，例如：

| iPadOS 手势… | 转换为鼠标交互 |
| --- | --- |
| 轻点 | 左键或右键点按 |
| 按住 | 点按并按住 |
| 平移 | 左键点按并拖移 |

| iPadOS 手势… | 转换为触控板手势 |
| --- | --- |
| 轻点 | 点按 |
| 按住 | 点按并按住 |
| 平移 | 点按并拖移 |
| 开合手指 | 开合手指 |
| 旋转 | 旋转 |

> **开发者注释**
>
> 系统将开合和旋转手势中的两点触控发送到指针下的视图，而不是每点触控下的视图。

### App 图标

**创建 App 图标的 macOS 版本**。出色的 macOS App 图标展示了用户在 macOS 中期望的生动渲染风格，同时在所有平台上保持和谐的体验。

### 布局

为了充分利用更宽的 Mac 屏幕并向 Mac 用户提供出色的体验，请考虑通过以下方式更新布局：

- 将单列内容和操作分为多列。
- 使用常规宽度和常规高度尺寸分类，并考虑在用户调整窗口大小时将内容区域中的元素重排为并排的排列方式。
- 在主内容旁边显示检查器用户界面而不是使用弹出窗口。

**考虑将控制从 iPad App 的主用户界面移动到 Mac App 的工具栏**。确保在 Mac App 菜单栏的菜单中列出与这些控制关联的命令。

**尽可能采用自上而下的流程**。Mac App 将最重要的操作和内容放置在窗口顶部附近。如果 iPad App 在工具栏中提供控制，请将这些控制放置在 App 的 macOS 版本的窗口工具栏中。

**重新放置位于屏幕侧边和底部边缘的按钮**。在 iPad 上，将按钮放在这些屏幕边缘可以帮助用户触及这些按钮，但在 Mac 上，这种对人体工学的考虑并不适用。你不妨将这些控制重新放置到其他区域，或者将其放置在 macOS 窗口的工具栏中。

### 菜单

Mac 用户熟悉固定菜单栏，并希望在其中找到 App 的所有命令。相比之下，iPadOS 没有固定菜单栏，iPad 用户会希望在 App 的用户界面中或在其按住所连接键盘上的 Command 键时显示的快捷键界面中找到 App 指令。

> **开发者注释**
>
> 若要支持菜单命令的键盘快捷键，请使用 [UIKeyCommand](https://developer.apple.com/cn/documentation/uikit/uikeycommand)。有关开发者指南，请参阅 [Adding menus and shortcuts to the menu bar and user interface](https://developer.apple.com/cn/documentation/uikit/adding-menus-and-shortcuts-to-the-menu-bar-and-user-interface)。

如果提供[弹出式按钮](https://developer.apple.com/cn/design/human-interface-guidelines/pop-up-buttons)或[下拉式按钮](https://developer.apple.com/cn/design/human-interface-guidelines/pull-down-buttons)来显示 iPad App 中的菜单，该菜单会自动在使用 Mac Catalyst 创建的 Mac App 中呈现 macOS 外观。

> **开发者注释**
>
> 若要添加和移除自定义 App 菜单，请使用 [UIMenuBuilder](https://developer.apple.com/cn/documentation/uikit/uimenubuilder) 并通过 [UICommand](https://developer.apple.com/cn/documentation/uikit/uicommand) 将表示 iPad App 命令的菜单项添加为菜单项。

系统会自动将 iPad App 中的上下文菜单转换为 App 的 macOS 版本中的上下文菜单。在创建 App 的 Mac 版本时，请考虑寻找其他位置来支持上下文菜单。Mac 用户倾向于 App 中的每个对象都提供包含相关操作的上下文菜单。请注意，在 Mac 上，上下文菜单有时称为*关联*菜单。

## 平台考量因素

*无针对 iPadOS 或 macOS 的额外考量因素。在 iOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[针对 macOS 设计](designing-for-macos.md)

#### 开发者文档

[Mac Catalyst](https://developer.apple.com/cn/documentation/uikit/mac-catalyst) — UIKit

#### 视频

- [设计适用于 Mac 的 iPad App](https://developer.apple.com/cn/videos/play/wwdc2019/809)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 5 月 2 日 | 已将指南整合为一页。 |
