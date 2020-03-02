# Picture In Picture

画中画：

- Android >=8.0（26）  
  内置操作：手势移动、关闭画中画、画中画切换回原页面
- 低版本实现画中画还是需要利用 windowManger 通过 addview 去做

# `Android >= 8.0`

## AndroidManifest.xml

```
android:configChanges="screenSize|smallestScreenSize|screenLayout|orientation"
android:supportsPictureInPicture="true"
```

## Log

```
onCreate
onStart
onResume

// Click button ->  Enter Picture-in-Picture mode.
onPause
onPictureInPictureModeChanged

// Click button  -> Exist Picture-in-Picture mode. Back to page
onPictureInPictureModeChanged
onResume

// Click button ->  Enter Picture-in-Picture mode.
onPause
onPictureInPictureModeChanged

// In Picture-in-Picture mode, click Close button
onStop
onPictureInPictureModeChanged
onRestart
onStart
onResume
```

```
onCreate
onStart
onResume

// Press Home/Reccent -> Enter Picture-in-Picture mode.
onUserLeaveHint
onPause
onPictureInPictureModeChanged

// Click button  -> Exist Picture-in-Picture mode. Back to page
onPictureInPictureModeChanged
onResume

// Click button ->  Enter Picture-in-Picture mode.
onPause
onPictureInPictureModeChanged

// In Picture-in-Picture mode, click Close button
onStop
onPictureInPictureModeChanged
onRestart
onStart
onResume
```
