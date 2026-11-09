# 通过 Apple 登录

原文：https://developer.apple.com/cn/design/human-interface-guidelines/sign-in-with-apple

“通过 Apple 登录”提供了一种快速且私密的方式来登录 App 和网站，为用户提供可信任的一致体验，并省去记住多个账户和密码的麻烦。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-SIWA-intro@2x.png)

支持“通过 Apple 登录”可让用户使用已有的 Apple 账户登录或注册，而无需进行表单填写、电子邮件地址验证和密码选择。如果你选择询问姓名和电子邮件地址，用户可选择共享一个唯一的随机电子邮件地址，该地址会自动将邮件转发到其个人电子邮件地址。有关开发者指南，请参阅 [Authentication Services](https://developer.apple.com/cn/documentation/authenticationservices)。

你可以在所有平台（包括非 Apple 平台）上每个版本的 App 或网站中提供“通过 Apple 登录”。

“通过 Apple 登录”可让用户轻松地通过面容 ID、触控 ID 或视控 ID 进行认证，并内建双重认证以带来一重额外的安全保障。Apple 不会使用“通过 Apple 登录”来剖析用户或其在 App 中的活动。

## 提供“通过 Apple 登录”

遵循以下指南，在对用户最便利的情况下提供“通过 Apple 登录”。

**仅在有价值时要求用户登录**。用户需要了解你要求他们登录的原因，因此显示关于登录好处的简短易懂描述会有不错的效果。例如，不妨告知用户，登录可让其个性化 App 体验、访问其他功能或同步数据。

**尽可能延迟登录操作**。如果用户在执行任何有用操作前都被迫登录，他们通常会弃用此类 App。在用户投入前，让他们有机会熟悉你的 App。例如，直播流媒体 App 可让用户在登录流媒体前探索可用的内容。

**如需账户，请先让用户进行设置，再提供任何登录选项**。首先解释需要账户的原因。然后，在用户完成账户设置后，向其提供“通过 Apple 登录”和你支持的任何其他登录方式，让用户选择一种便捷的方式来登录其新账户。

**考虑让用户将现有账户与“通过 Apple 登录”关联**。如果支持这种类型的关联方式，用户可以便捷地使用“通过 Apple 登录”，同时仍可访问其已设置账户中的信息。你可以在用户登录现有账户之前或之后提供账户关联方式。例如：

- 如果用户使用“通过 Apple 登录”共享电子邮件地址，并且该地址与现有账户中的地址相匹配，你可以建议他们将“通过 Apple 登录”与该账户关联。
- 如果用户使用现有用户名和密码来登录，你可在其账户的设置视图或其他合理位置显示账户关联建议。

**在商业 App 中，请等到用户完成购买后再要求其创建账户**。如果支持访客结账系统，请在交易完成后为用户提供快速创建账户的方式。例如，如果支持 Apple Pay，你可让用户在订单确认页面上创建一个账户。如果用户在 Apple Pay 交易期间已经提供了其姓名和电子邮件地址，你无需要求他们提供这些信息。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/create-account-after-purchase@2x.png)

**“通过 Apple 登录”完成后，欢迎用户使用其新账户**。帮助用户立即使用其新账户；请勿要求提供不需要的信息造成体验延迟。

**指示用户当前的登录状态**。你可以在设置或账户界面等位置显示“通过 Apple 登录”等短语，帮助用户确认其登录方式。

## 收集数据

用户因隐私性和便利性而期望使用“通过 Apple 登录”。尽管某些 App 或网站可能需要其他信息（如出生日期或居住地区），但在用户设置账户时，有必要尽量减少对数据的请求。描述你需要其他数据的原因并清晰地显示所收到的数据，从而建立用户对“通过 Apple 登录”的信任。

**阐明你请求的其他数据是必需提供还是建议提供**。如果在法律上或合同上要求提供数据（如对服务条款的许可、居住国家或地区、出生日期或地区真实身份法要求的信息），请确保用户了解必须提供其他信息才能完成账户设置。如果不需要其他数据但可以提升用户体验，请确保用户知道该请求是可选的，并帮助他们了解提供信息的好处。

**请勿要求用户提供密码**。“通过 Apple 登录”的一个关键好处是，用户无需创建和记住额外的密码。除非用户已经停止在你的 App 或网站中使用“通过 Apple 登录”，否则请勿要求其提供密码。

