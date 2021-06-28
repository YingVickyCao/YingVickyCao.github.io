# Object C

# 1 Object-C 的历史

Oject-C 扩展了 C 语言，变成一个面向对象的语言。所以很多地方，与 C 很相似。  
NsString 命名以 NS 开头 是为了区别于 C 的 String。  
Oject-C 完全兼容 C 语言。

虽然 Oject-C 是 C 语言的扩展，但没有必要首先学习 C 语言，以避免过多了解过程性语言的细节。

# 2 Object-C 能干什么？

IOS/Ipad/Mac/Iwatch

# 3 面向对象 vs 面向过程？

(4) 什么是对象
对象是一个物体。

面向过程的程序设计：  
思考过程：先考虑做什么，然后才关注对象。

面向对象的程序设计：一个物体和相对它所做的事情。  
思考过程：先考虑对象，然后才关注它能做什么。

面向对象：
注重业务功能的封装。  
以面向过程的思路去封装业务功能。  
把思维角度提升到管理者阶段。

面向过程：亲力亲为  
e.g.,如何把大象放进冰箱 ？  
把冰箱门打开，把冰箱放进去，关闭冰箱门。  
e.g.,开发一个 app  
亲历干完所有事情：开发、qa、发布、运维、维护

面向对象：发布命令  
e.g.,如何把大象放进冰箱 ？  
创建一个冰箱对象，冰箱.open, 冰箱.put,冰箱.close  
e.g.,开发一个 app  
招几个人（开发、qa、发布、运维、维护）给你打工。只发布命令，手下人很快给你干完。你只管结果，不管过程如何。

# 4 创建的文件扩展名

![filename_extension](https://yingvickycao.github.io/img/ios/filename_extension.jpg)

# 5 解释第一个程序

`first_app.m`

- OC 中区分大小写
- main 是程序的执行入口

```c
int main(int argc, const char * argv[]) {
```

- 一条语句就是一个以分号结束的表达式。
  Object-C 语句比较跟分号，否则报错

```c
// `Expected ';' after expression`.
NSLog(@"Hi,\nChina")
```

# 6 注释

`first_app.m`

```
// 单行注释
/*
 多行注释,且多行注释不能嵌套使用
 */
```

# 7 变量

`first_app.m`  
先定义，后使用。

# [8 数据类型](数据类型.md)
# [9 表达式](表达式.md)
# [10 类、对象、和方法](Class.md)
类、对象、创建、初始化、方法、局部变量、继承、子类、多态、动态类型、动态绑定

# [11 内存管理](Memory_Management.md)
# [12 区块](区块.md)
# [13 协议](协议.md)
# [14 分类](分类.md)
# [15 预处理程序](预处理程序.md)
# [16 Foundation框架](Foundation框架.md)
# [17 Cocoa_and_Cocoa_Touch](Cocoa_and_Cocoa_Touch.md)
# [18 iOS_SDK_and_UIKit](iOS_SDK_and_UIKit.md)

TBD：
- [2 NSString, NSMutableString](NSString.md)
- [3 NSArray](NSArray.md)
- [4 NSDictionary](NSDictionary.md)
- [5 NSNumber](NSNumber.md)
- [6 NSIndexSet](NSIndexSet.md)
