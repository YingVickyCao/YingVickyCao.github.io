# Activity

# 1 Introduction

- Entry point for app's interaction with user
- Actiivty provides window in which app draws its UI.
- Activity - Window - Screen
- App contains Multiple screens = APP comprise comprise multiple activities.
- Activity resides in system, system changes process, notify activity a state has changed with callbacks.
- Activity 对于 Android 的作用，类似于 Servelet 对于 Web 应用的作用：  
  Activity 负责与用户交互。
- Context -> ContextWrapper -> ContextThemeWrapper -> Activity
- Android 系统决定 Activity 何时被调用，以及它包含的方法何时被调用。

---

# 2 window mode

## single-window mode

- Default is single-window mode

## multi-window mode

- Android >= 7.0(24)

---

# 3 Activity Lifecycle

---

## 7 Methods

```
7 Methods
onCreate()
onStart()
oResume()
onPause()
onStop()
onDestroy()

onRestart()
```

### onCreate()

- bind data to lists
- Associate activity with a ViewModule
- Instantiate class-scope vars
- Bundle  
  activity's previously saved stated
- onCreate() Activity 被创建时调用。

### onResume()

- At the top of activity stack
- Activity Captures all user input (Visible + Focus)

### onPause()

- Taps Back / Recents btn => this

- **_Should not_**  
  1 Save application or use data  
  2 Make network calls  
  3 Execute database transactions

- May continue to update UI if User is expecting UI to update  
  1 Navigation Map  
  2 Media player playing

- single-window mode  
  release system resources, handlers to sensors(like GPS), or any resources that affect battery life

### onStop()

- multi-window mode  
  release system resources, handlers to sensors(like GPS), or any resources that affect battery life

- release or adjust resources that are not needed while the app is not visible to the user.  
  Using onStop() instead of onPause() ensures that UI-related work continues, even when the user is viewing activity in multi-window mode.

1. Pause animations
2. switch from fine-grained to coarse-grained location updates

- perform relatively CPU-intensive shutdown operations  
  save info to DB

- the Activity object is kept resident in memory: It maintains all state and member information, but is not attached to the window manager.

- Even if the system destroys the process while the activity is stopped, the system still retains the state of the View objects (such as text in an EditText widget) in a Bundle (a blob of key-value pairs) and restores them if the user navigates back to the activity

- In order for the Android system to restore the state of the views in your activity, each view must have a unique ID, supplied by the android:id attribute.

### onRestart()

Restores state of activity from onStop

---

## Activity-lifecycle concepts

