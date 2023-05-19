# ListView

## Force scroll

```
ListView.setOnTouchListener((v, event) -> {
            if (event.getAction() == MotionEvent.ACTION_MOVE) {
                Log.d(TAG, "onTouch: ACTION_MOVE");
                return true;
            }
            return false;
        });
```

- `android:drawSlectorOnTop`  
  true: 点击时，背景在文字上面显示。  
  true: 点击时，背景在文字后面显示。

- `android:listSelector`  
  背景跟着点击更变

- divider
  默认包含的是一个灰色的 divider。

`android:divider`  
 item divider。通常是一个颜色，或 drawable。

`android:dividerHeight`  
 item divider 高度。通常是 1dp。

```
android:divider="@color/red"
android:dividerHeight="@dimen/size_1"
```

- 设置 item 按下的颜色？

Way 1 : ListView 的` android:listSelector="@drawable/drawable_selector_4_listview"`

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/item_view_highlight_bg" android:state_pressed="true" />
<!--    <item android:drawable="@android:color/white" android:state_pressed="false" />-->
</selector>
```

Way 2 :Item View 设置 `android:background="@drawable/drawable_selector_4_listview"`

Way 3 ：在 adapter 的 getView 方法中设置

```java
if(convertView ==null){
  convertView = LayoutInflater.from(context).inflate(R.layout.listitem, null);
}
convertView.setBackgroundResource(R.drawable.selector);
```

- scrollbars
  android:scrollbars="none"
  设置不可见 scrollbar

android:fadeScrollbars="true"  
 设置为 true 就可以实现滚动条的自动隐藏和显示
