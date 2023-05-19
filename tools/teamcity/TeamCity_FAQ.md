# TeamCity - FAQ

## ERROR : `Please supply original non-instrumented`

![TeamCity_Build_Steps_Step_Gradle_Code_Coverage_1.jpg](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Build_Steps_Step_Gradle_Code_Coverage_2.jpg)

Fix:  
去掉 Coverage 设置  
![TeamCity_Build_Steps_Step_Gradle_Code_Coverage_1.jpg](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Build_Steps_Step_Gradle_Code_Coverage_1.jpg)

## ERROR ： `It is not located in module basedir`

```
[[17:32:31]17:32:31.865 WARN: File '/Users/account/Library/TeamCity/buildAgent/work/b5c3f37037cf919e/app/src/main/java/com/github/yingvickycao/enablecodecoverage/A1.java' is ignored. It is not located in module basedir '/Users/account/Library/TeamCity/buildAgent/work/b5c3f37037cf919e/androidLib'.
```

Fix:  
去掉 modules 设置

## ERROR: `An illegal reflective access operation has occurred`

```
WARNING: An illegal reflective access operation has occurred
[16:16:03]WARNING: Illegal reflective access by net.sf.cglib.core.ReflectUtils$1 (file:/Users/account/.sonar/cache/866bb1adbf016ea515620f1aaa15ec53/sonar-javascript-plugin.jar) to method java.lang.ClassLoader.defineClass(java.lang.String,byte[],int,int,java.security.ProtectionDomain)
[16:16:03]WARNING: Please consider reporting this to the maintainers of net.sf.cglib.core.ReflectUtils$1
[16:16:03]WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
[16:16:03]WARNING: All illegal access operations will be denied in a future release
[16:16:04]16:16:04.019 ERROR: Invalid value for sonar.java.binaries
[16:16:04]16:16:04.045 ERROR: Error during SonarQube Scanner execution
[16:16:04]java.lang.IllegalStateException: No files nor directories matching ' app/build/tmp/kotlin-classes/debug/'
[16:16:04] at org.sonar.java.AbstractJavaClasspath.getFilesFromProperty(AbstractJavaClasspath.java:92)
```

Fix:

```
-Dsonar.java.binaries=app/tmp/kotlin-classes/debug/
=>
-Dsonar.java.binaries=app/build/tmp/kotlin-classes/debug/
```

## ERROR：`Caused by: Not authorized. Please check the properties sonar.login and sonar.password.`

Fix:
sonar.login admin, not tocken  
sonar.password admin

## ERROR: `Invalid value for sonar.java.binaries`

```
16:53:23.035 WARN: SCM provider autodetection failed. Please use "sonar.scm.provider" to define SCM of your project, or disable the SCM Sensor in the project settings.
[16:53:25]16:53:25.166 ERROR: Invalid value for sonar.java.binaries
[16:53:25]16:53:25.288 ERROR: Error during SonarQube Scanner execution
```

Fix:

```
# android Gradle buils system Java Byte Code Location. So does Android Project build.gradle config jacocoTestReport.
# classDirectories 的设置应以项目编译后生成的 class 文件目录为准
# android gradle plugin < 3.2
-Dsonar.java.binaries=app/build/intermediates/classes/debug

# android gradle plugin >= 3.2
-Dsonar.java.binaries=app/build/intermediates/javac/debug/compileDebugJavaWithJavac/classes
```

## ERROR: `Invalid value for sonar.java.binaries`

```
[Step 3/3] 16:08:23.511 ERROR: Invalid value for sonar.java.binaries
[Step 3/3] java.lang.IllegalStateException: No files nor directories matching ' app/tmp/kotlin-classes/debug/'
```

Fix:

```
app/tmp/kotlin-classes/debug/
=>
app/build/tmp/kotlin-classes/debug/
```

