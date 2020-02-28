# TeamCity

- TeamCity 是持续集成（CI）的工具，用于保证项目质量。
- 常见的 CI 工具：TeamCity 和 Jenkins、Hudson
- Docker 已经开始在引入到 CI、CD（持续交付）过程中，简化整体的过程
- 支持的平台、环境
  ![TC_spider_Feb2016.png](https://confluence.jetbrains.com/download/attachments/74847230/TC_spider_Feb2016.png?version=1&modificationDate=1456497042000&api=v2)
- 下载的 tar.gz 的捆绑了一个 Tomcat

# 1 Install and config TeamCity

## 1.1 Download TeamCity

- 默认下载免费 Professional 专业版。(ON)  
  https://www.jetbrains.com/zh/teamcity/download/#section=mac  
  https://www.jetbrains.com/zh/teamcity/download/download-thanks.html?platform=mac

- Enterprise 企业版，可申请 60 天的免费的 Enterprise 企业版试用。

## 1.2 Config TeamCity

## 1.3 Run TeamCity

- [TeamCity startup](TeamCity_startup.md)
- 默认端口 8111

```
# TeamCity/conf/server.xml
<Connector port="8111" ..
```

- Success:

```
Installed TeamCity Software
Version: 2019.1.3 (build 66439)
Required data format version: 898
Data directory
Path: /Users/account/.BuildServer
Data format version: 856
Database
Database type: default (using internal database)
Version of HSQL that created the database file: 2.3.2
JDBC driver version: 2.3 (HSQL Database Engine Driver)
Database system version: 2.3.2 (HSQL Database Engine)
Data format version: 856
```

- Fail:

```
Current Startup State
Startup status
Current step: TeamCity server startup error
Next step: not defined yet
Data Directory
Directory path: /Users/account/.BuildServer exists
Database properties file not found
Internal database file: not found
Database
Database type: default (using internal database)
Database connection URL: jdbc:hsqldb:file:$TEAMCITY_SYSTEM_PATH/buildserver
JDBC driver version: 2.3 (HSQL Database Engine Driver)
Database system version: 2.3.2 (HSQL Database Engine)
Versions
Software version: 898
Data directory version: 898
Database version: 898
Logs
Logs path: /Users/account/Library/TeamCity/logs

```

- 软件安装的配置、服务的配置默认

`/Users/account/.BuildServer`

- log path :/Users/account/Library/TeamCity/logs
- ERROR: `Failed to create the 'database.properties' file: /Users/account/.BuildServer/config/database.properties (No such file or directory)`

  Fix:  
   Step 1 : 杀死 teamcity or restart mac  
   Step 2 : Delete cache folder : `/Users/account/.BuildServer`

- using internal database (Internal(HSQLDB))  
   Embedded database should be used for evaluation purpose only  
   The embedded database will not scale, it will not support upgrading to newer versions of SonarQube, and there is no support for migrating your data out of it into a different database engine.
- Use default Mac Agent

# 2 Config General when first use

## 2.1 General

http://localhost:8111/profile.html?tab=userGeneralSettings

## 2.2 Email Notifier (TBD)

http://localhost:8111/admin/admin.html?item=email

通知内容的模板:  
https://confluence.jetbrains.com/display/TCD9//Customizing+Notifications

模板存放路径:  
/root/.BuildServer/config/\_notifications

# [3 TeamCity config a project](/doc/tools/teamcity/TeamCity_config_a_project.md)

# FAQ

## ERROR:TBD, Email Notifier,`SMTPSendFailedException`

Email Notifier -> Try connectioin

```
com.sun.mail.smtp.SMTPSendFailedException: 530 5.7.57 SMTP; Client was not authenticated to send anonymous mail during MAIL FROM [HK2PR06CA0009.apcprd06.prod.outlook.com]
```

# Refs

- https://confluence.jetbrains.com/display/TW/SonarQube+Integration
- TeamCity Documentation https://www.jetbrains.com/help/teamcity/teamcity-documentation.html
- Installing Additional Plugins https://confluence.jetbrains.com/display/TCD9/Installing+Additional+Plugins
- Jacoco https://www.jianshu.com/p/671fad23c2ce
