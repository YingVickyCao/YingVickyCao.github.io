# Class

`2_class_object_method`

OC 中也有类、实例（对象）、方法的概念。

# 1 类、对象、和方法

分离接口和实现文件

## 类的定义

```c
// .h
// NSObject can be ignore
@interface Fraction : NSObject
@end
```

声明类和类的方法，有时会列出一些元素，称为属性（TODO） 。

![oc_init_a_method](https://yingvickycao.github.io/img/ios/oc_init_a_method.jpg)

`-`开头：该方法是一个实例方法  
`+`开头：该方法是一个类方法

```c
// TODO:
#ifndef Fraction_h
#define Fraction_h

# import <Foundation/Foundation.h>

// @interface部分：声明类和类的方法
@interface Fraction : NSObject
-(void) print;
-(void) setNumerator:(int) n;
-(void) setDenominator:(int)d;

@end

#endif /* Fraction_h */
```

- 如何命名？  
  约定俗成：类名大写。类名必须以字母或下划线开头。  
  实例变量、对象、以及方法的名称，一般以小写字母开头。

  确定名字时，要遵循同样的标准。要找到反应变量或对象使用意图的名字。  
   好处：可以增强程序的可读性，调试更方便。因为程序具有更强的自解释性（self-explanatory），可减少文档注释。

- import  
  import 系统和自己写的头文件使用不同方式

```c
// System head file
# import <Foundation/Foundation.h>

// Our app head file
#import "Fraction.h"
```

## 类的实现:实现类（数据+方法）

```c
// .m
@implementation Person
{
    // 成员变量：若放在此处，为private，只能在此类中内调用
}

// 方法

// 类方法
@end
```

![oc_implementation](https://yingvickycao.github.io/img/ios/oc_implementation.jpg)

## program 部分:调用。包含解决特定问题的代码。

```c
// alloc是allocate的缩写。
// alloc : 创建对象 —— 分配内存存储空间，获得该类的实例。
Fraction *myFraction = [Fraction alloc];
 // init : 初始化对象 —— 初始化该类的实例的变量。
myFraction = [myFraction init];

等价于

// 创建对象，并初始化。
// myFraction = [[Fraction alloc]init];
```

`*`表明 myFraction 是 Fraction 对象的引用或指针。  
myFraction 存储的是一个引用，即内存地址，表明对象数据在内存中的位置。同 Java。

发生了什么？  
Step 1 : 声明一个变量。  
它的值是未定义的，没有被设定为任何值，也没有默认值。
![oc_declare_a_ref_on_object](https://yingvickycao.github.io/img/ios/oc_declare_a_ref_on_object.jpg)

Step 2 : 创建一个新对象。  
在内存中为它保留足够的空间用于存储对象数据，包括它的实例变量的空间，再另外预留一些。  
通常 alloc 会返回存储数据的位置（对数据的引用），并赋给变量。

```c
*myFraction = [Fraction alloc];
```

![oc_create_a_object](https://yingvickycao.github.io/img/ios/oc_create_a_object.jpg)

图中所示实例变量被指定为 0，这是 alloc 方法做到到。然而对象始终没有被正确地初始化，你仍需要使用 init 方法初始化新创建的对象。=> TODO:可能是因为需要通知计数

```c
// init : 初始化该类的实例的变量。
myFraction = [myFraction init];
```

Step 3 : set 实例的变量值
![oc_object_set_value](https://yingvickycao.github.io/img/ios/oc_object_set_value.jpg)

## 数据

- OC 中的私有信息（数据）= java 中 成员变量。  
- 调用      
 `p->age`/`p.age`  
- 类方法不能访问实例变量。
## 如何调用方法

```c
// 类或实例              它的方法
[classOrInstance        method]，
即
// 接收者：信息的接收者     请求一个类或实例来执行某个操作，等于 在向它发送一条信息。
[receiver                message ];
```

# 2 Synthesis,access, method

## Accessor method

设置方法（setter） 和 取值方法（getter），通常被称为访问器(accessor)方法。
`Fraction.h`

## 合成存取方法

`_2_2_synthesis_access_method`

```c
// .h
@property int  numerator, denominator;

// .m
// 不加@synthesize，默认生成的实例成员变量最前面带“_”
@synthesize numerator, denominator;
```

使用合成（synthesize）的存取方法，属性名称面前不要加 new、alloc、copy、init 等这些词。这与编译器等一些假定相关，因为编译器会合成相应的方法。

# 6 使用点运算符访问属性

`_2_2_synthesis_access_method`

```c
// get value
instance.property
//  set value
instance.property = value //  等价于 [instance setProperty:value]
```

## 具有多个参数点的方法

`_2_2_synthesis_access_method`

```c
// Fraction_2.h
//  两种命名方法
-(void)setTo:(int) n over:(int) d;  // Recommended:可读性更强
-(void)setNumerator:(int)n andDenominator:(int)d;
```

## 不带参数名的方法

`_2_2_synthesis_access_method`
不推荐。
在编写方法时，省略参数名不是一种好的编程风格，因为它使程序变难读懂且很不直观。

```c
 // 不带参数名的方法：声明方法
-(void)set:(int)n :(int)d;

// 不带参数名的方法：调用方法
[myFraction set:1 :3];
```

## 方法的参数

方法的参数是局部变量。
参数是普通值，改变形参，则不改变实参。
参数是对象，改变形参，则可改变实参。因为传递的是一个数据存储位置的引用，因此才能修改这些数据。

## static 关键字

## self 关键字

`_2_2_synthesis_access_method\Fraction_2.m`

```c
// self关键字指明对象是当前方法的接收者。即：对象不变。
[self method];
```

## 在方法中分配和返回对象

在方法中创建一个对象并返回它。
`_2_2_synthesis_access_method`

```c
// 在方法中分配和返回对象:返回值是一个对象
-(Fraction_2 *)add2:(Fraction_2 *)f;
```

# 3 继承

`_2_4_Inheritance`

- 在实现部分声明和合成（synthesize）的实例变量是私有的，子类不能直接访问，需要明确定义或合成取值方法，才能访问实例变量的值
- 在接口部分直接声明实例变量 x，是为了使得子类能够访问到。

## 根类

没有父类的类位于类层级结构的最顶层，称为根类（Root Class）。  
任何类继承于 NSObject，alloc 和 init 在 NSObject 类中被定义，因此才能被使用。  
父类（超类）/子类

## 通过继承来扩展：添加新方法

- 继承的概念作用于整个继承链。
- 类的每个实例都拥有自己的实例变量，即使这些实例变量是继承来的，因此对象 ClassC 和 ClassB 具有完全不同的实例变量。
- 向对象发送消息时，如何检查出正确的方法去执行？  
  从子类查找，如果找到，则停止查找。否则逐级在父类中查找，最终找不到则报错。

## @class 指令

@class 指令提高了效率，因为告诉编译器这是一个类，不需要引入和处理 XYPoint.h 文件。

`_2_4_Inheritance\Rectangle.h, Rectangle.m, _2_4_main_4_Rectangle.m`

```c
// Rectangle.m

//-(void)setOrigin:(XYPoint *)pt{
//    origin = pt;
//}

-(void)setOrigin:(XYPoint *)pt{
    if (!origin) {
        origin = [[XYPoint alloc]init];
    }
    origin.x = pt.x;
    origin.y = pt.y;
}

// _2_4_main_4_Rectangle.m
XYPoint *myPoint = [[XYPoint alloc]init];
[myPoint setX:100 andY:200];
[myRect setOrigin:myPoint];
NSLog(@"Origin at:(%i, %i)",myRect.origin.x,myRect.origin.y);   // Origin at:(100, 200)

[myPoint setX:50 andY:50];
// setOrigin 修改前 ： Origin at:(50, 50)
// setOrigin 修改后 ： Origin at:(100, 200)
NSLog(@"Origin at:(%i, %i)",myRect.origin.x,myRect.origin.y);
```

setOrigin 修改前 ： Origin at:(50, 50)？
![oc_class_having_object_instance_1](https://yingvickycao.github.io/img/ios/oc_class_having_object_instance_1.jpg)  
![oc_class_having_object_instance_2](https://yingvickycao.github.io/img/ios/oc_class_having_object_instance_2.jpg)  
![oc_class_having_object_instance_3](https://yingvickycao.github.io/img/ios/oc_class_having_object_instance_3.jpg)

TODO: #import vs @class

## 覆写方法

`_2_3_Inheritance\ClassB.h`

- 覆写方法时，方法的返回值、参数必须相同。
- 选择哪种方法？
  在不同的类中有名称相同的方法，则根据作为消息的接收者的类选择正确的方法。

![oc_override](https://yingvickycao.github.io/img/ios/oc_override.jpg)

## 抽象类

TBD

# 4 多态

## 多态

`_2_4_polymorphism`
多态能够使来自不同类的对象定义相同名称的方法。
与 Java 中多态不同。Java 中多态：多态就是同一个接口，使用不同的实例而执行不同操作。

# 5 动态类型 、 动态绑定

`_2_5_main_4_ dynamic_type`  

动态类型能使程序直到执行时才确定对象所属的类。

- id 用来存储任何类的对象。

```c
// 动态类型
Fraction_2 *f1 = [[Fraction_2 alloc]init];
// 编译时检查
[f1 setTo:1 over:10];

Complex *c1 = [[Complex alloc]init];
[c1 setReal:18.0 andImaginary:2.5];

id dataValue = f1;
// 运行时检查：因为存储在id变量中的对象类型在编译时无法确定，因此一些测试推迟到运行时（执行时）进行。
[dataValue print];  // numerator is 1, denominator is 10

dataValue = c1;
[dataValue print];  // 18 + 2.5
```

- id 如何知道应该应该调用哪个 print 方法？  
  Objective-C 系统总是跟踪对象所属的类。先判定对象所属的类，然后在运行时确定动态调用的方法，而不是在编译的时候。

  多态、动态类型 、 动态绑定都是基于这个原理。

- 编译时检查和运行时检查  
  编译时检查：If 代码有问题，编译器在编译器时报出警告或错误。  
  运行时检查：If 代码有问题，编译器在编译时不报出警告或错误，在运行时报错，程序崩溃。

  id 相关的代码是运行时检查。

- id 数据类型 与 静态类型  
  id 数据类型数据类型既然可以存储任何类型的对象，为什么不把所有的对象都声明为 id 类型呢？  
  不要养成滥用这种通用数据类型的习惯。

  为什么使用静态类型？  
  (1) 静态类型能更好地在编译阶段而不是运行时阶段指出错误。  
  (2) 提高程序的可读性。

  静态类型 ？  
  将一个变量定义为特定类的对象时，使用的是静态类型。  
  “静态” 指：对存储在变量中的对象的类型进行显式声明，这样，存储在这种形态中的对象的类是预定义的，也就是静态的。  
  使用静态类型时，编译器尽可能确保变量的用法在程序中保持一致。编译器能过通过检查来确定应用于对象的方法是由该类定义还是由该类继承的，否则，它将显示警告信息。

- 动态类型的参数与返回值
在多个类中实现名称相同的方法，那么每个方法都必须符合各个参数的类型和返回值，这样编译器才能为消息表达式生成正确的代码。
编译器对它所遇到的每个类声明执行一致性检查。如果有一个或多个方法在参数或返回值类型上存在冲突，编译器会显示警告信息。

- 处理动态类型的方法
这些问题的答案用来执行不同的代码序列，避免错误或在运行时检查程序的完整性。

TODO: 189 - 192

## 动态绑定

动态绑定则能使程序直到执行时才确定实际要调用的对象方法。

`_2_5_main_4_ check_dynamic_type`

![oc_check_dynamic_type](https://yingvickycao.github.io/img/ios/oc_check_dynamic_type.jpg) 

# 6 合成(composite)对象
类似于 Java 组合对象。