## ERROR: `WARN: SCM provider autodetection failed. Please use "sonar.scm.provider" to define SCM of your project, or disable the SCM Sensor in the project settings.`

```
-Dsonar.scm.disable=false
-Dsonar.scm.url=http://github.com/YingVickyCao/AUtils/tree/master
-Dsonar.scm.connection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.developerConnection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.forceReloadAll=true
```

## ERROR: TBD, `commit hook is inactive`

https://www.jetbrains.com/help/teamcity/2019.1/configuring-vcs-post-commit-hooks-for-teamcity.html

## ERROR: `Caused by: java.lang.LinkageError: loader 'bootstrap' attempted duplicate class definition for java.lang.$JaCoCo`

```
[21:37:59]:app:mergeDebugResources
[21:37:59][:app:mergeDebugResources] Exception in thread "main" java.lang.reflect.InvocationTargetException
[21:37:59][:javaLib:test] Caused by: java.lang.reflect.InvocationTargetException
[21:37:59][:javaLib:test] Caused by: java.lang.LinkageError: loader 'bootstrap' attempted duplicate class definition for java.lang.$JaCoCo.
[21:37:59][:app:mergeDebugResources] Caused by: java.lang.reflect.InvocationTargetException
[21:37:59][:app:mergeDebugResources] Caused by: java.lang.LinkageError: loader 'bootstrap' attempted duplicate class definition for java.lang.$JaCoCo.

[21:38:00]> Process 'Gradle Test Executor 1' finished with non-zero exit value 134
[21:38:00]Caused by: org.gradle.process.internal.ExecException: Process 'Gradle Test Executor 1' finished with non-zero exit value 134
```

Fix:

- Clear `/Users/account/Library/TeamCity/buildAgent/work/`
- jdk 版本不对应

## ERROR:`Unrecognized option`

```
[Step 3/3] ERROR: Unrecognized option: -sonar.jacoco.reportPaths=app/build/jacoco/jacocoTest.exec,androidLib/build/jacoco/jacocoTest.exec,javaLib/build/jacoco/jacocoTest.exec
-D

```

Fix:

```
-sonar.jacoco.reportPaths
=>
-Dsonar.jacoco.reportPaths
```

## Q : [TeamCity 2021.1.2 (build 92869)] Can not find SonarQube Runnder

A： User Adnistrator to downlaod SonarQube Runnder plugin ,then you can see it.
See above。

## Q : [TeamCity 2021.1.2 (build 92869)] No enabled compatible agents for this build configuration.Please register a build agent or tweak build configuration requirements.

A :  
先查看 defaut agent 不能用的原因，一般是 Parameters 配置有问题，可以根据错误提示来修复。  
如果 fix 完 Parameters 后，还不能使用，只能重新安装一个 Agent。

How to install agent？  
Tab Agents ->Install Build Agents -> Full zip file distribution,  
放入=> /Users/account/Library/TeamCity/buildAgentFull，go to etc,重命名 buildAgent.dist.properties -> buildAgent.properties.

```
~/Library/TeamCity/bin/runAll.sh stop
~/Library/TeamCity/buildAgent/bin/agent.sh start
~/Library/TeamCity/bin/runAll.sh start
```

## Q: [TeamCity 2021.1.2 (build 92869)] project code download fail

```
Failed to collect changes, error: List remote refs failed: java.net.SocketTimeoutException: Read timed out, VCS root: "EnableCodeCoverage" {instance id=3, parent internal id=1, parent id=EnableCodeCoverage_EnableCodeCoverage, description: "https://github.com/YingVickyCao/EnableCodeCoverage.git#refs/heads/develop_androidx"}
```

A:  
Version Control Setting -> VCS Root ->Edit ->Edit VCS Root

Authentication method: Anonymous  
=>  
Authentication method: Password / access token  
Username: the user name to access the clone the URL  
Password / access token: the password to clone the URL

## Q : [TeamCity 2021.1.2 (build 92869)]`No files nor directories matching 'app/build/intermediates/classes/debug/'`

