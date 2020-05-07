# `uses-sdk`

used to specify the API Level, not the version number of the SDK (software development kit) or Android platform.

```
<uses-sdk android:minSdkVersion="integer"
          android:targetSdkVersion="integer"
          android:maxSdkVersion="integer" />
```

![use-sdk](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/build/use_sdk.jpg)

## `android:minSdkVersion`
- min API Level required for the app to run
- If not declare, default value =1 
- If have not declared the proper minSdkVersion, then when installed on a system with an API Level less than 3, the application will crash during runtime when attempting to access the unavailable APIs.

## `android:targetSdkVersion`
- designating the API Level that the application targets.
- default value = android:minSdkVersion
- This attribute informs the system that you have tested against the target version and the system should not enable any compatibility behaviors to maintain your app's forward-compatibility with the target version. The application is still able to run on older versions (down to minSdkVersion).
- To maintain your application along with each Android release, you should increase the value of this attribute to match the latest API level, then thoroughly test your application on the corresponding platform version.

- Check Running Android Device API:  
`Build.VERSION.SDK_INT >= VERSION_CODES.O`

- 不随意更改 targetSdkVersion 。 更改则做好兼容
- 作用：
1. 系统通过targetSdkVersion保证向前兼容（forward-compatibility)，以保证行为改变（新特性）的稳定性：
< 19，按19。  按19之后的API  

Case:    
Android 9.0 add normal permission check : android.permission.FOREGROUND_SERVICE.   
if targetSdkVersion = 27, phone =  28 -> use 27, startForeground() ok.   
if targetSdkVersion = 28, phone =  28 -> use 28, startForeground() must add normal permission check :android.permission.FOREGROUND_SERVICE. Or, crash.

Case progress bar 颜色：
targetSdkVersion = 19, phone =  28 -> use 28
targetSdkVersion = 28, phone =  19 -> use 19

![targetSdkVersion_19_run_on_16](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/build/targetSdkVersion_19_run_on_16.png)   

![targetSdkVersion_19_run_on_19](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/build/targetSdkVersion_19_run_on_19.png)   

![targetSdkVersion_19_run_on_25](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/build/targetSdkVersion_19_run_on_25.png)

## `android:maxSdkVersion`
- In either case, if the application'smaxSdkVersion attribute is lower than the API Level used by the system itself, then the system will not allow the application to be installed. In the case of re-validation after system update, this effectively removes your application from the device.
- not recommended   
declaring the attribute can result in your application being removed from users' devices after a system update to a higher API Level. 

## API Level?
API Level is an integer value that uniquely identifies the framework API revision offered by a version of the Android platform.

The Android platform provides a framework API that applications can use to interact with the underlying Android system. 
The framework API consists of:
- A core set of packages and classes
- A set of XML elements and attributes for declaring a manifest file
- A set of XML elements and attributes for declaring and accessing resources
- A set of Intents
- A set of permissions that applications can request, as well as permission enforcements included in the system

The framework API that an Android platform delivers is specified using an integer identifier called "API Level".

## minSdkVersion <= targetSdkVersion <= compileSdkVersion

# Refs

- [Build.VERSION_CODES](https://developer.android.google.cn/reference/android/os/Build.VERSION_CODES.html)

- [uses-sdk](https://developer.android.google.cn/guide/topics/manifest/uses-sdk-element)

- [Build.VERSION_CODES](https://developer.android.google.cn/reference/android/os/Build.VERSION_CODES.html)

- [Distribution dashboard](https://developer.android.google.cn/about/dashboards/index.html)