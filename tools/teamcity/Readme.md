# TeamCity

- TeamCity 是持续集成（CI）的工具，用于保证项目质量。
- 常见的 CI 工具：TeamCity 和 Jenkins、Hudson
- Docker 已经开始在引入到 CI、CD（持续交付）过程中，简化整体的过程
- 支持的平台、环境
  ![TC_spider_Feb2016.png](https://confluence.jetbrains.com/download/attachments/74847230/TC_spider_Feb2016.png?version=1&modificationDate=1456497042000&api=v2)

# 测试环境 （update 2022-12-19）

```
macOS

android studio 2021
gradle 7.4.2
android gradle plugin 7.1.3

Java 11

SonarQube  - Community EditionVersion 8.9.10 (build 61524), need JDK 11
TeamCity Professional 2022.10.1 (build 116934)
```

# TeanCity CI about versions

| Item                            | Verson                               |
| ------------------------------- | ------------------------------------ |
| Projet Gradle                   | Gradle 4.5                           |
| Projet Gradle plugin            | com.android.tools.build:gradle:3.0.1 |
| Projet Jacoco plugin            | org.jacoco:org.jacoco.core:0.8.4     |
| Projet                          | JDK 1.8                              |
| TeamCity - Build Steps : Gradle | JDK 1.8 x64                          |

- SonarQube 6.7.7

| Item                                      | Verson                                             |
| ----------------------------------------- | -------------------------------------------------- |
| TeamCity - Build Steps : SonarQube Runner | JDK 1.8 x64                                        |
| sonarqube-6.7.7                           | JDK 1.8 <br/>Java <br/> `sonar.jacoco.reportPaths` |

- SonarQube 7.7

| Item                                      | JDK Verson                                          |
| ----------------------------------------- | --------------------------------------------------- |
| TeamCity - Build Steps : SonarQube Runner | JDK 1.8 x64                                         |
| sonarqube-7.7                             | JDK 1.8 <br/> Java <br/> `sonar.jacoco.reportPaths` |

- SonarQube 7.9

| Item                                      | JDK Verson                                                           |
| ----------------------------------------- | -------------------------------------------------------------------- |
| TeamCity - Build Steps : SonarQube Runner | JDK 11 x64                                                           |
| sonarqube-7.9                             | JDK 11 <br/> Java+Kotlin <br/> sonar.coverage.jacoco.xmlReportPaths` |

# 1 下载 Teamcity

- 默认下载免费 Professional 专业版。
  https://www.jetbrains.com/zh/teamcity/download/#section=mac
- Enterprise 企业版，可申请 60 天的免费的 Enterprise 企业版试用。
- 下载的 tar.gz 的捆绑了一个 Tomcat

# 2 准备工作

## 准备测试代码

https://github.com/YingVickyCao/EnableCodeCoverage  
https://gitee.com/YingVickyCao/EnableCodeCoverage

```
gradle clean :app:testDebug :androidLib:testDebug :javalib:test
```

- [Jacoco](../jacoco/Jacoco.md)

## [配置和启动 Teamcity](./TeamCity_startup.md)

## [配置和启动 SonarQube](../sonarqube/Readme.md)

# 3 使用 Teamcity 配置 Project

- [Gradle](TeamCity_config_a_project_4_Gradle.md)
- [Maven](TeamCity_config_a_project_4_Gradle.md)

# 4 Run TeamCity

点击 run，开始手动构建该项目

# 5 Conclusion

- Read the official website information
- Local Jacoco coverage report exported success, then try config TeamCity
- Trial & Error 不断试错
- Note version difference.  
  e.g.  
  gradle plugin effect on Jacoco coverage report exported.  
  JDK  
  Sonarqube
- Refer to already scucessful setup

# [FAQ](./TeamCity_FAQ.md)

# Refs

- https://confluence.jetbrains.com/display/TW/SonarQube+Integration
- TeamCity Documentation https://www.jetbrains.com/help/teamcity/teamcity-documentation.html
- Installing Additional Plugins https://confluence.jetbrains.com/display/TCD9/Installing+Additional+Plugins
- Jacoco https://www.jianshu.com/p/671fad23c2ce
- https://www.jianshu.com/p/b30ee02a6b87
- TeamCity 自动触发 Build https://www.cnblogs.com/sparkdev/p/6239431.html
- Notifier Templates Configuration https://confluence.jetbrains.com/display/TCD3/Notifier+Templates+Configuration
- Subscribing to Notifications https://confluence.jetbrains.com/display/TCD10/Subscribing+to+Notifications
- https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-gradle/
  https://docs.sonarqube.org/7.9/analysis/analysis-parameters/
- https://docs.sonarqube.org/7.9/analysis/coverage/
- https://docs.sonarqube.org/7.7/analysis/coverage/
- https://docs.sonarqube.org/latest/analysis/external-issues//
- https://docs.sonarqube.org/latest/analysis/languages/java/
- https://docs.sonarqube.org/latest/analysis/languages/kotlin/
- https://plugins.gradle.org/plugin/org.sonarqube
- https://docs.sonarqube.org/display/PLUG/JaCoCo+Plugin
- https://github.com/SonarSource/sonar-scanning-examples/blob/master/doc/jacoco.md
- http://www.cocoachina.com/articles/30404
- Narrowing the Focus https://docs.sonarqube.org/7.9/project-administration/narrowing-the-focus/
- https://www.jianshu.com/p/e384595d0b14
- https://www.jianshu.com/p/778fd35fd494
