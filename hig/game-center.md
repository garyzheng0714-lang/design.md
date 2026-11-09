# Game Center

原文：https://developer.apple.com/cn/design/human-interface-guidelines/game-center

Game Center 是 Apple 的社交游戏网络，可让玩家跟踪自身游戏进度以及跨 Apple 平台与朋友建立联系，还可提高你的游戏在玩家设备上的曝光度。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-Game-Center-intro@2x.png)

在你的游戏中支持 Game Center 可让玩家：

- 发现朋友在玩的新游戏。
- 无缝邀请朋友一起玩。
- 在系统、Apple Games App、App Store 和通知等位置查看其游戏的最新活动。

通过实现以上列出的玩家活动，支持 Game Center 还有助于跨 Apple 平台将你的游戏呈现给更多玩家。

你可以使用 GameKit 框架将 Game Center 添加到游戏，该框架提供了功能完整的用户界面，可让玩家在游戏内轻松访问和查看其 Game Center 数据。另外，你还可以使用 GameKit 在自己的自定义用户界面内呈现此数据。有关开发者指南，请参阅 [GameKit](https://developer.apple.com/cn/documentation/gamekit)。

## 访问 Game Center

若要为玩家提供更好的 Game Center 体验，首先请在玩家启动游戏时确定其是否已在系统中登录 Game Center 账户。若未登录，请在此时为玩家初始化 Game Center。这样可提供更加无缝的用户体验，并最大程度提高游戏的曝光度，如在“热门游戏”榜单和玩家朋友的社交推荐中。

### 整合访问点

Game Center *访问点*是 Apple 设计的用户界面元素，让玩家可以在不离开游戏的情况下查看其 Game Center 个人资料和信息。有关开发者指南，请参阅 [Adding an access point to your game](https://developer.apple.com/cn/documentation/gamekit/adding-an-access-point-to-your-game)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-access-point-collapsed@2x.png)

在 iOS、iPadOS 和 macOS 中，访问点会将玩家带到游戏叠层中，这是一种可让玩家查看其进度和开始游戏活动的系统叠层。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-game-overlay@2x.png)

在 visionOS 和 Apple tvOS 中，访问点会将玩家带到游戏内仪表盘，这是显示在游戏顶部的玩家 Game Center 活动全屏幕视图。

**在菜单屏幕中显示访问点**。考虑将访问点添加到游戏主菜单或设置区域。避免在游戏进行过程中或者可能位于游戏主菜单屏幕之前的临时启动屏幕、过场视频或教程中显示访问点。

**避免将控制放在访问点附近**。你可以选择在屏幕四角中任一角处的固定位置显示访问点。请谨记，访问点具有折叠和展开两个版本，因此请检查访问点是否遮挡了任何重要用户界面和控制，并对布局进行相应调整。

> **注**
>
> 在 visionOS 中，访问点的位置因游戏类型（例如沉浸式游戏或基于空间的游戏）而异。有关开发者指南，请参阅 [Adding an access point to your game](https://developer.apple.com/cn/documentation/gamekit/adding-an-access-point-to-your-game)。

**考虑在游戏叠层或仪表盘出现时暂停游戏**。暂停游戏有助于玩家查看其 Game Center 信息，而不会感到游戏在其未参与时仍继续进行。

### 使用自定义用户界面

你的游戏可包括指向游戏叠层（在 iOS、iPadOS、macOS 中）或仪表盘（在 visionOS 和 Apple tvOS 中）的自定义链接。自定义用户界面可深度链接至以上两者内的特定区域，如排行榜或玩家的 Game Center 个人资料。

**在自定义链接中使用 Game Center 提供的插图**。在自定义用户界面中提及 Game Center 功能时，请使用来自 [Apple 设计资源](https://developer.apple.com/design/resources/#technologies)的官方插图。保留此插图的外观，且勿调整尺寸或视觉效果。

**在自定义链接中使用正确的术语**。下表介绍了如何正确使用 Game Center 术语，以免玩家在自定义用户界面中感到困惑。

| 术语 | 错误术语 | 本地化 |
| --- | --- | --- |
| Game Center | GameKit、GameCenter、game center | 使用系统提供的 *Game Center* 翻译 |
| Game Center 个人资料 | 个人资料、账户、玩家信息 | 使用系统提供的 *Game Center* 翻译并本地化*个人资料* |
| 成就 | 奖项、奖杯、奖牌 |  |
| 排行榜 | 排名、得分、领先者 |  |
| 挑战 | 竞赛 |  |
| 添加朋友 | 添加、添加个人资料、包括朋友 |  |

## 成就

成就会进一步激励玩家，从而保持其对游戏的兴趣。Game Center 成就以突出显示玩家进度并展示你的插图的可收集卡片形式呈现。有关开发者指南，请参阅 [Rewarding players with achievements](https://developer.apple.com/cn/documentation/gamekit/rewarding-players-with-achievements)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-achievement-overlay@2x.png)
*成就概览*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-achievement-overlay-detail@2x.png)
*成就详细信息*

### 将成就整合到游戏中

**遵循 Game Center 成就状态**。Game Center 定义了四种成就状态：未解锁、进行中、隐藏和已获得。系统按完成状态对成就进行分组，在“已获得”分组中显示已获得的成就，并在“未解锁”分组中显示所有其他成就。将你的成就映射到四种 Game Center 成就状态可为玩家提供一致的体验，还有助于其一览游戏提供的成就类型。

**确定显示顺序**。上传成就的顺序即为其显示顺序，因此在上传文件前请考虑需要的顺序。例如，你可能希望成就以游戏中最常见的路径所对应的顺序显示。

**描述成就时保持简洁**。成就卡片将标题和描述分别限制在两行以内。如果标题或描述超过两行，卡片将截断文本。成就标题使用标题式大写，描述使用句子式大写。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-achievement-anatomy@2x.png)

**让玩家有进步感**。使用渐进式成就时，系统会显示玩家进度并提供“在‘海岸’中完成‘大湖货船’进度已过半。继续加油！”等鼓励信息以鼓励玩家通关。

### 创建成就图像

**设计丰富、高质量的图像，有助于让玩家产生成就感**。成就是 Game Center 用户界面中的一项突出功能，因此有必要设计吸引眼球并鼓励玩家重返游戏的高质量资源。避免重复使用相同资源代表多项成就。如果你未提供代表某项成就的资源，卡片会显示占位符图像。

**创建适当大小和格式的插图**。系统会为成就图像应用圆形遮罩，因此请确保将内容居中。使用以下规范创建图像。

**iOS、iPadOS、macOS、visionOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ios-achievement-image-layout@2x.png)

| 属性 | 值 |
| --- | --- |
| 格式 | PNG、TIF 或 JPG |
| 色彩空间 | sRGB 或 P3 |
| 分辨率 | 72 DPI（最小值） |
| 图像大小 | 512x512 点（1024x1024 个像素 @2x） |
| 遮罩直径 | 512 点（1024 个像素 @2x） |

**Apple tvOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tvos-achievement-image-layout@2x.png)

