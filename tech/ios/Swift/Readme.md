# Swift

# 1 准备工作

Swift 5.0  
 macOS 10.14.4  
 Xcode 10.2

创建命令行程序来学习 Swift.
![xcode_create_command_project](https://yingvickycao.github.io/img/ios/xcode_create_command_project.webp)

Ref of Swift
https://www.swift.org/
https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html
https://www.swift.org/download/

# 2 Swift 的 背景

Swift 由 Chris Lattner 开发，是 CLang 的作者，LLVM 项目的主要发起人。  
Swift 完全开源，主要采用 C++编写：https://github.com/apple/swift

# 3 Swift 5 开始，ABI 已经稳定，意味以后基本语法基本稳定了，不会有大的变化。

API （Application Progrmming Interface）：应用程序接口，是源代码库之间的接口。

ABI（Application Binary Interface）：应用程序二进制接口，是应用程序与操作系统之间的底层接口。  
比如，Android 的应用程序-Java /Kotlin 与操作系统的底层语言 C/++的接口。  
涉及内容：目标文件格式、数据大小/布局/对齐/排序、指令集、寄存器、函数调用约定等。  
Ref of 函数调用约定：  
https://zhuanlan.zhihu.com/p/386106883  
https://docs.microsoft.com/zh-cn/cpp/build/ overview-of-arm-abi-conventions?view=msvc-170

# 4 编译器流程

## 汇编代码（Assembly） VS 机器码（Executable Machine Code）VS 目标代码

- 汇编代码是纯文本的源代码，人可以阅读，大多数与机器指令有 1:1 的模拟。
- 机器代码：二进制代码，有直接 CPU 执行。
- 目标代码：机器码的一部分。很多的目标代码，由连接器链接后，形成最总程序的机器代码。  
  https://www.codenong.com/466790/

## 通用编译流程

![basic_compiler_progress](https://yingvickycao.github.io/img/ios/swift/basic_compiler_progress.webp)

## Swift 编译流程 TODO：

https://www.swift.org/swift-compiler/

编译器分为：  
前端：词法分析  
后端：生成平台对应的二进制代码（可执行文件）

![swift_compiler_architecture](https://yingvickycao.github.io/img/ios/swift/swift_compiler_architecture.webp)

![swift_compiler_architecture2](https://yingvickycao.github.io/img/ios/swift/swift_compiler_architecture2.webp)

![swift_compiler_progress](https://yingvickycao.github.io/img/ios/swift/swift_compiler_progress.webp)

![swift_compiler_architecture3](https://yingvickycao.github.io/img/ios/swift/swift_compiler_architecture3.webp)

- Clang is an "LLVM native" C/C++/Objective-C compiler

- Parsing （解析）  
  生成抽象语法树（Abstract Syntax Tree (AST)）  
  工具：lib/Parse

- Semantic analysis （语义分析）  
  检查，包括类型推断、并对有问题的代码发出警告或错误。

- Clang importer（Clang 导入器）  
  工具：lib/ClangImporter  
  链接 C 或 OC 到 Swift

- SIL generation：生成 Swift 中间语言  
  Swift Intermediate Language (SIL)  
  工具：lib/SILGen  
  工具：docs/SIL.rst  
  输入：AST  
  输出：“raw” SIL

- SIL guaranteed transformations ：生成规范的 Swift IL  
  工具：lib/SILOptimizer/Mandatory  
  输入：“raw” SIL  
  输出：“canonical” SIL

- SIL Optimizations：SIL 优化  
  工具：lib/Analysis、lib/ARC、lib/LoopTransforms 和 lib/Transforms

- LLVM IR Generation ：IR 的生成  
  工具：lib/IRGen  
  输入：SIL  
  输出：LLVM IR  
  LLVM Intermediate Representation（LLVM IR），LLVM 的中间表示或中间代码，LLVM IR 是连接编译器前端与 LLVM 后端的一个桥梁。
- LLVM ：继续优化 LLVM 并生成机器代码

# 5 查看 Swift 信息

- Check swift version

```
$ xcrun swift -version
Apple Swift version 5.0.1 (swiftlang-1001.0.82.4 clang-1001.0.46.5)
Target: x86_64-apple-darwin18.7.0
```

swift 同时包含 swiftlang 和 clang，因此它能处理 C/C++/Objective C。

- Check swift postion

```
# 默认情况
$ xcrun --find swift
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/swift
```

```
# 使用“xcode-select --install”安装Xcode command line tools后
$ xcrun --find swift
/Library/Developer/CommandLineTools/usr/bin/swift
```

![swift_position_1](https://yingvickycao.github.io/img/ios/swift/swift_position_1.webp)

![swift_position_2](https://yingvickycao.github.io/img/ios/swift/swift_position_2.webp)

TODO：`"swiftc"`/`"swift"`右键 -> "Show Original" -> 指向了`"swift-frontend"`

```
TODO:
s$ swiftc --help
OVERVIEW: Swift compiler


$ /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/swift-frontend

Welcome to Apple Swift version 5.6 (swiftlang-5.6.0.323.62 clang-1316.0.20.8).
Type :help for assistance.
  1> :q
```

```
$ /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang --version
Apple clang version 13.1.6 (clang-1316.0.21.2)
Target: x86_64-apple-darwin21.5.0
Thread model: posix
InstalledDir: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin
```

```
$ /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/swift-frontend --version
Apple Swift version 5.6 (swiftlang-5.6.0.323.62 clang-1316.0.20.8)
Target: x86_64-apple-macosx12.0
```

- List swift versions in project
  Project -> Build Settings -> search "switch"

# 6 swiftc

```swift
//main.swift
import Foundation
print("Hello, World!")
```

```
// 生成语法树
swiftc -dump-ast main.swift
// 生成语法树，并输出到main.ast（文本文件）
swiftc -dump-ast main.swift -o main.ast

// 生成SIL代码（Swift中间代码）
swiftc -emit-sil main.swift
// 生成SIL代码（Swift中间代码），并输出到main.sil（文本文件）
swiftc -emit-sil main.swift -o main.sil

// 生成LLVM IR 代码（LLVM中间代码)
swiftc -emit-ir main.swift
// 生成LLVM IR 代码（LLVM中间代码），并输出到main.ll（文本文件）
swiftc -emit-ir main.swift -o main.ll

// 生成 Assembly（汇编代码），并输出到main.s（文本文件）
swiftc -emit-assembly main.swift
swiftc -emit-assembly main.swift -o main.s
```

分析汇编代码，掌握编程语言的本质。当网上资料感觉不对时，通过分析汇编代码来判断是否正确。

```c
// test.c
#import <Foundation/Foundation.h>

int main(int argc,const char* argv[]){
   @autoreleasepool {
       int c = sizeof(int);
       printf("%d", c);
   }
}
```

通过汇编看出，sizeof(int) 是一个常量值，不是函数。因为如果是函数应该会执行 callq。

```
// $ 表示是一个立即数，即常量值。
$0x4, -0x14(%rbp) // 表示把立即数(4)存储地址-0x14 (c)

int c = sizeof(int);  等价于 int c = 4;
```

![oc_debug_assembly](https://yingvickycao.github.io/img/ios/oc/oc_debug_assembly.webp)

![oc_debug_assembly](https://yingvickycao.github.io/img/ios/oc/oc_debug_assembly_2.webp)

Ref:
https://juejin.cn/post/7093842449998561316

# 7 如何学习一门新的语言？

学习新编程的方法：坐标系学法 =>语言大纲  
 程序 = 数据结构（静态） + 算法（动态）  
 算法：描述一个过程  
 面向对象语言：C++/C#/Java/Swift

# 8 为什么学习 Swift 语言？

说说 WWDC2014 开发者大会  
 (1) 输入法支持第三方  
 只是开放的第一步  
 (2) Cloud  
 (3) HomeKit：  
 (4) HealthKit

铁人三项：软件 + 硬件 + 网络  
 Android 和 Google 利用手机打造一个真正的智能平台。  
 Kit = API = 建立一个行业标准

移动嵌入式是未来趋势。

在平台做了哪些事情？  
 智能手环  
 智能医疗  
 Google Glass  
 Ware  
 TV  
 Auto（自动驾驶）

为什么会有 Swift？  
 (1) Apple 重写了 Runtime 运行时，特别是编译器，提高运行速度  
 (2) 编写代码更有效率，语言更简单。  
 (3) Swift 学习起来相对简单一些，有面向对象语言基础的，学 Swift 挺快。

Object C：  
 编写太麻烦，编写速度慢；  
 效率不够高，有时会出现卡顿。  
 OC 学习门槛比较高一点.~~

Swift：  
 速度、性能很高；  
 兼容 C/Object C/C++，以后会替代它们，是编写 IOS 的王者语言。

# 9 C++/C 与 IOS 开发

- OC 与 C++/C 互相调用  
  https://blog.csdn.net/qq_37240033/article/details/54962835  
  https://blog.csdn.net/yinqiangqiang/article/details/37602929  
  https://blog.csdn.net/kmyhy/article/details/52457325

- IOS app 中什么时候使用 C++？  
  (1)app 中调用 C++ 写的库  
  (2)将 app 中的一部分代码用 C++ 来写，这样便于跨平台。

# 10 Playgrpound

使用 Playgrpound 可以快速预览代码效果，方便学习语法。

- Playgrpound 作用：  
  优点：可视化，方便，所见即所得  
  缺点：不够成熟，不能用于实际开发  
  Mind，Debug，Test，编码实现一些设计猜想

- SwiftExamnple.playground is a zip containing 3 files.  
  Way 1 : Open in Editor  
  Way 2 : +".zip"/".rar"

  Contents.swift  
  contents.xcplayground

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<playground version='5.0' target-platform='macos'>
    <timeline fileName='timeline.xctimeline'/>
</playground>
```

timeline.xctimeline

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Timeline
   version = "3.0">
   <TimelineItems>
      <LoggerValueHistoryTimelineItem
         documentLocation = "file:///Users/hades/Desktop/SwiftExamnple.playground#CharacterRangeLen=12&amp;CharacterRangeLoc=160&amp;EndingColumnNumber=0&amp;EndingLineNumber=19&amp;StartingColumnNumber=5&amp;StartingLineNumber=18&amp;Timestamp=626517426.123819"
         selectedRepresentationIndex = "0"
         shouldTrackSuperviewWidth = "NO">
      </LoggerValueHistoryTimelineItem>
   </TimelineItems>
</Timeline>
```

- 如何建立 Playgrpound 文件？  
  Way 1 ：XCode -> Create a Playgrpound.  
  Way 2 ： add new Playgrpound file in current project0

- Playgrpound 支持多 Page。  
  File -> New -> Playground Page / Playground 的右键 -> New Playground Page

- Playgrpound 中注释支持 MarkDown 语法

# [6 Contents](Swift_Contents.md)
