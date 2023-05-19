# VectorDrawable（SVG，矢量图）

# 1 矢量图

- 矢量图 vs 位图图像？
  | - | 矢量图 | 位图图像（点阵图像） |
  |------|------------------------------|-----------------------------------------------|
  | 描述图像 | 线段和曲线 | 一格一格的像素 |
  | 放缩 | 与分辨率无关。可以无损缩放任何大小 | 放大会马赛克 |
  | 色彩 | 不丰富,颜色单一 | 丰富 |
  | 占用内存 |小 | 大 |
  | 占用物理内存 |小 | 大 |
  | 适合 | 简单图像：标识、图标（icon）、Logo | 实物（photographs） |
  | 格式 | .AI、_.EPS、.svg、.dwg、.dxf、.cdr | _.bmp、_.pcx、_.gif、_.jpg、_.tif、photoshop 的\_.psd |

- SVG（Scalable Vector Grphics（矢量图））  
   android 中 SVG 实现，叫做 VectorDrawable  
   VectorDrawable 没有完全支持 SVG，但语法很接近

  矢量图 : <vector> - `VectorDrawable`
  矢量动画 : <animated-vector> - `AnimatedVectorDrawable`
  <br/>

- svg 的特点  
  （1）render time 更长， 但占用内存、物理内存更小。  
  （2）svg 无损放缩，png 放大会马赛克  
  <br/>

- svg vs png
  Bitmap 在 GPU 中有重绘缓存功能(Vector 没有), 能做频繁的重绘(Vector 不能).

SVG 加载速度会快于 PNG,但渲染速度会慢于 PNG。  
矢量数据：占用内存小，图像清晰度不受影响。但是绘制图形效率较低，通过 CPU 绘制。  
栅格数据：占用内存大，图像清晰度会受图像拉伸而改变。但是通过 GPU 绘制，效率较高。  
因此，图片比较简单时,Vector 占用内存小，渲染速度高。图片非常复杂时,Bitmap 占用内存小， Bitmap 渲染速度高.

https://jingyan.baidu.com/article/54b6b9c0dbef682d583b4722.html
<br/>

- 适合 SVG
  (1) 适合 icon、Button 等小、简单的、颜色单一的图  
   (2) Google recommends max = 200 x 200dp => 800 x 800 px  
   (4) 简单，颜色不能太多， 1 ～ 3  
   (4) Min>=Android5(21) / Min<Android5(21), 用 Support library  
   (5) **_APK 大小 和 CPU 渲染速度做选择？_** 更看重大小，用 svg；更看重速度，用 png。
  <br/>

- 如何选择
  (1) 复杂：WebP > PNG
  (2) 简单(<=200 x 200dp)：自己 xml 画的 Shape > Vector

  <br/>

# 2. 使用 VectorDrawable

## How to get SVG?

- UI 导出 `.svg`，并给开发人员。

- SVG Online editor https://editor.method.ac/

- https://material.io/tools/icons/?style=baseline

## 如何使用？

