# FAQ

# FAQ-1 why idea print kotlin.Unit
Fix:  
https://www.coder.work/article/7908763


# FAQ-2 jvm target compatibility
```
Execution failed for task ':compileKotlin'.
> 'compileJava' task (current target is 11) and 'compileKotlin' task (current target is 1.8) jvm target compatibility should be set to the same Java version.
  Consider using JVM toolchain: https://kotl.in/gradle/jvm/toolchain
```

```java
tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}
```

Fix:


Way 1 : 
```java
tasks.withType<KotlinCompile> {
   kotlinOptions.jvmTarget = "11"
}
```

Way 2 : 
```java
tasks {
    withType<KotlinCompile> {
        kotlinOptions {
            jvmTarget = "11"
        }
    }

    withType<JavaCompile> {
        sourceCompatibility = "11"
        targetCompatibility = "11"
    }
}
```

Way 3 : 
```java
kotlin {
   jvmToolchain {
       languageVersion.set(JavaLanguageVersion.of(11))
   }
}

java {
   toolchain {
       languageVersion.set(JavaLanguageVersion.of("11"))
   }
}

```

Ref:
- https://kotlinlang.org/docs/gradle-configure-project.html#af33e86e
- https://docs.gradle.org/current/userguide/toolchains.html#sec:consuming