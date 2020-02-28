# Styles and Themes

# 1 style

- A style is a collection of attributes that specify the appearance for a single View.
- Each attribute specified in the style is applied to that view if the view accepts it. The view simply ignores any attributes that it does not accept.
- applying a style with the style attribute on a view

## extend an existing style from the framework

```
<style name="GreenText2" parent="@android:style/TextAppearance">
    <item name="android:textColor">#00FF00</item>
</style>
```

## extend an existing style from support library

```
<style name="GreenText" parent="TextAppearance.AppCompat">
    <item name="android:textColor">#00FF00</item>
</style>
```

The styles in the support library provide compatibility with Android 4.0 (API level 14) and higher by optimizing each style for the UI attributes available in each version

## inherit styles

- style1: `<style name="childStyle" parent="parentStyle">`
- style2: `<style name="parentStyle.childStyle">`

```
<style name="GreenText.Child" parent="RedText" />  => Red

<style name="GreenText.Child2" parent="OrangeText"> => Blue
    <item name="android:textColor">@android:color/holo_blue_bright</item>
</style>
```

---

# 2 Theme

- A theme is a type of style that's applied to an entire app, activity, or view hierarchy—not just an individual view.
- Apply a style as a theme
- apply a theme with the android:theme attribute on either the `<application>` tag or an `<activity>` tag in the AndroidManifest.xml

> The previous examples show how to apply a theme such as Theme.AppCompat that's supplied by the Android Support Library. But you'll usually want to customize the theme to fit your app's brand. The best way to do so is to extend these styles from the support library and override some of the attributes, as described in the next section.

## Use theme

```
 <application
        android:theme="@style/Theme.AppCompat.Light"
```

```
<activity
    android:name=".app_component.activity._life_cycle.FloatB"
    android:theme="@style/Theme.AppCompat.Light" />
```

## Add version-specific styles to custom theme

```
res/values/styles.xml        # themes for all versions
res/values-v21/styles.xml    # themes for API level 21+ only
```

`res/values/styles.xml`

```
<resources>
    <!-- base set of styles that apply to all versions -->
    <style name="BaseAppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    </style>

    <!-- declare the theme name that's actually applied in the manifest file -->
    <style name="AppTheme" parent="BaseAppTheme" />
</resources>
```

`res/values-v21/styles.xml`

```
<resources>
    <!-- extend the base theme to add styles available only with API level 21+ -->
    <style name="AppTheme" parent="BaseAppTheme">
    </style>
</resources>
```

<!-- FIXED_ERROR:Caused by: android.content.res.Resources$NotFoundException: File res/drawable/drawable_level_list_3_v1.xml from drawable resource ID #0x7f08007a -->

# 3 Customize widget styles

```

<!-- one button -->
<Button style="@style/Widget.AppCompat.Button.Borderless"/>
```

```
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <!-- apply this style to all buttons -->
    <item name="buttonStyle">@style/Widget.AppCompat.Button.Borderless</item>
    ...
</style>
```

# 4 Style hierarchy

If you've specified the same attributes in multiple places, the list below determines which attributes are ultimately applied. The list is ordered from highest precedence to lowest:

1. Applying character- or paragraph-level styling via text spans to TextView-derived classes
2. Applying attributes programmatically
3. Applying individual attributes directly to a View
4. Applying a style to a View
5. Default styling
6. Applying a theme to a collection of Views, an activity, or your entire app
7. Applying certain View-specific styling, such as setting a TextAppearance on a TextView

