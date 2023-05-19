# LinearLayout

# Content

## Set TextView position is center in parent LinearLayout(vertical) and text is center

```
<LinearLayout android:orientation="vertical">
    <TextView>
</LinearLayout.
```

- ✗ **_position is only horizontal center in parent._**

LinearLayout，它可以通过`android:gravity`调整它的所有子控件是水平居中/垂直居中/居中。  
但子控件只能通过`android:layout_gravity`调整在 LinearLayout 中为水平居中，调整垂直居中无效。

```
android:layout_gravity="center"
/
LinearLayout.LayoutParams layoutParams = (LinearLayout.LayoutParams) textViewInFrameLayout.getLayoutParams();
textViewInFrameLayout.setLayoutParams(layoutParams);

```

- ✓ text is center

```
android:gravity="center"
/
textViewInFrameLayout.setGravity(Gravity.CENTER);
```

## layout_grivity VS grivity

- layout_grivity:在父布局的对齐方式
- grivity:本身内置内容的齐方式

## baselineAligned

- 基准线对齐，默认是基准线对齐
- 设置内容 android:gravity="center"后，如果是高度不一致，导致整体不是中心对齐  
  Solution:

```
baselineAligned=flase
```

## layout_weight

- android:layout_weight/android:weightSum
- 实现按比例分配尺寸  
  先按具体尺寸分配，再按比例（(layout_weight/weightSum)）分配剩余尺寸.  
  剩余的尺寸可以是负值

- `android:weightSum（通常10）`和`android:layout_weight`最好是整型，避免浮点运算

# PO

## `android:weightSum（通常10）`和`android:layout_weight`最好是整型，避免浮点运算

## When use android:layout_weight, layout_width or layout_height is 0dp

减少不必要的 layout 和 measure 步骤

# Refs

- [layout_weight](https://www.imooc.com/video/10165)
- [baselineAligned](https://www.cnblogs.com/JohnTsai/p/4074643.html)
