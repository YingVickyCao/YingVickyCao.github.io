# BitmapDrawablea

TestBitmapDrawableFragment.java  
`TestTintFragment.java`

```xml
drawable_bitmap_home.xml
<?xml version="1.0" encoding="utf-8"?>
<bitmap xmlns:android="http://schemas.android.com/apk/res/android"
    android:antialias="true"
    android:dither="true"
    android:filter="true"
    android:gravity="clip_vertical"
    android:mipMap="false"
    android:alpha="0.5"
    android:tint="@android:color/holo_red_dark"
    android:tintMode="multiply"
    android:autoMirrored="true"
    android:src="@drawable/ic_home_png"
    android:tileMode="repeat"/>

<!--    android:gravity="center"-->
<!--    android:gravity="clip_horizontal"-->
<!--    android:gravity="clip_vertical"-->

```

- Bitmap File
  .png, .webp, .jpg, or .gif

- 在 res 资源文件夹  
  同样的图片放在不同像素密度 folder 的情况下 size 不同

```

int scale = sdensity/indensity
size = (width * scale) * (height * scale)

其中，
sdensity = 机器像素密度
indensity = indensity由图片所在的文件夹决定（例如在drawable-mdpi下的 indensity=160）。
```

- 不在 res 资源文件夹  
  默认生成的 Bitmap 像素跟原图片的像素一样.  
  通过优化措施缩小生成的 BitmapDrawable

- 属性

| 属性                                             | 说明                                                                                                                                                                                                                                                                       |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| antialias                                        | 抗锯齿                                                                                                                                                                                                                                                                     |
| dither                                           | 是否开启抖动效果                                                                                                                                                                                                                                                           |
| mipMap                                           | 是否将图片标记为 mipmap，使用 mipmap 能够提高显示性能，默认为 false                                                                                                                                                                                                        |
| gravity                                          | src 在它内部的对齐方式。与 tileMode 互斥。<br/>fill - 充满容器，和 tileMode=”disable”是一个效果<br/>fill_vertical - 充满垂直方向。<br/>fill_horizontal - 充满水平方向<br/>clip_horizontal - 水平方向剪裁，很少使用。<br/>clip_vertical - 垂直方向剪裁，很少使用。斥。<br/> |
| fill - 充满容器，和 tileMode=”disable”是一个效果 |
| fill_vertical - 充满垂直方向。                   |
| fill_horizontal - 充满水平方向                   |
| clip_horizontal - 水平方向剪裁，很少使用。       |
| clip_vertical - 垂直方向剪裁，很少使用。"        |
| tileMode                                         | 与 gravity 是互斥的。对应于 Shader.TileMode。<br/>diable - 图片会根据容器大小进行缩放。默认值<br/>repeat - 重复<br/>mirror - 镜面反射<br/>clamp - 图片四周像素扩散                                                                                                         |
| diable - 图片会根据容器大小进行缩放。默认值      |
| repeat - 重复                                    |
| mirror - 镜面反射                                |
| clamp - 图片四周像素扩散"                        |
| src                                              | 图片资源                                                                                                                                                                                                                                                                   |
| android:autoMirrored                             | 是否将 drawable 镜像显示，只有在从右往左布局的环境下才会生效                                                                                                                                                                                                               |
| tint                                             | 着色。即设置最终渲染的颜色                                                                                                                                                                                                                                                 |
| tintModule                                       | 着色模式                                                                                                                                                                                                                                                                   |
| alpha                                            | 透明度，0 ～ 1。 0 为全透明                                                                                                                                                                                                                                                |
| filter                                           | 开启或关闭滤镜。当需要对图片进行缩放操作时，开启滤镜可以使图片更加平滑                                                                                                                                                                                                     |

# 1 android:tileMode

| tileMode 值 | 效果                                                                               |
| ----------- | ---------------------------------------------------------------------------------- |
| clamp       | 当图片>容器时，图片多余的部分会被截去；当图片<容器时，会复制图片的边缘部分填充空白 |
| disable     | 图片会根据容器大小进行缩放。这是默认值                                             |
| repeat      | 图片会重复填充满容器。但是当图片>容器时，多余部分会被截去                          |
| mirror      | 图片会以镜像重复的形式填满容器。同样，当图片>容器时，多余部分会被截去              |

# 2 android:tint、android:tintMode

`TestTintFragment.java`

- 设置着色模式
- 开发中一般使用默认 src_in。
- API 21 以及更高。使用兼容包可以兼容 `API < 21`

```
multiply
screen
src_in(默认)
src_over
src_atop
add
```

- Tint 在较低对系统版本无法支持，需要使用相应的 Compact 类
- tint 属性对应关系
  | tint 属性 | Widget-着色对象 | 对应函数 |
  |----------------------------|-------------------------------------|----------------------------------------------------------------------|
  | android:tint | ImageView-mDrawable 内容图片 | void setImageTintList(@Nullable ColorStateList tint) |
  | android:tintMode | ImageView-mDrawable 内容图片 | void setImageTintMode(@Nullable PorterDuff.Mode tintMode)； |
  | android:backgroundTint | View-mBackground(背景图) | void setBackgroundTintList(@Nullable ColorStateList tint) |
  | android:backgroundTintMode | View-mBackground(背景图) | void setBackgroundTintMode(@Nullable PorterDuff.Mode tintMode) |
  | android:foregroundTint | View-mForegroundInfo.mDrawable(前景图) | void setForegroundTintList(@Nullable ColorStateList tint) |
  | android:foregroundTintMode | View-mForegroundInfo.mDrawable(前景图) | void setForegroundTintMode(@Nullable PorterDuff.Mode tintMode) |
  | android:drawableTint | TextView-mDrawables(TextView 上下左右图) | void setCompoundDrawableTintList(@Nullable ColorStateList tint) |
  | android:drawableTintMode | TextView-mDrawables(TextView 上下左右图) | void setCompoundDrawableTintMode(@Nullable PorterDuff.Mode tintMode) |

