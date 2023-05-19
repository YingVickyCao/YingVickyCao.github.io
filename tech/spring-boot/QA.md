# Spring Boot

- Q : java.lang.BootstrapMethodError: Exception from call site #4 bootstrap method
  A :

```gradle
android{
  compileOptions {
     targetCompatibility = "8"
     sourceCompatibility = "8"
  }
}
```
