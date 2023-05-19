# Android Setup in Window 10

# Android Studio

2020.3.1

- Q ： “Java 11 or newer is required to run the IDE.”
  See "JRE 11 missed JRE".

# JDK 11

- Q : JRE 11 missed JRE

Step 1: Generate the JRE file and folder by cmd command.（C:\Program Files\Java\jdk-11.0.9\jre）

```
Step 1 : Run CMD as administer
Step 2: CMD
cd C:\Program Files\Java\jdk-11.0.9
bin\jlink.exe --module-path jmods --add-modules java.desktop --output jre
```

Ref : https://www.cnblogs.com/unity3ds/p/13238187.html

Step 2 : Configure Java environment.

```
JAVA_HOME
C:\Program Files\Java\jdk-11.0.9

Path
%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin

classpath
%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar
```

Ref :
https://www.cnblogs.com/boringwind/p/8001300.html

Finnay, Check `java` and `java -version`
