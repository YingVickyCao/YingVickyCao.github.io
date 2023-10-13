# Basic 
JetBrains 2011/7 月开发了 Kotlin,以公司附近的一座小岛 Kotlin 命名。  
Google I/O 2017 被 Google 定义为 android 开发第一语言.

# 1 Introduce Kotlin to Android Project

https://developer.android.google.cn/kotlin/add-kotlin

```Groovy
// Project build.gradle file.
buildscript {
   ext.kotlin_version = '1.8.0'
    dependencies {
      /// Add Android Kotlin Plugin to android project
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}
```

```Groovy
// Case 1 : Inside each module(app , android library) using kotlin, START
plugins {
    ...
    id 'kotlin-android'
}
  /
apply plugin: 'kotlin-android'
// Case 1 : Inside each module(app , android library) using kotlin, END

// Case 2 : Inside each module(Java library) using kotlin,START
plugins {
    ...
    id 'kotlin'
}
/
apply plugin: 'kotlin'
// Case 2 : Inside each module(Java library) using kotlin,END

...

dependencies {
  // Depresseed org.jetbrains.kotlin:kotlin-stdlib-jdk7 and org.jetbrains.kotlin:kotlin-stdlib-jdk8
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
}


// By default, new Kotlin files are saved in src/main/java/. But also can custom the location of kotlin files
android {
    sourceSets {
        main.java.srcDirs += 'src/main/kotlin'
    }
}
```

- 1 学习重点：  
  Kotlin 基础语法
  Kotlin 与 java 互调 ：包括 迁移 Java 到为 Kotlin，
  常见使用问题 s

- 2 IDE
  IDEA
- 3 How to see the Kotlin generated code :IDEA -> Tools -> Kotlin -> "Show Kotlin bytecode"

# 2 程序入口
```kotlin
fun main(args: Array<String>) {
}

fun main() {
    println("hi")
}
```

# 2 Package
Yes


# 3 语句

一条语句，不用加`;`

# 4 文件名

- kotlin_name.kt -> kotlin_nameKt.class having kotlin_nameKt
- 只有fun在.kt时，那么生成的fun是static

```kotlin
//Main.kt
fun main() {
    Test.message("welcome")
}


MainKt.kt -> MainKt.class having class MainKt
/**
 * public final class MainKt {
 *    public static final void main() {
 *       Test.INSTANCE.message("welcome");
 *    }
 *
 *    // $FF: synthetic method
 *    public static void main(String[] var0) {
 *       main();
 *    }
 * }
 */
```

- 如何修改生成的文件名和class 名？

```kotlin
//Main.kt
@file:JvmName("LoginUtils")

MainKt.kt -> LoginUtils.class having class LoginUtils
```

```kotlin
// Utils1.kt
@file:JvmName("MyUtils")
@file:JvmMultifileClass

// Utils2.kt
@file:JvmName("MyUtils")
@file:JvmMultifileClass

MyUtils.class
Utils1.kt -> MyUtils__Utils1Kt.class having MyUtils__Utils1Kt
Utils2.kt -> MyUtils__Utils2Kt.class having MyUtils__Utils2Kt
```
# 5 Java 与 Kotlin 互相调用

// TODO:性能 java vs kotl

# 6 常量 、 变量

常量 val (value)  
变量 var (variable)

```kotlin
var age: Int = 18
val num = 10
```

