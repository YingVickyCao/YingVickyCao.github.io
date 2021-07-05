# Object C

# [1 第一个程序](第一个程序.md)
# [2 类、对象、和方法](Class.md)
类、对象、创建、初始化、方法、局部变量、继承、子类、多态、动态类型、动态绑定
# [3 数据类型](数据类型.md)
# [4 表达式](表达式.md)
# [4 选择结构](选择结构.md)
# [5 内存管理](Memory_Management.md)
# [6 区块](区块.md)
# [7 协议](协议.md)
# [8 分类](分类.md)
# [9 预处理程序](预处理程序.md)
# [10 Foundation框架](Foundation框架.md)
# [11 Cocoa_and_Cocoa_Touch](Cocoa_and_Cocoa_Touch.md)
# [12 iOS_SDK_and_UIKit](iOS_SDK_and_UIKit.md)

TBD：
- [2 NSString, NSMutableString](NSString.md)œ
- [3 NSArray](NSArray.md)
- [4 NSDictionary](NSDictionary.md)
- [5 NSNumber](NSNumber.md)
- [6 NSIndexSet](NSIndexSet.md)





---

- 字符串前面有一个@符号
- 所有对象必须继承基类 NSObject
- 单继承
- 支持协议
- 支持多态
- Id 类型，类似范型对象，viold `*` 类似任意指针类型

# 4 构造函数

- 以 int 开头
- id 等价`*`

```
// - (Person *)init{
// 等价
- (id)init{
```

- new 一个对象

```
Person *p = [[Person alloc]init];
// p->age 直接调用
NSLog(@"age is-%d, height is-%f, name is-%@",p->age,[p getHeight],[p getName]);
```

`Person * p = `：表示是一个引用变量

# 5 方法

- `-`表示对象方法/消息。
  Object - C 中没有方法一说，称呼为“消息”

- 若方法不在.h 声明，则为 private，那么只能在此类中调用。

- 调用  
  `[p getHeight]`

# 6 类方法

`+`表示类法

# 7 访问权限

同 Java

# 8 封装

定义：通过定义方法来操作成员变量  
目的：提高代码安全性、可行性和效率

e.g., set 函数 > 成员变量：  
 set 函数中可以直接加很多限制 if 条件

e.g., set 函数 > 成员变量：  
 成员变量名字改变了，使用 set 函数不受影响。

# 9 继承

# 10 重写

# 11 super

表示父类.  
init 方法中，super 含义：第一步,分类内存空间，第二步，内存空间指向 self

# 12 self

- 当前方法是谁在调用，self 就是谁。  
  第 1 种：-方法 —— 对象本身  
  第 2 种：+方法 —— 类

# 14 Category

| Item     | 继承     | Category |
| -------- | -------- | -------- |
| add 属性 | 可以     | 不可以   |
| add 方法 | 可以     | 可以     |
| 调用方   | 子类对象 | 原类对象 |



# 6 点语法

`_2_2_synthesis_access_method`

```
// Progerty 能自动生成set 和 get 方法
@property (nonatomic, strong)NSString *name;
@property (nonatomic, assign)int age;
@property (nonatomic, assign)float height;
```

nonatomic:跟多线程的同步有关  
strong:继承 NSObject 的，用此关键字  
assign：除了继承 NSObject 之外，都用此关键字

```
// IOS 5.02之后，不用写,自动生成
@synthesize name = _name,age = _age,height = _height;
```