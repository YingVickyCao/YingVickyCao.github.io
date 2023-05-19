# Publish to Jitpack

Example build.log: https://jitpack.io/com/github/YingVickyCao/SimplePermissions/feature~0.1x-8c8df3e59b-1/build.log

# FAQ

## [FAQ-1] publishToMavenLocal successfully, but Jitpack builds always error

```
* What went wrong:
A problem occurred configuring root project 'SimplePermissions'.
> Could not resolve all files for configuration ':classpath'.
   > Could not resolve com.android.tools.build:gradle:7.4.0.
     Required by:
         project : > com.android.application:com.android.application.gradle.plugin:7.4.0
         project : > com.android.library:com.android.library.gradle.plugin:7.4.0
      > No matching variant of com.android.tools.build:gradle:7.4.0 was found. The consumer was configured to find a runtime of a library compatible with Java 8, packaged as a jar, and its dependencies declared externally, as well as attribute 'org.gradle.plugin.api-version' with value '7.5.1' but:
          - Variant 'apiElements' capability com.android.tools.build:gradle:7.4.0 declares a library, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares an API of a component compatible with Java 11 and the consumer needed a runtime of a component compatible with Java 8
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5.1')
          - Variant 'javadocElements' capability com.android.tools.build:gradle:7.4.0 declares a runtime of a component, and its dependencies declared externally:
              - Incompatible because this component declares documentation and the consumer needed a library
              - Other compatible attributes:
                  - Doesn't say anything about its target Java version (required compatibility with Java 8)
                  - Doesn't say anything about its elements (required them packaged as a jar)
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5.1')
          - Variant 'runtimeElements' capability com.android.tools.build:gradle:7.4.0 declares a runtime of a library, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares a component compatible with Java 11 and the consumer needed a component compatible with Java 8
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5.1')
          - Variant 'sourcesElements' capability com.android.tools.build:gradle:7.4.0 declares a runtime of a component, and its dependencies declared externally:
              - Incompatible because this component declares documentation and the consumer needed a library
              - Other compatible attributes:
                  - Doesn't say anything about its target Java version (required compatibility with Java 8)
                  - Doesn't say anything about its elements (required them packaged as a jar)
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5.1')
```

Reason:  
Jitpack 默认使用 jdk 1.8 build.  
这个项目应该用 JDK 11。

Fix：  
使用`jitpack.yml `指定 JDK 版本。
