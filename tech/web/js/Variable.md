# 变量

# 1 变量是什么？

一个变量是一个用于存放数值的容器。  
变量能存储任何的东西：字符串、数字、更复杂的数据，甚至是函数。  
变量不是数值本身。可以把变量想象成一个个用来装东西的纸箱子。  
![variable is a boxes](https://media.prod.mdn.mozit.cloud/attachments/2016/07/12/13506/fff6c759c689be5d4d25f35f7e6f0e5a/boxes.png)

# 2 声明变量

```js
//  声明变量
let myName;
var myName2;
```

```js
// 验证这个变量的数值是否在执行环境中已经存在
myName;
```

| 一个变量存在，但是没有数值                   | 一个变量并不存在                                                                                    |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 有盒子，但里面没有任何值                     | 不存在盒子                                                                                          |
| `> let abc;`<br/> `> abc;` <br/> `undefined` | `> scoobyDoo;`<br/> `VM1232:1 Uncaught ReferenceError: scoobyDoo is not defined at <anonymous>:1:1` |

# 3 初始化变量

```
let myName;
// 初始化
myName = 'Chris';

// 在声明变量时初始化 (Recommend)
let myName2 = 'Chris';
```

## `var` vs `let`

| variable | 变量提升 | 多次声明相同名称的变量 |
| -------- | -------- | ---------------------- |
| let      | No       | No                     |
| var      | Yes      | Yes                    |

变量提升：  
初始化后再声明：使代码变得混乱和难以理解。

多次声明相同名称的变量：  
没有理由重新声明变量, 声明变量会使代码变得混乱。

在代码中尽可能多地使用 let，而不是 var。

# 4 动态类型（Dynamic typing）

JavaScript 是一种“动态类型语言”，不同于其他一些语言(如 C、JAVA)，不需要指定变量将包含什么数据类型（例如 number 或 string）

# 5 变量命名规则

- 拉丁字符(0-9,a-z,A-Z)和下划线字符.
- 不以`_`开头
- 小写驼峰命名法
- 大小写敏感
