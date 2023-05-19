# Paint - 画笔

Paint (画笔) ⽤于设置绘制风格,如 线宽(笔触粗细),颜⾊,透明度和填充风格

# 1 `Paint paint = new Paint();`

获得⼀个 Paint 对象实例很简单

# 2 `paint.setStyle(Paint.Style.STROKE)`

设置画笔模式,共 3 种模式。  
 STROKE //描边  
 FILL //填充  
 FILL_AND_STROKE //描边加填充

# 3 设置画笔绘制的颜⾊

```java
paint.setARGB(int a,int r,int g,int b)  // a代表透明度，r，g，b代表颜⾊值
/
paint.setColor(Color.GREEN)     //颜⾊值(包括透明度和RGB颜⾊)
/
paint.setAlpha((int) (0.8 \* 255));// colorId 已经包含了透明度，再 setAlpha()也没有影响
```

# 4 `paint.setAntiAlias(boolean flag)`

是否使⽤抗锯齿.  
 true 表示使用，会消耗较⼤资源，绘制图形速度会变慢。

![Paint_setAntiAlias](https://yingvickycao.github.io/img/android/widget/Paint_setAntiAlias.webp)  
左边是没有这只抗锯齿的，右边是设置了抗锯齿的，边界明显变模糊了。

# 5 `paint.setDither(boolean dither)`

是否使用图像抖动处理  
 true 表示使用，绘制出的图像颜色过渡平滑、更柔和、细腻,图片更清晰。  
 Before:  
 ![paint_setDither_before](https://yingvickycao.github.io/img/android/widget/paint_setDither_before.webp)

After:  
 ![paint_setDither_after](https://yingvickycao.github.io/img/android/widget/paint_setDither_after.webp)

# 6 `paint.setFilterBitmap(boolean filter)` // TODO：跟矩阵有关

true:图像在动画进⾏中会滤掉对 Bitmap 图像的优化操作，加快显⽰速度，本设置项
依赖于 dither 和 xfermode 的设置

# 7 `paint.setMaskFilter(MaskFilter maskfilter)` // TODO：跟矩阵有关

设置 MaskFilter，可以⽤不同的 MaskFilter 实现滤镜的效果，如滤化，⽴体等.

# 8 `paint.setColorFilter(ColorFilter colorfilter)` // TODO:ColorFilter， 跟矩阵有关

https://www.runoob.com/w3cnote/android-tutorial-colorfilter1.html  
https://www.jianshu.com/p/9a44d04f39fc

设置颜⾊过滤器,在绘制颜⾊时实现不⽤颜⾊的变换效果

```java
paint.setColorFilter(new ColorMatrixColorFilter(colorMatrix));
```

DrawBitmap.java  
 TestColorFilterFragment.java  
 Link [修图技术-滤镜效果实现 ColorMatrix](https://www.jianshu.com/p/9a44d04f39fc)

# 9 `paint.setPathEffect(PathEffect effect)`

设置绘制路径的效果  
paint.setPathEffect.java

设置绘制路径的效果:CornerPathEffect/DiscretePathEffect/PathDashPathEffect/ComposePathEffect/SumPathEffect

# 10 `paint.setShadowLayer(float radius ,float dx,float dy,int color)`

ShadowedViewGroup.java  
ShadowedFrameLayout.java  
在图形下⾯设置阴影层，产⽣阴影效果，radius 为阴影的⾓度，dx 和 dy 为 阴影在 x 轴和 y 轴上的距离，color 为阴影的颜⾊.

# 11 [paint.setShader(Shader) 填充图像，用来绘制各种渐变效果](Shader.md)

# 12 [paint.setXfermode(xfermode) - 合成图像](Xfermode.md)

# 13 paint.setTextSize(float textSize)

Text4AlignRight.java  
设置绘制文字的大小

# 14 paint.setTextAlign(Paint.Align.RIGHT);

Text4AlignRight.java  
设置绘制文字的对齐方式方式 : Left(Default)、Center、Right。

# 15 paint.setStrokeWidth(10) 设置画笔的粗细

Circle4FillStroke.java  
Circle4Stroke.java  
当 paint.setStyle(Paint.Style.FILL_AND_STROKE) / paint.setStyle(Paint.Style.STROKE)时，用它设置。
