# Toast

`ToastFragment.java`

- 点击 Toast 会加速 Toast 消失。
- Toast 可以自定义：位置、add click、add image
- 显示时间
  Toast.LENGTH_SHORT : 2s  
  Toast.LENGTH_LONG : 3.5s  
  (1) < 3.5s  
  handler  
  (2) > 3.5s  
  重写代码，否则不能
- setGravity 设置 Gravity.FILL_HORIZONTAL（屏幕等宽）后，参数 yOffset 就不再起作用。

## Toast shadow color？

Toast 不分层，直接平铺，没有遮盖层，故没有 shadow color，设置不了。

## 自定义宽度和显示位置

Example :自定义 toast 为距离底部 100dp，距离左右屏幕为 8dp

方式 1 ：推荐。xml 配置好维护。

```
// 设置为底部对齐，且屏幕等宽
toast.setGravity(Gravity.BOTTOM | Gravity.FILL_HORIZONTAL, 0, 0);

// layout 中设置对齐位置
android:layout_marginStart="8dp"
android:layout_marginEnd="8dp"
android:layout_marginBottom="100dp"
```

方式 2 ：不推荐。jav code 不好维护。

```
// 设置为底部对齐，距离底部 100dp
toast.setGravity(Gravity.BOTTOM, 0, getResources().getDimensionPixelSize(R.dimen.size_100));


// 设置距离左右屏幕为 8dp
messageRoot.setLayoutParams(layoutParams);
```

![toast_custom_widht_and_position](https://gitee.com/YingVickyCao/img/raw/main/android/other_ui/toast_custom_widht_and_position.jpg)

Code:
TestToastFragment.java
toast_custom_4_custom_width_and_position.xml
toast_4_custom_width_and_position()
toast_4_custom_width_and_position_v2()
