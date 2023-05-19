# Canvas - 画布

# 1 `canvas.drawColor` 设置画布颜色

```java
canvas.drawColor(Color.BLACK)
```

# 2 `canvas.drawCircle`画圆

`CircleProgressBar.java`  
`Circle4Fill.java`  
`Circle4FillStroke.java`  
`Circle4Stroke.java`

```java
canvas.drawCircle(float cx, float cy, float radius, Paint paint)
```

- Android 坐标系与数学坐标系不同。  
  canvas.drawCircle、包括 Progress Bar 的开始位置，是从水平方向开始更新的。

![canvas_draw_circle_axis](https://yingvickycao.github.io/img/android/widget/canvas_draw_circle_axis.webp)

- 难点：计算圆的 radius  
   画的圆四个角不圆？
  Ref ：https://blog.csdn.net/u010521645/article/details/45061537

  ![canvas_draw_circle_radius_2](https://yingvickycao.github.io/img/android/widget/canvas_draw_circle_radius_2.webp)
  原因：  
  radius 没有设置正确。

android 中 FILL_AND_STROKE 不 等于 FILL + STROKE。

画图时，若带 stroke，实际上 Android 会将 STROKE 的宽度均分两半，一半绘制在圆外，一半绘制在圆内。

Example : 画一个内半径为 60，边框为 10 的圆，那么宽和高为 140

![canvas_draw_circle_radius_1](https://yingvickycao.github.io/img/android/widget/canvas_draw_circle_radius_1.webp)

![canvas_draw_circle_radius_3](https://yingvickycao.github.io/img/android/widget/canvas_draw_circle_radius_3.webp)

```java
paint.setStyle(Paint.Style.STROKE);
paint.setStrokeWidth(10);

int cx = cy = 70 = width / 2
int radius = 65  = (width / 2 - thickness / 2);
canvas.drawCircle(cx, cy, radius, paint)
```

- `CircleProgressBar.java` 有 3 种效果：圆形进度、圆形进度带文字、圆形进度带弧度  
  其中，  
  默认圆形用 canvas.drawCircle 实现。  
  更新圆形用 canvas.drawArc 实现。  
  文字用 canvas.drawText 实现。  
  ![canvas_drawArc_2](https://yingvickycao.github.io/img/android/widget/canvas_drawArc_2.webp)

# 3 `canvas.drawArc`画弧

```java
canvas.drawArc(RectF oval, float startAngle, float sweepAngle, boolean useCenter, Paint paint)

RectF oval = new RectF();
oval.left = cx - radius;
oval.top = cy - radius;
oval.right = cx + radius;
oval.bottom = cy + radius;
```

- 难点：开始位置、如何把 progress 转换成 结束位置。

```java
// 开始位置：270度
float startAngle = -90; // -90 / 270
// 结束位置：progress[0 ～100]， 转换成 结束位置
float sweepAngle = 360 * (progress) / 100;
boolean useCenter = (mMode == RING_WITH_FAN);
Log.d(TAG, "drawProgress:progress=" + progress + ",startAngle=" + startAngle + ",sweepAngle=" + sweepAngle);
canvas.drawArc(oval, startAngle, sweepAngle, useCenter, progressPaint);
```

![canvas_drawArc](https://yingvickycao.github.io/img/android/widget/canvas_drawArc.webp)

- startAngle 开始位置  
  当 startAngle 为负值时，则从 0 度开始反方向取相应角度；如果 startAngle 大于等于 360，则会按 360 取模的结果开始。
- sweepAngle:角度范围  
  当 sweepAngle 大于等于 360 度时，圆弧被画成了整圆。如果为负值，则从反方向取此绝对值的范围。

Ref:
https://blog.csdn.net/tdl081071tdy/article/details/88282887

# 4 `canvas.drawText` 画文字

难点：计算 文字绘制的 baseline 坐标

- 绘制文字，按照 baseline（基线） 规则。
  baseline 是一条直线，只要确定了它的位置，文字绘制的位置就确定了。

```java
canvas.drawText(String text, float x, float y, Paint paint)
// x: baseline的X坐标
// y: baseline的y坐标
```

- 一行文字各区域的分布示意图  
  ![canvas_drawText_2](https://yingvickycao.github.io/img/android/widget/canvas_drawText_2.webp)

Leading：文字上方可能出现一些特殊的符号。  
文字的高度=Descent+Ascent+Leading。

- 绘制自定义 View 时，baseline 的位置

![canvas_drawText_4](https://yingvickycao.github.io/img/android/widget/canvas_drawText_4.webp)
注释：x，y 是 baseline 的坐标

- 文本的位置由哪些确定？
  文字本身，baseline 的（x，y）坐标，文字对齐方式{左（默认）、中、右}，textsize、字体等。

![canvas_drawText_5](https://yingvickycao.github.io/img/android/widget/canvas_drawText_5.webp)
PS : width 是 800，height 是 400，最后两个计算 baseline(x,y)，其他是设定 baseline(200,200).

## FontMetrics

![canvas_drawText_1](https://yingvickycao.github.io/img/android/widget/canvas_drawText_1.webp)

- 获取实例

  ```java
  Paint.FontMetrics fontMetrics = mPaint.getFontMetrics();        // float
  Paint.FontMetricsInt fontMetrics=  mPaint.getFontMetricsInt();  // int
  ```

```java
// TODO:
getPaint().getFontMetrics()
getPaint().getFontMetricsInt()
```

- top/ascent/descent/bottom,均是根据 baseline_Y (baseline 的 Y 坐标)计算出来的。

```
top：可绘制的最高高度所在线
bottom：可绘制的最低高度所在线
ascent ：系统建议的，绘制单个字符时，字符应当的最高高度所在线
descent：系统建议的，绘制单个字符时，字符应当的最低高度所在线
```

- ascent,descent,top,bottom,leading 线是如何计算的？

![canvas_drawText_3](https://yingvickycao.github.io/img/android/widget/canvas_drawText_3.webp)

```java
float ascent  = fontMetrics.ascent;
float descent = fontMetrics.descent;
float top     = fontMetrics.top;
float bottom  = fontMetrics.bottom;
float leading = fontMetrics.leading;
```

```xml
ascent  = ascent线的y坐标 - baseline线的y坐标；     //负数
descent = descent线的y坐标 - baseline线的y坐标；    //正数
top     = top线的y坐标 - baseline线的y坐标；        //负数
bottom  = bottom线的y坐标 - baseline线的y坐标；     //正数
leading = top线的y坐标 - ascent线的y坐标；          //负数

=>
// ascent_Y 表示 ascent线的y坐标
ascent_Y  = baseline_Y + fontMetric.ascent；
descent_Y = baseline_Y + fontMetric.descent；
top_Y     = baseline_Y + fontMetric.top；
bottom_Y  = baseline_Y + fontMetric.bottom；
```

## 如何计算 baseline

### baseline_Y

![canvas_drawText_6](https://yingvickycao.github.io/img/android/widget/canvas_drawText_6.webp)

Way 1 ：以 top 和 bottom 计算 baseline_Y (Recommended)

```java
// Text4BaselineY_1.java
float center_Y = getHeight()/2
float baseline_Y = baseline_Y(center_Y); // baseline_y=197.10938

private float baseline_Y(int center_Y) {
    Paint.FontMetrics fontMetrics = paint.getFontMetrics();
    return center_Y + (fontMetrics.bottom - fontMetrics.top) / 2 - fontMetrics.bottom;
}
```

Way 2 ：以绘制文字最小矩形 计算 baseline_Y

```java
// Text4BaselineY_2.java
float center_Y = getHeight()/2
float baseline_Y = baseline_Y(center_Y); // baseline_y=164.0

private float baseline_Y(int center_Y) {
    Rect targetRect = new Rect();
    paint.getTextBounds(text, 0, text.length(), targetRect);
    Paint.FontMetricsInt fontMetrics = paint.getFontMetricsInt();
    return center_Y + (targetRect.bottom + targetRect.top - fontMetrics.bottom - fontMetrics.top) / 2;
}
```

Way 3 : 通过 Ascent 和 Descent 得出的 Baseline Y

```java
// Text4BaselineY_3.java
float center_Y = getHeight()/2
float baseline_Y = baseline_Y(center_Y); // baseline_Y=191.01562

private float baseline_Y(int center_Y) {
    Paint.FontMetrics fontMetrics = paint.getFontMetrics();
  return center_Y + (fontMetrics.descent - fontMetrics.ascent) / 2 - fontMetrics.descent;
}
```

### Baseline_X

![canvas_drawText_7](https://yingvickycao.github.io/img/android/widget/canvas_drawText_7.webp)

- Way 1 : paint.measureText (Recommended)

```java
// Text4BaselineX_1.java
float center_X = getWidth() / 2;

float textWidth = getTextWidth();
float baseline_X = center_X - textWidth / 2;
// baseline_X=152.0,text width=296.0
Log.d(TAG, "onDraw: baseline_X=" + baseline_X + ",text width=" + textWidth);

private float getTextWidth() {
    return paint.measureText(text);
}
```

- Way 2 : paint.getTextBounds

```java
// Text4BaselineX_2.java
float center_X = getWidth() / 2;
float textWidth = getTextWidth();
float baseline_X = center_X - textWidth / 2;
// baseline_X=156.5,text width=287.0
Log.d(TAG, "onDraw: baseline_X=" + baseline_X + ",text width=" + textWidth);

private float getTextWidth(){
    Rect targetRect = new Rect();
    paint.getTextBounds(text, 0, text.length(), targetRect);
    return targetRect.width();
}
```

- Way 3 : paint.getTextWidths

```java
// Text4BaselineX_3.java
float center_X = getWidth() / 2;
float textWidth = getTextWidth(paint, text);
float baseline_X = center_X - textWidth / 2;
// baseline_X=151.5,text width=297.0
Log.d(TAG, "onDraw: baseline_X=" + baseline_X + ",text width=" + textWidth);

public static int getTextWidth(Paint paint, String str) {
    int iRet = 0;
    if (str != null && str.length() > 0) {
        int len = str.length();
        float[] widths = new float[len];
        paint.getTextWidths(str, widths);
        for (int j = 0; j < len; j++) {
            iRet += (int) Math.ceil(widths[j]);
        }
    }
    return iRet;
}
```

Ref：
https://blog.csdn.net/u012551350/article/details/51361778

# 5 canvas.drawLine 画线

```java
drawLine(float startX, float startY, float stopX, float stopY,Paint paint)
```

# 6 Path - 路径：连接多个点成图

# 7 [Layer (图层)](Layer.md)

```java
canvas.saveLayer() / canvas.saveLayerAlpha()/canvas.save()
```

# 8 [canvas.drawBitmap and Matrix - 矩阵，用于图形特效处理，控制图形和组件的变换](Matrix.md)

Matrix 进⾏图像的平移，缩放，旋转，倾斜等

# 9 canvas.drawBitmapMesh

使用 drawBitmapMesh 扭曲图像

```
canvas.drawBitmapMesh
```

BitmapMeshView.java

```java
// 扭曲Bitmap
/**
bitmap:     需要扭曲的原位图
meshWidth:  在横向上把原位图划分为多少格
meshHeight: 在纵向上把原位图划分为多少格
verts:      扭曲后的坐标点，长度为 （meshWidth +1） * （meshHeight+1）* 2。
            verts[0] 和 verts [1] ，这两个相邻的元素表示的第一个点的 x 坐标和 y 坐标。
vertOffset：忽略verts vertOffset之前数组数据的，开始对bitmap进行扭曲
colors:     值一般为null。指定每个顶点的颜色，其记录改变像素点后的位图的颜色。若不为null，长度是一个meshWidth + 1）*（meshHeight + 1）+ colorOffset值。
colorOffset：控制colors数组从第几个数组元素开始对bitmap颜色进行改变
paint:      可为null，用于绘制bitmap位图。
*/
canvas.drawBitmapMesh(@NonNull Bitmap bitmap, int meshWidth, int meshHeight, @NonNull float[] verts,
int vertOffset, @Nullable int[] colors, int colorOffset, @Nullable Paint paint)`
```

![bitmao_mesh.png](https://yingvickycao.github.io/img/android/widget/bitmao_mesh.png)

Link [修图技术-瘦脸效果的实现 canvas.drawBitmapMesh](https://blog.csdn.net/ljx1400052550/article/details/106328852)
