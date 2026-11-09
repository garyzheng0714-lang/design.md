# 同播共享

原文：https://developer.apple.com/cn/design/human-interface-guidelines/shareplay

通过同播共享，无论身处何地，用户都能一起看电影、玩游戏或在白板上速绘，共享精彩体验。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-Share-Play-intro@2x.png)

即使不在同一房间，用户也能在各自设备上使用同播共享一起参与你 App 中的活动。活动是 App 提供的一种可共享体验。系统会确保每位参与者设备上的活动同步，并与 FaceTime 通话或“信息”协同，方便大家在参与活动时进行交流。

活动可以通过不同方式开始：从 App 中的控制、FaceTime 通话或共享链接。系统会让每位参与者在自己的设备上打开你的 App，并邀请尚未安装该 App 的用户从 App Store 下载。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/shareplay-sharing-content-person-one@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/shareplay-sharing-content-person-two@2x.png)

> **注**
>
> 如果你的活动涉及需要购买或订阅的内容，每位参与者都必须拥有自己的副本或订阅。系统会提示无法访问的用户进行下载或订阅。

## 最佳实践

**使用同播共享打造实时体验**。同播共享专为用户在同一时刻共同参与活动而设计。若要同时支持异步协作，即让用户根据各自的时间安排参与，请提供在会话结束后共享或保存活动的方式。例如，用户可使用同播共享实时共同查看和编辑“无边记”看板，并在事后共享链接以便继续协作。有关开发者指南，请参阅：[Adding shared content collaboration to your app](https://developer.apple.com/cn/documentation/sharedwithyou/adding-shared-content-collaboration-to-your-app)。

**设计最契合用户协同场景的体验**。对于观看或浏览等许多活动而言，所有人共享同一视图并看到相同内容十分合理。对于其他活动，若视图能够根据个人角色灵活调整，体验就会更丰富，例如为每位玩家提供独立视角的游戏。

**设计可跨 Apple 平台运行的活动**。用户可能会希望在不同设备上、不同设置下以及通过不同沟通方式与他人共享。打造可良好适应这些差异的灵活体验，让每个人都能参与其中。

**轻松开始共享活动**。。为用户提供清晰易辨的方式开始 App 中的活动，例如包括同播共享符号的按钮。用户还可通过共享表单等系统提供的功能开始。在 visionOS 中，用户可使用窗口栏旁边的“共享”按钮开始活动。有关开发者指南，请参阅：[Presenting SharePlay activities from your app’s UI](https://developer.apple.com/cn/documentation/groupactivities/promoting-shareplay-activities-from-your-apps-ui)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/shareplay-start-activity-button@2x.png)

**让用户顺畅无阻加入活动**。用户加入后，应引导其快速进入共享内容，并避免显示与活动无关的视图。如果用户需要先登录、下载内容或订阅，请在完成后即关闭的视图中引导其操作。对于购买或订阅，可以通过为非订阅用户提供临时访问许可或支持“家人共享”来降低使用门槛。将非必要步骤推迟到更自然的时机再进行。例如，游戏可以让用户立即加入比赛，并在连接后再设置个人资料。

**清晰、简洁地描述活动**。当用户收到邀请时，清晰的描述有助于其快速了解即将参与的活动内容。以电影为例，描述可包括片名、简短摘要和海报图像。请保持描述足够简短，以免发生截断。

**确保用户适应活动变化**。当某个用户的操作会改变所有人的活动时，应协助用户理解其原理。对于媒体，系统可以跨设备协调播放，因此在一个人暂停电影时，所有人都会暂停。对于其他变化，使用 App 内提示来展示每个人的操作。例如，在“无边记”中，参与者的姓名首字母会显示在其创作内容的旁边，从而增强临场感。

**正确使用术语*同播共享***。你可以将*同播共享*用作名词（如在“加入同播共享”中），或在描述界面中操作时用作动词（如“同播共享影片”按钮）。不要将*同播共享*搭配形容词使用。例如，在 visionOS App 中，避免添加*虚拟的*或*空间的*这类词。请勿采用任何变化形式修改术语本身，例如*同播已共享*、*同播和共享*或*同播正在共享*。

## 平台考量因素

*无针对 Apple tvOS 的额外考量因素。在 watchOS 中不受支持。*

### iOS、iPadOS、macOS

**为共享视频提供画中画支持**。让用户即使在设备上处理其他事务时，也能继续一起观看。在 iPhone 和 iPad 上，共享视频可以在画中画窗口中继续播放。在 Mac 上，视频可以在用户想要观看时调至前台的窗口中持续播放。

### visionOS

在 visionOS 中，同播共享为共享活动带来了更深层次的临场感，无论用户是在同一房间内协作、与远方的好友一起玩游戏，还是通过 FaceTime 通话畅聊近况，皆是如此。标准窗口默认可使用“共享”按钮通过屏幕镜像进行共享，你还可以采用同播共享来共享视体窗口和沉浸式内容。

#### 设计共享活动

当用户加入共享活动时，系统会创建*共享环境*，让每个人都能在相同的相对位置体验你的内容。用户可以像内容真实存在于房间中一样进行讨论、指向和交互，这有助于实现真实直观的交互。跨所有人的设备对齐 App 的窗口和视体可让用户确信自己看到的是同一内容。你的 App 需要通过可增强同场感的方式放置 3D 对象、播放声音和支持交互。有关开发者指南，请参阅：[Synchronizing data during a SharePlay activity](https://developer.apple.com/cn/documentation/groupactivities/synchronizing-data-during-a-shareplay-activity)。

**优先从窗口开始你的体验**。在窗口中开始的活动很容易找到，因为用户可以通过轻点窗口栏旁边的“共享”按钮进行共享。然而，对于在沉浸式空间中开始的活动，你需要设计自定义用户界面协助用户开始。有关开发者指南，请参阅：[Implementing SharePlay for immersive spaces in visionOS](https://developer.apple.com/cn/documentation/visionos/implementing-shareplay-for-immersive-spaces-in-visionos)。

**自然地化解冲突**。当用户共享内容时，可能会出现多人同时尝试操作同一对象的情况。如果某个工具或对象一次只能由一人使用，避免显示可让他人实现控制的用户界面，而应让用户可通过言语或手势向群组表示自己有意接替使用。考虑采用简单的规则，例如“以最后一次更改为准”，保持环境的协作性和可预测性。

**将独特视野留给真正需要的时刻**。一般情况下，让视野和沉浸程度保持同步可让用户感到彼此联系紧密。不过在某些情况下，个性化视野可以丰富体验。当用户进入专属沉浸视野时，将其空间自影像替换为联系人照片，以便他人知晓其已暂时离开，并允许大家通过 FaceTime 音频通话继续交流。

**允许处理任务中的用户自主选择是否加入沉浸式体验的变化**。当一位用户更改其沉浸程度时，你的 App 可以让所有人同步切换。首先，检查这一更改是否会打断某人正在进行的操作。如果会，请让其自行选择加入时机，而不是自动将其带入。例如，当用户正在 Apple TV App 中观看电影，并且有人切换至沉浸式环境时，在其他窗口中专注于某项活动的用户会看到一则提示，其中包含就绪后再加入的选项。而其他人则会立即切换。有关指南，请参阅：[沉浸式体验](immersive-experiences.md)。

**让参与者根据个人舒适度和无障碍需求自定义体验**。音量和字幕等设置有助于让用户保持舒适。请确保这些调整对每位参与者独立生效，避免个人更改影响他人。

**让用户能够轻松离开和重新加入**。用户有时需要暂时离开去处理其他事务或与周围环境交互。如果有人退出，请提供可让其快速重新加入的清晰控制。如果 App 提供窗口化活动版本，用户就可以在继续处理多任务的同时，保持共享活动和 FaceTime 音频通话不中断。

#### 自影像

在共享活动中，参与者的显示方式取决于其所使用的设备和所在位置。通过 Apple Vision Pro 远程加入的用户可能以空间自影像方式显示，这种呈现方式能够让其进行眼神交流、做手势、四处移动并与你的内容交互，仿佛大家同处一室。若尚未设置自影像，则会显示联系人照片作为替代。通过 iPhone、iPad、Mac 或 Apple TV 加入的用户则会以二维视频窗口的形式显示。佩戴 Apple Vision Pro 设备的用户身处同一房间时，共享内容会在每个人视野中的同一物理位置呈现，同时他们还能通过透视自然地看到彼此。

**支持未以空间自影像方式呈现的用户**。在共享活动中，并非每个人都会以空间自影像方式显示。用户可能从其他设备加入，而 Apple Vision Pro 用户也可能会关闭自影像，或通过窗口化 FaceTime 通话加入。确保你的活动适配所有这些参与方式。如果你的体验依赖于面部表情或手势交互，请在用户界面中提供替代选项，以便这些参与者能够充分参与。

有关开发者指南，请参阅：[Adding spatial Persona support to an activity](https://developer.apple.com/cn/documentation/groupactivities/adding-spatial-persona-support-to-an-activity) 和 [Configure your visionOS app for sharing with people nearby](https://developer.apple.com/cn/documentation/groupactivities/configure-your-app-for-sharing-with-people-nearby)。

#### 空间模板

*空间模板*会根据参与者进行的共同活动，自动将其合理分布在你的内容周围。系统会基于内容和所选模板，为每位参与者分配专属座位，从而确定其显示位置及朝向。选择最契合当前活动的 [Adopt the spatial template](https://developer.apple.com/documentation/groupactivities/systemcoordinator/configuration-swift.struct/spatialtemplatepreference)，或者如果系统模板均无法满足需求，你还可创建自定义模板。

*并排式模板*非常适合共同浏览或观看内容。该模板将参与者沿曲线依次排列，所有人均面向共享内容。由于参与者彼此不直接相对，这种排列方式减少了非口头交互的需要，使大家的注意力更集中于内容本身。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-shareplay-side-by-side@2x.png)

*围绕式模板*非常适合桌面游戏和其他以内容为中心的体验。该模板将参与者围绕共享内容排成一圈。当内容为 3D 或每位参与者所看到的内容各不相同时，此布局尤为适用，因为每位观众都能从不同角度进行观看。由于参与者面对面，就好像围坐在桌前，这种排列方式鼓励用户进行口头和非口头交互。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-shareplay-surround@2x.png)

*会话式模板*也将参与者围绕某个中心点进行分组，但会将内容沿圆圈边缘放置，而非放在中心位置。由于每个人查看内容的视角都有所不同，可能并非每个人都方便与之交互。如果你的体验更注重用户相聚在一起，同时 App 在后台执行诸如音乐播放这样的任务，可考虑使用会话式排列方式。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/visionos-shareplay-conversational@2x.png)

**将复杂活动拆解为多个阶段**。为活动的每个阶段分别使用专属模板，契合用户当下的操作需求。例如，在游戏中，你可以将一种模板用于选择队伍，将另一种模板用于进行游戏。由于你可以切换模板，因此混合使用系统模板和自定义模板，要比设计单个复杂的自定义模板更为可取。

**让用户发起模板切换**。意外地调换角色或更换座位可能会让人感到无所适从，因此请将模板更改与用户的明确操作相关联。例如，在游戏中，选择队伍可以触发后续的角色和座位调整。

**确保模板流畅切换**。避免频繁切换或需要大幅移动的操作。当确实需要将用户移至不同座位或角色时，应使用淡出淡入效果来缓和此类变化，并提供视觉提示协助用户随后重新适应。

#### 自定义模板

如果系统模板均不适合你的活动，你可以创建自定义模板来定义专属座位排列方式。座位仅适用于在 visionOS 中使用空间自影像的用户，而活动也可包含无需座位即可参与的其他平台用户。有关开发者指南，请参阅：[Building a guessing game for visionOS](https://developer.apple.com/cn/documentation/groupactivities/building-a-guessing-game-for-visionos)。

**考虑处于同一物理空间的用户**。当 Apple Vision Pro 用户同处一室时，其会通过透视而非空间自影像看到彼此。空间模板可以将远程参与者的空间自影像移至座位上，但无法移动实际在场的用户。如果你的活动依赖于特定的位置，请使用位置标记等视觉提示引导用户，就像桌面游戏通过标识指引每位玩家入座一样。有关开发者指南，请参阅：[Configure your visionOS app for sharing with people nearby](https://developer.apple.com/cn/documentation/groupactivities/configure-your-app-for-sharing-with-people-nearby)。

**为你的内容提供最佳座位朝向**。默认情况下，座位会朝向内容中心，但你可以完全控制座位方向。有关开发者指南，请参阅：[SpatialTemplateSeatElement](https://developer.apple.com/cn/documentation/groupactivities/spatialtemplateseatelement)。

**支持最多座位数**。Apple Vision Pro 在单个活动中最多支持五个空间自影像，因此只要活动允许，就应包含五个座位。随着用户的来去而增减座位可能会令人感到困惑，因此，请预先定义好所有座位，并在有人离开后保留原座位，以便新加入者能立即入座。如果你的活动有参与者人数限制（例如双人游戏），请考虑包含观众席，让其他人可以观看和交流。

**座位间隔至少一米**。这样既能为用户提供充足的空间进行舒适互动，又不会显得拥挤。用户依然可以通过握手或击掌等手势进行交流，但如果空间自影像彼此靠得太近，就会被替换为联系人照片，这会破坏临场感。

**定义用户入座的顺序**。设置自定义模板后，你指定的座位将按照每个人加入的先后顺序进行分配。请合理安排座位顺序，确保未满座时整体布局依然均衡；例如，若按从左到右的顺序安排座位，在只有少数人入座时可能会显得不够平衡。

**保持角色和座位相互独立**。不要将 App 中的角色（如玩家、观众或队伍成员）与座位分配绑定。角色需要适用于活动中的每个用户，包括没有座位的用户。允许用户选择空位入座，以便无需等待即可加入。仅为确实有需要的角色保留特定位置，例如坐在桌首的游戏主持人。有关开发者指南，请参阅：[isSpatial](https://developer.apple.com/cn/documentation/groupactivities/systemcoordinator/participantstate/isspatial) 和 [isNearbyWithLocalParticipant](https://developer.apple.com/cn/documentation/groupactivities/participant/isnearbywithlocalparticipant)。

## 资源

#### 开发者文档

[Group Activities](https://developer.apple.com/cn/documentation/groupactivities)

#### 视频

- [与附近用户共享 visionOS 体验](https://developer.apple.com/cn/videos/play/wwdc2025/318)
- [设计空间同播共享体验 ](https://developer.apple.com/cn/videos/play/wwdc2023/10075)
- [将同播共享添加到你的 App 中](https://developer.apple.com/cn/videos/play/wwdc2023/10239)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2026 年 9 月 9 日 | 重新整理了最佳实践，扩展了 visionOS 指南，以及新增了自定义模板部分。 |
| 2023 年 12 月 5 日 | 新增了 visionOS 的插图。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
| 2022 年 12 月 19 日 | 阐明了帮助非订阅者加入群组活动的指南。 |
