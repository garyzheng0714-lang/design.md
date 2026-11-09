# 实况照片

原文：https://developer.apple.com/cn/design/human-interface-guidelines/live-photos

实况照片可让用户在声音和动作丰富的互动体验中捕捉美好瞬间，为传统的静态照片增添活力感。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-Live-Photos-intro@2x.png)

当实况照片可用时，“相机” App 可在用户拍照之前和之后捕捉附加内容，包括音频和额外的帧。用户按压实况照片即可看到栩栩如生的画面。

## 最佳实践

**对所有帧应用调整**。如果你的 App 可让用户对实况照片应用效果或调整，请确保对整张照片应用这些更改。如果不支持此功能，可让用户选择将实况照片转换为静态照片。

**保持实况照片内容完整**。在所有 App 中使用相同的视觉处理方式和交互模式，从而为用户带来一致的实况照片体验，这一点十分重要。不要分解实况照片并单独呈现其帧或音频。

**打造卓越的照片共享体验**。如果 App 支持照片共享，让用户在决定共享之前预览实况照片的全部内容。始终提供将实况照片作为传统照片共享的选项。

**清楚地指明何时在下载实况照片和何时可播放照片**。在下载过程中显示进度指示符，并在下载完成后提供某些指示。

**在不支持实况照片的环境中，将实况照片显示为传统照片**。不要试图复制受支持环境中提供的实况照片体验。相反，显示一张传统的静态形式照片。

**力求可轻松区分实况照片和静态照片**。最好通过提示移动来识别实况照片。由于没有内建的实况照片运动效果，如在“照片” App 的全屏浏览器中轻扫照片时出现的效果，你需要设计和实现自定义运动效果。

在无法移动的情况下，于照片上方显示系统提供的标记，无论是否包含文本。绝不要包括查看者可理解为视频播放按钮的播放按钮。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-photo-badge-with-text@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/live-photo-badge@2x.png)

**力求一致地放置标记**。如果显示标记，请将其放在每张照片上的相同位置。通常，将标记放在照片一角看起来最为美观。

## 平台考量因素

*无针对 iOS、iPadOS、macOS 或 Apple tvOS 的额外考量因素。在 watchOS 中不受支持。*

### visionOS

在 visionOS 中，用户可查看实况照片，但不能进行拍摄。

## 资源

#### 开发者文档

[PHLivePhoto](https://developer.apple.com/cn/documentation/photos/phlivephoto) — PhotoKit

[LivePhotosKit JS](https://developer.apple.com/cn/documentation/livephotoskitjs) — LivePhotosKit JS

#### 视频

- [相机拍摄的新功能](https://developer.apple.com/cn/videos/play/wwdc2021/10047)