Link [Vector drawable backward-compatibility solutions](https://developer.android.google.cn/studio/write/vector-asset-studio#apilevel)

- 导入 SVG：  
   `New` -> `Vector Asset`, SVG / PSD => generated xml file`<vector>`  
  <br/>

- 属性
  svg 支持 tint。  
  svg 为单色时，可以使用 attr。  
  <br/>

- API When Min >=Android 5(21)

  ```xml
  <ImageView
      android:src="@drawable/ic_svg_vd"
      android:tint="@android:color/holo_green_dark"
      />
  ```

- API When Min< Android5(21)

  有 BitmapDrawable，没有 VectorDrawable 和 AnimatedVectorDrawable。
  用支持库，使得 svg 支持 API<21。

  ```groovy
  // build.gradle
  android {
    defaultConfig {
    vectorDrawables.useSupportLibrary = true
    }
  }

  dependencies {
  // Support Library 23.2 or higher
  compile 'com.android.support:appcompat-v7:23.2.0'
  }
  ```

  ```xml
  <ImageView
      app:srcCompat="@drawable/ic_svg_vd"
      app:tint="@android:color/holo_green_dark"
      />
  ```

  android gradle plugin >= 2.0  
  android:src => app:srcCompat  
  VectorDrawable => VectorDrawableCompat  
  AnimatedVectorDrawable => AnimatedVectorDrawableCompat

## 注意点

- ERROR：多个地方使用同一个 svg：一个地方 Icon 变颜色，其他也变。

每次 set，同一个 svg，得到的 VectorDrawable 是不同实例.  
但如果不 mute，与其他 drawable 共享状态  
https://www.imooc.com/article/281573

- Vector 如何修改大小？  
   无损等比例放缩。修改 viw 大小即可。

```xml

<!-- wrap_content 等于 原始尺寸    -->
 <!-- Icon 大小=24x24, View大小=24x24 -->
<ImageView
  android:layout_width="wrap_content"
  android:layout_height="wrap_content"
  android:src="@drawable/icon_svg_play_24x24" />

<!-- Icon 大小=6x8, View大小=6x8 -->
<ImageView
android:layout_width="24dp"
android:layout_height="24dp"
android:src="@drawable/icon_svg_play_24x24" />

<!-- SVG，支持无损放大或缩小. 当设置宽和高，与原始宽和高放缩比例不同时，那么会按最小的比例，同比例放缩原始宽和高 -->
<!-- Icon 大小=48x48, View大小=48x48 -->
<ImageView
    android:layout_width="48dp"
    android:layout_height="48dp"
    android:layout_marginStart="@dimen/size_5"
    android:layout_marginEnd="@dimen/size_5"
    android:src="@drawable/icon_svg_play_24x24" />

<!-- Icon 大小=48x48, View大小=48x56 -->
<ImageView
    android:layout_width="48dp"
    android:layout_height="56dp"
    android:src="@drawable/icon_svg_play_24x24" />
```

# 3 VectorDrawable 语法

![vector](https://yingvickycao.github.io/img/android/resources/vector.webp)  
根标签为 vector，它由 group,path 和 clip-path 标签组成一个树状结构。

vector 标签：表明 xml 文件是矢量图<br/>

group 标签：类似 View 中的 ViewGroup。group,path 和 clip-path 标签均可以作为其子标签，用于对 group 包含的部分进行 scale、rotate 和 translate 和动画。<br/>

path 标签：类似绘制中的 Path 类，用于真正构建图形，构建方式和 Path 也类似。<br/>

clip-path 标签：对矢量树结构中 clip-path 同级及子节点按照指定区域进行剪切，最终呈现的是指定区域中显示的部分。<br/>

## vector 标签

| 属性           | 说明                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------- |
| name           | 矢量图名称，起标识作用                                                                    |
| width          | 矢量图宽度，只在 View 为 wrap_content 时起作用，支持所有单位 px,dp...                     |
| height         | 同上                                                                                      |
| viewportWidth  | 虚拟画布的宽度，只用于绘制矢量图内容时使用 - 把 width 分成多少份                          |
| viewportHeight | 同上                                                                                      |
| tint           | 通过 tint 可以指定该矢量图的整体表面颜色                                                  |
| tintMode       | 色彩的 Porter-Duff 混合模式。 默认为 src_in                                               |
| autoMirrored   | 是否开启镜像，当为 true 时，图形在 RTL 布局时，图片会镜像显示，相当于沿中心 Y 轴旋转 180° |
| alpha          | 矢量图的透明度，范围 0-1，默认 1 不透明；                                                 |

- width 与 viewportWidth ，height 与 viewportHeight 一般是相等的。

## path 标签

| 属性           | 说明                                                                                                                             |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| name           | path 名称，标识唯一 path                                                                                                         |
| pathData       | path 的路径数据，类似 Path 类中的 moveTo,lineTo 等                                                                               |
| fillColor      | 填充 path 的颜色，默认不填充                                                                                                     |
| strokeColor    | 画笔轨迹颜色                                                                                                                     |
| strokeWidth    | 画笔轨迹宽度                                                                                                                     |
| strokeAlpha    | 画笔轨迹透明度                                                                                                                   |
| strokeLineCap  | 线帽 round/square                                                                                                                |
| fillAlpha      | 填充透明度                                                                                                                       |
| trimPathStart  | 从路径起始位置截断路径的比率，取值范围 0-1，默认 0 效果就是从开始到截断[0,x.x]的部分没有内容                                     |
| trimPathEnd    | 从路径结束位置截断路径的比率，取值范围 0-1，默认 1 效果就是从结束到截断[x.x,1]的部分没有内容                                     |
| trimPathOffset | 设置路径截取时的偏移比例，取值范围 0-1，默认 0 相当于将开始移动到指定的 x.x 比例处，需与 trimPathStart 或者 trimPathEnd 结合使用 |
| fillType       | API 24 引入该属性，取值 nonZero 和 evenOdd，默认 nonZero                                                                         |

如果导入 svg 出错，可能是因为轨迹属性不是<`path>`，android studio 不支持，比如：`<text>`、`<circle>`等。

## pathData

该属性是绘图核心，其使用的指令和 Android 中 Path 操作非常类似
Link [w3 SVG Path 章节](https://www.w3.org/TR/SVG/paths.html#Introduction)

| 指令                                                 | 类比 Path 方法             | 说明                                                                                                                                                                                                      |
| ---------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mx,y                                                 | moveTo(x,y)                | 移动到点(x,y)                                                                                                                                                                                             |
| Lx,y                                                 | lineTo(x,y)                | 直线连接至点(x,y)                                                                                                                                                                                         |
| Hx                                                   | lineTo(x,原 y)             | 水平连接                                                                                                                                                                                                  |
| Vy                                                   | lintTo(原 x,y)             | 垂直连接                                                                                                                                                                                                  |
| Qx1,y1 x2,y2                                         | quadTo(x1,y1,x2,y2)        | 二阶贝塞尔曲线，控制点(x1,y1)，终点(x2,y2)                                                                                                                                                                |
| Cx1,y1 x2,y2 x3,y3                                   | cubicTo(x1,y1,x2,y2,x3,y3) | 三阶贝赛尔曲线，控制点(x1,y1)，(x2,y2)，终点(x3,y3)                                                                                                                                                       |
| Arx,ry x-axis-rotation large-arc-flag,sweep-flag x,y | 效果和 arcTo 类似          | 画椭圆弧型 (rx,ry)为椭圆的 x 轴和 y 轴半径<br/>x-axis-rotation 为椭圆 x 轴旋转角度，当前点和末尾参数点(x,y)为椭圆上的起点和终点，<br/>large-arc-flag 和 sweep-flag 共同决定使用由起点和终点组成的哪个圆弧 |
| Z(z)                                                 | close()                    | 终点和起始点如果可以构成封闭图形则进行连接                                                                                                                                                                |

指令大小写的区别：大写指令使用的是绝对坐标，小写指令使用相对上一个点的坐标.

### M L H V 指令

```xml
<!-- ic_svg_test_m_l_h_v.xml -->
<vector xmlns:android="http://schemas.android.com/apk/res/android"
  android:width="60dp"
  android:height="60dp"
  android:viewportWidth="60"
  android:viewportHeight="60">
  <path
      android:pathData="M10,10h30v30H10z,"
      android:strokeWidth="1"
      android:strokeColor="#FF0000" />
</vector>
```

```
M10,10 - 移动到(10,10) =>
h30 - 水平连接至(10+30,10)处,即点(40,10) =>
v30 = 垂直连接至(40,10+30)处，即点(40,40) =>
H10 - 水平连接至(10,40)处 =>
z - 组成封闭图形
```

![vector_pathdata_MLHV](https://yingvickycao.github.io/img/android/resources/vector_pathdata_MLHV.webp)  
![vector_pathdata_MLHV_2](https://yingvickycao.github.io/img/android/resources/vector_pathdata_MLHV_2.webp)
灰色是 Android Studio 预览模式的背景

### Qx1,y1 x2,y2 二阶贝赛尔曲线

```xml
<!-- ic_svg_test_quadratic_bezier_curve.xml  -->
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="60dp"
    android:height="60dp"
    android:viewportWidth="60"
    android:viewportHeight="60">
    <path
        android:pathData="M0,0H60V60H0Z"
        android:strokeWidth="1"
        android:strokeColor="#FF0000" />

    <!-- 二阶贝赛尔曲线 Qx1,y1 x2,y2   -->
    <path
        android:pathData="M0,30C20,0 40,0 60,30"
        android:strokeWidth="1"
        android:strokeColor="#0F0" />
</vector>
```

```
红色线条为绘制区域.

绿色path是二阶贝赛尔曲线：
点(0,30)为起始点，
控制点为(30,0)
点(60,30)为终点,
=> 从而构成了如图的二阶贝塞尔曲线。
```

![vector_pathData_quadratic_bezier](https://yingvickycao.github.io/img/android/resources/vector_pathData_quadratic_bezier.webp)
灰色是 Android Studio 预览模式的背景

### Cx1,y1 x2,y2 x3,y3 三阶贝塞尔曲线

```xml
<!-- ic_svg_test_cubic_bezier_curve.xml -->
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="60dp"
    android:height="60dp"
    android:viewportWidth="60"
    android:viewportHeight="60">
    <path
        android:pathData="M0,0H60V60H0Z"
        android:strokeWidth="1"
        android:strokeColor="#FF0000" />

    <!-- android:pathData :Cx1,y1 x2,y2 x3,y3 三阶贝塞尔曲线 -->
    <path
        android:pathData="M0,30C20,0 40,0 60,30"
        android:strokeWidth="1"
        android:strokeColor="#0F0" />
</vector>
```

```
蓝色是可绘制区域。

绿色path为三阶贝塞尔曲线：
起点为(0,30)
第一个控制点为(20,0)
第二个控制点为(40,0)
终点为(60,30)，
=> 构成了如图的三阶贝塞尔曲线。
```

![vector_pathData_cubic_bezier](https://yingvickycao.github.io/img/android/resources/vector_pathData_cubic_bezier.webp)
灰色是 Android Studio 预览模式的背景

### Arx,ry x-axis-rotation large-arc-flag,sweep-flag x,y 绘制椭圆弧

如何绘制椭圆弧？由起点、终点、顺时针还是逆时针决定，一共有 4 种可能。

![vector_pathData_elliptical_arc](https://yingvickycao.github.io/img/android/resources/vector_pathData_elliptical_arc.webp)

| 参数          | 取值 | 说明   |
| ------------- | ---- | ------ |
| arge-arc-flag | 1    | 大弧线 |
| arge-arc-flag | 0    | 小弧线 |
| sweep-flag    | 1    | 顺时针 |
| sweep-flag    | 0    | 逆时针 |

```xml
<!-- ic_svg_test_arc.xml -->
<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="60dp"
    android:height="60dp"
    android:viewportWidth="60"
    android:viewportHeight="60">
    <!--绘制蓝色可绘制正方形区域-->
    <path
        android:pathData="M0,0H60V60H0Z"
        android:strokeWidth="1"
        android:strokeColor="#FF0000" />

    <!--绘制玫红短弧线-->
    <path
        android:pathData="M20,20A20,20 0 0,0 40,40"
        android:strokeWidth="1"
        android:strokeColor="#FF00FF" />

    <!--绘制黄色长弧线-->
    <path
        android:pathData="M20,20A20,20 0 1,0 40,40"
        android:strokeWidth="1"
        android:strokeColor="#FFFF00" />

    <!--绘制绿色段弧线-->
    <path
        android:pathData="M20,20A20,20 0 0,1 40,40"
        android:strokeWidth="1"
        android:strokeColor="#00FF00" />

    <!--绘制蓝色长弧线-->
    <path
        android:pathData="M20,20A20,20 0 1,1 40,40"
        android:strokeWidth="1"
        android:strokeColor="#0000FF" />
</vector>
```

![vector_pathData_elliptical_arc_2](https://yingvickycao.github.io/img/android/resources/vector_pathData_elliptical_arc_2.webp)
灰色是 Android Studio 预览模式的背景

## group 标签

| 属性                  | 说明                                                 |
| --------------------- | ---------------------------------------------------- |
| name                  | group 名称，唯一标识 group                           |
| rotation              | group 的旋转角度，默认 0                             |
| pivotX,pivotY         | scale 和 rotation 变换中心点的 x,y 坐标，默认(0,0)； |
| scaleX,scaleY         | X 和 Y 轴方向的缩放，默认 1；                        |
| translateX,translateY | X 和 Y 轴方向的移动距离，默认 0                      |

group 标签可以进行放大缩小，平移，旋转操作，操作的对象就是 group 子标签所形成图形。

## clip-path 标签

| 属性     | 说明                 |
| -------- | -------------------- |
| name     | 名称，唯一标识       |
| pathData | 定义了截取显示的区域 |

clip-path 标签生效的范围为其所在的父标签(group 或者 vector)中 clip-path 位置以下的图形生效

```xml
<!-- ic_svg_test_clip_path.xml -->
<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="60dp"
    android:height="60dp"
    android:viewportWidth="60"
    android:viewportHeight="60">

    <!--绘制红色可绘制正方形区域-->
    <path
        android:pathData="M0,0H60V60H0Z"
        android:strokeWidth="1"
        android:strokeColor="#F00" />

    <clip-path android:pathData="M20,20 L40,40 L20,40" />

    <!-- 假如把clip-path换成path：绿色三角   -->
    <!--    <path-->
    <!--        android:pathData="M20,20 L40,40 L20,40"-->
    <!--        android:strokeWidth="1"-->
    <!--        android:strokeColor="#0F0" />-->

    <group>
        <!-- 绘制蓝色正方形 -->
        <path
            android:pathData="M20,20h20v20h-20z"
            android:strokeWidth="1"
            android:strokeColor="#00F" />
    </group>
</vector>
```

![vector_clipPath_1](https://yingvickycao.github.io/img/android/resources/vector_clipPath_1.webp)  
灰色是 Android Studio 预览模式的背景

![vector_clipPath_2](https://yingvickycao.github.io/img/android/resources/vector_clipPath_2.webp)

# Refs

- [Vector drawables overview](https://developer.android.google.cn/guide/topics/graphics/vector-drawable-resources)
- [Add multi-density vector graphics](https://developer.android.google.cn/studio/write/vector-asset-studio)
- https://material.io/tools/icons/?style=baseline
- https://editor.method.ac/
- https://www.jianshu.com/p/309fb98a1e47
- [Android Vector](https://blog.csdn.net/eclipsexys/article/details/51838119)
- 贝塞尔曲线(cubic-bezier)
  http://cubic-bezier.com/  
  https://blog.csdn.net/qq_38605423/article/details/74571795  
  [w3 SVG Path 章节](https://www.w3.org/TR/SVG/paths.html#Introduction)  
  [贝塞尔曲线](https://www.jianshu.com/p/607a1ac26567?ivk_sa=1024320u)  
  https://www.jianshu.com/p/309fb98a1e47
