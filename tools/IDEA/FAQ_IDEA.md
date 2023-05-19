# FAQ

# [FAQ-1] [IDEA 2022.2.3]`No tests found for given includes: [com.hades.java.test.TestDate](--tests filter)`

Fix:
https://blog.csdn.net/weixin_45505313/article/details/104256298

# [FAQ-2] When formatting HTML, `<html>` and `<body>` are not intent（缩进）

In `Do not indent children on： remove html、body、head`

![idea_html_formart_1](https://yingvickycao.github.io/img/idea_html_formart_1.png)

![idea_html_formart_2](https://yingvickycao.github.io/img/idea_html_formart_2.png)

# [FAQ-3] [IDEA 2020.1] Cannot convert string value 'JETPACK_COMPOSE' to an enum value of type 'com.android.builder.model.AndroidGradlePluginProjectFlags$BooleanFlag'

```
Cannot convert string value 'JETPACK_COMPOSE' to an enum value of type 'com.android.builder.model.AndroidGradlePluginProjectFlags$BooleanFlag' (valid case insensitive values: APPLICATION_R_CLASS_CONSTANT_IDS, TEST_R_CLASS_CONSTANT_IDS, TRANSITIVE_R_CLASS)
```

A :

> DEA 2020.1 EAP does not support android-gradle-plugin 4.0.  
> Unfortunately sources for AS 4.0 are not published yet.  
> We have sent a request to the Google team already. It'll take some time for them to publish the sources.

android-gradle-plugin 3.6.1/3.6.2/3.6.3 + gradle-5.6.4-all work well.

https://youtrack.jetbrains.com/issue/IDEA-233929?_ga=2.94678812.120884178.1590920190-868073811.1590920190
