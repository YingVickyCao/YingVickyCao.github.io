# Android Studio FAQ

# 1 ERROR: Android Studio can not recognize libs from project local maven.(AS 3.5)

Step 1 : completely uninstall Android Studio on macOS  
Step 2 : re-install Android Studio.  
Step 3 : Delete build/.idea/.gradle of project.  
Step 4 : Open project by Android Studio.

# 2 ERROR: `/sdk/platforms/android-28/android.jar (No such file or directory)`

Download sources for 28.  
Then check android-28 folder vs other api level folder.

# 3 BuildConfig: Deprecate APPLICATION_ID in libraries

```
BuildConfig: Deprecate APPLICATION_ID in libraries.
It is at best misleading, so it is marked as deprecated and replaced by LIBRARY_PACKAGE_NAME.
```

As of Android Studio 3.5, BuildConfig.APPLICATION_ID is deprecated and replaced with BuildConfig.LIBRARY_PACKAGE_NAME.

# 4 [ERROR]:R8 errors:Program type already present: package_name.BuildConfig

Fix:

1. jar 包或第三方库冲突
2. 包名冲突，多个模块情况有相同包名，把重复的包名改掉

# 5 Android Studio cache about issues

Android Studio has cache about issues when building since 2.2.

- Cannot recognize renamed Dagger1

Solutions:

1. Build -> Clean Project
2. Restart Android Studio
3. File -> Invalidate Caches / Restart -> Choose "Invalidate and Restart"
4. Restart MAC
5. Try re-git clone , re-open project.
6. Uninstall Android Studio, re-Install it.

- Cannot recognize submodules after switch branch

Solution:  
Remove submodules,then update submodules.

```
git submodule init
git submodule update
```

# 6 [AS 3.2]Modified codes are be recognized

1. Build -> Clean Project
2. Restart Android Studio
3. File -> Invalidate Caches / Restart -> Choose "Invalidate and Restart"
4. Restart MAC
5. Try re-git clone , re-open project. ✓
6. Cancel Instant Run, Then restart Android Studio.
7. `Run...` -> `Edit configucations` -> select module -> Remove `Gradl-awake Make`
8. Remove project build folder, reopen project.
9. Remove  
   .gradle;`  
   remove Android Studio cache data , re-Install Android Studio;  
   Try re-git clone , re-open project.
10. Check code if wrong？✓

# 7 Layout Editor says " Preview is unavailable untol a successful project sync."

File -> Sync Project with Gradle files

# 8 SDK - `Target folder is neither empty nor does it point to an existing SDK installation...`

Add empty `platforms`folder in `sdk` folder, then retry.

# 9 ERROR:Search result:"no usages found in all palces"

`File -> Invalidate Caches / Restart -> Choose "Invalidate and Restart"`

# 10 [AS 3.4]xml can not tip when coding

1). Re-install android studio , re-install sdk.
2). Write wrong code

```
<LinearLayo>
    <ImageView/> // 不提示代码
</<LinearLayo>


```

# 11 [AS 3.2]`can not access android.support.v4.based FragmentActivityapi16`

support lib version(28.0.0) = compileSdk Version(28).

# 12 Q: Can not see source and show decompiled class, e.g., com.google.android.material.card.MaterialCardView

A:  
Method 1 : update material lib version

# 13 Q : Android Studio Gradle downloads `kotlin-compiler-embeddable-1.3.72.jar` failed or too slow

Step 1 : Find dir

```
// When downloading
// /Users/account/.gradle/caches/modules-2/files-2.1/org.jetbrains.kotlin/kotlin-compiler-embeddable/1.3.72/b7250aa71eb53dfcb3bb86c6467cbe747254e1a5/

