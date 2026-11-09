# 播放视频

原文：https://developer.apple.com/cn/design/human-interface-guidelines/playing-video

无论使用 App 还是游戏，用户都期待在设备上享受丰富的视频体验。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-playing-video-intro@2x.png)

系统为你提供了视频播放器，用于在 iOS、iPadOS、macOS、Apple tvOS 和 visionOS 中的 App 或游戏内嵌入播放体验。你还可以在这些平台中通过“视频” App 提供你的内容，让用户获得便捷且一致的观看体验。

系统提供的视频播放器支持不同宽高比的播放模式以及适用于大多数平台的画中画 (PiP) 观看模式。尽管用户可在播放过程中切换模式，系统还会默认基于视频的宽高比选择以下其中一种播放模式：

- 在全屏幕（或*宽高比填充*）模式中，视频会缩放以填充屏幕，并可能会发生部分边缘修剪。此模式默认用于宽屏视频（2:1 至 2.40:1）。有关开发者指南，请参阅 [resizeAspectFill](https://developer.apple.com/cn/documentation/avfoundation/avlayervideogravity/resizeaspectfill)。
- 在适合屏幕（或*宽高比*）模式中，屏幕上会显示整个视频，并根据需要使用信箱模式或邮筒模式。此模式默认用于标准视频（4:3、16:9 以及任何低于 2:1 的宽高比）和超宽视频（任何高于 2.40:1 的宽高比）。有关开发者指南，请参阅 [resizeAspect](https://developer.apple.com/cn/documentation/avfoundation/avlayervideogravity/resizeaspect)。

在 visionOS 和 Apple tvOS 中，内建视频播放器还会提供*走带控制*，让用户可执行播放任务（例如，打开字幕或更改音频语言）和操作（例如，将节目添加到资料库或收藏片段）。在走带控制下方，视频播放器显示*内容标签*（例如“简介”、“单集”或“章节”），可提供支持的信息，并有助于简化导航。在 visionOS 中，走带控制显示为[挂饰](ornaments.md)。

## 最佳实践

**使用系统视频播放器，让用户获得熟悉且便捷的体验**。内建的视频播放器提供出色的视频播放体验，具备一致的交互方式和行为，可让用户专注于享受沉浸式内容。如果你的 App 确实需要自定义视频播放器，请参考系统视频播放器的行为和界面，有助于你提供可让用户立即理解的使用体验。自定义体验与系统提供的体验之间的轻微差异也可能会造成挫败感，因为用户不知道能够继续使用哪些惯用交互。

**始终以原始宽高比显示视频内容**。当视频内容使用嵌入的信箱模式或邮筒模式内边距来符合特定的宽高比时，系统可能无法正确地基于当前播放模式来缩放视频。嵌入视频帧内的内边距可能导致视频在全屏幕模式和适合屏幕模式中显示得更小。内边距还会妨碍视频在边到边、非全屏幕（如 iPad 上的画中画模式）环境中正确显示。

以下是在 iPhone Xs 上展示内边距可如何影响视频显示的一些示例。

**为 4:3 视频添加内边距的结果**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/video-fill-4-3-right@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)
*全屏幕观看模式下的 4:3 视频*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/video-fill-4-3-wrong@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*全屏幕观看模式下已嵌入内边距的 4:3 视频*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/legend-letter-pillar@2x.png)

**为 21:9 视频添加内边距的结果**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/video-fit-21-9-right@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)
*适合屏幕观看模式下的 21:9 视频*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/video-fit-21-9-wrong@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)
*适合屏幕观看模式下已嵌入内边距的 21:9 视频*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/legend-letter-pillar@2x.png)

