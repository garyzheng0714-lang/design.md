# 图标

原文：https://developer.apple.com/cn/design/human-interface-guidelines/icons

作为图形资源的有效图标能以用户立即理解的方式表达单个概念。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/foundations-icons-intro@2x.png)

App 和游戏使用各种简单图标帮助用户理解其可选取的项目、操作和模式。*界面图标*与 [App 图标](app-icons.md)不同，后者可使用阴影、纹理、高亮标记等丰富的视觉细节来打造 App 的特色，前者通常使用精简形状和适量颜色来直截了当地传达意图。

你可以设计界面图标（也称为*字形*），还可以从 SF 符号 App 中选取符号，直接照搬使用或根据需要进行自定义。界面图标和符号均使用黑色和明显的颜色来定义其形状，系统可在每个图像的黑色区域中应用其他颜色。有关指南，请参阅 [SF 符号](sf-symbols.md)。

## 最佳实践

**打造可识别且高度精简的设计**。细节过多可能会导致界面图标混乱或难以理解。尽量使用简单且通用的设计，让大多数用户可快速识别。一般情况下，当图标使用熟悉的视觉隐喻来直接反映其所发起的操作或所代表的内容时，效果最佳。

**保持 App 中所有界面图标间的视觉一致性**。无论仅使用自定义图标还是将自定义图标和系统提供的图标混合使用，你 App 中的所有界面图标都需要在大小、细节程度、线条粗细和透视上保持一致。根据图标的视重，你可能需要调整其尺寸以确保其在视觉上与其他图标显示一致。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/custom-icon-sizes@2x.png)
*为了帮助实现视觉一致性，可根据需要调整单个图标的大小…*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/custom-icon-line-weights@2x.png)
*…并使每个图标中的线条粗细相同。*

**通常使界面图标与相邻文本在线条粗细上相一致**。在这两者中使用粗细相同的线条可让内容在外观和强调程度上保持一致，除非你想要强调图标或文本。

**如有必要，可为自定义界面图标添加内边距以实现视觉对齐**。某些图标（尤其是非对称图标）按几何图形（而非按视觉效果）居中时可能会看起来不平衡。例如，下方所示下载图标的底部视重比顶部视重更大，因此如果该图标按几何图形居中，看上去会很低。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/asymmetric-glyph@2x.png)
*非对称图标可能会看似偏离中心，即使实则不然。*

在此类情况下，你可以稍微调整图标的位置，使其在视觉上达到居中。当创建的资源通过在界面图标周围添加内边距的方式调整（如下方右图所示）后，你可以按几何图形居中该资源，从而在视觉上居中该图标。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/asymmetric-glyph-optically-centered@2x.png)
*将图标移高几个像素可使其在视觉上居中；将额外像素包括在内边距中可让居中更简单。*

在视觉上居中所需的调整通常非常小，但却对 App 的外观影响很大。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/asymmetric-glyph-before-and-after@2x.png)
*视觉上居中之前（左）与视觉上居中之后（右）。*

**仅在必要时才提供界面图标的已选状态版本**。你无需为标准系统组件（如工具栏、标签页栏和按钮）中所用的图标提供已选和未选外观。系统会自动更新已选状态的视觉外观。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-selection-correct@2x.png)
*在工具栏中，已选图标会应用 App 的强调色。*

**使用包容性图像**。考虑如何让你的图标可被广大用户理解和接纳。优先描绘中性的人物形象，避免使用在不同文化或语言中难以理解的图像。有关指南，请参阅[包容性](inclusion.md)。

**在设计中仅包括对表达含义必要的文本**。例如，在代表文本格式化的界面图标中使用字符可能是最直接传达概念的方式。如果需要在图标中显示单个字符，请确保将其本地化。如果需要表明一段文本，请在设计中使用抽象表示，并包括图标的翻转版本以适用于从右到左的阅读环境。有关指南，请参阅[从右到左](right-to-left.md)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/character-in-glyph@2x.png)
*为显示单个字符的图标创建本地化版本。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/abstract-text-in-glyph@2x.png)

**如果创建自定义的界面图标，请使用 PDF 或 SVG 等矢量格式**。系统为高分辨率显示器自动缩放基于矢量的界面图标，因此无需提供高分辨率版本。相反，用于 App 图标和包括阴影、纹理和高亮标记等效果的其他图像的 PNG 则不支持缩放，因此必须为每个基于 PNG 的界面图标提供多个版本。或者，你可以创建自定义的 SF 符号并指定比例，以确保符号的重点与相邻文本相匹配。有关指南，请参阅 [SF 符号](sf-symbols.md)。

**为自定义的界面图标提供备选文本标签**。备选文本标签（或无障碍描述）是不可见的，但可让“旁白”以语音方式描述屏幕内容，从而使视障用户的导览更简单。有关指南，请参阅[旁白](voiceover.md)。