b7250aa71eb53dfcb3bb86c6467cbe747254e1a5
kotlin-compiler-embeddable-1.3.72.pom
```

Step 2: Download jar in Maven.  
<https://mvnrepository.com/artifact/org.jetbrains.kotlin/kotlin-compiler-embeddable>

Step 3 : Put jar in Finder dir.

```
b7250aa71eb53dfcb3bb86c6467cbe747254e1a5
kotlin-compiler-embeddable-1.3.72.pom
+ kotlin-compiler-embeddable-1.3.72.jar
```

Close Android Studio, then re-open Andriid Studio,it will auto sync it.

```
// After Auto sync successfully
fb72232c8fa977d5e07d33c43381ddbdc5edab6
kotlin-compiler-embeddable-1.3.72.jar
b7250aa71eb53dfcb3bb86c6467cbe747254e1a5
kotlin-compiler-embeddable-1.3.72.pom
- kotlin-compiler-embeddable-1.3.72.jar
b0e679271730771848ec0c644028533b381e2e6
kotlin-compiler-embeddable-1.3.72-sources.jar
```

```
fb72232c8fa977d5e07d33c43381ddbdc5edab6
kotlin-compiler-embeddable-1.3.72.jar
b7250aa71eb53dfcb3bb86c6467cbe747254e1a5
kotlin-compiler-embeddable-1.3.72.pom
b0e679271730771848ec0c644028533b381e2e6
kotlin-compiler-embeddable-1.3.72-sources.jar
```

# 14 ERROR: Manifest merger failed : uses-sdk:minSdkVersion 21 cannot be smaller than version 22 declared in library

> Manifest merger failed : uses-sdk:minSdkVersion 21 cannot be smaller than version 22 declared in library [:calculator2] /Users/hades/Documents/GitHub/AndroidAboutDemos/soruce/AndroidGradleConfigCode/calculator2/build/intermediates/library_manifest/debug/AndroidManifest.xml as the library might be using APIs not available in 21
> Suggestion: use a compatible library with a minSdk of at most 21,
> or increase this project's minSdk version to at least 22,
> or use tools:overrideLibrary="com.example.hades.calculator2" to force usage (may lead to runtime failures)

```
app module
minSdkVersion 21

calculator2 lib
minSdkVersion 22

=>

calculator2 lib
minSdkVersion 21
```

# 15 ERROR:Android resource linking failed

> Android resource linking failed
> app/build/intermediates/incremental/mergeDebugResources/merged.dir/values-v28/values-v28.xml:7: error: resource android:attr/dialogCornerRadius not found.
> app/build/intermediates/incremental/mergeDebugResources/merged.dir/values-v28/values-v28.xml:11: error: resource android:attr/dialogCornerRadius not found.
> app/build/intermediates/incremental/mergeDebugResources/merged.dir/values/values.xml:2739: error: resource android:attr/fontVariationSettings not found.
> app/build/intermediates/incremental/mergeDebugResources/merged.dir/values/values.xml:2740: error: resource android:attr/ttcIndex not found.
> error: failed linking references.

```
set all module appcompat = 28.0.0
compileSdkVersion 28
targetSdkVersion 28

implementation 'com.android.support:appcompat-v7:28.0.0'
```

# 16 ERROR:Full Split are not supported in InstantRun mode, please disable InstantRun

`Full Split are not supported in InstantRun mode, please disable InstantRun`

```
  /*
    // Configure multiple APKs for screen densities
    splits {

        // Configures multiple APKs based on screen density.
        density {

            // Configures multiple APKs based on screen density.
            enable true

            // Specifies a list of screen densities Gradle should not create multiple APKs for.
            exclude "ldpi", "xxhdpi", "xxxhdpi"

            // Specifies a list of compatible screen size settings for the manifest.
            compatibleScreens 'small', 'normal', 'large', 'xlarge'
        }
    }

    // Configure multiple APKs for ABIs
    splits {

        // Configures multiple APKs based on ABI.
        abi {

            // Enables building multiple APKs per ABI.
            enable true

            // By default all ABIs are included, so use reset() and include to specify that we only
            // want APKs for x86 and x86_64.

            // Resets the list of ABIs that Gradle should create APKs for to none.
            reset()

            // Specifies a list of ABIs that Gradle should create APKs for.
            include "x86", "x86_64"

            // Specifies that we do not want to also generate a universal APK that includes all ABIs.
            universalApk false
        }
    }
*/
```

# 17 Android Studio 查看 library 的 source 时，发现显示的不是源文件，而是 decomplied .class

Fix :  
Step 1 : 点击 download sources。  
Step 2 : 下载后，Gradle build 一下就可以看到了。

# 18 Q : [Android Studio 4.2.2] installed failed:"missing essential plugin: org.jetbrains.android,please reinstall android studio from scratch"

Reason :  
在 Android Studio 4.2.2 plugin 移除了必须的插件, 如 Kotlin

Fix：  
https://blog.csdn.net/weixin_40611659/article/details/119323100

# 19 Q : AS install apk failed. `INSTALL_PARSE_FAILED_UNEXPECTED_EXCEPTION`

```
01/27 16:51:07: Launching 'app' on Google Pixel 3.
Installation did not succeed.
The application could not be installed: INSTALL_PARSE_FAILED_UNEXPECTED_EXCEPTION

