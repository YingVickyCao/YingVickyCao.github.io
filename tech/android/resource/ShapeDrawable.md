# Shape Drawable （ShapeDrawable ）

`TestShapeDrawableFragment.java`

- 定义一个几何形状（如矩形、圆形、线形等）。

# 语法

```
<?xml version="1.0" encoding="utf-8"?>
<shape
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape=["rectangle" | "oval" | "line" | "ring"]      //共有4种类型，矩形（默认）/椭圆形/直线形/环形
    // 如下4个属性只有当类型为环形时才有效
    android:innerRadius="dimension"
    android:innerRadiusRatio="float"
    android:thickness="dimension"
    android:thicknessRatio="float"
    android:useLevel="boolean">         //若是当作是LevelListDrawable使用时值为true，不然为false.

    <corners    //定义圆角， only for rectangle shape

        android:radius="dimension"                  //所有的圆角半径
        android:topLeftRadius="dimension"           //左上角的圆角半径
        android:topRightRadius="dimension"          //右上角的圆角半径
        android:bottomLeftRadius="dimension"        //左下角的圆角半径
        android:bottomRightRadius="dimension" />    //右下角的圆角半径

    // GradientDrawable
    <gradient   //定义渐变效果
        android:type=["linear" | "radial" | "sweep"]    //共有3中渐变类型，线性渐变（默认）/放射渐变/扫描式渐变
        android:angle="integer"         //渐变角度，必须为45的倍数，0为从左到右，90为从上到下
        android:centerX="float"         //渐变中心X的至关位置，范围为0～1
        android:centerY="float"         //渐变中心Y的至关位置，范围为0～1
        android:startColor="color"      //渐变开始点的颜色
        android:centerColor="color"     //渐变中间点的颜色，在开始与结束点之间
        android:endColor="color"        //渐变结束点的颜色
        android:gradientRadius="float"  //渐变的半径，只有当渐变类型为radial时才能使用
        android:useLevel=["true" | "false"] />  //使用LevelListDrawable时就要设置为true。设为false时才有渐变效果

    <padding    //内部边距
        android:left="dimension"
        android:top="dimension"
        android:right="dimension"
        android:bottom="dimension" />

    <size   //自定义的图形大小
        android:width="dimension"
        android:height="dimension" />

    <solid  //内部填充颜色
        android:color="color" />

    <stroke     //描边
        android:width="dimension"           //描边的宽度
        android:color="color"               //描边的颜色
        // 如下两个属性设置虚线
        android:dashWidth="dimension"       //虚线的宽度，值为0时是实线
        android:dashGap="dimension" />      //虚线的间隔
</shape>
```

## shape = ring 环

仅当 android:shape=“ring”

- android:innerRadius：环的内半径
- android:innerRadiusRatio：环内部的半径，以环宽度的比率表示。
  默认值是 5.
  内半径=环宽度/innerRadiusRatio。

  innerRadius 和 innerRadiusRatio 两个属性都是控制环的内半径，所以,要么都不指定，要么同时只指定一个；

- android:thickness ：环的厚度
- android:thicknessRatio ： 环的厚度，以环宽度的比率表示
  默认值为 3。
  环的厚度 = 环宽度/thicknessRatio。  
  thickness 和 thicknessRatio 两个属性都是控制环的厚度，所以,要么都不指定，要么同时只指定一个；

## shape = line

> A horizontal line that spans the width of the containing View. This shape requires the <stroke> element to define the width of the line.

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="line">
    <!-- android:width = line height -->
    <stroke
        android:width="50dp"
        android:color="@android:color/holo_red_dark" />

    <!-- padding 没有影响 -->
    <!--<padding-->
        <!--android:bottom="1dp"-->
        <!--android:left="1dp"-->
        <!--android:right="1dp"-->
        <!--android:top="1dp" />-->
</shape>
```

效果：实心/描边/渐变色

## shape = rectaglle 正方形或长方型

## shape = oval

view width == height? circle : oval

## 定义在`<shape> ` 中的 `<gradient>` Link [GradientDrawable](GradientDrawable.md)

# Refs:

- https://developer.android.google.cn/guide/topics/resources/drawable-resource.html#Shape
- https://developer.android.google.cn/reference/kotlin/android/graphics/drawable/ShapeDrawable?hl=en
- https://developer.android.google.cn/reference/android/graphics/drawable/GradientDrawable
- https://blog.csdn.net/north1989/article/details/52938619
- https://blog.csdn.net/notthin/article/details/121899183
