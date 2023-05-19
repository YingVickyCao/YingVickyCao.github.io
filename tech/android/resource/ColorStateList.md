# ColorStateList

TestColorStateListFragment.java

- Button icon color is hilight with state_selected  
  e.g. , Click Download(blue) -> Downloaded(grey)

```xml
<!-- res/color/menu_icon_color.xml  -->
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="?attr/color1" android:state_selected="true" />
    <item android:color="?attr/color2" />
</selector>
```

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
    android:background="@null"/>
```

- ImageView 必须设置 clickable，selector 才会生效
- src 引用 bitmap xml 报错，
  src 中引用必须是图片，不能是 xml 形式（包括 attr 指向一个图片），因为要避免循环引用。
