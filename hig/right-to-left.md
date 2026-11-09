# 从右到左

原文：https://developer.apple.com/cn/design/human-interface-guidelines/right-to-left

按需反转界面方向以匹配相关文字的阅读方向，通过这种方式来支持从右到左的语言，如阿拉伯语和希伯来语。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/foundations-rtl-intro@2x.png)

用户为其设备（或仅为你的 App 或游戏）选取语言时，会希望界面在各个方面进行适配（若要进一步了解，请参阅[本地化](https://developer.apple.com/localization/)）。

系统提供的用户界面框架默认支持从右到左 (RTL)，允许在 RTL 环境中自动翻转系统所提供用户界面组件的方向。如果使用系统提供的元素和标准布局，你可能不需要对 App 自动反转方向的界面进行任何更改。

针对使用 RTL 语言的国家/地区的各种区域设置中可能出现的不同的货币、数字或数学符号，如果想针对它们微调布局或优化特定本地化内容以进行适配，请遵循以下指南。

## 文本对齐

**如果系统未自动调整文本对齐方式以匹配界面方向，应进行调整**。例如，如果在从左到右 (LTR) 的环境中使文本左对齐到内容，请在 RTL 环境中右对齐文本以匹配内容的镜像位置。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/text-alignment-ltr-screen@2x.png)
*LTR 环境中的左对齐文本*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/text-alignment-rtl-screen@2x.png)
*RTL 环境中的右对齐内容*

**基于段落语言（而非当前环境）对齐段落**。当某个段落（定义为三行或以上的文本）的对齐方式与其语言不匹配时，可能会较难阅读。例如，将 LTR 文本组成的段落右对齐可能会让每一行的开头很难找到。若要提高可读性，请继续根据当前环境的阅读方向来对齐一至两行的文本块，但根据段落语言来对齐段落。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/paragraph-alignment-correct@2x.png)
*RTL 环境中的左对齐段落*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/paragraph-alignment-wrong@2x.png)
*RTL 环境中的右对齐段落*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

**为列表中的所有文本项目使用一致的对齐方式**。若要确保舒适的阅读和扫描体验，请反转列表中所有项目的对齐方式，包括以不同文字显示的项目。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/mixed-script-list-alignment-correct@2x.png)
*RTL 环境中的右对齐内容*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/mixed-script-list-alignment-wrong@2x.png)
*RTL 内容中的混合对齐方式*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

## 数字和字符

不同的 RTL 语言可能使用不同的数字系统。例如，希伯来语文本使用阿拉伯数字，而阿拉伯语文本可能使用阿拉伯数字或阿拉伯文数字。阿拉伯数字和阿拉伯文数字的使用情况因国家和地区有所不同，甚至同一国家或地区内的不同区域之间也可能不同。

如果你的 App 涵盖数学概念或其他围绕数字的话题，最好针对所支持的每种区域设置找到显示此类信息的适当方式。相反，不涉及数字相关话题的 App 一般可依赖系统提供的数字表示方式。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/textformat-123-ltr@2x.png)
*阿拉伯数字*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/textformat-123-ar@2x.png)
*阿拉伯文数字*

**请勿反转确切数字中数位的顺序**。无论当前使用哪种语言或环境内容，确切数字（如“541”、电话号码或信用卡号）中的数位始终以相同顺序显示。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/latin-numerals@2x.png)
*拉丁语*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/hebrew-numerals@2x.png)
*希伯来语*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/western-arabic-numerals@2x.png)
*阿拉伯语（阿拉伯数字）*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/eastern-arabic-numerals@2x.png)
*阿拉伯语（阿拉伯文数字）*

**为显示进度或计数方向的数字反转顺序；勿翻转数字本身**。进度条、滑块和评分控制等控制常常包括解释其含义的数字。如果以这种方式使用数字，请确保反转数字的顺序以匹配已翻转控制的方向。如果使用数字序列来表示特定顺序，也请反转该序列。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/match-numeral-order-to-directional-controls-latin@2x.png)
*拉丁语*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/match-numeral-order-to-directional-controls-eastern-arabic@2x.png)
*阿拉伯语（阿拉伯文数字）*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/match-numeral-order-to-directional-controls-western-arabic-hebrew@2x.png)
*希伯来语*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/match-numeral-order-to-directional-controls-western-arabic-hebrew@2x.png)
*阿拉伯语（阿拉伯数字）*