```
ERROR: Invalid value for sonar.java.binaries
ERROR: Error during SonarQube Scanner execution
java.lang.IllegalStateException: No files nor directories matching 'app/build/intermediates/classes/debug/'
Process exited with code 1 (Step: SonarQube Analysis (SonarQube Runner))
Step SonarQube Analysis (SonarQube Runner) failed
```

```
// Android code
-Dsonar.java.binaries=app/build/intermediates/classes/debug/,javaLib/build/classes/java/,androidLib/build/intermediates/classes/debug/
=>
// Androidx code
-Dsonar.java.binaries=app/build/intermediates/javac/debug/classes/,app/build/tmp/kotlin-classes/debug/,javaLib/build/classes/java/main/,javaLib/build/classes/kotlin/main/,androidLib/build/intermediates/javac/debug/classes/,androidLib/build/tmp/kotlin-classes/debug/
```

Dirs:

```
app/build/intermediates/javac/debug/classes/com/github/yingvickycao/enablecodecoverage (Only Java) => Use this
app/build/intermediates/javac/debug/debugUnitTest/com/github/yingvickycao/enablecodecoverage (Only Java)
app/build/intermediates/jacoco_instrumented_classes/debug/out/com/github/yingvickycao/enablecodecoverage (Java + Kotlin，命令行/Teamcity build 没有，AS Click run 有)
app/build/tmp/kotlin-classes/debug/com/github/yingvickycao/enablecodecoverage (Only Kotlin) => Use this

javaLib/build/classes/java/main/com/github/yingvickycao (Only Java) => Use this
javaLib/build/classes/java/test/com/github/yingvickycao (Only Java)
javaLib/build/classes/kotlin/main/com/github/yingvickycao/javalib (Only Kotlin) => Use this
javaLib/build/classes/kotlin/test/com/github/yingvickycao/javalib (Only Kotlin)

androidLib/build/intermediates/javac/debug/classes/com/github/yingvickycao/androidlib (Only Java) => Use this
androidLib/build/intermediates/javac/debugUnitTest/classes/com/github/yingvickycao/androidlib (Only Java)
androidLib/build/intermediates/jacoco_instrumented_classes/debug/out/com/github/yingvickycao/androidlib (Java + Kotlin) =>没有效果
androidLib/build/intermediates/runtime_library_classes_dir/debug/com/github/yingvickycao/androidlib(Java + Kotlin,命令行/Teamcity build 没有，AS Click run 有)
androidLib/build/tmp/kotlin-classes/debug/com/github/yingvickycao/androidlib(Only Kotlin) => Use this
androidLib/build/tmp/kotlin-classes/debugUnitTest/com/github/yingvickycao/androidlib (Only Kotlin)
```

## Q : [TeamCity 2021.1.2 (build 92869)] `java.lang.IllegalStateException: No files nor directories matching 'app/build/intermediates/jacoco_instrumented_classes/debug/'`

A :

androidLib/build/intermediates/runtime_library_classes_dir/debug/com/github/yingvickycao/androidlib(Java + Kotlin,命令行/Teamcity build 没有，AS Click run 有)

## Q : [TeamCity 2021.1.2 (build 92869)] Cannot set the value of read-only property 'classDirectories'

A :
https://docs.gradle.org/current/userguide/upgrading_version_5.html#other_deprecated_behaviors_and_apis  
classDirectories - use getClassDirectories().setFrom() instead.

```grovy
classDirectories = files([classDirectories_java, classDirectories_kotlin])
=>
getClassDirectories().setFrom(files([classDirectories_java, classDirectories_kotlin]))
```

<h2><font color=#FF0000>Q : android library module (com.android.library) code coverage is always 0%, error :java.lang.IllegalStateException: Cannot process instrumented class .Please supply original non-instrumented classes.</font></h2>

