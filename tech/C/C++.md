# C++

- C++是一种面向对象编程（类）、泛型编程（模版）和过程化编程（C）的语言
- ISO/ANSI C++ Standard ：  
  C++98/C++2003（1998,2003)=>C++03  
   C++ 11(2011)  
   C++ 14  
   C++ 17  
   C++ 20  
   C++ 23  
   C++ 2b

  https://isocpp.org/std/the-standard

- C++在 C 上新增了很多特性  
  （1）类和对象  
  （2）继承  
  （3）多态、虚函数和 RTTI（运行阶段类型识别）  
  （4）函数重载  
  （5）引用变量  
  （6）处理错误条件的异常机制  
  （7）名称空间  
  （8）模版以及标准库模版（STL）
- 语言列表
  https://zh-lang.cn/langs.html  
  https://www.tiobe.com/tiobe-index/
- C++是在贝尔实验室诞生，Bjarne Stroustrup， 20 世纪 80 年代。

# 1 C++ 程序的运行方式

- 编译器在不同平台、不同 vendor 提供的 c++编译器以及它的命令行模式可能是不同的。

## 如何用命令行运行一个 c++程序。

以 Mac 中 g++为例。  
 C 和 C++的处理步骤基本相同，C++用 g++，C 用 gcc。  
 编译参数 https://blog.csdn.net/qq_42428671/article/details/120746046

