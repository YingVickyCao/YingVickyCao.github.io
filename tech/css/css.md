# CSS

- 规则  
  CSS 中包含一些简单语句，成为规则。  
  每个规则为选择一些 HTML 元素提供样式。  
  选择器指定规则将应用哪些元素。

- 提供样式：html vs css？  
  css 更好。可读性、易修改

- 一个元素有很多属性，记不住所有，记住常见的属性。  
  CSS 参考书: O' Reilly `<CSS Pocket Reference>`

# 1 选择器(selector)

种类：  
(1) 元素选择器(element selector)  
(2) 类选择器 (class selector)  
(3) id 选择器 (id selector)  
(4) 子选择器(child selector)  
(5) 子孙选择器 (descendant selectors)  
(6) 伪类 (Pseudo-class)  
(7) 更多 CSS 选择器

- 伪元素 (Pseudo-class)
- 属性选择器

## (1) 元素选择器

- 一个元素可以有多个规则。  
  先把所有元素的共同样式归结在一组，再把一个元素的特定样式写在另一个规则中。

```css
<style type="text/css">
            h1 {
                border-bottom: 1px solid black;
            }
            h2{
                text-decoration: green underline;
            }
            h1, h2 {
                font-family: sans-serif;
                color: red;
            }
        </style>
```

