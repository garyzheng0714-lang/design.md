# 照片编辑

原文：https://developer.apple.com/cn/design/human-interface-guidelines/photo-editing

照片编辑扩展可让用户应用滤镜或进行其他更改，以在“照片” App 中修改照片和视频。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-photo-editing-intro@2x.png)

编辑内容始终作为新文件保存在“照片” App 中，原始版本会安全保留。

若要访问照片编辑扩展，照片必须处于编辑模式。在编辑模式下，轻点工具栏中的扩展图标将显示可用编辑扩展的操作菜单。选择其中一个扩展将在包含顶部工具栏的模态视图中显示其界面。关闭此视图将确认并保存编辑内容，或取消编辑内容并返回“照片” App。

## 最佳实践

**确认取消编辑内容**。编辑照片或视图可能非常耗时。如果用户轻点“取消”按钮，不要立即放弃其更改，而应请求用户确认是否确实要取消，并告知用户取消后任何编辑内容都将丢失。如果尚未进行任何编辑，无需显示此确认。

**不要提供自定义顶部工具栏**。扩展会在已包含工具栏的模态视图内加载。提供第二个工具栏会让人感到困惑，并占用正在编辑内容的空间。

**允许用户预览编辑内容**。看不到编辑效果如何时很难确定应用它。在关闭扩展并返回“照片” App 之前，让用户看到其编辑的成果。

**使用 App 图标作为照片编辑扩展图标**。这会让用户相信该扩展实际上由你的 App 提供。

## 平台考量因素

*无针对 iOS、iPadOS 或 macOS 的额外考量因素。在 Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 开发者文档

[App extensions](https://developer.apple.com/app-extensions/)

[PhotoKit](https://developer.apple.com/cn/documentation/photokit)

#### 视频

- [照片分割蒙版简介](https://developer.apple.com/cn/videos/play/wwdc2019/260)
