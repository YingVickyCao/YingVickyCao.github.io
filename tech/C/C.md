# C

# [操作系统与移动开发](../计算机/计算机原理.md)

- C 是在贝尔实验室诞生，Dennis Ritchie， 20 世纪 80 年代。

# 1 了解 C 语言

C 提供了程序处理硬件问题的能力

## 为什么学 C 语言？

Objective-C 是扩展 C 语言的。  
先学 C 语言，再学 Objective-C。也可以直接学 C 语言。

用 C 语言重写了 Unix 系统。  
C 语言是高级语言 C++的基础。  
几乎所有的操作系统都是基于 C 语言编写。  
几乎所有的高级编程语言都是从 C 发展而来。  
所有的关键性应用都使用 C 语言编写。

编程语言排行榜  
https://hellogithub.com/report/tiobe  
https://www.tiobe.com/tiobe-index/

## 为什么不直接学 Swift，还要学 Objective-C ？

国内大部分公司，主要用 Objective-C。只有个人项目、小公司会用 Swift。

## C 语言的标准

- C#：微软
- C 语言：任由 C 语言自由发展，C 语言的核心一级编译器公开，并允许第 3 方按照自己的需求去改。  
  后来，为了保证代码移植性，指定了 C 语言的语法规范、编译器规范、C 标准库应该提供哪些函数等。  
  C 语言的编译器有很多个，不同的编译器标准不一样。那么，同一份代码，换个编译器，就不一定能运行。
- C 语言的编译器 ：
  XCode（自带 3 个命令行编译器 clang、g++、gcc），

```bash
$ clang --version
Apple clang version 14.0.0 (clang-1400.0.29.202)
Target: x86_64-apple-darwin21.6.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin

$ gcc
clang: error: no input files
Hades-Mac:Lean-C++ hades$ gcc --version
Apple clang version 14.0.0 (clang-1400.0.29.202)
Target: x86_64-apple-darwin21.6.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin

$ g++ --version
Apple clang version 14.0.0 (clang-1400.0.29.202)
Target: x86_64-apple-darwin21.6.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
```

Visual Studio Code - C/C++ Pulgin

- C Compilers
  | Platform | Compilers | Architectures |
  | -------- | ---------------- | -------------------- |
  | Windows | cl, clang, gcc | x64, x86, arm64, arm |
  | Linux | clang, gcc | x64, x86, arm64, arm |
  | macOS | clang, gcc | x64, x86, arm64 |

- C++ Compilers
  | Platform | Compilers | Architectures |
  | -------- | ---------------- | -------------------- |
  | Windows |cl、g++| |
  | Linux | g++ | |
  | macOS | clang，g++ | |

  cl 是 微软的 C/C++编译器，也叫 MSVC。  
  GNU C 编译器是 gcc ，C++编译器是 g++.  
  clang 编译器是苹果的 C、C++、Objective-C 和 Objective-C++的编译器。  
  Window 中 安装命令行编译器 Cypwin 和 MinGW 都包含 GNU 的 gcc 和 g++。

## 终端

作用：  
很多功能的设置都可以通过命令行的方式来实现。  
通过鼠标都不能完成的操作，通过终端都可以完成。  
某些程序或功能只能依赖于终端来执行，否则无法执行。例如：ping 命令是一个程序。

```
Last login: Sun Oct 30 21:17:26 on ttys000// 代码上次打开终端的时间

The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
MyPC:~ hello$


“MyPC”  代表当前计算机的名字。 如何更改？System References -> Sharing
“~ ” 代表当前终端的工作路径，当前是Home
“hello” 代表当前的账户名
```

### 终端常用命令

pwd show the current path of Terminal
ls list/清单。显示当前工作路径的所有文

```
$ ls

Book1.xlsx  Common.txt  Test
$ ls -l
total 2112
//          file id   account    account group     size
-rw-r--r--@  1         hello      staff            10633     Oct 14 19:45 Book1.xlsx
-rwxr-xr-x@  1         hello      staff            2818      Oct 17 15:19 Common.txt
drwxr-xr-x   8         hello      staff            256       Oct 28 21:30 Test
// d ： dir， - ： file
// wxr-xr-x@  file access authority
```

mkdir create dir
clear
touch 在当前工作路径下创建一个空文件。
cd

# 2 main 函数

main 函数是程序的入口，也是程序的出口
XCode 中一个 Target 中只有一个 main 方法，否则报错：“duplicate symbol for architecture x86_64”

# 3 如何写一个 C 语言的程序，以及它的执行过程

https://zhuanlan.zhihu.com/p/469950256  
https://zhuanlan.zhihu.com/p/54890424

```
源代码（.c）   -> 汇编代码（.o）    ->
```

### 1） 准备工作

了解 C 语言的语言规范。  
 语法规范就是将一些英文单词和符号按照它的要求组合起来。  
 C 语言严格区分大小写。

### 2）保证系统上安装了编译器。将 C 语言代码转化为二进制代码。

```
$ cc
dialog to install CC => C compiler is not installed
/
clang: error: no input files => C compiler is already installed
```

How to install C compiler ？  
Install XCode OR Command line tools for OSx.

### 3) 编写一个 C 代码

- step 1 : create .c and write codes flowing C language rule.

```
#include <stdio.h>

int main(){
  printf("Hello World\n");
  return 0;
}
```

