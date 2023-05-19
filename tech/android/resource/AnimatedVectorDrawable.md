# 矢量图动画-AnimatedVectorDrawable

`TestAnimatedVectorDrawableFragment.java`

# 1 AnimatedVectorDrawable

![animated_vector_drawable_1](https://yingvickycao.github.io/img/android/resources/animated_vector_drawable_1.gif)

Step 1 : 导入 svg 图片,设置 path 的 name

```xml
<!-- ic_svg_menu.xml -->
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="200dp"
    android:height="200dp"
    android:viewportWidth="100"
    android:viewportHeight="100">
    <group>
        <path
            android:name="path1"
            android:fillColor="#0000"
            android:pathData="M20,20L80,20"
            android:strokeWidth="5"
            android:strokeColor="@android:color/holo_green_dark"
            android:strokeLineCap="round" />
        <path
            android:name="path2"
            android:fillColor="#0000"
            android:pathData="M20,50L80,50"
            android:strokeWidth="5"
            android:strokeColor="@android:color/holo_red_dark"
            android:strokeLineCap="round" />
        <!--        android:strokeLineCap="square"-->
        <path
            android:name="path3"
            android:fillColor="#0000"
            android:pathData="M20,80L80,80"
            android:strokeWidth="5"
            android:strokeColor="@android:color/holo_blue_dark"
            android:strokeLineCap="round" />
    </group>
</vector>
```

step 2 : 为 svg 创建 `animated-vector` drawable

```xml
<!-- ic_svg_menu_anim_vector_menu.xml -->
<<?xml version="1.0" encoding="utf-8"?>
<animated-vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@drawable/ic_svg_menu">

    <!-- target的name与svg的pathname 对应   -->
    <target
        android:name="path1"
        android:animation="@animator/anim_menu_path_1" />

    <target
        android:name="path3"
        android:animation="@animator/anim_menu_path_3" />
</animated-vector>
```

```xml
<!-- anim_menu_path_3.xml -->
<objectAnimator xmlns:android="http://schemas.android.com/apk/res/android"
  android:duration="500"
  android:propertyName="pathData"
  android:valueFrom="M20,80L80,80"
  android:valueTo="M50,80L80,50"
  android:valueType="pathType" />

<!--
duration：       动画持续时间
propertyName：   选择控制svg 的path-pathData属性
valueFrom ：     开始位置, 与svg 的path3的pathData对应
valueTo ：       结束位置
valueType ：     告诉系统进行pathData变换:进行形状、位置变化。
 -->
```

```xml
<!-- anim_menu_path_1.xml -->
anim_menu_path_1.xml与 anim_menu_path_3.xml类似
<objectAnimator xmlns:android="http://schemas.android.com/apk/res/android"
  android:duration="500"
  android:propertyName="pathData"
  android:valueFrom="M20,20L80,20"
  android:valueTo="M50,20L80,50"
  android:valueType="pathType" />
```

step 3: 使用 `animated-vector` drawable

```xml
<ImageView
  android:src="@drawable/ic_svg_menu_anim_vector_menu" />
```

## 注意点

- 动画里的 valueFrom 是从 vector 里拷贝出来的, 告诉动画从这里开始变. 如果不写, 执行时间会不准, 速度会快很多。
