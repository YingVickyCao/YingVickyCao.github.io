# Custom View - 自定义属性

`AttributeActivity.java`  
`RectView`

# 1 Constructor

```java
// Simple constructor to use when creating a view from code
public RectView(Context context)

// 默认执行第二个构造函数
// Constructor that is called when inflating a view from XML
public RectView(Context context, @Nullable AttributeSet attrs)

// 第三个构造函数是主动调用的，不会自动调用
// Perform inflation from XML and apply a class-specific base style
public RectView(Context context, @Nullable AttributeSet attrs, int defStyleAttr)
```

- AttributeSet ? TypedArray?

AttributeSet 是 layout XML 中定义属性的键值对，值为引用
TypedArray 转化了 AttributeSet，方便自定义属性取值

```
当前属性索引为：6,索引名为：layout_marginTop
当前属性索引为：8,索引名为：style,当前属性值为：：@2131951840
```

# 2 Custom Attribute for Custom View

Link [Custom Attribute for Custom View](../../resource/Styles_and_Themes.md#custom-attribute-for-custom-view)

- 自定义属性形式 1~5 的优先级从高到低

```xml
1-Attribute in XML
2-Style in XML
3-Style in Theme
4-Default style in Custom View
5-Attribute in Theme
```

```java
Context.obtainStyledAttributes(AttributeSet set, @StyleableRes int[] attrs, @AttrRes int defStyleAttr,@StyleRes int defStyleRes)
```

- 1-Attribute in XML => AttributeSet

public RectView(Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes)

AttributeSet:

```xml
<RectView>
    app:rvText="@string/attribute_1_attribute_in_xml"
</RectView>
```

- 2-Style in XML => AttributeSet

```xml
<RectView
    style="@style/RectView_StyleInXml" />
```

- 3-Style in Theme => `defStyleAttr`

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="rectViewStyle">@style/RectView_StyleInTheme</item>
</style>
```

```java
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

- 4-Default style in Custom View => defStyleRes

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <!--<item name="rectViewStyle">@style/RectView_StyleInTheme</item>-->
</style>

 public RectView(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, R.attr.rectViewStyle);
        Log.d(TAG, "RectView: 2");
}
```

```java
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

- 5-Attribute in Theme

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
<!--<item name="rectViewStyle">@style/RectView_StyleInTheme</item>-->
<item name="rvText">@string/attribute_5_attribute_in_theme</item>
</style>
```

```java
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
