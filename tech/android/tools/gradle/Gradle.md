# Gradle

Build 工具:后端,移动端
Gradle 是构建工具是一种构建工具、依赖管理工具，基于 Groovy 语言，采用 DSL 格式。

# Gradle 知识点

- 支持 lamdar 表达式
- 自定义代码目录
- 多渠道打包
- 自定义 apk 文件名
- release apk and release key
- 支持 kotlin
- 支持 C++
- dependencies conflict
- 统一管理依赖版本号
- Proguard
- Create an Android Library
- Speed up build
- Splits

# 1 gradle vs maven

没有关系。

# 2 Gradle assemble ：build a APK

```
blue,yellow,red

gradle assembleBlue : build Blue debug and release 两个版本
gradle assembleDebug : build Debug blue,yellow,red  三个版本
gradle assembleBlueDebug : build blueDebug 1个版本


// gradle 先clean project，然后build uat release apk, 跑 app 和 lib1 的uat release unit test
gradle clean :app:assembleUatRelease :app:testUatRelease :lib1:testUatRelease
```

# 3 Gradle config files

- Project  
  gradle.properties
- Global `~/.gradle/gradle.properties`

# 4 Gradle Proxy setup

# 5 Logging

Build -> Sync

```groovy
// Logging
logger.quiet("logger quiet")
logger.error("logger error")
logger.warn("logger warn")
logger.lifecycle("logger lifecycle")
logger.info("logger info")
logger.debug("logger debug")
logger.trace("logger trace")

println 'println logger quiet'
```

# 6 Gradle maven repo add credentials

```
repositories {
    maven {
        credentials {
        username 'username'
        password 'password'
        }
    url 'http://maven.coder4.com/nexus/content/groups/public' }
}
```

OR

```
$ open ~/.gradle/gradle.properties
mavenUser=username
mavenPass=password

repositories {
    maven {
        credentials {
            username "$mavenUser"
            password "$mavenPass"
        }
        url 'http://maven.coder4.com/nexus/content/groups/public'
    }
}
```

# 7 Gradle build 过程

## project

- `build.gradle`  
  task : action + 依赖逻辑  
  依赖逻辑:有向无环图(DAG, Directed Acyclick Graph)
- build.gradle + 依赖逻辑 -> 组成 task graph -> 执行 task
- 没有被依赖的 task 首先被执行
- 几乎所有 task 依赖的其他 task 来执行

## 三个阶段

