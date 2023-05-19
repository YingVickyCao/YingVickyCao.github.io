# LevelListDrawable

`TestLevelListDrawableFragment.java`

```
<level-list>
```

`item_view_check_icon.xml`

- 管理一组轮流替换的 drawables
- `android:maxLevel="0"`默认显示
- setLevel()= `android:maxLevel`值为 level 的 drawable。
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

[Android_Errors](../Android_Errors.md)

# Ref

- [Level list](https://developer.android.google.cn/guide/topics/resources/drawable-resource?hl=en#LevelList)
