# ShazamKit

原文：https://developer.apple.com/cn/design/human-interface-guidelines/shazamkit

ShazamKit 通过将音频样本与 ShazamKit 目录或自定义音频目录进行匹配来支持音频识别。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-ShazamKit-intro@2x.png)

你可以使用 ShazamKit 提供的功能包括：

- 使用与当前正在播放的音乐类型对应的图形来优化体验
- 通过提供与音频同步的隐藏式字幕或手语，使有听力障碍的用户能够访问媒体内容
- 在在线学习和零售等环境中，将 App 内体验与虚拟内容同步

如果你需要设备麦克风来获取音频样本以供 App 识别，必须请求访问麦克风。与所有类型的许可请求一样，帮助用户了解请求访问的原因非常重要。有关指南，请参阅[隐私](privacy.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/shazamkit-mic-permission@2x.png)

## 最佳实践

为使用 ShazamKit 的功能获得麦克风访问许可后，请遵循以下指南。

**尽快停止录制**。允许你的 App 录制音频以进行识别后，用户不希望麦克风一直保持开启状态。为了保护隐私，请仅在获取所需样本所需的时间内进行录制。

**让用户选择将 App 识别的歌曲储存到其 iCloud 资料库中**。如果 App 可以将识别的歌曲储存到 iCloud，请让用户首先批准此操作。即使“音乐识别”控制和 Shazam App 都将你的 App 显示为所识别歌曲的来源，但用户希望控制哪些 App 可以在其资料库中储存内容。

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS、visionOS 或 watchOS 的额外考量因素。*

## 资源

#### 开发者文档

[ShazamKit](https://developer.apple.com/cn/documentation/shazamkit)

#### 视频

- [探索 ShazamKit](https://developer.apple.com/cn/videos/play/wwdc2021/10044)
