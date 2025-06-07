# Memory Optimization (内存优化)

Memory Leaks , Out of Memory Error

# 1 Avoid user fast click at short time

`ForbidFastClickExampleFragment.java`  
目的：防止用户因快速点击而执行无效耗时操作。    
 Way 1 : 使用工具类判断点击的时间差，若不符合，则视为无效点击。  
 Way 2 : 使用 View.OnClickListener 的继承类判断点击的时间差，若不符合，则视为无效点击。  
 Way 3 : 判断 loading 是否显示，若是，则 return。  
 Way 4 : 显示 loading， disable button。执行完操作，隐藏 loading， enable button。

<br/>

# 2 Bitmap

Bitmap offten causes OutOfMemory。   
 Sees full information in [Bitmap Memo](/tech/android/resource/Bitmap/)

## 2.1 When download from remote server, choose the quality to download as need （High、Medium、Low）.

## 2.2 How to choose the bitmap？  

tint color > bitmap.  
For simpel image, XML > Vector / NinePatch  
For complicated image, WebP > PNG > jpg > Dynamic gif  

## 2.3 png

Multiple sets png -
1x/2x/3x

One set png - 
```
When 若只有一套图
drawable-xxhdpi
drawable-nohdpiz
```

## 2.4 inSampleSize
```java
BitmapFactory.Options.inJustDecodeBounds=true
BitmapFactory.Options.inSampleSize = size
BitmapFactory.Options.inJustDecodeBounds=false
```

## 2.5 Decode Bitmap as scale of width and heigh.

## 2.6 Recycle Bitmap

```java
Bitmap.isRecycled()
Bitmap.recycle()
```

## 2.7 Choose the Bitmap config

```java
BitmapFactory.Options.inPreferredConfig = Bitmap.Config.RGB_565;
```

## 2.8 Reuse Bitmap

```java
options.inMutable = true;
options.inBitmap = inBitmap;
```

## 2.9 Four class level cache
Resuse cache - Memory - Disk - Network

## 2.10 Use Picaso to compress Bitmap.

## 2.11 Use tools to compress picture before using. TinyPNG/libjpeg   

## 2.12 Use `android:tint` for different simple color but same picture.

# 3 Monitor available memory and memory usage

## 3.1 Release memory in response to events - onTrimMemory
https://developer.android.com/topic/performance/memory#release

## 3.2 Check how much memory you need
To avoid running out of memory, you can query the system to determine how much heap space is available on the current device. 
```
ActivityManager.MemoryInfo - lowMemory
```
https://developer.android.com/topic/performance/memory#CheckHowMuchMemory


# 4 Use more memory-efficient code constructs

## 4.1 Use services sparingly
https://developer.android.com/topic/performance/memory#Services

If your app needs a service to work in the background, don't leave it running unless it needs to run a job. Stop your service when it completes its task. Otherwise, you might cause a memory leak.


## 4.2 Use optimized data containers
https://developer.android.com/topic/performance/memory#DataContainers 

Bad - HashMap    
Good - SparseArray, SparseBooleanArray, LongSparseArray  

| size  | Choose         |
| ----- | --------------------------- |
| <1000 | Use ashMap/SparseArray<String> |
| >1000 | Uase SparseArray<String>         |


## 4.3 Be careful with code abstractions
https://developer.android.com/topic/performance/memory#Abstractions  

abstractions are significantly more costly because they generally require more code that needs to be executed, requiring more time and RAM to map the code into memory. If your abstractions aren't significantly beneficial, avoid them.

## 4.4 Use lite protobufs for serialized data
https://developer.android.com/topic/performance/memory#LiteProto

Protobuffer > Json -> XML

## 4.5 Avoid memory churn
https://developer.android.com/topic/performance/memory#churn

Often, memory churn can cause a large number of garbage collection events to occur. In practice, memory churn describes the number of allocated temporary objects that occur in a given amount of time.

# 5 Remove memory-intensive resources and libraries
https://developer.android.com/topic/performance/memory#remove

## 5.1 Reduce overall APK size
https://developer.android.com/topic/performance/memory#reduce

## 5.2 Use Hilt or Dagger 2 for dependency injection
https://developer.android.com/topic/performance/memory#DependencyInjection

## 5.3 Be careful about using external libraries
https://developer.android.com/topic/performance/memory#ExternalLibs

When you use an external library, you might need to optimize that library for mobile devices.  
Avoid using a shared library for just one or two features out of dozens. 

## 5.4 跨平台: html / React Native / Flutter

# Tools

## adb push stressapptest
https://developer.android.com/topic/performance/memory-overview

## Detecting Memory Leaks - Android Studio - Profile  
https://developer.android.com/studio/profile

## Detecting Memory Leaks - LeakCanary   
https://square.github.io/leakcanary/

## Mock low memory  
Android -> Setting -> Developer options -> Don't keep activies


# Ref :
https://square.github.io/leakcanary/blog-articles/