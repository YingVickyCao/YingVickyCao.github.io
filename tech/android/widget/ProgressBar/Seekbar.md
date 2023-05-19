# SeekBar

# 1 event

```
.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boboolean fromUser){
        //start drag, fromUser = true
    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {
    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
        // drag 停止， 此时才开始seek to media
    }
    })
```

# 2 MediaPlay 缓冲进度 与 SeekBar

- SeekBar android:progress = `MediaPlayer.getCurrentPosition()/mediaPlayer.getDuration()` 播放
- SeekBar android:secondProgress = `MediaPlayer.OnBufferingUpdateListener`-`void onBufferingUpdate(MediaPlayer mp, int percent)` 缓冲

# 3. PO

# 4 FAQ

## [FAQ-1] 如何改变 progress/secondProgress/background 的颜色 ？

同 ProgressBar

## [FAQ-2] 显示粗细、高

与 progressBar

## [FAQ-3]:第二进度的颜色没显示，显示的是第一进度的颜色：

```
<item android:id="@android:id/background">
<item android:id="@android:id/progress">
<item android:id="@android:id/secondaryProgress">
```

=>

```
<item android:id="@android:id/background">
<item android:id="@android:id/secondaryProgress">
<item android:id="@android:id/progress">
```

## [FAQ-4]:如何修改 Thubm 的大小？

没有属性修改大小，只能重写 `android:thumb` 指向的 drawable

## [FAQ-5]:Seekbar thumb 上下显示不全

```
// 与progressBar 规则类似
android:layout_height="wrap_content"
android:maxHeight="1dp"
android:minHeight="1dp"
```

## [FAQ-6]:Seekbar thumb 滑动到最左边/最右边时显示不全

- `android:thumbOffset`:指示 thumb 在拖动条的进度最大值与最小值时相对于拖动条的偏移量

| thumbOffset 值 | 拖动条最小值时 thumb 位置                                                                                                          | 拖动条最大值时 thumb 位置                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 0              | thumb 的最左端与 SeekBar 的最左端对齐                                                                                              | thumb 的最右端与 SeekBar 的最右端对齐                                                                                               |
| 10dp           | thumb 的最左端比 SeekBar 的最左端小 10px,如果 SeekBar 设置的 android:paddingLeft 比 10px 要小，那么此时 thumb 会被遮挡掉左边的部分 | thumb 的最右端比 SeekBar 的最右端大 10px,如果 SeekBar 设置的 android:paddingRight 比 10px 要小，那么此时 thumb 会被遮挡掉右边的部分 |

## [FAQ-7]:SeekBar 拖动时，thumb 与 progress 之间有间隔？

- `android:splitTrack="true" -> false`
- 对系统默认属性的 SeekBar 设置无效

## [FAQ-8

]：解决 SeekBar 拖动过程中 thumb 周围产生的圆形阴影/白色圆圈？

- 不设置背景，阴影圆圈使用的是系统自带的 seekbar 默认背景。  
  ![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_thumb_shadow.png)

- 设置背景为 null，或者指定设置一个颜色，阴影圆圈消失  
  `android:background="@null"`  
  ![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_thumb_miss_shadow.png)

## [FAQ-9]：单独设置背景？

`android:background="@color/red"`  
![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_bg.png)

## [FAQ-10]: Tint with enable + pressed status

android:thumbTint

## [FAQ-11]如何动态显示和隐藏 thumb？

```java
private void showThumb() {
    seekBar.getThumb().mutate().setAlpha(255);
}

private void hideThumb() {
    seekBar.getThumb().mutate().setAlpha(0);
}
```

# 4. TBD

## TBD:`android:background` vs `android:id="@android:id/background"`

使用 android:background 改变背景色，与通过`android:progressDrawable="@drawable/progress_horizontal"`-`<item android:id="@android:id/background">`改变效果不同。两者有什么区别？

- `android:background="@color/red"`  
  ![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_bg.png)

- `android:id="@android:id/background"`  
  ![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_thumb_shadow.png)

## Refs

- [SeekBar 的 thumbOffset 属性](https://blog.csdn.net/xiao5678yun/article/details/77774607)
