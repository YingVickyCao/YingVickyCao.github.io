# XCode

- XCode ：C/C++/Objective/Swift, 闭源、免费

- 1 Install XCode
  Minimum requirements and supported SDKs https://developer.apple.com/support/xcode/

Search "xcode 10.3"  
 "Xcode 10.3"  
 https://download.developer.apple.com/Developer_Tools/Xcode_10.3/Xcode_10.3.xip

- 开发者账号
  **真机调试 不需要开发者账号**  
   果你学习之后是要作为一个独立开发者发布 app ，那么这 $99/y 的入场费是必须的，如果没有这方面的需求而是加入某一公司之类的，就没啥必要  
   淘宝可以买 关键字：“ ios 真机调试证书”

- 如何建立文件夹？
  New group  
  New group without folder.
  <br/>

- XCode 特点

(1) 点击运行按钮，XCode 自动帮我们编译-链接-执行

```
// Runs finished
Program ended with exit code: 0
```

（2）实时检测语法错误  
（3）关键字自动着色，不同颜色表示不同的含义。  
（4）代码自动缩进  
（5）代码自动提示

- XCode 编译后，生成的可执行文件在哪里？  
   Products -> 右键 -> Show in Finder
  <br/>

- Shortkey
  Command + R : auto compile -> link->run.  
  Command + B : auto compile -> link.  
  格式化:Ctrl + i
  <br/>

- Double click ".xcodeproj" to open project

- Target  
  Project 下面有一个文件夹，叫做 Target。  
  1 个 Target 就是一个程序。  
  默认时 Project 只有一个 Target，且名字相同。  
  一个 Project 可以添加多个 Target : Project -> TARGETS , click "+"
