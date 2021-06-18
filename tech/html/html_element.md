# HTML 元素

# 1. `<style>` 元素

```
<head>
  <style type=“text/css”>
  </style>
</head>
```

- `<style>` In `<header>`
- 为何必须制定样式类型(`type=“text/css”`)?  
  type 可选。  
  HTTML 设计者一开始认为以后应该还有其他样式。  
  事实上，使用`<style>`可以不带任何类型属性

# 2. `<heade>`元素

网页信息

# 3. `<body>`元素

浏览器中看到的信息

# 4. `<a>` 链接

- `href= hypertextreference` 超文本引用:  
  href 属性 告诉 `<a>`元素链接的目标文件.  
  href 是互联网或计算上一个资源的别称。  
  通常这个资源是 Web 页面。但可以指向任何类型的资源。

- 链接的类型

1. `<a>` 文字链接 // 常见
2. `<a> + <img>`图片链接 // 常见
3. 链接一个`<p>`等

- 链接的类型 2  
  相对路径：只能站内
  URl：通常用来链接其他网站 => 绝对路径

- 网站内部和外部页面都通常使用 URL，可以吗？  
  可以。  
  Web 页面中由很多 URL 时，会很难管理：
  URL 很长，不容易编辑；
  影响 HTML 可读性。

如果一个网站使用 URL 链接到本地页面，移动时，必须修改 URL 来反映新的网站位置。  
如果使用相对位置，只要页面仍在原来文件夹中，无须修改`<a>`-href 属性。

- 链接锚点  
  创建锚点：锚点的创建，通过设置元素的 id 或 name 属性值即可实现  
  `name`属性 HTML 4 only. HTML5 已废弃，使用 全局属性 id 来代替。
- 通过 a 标记的 target 属性，可以设置新网页开启的窗口
- 邮件链接. 点击后，会自动跳转到 Emal app，并弹出界面,让用户操作。

`<a href="mailto:47613354@qq.com"> 联系拉登 </a>`

- 根具体上下文，`<a>`既可以是内联元素，也可以是可以是块元素： `<a>`可以包围块元素和文本。

## `<a>` - title 属性：所要链接页面的文本描述。

视力障碍 - 屏幕阅读器 => `Go to Page2`,而非把整个 URL 读出来。

```
<a href="linked/page2.html" title="Go to Page2">Page 2</a>
```

## `<a>` - `id`：直接链接到页面中某个特定位置-元素。

- 带 id 的元素特性：直接链接到此类元素。
- 使用 id 指定锚点位置，也就是创建`<a>`的目标.锚点位置是页面上的任何文本。通常是标题。
- 元素不是`<a>`，如何为该元素创建一个工具提示？  
  任何元素增加 title 属性。  
  有些元素不只使用 title 属性作为工具提示，还有其他用途。  
  工具提示是最常见的用法。
- 可以为任何元素增加 id 属性。
- 所有元素中属性的顺序不重要。
- id 的 set 和 get 要一致，大小写敏感，否则不工作。
- id 名在页面中必须唯一。
- 通常在页面最上面定义一个目标 top，在页面最下面定义一个目标“Back to top”
- 指向目标标题的链接

```
http://abc.com/buzz/index.html#coffe  // work
http://abc.com/buzz/#coffe            // work
http://abc.com/buzz#coffe             // not always work。浏览器会自动在URL默认加/，可能取代id引用
```

- 怎么告诉别人可以链接到那些目标？
  没有既定的方法。查看源代码是发现链接目标最古老也是最好的方法。

```
index.html
<a href="linked/page2.html#id_in_page2" title="Go to Page 2 Id">Id in Page 2</a>

page2.html
<p id="id_in_page2">Id in Page 2</p> // 锚点， id_in_page2 是标识符号
```

## `<a>` - `target`链接到一个新窗口

