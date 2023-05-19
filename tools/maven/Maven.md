# Maven

Maven 是构建工具是一种构建工具、依赖管理工具，采用 XML 格式。

- Usage:
  Smplify build Java-based process.

1）build project
2）publish project

- Advantage

  1)POM  
  2)Speed up build project  
  3)Dependency List  
  4)Unit test reports including coverage

# 1 Setup Maven

- Download maven
  https://maven.apache.org/download.cgi
  https://www.apache.org/mirrors/

- Need JDK

```ini
# Check environment variable value
echo $JAVA_HOME

java -version
```

- Adding to PATH

```ini
# .bash_profile
export MAVEN_HOME=~/Library/maven
export PATH=${PATH}:$MAVEN_HOME/bin

# Enable path
source ~/.bash_profile

# Confirm
mvn -v
```

# 2 Config File

http://maven.apache.org/guides/introduction/introduction-to-profiles.html

List with order

- Per Project
  maven project `pom.xml`

- Per User
  `${user.home}/.m2/settings.xml`  
  若没有，从 maven 拷贝一个

```
echo $HOME
/Users/account

~/.m2/settings.xml
===
$HOME/.m2/settings.xml
```

- Global  
  `${maven.conf}/settings.xml`

```
$M2_HOME/conf/settings.xml
```

# 3 Repository(仓库)种类

Repository 共 2 种

- local Repository
- Remote Repository

