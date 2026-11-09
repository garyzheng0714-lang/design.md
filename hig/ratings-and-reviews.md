# 评分和评论

原文：https://developer.apple.com/cn/design/human-interface-guidelines/ratings-and-reviews

用户在下载 App 或游戏前，通常会查看相关评分和评论。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/patterns-ratings-and-reviews-intro@2x.png)

打造良好的整体使用体验是获得用户正面评分和评论的最好方法，但选择让用户在合适的时间提供反馈也同样至关重要。虽然每款 App 各不相同，但你可以通过查看用户启动 App 的次数或频率、探索的功能数量或者完成的任务数量等指标来获得用户积极的反馈。

用户始终可以在 App Store 内对你的 App 评分。

## 最佳实践

**仅在用户使用你的 App 或游戏后才请求用户评分**。例如，当用户通过了游戏关卡或者完成了重要任务时，可以提示用户评分。避免在首次启动或者用户引导期间请求用户评分，因为他们还没有足够的时间清楚理解你 App 的价值或者形成自己的观点。如果在用户还没来得及使用 App 前就请求进行评分，他们甚至很可能留下负面反馈。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/ratings-and-reviews-ios-alert@2x.png)

**避免干扰用户执行任务或者玩游戏**。此时要求反馈会扰乱用户体验，让用户觉得是一种负担。在 App 或游戏中寻求自然的时机或停歇契机，让用户觉得评分请求不那么厌烦。

**避免烦扰用户**。重复的评分请求可能会令人恼火，甚至可能让用户对你的 App 形成负面评价。考虑每次请求的间隔时间至少为一周或两周，并在用户展现出更多兴趣后才再次提示评分。

**首选系统提供的提示**。iOS、iPadOS 和 macOS 为 App 及游戏请求评分和评论提供了一致且自然的方式。当你找准要求用户提供反馈的契机后，系统会检查之前的反馈，如果没有任何反馈，系统会显示 App 内提示来请求用户评分和选择性撰写评论。用户轻点或点按一下就可提供反馈或关闭提示，也可针对安装的所有 App 选择不接收这类提示。系统会自动限制提示的显示次数，每个 App 在 365 天内可显示三次提示。有关开发者指南，请参阅：[RequestReviewAction](https://developer.apple.com/cn/documentation/storekit/requestreviewaction)。

**权衡重置概要评分和评分显示数量减少这二者之间的利弊**。发布 App 或游戏的新版本时，你可以重置自上次还原以来所收到每位用户评分的概要。虽然重置意味着评分反映的是当前版本的情况，但同时却会导致总体显示的评分减少，这会降低部分用户下载 App 的意愿。有关开发者指南，请参阅[重置 App 总评分](https://help.apple.com/app-store-connect/#/devfb7e87af8)。

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS、visionOS 或 watchOS 的额外考量因素。*

## 资源

#### 相关内容

[Ratings, reviews, and responses](https://developer.apple.com/app-store/ratings-and-reviews/)

#### 开发者文档

[RequestReviewAction](https://developer.apple.com/cn/documentation/storekit/requestreviewaction) — StoreKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2023 年 9 月 12 日 | 新增了插图。 |