- 没有指定要使用哪个特定窗口，浏览器会在同一个窗口中打开这个页面
- `target=“\_blank”：浏览器总是打开一个新窗口显示页面。  
  得到的是新标签页，而不是新窗口。大多数浏览器的默认设置，在一个标签页中打开新窗口，而不是一个全新的浏览器窗口。  
  新标签页和新窗口实际一样，但标签页可以共享原窗口的窗口边框。  
  大多数浏览器可通过设置首选项，强制打开一个新窗口。
- `target=“any_name”`：相同 target 指定的目标名的所有链接在同一个窗口中打开。  
  为 target 指定一个特定名字，就是对显示链接页面的新窗口命名。  
  `“_blank”`是一种特殊情况，告诉浏览器总是使用一个新窗口。

- 浏览器越来越智能：  
  浏览器通常会在同一个浏览器窗口中一个新标签页中打开一个新页面，而不是在一个全新的窗口中打开（用户打开很多窗口后，容易迷失）。

- 使用各种不同设备和浏览器的用户，target 属性可能会有问题。  
  视力障碍的人 —— 屏幕阅读器：打开新窗口，有些屏幕阅读器会发出一个声音。另外一些会完全忽略新窗口，也可能直接跳到新窗口。

## 完善链接

- 站内使用相对链接 => 可维护性
- title 属性中添加额外信息
- 链接标签要简洁
- 链接标签有意义 `=>` 提高页面可用性
- 不要把链接放在一起，否则用户很难区分。

# 5. `<q>` 短的引用

- 段落/现有文字的一部分
- 不同浏览器效果不同 -> 定制样式
- 浏览器通常会在 q 元素周围包围引号（“引用文字“）。

# 6. `<blockquote>` 块引用

- 单独显示，一段或多段文字
- 不同浏览器效果不同 -> 定制样式
- 浏览器通常会对 blockquote 元素进行缩进处理。
- `cite` 属性规定引用的来源。 主流浏览器均不支持 cite 属性。不过，搜索引擎可能会使用该属性获得更多有关引用的信息。

# 7. `<br/>` 换行

- 作用仅仅是插入换行符，提供一个换行
- Void 元素
- `<br/>`是块元素和内联元素之间的模糊地带。它会创建一个换行，但不会像两个`<p>`把文本分成单独的两块。

# 8. 自定义列表 dl

- dl 中只能包含 dt 和 dd 两种标记，而且 dt 中不能包含 block 标记，但是 dd 可以包含。
- 列表中每一项都有一个定义术语`<dt>` 和一个定义描述`<dd>`

# 9. 无序列表 `<ul>`

- ul type="disc/circle/square"
- `<ul>`与`<li>`一起使用，不能嵌套其他标签
- 嵌套列表

# 10. 有序列表 `<ol>`

- `<ol>`与`<li>`一起使用，不能嵌套其他标签
- 嵌套列表
- ul/ol  
  list-style-image 指定列表标记图像。  
  list-style-type 改变列表中使用的列表标记类型。

# 11. `<h1<> ~ <h6>`

- 只有 h1 到 h6
- h7 就是 p

# 12. `<pre>` 预格式化

- 浏览器按照输入的方式原样显示为文本，例如保留空格
- 常见应用：源代码

# 13. `<p>` 段落

- `<p></p>`标记中可以包含文字、图片及其他的 inline 标记，但是不能有 block 标记包括其他的 p 标记
- 使用空的段落标记 `<p></p>` 去插入一个空行是个坏习惯。用 `<br />` 标签代替它
- 浏览器忽略了源代码中的排版（省略了多余的空格和换行）。  
  对于 HTML，您无法通过在 HTML 代码中添加额外的空格或换行来改变输出的效果。  
  当显示页面时，浏览器会移除源代码中多余的空格和空行。所有连续的空格或空行都会被算作一个空格。需要注意的是，HTML 代码中的所有连续的空行（换行）也被显示为一空格。
- p != 什么都不加

# 14. <time> 时间/日期

# 15. `<em>`

- 使用不同方式显示文本，例如强调一个重点
- 不要滥用强调

# 16. `<strong>` 特别强调文本 - 加粗

# 17. `<i>` 强调文本 - 斜体

- HTML5 i = em

# 18. `<img>` 添加图片

### 浏览器如何处理图像？

浏览器从服务器获取 html 文件，并显示 h/标签。  
`<h>`:显示  
`<img>`:先获取，再显示

![browser_how_to_show_image1.jpg](https://yingvickycao.github.io/img/browser_how_to_show_image1.jpg)

![browser_how_to_show_image2.jpg](https://yingvickycao.github.io/img/browser_how_to_show_image2.jpg)

![browser_how_to_show_image2.jpg](https://yingvickycao.github.io/img/browser_how_to_show_image3.jpg)

![browser_how_to_show_image2.jpg](https://yingvickycao.github.io/img/browser_how_to_show_image4.jpg)

## Web 最常用的格式是 3 种格式，JPEG、PNG 和 GIF

### JPEG：图片和复杂图像

- 最适合连续色调图像，如照片
- 可以表示包含多达 1600 万种不同颜色的图像
- “有损”格式：缩小文件时会丢掉图像的一些信息。
- 不支持透明度
- 文件比较小，以便 Web 页面更高效地显示
- 不支持动画

### PNG：单色图像、logo、文本图像和几何图像、多颜色、多颜色透明

- 最适合单色图像和线条构成的图像，如 logo、剪贴画和图像中小文本。
- PNG 可以表示包含上百万种不同颜色的图像。  
  PNG 有 3 种：PNG-8(256 颜色数)、PNG-24、PNG-32，取决于需要表示多少种颜色。
- “无损”格式：PNG 会压缩文件来缩小文件大小，缩小时不会丢掉信息。
- 支持透明度。将颜色设置为透明度，使图像下面的东西可以显示出来。
- **_与相应的 JPEG 文件相比，取决于使用的颜色数，PNG 文件更大一些，可能比相应的 GIF 文件小，也可能更大。_**
- `=>` 可以象 JPEG 表示复杂图像，也可以像 GIF 无损
- `=>` 为何需要无损图像？  
  文件小、快速下载
- `=>` 图像包含无锯齿透明区：多种颜色透明，透明区的边缘时平滑的。

### GIF：单色图像、logo、文本图像和几何图像、**_单颜色透明_**

- 最适合单色图像和线条构成的图像，如 logo、剪贴画和图像中小文本。
- 表示最多 256 种不同颜色的图像
- 无损格式
- 支持透明度。但仅允许设置一种颜色为透明度
- GIF 文件往往比相应的 JPEG 文件大。
- **_支持动画_**

## 图像是如何工作的？

- `<img>`指向图像。图像并不是 HTML 页面本身的一部分。  
  浏览器显示页面时，图像会取代`<img>`元素。  
  HTML 页面是纯文本。因此图像无法直接作为页面的一部分，它是单独存在的。

## `<img src=“图片地址”/>`

- 空标记元素 + inline 标记元素

- 如何确定 Web 页面的一个图像的 URL？  
  Way1:Copy Image Address：URL  
  Way1:Open Image in New Tab：URL  
  Way1:View Source：相对路径；使用网站域名和图像路径重新构建它的 URL

- 为什么 JPEG 照片比 GIF/PNG 照片好，或者 GIF/PNG logo 优于 JPEG logo？  
  优于通常是结合图片质量和文件大小而言。  
  JPEG 照片一般比同质量的 PNG 或 PNG 照片要下。  
  GIF/PNG logo 看卡来比 JPEG 格式效果好，文件也可能更小。

- GIF 和 PNG 如何选择？  
  选 PNG：  
  PNG 的压缩要稍稍优于 GIF，所有对于同一个颜色数相同的图像（`<=256`），PNG 格式文件可能更小。  
  颜色`>256`色，而 GIF 无法提供，JPEG 也不能提供透明。

  选择 GIF：  
  动画

- 默认情况下，图片底部与文字底部平齐
- HTML 中的图片只显示三中格式 GIF、JPE(JPEG)和 PNG. 显示其他格式的图片 -> `<a>`
- 从技术上讲，`<img>` 标签并不会在网页中插入图像，而是从网页上链接图像。`<img>`标签创建的是被引用图像的占位空间。

- longdesc HTML 4 only  
  URL 描述要显示图像的 URL 描述，是对 alt 文本的补充。

```
<img longdesc="URL">
```

## 使用 alt 属性提供候选格式，应对图片无法正确显示

![img_alt](https://yingvickycao.github.io/img/img_alt.jpg)
当无法显示图像时，浏览器如何处理 alt 属性？  
显示 alt 属性，而非图像。  
不同浏览器处理不同，导致结果可能不同。

## 为什么需要 alt 属性？

alt 属性时`<img>`元素的必要属性。  
1） 当图片无法显示，alt 属性使用 alk 文字代替图像。  
2） 对于失利障碍用户，屏幕阅读器阅读页面时，读出 alt 文字，以帮助更好理解页面。

## 使用 width and height 属性调整图像大小

- 单位：像素 px

- 没有指定高度和宽度？  
  在浏览器在页面中显示此图片之前会自动确定图像的大小。

- 为什么要指定高度和宽度？  
  指定：  
  浏览器在显示图像之前开始建立页面布局。

  不指定：  
   浏览器在知道图像大小之后，通常需要重新调整页面布局。  
   浏览器在下载 HTML 文件并开始显示页面之后猜下载图像。浏览器下载图像之前，除非告诉它，否则它无法知道图像大小。

- 可以通过提供比图像实际尺寸更大或更小的宽和高，使浏览器缩放图像来满足指定的大小。但最好不要使用 widht 和 height 来达到此目的。

- width 和 height 属性通常成对使用，但也可以只指定一个，但通常不会如此做，除非把图像缩放到某个特定宽度或高度。

- 用 HTML 提供结构，不用于提供实现。width 和 height 等这些看起来是表现属性，如何理解？  
  取决于如何使用这些属性。  
  把图像宽和高设置为正确的尺寸，则它们只是提供信息。  
  使用宽和高属性调整浏览器中图像大小，则它们只是提供表现。

## 图像 1200 像素太大，超过浏览器窗口尺寸 800 像素？

- 如果图像在窗口中刚好放下，说明浏览器可能打开了“auto image resize”选项。
  不要依赖此特性：  
  部分浏览器由此特性；  
  大图像需要服务器和浏览器不必要地传输更多数据，导致页面加载很慢，可用性降低；  
  移动设备查看 Web 网页，太大图像会影响设备数据使用。

- 不能让用户用滚动条查看图像：  
  页面很难使用；  
  使用滚动条很麻烦；  
  访问者不能一次看到完整的图像；  
  大图像需要服务器和浏览器传输更多数据，这会耗时多，可能导致页面显示速度很慢，特别是网速很慢时。

- 为何不能使用 width 和 height 属性来调整页面图像的大小？  
  在浏览器缩放图像使它适应页面大小之前，仍然需要获取整个大图像。  
  width 和 height 属性实际上是帮助浏览器确定为这个图像预留多大空间。如果使用这两个属性，则它们应该与图像的实际宽度和高度一致。

- 浏览器的窗口宽度是 800 像素？  
  计算机显示屏是由数百万个成为像素的点组成。  
  ![html_px.jpg](https://yingvickycao.github.io/img/html_px.jpg)  
  大多数人通常把浏览器宽度设置为 800 ～ 1280 像素之间，因此，一般经验是将图像最大宽度设置为 800 像素，网页内容也一样。

- 像素数与屏幕上图像的大小有关系吗？

![px_vs_screen_pic_size.jpg](https://yingvickycao.github.io/img/px_vs_screen_pic_size.jpg)

- 图像应该设置多大？  
  由页面设计决定。  
  logo：宽度 100 ～ 200 像素  
  图像：宽度小于 800 像素。  
  `+` 缩略图：加快网页速度。用户点击缩略图，查看原来的大图像

## 调整图像大小以适合浏览器

- 原始图像：1200 像素宽 \* 800 像素高
- 调整后图像：600 像素宽 \* 400 像素高。  
  希望图像的宽度小于 800 像素。  
  调整为 JPEG 格式。  
  改变质量设置时，质量和文件大小会随之改变。  
  通过实践，逐步了解对图像和所要开发的 Web 页面类型，需要怎样的质量等级，以及图像格式。

## 修改网站，使用缩略图

问题：  
一个页面上有很多大图时？  
页面加载速度越来越慢；  
用户大量滚动才能看到全部图像。

解决：  
每个照片有一个缩略图，单击缩略图，查看更大图像。

- 调整图片：保持宽高比
- thumbnails 文件夹
- `<img>`是内联元素。HTML 中有多个图像，浏览器窗口足够时，浏览器会把它们并排摆放。不足够，从上到下显示各个大图像，但相互之间没有间距。

## 把缩略图变成链接

```
// 把图像作为一个单击的链接
<a>
  <img/>
