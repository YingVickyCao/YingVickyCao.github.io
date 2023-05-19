# SonarQube

# 1 下载

## Download Sonarqube

![SonarQube_download_type](https://yingvickycao.github.io/img/SonarQube_download_type.jpg)

- Download Community Edition

## Download sonar-runner

- **_Teamcty not need sonar-runner. Only command line need._**

- https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/

- 5 SonarQube Plugin
  Administration -> Marketplace

- Branch (Developer Edition)
- DeveloperD (Developer Edition)
- Governance (Enterprise Edition)

# 2 配置 并启动 Sonarqube

- [配置 SonarQube](./SonarQube_Config.md)
- [启动 Sonarqube](./SonarQube_startup.md)

# 3 Setup a project to analysis

![SonarQube_create_a_project.jpg](https://yingvickycao.github.io/img/SonarQube_create_a_project.jpg)
When config `-Dsonar.login` in TeamCity, use account `admin`, not tocken

# Refs

- http://www.mamicode.com/info-detail-2674693.html
- https://www.jianshu.com/p/f37b97a9f85c
- https://docs.sonarqube.org/latest/requirements/prerequisites-and-overview/
- https://docs.sonarqube.org/latest/analyzing-source-code/scanners/sonarscanner/
- https://docs.sonarqube.org/latest/setup-and-upgrade/install-the-server/
