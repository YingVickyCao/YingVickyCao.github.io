# Xfermode - 合成图像

设置图形重叠时的处理方式，即合成图像。比如合并、取交集或并集，经常用来制作橡皮擦的擦除效果。

| Xfermode           | API                 | Usage    |
| ------------------ | ------------------- | -------- |
| AvoidXfermode      | Depressed in API 16 | -        |
| PixelXorXfermode   | Depressed in API 16 | 像素异或 |
| PorterDuffXfermode | Current             | 图像混合 |

# 1 AvoidXfermode (Depressed)

```java
AvoidXfermode xfermode = new AvoidXfermode(Color.BLUE, 10, AvoidXfermode.Mode.AVOID);
paint.setXfermode(xfermode);
```

# 2 PixelXorXfermode (Depressed)

```java
paint.setXfermode(new PixelXorXfermode(-1));
```

# 3 PorterDuffXfermode

https://developer.android.google.cn/reference/android/graphics/PorterDuff.Mode  
`XfermodeFragment.java`

```
android.graphics.PorterDuff.Mode.SRC:只绘制源图像
android.graphics.PorterDuff.Mode.DST:只绘制目标图像
android.graphics.PorterDuff.Mode.DST_OVER:在源图像的顶部绘制目标图像
android.graphics.PorterDuff.Mode.DST_IN:只在源图像和目标图像相交的地方绘制目标图像
android.graphics.PorterDuff.Mode.DST_OUT:只在源图像和目标图像不相交的地方绘制目标图像
android.graphics.PorterDuff.Mode.DST_ATOP:在源图像和目标图像相交的地方绘制目标图像，在不相交的地方绘制源图像
android.graphics.PorterDuff.Mode.SRC_OVER:在目标图像的顶部绘制源图像
android.graphics.PorterDuff.Mode.SRC_IN:只在源图像和目标图像相交的地方绘制源图像
android.graphics.PorterDuff.Mode.SRC_OUT:只在源图像和目标图像不相交的地方绘制源图像
android.graphics.PorterDuff.Mode.SRC_ATOP:在源图像和目标图像相交的地方绘制源图像，在不相交的地方绘制目标图像
android.graphics.PorterDuff.Mode.XOR:在源图像和目标图像重叠之外的任何地方绘制他们，而在不重叠的地方不绘制任何内容
android.graphics.PorterDuff.Mode.LIGHTEN:获得每个位置上两幅图像中最亮的像素并显示
android.graphics.PorterDuff.Mode.DARKEN:获得每个位置上两幅图像中最暗的像素并显示
android.graphics.PorterDuff.Mode.MULTIPLY:将每个位置的两个像素相乘，除以255，然后使用该值创建一个新的像素进行显示。结果颜色=顶部颜色*底部颜色/255
android.graphics.PorterDuff.Mode.SCREEN:反转每个颜色，执行相同的操作（将他们相乘并除以255），然后再次反转。结果颜色=255-(((255-顶部颜色)*(255-底部颜色))/255)
```

## PorterDuff.Mode

- `ColorFilter 也用了 PorterDuff.Mode`.

- PorterDuff.Mode

原理：通过混合 Source 和 DST 图片的像素（alpha 和 color）形成新像素，从而达到合成图像的目的。

```java
Xfermode xfermode = new PorterDuffXfermode(PorterDuff.Mode.DST_IN)

// 开启Xfermode
paint.setXfermode(xfermode);

// 关闭Xfermode
paint.setXfermode(null);
```

- PorterDuff.Mode 一共 18 种模式。
- PorterDuff 是 以两个人名 Thomas Porter 和 Tom Duff 命名，提出了“Compositing digital images（合成数字图像）”的 概念。
- 用途：圆形图片、圆角图片、刮刮卡。

## Google Doc 的 Demo 说明

- 1 Source 和 DST 图片要是透明图以及加 Layer，否则得不到想要的效果，或不起作用。
  Tips：

官网给的 Source Image 和 Destination Image，是在说明需要透明图片。如果要在代码中使用它们，需要下载下来，并把方块的背景变成透明色。

- 2 加 Layer，否则有的 PorterDuff.Mode 合成后的图片有黑色背景，例如：new PorterDuffXfermode(PorterDuff.Mode.SRC_OVER)。
- 3 合成不起作用 / 效果和 Google Doc 不一致 / 合成后的图片有黑色背景：跟是否开启硬件加速没有关系，是其他原因。比如 1.。

```java
setLayerType(View.LAYER_TYPE_HARDWARE, null);	开启硬件加速
setLayerType(View.LAYER_TYPE_SOFTWARE, null)		开启软件加速，即关闭硬件加速
```

```xml
开启或关闭硬件加速
<activity android:hardwareAccelerated="false" />
```

- 4 学习时，要用 Bitmap，不要画 Cirlce 和 Rect 测试，否则可能得不出 和 Google Doc 一致的效果图，脑袋还会晕了。
- 5 Source 和 DST 图片 大小不需要一样。Google Doc 给的大小一样，是为了方便解释和理解效果。若大小不同，计算图像坐标时也更麻烦。
- 6 实际使用时，Source 和 DST 不一定都是图片，也可以是 cancas 画出的形状。`RoundImageView.java`

# Refs:

- PorterDuffXfermode  
  https://blog.csdn.net/wzlyd1/article/details/71597599  
  https://www.jianshu.com/p/d11892bbe055  
  https://developer.android.google.cn/reference/android/graphics/PorterDuff.Mode  
  https://juejin.cn/post/6844903744233013255