</a>
```

- 链接到一个 HTML vs 直接链接到 JPEG 图像？

  链接到一个 HTML：  
  更好；  
  提供上下文。

  直接链接到 JPEG 图像：  
  一般不推荐。  
  单击链接时，浏览器直接在一个空白页显示这个图像，不能提供上下文。

## logo 应该使用什么格式？

### 透明度

适合各种背景的页面。  
大多数照片编辑应用以背景里的棋盘图案告诉这个区域是透明的。  
PNG/GIF 格式。
![logo_transparent.jpg](https://yingvickycao.github.io/img/logo_transparent.jpg)

### matte（蒙版）

- logo 字母周围有白色光晕。
- Photoshop Elements 创建一个 matte，根据背景颜色柔化文本边缘：设置页面背景色 = 蒙版颜色。  
  ![logo_matte.jpg](https://yingvickycao.github.io/img/logo_matte.jpg)

- 创建使用蒙版 logo 后，页面背景色发生改变了，会怎么样？  
  若背景色只是稍微调整，则可能注意不到任何差别。  
  若背景色有很大变化，则必须使用新的蒙版颜色重新创建 PNG。

- 为什么需要柔化文本边缘  
  ![logo_mypod.jpg](https://yingvickycao.github.io/img/logo_mypod.jpg)

第 1 个版本：  
边缘有锯齿，显示生硬，可读性差。这是计算机屏幕显示文本的默认方式。

第 2 个版本：  
使用反锯齿（anti-aliasing）的技术来柔化它的边缘。  
经过反锯齿处理的文字，在计算机屏幕上更刻度，眼睛看起来更舒服。

- 什么情况下使用蒙版？  
  反锯齿处理可以相对背景色柔化边缘。  
  Photoshop Elements 中 Matte 允许指定文本背景的颜色。所以，柔化文本，会根据这个颜色来完成柔化。  
  这种技术不仅仅适用于文本，还适应于图形可能导致“锯齿”的所有线条。myPod logo 中圆也使用了蒙版。

# 19 `<map>` 图片地图

通过 usemap 属性绑定 map 标记元素

# 20 `<form>` 表单

form 是一个 block 标记元素.

表单在浏览器中如何工作？  
Step 1 ： 浏览器加载页面  
浏览器加载页面的 HTML，遇到表单元素时，它会页面上创建控件。  
Step 2 ： 用户输入数据  
Step 3 ： 用户提交表单  
按钮提交按钮，提交这个表单。浏览器打包这些信息会打包并发送到一个 Web 服务器。  
Step 4 ： 服务器响应  
提交表单，这些信息会打包并发送到一个 Web 服务器，由一个服务器脚本处理。处理的结果是一个全新的 HTML 页面，它将返回给浏览器，浏览器会显示这个页面。  
![how_does_form_work](https://yingvickycao.github.io/img/html/how_does_form_work.jpg)

form 元素如何工作？  
![table_border_spacing.jpg](https://yingvickycao.github.io/img/html/table_border_spacing.jpg)

提交一个Web表单时，表单数据值与相应的数据名配对，所有的名和值会发送到服务器。
## `<input type="text"/>` 单行文本输入

=> android EditText, maxLine = 1  
定义单行的输入字段，用户可在其中输入文本。默认宽度为 20 个字符。

```html
First name: <input type="text" name="firstname" value="" /> <br />

