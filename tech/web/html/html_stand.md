# HTML 标准 规范

## 书写标准的 HTML 的好处?

① 网页在不同的浏览器中显示一致；  
② 标准的网页加载速度更快，并且在一些设备上运行更好。更容易被因视力障碍而使用屏幕读取器的用户接受。  
③ 能保证网页更好地与 CSS 结合。  
④ 减少将来的工作  
⑤ 减少显示错误：标记不匹配。

## 规范是什么？

规范是一个文档，指定 HTML 标准是什么：HTML 中有哪些元素和属性。  
该文档由 W3C 维护。  
W3C（万维网协会， World Wide Web Consortium）

## 什么是“标准的”或“规范的”HTML？

标准的 HTML 是指 HTML 使用的版本符合人们认可的“标准”。  
HTML4.01 和 HTML5 是标准的 HTML。  
规范只是网页符合标准的另一个说法而已。

## html 简史

- HTML 1.0 - 2.0 ：
- HTML 3.0：Netscape vs Microsoft。程序员受害：两套代码：IE 和 Netscape。
- HTML 4.0：W3C 制定 HTML 标准。  
  这个计划的关键:  
  1）把 HTML 的结构和表现分解到两种语言：CSS（表现）和 HTML（实现结构）  
  2）要求浏览器制造商采用这些标准。

- HTML 4.01  
  与 4.0 变化不大， 修补某些方面。  
  XHTML 1.0 = XML + HTML。声称`严格性`来消除 web 争端。Web 开发人员更看重 HTML 灵活性，而非严格性，因此没有得到大家支持。  
  HTML 和 XML（另一种标识语言）合并产生了 XHTML。XHTML 继承了 HTML 的通用性和与浏览器兼容性，XML 的严密性和可扩展性。

- HTML 5.0(HTML)：支持 4.0，并提供一些新特性。

## HTML 版本

告诉浏览器使用的是什么版本，浏览器就能知道该用哪一个规则去显示网页。  
添加文件类型定义 DOCTYPE，告诉浏览器使用的是什么版本。