![Gradle Build 3 steps](https://yingvickycao.github.io/img/tools/gradle/gradle_build_process.png)

Load build ：  
![Load build](https://yingvickycao.github.io/img/tools/gradle/gradle_build_process_load_build.png)

Configure build ：  
project 对象: setting.gradle,project level  
执行所有 build.gradle 脚本，并创建所有 task，生成 task grash  
 ![Configure build](https://yingvickycao.github.io/img/tools/gradle/gradle_build_process_load_build.png)

Run Tasks :  
![Run Tasks](https://yingvickycao.github.io/img/tools/gradle/gradle_build_process_run_tasks.png)

# 8 gradle wrapper

- `gradle/wrapper/gradle-wrapper.jar`

## gradlew

- 避免 gradle 版本不同造成的向后兼容问题
- Run

```
MAC
./gradlew XXX

Win7
gradlew XXX
```

- 不需要手动下载 gradlew，当运行脚本时，若本地没有自动下载对应版本
- 使用命令和 gradle 相同

# 7 Update gradle

[Update Gradle](https://developer.android.google.cn/studio/releases/gradle-plugin#updating-gradle)

- gradle  
  `gradle/wrapper/gradle-wrapper.properties`

- gradle plugin  
  projecgt-level `build.gradle`

# 8 [Proguard](../Proguard.md)

# 9 Signing

- release 版本  
  `app\build\outputs\apk\(google\)release\name.apk`

# 10 Build Variants

## Build Types

- debug
- release

## Product Flavors

Combine multiple product flavors with flavor dimensions

### QA:All flavors must now belong to a named flavor dimension

- Reason:  
  因为多了一个 flavor 节点，导致他找不到 dimension

- Solution:  
  flavorDimensions = VersionCode

## buildTypes + ProductFlavor => build variant

```
src/buildType/
src/productFlavor/
src/productFlavorBuildType/
```

## Change the application ID for build variants

`BuildConfig.java`

## Change the version name for build variants

`BuildConfig.java`

## Filter variants

## defaultConfig

- same properties
- belongs to the ProductFlavor class
- provide the base configuration for all flavors

## Create source sets

- Task > android>sourceSets
- main is common
- Change default source set configurations
  `+= or =`
- Testing source sets

### Build with source sets

#### Merge duplicate resources

build variant > build type > product flavor > main source set > library dependencies

#### priority

1. src/demoDebug/ (build variant source set)
2. src/debug/ (build type source set)
3. src/demo/ (product flavor source set)
4. src/main/ (main source set)

#### Run Task ( app > Tasks > android > sourceSets)

```
main
debug
google
googleDebug
googleRelease
```

# 11 Multiple APK Support

# 12 Dependencies

## Type 7

### Type1-compile / implementation

- 包含其他所有类型
- 参与编译和打包
- Format

```
implementation fileTree(dir: 'libs', include: ['*.jar'])
implementation files(dir: 'libs', include: 'one.jar')
implementation 'com.android.support:appcompat-v7:26.1.0'
implementation "com.example.hades:calculator2:1.0.0@aar"
implementation project(':calculator')
```

### Type2-debugCompile / debugImplementation

debug 模式的编译和最终的 debug apk 打包时有效

### Type3-releaseCompile / releaseImplementation

Release 模式的编译和最终的 Release apk 打包

### Type4-testCompile / testImplementation

单元测试代码的编译以及最终打包测试 apk 时有效

### Type5-androidTestCompile / androidTestImplementation

AndroidUnitTest

### Type6-apk/runtimeOnly

生成 apk 的时候参与打包，编译时不会参与，很少用

### Type7-provided / compileOnly

只在编译时有效，不会参与打包

## 统一管理依赖版本号

## dependency conflict

- ERROR:

```
implementation 'com.google.dagger:dagger:2.17'
annotationProcessor 'com.google.dagger:dagger-compiler:2.17'
```

```
All com.android.support libraries must use the exact same version specification (mixing versions can lead to runtime crashes
```

- Reason:传递性依赖->版本冲突

```
// Check dependencices result

help->dependencices
/
gradle :app:dependencies
gradle :app:dependencies > ~/Desktop/log.txt
```

![gradle_build_lib_dependency_conflict.png](https://yingvickycao.github.io/img/tools/gradle/gradle_build_lib_dependency_conflict.png)

- Solution

Solution1 : same version

Solution2 : exclude

```
清除依赖冲突

implementation ('com.google.dagger:dagger:2.17',{
    exclude group: 'com.google.guava', module: 'guava'
})

annotationProcessor ('com.google.dagger:dagger-compiler:2.17',{
    exclude group: 'com.google.guava', module: 'guava'
})

implementation 'com.google.guava:guava:23.0'
```

Solution3 : force

```
configurations.all {
 resolutionStrategy {
 // 强制整个project使用某版本依赖
 force 'io.reactivex.rxjava2:rxjava:2.1.13'
 }
}
```

- Notes:

1. 不同 lib 依赖某个 lib 同一个版本，不是版本依赖冲突，不需要 exclude
2. 同一个文件在不同 package 的 lib，是版本依赖冲突，不能共存。例如 Dagger1 和 Dagger2
3. 特別注意 shaowJar 引起的版本依賴沖突

# [13 Create Android Library](../Create_Android_Library.md)

# [14 Proguard](../Proguard.md)

# [15 Speed up build](../Speed_up_build.md)

# 16 plugins

https://docs.gradle.org/current/userguide/plugins.html

- Use plugin
  Two step:
  Step 1 : resolve the plugin

  ```
  Resolving a plugin means finding the correct version of the jar which contains a given plugin and adding it to the script classpath. Once a plugin is resolved, its API can be used in a build script.
  ```

  Step 2 : apply the plugin

  ```
  Applying a plugin means actually executing the plugin’s Plugin.apply(T) on the Project you want to enhance with the plugin.
  ```

- Plugin 类型
  (1) Binary plugin : `plugins` DSL / `apply plugin` .  
  (2) script plugin : `appply from <file.gradle`>。

- `plugins` DSL

```Groovy
plugins {
    // applay = false 不立刻应用
    id 'plugin id' [version 'plugin version'] [apply false]
}
```

(1) Must written in top of `.gradle" file
(2) plugin must be located at gradle plugin center https://plugins.gradle.org/

- `apply plugin`

```Groovy
apply plugin: 'plugin id'
```

(1)更灵活

---

- [Gradle 依赖项学习总结，dependencies、transitive、force、exclude 的使用与依赖冲突解决](http://www.paincker.com/gradle-dependencies)
- [使用 Gradle 统一配置依赖版本](http://www.cnblogs.com/whycxb/p/9377643.html)
- [使用 Gradle 统一配置依赖版本](https://blog.csdn.net/u014651216/article/details/54602354)
- [使用 android studio 发布 release 版本](https://blog.csdn.net/to_perfect/article/details/69048419)
- [All flavors must now belong to a named flavor dimension](https://www.jianshu.com/p/4516b53ccfc9)
- [解决 Error:All flavors must now belong to a named flavor dimension](https://blog.csdn.net/syif88/article/details/75009663/)
- Android 工程 gradle 详解 https://www.jianshu.com/p/3e66d36455f4
- Gradle 配置代理服务器 https://www.jianshu.com/p/3f3e81c5f597

# Refs

- [Configure your build](https://developer.android.google.cn/studio/build)
- [Build your app from the command line](https://developer.android.google.cn/studio/build/building-cmdline)
- [Build and run your app](https://developer.android.google.cn/studio/run/index.html)
- https://docs.gradle.org/current/userguide/plugins.html
