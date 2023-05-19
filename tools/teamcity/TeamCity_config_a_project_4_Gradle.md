# TeamCity Config a project

# 1 General Settings

http://localhost:8111/profile.html?tab=userGeneralSettings

- Build number format:  
  `%VersionNumber%`
- Artifact paths:

  ```
  app/build/outputs/apk => apk
  app/build/outputs/mapping => mapping
  ```

  ![TeamCity_GeneralSettings](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_GeneralSettings.webp)

# 2 Email Notifier (TBD)

http://localhost:8111/admin/admin.html?item=email

通知内容的模板:  
https://confluence.jetbrains.com/display/TCD9//Customizing+Notifications

模板存放路径:  
/root/.BuildServer/config/\_notifications

# 3 Version Control Settings

![TeamCity_Version_Control_Settings](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Version_Control_Settings.jpg)

## VCS Roots - Edit VCS Root

![TeamCity_Version_Control_Settings_Edit](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Version_Control_Settings_Edit.webp)

- Fetch URL:  
  `https://github.com/YingVickyCao/EnableCodeCoverage.git`
- Branch Filter
  `+:*`

- Default branch:  
  `%defaultBranchVal%`
- Branch specification:  
  `%addtionalBrtanchSpec%`
- Click Test Connnection

# 4 Build Steps

![TeamCity_Build_Steps](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Build_Steps.jpg)

# 5 Build Step (1 of 4): Android SDK update

![img/TeamCity_Build_Steps_of_Android_SDK_update](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Build_Steps_of_Android_SDK_update.webp)

```
# android update sdk --use-sdk-wrapper --no-ui --all --force  --proxy-host mirrors.neusoft.edu.cn --proxy-port 80
echo 'y'|/%env.ANDROID_HOME%/tools/android update sdk --use-sdk-wrapper --no-ui --all --force  --proxy-host %env.proxy_host% --proxy-port %env.proxy_port%
pwd
```

```
[19:42:29][Step 1/4] The "android" command is deprecated.
[19:42:29][Step 1/4] For manual SDK, AVD, and project management, please use Android Studio.
[19:42:29][Step 1/4] For command-line tools, use tools/bin/sdkmanager and tools/bin/avdmanager
The "android" command is deprecated. For command-line tools, use tools/bin/sdkmanager and tools/bin/avdmanager
```

```
# sdk/tools/bin/sdkmanager --update --proxy_host=mirrors.neusoft.edu.cn --proxy_port=80 --proxy=http
echo 'y'|/%env.ANDROID_HOME%/tools/bin/sdkmanager --update --proxy_host=%env.proxy_host% --proxy_port=%env.proxy_port% --proxy=http
pwd
npm config list
```

# 6 Build Step - (2 of 4): Gradle

![TeamCity_Build_Steps_Step_Gradle.jpg](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Build_Steps_of_Gradle.webp)

- `%gradleTasks%`

- build.gradle
- JDK : JDK 11 (Teamcity 2020.1.3)

# 7 Build Step - (4 of 4): SonarQube Analysis

![TeamCity_Build_Steps_Step_Sonar_QubeAnalysis.jpg](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Build_Steps_of_Sonar_QubeAnalysis.webp)

- JDK : JDK 11 (Teamcity 2020.1.3)

## Runner Type：SonarQube Runner

Teamcity 如果默认没有 SonarQube Runner， 需要下载 SonarQube Analysis plugin。

Failed to download plugin from URL https://plugins.jetbrains.com/plugin/download?updateId=118904&build=92869&mode=professional&uuid=64f6f93f-7ef1-465b-a5dc-59c18fdf9696: Unable to connect to the plugins repository https://plugins.jetbrains.com. Check the network settings and try again later.

下载失败了，手动下载 URL，然后使用“Upload plugin zip” 来安装。

---

- SonarQube Server：

```
EnableCodeCoverage: http://localhost:9000
```

http://localhost:9000 是本地 SonarQube Server 的地址

- Project name:  
  `%env.sonarProjectName%`
