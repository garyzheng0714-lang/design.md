# 增强现实

原文：https://developer.apple.com/cn/design/human-interface-guidelines/augmented-reality

增强现实简称 AR，可将虚拟对象无缝融入真实世界中，为用户带来引人入胜的沉浸式体验。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-augmented-reality-intro@2x.png)

通过使用设备的摄像头在屏幕上实时呈现现实世界，你的 App 可以叠加三维虚拟对象，从而营造出这些对象实际存在的错觉。根据平台和 App 所提供体验的不同，用户可以重新调整设备的方向，以从不同角度探索对象，使用手势和动作与对象交互，甚至与他人一起加入多用户 AR 体验。有关开发者指南，请参阅 [ARKit](https://developer.apple.com/cn/documentation/arkit)。

**仅在受支持的设备上提供 AR 功能**。如果你 App 的主要用途是 AR，确保仅支持 ARKit 的设备可以使用你的 App。如果 App 包括需要特定 AR 功能的功能，或者 AR 功能在 App 中是可选功能，那么当用户尝试在不支持这些功能的设备上使用这些功能时，不要向其显示错误，而是避免在不受支持的设备上提供该功能。有关开发者指南，请参阅 [Verifying Device Support and User Permission](https://developer.apple.com/cn/documentation/arkit/verifying-device-support-and-user-permission)。

> **注**
>
> 以下指南适用于在 iOS 和 iPadOS 中运行的 App。若要了解有关在 visionOS 中使用 ARKit 创建沉浸式增强现实体验的信息，请参阅 [ARKit](https://developer.apple.com/cn/documentation/arkit)。

## 最佳实践

**让用户使用整个显示屏**。尽可能多地在屏幕上展示现实世界和 App 中的虚拟对象。避免在屏幕上杂乱地放置会削弱沉浸式体验的控制和信息。

**在放置逼真的对象时，力求产生令人信服的错觉**。设计逼真纹理的详细 3D 资源以创建对象，使其看似存在于所处的现实环境之中。利用 ARKit 提供的信息，你可以正确地缩放对象并将其放置在检测到的真实世界表面上，反映环境光照条件并模拟相机颗粒感，在真实世界表面上投射自上而下的漫射对象阴影，以及随着相机位置的变化更新视觉效果。为了避免打破所营造的错觉，确保 App 每秒更新场景 60 次，这样对象就不会出现跳跃或闪烁。

**考虑具有反射表面的虚拟对象如何展示环境**。ARKit 中的反射是基于相机所拍摄环境的近似效果。为了维持 AR 体验真实的这种错觉，首选较小或粗糙的反射表面，此类表面会淡化这些近似效果的影响。

**使用音频和触感反馈来增强沉浸式体验**。音效或碰撞感是确认虚拟对象与物理表面或其他虚拟对象接触的绝佳方式。背景音乐也可以帮助用户沉浸在虚拟世界中。有关指南，请参阅[播放音频](playing-audio.md)和[提供触感反馈](playing-haptics.md)。

**尽量减少环境中的文字**。仅显示用户需要的 App 体验信息。

**如果需要其他信息或控制，考虑将其显示在屏幕空间中**。*屏幕空间*中的内容看起来固定在虚拟世界中或设备屏幕上（不太常见）的特定位置。用户通常很容易在屏幕空间中查找和查看内容，因为当底层 AR 环境随着设备移动时，该内容仍保持静止。

**当需要提供持久性控制时，考虑使用间接控制**。*间接控制*不是虚拟环境的一部分，而是在屏幕空间中显示的 2D 控制。如果用户需要访问 App 中的持久性控制，请考虑放置间接控制，这样用户不必调整握持设备的方式即可访问。此外，考虑在间接控制中使用半透明效果，避免遮挡底层场景。例如，“测距仪” App 使用屏幕空间来显示混合在一起的半透明和不透明控制，供用户用于测量真实世界中的对象。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-measure-carrots@2x.png)

**预计用户会在各种真实环境中使用你的 App**。用户可能会在移动空间有限或者没有大型平面的地方打开你的 App。提前向用户清晰地传达 App 的要求和期望，帮助用户了解现实环境会如何影响其 AR 体验。你还可以考虑提供在不同环境中使用的不同功能集。

**关注用户的舒适度**。长时间以一定的距离或角度握持设备会令人感到疲劳。为避免引起疲劳，请考虑将对象放置在一定距离处，以减少将设备移近对象的需要；在游戏中，考虑使用较短的关卡并融入短暂的停顿时间。

**如果你的 App 鼓励用户移动，请逐渐引入运动**。例如，你可能不想让用户一进入 AR 游戏就开始躲避虚拟射弹。让用户有时间适应 App 中的 AR 体验，然后再逐步鼓励用户移动。

**关注用户的安全**。用户沉浸在 AR 体验中时，不一定会意识到自己的现实环境，因此做出快速、横扫或大幅度的动作可能很危险。考虑让 App 得以安全操作的方式；例如，游戏可以避免鼓励用户做出剧烈或突然的动作。

## 提供指导

在享受 App 中的 AR 体验之前，用户需要移动设备，让 ARKit 评估四周并检测表面。考虑使用内建的指导视图，在初始化过程中向用户展示需要执行的操作并提供反馈。你也可以使用指导视图来帮助用户在 AR 体验被中断（例如，用户短暂地切换到其他 App）后重新初始化 AR，这个过程称为*重定位*。有关重定位的指南，请参阅[处理中断](augmented-reality.md#Handling-interruptions)；有关开发者指南，请参阅 [ARCoachingOverlayView](https://developer.apple.com/cn/documentation/arkit/arcoachingoverlayview)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-coaching-overlay@2x.png)

**在用户使用指导视图时，隐藏不必要的 App 用户界面**。默认情况下，初始化或重定位开始时，指导视图会自动显示，因此应预备隐藏不相关的用户界面，帮助用户专注于指导视图的指示。

**在必要时提供自定义指导体验**。虽然你可以配置系统提供的指导视图来帮助用户提供特定信息（例如，检测水平或垂直平面），但你可能需要其他信息，或希望使用不同的视觉样式。如果要设计自定义指导体验，可使用系统提供的指导视图作为参考。

## 帮助用户放置对象

**向用户展示何时定位表面并放置对象**。你可以使用系统提供的指导视图来帮助用户找到放置对象的水平或垂直平面。ARKit 检测到表面后，你的 App 可以显示一个自定义视觉指示符，以展示何时可以放置对象。通过将指示符与检测到的表面的平面对齐，你可以帮助用户了解所放置对象在环境中的外观。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-app-specific-indicator@2x.png)
*App 特定指示符*

**当用户放置对象时，立即将该对象集成到 AR 环境中**。虽然表面检测可以快速地逐步提高精度，但最好避免在放置对象之前等待更精确的数据。在用户放置对象时，使用可用信息立即做出响应；然后，在完成表面检测后，根据需要优化对象的位置。例如，如果用户将对象放置在检测到的表面边界之外，轻轻将该对象推回到表面上。有关优化对象位置的开发者指南，请参阅 [ARTrackedRaycast](https://developer.apple.com/cn/documentation/arkit/artrackedraycast)。

**考虑引导用户转向屏幕外的虚拟对象**。有时，用户很难找到位于屏幕外的对象。在这种情况下，你可以通过提供视觉或听觉提示来帮助用户找到此类对象。例如，如果某个对象位于屏幕外的左侧，你可以沿屏幕的左侧边缘显示一个指示符，引导用户将相机指向该方向。

**避免尝试将对象与检测到的表面边缘精确对齐**。在 AR 中，表面边界是一个近似效果，可能会随着对用户四周的进一步分析而改变。

**整合平面分类信息以指导对象放置**。例如，只允许用户将虚拟家具放置在分类为“地板”的平面上，或者要求将平面分类为“桌子”，以便放置虚拟游戏板。

## 设计对象交互

**尽可能让用户使用直接操作与对象进行交互**。与在屏幕空间中使用间接控制相比，用户直接触摸屏幕上的 3D 对象进行交互更直观且更具沉浸感。然而，在用户使用 App 时四处走动的情况下，间接控制可以更好地发挥作用。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-user-interaction-direct@2x.png)
*直接操作*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-user-interaction-indirect@2x.png)
*间接控制*

**让用户使用标准且熟悉的手势与虚拟对象进行直接交互**。例如，考虑支持用于移动对象的单指拖动手势和用于旋转对象的双指旋转手势。有关指南，请参阅[手势](gestures.md)。

**通常保持交互的简单性**。触控手势本质上是二维的，但 AR 体验涉及真实世界的三维空间。考虑使用以下方法来简化用户与虚拟对象的交互。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-plane-movement@2x.png)
*将移动限制在对象所处的二维表面上。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-axis-rotation@2x.png)
*将对象的旋转限制在单一轴上。*

