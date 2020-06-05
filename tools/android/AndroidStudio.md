# Android Studio

# 1 [Logcat](as_logcat.md)

Delete Mac Android Studio itself:

```
rm -Rf /Applications/Android\ Studio.app
rm -Rf ~/Library/Preferences/AndroidStudio*
rm -Rf ~/Library/Preferences/com.google.android.*
rm -Rf ~/Library/Preferences/com.android.*
rm -Rf ~/Library/Application\ Support/AndroidStudio*
rm -Rf ~/Library/Logs/AndroidStudio*
rm -Rf ~/Library/Caches/AndroidStudio*
rm -Rf ~/.AndroidStudio*

```

Delete all Android Studio projects (optional):

```
rm -Rf ~/AndroidStudioProjects
```

Delete Gradle files/cache:

```
rm -Rf ~/.android
```

Delete SDK tools:

```
rm -Rf ~/Library/Android*
```

# 2 ERROR: Android Studio can not recognize libs from project local maven.(AS 3.5)

Step 1 : completely uninstall Android Studio on macOS  
Step 2 : re-install Android Studio.  
Step 3 : Delete build/.idea/.gradle of project.  
Step 4 : Open project by Android Studio.

# 3 Set proxy

Setting dialog -> search "proxy" , HTTP Proxy.  
Saved on
`User-Home/Library/Preferences/AndroidStudio/options/proxy.setting.xml`

# 4 ERROR: `/sdk/platforms/android-28/android.jar (No such file or directory)`

Download sources for 28.  
Then check android-28 folder vs other api level folder.

# 5 BuildConfig: Deprecate APPLICATION_ID in libraries

```
BuildConfig: Deprecate APPLICATION_ID in libraries.
It is at best misleading, so it is marked as deprecated and replaced by LIBRARY_PACKAGE_NAME.
```

As of Android Studio 3.5, BuildConfig.APPLICATION_ID is deprecated and replaced with BuildConfig.LIBRARY_PACKAGE_NAME.

# 6 [ERROR]:R8 errors:Program type already present: package_name.BuildConfig

Fix:

1. jar 包或第三方库冲突
2. 包名冲突，多个模块情况有相同包名，把重复的包名改掉

# 7 Android Studio cache about issues

Android Studio has cache about issues when building since 2.2.

## 7.1 Cannot recognize renamed Dagger1

Solutions:

1. Build -> Clean Project
2. Restart Android Studio
3. File -> Invalidate Caches / Restart -> Choose "Invalidate and Restart"
4. Restart MAC
5. Try re-git clone , re-open project.
6. Uninstall Android Studio, re-Install it.

## 7.2 Cannot recognize submodules after switch branch

Solution:  
Remove submodules,then update submodules.

```
git submodule init
git submodule update
```

## 7.3 [AS 3.2]Modified codes are be recognized.

1. Build -> Clean Project
2. Restart Android Studio
3. File -> Invalidate Caches / Restart -> Choose "Invalidate and Restart"
4. Restart MAC
5. Try re-git clone , re-open project. ✓
6. Cancel Instant Run, Then restart Android Studio.
7. `Run...` -> `Edit configucations` -> select module -> Remove `Gradl-awake Make`
8. Remove project build folder, reopen project.
9. Remove  
   .gradle;`  
   remove Android Studio cache data , re-Install Android Studio;  
   Try re-git clone , re-open project.
10. Check code if wrong？✓

# 8 Change font size

![android_studio_change_font_sizes](https://yingvickycao.github.io/img/tools/android_studio/android_studio_change_font_sizes.jpg)

# 9. Layout Editor says " Preview is unavailable untol a successful project sync."

File -> Sync Project with Gradle files

# 10. SDK - `Target folder is neither empty nor does it point to an existing SDK installation...`

Add empty `platforms`folder in `sdk` folder, then retry.

# 11. ERROR:Search result:"no usages found in all palces"

`File -> Invalidate Caches / Restart -> Choose "Invalidate and Restart"`

# 12. [AS 3.4]xml can not tip when coding

1). Re-install android studio , re-install sdk.
2). Write wrong code

```
<LinearLayo>
    <ImageView/> // 不提示代码
</<LinearLayo>


```

# 13. [AS 3.2]`can not access android.support.v4.based FragmentActivityapi16`

support lib version(28.0.0) = compileSdk Version(28).

# 14. 设置 Android Studio 行尾结束符

Editor -> Code Style -> Window = `\r\n` = CRLF`

# 15 Q: Can not see source and show decompiled class, e.g., com.google.android.material.card.MaterialCardView

A:  
Method 1 : update material lib version

# 16 Q : Android Studio Gradle downloads `kotlin-compiler-embeddable-1.3.72.jar` failed or too slow.

Step 1 : FInd dir

```
// When downloading
// /Users/account/.gradle/caches/modules-2/files-2.1/org.jetbrains.kotlin/kotlin-compiler-embeddable/1.3.72/b7250aa71eb53dfcb3bb86c6467cbe747254e1a5/

b7250aa71eb53dfcb3bb86c6467cbe747254e1a5
kotlin-compiler-embeddable-1.3.72.pom
```

Step 2: Download jar in Maven.  
https://mvnrepository.com/artifact/org.jetbrains.kotlin/kotlin-compiler-embeddable

Step 3 : Put jar in Finder dir.

```
b7250aa71eb53dfcb3bb86c6467cbe747254e1a5
kotlin-compiler-embeddable-1.3.72.pom
+ kotlin-compiler-embeddable-1.3.72.jar
```

Close Android Studio, then re-open Andriid Studio,it will auto sync it.

```
// After Auto sync successfully
fb72232c8fa977d5e07d33c43381ddbdc5edab6
kotlin-compiler-embeddable-1.3.72.jar
b7250aa71eb53dfcb3bb86c6467cbe747254e1a5
kotlin-compiler-embeddable-1.3.72.pom
- kotlin-compiler-embeddable-1.3.72.jar
b0e679271730771848ec0c644028533b381e2e6
kotlin-compiler-embeddable-1.3.72-sources.jar
```

```
fb72232c8fa977d5e07d33c43381ddbdc5edab6
kotlin-compiler-embeddable-1.3.72.jar
b7250aa71eb53dfcb3bb86c6467cbe747254e1a5
kotlin-compiler-embeddable-1.3.72.pom
b0e679271730771848ec0c644028533b381e2e6
kotlin-compiler-embeddable-1.3.72-sources.jar
```

# 17 ERROR: Manifest merger failed : uses-sdk:minSdkVersion 21 cannot be smaller than version 22 declared in library

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

# 18 ERROR:Android resource linking failed
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
# 19 ERROR:Full Split are not supported in InstantRun mode, please disable InstantRun
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