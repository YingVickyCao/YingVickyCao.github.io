# Android SDK
The Android SDK is composed of multiple packages that are required for app development. 

## Android SDK Build Tools  
- build Android apps.
- Most of the tools in here are invoked by the build tools and not intended for you

![Android SDK Build-Tools](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/build/Android_SDK_Build-Tools.png)

- 对应于 `buildToolsVersion`
```
android {
    buildToolsVersion "28.0.3"
}
```
If use Android plugin for Gradle 3.0.0 or higher, project automatically uses a default version of the build tools that the plugin specifies. So `buildToolsVersion` is optional.

Android SDK Build Tools | android_sdk/build-tools/version()/
---                 |---
apkanalyzer         | android_sdk/tools/bin/apkanalyzer
aapt2               | 
zipalign            |
[D8](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/doc/android/build/D8.md#d8) |since  `<sdk>/build-tools/28.0.2/`
dx                  | Android Studio < 3.0, DEX compiler

---

## Android SDK Platform-Tools

![Android SDK Platform-Tools](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/build/Android_SDK_Platform-Tools.png)  

- interface with the Android platform
- should get the latest SDK Platform-Tools
- backward compatible,need only one version of the SDK Platform-Tools.

Android SDK Platform Tools | android_sdkandroid_sdk/platform-tools/
---                 |---
[adb](https://developer.android.google.cn/studio/command-line/adb) | Android Debug Bridge
etc1tool            | 
fastboot            |
logcat              |
sqlite3             |
dmtracedump         |
systrace            |

---

## Android SDK Platform
Each SDK Platform version includes:

-  Android SDK Platform package   
This is required to compile your app for that version.  
`<sdk>/platforms/android-28`(Versions)  

- System Image packages running on [Android Emulator](https://developer.android.google.cn/studio/run/emulator.html)    

    skin:   
    `<sdk>/platforms/android-28/skins`(Versions)  
    
    download images:     
    `<sdk>/system-images/android-25`(Versions)

- Sources for Android package.   
This includes the source files for the platform. Android Studio may show lines of code from these files while you debug your app.
`<sdk>/sources/android-28`(Versions)

- templates   
创建文件/创建module等模板  
`<sdk>/platforms/android-28/templates`(Versions)  

- android.jar

- uiautomator.jar

---

## Android SDK Tools
- platform independent
- `<sdk>/tools`:    
Android SDK Tools is a component for the Android SDK. It includes the complete set of development and debugging tools for Android. It is included with Android Studio.

Android SDK Tools   | android_sdk/tools/bin/
---                 |---
apkanalyzer         | Apk Analyzer
rowavdmanager       | 
jobb                | 
lint                | 
monkeyrunner        | 
sdkmanager          | 
ProGuard            |
archquery           |
avdmanager          | creating an AVD  
lint                | 
screenshot2         | 
uiautomatorviewer   | 
android             | Depressed
emulator            | 
emulator-check      |
mksdcard            |

---
## Android Emulator
- required to use the Android Emulator

Android Emulator    | android_sdk/emulator/
---                 |---
emulator            |
mksdcard            |

## Jetifier

# Refs:
- [Update the IDE and SDK Tools](https://developer.android.google.cn/studio/command-line/sdkmanager.htm)
- [SDK Build Tools release notes](https://developer.android.google.cn/studio/releases/build-tools)
- [SDK Platform Tools release notes](https://developer.android.google.cn/studio/releases/platform-tools)
- [SDK Platform release notes](https://developer.android.google.cn/studio/releases/platforms)
- [SDK Tools release notes](https://developer.android.google.cn/studio/releases/sdk-tools)
- [Android Gradle plugin release notes](https://developer.android.google.cn/studio/releases/gradle-plugin)
- [Android Studio release notes](https://developer.android.google.cn/studio/releases)
- [Command line tools](https://developer.android.google.cn/studio/command-line)