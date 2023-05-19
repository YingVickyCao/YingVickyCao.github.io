# IDEA

# 1 IDEA vs Android Studio

ADT = SDK + Eclipse+ Android Plugin for Eclipse。  
Android Studio = SDK + Intellij + Android Plugin For IntelliJ。

IDEA, IntelliJ IDEA = The Most Intelligent Java IDE for all the tools。  
Excel at enterprise, mobile and web development with Java, Scala and Groovy, with all the latest modern technologies and frameworks available out of the box.

# 2 Plugins

- idea jrebel 热部署

- UML  
  https://blog.csdn.net/zj420964597/article/details/87856758

# 3 使用 Inspections 自动生成 serialVersionUID

Step 1: Setting -> Inspections -> serialVersionUID -> 勾选"Serializable class without serialVersionUID"  
Step 2: 类名-> Alt+Enter ，点击"Add serialVersionUID field"，然后自动生成 serialVersionUID。

# 4 Q : How does IDEA support Android app?

A :  
Step 1 : File -> New -> Project -> Android -> Click support android, then starting downloads about android.  
Step 2 : After download finish, re-open IDEA, and try again.

# 5 IDEA (2019.1.4) on Mac 没有等宽字体 Consolas？

Step 1 : 得到 Consolas 字体文件（.ttf）  
Way 1 : 假如安装了 Office 软件，在 Excel 安装路径 Contents 搜索 Consola，得到 Consola 字体. (Recommended)  
Way 2 : https://ikato.com/blog/how-to-install-consolas-font-on-mac-os-x.html

```
Consola.ttf 		// Consolas regular
Consolab.ttf		// Consolas Bold
Consolai.ttf		// Consolas Italic
Consolaz.ttf 		// Consolas Bold Italic
```

Step 2 : 双击.ttf 文件，安装字体. 安装后出现在 Font Book.app 中。
Step 3 : 重启 IDEA 后，才能看到 Consolas 字体。然后设置字体为 Consolas。

# 6 IDEA 如何防缩？

https://blog.csdn.net/kqZhu/article/details/115522979

# 7 设置自动导包，并自动去掉无用的包

search "import" -> "Add unambiguous imports on the fly" and "Optimize imports on the fly"

# 8 调试技巧

(1)条件断点
(2)【Code】->【Analyze Code】->【Data Flow to Here】和【Data Flow from Here】
Data Flow to Here:根据选中的变量、参数、或字段，分析其传递到此处的路径。
Data Flow from Here：分析当前选中的变量如何往下传递路径，直到结束。
（3）修改修改变量值。
在调试时进入断点后->Set value / F2,完成修改值，并且该值只对当此有效。