**当用户提供专用代理地址时，避免要求提供个人电子邮件地址**。使用“通过 Apple 登录”，用户可以选择共享专用代理地址，该地址会自动将邮件转发到其经过验证的个人电子邮件账户。遵循这一选择至关重要，并避免通过要求提供个人电子邮件地址来覆盖该选择。如果提供客户服务、零售或其他需要通过电子邮件地址请求身份识别的体验，你可以：

- 确保用户可以在你的 App 或网站中查看其专用代理地址
- 引导用户前往“设置”>“Apple 账户”>“密码与安全性”>“使用 Apple 账户的 App”获取其专用代理地址
- 使用其他识别值，如在购买过程中收集的订单号或电话号码

**在要求提供可选数据前，让用户有机会与你的 App 互动**。当用户使用你的 App 时，你可以帮助他们发现可通过与你共享更多信息而受益的地方。例如，如果用户想要实时文本更新，不妨建议他们提供联系电话；或者，如果用户想要和朋友一起玩游戏，不妨建议他们提供社交网络信息。如果用户选择不提供可选信息，不要阻止他们访问其账户或使用你 App 的所有功能。

**对你收集的数据保持透明**。用户很重视你如何使用他们与你共享的数据。保持透明的一种方法是，使用用户共享的姓名或电子邮件地址来欢迎他们。这样做有助于确定你如何使用此信息，而对于专用代理地址，可向用户展示将来能够在哪里找到此信息。如果你不显示用户提供的所有数据，他们可能会疑惑你为何要求其提供这些数据。

## 显示按钮

Apple 提供了多个“通过 Apple 登录”按钮，你可以使用这些按钮让用户设置账户和登录。如有必要，你可以创建自定义按钮来提供“通过 Apple 登录”；有关指南，请参阅[创建自定义“通过 Apple 登录”按钮](sign-in-with-apple.md#Creating-a-custom-Sign-in-with-Apple-button)。

**突出显示“通过 Apple 登录”按钮**。使“通过 Apple 登录”按钮不小于其他登录按钮，避免用户滚动查看该按钮。

### 使用系统提供的按钮

当你使用系统提供的 API 创建“通过 Apple 登录”按钮时，可享有以下好处。

- 保证按钮使用 Apple 批准的外观
- 确保按钮内容在你更改其样式时保持理想的比例
- 将按钮标题自动翻译为设备指定的语言
- 支持配置按钮的圆角半径，与你的用户界面风格保持一致（iOS、macOS 和网页）
- 系统提供的备选文本标签，通过“旁白”描述按钮

有关开发者指南，请参阅 [ASAuthorizationAppleIDButton](https://developer.apple.com/cn/documentation/authenticationservices/asauthorizationappleidbutton)（iOS、macOS 和 Apple tvOS）、[WKInterfaceAuthorizationAppleIDButton](https://developer.apple.com/cn/documentation/watchkit/wkinterfaceauthorizationappleidbutton) (watchOS) 和 [Displaying Sign in with Apple buttons on the web](https://developer.apple.com/cn/documentation/signinwithapple/displaying-sign-in-with-apple-buttons-on-the-web)。你还可以访问 [Sign in with Apple button](https://appleid.apple.com/signinwithapple/button) 以查看和调整基于网页的按钮的实时预览并获取代码。

系统提供了按钮标题的多种变体。根据内容运行的平台，选择适合你登录体验术语的变体，并在整个界面中一致地使用该变体。

以下按钮标题适用于 iOS、macOS、Apple tvOS 和网页：

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-sign-in-with@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-sign-up-with@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-continue-with@2x.png)

对于 watchOS，系统提供了一个标题： 登录。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-watch-44mm-no-background@2x.png)

根据平台的不同，系统提供最多三个用于“通过 Apple 登录”按钮的外观选项：白色、带有边框的白色和黑色。选择最适合显示按钮的背景的外观。

#### 白色

白色样式适用于所有平台和网页。在提供足够对比度的深色背景上使用此样式。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-white-yes@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-white-no@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

#### 带有边框的白色

带有边框的白色样式适用于 iOS、macOS 和网页。在白色或浅色背景上使用此样式，这些背景无法与白色按钮填充形成足够的对比。避免在深色或颜色饱和的背景上使用此样式，因为黑色边框会增加视觉混乱感；相比之下，使用与深色背景形成对比的[白色](https://developer.apple.com/cn/design/human-interface-guidelines/sign-in-with-apple#White)样式。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-outline-yes@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-outline-no@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

#### 黑色

黑色样式适用于所有平台和网页。在提供足够对比度的白色或浅色背景上使用此样式；不要在黑色或深色背景上使用。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-black-yes@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/checkmark@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-black-no@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/crossout@2x.png)