- Project key:  
  `%env.sonarProjectKey%`
- Project version:  
  `%build.number%`

- Tests location

```
%teamcity.build.checkoutDir%/app/src/test/java,%teamcity.build.checkoutDir%/javaLib/src/test/java,%teamcity.build.checkoutDir%/androidLib/src/test/java
```

等价于 `sonar.tests`. 使用`Additional parameters`,而不是此处

ERROR:

```
[16:45:14]Caused by: The folder 'src/main/java' does not exist for 'EnableCodeCoverage' (base directory = /Users/account/Library/TeamCity/buildAgent/work/b5c3f37037cf919e)
```

```
/**/src/main/test
**/src/main/test
%teamcity.build.checkoutDir%/**/src/test/java
%teamcity.build.checkoutDir%/**/src/main/test
%teamcity.build.checkoutDir%/javaLib/src/test,%teamcity.build.checkoutDir%/androidLib/src/test
%teamcity.build.checkoutDir%/app/src/main/test,%teamcity.build.checkoutDir%/javaLib/src/main/test,%teamcity.build.checkoutDir%/androidLib/src/main/test
```

- Binaries location
- JDK
- Sources location

```
%teamcity.build.checkoutDir%/app/src/main/java,%teamcity.build.checkoutDir%/javaLib/src/main/java,%teamcity.build.checkoutDir%/androidLib/src/main/java
```

等价于 `sonar.sources`. 使用`Additional parameters`,而不是此处

ERROR:

```
src/main/java
**/src/main/java
%teamcity.build.checkoutDir%/**/src/main/java
%teamcity.build.checkoutDir%/app/src/test/java
```

## Additional parameters:

| Symbol | Meaning                   |
| ------ | ------------------------- |
| -D     | 配置属性                  |
| ?      | a single character        |
| \*     | any number of characters  |
| \* \*  | any number of directories |

### SonaarQube 8.9.7

使用 SonarQube 的 pwd

```groovy
-Dsonar.coverage.jacoco.xmlReportPaths=app/build/reports/jacoco/jacocoTestReport/jacocoTestReport.xml,javaLib/build/reports/jacoco/test/jacocoTestReport.xml,androidLib/build/reports/jacoco/jacocoTestReport/jacocoTestReport.xml
-Dsonar.java.binaries=app/build/intermediates/javac/debug/classes/,app/build/tmp/kotlin-classes/debug/,javaLib/build/classes/java/,androidLib/build/intermediates/javac/debug/classes/,androidLib/build/tmp/kotlin-classes/debug
-Dsonar.tests=app/src/test/java,javaLib/src/test/java,androidLib/src/test/java
-Dsonar.sources=app/src/main/java,javaLib/src/main/java,androidLib/src/main/java
-Dsonar.exclusions=**/*Activity.java,**/*Activity.kt,/**/gen/**/*,/**/build/**/*,**/R.class,**/R$*.class,**/BuildConfig.*,**/Manifest*.*,**/Lambda$*.class,**/Lambda.class,**/*Lambda.class,**/*Lambda*.class,**/*Test*.*,**/*ViewBinder*.*,**/*ViewInjector*.*,android/**/*.*,**/*Fragment.*
-Dsonar.login=%env.sonarLogin%
-Dsonar.password=%env.sonarPassword%
-Dsonar.scm.disable=false
-Dsonar.scm.url=http://github.com/YingVickyCao/AUtils/tree/master
-Dsonar.scm.connection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.developerConnection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.forceReloadAll=true
-Dsonar.sourceEncoding=UTF-8
-X
```

使用 SonarQube 的 token

