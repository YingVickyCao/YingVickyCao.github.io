# ConstraintLayout

API >= 9

# 1. currently various types of constraints

## Relative positioning

list of available constraints
```
layout_constraintLeft_toLeftOf
layout_constraintLeft_toRightOf
layout_constraintRight_toLeftOf
layout_constraintRight_toRightOf
layout_constraintTop_toTopOf
layout_constraintTop_toBottomOf
layout_constraintBottom_toTopOf
layout_constraintBottom_toBottomOf
layout_constraintBaseline_toBaselineOf // ?
layout_constraintStart_toEndOf
layout_constraintStart_toStartOf
layout_constraintEnd_toStartOf
layout_constraintEnd_toEndOf
```

## Margins

Margins when connected to a GONE widget
layout_goneMarginStart
layout_goneMarginEnd
layout_goneMarginLeft
layout_goneMarginTop
layout_goneMarginRight
layout_goneMarginBottom

## Centering positioning
- app:layout_constraintVertical_bias="0.2"
- app:layout_constraintHorizontal_bias="0.2"

```
<!--垂直居中-->
app:layout_constraintTop_toTopOf="parent"
app:layout_constraintBottom_toBottomOf="parent"

<!--垂直=2:8-->
app:layout_constraintTop_toTopOf="parent"
app:layout_constraintBottom_toBottomOf="parent"
app:layout_constraintVertical_bias="0.2"

<!-- 水平居中 --> 
app:layout_constraintEnd_toEndOf="parent"
app:layout_constraintStart_toStartOf="parent"

<!-- 水平=2:8 --> 
app:layout_constraintEnd_toEndOf="parent"
app:layout_constraintStart_toStartOf="parent"
app:layout_constraintHorizontal_bias="0.2"
```