| 属性 | 值 |
| --- | --- |
| 格式 | PNG、TIF 或 JPG |
| 色彩空间 | sRGB 或 P3 |
| 分辨率 | 72 DPI（最小值） |
| 图像大小 | 320x320 点（640x640 个像素 @2x） |
| 遮罩直径 | 200 点（400 个像素 @2x） |

## 排行榜

排行榜是鼓励在游戏内友好竞争的一种绝佳方式。采用 Game Center 时，玩家可轻松检查其在朋友和全球玩家中的排名，以及在朋友对其发起挑战或超过其排行榜分数时接收通知。你可以利用系统设计的用户界面或在自定义用户界面中显示排行榜信息。有关开发者指南，请参阅 [Encourage progress and competition with leaderboards](https://developer.apple.com/cn/documentation/gamekit/encourage-progress-and-competition-with-leaderboards)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-leaderboards-overlay@2x.png)
*排行榜概览*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-leaderboards-detail@2x.png)
*排行榜详细信息*

**选取排行榜类型**。Game Center 支持两种类型的排行榜：*经典*和*循环*。

- *经典排行榜*会跟踪玩家的最佳历史得分。经典排行榜始终活跃，永不结束。以下是可在经典排行榜中包括的目标示例：

  - 在节奏游戏中力争获得最完美评分。
  - 在单次地下城探险中收集最多金币。
  - 在无尽跑酷中达成最长持续时间。
- *循环排行榜*会基于你定义的时间间隔还原，如每周或每天。循环排行榜为玩家提供了领先排行榜的更多机会，从而提升了玩家参与度。以下是适合循环排行榜的功能示例：

  - 每天轮换的益智游戏
  - 季节性或节假日主题的活动
  - 不同战斗模式的周排行榜

**有多个排行榜时，充分利用排行榜集**。排行榜集是一种组织系统，可让玩家更轻松找到需要的排行榜。考虑将排行榜集按主题或游戏体验分组，如：

- 难易模式（简单、标准、困难）
- 活动类型（战斗、建造、种植）
- 类型和主题（迪斯科、流行、摇滚）