<!-- Placeholder 属性，表单中大多数不同类型的input 元素都可以使用placehold属性。 -->
<input
  type="text"
  name="firstname"
  value=""
  placeholder="Please input first ame"
/>

<!-- Required属性，可以用于任何表单控件
            若浏览器支持该属性，如果没有为这个控件指定指，点击提交，会得到一个错误信息，表单不会提交服务器。
            若浏览器不支持该属性，表单可以提交。
        -->
<input type="text" placeholder="Please input first name" required />
<br />
```

http://www.w3school.com.cn/tags/tag_form.asp  
http://www.w3school.com.cn/tags/att_input_type.asp

## `<input type="submit"/>` and `<button type="submit"/>` 提交按钮

=> android button + request + jump page click event

```html
<!-- 提交输入 -->
<input type="submit" />

<!-- 提交输入 -->
<button type="submit" />
```

淡季提交按钮，数据会发送到表单的 action 属性中指定的服务器脚本进行处理。  
http://www.w3school.com.cn/tags/att_input_type.asp  
http://www.w3school.com.cn/tags/tag_form.asp

## `<button>` Button => android Button

`<button>`控件 与 `<input type="button">`  
请始终为按钮规定 type 属性。Internet Explorer 的默认类型是 "button"，而其他浏览器中（包括 W3C 规范）的默认值是 "submit"。  
注释：如果在 HTML 表单中使用 button 元素，不同的浏览器会提交不同的按钮值。请使用 input 元素在 HTML 表单中创建按钮。  
重要事项：如果在 HTML 表单中使用 button 元素，不同的浏览器会提交不同的值。Internet Explorer 将提交`<button>` 与 `<button/>` 之间的文本，而其他浏览器将提交 value 属性的内容。请在 HTML 表单中使用 input 元素来创建按钮。

## `<input type="reset"/>` and `<button type="reset"</button>` 重置按钮

=> android button + clear input  
置按钮会清除表单中的所有数据。  
http://www.w3school.com.cn/tags/att_input_type.asp

## `<input type="hidden"/>` 隐藏字段 => android visible="gone"

隐藏字段对于用户是不可见的。隐藏字段通常会存储一个默认值，它们的值也可以由 JavaScript 进行修改。

## `<input type="password"` 密码 => android EditTxt inputType="password"

## `<input type="image">` 嵌入的图像 => android ImageButton/ImageView

每出现一次，一个 Image 对象就会被创建。  
http://www.w3school.com.cn/tags/att_input_type.asp  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image

## `<input type="file">`

在 HTML 文档中 `<input type="file">` 标签每出现一次，一个 FileUpload 对象就会被创建。

```html
<!-- 文件输入 -->
<input type="file" name="doc" />
```

## 复选框输入

=> android CheckBox

```html
<!-- 复选框输入 -->
<input type="checkbox" name="spice" value="Salt" /> Salt
<br />