List of apks:
[0] '/Users/account/Documents/project/myApp/app/build/outputs/apk/debug/app-debug.apk'
Installation failed due to: 'Failed to commit install session 934523588 with command cmd package install-commit 934523588. Error: INSTALL_PARSE_FAILED_UNEXPECTED_EXCEPTION: Failed parse during installPackageLI: Failed to read manifest from /data/app/vmdl934523588.tmp/base.apk: android.content.pm.parsing.component.ParsedActivity cannot be cast to java.lang.String'
Retry
```

Reason :

`Failed to read manifest` 表示 manifest 有些配置用错了。  
怎么找出来错误？先全部注掉 Main activity 的所有内容，然后逐渐放开 manifest 注释。

```xml
<!-- 错误：android:process="sf_process
正确：android:process=":sf_process" -->
<activity
    android:name=".data_storage.shared_preferences.TestSFProcess1Activity"
    android:multiprocess="true"
    android:process="sf_process" />
```

# 20 三星 S21 usb 连接电脑没反应

现象：  
通过数据线连接到 Mac，后，adb devices 下没有出现 S21，也没有出现“允许 USB 调试对话框”，只显示充电。

Fix ：  
Step 1 ： S21 插着电脑，然后重启 S21.  
Step 2 ： 关闭 USB 调试，再重新开启。adb devices 后，就能出现“允许 USB 调试对话框”。

# 21 Android Studio 2021 缺少 Java 11

```
An exception occurred applying plugin request [id: 'com.android.application']
> Failed to apply plugin 'com.android.internal.application'.
   > Android Gradle plugin requires Java 11 to run. You are currently using Java 1.8.
     You can try some of the following options:
       - changing the IDE settings.
       - changing the JAVA_HOME environment variable.
       - changing `org.gradle.java.home` in `gradle.properties`.
