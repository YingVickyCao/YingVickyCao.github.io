# Android App Bundles

Code Example : Mac, https://github.com/YingVickyCao/BuildAppBundle

Requirement：
- Android App Bundle  
- Android Studio 3.2 and later  
- Target SDK >=30 after 2021/8  

# 1 Android App Bundles

An Android App Bundle is a publishing format that includes all your app’s compiled code and resources, and defers APK generation and signing to Google Play.

An app bundle is different from an APK in that you can’t deploy one to a device. Rather, it’s a publishing format that includes all your app’s compiled code and resources in a single build artifact. So, after you upload your signed app bundle, Google Play has everything it needs to build and sign your app’s APKs, and serve them to users.

When you upload that app bundle to Google Play, it generates a new set of APKs based on the version code the base module specifies. Subsequently, when users update your app, Google Play serves them updated versions of all APKs currently installed on the device. That is, all installed APKs are updated to the new version code.

- .aab
- .apks = an APK set archive
- Compressed download size restriction  
  (1) APKs size <= 150MB  
  (2) [Asset packs size restrictions](https://developer.android.google.cn/guide/app-bundle/asset-delivery#size-limits)

# 2 bundletool

Download:  
https://github.com/google/bundletool/releases

bundletool is a command line tool that Android Studio, the Android Gradle plugin, and Google Play use to convert your app's compiled code and resources into app bundles, and generate deployable APKs from those bundles.

Use bundletool locally recreate to mockup how Google Play generates APKs and destirbute them to user.

# 3 How to publish an app bundle ?

![publish_android_app_bundle](https://yingvickycao.github.io/img/android/publish_android_app_bundle.jpg)


## Step 1 : Build an app bundle

### Use Android Studio

Android Studio >=3.2

Way 1 : Build and then Deploy app bundle using Android Studio to a connected device.  
edit : APK from app bundle

Way 2 : Build -> Bundle Bundles
Build -> Generate Signed Bundle

### Use Gradle

```
./gradlew :app:bundleDebug
./gradlew :app:bundleRelease
```

### Use bundletool

```
// First, Prepare pre-compiled code and resources, and package it as base.zip
// Then
bundletool build-bundle --modules=base.zip --output=mybundle.aab
```

## Step 2 : Use Play App Signing to sign your APKS for distribution.

https://support.google.com/googleplay/android-developer/answer/7384423

### Use Android Studio （Combined Step）

### Use Gradle（Combined Step）

### Use bundletool

Sign an app bundle as a separate step
Use jarsigner to sign your app bundle from the command line.

```
// Type 1 : .aab -> .apks, default uses debug key
$ java -jar bundletool.jar build-apks
--bundle=app-release-signed.aab
--output=app-release-signed.apks
INFO: The APKs will be signed with the debug keystore found at '/Users/hades/.android/debug.keystore'.

// Type 2 : .aab -> .apks, uses release key
java -jar bundletool.jar build-apks
--bundle=app-release-signed.aab
--output=app-release-signed.apks
--ks=apk-keystore.jks
--ks-pass=pass:123456
--ks-key-alias=apk-keystore
--key-pass=pass:123456

// Type 3 : .aab -> .apks, uses release key, for connected device
java -jar bundletool.jar build-apks
--connected-device
--bundle=app-release-signed.aab
--output=app-release-signed.apks
--ks=apk-keystore.jks
--ks-pass=pass:123456
--ks-key-alias=apk-keystore
--key-pass=pass:123456

// Type 4 : .aab -> .apks, uses release key, for device configuretion
java -jar bundletool.jar get-device-spec --output=device-spec.json

java -jar bundletool.jar build-apks
--device-spec=device-spec.json
--bundle=app-release-signed.aab
--output=app-release-signed.apks
--ks=apk-keystore.jks
--ks-pass=pass:123456
--ks-key-alias=apk-keystore
--key-pass=pass:123456
```

## Step 3 : Publish your app bundle to Google Play.

- Use bundletool to deploy .apks to the connected device

```
// Type 1 :
java -jar bundletool.jar install-apks --apks=app-release-signed.apks


// Type 2 : .apks -> apk
java -jar bundletool.jar get-device-spec --output=device-spec.json

java -jar bundletool.jar extract-apks
--apks=app-release-signed.apks
--output-dir=app-release-signed2.apks
--device-spec=device-spec.json

  > app-release-signed2.apks
    base-master.apk
    base-xxhdpi.apk

adb install-multiple base-master.apk base-xxhdpi.apk
```

```
$ java -jar bundletool.jar get-size total --apks=app-release-signed.apks
MIN,MAX
676357,701666
```

# Refs:
- https://developer.android.google.cn/studio/command-line/bundletool  
- https://developer.android.google.cn/guide/app-bundle  
- https://developer.android.google.cn/guide/app-bundle/configure-base  
- https://developer.android.google.cn/guide/app-bundle/play-feature-delivery  
- https://developer.android.google.cn/guide/app-bundle/dynamic-delivery  
- https://developer.android.google.cn/guide/app-bundle/test  
- https://developer.android.google.cn/topic/performance/reduce-apk-size  
- https://developer.android.google.cn/studio/build/shrink-code  
- https://developer.android.google.cn/studio/publish/upload-bundle  
- https://developer.android.google.cn/studio/build/building-cmdline
- https://blog.csdn.net/chenjie19891104/article/details/113711009
- https://blog.csdn.net/qq_36168049/article/details/101002012