与其他平台的黑色“通过 Apple 登录”按钮不同，watchOS 按钮使用的填充颜色并非全黑。为了与 Apple Watch 的纯黑色背景形成对比，watchOS 按钮采用了系统定义的深灰色外观。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-watch-44mm@2x.png)

#### 按钮大小和圆角半径

**调整圆角半径以匹配 App 中其他按钮的外观**。“通过 Apple 登录”按钮默认具有圆角。在 iOS、macOS 和网页中，你可以更改圆角半径以生成方角按钮或胶囊状按钮。有关开发者指南，请参阅 [cornerRadius](https://developer.apple.com/cn/documentation/authenticationservices/asauthorizationappleidbutton/cornerradius)（iOS 和 macOS）和 [Displaying Sign in with Apple buttons on the web](https://developer.apple.com/cn/documentation/signinwithapple/displaying-sign-in-with-apple-buttons-on-the-web)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-minimum-corner-radii@2x.png)
*最小圆角半径*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-default-corner-radii@2x.png)
*默认圆角半径*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/apple-account-maximum-corner-radii@2x.png)
*最大圆角半径*

**在 iOS、macOS 和网页中，保持最小按钮大小和按钮周围的外边距**。请注意，根据地区设置，按钮标题的长度可能会有所不同。使用以下值作为指导。

| 最小宽度 | 最小高度 | 最小外边距 |
| --- | --- | --- |
| 140 点（140 个像素 @1x、280 个像素 @2x） | 30 点（30 个像素 @1x、60 个像素 @2x） | 按钮高度的 1/10 |

### 创建自定义“通过 Apple 登录”按钮

如果你的界面需要，你可以为 iOS、macOS 或网页创建自定义“通过 Apple 登录”按钮。例如，不妨在多个登录按钮之间对齐标志，使用仅显示标志的按钮，或者调整按钮的字体、边框或背景外观以协调你的用户界面。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/custom-sign-in-screens@2x.png)

始终确保用户可立即将你的自定义按钮识别为“通过 Apple 登录”按钮。如果你的自定义按钮与标准按钮相差太大，用户可能不喜欢使用该按钮来设置账户或登录。App Review 会评估所有自定义的“通过 Apple 登录”按钮。

[Apple 设计资源](https://developer.apple.com/design/resources/)提供可下载的 Apple 标志插图，用于创建显示纯标志或标志和文本的自定义“通过 Apple 登录”按钮。标志文件支持 PNG、SVG 和 PDF 格式，并且两种类型按钮的插图均包括黑色和白色版本。以下示例是黑色和白色纯标志插图文件，每个都添加了背景以便提高可见性。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/siwa-black-logo-only@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/siwa-white-logo-only@2x.png)

所有可下载的标志文件都包括内边距，可简化在按钮中放置标志的操作。纯标志的标志文件包括水平和垂直内边距，可确保标志相对于按钮的比例正确。除了使标志和按钮保持正确比例的内边距外，含文本的按钮的标志文件还包括水平内边距，可在标志与按钮前边缘和标题之间提供最小外边距。

仅使用从 [Apple 设计资源](https://developer.apple.com/design/resources/)下载的标志插图；切勿创建自定义 Apple 标志。当创建自定义“通过 Apple 登录”按钮时，请遵循以下有关使用可下载标志文件的指南：

- 使用标志文件在按钮中放置 Apple 标志；切勿将 Apple 标志用作按钮。
- 使标志文件高度与按钮高度相匹配。
- 请勿裁剪标志文件。
- 请勿添加垂直内边距。

为了确保自定义按钮在视觉上与系统提供的“通过 Apple 登录”按钮保持一致，请勿更改以下属性。

- 标题。仅使用*通过 Apple 登录*、*通过 Apple 注册*或*通过 Apple 继续*。
- 通用形状。组合了标志和文本的按钮始终为矩形；纯标志按钮可以为圆形或矩形。
- 标志和标题颜色。在一个按钮中，这两项都必须为黑色或白色；请勿使用自定义颜色。

为了与你的 App 设计协调，你可以更改：

- 标题字体。你还可以调整字体的粗细和大小。
- 标题大小写。你可以将标题中的每个字母大写。
- 背景外观。整体颜色需要保持为黑色或白色。如有必要，你可以包括细微的纹理或渐变，以帮助按钮与你的界面协调一致。
- 按钮圆角半径。你可以使用与用户界面中的其他按钮相匹配的圆角半径值。
- 按钮边框和阴影。例如，你可以使用线条以突显按钮边框或添加阴影。

#### 带标志和文本的自定义按钮

**根据按钮高度选择标志文件的格式**。SVG 和 PDF 是基于矢量的格式，因此你可以在任何高度的按钮中使用这些文件。仅在高度为 44 点的按钮中使用 PNG 文件，该高度为 iOS 中默认（及建议）的按钮高度。标志有小号、中号和大号可供选择，因此你可以在显示的所有注册按钮中匹配标志大小。

**优先将系统字体应用到标题，即“通过 Apple 登录”、“通过 Apple 注册”或“通过 Apple 继续”**。无论你选择何种字体，自定义按钮的标题和按钮高度都需要使用与系统相同的比例。以系统字体为例，标题的字体大小为按钮高度的 43%，换句话说，按钮高度为标题字体大小的 233%，四舍五入为最接近的整数。以下两个示例使用不同大小的系统字体来显示这些比例。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/left-aligned-correct-proportions-2@2x.png)

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/left-aligned-correct-proportions-1@2x.png)