```
-Dsonar.login=%env.sonarToken_1%
-Dsonar.coverage.jacoco.xmlReportPaths=app/build/reports/jacoco/jacocoTestReport/jacocoTestReport.xml,javaLib/build/reports/jacoco/test/jacocoTestReport.xml,androidLib/build/reports/jacoco/jacocoTestReport/jacocoTestReport.xml
-Dsonar.java.binaries=app/build/intermediates/javac/debug/classes/,app/build/tmp/kotlin-classes/debug/,javaLib/build/classes/java/,androidLib/build/intermediates/javac/debug/classes/,androidLib/build/tmp/kotlin-classes/debug/
-Dsonar.tests=app/src/test/java,javaLib/src/test/java,androidLib/src/test/java
-Dsonar.sources=app/src/main/java,javaLib/src/main/java,androidLib/src/main/java
-Dsonar.exclusions=**/*Activity.java,**/*Activity.kt,/**/gen/**/*,/**/build/**/*,**/R.class,**/R$*.class,**/BuildConfig.*,**/Manifest*.*,**/Lambda$*.class,**/Lambda.class,**/*Lambda.class,**/*Lambda*.class,**/*Test*.*,**/*ViewBinder*.*,**/*ViewInjector*.*,android/**/*.*,**/*Fragment.*
-Dsonar.scm.disable=false
-Dsonar.scm.url=http://github.com/YingVickyCao/AUtils/tree/master
-Dsonar.scm.connection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.developerConnection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.forceReloadAll=true
-Dsonar.sourceEncoding=UTF-8
-X
```

### SonarQube 7.9:

```groovy
-Dsonar.coverage.jacoco.xmlReportPaths=app/build/reports/jacoco/jacocoTestReport/jacocoTestReport.xml,javaLib/build/reports/jacoco/test/jacocoTestReport.xml,androidLib/build/reports/jacoco/jacocoTestReport/jacocoTestReport.xml
-Dsonar.java.binaries=app/build/intermediates/classes/debug/,app/build/tmp/kotlin-classes/debug/,javaLib/build/classes/java/,androidLib/build/intermediates/classes/debug/,androidLib/build/tmp/kotlin-classes/debug
-Dsonar.tests=app/src/test/java,javaLib/src/test/java,androidLib/src/test/java
-Dsonar.sources=app/src/main/java,javaLib/src/main/java,androidLib/src/main/java
-Dsonar.exclusions=**/*Activity.java,**/*Activity.kt,/**/gen/**/*,/**/build/**/*,**/R.class,**/R$*.class,**/BuildConfig.*,**/Manifest*.*,**/Lambda$*.class,**/Lambda.class,**/*Lambda.class,**/*Lambda*.class,**/*Test*.*,**/*ViewBinder*.*,**/*ViewInjector*.*,android/**/*.*,**/*Fragment.*
-Dsonar.login=%env.sonarLogin%
-Dsonar.password=%env.sonarPassword%
-Dsonar.scm.disable=false
-Dsonar.scm.url=http://github.com/YingVickyCao/AUtils/tree/master
-Dsonar.scm.connection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.developerConnection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.forceReloadAll=true
-Dsonar.sourceEncoding=UTF-8
-X
```

### SonarQube 7.7:

```groovy
-Dsonar.jacoco.reportPaths=app/build/jacoco/jacocoTest.exec,androidLib/build/jacoco/jacocoTest.exec,javaLib/build/jacoco/jacocoTest.exec
-Dsonar.java.binaries=app/build/intermediates/classes/debug/,javaLib/build/classes/java/,androidLib/build/intermediates/classes/debug/
-Dsonar.tests=app/src/test/java,javaLib/src/test/java,androidLib/src/test/java
-Dsonar.sources=app/src/main/java,javaLib/src/main/java,androidLib/src/main/java
-Dsonar.exclusions=**/*Activity.java,**/*.kt,/**/gen/**/*,/**/build/**/*,**/R.class,**/R$*.class,**/BuildConfig.*,**/Manifest*.*,**/Lambda$*.class,**/Lambda.class,**/*Lambda.class,**/*Lambda*.class,**/*Test*.*,**/*ViewBinder*.*,**/*ViewInjector*.*,android/**/*.*,**/*Fragment.*
-Dsonar.login=%env.sonarLogin%
-Dsonar.password=%env.sonarPassword%
-Dsonar.scm.disable=false
-Dsonar.scm.url=http://github.com/YingVickyCao/AUtils/tree/master
-Dsonar.scm.connection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.developerConnection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.forceReloadAll=true
-Dsonar.sourceEncoding=UTF-8
-X
```

