# 自定义键盘

- 用自定义键盘的目的？
  为了数据安全，比如银行的 app 通常使用自定义键盘，且每次 Key 顺序不同。

- 如何实现实现自定义键盘？  
  方式 1 ： KeyBoardView  
  方式 2 ： 自定义 layout

# 方式 1 : KeyBoardView

`TestKeyBoardFragment.java`

xml KeyBoard 中 Key code 参考 [ASCII 码.md](/tools/ASCII码.md)  
KeyboardView 内部由 PopupWindow 实现。

```xml
 <!-- android:inputType="none" 通常设置为none。也设置成别的类型，但是因为使用自定义键盘，设置成其他类型也没啥意义   -->
    <EditText
        android:id="@+id/editText"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:focusable="true"
        android:focusableInTouchMode="true"
        android:inputType="none"
        android:text=""
        android:textSize="30sp" />

    <!--  为了让自定义Keyboard 位于底部，用RelativeLayout 包裹 KeyboardView -->
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <!--  android:background="@android:color/holo_red_dark"：整个自定义Keyboard的背景色
             android:keyBackground="@drawable/xml_keyboard_bg" ：定义Key的背景色能根据pressed 状态改变颜色
             android:keyPreviewLayout="@layout/key_preview_layout":按下Key时，弹出的预览图
             android:keyTextColor ： Key 的字体颜色
             android:keyTextSize ： Key 的字体大小
             android:visibility="invisible" ：一般时gone 或 invisible
        -->
        <android.inputmethodservice.KeyboardView
            android:id="@+id/keyboardView"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_alignParentBottom="true"
            android:background="@android:color/holo_red_dark"
            android:focusable="true"
            android:focusableInTouchMode="true"
            android:keyBackground="@drawable/xml_keyboard_bg"
            android:keyPreviewLayout="@layout/key_preview_layout"
            android:keyTextColor="@android:color/black"
            android:keyTextSize="30sp"
            android:visibility="invisible" />
    </RelativeLayout>
```

- Q : 点击 EditText 时，系统软键盘覆盖了 KeyboardView？

```java
// 禁用软键盘
getActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_ALT_FOCUSABLE_IM);
// 在需要打开的Activity取消禁用软键盘
//getWindow().clearFlags(WindowManager.LayoutParams.FLAG_ALT_FOCUSABLE_IM);
```

- android.inputmethodservice.KeyboardView is depressed.
  Copy system files to project:

```
1 去掉 import android.compat.annotation.UnsupportedAppUsage;
2 mPaddingLeft -> getPaddingLeft()
mPaddingRight -> getPaddingRight()
mPaddingTop -> getPaddintTop();
mPaddingBottom -> getPaddingBottom();
3 com.android.internal.R.styleable. -> R.styleable.
5 com.android.internal.R -> R
4 android.R.styleable   -> com.hades.example.android.R
6 AccessibilityManager.getInstance(context) ->  (AccessibilityManager) getContext().getSystemService(Context.ACCESSIBILITY_SERVICE)
7 mContext  -> getContext()
8
//import android.inputmethodservice.Keyboard;
//import android.inputmethodservice.KeyboardView;
```

---

- Q : 显示和不可见自定义键盘多次后，再次点击 EditText，自定义键盘不显示?
- Q : 反复点击 EditText，点击的太快，键盘会闪。

```java
        editText.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                // Fix：反复点击EditText，点击的太快，键盘会闪。
                // 解决：增加200ms的重复事件的过滤
                if (ButtonUtils.isFastClick()) {
                    return false;
                }
                if (!editText.hasFocus()) {
                    Log.d(TAG, "onTouch: !editText.hasFocus():go here");
                    showKeyboard();
                } else {
                    if (keyboardView.getVisibility() != View.VISIBLE) { // Fix：显示和不可见自定义键盘多次后，再次点击EditText，自定义键盘不显示。
                        Log.d(TAG, "onTouch: else keyboard is not visible, show it");
                        showKeyboard();
                    } else {
                        Log.d(TAG, "onTouch: else keyboard is visible, hide it");
                        hideKeyboard();
                    }
                }
                return false;
            }
        });
```

---

- Q : 字母键盘可以显示，为啥这个数字键盘不能显示？
  xml 中 Keyboard，Row、Key 必须首字母大写，如果是写成小写，虽然不报错，但是自定义数字键盘不会显示。
  <br/>
- `keyboardView.setPreviewEnabled(false); // 开启和关闭点击Key的预览效果`

- Q：button 在键盘上面？  
  A :  
  ![custom_keyboard_before](https://gitee.com/YingVickyCao/img/raw/main/android/widget/custom_keyboard_before.jpg)

Fix ： android:translationZ  
![custom_keyboard_before](https://gitee.com/YingVickyCao/img/raw/main/android/widget/custom_keyboard_after.jpg)

# 2 方式 2 : 自定义 layout。

`TestKeyBoardFragment2.java`
好处：键盘顺序随意定制

- Q ：点击其他区域时，键盘应该消失

```java
 // Fix:点击其他区域时，键盘应该消失
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Fix：反复点击EditText，点击的太快，键盘会闪。
                // 解决：增加200ms的重复事件的过滤
                if (ButtonUtils.isFastClick()) {
                    return;
                }
                toggleKeyboardViewVisible();
            }
        });
```

- 显示/隐藏键盘时，添加动画，增加流畅度

# Refs

- [ASCII 码.md](/tools/ASCII码.md)
- https://juejin.cn/post/6844903598598406152
