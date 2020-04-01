# Androidx

- Android support library 28 是 google 发布的最后一版 android.support 库，同时发布 androidx 1.0.0 第一个正式版本。
- 为什么发布 androidx？  
  Support 包依赖混乱，AndroidX 是对 Support 的整理

# How to Migrate ?

- Step 1:  
  AndroidStudio >=3.2  
  com.android.tools.build:gradle:>=3.2.0  
  targetSdkVersion >=28(9.0)

- Step 2:

```
// 表示使用 androidx
android.useAndroidX=true
// 表示将第三方的依赖库也迁移到 androidx，如果项目中没有依赖库可以设置为false
android.enableJetifier=true
```

- Step 3:Refactor -> Migrate to Androidx。  
  Android Studio 会自动把依赖切换到 Androidx，并修改路径。

- Step 4: 编译完成后，手动更改依赖库路径  
  AppCompatActivity -> import androidx.appcompat.app.AppCompatActivity

- Step 5 ：Flie -> Invalidate Caches /Restart：第三方的依赖库也迁移到 AndroidX

- Step 6 : 手动修改注解处理器产生的冲突  
  Glide  
  butterknife  
  dagger

- [AndroidX Overview](https://developer.android.google.cn/jetpack/androidx)
- [Support Library Artifact Mappings](https://developer.android.google.cn/jetpack/androidx/migrate/artifact-mappings)
- [Support Library ArtifactClass Mappings](https://developer.android.google.cn/jetpack/androidx/migrate/class-mappings)
- [Android-AndroidX 迁移及踩坑](https://blog.csdn.net/AndroidStudyDay/article/details/89379673)
