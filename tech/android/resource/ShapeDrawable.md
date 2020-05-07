# Shape Drawable
- GradientDrawable

- `<corners>`: only for rectangle shape

## shape = ring
- 

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"

    <!--
    android:shape="ring" = 环形
    android:innerRadius：Dimension，内半径。
    android:innerRadiusRatio：内半径，按比率计算。内半径 = width/该比率。被 android:innerRadius 覆盖
    android:thickness="10dp": 环的厚度
    android:thicknessRatio="10"： 环的厚度，按比率计算。环厚度 = width/该比率。被android:thickness覆盖
    android:useLevel : If LevelListDrawable使用时值为true，否则为false.  useLevel 需要设置为false
    -->
    android:innerRadius="20dp"
    android:innerRadiusRatio="5"
    android:shape="ring"
    android:thickness="10dp"
    android:thicknessRatio="10"
    android:useLevel="false">
    
    <solid android:color="@color/colorAccent" />

    <!--
    android:width:  起作用
    android:height：不起作用
    实际大小并不等于android:width，也不等于View的layout_width. 比设置的android:width/View layout_width小。
    android:width 作用是按比例约束内半径、厚度。
    Note: 
    The shape scales to the size of the container View proportionate to the dimensions defined here, by default. When you use the shape in an ImageView, you can restrict scaling by setting the android:scaleType to "center".
    <size
        android:width="@dimen/size_100"
        android:height="@dimen/size_100" />
</shape>
```

![shape_drawable_ring.jpg](https://yingvickycao.github.io/img/android/resources/shape_drawable_ring.jpg)

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
- gradient, corners, size, solid 不能用，否则不显示line
- padding 没有影响

## shape = oval
view width == height? circle : oval

# Refs:
- https://developer.android.google.cn/guide/topics/resources/drawable-resource.html#Shape
- https://developer.android.google.cn/reference/kotlin/android/graphics/drawable/ShapeDrawable?hl=en