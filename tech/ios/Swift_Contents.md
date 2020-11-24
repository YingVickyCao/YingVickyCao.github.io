# Swift

# 1 常量

let

# 2 变量

- var
- 自动判断类型
- 强制设置类型
- 变量名支持 UTF-8
- 变量打印时叠加

# 3 注释

与 C 语言一样

- 单行注释
- 多行注释
- 多行注释嵌套

# 4 分号

- 1 行有 1 个语句时，可以不用加;
- 1 行有多个语句时，要加;

# 5 loop

# 6 基本数据类型

## TODO: 类型转换

# 7 Tuples（元组）

Object 没有这种类型  
When use：函数返回多个数据，又不想定义类、结构等。

# 8 字符

# 9 字符串

string 是值类型

- 初始化
- 拼接
- Char -> String
- loop item

# 10 基本运算符

## 位运算符

位运算符在 Swift 中不常见，Swift 属于上层语言。

# 11 条件语句

## If

## Switch

- 不用加 break
- 一旦满足，下面的 case 就不再运行
- 合并多个条件
- fallthrough : 一个条件 case 满足了，还想继续执行下 i 一条 case
- default 不是必须的
- Object-C 只支持整型，Swift 支持整型、浮点、布尔、字符串等。
- support 区间  
  区间 ：不关心的值，用`_` 代替
- support 元组  
  元组：不关心的值，用`_` 代替
- support Value Binding  
  支持额外的判断

# 12 数组 Array

- 可变，不要求唯一性，一维或多维  
  TODO：数组中元素可以是不同类型吗？

# 13 字典 Dictionary

- hash 结构
- 不可变；key 是唯一的，支持任何类型，也可以是基本类型；二维。
- TODO： null/“”
- TODO：重复了？

# 14 控制传递

# 15 函数

## 函数参数

- `_`:代表函数调用时，可以省略参数名称

- 外部参数：  
  `&`： 代表指针，传递的是地址，那么，参数就是实参，不再是形参。

## 函数类型

- 为什么会有函数类型？  
  事件：用 function callback 实现。

- 函数类型作为变量  
  Swift 把函数类型当做变量使用 = C 函数指针 = C# delegate = java listener

  带（）和不带（）？

```swift
func sum(n1:Int, n2:Int)->Int{
    return n1 + n2;
}
// 函数类型作为变量
// sum： 表示返回函数类型 (Int, Int)-> Int
// sum():表示调用
var calucator1 = sum;
print(calucator1(1,2));
```

## 嵌套函数

= java 函数内部类。  
生命周期随着它的外部函数消亡而消亡。

# 16 闭包(Closure)

https://www.jianshu.com/p/7566254152ee

- 闭包：一段程序代码,类似于没有名称的函数

```
{
   (参数列表) -> 返回值类型 in 函数体代码
}
```

- 上下文推断类型
- 单行表达式隐式返回：省略 return
- 参数名称缩写
- 要求：能识别代码中的闭包

# 17 枚举(enum)

类似于其他语言。

- 一般写法:在项目中经常使用。
- 实例值:在项目中一般不用。源码中经常看到.
- 原始值:在项目中一般不用。源码中经常看到。

# optional types

Optionals say either “there is a value, and it equals x” or “there isn’t a value at all”.
