# Configure build

# 1 supported Java 8 language features
Android plugin >= 3.0.0, use Java 8
```
android {
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
}
```

# 2 Define maven respo

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