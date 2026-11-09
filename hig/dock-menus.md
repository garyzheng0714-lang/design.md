# 程序坞菜单

原文：https://developer.apple.com/cn/design/human-interface-guidelines/dock-menus

在 Mac 上，用户可以在程序坞中辅助点按 App 或游戏的图标来显示程序坞菜单，其中包括系统提供的项目和自定义项目。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-dock-menu-intro@2x.png)

系统提供的程序坞菜单项会根据 App 是否打开而变化。例如，Safari 浏览器的程序坞菜单包括查看当前窗口或创建新窗口等操作的菜单项。

> **注**
>
> 虽然 iOS 和 iPadOS 不支持程序坞菜单，但当用户长按主屏幕或程序坞中的 App 图标时，他们可以看到包含系统提供的项目和自定义项目的相似菜单，称为主屏幕快速操作。有关指南，请参阅[主屏幕快速操作](home-screen-quick-actions.md)。

## 最佳实践

与所有菜单一样，你需要简洁地标记程序坞菜单项并按逻辑进行组织。有关指南，请参阅[菜单](menus.md)。

**让自定义程序坞菜单项在其他地方也可使用**。并非每位用户都会使用程序坞菜单，因此在菜单栏菜单或界面中等其他地方提供同样的命令十分重要。

**为程序坞菜单优先使用高价值的自定义项目**。例如，程序坞菜单可以列出所有当前或最近打开的窗口，从而方便用户跳转到想要的窗口。你还可以考虑列出一些当 App 不在最前端或者无打开窗口时最可能有用的操作。例如，“邮件”除了列出所有打开的窗口外，还包括用于获取新邮件和编写新邮件的项目。

## 平台考量因素

*在 iOS、iPadOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[菜单](menus.md)

[主屏幕快速操作](home-screen-quick-actions.md)

#### 开发者文档

[applicationDockMenu(_:)](https://developer.apple.com/cn/documentation/appkit/nsapplicationdelegate/applicationdockmenu(_:)) — AppKit
