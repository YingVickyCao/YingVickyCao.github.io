# Define maven respo in build.gradle

```groovy
# project level build.gradle
allprojects {
    repositories {
        // Custom local maven
        // maven { url = "$rootProject.projectDir/calculator-sdk" }

        // Default local maven : ~/.m2/repository
        mavenLocal()

        maven { url 'http://mirror.bit.edu.cn' }
        maven { url 'http://mirror.bit6.edu.cn' }
        maven { url 'http://mirrors.tuna.tsinghua.edu.cn/' }

        // Maven Central, hosted by https://sonatype.org/, url= https://repo1.maven.org/maven2/, https://repo.maven.apache.org/maven2/
        mavenCentral()

        // jcenter, hosted by bintray.com, url = http://jcenter.bintray.com/
        jcenter()

        google()
    }
}
```