- 选择器如何映射到创建的结构树：只能对 body 中元素增加样式。  
  ![css_selector_apply_html_tree](https://yingvickycao.github.io/img/css_selector_apply_html_tree.jpg)

- 样式继承  
  `<p>元素中的元素从<p>继承了color样式`

```
<head>
  <style type="text/css">
    p {
        color: red;
    }
  </style>
</head>
<body>
    <!-- em 继承了p的样式 color: red; -->
    <p>Android Studio provides the fastest tools for building apps on every type of <em>Android</em> device.</p>
</body>
```

![style_inherit](https://yingvickycao.github.io/img/style_inherit.png)

- 覆盖继承

覆盖继承值时，浏览器如何确定对某个元素应用哪个规则？  
使用最特定（最具体）的那个规则

如何确定哪些属性可以被继承？  
影响文本外观的属性都能被继承，e.g., color/font-family / font-size/font-weight/font-style. 其他属性不能被继承。

```
<head>
  <style type="text/css">
      p {
          color: red;
      }

      em {
          color: green;
      }
  </style>
</head>
  <body>
      <!-- em 提供特定规则来覆盖继承 color: green; -->
      <p>Android Studio provides the fastest tools for building apps on every type of <em>Android</em> device.</p>
  </body>
```

## (2) 类选择器

```css
p {
  color: green;
}

/* red is a class */
/* Apply for only p and h2 with red class */
p.red,
h2.red {
  color: red;
}

/* Apply for all element with red class */
.red {
  color: red;
}
```

- 哪些样式会被应用到某个元素？

```
选择器 ⟶  更特定的规则。若有多个class selector，css中最后定义的 is appied
  ↓
 继承
  ↓
默认值
```

- 元素可以加入多个 class

## (3) id 选择器

- 元素的唯一标识符
- 页面上只有一个元素
- 不允许页面中多个元素有相同的 id

```css
/*更具体 -> 生效
  选择 id 为footer 的p元素
*/
p#footer {
  color: green;
}

/* 择 id 为footer 的所有元素 */
#footer {
  color: red;
}
```

- id selector vs class selector

| id                                | class                                              |
| --------------------------------- | -------------------------------------------------- |
| WHEN：只有一个元素要设置某个样式  | WHEN：对多个元素使用某个样式                       |
| WHEN：在页面上指定元素位置        | -                                                  |
| 属性名为 id                       | 属性名为 class                                     |
| 以数字/字母开头，包含字母/数字/\_ | 以数字/字母开头，以数字/字母开头，包含字母/数字/\_ |
| #                                 | .                                                  |

## (4) 子选择器

直接的孩子

```css
/* h1 中 所有 直接孩子strong元素（所有的子） */
h1 > strong {
  color: green;
}

/* id 为 blue_h1  的 h1 中 所有 直接孩子 strong元素 （所有的子）  */
#blue_h1 > strong {
  color: blue;
}
```

## (5) 子孙选择器

所有的：子子孙孙

```css
/* h1 中 所有strong元素（子子孙孙） */
h1 strong {
  color: #c6f5c6;
}

/* id 为 blue_h1  的 h1 中 所有strong元素 （子子孙孙）  */
#blue_h1 strong {
  color: blue;
}
```

## (6) Pseudo-class 伪类

```css
/* 未访问 */
#div_test a:link {
  color: red;
}

/* 已访问 */
#div_test a:visited {
  color: green;
}

/* 鼠标悬停 */
#div_test a:hover {
  background: #007e7e;
  color: blue;
}

#div_test a:focus {
  color: #00ff00;
}

#div_test a:active {
  color: #ff00ff;
}

/* p 且 p是其父元素的第一个元素 */
p:first-child {
  background: aqua;
}

/* 属于h1，且 em 且 em是其父元素的第一个元素*/
h1 > em:first-child {
  background: red;
}

/* div 且 div是是其父元素的最后一个元素 */
div:last-child {
  border-color: orange;
  border-width: 5px;
  border-style: solid;
}
```

- How to set element's style according to it's status
  | `<a>` status(按顺序) | 默认 |
  | ------------------- | ------------------------------------------------ |
  | `:link`,未访问 | blue color |
  | `:visited`，已访问 | 紫色 color |
  | `:hover`，鼠标悬停 | 显示 title 属性，mouse hover on |
  | `:focus`，获取焦点 | (1) Mouse press up. (2) KeyBoard Tab on. Blue 框 |
  | `:active`，活动状态 | (1)Mouse press down. Red color. |

- For clicked link,check unvisited link color after clearing history.
- What is Pseudo-class  
  没有在 HTML 中真正输入 Pseudo-class .

  如何工作？  
  浏览器在后台创建这些类。 动态地，浏览器在后台这些类增加和删除元素。  
  e.g., 浏览器检查所有*<a>*元素，把他们增加到正确的伪类中。  
  For example:
  若一个链接已访问过，把它从其他伪类中拽出，扔进`:visited`伪类中。当用户鼠标悬停，把链接扔进`:hover`伪类中，当用户不再悬停，从`:hover`伪类中拽出。

## (7) 更多 CSS 选择器

### 伪元素 (Pseudo-class)

用来选择元素的某些部分

### 属性选择器

根据属性值来选择元素

```css
img[width] {
  border: green 5px solid;
}

img[width="100px"] {
  border: red 5px solid;
}
```

### 按兄弟选择(brother selector)

### 结合选择器

![combine_selector](https://yingvickycao.github.io/img/combine_selector.jpg)

# 3 CSS 验证工具

http://jigsaw.w3.org/css-validator/

# 4 `font-family`（字体系列）,`@font-face`

- 每个 font-family 包含一组有共同特征的字体。共有 5 个字体系列：sans-serif、serif、monospace、cursive 和 fantasy。每个字体系列包含大量字体。其中 sans-serif、serif 最常用。

## 列举字体系列中最常见的字体。

- Sans-serif 字体系列：  
  ① 字体没有衬线  
  ② 在计算机上屏幕上更容易识读  
  ③ 字体外观清晰、可读性好 。

![font_family_SansSerif](https://yingvickycao.github.io/img/font_family_SansSerif.png)

- Serif 字体系列字体系列：  
  ① 字体有衬线。衬线是字体末端的装饰性“小细线”。  
  ② 新闻报纸的文字排版 。  
  ③ 看起来高雅、很传统 。

  ![font_family_Serif](https://yingvickycao.github.io/img/font_family_Serif.png)

- Monospace 字体系列 ：  
  ① 字体包含固定宽度的字符。  
  ② 主要用于显示软件代码示例。  
  ③ 字体好像打印机打出来的。

  ![font_family_Monospace](https://yingvickycao.github.io/img/font_family_Monospace.png)

- Cursive 字体系列：  
  ① 包含看似手写的字体。  
  ② 有时会看到标题中使用这些文体 。  
  ③ 给人一种有趣或很风格的感觉。

  ![font_family_Cursive](https://yingvickycao.github.io/img/font_family_Cursive.png)

- Fantasy 字体系列：  
  ① 包含某种风格的装饰性字体 。  
  ② 给人一种有趣或很风格的感觉。

  ![font_family_Fantasy](https://yingvickycao.github.io/img/font_family_Fantasy.png)

- 不同的计算机上可用的字体往往不一致。  
  可用的字体的字体根据操作系统有所变化,而且要看用户已经安装了哪些字体和应用。机器上的字体可能与用户可用的字体不同。

## 使用 css 指定字体系列

![font_family_how_work](https://yingvickycao.github.io/img/font_family_how_work.png)

- font-family 属性，它实际上是一个字体优先列表。
- 最后一个放通用的字体系列名，如"sans-serif". 应当指定最全面的通用"sans-serif"和"serif"，它与列表中指定的所有其他字体应当在同一个字体系列中。
- "sans-serif"和"serif"并不是一个具体的字体名。如果 font-family 声明中指定的前几个字体都无法找到，浏览器会选择一个实际字体来代替"sans-serif"和"serif"。取代它的字体是浏览器为我们选择一个浏览器定义的该字体系列的默认字体。
- 大部分 PC 上都有 Verdana 字体。
- 大多数 Mac 上都有 Geneva。
- Arial 在 PC 和 Mac 上都很常见。
- 一个字体中包含多个单词，如何制定？  
  `font-family:"Courier New",Courier;`
- 使用哪个字体？"sans-serif" 还是"serif？  
  There are no rules. However, on a computer display, many people consider sans-serif the best for body text. You’ll find plenty of designs that use serif for body text, or mix serif fonts with sans-serif fonts. So, it really is up to you and what kind of look you want your page to have.

## Getting a new font-family

使用 Web 字体（Web Font）向用户的浏览器提哦功能一种字体。  
`@font-face`规则：允许定义一种字体的名字和位置，然后可以在页面中使用。

- How Web Fonts work?

![web_font_work_1.png](https://yingvickycao.github.io/img/web_font_work_1.png)

![web_font_work_2.png](https://yingvickycao.github.io/img/web_font_work_2.png)

![web_font_work_3.png](https://yingvickycao.github.io/img/web_font_work_3.png)

- 要使用一个 Web 字体，必须在一个服务器上托管字体文件吗？  
  仅仅测试，可以把这些字体出作为本地文件，存储在自己的文件系统并引用。  
  若为 Web 上的用户提供字体，必须把这些文件放在一个服务器上，或者利用一个托管服务，如 Google 的字体托管服务（免费）。

- Web 字体的缺点？  
  ① 获取 Web 字体需要花费时间。所以，第一次获取 Web 字体时，页面的性能可能受影响。  
  ② 管理多个字体文件费事。  
  ③ 移动设备和小型设备并不支持 Web 字体。因此设计中一定要考虑候选字体。
- 免费的 Web 字体托管商
  FontSquirrel
  https://www.fontsquirrel.com

Google Web 字体服务
http://www.google.com/webfonts

### How to add a Web Font to your page

Step 1 : Find a font  
访问提供字体的网站。
此类网站有很多，会提供免费以及需要授权的字体，允许在页面中使用。
"Emblema One" 是一个免费字体。

Step 2 : Make sure you have all the formats of the font you need  
`@font-face`CSS 规则是现在所有浏览器的一个标准。但存储字体使用的具体格式还不是一个标准。不同浏览器对很多不同格式提供了不同功能程度的支持。

常见格式  
①TryeType 字体：`.ttf`

②OpenType：`.otf`  
建立在 TryeType 基础上。

③Embedded OpenType（EOT）字体：`.eot`  
EOT 是 OpenType 的一种压缩格式。这种格式是专用的（Microsoft），仅 IE 提供支持。

④SVG（Scalable Vector Graphics）字体： `.svg`  
SVG 是一种通用的图片格式，SVG 字体使用这种格式表示字符。

⑤Web 开发字体格式：`.woff`  
建立在 TrueType 基础之上。已经发展为 Web 字体的一个标准。大多数浏览器都对这种格式提供很好支持。  
woff 或 Web 开发字体格式（Web open font format）是什么？  
Woff 是 Web 字体的标准字体格式。
所有现在浏览器上支持 Woff。以前不支持，因为缺少标准化，不同的浏览器会支持不同的字体格式。

Step 3 : Place your font files on the Web  
字体文件 URL

Step 4 : Add the @font-face property to your CSS

```css
@font-face {
  /*  font-family属性为字体指定任意一个名字。但通常与字体名一致*/
  font-family: "Emblema One";

  /*  
 src 属性告诉浏览器在哪里能得到这些字体。
浏览器会尝试加载每一个src文件，直到找到它能支持的一个文件。一旦加载，会为这个字体指定font-family属性中指定的名字
  */
  src: url("http://wickedlysmart.com/hfhtmlcss/chapter8/journal/EmblemaOne-Regular.woff"),
    url("http://wickedlysmart.com/hfhtmlcss/chapter8/journal/EmblemaOne-Regular.ttf");
}
```

Step 5 : Use the font-family name in your CSS

```css
p.font_face {
  /* 一旦用@font-face规则在浏览器中加载一个字体，就可以在font-family中使用这个字体  */
  font-family: "Emblema One", Verdana, Geneva, Arial, sans-serif;
}
```

Step 6 : Load the page

## `@font-face'

`@font-face'是一个内置的CSS规则，不是一个选择器规则。利用`@font-face'规则，可以获取一个 Web 字体，并分配以一个 font-family Web 字体。

# 5 `@import`

`@import'是一个内置的CSS规则。允许导入其他CSS文件，而不是HTML中通过一个`<link>`链入

# 6 `@media`

`@media`是一个内置的 CSS 规则。允许创建特定于某些媒体类型的 CSS 规则。如印刷业、桌面屏幕、手机。

# 7 `font-size`

- `font-size`常见使用方式

方式 1 : 像素
`font-size:14px`：用像素指定字体大小，是告诉浏览器字母高度是多少像素。

![font_size](https://yingvickycao.github.io/img/font_size.png)

方式 2 : 百分比  
`font-size:150%`:相对于父元素的字体大小的百分比。

方式 3 : 倍数  
 `font-size:1.2em` ：相对于父元素的字体大小的倍数

方式 4 : 关键字  
`font-size: medium;`

![font_size _keyword](https://yingvickycao.github.io/img/font_size_keyword.png)

每个关键字对应的大小通常有如下关系。每个大小大约比前一个大 20%。  
small 通常定义为 12px。但是每个浏览器中这些关键字的定义并不一定相同。如果用户愿意，他们可能重新给出他们自己的定义。  
指定文字大小为关键：浏览器会把这些关键字转换为像素值，它会使用浏览器中定义的默认值来完成这个转换。

```css
body {
  font-size: 14px;
}

h1 {
  font-size: 150%; /* 14px * 150% =  21px */
}

h2 {
  font-size: 1.2em; /* 14px * 1.2% =  14px */
}

h3 {
  font-size: medium;
}
```

- 如何指定字体大小？  
  这样设置，可以在大多数浏览器中得到一致的结果。

Step 1 ： 选择一个关键字，推荐 small or medium，指定它为 body 规则中的字体大小。这相当于野年的默认字体大小。  
Step 2 ：使用 em 或百分比，相当于指定 body 字体大小指定其他元素的字体大小。

好处：  
易修改：改变 body 字体大小，其他元素会启动安比例调整大小。  
用户改变字体带下，e.g.,用户调整页面大小 or 使用浏览器放大/缩小字体, 所有浏览器能按比例自动缩放字体大小。

```css
body {
/** 如果使用像素指定元素大小，old IE将不支持文本缩放。若使用关键字，IE也能正确缩放字体。   /
    font-size: small;
}

h1 {
    font-size: 150%;
}

h2 {
    font-size: 120%;
}
```

![font_size_without_zoom](https://yingvickycao.github.io/img/font_size_without_zoom.png)

![font_size_zoom](https://yingvickycao.github.io/img/font_size_zoom.png)

- `<body>`中定义一个字体大小？  
  定义的是页面的默认字体大小。  
  其他元素的字体大小可以按相对于父元素来设置。

- 不指定字体大小？  
  得到的是默认字体大小。默认字体大小取决于浏览器，甚至是浏览器版本。  
  大多数情况下，默认的 body 字体大小是 16 像素（16px）。

- 标题的默认大小？  
  同样，取决于浏览器。  
  通常`<h1>`是默认文本字体大小的 200%， `<h2>`是 150%，`<h3>`是 120%，`<h4>`是 100%，，`<h5>`是 90%，`<h6>`是 60%。  
  `<h4>`是字体大小与 body 字体大小相同。

- 在 body 规则中能使用 em 或 %?  
  可以。  
  body 规则中指定字体大小为 90%，则是默认字体大小的 90%。默认字体大小通常是 16px，则 90%是 14px。  
  若想一个字体大小与关键字指定的大小稍有区别，则可以使用 % 或 em。

- font-family、font-size 还有各种默认设置，在浏览器之间有太多不同，如何知道设计在其他浏览器上的效果怎么样？  
  在不同浏览器傻姑娘看起来稍微有点细微不同，不影响页面的可读性。  
  要希望在各种浏览器上有一直的外观，需要在大量浏览器中对页面进行测试，还可以更为精细。能找到各种 CSS 技巧，让不同的浏览器有相同的表现。但这些工作要花费时间，得不偿失。

# 8 `font-weight`

`font-weight: normal/bold/bolder/lighter;`  
bolder 和 lighter：使得文本稍粗或稍细一些。很少使用。通常没有任何效果。因为没有多少字体支持粗细程度的微小差别。

# 9 `font-style`

`"font-style: italic"`斜体  
并不是所有字体都支持斜体（italic）风格，实际上的到的是倾斜（oblique）的文本。  
![font_style_italic](https://yingvickycao.github.io/img/font_style_italic.png)

`"font-style: oblique"`倾斜  
![font_style_obique](https://yingvickycao.github.io/img/font_style_obique.png)

- italic 和 oblique 风格使得文字看起来是倾斜的。
- 因为浏览器和字体的不同，无论指定什么风格，结果并不确定，有时得到斜体，有时是倾斜文本。所以，完全可以用斜体，不担心它们的差距，因为根本无法控制。
- 把`<blockquote>`变成斜体,用一个`<em>`，还是 font-style？  
  用 font-style。
  `<em>`指定结构，表示一些文字要强调。`<em>`样式可能会变，不一定是斜体。  
  为`<blockquote>`指定样式，而不是指示强调`<blockquote>`中的文本。

# 10 Color

- Web 颜色如何工作？  
  Web 颜色由红、绿、蓝三个颜色构成，按分量所占比例来指定。每种颜色分别指定一个从 0%到 100%([~255]的数值，然后按它们混合起来得到最终的颜色。  
  混合颜色后，向屏幕发光，这样颜色显示出来了。

e.g., 80% Red,40% Green, 0% Blue：  
![color_rgb](https://yingvickycao.github.io/img/color_rgb.png)

0%：不参与混合。  
全部 0%：白色  
全部 100%：黑色

- CSS 颜色不区分大小写。

- 表示方法

① 按名指定颜色  
`background-color: silver`  
CSS 定义/支持 16 种基本颜色，150 种扩展颜色  
书本的颜色是印刷页面发射的的光。计算机上光从屏幕发出，因此，这些颜色可能与 Web 页面显示的颜色稍有不同。

② 按红、绿、蓝指定颜色

```
background-color: rgb(80%,40%,0%)
/
# 80% of 255  = 204
background-color: rgb(204,102,0)
```

③ 使用十六进制码指定颜色

```
# RRGGBB
background-color: #cc6600
/
# 缩写
background-color: #c60
```

可以使用一个 1600 万种颜色的调色板.

16 进制(hex,hexadecimal)[0,F]

```
0	1	2	3	4 	5 	6	7	8	9	10	11	12	13	15	15
0	1	2	3	4 	5 	6	7	8	9	A	B	C	 D	 E	 F
```

`#cc6600`  
=> CC(Red) 66(Green) 00(Blue)  
=> CC ?  
12 \* 16<sup>0</sup> + 12 \* 16<sup>1</sup> = 12 + 12 \* 16 = 204

- 如何找到 HTML 颜色？  
  Color Picker  
  颜色表 http://en.wikipedia.org/wiki/web_colors

- 要不要考虑 Web 安全颜色？  
  除非知道用户的显示屏仅支持优先的颜色，否则不用过多考虑 Web 安全颜色。  
  目前所说的考虑颜色，是为了选择最合适的颜色以最完美展示。

- 如何选择能合理搭配的字体颜色？  
  文本和背景，要使用对比度最大的颜色，来帮助提高可读性。  
  有的颜色搭配起来很怪。

# 11 `text-decoration` 文本装饰

- When 删除线和下划线, `<ins>` vs `text-decoration: line-through underline`?  
  ins：指定样式为删除线和下划线，标记插入的内容  
  text-decoration 指示需要删除的内容

- When 删除线, `<del>` vs `text-decoration: line-through`  
  del:指定样式为删除线，标记内容要删除  
  text-decoration：指定样式为删除线

- When 下划线？border-bottom vs text-decoration  
  `border-bottom: thin dotted #888888` > `text-decoration: underline`(仅仅文字)  
  border-bottom : 下划线 延伸到页面边缘  
   text-decoration：仅文本 有下划线

- text-decoration 可以为文本创建一个下划线。有下划线的文档会被用户误认为是链接文本，所有谨慎使用这个属性。

# 12 box model（盒模型）

- 盒模型？  
  CSS 看待元素的一种方式。  
  CSS 将每一个元素看作由一个盒子表示。  
  内边距、边框、外边距，相互之间无依赖关系。  
  段落使用内边距、边框、外边距的目的：把段落变成一个醒目的段落，更易阅读。

![box_module](https://yingvickycao.github.io/img/box_module.png)

## content area（内容）

- 元素的一些内容，比如文本或图像。这些内容会放在一个盒子里，这个盒子的大小正好包含所有内容。在内容区中，内容与盒子边缘没有空间。  
  Note : 截图，在内容区周围画了一个边界，是为了知道它有多大。但是，在浏览器中，内容区周围看不到这样的边界。

### widht 属性

widht 属性只指定内容区的宽度。  
 盒子的总宽度 = 内容区宽度 + 左右内边距+ 左右边框 + 左右外边距

See Picture box_width:  
 ![box_width](https://yingvickycao.github.io/img/box_width.png)

- 如何指定整个元素的宽度？  
  一个块元素的默认宽度，是 auto（自动）：  
  每个块元素都可以延伸沾满浏览器的整个宽度；  
  考虑到内边距、边框和外边距之后，允许内容填充可用空间；  
  指定内边距、边框、外边距和内容区宽度后，加起来就是整个元素的宽度。

- 整个元素的高度 ？  
  一个元素的默认高度，是 auto。  
  显示地设置一个高度，有风险。如果指定的高度不够大，放不下内容，内容底部会溢出到其他元素中。  
  不般不指定元素的高度，默认为 auto。

## padding（内边距）

- 所有盒子内容区周围可能有一层内边距。
- 内边距是可选的。
- 使用内边距，在内容和盒子边距之间创建一些看得见的空间。
- 透明的，没有颜色，也没有自己的装饰。呈现背景颜色或背景图片
- 上 ⟶ 右 ⟶ 下 ⟶ 左，四边独立
- div 的默认内边距是 0px
- 顺序很重要。

```css
 {
  padding: 25px;
  /* padding-left覆盖左，左=80px */
  padding-left: 80px;
}
```

## border（边框）

- 元素周围有一个可选的边框，该边框会包围内边距。
- 它围绕内容的一条线。
- 上 ⟶ 右 ⟶ 下 ⟶ 左，四边独立
- 宽度  
  border-width:像素/关键字,e.g,thin  
  关键字在每个浏览器可能代表不同像素值。如果 border-width 很重要，使用像素而非关键字。

* 颜色
* 样式：虚线等，8 种
* 圆角
* 顺序很重要。  
  略

- 缩写形式 : border

```css
 {
  /*  border:10px red solid; 顺序任意  */
  border-width: 10px;
  border-colort: red;
  border-style: solid;
}
```

长形式：可读  
简写：缩小 css 文件

## margin（外边距）

- 可选
- 紧挨着两个盒子，外边距=它们之间的距离
- 上 ⟶ 右 ⟶ 下 ⟶ 左，四边独立
- 透明的，没有颜色，也没有自己的装饰。呈现背景颜色或背景图片
- 顺序很重要。

```css
 {
  margin: 25px;
  /* margin-left覆盖左，左=80px */
  margin-left: 80px;
}
```

## 内边距 vs 外边距

| 内边距                                 | 外边距                               |
| -------------------------------------- | ------------------------------------ |
| 在内容周围增加额外的空间               | 提供元素之间的间距                   |
| 在边框内部                             | 在边框外部                           |
| 是元素的一部分                         | 包围元素，把它与其他元素隔开         |
| 元素的背景（或图片）会延伸到内边框下面 | 元素的背景（或图片）不会延伸到外边框 |

- 缩写形式:padding / margin

```css
 {
  /*  padding:10px;  */
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}
```

```css
 {
  /*  padding:10px 20px 30px 40px;  */
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 40px;
}
```

- 缩写形式 : background

```css
 {
  /*  background:red   url(images/logo.png)  repeat-x  顺序任意   */
  background-color: red;
  background-img: url(images/logo.png);
  background-repeat: repeat-x;
}
```

## `<img>` vs `background-img` 属性

| `<img>`                               | `background-img` 属性 |
| ------------------------------------- | --------------------- |
| 放置一个图像                          | 属于表现方面          |
| 作用在页面中更为重要，e.g.,logo，照片 | 目的让元素更有吸引力  |

# 13 布局与定位(摆放元素)

如何改变页面的布局？  
流体布局(liguid layout)、冻结布局(frozen layouts)、胶体布局、CSS 表格显示(CSS display:table)

```css
 {
  float: right/left;
}
```

如何在页面上定位元素？  
position 属性：static（静态定位）（默认值）、`absolute（绝对定位）`、fixed（固定定位）和 relative（相对定位）。  
使用定位也可以实现布局。

```css
 {
  position: absolute;
  top: 30px;
  left: 365px;
  right: 0px;
  bottom: 0px;
}
```

所有的设计都是建立在这里学到的布局（或它们的一些变种）基础之上。

- Flow  
  浏览器如何安排页面的所有元素，确定它们应该在哪里？  
  浏览器使用流（Flow）在页面上摆放元素。  
  块元素从上向下流，各元素之间有一个换行。默认，每个块元素占浏览器窗口的整个宽度。  
  内联元素在块元素内部从左上方流向右下方。如果需要多行，浏览器会换行，在垂直方向扩展外围块元素，来包含这些内联元素。

正常页面流中，浏览器会根据页面上放置元素类型对外边距做不同处理。  
（1）浏览器上下放置 2 个块元素时，  
垂直方向：浏览器会把它们共同的外边距折叠在一起，折叠的外边距高度是最大的外边距高度。即它们之间的距离是它们的相邻外边距的最大值(MAX)。  
![box_model_margin_of_two_block_elements](https://yingvickycao.github.io/img/html/box_model_margin_of_two_block_elements.jpg)

（2）浏览器上并排放置两个内联元素时，  
水平方向：它们之间的距离是它们的相邻外边距的总和(SUM)。  
![box_model_margin_of_inline_elements](https://yingvickycao.github.io/img/html/box_model_margin_of_inline_elements.jpg)

（3）浏览器中，一个元素嵌套另一个元素时，  
 若外面的元素有一个边框，则垂直外边距折叠。  
 若外面的元素没有一个边框，则垂直外边距不会碰到一起，不折叠。

内联元素可以有外边距吗？  
内联元素可以有，但是通常不设置。经常设置图像的外边距、内边距和边框。

文本（text）的内容不是元素，浏览器把它作为一个内联元素让它流入页面。

- float 属性  
  它的工作方式与浏览器如何将元素和内容流入页面紧密相关。  
  float 属性首先向左向右否浮动一个元素。然后它下面的所有内容会绕流这个元素。  
  绕流：像流体一样绕着这个元素流动。

```css
 {
  float: right/left;
  width: XXX;
  margin: XXX;
}
```

浮动元素从正常流中抽出，浮动到左边或右边。  
浮动元素在块元素之上，不会影响正常的页面流。内联元素会考虑浮动元素的边界，围绕着这个浮动元素。  
浮动元素必须有特定的宽度，不能设置为 auto。  
浮动元素的外边距不会折叠。与流入页面的块元素不同，浮动元素只是浮在页面上， 不会碰到正常元素的外边距，因此不会折叠。  
可以浮动内联元素。

float 经常用在图片上，让图像在文字中浮动，图像围绕它。  
![float1](https://yingvickycao.github.io/img/html/float1.jpg)  
![float2](https://yingvickycao.github.io/img/html/float2.jpg)

- clear 属性
  解决因 float 引起的重叠。

```css
clear: right;
```

- 流体布局：
  扩展浏览器窗口时，页面中的内容会扩展以适应页面。

- 冻结布局：
  内容的宽度是固定的，不会随着浏览器窗口扩展或收缩。  
  优点：可以更好控制设计。  
  缺点：不能有效利用浏览器宽度。

- 凝胶布局：
  内容的宽度是固定的，但是外边距会随着浏览器窗口扩展或收缩。通常把内容放在中央。  
  优点：通常更美观。

- 绝对布局
  使用绝对定位得到一个流体布局。

- 表格显示布局
  利用 CSS 表格显示得到一个布局。

- 绝对定位
  每一个绝对定位元素有一个 z-index 属性，它指向一个虚拟 z 轴上的位置。  
  绝对定位元素使用 z-index 属性分层放置，使一个元素在另一个元素的上面.  
  z-index 越大，它的层次越高，在屏幕上越靠近用户。  
  z-index 通常设置为 1，来确保元素出现在页面中其他元素的上面。  
  z-index 可以为负值。  
  `只有使用CSS绝对定位、相对定位或固定定位的元素有z-index。`  
  绝对定位元素不用指定宽度。不指定宽度，默认沾满浏览器的整个宽度-指定偏移量。  
  绝对定位可以将元素放在页面上的任何位置。

- 静态定位
  position 的默认方式。  
  将元素放在页面的正常流中。

- 固定定位  
  固定定位元素是相对于浏览器窗口定位。页面滚动时，固定定位元素不移动，页面的其他内容会在这些固定定位元的下面正常滚动。

- 相对定位
  相对定位元素首先正常流入页面，在页面上显示之前按指定量偏移，从而流出它们所在的空间。  
  相对定位通常用于更高级的定位和特殊效果。

- CSS 表格显示
  按一种表格布局来摆放元素。  
  使用时，增加块元素来对应 table/row/cell，块元素通常是`<div>`。  
  适合建立多栏布局。

```css
{
display:table
display:table-row
display:table-cell
vertical-aligin:top
}
```

| 属性              | 是否从页面的正常流中删除 | 如何放置？                         | the element is positioned reative to what                                        |
| ----------------- | ------------------------ | ---------------------------------- | -------------------------------------------------------------------------------- |
| position:static   | 不删除                   | 由浏览器来确定它放在哪里           |
| position:relative | 不删除                   | 按你指定的量来偏移元素             | 相对于其外围包含的元素来定位。即它还在它原本的位置上，相对 it's normal position. |
| position:absolute | 删除                     | 自己告诉浏览器应该把元素放在哪里。 | its first positioned (not static, if no have, use body)ancestor element.精确位置 |
| position:fixed    | 删除                     | 自己告诉浏览器应该把元素放在哪里。 | 相对于浏览器窗口的边界(viewport)                                                 |
| float:right/left  | 删除                     | 最终浏览器来确定它放在哪里         |

# 14 混合样式表

## 使用多个样式表

```
<link href="page-print.css" rel="stylesheet" media="print">
<link href="page-phone.css" rel="stylesheet" media="screen and (max-device-width:480px)">
```

在满足条件的情况下，按照`<link>`引入的顺序，从上到下、覆盖式的 SUM 属性：

- 相同属性覆盖
- 不相同属性：SUM
- 顺序很重要。  
  最下面的样式最优先。  
  一个样式表覆盖它上面的。  
  如果两个样式表包含冲突的属性定义，HTML 文件中最后链接的样式表最为优先。

## 如何修改样式表？

不修改样式表，而是链接样式表。该样式表是作为页面的基本修改。  
Step 1 : 链接样式表  
Step 2 : 提供功能想要的样式表 ，指定要修改的样式。

## 媒体查询`@media`

- `@media`:  
  指定应用该样式表的类型 。  
  指定特定属性的设备 。

- 支持的媒体属性 ？  
  http://www.w3.org/TR/css3-mediaqueries/  
  device-width  
  device-height  
  max-device-width  
  max-device-height  
  color  
  宽高比  
  方向

- 如何使用 `@media`?  
  Way 1 ：`<link>`。按链接顺序覆盖. CSS 很大时使用。  
  Way 2 ：CSS 中。按照定义顺序覆盖。CSS 很小时使用。

- 浏览器加载页面时，它会通过媒体类型来确定页面适用的规则，忽略不匹配的规则。

# 15 逻辑区

- 将页面划分为`逻辑区或逻辑分组（logical session）`。
- 定义：页面上彼此相关的一组元素（功能块）。e.g., 页眉、titlebar。
- How 将页面划分为逻辑区？

Step 1 : 找出逻辑区
Step 2 : 使用 div 标记逻辑区
Step 3 : 用 id 指定 div，来说明分组的含义
Step 4 : 为 div 增加 样式
Step 5 : 用 div 为页面增加更多结构
原因：  
① 展示页面的逻辑，提高可读性、可维护性。
② 为某个逻辑区应用样式。  
Step 6 : 在结构上增加结构（div 嵌套 div ）。  
不能滥用 div。  
如果只是为了增加大量结构而增加 div，除了让页面更复杂，没有任何好处。

# 16 `"text-align: center"` 文本对齐

- 只能设置在块元素上，设置在内联元素上不起作用。
- 对块元素中所有任何类型的内联元素对齐
- 设置 div 上，P 继承了 div 的 text-align 属性，p 自己将内容居中，因此 p 也是内容居中。而不是 div 本身将 p 的文本对齐。

# 17 TODO: line-height 行高

```
<body>
  <div>
    <h2>
    </h2>
  </div>
</body>
```

line-height is based on who's font-size  
继承  
| - | body | div | h2 |
| ---------------------------- | ----- | ----- | ----------------------------------- |
| default | small | small | 150% small,based on div |
| div style="line-height: 1em" | small | small | 100% of small,based on div |
| div style="line-height: 1" | small | small | 120% of small,based on itself h2 |

# 18 TODO:层叠样式表中的层叠

# 19 开发商特定的 CSS 属性

浏览器开发商通常为他们的增加新的功能来测试新特性，或 实现一直在考虑但没有得到标准组织批准的 CSS 扩展。在这些情况下，开发商会创建类似这样的 CSS 属性。

![browser_dev_css_attribute_1](https://yingvickycao.github.io/img/browser_dev_css_attribute_1.jpg)

![browser_dev_css_attribute_2](https://yingvickycao.github.io/img/browser_dev_css_attribute_2.jpg)