**添加排行榜图像**。排行榜插图是一个强化游戏视觉美学的新机会。力求为游戏中每个排行榜创建独特的图像，以反映和展示排行榜排名中所涉及的游戏体验。排行榜在整个系统中显示，优化了玩家与朋友互动和竞争的方式，使用引人注目的图像有助于吸引玩家并为其提供体验感。

对于在 iOS、iPadOS 和 macOS 中运行的游戏，请使用单张排行榜图像。对于在 Apple tvOS 中运行的游戏，请提供在插图获得焦点时动态显示的一系列图像。若要进一步了解聚焦效果，请参阅[聚焦和选择](focus-and-selection.md)。有关创建可聚焦图像方面的帮助，请从 [Apple 设计资源](https://developer.apple.com/design/resources/#tvos-apps)下载 Apple tvOS 模板。使用以下规范创建排行榜插图。

**iOS、iPadOS、macOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/leaderboard-image-layout-general@2x.png)

| 属性 | 值 |
| --- | --- |
| 格式 | JPEG、JPG 或 PNG |
| 色彩空间 | sRGB 或 P3 |
| 分辨率 | 72 DPI（最小值） |
| 图像大小 | 512x512 点（1024x1024 个像素 @2x） |
| 裁剪区域 | 512x312 点（1024x624 个像素 @2x） |

**Apple tvOS**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/tvos-multi-layered-leaderboard-image@2x.png)

| 属性 | 值 |
| --- | --- |
| 格式 | PNG、TIF 或 JPG |
| 色彩空间 | sRGB 或 P3 |
| 分辨率 | 72 DPI（最小值） |
| 图像大小 | 659x371 点（1318x742 个像素 @2x） |
| 获得焦点大小 | 618x348 点（1236x696 个像素 @2x） |
| 未获得焦点大小 | 548x309 点（1096x618 个像素 @2x） |

> **注**
>
> 注意裁剪可能如何影响排行榜插图。在 iOS、iPadOS 和 macOS 中，系统会为排行榜集中的排行榜裁剪插图。在 Apple tvOS 中，排行榜插图上的聚焦效果可能会裁剪某些层图像的边缘。请确保主要内容在这两种情况下都保持舒适可见。

## 挑战

挑战将单玩家活动变为与朋友之间的多人游戏体验。挑战基于排行榜构建，可让玩家与朋友建立联系并参与限时竞赛。有关开发者文档，请参阅 [Creating engaging challenges from leaderboards](https://developer.apple.com/cn/documentation/gamekit/creating-engaging-challenges-from-leaderboards)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-challenges-overlay@2x.png)
*挑战概览*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-challenges-overlay-detail@2x.png)
*挑战详细信息*

**打造具有吸引力的挑战**。挑战非常适合有明确方式判断玩家成就的短时间竞技游戏活动。创建时长 1-5 分钟且玩家可独立完成的游戏挑战。有吸引力的挑战示例：

- 在赛车关卡中以最快圈速跑完。
- 在单轮游戏中打败最多敌人。
- 解出每日益智游戏且出错最少。

**避免创建跟踪总体进度或个人最佳得分的挑战**。这些挑战会为常驻玩家带来不公平的优势。相反，应跟踪玩家尝试每次挑战后的最近得分。这样可将所有玩家置于平等的竞争环境，以帮助保持挑战的激励性。

**简化进入挑战的过程**。玩家可通过邀请链接、游戏叠层或者 iOS、iPadOS 和 macOS 中的“游戏” App 访问挑战。始终深度链接至挑战开始的准确模式或关卡，并协助新手玩家在开始挑战前完成任何初始引导过程。例如，如果游戏需要教学关卡来了解基本控制，请首先为玩家启动教学，并显示用户界面告诉玩家游戏将在随后自动进入挑战。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-challenge-anatomy@2x.png)

**创建鼓励玩家参与挑战的高质量插图**。系统会在游戏叠层、“游戏” App 和邀请链接预览中显示挑战插图。避免将插图主要内容放在可能被挑战标题和描述覆盖的区域。如果需要在挑战图像中使用文本，请通过 App Store Connect 或 Xcode 提供适当的本地化版本。使用以下规范创建挑战插图。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-challenge-image-specs@2x.png)

| 属性 | 值 |
| --- | --- |
| 格式 | JPEG、JPG 或 PNG |
| 色彩空间 | sRGB 或 P3 |
| 分辨率 | 72 DPI（最小值） |
| 图像大小 | 1920x1080 点（3840x2160 个像素 @2x） |
| 裁剪区域 | 1465x767 点（2930x1534 个像素 @2x） |

## 多人游戏活动

