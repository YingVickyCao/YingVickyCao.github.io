# UI Thread
---
# UI Thread
UI 线程，又叫主线程/main 线程/main thread。    

- handling UI (including measuring and drawing views)
- coordinating user interactions
- receiving lifecycle events

- 当程序第一次启动时，Android 默认同时启动一条主线程。主线程负责处理与 UI 相关的事件，如用户的按键事件、用户接触屏幕的事件以及屏幕绘图事件，并把相关的的事件分发到对应的组件进行处理。
- ANR   
尽量避免再 UI 线程中执行耗时操作，因为这样可能导致ANR。   
ANR异常，只要在 UI 线程中执行耗时操作，都会引发 ANR。因为这会导致 Android 应用无法响应输入事件和 Broadcast。 

---

# Rule

## Rule1: Do not block the UI thread
- Block the UI thread
1. disk I/O
2. DB Access
3. network calls
4. long-running operations, such as 数据拼装

- Do not block the UI thread by using background work
1. disk I/O  => background work
2. DB Access  => background work
3. network calls  => background work
4. long-running operations  such as 数据拼装 => background work

## Rule2: Don't access the Android UI from outside the UI thread.
1. Activity.runOnUiThread(Runnable)  
2. View.post(Runbable)  
3. View.postDelayed(Runbable)  
4. Handler  
5. EventBus:小心
6. Rxjava

---

# How to choose a background thread or UI Thread？
## Summary
1. UI Thread

Background

1. Thread
2. TreadPool
3. HandlerThread
4. AsyncTask
5. RxJava
6. JobScheduler
7. WorkManager
8. ForgroundService
- Foreground:a non-dismissible notification in the notification tray.
- background
9. IntentService
10. JobIntentService
11. BoudService

![How to choose a background thread or UI Thread](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/process_and_thread/Guide_to_background_processing.png)

## [Android Guide] What's the best way to do background work?
[What's the best way to do background work?](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/doc/android/process_and_thread/WorkManager.md#schedule-tasks-with-workmanager)
---

# PO
## Do not block the UI thread

## Enable background ANR dialogs

## StrictMode
- `>=` API 9
- Reduce ANR

## deadlock
Problem:
Main thread is in a deadlock with another thread, either in your process or via a binder call.

## synchronized lock
Problem:
Main Thread is blocked waiting for a synchronized lock for long operation that is happening on another thread.

# Refs
- [Guide to background processing](https://developer.android.google.cn/guide/background/)
- [Processes and threads overview](https://developer.android.google.cn/guide/components/processes-and-threads#Processes)