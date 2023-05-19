# HTML

# 1. HTML

- HyperText Makeup Language 超文本标记语言
- 严格意义上 HTML 算不上是一种编程语言，而是一种标记语言.
- 可以包含空白字符（空格、回车、制表符等），但并不显示。目的是增加 HTML 可读性。
- HTML 是简单的文本文件，没有特殊格式。用.html 与其他文本区分开来。
- 如何显示的？

![how_to_show_html.jpg](https://yingvickycao.github.io/img/how_to_show_html.jpg)

Brower:  
1). 翻译标记  
2). 按内置的默规则显示元素,如字体、颜色等  
3). 定制 CSS 格式化规则，以获得最佳显示 `=>` CSS

# 2. 编译器？

- 学习阶段使用简单的编译器。高级的帮忙做了很多工作，学习东西变少了。

# 3. 浏览器

- 不同的浏览器处理页面的形式存在细微差别。=> 使用不同浏览器测试。
- 主流浏览器：Chrome，IE，FireFox,Opera，Safari

# 4. Element 元素

![element.jpg](https://yingvickycao.github.io//img/books/head_first_html_and_css/element.jpg)

使用成对的标记包围页面内容，来告诉浏览器页面的结构.

- 元素 = 开始标记 + 内容 +结束标记
- 通常提到的“标记” == 元素
- 标记应该匹配。即使不正确，浏览器有一定的容错性，也能正确解析。
- 使用工具来验证标记匹配。
- 养成好习惯，保证标记匹配。
- 标记可以嵌套
- 标记不必同行
- 元素可以有属性。属性提供元素的一些额外信息。

## Block vs Inline

![block_vs_inline.jpg](https://yingvickycao.github.io/img/block_vs_inline.jpg)

## 块(block) 元素：

- 前后各有一个换行，即单独显示，自动添加换行.  
  换行 = 换一行。  
  `=` 按 Enter 键。  
  使用块元素，浏览器会使用换行符来分割每一块.
- 页面的主要构建模块

## 内联(inline) 元素：

- 行内，嵌套在 block 标记中
- 标记小段内容

设计一个页面时，一般先从较大的块开始，然后在完善页面时再加入内联元素.

## 正常元素 vs void 元素

### Void 元素

![html_void.jpg](https://yingvickycao.github.io/img/html_void.jpg)

- 原先叫 “空元素”。后来改名为 Void 元素。
- 没有内容。 由于结束标签没有任何意义，因此它没有结束标签。
- `<br>` 还是 `<br />`?  
  在 XHTML、XML 以及未来的 HTML 版本中，不允许使用没有结束标签（闭合标签）的 HTML 元素。  
  即使 `<br>` 在所有浏览器中的显示都没有问题，使用 `<br/>` 也是更长远的保障。
- void 来源于计算机

# 5. Attribute 属性

![attribute.jpg](https://yingvickycao.github.io/img/attribute.jpg)

- Web 浏览器只识别每个元素的一组预定义的属性。 不能识别新属性。
- 浏览器能识别一个元素或属性时，称浏览器“支持”这个元素或属性。应该只使用支持的属性或元素。
- HTML5 已经支持定制数据属性，允许为新属性构造定制的属性名
- 标准委员会决定支持哪些属性
- 一个给定的元素只能使用某些特定的属性。

# 6. CSS

- CSS = Cascading Style Sheets 层级样式表
- 指定颜色的方式
  方式 1：十六进制 - `#RRGGBB`

# 7. HTML vs CSS

HTML 和 CSS 是 2 种不同语言。

- HTML: 创建结构 - 标记
- CSS： 创建样式，控制表现-指定元素特性

| html | css  |
| ---- | ---- |
| 结构 | 表现 |

# 8. 组织

- 顶级文件夹：根文件夹，包含所有文件
- 描述文件夹的方式：倒立的树  
  常见组织方式：  
  方式 1：

```
- f1
- f2
- images
```

方式 2：

```
- f1
  > images
- f2
  > images
```

- 用`/`分割路径中各个部分.  
  在 Web 使用通用分隔符`/`，跟操作系统无关.

- 为网站选择的文件夹名和文件名不要使用空格
- 构建初期组织网站文件，这样不用在网站升级时修改大量路径

# 9. 嵌套 => 俄罗斯套娃

- 嵌套 = 一个元素放在另一个元素中
- 嵌套构建 HTML 页面
- 网页中元素的嵌套关系是一个正立的家族树  
  `<html>`是根元素。  
  `<html>`是`<body>`的父元素。  
  `<body>`是`<html>`的子元素。
- 嵌套的好处？使用嵌套确保标记匹配.

![nest.jpg](https://yingvickycao.github.io/img/nest.jpg)

- 标记不匹配？ 页面在一些浏览器上正常工作，另外一些可能不正常

# 10. 字符实体 character entity

因为浏览器使用`<` and `>`来开始和结束标记，HTML 内容使用这两个字符会有问题。  
HTML 使用字符实体的缩写来表示一些特殊字符。  
`<`：`&lt;`  
`>`：`&gt;`

- URL 常见字符实体  
  http://www.w3school.com.cn/tags/html_ref_symbols.html

- 详尽的字符实体清单  
  http://www.unicode.org/charts/  
  `www.unicode.org`包含许多的不同字和语言，只有用户浏览器所在设备安装了正确的字体，浏览器才能正确显示这些字符。

# 11. 域名

![domain.jpg](https://yingvickycao.github.io/img/domain.jpg)

- 域名 = 一个唯一的名字，用来定位网站
  域名的作用：  
  1） 唯一  
  2）将网页链接到其他网站

- 域名的后缀名

```
.com
.org
.gov
.edu
// 表示不同国家
.co.uk
.co.jp
```

- 域名由一个集中的权威机构（ICANN）控制，控制某个域名只能被一个人使用。保留域名，每年缴费注册费。

- 如何得到一个域名？  
  交给托管公司来考虑，是容易的。他们通常会提供域名注册作为其他服务中的一项。  
  域名注册公司清单：  
  http://www.internic.net/regist.html

- 域名 `!=` 网站名  
  test.com 是域名。  
  www.test.com 是一个网站名。  
  www.test.com 是 域名 test.com 的部分/一个网站。  
  可以创建使用域名的其他网站：a.test.com; b.test.com;uat.test.com 等。即：域名可以用于多个网站。

- 域名的好处？真的需要一个域名吗？直接使用托管公司的域名？  
  使用托管公司的域名的坏处：更换托管公司，或托管公司破产，以前使用网站的人找不到网站。
  使用自己的域名的好处：使用新托管公司后，对用户没有影响。

- 确认想用的域名是否已经被占用？  
  大多数域名注册服务公司允许搜索一个域名是否已经被占用。  
  http://www.internic.net/regist.html

# 12. URL

- 浏览器中输入的 Web 地址 = URL（Uniform Resource Locators 统一资源定位符）

![address.jpg](https://yingvickycao.github.io/img/address.jpg)

![url.jpg](https://yingvickycao.github.io/img/url.jpg)

- URL 的作用  
  作用 1:URl 是一个全局地址，用来定位 Web 任意资源  
  作用 2:指定用来获取资源的协议。通常是 HTTP

# 13. 协议

## HTTP

- 大多数情况下使用 HTTP 协议
- HTTP（HyperText Transfer Protocol）,超文本传输协议。 这是 Web 上传输超文本文档（HTML 页面、图像等）的公认的一种方法（协议）。
- HTTP 是一个简单的请求和响应协议。如何工作？  
  每次在浏览器的地址栏中输入一个 URL 地址时，浏览器就会使用 HTTP 向服务器请求相应的文件。  
  服务器找到相应到资源，把它返回给浏览器，由浏览器显示。：  
  ![http_how_to_work1.jpg](https://yingvickycao.github.io/img/http_how_to_work1.jpg)

  服务器找不到相应到资源：  
  ![http_how_to_work1.jpg](https://yingvickycao.github.io/img/http_how_to_work2.jpg)

## 其他协议

- 文件 URL `file:///`  
  浏览器从你的计算机本地读取文件时会使用 file 协议。

- ftp  
  很多浏览器支持使用 FTP 获取页面

- mail 协议  
  使用 Email 发送数据

## `http://www.mudomain.com:8000/index.html` - `:8000`?

- `:8000`是一个放在 HTTP UR 中可选的“端口”  
  网站名 === 地址。  
  端口号 == 此地址的邮箱号。

- 通常 Web 上所有东西会传送到一个默认端口（80）。有时 Web 服务器会配置在另外一个不同的端口接受请求，如 8000。通常这种情况会在测试服务器上出现。
- 正常的 Web 服务器几乎都在端口 80 接受请求。如果没有指定端口，则默认为 80.

# 14. 路径

## 绝对路径

![absolute_path](https://yingvickycao.github.io/img/absolute_path.jpg)

- 绝对路径的意义？  
  服务器使用绝对路径来找到请求的文件。如果没有绝对路径，它不知道从哪里去查找

- 把协议、服务器、网站和绝对路径联系起来？
  URL = 把所有这些部分结合在一起。利用 URL，请求浏览器从 Web 获取一个页面或其他类型资源。

  协议：告诉浏览器使用什么方法来获取资源。通常是 HTTP。  
   网站部分：由服务器名和域名组成。告诉浏览器从互联网的哪个计算机获取资源。  
   绝对路径：告诉服务器要找到哪个页面。

- `<a>`元素中 href 属性放入相对路径。如何是服务找到的？  
  所有 Web 服务器看到的都是一个绝对路径：单机一个相对链接时，在后台浏览器会根据这个相对路径和所单击页面的路径创建一个绝对路径。

- 在浏览器中输入绝对路径，对浏览器由帮助吗？

- 链接到其他网站
  <!--  绝对链接 -->
  <a href="http://www.baidu.com">Baidu</a>

## 相对路径

1. 确定链接的相对路径？  
   从包含这个链接的页面开始，然后沿着一条路径，直到找到要指向的那个文件

```
  <!-- 同一个目录 -->
  <a href="page1.html">Page 1</a>

  <!--  下级目录 -->
  <a href="linked/page2.html">Page 2</a>

  <!--  父级目录 -->
  <a href="../page3.html">Page 3</a>
```

2. `..`：父文件夹  
   `../`表示：向上移至父文件夹
3. `../..`祖父文件夹
4. 最远向上走到根目录

# 15. 默认页面

- 讨论 Web 服务器或 FTP 时，通常使用“目录”而不是“文件夹”，虽然它们都是一样的意思。
- 浏览器向 Web 服务器请求一个目录而不是文件时，如何工作？  
  Web 服务器收到类似请求时，它会尝试查找这个目录的一个默认文件。通常默认文件名是 `index.html` 或 `default.htm`。如何服务器找到这样一个文件，把它返回给浏览器显示

```
http://www.abc.com/         // 根目录
http://www.abc.com/images/  // 根目录中images目录
```

如何收到没有“/”的请求，而且这个目录确认存在，服务器会自动加上末尾的斜线。

```
http://www.abc.com/   // 根目录
它把这个请求改为=>
http://www.abc.com    // 根目录  ===输入地址 http://www.abc.com/index.html

```

![default_page_how_to_work.jpg](https://yingvickycao.github.io/img/default_page_how_to_work.jpg)

- 默认文件名，取决于托管公司使用哪种 Web 服务器  
  `index.html`  
  `default.htm`: Microsoft web 服务器  
  `index.php`

- 告诉别人 URL 时，加上“index.html”吗？  
  最好不要加。因为以后可能更换 Web 服务器，或使用另一个默认文件名。

# 16. 如何发布 Web？

```
如何发布Web？
1. 找一个托管公司
2. 为网站选择一个名字
3. 把文件从自己的计算机传到托管公司的服务器上。
4. 告知新网站
```

## 托管公司？

- 全天工作
- 比价受欢迎的提供商  
  https://www.wickedlysmart.com/hosting-providers/
- 选择考虑

1. 技术支持  
   好的系统处理技术问题；通过电话或邮件对问题迅速做出回应。

2. 数据传输  
   允许在一定时间内向访问者发送的页面和数据量。  
   小型网站：少量访问者，数据传输量不大  
   大型网站：大量访问者

3. 备份  
   定义备份页面和数据备份，目的是当服务器出现硬件故障时能够恢复
4. 域名  
   定价中包含一个域名？
5. 可靠性  
   大多数托管公司都声称网站 99%以上时间内都能正确运行。

6. 赠品  
   Email 地址、论坛或脚本语言支持等 => 对未来很重要

## 搬家

- 整理好所有文件，把他们搬到新服务器上去。  
  在 Web 上，把文件从根文件的所有文件夹复制到 Web 服务器上的根文件夹。

- 托管公司的根文件夹名字可以不同，重点是知道根文件夹在服务器的位置，以及文件复制。

- 文件传送到 Web 服务器？  
  支持 FTP（File Transfer Protocol）文件传输协议的 FTP 应用：  
  1） 命令行/图形界面  
  2）要使用 SFTP，必需确保支持 SFTP（Safe File Transfer Protocol）安全文件传输协议
- 不要在 Web 服务器直接修改文件：访问的人会直接看到修改时的错误。

# 17 交互性

HTML 页面可以提供被动的文档和有可执行的内容。  
`interactive.html`

# 18 服务器端脚本语言
PHP、Python、Perl、Node.JS、Ruby on Rails、Java Server Pages（JSP）、VB.NET、ASP.NET、JavaScript、React、Vue

# Reference:

- W3School HTML http://www.w3school.com.cn/html/html_lists.asp
- MDN HTML https://developer.mozilla.org/zh-CN/docs/Web/HTML
- `Book 《Head First HTML5 Programming》`HTML5 已经支持定制数据属性，允许为新属性构造定制的属性名
- `Book《HTML & XHTML: The Definitive Guide》(O's Reilly)` 哪些元素支持哪些属性
