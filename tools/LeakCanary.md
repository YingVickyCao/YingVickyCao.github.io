# LeakCanary
## 功能
检测app的内存泄漏

## 原理
- 设置`application.registerActivityLifecycleCallbacks(ActivityLifecycleCallbacks)`监控Activity生命周期回调。
- 在本机上做Heap Dump，然后分析生成的hprof文件

## 评价
简单、可视、傻瓜、人人可参与

## 工作机制
- RefWatcher.watch() 为被监视对象创建KeyedWeakReference
- 后台线程检查引用是否被消除。如果没有，触发GC。
- GC后仍未清除引用，则它会将堆dump，并保存到 .hprof
- 单独进程中的HeapAnalyzerService启动HeapAnalyzer， 使用HAHA解析GC Roots的最短引用路径，并确定是否泄漏，如果是的话，建立引用链（leak trace）。
- 引用链传递到App进程中的DisplayService，并以通知的形式展示出来。

## 说明
###  读写权限

### 监控
- 使用`RefWatcher.watch(Oject)`检测
- 在对象应该被释放的地方进行监控
```
Activity onDestroy()
Fragment onDestroyView() / onDestroy()
```
- 监控对象
1. Activity
2. Fragment
3. Service
4. BroadcastReceiver
5. Dagger
6. 其他有生命周期的对象
7. 持有大内存占用的对象。（Retained heap值比较大的对象）

- 例外规则忽略一些不Leak   
1. excludedRefs()    
2. cases :	第三方 SDK  

### `this$0`
1. 内部类自动保留了一个指向外部类的引用。
2. `MockLeakMemoryActivity$LeakThread.this$0`
3. 内部类LeakThread保留了指向外部类MockLeakMemoryActivity的引用

### Upload memory leak to service.
Convert leakTrace to Exception

### Heap Dump会消耗很多CP'U资源，引起卡顿。
 
### testImplementation and releaseImplementation  vs debugImplementation
依赖属于NOOP（NO Operation Performed),对性能没有影响：无操作执行，编译器技术会检测无操作指令并优化，将无操作指令剔除。

### 一次只能报一个泄漏问题，如果内存泄漏不是当前模块，不能说明该模块没有问题。

### Deeply Analyse `.prof`
- MAT
- YourKit

# Refs
- https://www.jianshu.com/p/1e7e9b576391
- https://www.jianshu.com/p/5ee6b471970e