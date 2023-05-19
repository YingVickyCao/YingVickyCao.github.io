# ScaleDrawable

`TestScaleDrawableFragment.java`

```xml
<?xml version="1.0" encoding="utf-8"?>
<scale xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@drawable/ic_launcher_origin"
    android:level="1"
    android:scaleWidth="50%"
    android:scaleHeight="50%"
    android:scaleGravity="bottom" />
<!-- 默认 android:level="0"  -->
```

# 属性

- android:drawable Drawable 资源。必须的。引用一个 drawable 资源。
- android:scaleHeight 缩放的高度（百分比）。E.g.,100%，12.5%。
- android:scaleWidth 缩放的宽度.同 scaleHeight。
- android:scaleGravity 指定缩放后的 gravity 的位置。必须是下面的一个或多个值（多个值之间用”|”分隔）
  （1）top /bottom/left(默认值)/right/center_vertical/center_horizontal/center：  
  将这个对象放在容器的位置，不改变其大小。  
  （2）fill_vertical/fill_horizontal/fill：  
  在某个方向增长图像，以填充容器的垂直方向/水平方向/整个容器。  
  （3）clip_vertical : **TODO**: 没有看出效果
  当对象边缘超出容器的时候，将上下边缘超出的部分剪切掉，剪切基于纵向对齐设置：顶部对齐时，剪切底部；底部对齐时剪切顶部；除此之外剪切顶部和底部.  
  （4）clip_horizontal: **TODO**: 没有看出效果
  与 clip_vertical 相似，只是剪辑是基于水平 gravity。

# FAQ

- 图片不显示。
  没有 setLevel()时，默认 getLevel()都是 0.  
  level 为 0，不可见。
  level 为 1，可见，放缩。
  level 为 10000 时，可见，不缩放。

ScaleDrawable 作为 bg 时，

```xml
<!-- drawable中 android:level="0" -->
<!-- 图片不显示。 -->
<androidx.appcompat.widget.AppCompatImageView
    android:layout_width="96dp"
    android:layout_height="96dp"
    android:background="@drawable/drawable_scale_level_0" />

<!-- scale drawable 作为 bg： drawable中 设置 android:level="1"，图片显示              -->
<androidx.appcompat.widget.AppCompatImageView
    android:layout_width="96dp"
    android:layout_height="96dp"
    android:background="@drawable/drawable_scale_level_1" />

 <!-- scale drawable 作为 bg： drawable中 设置 android:level="10000"，图片显示，并且不放缩              -->
<androidx.appcompat.widget.AppCompatImageView
    android:layout_width="96dp"
    android:layout_height="96dp"
    android:background="@drawable/drawable_scale_level_10000" />
```

ScaleDrawable 作为 src 时，

```xml
<!-- drawable中 android:level="0" -->
<!-- 图片不显示。 -->
<androidx.appcompat.widget.AppCompatImageView
    android:layout_width="96dp"
    android:layout_height="96dp"
    android:src="@drawable/drawable_scale_level_0" />

<!--scale drawable 作为 src： 设置 imageviewLevel.setImageLevel(1)，图片显示              -->
<androidx.appcompat.widget.AppCompatImageView
    android:id="@+id/imageviewLevel"
    android:layout_width="96dp"
    android:layout_height="96dp"
    android:src="@drawable/drawable_scale_level_1" />

<!--scale drawable 作为 src： 设置 imageviewLevel.setImageLevel(10000)，图片显示,并且不放缩   -->
<androidx.appcompat.widget.AppCompatImageView
    android:id="@+id/imageviewLevel_10000"
    android:layout_width="96dp"
    android:layout_height="96dp"
    android:src="@drawable/drawable_scale_level_10000" />
```

```java
ScaleDrawable drawable = (ScaleDrawable) imageviewLevel.getDrawable();
drawable.setLevel(1);
```

/

```java
imageviewLevel.setImageLevel(1); // 它的Drawable 是 ScaleDrawable

// ImageView.java
public void setImageLevel(int level) {
    mLevel = level;
    if (mDrawable != null) {
        // 最终调用的是ScaleDrawable的setLevel（）
        mDrawable.setLevel(level);
        resizeFromDrawable();
    }
}
```

# Ref

http://www.javashuo.com/article/p-oktdlftj-a.html  
https://developer.android.google.cn/guide/topics/resources/drawable-resource#Scale
