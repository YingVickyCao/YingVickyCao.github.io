# View and TextView

Common attribue for Widget.

- View 绘制流程
  ![view_draw_process](https://yingvickycao.github.io/img/android/widget/view_draw_process.png)

- View Tree
  ![viewgroup_2x](https://yingvickycao.github.io/img/android/widget/viewgroup_2x.png)

# 1 `onClick` vs `android:clickable`

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

# 2 `setMovementMethod(LinkMovementMethod.getInstance())` vs `android:linksClickable`

`textView1.setMovementMethod(LinkMovementMethod.getInstance())` 与 `android:linksClickable` 类似。

## Formart HTML

`TestTextViewFragment.java`

- Method·：`Html.fromHtml()` + `TextView.setMovementMethod()`

```
textView1.setText(Html.fromHtml(getString(R.string.text1)));
textView1.setMovementMethod(LinkMovementMethod.getInstance());
```

- Method2：Spannable

# 3 TextView change text and bg color

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

# 4 显示一个高亮绿灯的数字时钟

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

# 5 View.setId()?

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

# 6 View vs SurfaceView vs GLSurfaceView vs TextureView

| 比较             | View              | TextureView                                                      | SurfaceView （Recommended）        | GLSurfaceView （Recommended）                  |
| ---------------- | ----------------- | ---------------------------------------------------------------- | ---------------------------------- | ---------------------------------------------- |
| 速度             | 慢                |                                                                  | 快                                 | 快                                             |
| 哪个线程更新画面 | UI 线程           |                                                                  | UI 线程/子线程                     | UI 线程/子线程                                 |
| 应用场景         | 被动更新画面:下棋 | 显示 contents from a camera preview, a video, or an OpenGL scene | 2D 游戏<br/>主动更新画面：人自动走 | 3D 游戏<br/>主动更新画面：人自动走.OpenGL 专用 |

## TextureView

- `TextureView`‘s `SurfaceTexture` to render content

## SurfaceView

- SurfaceView is recommended as a more general solution to problems requiring rendering to surfaces.

# 7 shadowDX、shadowDy、shadowRadius

设置 阴影的横、纵坐标偏移，以及阴影的半径  
toast_custom_with_icon_light3.xml  
ref:  
https://blog.csdn.net/ly0303521/article/details/50955166

# 8 drawable

**Example : widget_textview_4_drawable**

drawableStart / drawableTop / drawableEnd / drawableBottom : 放 icon。
drawablePadding：icon 距离 text 的距离。  
drawableTint : icon 渲染颜色。  
padding ：icon 与 TextView 之间的距离，即内边距。

# 9 Textview 的底部文字对齐

`widget_textview.xml`  
Way 1 : RelativeLayout 的 `android:layout_alignBaseline="@id/left"`  
Way 2 : ConstraintLayout 的 `app:layout_constraintBaseline_toBaselineOf="@id/left2"`

# Refs

- http://blog.csdn.net/hzc_01/article/details/50093989
- http://blog.csdn.net/huawangxin/article/details/53232531
