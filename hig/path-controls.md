# 路径控制

原文：https://developer.apple.com/cn/design/human-interface-guidelines/path-controls

路径控制显示所选文件或文件夹的文件系统路径。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-path-control-intro@2x.png)

例如，在“访达”中选取“显示”>“显示路径栏”会在窗口底部显示路径栏。它会显示所选项目的路径，如果未选择任何项目，则会显示窗口文件夹的路径。

路径控制有两种样式。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/path-controls-standard@2x.png)

**标准**。包括根磁盘、父文件夹和所选项目的线性列表。每个项目显示有一个图标和名称。如果列表太长以致控制无法容纳，则会隐藏第一项和最后一项之间的名称。如果你将控制设为可编辑，用户可以将项目拖到控制上，以选择该项目并在控制中显示其路径。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/path-controls-popup@2x.png)

**弹出式**。与[弹出式按钮](https://developer.apple.com/cn/design/human-interface-guidelines/pop-up-buttons)类似的控制，显示所选项目的图标和名称。用户可以点按该项目以打开一个菜单，其中包含根磁盘、父文件夹和所选项目。如果你将控制设为可编辑，菜单会包含额外的“选取”命令，供用户选择项目并在控制中显示。用户还可以将项目拖到控制上以选中并显示其路径。

## 最佳实践

**在窗体而非窗口框架中使用路径控制**。路径控制一般不适用于工具栏或状态栏。请注意，“访达”中的路径控制出现在窗体底部，而非状态栏中。

## 平台考量因素

*在 iOS、iPadOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[文件管理](file-management.md)

#### 开发者文档

[NSPathControl](https://developer.apple.com/cn/documentation/appkit/nspathcontrol) — AppKit