**通常保留标题的大小写样式**。按钮标题的所有变体默认将第一个单词（即 *Sign* 或 *Continue*）和 *Apple* 大写；所有其他字母均为小写。除非你的界面仅使用大写字母，否则请避免更改此样式。

**在按钮内保持标题和标志垂直对齐**。为此，请将标题垂直对齐到按钮中间，然后添加标志图像，确保其高度与按钮高度相匹配。标志图像包括顶部和底部内边距，因此在按钮中垂直对齐标题可确保标题、标志和按钮保持正确对齐。

**如有必要，调整标志位置**。如需将 Apple 标志与其他认证标志水平对齐，你可以调整标志与按钮前边缘之间的间距。

**在标题与按钮右边缘之间保持最小外边距**。确保外边距至少为按钮宽度的 8%。

**保持最小按钮大小和按钮周围的外边距**。请注意，根据地区设置，按钮标题的长度可能会有所不同。使用以下值作为指导。

| 最小宽度 | 最小高度 | 最小外边距 |
| --- | --- | --- |
| 140 点（140 个像素 @1x、280 个像素 @2x） | 30 点（30 个像素 @1x、60 个像素 @2x） | 按钮高度的 1/10 |

#### 自定义纯标志按钮

**根据按钮大小选择标志文件的格式**。纯标志按钮的可下载插图支持 SVG、PDF 和 PNG 格式。对于任意大小的按钮，使用基于矢量的 SVG 和 PDF 格式；仅在大小为 44x44 点的按钮中使用 PNG 格式。

**请勿向纯标志图像添加水平内边距**。纯标志“通过 Apple 登录”按钮的宽高比始终为 1:1，并且插图的各边均已包括正确的内边距。

**使用遮罩来更改纯标志图像的默认方形**。例如，不妨使用圆形或圆角矩形来呈现所有纯标志登录按钮。切勿裁剪 Apple 提供的插图以减少其内置内边距或单独使用标志，并避免包含额外的内边距。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/siwa-logo-masked-rounded-rect@2x.png)
*圆角矩形遮罩*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/siwa-logo-default@2x.png)
*无遮罩*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/siwa-logo-masked-circle@2x.png)
*圆形遮罩*

**在按钮周围保持最小外边距**。确保外边距至少为按钮高度的 1/10。

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS、visionOS 或 watchOS 的额外考量因素。*

## 资源

#### 相关内容

[Sign in with Apple button](https://appleid.apple.com/signinwithapple/button)

#### 开发者文档

[Authentication Services](https://developer.apple.com/cn/documentation/authenticationservices)

[Displaying Sign in with Apple buttons on the web](https://developer.apple.com/cn/documentation/signinwithapple/displaying-sign-in-with-apple-buttons-on-the-web) — Sign in with Apple

#### 视频

- [无需密码仍可操作](https://developer.apple.com/cn/videos/play/wwdc2021/10106)
- [简化您的 Apple tvOS App 登录](https://developer.apple.com/cn/videos/play/wwdc2021/10279)
- [“通过 Apple 登录”简介](https://developer.apple.com/cn/videos/play/wwdc2019/706)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2022 年 9 月 14 日 | 优化了关于支持现有账户、帮助用户设置新账户以及指示当前登录状态的指南。已将指南整合为一页。 |
