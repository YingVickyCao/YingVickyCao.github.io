# Build Android Native Development

---

# Reference

- [Installing the Android Development Environment](https://spring.io/guides/gs/android/#android-dev-env)
- [androiddevtools](http://www.androiddevtools.cn)
- [Android China](https://developer.android.google.cn/index.html)

---

# Command Tips

## Unix-based Operating System (Linux, Solaris and Mac OS X) Tips

- 启动 Terminal 终端工具,在/Users/你的用户名 中创建`.bash_profile` File  
  `touch ~/.bash_profile`

- 打开并编辑 `.bash_profile` File  
  `vim ~/.bash_profile`  
  OR  
  `open ~/.bash_profile`

- 执行`source`命令,把 `.bash_profile` File 中配置的命令写入系统。  
  `source ~/.bash_profile`

- ~?

```
$ cat ~
cat: /Users/user_name: Is a directory
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

http://openjdk.java.net/install/index.html

- https://www.mkyong.com/java/how-to-set-java_home-environment-variable-on-mac-os-x/

- MAC JDK 版本切换

```
# JDK
#  Mac自带JDK6,JDK7，JDK8则要自己下载安装
# /usr/libexec/java_home -V
# java -version

# mac OSX < 10.5
# export JAVA_6_HOME=/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
# export JAVA_7_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0.jdk/Contents/Home
# export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home
# export JAVA_11_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.4.jdk/Contents/Home
# export JAVA_OPEN_JDK_11_HOME=/Library/Java/JavaVirtualMachines/openjdk-11/Contents/Home
# export JAVA_HOME=$JAVA_11_HOME

# mac OSX > 10.5
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
```

查看 mac jdk 安装路径

```
# mac OSX < 10.5
$ echo $JAVA_HOME
/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home

# mac OSX >= 10.5
$ /usr/libexec/java_home -V
Matching Java Virtual Machines (1):
    1.8.0_161, x86_64:	"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home
```

# 2.Gradle

https://gradle.org/releases/  
Downloading https://services.gradle.org/distributions/gradle-6.2.1-bin.zip  
Downloading https://services.gradle.org/distributions/gradle-6.2.1-all.zip

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

# 3. Android Studio

https://developer.android.google.cn/studio

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
