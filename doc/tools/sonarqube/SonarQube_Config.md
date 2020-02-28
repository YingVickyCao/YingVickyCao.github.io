# Config SonarQube

- sonarQube 相关的配置在 TeamCity 中，没有配在代码中  
  http://www.cocoachina.com/articles/30404

- 即使端口号不同，同一时间也只能启动一个
- Teamcity build finsh, but SonarQube Page is on analysis when open:`There is a pending analysis`.

# 1 Sonarqube

## Download Sonarqube

![SonarQube_download_type](/img/SonarQube_download_type.jpg)

- Download Community Edition
- Show all versions

| SonarQube Version | Support Language | Java Version | Tested |
| ----------------- | ---------------- | ------------ | ------ |
| SonarQube 7.9     | Java + Kotlin    | JDK 11       | Yes    |
| SonarQube 7.8     | Java + Kotlin    | JDK 11       | No     |
| SonarQube 7.7     | Java             | JDK 8        | Yes    |
| SonarQube 6.7     | Java             | JDK 8        | Yes    |

## Config sonarube

```
# sonarube/conf/sonar.properties
sonar.sorceEncoding=UTF-8
sonar.login=admin
sonar.password=admin
```

```
# sonarube/conf/wrapper.conf
# Custom JDK when SonarQube 7.7 and SonarQube 6.7
wrapper.java.command=/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/bin/java

# Custom JDK when SonarQube 7.9
wrapper.java.command=/Library/Java/JavaVirtualMachines/jdk-11.0.4.jdk/Contents/Home/bin/java
```

# 2 sonar-runner

- **_Teamcty not need sonar-runner. Only command line need._**

## Download sonar-runner

- https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/

## Config sonar-runner

```
# sonar-scanner/conf/sonar-scanner.properties
sonar.sourceEncoding=UTF-8

sonar.login=admin
sonar.password=admin
sonar.scm.disablied=true
```

```
# ~/.bash_profile
# SONAR_RUNNER_HOME
export SONAR_RUNNER_HOME=~/Library/sonar-scanner/bin/
export PATH=${PATH}:${SONAR_RUNNER_HOME}

$ echo $SONAR_RUNNER_HOME

$ sonar-scanner -v
INFO: Scanner configuration file: /Users/account/Library/sonar-scanner/conf/sonar-scanner.properties
INFO: Project root configuration file: NONE
INFO: SonarQube Scanner 4.0.0.1744
INFO: Java 11.0.3 AdoptOpenJDK (64-bit)
INFO: Mac OS X 10.14.6 x86_64
```

# 3 Login

- [SonarQube startup](SonarQube_startup.md)

```
http://localhost:9000
admin
admin
```

# 4 Setup a project to analysis

![SonarQube_create_a_project.jpg](https://yingvickycao.github.io/img/SonarQube_create_a_project.jpg)
When config `-Dsonar.login` in TeamCity, use account `admin`, not tocken

# 5 SonarQube Plugin

Administration -> Marketplace

- Branch (Developer Edition)
- DeveloperD (Developer Edition)
- Governance (Enterprise Edition)

# Refs

- http://www.mamicode.com/info-detail-2674693.html
- https://www.jianshu.com/p/f37b97a9f85c
