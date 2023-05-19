Markdown 是一种轻量级的「标记语言」，常用的标记符号也不超过十个。

Tumblr,StackOverflow,简书很多交流网站也在使用 Markdown 格式编译。

使用 Markdown 的优点:

- 简单
- 轻松的导出 HTML、PDF 和本身的.md 文件。
- 纯文本内容，兼容所有的文本编辑器与字处理软件。
- 可读，直观。适合所有人的写作语言。

---

# 代码

方式 1：  
`public int getNum(){ return num; }`

方式 2：  
`public int getNum(){ return num; }`

# 代码段

[Link: markdown 代码块支持的语言](https://YingVickyCao.github.io/doc/tools/markdown/markdown_code_support_language.html)

方式 1：<br/>

```
public int getNum(){
    return num;
}
```

方式 2：<br/>
javascript,html

```javascript
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
```

方式 3：缩进四个空格<br/>

    public int getNum(){
    return num;
    }

---

# Headers,标题

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

# Simple lists,列表

## 无序列表

```
- One
- Two
- Three
```

- One
- Two
- Three

```
* One
* Two
* Three
```

- One
- Two
- Three

## 有序列表

```
1. One
2. Two
3. Three
```

1. One
2. Two
3. Three

# 引用

使用 > 表示引用， >> 表示引用里面再套一层引用，依次类推。

```
> 这是一级引用
>>这是二级引用
>>> 这是三级引用
```

> 这是一级引用
>
> > 这是二级引用
> >
> > > 这是三级引用

# Advanced lists: Nesting

列表可以嵌套

```
- first item
- second item
    * subitem 1
    * subitem 2
- third item
```

- first item
- second item
  - subitem 1
  - subitem 2
- third item

# 图片与链接

## 插入网络图片

![Mou Icon](http://cdn.sspai.com/attachment/thumbnail/2014/04/15/54b0855cf47d559c8c59e8f503af17d410f70_mw_800_wm_1_wmp_3.jpg)

## 插入本地图片(无效)

![imagee](file:///Users/vicky/Desktop/image1.png)

解决：把图片委托到[极简图床(http://yotuku.cn)](http://yotuku.cn)，然后再引入图片

## Links,插入链接

用方括号包裹文本，把它变成链接

```
[Baidu](http://www.baidu.com)
[http://www.baidu.com](http://www.baidu.com)
```

[Baidu](http://www.baidu.com)  
[http://www.baidu.com](http://www.baidu.com)

## Bare URLs

用尖括号包裹 URL，也可以变成链接  
<http://www.cnblogs.com>

# 表格

| Header | Header |
| ------ | ------ |
| Cell   | Cell   |

| Table         |      Are      | Color |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned |   \$1 |
| col 2 is      |   centered    |   \$1 |
| col 0 </br>is |   are neat    |   \$1 |

---

# 段落

在 MarkDown 里面，没有任何修饰的文本就是段落。<br/>
一个 Markdown 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行.普通段落不该用空格或制表符来缩进。<br/>
markdown 把多余空行省略，文章结构不靠空行区分。

这是一个段落。

这是不是一个段落。
这是不是一个段落。

---

# 换行

Markdown and HTML are ignored within a code block.

方式 1：一行的结尾加上两个或更多的空格。  
方式 2:`<br/>`  
换<br/>行

# 分割线

- `---/***/* * *`

- 只要 \* 或者 - 大于等于三个就可组成一条平行线。
- 使用 --- 作为水平分割线时，要在它的前后都空一行，防止 --- 被当成标题标记的表示方式。

One

---

Two

---

Three

---

# 行内修饰文字:加粗、斜体、颜色、删除

## 粗体

```
正常文字
**这是粗体**
```

正常文字  
**这是粗体**

## 斜体

```
正常文字
*这是斜体*
_这是斜体_
```

正常文字  
_这是斜体_  
_这是斜体_

## 颜色

- 备注： <span style="color:red">分析、设计、实现、改进</span>.

## 删除线

~~删除线~~

## 反斜杠

Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：

```
\   反斜线
`   反引号
*   星号
_   底线
{}  花括号
[]  方括号
()  括弧
#   井字号
+   加号
-   减号
.   英文句点
!   惊叹号
```

## Incomplete Task List

- [Task 3]
- [Task 2]
- [Task 1]

## Complete Task List

- [x] [1]
- [x] [2]
- [x] [3]

---

# QA

- Excel 表格转换为 MarkDown 表格工具

在线：https://tableconvert.com/

离线软件 ：typoraio
https://typoraio.cn/#

## 参考资料

- [认识与入门 Markdown](http://sspai.com/25137/)
- [stackoverflow Markdown help](https://stackoverflow.com/editing-help)
- [Markdown 语法说明 (简体中文版)](http://www.appinn.com/markdown/)
- <https://www.zhihu.com/question/20409634>
- [Markdown 软件和在线编译器推荐](http://www.williamlong.info/archives/4319.html)
- [模拟 Makdown 语法](http://daringfireball.net/projects/markdown/dingus)
- <https://stackedit.io/editor>
- <http://www.tuicool.com/articles/fmeMbqR>
- <http://www.cnblogs.com/datageek/p/3862696.html>
- https://stackoverflow.com/editing-help#horizontal-rules
