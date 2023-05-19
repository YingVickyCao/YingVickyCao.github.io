# ColorDrawable

TestColorDrawableFragment.java

```xml
res/drawable/drawable_color_red
<?xml version="1.0" encoding="utf-8"?>
<color xmlns:android="http://schemas.android.com/apk/res/android"
    android:color="@android:color/holo_red_dark" />
```

```java
ColorDrawable drawable = new ColorDrawable();
drawable.setColor(0xFFFF0000);
textView.setBackground(drawable);
```

- ColorDrawable 可以作为 background/src，不能作为 textColor。
- ColorDrawable 的 color 设置格式是 AARRGGBB。  
  xml 中可以省略 Alpha。  
  java 中不可以省略 Alpha，否则会变成透明色。
