# Configure build

## APK
an Android Application Package (APK).

## DEX
DEX (Dalvik Executable)

## [R8](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/doc/android/build/R8.md#r8)

## Android Studio
---

## Gradle
- Gradle build tool
- Android Studio uses [Gradle](https://gradle.org/), an advanced build toolkit, to automate and manage the build process, while allowing you to define flexible custom build configurations.
- Before generating your final APK, the packager uses the zipalign tool to optimize your app to use less memory when running on a device.

---

## Android Gradle plugin
- The Android plugin for Gradle works with the build toolkit to provide processes and configurable settings that are specific to building and testing Android applications.

也就是说，android studio 通过插件android gradle plugin，而非直接使用gradle 来构建android project(android resources)

```
dependencies {
    classpath 'com.android.tools.build:gradle:3.4.0'
}
```

- Gradle and the Android plugin run independent of Android Studio. This means that you can build your Android apps from within Android Studio, the command line on your machine, or on machines where Android Studio is not installed (such as continuous integration servers). 

## `compileSdkVersion`
compileSdkVersion specifies the Android API level Gradle should use to compile your app. App can use the API features included in this API level and lower.
   
## `buildToolsVersion`
  - buildToolsVersion specifies the version of the SDK build tools, command-line utilities, and compiler that Gradle should use to build app. 
  - This property is optional because the plugin uses a recommended version of the build tools by default.

# [Android SDK](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/doc/android/build/Android_SDK.md#android-sdk)

# ERROR:
## Manifest merger failed : uses-sdk:minSdkVersion 21 cannot be smaller than version 22 declared in library

> Manifest merger failed : uses-sdk:minSdkVersion 21 cannot be smaller than version 22 declared in library [:calculator2] /Users/hades/Documents/GitHub/AndroidAboutDemos/soruce/AndroidGradleConfigCode/calculator2/build/intermediates/library_manifest/debug/AndroidManifest.xml as the library might be using APIs not available in 21
> 	Suggestion: use a compatible library with a minSdk of at most 21,
> 		or increase this project's minSdk version to at least 22,
> 		or use tools:overrideLibrary="com.example.hades.calculator2" to force usage (may lead to runtime failures)

```
app module
minSdkVersion 21

calculator2 lib
minSdkVersion 22

=>

calculator2 lib
minSdkVersion 21
```

## ERROR:Android resource linking failed
> Android resource linking failed
> app/build/intermediates/incremental/mergeDebugResources/merged.dir/values-v28/values-v28.xml:7: error: resource android:attr/dialogCornerRadius not found.
> app/build/intermediates/incremental/mergeDebugResources/merged.dir/values-v28/values-v28.xml:11: error: resource android:attr/dialogCornerRadius not found.
> app/build/intermediates/incremental/mergeDebugResources/merged.dir/values/values.xml:2739: error: resource android:attr/fontVariationSettings not found.
> app/build/intermediates/incremental/mergeDebugResources/merged.dir/values/values.xml:2740: error: resource android:attr/ttcIndex not found.
> error: failed linking references.

```
set all module appcompat = 28.0.0

compileSdkVersion 28
targetSdkVersion 28

implementation 'com.android.support:appcompat-v7:28.0.0'

```

## ERROR:Full Split are not supported in InstantRun mode, please disable InstantRun
`Full Split are not supported in InstantRun mode, please disable InstantRun`
```
  /*
    // Configure multiple APKs for screen densities
    splits {

        // Configures multiple APKs based on screen density.
        density {

            // Configures multiple APKs based on screen density.
            enable true

            // Specifies a list of screen densities Gradle should not create multiple APKs for.
            exclude "ldpi", "xxhdpi", "xxxhdpi"

            // Specifies a list of compatible screen size settings for the manifest.
            compatibleScreens 'small', 'normal', 'large', 'xlarge'
        }
    }

    // Configure multiple APKs for ABIs
    splits {

        // Configures multiple APKs based on ABI.
        abi {

            // Enables building multiple APKs per ABI.
            enable true

            // By default all ABIs are included, so use reset() and include to specify that we only
            // want APKs for x86 and x86_64.

            // Resets the list of ABIs that Gradle should create APKs for to none.
            reset()

            // Specifies a list of ABIs that Gradle should create APKs for.
            include "x86", "x86_64"

            // Specifies that we do not want to also generate a universal APK that includes all ABIs.
            universalApk false
        }
    }
*/
```

## DexArchiveBuilderException
Error: Invoke-customs are only supported starting with Android O (--min-api 26)
Caused by: com.android.builder.dexing.DexArchiveBuilderException: Error while dexing.
The dependency contains Java 8 bytecode. Please enable desugaring by adding the following to build.gradle
android {
    compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }
See https://developer.android.com/studio/write/java8-support.html for details. Alternatively, increase the minSdkVersion to 26 or above.


# supported Java 8 language features
Android plugin >= 3.0.0, use Java 8
```
android {
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
}
```


# Define maven respo in build.gradle

```groovy
# project level build.gradle
allprojects {
    repositories {
        // Custom local maven
        // maven { url = "$rootProject.projectDir/calculator-sdk" }

        // Default local maven : ~/.m2/repository
        mavenLocal()

        maven { url 'http://mirror.bit.edu.cn' }
        maven { url 'http://mirror.bit6.edu.cn' }
        maven { url 'http://mirrors.tuna.tsinghua.edu.cn/' }

        // Maven Central, hosted by https://sonatype.org/, url= https://repo1.maven.org/maven2/, https://repo.maven.apache.org/maven2/
        mavenCentral()

        // jcenter, hosted by bintray.com, url = http://jcenter.bintray.com/
        jcenter()

        google()
    }
}
```

# Refs
- [Configure your build](https://developer.android.google.cn/studio/build)
- [Build your app from the command line](https://developer.android.google.cn/studio/build/building-cmdline)
- [Build and run your app](https://developer.android.google.cn/studio/run/index.html)