**在交互式虚拟对象的合理接近范围内响应手势**。当用户试图触控微小、细薄或相距一定距离的对象上的特定点时，可能很难做到准确无误。当 App 检测到交互式对象附近的手势时，通常最好假设用户想要影响该对象。

**可行时让用户在 App 中发起对象缩放**。例如，如果 App 允许用户在虚拟环境中探索，支持对象缩放可能是有意义的，因为 App 不需要代表真实世界。另一方面，如果 App 可帮助购物者确定要购买的家具，那么让用户对椅子进行缩放并不能帮助其想象椅子在房间里的样子。

> **提示**
>
> 无论 App 的用途是什么，都不要使用缩放来调整对象的距离。如果你放大一个远处的对象以使它看起来更近，结果却是对象被放大了，但它的位置仍然很远。

**警惕潜在的冲突手势**。例如，双指捏合手势类似于双指旋转手势。如果你实施两种类似的手势，务必对 App 进行测试，确保它们能被正确识别。

**尽量使虚拟对象的移动方式与 App AR 环境的物理特性保持一致**。用户不一定期望对象在粗糙或不平坦的表面上平稳地移动，但他们确实希望对象在移动过程中保持可见。力求让移动对象附着在真实世界中的表面上，避免在用户调整对象大小、旋转或移动对象时，导致对象跳动或消失并重新出现。

