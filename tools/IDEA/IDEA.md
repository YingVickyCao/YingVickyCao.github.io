# IDEA

# 2 IDEA vs Android Studio

ADT = SDK + Eclipse+ Android Plugin for Eclipse。  
Android Studio = SDK + Intellij + Android Plugin For IntelliJ。

IDEA, IntelliJ IDEA = The Most Intelligent Java IDE for all the tools。  
Excel at enterprise, mobile and web development with Java, Scala and Groovy, with all the latest modern technologies and frameworks available out of the box.

# 3 Plugins

- idea jrebel 热部署

- UML  
  https://blog.csdn.net/zj420964597/article/details/87856758

# 4 When formatting HTML, `<html>` and `<body>` are not intent（缩进）

In `Do not indent children on： remove html、body、head`

![idea_html_formart_1](/img/idea_html_formart_1.png)

![idea_html_formart_2](/img/idea_html_formart_2.png)

# 5 使用 Inspections 自动生成 serialVersionUID

Step 1: Setting -> Inspections -> serialVersionUID -> 勾选"Serializable class without serialVersionUID"  
Step 2: 类名-> Alt+Enter ，点击"Add serialVersionUID field"，然后自动生成 serialVersionUID。

# 6 Q : How does IDEA support Android app?

A :  
Step 1 : File -> New -> Project -> Android -> Click support android, then starting downloads about android.  
Step 2 : After download finish, re-open IDEA, and try again.

# 7 Q : IDEA 2020.1 does not support android-gradle-plugin 4.0(gralde 6.1.1)

```
Cannot convert string value 'JETPACK_COMPOSE' to an enum value of type 'com.android.builder.model.AndroidGradlePluginProjectFlags$BooleanFlag' (valid case insensitive values: APPLICATION_R_CLASS_CONSTANT_IDS, TEST_R_CLASS_CONSTANT_IDS, TRANSITIVE_R_CLASS)
```

A :

> DEA 2020.1 EAP does not support android-gradle-plugin 4.0.  
> Unfortunately sources for AS 4.0 are not published yet.  
> We have sent a request to the Google team already. It'll take some time for them to publish the sources.

android-gradle-plugin 3.6.1/3.6.2/3.6.3 + gradle-5.6.4-all work well.

https://youtrack.jetbrains.com/issue/IDEA-233929?_ga=2.94678812.120884178.1590920190-868073811.1590920190
