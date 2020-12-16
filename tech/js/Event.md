# 事件（Event）

# 1 监听事件的方式

| 监听事件的方式                                                 | -              |
| -------------------------------------------------------------- | -------------- |
| Event handler properties(事件处理器属性)((Depressed))          | 函数 clickBtn4 |
| Event Handler:Inline event handlers(行内事件处理器)(Depressed) | 函数 clickBtn3 |
| Event Listener(Recommended)                                    | 函数 clickBtn2 |

## 事件处理器属性

```js
btn4.onclick = function () {
  alert("Clicked button 4");
};
```

## `事件处理器（Event Handler）`

事件处理器:响应事件触发而运行的代码块.通过 on... 属性注册的函数

```html
<button onclick="clickBtn3()">Click button 3</button>
```

```js
function clickBtn3() {
  alert("Clicked button 3");
}
```

## `事件监听器（Event Listener）`

事件监听器：侦听事件发生的结构。指通过 EventTarget.addEventListener() 注册的函数或对象。事件监听器

addEventListener() and removeEventListener()

DOM Level 2 Events,Support Internet Explorer >=9

```html
<button id="btn2">Click button 2</button>
```

```js
btn2.addEventListener("click", clickBtn2);

function clickBtn2() {
  alert("Clicked button 2");
}
```

[DOM 事件回调](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Event_handlers)

TBD:  
事件处理器有时候被叫做事件监听器.  
监听器留意事件是否发生.  
处理器就是对事件发生做出的回应。

并非只有 JavaScript 使用事件——大多的编程语言都有这种机制。JavaScript 网页上的事件机制不同于在其他环境中的事件机制。

# 2 事件对象

在函数中包括一个事件对象 e(e, event，evt).  
e 的 target 属性始终是事件刚刚发生的元素的引用 。  
`useful-eventtarget.html`

```js
// e = div
e.target.style.backgroundColor = bgChange();
```

## 阻止默认行为

`e.preventDefault()`

## 机制：事件冒泡和捕捉

- 对事件冒泡和捕捉的解释

```
<html>
    <body>
        <!-- click to show video-->
        <button>

        <!-- click to hiden video -->
        <div>
            <!----> cick to play video
            <video>
            </video>
        <div>
    <body/>
<html>
```

When click video: video (play) -> div (video is hidden)

捕获阶段

> 浏览器检查元素的最外层祖先`<html>`，是否在捕获阶段中注册了一个 onclick 事件处理程序，如果是，则运行它。
> 然后，它移动到`<html>`中单击元素的下一个祖先元素，并执行相同的操作，然后是单击元素再下一个祖先元素，依此类推，直到到达实际点击的元素。

```
html: not have
    body: not have
        div : have, do action
            video:have, do action
```

冒泡阶段,恰恰相反:

> 浏览器检查实际点击的元素是否在冒泡阶段中注册了一个 onclick 事件处理程序，如果是，则运行它
> 然后它移动到下一个直接的祖先元素，并做同样的事情，然后是下一个，等等，直到它到达`<html>`元素。

```
            video :have, do action
        div :  have, do action
    body: not have
html: not have
```

![bubbling-capturing](https://mdn.mozillademos.org/files/14075/bubbling-capturing.png)

> 在现代浏览器中，默认情况下，所有事件处理程序都在冒泡阶段进行注册。因此，在当前的示例中，当单击视频时，这个单击事件从 `<video>`元素向外冒泡直到`<html>`元素。沿着这个事件冒泡线路：  
> 它发现了 video.onclick...事件处理器并且运行它，因此这个视频`<video`>第一次开始播放。
> 接着它发现了（往外冒泡找到的） videoBox.onclick...事件处理器并且运行它，因此这个视频`<video>`也隐藏起来了。

- 用 stopPropagation()修复问题  
  当在事件对象上调用该函数时，它只会让当前事件处理程序运行，但事件不会在冒泡链上进一步扩大，因此将不会有更多事件处理器被运行(不会向上冒泡)

- Why has bubbling and capturing
  历史：以前的浏览器兼容性不够好。

| History           | -                                                            |
| ----------------- | ------------------------------------------------------------ |
| Netscape（网景）  | 只使用事件捕获                                               |
| Internet Explorer | 只使用事件冒泡                                               |
| W3C 规范达成共识  | 包括这两种情况（捕捉和冒泡）的系统，最终被应用在现在浏览器里 |

- （捕捉+冒泡） = Android 事件处理机制

- 事件委托
  冒泡还允许利用事件委托。

```
子元素中单击
->
将事件监听器设置在其父节点上，并让子节点上发生的事件冒泡到父节点上，而不是每个子节点单独设置事件监听器。
```

## 结论：

在早期阶段您需要了解的所有 web 事件。  
 事件并不是 JavaScript 的核心部分——它们是在浏览器 Web APIs 中定义的。  
 理解 JavaScript 在不同环境下使用不同的事件模型很重要——从 Web api 到其他领域，如浏览器 WebExtensions 和 Node.js(服务器端 JavaScript)。在学习 web 开发的过程中，理解这些事件的基础是很有帮助的。