```

Fix:

- changing the IDE settings (Work)
  ![as_needs_jdk11](https://yingvickycao.github.io/img/tools/as_needs_jdk11.png)
- changing the JAVA_HOME environment variable.(Not work)
- changing `org.gradle.java.home` in `gradle.properties`. (Work)

```groovy
org.gradle.java.home=/Library/Java/JavaVirtualMachines/jdk-11.0.1.jdk/Contents/Home
```

# 22 Android Studio 2021 运行 Unit Test 出现 “test events were not received”

Why :  
Android Studio 的 IDEA 从 2019.2.1 默认使用 Gradle 管理 UnitTest。  
https://blog.csdn.net/21aspnet/article/details/108867567  
IDEA 可以更改为使用 IDEA 它自己来管理。  
但是 Android Studio 2.21 里面没有这个选项没有了，无法修改。  
如何解决？

Fix :  
参考 IDEA 中的 Junt，来 Create Android 项目的 JUnit。

![JUnit_in_IDEA](https://yingvickycao.github.io/img/tools/android_studio/JUnit_in_IDEA.webp)

![JUnit_in_AndroidStudio](https://yingvickycao.github.io/img/tools/android_studio/JUnit_in_AndroidStudio.webp)

# 23 build error:`Could not resolve com.android.tools.build:gradle:7.4.1`

[Android Studio Electric Eel | 2022.1.1]

```
Could not resolve all files for configuration ‘:classpath’.
Could not resolve com.android.tools.build:gradle:7.4.0-rc03.
Required by:
project : > com.android.application:com.android.application.gradle.plugin:7.4.0-rc03
project : > com.android.library:com.android.library.gradle.plugin:7.4.0-rc03
No matching variant of com.android.tools.build:gradle:7.4.0-rc03 was found. The consumer was configured to find a runtime of a library compatible with Java 8, packaged as a jar, and its dependencies declared externally, as well as attribute ‘org.gradle.plugin.api-version’ with value ‘7.5’ but:
- Variant ‘apiElements’ capability com.android.tools.build:gradle:7.4.0-rc03 declares a library, packaged as a jar, and its dependencies declared externally:
- Incompatible because this component declares an API of a component compatible with Java 11 and the consumer needed a runtime of a component compatible with Java 8
- Other compatible attribute:
- Doesn’t say anything about org.gradle.plugin.api-version (required ‘7.5’)
- Variant ‘javadocElements’ capability com.android.tools.build:gradle:7.4.0-rc03 declares a runtime of a component, and its dependencies declared externally:
- Incompatible because this component declares documentation and the consumer needed a library
- Other compatible attributes:
- Doesn’t say anything about its target Java version (required compatibility with Java 8)
- Doesn’t say anything about its elements (required them packaged as a jar)
- Doesn’t say anything about org.gradle.plugin.api-version (required ‘7.5’)
- Variant ‘runtimeElements’ capability com.android.tools.build:gradle:7.4.0-rc03 declares a runtime of a library, packaged as a jar, and its dependencies declared externally:
- Incompatible because this component declares a component compatible with Java 11 and the consumer needed a component compatible with Java 8
- Other compatible attribute:
- Doesn’t say anything about org.gradle.plugin.api-version (required ‘7.5’)
- Variant ‘sourcesElements’ capability com.android.tools.build:gradle:7.4.0-rc03 declares a runtime of a component, and its dependencies declared externally:
- Incompatible because this component declares documentation and the consumer needed a library
- Other compatible attributes:
- Doesn’t say anything about its target Java version (required compatibility with Java 8)
- Doesn’t say anything about its elements (required them packaged as a jar)
- Doesn’t say anything about org.gradle.plugin.api-version (required ‘7.5’)
```

Fix:
https://stackoverflow.com/questions/75114728/no-matching-variant-of-com-android-tools-buildgradle7-4-0-was-found
Ended up changing Gradle JDK to 11
File -> Settings -> Build, Execution, Deployment -> Build Tools -> Gradle

# 24 AS cannot debug apk to device, error : `Warning: debug info can be unavailable. Please close other application using`

Android Studio 2022.1.1

Fix :
Way 1 : 重启 Android studio  
Way 2 : 手机 > 设置 > 开发者选项 > USB 调试重新打开  
Way 3 : 启动和关闭 adb 服务

```
adb kill-server
adb start-server
```

Way 4 : 检查手机的是否连接了两台 PC （Recommended）


# 25 下载kotlin-compiler-embeddable 非常慢？
https://plugins.gradle.org/m2/org/jetbrains/kotlin/kotlin-compiler-embeddable/1.9.20/kotlin-compiler-embeddable-1.9.20.jar




Step 1 : 下载这个三个文件  
https://mvnrepository.com/artifact/org.jetbrains.kotlin/kotlin-compiler-embeddable/1.9.20  -> View all ,go to    
https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-compiler-embeddable/1.9.20/  


kotlin-compiler-embeddable-1.9.20.pom    
kotlin-compiler-embeddable-1.9.20.jar   
kotlin-compiler-embeddable-1.9.20-sources.jar   

Step 2 ： 计算这个文件的 SHA1   
e.g.   
```
% shasum kotlin-compiler-embeddable-1.9.20.pom 
23708dbf881db9113d723ede3309461e63b95cb0  kotlin-compiler-embeddable-1.9.20.pom
```

Step 3 ：根据SHA1的value新建文件夹，并把对应的文件放进去。
e.g. 
```
~/.gradle/caches/modules-2/files-2.1/org.jetbrains.kotlin/kotlin-compiler-embeddable/1.9.20/23708dbf881db9113d723ede3309461e63b95cb0/kotlin-compiler-embeddable-1.9.20.pom
```

Step 4 : Re-build project

Ref：  
https://blog.csdn.net/cjz010/article/details/129613760  
https://blog.csdn.net/u012233285/article/details/62041476  
https://juejin.cn/post/7142679159683153950  


