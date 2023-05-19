# Custom View

`AttributeActivity.java`  
`AlphaImageView.java`  
`custom_view`

自定义 View 涉及到的知识点：坐标系、Paint、Canvas、重写方法、计算宽度和高度、属性、图层、合成图像等。
难点：计算 left、top、right、bottom 的位置

# 1 Android 图像处理 中比较重要的概念，而非类

- canvas：画布，对应 canvas 类。
- paint：画笔，对应 Paint 类
- drawing primitive：绘制原始内容。在 Android 中，Path,Rect、Text、Bitmap 都是 drawing primitive 的角色。  
  Canvas 中的 drawXXX 系列函数中的 XXX 都是指 drawing primitive。

# 1 重写函数：TODO

## [Constructor](./CustomView_Attr.md)

View 初始化、设置自定义属性

## onMeasure 测量 View ⼤⼩

## onSizeChanged 确定 View ⼤⼩

## onLayout 确定⼦ View 布局位置

## onDraw 实际绘制内容

## 提供接⼝ 监听 View 状态

# 2 如何创建：扑克牌游戏中的玩家手牌

`CascadeLayoutActivity.java`

- 方法 1：使用 RelativeLayout，然后为内部 view 空间指定 margin 属性值。

优点：  
在不同 Activity 中复用该视图时,更易维护。  
开发者可以使用自定义属性来定制 ViewGroup 中子视图的位置。  
布局文件更简明,更容易理解。  
如果需要修改 margin,不必重新手动计算每个子视图的 margin

创建 CascadeLayout：  
checkLayoutParams  
generateDefaultLayoutParams  
generateLayoutParams(AttributeSet)  
generateLayoutParams(ViewGroup.LayoutParams)  
这些方法的代码在不同 ViewGroup 之间往往是相同的

重点重写函数：  
重构函数  
onMeasure  
onLayout

- 方法 2：创建自定义 viewgroup

# 4 坐标系

- Android 坐标轴  
  ![android 坐标轴](https://yingvickycao.github.io/img/android/widget/android_coordinate_axis.png)

- View 坐标与父容器的关系
  ![X-Y axis](https://yingvickycao.github.io/img/android/widget/custom_view_view_pos_var.png)

# [5 Paint](./Paint.md)

# [6 Canvas](./Canvas.md)

# 7 双缓冲

例子：利用双缓冲实现画板 `DrawingBoardView.java`

# 9 颜⾊矩阵 - ColorMatrix

# FAQ

- ERROR:`NoSuchMethodException`

```
android.view.InflateException: Binary XML file line #21: Binary XML file line #21: Error inflating class com.hades.example.android.widget.custom_view.MyView1
    Caused by: android.view.InflateException: Binary XML file line #21: Error inflating class com.hades.example.android.widget.custom_view.MyView1
    Caused by: java.lang.NoSuchMethodException: <init> [class android.content.Context, interface android.util.AttributeSet]
```

Reason:  
View 的构造函数书写有误，三个构造方法必须在你自定义的中实现。

# Refs:

- [自定义 View：关于 Caused by: java.lang.NoSuchMethodException 异常](https://blog.csdn.net/sinat_19176567/article/details/51198372)
- [View 属性覆盖的优先级](https://www.jianshu.com/p/c6b9cd6aab75)
- https://developer.android.google.cn/guide/topics/ui/how-android-draws.html
- https://developer.android.google.cn/reference/android/view/ViewGroup.html
- https://developer.android.google.cn/reference/android/view/ViewGroup.LayoutParams.html