Game Center 支持实时和回合制多人游戏活动，可让玩家轻松与朋友或其他玩家建立联系。玩家可通过派对码、游戏叠层、仪表盘或“游戏” App 访问多人游戏。有关开发者文档，请参阅 [Creating activities for your game](https://developer.apple.com/cn/documentation/gamekit/creating-activities-for-your-game)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-multiplayer-overlay@2x.png)
*多人关卡概览*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-multiplayer-overlay-detail@2x.png)
*多人关卡详细信息*

**使用派对码邀请玩家加入多人游戏活动**。Game Center 派对码是一种协调实时多人游戏会话的绝佳方式，无论是使用 Game Center 匹配和联网工具还是自行提供。Game Center 会生成长度通常为八个字符的字母数字派对码，如“2MP4-9CMF”。  将派对码整合到多人游戏中时，请考虑以下指南以实现更佳玩家体验：

- 允许玩家较晚加入、提前离开和稍后回到游戏。
- 为玩家提供在游戏中查看当前派对码的方式。
- 允许玩家手动输入派对码。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-multiplayer-custom-code@2x.png)

**通过游戏内用户界面支持多人游戏活动**。游戏叠层和 Game Center 仪表盘可协助玩家在不离开游戏的情况下查找其他用户进行多人对战。Game Center 的默认多人游戏界面可让玩家邀请附近或近期玩家、Game Center 朋友和联系人。你还可以选择在自定义用户界面内呈现多人游戏功能。有关开发者指南，请参阅 [Finding multiple players for a game](https://developer.apple.com/cn/documentation/gamekit/finding-multiple-players-for-a-game)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-multiplayer-in-game-ui@2x.png)

**提供引人入胜的活动插图**。玩家会在整个系统中（如派对码、“游戏” App 或游戏内用户界面中）看到多人游戏活动的预览图像。使用以下规范创建插图。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-multiplayer-anatomy@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/games-multiplayer-image-specs@2x.png)

| 属性 | 值 |
| --- | --- |
| 格式 | JPEG、JPG 或 PNG |
| 色彩空间 | sRGB 或 P3 |
| 分辨率 | 72 DPI（最小值） |
| 图像大小 | 1920x1080 点（3840x2160 个像素 @2x） |
| 裁剪区域 | 1465x767 点（2930x1534 个像素 @2x） |

## 平台考量因素

*无针对 iOS、iPadOS、macOS 或 visionOS 的额外考量因素。*

### Apple tvOS

**在仪表盘顶部显示可选图像**。在 Apple tvOS 的仪表盘中，你可以添加另一张插图来强调游戏的美学风格。使用远观时良好呈现且简单易识别的图像。可考虑为此图像使用游戏标志或字标；但勿使用 App 图标。使用以下规范创建仪表盘图像。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/tvos-dashboard-image@2x.png)

| 属性 | 值 |
| --- | --- |
| 图像大小 | 600x180 点（1200x360 个像素 @2x） |
| 格式 | PNG、TIF 或 JPG |
| 色彩空间 | sRGB 或 P3 |
| 分辨率 | 72 DPI（最小值） |

### watchOS

**注意 Game Center 在 watchOS 上的支持情况**。虽然 GameKit 功能和 API 对 watchOS 游戏可用，但请谨记 watchOS 上没有受系统支持且可调用的 Game Center 用户界面。相反，watchOS 游戏的 Game Center 内容会显示在已连接的 iPhone 上。

## 资源

#### 相关内容

[针对游戏设计](designing-for-games.md)

[游戏控制](game-controls.md)

[Apple 设计资源](https://developer.apple.com/design/resources/#technologies)

#### 开发者文档

[GameKit](https://developer.apple.com/cn/documentation/gamekit)

[Creating activities for your game](https://developer.apple.com/cn/documentation/gamekit/creating-activities-for-your-game)

[Creating engaging challenges from leaderboards](https://developer.apple.com/cn/documentation/gamekit/creating-engaging-challenges-from-leaderboards)

[Create games for Apple platforms](https://developer.apple.com/games/)

[Game Porting Toolkit](https://developer.apple.com/games/game-porting-toolkit/)

#### 视频

- [开始使用 Game Center](https://developer.apple.com/cn/videos/play/wwdc2025/214)
- [通过 Apple Games App 吸引玩家](https://developer.apple.com/cn/videos/play/wwdc2025/215)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 新增了新挑战和多人游戏活动的指南，以及 Apple Games App 和游戏叠层的考量因素。更新了活动预览图像的指南和规范。 |
| 2024 年 2 月 2 日 | 新增了在 visionOS 游戏中使用访问点和仪表盘的开发者指南链接。 |
| 2023 年 9 月 12 日 | 新增了 iOS 成就布局插图。 |
| 2023 年 5 月 2 日 | 已将指南整合为一页。 |