**探索更具吸引力的交互方式**。手势并不是用户在 AR 中与虚拟对象交互的唯一方式。App 可以使用其他因素（如运动和接近度），使内容更加生动。例如，当用户走向游戏角色时，游戏角色可能会转过头看用户。

## 提供多用户体验

当多人共享 App 的 AR 体验时，每个参与者都会独立地绘制环境地图，ARKit 会自动合并这些地图。有关开发者指南，请参阅 [isCollaborationEnabled](https://developer.apple.com/cn/documentation/arkit/arworldtrackingconfiguration/iscollaborationenabled)。

**考虑允许人物遮挡**。如果 App 支持将虚拟对象放置在设备摄像头画面中出现的人物后方，你可通过让人物遮挡对象来增强真实感。有关开发者指南，请参阅 [Occluding virtual content with people](https://developer.apple.com/cn/documentation/arkit/occluding-virtual-content-with-people)。

**如有可能，让新参与者加入多用户 AR 体验**。除非 App 要求所有参与者在体验开始前加入，否则请考虑隐式地图融合，让新参与者快速加入正在进行的 AR 体验。有关开发者指南，请参阅 [isCollaborationEnabled](https://developer.apple.com/cn/documentation/arkit/arworldtrackingconfiguration/iscollaborationenabled)。

## 对真实世界的对象做出反应

你可以使用真实环境中的已知图像和对象来显示虚拟内容，从而增强 AR 体验。例如，一款识别科幻电影影院海报的 App 可以使虚拟太空飞船从海报中出现并在环境中飞行。另一个例子是用于美术馆的 App，它在识别出雕塑时会呈现一位虚拟导游。为了支持这样的体验，App 需提供一组 2D 参考图像或 3D 参考对象，ARKit 会指示其在当前环境中检测到这些项目的时间和位置。有关开发者指南，请参阅 [Detecting Images in an AR Experience](https://developer.apple.com/cn/documentation/arkit/detecting-images-in-an-ar-experience)。

**当检测到的图像第一次消失时，考虑延迟移除附加在其上的虚拟对象**。ARKit 不会跟踪每个检测到的图像的位置或方向变化。为防止虚拟对象出现闪烁，请考虑在淡出或移除它们之前等待一秒钟。

**限制一次使用的参考图像的数量**。当 ARKit 在真实世界环境中查找 100 张或更少的不同图像时，图像检测性能最佳。如果需要超过 100 张参考图像，可以根据具体环境更改活跃的参考图像集。例如，博物馆指南 App 可能会请求许可，使用定位服务来确定用户所在的博物馆部分，然后仅查找该区域中显示的图像。

**限制需要精确位置的参考图像的数量**。更新参考图像的位置需要更多资源。当图像可能在环境中移动时，或者当附加的动画或虚拟对象与图像大小相比较小时，可以使用跟踪图像。

## 与人交流

**如果必须显示说明性文本，请使用易于理解的术语**。AR 是一个先进的概念，可能会让一些人望而生畏。为了使它易于理解，避免使用 ARKit、世界检测和跟踪等技术术语，而是使用大多数用户都能理解的对话式友好术语。

| 采用 | 勿用 |
| --- | --- |
| 找不到表面。尝试将手机移到一侧或调整位置。 | 找不到平面。调整跟踪。 |
| 轻点一个位置来放置*[要放置的对象名称]*。 | 轻点一个平面以锚定对象。 |
| 尝试打开更多的灯并四处走动。 | 功能不足。 |
| 尝试缓慢地移动手机。 | 检测到动作过多。 |

**在三维环境中，首选 3D 提示**。例如，在对象周围放置 3D 旋转指示符，比在 2D 叠层中显示基于文本的指示更直观。避免在 3D 环境中显示文本叠层提示，除非用户不对上下文提示做出响应。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-3d-hint@2x.png)
*在 3D 环境中首选 3D 提示。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-2d-hint@2x.png)
*如有必要，可在 3D 环境中使用 2D 提示。*

**使重要文本具有可读性**。使用屏幕空间来显示用于关键标签、注解和说明的文本。如果需要在 3D 空间中显示文本，请确保文本面向用户，并且无论文本与标记对象之间的距离如何，都使用相同的字体大小。

**如有必要，请提供获取更多信息的方法**。设计适合 App 体验的视觉指示符，向用户展示其可以通过轻点来获取更多信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-labels@2x.png)
*相机视图*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-popover@2x.png)
*详细信息视图*

