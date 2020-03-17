# Custom View
`AttributeActivity.java`  
`AlphaImageView.java`  
`custom_view`  

## Constructor
- 默认执行第二个构造函数
- 第三个构造函数是主动调用的，不会自动调用
```
// Simple constructor to use when creating a view from code
public RectView(Context context) 

// Constructor that is called when inflating a view from XML
public RectView(Context context, @Nullable AttributeSet attrs)  

// //Perform inflation from XML and apply a class-specific base style
public RectView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) 
```
### AttributeSet ? TypedArray?
- AttributeSet 是layout XML中定义属性的键值对，值为引用
- TypedArray转化了AttributeSet，方便自定义属性取值

```
当前属性索引为：6,索引名为：layout_marginTop
当前属性索引为：8,索引名为：style,当前属性值为：：@2131951840
```

## Custom Attribute for Custom View
### 自定义属性形式1~5的优先级从高到低
```
1-Attribute in XML
2-Style in XML
3-Style in Theme
4-Default style in Custom View
5-Attribute in Theme
```
#### Context.obtainStyledAttributes(AttributeSet set, @StyleableRes int[] attrs, @AttrRes int defStyleAttr,@StyleRes int defStyleRes) 

##### 1-Attribute in XML => AttributeSet
public RectView(Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) 

AttributeSet:
```
<RectView>
    app:rvText="@string/attribute_1_attribute_in_xml"
</RectView>
```
##### 2-Style in XML => AttributeSet

```
<RectView
    style="@style/RectView_StyleInXml" />
```


##### 3-Style in Theme => `defStyleAttr`
```
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="rectViewStyle">@style/RectView_StyleInTheme</item>
</style>


// No 1-Attribute in XML
// No 2-Style in XML
// attr rectViewStyle in theme, so defStyleAttr: R.attr.rectViewStyle=@style/RectView_StyleInTheme attr in theme
// =>  
// defStyleAttr
 public RectView(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, R.attr.rectViewStyle);
        Log.d(TAG, "RectView: 2");
}

public RectView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
    TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.RectView, defStyleAttr, R.style.RectView_DefaultStyle);
}
```

##### 4-Default style in Custom View => defStyleRes
```
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <!--<item name="rectViewStyle">@style/RectView_StyleInTheme</item>-->
</style>

 public RectView(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, R.attr.rectViewStyle);
        Log.d(TAG, "RectView: 2");
}

// No 1-Attribute in XML
// No 2-Style in XML
// No 3-Style in Theme
// defStyleRes = R.style.RectView_DefaultStyle
// =>  
// defStyleRes
public RectView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
    TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.RectView, defStyleAttr, R.style.RectView_DefaultStyle);
}
        
```

##### 5-Attribute in Theme
```
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
<!--<item name="rectViewStyle">@style/RectView_StyleInTheme</item>-->
<item name="rvText">@string/attribute_5_attribute_in_theme</item>
</style>

 public RectView(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, R.attr.rectViewStyle);
        Log.d(TAG, "RectView: 2");
}

// No 1-Attribute in XML
// No 2-Style in XML
// No 3-Style in Theme
// No 4-Default style in Custom View:defStyleRes = 0
// attr rvText in AppTheme
// =>  
// attribute rvText in theme
public RectView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
    TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.RectView, defStyleAttr,0 );
}
        
```

## [Custom Attribute for Custom View](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/doc/android/resource/Styles_and_Themes.md#custom-attribute-for-custom-view) 

# 如何创建：扑克牌游戏中的玩家手牌
## 方法1：使用RelativeLayout，然后为内部 view 空间指定 margin 属性值。

优点
- 在不同Activity中复用该视图时,更易维护。
- 开发者可以使用自定义属性来定制ViewGroup中子视图的位置。
- 布局文件更简明,更容易理解。
- 如果需要修改margin,不必重新手动计算每个子视图的margin
	

创建CascadeLayout
- checkLayoutParams
- generateDefaultLayoutParams
- generateLayoutParams(AttributeSet)
- generateLayoutParams(ViewGroup.LayoutParams)   
这些方法的代码在不同 ViewGroup 之间往往是相同的


重点重写函数 
- 重构函数
- onMeasure
- onLayout
	

## 方法2：创建自定义 viewgroup

# Paint
- paint.setColor(getColor()); //设置画笔颜色
- paint.setAlpha((int) (0.8 * 255));// colorId已经包含了透明度，再setAlpha()也没有影响

# ERROR:
## ERROR:`NoSuchMethodException`
```
android.view.InflateException: Binary XML file line #21: Binary XML file line #21: Error inflating class com.hades.example.android.widget.custom_view.MyView1
    Caused by: android.view.InflateException: Binary XML file line #21: Error inflating class com.hades.example.android.widget.custom_view.MyView1
    Caused by: java.lang.NoSuchMethodException: <init> [class android.content.Context, interface android.util.AttributeSet]
```
Reason:  
View的构造函数书写有误，三个构造方法必须在你自定义的中实现

## Canvas
```
canvas.drawColor(Color.BLACK); // 设置画布颜色

Paint.setAntiAlias(true) // 去锯齿。 antialiasing 反锯齿，反走样，放叠处理
paint.setColor(Color.GREEN)
paint.setStyle(Paint.Style.STROKE)  // STROKE 描边 -> 边框
paint.setStyle(Paint.Style.FILL)
paint.setStrokeWidth(10)
```
# Refs:    
- [自定义View：关于Caused by: java.lang.NoSuchMethodException异常](https://blog.csdn.net/sinat_19176567/article/details/51198372)
- [View 属性覆盖的优先级](https://www.jianshu.com/p/c6b9cd6aab75)
- https://developer.android.google.cn/guide/topics/ui/how-android-draws.html
- https://developer.android.google.cn/reference/android/view/ViewGroup.html
- https://developer.android.google.cn/reference/android/view/ViewGroup.LayoutParams.html 