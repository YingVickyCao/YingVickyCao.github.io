# Config SonarQube

- sonarQube 相关的配置在 TeamCity 中，没有配在代码中  
  http://www.cocoachina.com/articles/30404

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

## Config sonar-runner

```
# sonar-scanner/conf/sonar-scanner.properties
sonar.sourceEncoding=UTF-8

sonar.login=admin
sonar.password=newPwd
sonar.scm.disablied=true
```

```
# ~/.bash_profile
# SONAR_RUNNER_HOME
export SONAR_RUNNER_HOME=~/Library/sonar-scanner/bin/
export PATH=${PATH}:${SONAR_RUNNER_HOME}
```

testing configure:

```
$ echo $SONAR_RUNNER_HOME

$ sonar-scanner -v
INFO: Scanner configuration file: /Users/account/Library/sonar-scanner/conf/sonar-scanner.properties
INFO: Project root configuration file: NONE
INFO: SonarQube Scanner 4.0.0.1744
INFO: Java 11.0.3 AdoptOpenJDK (64-bit)
INFO: Mac OS X 10.14.6 x86_64
```

# Tocken

```
Gradle_Build
c76ae2422485d6008fb63c76cedbf3f10ae3ef41

Maven_Build
b0d5c7dcc0cd5da15259cb1bde4d4e369277c98c
```

# 【Android Studio】-> SonarLint plugin

SonarLint plugin's rule may diffs SonarQube website.
After configuration, the rule is same with SonarQube website's rule.