## 控制

**翻转显示从一个值到另一个值之间进度的控制**。用户往往会以所阅读语言相同的方向查看进度向前移动，因此在 RTL 环境中翻转滑块和进度指示符等控制很有意义。反转时，另请确保为描述控制起始和末尾值的配套图形或图像反转位置。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/flipped-directional-control-ltr@2x.png)
*LTR 环境中的方向性控制*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/flipped-directional-control-rtl@2x.png)
*RTL 环境中的方向性控制*

**翻转可帮助用户以固定顺序导览或访问项目的控制**。例如，在 RTL 环境中，返回按钮必须指向右侧以确保屏幕内容的排列方向匹配 RTL 语言的阅读顺序。同样，可让用户访问排序列表中项目的下一个或上一个按钮在 RTL 环境中也需要翻转以匹配阅读顺序。

**为表示实际方向或指向屏幕区的控制保持方向不变**。例如，如果你提供表示“向右”的控制，无论当前环境如何，都必须始终指向右侧。

**如有必要，应从视觉上平衡相邻的拉丁文字和 RTL 文字**。在按钮、标签和标题中，阿拉伯或希伯来文本在大写拉丁文本旁边可能显得太小，因为阿拉伯和希伯来文字无大写字母。为了在视觉上平衡阿拉伯/希伯来文本和全大写的拉丁文本，将 RTL 字体大小增大约 2 点通常效果很好。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/download-uneven-vertical-height@2x.png)
*阿拉伯和希伯来文本在相同字体大小的大写拉丁文本旁边可能显得太小。*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/download-even-vertical-height@2x.png)
*你可以稍微增大阿拉伯和希伯来文本的字体大小，以与大写拉丁文本在视觉上保持平衡。*

## 图像

**避免翻转照片、图示和一般插图等图像**。翻转图像通常会改变图像的含义；翻转受版权保护的图像还可能侵权。如果图像内容与阅读方向紧密相关，请考虑创建新版本的图像，而非翻转原图像。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/image-displayed-right@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/image-displayed-wrong@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

**在图像顺序有意义时反转其位置**。例如，如果以时间顺序、字母顺序或收藏顺序等特定顺序显示多张图像，请在 RTL 环境中反转其位置以保持顺序的意义不变。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/image-positions-ltr@2x.png)
*LTR 环境中位置有意义的项目*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/image-positions-rtl@2x.png)
*RTL 环境中位置有意义的项目*

## 界面图标

使用 [SF 符号](sf-symbols.md)为你的 App 提供界面图标时，在各种语言中，你会获得用于 RTL 环境的变体和已针对阿拉伯语和希伯来语本地化的符号。如果创建自定义符号，你可以指定其方向。有关开发者指南，请参阅 [Creating custom symbol images for your app](https://developer.apple.com/cn/documentation/uikit/creating-custom-symbol-images-for-your-app)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/directional-symbols-ltr@2x.png)
*方向性符号的 LTR 变体*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/directional-symbols-rtl@2x.png)
*方向性符号的 RTL 变体*

**翻转代表文本或阅读方向的界面图标**。例如，如果界面图标使用左对齐的条形代表 LTR 环境中的文本，请在 RTL 环境中将这些条形右对齐。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-plaintext-ltr@2x.png)
*代表文本的符号的 LTR 变体*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/doc-plaintext-rtl@2x.png)
*代表文本的符号的 RTL 变体*

**考虑为显示文本的界面图标创建本地化版本**。部分界面图标包括字母或单词，可帮助表达文字相关的概念，如字体大小选项或签名。如果你的自定义界面图标需要显示实际文本，请考虑创建本地化版本。例如，SF 符号提供了签名、多信息文本和工字型指针符号的不同版本，以配合拉丁、希伯来和阿拉伯文本以及其他语言的文本使用。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/text-icon-localized-latin@2x.png)
*拉丁语*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/text-icon-localized-hebrew@2x.png)
*希伯来语*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/text-icon-localized-arabic@2x.png)
*阿拉伯语*

