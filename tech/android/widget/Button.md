# Button

# Content

## Material Design 主题中 button 的效果：底部有阴影，单击时有水波涟漪效果

API >= 21

### 阴影

Link [Elevation.md](Elevation.md)

- 阴影的颜色是默认，没有找到 API 修改

#### `android:elevation`

`android:elevation` 值决定了阴影大小

#### `android:stateListAnimator`

`android:stateListAnimator` 决定底部是否有阴影

### 水波涟漪效果

android:background（RippleDrawable）决定水波涟漪效果。

#### 带约束的 ripple

```
<?xml version="1.0" encoding="utf-8"?>
<ripple xmlns:android="http://schemas.android.com/apk/res/android"
    android:color="@color/ripple_material_light_app">
    <!--android:color="?android:attr/colorControlHighlight">-->

    <item android:drawable="@drawable/btn_default_mtrl_shape" />
</ripple>
```

- android:color : 单击 button 后水波涟漪效果的颜色
- item 的 Drawable: 是涟漪效果的范围，也是背景。  
  涟漪效果会展示在该 Drawable 之上.  
  shape 属性是可以兼容的，并且涟漪的显示效果会因为 Drawable 的不同而不同.  
  约束必须设置一个 item 的背景，该背景色是真实存在的，并且涟漪效果会受到该背景色的影响而不同:背景色和涟漪色对比越大，背景色颜色越深，涟漪效果越明显.  
  当背景为透明时涟漪效果不能显示.

#### 不带约束的 ripple

```
<?xml version="1.0" encoding="utf-8"?>
<ripple xmlns:android="http://schemas.android.com/apk/res/android"
    android:color="@color/ripple_material_light_app" />
```

- 涟漪可以超出当前设置的 View 进行展示，整个涟漪其实会显示成一个逐渐放大的园，最大为当前布局的父容器边界
- 不带背景色 => 不带阴影 + 带无边界水波

#### 带对比色的 ripple

```
<?xml version="1.0" encoding="utf-8"?>
<ripple xmlns:android="http://schemas.android.com/apk/res/android"
    android:color="@color/ripple_material_light_app">
    <!--android:color="?android:attr/colorControlHighlight">-->

    <item
        android:id="@android:id/mask"
        android:drawable="@drawable/btn_default_mtrl_shape" />
</ripple>
```

- 背景不是真实可见的，只是起到范围约束和涟漪效果影响的功能，在触发涟漪之前不会被显示出来。并且可以和普通的背景搭配使用，也就是普通的背景用于视图的显示，这种背景用于约束涟漪效果。

### Summary

```
1）android:stateListAnimator="@null" -> android:elevation无效:底部无阴影
2）android:stateListAnimator="@animator" -> android:elevation有效:底部阴影，阴影变高
3）android:background（RippleDrawable 没有<Item> 背景)时 -> 没有背景色：
没有背景 -> 没有阴影，点击带水波
4）android:background（RippleDrawable 带有 <Item> 背景)时：
有背景->有阴影，点击带水波

因此：
带阴影的条件：
android:stateListAnimator="@animator" &&  android:background（RippleDrawable 带有 <Item> 背景)

带水波的条件：
android:background（RippleDrawable 带有 <Item> 背景)

```

## `android:foreground` vs `android:backgroud`

`android:foreground`:

- 前景色。它指定的 drawable 在 View 的上方绘制的。
- 做透明遮罩层
- When >= Android 6.0(23) , View support.
- When < Android 6.0(23) , Only FrameLayout support.

## Tint in Button

### `android:backgroundTint` and `android:backgroundTintMode`

Use `android:backgroundTint` and `android:backgroundTintMode`仅仅修改背景色，其他例如水波效果等不变

### `android:foregroundTint` and `android:foregroundTintMode`

设置无效

### `android:drawableTint` and `drawableTintMode`

设置无效

## 避免在 EditText 中验证日期，把 Button 控件默认背景修改为 EditText 的背景。

方法：直接在 xml 中进行设置，为 Button 添加 android:background 属性，值为：@android:drawable/edit_text。当用户选择一个日期后，该日期的文本会被设置到 Button 上显示出来。

- 在这里直接使用了 Android 内置资源，但也是有利有弊的：  
  利：可以使应用程序更好的适应不同设备。  
  弊：因为系统的版本不同，所以会导致应用程序在不同设备上的用户体验也不同。

- 在这里最好不要直接把监听事件设置在 EditText 上。
- 为什么不直接 EditText 设置一个点击监听器，而非使用 Button？  
  目的是使用 Button 更安全，因为用户无法修改 Button 的文本内容。  
  如果使用 EditText，并且设置了点击监听器，用户可以通过光标获取该控件的焦点，绕过 DatePicker 空间直接修改 EditText 的文本内容。

- 也可以用 TextWatcher 验证 EdiText 中的用户输入信息，但这种方法很麻烦且耗时。

## Bg

1）选择状态的背景  
 2）圆角的背景 `ShapeDrawable`  
 3）使用.9 patch 图片作为背景

## Android button 有 3 种状态：Disable、正常、按下

```xml
 <Button
    android:background="@drawable/xml_btn_bg"
    android:textColor="@color/XXXXX"
    android:enabled="false" />
```

```xml
<!-- xml_btn_bg  -->
<?xml version="1.0" encoding="UTF-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Pressed   -->
    <item android:drawable="@android:color/holo_red_light" android:state_enabled="true" android:state_pressed="true" />
    <!-- Android 中有focus 状态。但通常情况下看不出效果. 模拟器按上下键有效果  -->
    <item android:drawable="@android:color/holo_green_light" android:state_enabled="true" android:state_focused="true" />
    <!-- Android 中有hover 状态。但通常情况下看不出效果   -->
    <item android:drawable="@android:color/holo_blue_bright" android:state_enabled="true" android:state_hovered="true" />
    <!-- Default   -->
    <item android:drawable="@android:color/holo_orange_dark" android:state_enabled="true" />
    <!-- Disable   -->
    <item android:drawable="@android:color/darker_gray" android:state_enabled="false" />
</selector>
```

- 使用场景

| Type         | Widget                                          |
| ------------ | ----------------------------------------------- |
| Text         | Button                                          |
| Image        | ImageButtom :图不会变形，等比例                 |
| Text + Image | Button : 图会变形；图在最左边，无法实现实现居中 |

# Refs：

- https://blog.csdn.net/ccw0054/article/details/72845347
- https://www.jianshu.com/p/c1d17a39bc09
- https://www.cnblogs.com/plokmju/p/7766076.html
- 小 Demo 小知识-`android:foreground`与`android:backgroud` htts://www.jianshu.com/p/b5ecd39ed494
- http://blog.csdn.net/hzc_01/article/details/50093989