**避免使用 Apple 硬件产品的模型**。硬件设计往往会频繁变化，可能会使界面图标和其他内容显得过时。如果必须显示 Apple 硬件，请仅使用 [Apple 设计资源](https://developer.apple.com/design/resources/)中的可用图像或代表各种 Apple 产品的 SF 符号。

## 标准图标

对于[菜单](menus.md)、[工具栏](toolbars.md)、[按钮](buttons.md)和 Apple 平台界面其他位置中表示常用操作的图标，你可以使用这些 [SF 符号](sf-symbols.md)。

### 编辑

| 操作 | 图标 | 符号名称 |
| --- | --- | --- |
| 剪切 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-cut@2x.png) | `scissors` |
| 拷贝 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-copy@2x.png) | `document.on.document` |
| 粘贴 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-paste@2x.png) | `document.on.clipboard` |
| 完成 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-done-save@2x.png) | `checkmark ` |
| 保存 |  |  |
| 取消 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-close-cancel@2x.png) | `xmark` |
| 关闭 |  |  |
| 删除 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-delete@2x.png) | `trash` |
| 撤销 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-undo@2x.png) | `arrow.uturn.backward` |
| 重做 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-redo@2x.png) | `arrow.uturn.forward` |
| 编写 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-compose@2x.png) | `square.and.pencil` |
| 复制 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-duplicate@2x.png) | `plus.square.on.square` |
| 重新命名 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-rename@2x.png) | `pencil` |
| 移到 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-move-to-folder@2x.png) | `folder` |
| 文件夹 |  |  |
| 附上 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-attach@2x.png) | `paperclip` |
| 添加 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-add@2x.png) | `plus` |
| 更多 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-more@2x.png) | `ellipsis` |

### 选择

| 操作 | 图标 | 符号名称 |
| --- | --- | --- |
| 选择 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-select-all@2x.png) | `checkmark.circle` |
| 取消选择 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-deselect-close@2x.png) | `xmark` |
| 关闭 |  |  |
| 删除 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-delete@2x.png) | `trash` |

### 文本格式化

| 操作 | 图标 | 符号名称 |
| --- | --- | --- |
| 上标 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-superscript@2x.png) | `textformat.superscript` |
| 下标 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-subscript@2x.png) | `textformat.subscript` |
| 粗体 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-bold@2x.png) | `bold` |
| 斜体 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-italic@2x.png) | `italic` |
| 下划线 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-underline@2x.png) | `underline` |
| 左对齐 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-align-left@2x.png) | `text.alignleft` |
| 居中 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-align-center@2x.png) | `text.aligncenter` |
| 两端对齐 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-align-justified@2x.png) | `text.justify` |
| 右对齐 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-align-right@2x.png) | `text.alignright` |

### 搜索

| 操作 | 图标 | 符号名称 |
| --- | --- | --- |
| 搜索 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-search@2x.png) | `magnifyingglass` |
| 查找 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-find@2x.png) | `text.page.badge.magnifyingglass` |
| 查找并替换 |  |  |
| 查找下一个 |  |  |
| 查找上一个 |  |  |
| 用所选内容查找 |  |  |
| 过滤 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-filter@2x.png) | `line.3.horizontal.decrease` |

### 共享和导出

| 操作 | 图标 | 符号名称 |
| --- | --- | --- |
| 共享 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-sharing@2x.png) | `square.and.arrow.up` |
| 导出 |  |  |
| 打印 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-print@2x.png) | `printer` |

### 用户和账户

| 操作 | 图标 | 符号名称 |
| --- | --- | --- |
| 账户 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-account-user@2x.png) | `person.crop.circle` |
| 用户 |  |  |
| 个人资料 |  |  |

### 评分

| 操作 | 图标 | 符号名称 |
| --- | --- | --- |
| 不喜欢 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-dislike@2x.png) | `hand.thumbsdown` |
| 喜欢 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-like@2x.png) | `hand.thumbsup` |

### 层叠顺序

| 操作 | 图标 | 符号名称 |
| --- | --- | --- |
| 移至最前 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-bring-to-front@2x.png) | `square.3.layers.3d.top.filled` |
| 移至最后 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-send-to-back@2x.png) | `square.3.layers.3d.bottom.filled` |
| 前移 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-bring-forward@2x.png) | `square.2.layers.3d.top.filled` |
| 后移 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-send-backwards@2x.png) | `square.2.layers.3d.bottom.filled` |

### 其他

| 操作 | 图标 | 符号名称 |
| --- | --- | --- |
| 闹钟 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-alarm@2x.png) | `alarm` |
| 归档 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-archive@2x.png) | `archivebox` |
| 日历 | ![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/icons-symbols-meaning-calendar@2x.png) | `calendar` |

## 平台考量因素

*无针对 iOS、iPadOS、Apple tvOS、visionOS 或 watchOS 的额外考量因素。*

### macOS

#### 文稿图标

如果你的 macOS App 可使用自定义的文稿类型，你可以创建文稿图标来代表它。传统上，文稿图标看似一张右上角向内折叠的纸。这种独特的外观可帮助用户区分文稿与 App 和其他内容，即使图标大小很小。

