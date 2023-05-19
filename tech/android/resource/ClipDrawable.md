# Clip Drawable

从其他位图上截取的一个“图片片段”。

```xml
<!-- drawable_clip.xml -->

<!-- android:clipOrientation: 水平截取或垂直截取 -->
<?xml version="1.0" encoding="UTF-8"?>
<clip xmlns:android="http://schemas.android.com/apk/res/android"
    android:clipOrientation="horizontal"
    android:drawable="@drawable/shuangta"
    android:gravity="center" />
```

```java
level = [0, 10 000], 0 = 截取图片为空， 10 000 = 截取整张图片
Drawable.setLevel(int level)
```

# Refs

- https://developer.android.google.cn/guide/topics/resources/drawable-resource.html#Clip
- TODO http://www.javashuo.com/article/p-wmtmqwaw-mc.html
