# Setup Android

# Command Tips

## Unix-based Operating System (Linux, Solaris and Mac OS X) Tips

```
// Create file
touch ~/.bash_profile
source ~/.bash_profile
```
### zsh

```
// Create file
touch ~/.zshrc
source ~/.zshrc
```

## Mac Mojave Version 10.14.4 (18E226)

- terminal 中使用`export`设置，仅仅在当前 terminal session 有效。查看`echo $PATH`
- terminal 中使用`source`设置，在所有 terminal session 有效。

说明：

- ~表示用户目录，即/Users/你的用户名/
- 如果不执行`source`命令， `.bash_profile` File 中配置的命令无效。
- 如果在 `Terminal` 中直接使用 export 设置命令，则效果时临时的。  
  把关闭并打开新`Terminal`窗口，会发现在 `Terminal` 中直接使用 export 设置命令已经不再有效。  
  所以，正确的设置方法是：  
  使用`.bash_profile` File 配置命令，并执行`source`命令使之永久生效。

# 1. JDK

```
# JDK
Mac 不需要设置JDK的环境变量。安装时自动设置。

// 测试JDK的环境变量：
java
javac
java -version
```

## MAC JDK 版本切换

- Download  
  https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html  
  https://www.oracle.com/technetwork/java/javase/downloads/jdk11-downloads-5066655.html // Current use  
  https://repo.huaweicloud.com/java/jdk/ (Recommend)  
  http://openjdk.java.net/install/index.html
- MAC JDK 版本切换  
  https://www.mkyong.com/java/how-to-set-java_home-environment-variable-on-mac-os-x/

- 查看 Mac 安装了哪些 JDK 版本,以及其安装路径？

```
# /usr/libexec/java_home -V
```

- **配置 JDK**

```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home
export PATH=$PATH:$JAVA_HOME/bin
```

- 查看是否已经配置 JDK ？

```
$ echo $JAVA_HOME
/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home

$ java -version
```

- 如何在 Mac 上卸载 Java？
  https://www.java.com/zh_CN/download/help/mac_uninstall_java.xml

```
sudo rm -fr /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin
sudo rm -fr /Library/PreferencePanes/JavaControlPanel.prefPane
sudo rm -fr ~/Library/Application\ Support/Oracle/Java
```

- Uninstall JDK and JRE
  https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-macos.htm#JSJIG-GUID-2FE451B0-9572-4E38-A1A5-568B77B146DE

# 2.Gradle

https://gradle.org/releases/  
Downloading https://services.gradle.org/distributions/gradle-6.2.1-bin.zip  
Downloading https://services.gradle.org/distributions/gradle-6.2.1-all.zip  
https://repo.huaweicloud.com/gradle/

```
# Gradle
# 配置Gradle 环境变量
export GRADLE_HOME=~/Library/gradle
export PATH=$PATH:$GRADLE_HOME/bin

# 配置gradle的本地仓库地址
# GRADLE_USER_HOME = ~/.gradle

// 测试Gradle的环境变量：
gradle -v
```

- GRADLE_HOME VS GRADLE_USER_HOME vs Gradle user home

GRADLE_HOME ：要配置
GRADLE_HOME 是 Gradle installation
gradle 开头的命令，用的是 GRADLE_HOME 中的 gradle

GRADLE_USER_HOME: 不用配置
默认位置: /Users/hades/.gradle  
 当使用 gradlew 命令时，若配置环境变量 GRADLE_USER_HOME，决定了执行 project/gradle/gradle-rapper.jar 时下载 project/gradle/gradle-wrapper. properties 中指定版本 gradle 的存放位置。

Gradle user home : 不用设置。default is /Users/account/.gradle
Use Gradle from：不用配置  
 recommended default option:  
 `'gradle-wrapper.properties' file`  
 Specified location: Gradle installation

# 3. Android Studio

https://developer.android.google.cn/studio

https://developer.android.google.cn/studio/archive

## SDK

- Downlaod  
  Option1:  
   `Command line tools only` -> `Mac sdk-tools-darwin-4333796.zip`

Option2: android studio download(url is same with Option1)

- Set SDK environment

```
# SDK
export ANDROID_HOME=~/Library/Android/sdk
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

// 测试SDK是否正确设置
echo $ANDROID_HOME
android
android -h
adb
```

- Android SDK Manager 代理配置

`mirrors.zzu.edu.cn` 端口：`80`  
[androiddevtools](http://www.androiddevtools.cn)

说明：  
现在 Android 在中国有 Android SDK 在线更新镜像服务器，所以不需要设置。  
如果中国 Android SDK 在线更新镜像服务器不能使用时，需要进行 Android SDK Manager 代理配置。

# 4 NDK 4 C/C++ (Optional)

![Download the NDK and Tools](https://developer.android.google.cn/studio/images/projects/ndk-install_2-2_2x.png)

```
# NDK
export NDK_HOME=~/Library/Android/sdk/ndk-bundle
export PATH=$PATH:$NDK_HOME/

// 检查是否配置成功
$ echo $NDK_HOME
$ cd $NDK_HOME
$ ndk-build
Android NDK: Could not find application project directory !
Android NDK: Please define the NDK_PROJECT_PATH variable to point to it.
```

# 5. CMake 4 C/C++ (Optional)

```
# NDK
export NDK_HOME=~/Library/Android/sdk/ndk-bundle
export PATH=$PATH:$NDK_HOME/

// 测试
$cmake -version
cmake version 3.6.0-rc2
```

# Reference

- [Installing the Android Development Environment](https://spring.io/guides/gs/android/#android-dev-env)
- [androiddevtools](http://www.androiddevtools.cn)
- [Android China](https://developer.android.google.cn/index.html)
