# Shader

Shader 在三维软件中称之为着色器/渐变器，其作用是来给图像着色。
shader 类是 Android 在图形变换中非常重要的一个类。填充图像，用来绘制各种渐变效果

ShaderFragment.java

```java
// Shader的5个子类：BitmapShader, ComposeShader, LinearGradient, RadialGradient, SweepGradient
paint.setShader(Shader);
```

# 1 Shader

使用 Shader 指定的渲染效果来填充图片

Link [详解 Paint 的 setShader(Shader shader)](https://www.cnblogs.com/tianzhijiexian/p/4298660.html)

RectWithShader.java, ShaderFragment.java
(1) BitmapShader 位图平铺
(2) LinearGradient 线性渐变
(3) RadialGradient 圆角渐变
(4) SweepGradient 角度渐变
(5) ComposeShader 组合渲染

## BitmapShader：位图平铺

绘制过程是先采用 Y 轴模式，再使用 X 轴模式的

## LinearGradient：线性渐变

```java
第一个：
/**
  * 渐变的起点：(x0,y0)
  * 渐变的终点：(x1,y1)
  * color0:  起点的颜色
  * color1:  终点的颜色
  * TileMode：模式不能为空
  */
public LinearGradient (float x0, float y0, float x1, float y1, int color0, int color1, Shader.
```

```java
// 画布是（0，0）-（200dp，200dp）的区域，LinearGradient 的区域（执行渐变的区域）也是（0，0）-（200dp，200dp），开始的颜色是红色，结束的颜色是黄色，模式是重复模式.
shader = new LinearGradient(0, 0, right, bottom, Color.RED, Color.YELLOW, Shader.TileMode.REPEAT);
paint.setShader(shader);
canvas.drawRect(0, 0, right, bottom, paint);
```

![Shader_LinearGradient_1.png](https://yingvickycao.github.io/img/android/widget/Shader_LinearGradient_1.jpg)

```java
第二个：
/**
  * 渐变的起点：(x0,y0)
  * 渐变的终点：(x1,y1)
  * colors:      包含多个颜色
  * positions:   包含多个颜色的位置。 可以为null。
  * TileMode：模式不能为空
  */
public LinearGradient (float x0, float y0, float x1, float y1, int[] colors, float[] positions, Shader.TileMode tile)
```

```java
int colors[] = new int[]{Color.RED, Color.YELLOW, Color.GREEN, Color.BLUE};
float positions[] = new float[]{0, 0.1F, 0.5F, 0.8F};
// 颜色从红色到黄色的渐变起点是整个渐变区域（left, top, right, bottom定义了渐变区域）的起点，终点是渐变区域长度*10%的地方。例如，绿色到黄色是从渐变区域50%到80%。
shader = new LinearGradient(0, 0, right, bottom, colors, positions, Shader.TileMode.REPEAT);
paint.setShader(shader);
canvas.drawRect(0, 0, right, bottom, paint);
```

![Shader_LinearGradient_2](https://yingvickycao.github.io/img/android/widget/Shader_LinearGradient_2.jpg)

从 0，0)到(20dp,200dp)之间相当于画一条斜线，按设定比例画颜色：  
![Shader_LinearGradient_2_color_pencentage](https://yingvickycao.github.io/img/android/widget/Shader_LinearGradient_2_color_pencentage.png)

PPT 效果：
![Shader_LinearGradient_2_PPT](https://yingvickycao.github.io/img/android/widget/Shader_LinearGradient_2_PPT.jpg)

```java
// 等于null时，颜色均匀地填充整个渐变区域
shader = new LinearGradient(0, 0, right, bottom, colors, null, Shader.TileMode.MIRROR);
```

![Shader_LinearGradient_3](https://yingvickycao.github.io/img/android/widget/Shader_LinearGradient_3.jpg)

HTML:

```html
<div
  style="background:linear-gradient(to right bottom,#f00,#ff0,#0f0,#00f);height:200px;width:200px"
></div>
<!-- / -->
<div
  style="background:linear-gradient(135deg,#f00,#ff0,#0f0,#00f);height:200px;width:200px"
></div>
```

![Shader_LinearGradient_3_HTML](https://yingvickycao.github.io/img/android/widget/Shader_LinearGradient_3_HTML.jpg)

## RadialGradient：圆角渐变/径向渐变

以一个圆形中心向四周渐变的效果。

```java
第一个：
// centerX，centerY）是圆心的坐标，radius是半径，centerColor是边缘的颜色，edgeColor是外围的颜色
RadialGradient (float centerX, float centerY, float radius, int centerColor, int edgeColor, Shader.TileMode tileMode)
```

```java
shader = new RadialGradient(centerX, centerY, radius, Color.RED, Color.GREEN, Shader.TileMode.CLAMP);
paint.setShader(shader);
canvas.drawRect(0, 0, right, bottom, paint);
```

![Shader_RadialGradient_1](https://yingvickycao.github.io/img/android/widget/Shader_RadialGradient_1.jpg)

```java
第二个：
// colors:多个颜色。stops:色彩的位置。
shader = new RadialGradient(centerX, centerY, radius, new int[]{Color.RED, Color.GREEN, Color.YELLOW}, new float[]{0.1f, 0.5f, 0.8f}, Shader.TileMode.CLAMP);
```

```java
shader = new RadialGradient(centerX, centerY, radius, new int[]{Color.RED, Color.GREEN, Color.YELLOW}, new float[]{0.1f, 0.5f, 0.8f}, Shader.TileMode.CLAMP);
paint.setShader(shader);
canvas.drawRect(0, 0, right, bottom, paint);
```

![Shader_RadialGradient_2](https://yingvickycao.github.io/img/android/widget/Shader_RadialGradient_2.jpg)

## SweepGradient：角度渐变/扫描式渐变

```java
第一个：
SweepGradient(float cx, float cy, int color0, int color1)
```

```java
// 产生从color0到color1的渐变
shader = new SweepGradient(right / 2, right / 2, Color.RED, Color.GREEN);
paint.setShader(shader);
canvas.drawRect(0, 0, right, bottom, paint);
```

![Shader_SweepGradient_1](https://yingvickycao.github.io/img/android/widget/Shader_SweepGradient_1.jpg)

```java
第二个：
SweepGradient(float cx, float cy, int[] colors, float[] positions)
```

```java
shader = new SweepGradient(right / 2, right / 2, new int[]{Color.RED, Color.GREEN, Color.YELLOW}, null);
paint.setShader(shader);
canvas.drawRect(0, 0, right, bottom, paint);
```

![Shader_SweepGradient_2](https://yingvickycao.github.io/img/android/widget/Shader_SweepGradient_2.jpg)

## ComposeShader 组合模式

两个 Shader 组合在一起作为一个新 Shader

```java
ComposeShader (Shader shaderA, Shader shaderB, Xfermode mode)
ComposeShader (Shader shaderA, Shader shaderB, PorterDuff.Mode mode)
```

```java
composeShader = new ComposeShader(linearGradient, radialGradient, PorterDuff.Mode.DARKEN);
paint.setShader(composeShader);
canvas.drawRect(0, 0, right, bottom, paint);
```

![Shader_ComposeShader](https://yingvickycao.github.io/img/android/widget/Shader_ComposeShader.png)

# 2 Shader.TileMode

TileMode: 3 种 .  
绘制过程是先采用 Y 轴模式，再使用 X 轴模式的.  
![Shader_TileMode_image.png](https://yingvickycao.github.io/img/android/widget/Shader_TileMode_image.png)

- Shader.TileMode.CLAMP - 边缘拉伸模式. 将边缘的一个像素进行拉伸、扩展  
  ![Shader_TileMode_CLAMP](https://yingvickycao.github.io/img/android/widget/Shader_TileMode_CLAMP.jpg)

```java
paint.setShader(new BitmapShader(bitmap, Shader.TileMode.CLAMP, Shader.TileMode.CLAMP));
```

- Shader.TileMode.REPEAT - 重复模式(平移复制)  
  ![Shader_TileMode_REPEAT](https://yingvickycao.github.io/img/android/widget/Shader_TileMode_REPEAT.jpg)

```java
paint.setShader(new BitmapShader(bitmap, Shader.TileMode.REPEAT, Shader.TileMode.REPEAT));
```

- Shader.TileMode.MIRROR 镜像复制  
  ![Shader_TileMode_MIRROR](https://yingvickycao.github.io/img/android/widget/Shader_TileMode_MIRROR.jpg)

```java
paint.setShader(new BitmapShader(bitmap, Shader.TileMode.MIRROR, Shader.TileMode.MIRROR));
```

# 3 Shader 引入 [Matrix](Matrix.md)

Shader 可以结合 Matrix 使用，使用后，会改变绘图坐标系。  
ShaderExampleView_Shader_Only.java  
ShaderExampleView_Shader_with_Matrix.java

```java
// 设置矩阵变换
Matrix matrix = new Matrix();
matrix.setTranslate(right / 2, right / 2);
// 设置Shader的变换矩阵
shader.setLocalMatrix(matrix);

paint.setShader(shader);
```

![Shader_TileMode_include_Matrix](https://yingvickycao.github.io/img/android/widget/Shader_TileMode_include_Matrix.jpg)

# 4 倒影图

```
// ReflectionImageView.java
// 倒影图 - Shader + Xfermode + Matrix + Layer
Step 1 : Draw 源图
Step 2 : Create Layer 2, 利用 Matrix 倒置源图，获得“倒置图”。
Step 3 : 在Layer 2, Shader 填充“倒置图”得到 “带填充色的倒置图”，Xfermode 结合 “带填充色的倒置图”和 React 合成倒影。
Step 1 : 回到 Layer 1
```

![ic_grid_3](https://yingvickycao.github.io/img/android/widget/ic_grid_3.png)

![Shader_ReflectionImage](https://yingvickycao.github.io/img/android/widget/Shader_ReflectionImage.jpg)

# Refs:

https://blog.csdn.net/wangyanxin928/article/details/103425002  
https://www.cnblogs.com/tianzhijiexian/p/4298660.html  
https://developer.android.google.cn/reference/android/graphics/Shader?hl=en
