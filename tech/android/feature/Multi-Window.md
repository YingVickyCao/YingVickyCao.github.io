# Multi-Window(分屏)

# 1 Multi-Window Supprot

Case 1 : Android >=7.0(24)，Split-screen mode（This page focus on this）  
Recent -> 长按 Overview Screen -> Open in split screen view

Case 2 : Android >=8.0(26)，Picture-in-picture mode

Case 3 : freedom mode：freely resize each activity （可调节大小的 Dialog 窗口）  
Recent -> 长按 Overview Screen -> Open in pop-up view

# 2 Android >= 7.0(24)，默认支持 MultiWindow. `android:resizeableActivity="true"`

# 3 如何禁止 MultiWindow？

- `android:resizeableActivity="false"`
- android:screenOrientation attribute. 某些配置

# 4 测试结论

- 1 处于 Activity 处于 onMultiWindowModeChanged （true）模式后，touch my app, Main onResume; touch other app, Main onPause

```
my app:  Main
other app:other app Main
```

- 2 Main -> A . Main is In MultiWindow。 After Main -> A, Main has invoked onStop(); A has invoked onResume();
- 3 Main -> A ->B. 若 Main 支持 MultiWindow `android:resizeableActivity="true"`, 不论 Main 是否调用 finish()，被 Main 之后启动 A 和 B 将继承该属性，同样支持 MultiWindow .
- Main -> A ->B. 若 Main 不支持 MultiWindow `android:resizeableActivity="true"`, 不论 Main 是否调用 finish()，被 Main 之后启动 A 和 B 将继承该属性，同样不支持 MultiWindow .  
  不支持时，即使调整也是全屏显示，并 toast error"android can not use this app in multiple window"
- 4 判断

```
    @Override
    public void onMultiWindowModeChanged(boolean isInMultiWindowMode) {
        super.onMultiWindowModeChanged(isInMultiWindowMode);
        Log.d(TAG, "onMultiWindowModeChanged: isInMultiWindowMode=" + isInMultiWindowMode);
    }
    @Override
    public void onMultiWindowModeChanged(boolean isInMultiWindowMode, Configuration newConfig) {
        super.onMultiWindowModeChanged(isInMultiWindowMode, newConfig);
        Log.d(TAG, "onMultiWindowModeChanged: isInMultiWindowMode=" + isInMultiWindowMode + ",orientation=" + printOrientation(newConfig.orientation));
    }
```

Activity 监测 `android:configChanges="screenSize|smallestScreenSize|screenLayout|orientation"`,否则，`onMultiWindowModeChanged:`调用后会重新创建该 activity

- 5 处于 Activity 处于 onMultiWindowModeChanged （true）模式后，tablet landscape 拖动窗口大小，根据窗口大小 `onConfigurationChanged: orientation=LANDSCAPE/PORTRAIT`,且每次停下一次，就调用 onConfigurationChanged 1 次。
- 6 处于 Activity 处于 onMultiWindowModeChanged （true）模式后，晃动 tablet 切换 LANDSCAPE <-> PORTRAIT，每次切换 只调用 1 次`onConfigurationChanged`
- 7 android:supportsPictureInPicture is ignored if android:resizeableActivity is false.
- 8 When in 多窗口模式，调用的窗口会在另一个窗口中被打开（测试未通过）

```
Intent intent = new Intent(Intent.ACTION_VIEW);
intent.setData(geoLocation);
intent.addFlags(Intent.FLAG_ACTIVITY_LAUNCH_ADJACENT);
```

# TBD

- 多窗口框架原理
  https://blog.csdn.net/xiaosayidao/article/details/75045087

# Refs

https://developer.android.google.cn/guide/topics/ui/multi-window
