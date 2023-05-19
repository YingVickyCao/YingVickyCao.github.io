# 4 normal lifecycle

正常情况下的生命周期 ，主要关注生命周期函数的调用顺序，在每个生命周期要做什么?不能做什么?

![Figure 1. A simplified illustration of the activity lifecycle.](https://developer.android.google.cn/guide/components/images/activity_lifecycle.png)
这张图，包含了 2 种情况: normal、abnormal

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