| Tint                                                            | 原理 或 Mode    |
| --------------------------------------------------------------- | --------------- |
| void setTintMode (PorterDuff.Mode tintMode)                     | PorterDuff.Mode |
| void setTintBlendMode (BlendMode blendMode)                     | BlendMode       |
| void setTint (int tintColor) : 设置单个颜色                     | PorterDuff.Mode |
| void setTintList (ColorStateList tint) : 设置一组 selector 颜色 | PorterDuff.Mode |

- 适用  
  ① 对同一个图片修改图片填充颜色。  
  ② 用一套 icon 来 theme  
  ③ 适合透明的单色 icon，不适合非透明，否则图案消失，color 全色。
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

```xml
<ImageView
    android:id="@+id/svg"
    android:layout_width="50dp"
    android:layout_height="50dp"
    android:background="@null"
    android:tint="@color/menu_icon_color" />
```

- ting 结合 alpha
  在 View 的 android:tint 设置 aplha，不要在 svg 的 android:tint 设置 aplha。

```java
<!-- ✔ alpha 0.9 （Recommend）-->
<ImageView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:src="@drawable/ic_svg_add"
    android:tint="#E6FF0000" />
```

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

# 3 ColorFilter

`TestColorFilterFragment.java`

| ColorFilter                                                            | 原理 或 Mode                          |
| ---------------------------------------------------------------------- | ------------------------------------- |
| void setColorFilter (int color,PorterDuff.Mode ) (Depressed in API 29) | PorterDuff.Mode                       |
| void setColorFilter (ColorFilter colorFilter)                          | API>=29 ? BlendMode : PorterDuff.Mode |

- `BlendModeColorFilter` <-> `BlendMode`.
- `PorterDuffColorFilter` <-> `PorterDuff.Mode`

# 4 android:tint vs ColorFilter

`TestColorFilterFragment.java`

- tint can XML, ColorFilter can not.
- test result of Drawable.setColorFilter() and Drawable.setTint()

| Method                    | SVG                          | PNG                  |
| ------------------------- | ---------------------------- | -------------------- |
| Drawable.setColorFilter() | 不影响其他 ImageView         | 不影响其他 ImageView |
| Drawable.setTint()        | 有时其他 ImageView，一块变色 | 不影响其他 ImageView |

ContextCompat : supports 7+，使用当前主题  
ResourcesCompat: support 4+, 使用自定义主题
AppCompatResources ：内部调用 ContextCompat  
https://blog.csdn.net/weixin_34114823/article/details/85950400

FAQ : 两个 ImageView 使用同一个资源，对一个 ImageView 使用 Drawable.setTint() 来改变颜色，另一个 ImageView 的图片 颜色也变了？  
<br/>

Reason：  
 Android 系统为了减少内存消耗，将应用中所用到的相同 drawable （可以理解为相同资源）共享同一个 state，并称之为 constant state。

图示：两个 View 加载同一个图片资源，创建两个 drawables 对象，但是共享同一个 constant state 的场景.

![Drawable_ConstantState_1](https://yingvickycao.github.io/img/android/resources/Drawable_ConstantState_1.webp)

例如 R.drawable.ic_launcher,每次新建一个 drawable 都是一个不同的 drawable 实例,但他们共享一个状态 ConstantState。所以所有的 R.drawable.ic_launcher 都共享一个 bitmap,这就是两个 ImageView 都改变颜色原因。
<br/>
好处：节省内存
弊端：当 constant state 属性发生变化时，所有使用相同资源的关联 drawable 都会随之改变，比如前面所说的这种现象。
<br/>

Solution:  
 `Drawable.mute()`: 使得这个 drawable 变成可变的，这个操作不可逆转。  
 mutate() 方法就是复制一份 constant state，允许随意改变属性，同时不对其他 drawable 有任何影响。

![Drawable_ConstantState_2](https://yingvickycao.github.io/img/android/resources/Drawable_ConstantState_2.webp)

```java
Drawable.java
Make this drawable mutable. This operation cannot be reversed.
A mutable drawable is guaranteed to not share its state with any other drawable. This is especially useful when you need to modify properties of drawables loaded from resources.
By default, all drawables instances loaded from the same resource share a common state; if you modify the state of one instance, all the other instances will receive the same modification.
Calling this method on a mutable Drawable will have no effect.

public @NonNull Drawable mutate() {
        return this;
}



VectorDrawable.java
@Override
    public Drawable mutate() {
        if (!mMutated && super.mutate() == this) {
            mVectorState = new VectorDrawableState(mVectorState);
            mMutated = true;
        }
        return this;
    }
```

说明：
在实际测试时，某些级别的系统 API 中，不会存在这种问题。为了兼容所有 API，DrawableCompat 着色处理时，同时使用 wrap() 和 mutate() 方法。

https://www.imooc.com/article/281573
https://developer.android.google.cn/reference/android/graphics/drawable/Drawable.html
https://juejin.cn/post/6844903472521805831

# TODO

- TBD:BitmapDrawable，其尺寸由 getIntrinsicWidth 和 getIntrinsicHeight 给出.  
  BitmapDrawable.getIntrinsicWidth()和 getIntrinsicHeight()理解. https://yezimianbao.iteye.com/blog/2068655

# Refs

https://juejin.cn/post/6844903472521805831
