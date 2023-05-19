# Font

TestFontFragment.java

# [1 Font 基本概念](Font_Basic.md)

# 2 CSS

## font-style

```
Name: font-style
Value:
normal
italic：使用字体的倾斜字体。若当前文字没有倾斜字体，使用oblique。
oblique :单纯让文字倾斜。几乎不使用它。
```

## 字重

```css
font-weight: normal/bold/100 200 300 400 500 600 700 800 900;
```

## 字体大小

```css
/* css */
font-size
```

```xml
<!--android  -->
android:textSize
```

# 3 关于影响 Android 字体显示的三个属性

## android:textStyle

value：normal，bold，italic

```xml
<attr name="textStyle">
<flag name="normal" value="0" />
<flag name="bold" value="1" />
<flag name="italic" value="2" />
</attr>
```

在代码中设置字体样式只能设置一种，不能叠加

- 设置使用默认字体

```xml
mTextView.setTypeface(null, Typeface.BOLD_ITALIC)
```

- When `>=` Android 8.0(26)，使用自定义字体

```java
// 通过代码设置font
 TextView fontText = view.findViewById(R.id.fontText);
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    // Use single font
    Typeface typeface = getResources().getFont(R.font.consolas_bold_italic);
    fontText.setTypeface(typeface);
    // Use font family
    // fontText.setTypeface(getResources().getFont(R.font.consolas_fonts_since_api_26), Typeface.BOLD_ITALIC);
}
```

- When `>=` Android 4.1(16)，使用自定义字体

```java
// 通过代码设置font
//  使用Support library 支持库
TextView fontText2 = view.findViewById(R.id.fontText2);
Typeface typeface2 = ResourcesCompat.getFont(getActivity(), R.font.consolab);
fontText2.setTypeface(typeface2);
```

## android:typeface

typeface 主要用于设置 TextView 的字体.

```xml
android:typeface="monospace"

<!-- TextView 的自定义属性 typeface -->
<attr name="typeface">
<!-- 普通字体，系统默认使用的字体 -->
<enum name="normal" value="0" />
<!-- sans：非衬线字体 -->
<enum name="sans" value="1" />
<!-- serif：衬线字体 -->
<enum name="serif" value="2" />
<!-- monospace：等宽字体 -->
<enum name="monospace" value="3" />
</attr>
```

每次只能设置一种字体，不能叠加.