## Circular positioning
![Fig. 6 - Circular Positioning](https://developer.android.google.cn/reference/android/support/constraint/resources/images/circle1.png)

![Fig. 6 - Circular Positioning](https://developer.android.google.cn/reference/android/support/constraint/resources/images/circle2.png)


- `layout_constraintCircle` :references another widget id
- `layout_constraintCircleRadius` : the distance to the other widget center,default = 0
- `layout_constraintCircleAngle` : which angle the widget should be at (in degrees, from 0 to 360),default = 0

## Visibility behavior

## Dimension constraints

### Case 1: [Minimum dimensions on ConstraintLayout](https://developer.android.google.cn/reference/android/support/constraint/ConstraintLayout#minimum-dimensions-on-constraintlayout)

***`widget_constraintlayout_dimension_constraints.xml`***  
***`widget_relativelayout_dimension_constraints.xml`***  

```
android:minWidth set the minimum width for the layout
android:minHeight set the minimum height for the layout
android:maxWidth set the maximum width for the layout
android:maxHeight set the maximum height for the layout
Those minimum and maximum dimensions will be used by ConstraintLayout when its dimensions are set to WRAP_CONTENT.
```
在 RelativeLayout中测试中，下面结论成立。故推测该规则和结论适用于其他View。    
测试以height为例

```
wrap_content_height = 情况1的高度：当行文字，android:layout_height="wrap_content"

1.required least size < height=wrap_content (✓)
```

- minHeight 不用，高度：If 单行 = least_required_height；If 多行=自动高度，实际上wrap_content生效了.
minHeight 够用，高度 ：minHeight
```
2. minHeight=1 < required least size(✓) < height=wrap_content 
3. minHeight=1 < required least size(✓) > height=wrap_content
4. minHeight=100 (✓) > height=wrap_content > required least size
```

- 无论maxHeight够不够用，height = text为单行文字时的wrap_content_height
```
5. maxHeight=1 < required least size < height=wrap_content(✓)
6. maxHeight=1 < required least size > height=wrap_content(✓)
7. maxHeight=100 > height=wrap_content(✓) > required least size
```

- minHeight 和maxHeight 仅当android:layout_height="wrap_content"时才有效。当android:layout_heightWi具体值时，即使文字显示不全，minHeight 和maxHeight也不会生效,height仍然是设置的具体值。

```
8. minHeight=100 > height=30(✓)
9. maxHeight=1 < height=20(✓)
```

### Case 2: Widgets dimension constraints
```
The dimension of the widgets can be specified by setting the android:layout_width and android:layout_height attributes in 3 different ways:  
Using a specific dimension (either a literal value such as 123dp or a Dimension reference)
Using WRAP_CONTENT, which will ask the widget to compute its own size
Using 0dp, which is the equivalent of "MATCH_CONSTRAINT"
```


### Case 3：WRAP_CONTENT : enforcing constraints (Added in 1.1)

### Case 4：MATCH_CONSTRAINT dimensions (Added in 1.1)

### Case 5：Min and Max

### Case 6： Ratio

## Chains
## Virtual Helpers objects
## Optimizer

---

# 2. Content

## baseline

## 0dp = `MATCH_CONSTRAINT` = 100%

## app:layout_constraintDimensionRatio（简称Ratio）

- Ratio = With:Height

### Case1
```

android:layout_width="0dp"
android:layout_height="200dp"
app:layout_constraintDimensionRatio="1:2"
app:layout_constraintDimensionRatio="W,1:2"
app:layout_constraintS_toStartOf
```

- Width 和 Height 仅有一个with=0dp， Width ?  <=  Height,
- `app:layout_constraintDimensionRatio="1:2"`  等价于 `app:layout_constraintDimensionRatio="W,1:2"`:  
不必标示W
- 垂直与水平方向，至少有一个约束，否则Ratio失效，等价于Width = wrap_content

### Case2
- With和Height  0dp 以外的具体尺寸（包括wrap_content），Ratio 失效
```
android:layout_width="100dp"
android:layout_height="200dp"
app:layout_constraintDimensionRatio="1:1"
```

## `app:layout_goneMarginStart`
constraint  id 为 gone 时， 生效

## `android:layout_marginStart`
constraint  id 为非 gone 时， 生效

# 2. QA 
## QA:ConstraintLayout 与ScrollView 嵌套时ScrollView 内容没有完全显示?
ConstraintLayout 布局中有ScrollView 时，ScrollView 的宽高要设置为0dp 才可以正确的约束布局   
`widget_seekbar.xml`
```
<android.support.constraint.ConstraintLayout>
    <TextView
        android:id="@+id/topic"
        style="@style/topic"
        android:text="@string/page_SeekBar"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
        
    <ScrollView
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/topic">
    </ScrollView/
  
</android.support.constraint.ConstraintLayout>
```

## QA:This view is not constrained vertically
Question:  
项目迁移到AndroidX后，运行项目时发现androidx.constraintlayout.widget.ConstraintLayout布局中的子控件提示错误:

> This view is not constrained vertically: at runtime it will jump to the top unless you add a vertical constraint less... (⌘F1) 
Inspection info:The layout editor allows you to place widgets anywhere on the canvas, and it records the current position with designtime attributes (such as layout_editor_absoluteX). These attributes are not applied at runtime, so if you push your layout on a device, the widgets may appear in a different location than shown in the editor. To fix this, make sure a widget has both horizontal and vertical constraints by dragging from the edge connections.  Issue id: MissingConstraints

Reason:  
ConstraintLayout中的约束条件要完整：同时具有水平和垂直的约束

Fix:

```
<androidx.constraintlayout.widget.ConstraintLayout>
    <TextView
        app:layout_constraintStart_toStartOf="parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>

```

=>
```
<androidx.constraintlayout.widget.ConstraintLayout>
    <TextView
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```


# 3. PO

## 4.TBD

## Refs
- [解决ConstraintLayout 与ScrollView 嵌套时ScrollView 内容没有完全显示](https://blog.csdn.net/sheilazxx/article/details/79194920)

https://developer.android.google.cn/reference/android/support/constraint/ConstraintLayout

https://blog.csdn.net/suwenlai/article/details/72841775
https://blog.csdn.net/zhaizu/article/details/48606207