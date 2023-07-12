# 内存优化

# 1 使用 SparseArray 代替 HashMap<Integer, T>

| size  | Choose         |
| ----- | --------------------------- |
| <1000 | Use ashMap/SparseArray<String> |
| >1000 | Uase SparseArray<String>         |

# 2 禁止用户快速点击

`ForbidFastClickExampleFragment.java`
目的：防止用户因快速点击而执行无效耗时操作。  
 Way 1 : 使用工具类判断点击的时间差，若不符合，则视为无效点击。  
 Way 2 : 使用 View.OnClickListener 的继承类判断点击的时间差，若不符合，则视为无效点击。  
 Way 3 : 判断 loading 是否显示，若是，则 return。  
 Way 4 : 显示 loading， disable button。执行完操作，隐藏 loading， enable button。

<br/>

# 3 Bitmap

Bitmap 容易 OutOfMemory。   
 Sees full information in [Bitmap Memo](/tech/android/resource/Bitmap/)

## 3.1 从远程服务器获取时，按需 （High、Media、Low）下载  

## 3.2 选择？  
简单图： 自己画的 XML > Vector / NinePatch  
复杂：WebP > PNG > jpg > 动态图 gif  

## 3.3 png 时 3 套图（1x/2x/3x）存放。

```
若只有一套图
drawable-xxhdpi
drawable-nohdpi
```

## 3.4 按缩放比例解码 Bitmap
```java
BitmapFactory.Options.inJustDecodeBounds=true
BitmapFactory.Options.inSampleSize = size
BitmapFactory.Options.inJustDecodeBounds=false
```

## 3.5 解码 bitmap 时，根据密度计算出的宽和高来解码


## 3.6 回收 Bitmap

```java
// 如何判断Bitmap是否已回收？Bitmap.isRecycled()
// 强制Bitmap回收自己：Bitmap.recycle()
```

## 3.7 Bitmap 选择合适的像素格式

```java
BitmapFactory.Options.inPreferredConfig = Bitmap.Config.RGB_565;
```

## 3.8 复用 Bitmap

```java
options.inMutable = true;
options.inBitmap = inBitmap;
```

## 3.9 四级缓存策略：复用池-内存-磁盘-网络

## 3.10 使用时用 Picaso 等压缩 Bitmap。  

## 3.11 使用工具对图片进行压缩。推荐 TinyPNG/libjpeg   

## 2.12 使用 `android:tint`，代替 添加多个颜色的相同图案的图片。


# 4 减少内存泄露


# 工具
## 内存泄漏工具 - Android Studio 中  Profile  

## 内存泄漏工具 - LeakCanary   
https://square.github.io/leakcanary/

## 模拟低内存  
Setting -> Developer options -> Don't keep activies


#  Ref :
https://square.github.io/leakcanary/blog-articles/