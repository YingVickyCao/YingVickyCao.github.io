# Broadcast

Device Android 8.0(Sangsung S8)

# Content

- 实现系统中不同组件之间的通信
- Publish–subscribe pattern

---

## API Changes

### [Changes to system broadcasts](https://developer.android.google.cn/guide/components/broadcasts#changes-system-broadcasts)

#### Android 9

Android >=9 (28), NETWORK_STATE_CHANGED_ACTION => [getConnectionInfo()](<https://developer.android.google.cn/reference/android/net/wifi/WifiManager.html#getConnectionInfo()>)

#### Android 8.0

- `targetSdkVersion >=Android O(8.0,26)`, only `context-registered receivers`, cannot `manifest-declared receivers` for most implicit broadcasts, except for a few implicit broadcasts.  
  Eample:  
  `CONNECTIVITY_ACTION(网络连接与断开状态的变化)`

#### Android 7.0

- Android >= 7.0(24), cannot send `ACTION_NEW_PICTURE(添加新图片)`, `ACTION_NEW_VIDEO(添加新视频 )` broadcast.

---

## Lifecycle

Only `public void onReceive(Context context, Intent intent) `

---

## 分类

### 分类 1

- system broadcasts
- Local brocadcast

### 分类 2

- Normal Broadcast
- Ordered Broadcast

#### Normal Broadcast

![Normal Broadcast](https://yingvickycao.github.io/img/android/app_component/broadcast/normal_broadcast.png)

- 没有先后顺序
- 无法被截断
- 异步执行:  
  所有的广播接收器几乎都会在同一时刻接收到这条消息

### Ordered Broadcast

![Ordered Broadcast](https://yingvickycao.github.io/img/android/app_component/broadcast/ordered_broadcast.png)

- 优先级 -> 接受先后顺序

```
intentFilter.setPriority(num);
/
manifest - android:piority=num
```

- 前面收到可以截断传递

```
abortBroadcast();
```

- 同步执行:  
  同一时刻只会有一个广播接收器能够收到这条消息

### 分类 3

- Explicit intents
- Implicit intents

---

## BroadcastReceiver

---

## Sending broadcasts

- 系统级别

```
sendOrderedBroadcast(Intent, String)
sendBroadcast(Intent)
```

- app 级别

```
LocalBroadcastManager.sendBroadcastSync(Intent)
LocalBroadcastManager.sendBroadcast(Intent)
```

## Receiving broadcast

- 系统级别

1. Manifest-declared receivers  
   If no ` <intent-filter>`, cannot receive anything.

2. Context-registered receivers  
   If no ` <intent-filter>`, cannot receive anything.

- app 级别  
  `LocalBroadcastManager.getInstance(this).registerReceiver(BroadcastReceiver, IntentFilter)`

---

## LocalBroadcastManager

app 级别的局部监听器

### When?

Local broadcasts

1. single process app.
2. Only Itself action, not system action.
3. comminute with other components only in this app.

本地广播：  
只在 app 内部传播，没有信息泄露，更安全。  
其他 app 无法通过广播控制你的 app，更安全。  
本地广播不需要系统中转，更高效。

### How?

- Only context-registered receivers.
- `LocalBroadcastManager` 注册的广播，发送广播的时候 must 使用`LocalBroadcastManager` 否则接收不到广播。

```java
LocalBroadcastManager.getInstance(this).registerReceiver(BroadcastReceiver, IntentFilter)
LocalBroadcastManager.getInstance(this).unregisterReceiver(receiver);
LocalBroadcastManager.getInstance(contet).sendBroadcast(new Intent(ACTION));
```

### 实现原理

- Conext = ApplicationContext => 避免了当前 Context 的内存泄漏
- LocalBroadcastManager instance = single instance
- LocalBroadcastManager 含有 Handler，cache BroadcastReceiver 对象。利用 Handler 依次直接调用 onReceive 方法。

---

## 机制

### 系统全局广播机制

- 系统级别的全局监听器,用于监听系统全局的广播消息
- Contex - ICP,Binder

### 本地广播机制

- app 级别的局部监听器
- `LocalBroadcastManager`

---

## LocalBroadcastManager VS Contex

### LocalBroadcastManager

- No ICP
- Handler
- much more efficient
- don't need to worry about any security issues related to other apps being able to receive or send your broadcasts.

### Contex

Contex - IPC,Binder

---

# QA

## Broadcast `onReceive()`运行在哪个线程？

主线程。

## Explicit Broadcast VS Implicit Broadcast?

发送和接受 broadcast ，只涉及隐式广播

---

# PO

## Defaullt run on UI Thread.

- ANR = 10s
- [Test]app not background = 120s

## If start long running work threads from a broadcast receiver.

1. call `goAsync()`  
   to flag that it needs more time to finish after

2. schedule a `JobService` from the receiver

## Be sure to unregister the receiver when you no longer need it or the context is no longer valid.

- Context-registered receivers receive broadcasts as long as their registering context is valid.

```
onCreate(Bundle) - onDestroy()
/
onResume() - onPause(). // Recommend
```

## prefer using context registration over manifest declaration

Android O and the Implicit Broadcast Ban

## Local broadcasts, use `LocalBroadcastManager

## Do not broadcast sensitive information using an implicit intent.

- You can specify a permission when sending a broadcast.
- In Android 4.0 and higher, you can specify a package with setPackage(String) when sending a broadcast. The system restricts the broadcast to the set of apps that match the package.
- You can send local broadcasts with LocalBroadcastManager.

## limit the broadcasts that your app receives.

- You can specify a permission when registering a broadcast receiver.
- For manifest-declared receivers, you can set the android:exported attribute to "false" in the manifest. The receiver does not receive broadcasts from sources outside of the app.
- You can limit yourself to only local broadcasts with LocalBroadcastManager.

## Do not start activities from broadcast receivers because the user experience is jarring; especially if there is more than one receiver.

- displaying a notification

## should not start long running background threads from a broadcast receiver.

- Calling `onReceive()`, host process = foreground process. -> 除极端内存压力外，系统保持运行。
- Only `manifest-declared receivers`, returns from ` onReceive()` , host process = low-priority process -> system memory under process -> kill host process.

---

# TBD

## TBD:Restricting broadcasts with permissions

---

# Refs

- [Broadcasts overview](https://developer.android.google.cn/guide/components/broadcasts)
- [Intents and Intent Filters](https://developer.android.google.cn/guide/components/intents-filters)
- [Application Fundamentals](https://developer.android.google.cn/guide/components/fundamentals)
- [Android Broadcast-详解广播机制](https://blog.csdn.net/bingozhang24/article/details/50927355)
- [Android O and the Implicit Broadcast Ban](https://commonsware.com/blog/2017/04/11/android-o-implicit-broadcast-ban.html)
- [Implicit Broadcast Exceptions](https://developer.android.google.cn/guide/components/broadcast-exceptions)
