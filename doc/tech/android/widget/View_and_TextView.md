# TextView

Common attribue for Widget.

# `onClick` vs `android:clickable`

`TestTextViewClickFragment.java`
`onClick` 会影响 `android:clickable`. 添加的 OnClick`后，自动设置`android:clickable=true`. 但要注意调用的顺序.

```
clickable = false;
OnClick
=> clickable = true;
```

```
clickable = false;
OnClick
clickable = false;

=> clickable = false;
```

```
clickable = false;

=> clickable = false;
```

```
clickable = true;

=> clickable = true;
```

clickable = true，意味着对点击动作有反应，例如：根据设置的 textColor 变颜色，根据设置的 background 改变背景色等

# `setMovementMethod(LinkMovementMethod.getInstance())` vs `android:linksClickable`

`textView1.setMovementMethod(LinkMovementMethod.getInstance())` 与 `android:linksClickable` 类似。

## Formart HTML

`TestTextViewFragment.java`

- Method·：`Html.fromHtml()` + `TextView.setMovementMethod()`

```
textView1.setText(Html.fromHtml(getString(R.string.text1)));
textView1.setMovementMethod(LinkMovementMethod.getInstance());
```

- Method2：Spannable

# TextView change text and bg color

`TestTextViewFragment.java`

## Case1: Switch TextView text and bg color

- drawable with `android:state_selected` + TextView.setSelected(true/flace)

```
// Only TextView
<TextView
        android:textColor="@color/textview_text_color_selector_v1_1"
        android:background="@drawable/drawable_selector_4_text_view_v1_1"
        android:duplicateParentState="true"/>
```

- drawable with `android:state_selected` + TextView.setSelected(true/flace) + `android:duplicateParentState="true"`

```
// TextView in  ViewGroup
<ViewGroup, such as LinearLayout
    android:background="@drawable/drawable_selector_4_text_view_v1_1">

    <TextView
        android:textColor="@color/textview_text_color_selector_v1_1"
        android:duplicateParentState="true"/>

        <TextView
        android:textColor="@color/textview_text_color_selector_v1_2"
        android:background="@drawable/drawable_selector_4_text_view_v1_2"
        android:duplicateParentState="true"/>

</ViewGroup, such as LinearLayout>
```

## Case2: TextView change text and bg color with click status action

- drawable with `android:state_selected`

```
// Only TextView
<TextView
        android:textColor="@color/textview_text_color_selector_v2_1"
        android:background="@drawable/drawable_selector_4_text_view_v2_1"
        android:duplicateParentState="true"/>
```

- drawable with `android:state_selected` + `android:duplicateParentState="true"`

```
// TextView in  ViewGroup
<ViewGroup, such as LinearLayout
    android:background="@drawable/drawable_selector_4_text_view_v2_1">

    <TextView
        android:textColor="@color/textview_text_color_selector_v2_1"
        android:duplicateParentState="true"/>

        <TextView
        android:textColor="@color/textview_text_color_selector_v2_2"
        android:background="@drawable/drawable_selector_4_text_view_v2_2"
        android:duplicateParentState="true"/>

</ViewGroup, such as LinearLayout>
```

# 显示一个高亮绿灯的数字时钟

- 自定义字体
- 发光效果

```
setShadowLayer()
/
XML
android:shadowColor
android:shadowDx
android:shadowDy
android:shadowRadius
```

- 两个 TextView 重影

1. as 背景，显示 88：88：88 的阴影
2. 当前时间

# View.setId()?

```
// SDK >= 17
my_view.setId(View.generateViewId());
```

/

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <item name="my_view" type="id" />
</resources>

my_view.setId(R.id.my_view);
```

# View vs SurfaceView vs GLSurfaceView

| 比较             | View              | SurfaceView                        | GLSurfaceView                      |
| ---------------- | ----------------- | ---------------------------------- | ---------------------------------- |
| 速度             | 慢                | 快                                 | 快                                 |
| 哪个线程更新画面 | UI 线程           | UI 线程/子线程                     | UI 线程/子线程                     |
| 应用场景         | 被动更新画面:下棋 | 2D 游戏<br/>主动更新画面：人自动走 | 3D 游戏<br/>主动更新画面：人自动走 |
| -                | -                 | -                                  | OpenGL 专用                        |

# Refs

- http://blog.csdn.net/hzc_01/article/details/50093989
- http://blog.csdn.net/huawangxin/article/details/53232531
