# Android App Bundles

Code Example : Mac, https://github.com/YingVickyCao/BuildAppBundle

# 1 Android App Bundles

An Android App Bundle is a publishing format that includes all your app’s compiled code and resources, and defers APK generation and signing to Google Play.

An app bundle is different from an APK in that you can’t deploy one to a device. Rather, it’s a publishing format that includes all your app’s compiled code and resources in a single build artifact. So, after you upload your signed app bundle, Google Play has everything it needs to build and sign your app’s APKs, and serve them to users.

When you upload that app bundle to Google Play, it generates a new set of APKs based on the version code the base module specifies. Subsequently, when users update your app, Google Play serves them updated versions of all APKs currently installed on the device. That is, all installed APKs are updated to the new version code.

- .aab
- Compressed download size restriction  
  (1) APKs size <= 150MB  
  (2) [Asset packs size restrictions](https://developer.android.google.cn/guide/app-bundle/asset-delivery#size-limits)

# 2 How to publish an app bundle ?

Step 1 : Build an app bundle
Step 2 : Use Play App Signing to sign your APKS for distribution.
https://support.google.com/googleplay/android-developer/answer/7384423
Step 3 : Publish your app bundle to Google Play.

# 3 How to debug an app bundle ?

Build and then Deploy app bundle using Android Studio to a connected device.
edit : APK from app bundle

# 2 Build an app bundle

## Use Android Studio

Android Studio >=3.2

# 3 Deploy Android App Bundle to a connected device

## Use Android Studio

APK from app bundle

# 1 bundletool

https://github.com/google/bundletool/releases

An Android App Bundle is a publishing format

adding feature modules
released your app using multiple APKs

Play Feature Delivery

https://www.jianshu.com/p/e40e78a279b7

./gradlew :app:bundleDebug
./gradlew :app:bundleRelease

1 sign an app bundle as a separate step
Use jarsigner to sign your app bundle from the command line.

jarsigner
https://www.jianshu.com/p/b9b7a8c91a38

jarsigner -verbose -keystore [签名文件路径] -signedjar [签名后的 apk 文件路径] [未签名的 apk 文件路径] [证书别名]
参数说明：
-verbose 签名时输出详细信息，便于查看签名结果
-keystore 指定签名文件的存放路径
-signedjar 指定签名后的 apk 文件存放路径

jarsigner -verbose -keystore D:\xxx\xxx.jks -signedjar C:\Users\Desktop\xxx_signed.apk C:\Users\Desktop\unsigned.apk keyAlias
jarsigner -verbose -keystore apk-keystore.jks -signedjar app-release-signed.aab app-release.aab apk-keystore

Warning:
No -tsa or -tsacert is provided and this jar is not timestamped. Without a timestamp, users may not be able to validate this jar after the signer certificate's expiration date (2022-04-20) or after any future revocation date.

.apks = an APK set archive

java -jar bundletool.jar build-apks --bundle=app-release-signed.aab --output=app-release-signed.apks

hadess-MacBook-Pro:Downloads hades$ java -jar bundletool.jar build-apks --bundle=app-release-signed.aab --output=app-release-signed.apks
INFO: The APKs will be signed with the debug keystore found at '/Users/hades/.android/debug.keystore'.

https://blog.csdn.net/wuzi_csdn/article/details/88824438

java -jar bundletool.jar build-apks --bundle=app-release-signed.aab --output=app-release-signed.apks --ks=apk-keystore.jks --ks-pass=pass:123456 --ks-key-alias=apk-keystore --key-pass=pass:123456

java -jar bundletool.jar build-apks --connected-device --bundle=app-release-signed.aab --output=app-release-signed.apks --ks=apk-keystore.jks --ks-pass=pass:123456 --ks-key-alias=apk-keystore --key-pass=pass:123456

https://developer.android.com/studio/command-line/bundletool

java -jar bundletool.jar install-apks --apks=app-release-signed.apks
String desc = AppBean.class.getSimpleName(); 这种代码，全部变成 shrink 后的名字。

java -jar bundletool.jar get-device-spec --output=device-spec.json

java -jar bundletool.jar build-apks --device-spec=device-spec.json --bundle=app-release-signed.aab --output=app-release-signed.apks --ks=apk-keystore.jks --ks-pass=pass:123456 --ks-key-alias=apk-keystore --key-pass=pass:123456

bundletool extract-apks
--apks=/MyApp/my_existing_APK_set.apks
--output-dir=/MyApp/my_pixel2_APK_set.apks
--device-spec=/MyApp/bundletool/pixel2.json

java -jar bundletool.jar extract-apks --apks=app-release-signed.apks --output-dir=app-release-signed2.apks --device-spec=device-spec.json

Apr 21, 2021 2:28:47 PM com.android.tools.build.bundletool.commands.ExtractApksCommand lambda$extractMatchedApksFromApksArchive$4
INFO: Output directory 'app-release-signed2.apks' does not exist, creating it.
The APKs have been extracted in the directory: app-release-signed2.apks

app-release-signed2.apks
base-master.apk
base-xxhdpi.apk

https://blog.csdn.net/qq_36168049/article/details/101002012

java -jar bundletool.jar install-apks --apks=app-release-signed2.apks

adb install-multiple base-master.apk base-xxhdpi.apk

bundletool get-size total --apks=/MyApp/my_app.apks

java -jar bundletool.jar get-size total --apks=app-release-signed.apks

s$ java -jar bundletool.jar get-size total --apks=app-release-signed.apks
MIN,MAX
676357,701666

Refs:
https://developer.android.google.cn/studio/command-line/bundletool
https://developer.android.google.cn/guide/app-bundle
https://developer.android.google.cn/guide/app-bundle/configure-base
https://developer.android.google.cn/guide/app-bundle/play-feature-delivery
https://developer.android.google.cn/guide/app-bundle/dynamic-delivery
https://developer.android.google.cn/guide/app-bundle/test
https://developer.android.google.cn/topic/performance/reduce-apk-size
https://developer.android.google.cn/studio/build/shrink-code
https://developer.android.google.cn/studio/publish/upload-bundle
https://developer.android.google.cn/studio/build/building-cmdline
