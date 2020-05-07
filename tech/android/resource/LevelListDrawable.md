# LevelListDrawable

```
<level-list>
```

`item_view_check_icon.xml`  

- 管理一组轮流替换的 drawables
- `android:maxLevel="0"`默认显示
- setLevel()= `android:maxLevel`值为level的 drawable。
- `level-list` - LevelListDrawable -> Only used by `ImageView`-`src`  

```
<?xml version="1.0" encoding="utf-8"?>
<level-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:drawable="@android:drawable/star_off"
        android:maxLevel="0" />

    <item
        android:drawable="@android:drawable/star_on"
        android:maxLevel="1" />
</level-list>
```

# 1. setLevel()/setImageLevel)()
```
Drawable.setLevel(int);
View.getBackground().setLevel(int);
/
ImageView.setImageLevel(int);
```

# 2. `<item>` android:drawable can not directly `?attr/` ref color or drawable
```
android:drawable="?attr/color1"
android:drawable="?attr/drawable1"
```

```
FIXED_ERROR:
Caused by: android.content.res.Resources$NotFoundException: File res/drawable/drawable_level_list_3_v1.xml from drawable resource ID #0x7f08007a

Caused by: org.xmlpull.v1.XmlPullParserException: Binary XML file line #3: <item> tag requires a 'drawable' attribute or child tag defining a drawable  
```
=>
- android:drawable ref @drawable/drawable_level_list_3_v2_level_0   -> `<color>` ?attr/ ref  color
- android:drawable ref @drawable/drawable_level_list_4_v2_level_0   -> `<bitmap>` ?attr/ ref  drawable

# Ref
- [Level list](https://developer.android.google.cn/guide/topics/resources/drawable-resource?hl=en#LevelList)