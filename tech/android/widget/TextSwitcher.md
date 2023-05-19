# TextSwitcher

## 用途

- 使用 TextSwitcher 和 ImageSwitcher 分别代替 Textview 和 ImageView，切换内容时，增加动态效果，使得内容过度更自然  
  使用动画切换 `TextView`
- 不要滥用 TextSwitcher 和 ImageSwitchery
- `TextSwitcherFragment.java`

## TextSwitcher 的工作原理

- 首先通过 ViewFactory 创建两个用于在 TextSwitcher 中切换的视图,每当调用 setText()方法时,TextSwitcher 首先移除当前视图并显示 setOutAnimation()方法设置的动画,然后并将另一个视图切换进来,并显示 setInAnimation()方法设置的动画。
- TextSwitcher 机制与 ImageSwitcher 类似。

## Textview VS TextSwitcher

- Textview 的内容切换是立刻改变。
- 使用 TextSwitcher 和 ImageSwitcher 切换内容时带动态效果

## 说明

- 由于 TextSwitcher 的原理和 ImageSwitcher 一样，只是一个是 ImageView，一个是 TextView。
- `TextSwitcher` 提供了一个`ViewFactory`，该`ViewFactory`使用`makeView()`生成的 View 组件必须是 `TextView`。
- 切换文本时，调用 `TextSwitcher` 的 `setText()`更换文本。
-
- TextSwitcher VS TextView：  
  相同点：均用于显示文本
  不同点：TextSwitcher 可指定切换时的动画效果，效果更炫。

## Common Funcs

- `TextSwitcher.setFactory()`
- `TextSwitcher.setOnTouchListener()`
- `TextSwitcher.setInAnimation()`
- `TextSwitcher.setOutAnimation()`
- `TextSwitcher.setText(arrayPictures)`

```
/**
         * setFactory(ViewFactory factory)
         */
        mTextSwitcher.setFactory(new ViewSwitcher.ViewFactory() {
            @Override
            public View makeView() {
                TextView textView = new TextView(getActivity());
                textView.setTextSize(100);
                textView.setLayoutParams(new TextSwitcher.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
                textView.setGravity(Gravity.CENTER);
                textView.setText(mShowedTextArray[mShowedTextIndex]);
                return textView;
            }
        });

         // 设置TextSwitcher左右滑动事件
        mTextSwitcher.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_DOWN) {
                    // 取得左右滑动时手指按下的X坐标
                    mCoordinateXWhenTouchDown = event.getX();
                    return true;

                } else if (event.getAction() == MotionEvent.ACTION_UP) {
                    // 取得左右滑动时手指松开的X坐标
                    mCoordinateXWhenTouchUp = event.getX();

                    // 从左往右，看前一文本
                    if (mCoordinateXWhenTouchUp - mCoordinateXWhenTouchDown > 100) {
                        prev();
                    } else if (mCoordinateXWhenTouchDown - mCoordinateXWhenTouchUp > 100) {
                        next();
                    }
                    return true;
                }
                return false;
            }
        });

```

```
 private void prev() {
        // 取得当前要看的文本的index
        mShowedTextIndex = mShowedTextIndex == 0 ? mShowedTextArray.length - 1 : mShowedTextIndex - 1;
        // 设置文本切换的动画
        mTextSwitcher.setInAnimation(AnimationUtils.loadAnimation(getActivity(), android.R.anim.slide_in_left));
        mTextSwitcher.setOutAnimation(AnimationUtils.loadAnimation(getActivity(), android.R.anim.slide_out_right));
        // 设置当前要看的文本
        mTextSwitcher.setText(mShowedTextArray[mShowedTextIndex]);
    }

```

```
    private void next() {
        // 取得当前要看的文本的index
        mShowedTextIndex = mShowedTextIndex == mShowedTextArray.length - 1 ? 0 : mShowedTextIndex + 1;
        // 设置文本切换的动画
        // 由于Android没有提供slide_out_left和slide_in_right，所以仿照slide_in_left和slide_out_right编写了slide_out_left和slide_in_right
        mTextSwitcher.setInAnimation(AnimationUtils.loadAnimation(getActivity(), R.anim.slide_out_left));
        mTextSwitcher.setOutAnimation(AnimationUtils.loadAnimation(getActivity(), R.anim.slide_in_right));
        // 设置当前要看的文本
        mTextSwitcher.setText(mShowedTextArray[mShowedTextIndex]);
    }

```

## References：

- [TextSwitcher](https://developer.android.google.cn/reference/android/widget/TextSwitcher.html)
- [ImageSwitcher](https://developer.android.google.cn/reference/android/widget/ImageSwitcher.html)
- [View Animation](https://developer.android.google.cn/guide/topics/graphics/view-animation.html)

- Android 中 ImageSwitcher 详解 http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2013/0305/966.html
- Android 中的坐标系以及获取坐标的方法  
  https://www.linuxidc.com/Linux/2015-11/125391.htm
- Android 自定义 View 你所要知道的(一):坐标系  
  https://blog.csdn.net/sinat_35938012/article/details/71425301
