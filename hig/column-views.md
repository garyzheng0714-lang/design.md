# 分栏视图

原文：https://developer.apple.com/cn/design/human-interface-guidelines/column-views

分栏视图也叫做*浏览器*，可让用户使用一系列垂直栏查看和导航数据层级。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-column-view-intro@2x.png)

每一栏都代表一个层级，并包含水平行的数据项。在一栏中，每个包含嵌套子项的父项都标有三角形图标。当用户选择父项时，下一栏会显示其子项。用户可以继续以此方式进行导航，直至到达不含子项的项目；也可以导航回上一层级以探索其他数据分支。

> **注**
>
> 如果需要管理 iPadOS 或 visionOS App 中分层内容的呈现方式，请考虑使用[拆分视图](split-views.md)。

## 最佳实践

当你提供的数据层级较深以至用户往往需要频繁地在不同层级之间来回导航，且你无需使用[列表或表格](lists-and-tables.md)提供的排序功能时，请考虑使用分栏视图。例如，“访达”提供分栏视图（另外还有图标、列表和画廊视图）以导航目录结构。

**在第一栏中显示数据层级的根层级**。用户知道他们可以快速滚动回到第一栏，以重新从顶层开始导航层级结构。

**当没有可显示的嵌套项目时，考虑显示所选项目的信息**。例如，“访达”显示所选项目的预览以及创建日期、修改日期、文件类型和大小等信息。

**允许用户调整栏大小**。如果某些数据项的名称太长而无法适应默认栏宽时，这一点尤其重要。

## 平台考量因素

*在 iOS、iPadOS、Apple tvOS、visionOS 或 watchOS 中不受支持。*

## 资源

#### 相关内容

[列表和表格](lists-and-tables.md)

[大纲视图](outline-views.md)

[拆分视图](split-views.md)

#### 开发者文档

[NSBrowser](https://developer.apple.com/cn/documentation/appkit/nsbrowser) — AppKit
