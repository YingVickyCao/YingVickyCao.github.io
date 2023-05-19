# Bitmap

[Bitmap Codes in Gitee](https://gitee.com/YingVickyCao/android-about-demos/tree/master/app/src/main/java/com/hades/example/android/resource/drawable/_bitmap)

# [Bitmap 基本知识](./Bitmap_Basic_Knowledge.md)

# 1 Bitmap

- Bitmap 代表一个位图
- BitmapDrawable 封装的图片就是一个 Bitmap 对象
- Create bitmap 对象

```java
// TestBitmapFragment.java

// 把一个Bitmap包装成一个BitmapDrawable对象
BitmapDrawable bitmapDrawableTarget = new BitmapDrawable(getResources(), bitmap);
img1_1.setImageDrawable(bitmapDrawableTarget);
```

- 获取 BitmapDrawable 包装的 Bitmap 对象

```java
// TestBitmapFragment.java

// 获取BitmapDrawable包装的Bitmap对象
BitmapDrawable bitmapDrawable = (BitmapDrawable) img0.getDrawable();
Bitmap bitmap = bitmapDrawable.getBitmap();
```

- 2 使用静态方法创建 Bitmap 对象

```java
// TestBitmapFragment.java

Bitmap bitmap = BitmapDrawable.getBitmap();
Bitmap.createBitmap(各种参数)
Bitmap.createScaledBitmap()
Bitmap.createHardwareBitmap()
Bitmap.createAshmemBitmap()
```

- 3 从不同的数据源来解析、创建 Bitmap 对象
  `BitmapFactory` 工具类从不同数据源来解析、创建 Bitmap 对象

```java
// TestBitmapFragment.java
BitmapFactory.decodeByteArray - 网络下载的图片
BitmapFactory.decodeFile - 本地图片
BitmapFactory.decodeFileDescriptor - 文件描述符
BitmapFactory.decodeResource - resource资源
BitmapFactory.decodeStream - 数据流
```

# 2 Bitmap.Config

`android.xls` - Page `Bitmap.Config`

> Possible bitmap configurations. A bitmap configuration describes how pixels are stored. This affects the quality (color depth) as well as the ability to display transparent/translucent colors.

- 描述一个像素占据多少内存
- 同一个分辨率的图片，Bitmap.Config 不同，占用内存差距很大  
  ARGB 指的是一种色彩模式，里面 A 代表 Alpha，R 表示 red，G 表示 green，B 表示 blue
  位图位数越高代表其存储的颜色信息越多，图像越逼真。

## 优化

```java
// ImageUtil.java
// 选择合适的像素格式
BitmapFactory.Options.inPreferredConfig = Bitmap.Config.RGB_565;
```

## 分类

默认配置 :​ 默认使用 ARGB_8888 进行解码.

- ALPHA_8
  Alpha 由 8 位组成，代表 8 位 Alpha 位图。  
  8 bites = 1 byte。  
  Each pixel is stored as a single translucency (alpha) channel.
  No color information is stored。
  store masks for instance。

- ARGB_4444  
  由 4 个 4 位组成即 16 位，代表 16 位 ARGB 位图。  
   4+4+4+4 = 16bits = 2bytes
  Depressed In API 13 because of poor quality

- ARGB_8888
  由 4 个 8 位组成即 32 位，代表 32 位 ARGB 位图。  
  8+8+8+8 = 32 bits = 4 bytes。  
  加入 4048x3036 pixels (12 MB)在不缩放时，占据 48MB of memory (4048*3036*4 bytes)。

- HARDWARE
  bitmap is stored only in graphic memory。  
  Bitmaps in this configuration are always immutable。  
  Added in Android8.0。

- RGBA_F16
  16+16+16_16 = 64 bits = 8 bytes.
  Added in Android8.0 .  
  wide-gamut and HDR content .

- RGB_565  
  R 为 5 位，G 为 6 位，B 为 5 位共 16 位，代表 16 位 RGB 位图。  
   5+6+5=16 bits = 2 bytes.  
   using opaque bitmaps that do not require high color fidelity

# 3 BitmapFactory.Options 重要参数

BitmapFactory.Options 的作用：  
（1）防止内存溢出
（2）节省内存开销

- `BitmapFactory.Options.inJustDecodeBounds=true`
  true - 解码的时候将不会返回 bitmap，只返回 Bitmap 的尺寸。目的是只想知道一个 Bitmap 的尺寸，但又不想加载到内存中，可避免内存溢出。
  <br/>

- `BitmapFactory.Options.inSampleSize` 图片缩放比例.  
  按照比例(1/inSampleSize)缩小 Bitmap 的宽、高、分辨率。  
  inSampleSize 小于等于 1 时，图像高、宽不变。  
  inSampleSize 大于 1 时，图像高、宽分别以 inSampleSize 缩小。

  Example :width=100，height=100，inSampleSize=2=>  
  那么 bitmap 被处理为 width=50，height=50，宽高降为 1 / 2，像素数降为 1 / 4。
  <br/>

- `BitmapFactory.Options.inPreferredConfig` 色彩模式  
   默认值是 ARGB_8888.  
   不透明，可设为 RGB_565。
  <br/>

- `BitmapFactory.Options.inPremultiplied`  
   和透明度通道有关，默认值是 true.  
   true - 返回的 bitmap 的颜色通道上会预先附加上透明度通道。
  <br/>

- `BitmapFactory.Options.inDensity`  
   bitmap 的像素密度（对应的是 DisplayMetrics 中的 densityDpi，不是 density）
  <br/>

- `BitmapFactory.Options.inTargetDensity`  
   表示要被画出来时的目标像素密度（对应的是 DisplayMetrics 中的 densityDpi，不是 density）。
  <br/>

- `BitmapFactory.Options.inScreenDensity`  
   表示实际设备的像素密度（对应的是 DisplayMetrics 中的 densityDpi，不是 density）。
  <br/>

- `BitmapFactory.Options.inScaled`  
  设置这个 Bitmap 是否可以被缩放。  
  默认值是 true，表示可以被缩放。

- `BitmapFactory.Options.inPurgeable` （Android>=5.0 Depressed）
  空间不够是否可以被释放
  <br/>

- `BitmapFactory.Options.inScaled` （Android>=5.0 Depressed）
  是否可以共享引用
  <br/>

- `BitmapFactory.Options.inPreferQualityOverSpeed`  
  否在解码时图片有更高的品质，仅用于 JPEG 格式。  
  true - 图片会有更高的品质，但是会解码速度会很慢。  
  <br/>

- `BitmapFactory.Options.outWidth` 和 `BitmapFactory.Options.outHeight`  
  表示此 Bitmap 的实际宽和高。  
  一般和 `BitmapFactory.Options.inJustDecodeBounds=true` 一起使用来获得 Bitmap 的宽高，但是不加载到内存。
  <br/>

- `BitmapFactory.Options.inMutable`
  true - 将返回一个 mutable 的 bitmap,可用于修改 BitmapFactory 加载而来的 bitmap

<h2 id="bitmap_reuse">复用 Bitmap</h2>

```java
// ImageUtil.java
// 复用Bitmap
options.inMutable = true;
options.inBitmap = inBitmap;
```

- 无法复用时，抛出 IllegalArgumentException。
- 被复用的图片必须是可变的 , 解码后的 Bitmap 对象也是可变的, 即使当解码一个资源图片时, 得到一个不可变的 Bitmap 对象。
- Android>=4.4（API19）如何成功复用 Bitmap ？
  (1)JPEG 或 PNG 格式
  (2)并且 图像大小必须是相等的.
  (3)inssampleSize 设置为 1。

  被复用的图像的像素格式 Config ( 如 RGB_565 ) 会覆盖设置的 inPreferredConfig 参数。

## 3 按缩放比例解码 Bitmap，避免 OutOfMemory

图片不断解析、创建 Bitmap 对象，可能前面创建 Bitmap 所占用的资源还没有回收，而导致错误 OutOfMemory.

如何避免大图出现 OOM？按缩放比例解码 Bitmap.

```java
BitmapFactory.Options.inJustDecodeBounds=true
BitmapFactory.Options.inSampleSize = size
BitmapFactory.Options.inJustDecodeBounds=false
```

![bitmap_scale](https://yingvickycao.github.io/img/android/resources/bitmap_scale.jpg)

```java
// TestDecodeSampledBitmapFragment.java
// ImageUtil.java
/**
     * 如何避免大图出现OOM？
     * BitmapFactory.Options.inJustDecodeBounds=true/false
     * BitmapFactory.Options.inSampleSize = size   // 计算出图片缩放比例.
     */
    public Bitmap decodeResource(Resources res, int resId, int reqWidth, int reqHeight, IInBitmapListener listener) {
        final BitmapFactory.Options options = new BitmapFactory.Options();
        // inJustDecodeBounds = true: 表示不返回实际的Bitmap，用来查询图片大小信息。即不分配内存来避免内存溢出
        // 将 inJustDecodeBounds 设为 true 进行解码，传递选项，然后使用新的 inSampleSize 值并将 inJustDecodeBounds 设为 false 再次进行解码
        options.inJustDecodeBounds = true;
        BitmapFactory.decodeResource(res, resId, options);
        // PO:[Bitmap] BitmapFactory.Options.inSampleSize
        /**
         * options.inSampleSize 缩放比例。
         * (1) inSampleSize可能<0，要做判断。
         * (2) 可以计算缩放比例。也可以不计算，直接给它设定一个值。
         * (3) inSampleSize=2,表示 高度和宽度都是原始的一半
         */
        options.inSampleSize = calculateInSampleSize(options, reqWidth, reqHeight);
        Log.d(TAG, "scaleSize: viewWidth:" + reqWidth + ",viewHeight:" + reqHeight + "，scaleSize=" + options.inSampleSize);
        if (null != listener) {
            useInBitmap(options, listener);
        }
        options.inJustDecodeBounds = false;
        return BitmapFactory.decodeResource(res, resId, options);
    }

    /**
     * @param reqWidth  ImageView 宽度
     * @param reqHeight ImageView 高度
     * @return 缩放比例
     */
    public int calculateInSampleSize(BitmapFactory.Options options, int reqWidth, int reqHeight) {
        // https://developer.android.google.cn/topic/performance/graphics/load-bitmap?hl=zh-cn#java

        // options.outHeight ：原始图片的高度信息
        // options.outWidth 原始图片的宽度信息
        int height = options.outHeight;
        int width = options.outWidth;

        int inSampleSize = 1;
        if (height > reqHeight || width > reqWidth) {
            final int halfHeight = height / 2;
            final int halfWidth = width / 2;

            // 试探最小的缩放比例
            // Calculate the largest inSampleSize value that is a power of 2 and keeps both
            // height and width larger than the requested height and width.
            while ((halfHeight / inSampleSize) >= reqHeight
                    && (halfWidth / inSampleSize) >= reqWidth) {
                // 用于计算样本大小值，即基于目标宽度和高度的 2 的幂
                // 根据 inSampleSize 文档，计算 2 的幂的原因是解码器使用的最终值将向下舍入为最接近的 2 的幂。
                inSampleSize *= 2;
            }
        }
        return inSampleSize;
    }

```

## 4 回收 Bitmap

```java
// TestBitmapViewerFragment.java
/**
* 如何判断Bitmap是否已回收？Bitmap.isRecycled()
* 强制Bitmap回收自己：Bitmap.recycle()
*/
// Bitmap.isRecycled(), BitmapDrawable.getBitmap()
if (bitmapDrawable != null && !bitmapDrawable.getBitmap().isRecycled()) {
  bitmapDrawable.getBitmap().recycle(); // Bitmap.recycle()
}
```

# 5 TODO：四级缓存策略：复用池-内存-磁盘-网络

https://www.jianshu.com/p/1c8958ff156b  
https://blog.csdn.net/weixin_42814000/article/details/122501498  
三级缓存策略（内存-磁盘-网络） ：Fresco，Glide，Picaso

- 复用池  
  被丢弃的 Bitmap，不急着回收，而是放入一个复用池中。  
  复用的是内存块。
  ReferenceQueue。

  Ref <a href="#bitmap_reuse">Bitmap 复用</a>

- 内存缓存
  android.util.LruCache（最近最少使用缓存）- 队列
- 磁盘缓存
  DiskLruCache
  https://github.com/JakeWharton/DiskLruCache

# Refs

- [Bitmap.Config](https://developer.android.google.cn/reference/android/graphics/Bitmap.Config)
- https://blog.51cto.com/u_14202100/5084078#_49
- https://developer.android.google.cn/topic/performance/graphics/load-bitmap?hl=zh-cn#java
- https://www.cnblogs.com/nimorl/p/8065071.html
- https://blog.csdn.net/yezhouyong/article/details/50402022
- https://www.jianshu.com/p/1c8958ff156b
