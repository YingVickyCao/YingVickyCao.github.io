- APK  
an Android Application Package (APK).

- DEX  
DEX (Dalvik Executable)

- `compileSdkVersion`  
compileSdkVersion specifies the Android API level Gradle should use to compile your app. App can use the API features included in this API level and lower.
   
- `buildToolsVersion`  

  e.g.,`/sdk/build-tools/29.0.3`  
  
  buildToolsVersion specifies the version of the SDK build tools, command-line utilities, and compiler that Gradle should use to build app. 
  
  This property is optional because the plugin uses a recommended version of the build tools by default.

- Android Gradle plugin  
android studio 通过插件android gradle plugin，而非直接使用gradle 来构建android project(android resources)  
Gradle and the Android plugin run independent of Android Studio.

# 1 Where does Android Studio fetch the library from?

- [Define maven respo in build.gradle](template_define_maven_respo_in_build.gradle.md)

- Add a dependencies

```ini
# module level build.gradle
dependencies {
    implementation "io.reactivex.rxjava2:rxjava:2.1.1"
}
```

- Android Studio downloads the library from `Maven Repository Server` defined in `build.gradle`.
- Basically there are just 2 standard servers used for host the libraries for Android such as `jcenter` and `Maven Central`  
  both jcenter and Maven Central are standard android library repositories but they are hosted at completely different place, provided by different provider and there is nothing related to each other. What that is available in jcenter might not be found in Maven Central and vice versa.

| Compare Item                                                       | jcenter                        | Maven Central                                                               |
| ------------------------------------------------------------------ | ------------------------------ | --------------------------------------------------------------------------- |
| Type                                                               | Maven Repository               | Maven Repository                                                                         |
| hosted by                                                          | bintray.com                    | sonatype.org                                                                |
| repository url                                                     | https://jcenter.bintray.com/   | https://repo1.maven.org/maven2/ </br> https://repo.maven.apache.org/maven2/ |
| Define repository in project's build.gradle                        | jcenter()                      | mavenCentral()                                                              |
| Have duty                                                          | hosting Java/Android libraries | hosting Java/Android libraries                                                                        |
| Android Studio auto define as a default repository in build.gradle | Yes.                           | No. Not developer-friendly. Hard to upload lib                              |

- [maven 坐标系](../../maven/Maven.md#maven_coordinate)