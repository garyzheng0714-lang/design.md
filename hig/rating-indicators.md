# 评分指示符

原文：https://developer.apple.com/cn/design/human-interface-guidelines/rating-indicators

评分指示符使用一系列水平排列的图形符号（默认采用星形）来表示排名高低。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-rating-indicators-intro@2x.png)

评分指示符不会显示部分符号；它会将值取整以仅显示完整的符号。评分指示符内的符号彼此的间距始终相等，且不会伸展或收缩以适合组件的宽度。

## 最佳实践

**排名应可轻松更改**。呈现排名项目的列表时，让用户在文内即可调整单个项目的排名，而不用导航至单独的编辑屏幕。

**如果将星形替换为自定义符号，确保其目的清晰明了**。星形是广泛认可的排名符号，用户可能不会将其他符号与排名量表关联起来。

## 平台考量因素

*无针对 macOS 的额外考量因素。  在 iOS、iPadOS、 Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[评分和评论](ratings-and-reviews.md)

#### 开发者文档

[NSLevelIndicator.Style.rating](https://developer.apple.com/cn/documentation/appkit/nslevelindicator/style/rating) — AppKit

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2022 年 9 月 23 日 | 新页面。 |
