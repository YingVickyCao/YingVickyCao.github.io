# VectorDrawable
- Android Vector drawables
- a vector graphic defined in XML
- scalability is lossless:  
vector graphics can scale to any size without scaling artifacts
- icons, not photographs

# 1. SVG
- Scalable Vector Grphics（矢量图）
- android中SVG实现，叫做VectorDrawable(以后称为SVG)
- VectorDrawable没有完全支持SVG，但语法很接近

# 2. 使用 Vector Asset Studio
## `New` -> `Vector Asset`,  SVG / PSD => generated xml file
- 矢量图 : <vector> - VectorDrawable
- 矢量动画 : <animated-vector> - AnimatedVectorDrawable

## 兼容性
- [Vector drawable backward-compatibility solutions](https://developer.android.google.cn/studio/write/vector-asset-studio#apilevel)

### Min>=Android5(21)
- VectorDrawable
- AnimatedVectorDrawable

### Min< Android5(21)
- BitmapDrawable，没有VectorDrawable和AnimatedVectorDrawable

#### PNG generation	
- the generated PNG and XML files  
`app/build/generated/res/pngs/debug/ folder`
```
>=21, svg  
<21, png    
```
- Domain Specific Language(DSL) generatedDensities  in build.gradle
- android gradle plugin  >= 1.5(SVG) / 2.2(PSD)

#### Support Library 23.2 or higher	
- `build.gradle`
```
android {
  defaultConfig {
    vectorDrawables.useSupportLibrary = true
  }
}

dependencies {
  compile 'com.android.support:appcompat-v7:23.2.0'
}
```

- android gradle plugin  >= 2.0
- android:src => app:srcCompat
- VectorDrawable => VectorDrawableCompat
- AnimatedVectorDrawable => AnimatedVectorDrawableCompat

# 3. How to get SVG?
- UI导出

- SVG Online editor   
`https://editor.method.ac/`

- SVG -> Vector  
`Vector Asset Studio`

- www.iconfront.cn

- https://material.io/tools/icons/?style=baseline

# 4. 语法 
- android:width:图片宽
- android:height:图片高
- android:viewportWidth:宽划分为多少份
- android:viewportHeight:高划分为多少份
- path : 坐标 = android:viewportWidth 和 android:viewportHeight 划分后的坐标  
- group:path的分组  
- android:fillColor : 一致;一般有1～3个  

# 5. Vector can use attr. If single color, better.

# 9. 性能
- 与Png相比，render time 更长， 物理大小更小。

# 10. 适合SVG
- 适合icon、Button等小、简单的图
- Google recommends max  = 200 x 200dp  => 800 x 800 px 
- 简单，颜色不能太多， 1～3
- Min>=Android5(21)
- Min<Android5(21), Support library
- ***APK 大小 和 CPU（速度）做选择？***

# 11. 如何选择
- 复杂：WebP > PNG
- 简单(<=200 x 200dp)：Shape > Vector

# 12. ERROR：多个地方使用同一个svg：一个地方Icon变颜色，其他也变。
- 每次set，同一个svg，得到的VectorDrawable是不同实例.  
但如果不mute，与其他drawable共享状态
- https://www.imooc.com/article/281573

# 13. svg vs png，svg render时间更短

# 14. Vector如何修改大小
无损放缩。修改viw 大小即可。

# Refs
- [Vector drawables overview](https://developer.android.google.cn/guide/topics/graphics/vector-drawable-resources)
- [Add multi-density vector graphics](https://developer.android.google.cn/studio/write/vector-asset-studio)

---

- www.iconfront.cn
- https://material.io/tools/icons/?style=baseline
- https://editor.method.ac/
- https://google.github.io/android-gradle-dsl/1.4/com.android.build.gradle.internal.dsl.ProductFlavor.html#com.android.build.gradle.internal.dsl.ProductFlavor:generatedDensities
- [Android Vector](https://blog.csdn.net/eclipsexys/article/details/51838119)