**提供有益的额外信息**。在 iOS、iPadOS、Apple tvOS 和 visionOS 中，你可以通过提供图像、标题、描述及其他有用信息，来自定义视频的额外信息。一般情况下，请限制此类内容以免遮挡媒体播放。有关开发者指南，请参阅 [externalMetadata](https://developer.apple.com/cn/documentation/avfoundation/avplayeritem/externalmetadata)。

**无论用户使用哪种输入设备控制播放，都要支持用户期望的交互方式**。例如，在 Apple Vision Pro、Mac、iPhone、iPad 和 Apple TV 上，用户期望按下相连键盘上的空格键即可播放或暂停媒体播放。同样，用户期待在 Apple TV Remote 上使用熟悉、直观的手势即可在 Apple TV 上的媒体间移动。有关指南，请参阅“键盘和遥控器”。

**如果用户需要在你的 Apple tvOS App 中访问播放选项或内容特定的信息，请考虑添加走带控制或自定义内容标签**。用户通常会在观看视频时打开走带控制或内容标签，因此只提供最有用的操作和信息至关重要。确保操作不超过一两个步骤，并且内容简洁明了，从而帮助用户快速回到观看体验。使用走带控制支持收藏视频等播放相关操作；使用自定义内容标签显示补充信息或推荐内容。

**当观看者切换不同模式时，要避免不同来源的音频相混合**。音频混合会为用户带来不愉快和糟糕的体验。一般情况下，当至少有一个音频源未能正确处理次要音频时，音频会发生混合。以下是一个典型场景：观看全屏视频时，观看者将视频移到画中画窗口中，系统自动将视频静音。在全屏幕窗口中，观看者开始玩会播放背景音乐的游戏，然后切换到画中画窗口并将视频取消静音。如果游戏无法妥善处理次要音频，则游戏音频会与来自静音视频的音频相混合。有关开发者指南，请参阅 [silenceSecondaryAudioHintNotification](https://developer.apple.com/cn/documentation/avfaudio/avaudiosession/silencesecondaryaudiohintnotification)。

## 与“视频” App 整合

“视频” App 为整个系统中的收藏、最近播放和推荐视频内容提供了全局访问。当用户针对你 App 中的内容发起播放时，“视频” App 会自动打开你的 App 并过渡到该内容。按照以下指南来让“视频” App 体验融入并成为你 App 中的一部分。

**确保可流畅过渡到你的 App**。过渡到你的 App 时，“视频” App 会逐渐变为黑色，并且不会显示你 App 的启动屏幕。请先立即在你 App 中显示黑色界面，之后开始播放或继续播放内容，从而在此过渡中维持视觉连续性。

**立即显示预期的内容**。用户期待在过渡到你的 App 后立即开始播放所选内容，尤其是要继续播放时。直接从你 App 的黑色界面跳到内容中，并避免显示启动画面、详细信息画面、前导动画或任何会拖延播放内容的其他障碍。在特殊情况下，若你必须要在所选媒体播放前显示插播式元素，用户可选取“选择”以逐步通过该元素，也可选取“播放”以跳过插播式内容并开始播放。

**避免询问用户是否想要继续播放**。如果播放可以继续，请自动执行而无需提示确认。

**在用户按下相连蓝牙键盘上的空格键时即播放或暂停播放**。无论用户使用哪种键盘，按下空格键来控制媒体播放都是他们所期待的交互方式。

**确保针对正确的观看者播放内容**。如果你的 App 支持多个用户个人资料，“视频” App 可在发出播放请求时指定某一个人资料。让你的 App 自动切换到此个人资料后才开始播放。如果播放请求无法指定个人资料，请在播放开始前让观看者进行选取，以便在后续可使用此信息。

**在继续播放长视频片段时，使用先前结束观看的时间点**。从先前的停止点继续播放，可让用户快速跟上中断的内容。

### 加载内容

**尽可能避免显示加载屏幕**。如果内容可快速加载，则无需显示加载屏幕。但如果需要 2 秒以上才能加载，请考虑显示一个中间有活动旋转器且周围无其他内容的黑色加载屏幕。

**立即开始播放**。如果必须显示加载屏幕，请在加载的内容足以开始播放时停止显示，并在后台继续加载剩下的内容。

**尽量减少加载屏幕的内容**。如果你的加载屏幕上包括了品牌或图像，请尽量减少相关内容，同时保持使用黑色背景，从而有助于无缝过渡到播放。

### 退出播放

退出播放后，用户会留在你的 App 中，而非返回到“视频” App，这有助于避免让用户感到混乱。

**根据环境显示关联的屏幕**。在退出播放时，显示观看者刚才所看内容的详细信息视图，并在其中包括可用于继续播放的选项。如果详细信息视图不可用，请显示列有此内容的菜单或你 App 的主菜单。

**对立即退出有所准备**。在收到播放通知后尽快准备好退出视图，这样即使用户要在播放开始后立即退出，该视图也已准备好显示。

## 平台考量因素

*无针对 iOS、iPadOS 或 macOS 的额外考量因素。*

### Apple tvOS

**在视频上方显示标志或非交互式叠层时要遵循内容**。你的视频可能需要一个小而低调的标志或倒数计时器，不过要避免会分散注意力且不会优化观看体验的大叠层。此外还要注意，某些设备易受图像残留影响，因此一般最好精简叠层，并优先使用标准动态范围 (SDR) 的半透明图形，而非亮色的不透明内容。

**妥善显示交互式叠层**。某些视频会显示交互式叠层，例如问卷、调查和进度签到。为提供最佳用户体验，请应用 0.5 秒最小延迟来暂停播放媒体，然后显示交互式叠层。为用户提供明确的方式，以在完成交互后关闭叠层并继续媒体播放。

### visionOS

**在 App 中播放视频时，帮助用户保持舒适**。App 通常不会控制其中播放的视频内容，但是你可以通过以下方式帮助用户保持舒适：

- 让用户选择何时开始播放视频
- 为播放使用小窗口，让用户根据需要调整其大小
- 确保用户在播放期间可看到四周

**在全沉浸式体验中，避免让虚拟内容遮挡播放或走带控制**。在全沉浸式环境中，系统自动将视频播放器放在提供最优观看体验的可预测位置。使用此位置来帮助确保任何虚拟内容都不会遮挡播放器底部附近挂饰中的默认播放或走带控制。

**避免自动开始全沉浸式视频播放体验**。用户需要控制自己的体验，他们不太希望在没有警告的情况下启动进入全沉浸式视频播放体验。

**如果想要支持左右滑动，请创建缩略图轨道**。当用户左右滑动至视频中的不同时间时，系统会显示缩略图以帮助其选择想要的部分。为了提高性能，请提供一组宽度均为 160 个像素的缩略图。有关开发者指南，请参阅 [HTTP Live Streaming (HLS) Authoring Specification for Apple Devices > Trick Play](https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices#Trick-Play)。

**避免展开内联视频播放器来填充窗口**。当你在窗口中显示系统提供的播放器视图时，播放控制会显示在与播放器视图相同的平面中，而不会显示在悬浮于窗口上方的挂饰中。内联视频需要为 2D，且你需要确保播放器周围的窗口内容保持可见，这样用户便不会期待更沉浸的播放体验。有关开发者指南，请参阅 [AVPlayerViewController](https://developer.apple.com/cn/documentation/avkit/avplayerviewcontroller)。

**如果需要在启动画面这样的视图或过渡视图中播放视频，请使用 RealityKit 视频播放器**。在类似这样的情况下，用户通常期望视频将其带入下一阶段体验，因此无需使用播放控制或系统提供的融合方法，例如调暗和视图锚定。RealityKit 视频播放器会自动为 2D 和 3D 视频使用正确的宽高比并支持隐藏式字幕。RealityKit 还可帮助你将视频作为特殊效果在自定义视图或对象的表面播放。有关开发者指南，请参阅 [RealityKit](https://developer.apple.com/cn/documentation/realitykit)。

### watchOS

在 watchOS 中，视频播放由系统管理。App 处于活跃状态且在前台运行时可播放短视频片段。你可以使用影片元素将片段嵌入到你的界面中并以内联方式播放视频，也可以在单独界面中播放片段。有关开发者指南，请参阅 [VideoPlayer](https://developer.apple.com/cn/documentation/avkit/videoplayer)。

**精简视频片段**。优先使用不超过 30 秒的较短片段。长片段会占用更多磁盘空间，且需要用户保持抬腕较长时间，可能会造成疲劳。

**为媒体资源使用推荐的大小和编码值**。尤其要避免缩放视频片段，这会影响性能并导致显示效果不够理想。以下表格列出了用于视频资源的推荐编码值和分辨率值。音频编码值适用于影片资源和纯音频资源。

| 属性 | 值 |
| --- | --- |
| 视频编解码器 | H.264 高级描述文件 |
| 视频位速率 | 160 kbps，最高 30 fps |
| 分辨率（全屏幕） | 208x260 个像素（竖屏） |
| 分辨率 (16:9) | 320x180 个像素（横屏） |
| 音频 | 64 kbps HE-AAC |

**避免让创造的海报图看起来像系统控制**。你想让用户了解可轻点影片元素进行播放，而不是想让他们因影片元素看起来像其他项目而感到困惑。

**考虑让创造的海报图代表视频片段内容**。当用户轻点海报图时，系统会使用视频替代图像并以内联方式开始播放。相关的海报图可帮助用户更好地决定是否要观看该视频。一般避免创造与内容毫无联系的海报图，或是可能让用户错认成控制的海报图。

## 资源

#### 相关内容

[播放音频](playing-audio.md)

[反馈](feedback.md)

#### 开发者文档

[Configuring your app for media playback](https://developer.apple.com/cn/documentation/avfoundation/configuring-your-app-for-media-playback) — AVFoundation

[AVKit](https://developer.apple.com/cn/documentation/avkit)

[HTTP Live Streaming](https://developer.apple.com/streaming/)

#### 视频

- [打造出色的视频播放体验](https://developer.apple.com/cn/videos/play/wwdc2022/10147)
- [探索 visionOS 的视频体验](https://developer.apple.com/cn/videos/play/wwdc2025/304)
- [在 Apple tvOS 上提供出色的播放体验](https://developer.apple.com/cn/videos/play/wwdc2021/10191)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 9 月 12 日 | 更正了 visionOS 中缩略图的推荐宽度。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
