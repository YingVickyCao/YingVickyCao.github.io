# Android Resources

# 源代码

## XML

## Java

常量

1. 魔法数值:↓ 可维护性
2. 类常量:↑ 可维护性
3. resource:= 常量  
   优化:R.java,类常量,可维护性

# res

## 访问

### Java

- 实际资源对象

```
getResource.getXXX(int id)
getResources().openRawResource(int id)
```

- int id:  
  通过 R.java 访问

```
[package_name:]R.resource_type.resource_name

R.color.red
android:R.color.black
```

### XML

```
@[package_name:]resource_type/resource_name

@color/red
@android:color/black
```

# Type

## array(数组）

- array(普通数组）:TypedArray
- plurals
- string-array
- interger-array

## menu

## dimen(尺寸)

`/res/values/dimens.xml`

## bool

```
/res/values/bools.xml
```

## integer

`/res/values/integer.xml`

## drawable

`/res/drawable`

### 位图

#### 文件夹

```
/res/drawable(default drawable-mdpi)
/res/drawable-mdpi
/res/drawable-ldpi
/res/drawable-hdpi
/res/drawable-nohpi
/res/drawable-xhpi
/res/drawable-xxhpi
/res/drawable-xxxhpi
```

#### 种类

1. .png
2. [.9.png](点9图.md)

- NinePatchDrawable
- stretchable
- with = height = wrap_content
- bg for button
- 1-pixel border

3. .jpg  
   对应非透明的大图，JPG 比 PNG 小，通常会减少到一半以上
4. .gif
5. .webP

### XMl drawable

`/res/drawable`

#### 种类

1. BitmapDrawable

2. NinePatchDeawable

```xml
<nine-patch xmlns:android="http://schemas.android.com/apk/res/android"
    android:dither="false"
    android:src="@drawable/shadow_3"
    android:tint="@color/light_s_0" />
```

3. StateListDrawable:  
   作为背景、前景  
   随状态改变

4. ShapeDrawable

5. AnimationDrawable

6. LayerDrawable

7. Drawable 的其他各种子类的对象

8. ClipDrawable

## style（样式）

`/res/values/`

## Theme（主题）

`/res/values/`

切换 theme

- 定义颜色 attr
- 在 theme style 中使用 attr 设置背景颜色
- 选中颜色后，使用 TaskStackBuilder 重启 started 的 activities

## Attribute （属性）

`/res/values/`

种类

- attr
- declare-styleable:int []

## font （字体）

`/res/font/`
