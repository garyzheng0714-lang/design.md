# 令牌栏

原文：https://developer.apple.com/cn/design/human-interface-guidelines/token-fields

令牌栏是一种文本栏，可将文本转换为能轻松选择和操作的*令牌*。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/components-token-field-intro@2x.png)

例如，“邮件”将令牌栏用于编写窗口中的地址栏。用户输入收件人时，“邮件”会将表示每个收件人名字的文本转换为令牌。用户可以选择这些收件人令牌并拖移以重新排序或移动到其他栏位。

你可以配置令牌栏，以在用户将文本输入栏位时向其显示建议列表。例如，当用户在地址栏中键入时，“邮件”会提供收件人建议。用户选择了建议的收件人时，“邮件”会将该收件人以令牌形式插入到栏位中。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/token-fields-suggestion@2x.png)

单个令牌也可包括关联菜单，以提供令牌或编辑选项相关的信息。例如，在“邮件”中，收件人令牌包括关联菜单，其中包含各种命令，可用于编辑收件人名字、将收件人标记为 VIP 以及查看收件人的联系人名片等等。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/token-fields-contextual@2x.png)

在某些情况下，令牌还可以表示搜索词；有关指南，请参阅[搜索栏](search-fields.md)。

## 最佳实践

**使用上下文菜单增添价值**。包含附加选项或令牌相关信息的[上下文菜单](https://developer.apple.com/cn/design/human-interface-guidelines/context-menus)通常对用户很有用。

**考虑提供将文本转换为令牌的额外方式**。每当用户键入逗号时，其输入的文本默认会变成令牌。你可以指定其他也调用此操作的快捷方式，如按下 Return 键。

**考虑自定义系统显示建议令牌前使用的延迟**。建议默认会立即出现。但是，建议出现太快可能会分散用户键入时的注意力。如果你的 App 提供令牌建议，请考虑将延迟调整至舒适的水平。

## 平台考量因素

*在 iOS、iPadOS、 Apple tvOS、visionOS 和 watchOS 中不受支持。*

## 资源

#### 相关内容

[文本栏](text-fields.md)

[搜索栏](search-fields.md)

[上下文菜单](context-menus.md)

#### 开发者文档

[NSTokenField](https://developer.apple.com/cn/documentation/appkit/nstokenfield) — AppKit
