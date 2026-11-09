# 游戏控制

原文：https://developer.apple.com/cn/design/human-interface-guidelines/game-controls

精确直观的游戏控制会增强可玩性，并可提高玩家在游戏中的沉浸感。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/inputs-game-controls-intro@2x.png)

Apple 平台上的游戏可支持来自实体游戏控制器的输入或默认的系统交互方式（如触控、遥控器或者鼠标和键盘）。虽然玩家可能更喜欢使用实体游戏控制器，但同时支持平台的默认交互方式有两个重要原因：

- 尽管除 watchOS 外的所有平台都支持实体游戏控制器，但并非每位玩家都能使用。
- 玩家青睐可让其使用最熟悉平台交互方式的游戏。

为使各平台的受众最大化并提供最佳体验，在选取要支持的输入方式时请考虑这些因素。

## 触控控制

对于 iOS 和 iPadOS 游戏，支持触控交互意味着你可以在游戏内容上提供虚拟控制，同时也让玩家直接轻触即可与游戏元素进行交互。你可以使用 [Touch Controller](https://developer.apple.com/cn/documentation/touchcontroller) 框架将这些虚拟控制添加到游戏中。请考虑以下指南以创建有趣的触控控制体验。

**确定在游戏内容上显示虚拟控制是否有意义**。一般而言，虚拟游戏控制对提供大量操作或要求玩家控制移动的游戏有用。但有时候玩家可直接与游戏内的对象交互会使游戏玩法更具沉浸感且效果更佳。选择将操作与游戏内的手势关联来尽量减少与游戏内容重叠的虚拟控制数量。例如，请考虑让玩家轻点以选择对象而非添加虚拟选择按钮。

**将虚拟按钮放在易于触及的位置**。考虑设备的边界和[安全区](layout.md#Guides-and-safe-areas)以及易于控制的位置。确保按钮的摆放位置不与 iPhone 的主屏幕指示符或灵动岛等系统功能重叠。将常用按钮放在玩家的拇指附近，避开玩家预期会出现移动和镜头输入的圆形区域。将菜单等次要控制放在屏幕顶部。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/game-controls-touch-input-heat-map@2x.png)
*将虚拟控制放在用户拇指的触及范围内可让用户玩游戏时更加舒适。*

**确保控制足够大**。确保常用控制不小于 44x44 点，菜单等次要控制不小于 28x28 点，以适应用户的手指。

**始终包括可见的触觉按压状态**。没有可视物理按压状态的虚拟控制会让人感觉无响应。添加玩家手指盖住控制时也能看见的可视按压状态效果（如光晕），帮助玩家了解何时成功与按钮交互。将此按压状态与声音及触感相结合以增强反馈感。有关指南，请参阅[提供触感反馈](playing-haptics.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/game-controls-press-state@2x.png)

**使用传达所执行操作的符号**。选取在视觉上代表各按钮所执行操作的插图，如武器的图形代表攻击。避免将抽象的形状或基于控制器的命名（如 A、X 或 R1）用作插图，这会使得玩家更难以理解和记住特定控制的功能。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/game-controls-button-to-action@2x.png)

**显示和隐藏虚拟控制以反映游戏玩法**。充分利用触控控制的动态特性并根据环境调整玩家可在屏幕上看到的控制。你可以在操作不可用或不相关时隐藏控制，从而减少杂乱并帮助玩家专注于重要内容。例如，考虑在玩家轻触屏幕前隐藏移动控制，以减少与游戏内容重叠的用户界面数量。

**可见控制**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/game-controls-thumbstick-in-motion@2x.png)
*摇杆在右移时可见度会更高，并显示高亮标记以指示移动方向。*

**隐藏控制**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/game-controls-thumbstick-at-rest@2x.png)
*摇杆静止时，虚拟控制会淡出以表示未在使用中。*

**将功能并入单个控制**。考虑重新设计需要玩家同时或依次按下多个按钮的游戏机制。利用轻点两下和按住等手势提供相同动作的不同变体，例如按住以使用经过强化的特殊攻击形式。对于走路或冲刺等多个动作，考虑将这些动作并入单个控制。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/game-controls-power-up-action@2x.png)

**将移动和镜头控制映射至可预测的行为**。通常玩家期望使用左侧屏幕控制移动，使用右侧屏幕控制镜头方向。通过使用尽可能大的输入区域，来最大化玩家可控制移动和镜头方向的空间大小。对于移动控制，选择在玩家放拇指的位置而非静止的摇杆位置显示虚拟摇杆。对于镜头控制，选择使用直接触控而非虚拟摇杆来平移镜头。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/game-controls-camera-thumbstick-zones@2x.png)

## 实体控制器