<input type="checkbox" name="spice" value="Peper" />Peper
<br />

<input type="checkbox" name="spice" value="Garlic" />Garlic <br />
```

## 单选钮输入

=> android radioButton

```html
<!-- 单选钮输入 -->
<input type="radio" name="hotornot" value="hot" /> Hot
<br />

<input type="radio" name="hotornot" value="not" /> Not
<br />
<br />
```

## 数字输入

```html
<!-- 数字输入 -->
<input type="number" min="0" max="20" />
```

## 范围输入

```html
<!-- 范围输入 -->
<input type="range" min="0" max="100" step="5" />
```

## 颜色输入

```html
<!-- 颜色输入
如果浏览器不支持颜色输入元素，该控件会创建一个常规的文本输入控件。
-->
<input type="color" />
```

## 日期输入

```html
<!-- 日期输入
如果浏览器不支持日期选择控件格式指定日期，该控件会创建一个合法的日期格式串，发送给服务器脚本。
-->
<input type="date" />
```

## Email 输入

```html
<!-- Email输入
email <input> 是一个文本输入元素。但在一些移动浏览器上，开入输入时用户会得到一个方便输入email的定制键盘。
-->
<input type="email" />
```

## url 输入

```html
<!-- url输入
url <input> 是一个文本输入元素。但在一些移动浏览器上，开入输入时用户会得到一个定制键盘。
-->
<input type="url" />
```

## tel 输入

```html
<!-- tel输入
tel <input> 是一个文本输入元素。但在一些移动浏览器上，开入输入时用户会得到一个定制键盘。
-->
<input type="tel" />
```

## `<label>` => android TextView

```
<label for="male">Male &nbsp;&nbsp;</label>
```

## `<textarea>` 文本域(Textarea)

```html
<textarea rows="10" cols="30">
This example cannot be edited,because our editor uses a textarea for input,
            and your browser does not