![font_typeface_serif_2](https://gitee.com/YingVickyCao/img/raw/main/android/resources/font_typeface_serif_2.png)

```
mTv.setTypeface(Typeface.SERIF)
```

## android:fontFamily

设置一系列字体。

```xml
<!-- TextView 的自定义属性 fontFamily -->
<attr name="fontFamily" format="string" />
```

```xml
android:fontFamily:"sans-serif"
```

```java
mTv.setTypeface(Typeface.create("sans-serif",Typeface.NORMAL))
```

## textStyle vs typeface vs fontmaily

`res_font_4_typeface_vs_textfamily.xml`
这三个属性能影响字体的显示效果。

```xml
<TextView
    style="@style/tv"
    android:fontFamily="@font/consolaz"
    android:text="@string/test_string"
    android:textSize="30sp"
    android:textStyle="bold|italic"
    android:typeface="monospace" />
```

- android:typeface (Depressed)  
  API 1 added。  
  用于设置系统默认字体。  
  values:normal,series（带衬线）, sans, monospace（等宽）.

- android:fontFamily  
  API 16 added。  
  用于设置系统默认字体和外部字体。  
  与 android:typeface 相比，它能支持更多的字体。

- 当同时使用 android:fontFamily 和 android:typeface 时，android:fontFamily 有效，android:typeface 被忽略。

# 4 查看 Android 系统的字体

android 系统的字体文件放在 `/system/fonts/'，`xxx.ttf`。  
 如何查看？  
 Way 1 : sdk/platforms/android-XXX/data/fonts, or search ".ttf" on sdk。  
 Way 2 : Android Studio 用 Device File Exploerer 查看 模拟器。

android 系统的字体配置文件`/system/etc/`,`system_fonts.xml` 和 `fallback_fonts.xml`。  
系统需要加载字体时，会优先从 system_fonts.xml 文件开始查找，如果没有找到再进入 fallback_fonts.xml 查找。  
如何查看？  
Way 1 : sdk/platforms/android-XXX/data/fonts/fonts.xml, or search "fonts.xml" on sdk.  
Way 2 : Android Studio 用 Device File Exploerer 查看 模拟器。

```xml
<!-- fonts.xml -->
    <!-- first font is default -->
    <family name="sans-serif">
        <font weight="100" style="normal">Roboto-Thin.ttf</font>
        <font weight="100" style="italic">Roboto-ThinItalic.ttf</font>
        <font weight="300" style="normal">Roboto-Light.ttf</font>
        <font weight="300" style="italic">Roboto-LightItalic.ttf</font>

        <!-- android:fontfamily="sans-serif" -->
        <font weight="400" style="normal">Roboto-Regular.ttf</font>
          <!-- android:fontfamily="sans-serif"  android:textStyle="italic" -->
        <font weight="400" style="italic">Roboto-Italic.ttf</font>

        <font weight="500" style="normal">Roboto-Medium.ttf</font>
        <font weight="500" style="italic">Roboto-MediumItalic.ttf</font>
        <font weight="900" style="normal">Roboto-Black.ttf</font>
        <font weight="900" style="italic">Roboto-BlackItalic.ttf</font>

          <!-- android:fontfamily="sans-serif"  android:textStyle="bold" -->
        <font weight="700" style="normal">Roboto-Bold.ttf</font>
         <!-- android:fontfamily="sans-serif"  android:textStyle="bold|italic" -->
        <font weight="700" style="italic">Roboto-BoldItalic.ttf</font>
    </family>

    <!-- Note that aliases must come after the fonts they reference. -->
    <alias name="sans-serif-thin" to="sans-serif" weight="100" />
    <alias name="sans-serif-light" to="sans-serif" weight="300" />
    <alias name="sans-serif-medium" to="sans-serif" weight="500" />
    <alias name="sans-serif-black" to="sans-serif" weight="900" />
```

```xml
<!-- Usage -->
<!-- Roboto-Medium.ttf : -->
android:fontMamily="sans-serif-medium"

Roboto-MediumItalic.ttf:
android:fontMamily="sans-serif-medium"
android:textStyle="italic"
```

![fallback_fonts_xml](https://gitee.com/YingVickyCao/img/raw/main/android/resources/fallback_fonts_xml.png)

如何生效的？
android:text-style="normal/bold/italic" 决定了 Roboto-Regular.ttf / Roboto-Italic.ttf / Roboto-Bold.ttf / Roboto-BoldItalic.ttf，它们属于一个 font family。  
thin/light/medium/black 属于另外一个 font family，用 alias 化成不同分类，由 android:text-style="normal/italic"决定。

# 5 使用自带默认字体

TestFontFragment.java
`res_font_4_default.xml`

```xml
<!-- Thin /Light /Medium/ Black ？ 以 Light 为例-->
<!-- START -->
<!-- Roboto-Light.ttf -->
android:fontFamily="sans-serif-light"

<!-- Roboto-LightItalic.ttf -->
android:fontFamily="sans-serif-light"
android:textStyle="italic"
<!-- END -->
```

```xml
<!-- Regular / Bold  -->
<!-- Roboto-Regular.ttf -->
android:textStyle="normal" / 不写

<!-- Roboto-Italic.ttf -->
android:textStyle="italic"

<!-- Roboto-Bold.ttf -->
android:textStyle="bold"

<!-- Roboto-BoldItalic.ttf -->
android:textStyle="italic|bold"/android:textStyle="bold|italic"
```

# 6 使用自定义字体

## When `>=` Android 8.0(26)

用 `android:fontFamily` Attribute font is only used in API level 26 and higher.
`res_font_4_single_font_vs_font_family_since_api_26.xml, res_font_4_single_font_vs_single_font_adding_textstyle_since_api_26.xml`

- Step 1 : 加入 font 文件  
  res/font

- Step 2 : 创建 font-family XML

```xml
<!-- res/font/averia_fonts_sicne_api_26.xml -->
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Depressed,start   -->
    <font
        android:font="@font/averia_light"
        android:fontStyle="normal"
        android:fontWeight="300" />

    <font
        android:font="@font/averia_light_italic"
        android:fontStyle="italic"
        android:fontWeight="300" />
    <!-- Depressed,end  -->
    <font
        android:font="@font/averia_regular"
        android:fontStyle="normal"
        android:fontWeight="400" />
    <font
        android:font="@font/averia_italic"
        android:fontStyle="italic"
        android:fontWeight="400" />
    <font
        android:font="@font/averia_bold"
        android:fontStyle="normal"
        android:fontWeight="700" />
    <font
        android:font="@font/averia_bold_italic"
        android:fontStyle="italic"
        android:fontWeight="700" />
</font-family>
```

```xml
<!-- res/font/averia_light_fonts_sicne_api_26.xml -->
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Recommended,start  -->
    <font
        android:font="@font/averia_light"
        android:fontStyle="normal"
        android:fontWeight="300" />

    <font
        android:font="@font/averia_light_italic"
        android:fontStyle="italic"
        android:fontWeight="300" />
    <!-- Recommended,end  -->
</font-family>
```

Step 3 : 使用 font 字体

```xml
<!-- Light       -->

<!-- Way 1 : 使用单个 font 字体  -->
<!--  推荐      -->
android:fontFamily="@font/averia_light"

<!-- Way 2 : 与 regular 和 bold 放在一个font xml中，并用fontweight属性定位 light 字体  -->
android:fontFamily="@font/averia_fonts_sicne_api_26"
android:textFontWeight="300"

<!-- Way 3 : ligth 单独放在一个font xml中，并用fontweight属性定位 light 字体  -->
<!--  推荐      -->
android:fontFamily="@font/averia_light_fonts_sicne_api_26"
```

```xml
<!-- Light  I     -->

<!-- Way 1 : 使用单个 font 字体  -->
<!--  推荐      -->
android:fontFamily="@font/averia_light_italic"

<!-- Way 2 : 与 regular 和 bold 放在一个font xml中，并用fontweight属性定位 light 字体  -->
android:fontFamily="@font/averia_fonts_sicne_api_26"
android:textFontWeight="300"
android:textStyle="italic"

<!-- Way 3 : ligth 单独放在一个font xml中，并用fontweight属性定位 light 字体  -->
<!--  推荐      -->
android:fontFamily="@font/averia_light_fonts_sicne_api_26"
android:textStyle="italic"
```

```xml
<!-- Regular / Bold  -->
<!-- Regular.ttf -->
<!-- 使用字体家族(Recommended) -->
android:fontFamily="@font/averia_fonts_sicne_api_26"
/
<!-- 使用单独字体-->
android:fontFamily="@font/averia_regular"


<!-- Italic.ttf -->
<!-- 使用字体家族(Recommended) -->
android:fontFamily="@font/averia_fonts_sicne_api_26"
android:textStyle="italic"
/
<!-- 使用单独字体-->
android:fontFamily="@font/averia_italic"

<!-- Bold.ttf -->
<!-- 使用字体家族(Recommended) -->
android:fontFamily="@font/averia_fonts_sicne_api_26"
android:textStyle="bold"
/
<!-- 使用单独字体-->
android:fontFamily="@font/averia_bold"

<!-- BoldItalic.ttf -->
<!-- 使用字体家族(Recommended) -->
android:fontFamily="@font/averia_fonts_sicne_api_26"
android:textStyle="italic|bold"/android:textStyle="bold|italic"
/
<!-- 使用单独字体-->
android:fontFamily="@font/averia_bold_italic"
```

## When `>=` Android 4.1(16)

用 Support library 26.0（最小版本）来支持使用 `app:fontFamily`.  
`res_font_4_single_font_vs_font_family_since_api_16.xml, res_font_4_single_font_vs_single_font_adding_textstyle_since_api_16.xml`

- Step 1 : 加入 font 文件  
  res/font

Step 2 : 创建 font-family XML

```xml
<!-- res/font/averia_fonts_sicne_api_26.xml -->
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <!-- Depressed,start   -->
    <font
        app:font="@font/averia_light"
        app:fontStyle="normal"
        app:fontWeight="300" />

    <font
        app:font="@font/averia_light_italic"
        app:fontStyle="italic"
        app:fontWeight="300" />
    <!-- Depressed,end  -->

    <font
        app:font="@font/averia_regular"
        app:fontStyle="normal"
        app:fontWeight="400" />
    <font
        app:font="@font/averia_italic"
        app:fontStyle="italic"
        app:fontWeight="400" />
    <font
        app:font="@font/averia_bold"
        app:fontStyle="normal"
        app:fontWeight="700" />
    <font
        app:font="@font/averia_bold_italic"
        app:fontStyle="italic"
        app:fontWeight="700" />
</font-family>

```

```xml
<!-- res/font/averia_light_fonts_sicne_api_16.xml -->
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <!-- Recommended,start  -->
    <font
        app:font="@font/averia_light"
        app:fontStyle="normal"
        app:fontWeight="300" />

    <font
        app:font="@font/averia_light_italic"
        app:fontStyle="italic"
        app:fontWeight="300" />
    <!-- Recommended,end  -->
</font-family>
```

- Step 3 : 使用 font 字体

```xml
<!-- Light       -->

<!-- Way 1 : 使用单个 font 字体  -->
<!--  推荐      -->
app:fontFamily="@font/averia_light"

<!-- Way 2 : 与 regular 和 bold 放在一个font xml中，并用fontweight属性定位 light 字体  -->
app:fontFamily="@font/averia_fonts_sicne_api_16"
android:textFontWeight="300"

<!-- Way 3 : ligth 单独放在一个font xml中，并用fontweight属性定位 light 字体  -->
<!--  推荐      -->
app:fontFamily="@font/averia_light_fonts_sicne_api_16"
```

```xml
<!-- Light  I     -->

<!-- Way 1 : 使用单个 font 字体  -->
<!--  推荐      -->
app:fontFamily="@font/averia_light_italic"

<!-- Way 2 : 与 regular 和 bold 放在一个font xml中，并用fontweight属性定位 light 字体  -->
app:fontFamily="@font/averia_fonts_sicne_api_16"
android:textFontWeight="300"
android:textStyle="italic"

<!-- Way 3 : ligth 单独放在一个font xml中，并用fontweight属性定位 light 字体  -->
<!--  推荐      -->
app:fontFamily="@font/averia_light_fonts_sicne_api_16"
android:textStyle="italic"
```

```xml
<!-- Regular / Bold  -->
<!-- Regular.ttf -->
<!-- 使用字体家族(Recommended) -->
app:fontFamily="@font/averia_fonts_sicne_api_26"
/
<!-- 使用单独字体-->
android:fontFamily="@font/averia_regular"


<!-- Italic.ttf -->
<!-- 使用字体家族(Recommended) -->
app:fontFamily="@font/averia_fonts_sicne_api_26"
android:textStyle="italic"
/
<!-- 使用单独字体-->
app:fontFamily="@font/averia_italic"

<!-- Bold.ttf -->
<!-- 使用字体家族(Recommended) -->
app:fontFamily="@font/averia_fonts_sicne_api_26"
android:textStyle="bold"
/
<!-- 使用单独字体-->
app:fontFamily="@font/averia_bold"

<!-- BoldItalic.ttf -->
<!-- 使用字体家族(Recommended) -->
app:fontFamily="@font/averia_fonts_sicne_api_26"
android:textStyle="italic|bold"/android:textStyle="bold|italic"
/
<!-- 使用单独字体-->
app:fontFamily="@font/averia_bold_italic"
```

## android:fontFamily vs app:fontFamily

`res_font_4_font_family.xml`

- 同一个字体，android:fontFamily 和 app:fontFamily 效果一样
- fontFamily 同时出现时，优先级高的生效  
  app:fontFamily > theme app:fontFamily > android:fontFamily > theme android:fontFamily

## 如何不影响其他模块的情况下使用自定义字体

![font_use_custom_font_without_bad_smell](https://yingvickycao.github.io/img/android/resources/font_use_custom_font_without_bad_smell.png)

# Refs

- https://developer.android.google.cn/guide/topics/ui/look-and-feel/fonts-in-xml
- https://www.imgeek.org/article/825357604
- https://developer.android.google.cn/guide/topics/ui/look-and-feel/fonts-in-xml
- https://developer.android.google.cn/guide/topics/ui/look-and-feel/downloadable-fonts?hl=en#via-android-studio
- https://developer.android.google.cn/reference/android/graphics/fonts/FontStyle?hl=en
- https://developer.android.google.cn/reference/android/graphics/fonts/FontFamily?hl=en
- https://developer.android.google.cn/guide/topics/ui/look-and-feel/fonts-in-xml#fonts-in-xml
