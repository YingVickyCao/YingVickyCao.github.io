# Create Android Library
## library module
- Share same code
- Slim big project

## Type
- jar  (Java Archive)  
Only Java

- aar  (Android Archive)  
java + Android resources
	

## Using Library
### Java
#### Type1 : Java Library Module
1) File -> New -> New Module -> Java Library
2) File->New -> Import Module
```
1 and 2:
First
jar:set group,name, and version

Then:
/module_name/build/libs/name.jar
copy jar
```
3) File->New-Module -> Import .JAR Package

#### Type2 : `/libs/`

#### Type3 : Use `.jar` by putting local maven repository

```
implementation "com.example.hades:calculator3:1.0.0"
```

### Android
#### Type1 : Android Library Module

1) File -> New -> New Module -> Android  Library
2) File->New -> Import Module
```
1 and 2:
/module_name/build/outputs/aar/name.aar
copy aar
```
3) File->New Module -> Import .AAR Package

#### Type2 : /libs/

#### Type3: Use `.aar` by putting local maven repository  
```
implementation "com.example.hades:calculator2:1.0.0@aar"
```
## Plugin
- com.android.application => `.apk`
- com.android.library => `.aar`
- java-library/java => `.jar`


## Build library Tool
- gradle
- jar
- shadow  
`relocation (rename)`

# Refs
- [Create Android Library](https://developer.android.google.cn/studio/projects/android-library)
- [创建一个插件，并发布到本地maven仓库](https://www.jianshu.com/p/e55bac699acc)
- [Building Java Projects with Gradle](https://spring.io/guides/gs/gradle/)