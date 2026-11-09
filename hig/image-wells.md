# 图像池

原文：https://developer.apple.com/cn/design/human-interface-guidelines/image-wells

图像池是图像视图的可编辑版本。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-image-well-intro@2x.png)

选择图像池后，用户可拷贝和粘贴其图像或删除它，也可以不预先选择，而是将新图像拖到图像池中。

## 最佳实践

**必要时复原为默认图像**。如果图像池需要图像，请在用户清除图像池内容时重新显示默认图像。

**如果图像池支持拷贝和粘贴，请确保标准拷贝和粘贴菜单项可用**。用户通常希望选取这些菜单项（或使用标准键盘快捷键）来和图像池交互。有关指南，请参阅[“编辑”菜单](the-menu-bar.md#Edit-menu)。

相关指南，请参阅[图像视图](image-views.md)。

## 平台考量因素

*在 iOS、iPadOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[图像视图](image-views.md)

#### 开发者文档

[NSImageView](https://developer.apple.com/cn/documentation/appkit/nsimageview) — AppKit