![maven_repo_type.png](https://yingvickycao.github.io/img/tools/maven/maven_repo_type.png)

## Local Repository（本地仓库）

- settings.xml - `<localRepository>`
- Default: `~/.m2/repository`
- 本地仓库是远程仓库的一个缓冲和子集  
  查找资源？=> 本地仓库? 返回 ：从远程仓库下载到本地仓库，然后返回

## Remote Repository（远程仓库）

- 分类  
  ① 中央仓库：http://repo1.maven.org/maven2/  
  ② [私服](#private-repo)  
  ③ 其他公共仓库：其他可以互联网公共访问 maven repository，例如 jboss repository 等

- [Using Mirrors for Repositories](#mirrors)  
  settings.xml - `<mirrors>`

<h1 id="mirrors">4 Using Mirrors for Repositories</h1>

settings.xml - `<mirrors>`

http://maven.apache.org/guides/mini/guide-mirror-settings.html  
http://maven.apache.org/ref/3.6.2/maven-settings/settings.html

- Mirror 的作用  
  maven 有 Official remote respository.所有的 maven 请求默认是请求到 remote repository。  
  mirror 相当于一个拦截器，拦截 maven 对 remote repository 的相关请求，重定向请求到 `<mirror>` 配置的地址。

```
// MAVEN_CENTRAL, Official Maven 2 repository, Maven Central US repository
https://repo.maven.apache.org/maven2/
```

![maven_not_set_mirror.png](https://yingvickycao.github.io/img/tools/maven/maven_not_set_mirror.png)

![maven_set_mirror.png](https://yingvickycao.github.io/img/tools/maven/maven_set_mirror.png)

- `mirror`
  `<mirrorOf>`:The server ID of the repository being mirrored, e.g., "central". This MUST NOT match the mirror id.  
  `<mirrorOf>`,`<url>` is must needed.

* `<mirrors>`  
  `<mirrors>`at most have one mirror `<mirror>` for a given repository.  
  `<mirrors>` simply picks the first match `<mirror>`.  
  选取一个镜像下载比较快的放在第一个。不行再换其他的。

```
<mirrors>
    <mirror>
        <mirrorOf/>
        <name/>
        <url/>
        <layout/>
        <mirrorOfLayouts/>
        <id/>
    </mirror>
  </mirrors>

```

```
<settings>
  <mirrors>

   // 1. e.g. Maven Central UK repository
    <mirror>
     <id>UK</id>
      <name>UK Central</name>
      <url>http://uk.maven.org/maven2</url>
      <mirrorOf>central</mirrorOf>
    </mirror>

    <!--访问慢的网址放入到后面-->
    // 2 not work
    <mirror>
    </mirror>

    // 3 not work
    <mirror>
    </mirror>

  </mirrors>
</settings>
```

# 5 Publish library to Maven respository

## 发布到本地

https://blog.csdn.net/xmxkf/article/details/80674232

Sample: Autils - A

## 发布到局域网私有仓库

https://blog.csdn.net/xmxkf/article/details/80674232

## 发布到 JCenter and Maven Center

https://inthecheesefactory.com/blog/how-to-upload-library-to-jcenter-maven-central-as-dependency/en

Sample:[Push Lib to JCenter and Maven Center](/doc/tools/android_studio/as_push_lib_to_JCenter_and_MavenCenter.md)

<h1 id="private-repo">6 私服</h1>

私服局域网自建的 maven repository，其 URL 是一个内部网址。  
私服是一种特殊的远程 Maven 仓库，设在局域网内的仓库服务，私服 一般被配置为互联网远程仓库的镜像，供局域网内的 Maven 用户使用。

当 Maven 下载构件时，先向私服请求。如果私服上没有该构件，则从外部的远程仓库下载，同时缓存在私服之上，然后为 Maven 下载请求提供下载服务，另外，对于自定义或第三方的 jar 可以从本地上传到私服，供局域网内其他 maven 用户使用。

- 目的/优点  
  节省外网宽带;  
  加速 Maven 构建;  
  部署第三方构件;  
  提高稳定性、增强控制：原因是外网不稳定;  
  降低中央仓库的负荷：原因是中央仓库访问量太大;

![maven_private_repo.png](https://yingvickycao.github.io/img/tools/maven/maven_private_repo.png)

# 7 maven 如何通过`pom.xml` 获取依赖？

`project pom.xml-repositories - repository` vs `settings.xml - mirrors - mirror`  
https://my.oschina.net/sunchp/blog/100634

- projct `pom.xml` 默认继承 Super POM(Maven's default POM). `<repositories>` 中可包含多个 `<repository>`。默认包含了中央仓库.  
  http://maven.apache.org/guides/introduction/introduction-to-the-pom.html

- maven 获取真正起作用的 repository 集合?  
  首先会获取 pom.xml 里的 repository 集合，然后在 settings.xml 里找 mirrors 元素:  
  如果 repository 的 id 和 mirror 的 mirrorOf 的值相同，则该 mirror 替代该 repository.  
  如果该 repository 找不到对应的 mirror，则使用其本身。  
  依此可以得到最终起作用的 repository 集合

- 关于 maven 如何查找 pom.xml 里 dependencies 里配置的插件:  
  暂且不考虑本地仓库的存在.  
  maven 会根据最终的 repository 集合里依次查找，如果查到了就从该仓库下载，并且停止对后续 repository 的查找(找到了就停)。
- 配置 `project pom.xml-repositories`  
   `<repository>` 顺序很重要,last one is maven center repository。

<h1 id="maven_coordinate">8 Maven 坐标系</h1>

- Maven 坐标  
  Maven 引入坐标，目的是防止组件重复  
  maven 坐标的元素包括 groupID,artifactId,version,package,classifier.

## Form of library

```
# GROUP_ID:ARTIFACT_ID:VERSION
"io.reactivex.rxjava2:rxjava:2.1.1"
```

- Group ID  
  GroupID 是项目组织唯一的标识符，一般对应 JAVA 的包的结构，是 main 目录里 java 的目录结构。

- Artifacted ID  
  定义项目在项目组中的唯一的 ID.

## `Form of library` vs `java package` vs `项目结构名`

- java package = 项目结构名
- 项目结构名 与 groupId 无关.但公认模板：  
  `groupId(公司网址反写).Artifacted ID`
- 域名的类型 为 org(非营利组织)、com(商业组织)、cn 等。

```
域名 : 项目名 : version
域名+项目组名 : 子项目名 : version
```

| 公司名      | domain（域名）  | 网站名                                                 | 项目结构名                        |
| ----------- | --------------- | ------------------------------------------------------ | --------------------------------- |
| apache      | org.apache      | https://www.apache.org <br> https://tomcat.apache.org/ | org.apache.tomcat.tomcat-catalina |
| jakewharton | com.jakewharton | http://jakewharton.com                                 | com.jakewharton.butterknife       |

| Group ID      | Artifacted ID | 对应项目结构           | When                       |
| ------------- | ------------- | ---------------------- | -------------------------- |
| 域名          | 项目名        | 域名.项目组名          | 单独的小项目，项目集很小   |
| 域名+项目组名 | 子项目名      | 域名.项目组名.子项目名 | 大项目集有很多相关的子项目 |

```groovy
// com.jakewharton = 域名，butterknife / butterknife-compiler' = 项目名
compile group: 'com.jakewharton', name: 'butterknife', version: '10.2.0'
compile group: 'com.jakewharton', name: 'butterknife-compiler', version: '10.2.0'

// com.jakewharton=公司名，retrofit = 项目组名，retrofit1-okhttp3-client / retrofit2-kotlin-coroutines-adapter = 项目名
compile group: 'com.jakewharton.retrofit', name: 'retrofit1-okhttp3-client', version: '1.1.0'
compile group: 'com.jakewharton.retrofit', name: 'retrofit2-kotlin-coroutines-adapter', version: '0.9.2'

// org.apache= = 域名，tomcat = 项目组名，tomcat-catalina / tomcat-jasper = 项目名
compile group: 'org.apache.tomcat', name: 'tomcat-catalina', version: '9.0.26'
compile group: 'org.apache.tomcat', name: 'tomcat-jasper', version: '9.0.26'
```

# Refs

- http://maven.apache.org/guides/mini/guide-mirror-settings.html
- http://maven.apache.org/ref/3.6.2/maven-settings/settings.html
- http://maven.apache.org/guides/introduction/introduction-to-the-pom.html
- http://maven.apache.org/guides/introduction/introduction-to-profiles.html
- http://maven.apache.org/guides/introduction/introduction-to-repositories.html
- http://maven.apache.org/guides/introduction/introduction-to-profiles.html
- http://maven.apache.org/pom.html
- http://maven.apache.org/settings.html

* https://my.oschina.net/sunchp/blog/100634
* [maven project pom.xml](https://blog.csdn.net/qq_33363618/article/details/79438044)
* [maven project pom.xml](https://blog.csdn.net/wen86ping88/article/details/86505542)
* https://blog.csdn.net/yb223731/article/details/91972252
* [IDEA 创建 Maven Java 项目](https://jingyan.baidu.com/article/67508eb472e3419ccb1ce46a.html)