allow a textarea inside a textarea.
</textarea>
```

text input vs textarea?  
text input:  
(1) 1 行 。  
(2) 浏览器有很大的限制范围，通常不会超出这个范围。可以使用 maxlength 属性设定最大长度。

textarea：  
（1）更长的多行文本  
（2）HTML 中没有办法限制用户渐入多少文本。

## `<fieldset>` 分组 => android ViewGroup + 边框

围绕数据的 Fieldset。  
对组件进行分组。外面加一个边框，把 form 一堆标签框起来。

```html
<!-- 组织元素 -->
<p>组织元素</p>
<fieldset>
  <legend>Condiments</legend>
  <input type="checkbox" name="spice" value="salt" /> Salt<br />
  <input type="checkbox" name="spice" value="peper" />Pepper<br />
  <input type="checkbox" name="spice" value="garlic" />Garlic<br />
</fieldset>
<br />
<fieldset>
  <input type="checkbox" name="spice" value="salt" /> Salt<br />
  <input type="checkbox" name="spice" value="peper" />Pepper<br />
  <input type="checkbox" name="spice" value="garlic" />Garlic<br />
</fieldset>
```

## `<legend>` 分组的标题 => android ViewGroup 的 tag

- legend 元素为 fieldset 元素定义标题（caption）。

## `<select>` 单选或多选列表 => android spinner / 类似 android radiogroup，但方向不同

```html
<!--  用于创建一个菜单，以供做出选择
      select：菜单
      option：菜单项
-->
<p>菜单</p>
<select name="characters">
  <option value="Buckaroo" selected>Buckaroo Banzai</option>
  <option value="Tommy">Perfect Tommy</option>
  <option value="Penny">Penny Priddy</option>
  <option value="Jersey">New Jersey</option>
  <option value="John">John Parker</option>
</select>
```

下拉列表框是一个可选列表.
默认选中第一行。
`<option>` 单选或多选列表的选项 => android spinner item / 类似 android radioButton，但方向不同  
`selected`设置默认选中的行。即预选值。  
预选值指预先指定的首选项。

## `<optgroup>` ,=> 类似 android radiogroup，但方向不同。

`<optgroup>` 标签定义选项组 , 用来组合选项.

## method:POST 和 GET

- 浏览器发送数据时，使用的主要方法有两种：POST 和 GET。  
  GET :  
  (1) GET 和 POST 请求对发送的数据都有一个限制，POST 请求的限制通常宽松一些。  
  (2) 直接显示在 URL 中，很不安全。  
  GET 会打包表单变量，会把这些数据追加到 URL 的最后，然后服务器发送一个请求。  
  使用 GET 时，浏览器像以往那样用正常的 Web 页面。追加后的 URL，浏览器会把它当做一个普通请求来处理。

  POST :  
   (1) 同 GET，略。  
   (2) 不会显示在 URL 中，较安全。  
   POST 同样会打包数据，在后台把它们发送到服务器。  
   使用 POST，浏览器实际上会创建一个小数据包，并把它发送到服务器。
![post_get.jpg](https://yingvickycao.github.io/img/html/post_get.jpg)

- 如何选择？  
  GET :  
  (1) 希望用户能够对提交表单后的结果页面加书签。  
  服务器返回一个搜索结果列表，用户把结果添加书签，下次可以直接看，而不用再填写表单。

  POST :  
   (1) 返回的结果页面不希望用户加书签。  
   有一个处理订单的服务器脚本，不希望用户书签这个页面。否则，每次他们返回到这个书签时，都会重新提交这个订单。  
   (2) 数据是私有的。例如，信用卡或一个口令。  
   (3) 使用了一个 textarea，因为可能发送大量数据。

- GET 和 POST 提交的最大数据？  
  GET：  
  url 不存在参数上限的问题，HTTP 协议规范没有对 url 长度进行限制。  
  get 方式提交的数据的大小，http 协议并没有硬性限制；而是浏览器及服务器，操作系统有关。

  POST：  
   理论上讲，post 是没有大小限制的，http 协议也没有进行大小限制。  
   传输数据最大理论上没有限制，取决于服务器器设置和内存大小。

  https://blog.csdn.net/qq_37458496/article/details/84889516

## 关于可访问性

应该 label 元素 代替简单文本为表单元素增加标签。   
好处：  
(1) 可以提供页面结构的更多信息。  
(2) 更容易使用 CSS 对标签设置样式。  
(3) 对于视力障碍的人，有助于使用屏幕阅读器更准确地标识别表单元素。  

```html
<!--  选择咖啡为全豆咖啡，还是 研磨咖啡? -->
<!-- <input type="radio" name="beantype" value="whole" /> Whole Bean<br />
            <input type="radio" name="beantype" value="ground" checked /> Ground -->