![Figure 1. A simplified illustration of the activity lifecycle.](https://developer.android.google.cn/guide/components/images/activity_lifecycle.png)

Figure 1. A simplified illustration of the activity lifecycle.

2 种情况:

1. normal
2. 异常（abnormal）

---

# 4 normal lifecycle

正常情况(又称典型情况）下的生命周期，指的是用户参时，Activity 所经历的生命周期改变。  
正常情况下的生命周期 ，主要关注生命周期函数的调用顺序，在每个生命周期要做什么?不能做什么?

## 结合“A simplified illustration of the activity lifecycle”，具体说明。

### 情况 1： A 跳到 B，然后 B 按导航 Back 键，返回到 A

```
 // A -> B
 D/A: onPause
 D/B: onCreate:
 D/B: onStart
 D/B: onResume
 D/A: onSaveInstanceState
 D/A: onStop

 // A <- B
 D/B: onPause:
 D/A: onRestart:
 D/A: onStart
 D/A: onResume
 D/B: onStop:
 D/B: onDestroy:
```

---

- [Q] 执行 onDestroy()后，未执行完的线程还会继续执行吗？  
  [A] 继续执行,直到执行完毕，或者当 app 进程被杀死，未执行完的线程被强制停止。

执行 onDestroy()后，未执行完的线程,继续执行。

```
// Test on Nenux 5X, Android 8.0, API 26
// A -> B，然后A <- B后，
// 执行onDestroy()后，未执行完的线程还会继续执行:
D/AActivity: onStart
D/AActivity: onResume
D/BActivity: run: i=9
D/BActivity: onStop:
D/BActivity: onDestroy:
I/zygote64: Do partial code cache collection, code=23KB, data=28KB
I/zygote64: After code cache collection, code=23KB, data=28KB
I/zygote64: Increasing code cache capacity to 128KB
D/BActivity: run: i=10
D/BActivity: run: i=11
D/BActivity: run: i=12
```

当用户从 Recent list close app，未执行完的线程被强制停止，因为整个 app 进程被杀死，分配的所有资源被 OS 回收。

```
用户从Recent list close app
D/BActivity: run: i=590
D/BActivity: run: i=591
D/BActivity: run: i=592

// 用户从Recent list close app，未执行完的线程停止运行
D/AActivity: onPause
D/AActivity: onSaveInstanceState
D/AActivity: onStop
D/BActivity: run: i=593

```

### 情况 2：A -> B, B -> A, A back to Homescreen

```
// Open app, A is mainActivity
 D/A: onCreate:
 D/A: onStart
 D/A: onResume

// A -> B
 D/A: onPause
 D/B: onCreate:
 D/B: onStart
 D/B: onResume
 D/A: onStop

// A <- B
 D/B: onPause:
 D/A: onRestart:
 D/A: onStart
 D/A: onResume
 D/B: onStop:
 D/B: onDestroy:

// Press back , A -> Homescreen, exit A and APP
D/A: onPause
D/A: onStop
D/A: onDestroy
```

对于单个 Activity，such as A：

- 第一次启动时， onCreate -> onStart -> onResume.
- 跳转到其他 activity 时，onPause -> onStop.
- 再次回来时，onRestart -> onStart -> onResume.
- 按 Back 键退出时，onPause -> onStop -> onDestroy

* 从 Activity 实例上来看，onCreate 和 onDestroy()是配对的，代表 Activity 的创建与销毁，只能调用一次。
* 从 Activity 是否可见来看，onStart()与 onStop()是配对的，这两个方法可能被调用多次。
* 从 Activity 是否前台来看，onResume()与 onPause()是配对的，这两个方法可能被调用多次。
* onSaveInstanceState 不是生命周期函数。

---

### 情况 3：A -> Float / Translucent B, Float / Translucent B -> A, A back to Homescreen

- Q: 打开 Float（悬浮） Activity ，translucent（半透明） Activity 与普通 Activity 的生命周期区别？  
  与启动 normal Activity 相比，启动 Float Activity 或 Translucent 时，A 仅仅执行 onPause，不执行 onStop.  
  Back to A 时，A 不执行 OnStart，仅仅执行 onResume.

<b>Note: 没有特殊说明，要跳转的 Activity 是普通 Activity，不是 Float/Translucent activity。</b>

```
// Open app, A is mainActivity
 D/A: onCreate:
 D/A: onStart
 D/A: onResume

 // A -> TranslucentB
 D/A: onPause
 D/TranslucentB: onCreate:
 D/TranslucentB: onStart
 D/TranslucentB: onResume

// A <- TranslucentB
 D/TranslucentB: onPause:
 D/A: onResume
 D/TranslucentB: onStop:
 D/TranslucentB: onDestroy:

// Press back , A -> Homescreen, exit A and APP
 D/A: onPause
 D/A: onStop
 D/A: onDestroy

```

```
// Open app, A is mainActivity
 D/A: onCreate:
 D/A: onStart
 D/A: onResume

// A -> FloatB
D/A: onPause
D/FloatB: onCreate:
D/FloatB: onStart
D/FloatB: onResume

// A <- FloatB
D/FloatB: onPause:
D/A: onResume
D/FloatB: onStop:
D/FloatB: onDestroy:

// Press back , A -> Homescreen, exit A and APP
 D/A: onPause
 D/A: onStop
 D/A: onDestroy

```

---

### 情况 4：A -> Screen OFF -> Screen ON

跟跳转到自己 app 的其他 Activity 是一样的。

```
// Open app, A is MainActivity
 D/A: onCreate:
 D/A: onStart
 D/A: onResume

// Screen OFF ，因为跳转到其他activity（Locks Screen app的Activity）
 D/A: onPause
 D/A: onSaveInstanceState
 D/A: onStop

// Screen ON
 D/A: onRestart:
 D/A: onStart
 D/A: onResume
```

---

## onStart 和 onStop，onResume 和 onPause 有什么实质不同吗？

这两个配对的回调分别代表不同的意义。  
onStart 和 onStop 是从 Activity 是否可见角度来回调。  
onResume 和 onPause 是从 Activity 是否位于前台角度来回调。  
除了这种区别，在实际使用当中没有其他明显区别。

## Q:为什么 onPause 和 onStop 不能做耗时操作，只能做轻量级操作？

A:

- 因为之后 Old activity onPause()执行完后，才能执行 New activity onResume()。
- onPause 和 onStop 都不能执行耗时操作，尤其是 onPause。应尽量在 onStop 中做操作，从而使得新的 Activity 尽快显示出来并切换到前台。

## Q: A -> B, B 的 onResume()和 A 的 onPause 哪个先执行？</b>

- Old activity 先 onPause， New activity onCreate -> onStart -> onResume，Old Activity 再 onStop。

### 从生命周期函数调用顺序角度， 验证。

```
// A -> B
 D/A: onPause
 D/B: onCreate:
 D/B: onStart
 D/B: onResume
 D/A: onStop

```

### 从源码上， 验证。

Activity 的启动过程源码比较复杂，涉及到 Instrumentation, ActivityThread and ActivityManagerSercice(AMS)。

如何简单理解?  
启动 Activity 的请求会由 Instrumentation 来处理， 然后 Instrumentation 通过 Binder 向 AMS 发送请求，AMS 内部维护一个 ActivityStack 并负责栈内的 Activity 的状态同步，AMS 通过 ActivityThread 去同步 Activity 的状态而完成生命周期方法的调用。

图 Instrumentation 通过 Binder 向 AMS 发送请求：

![图Instrumentation通过Binder  向AMS发送请求](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/code_1.png)

---

图 ActivityStack.java - resumeTopActivityInnerLocked(）  
![ActivityStack.java - resumeTopActivityInnerLocked(](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/code_2.png)

ActivityStackSupervisor.java - realStartActivityLocked()  
IApplicationThread thread ,实现是 ActivityThread 中的 ApplicationThread。  
这段代码实际上是调用 ApplicationThread 中的 scheduleLaunchActivity()，scheduleLaunchActivity()最终完成新 Activity 的 onCreate，onStart，onResume。

图 ActivityStackSupervisor.java - realStartActivityLocked()  
![源ActivityStackSupervisor.java - realStartActivityLocked()   ](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/code_3.png)

图 源码 ApplicationThread.java # scheduleLaunchActivity()  
![源码ApplicationThread.java # scheduleLaunchActivity()   ](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/code_4.png)

## 验证 onPause 和 onStop 都不能执行耗时操作，尤其是 onPause。应尽量在 onStop 中做操作，从而使得新的 Activity 尽快显示出来并切换到前台。

A -> B ，A 中 onStop 模拟耗时操作：开启一个 Thread，打印从 1~1000 的整数，每次打印一个整数，Thread.sleep 1 second.  
A 在 onPause 中模拟耗时操作也是一样的。因为是在一个子线程里面执行，对生命周期函数的执行没有影响。

```java
    @Override
    protected void onStop() {
        Log.d(TAG, "onStop");
        // 无论super.onStop() 前后调用testIfInOnStopCanDoHeavyWork，log都是一样的。
        testIfInOnStopCanDoHeavyWork();
        super.onStop();
        // testIfInOnStopCanDoHeavyWork();
    }

 private void testIfInOnStopCanDoHeavyWork() {
        if (null != counter) {
            return;
        }
        counter = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    Log.d(TAG, "run: i=" + i);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        counter.start();
    }

```

```
//Open app, A is Main activity.
 D/A: onCreate
 D/A: onStart
 D/A: onResume

// A -> B
 D/A: onPause
 D/B: onCreate:
 D/B: onStart
 D/B: onResume
 D/A: onStop
 D/A: run: i=0
 D/A: run: i=1
 D/A: run: i=2
 D/A: run: i=3
 D/A: run: i=4
 D/A: run: i=5
 D/A: run: i=6
 D/A: run: i=7
 D/A: run: i=8
 D/A: run: i=9
 D/A: run: i=10
 D/A: run: i=11
 D/A: run: i=12
 D/A: run: i=13
 D/A: run: i=14
 D/A: run: i=15
 D/A: run: i=16
 D/A: run: i=17
 D/A: run: i=18

```

```html
<video
  id="video"
  controls=""
  preload="none"
  poster="http://media.w3.org/2010/05/sintel/poster.png"
>
  <p>Check if onStop can do heavy work.</p>
  <source
    id="mp4"
    src="https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/chec_if_can_do_heavy_work_in_onStop_4_app.mp4"
    type="video/mp4"
  />
  <source
    id="mp4"
    src="https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/chec_if_can_do_heavy_work_in_onStop_4_logcat.mp4"
    type="video/mp4"
  />
</video>
```

[Check if onStop can do heavy work. ](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/chec_if_can_do_heavy_work_in_onStop_4_app.mp4)

[Check if onStop can do heavy work. ](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/chec_if_can_do_heavy_work_in_onStop_4_logcat.mp4)

# 5 Abnormal lifecycle

## [Activity state and ejection from memory](https://developer.android.google.cn/guide/components/activities/activity-lifecycle#asem)

kill a process

1. user uses Application Manager under Settings to to kill the corresponding app
2. Back
3. free up RAM  
   memory pressure  
   a configuration change

- The system never kills an activity directly to free up memory.
  Instead, it kills the process in which the activity runs, destroying not only the activity but everything else running in the process, as well.

- Activity state => process state => likelihood of the system killing a given process

![Table 1. Relationship between process lifecycle and activity state](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/app_component/activity/life_cycle/Table_1_Relationship_between_process_lifecycle_and_activity_state.png)

- 案例

Problem：  
Android >=7.0, APP 使用系统 Camera 拍照，When Back to APP, APP is destroyed.

Solution:  
`>=` 7.0，使用自定义 Camera 拍照  
`<=` 6.0, 使用系统 Camera 拍照

---

异常情况下的生命周期,指的是 Activity 被系统回收或者由于当前设备的 Configuration 改变时，导致 Activity 被销毁所经历的生命周期改变。

## 什么时候回出现异常情况下的生命周期？

- 当资源相关的系统配置发生改变，Activity 被杀死。
- 当系统内存不足时，Activity 可能被杀死。

情况 1： 当资源相关的系统配置发生改变，导致 Activity 被杀死并重新创建。
情况 2： 当 OS 内存不足，导致低优先级的 Activity 被杀死。
情况 3： Use Settings -> AppsInfo app to force app

## 情况 1： 当资源相关的系统配置发生改变，导致 Activity 被杀死并重新创建。

了解系统的资源加载机制

把图片放入 drawable 目录后，通过 Resource 去获取图片。  
为了兼容不同设备，可能需要在其他目录防止不同的图片：drawable-mdpi，drawable-hdpi，drawable-land 等。 layout 也是类似：layout，layout-large，layout-land 等。  
当 app 启动时，系统会根据当前设备的情况去加载合适的 Resource 资源，例如横屏和竖屏分别拿 landscape 和 portrait 状态下的资源：layout、图片.... 。  
当旋转屏幕，由于系统配置发生了改变，在默认情况下，Activity 会被销毁并重新创建。  
也可以阻止系统重新创建 Activity。

### 默认情况下，Activity 会被销毁并重新创建。

打开 auto-ratate 模式

```html
<!--  activity没有设置跟资源配置相关的属性  -->
<activity android:name=".app_component.activity.lifecycle.A">
  <intent-filter>
    <action android:name="android.intent.action.MAIN" />

    <category android:name="android.intent.category.LAUNCHER" /> </intent-filter
></activity>
```

```
//Open app, A is Main activity.
D/A: onCreate:
D/A: onStart
D/A: onResume

// 旋转屏幕
D/A: onPause
D/A: onSaveInstanceState
D/A: onStop
D/A: onDestroy
D/A: onCreate:
D/A: [onCreate]restore extra_test:test
D/A: onStart
D/A: [onRestoreInstanceState]restore extra_test:test
D/A: onResume

```

### onSaveInstanceState and onRestoreInstanceState 执行顺序？

- onPause - onSaveInstanceState - onStop
- onStart - onRestoreInstanceState - onResume

系统只在 Activity 异常终止的时候才会调用 onSaveInstanceState 与 onRestoreInstanceState 来储存和恢复数据，其他情况不会触发这个过程。但是按 Home 键或者启动新 Activity 仍然会单独触发 onSaveInstanceState 的调用：因为用户可能不再回来了，要做现场保护。

![Recreate activity after destroyed by android os](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/recreate_activity_after_destroyed_by_android_os.png)

### 如何恢复之前保存的使用？

#### 如何保存数据：

- 选择 1： onPause
- 选择 2：onSaveInstanceState。

```
  @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        Log.d(TAG, "onSaveInstanceState");
        outState.putString(INSTANCE_STATE_KEY, "test");
    }
```

#### 如何恢复数据？

- 选择 1： onCreate
- 选择 2： onRestoreInstanceState

Note:  
Bundle is Same bundle instance in onCreate(Bundle) and onRestoreInstanceState(Bundle)

两者的区别：  
如果是正常启动， onCreate 的参数 savedInstanceState = null，必须判断是否为 null。

```
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate: ");

        setContentView(R.layout.activity_app_component_activity_lifecycle_a_layout);
        if (savedInstanceState != null) {
            String test = savedInstanceState.getString(INSTANCE_STATE_KEY);
            Log.d(TAG, "[onCreate]restore extra_test:" + test);
        }
    }

 @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        String test = savedInstanceState.getString(INSTANCE_STATE_KEY);
        Log.d(TAG, "[onRestoreInstanceState]restore extra_test:" + test);
    }
```

### 保存数据和恢复数据的推荐组合？

onSaveInstanceState 保存数据，onRestoreInstanceState 恢复数据。  
原因： OS 只有在 Activity 异常终止时才会调用 onSaveInstanceState 和 onRestoreInstanceState。

### 关于保存和恢复的层次结构，系统的工作流程?

采用委托思想，上层委托下层、父容器委托子元素去处理一个事情。  
委托思想在 Android 有很多应用，View 的绘图过程、事件分发等采用类似的思想。

在 onSaveInstanceState 和 onRestoreInstanceState 中，系统自动会做 View 的相关状态的保存和恢复工作,比如 文本框的数据、ListView 滚动位置等。  
具体特定 View 能恢复什么数据，要 View 的 onSaveInstanceState 和 onRestoreInstanceState 源码。  
VIew.java 实现了 onSaveInstanceState 和 onRestoreInstanceState 函数，它的派生类会重写这两个函数实现保存和恢复特定数据。

Step1: Activity 被意外终止，Activity 会调用 onSaveInstanceState 保存数据，然后 Activity 会委托 Window 去保存数据。  
Step2: Window 委托它上面的顶级容器去保存数据。顶级容器是一个 ViewGroup，一般来说可能是 DecorView。  
Step3： 顶级容器再去一一通知它的子元素来保存数据。  
通过委托，完成整个数据保存工程。

## 情况 2： 当 OS 内存不足，导致低优先级的 Activity 被杀死。

### Activity 的优先级排序？有 API callback 函数可以调用吗？

Activity 的优先级按照从高到低的顺序，分为 3 种：

1. Foreground Activity（前台 Activity）：优先级最高。用户正在和用户交互。执行完了 onResume。
2. Visible but background Activity（可见但非前台 Activity）： Activity 可见但位于后台无法和用户直接交互。 例如：Activity 弹出一个对话框。
3. Background Activity（后台 Activity）：已经被暂停的 Activity。比如执行了 onStop，优先级最低。  
   当系统内存不足时，系统就会按照上述优先级去杀死目标 Activity 所在的进程，并在后面调用 onSaveInstanceState 和 onRestoreInstanceState 来存储和恢复数据。

当 app 没有四大组件在执行，进程会很快被 OS（系统）杀死。

### 如何降低 app 进程被杀死的概率？

- 将后台工作放入 Service 来保证进程有一定的优先级，在一定程度上能降低被 OS 杀死的概率。
- [PASS]事实上，在 Android 8.0 API26 上，app 进入 background，然后开几个耗内存的 app，比如 Chrome、Photo，过几分钟 Activity 被杀死，甚至 app 进程被杀死。
  内存资源很低时，当把 app 放在后台，MainActivity 就被销毁了，但是 app 进程还在。过了 2 分钟，app 进程也被杀死了。
- [PASS]OS >= Android 6.0 API 24 时，以前 Service 保活的方法将不再有效。
- [PASS]OS < Android 6.0 API 24, 以前 Service 保活的方法将有效。
- [PASS]在 OS 内存不足时，可能导致低优先级的 Activity 被杀死但 app 进程还活着，也可能整个 app 进程被 OS 杀死。

## 情况 3： Use Settings -> AppsInfo app to force app

Force Stop，app 进程被杀死时，not invork any lifecycle function。  
从 Recent list 中重启 qpp，app 进程不是原来的进程号，是一个新的进程。

```
// Open app, A is mainActivity
D/A: onCreate:
D/A: onStart
D/A: onResume

// A -> B
D/A: onPause
D/B: onCreate:
D/B: onStart
D/B: onResume
D/A: onStop

// B -> HomeScreen -> Settings -> AppsInfo
D/B: onPause:
D/B: onSaveInstanceState
D/B: onStop:

// In AppsInfo app, force Stop My app. app 进程已经杀死了。
// No log . So not invork any lifecycle function.

// Reopen app from  recent list， 重新重启qpp， app进程不是原来的进程，是一个新的进程。
D/A: onCreate:
D/A: onStart
D/A: onResume

```

```html
<video
  id="video"
  controls=""
  preload="none"
  poster="http://media.w3.org/2010/05/sintel/poster.png"
>
  <p>force Stop My app</p>
  <source
    id="mp4"
    src="https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/force_stop_app_video_1.mp4"
    type="video/mp4"
  />
  <source
    id="mp4"
    src="https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/force_stop_app_video_2.mp4"
    type="video/mp4"
  />
</video>
```

![Force app](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/force_stop_app_img1.png)  
![Force app](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/force_stop_app_img2.png)  
![Force app](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/force_stop_app_img3.png)

动态截图不支持时，看下面链接：  
 [force Stop My app](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/force_stop_app_video_1.mp4)  
 [force Stop My app](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/force_stop_app_video_2.mp4)

### Init and release ressources

```
onStart() - onStop() // Recommend
onResume() - onPause()
```

## Saving Persistent State

## Start Actiivty

- startActivity()
- startActivityForResult() + onActivityResult()

## Cordinate activities

Start: 看见了新的，才彻底消失旧的。  
Back: 恢复了旧的，才彻底清除当前的。

```
A onPause()
B onCreate() -> onStart() -> onResume()
A onStop()
```

## `Visible`, `Invisible`， `Background`， and `Foreground`?

- Visible：表示 activity 可见状态，即 activity 已经显示出来了。
- Invisible：表示 activity 不可见状态，即 activity 没有显示出来了。
- Background：activity 位于后台，即无法与用户交互。
- Foreground ：activity 位于前台，即可以与用户交互。

![Acivity lifecycle about functions](https://YingVickyCao.github.io/img/android/app_component/activity/life_cycle/activity_lifecycle_func_list.jpg)

## Task and Back stack

### back stack

Started: pushed onto  
Back: popped off

### Manage tasks

- activity manifest attributes

```
taskAffinity
launchMode
allowTaskReparenting
clearTaskOnLaunch
alwaysRetainTaskState
finishOnTaskLaunch
```

- Define lauch modes

```
launchMode

/
intent flags:
FLAG_ACTIVITY_NEW_TASK
FLAG_ACTIVITY_CLEAR_TOP
FLAG_ACTIVITY_SINGLE_TOP
```

---

# 6 Configuration

![configChanges](https://yingvickycao.github.io/img/android/app_component/activity/life_cycle/configChanges.png)

常见的 3 个选项：local、orientation 和 keyboardHidden。

# 转屏的处理方式

### 方案 1:Allow rotate,but not recreate Activity

通过为 Activity 设置 configChanges 属性，当屏幕旋转时 Activity 不销毁。

当转屏时:

- Activity 不会重新创建
- 不会回调 onSaveInstanceState 和 onRestoreInstanceState 来保存和恢复数据
- 横屏时，不显示 layout-land，显示 layout
- 回调 onConfigurationChanged

`AndroidManifest.xml`

```html
<activity
  android:name=".app_component.activity.lifecycle.A"
  android:configChanges="orientation|screensize"
/>
```

`A.java`

```java
@Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        // 2 == ORIENTATION_LANDSCAPE
        // 1 == ORIENTATION_PORTRAIT
        // 0 == ORIENTATION_UNDEFINED
        Log.d(TAG, "onConfigurationChanged, newOrientation:" + newConfig.orientation);
    }
```

```
D/A: onConfigurationChanged, newOrientation:1
D/A: onConfigurationChanged, newOrientation:2
D/A: onConfigurationChanged, newOrientation:1

```

### 方案 2:自由转屏

不设置 Activity configChanges 属性，当屏幕旋转时 Activity 销毁。

`AndroidManifest.xml`

```html
<activity android:name=".app_component.activity.lifecycle.A" />
```

当转屏时:

- Activity 会重新创建
- 回调 onSaveInstanceState 和 onRestoreInstanceState 来保存和恢复数据
- 横屏时，显示 layout-land，不显示 layout
- 不回调 onConfigurationChanged

### 方案 3：setRequestedOrientation 设置初始方向，且自由转屏 。

同方案 2.

`DisableRotateActivity.java`

```java
@Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        setTitle(R.string.activity_disable_Rotate);
        super.onCreate(savedInstanceState);

        // 禁止横竖屏转换，设置屏幕方向为竖屏
        //setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

        // 禁止横竖屏转换，设置屏幕方向为横屏
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
    }

/
android:screenOrientation="portrait"
```

### 方案 4：网络请求没有返回之前，不允许方向变化。 返回后，变化方向？

网络请求时设置：  
setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);

# 7 QA: In Activity onCreate(),获取的高度和宽度始终为 0

`GetViewSizeActivity.java`

Q: In Activity onCreate(),getWidth()/getMeasuredWidth()/getHeight()/getMeasuredHeight() 返回值为 0？  
Why 0 ?  
layout 绘制经过 measure->layout->draw 三步骤.只有在整个布局绘制完成后，视图才能得到自身的高和宽。果都是 0。这个过程发生在 onCreate()方法之后。

- 方法 1 ：(Recommended) 使用 View 的 post()方法  
  布局绘制后获取 View 的大小.  
  该方法接收一个 Runnable 线程参数，并将其添加到消息队列中。布局绘制后，Runnable 线程才会在 UI 线程中执行。Runnable 运行在 onResume 之后

- 方法 2: 监听 ViewTreeObserver. OnPreDrawListener
  View 在绘制时调用 This Listener 。  
  This Listener 会被调用多次。  
  After 获取 view 的高和宽，要 Remove the Listener。

- 方法 3: 监听 ViewTreeObserver. OnGlobalLayoutListener  
  监测布局变化，或 某 View 的可视状态改变。  
  This Listener 会被调用多次。  
  After 获取 view 的高和宽，要 Remove the Listener。

- 方法 4 : View.OnLayoutChangeListener  
  多次调用。  
  After 获取 view 的高和宽，要 Remove the Listener。

- 方法 5 : (Depressed)重写 View 的 onSizeChanged  
  多次调用。

- 方法 6 ：(Depressed) 重写 View 的 onLayout 方法  
  多次调用。

- 方法 7 : （错误） 使用 View.measure 测量 View  
  测量的宽度和高度可能与视图绘制完成后的真实的宽度和高度不一致。

# 8 `android:launchMode`

- Android 使用 Task 来管理 Activity.
- Android Task 没有提供 API 操作，可以通过 getTaskId 来看获取 Task 的 ID.
- Android Task 可以理解成 Activity 栈， Task 以栈的形式来管理 Activity。 先启动的 Activity 放在栈底， 后启动的 Activity 被放在栈顶。
- lauchmode 负责控制加载 Activity 与 Task 之间的加载关系。

## 四种 launchMode

- android:launchMode="standard" ：默认
- android:launchMode="singleTop" ： Task 栈顶单例
- android:launchMode="singleTask" :Task 栈内单例
- android:launchMode="singleInstance" ： 全局单例

`D->E->D->D`

![https://yingvickycao.github.io/](https://yingvickycao.github.io/img/android/app_component/activity/launch_mode/launchMode.jpg)

## `android:launchMode="standard"`

- Task Id 相同
- 当返回时，从栈顶逐一删除 Activity。

```
D:standard
E:standard
```

```
// D
D: onCreate:taskId=165,D,1,@169237340
D: onStart: taskId=165,D,1,@169237340
D: onResume:taskId=165,D,1,@169237340

// E
E: onCreate:taskId=165,E,2,@156862444
E: onStart: taskId=165,E,2,@156862444
E: onResume:taskId=165,E,2,@156862444

// D
D: onCreate:taskId=165,D,3,@13601179
D: onStart: taskId=165,D,3,@13601179
D: onResume:taskId=165,D,3,@13601179

// D
D: onCreate:taskId=165,D,4,@184629206
D: onStart: taskId=165,D,4,@184629206
D: onResume:taskId=165,D,4,@184629206

// Back
D: onRestart: taskId=165,D,4,@13601179
D: onStart: taskId=165,D,4,@13601179
D: onResume:taskId=165,D,4,@13601179
D: onDestroy: taskId=165,D,D,@184629206


// Back
E: onRestart: taskId=165,E,4,@156862444
E: onStart: taskId=165,E,4,@156862444
E: onResume:taskId=165,E,4,@156862444
D: onDestroy: taskId=165,D,D,@13601179


// Back
D: onRestart: taskId=165,D,4,@169237340
D: onStart: taskId=165,D,4,@169237340
D: onResume:taskId=165,D,4,@169237340
E: onDestroy: taskId=165,E,E,@156862444

// Back
D: onDestroy: taskId=165,D,D,@169237340
```

## `android:launchMode="singleTop"`

- 当栈顶发现 Activity 时，不会重新创建 Activity，而是通过`onNewIntent`直接复用 Activity。

```
D:singleTop
E:standard
```

```
// D
D/D: onCreate:taskId=154,D,1,@169237340
D/D: onStart: taskId=154,D,1,@169237340
D/D: onResume:taskId=154,D,1,@169237340

// E
D/E: onCreate:taskId=154,E,2,@156862444
D/E: onStart: taskId=154,E,2,@156862444
D/E: onResume:taskId=154,E,2,@156862444

// D
D: onCreate:taskId=154,D,3,@219358327
D: onStart: taskId=154,D,3,@219358327
D: onResume:taskId=154,D,3,@219358327

// D
D: onNewIntent:taskId=154,D,3,@219358327
D: onResume:taskId=154,D,3,@219358327

// Back
E: onRestart: taskId=154,E,3,@156862444
E: onStart: taskId=154,E,3,@156862444
E: onResume:taskId=154,E,3,@156862444
D: onDestroy: taskId=154,D,D,@219358327

// Back
D/D: onRestart: taskId=154,D,3,@169237340
D/D: onStart: taskId=154,D,3,@169237340
D/D: onResume:taskId=154,D,3,@169237340

E: onDestroy: taskId=154,E,E,@156862444

// Back -> Exist
D: onDestroy: taskId=154,D,D,@169237340

```

## `android:launchMode="singleTask"`

- 同一个 Tash 栈内只有一个实例。

```
D:singleTask
E:standard
```

```
// D
D: onCreate:taskId=167,D,1,@169237340
D: onStart: taskId=167,D,1,@169237340
D: onResume:taskId=167,D,1,@169237340

// E
E: onCreate:taskId=167,E,2,@236710559
E: onStart: taskId=167,E,2,@236710559
E: onResume:taskId=167,E,2,@236710559

// D
D: onNewIntent:taskId=167,D,2,@169237340
D: onRestart: taskId=167,D,2,@169237340
D: onStart: taskId=167,D,2,@169237340
D: onResume:taskId=167,D,2,@169237340
E: onDestroy: taskId=167,E,E,@236710559

// D
D: onNewIntent:taskId=167,D,2,@169237340
D: onResume:taskId=167,D,2,@169237340

// Back
D: onDestroy: taskId=167,D,D,@169237340
```

## `android:launchMode="singleInstance"`

- 位于全新的栈，总是位于栈顶，所在的 Task 栈且只包含该 Activity

```
D:singleInstance
E:standard
```

```
// D
D: onCreate:taskId=162,D,1,@169237340
D: onStart: taskId=162,D,1,@169237340
D: onResume:taskId=162,D,1,@169237340

// E
E: onCreate:taskId=163,E,2,@122500824
E: onStart: taskId=163,E,2,@122500824
E: onResume:taskId=163,E,2,@122500824

// D
D: onNewIntent:taskId=162,D,2,@169237340
D: onRestart: taskId=162,D,2,@169237340
D: onStart: taskId=162,D,2,@169237340
D: onResume:taskId=162,D,2,@169237340

// D
D: onNewIntent:taskId=162,D,2,@169237340
D: onResume:taskId=162,D,2,@169237340

// Back
E: onRestart: taskId=163,E,2,@122500824
E: onStart: taskId=163,E,2,@122500824
E: onResume:taskId=163,E,2,@122500824
D: onDestroy: taskId=162,D,D,@169237340


// Back
E: onDestroy: taskId=163,E,E,@122500824

```

# 8 Start Activit , transform data，and Close Activity

## Start Activity

```
startActivity(Intent intent)
```

```
startActivityForResult(Intent intent, int requestCode)
```

## Close Activity

```
finish();
```

```
// Force finish another activity that you had previously started with startActivityForResult.
finishActivity(requestCode)
```

### Close current activity, and return result to prev activity

```
setResult(KEY_B_RESULT_CODE, Intent);
finish();
```

## Use Intent to transform data

### Intent

```
Intent putExtra(String name, Bundle value)
Bundle getExtras()

/*
对Bundle存取的重写
智能：
当使用putExtra 存入数据时，自动判断Intent中是否已存在 Bundle对象？
如果没有，则先创建一个Bundle,再向Bundle中存入数据。
如果已创建，直接向Bundle中存入数据。
*/
Intent putExtra(String name, XXX value)
Intent getXXXExtra(String name)
```

### Bundle

```
Intent putXXX(String name, XXX value)
Intent getXXX(String name)
```

# 9 Q：When login app, splash screen for several seconds?

LoginActivity.java

Why ?  
First,System 绘制窗体。由于布局资源还没加载，使用了默认背景色。  
Then, Activity onCreate()-setContentView。

```xml
<!-- 使用了默认背景色 -> 造成白色闪屏  -->
<style name="LoginIn" parent="AppTheme.Light"/>

<!-- 使用了默认背景色 -> 造成黑色闪屏  -->
<style name="LoginIn" parent="AppTheme.Dark"/>
```

A:

```xml
<!-- 透明处理当前的activity  -->
<item name="android:windowIsTranslucent">true</item>
/
<!-- same color as Loginin page -->
<item name="android:windowBackground">@android:color/black</item>
OR
<!-- Fitst shows wallpaper, Then show LoginIn page widgets including background color -->
<item name="android:windowBackground">@drawable/wallpaper</item>
```

# TBD:

## TBD:Recents Scrreen

## TBD:启动模式

## TBD:IntentFilter

## TBD:Permissions

## TBD:activity manifest attributes

<b style="color:red"> [TBD]</b> [https://developer.android.google.cn/guide/components/activities/activity-lifecycle.html ](https://developer.android.google.cn/guide/components/activities/activity-lifecycle.html)

<b style="color:red">[TBD] </b> [https://developer.android.google.cn/guide/components/activities/index.html](https://developer.android.google.cn/guide/components/activities/index.html)

<b style="color:red">[TBD] </b>[https://developer.android.google.cn/guide/components/activities/state-changes.html](https://developer.android.google.cn/guide/components/activities/state-changes.html)

<b style="color:red">[TBD] </b>[https://developer.android.google.cn/guide/components/activities/tasks-and-back-stack.html](https://developer.android.google.cn/guide/components/activities/tasks-and-back-stack.html)

<b style="color:red">[TBD] </b>[https://developer.android.google.cn/guide/components/activities/process-lifecycle.html](https://developer.android.google.cn/guide/components/activities/process-lifecycle.html)

<b style="color:red">[TBD] </b>[https://developer.android.google.cn/guide/components/activities/parcelables-and-bundles.html](https://developer.android.google.cn/guide/components/activities/parcelables-and-bundles.html)

<b style="color:red">[TBD] </b>[https://developer.android.google.cn/guide/components/activities/recents.html](https://developer.android.google.cn/guide/components/activities/recents.html)

<b style="color:red">[TBD] </b>[http://android-developers.blogspot.com/2011/06/things-that-cannot-change.html](http://android-developers.blogspot.com/2011/06/things-that-cannot-change.html)

<b style="color:red">[TBD] </b>[https://developer.android.google.cn/guide/topics/manifest/activity-element.html](https://developer.android.google.cn/guide/topics/manifest/activity-element.html)

<b style="color:red">[TBD] </b>[https://developer.android.google.cn/guide/components/intents-filters.html](https://developer.android.google.cn/guide/components/intents-filters.html)

<b style="color:red">[TBD] Window、Dialog、Toast 和 Activity 的关系 </b>

<b style="color:red">`[TBD]` `Fragment`生命周期结合 Activity 生命周期? </b>

<b style="color:red">[TBD] `Activity`的启动过程源码比较复杂，涉及到`Instrumentation`, `ActivityThread` and `ActivityManagerSercice(AMS)`。</b>

<b style="color:red">[TBD1]源码中的红色错误代码是怎么回事</b>

<b style="color:red">[TBD] onSaveInstanceState 中存储数据的大小限制是多少？ </b>

<b style="color:red">[TBD]方案 4：网络请求没有返回之前，不允许方向变化。 返回后，变化方向？</b>
<b style="color:red">[TBD] 如何模拟内存不足的情况？目前网上的方法都没有效果。</b>

- <b style="color:red">[TBD][not pass]ScreenSize 和 SmallScreenSize 比较特殊， 行为和编译选项有关，和运行环境无关。</b>

TBD: `Fragment`生命周期结合 Activity 生命周期?

---

# Refs

- [How Android Draws Views](https://developer.android.google.cn/guide/topics/ui/how-android-draws.html)
- [Activity](https://developer.android.google.cn/reference/android/app/Activity.html)
- [《50 Android Hacks》笔记整理 Hack 9~Hack 17](https://blog.csdn.net/hzc_01/article/details/50093989)
- https://developer.android.google.cn/guide/components/activities/activity-lifecycle.html
- 《Android 开发艺术探索》作者：任玉刚 第 1 章 Activity 的生命周期和启动模拟
- [https://developer.android.google.cn/guide/components/activities/activity-lifecycle.html](://developer.android.google.cn/guide/components/activities/activity-lifecycle.html)

- [https://developer.android.google.cn/guide/components/activities/index.html](://developer.android.google.cn/guide/components/activities/index.html)

- [https://developer.android.google.cn/guide/components/activities/state-changes.html](://developer.android.google.cn/guide/components/activities/state-changes.html)

- [https://developer.android.google.cn/guide/components/activities/tasks-and-back-stack.html](https://developer.android.google.cn/guide/components/activities/tasks-and-back-stack.html)

- [https://developer.android.google.cn/guide/components/activities/process-lifecycle.html](https://developer.android.google.cn/guide/components/activities/process-lifecycle.html)

- [https://developer.android.google.cn/guide/components/activities/parcelables-and-bundles.html](https://developer.android.google.cn/guide/components/activities/parcelables-and-bundles.html)

- [https://developer.android.google.cn/guide/components/activities/recents.html](https://developer.android.google.cn/guide/components/activities/recents.html)

- [http://android-developers.blogspot.com/2011/06/things-that-cannot-change.html](http://android-developers.blogspot.com/2011/06/things-that-cannot-change.html)

- [https://developer.android.google.cn/guide/topics/manifest/activity-element.html](://developer.android.google.cn/guide/topics/manifest/activity-element.html)

- [https://developer.android.google.cn/guide/components/intents-filters.html](://developer.android.google.cn/guide/components/intents-filters.html)

```

```