## 处理中断

在中断期间，如用户短暂地切换到其他 App 或接听电话时，ARKit 无法跟踪设备的位置和方向。中断结束后，先前放置的虚拟对象很可能出现在真实世界中错误的位置。支持重定位时，ARKit 会尝试使用新信息将这些虚拟对象还原到其在真实世界中的原始位置。有关开发者指南，请参阅 [Managing Session Life Cycle and Tracking Quality](https://developer.apple.com/cn/documentation/arkit/managing-session-life-cycle-and-tracking-quality)。

**考虑使用系统提供的指导视图来帮助用户重定位**。在重定位期间，ARKit 会试图协调其之前的状态与当前环境的新观察结果。为了使这些观察结果更有用，你可以使用指导视图来帮助用户将设备恢复到其之前的位置和方向。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-vertical-orientation@2x.png)

**考虑在重定位期间隐藏先前放置的虚拟对象**。为了避免在重定位期间出现闪烁或其他令人不悦的视觉效果，最好隐藏虚拟对象并在新位置将其重新显示。

**如果 App 同时支持 AR 和非 AR 体验，应尽量减少中断**。避免中断的一种方法是在 AR 体验中嵌入非 AR 体验，这样用户可在无需退出并重新进入 AR 的情况下处理任务。例如，如果 App 通过将家具放置在房间内来帮助用户为购买家具做出决策，你可以让用户在不离开 AR 体验的情况下改变内饰。

**允许用户取消重定位**。如果用户不将设备定向放置在中断前的位置附近，重定位将无限期地继续下去，但不会成功。如果无法成功指导用户恢复会话，请考虑提供一个复位按钮或其他方法来重新启动 AR 体验。

**当前置摄像头无法跟踪人脸超过约半秒时提示**。使用视觉指示符提示摄像头无法再跟踪人脸。如果在这种情况下需要提供文字说明，请尽量使用最少的文字说明。

## 提出问题解决方法

**如果体验不符合用户的期望，让用户还原体验**。不要强迫用户等待情况改善，也不要让用户纠结于对象放置。为其提供重新开始的方法，看看是否有更好的结果。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-sufficient-lighting@2x.png)
*光照充足*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-insufficient-lighting@2x.png)
*光照不足*

