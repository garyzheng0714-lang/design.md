# 集合

原文：https://developer.apple.com/cn/design/human-interface-guidelines/collections

集合管理一组有序的内容，并以可自定义和高度可视化的布局呈现。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-collection-view-intro@2x.png)

一般来说，集合适合于显示基于图像的内容。

## 最佳实践

**尽可能使用标准行或网格布局**。集合默认在水平行或网格中显示内容，这种简单有效的外观符合用户的期望。避免创建可能令用户困惑或引起过度关注的自定义布局。

**考虑为文本使用表格，而不是集合**。一般来说，当文本信息在可滚动列表中显示时，查看和理解起来通常更简单、更高效。

**使项目可轻松选择**。如果难以在你的集合中找到项目，用户在找到其想要的内容之前就会感到不满，并失去兴趣。在图像周围使用足够的内边距，以保持焦点或悬停效果容易被看到并防止内容重叠。

**必要时添加自定义交互**。默认情况下，用户可通过轻点来选择，按住来编辑，以及轻扫来滚动。如果 App 需要，你可以添加更多手势以执行自定义操作。

**当用户插入、删除或重新排序项目时，考虑使用动画来提供反馈**。集合支持这些操作的标准动画，不过你也可以使用自定义动画。

## 平台考量因素

*无针对 macOS、Apple tvOS 或 visionOS 的额外考量因素。在 watchOS 中不受支持。*

### iOS、iPadOS

**谨慎进行动态布局更改**。集合的布局可以动态更改。确保任何更改均有意义，且易于跟踪。尽量尝试避免在用户查看布局并与之交互时进行更改，除非是为了响应明确的操作。

## 资源

#### 相关内容

[列表和表格](lists-and-tables.md)

[图像视图](image-views.md)

[布局](layout.md)

#### 开发者文档

[UICollectionView](https://developer.apple.com/cn/documentation/uikit/uicollectionview) — UIKit

[NSCollectionView](https://developer.apple.com/cn/documentation/appkit/nscollectionview) — AppKit
