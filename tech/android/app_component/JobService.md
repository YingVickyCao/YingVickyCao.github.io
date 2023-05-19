# JobService

![jobservice](https://devcomprd.wpengine.com/wp-content/uploads/2021/03/Task1.jpg)

1 Usage :  
 schedule background tasks that execute in the application’s own process in the background

2 Android 5(API 21)引入。

3 JobService 是 Bound Service

4 method: onStartJob, onStopJob

5 onStartJob 运行在 main thread。执行耗时操作时，要在 sub thread 中。

App Widget 怎么刷新？  
方案：JobService + IntentService + Broadcast (不带更新按钮的 App Widget) / JobService + IntentService + Pending Intent (通知)  
Jobservice 的 onStartJob 判断 IntentService 是否启动，没有则启动 IntentService。  
IntentService 处理 heavy work，处理结束后，  
使用 Broadcast / Pending Intent 更新 View

6 When job is finished, called jobFinish  标记 job 完成,通知系统释放相关资源。

7 在 onStartJob，手动调用 jobFinish，执行 onUnbind，并没有执行 onStopJob。

# API Difference

1 Android 5(API 21) <= version < Andrid 6(API 23), onStartJob 最长执行时间是 60 seconds。  
Andrid 6(API 23)，onStartJob 最长执行时间是 10 minutes

2 For setPeriodic method, > = Android N(24,25),JobSchedule, JobScheduler works with a min periodic of 15 minutes.

# Case

## Case 1: For once task schedule, what will happen when jobService shedule again with same class and same JobID and instance？

结论：只要 JobId 和 JobService class 相同，虽然每次 schedule 时传递数据不同，但 OS 认为是同一个 Schedule。

现象：
OS 会首先调用 onStop 结束 schedule A。  
 过一段时间后，schedule B 执行。

即使 A 在 onStop 中调用 jobFinish(false), 也不回 reschedule A。

## Case 2: For once task schedule, what will happen when jobService shedule again with same class and different JobID？

结论：对于不同 JobId，同一个 JobService class 的不同 schedule，OS 认为是不同 schedule。

现象：前后两次 schedule 都会执行 onStartJob。

## Case 3: For once task schedule, what will happen when different jobService shedule again with same and different JobID？

结论：不同 JobId，不同 JobService class，JobManager 认为是相同的 shcedule

现象：同 Case 1

# Refs

- https://www.developer.com/mobile/android/how-to-schedule-background-tasks-in-android-apps-using-the-jobscheduler-api/
