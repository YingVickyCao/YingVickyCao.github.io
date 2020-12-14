# Swift

# 1 如何学习一门新的语言？

学习新编程的方法：坐标系学法 =>语言大纲  
 程序 = 数据结构（静态） + 算法（动态）  
 算法：描述一个过程  
 面向对象语言：C++/C#/Java/Swift

# 2 Swift Refs

https://developer.apple.com/swift/  
https://developer.apple.com/swift/resources/  
The Swift Programming Language https://docs.swift.org/swift-book/index.html  
https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html

# 3 为什么学习 Swift 语言？

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

# 4 C++/C 与 IOS 开发

- OC 与 C++/C 互相调用  
  https://blog.csdn.net/qq_37240033/article/details/54962835  
  https://blog.csdn.net/yinqiangqiang/article/details/37602929  
  https://blog.csdn.net/kmyhy/article/details/52457325

- IOS app 中什么时候使用 C++？  
  (1)app 中调用 C++ 写的库  
  (2)将 app 中的一部分代码用 C++ 来写，这样便于跨平台。

# 5 Playgrpound

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
  Way 2 ： add new Playgrpound file in current project

# [6 Contents](Swift_Contents.md)
