# Android Update SDK

# How to do the SDK update?

- Read the Android version update doc and change the code if needed
  https://developer.android.google.cn/about/versions

- Fix build script warning and error.
- Fix depressed API.
  (1) Build.VERSION.SDK_INT < Build.VERSION_CODES.M  
  (2) @TargetApi(Build.VERSION_CODES)
  (3) `Android Studio -> Analyze -> Run Inspection by Name -> "Depressed API"`
  If not fixed all depressed API, create JIRA to fix remaining ones.
- Write code changes history wiki.

# Android 13(33)

- (Target 13)`android.permission.POST_NOTIFICATIONS`
  AndroidManifest + Runtime permission request, or cannot receive notification
- ForegroundService
  Running Android 13（33）onwards，`android:foregroundServiceType` added to show notification immediately.

# Android 12(31/31)

- (Target 12)PendingIntent - FLAG_IMMUTABLE/FLAG_MUTABLE
- (Target 12)compoent with intent filter should add `android:exported`
