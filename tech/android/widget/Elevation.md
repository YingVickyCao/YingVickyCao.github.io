# Elevation

# 1 `android:elevation + android:translationZ`

```
Z = 0,没有阴影
Z < 0,在上一个控件下方
Z > 0,有阴影
```

Z 轴:垂直于屏幕的轴，Z 轴会让 View 产生阴影的效果.

- 视图控件的整个高度值是 Z 数值决定
- 阴影是 Z 轴属性(elevation、translationZ)决定的. Z 值越大，阴影范围越大
  想象有一束斜光投向屏幕，Z 轴值越大，离光就越近，阴影的范围就越大；Z 轴值越小，离光就越远，阴影的范围就越小。
- 在 Z 轴方向，Z 数值从高到底，最高值在屏幕最上面。

- 官方解释
  `android:elevation` : Resting elevation. default value (2dp)  
  `android:translationZ` : dynamic elevation offsets (6dp) .Z 轴方向的相对值.
  Upon user input, this button increases its elevation from 2dp to 8dp

Link [KeyBoard.md](KeyBoard.md)

# 2 Elevation

Elevation is the relative distance between two surfaces along the z-axis.

## Depicting elevation

### Surface edges

- Shadow (Default)  
  Material Design displays elevation using shadows.  
  ![Depicting_elevation_by_shadow](https://yingvickycao.github.io/img/Depicting_elevation_by_shadow.png)

- Giving surfaces different colors
- Giving surfaces different opacities  
  ![Depicting_elevation_4_Surface_edges](https://yingvickycao.github.io/img/Depicting_elevation_4_Surface_edges.png)

### Surface Overlap

![Depicting_elevation_4_Surface_Overlap](https://yingvickycao.github.io/img/Depicting_elevation_4_Surface_Overlap.png)

> 1. Shadows show surface edges, surface overlap, and the degree of elevation
> 2. Different surface colors show surface edges and overlap, but not the degree of elevation.
> 3. Opacity shows surface edges and overlap, but not the degree of elevation.

### Distance

The degree of elevation difference between surfaces can be expressed using scrimmed backgrounds, or using shadows.

- Scrimmed backgrounds  
  ![depicting-elevation_Distance_4_Scrimmed_backgrounds](https://yingvickycao.github.io/img/depicting-elevation_Distance_4_Scrimmed_backgrounds.png)

- Shadows

![depicting-elevation_Distance_4_Shadows](https://yingvickycao.github.io/img/depicting-elevation_Distance_4_Shadows.png)

> Shadows make differences in surface elevation perceptible. The smaller, sharper shadow of the app bar (1) indicates it is at a lower elevation than the menu (2), which has a larger, softer shadow.

## [Default elevations](https://material.io/design/environment/elevation.html#default-elevations)

| Component                            | Default elevation values (dp) |
| ------------------------------------ | ----------------------------- |
| Dialog                               | 24                            |
| Bottom navigation bar                | 8                             |
| Bottom app bar                       | 8                             |
| Top app bar (scrolled state)         | 4                             |
| Top app bar (resting elevation)      | 0 or 4                        |
| Contained button (resting elevation) | 2                             |
| Switch                               | 1                             |
| Text button                          | 0                             |
| button                               | 2dp to 8dp                    |

Resting elevation

Upon user input, this button increases its elevation from 2dp to 8dp

# 3 Shadow

- What is Shadows?  
  Shadows in the Material environment are cast by a key light and ambient light.  
  In the Material Design environment, virtual lights illuminate the UI.  
  `Key lights` create sharper, directional shadows, called key shadows.  
  `Ambient light` appears from all angles to create diffused, soft shadows, called ambient shadows.  
  ![Depicting_elevation](https://yingvickycao.github.io/img/Depicting_elevation.png)

- Light sources  
  In Android and iOS development, shadows occur when light sources are blocked by Material surfaces at various positions along the `z-axis`.

- Shadow size  
  ![shadow_size](https://yingvickycao.github.io/img/shadow_size.png)

# 3 How to add shadow for a view

`TestShadowViewFragment.java`

| Add shadow                            | API              | Change Degress | Change Color | Change Offset |
| ------------------------------------- | ---------------- | -------------- | ------------ | ------------- |
| .9.png                                |                  | Yes            | Yes          | Yes           |
| android:elevation                     |                  | Yes            | No           | No            |
| TranslateZ                            |                  | Yes            | No           | No            |
| ShadowLayer                           |                  | Yes            | Yes          | Yes           |
| Material                              |                  | Yes            | No           | No            |
| ~~layer-list~~                        |                  | -              | -            | -             |
| ~~android:outlineAmbientShadowColor~~ | Android >=10(29) | No             | No           | No            |
| MaterialShapeDrawable                 |                  | TBD            | TBD          | TBD           |

## 使用 9 图

[Android 9-patch shadow generator](http://inloop.github.io/shadow4android/)

theme switch Image:
round = 0  
 blur = 4;  
 color = rgba(0,0,0,0.15)  
 offset x = 0, y = 2

实际对应：参数 X 2

## layer-list

很不像 shadow，像 border

## Use ShadowLayer in 自定义 View

```java
// draws a shadow layer below the main layer
Paint.setShadowLayer(float radius, float dx, float dy, int shadowColor)
参数：radius 阴影的扩散半径
dx 阴影 X 方向偏移
dy 阴影 Y 方向偏移
color 阴影颜色
```

Use `ShadowedViewGroup.java` to wrapper shadowe view.

优点：  
能修改 shadow 颜色

缺点：  
适合包装一个 child。  
radius 越大，圆角越明显。When radius = 0, no shadow.

## TranslateZ use animation

Z=elevation+ translationZ 中 translateZ 是动态的。点击按钮时有突出的效果。

![shadow_use_translateZ_animation](https://yingvickycao.github.io/img/shadow_use_translateZ_animation.webp)

```xml
// res/animator/objectAnimator drawable
android:stateListAnimator="@animator/shadow_3"
```

缺点：  
适合可点击的 widget, e.g, Button, ImageButton。  
不能更改 shadow 颜色

## OutlineProvider

ImageView 没有效果  
 Button 默认 bg color，有 shadow，但四边多了留白。可移除留白。  
 Button set bg color，shadow 没有增加，高和宽变大.

缺点：  
 不适合所有 widget  
 移除留白的代码，不一定适合所有机型。

## `android:elevation`

## Material 组件 TBD

material 组件使用 MaterialShapeDrawable 实现 shadow。
ActionBar、CardView，FloatingActionButton 带阴影。

缺点：  
 不能指定 shaodw color  
 不能指定阴影偏移量

## MaterialShapeDrawable TBD

## android:outlineAmbientShadowColor,android:outlineSpotShadowColor

Android >=10(29)  
基本上看不到颜色

测试中 shadow 没有效果

# Refs

https://material.io/design/environment/elevation.html  
https://material.io/design/environment/light-shadows.html  
https://github.com/material-components/material-components-android  
https://www.jianshu.com/p/aea0c4c6ceb6  
https://www.jianshu.com/p/9b5d111aa306  
https://blog.octo.com/en/android-materialshapedrawable/  
https://blog.csdn.net/jakezhang1990/article/details/79425879  
剪裁轮廓 https://www.cnblogs.com/guanxinjing/p/11151036.html
https://developer.android.google.cn/reference/android/view/ViewOutlineProvider?hl=zh-cn
https://developer.android.google.cn/training/material/shadows-clipping