```
// Android Gradle Plugin 4.2.2 teamcity build log:
[17:10:01] : [Step 2/3] com.github.yingvickycao.androidlib.B1Test (1s)
[17:10:02] : [com.github.yingvickycao.androidlib.B1Test] com.github.yingvickycao.androidlib.B1Test.getB1Value
[17:10:03] : [com.github.yingvickycao.androidlib.B1Test.getB1Value] [Test Error Output]
java.lang.instrument.IllegalClassFormatException: Error while instrumenting com/github/yingvickycao/androidlib/B1.

Caused by: java.io.IOException: Error while instrumenting com/github/yingvickycao/androidlib/B1.
Caused by: java.lang.IllegalStateException: Cannot process instrumented class com/github/yingvickycao/androidlib/B1. Please supply original non-instrumented classes.
```

A :

Reason :  
AGP 4.1+(Android Gradle Plugin) does it's own form of instrumentation to get the coverage which is undoubtedly incompatible with JaCoCo.  
https://stackoverflow.com/questions/67299155/kotlin-jacoco-illegalclassformatexception-please-supply-original-non-instrume

https://stackoverflow.com/questions/59378618/kotlin-jacoco-no-coverage-illegalclassformatexception-please-supply-orig

Solution:  
Android Gradle Plugin 4.2.2 -> 4.0.2

## Q : ERROR:TBD, Email Notifier,`SMTPSendFailedException`

Email Notifier -> Try connectioin

```
com.sun.mail.smtp.SMTPSendFailedException: 530 5.7.57 SMTP; Client was not authenticated to send anonymous mail during MAIL FROM [HK2PR06CA0009.apcprd06.prod.outlook.com]
```

## Q :Android SDK update has: `NoClassDefFoundError: javax/xml/bind/annotation/XmlSchema` => TBD, not fix

```
# sdk/tools/bin/sdkmanager --update --proxy=http --proxy_host=mirrors.neusoft.edu.cn --proxy_port=80
echo 'y'|/%env.ANDROID_HOME%/tools/bin/sdkmanager --update --proxy=http --proxy_host=%env.proxy_host% --proxy_port=%env.proxy_port%
pwd
```

log:

```
12:34:03 Step 1/3: Android SDK Update (Command Line)
12:34:03   Starting: /Users/account/Library/TeamCity/buildAgent/temp/agentTmp/custom_script6393639027355839498
12:34:03   in directory: /Users/account/Library/TeamCity/buildAgent/work/20fcfbbe37fa6001
12:34:03   Exception in thread "main" java.lang.NoClassDefFoundError: javax/xml/bind/annotation/XmlSchema
12:34:03     at com.android.repository.api.SchemaModule$SchemaModuleVersion.<init>(SchemaModule.java:156)
12:34:03     at com.android.repository.api.SchemaModule.<init>(SchemaModule.java:75)
12:34:03     at com.android.sdklib.repository.AndroidSdkHandler.<clinit>(AndroidSdkHandler.java:81)
12:34:03     at com.android.sdklib.tool.sdkmanager.SdkManagerCli.main(SdkManagerCli.java:73)
12:34:03     at com.android.sdklib.tool.sdkmanager.SdkManagerCli.main(SdkManagerCli.java:48)
12:34:03   Caused by: java.lang.ClassNotFoundException: javax.xml.bind.annotation.XmlSchema
12:34:03     at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:581)
12:34:03     at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:178)
12:34:03     at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:521)
12:34:03     ... 5 more
12:34:03   /Users/account/Library/TeamCity/buildAgent/work/20fcfbbe37fa6001
12:34:03   Process exited with code
```

Ref:
https://blog.csdn.net/jia__/article/details/92620921  
https://stackoverflow.com/questions/53076422/getting-android-sdkmanager-to-run-with-java-11

## Q : App can't be opened because it is from an unidentified developer

Fix :https://blog.csdn.net/wujunlei1595848/article/details/91043247
