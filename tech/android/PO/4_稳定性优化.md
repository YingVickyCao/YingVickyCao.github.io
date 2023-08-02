# 稳定性优化

- 稳定性中2个常见的场景：Crash 和 ANR
- 影响稳定性的原因：  
  （1）内存使用不合理    
  （2）代码异常场景考虑不周全    
  （3）代码逻辑不合理  


# 1 提高代码质量

## 1.1 代码编写阶段的优化
## 1.2 编写完成后接住工具检查发现问题

### 1.2.1 静态代码扫描工具 - Android Lint (Recommended)
Android Studio -> Analyze > Inspect Code  
https://developer.android.google.cn/studio/write/lint?hl=zh-cn


### 1.2.2 静态代码扫描工具 - Findbugs/ QA Plug	
适合：Java library model  
不适合：android application / android library model 扫描结果为空。


### 1.2.3 平台检测- SonarQube、Jenkins

# 2 Crash 监控

Crash（崩溃）发生的特点：         
(1)非必现       
(2)原因很多，不能系统性解决：        
Crash的原因：代码逻辑缺陷、系统兼容性问题、硬件兼容问题。        
注意：硬件和ROM的兼容性问题，只在特定的机型/ROM和特定的场景才触发。        

如何修改？
监控Crash，

## ANR and Crash - Google Play Console (PROD)
can not close     

## ANR and Crash - Goole Firebase Crashlytics (UAT)    
can close 
com.google.firbase.crashlytics   
https://firebase.google.cn/docs/crashlytics?hl=zh-cn
  https://firebase.google.cn/docs/crashlytics/get-started?hl=zh-cn&platform=android

## Android Studio logcat - error level

# 3 ANR监控

