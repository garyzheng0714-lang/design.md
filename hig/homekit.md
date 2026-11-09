# HomeKit

原文：https://developer.apple.com/cn/design/human-interface-guidelines/homekit

借助 HomeKit，用户可以使用 Siri 或 iPhone、iPad、Apple Watch 和 Mac 上的“家庭” App，来安全地控制家中所连接的配件。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-HomeKit-intro@2x.png)

在 iOS 中，“家庭” App 也可让用户管理和配置配件。

你的 iOS、Apple tvOS 或 watchOS 可以与 HomeKit（也即“家庭” App）集成，来打造自定义或配件特定体验。例如，你可以：

- 帮助用户设置、命名和组织配件
- 允许配件精细配置和控制
- 访问自定义配件功能
- 向用户展示如何创建功能强大的智能自动化
- 提供支持

有关开发者指南，请参阅 [HomeKit](https://developer.apple.com/cn/documentation/homekit)。如果你是 MFi 被许可方，请访问 [MFi 门户](https://mfi.apple.com)了解有关配件包装的命名和信息传达指南。

## 术语和布局

HomeKit 将家庭建模为一种对象的层级结构，并定义了指代这些对象的词汇表。“家庭” App 使用 HomeKit 对象模型和术语，让用户通过声音、App 和自动化直观地控制配件。

在你的 App 中使用 HomeKit 定义的术语和对象模型十分关键，这样可以强化用户的理解并让家庭自动化容易上手。

在 HomeKit 模型中，[家庭](#Homes)对象是层级结构的根，包含[房间](#Rooms)、[配件](#Accessories-services-and-characteristics)和[区域](#Zones)等所有其他对象。如果有多个家庭，则每个家庭是不同层级结构的根。

**确认 HomeKit 使用的层次模型**。即使你的 App 在其用户界面中不按房间和区域组织配件，在帮助用户设置或控制其配件时指代 HomeKit 模型很有用。用户需要知道配件的位置，这样才能使用 Siri 和 HomePod 来通过“Siri，打开楼上的灯”或“这里有点暗”这样的语音命令来控制配件。有关更多指导，请参阅 [Siri 交互](homekit.md#Siri-interactions)。

**让用户轻松找到配件的相关 HomeKit 详细信息**。如果你 App 的基本框架基于配件，请不要将其他 HomeKit 信息（例如，配件的区域或房间）隐藏在难以发现的设置屏幕中。相反，考虑将相关的 HomeKit 信息放在可轻松发现的配件详细信息视图中。

**意识到用户可能有多个家庭**。即使你的 App 不支持每位用户有多个家庭这一概念，但也请考虑在配件详细信息视图中提供相关家庭信息。

**不要显示重复的家庭设置**。如果你的 App 以不同的家庭基本框架呈现，请不要让用户重复设置所有或部分家庭或者显示重复的设置视图，这样会让用户感到困惑。请始终遵从用户在“家庭” App 中进行的设置，并以直观的方式在用户界面中呈现这些详细信息。

### 家庭

HomeKit 使用术语*家庭*来表示实际的家庭、办公室或者与用户相关的其他位置。一位用户可能拥有多个家庭。

### 房间

*房间*表示家中实际的房间。房间没有大小或位置等属性，它们仅仅是对用户而言有意义的名称，例如*卧室*或*办公室*。当用户将配件分配到房间后，可以使用如下语音命令：“Siri，打开除卧室外的所有灯”或者“Siri，打开厨房和走廊灯”等等。

### 配件、服务和特征

术语*配件*表示实际连接的家庭配件，例如吊扇、台灯、门锁或摄像头。HomeKit 使用*类别*来表示配件类型，例如恒温器、风扇或灯。配件生产企业通常会将每个配件归类，但你的 App 也可帮助用户在需要时进行归类。例如，对于连接到风扇或台灯的开关，你需要将它和它所控制的配件归为一类。

配件的可控制功能，例如所连接灯上的开关，称为*服务*。部分配件提供多项服务。例如，所连接的车库门可能让用户单独控制灯光和车库门，或者所连接的插座可能支持分别控制顶部插座和底部插座。App 在用户界面中不会使用*服务*这样的字眼，而是会使用描述该服务的名称，例如*车库门遥控开关*和*吊扇灯*。用户通过 Siri 控制家中的配件时，会使用服务名称而非配件名称。有关命名的更多指导，请参阅[帮助用户选择有用的名称](homekit.md#Help-people-choose-useful-names)。

*特征*是服务的可控制属性。例如，对于吊扇而言，风扇服务可能包含速度特征，灯服务可能包含亮度特征。App 在用户界面中不会使用*特征*这样的字眼，而是会使用描述该属性的术语，例如*速度*和*亮度*。

*服务群组*表示用户可能想要作为整体来控制的一组配件服务。例如，如果房间一角有一盏落地灯和两盏台灯，用户可能将所有三项服务分配到名为*阅读灯*服务群组。之后通过*阅读灯*服务群组，用户便可独立于房间中的所有其他灯，单独控制这三盏灯。

### 操作和场景

术语*操作*指的是更改服务的特征，例如调整风扇的速度或灯的亮度。用户和自动化可以发起操作。

*场景*是一组操作，控制一个或多个配件中的一项或多项服务。例如，用户可能创建*电影时间*场景来在客厅拉下窗帘并调暗灯光，或者创建*早上好*场景来开灯、拉起窗帘并启动厨房的咖啡机。

> **提示**
>
> HomeKit API 使用术语*操作集*而非*场景*。在你的 App 用户界面中，请始终使用术语*场景*。

### 自动化

*自动化*促使配件响应特定的条件，例如用户的位置发生更改、到了一天中的特定时间、其他配件打开或关闭或者感应器检测到变化。例如，自动化可在日落或用户到家时打开家中的灯。

### 区域

*区域*表示家中包含多个房间的区域（例如*楼上*或*楼下*）。设置区域是可选操作，但设置后可让用户一次控制多个配件。例如，将楼下所有的灯分配到名为*楼下*的区域可让用户使用“Siri，关掉楼下所有的灯”这样的语音命令。

## 设置

**使用系统提供的设置流程，为用户带来熟悉的体验**。HomeKit 设置流程比传统设置流程更快速高效，因为它让用户只需几个步骤便可命名配件、加入网络、与 HomeKit 配对、分配房间和服务类别并指定常用配件。使用系统提供的设置流程可让你专注于推广配件中独一无二的自定义功能。有关开发者指南，请参阅 [performAccessorySetup(using:completionHandler:)](https://developer.apple.com/cn/documentation/homekit/hmaccessorysetupmanager/performaccessorysetup(using:completionhandler:))。

**提供上下文，解释为何需要访问用户的“家庭”数据**。创建目的字符串，其中包含描述为何请求访问数据的短语，例如“可让你在 Apple 设备上通过 Apple ‘家庭’ App 和 Siri 控制该配件”。

**不要求用户创建账户或提供个人信息**。相反，尽量从 HomeKit 获得你可能需要的任何信息。如果你的 App 提供需要账户的云服务等其他服务，请将账户设置设为可选，并等待 HomeKit 初始设置完成后再提供该选项。

**尊重用户的设置选择**。当用户选择使用 HomeKit 来设置配件时，请勿强迫用户在 HomeKit 设置流程中设置其他平台。跨平台的设置体验会阻止用户立即使用配件，并且可能会因为提供的配件控制方法过多而让用户感到困惑。

**仔细考虑提供自定义配件设置体验的方式和时机**。始终从展示系统提供的设置流程开始。接着，在配件的基本功能可用后，打造自定义的设置后体验，强调配件的独特功能并帮助用户充分利用这些功能。例如，用户可以借助照明生产企业的 App，使用从图库照片中扫描到的基本色调在家中创建个性化的灯光场景。

### 帮助用户选择有用的名称

**建议适合配件的服务名称**。如果你的 App 检测到用户为 Siri 语音控制创建了一个不够理想的名称，请推荐你所知道的对大多数人都适用的替代名称。请勿建议将公司名称或型号用作服务名称。

**检查用户提供的名称是否符合 HomeKit 命名规则**。如果你的 App 允许用户重命名服务，请确保新名称符合规则。（系统提供的设置流程会自动检查原始名称。）如果用户输入的名称与一条或多条规则不符，请简要说明问题，并建议一些适用的替代名称。规则如下：

- 仅使用字母数字、空格和撇号字符。
- 以字母或数字字符开头和结尾。
- 不包括表情符号。

|  | 示例服务名称 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 阅读灯 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | 📚 灯 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 第 2 个车库门 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | #2 车库门 |

**帮助用户避免创建包括位置信息的名称**。虽然用户习惯使用“厨房灯”来命名厨房中的灯，但将房间名称包括在服务名称中可能会导致在通过语音控制配件时出现不可预测的结果。你的 App 可以检测到复制位置信息的服务名称，并帮助用户修复这一问题。例如，你可以打造一种设置后体验，即从服务名称中移除房间或区域，并鼓励用户将配件分配给该房间或区域。

## Siri 交互

HomeKit 支持使用语音命令进行功能强大的智能控制。你可以帮助用户使用 Siri 快速高效地与家中的配件、服务和区域进行交互。

**提供示例语音命令，演示如何在设置过程中使用 Siri 来控制配件**。当用户完成新配件的设置后，考虑在部分示例 Siri 短语中使用用户选择的服务名称，并鼓励其试用。

**设置后，考虑指导用户使用更复杂的 Siri 命令**。用户可能没有意识到，使用 Siri 和 HomePod 时可以通过各种各样的自然语言短语来控制自己的配件。设置完成后，在整个 App 中找到有用的位置，帮助用户了解这类命令。例如，在场景详细信息视图中，可以告诉用户以下内容：*你可以说“嘿 Siri，设置‘电影时间’”*。

除了识别家庭、房间、区域、服务和场景的名称外，Siri 还可以使用配件类别和特征等信息来标识服务。例如，当用户使用*调亮*或*调暗*等术语时，Siri 会意识到这些术语是指具有亮度特征的服务，即使用户没有说出服务名称也是如此。

为了展示 Siri 命令的强大功能和灵活性，下面列出了用户可以用来控制其配件的一些短语类型示例。

| 短语 | Siri 的理解 |
| --- | --- |
| “打开落地灯” | 服务（*落地灯*） |
| “显示玄关摄像头” | 服务（*玄关摄像头*） |
| “开灯” | 配件类别（*灯*） |
| “关掉客厅的灯” | 房间（*客厅*） |
|  | 配件类别（*灯*） |
| “让客厅变得明亮一点” | 房间（*客厅*） |
|  | 配件类别（隐含） |
|  | 亮度特征（*调亮*） |
| “打开嵌入式灯” | 服务群组（*嵌入式灯*） |
| “关掉楼上的灯” | 配件类别（*灯*） |
|  | 区域（*楼上*） |
| “调暗卧室和儿童房的灯光” | 配件类别（*灯*） |
|  | 亮度特征（*调暗*） |
|  | 房间（*卧室*、*儿童房*） |
| “运行晚安” | 场景（*晚安*） |
| “客厅有人吗？” | 配件类别（隐含） |
|  | 人体检测特征（隐含） |
| “我的安全系统坏了吗？” | 配件类别（*安全系统*） |
| “我没关闭车库门吗？” | 配件类别（*车库门*） |
|  | 打开特征（*打开*） |
| “我是不是忘了关掉太浩湖住宅的灯？” | 配件类别（*灯*） |
|  | 家庭（*太浩湖住宅*） |
| “这里光线很暗” | 当前家庭（*这里*） |
|  | 当前房子（通过 HomePod） |
|  | 配件类别（隐含） |

**如果对于你的配件而言有意义，建议用户创建区域和服务群组**。如果用户可从使用情景特定语音命令来控制你的配件中受益，建议使用这些类型的交互，并帮助用户进行设置。例如，如果提供灯、开关或恒温器等配件，可以建议设置名为“楼上”的区域或名为“媒体中心”的服务群组，以支持“Siri，关掉楼上的灯”或“Siri，激活媒体中心”等命令。

**仅为 HomeKit 不支持的配件特定功能提供快捷指令**。借助 HomeKit，用户可以使用普通（或自然）语言来控制配件，而无需任何额外配置，因此应避免提供复制 HomeKit 功能的快捷指令，以免用户感到困惑。相反，考虑为 App 提供的补充功能提供快捷指令。例如，如果用户经常想为你支持的空调订购滤网，你可以提供“订购空调滤网”这样的快捷指令。

**如果你的 App 同时支持 HomeKit 和快捷指令，请帮助用户了解这些类型的语音控制之间的区别**。如果向用户展示多种语音控制方法，他们可能会感到困惑。务必清楚指明快捷指令所能实现的功能，并且切勿鼓励用户为 HomeKit 已支持的场景或操作创建快捷指令。

## 自定义功能

你的 App 可以很好地帮助用户了解你配件的独特功能。例如，用于呈现不同颜色的灯具 App 可以帮助用户使用从照片中导入的颜色来创建 HomeKit 场景。

**明确用户可以在 App 中执行的操作，以及其可能希望使用“家庭” App 的时间**。例如，如果你的 App 只支持灯光，考虑鼓励用户创建“电影时间”场景，该场景不仅可以调暗灯光，还可以拉下窗帘，并打开电视以显示特定画面。为此，首先指导用户设置仅包括你配件操作的场景，在这种情况下，调暗灯光。然后，你的 App 可以建议用户打开“家庭” App 并向你帮助用户创建的场景添加兼容 HomeKit 的窗帘和电视。有关如何指代“家庭” App 的指南，请参阅[指代 HomeKit](homekit.md#Referring-to-HomeKit)。

**如果你的数据库与 HomeKit 数据库不同，请遵循 HomeKit**。通过自动反映“家庭” App 或其他第三方 HomeKit App 中的更改，为用户提供无缝体验。如果必须要求用户在你的 App 中管理冲突，请以视觉方式呈现冲突，以便用户可以清楚地了解需要确认的选择。例如，如果用户在“家庭” App 中更改了配件的服务名称，你的 App 可以检测到这种更改，并且可以并排显示更改前后的两个名称，以确认该用户也想在你的 App 中使用新名称。

**用户在 App 中更改时，请求许可来更新 HomeKit 数据库**。你不应更改“家庭” App 中的某些内容而让用户感到意外，因此在写入数据库之前获得许可或意图指示至关重要。在没有用户明确指示的情况下，尤其不得覆盖 HomeKit 数据库设置。

### 摄像头

你的 App 可以显示来自所连接 HomeKit IP 摄像头的静态图像或流媒体视频。

**请勿阻挡摄像头图像**。可以使用实用的功能来补充摄像头的内容，例如提醒用户注意可能感兴趣的活动。然而，避免使用其他内容来覆盖部分摄像头图像。

**仅当摄像头支持双向音频时才显示麦克风按钮**。没有任何功能的麦克风按钮会占用 App 中的宝贵显示空间，并可能会让用户感到困惑。

## 使用 HomeKit 图标

在设置或与 HomeKit 技术相关的或指导性信息中使用 HomeKit 图标。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-glyph@2x.png)

此外，你可以在指代 Apple “家庭” App 时，或在用于打开 App Store 中 Apple “家庭” App [产品页面](https://itunes.apple.com/us/app/home/id1110145103?mt=8)的按钮中，使用 Apple “家庭” App 图标。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homeapp-icon@2x.png)

**仅使用 Apple 提供的图标**。不要创建自己的 HomeKit 或“家庭” App 图标设计，也不要试图模仿 Apple 提供的设计。在资源中下载 HomeKit 图标。

### 样式

你可以选择多种样式来显示 HomeKit 图标。

#### 黑色 HomeKit 图标

当其他技术图标显示为黑色时，请在白色或浅色背景上使用 HomeKit 图标。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-black-icon-set@2x.png)

#### 白色 HomeKit 图标

当其他技术图标显示为白色时，请在黑色或深色背景上使用 HomeKit 图标。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-white-icon-set@2x.png)

#### 自定义颜色的 HomeKit 图标

当其他技术图标显示为相同的颜色时，请使用自定义颜色。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-custom-color-icon-set@2x.png)

**采用与其他技术图标一致的方式放置 HomeKit 图标**。当其他技术图标包含在形状中时，以相同方式处理 HomeKit 图标。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-settings@2x.png)

**以非交互方式使用 HomeKit 图标**。请勿在自定义交互式元素或按钮中使用该图标和 *HomeKit* 名称。你可以使用 Apple “家庭” App 图标在 App Store 中打开 App 的产品页面。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-donot1@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-donot2@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

**请勿在文本中使用 HomeKit 图标或将其用作 HomeKit 一词的替代**。请参阅[指代 HomeKit](homekit.md#Referring-to-HomeKit) 以了解如何在文本中正确指代 HomeKit。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-lights-right@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-lights-wrong1@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-lights-wrong2@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

**将图标与名称 *HomeKit* 正确配对**。你可以在图标下方或旁边显示名称（如果以同样方式指代其他技术）。请使用与布局其余部分相同的字体。相关指南，请参阅[指代 HomeKit](homekit.md#Referring-to-HomeKit)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-setup@2x.png)
*在设置或指导性内容中使用图标和名称*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/homekit-apps@2x.png)
*使用指代 Apple “家庭” App 的图标和名称*

## 指代 HomeKit

**着重突出你的 App，而不是 HomeKit**。不要让对 HomeKit 或 Apple 家庭的指代比 App 名称或主要标识更突出。

**遵守 Apple 的商标使用准则**。App 名称或图像中不能出现 Apple 商标。在文本中，照原样使用 [Apple Trademark List](https://www.apple.com/legal/intellectual-property/trademark/appletmlist.html) 中显示的 Apple 产品名称。

- 仅使用单数形式的 Apple 产品名称；请勿使用所有格形式的 Apple 产品名称。
- 请勿翻译 Apple、Apple 家庭、HomeKit 或任何其他 Apple 商标。
- 不要使用类别描述符。例如，表述为 iPad，而不是平板电脑。
- 不要暗示任何形式的赞助、合作或 Apple 的许可。
- 在 App 中显示法律信息的位置，正确标明 Apple、HomeKit 和所有其他 Apple 商标的出处及来源。
- 仅在技术规范或兼容性描述中指代 Apple 设备和操作系统。

|  | 示例文本 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 使用 HomeKit 从 iPhone 或 iPad 开灯。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | 使用 HomeKit 从 iOS 设备开灯。 |

请参阅 [Guidelines for Using Apple Trademarks](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)。

### 指代 HomeKit 和“家庭” App

**使用术语 *HomeKit* 时，请使用正确的大小写形式**。在 *HomeKit* 一词中，*H* 和 *K* 大写，后面跟小写字母。在 *Apple Home* 两个单词中，*A* 和 *H* 大写，后面跟小写字母。如果布局仅显示全大写名称，*HomeKit* 或 *Apple Home* 可以全大写排印，以匹配布局其余部分的样式。

**请勿使用名称 *HomeKit* 作为描述符**。请改用*配合使用*、*使用*、*支持*或*兼容*等术语。

|  | 示例文本 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | [品牌] 灯泡可与 HomeKit 配合使用。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 支持 HomeKit 的恒温器。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 可以将 HomeKit 与 [App 名称] 搭配使用。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | HomeKit 灯泡。 |

**请勿暗示 HomeKit 正在执行操作或功能。**

|  | 示例文本 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 后门已通过 HomeKit 打开。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | HomeKit 打开了后门。 |

**如果需要，可以将名称 *Apple* 和名称 *HomeKit* 一起使用。**

|  | 示例文本 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 兼容 Apple HomeKit。 |

**如果需要，可以将名称 *HomeKit* 用于设置、配置和指导。**

|  | 示例文本 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 打开 HomeKit 设置。 |

**明确指代 App 时，使用 App 名称 *Apple 家庭***。正文首次提到 App 时，使用完整的名称 *Apple 家庭*。后续提到时，可以指代“家庭” App。

|  | 示例文本 |
| --- | --- |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 打开 Apple “家庭” App。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png) | 打开 Apple “家庭” App。你的配件和房间现将显示在“家庭” App 中。 |
| ![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png) | 打开“家庭”。 |

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS、visionOS 或 watchOS 的额外考量因素。*

## 资源

#### 相关内容

[Apple 设计资源](https://developer.apple.com/design/resources/)

[Guidelines for Using Apple Trademarks and Copyrights](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)

#### 开发者文档

[HomeKit](https://developer.apple.com/cn/documentation/homekit)

#### 视频

- [在您的智能家居 App 中添加对 Matter 的支持](https://developer.apple.com/cn/videos/play/wwdc2021/10298)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 5 月 2 日 | 已将指南整合为一页。 |
