# WorkManager

![WorkManager_origin](./WorkManager_origin.svg)
![WorkManager_xmind](./WorkManager_xmind.svg)


# 1 Schedule tasks with WorkManager
- App is running   
new Thread  

- App is  not running  
(1) Android >=6.0(API 23),JobScheduler   
(2) Android <6(API 23),compatible to  API 17       
Firebase JobDispatcher: If included dependency of your app   
AlarmManager    

# 2 What's the best way to do background work?
![What's the best way to do background work?](https://developer.android.google.cn/images/guide/background/bg-job-choose.svg)

# Refs:
- [Schedule tasks with WorkManager](https://developer.android.google.cn/topic/libraries/architecture/workmanager/)
- [Guide to background processing](https://developer.android.google.cn/guide/background/)