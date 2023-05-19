# ES

ES 全称 ECMAScript.  
ECMAScript 是 ECMA 制定的标准化脚本语言,即 ECMA 是 JavaScript 的标准。

| ES Version | ES alias Name                                              | Distrubuted Time |
| ---------- | ---------------------------------------------------------- | ---------------- |
| ES5        | ECMAScript 2009，又称 JavaScript5                          | 2009             |
| ES6        | JavaScript >=5.1 : ES2015(ECMAScript 2016,ECMAScript 6.0), | 2015.06          |
| ES7        | ES2016                                                     | 2016             |
| ES8        | ES2017                                                     | 2017.1           |
| ES9        | ES2018                                                     | 2018             |
| ES10       | ES2019                                                     | 2019             |

## ES6

- 类
- 模块化
- 箭头函数
- 函数参数默认值
- 模板字符串
- 解构赋值
- 延展操作符
- 对象属性简写
- Promise
- Let 与 Const

## ES7

- 数组 includes()方法，用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。
- `a ** b` 指数运算符，它与 Math.pow(a, b)相同。

## ES8

- async/await
- Object.values()
- Object.entries()
- String padding: padStart()和 padEnd()，填充字符串达到当前长度
- 函数参数列表结尾允许逗号
- Object.getOwnPropertyDescriptors()
- ShareArrayBuffer 和 Atomics 对象，用于从共享内存位置读取和写入

## ES9

- 异步迭代
- Promise.finally()
- Rest/Spread 属性
- 正则表达式命名捕获组（Regular Expression Named Capture Groups）
- 正则表达式反向断言（lookbehind）
- 正则表达式 dotAll 模式
- 正则表达式 Unicode 转义
- 非转义序列的模板字符串

## ES10

- 行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与 JSON 匹配
- 更加友好的 JSON.stringify
- 新增了 Array 的 flat()方法和 flatMap()方法
- 新增了 String 的 trimStart()方法和 trimEnd()方法
- Object.fromEntries()
- Symbol.prototype.description
- String.prototype.matchAll
- Function.prototype.toString()现在返回精确字符，包括空格和注释
- 简化 try {} catch {},修改 catch 绑定
- 新的基本数据类型 BigInt
- globalThis
- import()
- Legacy RegEx
- 私有的实例方法和访问器

# Ref

https://juejin.im/post/5ca2e1935188254416288eb2