- step 2 : 编译
  Use C Compiler transfor 源文件中的代码为二进制代码。该过程叫做编译.

```
cc -c 源文件
```

```
$ cc -c main.c
// + main.o
```

.o 是 目标文件，它存储的的是.c 文件代码对应的二进制指令。

注意：
编译器在编译的时候，会先检查.c 源文件中的代码是否符合 C 语法规范。  
如果不符合就报错，并提示错误原因，且不会生成.o 文件。

- step 3: 链接  
  还不能直接运行，因为目标文件当中仅仅存储的是.c 文件代码对应的二进制指令。  
  1 个程序想要交给 CPU 去执行，光这样是不行的。  
  还必须为这个目标代码添加一些启动代码。  
  添加启动代码的过程，叫做链接。

```
cc 目标文件
```

```
$ cc main.o
// + a.out,   a.out 是最终的可以在终端执行的程序
```

5）执行 a.out

```
$ ./a.out
Hello World
```

补充

编译器编译指令： `cc .文件名`
该指令会将.c 文件编译，然后自动链接。

## IDE

IDE 是软件，Integrated Development Environment （集成开发环境）  
搭建环境，就是装开发软件、并相关配置的意思。  
不同的开发平台具有不同的 IDE 工具。

- XCode 编写第一个程序

[Code - main.c](https://github.com/YingVickyCao/Lean-C/blob/main/main.c)
New Project -> Choose Mac OS -> Terminal
Bundle Identifier：Bundle 的含义是程序

# 4 注释

[Code - 2_Comment.c](https://github.com/YingVickyCao/Lean-C/blob/main/Example-3/2_Comment.c)

什么是注释？对代码的注释。目的是提高代码的可读性、备忘。

注释种类：多行注释、单行注释

```c
/**
多行注释
*/

// 单行注释
```

# 5 变量

[Code 3_variable.c](https://github.com/YingVickyCao/Lean-C/blob/main/Lean-C/3_variable.c)

- 浮点字面值默认是 double 类型

- 变量的命名规则以及规范

变量的命名规则：如果不遵守，编译器直接报语法错误。  
（1) 变量只能以任意的字母或`*`或`$`开头，不能以数字开头  
（2) 后面跟任意的字母或\*或$或数字  
（3) 不能与 C 关键字重名  
关键字：一些英文单词在 C 语言中，有特殊的意义。  
关键字在 XCode 中以特殊颜色标记。  
一旦变量用关键字名命名，会编译报错。  
（4) C 语言区分大小写。  
（5) 变量先声明，再使用。  
（6) 在同一个大括号中，不允许定义多个变量名相同的变量。

变量的命名规范：可以不遵守，编译器不会报错，但可以执行。但是所有程序员都在遵守。  
(1) 变量的名字要取得有意义。知名达意。  
(2)峰驼命名 e.g., stuName.  
第一个单词小写，后面的单词首字母大写。

- 合格的程序员？  
  必要时注释。
  命名规范。  
  代码对齐。

- 交换两个变量的值
  [Code 3_variable_wap_value.c](https://github.com/YingVickyCao/Lean-C/blob/main/Lean-C/3_variable_wap_value.c)
  [C.pptx](C.pptx) - 交换两个变量的值

3 种方法

```c
temp= a;
a = b;
b = temp;
```

![c_swap_two_variable_value](https://yingvickycao.github.io/img/C/c_swap_two_variable_value.webp)

```c
a = a+b;
b = a-b;
a = a-b;
```

```c
a = a^b;
b = a^b;
a = a^b;
```

# 6 表达式

## 数据类型转换

int/float/double/char

# 7 输入、输出

## printf

- printf("格式控制字符传",变量列表);

```
 int, %d
 float, %f, 默认输出小数点后面的6位
 float, %.nf 指定输出小数点后的位数

 double,%lf, 默认输出小数点后面的6位
 double,%.nlf 指定输出小数点后的位数

 char, %c
```

## scanf

[Code 6_scanf.c ](https://github.com/YingVickyCao/Lean-C/blob/main/Lean-C/6_scanf.c)

```c
int num = 0;
scanf("%d",&num); // %d是占位符, 用&来取变量的地址

int num1 = 0;
int num2 = 0;
scanf("%d%d",&num1,&num2);
```

```
int     %d
float   %f
double  %lf
char    %c
```

- scanf is blocked method
- scanf 缓冲区
  Ref:
  [Code 6_scanf_buffer_area.c ](https://github.com/YingVickyCao/Lean-C/blob/main/Lean-C/6_scanf_buffer_area.c)  
  [C.pptx](C.pptx) - scanf 缓冲区

![c_scanf_buffer_area_1](https://yingvickycao.github.io/img/C/c_scanf_buffer_area_1.webp)

![c_scanf_buffer_area_2](https://yingvickycao.github.io/img/C/c_scanf_buffer_area_2.webp)

![c_scanf_buffer_area_3](https://yingvickycao.github.io/img/C/c_scanf_buffer_area_3.webp)

# 8 运算符

[C 运算符优先级](https://zh.cppreference.com/w/c/language/operator_precedence)

[C++ 运算符优先级](https://zh.cppreference.com/w/cpp/language/operator_precedence)

# 13 输入、输出和文件

标准输入输出 : stdio.h, prinf / scanf/其他标准 C 输入和输出函数
