# TeamCity startup

http://localhost:8111/  
~/Library/TeamCity/bin/runAll.sh start
~/Library/TeamCity/bin/runAll.sh stop

顶级管理员账号

```
admin
123456
```

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
