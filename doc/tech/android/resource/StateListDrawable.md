# StateListDrawable

![StateListDrawable](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/resources/state_list_drawable.png)

- `<selector>`, not support attr
- 使用 android:color （Text Color）/ android:drawable(background/foreground/src) :指定颜色或 Drawable 对象。

# 1 State specs

| State specs(13)              | Desc                        |
| ---------------------------- | --------------------------- |
| android:state_pressed        | -                           |
| android:state_focused        | -                           |
| android:state_selected       | -                           |
| android:state_checkable      | -                           |
| android:state_checked        | -                           |
| android:state_enabled        | true=enabled,false=disabled |
| android:state_window_focused | -                           |
| android:state_activated      | -                           |
| android:state_active         | -                           |
| android:state_first          | -                           |
| android:state_middle         | -                           |
| android:state_last           | -                           |
| android:state_single         | -                           |

# 2 How to use selector

+-

## android:textColor

```
<Button android:textColor="@color/color_v1_2" />
```

- `/color/color_v1_2.xml`

```
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="?attr/color2" android:state_selected="true" />
    <item android:color="?attr/color2" android:state_pressed="true" />
    <item android:color="?attr/color2" android:state_focused="true" />
    <item android:color="?attr/color1" />
</selector>
```

- LinearLayout 中 Item View，不能使用`android:duplicateParentState="true"`，否则不能改变 bg 和 text color

TestLinearLayoutCannotChangeColorFragment.java

TestLinearLayoutCannotChangeColorFragment2.java

- ListView 中 Item View，能使用`android:duplicateParentState="true"`，  可以改变 bg 和 text color

## `android:background`

### Case 1 : use color

```
<Button android:background="@drawable/color_v2_in_drawable"/>
```

- `/drawable/color_v2_in_drawable.xml`

```
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/color_v2_enable_in_drawable" android:state_pressed="true" />
    <item android:drawable="@drawable/color_v2_enable_in_drawable" android:state_focused="true" />
    <item android:drawable="@drawable/color_v2_disable_drawable" />
</selector>
```

- `/drawable/color_v2_enable_in_drawable.xml`

```
<?xml version="1.0" encoding="utf-8"?>
<color xmlns:android="http://schemas.android.com/apk/res/android"
    android:color="?attr/color2" />
```

- `/drawable/color_v2_disable_drawable.xml`

```
<?xml version="1.0" encoding="utf-8"?>
<color xmlns:android="http://schemas.android.com/apk/res/android"
    android:color="?attr/color1" />
```

### Case 2 : use drawable

```
<Button android:background="@drawable/drawable_v2_2"/>
```

- `/drawable/drawable_v2_2.xml`

```
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/drawable_v2_2_enable_in_drawable" android:state_pressed="true" />
    <item android:drawable="@drawable/drawable_v2_2_enable_in_drawable" android:state_focused="true" />
    <item android:drawable="@drawable/drawable_v2_2_disable_drawable" />
</selector>
```

- `/drawable/drawable_v2_2_enable_in_drawable.xml`

```
<?xml version="1.0" encoding="utf-8"?>
<bitmap xmlns:android="http://schemas.android.com/apk/res/android"
    android:src="?attr/drawable2" />
```

- `/drawable/drawable_v2_2_disable_drawable.xml`

```
<?xml version="1.0" encoding="utf-8"?>
<bitmap xmlns:android="http://schemas.android.com/apk/res/android"
    android:src="?attr/drawable1" />
```

# 3 Selector state_enable

## android:textColor

`textview_color`

```
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="@color/textview_color_enable" android:state_enabled="true" />
    <item android:color="@color/textview_color_disable" android:state_enabled="false" />
</selector>
```

View 会随着点击变 颜色?

| 条件                                                                               | TextView | Button |
| ---------------------------------------------------------------------------------- | -------- | ------ |
| `android:textColor="@color/textview_color_enable"`                                 | 不会     | 会     |
| `android:textColor="@color/textview_color"` + java Source 设置 enable = true/false | 不会     | 不会   |

#### Case1：[textColor] button 初始状态为灰色*不可按。数据输入正确后，button 变为蓝色*可点击\_点击带 active 状态。

```
1. 初始，Java 设置 enable = false,color =  灰色
2. 数据输入正确后，Java 设置 enable = true,color = @color/textview_color_enable
```

## android:background

```
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/textview_bg_enable" android:state_enabled="true" />
    <item android:drawable="@drawable/textview_bg_disable" android:state_enabled="false" />
</selector>
```

View 会随着点击变 颜色?

| 条件                                                                                | TextView | Button |
| ----------------------------------------------------------------------------------- | -------- | ------ |
| `android:background="@drawable/textview_bg_enable"`                                 | 不会     | 会     |
| `android:background="@drawable/textview_bg"` + java Source 设置 enable = true/false | 不会     | 会     |

#### Case2：[background] button 初始状态为灰色*不可按。数据输入正确后，button 变为蓝色*可点击\_点击带 active 状态。

```
android:background="@drawable/textview_bg"
1. 初始，Java 设置 enable = false
2. 数据输入正确后，Java 设置 enable = true
```

# 4 Selector state_selected

-           | TextView          | Button
  --- |--- |---
  android:textColor | 切换颜色 | 切换颜色
  android:background | 切换颜色 | 切换颜色

## Case3: [textColor] download 可按，蓝色,不带 active 状态 -> downloaded，不可按，灰色

