# Use Android Studio to push android library to JCenter and Maven Center

# 1 Basic knowledge

## 1.1 Upload library to standard server or to host our own server?

The former is. To make our own library be available to public.  
Another developer should not has to define anything but a line of code defining dependency's name.  
jcenter and Maven Central which provide far better experience for developer.

## 1.2 aar file format

zip = class.jar + Android-specific files like AndroidManifest.xml, Resources, Assets or JNI

```
/AndroidManifest.xml (mandatory)
/classes.jar (mandatory)
/res/ (mandatory)
/R.txt (mandatory)
/assets/ (optional)
/libs/*.jar (optional)
/jni/<abi>/*.so (optional)
/proguard.txt (optional)
/lint.jar (optional)
```

# 1.3 Uploading processes

![distribute-lib-to-jCenter-and-maven-Central-step-from-Android -Studio.png](https://yingvickycao.github.io/img/tools/android_studio/distribute-lib-to-jCenter-and-maven-Central-step-from-Android-Studio.png)

# 2 Upload library to bintray

## Step 1: Register an bintray account

https://bintray.com  
官网（企业）：https://bintray.com/ （免费试用，收费）  
个人：https://bintray.com/signup/oss （免费）

## Step 2 : Create one respository

`View Profile` -> `Add New Repository`

![bintatry_ceate_a_repo.jpg](https://yingvickycao.github.io/img/tools/android_studio/bintatry_ceate_a_repo.jpg)

## Step 3 : Add New Package

Done. You now have your own Maven Repository on Bintray  
Page URL:https://bintray.com/yingvickycao/Autils  
Repository url:https://dl.bintray.com/yingvickycao/Autils

## Step 4 : Prepare an Android Studio project

## Step 5 : Upload library to your bintray space

- Run：  
  命令行.

```
./gradlew clean build bintrayUpload -PbintrayUser=binary_user -PbintrayKey=API_KEy  -PdryRun=false
/
./gradlew bintrayUpload
# build.gralde
userOrg = USER_ORG
```

// If bintray is 企业版. userOrg=Organization Name. If is personal, userOrg=user name.

- Check:  
  browse into the directory matched your library's group id and artifact id  
  https://dl.bintray.com/yingvickycao/Autils  
  com -> github -> yingvickycao -> autils -> 0.0.1-beta-1

- Use:

```
repositories {
    maven {
        url 'https://dl.bintray.com/yingvickycao/Autils'
    }
}

dependencies {
    implementation 'com.github.yingvickycao:autils:0.0.1-beta-1'
}
```

## Step 6 : Sync bintray user repository to jcenter

- Click  
  `Add to JCenter`

- Done:  
  `Link to Jcenter`

- Check:  
  browse into the directory matched your library's group id and artifact id  
  https://jcenter.bintray.com/  
  com -> github -> yingvickycao -> autils -> 0.0.1-beta-1

- Use:

```
repositories {
    jcenter()
}

dependencies {
    implementation 'com.github.yingvickycao:autils:0.0.1-beta-1'
}
```

# 3 Upload library to Maven Central

## Step 1 : Create a Sonatype account for Maven Central

https://issues.sonatype.org/secure/Dashboard.jspa

First,sign up for an account  
Then, create one is the JIRA Issue Tracker account on Sonatype site.

`Create` ->

| Requireed Item | Desc                  | Example                                                    |
| -------------- | --------------------- | ---------------------------------------------------------- |
| Project        | -                     | Community Support - Open Source Project Repository Hosting |
| Issue Type     | -                     | New Project                                                |
| Summary        | library's name        | Android Common Utils                                       |
| Group Id       | GROUP_ID              | com.github.yingvickycao                                    |
| Project URL    | lib url               | https://yingvickycao.github.io/AUtils                      |
| SCM URL        | URL of Source Control | https://github.com/YingVickyCao/AUtils.git                 |

https://issues.sonatype.org/browse/OSSRH-51735  
https://issues.sonatype.org/browse/OSSRH-31467

## Step 2 : give bintray your Sonatype OSS username

## Step 3 : Enable Auto Signing in Bintray

Check the GPG Sign uploaed files automatically box to enable auto signing.

- Upload the public key to keyservers  
  [GPG Tool](../gpy.md)

- Set GPG Signing with Publick key and private key  
  `public_key_sender.asc` and `private_key_sender.asc`

![bintatry_set_GPG_Signing.png](https://yingvickycao.github.io/img/tools/android_studio/bintatry_set_GPG_Signing.png)

- Enable GPG Sign uploaded files auto

![bintray_check_enable_auto_signing_1.png](https://yingvickycao.github.io/img/tools/android_studio/bintray_check_enable_auto_signing_1.png)

## Step 4 : Async library to from jcenter to Maven Central

To forward library from jcenter to Maven Central, there are two missions that you need to achieve first:

1. Bintray package must be already linked to jcenter
2. Repository on Maven Central has already been approved to open

- `Maven Central` -> `sync`

![bintray_async_sonatype_1.png](https://yingvickycao.github.io/img/tools/android_studio/bintray_async_sonatype_1.png)

![bintray_async_sonatype_2.png](https://yingvickycao.github.io/img/tools/android_studio/bintray_async_sonatype_2.png)

Sync failed:  
![bintray_async_sonatype_3.jpg](https://yingvickycao.github.io/img/tools/android_studio/bintray_async_sonatype_3.jpg)  
https://central.sonatype.org/pages/requirements.html

- Check:  
  https://repo1.maven.org/maven2/  
  artifact id /group  
  com -> github -> yingvickycao -> autils -> 0.0.1-beta-1

- Use:

```
repositories {
    mavenCentral()
}

dependencies {
    implementation 'com.github.yingvickycao:autils:0.0.1-beta-1'
}
```

# FAQ

## ERROR: bintrayPublish, `Subject not found`

```
Execution failed for task ':bintrayPublish'.
Could not publish 'YingVickyCao/maven/autils/0.0.1': HTTP/1.1 404 Not Found [message:Subject 'YingVickyCao' was not found]
```

Fix:  
与 User name 保持一致. YingVickyCao ->yingvickycao

```
# https://bintray.com/yingvickycao/Autils/autils/0.0.1
./gradlew clean build bintrayUpload -PbintrayUser=bintray_user_name -PbintrayKey=API_KEy  -PdryRun=false
```

## ERROR: bintrayUpload, `Repo was not found`

```
Execution failed for task ':autils:bintrayUpload'.
> Could not create package 'yingvickycao/maven/autils': HTTP/1.1 404 Not Found [message:Repo 'maven' was not found]
```

Fix:  
与 respository name 保持一致.

```
# https://bintray.com/yingvickycao/Autils/autils/0.0.1

# build.gradle
repo = "Autils" // maven -> Autils
```

## ERROR:TBD,gradle sync, Could not find method leftShift() for arguments

Reason:  
`<<` 在 gradle 在 5.1 之后废弃

Fix:

```
task hello << {
	println "Hello World!"
}

=>
task hello {
	println "Hello World!"
}
```

## ERROR: gradle sync, `Cannot create variant 'android-aidl' after configuration ':autils:debugApiElements' has been resolved`

## ERROR: TBD, javadoc, `Javadoc generation failed.`

```
Execution failed for task ':autils:javadoc'.
  Javadoc generation failed. Generated Javadoc options file (useful for troubleshooting): '/Users/hades/Documents/GitHub/AUtils/autils/build/tmp/javadoc/javadoc.options'
```

## ERROR:bintrayUpload,`artifact already exists`

```
> Could not upload to 'https://api.bintray.com/content/yingvickycao/Autils/autils/0.0.1/com/github/yingvickycao/autils/0.0.1/autils-0.0.1-sources.jar': HTTP/1.1 409 Conflict [message:Unable to upload files: An artifact with the path 'com/github/yingvickycao/autils/0.0.1/autils-0.0.1-sources.jar' already exists]
```

Fix:

```
Delete already exists files before upload
/
# build.gradle
override = true
```

## ERROR : TBD, bintrayPublish,`NullPointerException`

```
> Task :bintrayPublish FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':bintrayPublish'.
> java.lang.NullPointerException (no error message)
```

# ERROR: bintrayPublish `Bintray user cannot be empty`

Fix:
set bintray user name

```
# module build.gradle
userOrg = USER_ORG

# command
./gradlew clean build bintrayUpload -PbintrayUser=bintray_user_name -PbintrayKey=API_KEy  -PdryRun=false
```

# 3 Publish to Maven Local

# Refs:

- https://sonatype.org/
- https://bintray.com/
- https://www.jfrog.com/confluence/display/BT/Maven+Repositories#MavenRepositories-ResolvingArtifacts.1
- https://central.sonatype.org/pages/gradle.html

* https://github.com/bintray/gradle-bintray-plugin
* https://github.com/novoda/bintray-release
* https://github.com/novoda/bintray-release/wiki/Add-support-for-syncing-to-maven-central
* https://inthecheesefactory.com/blog/how-to-upload-library-to-jcenter-maven-central-as-dependency/en
* https://www.cnblogs.com/welhzh/p/6000981.html

- https://www.codercto.com/a/77793.html

- https://segmentfault.com/a/1190000018943351
