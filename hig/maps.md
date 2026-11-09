# 地图

原文：https://developer.apple.com/cn/design/human-interface-guidelines/maps

地图在 App 中或网站上显示室外或室内地理数据。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/technologies-maps-intro@2x.png)

地图使用熟悉的界面，该界面支持许多与系统提供的“地图” App 相同的功能，例如缩放、平移和旋转。地图还可以包括注解和叠层并显示路线信息，并且你可以将其配置为使用标准图形视图、基于卫星图像的视图或两者的混合视图。

## 最佳实践

**一般要使地图具有交互性**。用户希望能够以熟悉的方式进行缩放、平移和其他与地图的交互。遮挡地图的非交互式元素可能会干扰用户对地图行为的期望。

**选择适合 App 需求的地图强调样式**。有两种强调样式可供选择：

- *默认*样式呈现颜色饱和度高的地图版本，这对于大多数没有大量自定义元素的标准地图应用程序而言是一个不错的选择。当用户可能在你的地图和“地图” App 之间切换时，这种样式也有助于在两者之间切换时保持视觉上的一致。
- 相比之下，*柔和*样式呈现地图的低饱和度版本。如果要在地图上突出显示大量信息丰富的内容，此样式非常适合。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/maps-default-appearance@2x.png)
*默认样式*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/maps-muted-appearance@2x.png)
*柔和样式*

有关开发者指南，请参阅 [MKStandardMapConfiguration.EmphasisStyle](https://developer.apple.com/cn/documentation/mapkit/mkstandardmapconfiguration/emphasisstyle-swift.enum)。

**帮助用户在地图中找到位置**。考虑提供与按类别筛选位置这种方式结合的搜索功能。例如，购物中心地图的搜索栏可能包括过滤条件，从而可以轻松查找常见的商店类型，例如服装、家居用品、电子产品、珠宝和玩具。

**明确标识用户选择的元素**。当用户在地图上选择特定区域或其他元素时，使用轮廓和颜色变化等不同的样式来引起用户对所选内容的注意。

**将重叠的兴趣点群集在一起可提高地图的易读性**。*群集*使用单个大头针来表示邻近的多个兴趣点。当用户在地图上放大时，群集会扩展以逐渐显示单个兴趣点。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/maps-points-of-interest-cluster@2x.png)
*群集中的兴趣点*

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/maps-points-of-interest-individual@2x.png)
*放大时的单独兴趣点*

**协助用户查看 Apple 标志和法律链接**。可以接受界面的某些部分暂时覆盖标志和链接，只要这些元素不会一直被覆盖。请遵循以下指南来协助保持 Apple 标志和法律链接可见：

- 使用足够的内边距将标志和链接与地图边界和自定义控制分开。例如，在元素的两侧使用 7 点的内边距并在元素的上方和下方使用 10 点的内边距会获得不错的效果。
- 避免导致标志和链接随界面移动。当 Apple 标志和法律链接看起来固定在地图上时，效果最好。
- 如果自定义界面可以相对于地图移动，可使用自定义元素的最低位置来确定标志和链接的位置。例如，如果 App 允许用户从屏幕底部拉出自定义卡片，可将 Apple 标志和法律链接放置在该卡片最低静止位置上方 10 点处。

> **注**
>
> 小于 200x100 个像素的地图上不会显示 Apple 标志和法律链接。

## 自定义信息

