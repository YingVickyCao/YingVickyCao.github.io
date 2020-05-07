# RadioButton

## theme:删除按下时彩色圆圈，修改按下颜色，修改未选中颜色，修改选中颜色
```
<RadioButton
    android:background="@null"
    android:backgroundTint="@color/btn_text_color_selector"
    android:stateListAnimator="@null" 
    android:text="A" />

```

`/color/btn_text_color_selector.xml`

```
<?xml version="1.0" encoding="UTF-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="@android:color/holo_blue_bright" android:state_pressed="true" />
    <item android:color="@android:color/holo_orange_light" android:state_checked="true" />
    <item android:color="#ff00ff" />
</selector>
```
- android:stateListAnimator="@null"  
删除彩色圆圈when clicked
- android:backgroundTint    
修改按下颜色，修改未选中颜色，修改选中颜色