![Figure 2. Styling from a span overrides styling from a textAppearance.](https://developer.android.google.cn/guide/topics/ui/images/text-multiple-styles.png)

## TextAppearance

```
<TextView
    ...
    android:textAppearance="@android:style/TextAppearance.Material.Headline"
    android:text="This text is styled via textAppearance!" />
```

- One limitation with styles is that you can apply only one style to a View. In a TextView, however, you can also specify a TextAppearance attribute which functions similarly to a style
- TextAppearance: define text-specific styling
- TextAppearance supports a subset of styling attributes that TextView offers.
- Some common TextView attributes not included are lineHeight[Multiplier|Extra], lines, breakStrategy, - and hyphenationFrequency.
- TextAppearance works at the character level and not the paragraph level, so attributes that affect the entire layout are not supported.

# 5 Use Theme and style in App?

## QA:应用 Theme 时，如何实现 Custom View 在一个 pageA 使用 theme，在另一个 pageB 不使用 theme?

```
2-Style in XML // 覆盖，表示不应用Theme
3-Style in Theme  // 应用Theme
```

`attrs.xml`

```
<declare-styleable name="RectView">
    <attr name="rvText" format="reference" />
</declare-styleable>

<attr name="rectViewStyle" format="reference" />
```

`themes.xml`

```
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="rectViewStyle">@style/RectView_StyleInTheme</item>
</style>

<style name="RectView_StyleInTheme">
        <item name="rvText">@string/attribute_3_style_in_theme</item>
</style>

<style name="RectView_StyleNotUseTheme">
        <item name="rvText">@string/attribute_6_not_use_theme</item>
</style>

```

`widget_custom_view.xml`

```
<!-- Apply theme -->
 <com.hades.example.android.widget.custom_view.RectView/>

<!-- Not apply theme -->
<com.hades.example.android.widget.custom_view.RectView
    style="@style/RectView_StyleNotUseTheme" />
```

`RectView.java`

```
public class RectView extends TextView {
    private static final String TAG = RectView.class.getSimpleName();

    public RectView(Context context) {
        super(context);
        Log.d(TAG, "RectView: 1");
    }

    public RectView(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, R.attr.rectViewStyle);
        Log.d(TAG, "RectView: 2");
    }

    public RectView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);

        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.RectView, defStyleAttr, R.style.RectView_DefaultStyle);
        if (null == typedArray) {
            return;
        }
        String text = typedArray.getString(R.styleable.RectView_rvContent);
        Log.d(TAG, "RectView: 3,text=" + text);
        setText(text);
        typedArray.recycle();
    }
}
```

## Apply attr of theme for code created view?

`MyView.java`

```
MyView myView = new MyView(getActivity(), null, R.attr.MyViewStyle);
```

# 6 Modidy dialog shadow?

## Dialog

not found 设置 dialog shadow 的方法。 只能通过 android:backgroundDimAmount 设置 遮盖层 的黑色程度

```
<style name="AlertDialogStyle" parent="Theme.AppCompat.Light.Dialog.Alert">
    <item name="android:backgroundDimAmount">0.8</item>
</style>
```

`TestAlertDialogFragment.java`

```
new AlertDialog.Builder(getUsedContext(), R.style.AlertDialogStyle)
...
.create()
.show();
```

## DialogFragment

android:backgroundDimEnabled = true，允许 dialog 背后的背景变暗，本身就带一个阴影色。可能是 Z 轴自带的 shadow 颜色
android:windowBackground ：设置 shadow 颜色

```
<style name="CustomBottomSheetDialogFragmentStyle" parent="Theme.Design.BottomSheetDialog">
    <item name="android:windowBackground">@color/light_shadow</item>
</style>
```

`TestBottomSheetDialogFragment.java`

```
@Override
public Dialog onCreateDialog(Bundle savedInstanceState) {
    return new BottomSheetDialog(getContext(), R.style.CustomBottomSheetDialogFragmentStyle);
}
```

# 7. Get simple attr?

`themes.xml`

```
<item name="ColorsIntegerArray">@array/colors_integer_array
</item>
```

`MyView.java`

```
TypedValue typedValue = new TypedValue();
getActivity().getTheme().resolveAttribute(R.attr.ColorsIntegerArray, typedValue, true);
int resourceId = typedValue.resourceId;
```

# 9. ColorFilter vs Tint

`TestTintFragment.java`  
`TestColorFilterFragment.java`

## `android:tint`

Use `android:Tint` to change menu icon color?

- 适用  
  ① 对同一个图片修改图片填充颜色。  
  ② 用一套 icon 来 theme  
  ③ 适合透明 icon，不适合非透明，否则图案消失，color 全色。
- vector 也适用
- `android:tint` + `res/color/` use selector -> 自动变颜色

res/color/menu_icon_color.xml

```
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="?attr/color1" android:state_selected="true" />
    <item android:color="?attr/color2" />
</selector>
```

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

- `android:tint` use color, not drawable

```
 <ImageView
    android:layout_width="50dp"
    android:layout_height="50dp"
    android:src="@drawable/ic_adjust_black_18dp"
    android:tint="@color/colorAccent" // ✓
    android:tint="@drawable/ic_home_black_24dp" // ✗
/>
```

Ref:

- https://blog.csdn.net/mp624183768/article/details/78559329
- https://blog.csdn.net/smile_running/article/details/81223260
- https://blog.csdn.net/new_one_object/article/details/54968653

## android:tintMode

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

# Refs

- [Styles and Themes](https://developer.android.google.cn/guide/topics/ui/look-and-feel/themes)
- https://developer.android.google.cn/reference/com/google/android/material/resources/TextAppearance
- [View](https://developer.android.google.cn/reference/android/view/View.html)
- [App resources overview](https://developer.android.google.cn/guide/topics/resources/providing-resources.html)
- [Style resource](https://developer.android.google.cn/guide/topics/resources/style-resource)
- https://developer.android.google.cn/reference/android/graphics/drawable/Drawable.html
