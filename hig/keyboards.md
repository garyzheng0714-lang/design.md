# 键盘

原文：https://developer.apple.com/cn/design/human-interface-guidelines/keyboards

实体键盘是用于输入文本、玩游戏、控制 App 等任务的基本输入设备。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/inputs-keyboard-intro@2x.png)

用户可将实体键盘连接到除 Apple Watch 以外的任何设备。Mac 用户倾向于始终使用实体键盘，iPad 用户则时常使用。很多游戏可完美兼容实体键盘，且用户在输入大量文本时会更喜欢使用实体键盘而非[虚拟键盘](virtual-keyboards.md)。

键盘用户通常希望使用键盘快捷键来加速与 App 和游戏的交互。*键盘快捷键*由一个主键和一个或多个修饰键（Control、Option、Shift 和 Command）组合，可映射到特定命令。游戏中的键盘快捷键（称为*键绑定*）通常由单键组成。

Apple 定义的标准键盘快捷键可在整个系统和大多数 App 中一致使用，有助于用户在新体验中融会贯通。部分 App 为用户最常用的 App 特定命令定义了自定义键盘快捷键；大多数游戏定义了自定义键绑定，可让用户使用键盘快速高效地控制游戏。有关指南，请参阅[游戏控制](game-controls.md#Keyboards)。

## 最佳实践

**尽可能支持全键盘控制**。iOS、iPadOS、macOS 和 visionOS 中提供的全键盘控制可让用户仅通过键盘就能导览和激活窗口、菜单、控制及系统功能。若要在 App 或游戏中测试全键盘控制，请前往系统提供的“设置” App，然后在“无障碍”区域中将其打开。有关开发者指南，请参阅：[在您的 iOS App 中支持全键盘控制](https://developer.apple.com/cn/videos/play/wwdc2021/10120)和 [isFullKeyboardAccessEnabled](https://developer.apple.com/cn/documentation/appkit/nsapplication/isfullkeyboardaccessenabled)。

> **重要信息**
>
> 避免支持针对按钮、分段控制和开关等控制的键盘导航，即使 iPadOS 支持在文本栏、文本视图和边栏中使用键盘导航，并提供了可用于在集合视图和其他自定义视图中支持键盘导航的 API。取而代之的是，让用户使用全键盘控制激活控制、导航到所有屏幕组件，甚至执行拖放等基于手势的交互。有关指南，请参阅 [iPadOS](focus-and-selection.md#iPadOS)；有关开发者指南，请参阅 [Focus-based navigation](https://developer.apple.com/documentation/uikit/focus-based_navigation)。

**遵循标准键盘快捷键**。在使用大多数 App 时，用户通常希望依赖在其他 App 和整个系统中都通用的标准键盘快捷键。如果 App 提供用户需频繁执行的独特操作，请首选为其创建[自定义](keyboards.md#Custom-keyboard-shortcuts)快捷键，而非改变标准键盘快捷键的用途，因为用户会联想到其他操作。玩游戏时，用户可能希望使用某些标准键盘快捷键（例如，使用 Command–Q 退出游戏），但同时希望能够修改每个游戏的键绑定来适合个人的游戏风格。有关指南，请参阅[游戏控制](game-controls.md#Keyboards)。

## 标准键盘快捷键

**通常不要将标准键盘快捷键改用于自定义操作**。当熟悉的快捷键在你的 App 或游戏中以不同方式工作时，用户可能会感到困惑。仅当标准快捷键的操作在你提供的体验中不可行时，才考虑重新定义。例如，不支持文本编辑的 App 不需要诸如斜体等文本样式命令，因此你可以将 Command–I 用于执行更相关的操作，如“显示简介”。

用户希望以下每个标准键盘快捷键都执行下表中列出的操作。

| 主键 | 键盘快捷键 | 操作 |
| --- | --- | --- |
| 空格键 | Command-空格键 | 显示或隐藏“聚焦”搜索栏。 |
|  | Shift-Command-空格键 | 可变化。 |
|  | Option-Command-空格键 | 显示“聚焦”搜索结果窗口。 |
|  | Control-Command-空格键 | 显示特殊字符窗口。 |
| Tab 键 | Shift-Tab 键 | 反向导航控制。 |
|  | Command-Tab 键 | 在已打开 App 列表中向前移动到下一个最近打开的 App。 |
|  | Shift-Command-Tab 键 | 在已打开 App 列表中向后移动（按最近使用排序）。 |
|  | Control-Tab 键 | 将焦点移到对话框中的下一个控制组或下一个表格（当 Tab 键移动到下一个单元格时）。 |
|  | Control-Shift-Tab 键 | 将焦点移到上一个控制组。 |
| Esc 键 | Esc 键 | 取消当前操作或进程。 |
| Esc 键 | Option-Command-Esc 键 | 打开“强制退出”对话框。 |
| 推出键 | Control-Command-推出键 | 退出所有 App（在更改已保存至打开的文稿后）并重新启动电脑。 |
|  | Control-Option-Command-推出键 | 退出所有 App（在更改已保存至打开的文稿后）并关闭电脑。 |
| F1 | Control-F1 | 开关全键盘控制。 |
| F2 | Control-F2 | 将焦点移到菜单栏。 |
| F3 | Control-F3 | 将焦点移到程序坞。 |
| F4 | Control-F4 | 将焦点移到活跃（或下一个）窗口。 |
|  | Control-Shift-F4 | 将焦点移到上一个活跃窗口。 |
| F5 | Control-F5 | 将焦点移到工具栏。 |
|  | Command-F5 | 打开或关闭“旁白”。 |
| F6 | Control-F6 | 将焦点移到第一个（或下一个）面板。 |
|  | Control-Shift-F6 | 将焦点移到上一个面板。 |
| F7 | Control-F7 | 在窗口和对话框中暂时覆盖当前键盘控制模式。 |
| F8 |  | 可变化。 |
| F9 |  | 可变化。 |
| F10 |  | 可变化。 |
| F11 |  | 显示桌面。 |
| F12 |  | 隐藏或显示仪表盘。 |
| 重音符 (`) | Command-重音符 | 激活最前面 App 中的下一个已打开窗口。 |
|  | Shift-Command-重音符 | 激活最前面 App 中的上一个已打开窗口。 |
|  | Option-Command-重音符 | 将焦点移到窗口抽屉。 |
| 连字符 (-) | Command-连字符 | 减小所选内容的大小。 |
|  | Option-Command-连字符 | 屏幕缩放打开时缩小。 |
| 左大括号 ({) | Command-左大括号 | 向左对齐所选内容。 |
| 右大括号 (}) | Command-右大括号 | 向右对齐所选内容。 |
| 竖线 (\|) | Command-竖线 | 居中对齐所选内容。 |
| 冒号 (:) | Command-冒号 | 显示拼写窗口。 |
| 分号 (;) | Command-分号 | 在文稿中查找拼写错误的字词。 |
| 逗号 (,) | Command-逗号 | 打开 App 的设置窗口。 |
|  | Control-Option-Command-逗号 | 降低屏幕对比度。 |
| 句点 (.) | Command-句点 | 取消操作。 |
|  | Control-Option-Command-句点 | 增强屏幕对比度。 |
| 问号 (?) | Command-问号 | 打开 App 的“帮助”菜单。 |
| 正斜线 (/) | Option-Command-正斜线 | 打开或关闭字体平滑。 |
| 等号 (=) | Shift-Command-等号 | 增加所选内容的大小。 |
|  | Option-Command-等号 | 屏幕缩放打开时放大。 |
| 3 | Shift-Command-3 | 将屏幕捕捉到文件。 |
|  | Control-Shift-Command-3 | 将屏幕捕捉到剪贴板。 |
| 4 | Shift-Command-4 | 将所选内容捕捉到文件。 |
|  | Control-Shift-Command-4 | 将所选内容捕捉到剪贴板。 |
| 8 | Option-Command-8 | 打开或关闭屏幕缩放。 |
|  | Control-Option-Command-8 | 反转屏幕颜色。 |
| A | Command-A | 选择文稿或窗口中的每个项目，或文本栏中的所有字符。 |
|  | Shift-Command-A | 取消选择全部所选内容或字符。 |
| B | Command-B | 以粗体显示所选文本或开关粗体文本。 |
| C | Command-C | 将所选内容拷贝到剪贴板。 |
|  | Shift-Command-C | 显示“颜色”窗口。 |
|  | Option-Command-C | 拷贝所选文本的样式。 |
|  | Control-Command-C | 拷贝所选内容的格式化设置并储存在剪贴板上。 |
| D | Option-Command-D | 显示或隐藏程序坞。 |
|  | Control-Command-D | 在“词典” App 中显示所选字词的定义。 |
| E | Command-E | 使用所选内容进行查找操作。 |
| F | Command-F | 打开“查找”窗口。 |
|  | Option-Command-F | 跳到搜索栏控制。 |
|  | Control-Command-F | 进入全屏幕。 |
| G | Command-G | 查找所选内容出现的下一个位置。 |
|  | Shift-Command-G | 查找所选内容出现的上一个位置。 |
| H | Command-H | 隐藏当前运行的 App 的窗口。 |
|  | Option-Command-H | 隐藏所有其他运行的 App 的窗口。 |
| I | Command-I | 以斜体显示所选文本或开关斜体文本。 |
|  | Command-I | 显示“简介”窗口。 |
|  | Option-Command-I | 显示检查器窗口。 |
| J | Command-J | 滚动到所选内容。 |
| M | Command-M | 将活跃窗口最小化到程序坞。 |
|  | Option-Command-M | 将活跃 App 的所有窗口最小化到程序坞。 |
| N | Command-N | 打开新文稿。 |
| O | Command-O | 显示对话框以选取要打开的文稿。 |
| P | Command-P | 显示“打印”对话框。 |
|  | Shift-Command-P | 显示“页面设置”对话框。 |
| Q | Command-Q | 退出 App。 |
|  | Shift-Command-Q | 退出登录当前已登录用户。 |
|  | Option-Shift-Command-Q | 不经确认退出登录当前已登录用户。 |
| S | Command-S | 保存新文稿或文稿的一个版本。 |
|  | Shift-Command-S | 复制活跃的文稿或发起“保存为”。 |
| T | Command-T | 显示“字体”窗口。 |
|  | Option-Command-T | 显示或隐藏工具栏。 |
| U | Command-U | 给所选文本添加下划线或者打开或关闭下划线。 |
| V | Command-V | 在插入点粘贴剪贴板内容。 |
|  | Shift-Command-V | 粘贴为（例如“作为引用贴入”）。 |
|  | Option-Command-V | 将一个对象的样式应用到所选内容。 |
|  | Option-Shift-Command-V | 在插入点粘贴剪贴板内容并将周围文本的样式应用到所插入的对象。 |
|  | Control-Command-V | 将格式化设置应用到所选内容。 |
| W | Command-W | 关闭活跃的窗口。 |
|  | Shift-Command-W | 关闭文件及其关联窗口。 |
|  | Option-Command-W | 关闭 App 中的所有窗口。 |
| X | Command-X | 移除所选内容并储存在剪贴板上。 |
| Z | Command-Z | 撤销前一个操作。 |
|  | Shift-Command-Z | 重做（当“撤销”和“重做”为单独的命令而不是使用 Command-Z 切换时)。 |
| 右箭头 | Command-右箭头 | 将键盘布局更改为当前的罗马文字布局。 |
|  | Shift-Command-右箭头 | 将所选内容扩展到下一个语义单位，通常是当前行的结尾。 |
|  | Shift-右箭头 | 将所选内容向右扩展一个字符。 |
|  | Option-Shift-右箭头 | 将所选内容扩展到当前字词的末尾，然后再扩展到下一个字词的末尾。 |
|  | Control-右键头 | 将焦点移到视图（如表格）中的另一个值或单元格。 |
| 左箭头 | Command-左箭头 | 将键盘布局更改为当前的系统文字布局。 |
|  | Shift-Command-左箭头 | 将所选内容扩展到上一个语义单位，通常是当前行的开头。 |
|  | Shift-左箭头 | 将所选内容向左扩展一个字符。 |
|  | Option-Shift-左箭头 | 将所选内容扩展到当前字词的开头，然后再扩展到下一个字词的开头。 |
|  | Control-左箭头 | 将焦点移到视图（如表格）中的另一个值或单元格。 |
| 上箭头 | Shift-Command-上箭头 | 在下一个语义单位中向上扩展所选内容，通常是文稿的开头。 |
|  | Shift-上箭头 | 将所选内容扩展到上方行，扩展到同一水平位置最近的字符边界。 |
|  | Option-Shift-上箭头 | 将所选内容扩展到当前段落的开头，然后再扩展到下一个段落的开头。 |
|  | Control-上箭头 | 将焦点移到视图（如表格）中的另一个值或单元格。 |
| 下箭头 | Shift-Command-下箭头 | 在下一个语义单位中向下扩展所选内容，通常是文稿的结尾。 |
|  | Shift-下箭头 | 将所选内容扩展到下方行，扩展到同一水平位置最近的字符边界。 |
|  | Option-Shift-下箭头 | 将所选内容扩展到当前段落的结尾，然后再扩展到下一个段落的结尾（包括剪切、拷贝和粘贴操作中的段落终止符，如回车符）。 |
|  | Control-下箭头 | 将焦点移到视图（如表格）中的另一个值或单元格。 |

系统还定义了多个键盘快捷键，以供本地化版本的系统、本地化键盘、键盘布局和输入方式使用。以下快捷键不直接对应菜单命令。

| 键盘快捷键 | 操作 |
| --- | --- |
| Control-空格键 | 在当前和上一个输入法之间切换。 |
| Control-Option-空格键 | 切换到列表中的下一个输入法。 |
| [修饰键]-Command-空格键 | 可变化。 |
| Command-右箭头 | 将键盘布局更改为当前的罗马文字布局。 |
| Command-左箭头 | 将键盘布局更改为当前的系统文字布局。 |

## 自定义键盘快捷键

**仅为最常用的 App 特定命令定义自定义键盘快捷键**。用户希望为频繁执行的操作使用键盘快捷键，但定义过多的新快捷键会让 App 看似难以上手。

**按用户期望的方式使用修饰键**。例如，按下 Command 键的同时拖移可将项目作为一个组移动，按下 Shift 键的同时拖移调整大小可将项目限制为按其宽高比调整大小。另外，按住箭头键可将所选项目按 App 定义的最小距离单位移动，直到用户松开键。

以下是修饰键及其代表符号。

| 修饰键 | 符号 | 建议用途 |
| --- | --- | --- |
| Command 键 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/Keyboard_Command.svg) | 优先将 Command 键用作自定义键盘快捷键中的主修饰键。 |
| Shift 键 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/Keyboard_Shift.svg) | 优先将 Shift 键用作补充相关快捷键的辅助修饰键。 |
| Option 键 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/Keyboard_Option.svg) | 谨慎将 Option 修饰键用于不太常见的命令或强大的功能。 |
| Control 键 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/Keyboard_Control.svg) | 避免将 Control 键用作修饰键。系统会在许多针对整个系统范围的功能和快捷键（如移动焦点或截屏）中使用 Control 键。 |

> **提示**
>
> 部分语言需要修饰键来生成特定符号。例如，在法语键盘上，Option-5 会生成“{”字符。使用 Command 键作为修饰键通常是安全的，但如果其他修饰键带有仅在部分键盘上可用的字符，请避免使用。如果必须使用 Command 键以外的修饰键，最好仅将其与字母字符一起使用。

**以正确顺序列出修饰键**。如果在自定义快捷键中使用了多个修饰键，其列出顺序始终为：Control 键、Option 键、Shift 键、Command 键。

**避免在使用双字符键高位字符的快捷键中添加 Shift 键**。用户已经知道必须按住 Shift 键才能键入双字符键的高位字符，因此在快捷键中仅列出高位字符会更为清楚。例如，“隐藏状态栏”的键盘快捷键是 Command-斜线，而“帮助”的键盘快捷键是 Command-问号，而不是 Shift-Command-斜线。

**让系统按需本地化和镜像你的键盘快捷键**。系统会自动本地化快捷键的主键和修饰键以支持当前所连接的键盘。如果 App 或游戏切换到从右到左的布局，系统会自动镜像快捷键。有关指南，请参阅[从右到左](right-to-left.md)。

**避免基于无关命令的现有快捷键添加修饰键来创建新快捷键**。例如，用户习惯使用 Command-Z 来撤销操作，如果将 Shift-Command-Z 用作与撤销和重做无关的命令的快捷键，用户可能会感到困惑。

## 平台考量因素

*无针对 iOS、iPadOS、macOS 或 Apple tvOS 的额外考量因素。在 watchOS 中不受支持。*

### visionOS

在 visionOS 中，App 的键盘快捷键出现在快捷键界面中，该界面会在用户按住所连接键盘上的 Command 键时显示。与在 iPad 或 Mac 上组织到 App 的[菜单栏菜单](the-menu-bar.md)中类似，Apple Vision Pro 上的快捷键界面在熟悉的系统定义菜单类别（如“文件”、“编辑”和“显示”）中显示 App 命令。与菜单栏菜单不同的是，快捷键界面会在一个视图中显示所有相关类别，每个类别内仅列出可用且另有快捷键的命令。

**编写描述性快捷键标题**。快捷键界面将所有项目按各个类别显示在一个扁平列表中，因此子菜单标题无法为其子项目提供语境。确保每个快捷键标题的描述足以传达其操作，而无需子菜单标题可能提供的额外语境。有关开发者指南，请参阅 [discoverabilityTitle](https://developer.apple.com/cn/documentation/uikit/uikeycommand/discoverabilitytitle)。

**意识到当用户在 visionOS App 或游戏中搭配使用实体键盘时会看到叠层**。当用户在使用 visionOS App 或游戏时连接实体键盘，系统会显示提供键入补全建议和其他控制的虚拟键盘叠层。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-keyboard-accessory-input.mp4)

## 资源

#### 相关内容

[虚拟键盘](virtual-keyboards.md)

[数据输入](entering-data.md)

[指针设备](pointing-devices.md)

#### 开发者文档

[KeyboardShortcut](https://developer.apple.com/cn/documentation/swiftui/keyboardshortcut) — SwiftUI

[Input events](https://developer.apple.com/cn/documentation/swiftui/input-events) — SwiftUI

[Handling key presses made on a physical keyboard](https://developer.apple.com/cn/documentation/uikit/handling-key-presses-made-on-a-physical-keyboard) — UIKit

[Mouse, Keyboard, and Trackpad](https://developer.apple.com/cn/documentation/appkit/mouse-keyboard-and-trackpad) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 将游戏特定的键绑定指南移至游戏控制页面。 |
| 2024 年 6 月 10 日 | 新增了游戏特定指南，以及进行了内容组织上的更新。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
