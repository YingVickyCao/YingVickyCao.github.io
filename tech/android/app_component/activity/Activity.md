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

# 2 window mode

single-window mode (Default)
/
multi-window mode(Android >= 7.0(24))

## 3 Activity 生命周期

Activity 生命周期分为两种：正常生命周期(典型情况，normal lifecycle）、和 异常生命周期（Abnormal lifecycle）。  
正常生命周期：有用户参与情况下，Activity 所经历的生命周期。  
异常生命周期：Activity 被系统回收，或 由于当前设备的 Configuration 发生改变从而导致 Activity 被销毁重建。

## [normal lifecycle](Activity_正常生命周期.md)

## [Abnormal lifecycle](Activity_异常生命周期.md)

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

# 10 Reload current activity

```java
finish()
startActivity(getIntent())
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