**如果出现问题，提出可能的修复方法**。对真实世界环境的分析和表面检测可能会失败或耗时太长，原因有多种：光照不足、表面反射过度、表面没有足够的细节或相机运动过多。如果 App 收到这些问题的通知，请使用直接、友好的语言提供解决问题的建议。

| 问题 | 可能的建议 |
| --- | --- |
| 检测到功能不足。 | 尝试打开更多的灯并四处走动。 |
| 检测到动作过多。 | 尝试将手机移慢一些。 |
| 表面检测耗时太长。 | 尝试四处走动，打开更多的灯，并确保手机对准有足够纹理的表面。 |

## 图标和标记

App 可以在启动基于 ARKit 的体验的控制中显示 AR 图标。你可以在资源中下载此图标。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-glyph@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-glyph-button@2x.png)

**按预期使用 AR 图形**。该图形严格用于启动基于 ARKit 的体验。切勿更改图形（调整其大小和颜色除外），将其用于其他用途，或将其与未使用 ARKit 创建的 AR 体验结合使用。

**保持最小的净间距**。AR 图形周围所需的最小净间距是该图形高度的 10%。不要让其他元素侵入此空间，或以任何方式遮挡该图形。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-glyph-minimum-clear-space@2x.png)

包括产品或其他对象集合的 App 可以使用标记来标识可使用 ARKit 在 AR 中查看的特定项目。例如，销售古董收藏品的 App 可能会使用标记来标记物品，以便用户可以在购买前在家中预览。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-badging@2x.png)

**按预期使用 AR 标记，不要更改它们**。你可以在资源中下载 AR 标记，这些标记有折叠和展开两种形式。仅使用这些图像来标识可以使用 ARKit 在 AR 中查看的产品或其他对象。切勿更改标记，更改其颜色，将其用于其他用途，或将其与未使用 ARKit 创建的 AR 体验结合使用。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-badge-iconandtext@2x.png)
*AR 标记*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-badge-icon@2x.png)
*纯图形 AR 标记*

**相较于纯图形的标记，首选 AR 标记**。通常，在无法容纳 AR 标记的受限空间中使用纯图形的标记。这两种标记在默认大小时均效果不错。

**仅在 App 同时包含可在 AR 中查看的对象和无法在 AR 中查看的对象时才使用标记**。如果 App 中的所有对象都可以在 AR 中查看，就不需要标记。

**保持标记放置的一致性和清晰度**。当标记显示在对象照片的一角时，效果最佳。始终将其放置在同一边角，并确保其足够大以便清晰可见（但不要太大，导致遮挡照片中的重要细节）。

**保持最小的净间距**。AR 标记周围所需的最小净间距是该标记高度的 10%。不允许其他元素侵入此空间，也不允许以任何方式遮挡该标记。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-badge-iconandtext-clear@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/augmented-reality-badge-icon-clear@2x.png)

## 平台考量因素

*无针对 iOS 或 iPadOS 的额外考量因素。在 macOS、Apple tvOS 或 watchOS 中不受支持。*

### visionOS

获得佩戴者[许可](privacy.md#visionOS)后，你可以在你的 visionOS App 中使用 ARKit 检测用户四周的表面，使用用户的手部和手指姿态来确定[自定义手势](gestures.md#Designing-custom-gestures-in-visionOS)，支持将附近的实际物体融入[沉浸式体验](immersive-experiences.md)的交互，等等。有关开发者指南，请参阅 [ARKit](https://developer.apple.com/cn/documentation/arkit)。

[视频](https://developer.apple.com/tutorials/videos/com.apple.HIG/visionos-augmented-reality-meteor.mp4)

## 资源

#### 相关内容

[提供触感反馈](playing-haptics.md)

[手势](gestures.md)

[Apple 设计资源](https://developer.apple.com/design/resources/#ios-apps)

#### 开发者文档

[ARKit](https://developer.apple.com/cn/documentation/arkit)

#### 视频

- [打造更优质的 AR 体验](https://developer.apple.com/cn/videos/play/wwdc2022/10131)
- [探索 ARKit 5](https://developer.apple.com/cn/videos/play/wwdc2021/10073)
