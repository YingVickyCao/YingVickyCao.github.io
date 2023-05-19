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

- 什么时候回出现异常情况下的生命周期？  
  情况 1: 当资源相关的系统配置发生改变，Activity 被杀死.导致 Activity 被杀死并重新创建。  
  情况 2: 当系统内存不足时，低优先级的 Activity 可能被杀死。 [Table 1. Relationship between process lifecycle and activity state](https://developer.android.google.cn/guide/components/activities/activity-lifecycle#asem)  
  情况 2: Use Settings -> AppsInfo app to force app

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
