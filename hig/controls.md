# 控制

原文：https://developer.apple.com/cn/design/human-interface-guidelines/controls

控制可让用户从控制中心、锁屏或操作按钮快速访问 App 功能。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-controls-intro@2x.png)

控制以按钮或开关形式出现，可让用户从系统其他区域快速访问 App 功能。控制按钮可执行操作、关联至 App 特定区域，或启动[锁定设备上的相机体验](controls.md#Camera-experiences-on-a-locked-device)。控制开关在两种状态间切换，例如打开和关闭。

用户可以按住控制中心空白区域将控制添加到控制中心、自定义锁屏将控制添加到锁屏，以及在“设置” App 中配置操作按钮将控制添加到操作按钮。

## 剖析

控制可包含符号图像、标题和值（可选）。符号直观表示控制功能，可以是 [SF 符号](sf-symbols.md)，也可以是自定义符号。标题描述控制与什么相关，值表示控制的状态。例如，标题可显示房间中灯的名称，而值可显示灯处于打开还是关闭状态。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/control-medium-anatomy@2x.png)

控制基于其出现位置以不同方式显示信息。

- 在控制中心内，控制会以较大尺寸显示其符号、标题和值。
- 在锁屏上，控制会显示其符号。
- 在 iPhone 设备上，当控制分配到操作按钮时，按住控制会在灵动岛中显示控制符号及其值（若有）。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/control-control-center@2x.png)
*控制中心内的控制开关*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/control-lock-screen@2x.png)
*锁屏上的控制开关*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/control-dynamic-island@2x.png)
*灵动岛中从操作按钮执行的控制开关*

## 最佳实践

**为最有益的操作提供控制，而无需启动 App**。例如，从控制启动实时活动可形成轻松、无缝的使用体验，让用户无需导览至 App 获取更新，即可得知当前进度。有关指南，请参阅[实时活动](live-activities.md)。

**当用户与控制交互和操作完成时更新控制，或通过推送通知远程更新**。更新控制内容以准确反映状态并显示操作是否仍在进行中。

**选取传达控制行为的描述性符号**。取决于用户将控制添加到的位置，控制可能不会显示标题和值，因此符号需要充分体现有关控制操作的信息。对于控制开关，提供表示打开和关闭状态的符号。例如，使用 `door.garage.open` 和 `door.garage.closed` SF 符号表示打开和关闭车库门的控制。有关指南，请参阅 [SF 符号](sf-symbols.md)。

**使用符号动画高亮标记状态更改**。对于控制开关，为打开和关闭状态之间的过渡添加动画。对于包含时长操作的控制按钮，在操作执行时使用无限时动画，在操作完成时停止动画。有关开发者指南，请参阅 [Symbols](https://developer.apple.com/cn/documentation/symbols) 和 [SymbolEffect](https://developer.apple.com/cn/documentation/symbols/symboleffect)。

**选择与 App 品牌契合的色调**。系统会将此色调应用至处于打开状态的控制开关符号。用户使用操作按钮执行控制操作时，系统也会使用此色调在灵动岛中显示值和符号。有关指南，请参阅[品牌](branding.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/control-lightbulb-not-tinted@2x.png)
*处于关闭状态的未着色控制开关*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/control-lightbulb-tinted@2x.png)
*处于打开状态的着色控制开关*

**帮助用户提供系统执行操作所需的额外信息**。用户可能需要配置控制执行预期操作，例如，选择屋内要开关的特定灯。如果控制需要配置，请在用户首次添加时提示其完成此步骤。用户可随时重新配置控制。有关开发者指南，请参阅 [promptsForUserConfiguration()](https://developer.apple.com/cn/documentation/swiftui/controlwidgetconfiguration/promptsforuserconfiguration())。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/control-configuration-options@2x.png)

**为操作按钮提供提示文本**。用户按下操作按钮时，系统会显示提示文本，帮助用户了解按住时将执行的操作。用户按住操作按钮时，系统会执行所配置的操作。使用动词构建提示文本。有关开发者指南，请参阅 [controlWidgetActionHint(_:)](https://developer.apple.com/cn/documentation/swiftui/view/controlwidgetactionhint(_:)-5yoyh)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/controls-action-button-coaching-text-on@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/controls-action-button-coaching-text-off@2x.png)

**如果控制标题或值可能变化，请包括占位符**。当标题和值基于上下文时，占位符信息可告知用户控制执行的操作。当用户调出控制中心或锁屏中的控制库并选取控制，或者将控制分配给操作按钮时，系统会显示此类信息。

**设备锁定时，隐藏敏感信息**。设备锁定时，考虑让系统编校标题和值以隐藏个人信息或安全性相关信息。指定系统是否还需要编校符号状态。如果指定，系统会编校标题和值，并显示处于关闭状态的符号。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/control-regular-text@2x.png)
*未隐藏信息的控制开关*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/control-redacted-text@2x.png)
*在锁定设备上隐藏信息的控制开关*

**对影响安全的操作要求认证**。例如，要求用户解锁设备才能访问锁门、开门或启动车辆的控制。有关开发者指南，请参阅 [IntentAuthenticationPolicy](https://developer.apple.com/cn/documentation/appintents/intentauthenticationpolicy)。

## 锁定设备上的相机体验

如果 App 支持相机拍摄，从 iOS 18 开始，你可以创建在设备锁定时直接启动进入 App 相机体验的控制。对于拍摄外的其他任务，用户必须认证并解锁设备才能在 App 中完成任务。有关开发者指南，请参阅 [LockedCameraCapture](https://developer.apple.com/cn/documentation/lockedcameracapture)。

**在 App 和相机体验中使用相同的相机用户界面**。共享用户界面会充分利用用户对 App 的熟悉程度。通过使用相同用户界面，当用户拍摄内容并轻点按钮执行额外任务（例如发布到社交网络或编辑照片）时，可无缝过渡到 App。

**为添加控制提供说明**。帮助用户了解如何添加启动此相机体验的控制。

## 平台考量因素

*无针对 iOS、iPadOS 或 macOS 的额外考量因素。在 watchOS、Apple tvOS 或 visionOS 中不受支持。*

## 资源

#### 相关内容

[小组件](widgets.md)

[操作按钮](action-button.md)

#### 开发者文档

[LockedCameraCapture](https://developer.apple.com/cn/documentation/lockedcameracapture)

[WidgetKit](https://developer.apple.com/cn/documentation/widgetkit)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 6 月 10 日 | 新页面。 |