![html_4.01.jpg](https://yingvickycao.github.io/img/html/html_4.01.jpg)

```
HTML 5.0
<!DOCTYPE html>
/
<!doctype html>
```

- HTML 新的 `活标准`  
  不指定特定版本号，也不指定某个标准。HTML 不会再有版本 6，7，8.  
  规范不断变化，加入新特性和更新。

- 向后兼容(backwards compatibility)：  
  继续往 HTML 追加新内容。浏览器会支持该新内容。同时，支持原来内容。因此，即时规范新增了新特性，现在写的 HTML 页面也能在新规范中正常工作。

![html_is_backwards_compatibility.jpeg](https://yingvickycao.github.io/img/html/html_is_backwards_compatibility.jpeg)

- HTML5 的新元素和新属性要尽快使用吗？  
  没必要。物尽其用，用最适合的元素完成最擅长的工作。

- 不再应该说“HTML5”。HTML5 是 HTML 的最后一个版本，应该叫 HTML，是一个活的标准。

- 忘记写结束标记？  
  浏览器看到错误时，会绕开错误。虽然能兼容一些错误，但不同浏览器处理的方式可能不同，导致页面显示不同。  
  如果 HTML 书写错误或不符合标准，不同的浏览器使用不同的方法处理不够完美的 HTML，因此，网页在不同的浏览器上显示的结果通常也不同。

- 如果告诉浏览器使用的是 HTML 4.01，而实际上并非如此，这样会有什么后果？  
  浏览器将会发现使用的不是 HTML4.01 并且回到转换显示模式。  
  转换显示模式下，不同的浏览器采用不同的方式处理网页。

- 遵循 HTML 标准，可以确保网页在不同的浏览器中得到一致的显示结果。

## 验证标记是合法的？

使用网上免费的工具检查网页是否符合标准：  
http://validator.w3.org/

- W3C 校验器，W3C 制定标准的人提供
- 通查页面，确保所有标记都是合法的。确保与标准保持一致。
- “Using experimental feature:HTML5 Conference Checker“（使用实验性特性：HTML6 符合型检查工具） 。
  验证工具根据 HTML5 标准检查 HTML。  
  由于 HTML5 不是最终标准，因此验证页面得到的结果也不相同。  
  经常检查页面，以保持与最新的 HTML 标准保持一致。

## `<meta>`

添加<meta>标记，告诉浏览器一个 Web 页面的额外信息，如内容类型和字符编码。

- html5

```
<head>
<!--  html5 -->
 <meta charset="utf-8">
<head/>
```

- html <=4.01

![meta.jpg](https://yingvickycao.github.io/img/html/meta.jpg)

```
<head>
 <!--  html <=4.01 -->
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
</head>
```

![meta_4.01.jpg](https://yingvickycao.github.io/img/html/meta_4.01.jpeg)

```xml
<!--
  width=device-width ：表示宽度是设备屏幕的宽度
  initial-scale=1.0：表示初始的缩放比例
  minimum-scale=0.5：表示最小的缩放比例
  maximum-scale=2.0：表示最大的缩放比例
  user-scalable=yes：表示用户是否可以调整缩放比例
-->
<!-- 想要一打开网页，则自动以原始比例显示，并且不允许用户修改  -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

```xml
<!-- 让网页的宽度自动适应手机屏幕的宽度 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />
```

https://blog.csdn.net/nvzizhou/article/details/46360607

- 字母编码  
  字符编码告诉浏览器页面使用了哪一种字符。英文？中文？  
  浏览器不能区分使用哪一种字符。 浏览器只能读取数据，猜测使用哪种字符。猜错可能导致页面显示错误，甚至带来潜在漏洞，让黑客有机可乘。有了字符编码就不需要浏览器区猜测。  
  字符编码提供了一种方法，可以在计算机上某种语言的所有字母、数字和其他符号。  
  保存文件的编码 = <meta>标记制定的编码一致。

- 统一标准是 Unicode，一种编码就可以表示所有语言。
- utf-8
  utf-8 是 Unicode 编码系列中一种。  
  大多数 Web 页面的 HTML 文件都是 utf-8 编码。<meta>标记的 charset 属性值通常是 utf-8.  
  utf-8. 与 ASCII 兼容。

- ASCII 是英语文档常用的一种编码。
- 查询字符编码更多信息  
  https://www.w3.org/International/O-charset.en.html

## 严格的 HTML4.01 的参考书：

多做练习掌握和巩固严格的 HTML4.01 规则。陷入迷惑时，可以查找 HTML 参开书或者使用 W3C 校验器。  
从严格的 HTML4.01 中摘录了一套常见的规则。

![ref_html_4.01_book.jpeg](https://yingvickycao.github.io/img/html/ref_html_4.01_book.jpeg)

![html_4.01_rule_1.jpeg](https://yingvickycao.github.io/img/html/html_4.01_rule_1.jpeg)

![html_4.01_rule_2.jpeg](https://yingvickycao.github.io/img/html/html_4.01_rule_2.jpeg)

## 应该遵循严格的标准，还是过度的标准？

严格的标准。  
① 使用严格的标准能考虑向以后更严格的标准过度。  
② 严格的标准是的转型 XHTML 更容易。  
③ 严格的标准，是升级一个站点的唯一方法，它会让更容易更新到下一个 HTML 版本。

许多浏览器有两种显示 HTML 的模式：处理旧版本 HTML 的“转换显示”模式和处理 HTML 4.01 的标准模式。  
如果写的是完全合法的 HTML 4.01，就使用严格的 DOCTYPE。  
如果用的是包含面向显示的元素和属性的过度 HTML，就使用过度的 DOCTYPE。

## 转向 XHTML 添加一个 X 到 HTML

XML 是一种可以用来开发新标记语言的语言。  
HTML 是一门标记语言。  
XHTML 是 XML。

使用 XHTML 取代 HTML 的理由：  
① 使用 XHTML 改进网页，使得它们能够利用最新最好的浏览器特性。  
② 语法更严格。语法更适合用于专门为视觉障碍人士设计的屏幕读取器和其他浏览器以读取网页内容。  
③ 能被扩展，添加新的标记。  
③XHTML 是移动设备等浏览器采用的语言。  
④XHTML 兼容 XML，读取 XML 的现行程序都能读取 XHTML。  
⑤ 既保留了 XML 存储大量结构化的文档，又跟 HTML 一样兼容 CSS。

### 关于 HTML4.01 转化为 XHTML 1.0 的简单清单：

![xhtml_list.jpeg](https://yingvickycao.github.io/img/html/xhtml_list.jpeg)

### 将严格的 HTML 转化为 XHTML 1.0 的 3 个步骤：

步骤 1：将 DOCTYPE 改为严格的 XHTML 1.0.

![html_to_xhtml_1.jpeg](https://yingvickycao.github.io/img/html/html_to_xhtml_1.jpeg)

步骤 2：添加 xmlns 属性、lang 属性和 xml:lang 属性到`<html>`元素。  
![html_to_xhtml_2.jpeg](https://yingvickycao.github.io/img/html/html_to_xhtml_2.jpeg)

步骤 3：所有的空标记都应以“ />”结尾，而不是以“>”。

```
HTML 4.01中：<br>
XHTML 1.0中：<br/>  -> <br />
```

对于空元素，为了兼容较旧的浏览器，能它们能识别，在"/>"的斜杠前加一个空格。

将 XHTML 的根标签设计为`<html>`的原因：XHTML 要与 HTML 兼容，使得旧浏览器也能知道如何显示。

### 如何将 HTML 转化为 XHTML？

- 方法 1：使用http://validator.w3.org/ （W3C 校验器）。和校验 HTML 一样来校验 XHTML。校验器读取 DOCTYPE，以确定校验规则为 XHTML。
- 方法 2：使用 Tiny 工具。http://tidy.sourceforge.net/

- 选择 HTML，还是 XHTML？  
  XHTML 浏览器都是是严格的，不接受不合法的 XHTML。  
  当使用 XHTML 时，有一些浏览器会当做 HTML。在最坏的情况下，浏览器可能在转换显示模式下显示网页。  
  XHTML 与 HTML 之间的差异很微小，能够快速转换。目前还是选择使用 HTML 吧。  
  文章的剩余都将使用 XHTML。
