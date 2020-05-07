# SeekBar

- event

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
        // drag 停止
    }
    })
```

## 使用 Tint，改变 progress/secondProgress/background 的颜色。同`ProgressBar`

## 通过通过`android:progressDrawable="@drawable/progress_horizontal"`，改变 progress/secondProgress/background 的颜色。同`ProgressBar`

## MediaPlay 缓冲进度 与 SeekBar

- SeekBar android:progress = `MediaPlayer.getCurrentPosition()/mediaPlayer.getDuration()` 播放
- SeekBar android:secondProgress = `MediaPlayer.OnBufferingUpdateListener`-`void onBufferingUpdate(MediaPlayer mp, int percent)` 缓冲

# 2. QA

## QA:修改进步条的粗细？

![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_progress_big.png)

```
// 与progressBar 规则类似
android:layout_height="wrap_content"
android:maxHeight="1dp"
android:minHeight="1dp"
```

![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_progress_big.png)

## QA:第二进度的颜色没显示，显示的是第一进度的颜色：

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

## QA:如何修改 Thubm 的大小？

没有属性修改大小，只能重写 `android:thumb` 指向的 drawable

## QA:Seekbar thumb 上下显示不全

```
// 与progressBar 规则类似
android:layout_height="wrap_content"
android:maxHeight="1dp"
android:minHeight="1dp"
```

## QA:Seekbar thumb 滑动到最左边/最右边时显示不全

- `android:thumbOffset`:指示 thumb 在拖动条的进度最大值与最小值时相对于拖动条的偏移量

| thumbOffset 值 | 拖动条最小值时 thumb 位置                                                                                                          | 拖动条最大值时 thumb 位置                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 0              | thumb 的最左端与 SeekBar 的最左端对齐                                                                                              | thumb 的最右端与 SeekBar 的最右端对齐                                                                                               |
| 10dp           | thumb 的最左端比 SeekBar 的最左端小 10px,如果 SeekBar 设置的 android:paddingLeft 比 10px 要小，那么此时 thumb 会被遮挡掉左边的部分 | thumb 的最右端比 SeekBar 的最右端大 10px,如果 SeekBar 设置的 android:paddingRight 比 10px 要小，那么此时 thumb 会被遮挡掉右边的部分 |

## QA:SeekBar 拖动时，thumb 与 progress 之间有间隔？

- `android:splitTrack="true" -> false`
- 对系统默认属性的 SeekBar 设置无效

## QA：解决 SeekBar 拖动过程中 thumb 周围产生的圆形阴影/白色圆圈？

- 不设置背景，阴影圆圈使用的是系统自带的 seekbar 默认背景。  
  ![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_thumb_shadow.png)

- 设置背景为 null，或者指定设置一个颜色，阴影圆圈消失  
  `android:background="@null"`  
  ![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_thumb_miss_shadow.png)

## QA：单独设置背景？

`android:background="@color/red"`  
![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_bg.png)

## QA: Tint with enable + pressed status

android:thumbTint

# 3. PO

# 4. TBD

## TBD:`android:background` vs `android:id="@android:id/background"`

使用 android:background 改变背景色，与通过`android:progressDrawable="@drawable/progress_horizontal"`-`<item android:id="@android:id/background">`改变效果不同。两者有什么区别？

- `android:background="@color/red"`  
  ![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_bg.png)

- `android:id="@android:id/background"`  
  ![进步条的粗细](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/widget/seekbar/seekbar_thumb_shadow.png)

## Refs

- [SeekBar 的 thumbOffset 属性](https://blog.csdn.net/xiao5678yun/article/details/77774607)