### SonarQube 6.7.7:

```groovy
-Dsonar.jacoco.reportPaths=app/build/jacoco/jacocoTest.exec,androidLib/build/jacoco/jacocoTest.exec,javaLib/build/jacoco/jacocoTest.exec
-Dsonar.java.binaries=app/build/intermediates/classes/debug/,javaLib/build/classes/java/,androidLib/build/intermediates/classes/debug/
-Dsonar.tests=app/src/test/java,app2/src/test/java,javaLib/src/test/java,androidLib/src/test/java
-Dsonar.sources=app/src/main/java,app2/src/main/java,javaLib/src/main/java,androidLib/src/main/java
-Dsonar.exclusions=**/*Activity.java,**/*.kt,/**/gen/**/*,/**/build/**/*,**/R.class,**/R$*.class,**/BuildConfig.*,**/Manifest*.*,**/Lambda$*.class,**/Lambda.class,**/*Lambda.class,**/*Lambda*.class,**/*Test*.*,**/*ViewBinder*.*,**/*ViewInjector*.*,android/**/*.*,**/*Fragment.*,**/*Module.*,**/*Module4Dagger2.*,**/*Component.*
-Dsonar.login=%env.sonarLogin%
-Dsonar.password=%env.sonarPassword%
-Dsonar.scm.disable=false
-Dsonar.scm.url=http://github.com/YingVickyCao/AUtils/tree/master
-Dsonar.scm.connection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.developerConnection=scm:git:ssh://github.com:YingVickyCao/AUtils.git
-Dsonar.scm.forceReloadAll=true
-Dsonar.sourceEncoding=UTF-8
-X
```

---

`-Dsonar.branch.name=%teamcity.build.branch%`:  
Branch analysis is available as part of `Developer Edition`  
https://docs.sonarqube.org/latest/branches/overview/

- JacocoReport - classDirectories - excludes , not work  
  sonar.exclusions, work.

https://docs.sonarqube.org/7.9/project-administration/narrowing-the-focus/

```
**/*Module.*,**/*Module4Dagger2.*
```

![TeamCity_Build_Steps_Step_Sonar_QubeAnalysis_filter_code_coverage_4_dagger_before](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Build_Steps_Step_Sonar_QubeAnalysis_filter_code_coverage_4_dagger_before.jpg)

![TeamCity_Build_Steps_Step_Sonar_QubeAnalysis_filter_code_coverage_4_dagger_after](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Build_Steps_Step_Sonar_QubeAnalysis_filter_code_coverage_4_dagger_after.jpg)

- `sonar.scm.*` is optional

# 8 Triggers（触发器）

## VCS Trigger：自动构建触发行为。当有代码提交的时候，TeamCity 检查到新版本之后自动构建，

- TeamCity 会根据您设置的时间间隔去检测代码的变化。如果这段时间中有多个 checkin，仅触发一次 build。
- 当一个 build 配置有多个 VCS root 时，并不会为每个 VCS root 的变化触发 build，而是在检测过所有的 VCS root 后才决定是否触发一次 build
- 设置每个 checkin 都触发一次 build  
  Choose `选择"Trigger a build on each check-in"`
- 同一个提交者的多次提交只触发一次 build  
  Choose `"Include seral check-ins in a build if they are from the same committer"`
- 静默期(Quiet Period)  
  当检测到最后一次变更后的一段时间(默认一分钟)内没有发现新的变更才触发一次 build。

## Schedule Trigger：定时构建

![TeamCity_Triggers_Add_New_Triger.jpg](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Triggers_Add_New_Triger.jpg)

![TeamCity_Triggers.jpg](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_Triggers.jpg)

# 9 Parameters

![Teamcity_Parameters_Of_Gradle_Build](https://yingvickycao.github.io/img/tools/teamcity/Teamcity_Parameters_Of_Gradle_Build.webp)