**支持平台的默认交互方式**。用户可选择购买游戏控制器，但每台 iPhone 和 iPad 都配备触控屏，每台 Mac 都配备键盘和触控板或鼠标，每台 Apple TV 都配备遥控器，每台 Apple Vision Pro 都能响应用户眼睛和手的动作。如果支持游戏控制器，请尽量确保有使用平台默认交互方式的回退功能。有关开发者指南，请参阅：[Adding virtual controls to games that support game controllers in iOS](https://developer.apple.com/cn/documentation/gamecontroller/adding-virtual-controls-to-games-that-support-game-controllers-in-ios)。

**告知用户需要游戏控制器**。在 Apple tvOS 和 visionOS 中，你可以要求使用实体游戏控制器。App Store 会显示“需要游戏控制器”标记来帮助用户识别此类 App。请记住，用户随时可能打开你的游戏，即使未连接控制器时也可能打开。如果你的 App 需要游戏控制器，请检查其是否存在，并友好提示用户连接游戏控制器。有关开发者指南，请参阅 [GCRequiresControllerUserInteraction](https://developer.apple.com/cn/documentation/bundleresources/information-property-list/gcrequirescontrolleruserinteraction)。

**自动检测控制器是否已配对**。你可以自动检测控制器是否已配对并获取其配置文件，而不是让玩家手动设置实体游戏控制器。有关开发者文档，请参阅 [Game Controller](https://developer.apple.com/cn/documentation/gamecontroller)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/game-controls-controller-anatomy@2x.png)

**自定义屏幕内容以匹配连接的游戏控制器**。为了简化游戏代码，Game Controller 框架会基于控制器元素的放置位置来为其分配标准名称，但实际游戏控制器上的颜色和符号可能会有所不同。在界面中指代控制或显示相关内容时，确保使用所连接控制器的标记方案。有关开发者指南，请参阅 [GCControllerElement](https://developer.apple.com/cn/documentation/gamecontroller/gccontrollerelement)。

**将控制器按钮映射至预期的用户界面行为**。除了游戏玩法之外，玩家还期望游戏用户界面的导览方式与其所玩平台的常见行为相符。当未在控制游戏时，请在所有 Apple 平台间遵循这些惯例：

| 按钮 | 用户界面的预期行为 |
| --- | --- |
| A | 激活控制 |
| B | 取消操作或返回上个屏幕 |
| X | — |
| Y | — |
| 左肩键 | 向左导览至另一屏幕或部分 |
| 右肩键 | 向右导览至另一屏幕或部分 |
| 左扳机 | — |
| 右扳机 | — |
| 左/右摇杆 | 移动所选内容 |
| 方向键 | 移动所选内容 |
| 主页/标志 | 预留给系统控制 |
| 菜单 | 打开游戏设置或暂停玩游戏 |

**支持多个连接的控制器**。如果连接了多个控制器，请使用与玩家当前在用控制器相匹配的标记和图形。如果你的游戏支持多人游戏，请在指代特定玩家的控制器时使用适当的标记和符号。如果需要指代多个控制器上的按钮，可考虑将这些按钮一起列出。

**优先使用符号而非文本来指代游戏控制器元素**。Game Controller 框架使 [SF 符号](sf-symbols.md)可用于大多数元素，包括各种品牌游戏控制器上的按钮。对于不太熟悉控制器使用的玩家而言，使用符号而非文本描述尤其有帮助，因为这种方式不需要其在玩游戏时寻找特定按钮标记。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/game-controls-sf-symbols-gaming-category@2x.png)

## 键盘

键盘玩家希望使用键盘绑定来加速与 App 和游戏的交互。

**优先使用单键命令**。对玩家而言，单键命令执行起来通常更轻松快捷，在同时使用鼠标或触控板时尤其如此。例如，你可以将菜单项的首字母用作快捷键，例如将 I 用于 Inventory（库存），或者将 M 用于 Map（地图）；你还可以将游戏的主操作映射到空格键，从而充分利用空格键相对较大的尺寸。

**使用 Apple 键盘测试键绑定舒适度游戏**。例如，如果键绑定使用非 Apple 键盘上的 Control 键 (^)，请考虑将其重新映射到 Apple 键盘上的 Command 键 (⌘)。在 Apple 键盘上，Command 键紧邻空格键，可让玩家在使用 W、A、S 和 D 键时尤其轻松触及。

**考虑按键的邻近性**。例如，当玩家使用 W、A、S 和 D 键导航时，考虑使用附近按键定义其他高价值命令。与之类似，如果有一组紧密相关的操作，则将其绑定映射到键盘上彼此靠近的按键效果会很好，例如将数字键用于库存类别。

**让玩家自定义键绑定**。虽然玩家倾向于能够使用合乎常理的默认按键，但许多用户仍需要自定义游戏的键绑定来满足个人的舒适需求和游戏风格。

## 平台考量因素

*无针对 iOS、iPadOS、macOS 或 Apple tvOS 的额外考量因素。在 watchOS 中不受支持。*

### visionOS

**使空间游戏控制器行为匹配手部输入**。除了支持各种无线游戏控制器之外，你的 visionOS 游戏还可支持 PlayStation VR2 Sense 控制器等空间游戏控制器。允许玩家在与游戏交互时使用与手部交互类似的方式。具体而言，支持注视对象并按下控制器的左扳机或右扳机按钮进行间接交互，或者伸手并按下左扳机或右扳机按钮进行直接交互。有关更多信息，请参阅 [visionOS](gestures.md#visionOS)。

## 资源

#### 相关内容

[针对游戏设计](designing-for-games.md)

[手势](gestures.md)

[键盘](keyboards.md)

[提供触感反馈](playing-haptics.md)

#### 开发者文档

[Create games for Apple platforms](https://developer.apple.com/games/)

[Touch Controller](https://developer.apple.com/cn/documentation/touchcontroller)

[Game Controller](https://developer.apple.com/cn/documentation/gamecontroller)

#### 视频

- [巧用触控打造出色的游戏](https://developer.apple.com/cn/videos/play/wwdc2026/358)
- [为 Apple 平台设计高端游戏](https://developer.apple.com/cn/videos/play/wwdc2024/10085)
- [在 visionOS 中探索游戏输入](https://developer.apple.com/cn/videos/play/wwdc2024/10094)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 更新了触控控制最佳实践和用户界面的游戏控制器映射，以及新增了 visionOS 空间游戏控制器支持的指南。 |
| 2024 年 6 月 10 日 | 新增了支持触控控制的指南，以及更改了“游戏控制器”这一标题。 |
