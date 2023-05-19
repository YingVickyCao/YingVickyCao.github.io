# 颜色值

![color](https://yingvickycao.github.io/img/android/resources/color.webp)

# ARGB

- A = Alpha . 省去 Alpha,默认颜色是不透明的。

- Color in Java code: 0xAARRGGBB（✓）, 0xRRGGBB（✗）  
  `android.graphics.Color.java`
- android color string <-> int
  TestColorFragment.java
  ThemeUtils.java

Ref :

[CSS 颜色](https://www.w3school.com.cn/css/css_colors.asp)  
[CSS HSL 颜色](https://www.w3school.com.cn/css/css_colors_hsl.asp)  
[CSS HEX 颜色](https://www.w3school.com.cn/css/css_colors_hex.asp)  
[CSS RGB 颜色](https://www.w3school.com.cn/css/css_colors_rgb.asp)  
[RGB 颜色查询对照表](https://www.qianbo.com.cn/Tool/Rgba/)

---

# 三原色

![三原色](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/resources/three_origin_color.png)

---

# [ColorStateList - Color state list resource](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/doc/android/resource/StateListDrawable.md#androidtextcolor)

## ColorStateList - setTextColor

```
Resource.getColor()/Resource.getColorStateList()
ERROR: has unresolved theme attributes
```

```
// selector use color
getResources().getColor(R.color.textview_color_enable); // work

// selector use attr
getResources.getColor(getActivity(), R.color.textview_color_enable_v2); // not work

AppCompatResources.getColorStateList(getActivity(), R.color.textview_color_enable_v2); // work

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) { >=23
    getResources().getColorStateList(R.color.textview_color_enable_v2, getActivity().getTheme()); // work
} else {
    getResources().getColorStateList(R.color.textview_color_enable_v2); // not work
}
```

Resource.getDrawable() 有类似 Resource.getColor()/Resource.getColorStateList()的问题

---

## State specs

| State specs(7)               | Desc                        |
| ---------------------------- | --------------------------- |
| android:state_pressed        | -                           |
| android:state_focused        | -                           |
| android:state_selected       | -                           |
| android:state_checkable      | -                           |
| android:state_checked        | -                           |
| android:state_enabled        | true=enabled,false=disabled |
| android:state_window_focused | -                           |

Note:

- android:state_window_focused:

```
"true" if this item should be used when the application window has focus (the application is in the foreground);
"false" if this item should be used when the application window does not have focus (for example, if the notification shade is pulled down or a dialog appears).
```

- state spec order  
  The list of state specs will be matched against in the order that they appear in the XML file. For this reason, more-specific items should be placed earlier in the file. An item with no state spec is considered to match any set of states and is generally useful as a final item to be used as a default.  
  If an item with no state spec is placed before other items, those items will be ignored.

## Item attributes

- android:color
- android:alpha:API 23,[0,1]

# Refs:

- [ColorStateList](https://developer.android.google.cn/reference/android/content/res/ColorStateList.html)
- [Color state list resource](https://developer.android.google.cn/guide/topics/resources/color-list-resource.html)
- [Color](https://developer.android.google.cn/guide/topics/resources/more-resources.html#Color)
