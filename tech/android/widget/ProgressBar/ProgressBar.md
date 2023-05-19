# ProgressBar

# 1. Default is middle circular style

```
style="?android:attr/progressBarStyleLarge" // Large  Circular
style="?android:attr/progressBarStyle"      // Middle Circular => Default
style="?android:attr/progressBarStyleSmall" // Small  Circular

style="?android:attr/progressBarStyleLargeInverse" // Large  Circular,TBD
style="?android:attr/progressBarStyleInverse"      // Middle Circular,TBD
style="?android:attr/progressBarStyleSmallInverse" // Small  Circular,TBD

```

```
style="?android:attr/progressBarStyleHorizontal" // 水平
```

| Attribute/Method              | Usage                                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| android:max                   | 滚动条最大值                                                                                                                         |
| android:progress              | 滚动条当前值. =>当期播放进度.setProgress()                                                                                           |
| android:secondaryProgress     | 滚动条第二进度. =>播放缓冲进度. setSecondaryProgress()                                                                               |
| incrementProgressBy           | +/- progress                                                                                                                         |
| incrementSecondaryProgressBy  | +/- secondProgress                                                                                                                   |
| android:layout_height         | ProgressBar 的 Height                                                                                                                |
| android:minHeight             | ProgressBar 的 min Height                                                                                                            |
| android:maxHeight             | ProgressBar 的 max Height                                                                                                            |
| android:layout_width          | ProgressBar 的 with                                                                                                                  |
| android:minWidth              | ProgressBar 的 min with                                                                                                              |
| android:maxWidth              | ProgressBar 的 max with                                                                                                              |
| android:indeterminate         | - ProgressBar 是否不确定显示。水平默认 false-确定。circular 默认是 true-不精确                                                       |
| android:indeterminateBehavior | 定义当进度达到最大时，不确定模式的表现；该值为 repeat 或者 cycle，repeat 表示进度从 0 重新开始；cycle 表示进度保持当前值，并且回到 0 |
| android:indeterminateDrawable | -                                                                                                                                    |
| android:indeterminateOnly     | 限制为不定模式                                                                                                                       |
| android:indeterminateDuration | -                                                                                                                                    |
| android:indeterminateDrawable | -                                                                                                                                    |

```

<style name="Widget.ProgressBar">
    <item name="indeterminateOnly">true</item>
    <item name="indeterminateDrawable">@drawable/progress_medium_white</item>
    <item name="indeterminateBehavior">repeat</item>
    <item name="indeterminateDuration">3500</item>
    <item name="minWidth">48dip</item>
    <item name="maxWidth">48dip</item>
    <item name="minHeight">48dip</item>
    <item name="maxHeight">48dip</item>
    <item name="mirrorForRtl">false</item>
</style>

<style name="Widget.ProgressBar.Horizontal">
    <item name="indeterminateOnly">false</item>
    <item name="progressDrawable">@drawable/progress_horizontal</item>
    <item name="indeterminateDrawable">@drawable/progress_indeterminate_horizontal</item>
    <item name="minHeight">20dip</item>
    <item name="maxHeight">20dip</item>
    <item name="mirrorForRtl">true</item>
</style>
```

## 2. 粗细、高

```
android:layout_height vs (android:maxHeight and android:minHeight):
1) 哪个更具体用哪个.
2) Both具体时时，哪个数值更大用哪个

```

- 该规则适用于其他 Widget，其他 Button
- 进度条的 Height 与 ProgressBar 的 Height 不是一回事。前者<=后者
- width 同样适合该规则

```
android:layout_height="wrap_content"
android:maxHeight="2dp"
android:minHeight="2dp"
=>2dp. 更具体
```

![进步条的粗细](https://yingvickycao.github.io/img/android/widget/seekbar/seekbar_progress_big.png)

```
android:layout_height="match_parent"
android:maxHeight="2dp"
android:minHeight="2dp"
=>2dp. 更具体
```

```
android:layout_height="40dp"
android:maxHeight="2dp"
android:minHeight="2dp"
=>40dp. 数值更大
```

# 3. Tint

| Tint Works or not?Horizontal | Yes / No?                      |
| ---------------------------- | ------------------------------ |
| thumbTint                    | ✓                              |
| progressTint                 | ✓                              |
| secondProgressTint           | ✓                              |
| backgroundTint               | ✗                              |
| background                   | ✓                              |
| backgroundTint + background  | backgroundTint ✓, background ✗ |

| Tint Works or not? Circular | Yes / No? |
| --------------------------- | --------- |
| indeterminateTint           | ✓         |

https://www.jianshu.com/p/f7caea66973b

- 规则适合于 SeekBar

# 4. Custom 进度条的背景色、progress and secondaryProgress bg color

- Method1: Tint
- Method2: 定义一个 drawable 用于 progressDrawable.  
  `android:progressDrawable="@drawable/progress_horizontal_material"`

# 5. ?android:attr vs @android:style

`style="?android:attr/progressBarStyleHorizontal"`  
`style="@android:style/Widget.ProgressBar.Horizontal"`

- @android: 引用 android 内建的系统资源  
  与 compileSdkVersion 指定的 API level 系统资源 theme 中的东西  
  在不同的 theme 中，progressBarStyleHorizontal 引用的 style 是不同的

```
<item name="progressBarStyleHorizontal">@style/Widget.ProgressBar.Horizontal</item>
<item name="progressBarStyleHorizontal">@style/Widget.Holo.ProgressBar.Horizontal</item>

<style name="AppThemeSdk1" parent="@android:style/Widget.ProgressBar.Horizontal">
</style>

```

- ?android: 引用系统内建的属性资源  
  引用的是手机系统 OS 当前 theme 中的东西  
  ？表示从 Theme 中查找引用的资源名，例如上面的 progressBarStyleHorizontal，查看`\platforms\Android-23\data\res\values\themes.xml`.

```
android:background="?android:attr/colorReallyGreen"

```

# TBD:

- Inverse

# Refs

- https://blog.csdn.net/chen930724/article/details/49807821
- https://www.jianshu.com/p/4bdb77e034b8
- https://www.jianshu.com/p/f7caea66973b
