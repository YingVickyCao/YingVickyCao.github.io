# IDEA

# 2 IDEA vs Android Studio

ADT = SDK + Eclipse+ Android Plugin for Eclipse。  
Android Studio = SDK + Intellij + Android Plugin For IntelliJ。

IDEA, IntelliJ IDEA = The Most Intelligent Java IDE for all the tools。  
Excel at enterprise, mobile and web development with Java, Scala and Groovy, with all the latest modern technologies and frameworks available out of the box.

# 3 Plugins

- idea jrebel 热部署

# 4 When formatting HTML, `<html>` and `<body>` are not intent（缩进）

In `Do not indent children on： remove html、body、head`

![idea_html_formart_1](/img/idea_html_formart_1.png)

![idea_html_formart_2](/img/idea_html_formart_2.png)

# 5 使用 Inspections 自动生成 serialVersionUID

Step 1: Setting -> Inspections -> serialVersionUID -> 勾选"Serializable class without serialVersionUID"  
Step 2: 类名-> Alt+Enter ，点击"Add serialVersionUID field"，然后自动生成 serialVersionUID。
