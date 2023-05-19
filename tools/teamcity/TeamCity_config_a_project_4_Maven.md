# TeamCity Config a project - Maven

# 1 General Settings

![TeamCity_4_Maven_1](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_4_Maven_1.webp)

# 2 Version Control Settings

Same as Gradle

# 3 Build Steps

![TeamCity_4_Maven_5](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_4_Maven_5.webp)

## Maven part

![TeamCity_4_Maven_2](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_4_Maven_2.webp)

- Goals:

```
clean compile kotlin:compile jacoco:prepare-agent kotlin:test-compile test jacoco:report
```

## SonarQube part

![TeamCity_4_Maven_3](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_4_Maven_3.webp)

- Additional parameters:

```
-Dsonar.login=%env.sonarToken%
-Dsonar.scm.disable=false
-Dsonar.sourceEncoding=UTF-8
-Dsonar.coverage.jacoco.xmlReportPaths=javaLib/target/site/jacoco/jacoco.xml
-Dsonar.java.binaries=javaLib/target/classes
-Dsonar.tests=javaLib/src/test/java
-Dsonar.sources=javaLib/src/main/java
-Dsonar.core.codeCoveragePlugin=jacoco
-Dsonar.sourceEncoding=UTF-8
-X
```

# 4 Parameters

![TeamCity_4_Maven_4](https://yingvickycao.github.io/img/tools/teamcity/TeamCity_4_Maven_4.webp)
