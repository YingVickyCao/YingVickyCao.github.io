# Class

- 字符串前面有一个@符号
- 所有对象必须继承基类 NSObject
- 单继承
- 支持协议
- 支持多态
- Id 类型，类似范型对象，viold `*` 类似任意指针类型

# 1 类的定义

- .h 放类和方法声明

```
@interface Person : NSObject

@end
```

# 2 类的实现

```
@implementation Person
{
    // 成员变量：若放在此处，为private，只能在此类中内调用
}

// 方法

// 类方法
@end
```

- .m 放类的实现

# 3 成员变量

- 调用  
  `p->age`

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

# 13 点语法

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

# 14 Category

| Item     | 继承     | Category |
| -------- | -------- | -------- |
| add 属性 | 可以     | 不可以   |
| add 方法 | 可以     | 可以     |
| 调用方   | 子类对象 | 原类对象 |