如果你的自定义界面图标使用字母或单词来表达与读写无关的概念，请考虑设计不使用文本的替代图像。

**翻转显示前进或后退动作的界面图标**。如果内容朝用户阅读的相同方向移动，该方向通常被视为前进；如果朝相反方向移动，用户往往会将该方向视为后退。描述对象前后移动的界面图标需要在 RTL 环境中翻转，以保持动作的含义不变。例如，代表扬声器的图标通常显示声波从扬声器中向前发出。在 LTR 环境中，声波来自左侧，因此在 RTL 环境中，该图标需要翻转以显示声波来自右侧。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/speaker-wave-3-ltr@2x.png)
*描述前进动作的符号的 LTR 变体*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/speaker-wave-3-rtl@2x.png)
*描述前进动作的符号的 RTL 变体*

**请勿翻转标志或者通用符号和标记**。显示翻转的标志会让用户困惑，还可能产生法律上的不良影响。始终以原始形式显示标志，即使其中包括文本。用户希望勾号等通用符号和标记具有一致的外观，因此请避免翻转它们。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/appletv-ltr@2x.png)
*标志*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/checkmark-ltr@2x.png)
*通用符号或标记*

**一般而言，避免翻转描述真实世界物体的界面图标**。除非使用该物体表示方向，否则最好避免翻转代表熟悉物品的图标。例如，任何地方的时钟都以相同方式运行，因此无论使用哪种语言方向，传统时钟界面图标都需要看起来相同。部分界面图标似乎涉及语言或阅读方向，因为其代表了为右手使用而倾斜的物品。但大多数用户惯用右手，因此对于显示右手使用工具的图标，翻转并非必要，还可能造成困惑。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/clock-fill-ltr@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/pencil-ltr@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/gamecontroller-fill-ltr@2x.png)

**直接翻转复杂的自定义界面图标前，应分别考虑其各个组件和整体视觉平衡**。在某些情况下，无论使用哪种本地化语言，标记、斜线或放大镜等组件都需要遵守视觉设计语言。例如，SF 符号在 LTR 和 RTL 版本中使用相同的反斜线代表符号的禁止或否定含义，以保持视觉一致性。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/speaker-slash-fill-ltr@2x.png)
*包含反斜线的符号的 LTR 变体*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/speaker-slash-fill-rtl@2x.png)
*包含反斜线的符号的 RTL 变体*

在其他情况下，你可能需要翻转组件（或其位置）以确保图标的本地化版本仍有意义。例如，如果标记代表用户在你的 App 中看到的实际用户界面，它需要随用户界面而翻转。或者，如果标记修改了界面图标的含义，请考虑翻转标记能否保留修改后的含义以及图标的整体视觉平衡。在下面显示的图像中，标记不描述用户界面中的对象，但将其保留在右上角会破坏购物车的视觉平衡。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/cart-fill-badge-plus-ltr@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/cart-fill-badge-rtl-unbalanced@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/cart-fill-badge-plus-rtl@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

如果你的自定义界面图标包括可能暗示惯用手的组件（如工具），必要时请考虑翻转基底图像的同时保持工具的方向。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/mail-and-text-magnifyingglass-ltr@2x.png)
*描述工具的符号的 LTR 变体*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/mail-and-text-magnifyingglass-rtl@2x.png)
*描述工具的符号的 RTL 变体*

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS、visionOS 或 watchOS 的额外考量因素。*

## 资源

#### 相关内容

[布局](layout.md)

[包容性](inclusion.md)

[SF 符号](sf-symbols.md)

#### 开发者文档

[本地化](https://developer.apple.com/localization/)

[Preparing views for localization](https://developer.apple.com/cn/documentation/swiftui/preparing-views-for-localization) — SwiftUI

#### 视频

- [提升 App 的多语言体验](https://developer.apple.com/cn/videos/play/wwdc2025/222)
- [针对阿拉伯语进行设计](https://developer.apple.com/cn/videos/play/wwdc2022/10034)
