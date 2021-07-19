# Foundation 框架

# 1 Foundation 文档

(1) Developer Document
(2) 在 XCode 编辑文件时，当光标定位于代码上，按 Option 键并单击，调出概要面板。
(3) Online 文档
https://developer.apple.com/documentation

# 头文件

Foundation 框架包含大量的类、方法和函数。在 OS X 下，大约有 125 个可用的头文件，通过下面的语句简单进行导入。

```c
// Foundation.h 导入了Foundation所有的头文件。
#import <Foundation/Foundation.h>
```

TBD:
(1) 使用这条语句会明显增加程序的编译时间。然后，使用预编译的头文件可以避免额外的时间开销。预编译的头文件是编译器预先处理过的文件。通常所有 XCode 项目都会受益于预编译的头文件。  
(2) XCode5 中，"模块"的新功能能够帮助加速编译，以及帮助避免应用程序中使用不同的库出现的命名冲突。

# 2 数字

`_13_main_4_number.m`

- int、float、long 等它们是基本数据类型，不是对象。若需要对象，使用 NSNumber。
- 使用初始值创建 NSNumber 对象。
- NSInteger、NSUInteger 不是一个对象，是基本数据类型的 typedef。  
  NSInteger 是 64 位的 long，或 32 位的 int。

```c
#if __LP64__ || 0 || NS_BUILD_32_LIKE_64
typedef long NSInteger;
typedef unsigned long NSUInteger;
#else
typedef int NSInteger;
typedef unsigned int NSUInteger;
#endif
```

```c
NSInteger myInt = [intNumber integerValue];
// 将变量转换为long，并使用%li，目的是确保值能够传递而且正确显示，即使编译后是32位架构的。
NSLog(@"%li",(long)myInt);   // 100
```

# 3 字符串

# 3 集合

# 4 数组

# 5 字典
