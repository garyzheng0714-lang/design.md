# 颜色池

原文：https://developer.apple.com/cn/design/human-interface-guidelines/color-wells

颜色池可让用户调整文本、形状、参考线和其他屏幕元素的颜色。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-color-well-intro@2x.png)

颜色池在用户轻点或点按时显示颜色选择器。此颜色选择器可以是系统提供的，也可以是你设计的自定义界面。

## 最佳实践

**考虑使用系统提供的颜色选择器以实现熟悉的体验**。除了让用户保存一组他们可以从任意 App 访问的颜色外，使用内建颜色选择器还可提供一致的体验。系统定义的颜色选择器还有助于在跨 iOS、iPadOS 和 macOS 开发 App 时提供熟悉的体验。

## 平台考量因素

*无针对 iOS、iPadOS 或 visionOS 的额外考量因素。在 Apple tvOS 或 watchOS 中不受支持。*

### macOS

用户点按颜色池时，它会收到一个高亮标记以提供视觉确认其处于活跃状态。然后它会打开一个颜色选择器，以便用户可以选择一种颜色。在用户做出选择后，颜色池会更新以显示新颜色。

颜色池还支持拖放操作，因此用户可以将颜色从一个颜色池拖到另一个，以及从颜色选择器拖到颜色池。

## 资源

#### 相关内容

[颜色](color.md)

#### 开发者文档

[UIColorWell](https://developer.apple.com/cn/documentation/uikit/uicolorwell) — UIKit

[UIColorPickerViewController](https://developer.apple.com/cn/documentation/uikit/uicolorpickerviewcontroller) — UIKit

[NSColorWell](https://developer.apple.com/cn/documentation/appkit/nscolorwell) — AppKit

[Color Programming Topics](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/DrawColor/DrawColor.html)
