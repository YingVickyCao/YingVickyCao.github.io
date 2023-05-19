# Font

# 1 Font 基本概念

## 字体格式

- TrueType（.tts）
- TrueType Collection(.ttc)  
  .ttc 是 TrueType 字体集成文件，包含多种字体。
- PostScript 字体(.PFM)
- 矢量字体（.FON）
- SVG(.svg)
- WOFF – Web Open Font Format (.woff)
- EOT – Embedded Open Type (.eot)
- OpenType (.otf)

## Glyph （字形）

Glyph 指文字的形状。  
同一个字可以有不同的字形。E.g., `a或ɑ`

![font_Glyph](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_Glyph.jpg)

## Typeface （字体）

```
typeface:a particular design of type.

A typeface is a particular set of glyphs or sorts (an alphabet and its corresponding accessories such as numerals and punctuation) that share a common design.
```

Typeface 是 一组具有相同设计风格的字形的集合。
通常集合包含了一套字母表和一些数字、符号。即 typeface 是 一套文字，用同一种风格或艺术形式

E.g., Excel 中的 Helvetica (黑体)是一种 typeface。  
![font_excel_Helvetica](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_excel_Helvetica.png)

typeface 是一个抽象的总体概念，它是一款设计。  
`Helvetica 是一款 typeface.`

### 衬线字体

衬线字体在字母末尾包括轻微的装饰性笔划（称为衬线）.
![font_typeface_serif](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_typeface_serif.webp)

### 无衬线字体

无衬线字体就是“无衬线”——它们不包括字母末端的装饰性笔划.  
屏幕上无衬线字体比衬线字体更具可读性。
常见： Arial、Helvetica 和 Tahoma。

![font_typeface_sans_serif](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_typeface_sans_serif.webp)

### 脚本字体

脚本字体最常见于徽标之类的东西。脚 本字体起源于手写和书法。  
适合：大标题、标题和 logos  
常见：可口可乐徽标
![font_typeface_script](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_typeface_script.webp)

### 粗衬线字体

粗衬线字体可能有圆形或有角的衬线。它们的块状形状比传统的衬线和无衬线字体更引人注目。  
最适合较短的文本，例如大标题或标题。  
![font_typeface_slab_serif](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_typeface_slab_serif.webp)

### 显示字体

适合：大标题和标题。不适合用于正文，因为它们在小尺寸时难以阅读。  
![font_typeface_display](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_typeface_display.webp)

### 等宽字体

等宽字体:每个字母都占据相同的水平空间.  
等宽字体可读性低于比例字体。  
适合：代码。更容易扫描、发现错误。  
常见；Courier、Courier New、Apercu Mono 或 Space Mono
![font_typeface_monospaced](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_typeface_monospaced.webp)

### 手写字体

模仿手写，随意，且创新。
常见：艺术签名
![font_typeface_handwriting](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_typeface_handwriting.webp)

## Font（字型）

```
A font is a particular set of glyphs within a typeface.
font : a set of type of one particular face and size.
```

字型是字体的一种粗细、宽度和样式。

![font_style](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_style.webp)

