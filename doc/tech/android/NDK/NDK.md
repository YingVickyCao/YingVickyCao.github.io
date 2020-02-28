# NDK

# 1、什么是动态库(.so 文件)？

.so 文件是 unix 的动态连接库，是二进制文件，作用相当于 windows 下的.dll 文件。  
.so 使用了 C/C++代码编写的可以操作硬件比 java 更高级的底层代码，执行速度和效率比其他语言要高。

在 Android 中调用动态库文件(`*.so`)都是通过 `jni` 的方式。

Load so in Android：

```
void System.load(String pathName);
# pathName：文件名+文件路径；

void  System.loadLibrary("libraryName");
# `libnative-lib.so` -> System.loadLibrary("native-lib");
```

# 2 为什么需要动态库？

有时候原生的 Java 代码编写的程序不能满足需求时，如计算量很大，性能要求高。常见于游戏开发，考虑使用 C/C++开发程序，然后通过 JNI 的方式来调用。

# 3 加载动态库能做什么？

1）、能直接操作硬件，如摄像头，音视频编码和解码；  
2）、更安全，so 库是二进制的文件，不容易破解，人无法看懂，代码安全度更高。  
3）、执行效率高，运算速度快，C/C++编写的程序可以直接操作内存。
4）、Android 中提供的好多 java 接口调用的 API 底层都是通过 JNI 的方式来调用，如 bitmap 的压缩。

# 4 Android 项目 如何适配 So 库?

e.g. Mupdf  
https://mupdf.com/index.html  
Mupdf 下载的源码并不是能直接运行，需要自己编译 so 才能使用

```
# module build.gradle

android{
    ndk {
        abiFilters "armeabi"，"armeabi-v7a","arm64-v8a", "x86", "x86_64"
    }
}
```

```
# .so Default position = /src/main/jniLibs
jniLibs/arm64-v8a/*.so
jniLibs/armeabi-v7a/*.so
jniLibs/armeabi/*.so
jniLibs/x86/*.so
jniLibs/x86_64/*.so
```

```
#  设置Jni so文件路径
sourceSets {
  main{
      jniLibs.srcDirs = ['libs']
  }
}
```

## Android CPU Architecture

| Architecture | Version | Support                       | Memo                                                            |
| ------------ | ------- | ----------------------------- | --------------------------------------------------------------- |
| arm64-v8a    | 第 8 代 | armeabi,armeabi-v7a,arm64-v8a | 64 位，包含 AArch32、AArch64 两个执行状态对应 32、64bit         |
| armeabi-v7a  | 第 7 代 | armeabi,armeabi-v7a           | ARM v7，使用硬件浮点运算，具有高级扩展功能                      |
| armeabi      | 第 5 代 | armeabi                       | ARM v5TE，使用软件浮点运算，兼容所有 ARM 设备，通用性强，速度慢 |
| x86          |         | armeabi(性能有所损耗),x86     | intel 32 位                                                     |
| x86_64       |         | x86,x86_64                    | intel 32 位                                                     |
| mips         |         | mips                          | 基本没见过                                                      |
| mips64       |         | mips, mips_64 ｜基本没见过    |

当某个手机加载的库不是当前手机 cpu 对应的指令编译出来的.so 文件见时，程序就会异常
，所以为了保证程序的稳定性，必须保证动态库编译时使用的指令和当前手机 cpu 可支持的
cpu 执行对应，这样才不会造成程序异常的情况。

- 适配方案：  
   1 动态适配 （Recommend）  
   程序初次运行时，根据手机架构，下载对应 so。  
   好处：减少 apk 体积。  
   坏处：初次使用时，用户等待下载
  2 最低适配  
   好处：支持所有架构  
   坏处：运行速度较慢
  3 支持主流（Recommend）  
   好处：apk 体积适中  
   坏处：非主流 apk 运行时，可能报错。

# 5 Android 是如何加载 So 库的

- 对当前手机 cpu 架构,比如 armeabi-v7a,做了适配:当手机 apk 运行时直接在 armeabi-v7a 目录下找对应的 so 库，找不到直接报错

# Refs:

- https://blog.csdn.net/nongminkouhao/article/details/81048857
- https://blog.csdn.net/u010712703/article/details/71194881
- https://www.jianshu.com/p/5a6310df38eb
