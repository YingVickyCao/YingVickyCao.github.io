# Speed up build

## Profile your build

code shrinking slows down the build time

```
./gradlew clean

./gradlew --profile --recompile-scripts --offline --rerun-tasks assembleFlavorDebug

./gradlew --profile --recompile-scripts --offline assembleFlavorDebug

```

Output:  
`profile-timestamp.html`: Open in Browser > Default

## Disable annotation processors

Incremental Java compilation is disabled when using annotation processors

## Enable instant run

`Android API 21`

## Disable PNG crunching

- debug build type  
  gradle plugin >=3.0, PNG crunching is disable by default for debug build type.

- Other build type  
  crunchPngs = false

## Convert images to WebP

## Create tasks for custom build logic

## Create library modules

Code -> Android library module  
Build system compile only compiles modified modules and cache those outputs for furture builds  


## Multi-module build

`gradle.properties`

```
// 开启并行编译
org.gradle.parallel=true

// Enable configuration on demand:开启守护进程
org.gradle.daemon=true

// 增大编译内存
org.gradle.jvmargs=-Xmx1536m -Xms1024m
```

When `org.gradle.daemon=true`, bug：  
`Android plugin 3.0.1 or 3.1.0, disable to avoid some unpredictable build errors`

## Enable offline module

When resources cached locally, avoid using network.

## Create to build variant

Keeps only needing build configurations

- productFlavors
- buildTypes

## Use static build config values with debug build

- static/hardcode values
- If update every build, instant run cannot perform a code swap-it must build and install a new APK.

## Avoid compiling unnecessary resources

## Disable Crashlytics for debug build

## Use static dependency versions

```
1 slower build
2 Cause unexpected verion updates
3 difficulty resolving versions differences

implementation 'com.android.support:design:26.+'
=>
implementation 'com.android.support:design:26.1.0'
```

## Enable the build cache

- Android plugin >=2.3.0,enable the build cache by default
- Build cache stores certain outputs that the Android plugin for Gradle generates when building your project (such as unpackaged AARs and pre-dexed remote dependencies).
  Your clean builds are much faster while using the cache because the build system can simply reuse those cached files during subsequent builds, instead of recreating them.

`gradle.properties`:

```
// Enable the build cache
android.enableBuildCache=true

// Disable the build cache
android.enableBuildCache=fals
```

- Default location of the build cache  
  `<user-home>/.android/build-cache/`

- Clear the build cache

```
./gradlew cleanBuildCache
```

# Refs:

- [Optimize your build speed](https://developer.android.google.cn/studio/build/optimize-your-build)
- [Accelerate clean builds with the build cache](https://developer.android.google.cn/studio/build/build-cache)

# Refs

- [Update Gradle](https://developer.android.google.cn/studio/releases/gradle-plugin#updating-gradle)
- [Configure build variants](https://developer.android.google.cn/studio/build/build-variants)
- [Set the application ID](https://developer.android.google.cn/studio/build/application-id)
