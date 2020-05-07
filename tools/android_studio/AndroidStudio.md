# Android Studio

# [Logcat](as_logcat.md)

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

# 13 ERROR: Android Studio can not recognize libs from project local maven.(AS 3.5)

Step 1 : completely uninstall Android Studio on macOS  
Step 2 : re-install Android Studio.  
Step 3 : Delete build/.idea/.gradle of project.  
Step 4 : Open project by Android Studio.

# 12 Set proxy

Setting dialog -> search "proxy" , HTTP Proxy.  
Saved on
`User-Home/Library/Preferences/AndroidStudio/options/proxy.setting.xml`

# 11 ERROR: `/sdk/platforms/android-28/android.jar (No such file or directory)`

Download sources for 28.  
Then check android-28 folder vs other api level folder.

# 10 BuildConfig: Deprecate APPLICATION_ID in libraries

```
BuildConfig: Deprecate APPLICATION_ID in libraries.
It is at best misleading, so it is marked as deprecated and replaced by LIBRARY_PACKAGE_NAME.
```

As of Android Studio 3.5, BuildConfig.APPLICATION_ID is deprecated and replaced with BuildConfig.LIBRARY_PACKAGE_NAME.

# 9 [ERROR]:R8 errors:Program type already present: package_name.BuildConfig

Fix:

1. jar 包或第三方库冲突
2. 包名冲突，多个模块情况有相同包名，把重复的包名改掉

# 8 Android Studio cache about issues

Android Studio has cache about issues when building since 2.2.

## 8.1 Cannot recognize renamed Dagger1

Solutions:

1. Build -> Clean Project
2. Restart Android Studio
3. File -> Invalidate Caches / Restart -> Choose "Invalidate and Restart"
4. Restart MAC
5. Try re-git clone , re-open project.
6. Uninstall Android Studio, re-Install it.

## 8.2 Cannot recognize submodules after switch branch

Solution:  
Remove submodules,then update submodules.

```
git submodule init
git submodule update
```

## 8.3 [AS 3.2]Modified codes are be recognized.

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

# 7 Change font size

![android_studio_change_font_sizes](https://yingvickycao.github.io/img/tools/android_studio/android_studio_change_font_sizes.jpg)

# 6. Layout Editor says " Preview is unavailable untol a successful project sync."

File -> Sync Project with Gradle files

# 5. SDK - `Target folder is neither empty nor does it point to an existing SDK installation...`

Add empty `platforms`folder in `sdk` folder, then retry.

# 4. ERROR:Search result:"no usages found in all palces"

`File -> Invalidate Caches / Restart -> Choose "Invalidate and Restart"`

# 3. [AS 3.4]xml can not tip when coding

1). Re-install android studio , re-install sdk.
2). Write wrong code

```
<LinearLayo>
    <ImageView/> // 不提示代码
</<LinearLayo>


```

# 2. [AS 3.2]`can not access android.support.v4.based FragmentActivityapi16`

support lib version(28.0.0) = compileSdk Version(28).

# 1. 设置 Android Studio 行尾结束符

Editor -> Code Style -> Window = `\r\n` = CRLF`