`Helvetica Regular 是一个 font/字型/字体文件。`
`Roboto 是一种字体，而它的变体，例如粗体、常规和斜体，则是字型。

`现在 typeface 与 font 的概念逐渐混淆，也称“font”为“字体”。`

### 常规字体 Regular

介于细字体和粗字体之间。
默认字体。
适合大段文字。

### 粗体

用途：用于强调 - 在吸引用户注意力的地方突出部分文字。  
`如果你试图将注意力集中在所有事情上，你最终什么也没有引起注意。`

### 斜体字体 Italic

用途：
用于强调 - 只有几个单词或句子。  
用于电影、书籍或戏剧等事物的标题。

## Typeface vs FontFamily vs font

Adobe Garamond、Stempel Garamond 是两个不用厂商生产的两个 typeface。  
如果购买、使用的产品，则被称为“font/font family“。  
同一个 typeface 可能有不同的产品版本：Adobe Garamond font family（1993 年），Adobe Garamond Pro font family（后来），是同一个 typeface，但是不同的 font family。

字体（Typeface）是一种服装类型，例如来自特定设计师的连衣裙、裤子或衬衫。  
typeface，指它的设计。

字型（Font）将是特定样式和尺寸的连衣裙。
font，指具体产品或文件。

fontfamily，指产品实体的某个系列或某种集合。

理解 :类比 1  
![font_typefaces_vs_fontfamily_font](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_typefaces_vs_fontfamily_font.png)  
typeface：Iphone/Samsung Phone，是这种产品的一种概念，没有实体。  
Galaxy S20 / Galaxy S20 Ultra，是可以购买的一种产品，有实体。

理解 :类比 2  
购买音乐，音乐本身是 typeface，它的 mp3 格式（载体）是 font。

## font family（字体家族）

一个字族包含不同字体。
基本的字族包括细体、标准、粗体、斜体。

![font_FontFamily](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_FontFamily.png)

## FontWeight（字重/字体粗细）

字重是指字体笔画的字体的粗细程度。  
一般在字体家族名后面注名 Thin、Light、Regular、Blod、Black、Heavy 等。  
最常见的字重是粗体和常规体。

- W3C CSS font-weight 标准： 字重（100-900）：

```xml
Name:	font-weight
Value:	normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900


Values meaning:
normal  :   400
bold    :   700
bolder  :   Specifies a bolder weight than the inherited value.
lighter :   Specifies a lighter weight than the inherited value.
```

![font_FontWeight](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_FontWeight.jpg)

![font_font_weight_values_meaning](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_font_weight_values_meaning.png)

- 不同字体厂商划分自重格不相同。  
  [Adobe Typekit](https://helpx.adobe.com/fonts/using/css-selectors.html) 字库中对字重描述的划分列表中，它列出 Heavy 指的是 800 而不是 900.

```
800 = heavy
900 = black
```

<br/>

- 一些字体只提供 normal 和 bold 两种值。

并不是每种字体都有如此多的字重。如果有些字体只有 2、3 重字重，怎么办？  
W3C Fonts 的解决方案：  
(1) 字重和 400 大致符合将会归为 `Regular、Book、Roman`;和 700 大致符合将会归为 Bold。  
(2) 若一个重量所指定的字形不存在，则应当使用相近重量的字形。  
通常，较重的重量会映射到更重的字形、较轻的重量会映射到更轻的字形。

![font_fontweight_miss_solution](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_fontweight_miss_solution.png)
<br/>

![font_fontweight_miss_solution_1](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_fontweight_miss_solution_1.png)

- IOS 字体的字重

![font_FontWeight_of_apple](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_FontWeight_of_apple.png)

- Android 设备中，安卓系统默认的中文字体是：思源黑体。 英文字体是：Roboto 字体。  
  Roboto 字体,有 6 个字重。是 Material Design 的推荐字体。
  ![font_roboto](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_roboto.png)

- CSS 中设置 font-weight 为什么不起作用？
  原因：大部分 windows 系统的中文字体粗细只有一个型号。  
  解决：操作系统安装安装了该字体家族的全部的字重字体。

## 字体大小

虽然各个平台单位不同，但都有字体大小。

# 2 Font 文件

以.ttf,.ttc 文件为例。  
安装字体，在 fontbook 中查看。
Font 文件名、font family、style 信息，一般遵循 fontfamily、 font-weight 和字型（style）规则。

![font_font_Avenir](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_font_Avenir.png)

![font_info](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_info.png)

# Ref

- [设计师必看的字体与排版应用指南](https://www.xueui.cn/tutorials/logo-tutorials/font-and-typesetting-application-guide.html)
- https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight
- https://www.w3school.com.cn/cssref/pr_font-weight.asp
- https://drafts.csswg.org/css-fonts-3/#font-weight-prop
- https://www.w3.org/html/ig/zh/wiki/CSS3%E5%AD%97%E4%BD%93%E6%A8%A1%E5%9D%97
- https://www.jianshu.com/p/701c054c3605
- https://www.jianshu.com/p/ac8a1a80383d
- https://www.jianshu.com/p/d398f2085e1b
- https://www.jianshu.com/p/736268d94aeb
- https://www.jianshu.com/p/27fb31de4b17
