# Android Debug Database

# 作用
 查看数据库

# Uage
- Step1: Add lib in `gradle.gradle`  
`debugImplementation 'com.amitshekhar.android:debug-db:1.0.6'`

- Step2:  

    1）Android virtual device  
    `adb forward tcp:8080 tcp:8080`    
    
    2）Phone  
    Phone and PC in Same network    
    
    3）Genymotion virtual device
    TOOD


- Step3: Click to open url  

    1）Android virtual device  
    http://localhost:8080
    
    2）Phone: `logcat`  
    `D/DebugDB: Open http://192.168.0.100:8080 in your browser`
    
    3）Genymotion virtual device
    TOOD

# 实现原理
Socket连接  
![Android Debug Database 实现原理](https://yingvickycao.github.io/img/android/DataAcess/database/tool_android_debug_database.png)

# Refs
References
- [Android-Debug-Database GitHub](https://github.com/amitshekhariitbhu/Android-Debug-Database)
- https://blog.csdn.net/u012381726/article/details/60140939