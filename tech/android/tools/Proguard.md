# Proguard
## 功能
- 功能1 : 压缩(Shrink)   
检测并移除代码中无用的类、字段、方法和特性（Attribute）   
开发版本中移除无用的日志:`Log.d(TAG, "Log should be deleted"); ` 

- 功能2 : 优化(Optimize)   
对字节码进行优化，移除无用的指令   
生成的APK体积更小  

- 功能3 : 混淆(Obfuscate)  
使用a，b，c，d这样简短而无意义的名称，对类、字段和方法进行重命名    
不易被逆向工程(Reverse Engineer)     
`minifyEnabled = true  `  

- 功能4 : 预检(Preveirfy)     
在Java平台上对处理后的代码进行预检，确保加载的class文件是可执行的。

## 规则
proguard.cfg位于项目root 目录中，定义各种移除和保留代码等规则。
 `\sdk\tools\proguard\`

# Refs
- [ProGuard](https://www.cnblogs.com/cr330326/p/5534915.html)
- [ProGuard](https://blog.csdn.net/jjbheda/article/details/66973522)
- [ProGuard](https://blog.csdn.net/lhd201006/article/details/72913071)