如果未为你所支持的文件类型提供文稿图标，macOS 会通过将 App 图标和文件扩展名合成到画布上来为你创建文稿图标。例如，“预览”使用了系统生成的文稿图标来代表 JPG 文件。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-generated@2x.png)

在某些情况下，创建一组文稿图标来代表 App 所处理的一系列文件类型可能会更为合理。例如，Xcode 使用了自定义文稿图标来帮助用户区分项目、AR 对象和 Swift 代码文件。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-custom-1@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-custom-2@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-custom-3@2x.png)

若要创建自定义的文稿图标，你可以提供包含背景填充、中心图像和文本的任意组合。系统会按需对此类元素进行分层、定位和遮罩，并将其合成到熟悉的折角图标形状上。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-parts-background-fill@2x.png)
*背景填充*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-parts-center-image@2x.png)
*中心图像*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-parts-text@2x.png)
*文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-parts@2x.png)
*macOS 合成所提供的元素以生成自定义文稿图标。*

[Apple 设计资源](https://developer.apple.com/design/resources/#macos-apps)提供了一个可用于为文稿图标创建自定义背景填充和中心图像的模板。使用此模板时，请遵循以下指南。

**设计可清楚传达文稿类型的简单图像**。无论使用背景填充、中心图像还是两者兼有，请优先使用简单形状和显眼单调的颜色。文稿图标最小可显示为 16x16 个像素，因此需要打造在任何大小下都可识别的设计。

**为背景填充设计富有表现力的特有图像是帮助用户理解和识别文稿类型的好方法**。例如，Xcode 和“文本编辑”均使用了不包括中心图像的丰富背景图像。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-custom-1@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-fill-only@2x.png)

**考虑降低小尺寸版本文稿图标的复杂性**。在大尺寸版本中清晰的图标细节在小尺寸版本中可能会看起来模糊且难以识别。例如，若要确保自定义心形文稿图标中的网格线在中等大小下保持清晰，你可以减少线条，并将其与减少的像素网格对齐来进行加粗。在 16x16 个像素大小中，你可以将线条完全移除。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-fewer-details-1@2x.png)
*32x32 个像素图标的网格线更少，心电图线更粗。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-fewer-details-2@2x.png)
*16x16 个像素 @2x 图标保留心电图线，但无网格线。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-fewer-details-3@2x.png)
*16x16 个像素 @1x 图标无心电图线和网格线。*

**避免将重要内容放在背景填充的右上角**。系统会自动遮挡图像以适应文稿图标形状，并在填充之上绘制白色折角。创建包括下列大小的一组背景图像。

- 512x512 个像素 @1x，1024x1024 个像素 @2x
- 256x256 个像素 @1x，512x512 个像素 @2x
- 128x128 个像素 @1x，256x256 个像素 @2x
- 32x32 个像素 @1x，64x64 个像素 @2x
- 16x16 个像素 @1x，32x32 个像素 @2x

**如有熟悉的对象可传达文稿的类型或其与你 App 的联系，请考虑创建中心图像来进行描述**。设计简单明确、在任意大小下都清晰可识别的图像。中心图像的大小占整个文稿图标画布的一半。例如，若要为 32x32 个像素文稿图标创建中心图像，请使用 16x16 个像素大小的图像画布。你可以提供以下大小的中心图像：

- 256x256 个像素 @1x，512x512 个像素 @2x
- 128x128 个像素 @1x，256x256 个像素 @2x
- 32x32 个像素 @1x，64x64 个像素 @2x
- 16x16 个像素 @1x，32x32 个像素 @2x

**将外边距定义为大约占图像画布的 10%，并将绝大部分图像保留在其之内**。虽然图像的一些部分可能会延伸到此外边距中以实现视觉对齐，但当图像占图像画布的 80% 左右时，效果最佳。例如，256x256 个像素画布上的中心图像绝大部分都在 205x205 个像素大小的区域中。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-parts-margins@2x.png)

**指定有助于用户理解文稿类型的简明术语**。系统默认会在文稿图标底部边缘显示文稿的扩展名，但你可以为不常见的扩展名提供描述性更强的术语。例如，SceneKit 场景文件的文稿图标使用了术语 *scene*（场景）而非文件扩展名 *scn*。系统会自动缩放扩展名文本以适合文稿图标，因此要确保所使用的术语足够短，以在小尺寸下清晰易读。系统默认会大写文本中的每个字母。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-icon-custom-extension@2x.png)

## 资源

#### 相关内容

[App 图标](app-icons.md)

[SF 符号](sf-symbols.md)

#### 视频

- [设计字形](https://developer.apple.com/cn/videos/play/wwdc2017/823)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2025 年 6 月 9 日 | 新增了表示常用操作的 SF 符号表。 |
| 2023 年 6 月 21 日 | 更新以包括针对 visionOS 的指南。 |