## Case4: [background] download 可按，蓝色,不带 active 状态 -> downloaded，不可按，灰色

# 5 Selector state_pressed

-           | TextView          | Button
  --- |--- |---
  android:textColor | 变动 | 变动
  android:background | 变动 | 变动

## Case5: [background] button 可按，蓝色,带 active 状态

# 6 ColorFilter

`TestColorFilterFragment.java`

# 7 android:tintMode

`TestTintFragment.java`

- 设置着色模式
- 开发中一般使用默认 src_in。

```
multiply
screen
src_in(默认)
src_over
src_atop
add
```

## test result for tint vs ColorFilter

| Method           | SVG                          | PNG                  |
| ---------------- | ---------------------------- | -------------------- |
| setColorFilter() | 不影响其他 ImageView         | 不影响其他 ImageView |
| setTint()        | 有时其他 ImageView，一块变色 | 不影响其他 ImageView |

- tint can XML, ColorFilter can not.

## Drawable.setColorFilter() vs Drawable.setTint()

- `BlendModeColorFilter` <-> `BlendMode`.
- `PorterDuffColorFilter` <-> `PorterDuff.Mode`

| Tint / ColorFilter                                                     | Modle                                 |
| ---------------------------------------------------------------------- | ------------------------------------- |
| void setTintMode (PorterDuff.Mode tintMode)                            | PorterDuff.Mode                       |
| void setTintBlendMode (BlendMode blendMode)                            | BlendMode                             |
| void setTint (int tintColor)                                           | PorterDuff.Mode                       |
| void setTintList (ColorStateList tint)                                 | PorterDuff.Mode                       |
| void setColorFilter (int color,PorterDuff.Mode ) (Depressed in API 29) | PorterDuff.Mode                       |
| void setColorFilter (ColorFilter colorFilter)                          | API>=29 ? BlendMode : PorterDuff.Mode |

## PorterDuff.Mode vs BlendMode

### PorterDuff.Mode

https://developer.android.google.cn/reference/android/graphics/PorterDuff.Mode

- Added in API level 1
- `Compositing Digital Images` - Thomas Porter`and`Tom Duff - 12 operators for alpha compositing modes。 PorterDuff.Mode 与次类似，同时支持 alpha 和 非 alpha,>= 12

Refs:

- https://www.jianshu.com/p/134cd2dbb43b
- https://www.jianshu.com/p/9cae2250d0ed

### BlendMode

https://developer.android.google.cn/reference/android/graphics/BlendMode

- Added in API level 29
- PhotoShop 等图形软件混合模式

## Use `android:Tint` to change icon color?

- 适用  
  ① 对同一个图片修改图片填充颜色。  
  ② 用一套 icon 来 theme  
  ③ 适合透明 icon，不适合非透明，否则图案消失，color 全色。
- vector 也适用
- `android:tint` must use color, not drawable

```xml
 <ImageView
    android:layout_width="50dp"
    android:layout_height="50dp"
    android:src="@drawable/ic_adjust_black_18dp"
    android:tint="@color/colorAccent"               // ✓
    android:tint="@drawable/ic_home_black_24dp"     // ✗
/>
```

- Button icon color is hilight with state_selected  
  e.g. , Click Download(blue) -> Downloaded(grey)

```
 /**
    * android:tint="@color/menu_icon_color" 改变menu color?
    * API 21    Android 5.0      ✗
    * API 22    Android 5.1      ✗
    * API 23    Android 6.0      ✓
    * API 24    Android 7.0      ✓
    * API 25    Android 7.1      ✓
    * API 26    Android 8.0      ✓
    * API 27    Android 8.1      ✓
    * API 28    Android 9.0      ✓
    */
```

```xml
<!-- res/color/menu_icon_color.xml  -->
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="?attr/color1" android:state_selected="true" />
    <item android:color="?attr/color2" />
</selector>
```

```xml
<ImageView
    android:id="@+id/svg"
    android:layout_width="50dp"
    android:layout_height="50dp"
    android:background="@null"
    android:tint="@color/menu_icon_color" />
```

- When enabled, Button icon color is highlight when pressed. When disable, icon is disable color.  
  e.g., Video controll bar.  
  When Play is enable, press Play, Play icon color = (link_0 -> link_0_active).  
  When disable,Play =(can not be pressed + grey)

```xml
<!-- res/color/color_v3.xml  -->
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="?attr/textDisable" android:state_enabled="false" />
    <item android:color="?attr/link_0" android:state_pressed="false" />
    <item android:color="?attr/link_0_active" android:state_focused="true" />
    <item android:color="?attr/link_0_active" android:state_selected="true" />
    <item android:color="?attr/link_0_active" android:state_pressed="true" />
    <item android:color="?attr/link_0" android:state_enabled="true" />
</selector>
```

```xml
<!--  ImageButton               ✔  -->
<!--  ViewGroup(ImageView)      ✔ -->
<!--  ImageView                 ✗  -->
<!--  ImageView with android:clickable="true"  ✔ -->

<!--  layout/res/tint -->
<ImageButton
    android:src="@drawable/drawable_vector_add"
    android:id="@+id/svg2"
    android:layout_width="50dp"
    android:layout_height="50dp"
    android:background="@null"
    android:tint="@color/color_v3" />
```

- ImageView 必须设置 clickable，selector 才会生效

Ref:

- https://blog.csdn.net/mp624183768/article/details/78559329
- https://blog.csdn.net/smile_running/article/details/81223260
- https://blog.csdn.net/new_one_object/article/details/54968653
