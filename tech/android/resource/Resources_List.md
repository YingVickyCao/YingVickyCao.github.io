#  Resources List
android.xls - page `ResourcesList`

# Drawable resources

- android:drawable   
```
android:drawable="@color/green"  
/
android:drawable="@drawable/green"
```

A color resource can also be used as a drawable in XML. For example, when creating a state list drawable, you can reference a color resource for the android:drawable attribute (android:drawable="@color/green").

## [Level list](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/doc/android/resource/LevelListDrawable.md#levellistdrawable)

---

# Animation Resources

### Property animation
```
<objectAnimator/>
```

```
<animator/>
```

```
<set>
    <objectAnimator/>
    <animator/>

    <set>
    </set>
</set>

```
### Tween animation

```
<alpha/>
```

```
<scale/>
```

```
<translate/>
```

```
<rotate/>
```

```
<set> 
    <alpha/>
    <scale/>
    <translate/>
    <rotate/>

    <set>
    </set>
</set>
```
# Refs
- [ColorStateList](https://developer.android.google.cn/reference/android/content/res/ColorStateList.html)
- [Color state list resource](https://developer.android.google.cn/guide/topics/resources/color-list-resource.html)
- [Color](https://developer.android.google.cn/guide/topics/resources/more-resources.html#Color)
- [StateListDrawable](https://developer.android.google.cn/reference/android/graphics/drawable/StateListDrawable?hl=en)
- [Drawable resources](https://developer.android.google.cn/guide/topics/resources/drawable-resource.htm)
- [Animation resources](https://developer.android.google.cn/guide/topics/resources/animation-resource.html)
- [Vector drawables overview](https://developer.android.google.cn/guide/topics/graphics/vector-drawable-resources?hl=en)
- https://developer.android.google.cn/guide/topics/resources/providing-resources.html#NavigationQualifier