**使用与 App 的视觉样式匹配的注解**。注解会标识地图上的自定义兴趣点。默认注解标记具有红色色调和白色大头针图标。你可以更改色调以匹配 App 的颜色方案。你也可以将图标更改为字符串或图像，例如标志。图标字符串可以包含任何字符，包括 Unicode 字符，但为了可读性，请将其长度保持在两到三个字符。有关开发者指南，请参阅 [MKAnnotationView](https://developer.apple.com/cn/documentation/mapkit/mkannotationview)。

**如果要显示与标准地图特征相关的自定义信息，请考虑使其独立可选**。当支持可选地图特征时，系统会独立于你添加的其他注解来处理 Apple 提供的特征（包括兴趣点、领土和物理特征）。你可以配置自定义外观和信息来表示被用户选中时的此类特征。有关开发者指南，请参阅 [MKMapFeatureOptions](https://developer.apple.com/cn/documentation/mapkit/mkmapfeatureoptions)。

**使用叠层定义与内容具有特定关系的地图区域。**

- *道路上方*（默认级别）将叠层放置在道路上方但位于建筑、树木和其他特征的下方。这非常适用于希望用户了解叠层下方的内容，同时仍能清楚理解这是一个定义好的空间这种情况。
- *标签上方*将叠层放置在道路和标签上方，隐藏其下方的所有内容。这对于你希望完全从地图特征中提取的内容或者当你希望隐藏地图中不相关的区域时非常有用。

有关开发者指南，请参阅 [Displaying overlays on a map](https://developer.apple.com/cn/documentation/mapkit/displaying-overlays-on-a-map) 和 [MKOverlayLevel](https://developer.apple.com/cn/documentation/mapkit/mkoverlaylevel)。

**确保自定义控制与地图之间具有足够的对比度**。对比度不足会使控制难以看清，并且可能导致它们与地图融合在一起。考虑使用细线条或浅色投影来帮助突出显示自定义控制，或者将混合模式应用于地图区域以增加该区域与其上面控制的对比度。

## 地点卡

地点卡在 App 或网站中显示丰富的地点信息，例如营业时间、电话号码、地址等。这可让你为指定地点提供最新的结构化信息，以及增加搜索结果的深度。

### 在地图中显示地点卡

你可以呈现用户选择某个地点时，直接在地图中显示的地点卡。这可作为在包含多个指定地点的地图中提供地点信息的绝佳方式，例如作家打算在图书签售会访问的书店地图。有关开发者指南，请参阅 [mapItemDetailSelectionAccessory(_:)](https://developer.apple.com/cn/documentation/mapkit/mapcontent/mapitemdetailselectionaccessory(_:))、[mapView(_:selectionAccessoryFor:)](https://developer.apple.com/cn/documentation/mapkit/mkmapviewdelegate/mapview(_:selectionaccessoryfor:)) 和 [selectionAccessory](https://developer.apple.com/cn/documentation/mapkitjs/annotation/selectionaccessory)。

你还可以在地图上显示其他地点的地点卡，例如兴趣点、领土和自然特征，为用户提供附近地点相关的有价值背景信息。有关开发者指南，请参阅 [mapFeatureSelectionAccessory(_:)](https://developer.apple.com/cn/documentation/swiftui/view/mapfeatureselectionaccessory(_:))、[mapView(_:selectionAccessoryFor:)](https://developer.apple.com/cn/documentation/mapkit/mkmapviewdelegate/mapview(_:selectionaccessoryfor:)) 和 [selectableMapFeatureSelectionAccessory](https://developer.apple.com/cn/documentation/mapkitjs/map/selectablemapfeatureselectionaccessory)。

> **开发者注释**
>
> 在网站中，你可以内嵌自定义地图以默认显示所指定单个地点的地点卡。有关开发者指南，请参阅 [Displaying place information using the Maps Embed API](https://developer.apple.com/cn/documentation/mapkitjs/displaying-place-information-using-the-maps-embed-api)。

系统定义了多种地点卡样式，这些样式指定了地点卡的尺寸、外观和其中包括的信息。

- *自动*样式可让系统基于地图视图的大小确定地点卡样式。
- *标注*样式在所选地点旁边显示弹出式样式地点卡。你还可以进一步指定标注样式：*完整*标注样式显示详细的大尺寸地点卡，*紧凑*标注样式显示节省空间的更简洁地点卡。如果未指定标注样式，则系统会默认采用*自动*标注样式，该样式基于地图视图的大小确定标注样式。
- *说明*样式显示“在‘地图’中打开”链接。
- *表单*样式在[表单](https://developer.apple.com/cn/design/human-interface-guidelines/sheets)中显示地点卡。

有关开发者指南，请参阅 [MapItemDetailSelectionAccessoryStyle](https://developer.apple.com/cn/documentation/mapkit/mapitemdetailselectionaccessorystyle)、[MKSelectionAccessory.MapItemDetailPresentationStyle](https://developer.apple.com/cn/documentation/mapkit/mkselectionaccessory/mapitemdetailpresentationstyle) 和 [PlaceSelectionAccessoryStyle](https://developer.apple.com/cn/documentation/mapkitjs/placeselectionaccessorystyle)。

**完整标注**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/maps-place-card-ipad-full@2x.png)

**紧凑标注**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/maps-place-card-ipad-compact@2x.png)

**说明**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/maps-place-card-ipad-link@2x.png)

**表单**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/maps-place-card-ipad-sheet@2x.png)

完整标注样式地点卡会因用户设备不同而显示各异。iPadOS 和 macOS 系统采用弹出式样式呈现完整标注样式地点卡，iOS 系统采用[表单](https://developer.apple.com/cn/design/human-interface-guidelines/sheets)样式。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/maps-place-card-iphone-full@2x.png)

**选取样式时考虑地图呈现方式**。完整标注样式地点卡为用户提供了最丰富的体验，因此可在地图中直接呈现以提供地点相关的最全面信息。但是，请确保选取与地图环境适配的地点卡样式。例如，如果 App 显示包含许多注解的小地图，则应考虑使用节省空间的紧凑标注样式呈现方式，在地图中显示地点信息的同时保留所指定其他地点的背景信息。

**确保地点卡在不同设备和窗口尺寸中看起来美观**。如果你选择指定样式，请确保地点卡中的内容在不同设备上以及随着窗口尺寸变化仍然保持可见。对于完整标注样式地点卡，你可以设定最小宽度以防文本在尺寸较小的设备上溢出。

**避免重复信息**。选取地点卡样式时，请考虑已在 App 或网站中显示的信息内容。例如，完整标注样式地点卡可能呈现 App 已经显示的信息。在这种情况下，紧凑标注或说明样式可能是更好的信息补充方式。

**显示地点卡时，保持地图上的位置可见**。这有助于用户在获取详细地点信息的同时，保持对地图上位置的感知。你可以为地点卡设定偏移距离并将其指向所选位置。有关开发者指南，请参阅 [offset(_:)](https://developer.apple.com/cn/documentation/swiftui/view/offset(_:))、[accessoryOffset](https://developer.apple.com/cn/documentation/mapkit/mkannotationview/accessoryoffset) 和 [selectionAccessoryOffset](https://developer.apple.com/cn/documentation/mapkitjs/annotation/selectionaccessoryoffset)。

### 在地图外部添加地点卡

你还可以在 App 或网站中的地图外部显示地点信息。例如，你不妨显示地点列表而非地图，例如在搜索结果或商店定位器中，并在用户选取一个地点时呈现地点卡。有关开发者指南，请参阅 [mapItemDetailSelectionAccessory(_:)](https://developer.apple.com/cn/documentation/mapkit/mapcontent/mapitemdetailselectionaccessory(_:))、[mapItemDetail(_:)](https://developer.apple.com/cn/documentation/mapkit/mkselectionaccessory/mapitemdetail(_:)) 和 [PlaceDetail](https://developer.apple.com/cn/documentation/mapkitjs/placedetail)。

> **重要信息**
>
> 如果未直接在地图视图内显示地点卡，则必须在地点卡中包括地图。有关开发者指南，请参阅 [mapItemDetailSheet(item:displaysMap:)](https://developer.apple.com/cn/documentation/swiftui/view/mapitemdetailsheet(item:displaysmap:)) 和 [init(mapItem:displaysMap:)](https://developer.apple.com/cn/documentation/mapkit/mkmapitemdetailviewcontroller/init(mapitem:displaysmap:))。

**在周围内容中使用位置相关提示，帮助告知用户可打开地点卡**。例如，你可以在按钮旁显示地点名称和地址以提供更多详细信息，帮助告知用户可以与之交互以获取地点信息。对于充分利用空间的设计，你可以包括带有地点名称的地图大头针图标，帮助告知用户可以打开地点卡。

## 室内地图

与购物中心和体育场等特定场所连接的 App 可以设计自定义交互式地图，帮助用户定位并导航到室内兴趣点。室内地图可以包括高亮标记特定区域（例如，房间、售货亭和其他位置）的叠层。它们还可以包括文本标签、图标和路线。

**示例 1**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/indoor-maps-example1@2x.png)

**示例 2**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/indoor-maps-example2@2x.png)

**示例 3**

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/indoor-maps-example3@2x.png)

**根据缩放级别调整地图细节**。细节过多可能会导致地图看起来杂乱无章。以各种缩放级别显示房间和建筑等大型区域。然后，随着地图放大，逐步增加更详细的特征和标签。机场地图缩小时，可能只显示航站楼和登机口，但放大时会显示各个商店和卫生间。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/indoor-maps-elevator@2x.png)

**使用不同的样式来区分地图的特征**。使用颜色和图标可以有助于区分不同类型的区域、商店和服务，并使用户能够轻松快速地找到其正在寻找的内容。

**如果场所具有多个楼层，请提供楼层选择器**。楼层选择器可以让用户在楼层之间快速跳转。如果实现此功能，请保持楼层编号的简洁性。在大多数情况下，楼层编号列表就已足够，而无需楼层名称。

**包括周边区域以提供情境**。邻近的街道、游乐场和其他附近地点都可以帮助使用地图的用户确定位置。如果这些区域不可交互，请进行调暗和使用明显不同的颜色来使其表现为补充内容。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/indoor-maps-surroundings@2x.png)

**考虑支持场所与附近中转点之间的导航**。通过提供往返于附近公交站、火车站、停车场、车库和其他中转地点的路线使用户在场所可来去自如。你还可以为用户提供快速切换到 Apple 地图的方法，以便获得其他导航选项。

**限制在场所外滚动**。这可以帮助用户避免在地图上轻扫过多时迷失方向。如果可能，始终在屏幕上显示至少部分室内地图。为了帮助用户保持方向感，你可能需要根据缩放级别调整允许的滚动量。

**设计自然得像你的 App 扩展的室内地图**。不要试图复制 Apple 地图的外观，而应确保区域叠层、图标和文本与 App 的视觉样式匹配。有关指南，请参阅[室内地图数据格式](https://register.apple.com/resources/imdf/)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/indoor-maps-custom-map-design@2x.png)

## 平台考量因素

*无针对 iOS、iPadOS、macOS、Apple tvOS 或 visionOS 的额外考量因素。*

### watchOS

在 Apple Watch 上，地图是地理位置的静态快照。在设计时将地图放置在界面中，并在运行时显示适当的区域。显示的区域不可交互；轻点它可打开 Apple Watch 上的“地图” App。你可以为地图添加最多五个注解，以高亮标记兴趣点或其他相关信息。有关开发者指南，请参阅 [WKInterfaceMap](https://developer.apple.com/cn/documentation/watchkit/wkinterfacemap)。

![](https://developer.apple.com/tutorials/images/com.apple.HIG/cn/maps-watch1@2x.png)

**使地图界面元素适合屏幕**。整个元素无需滚动即可在 Apple Watch 屏幕上显示。

**显示包含兴趣点的最小区域**。地图界面元素中的内容不会滚动，因此所有关键内容必须在显示区域内可见。

有关开发者指南，请参阅 [WKInterfaceMap](https://developer.apple.com/cn/documentation/watchkit/wkinterfacemap)。

## 资源

#### 开发者文档

[MapKit](https://developer.apple.com/cn/documentation/mapkit)

[MapKit JS](https://developer.apple.com/cn/documentation/mapkitjs)

[Indoor Mapping Data Format](https://register.apple.com/resources/imdf/)

#### 视频

- [深入探索 MapKit](https://developer.apple.com/cn/videos/play/wwdc2025/204)
- [使用 MapKit 充分优化位置相关功能](https://developer.apple.com/cn/videos/play/wwdc2024/10097)

## 更改日志

| 日期 | 更改内容 |
| --- | --- |
| 2024 年 12 月 18 日 | 新增了有关地点卡的指南并包括更多插图。 |
| 2023 年 9 月 12 日 | 新增了插图。 |
| 2022 年 9 月 23 日 | 新增了显示自定义信息的指南，优化了最佳实践，并将相关指南整合到单个页面中。 |
