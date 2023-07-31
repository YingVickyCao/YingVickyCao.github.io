# Proguard
# 1 功能
- 功能1 : 压缩(Shrink)   
检测并移除代码中无用的类、字段、方法和特性（Attribute）   
开发版本中移除无用的日志:`Log.d(TAG, "Log should be deleted"); ` 

- 功能2 : 优化(Optimize)  ： 移除没用的结构   
对字节码进行优化，移除无用的指令   
生成的APK体积更小  

- 功能3 : 混淆(Obfuscate)  
把类名、属性名、方法名替换为1两个字母：
不易被逆向工程(Reverse Engineer)     

- 功能4 : 预检(Preveirfy)     
在Java平台上对处理后的代码进行预检，确保加载的class文件是可执行的。

# 2 规则
proguard.cfg位于项目root 目录中，定义各种移除和保留代码等规则。
 `\sdk\tools\proguard\`

- (1) ProGuard 配置
```
-include {ffilename)：从给定的文件中诚取配置参数。  
-basedirectory {directoryname }：指定基础目录为以后对应的档  
案名称。
-injars {class_path}：指定要处理的应用程序jar、war、ear和目录。    
-outjars {class path} :指定処理完后要輸出的jar、war、ear和目录的名称。
-libraryjars {classpath}：指定要处理的应用程序jar、war、ear和目录所需的程序库文件。
-dontskipnonpubliclibraryclasses：指定不忽略非公共的库类。
-dontskipnonpubliclibraryclassmembers：指定不忽略包可见的库类的成员。
```


- (2) 保留选项
```
-keep {modifierj{class_specification)：保护指定的类文件和类的成员。  
-keepclassmembers {modifier}{class_specification}: 保指定类的成员。     
-keepclasseswithmembers {class_ specification}：保护指定    
```
- (3) 压缩
```
-dontshrink: 不压缩输入的类文件。
-printusage {filename}：输出无用文件。
```

- （4）优化

```
-dontoptimize：不优化输入的类文件。
-assumenosideeffects {class_specification}： 优化时假设指定的方法，没有任何副作用。
-al1owaccessmodification：优化时允许访问并修改有修饰符的类和关的成员。
```
- (5）混潘
```
-dontobfuscate：不混淆输入的类文件。
-printmapping {filename}：输出映射表。
-applymapping {filename}：重用映射增加混淆。
-obfuscationdictionary {filename}：使用给定文件中的关键宇作为要混滑方法的名称。
-overloadaggressively：混淆时应用侵入式重载：
-useuniqueclassmembernames：确定统一的混淆类的成员名称来增加混滑。
-renamesourcefileattribute{string)：设置源文件中给定的宇符串常量。
```

# 3 在Android上使用proguard

minifyEnabled true  时，在编译工程时自动混淆代码
```gradle
buildTypes {
    release {
        minifyEnabled true
        //proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        proguardFiles  'proguard-rules.pro'
    }
}
```

# Refs
- [ProGuard](https://www.cnblogs.com/cr330326/p/5534915.html)
- [ProGuard](https://blog.csdn.net/jjbheda/article/details/66973522)
- [ProGuard](https://blog.csdn.net/lhd201006/article/details/72913071)
