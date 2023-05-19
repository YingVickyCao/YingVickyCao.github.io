# Android

# 1 知识点

## Android 基础 知识点：=> 上层

- Activity 的生命周期(正常情况/异常情况)、启动模式、Intent Filter 的匹配规则
- Android 四大组件的工作过程，包括四大组件的运行状态以及它们主要的工作过程，比如；启动、绑定、广播和发送和接受
- Android 的消息机制分析： Handler、Looper、MessageQueue、ThreadLocal，主县城的消息循环循环。
- Android 中常见的 IPC 机制，多进程的运行方式、常见的进程间通信方式，包括 Messager、AIDL、Binder、ContentProvider 等，Binder 连接池的概念
- View 的事件
- View 的工作原理：Viw 的测量、布局、绘制三大流程，自定义的分类以及实现思想、ViewRoot、DecorView、MeasureSpec 等 View 相关的底层概念
- Window、WindowManager
- Remote View ： 使用在通知栏和桌面 Widge 中，Pending Inent，RemoteViews 的内嵌机制以及存在意义
- Drawable
- Bitmap 的加载和缓存机制：高效加载图片的方式，LruCache、DiskLruCache，ImageLoader 例子中使用了它们
- 动画
- Androifd 的线程、线程池，包括 AsyncTask、HandlerThead 、IntentService、ThreadPoolExecutor，以及它们的工作原理。

## 综合技术：

CrashHandler、multidex、插件化、反编译
JNI 和 Android NDK 编程

## 性能优化

布局优化、绘制优化、内存泄漏优化、ANR、如何提高程序的可维护性。

## 系统底层知识：=>Android 系统的运行机制

- Android 源码分析、
- 系统移植、
- 驱动开发、
- 逆向工程
