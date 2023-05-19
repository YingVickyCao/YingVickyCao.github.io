# Swift

Swift 采用的是 Unicode 编码。
Unicode 叫做统一编码制，它包含了亚洲文字编码、如中文、日文、韩文等字符。

不用编写 main 函数，Swift 讲全局范围内的首句可执行代码作为程序的入口。

# 1 常量

let  
用 let 定义常量，用 var 定义变量，编译器能自动推断出常量、变量的类型。

- 只能赋值 1 次

```swift
let n = 10;
n = 20; // ERROR:Cannot assign to value: 'n' is a 'let' constant

let age:Int;
age  = 10;
age = 20 // ERROR:Immutable value 'age' may only be initialized once
```

- 声明时指明定义类型，因此，不能给它设置

```swift
let five
five = 10 // ERROR:Found an unexpected second identifier in constant declaration; is there an accidental break?
```

- 常量的值不要求在编译时确定，但在使用前必须赋值 1 次。  
   其他语言：常量的值要求在编译时确定

```swift
var num = 10;
num=num+1;
let test = num;
print(test);    // 11


func getAge()->Int{
    return 100
}
let age2 = getAge();
print(age2) // 100
```

- 常量，在初始化之前，都不能使用

```swift
let height:Int;
print(height) // ERROR:Constant 'height' used before being initialized
```

# 2 变量

- var
- 自动判断类型
- 强制设置类型
- 变量名支持 UTF-8
- 变量打印时叠加
- 变量，在初始化之前，都不能使用

```
ERROR: Variable 'width' used before being initialized
```

# 3 注释

与 C 语言一样

- 单行注释
- 多行注释
- 多行注释嵌套

# 4 分号

- 1 行有 1 个语句时，可以不用加;
- 1 行有多个语句时，要加;

## 5 标识符

UTF-8

# 6 数据类型

![swift_data_type](https://yingvickycao.github.io/img/ios/swift/swift_data_type.webp)

- 整数类型：

Int8、Int16、Int32、Int64、  
UInt8、UInt16、UInt32、UInt64  
U 是 Unsingned（无符号)

在 32bit 平台，Int 等价于 Int32，在 64bit 平台，Int 等价于 Int64
整数的最值：Int8.max、Int8.min
整数的多少给 bit？

```swift
var age:Int = 10;
var age:Int = 10;
// Int在64 位的机器，
print(age.bitWidth) // 64 => 64位=8个字节
print(Int.bitWidth) // 64
```

```swift
// UInt8是8位=1个字节
print(UInt8.bitWidth) //8
```

一般情况下，直接使用 Int。假如能确定使用多大 bit，为了省内存，可以指定 Int8 等代替 Int。

- Swift 中结构体，可以调用方法。
- 浮点类型

Float，32 位，精度只有 6 位。
Double，64 位，精度至少 15 位。

## TODO: 类型转换

# 5 loop

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
  区间 ：不关心的值，用 `_` 代替
- support 元组  
  元组：不关心的值，用 `_` 代替
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

- `_`: 代表函数调用时，可以省略参数名称

- 外部参数：  
  `&` ： 代表指针，传递的是地址，那么，参数就是实参，不再是形参。

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

- 闭包：一段程序代码, 类似于没有名称的函数

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

- 三种写法：  
  一般写法: 在项目中经常使用。  
  实例值: 在项目中一般不用。源码中经常看到.  
  原始值: 在项目中一般不用。源码中经常看到。
- enum 是值类型

# 18 类

- 类  
  类是对象的定义 = 动作+属性
- swift 不用 `new` 一个类
- 类是值传递还是引用传递？是引用传递, 即引用类型  
  值传递: 不同 copy  
  引用传递: 引用同一个地址
- 恒等式  
   判断不同变量是否引用同一地址  
  `===` / `!==`

- 关于指针  
  Swift 中没有指针的语法概念，但是引用类型实际上指向一个地址。
- 构造函数  
  定义了有参构造函数后，只有定义了无参构造函数，才能使用无参构造函数。  
  定义无参数构造函数时，只有变量声明全部都定义了初始值，无参构造函数中才能允许不设置任何变量。因为：变量在使用前必须有值。如果不手动设置，不会自动给变量设置。

- 析构函数  
  在系统回收之前，手动清除资源。

## 继承

- `:`表示 继承
- 子类继承父类的：属性、构造函数、析构函数、方法
- 重载 override  
  重写属性的 Getters 和 Setters
  重载构造函数  
  重载析构函数  
  重载方法

- 重载构造函数  
  `super.init(name); ` 不会主动调用，根据需要决定是否手动调用，

- 重载方法:  
  函数名称、参数列表、返回值相同。  
  如果函数名称、参数列表相同，但返回类型不同，那么编译报错。  
  如果函数名称相同，但是参数列表不同，无论返回类型相同与否，那么，该函数是新函数，不是重载函数。

- final ：与 Java  
  final 类：类不可继承  
  final 方法：不能被重载  
  final 属性：不能改变

# 19 结构体(struct)

结构体 与类很像。

- struct 是值类型
- struct vs class  
  同：  
  有内部变量和函数  
  用内部下标方式去取属性  
  有初始化函数：构造函数。 class 默认是无参。 struct 默认是无参 + 全参。

  异：  
  类有继承  
  类是引用类型，有多重引用  
  类有析构函数

  很多时候，类和结构体可以是通用的。  
  选择？  
  比较简单的数据：结构体  
  相对复杂的数据：类

# 20 协议(Protocol)

java 接口

- 类先继承父类，再实现协议
- 协议继承  
  类实现时，有协议继承，父协议内容也要实现
- 协议合并：  
  传递的参数必须同时实现了指定的多个接口

# 21 泛型

- 函数泛型
- 类泛型

# optional types

Optionals say either “there is a value, and it equals x” or “there isn’t a value at all”.