<input type="radio" name="beantype" value="whole" id="whole_beantype" />

<label for="whole_beantype"> Whole Bean </label><br />
<input
  type="radio"
  name="beantype"
  value="ground"
  id="ground_beantype"
  checked
/>
<label for="ground_beantype">Ground</label>

<!-- Numbers of bag:<input type="number" name="bags" min="1" max="10" /><br /> -->

<label for="bags">Numbers of bag:</label>
<input id="bags" type="number" name="bags" min="1" max="10" /><br />
```

# 30. `<span>` 被用来组合文档中的行内元素。

- 使用 `<span>` 来组合行内元素，以便通过样式来格式化它们。
- 它是 inline 标记元素，和其他的 inline 元素一样，它只能包含 inline 标记元素。

- 用与内容含义最接近的的元素来标记内容

| 元素   | 含义           |
| ------ | -------------- |
| span   | 改变文本样式   |
| em     | 强调为某些文字 |
| strong | 强调为重点     |

# 31 `<div>` 分块

- HTML 中有两个顶级类标记:`<div>`和`<span>`：  
   构建中重要的支撑结构。

  | span                   | div                    |
  | ---------------------- | ---------------------- |
  | 为内联内容创建逻辑分组 | 为块状内容创建逻辑分组 |

  `<div>` 和`<span>`都没有预设的格式。 => 加上 div 和 span 前后，文本变现没有任何差异。  
   通过它们的 id 或 class 属性结合 CSS 进行定制。

- div 通常被描述为“容器”
- 一种 block 标记元素，他可以定义一个元素，也可以用来给 HTML 网页分块
- `<div>` 可定义文档中的分区或节（division/section）。 也就是分块。
- `<div>` 标签可以把文档分割为独立的、不同的部分。它可以用作严格的组织工具，并且不使用任何格式与其关联。

- 可以对同一个 `<div>` 元素应用 `class` 或 `id` 属性，但是更常见的情况是只应用其中一种。这两者的主要差异是，`class` 用于元素组（类似的元素，或者可以理解为某一类元素），而 `id` 用于标识单独的唯一的元素。

- div 可增加边框
- 对 div 应用样式，而不是对单个元素应用样式。并不是 div 所有都能被子元素继承。

# 32 `<sup>` 上标。

- 定义上标文本。
- 改变文本的位置会改变含义。
- 不能用于样式上的目的。这时应该使用 CSS 样式： `vertical-align` 属性的 `super` 值能实现相同效果。

# 33 `<sub>` 下标。

- 定义下标文本。
- 改变文本的位置会改变含义。
- 不能用于样式上的目的。这时应该使用 CSS 样式： `vertical-align` 属性的 `sub` 值能实现相同效果。

# 34 `<s>` 不再相关，或者不再准确

- 使用 `<s>` 元素来表示不再相关，或者不再准确的事情

# 35 `del>` 删除

- 定义文档中已被删除的文本。
- 使用删除线来渲染文本
- 请与 `<ins>` 一同使用，来描述文档中的更新和修正。
- `<strike>`（已废弃） 元素， `<s>`（已废弃）元素， `text-decoration:line-through` 属性， 效果同`del>`。

# 36 `<ins>` 插入

- 定义已经被插入文档中的文本
- 带有下划线
- HTML `<s>` 元素 使用删除线来渲染文本。使用 `<s>` 元素来表示不再相关，或者不再准确的事情。但是当表示文档编辑时，不提倡使用 `<s>` ；为此，提倡使用 `<del>` 和 `<ins>` 元素。
- 请与 `<del>` 一同使用，来描述文档中的更新和修正。

# 37 `<kbd>` 键盘输入

- 它表示文本是从键盘上键入的。它经常用在与计算机相关的文档或手册中。
- HTML 键盘输入元素(`<kbd>`) 用于表示用户输入，它将产生一个行内元素，以浏览器的默认 monospace 字体显示。
- 通过定义 CSS 规则可以改变 kbd 的默认字体。用户首选项设置可能会比该 CSS 规则具有更高优先级。

# 38 `<samp>` 标识计算机程序输出

- 通常使用浏览器缺省的 monotype 字体（例如 Lucida Console）。
- 可以使用 CSS 选择器 samp 定义规则来覆盖浏览器的缺省字体。不过，用户设置的偏好可能会优先于指定的 CSS 使用。

# 39 small 小一号字体

- 每个 `<small>` 标签都把文本的字体变小一号，直到达到下限的一号字。
- HTML 中的`<small>`元素將使文本的字体变小一号.
- `<small>` = CSS `font-size:1.2em`

# 40 big 大一号字体

- The HTML Big Element (`<big>`) 会使字体加大一号（例如从小号(small)到中号(medium)，从大号(large)到加大(x-large)），最大不超过浏览器的最大字体。
- 每一个 `<big>` 标签都可以使字体大一号，直到上限 7 号文本
- depressed .替代方案是使用 `CSS font-size:1.2em` 属性来。

# 41 `<b>` 粗体

- HTML 提醒注意（Bring Attention To）元素 / 粗体（Boldface）元素 / 粗体
- 你不应将 `<b>` 元素用于显示粗体文字；替代方案是使用 CSS `font-weight` 属性来创建粗体文字。

# 42 i 斜体

# 43 tt 等宽字体

- 类似打字机或者等宽的文本效果
- 这个元素已废弃。使用更加适当的元素，例如带有 CSS 的 `<code>` 或者 `<span>` 来代替。

# 44 var 定义变量

- 斜体
- 表示变量的名称，或者由用户提供的值。
- 显示算机编程代码范例，可以用 `<code>` ,`var`,`<pre>` ，`<tt>(depressed)`标签

# 45 code

- 定义计算机代码文本。
- HTML `<code>` 元素呈现一段计算机代码. 默认情况下, 它以浏览器的默认等宽字体显示.
- CSS 规则可以覆盖浏览器默认的 code 标签字体样式. 但用户设置的浏览器字体选项可能会超过 CSS 的优先级, 使之无效.

# 46 dfn

- 定义特殊术语,词或者网页流行词
- `<dfn>` 还可能有助于创建文档的索引或术语表
- `<dfn>` 标签尽量少用为妙

# 47 cite

- 参考文献引用
- cite = Citation
- 按照惯例，引用的文本将以斜体显示。
- 它可以使你或者其他人从文档中自动摘录参考书目。 也就是：方便搜索引擎或其他平台的查询或现实。

# 48 acronym

首字母缩写

- [Depressed]acronym = Acronym
- by the way => BTW
- HTML5 中不支持 `<acronym>` 标签。请使用 `<abbr>` 标签代替。  
  HTML5 中不支持 `<acronym>` 标签，但是在 HTML 4.01 中支持。

# 49 `<abbr>` 缩写 => 单词的缩写

- please -> pls

# 50 address 地址

- 强调标记内容是地址，但是不是所有的地址都可以用它，比如 Email 地址

# 51 table

HTML 表格。
表格用于表示表格数据，不是建立页面布局。

```
table
tr:table row  ： 表行
th:table header ： 表头
td:table data cell : 表格数据
```

```css
table {
  margin-left: 20px;
  margin-right: 20px;
  border: thin solid black;
  /* 不支持caption 属性的浏览器中，标题仍然显示在表格上方 */
  caption-side: bottom;
  /* border-spacing: 10px 30px; */
}
```

- 折叠边框
  表格的盒模型有外边距、边框、内边距。但外边距有点不同：  
  不同单独地为某个单元格设置外边距，要为所有单元格设置一个共同的间距。  
  border-spacing：边框间距，指单元格之间的空间。  
  ![table_border_spacing.jpg](https://yingvickycao.github.io/img/html/table_border_spacing.jpg)

  ```css
  /* 如何折叠边框？
    Way 1 : border-spacing: 0px;
    Way 2 : border-collapse: collapse;
    */
  ```

  ![table_border_spacing2.jpg](https://yingvickycao.github.io/img/html/table_border_spacing2.jpg)

- 跨行/跨列

  ```html
  <!-- 占据2列 -->
  <td colspan="2" style="text-align: center;">2020/10/8</td>

  <!-- 占据2行 -->
  <td rowspan="2">5000</td>
  ```

- 嵌套表格