![cpp_run](https://yingvickycao.github.io/img/C/cpp_run.webp)

```bash
$ g++ --version
Apple clang version 14.0.0 (clang-1400.0.29.202)
Target: x86_64-apple-darwin21.6.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
```

```bash
$ g++ --help
-E                      Only run the preprocessor
-S                      Only run preprocess and compilation steps
-c                      Only run preprocess, compile, and assemble steps
-o <file>               Write output to <file>
```

```c++
// main.cpp
#include <iostream>

int main(int argc, const char * argv[]) {
    // insert code here...
    std::cout << "Hello, World!\n";
    return 0;
}
```

- Step 1 : 预编译阶段，也叫预处理阶段。  
  预处理：展开头文件、宏替换、去掉注释, 得到预处理后的源代码

```bash
// 预处理
// Input : main.cpp， Output : main.ii
// 虽然 main.cpp文件非常简单，只打印一句话，但是因为展开了头文件iostream，得到的main.ii文件很大。
$g++ -E main.cpp -o main.ii
```

- Step 2 : 编译阶段  
  检查语法错误。在检查无误后，g++把代码翻译成汇编代码(.ii)

```bash
// Way 1 :预处理后的源代码 .ii -> 汇编代码 .s
// Input : main.ii Output : main.s
$g++ -S main.ii -o main.s

// Way 2 :源代码  .cpp -> 汇编代码 .s
// Input : main.cpp， Output : main.s
// 这个main.cpp非常简单，g++自动预处理，然后再编译。
$g++ -S main.cpp -o main.s
```

- Step 3 : 汇编阶段
  生成目标代码（.o）
  在汇编阶段，生成目标代码，也就是二进制码。

```bash
// Way 1 : 汇编代码 .ii -> 目标代码 .o
$ g++ -S main.ii -o main.o


// Way 2 : 源代码 .cpp -> 目标代码 .o
// 因为这个源文件 .cpp非常简单，g++自动执行预处理、编译，然后再执行汇编
$ g++ -c main.cpp -o main.o
```

- Step 4 ： 链接阶段  
  链接阶段用来链接代码：将目标代码与其他代码链接起来。  
  链接是指将目标代码同使用代码的函数的目标代码以及一些标准的启动代码（startup code）组合起来，生成程序的运行阶段版本。  
  生成可执行程序。Windows 是.ext, Mac 是.out。  
  链接的作用：解决模块之间的引用（变量、函数等）问题。还将静态库和动态库链接一同链接生成可执行文件。  
  最终生成的文件包含该最终铲平的文件该被称为可执行代码。

```
// 目标代码 -> 可执行程序
$ g++ main.o -o main.out

// 假设main.o 中有 #include "test.h"
$ g++ main.o test.o -o finally.out
```

- Step 5 : 运行可执行程序

```bash
$ ./main.out
Hello, World!
```

Step 1 - Step 4，整个过程，目标是用编译器编译源代码，将源代码翻译为主机程序的内部语言——机器语言。

```bash
// 源代码 .cpp ->  可执行程序 .out
// 因为这个文件非常简单，编译器自动执行预处理、汇编、编译、链接，最终生成一个可执行程序
$ g++ main.cpp
// 运行可执行文件
$ ./a.out

// 因为这个文件非常简单，编译器自动执行预处理、汇编、编译，最后链接，最终生成一个可执行程序
$ g++ main.cpp -o main.out
$ ./main.out
```

# 2 文件

不同的编译器，使用的源文件不同。
Unix 下，.c 可以表示一个 C 或 C++源文件，但标准 C 才使用.c，.C 表示 C++.

![cpp_source_file](https://yingvickycao.github.io/img/C/cpp_source_file.webp)

# 3 main

`mian_1.cpp`

- 注释  
  单行注释。 C++也支持多行注释（C 风格），但不推荐，因为可能涉及起始符号与结尾符号的正确配对问题。  
  编译器忽略注释。  
  越复杂的程序，注释价值越大，能帮助理解代码。
- C++对大小写敏感
- 让窗口一直开着  
  `cin.get();`
- 语句  
  语句用分号结束。
  C 和 C++中不能省略分号。  
  C 和 C++一样，终止符(`;`，分号，terminator) 是语句的结束标记，是语句的组成部分，而不是语句之间的标记。  
  每条语句都是一个计算机指令，指出应做什么的。  
  在 main()函数中，函数末尾没有返回语句，则自动添加该返回 `return 0`; 这条隐含的返回语句只适用 main()函数，不适用其他函数。
- 运行 C++程序时，通常从 main()函数开始执行。  
  例外情况：  
  Case 1 : 在 windows 编程中，可以编写一个动态链接库(DLL)模块。这是其他 Windows 程序可以使用的代码。因为 DLL 模块不是独立的程序，因此不需要 main().  
  Case 2 : 用于专用环境的程序——机器人中的控制芯片，可能不需要 main()。  
  Case 3 : 有些编程环境提供一个框架程序，该程序调用一些非标准函数，如 tmain()。这种情况，有一个隐藏的 main()，它调用 t_main()。  
  总结：常规的独立程序都需要 main().

# 2 数据类型

## 基本数据类型

C++提供内置类型：整数（没有小数的数字）和浮点数（带小数的数字）

### 整数

### 浮点数

### 变量、常量

### 数据类型之间的隐式转换、显式转换

## 复合数据类型

使用基本的内置类型来创建更多的类型

### 数组

数组：存储多个同类型的值

### 结构

结构：存储多个不同类型的值

### 指针

指针：标识内存位置

## 文本字符串

- C-风格字符数组
- C++String 类

### 类

# 3 流程控制

## 循环

### for

### while

### do while

## 分支语句

## 逻辑运算符

if、if else
swith

# 4 函数重载

# 6 函数模版

# 7 内存模型

## 内存分配

用 new 和 delete 显式地管理内存

# 8 名称空间

名称空间用来管理函数、类、变量名。

# 9 函数

## 编写函数

## 递归

## 函数指针

## 内联函数 （C++）

内联函数，可以增加执行速度，但是会增加程序的程度。

## 引用变量（C++）

## 默认参数（C++）

## 函数模版（C++）

# 10 对象和类

- -对象声明描述
- 构造函数
- 析构函数

## 类的设计和使用

## 运算符重载

## 继承（is-a）

- 继承：共有继承，多重共有继承、抽象基类

## 多态

有些继承是多态的：用虚函数实现。

## 动态内存分配

## 虚函数

## 代码重用

方式： 共有继承（is-a）、包含（has-a）

- 类模版
- 栈模版

# 11 友元

### 友元类

### 友元函数

# 11 异常处理

# 12 string 类和标准模版库

# 13 输入、输出和文件

- C++ 可以用 C 的标准输入和输出函数
- C++增加了 cout/ 标准输入和输出函数

# 14 C++11 新功能

- 新类型
- 初始化语法
- 自动类型推断
- 智能指针
- 作用域内枚举
- 右值引用类型，以及如何用它实现移动语义
- 新增类功能
- lambda
- 可变参数模版
