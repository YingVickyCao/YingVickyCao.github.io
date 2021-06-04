# JS 基本常识

# 1 Web 学习路线

- 学习路线
  Web  
  HTML  
  CSS  
  JavaScript  
  JavaScript 指南  
  Web APIs

- 标准 Web 技术蛋糕(3 层)

  ![web_tech_cake_3](https://media.prod.mdn.mozit.cloud/attachments/2016/07/12/13502/a1177377210a8bd83a8e99da934d959c/cake.png)

| Type | Language     | Usage                |
| ---- | ------------ | -------------------- |
| HTML | 标记语言     | 提供结构（网页内容） |
| CSS  | 样式规则语言 | 提供样式             |
| JS   | 脚本语言     | 创建动态更新的内容   |

# 2 JavaScript ("JS" for short)

- API  
  用程序接口（Application Programming Interfaces（API）.  
  API 是已经建立好的一套代码组件.

- JS 包括
  - Browser APIs —— 浏览器内置的 API.  
    e.g. DOM,Canvas and WebGL,Geolocation API,HTMLMediaElement and WebRTC .
  - 3rd party APIs  
    没有默认嵌入浏览器
    第三方框架和库

# 3 What is JavaScript doing on your page?

浏览器在读取一个网页时都发生什么：  
![browser_read_a_page](https://media.prod.mdn.mozit.cloud/attachments/2016/07/12/13504/2dbaab3219cbbb28abb27da40ada2dee/execution.png)

在 HTML 和 CSS 集合组装成一个网页后，浏览器的 JavaScript 引擎将执行 JavaScript 代码。这保证了当 JavaScript 开始运行之前，网页的结构和样式已就位。

- 浏览器安全:运行环境  
  运行环境:每个浏览器标签页就是其自身用来运行代码的独立容器.  
  大多数情况下，每个标签页中的代码完全独立运行，而且一个标签页中的代码不能直接影响另一个标签页（或者另一个网站）中的代码。  
  以安全的方式在不同网站/标签页中传送代码和数据的方法是存在的

* JavaScript 运行次序  
  当浏览器执行到一段 JavaScript 代码时，通常会按从上往下的顺序执行这段代码。

```js
//  code_order.html
// OK
const btn = document.getElementById("btn");
btn.addEventListener("click", clickBtn);

function clickBtn() {
  alert("Clicked button");
}
```

```js
//  code_order.html
// OK
// 函数顺序无所谓
const btn = document.getElementById("btn");

function clickBtn() {
  alert("Clicked button");
}
btn.addEventListener("click", clickBtn);
```

```js
// ERROR
// 变量：在引用对象之前必须确保该对象已经存在。
//  code_order.html
btn.addEventListener("click", clickBtn);

// Uncaught ReferenceError: Cannot access 'btn' before initialization
const btn = document.getElementById("btn");

function clickBtn() {
  alert("Clicked button");
}
```

- 解释代码 vs 编译代码  
  JS 是一种解释型语言。  
  几乎所有的 JS 转换器采用即时编译（just-in-time compiling）的技术来改善它的表现；当 JavaScript 源代码被执行时，它便会被编译成一种更快，二进制的格式，这将使其的运行速度尽可能地快。

  解释（interpret）和 编译(compile)

  | Type       | When compile         | 优势                                           | 劣势                                   |
  | ---------- | -------------------- | ---------------------------------------------- | -------------------------------------- |
  | 解释型语言 | 编译是在代码运行中   | 可移植性好，在不同的操作系统上运行（解释环境） | 运行慢、占用资源多                     |
  | 编译型语言 | 编译是在代码运行之前 | 运行快，代码效率高                             | 可移植性差，只能在兼容的操作系统上运行 |

- 服务器端代码 vs 客户端代码

  | -          | 服务器端（server-side）代码                               | 客户端（client-side） |
  | ---------- | --------------------------------------------------------- | --------------------- |
  | JavaScript | 服务器 JavaScript                                         | 客户端 JavaScript     |
  | 服务器端   | PHP、Python、Ruby、ASP.NET 以及 JavaScript(Node.js 环境） | -                     |

  客户端代码是在用户的电脑上运行的代码，在浏览一个网页时，它的客户端代码就会被下载，然后由浏览器来运行并展示。  
  服务器端代码在服务器上运行，接着运行结果才由浏览器下载并展示出来。

- 动态代码 vs 静态代码  
  `静态`页面：  
  没有动态更新内容的网页叫做“静态”页面，所显示的内容不会改变。

  “动态”:  
  既适用于客户端 JavaScript，又适用于描述服务器端语言。  
   动态是指通过按需生成新内容来更新 web 页面 / 应用，使得不同环境下显示不同内容.  
   服务器端和客户端）经常协同作战.

# 4 How do you add JavaScript to your page?

- Method 1 : Internal JavaScript

```html
<!-- add_js_to_page.html -->
<head>
  <script>
    <!--JS Code-->
  </script>
</head>
```

- Method 2 : External JavaScript  
  readable, reusable, good of organizing code

```html
<!-- add_js_to_page.html -->
<head>
  <script src="add_js_to_page.js" async></script>
</head>
```

```js
// add_js_to_page.js
// JS Code
```

- Method 3 : Inline JavaScript handlers ( Depressed)  
  使 JavaScript 污染到 HTML，而且效率低下

  将编程逻辑与内容分离：  
  可读性;
  易维护;  
  也会使站点对搜索引擎更加友好。

```html
<!-- Method 3 : Inline JavaScript handlers -->
<button onclick="clickBtn3()">Click button 3</button>
```

## Script loading strategies

**Script loading strategies**：  
getting scripts to load at the right time.  
Code won't work if the JavaScript is loaded and parsed before the HTML you are trying to do something to.

| add JavaScript to page     | Script loading strategies                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Internal JavaScript        | DOMContentLoaded                                                                                                         |
| External JavaScript        | Old : `put script element right at the bottom of the body (e.g. just before the </body> tag),` <br/> New : async / defer |
| Inline JavaScript handlers | -                                                                                                                        |

**For Internal JavaScript:**  
`DOMContentLoaded` 事件:HTML 文档体加载、解释完毕事件。

**For External JavaScript:**

- Old solution :把脚本元素放在文档体的底端（</body> 标签之前，与之相邻），这样脚本就可以在 HTML 解析完毕后加载了.  
  评价：  
  只有在所有 HTML DOM 加载完成后才开始脚本的加载/解析过程。  
  对于有大量 JavaScript 代码的大型网站，可能会带来显著的性能损耗。  
  这也是 async 属性诞生的初衷

- New solution : async

## async and defer

Usage: bypass the problem of the blocking script

| async            | defer                                                                                                          | -                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------- |
| version          | HTML 5                                                                                                         | HTML 5                                                    | -                                            |
| function         | 一旦脚本可用，则会异步执行。                                                                                   | 当页面已完成加载后,脚本将按照在页面中出现的顺序加载和运行 | -                                            |
| 如何执行外部脚本 | 当页面继续进行解析时，脚本将被异步执行。不会阻塞页面渲染，而是直接下载然后运行。即脚本不会阻止剩余页面的显示。 | 脚本将在页面完成解析时执行                                | 在浏览器继续解析页面之前，立即读取并执行脚本 |
| 脚本被执行顺序   | 不确定                                                                                                         | 顺序                                                      | -                                            |
| When             | 当页面的脚本之间彼此独立，且不依赖于本页面的其它任何脚本时                                                     | 存在脚本依赖于本页面的其它任何脚本                        | -                                            |

- async

仅适用于外部脚本（只有在使用 src 属性时）

```html
<!--三者的调用顺序是不确定的。
jquery.js 可能在 script2 和 script3 之前或之后调用，如果这样，后两个脚本中依赖 jquery的函数将产生错误，因为脚本运行时 jquery 尚未加载。-->
<script async src="js/vendor/jquery.js"></script>
<script async src="js/script2.js"></script>
<script async src="js/script3.js"></script>
```

Example: `number_guessing_game.html, ERROR:Uncaught TypeError: Cannot read property 'addEventListener' of null`

Reason:  
 在页面还没有加载完成后这段监听的 js 代码已经执行

Fix:

```html
<!--  <script src="number_guessing_game.js"></script> -->
<script src="number_guessing_game.js" async></script>
```

- defer

```html
<!-- jquery.js -> script2.js -> script3.js -->
<script defer src="js/vendor/jquery.js"></script>
<script defer src="js/script2.js"></script>
<script defer src="js/script3.js"></script>
```

## [异步处理方式](Async.md)


# 5 Connect to an API with JavaScript

## CRUD
  Web API uses HTTP requests that correspond to the CRUD verbs

  | Action | HTTP Method | Description |
  | ------ | ----------- | ---------------------------- |
  | Create | POST | Creates a new resource |
  | Read | GET | Retrieves a resource |
  | Update | PUT/PATCH | Updates an existing resource |
  | Delete | DELETE | Deletes a resource |

  TBD : REST and RESTful APIs


## XMLHttpRequest

## Fetch   
JavaScript Fetch API  
Note that with Fetch, even a 404 or 500 error will not return an error.     
Only a network error or a request not completing will throw an error.  
fetch() resturns Promise.  
