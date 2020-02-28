# App shortcuts
Added in Android 7.1 (API level 25)

# 1. types of shortcuts
## Static shortcuts
Static shortcuts are defined in a resource file that is packaged into an APK or app bundle. 
- `num <=4`
- link to content using a consistent structure throughout the lifetime of a user's interaction with the app

## Dynamic shortcuts
Dynamic shortcuts can be published, updated, and removed by your app only at runtime. 
- `num <=4`
- used for actions in apps that are context-sensitive.  the shortcut will need to be updated frequently
- These actions can change between uses of your app, and they can change even while your app is running.

## Pinned shortcuts
- Pinned shortcuts can be added to supported launchers at runtime, if the user grants permission. 
- No  limit num. 
- used for specific, user-driven actions.
- Example: pin website

# 2. Create Static shortcuts
## XML Manifest
- metadata should conceal sensitive user information.  launcher itself can access this data, but  other apps can't .
- Only Add XML Manifest  permission 
```
<!-- 指定添加安装快捷方式的权限 -->
uses-permission android:name="com.android.launcher.permission.INSTALL_SHORTCUT"/>
```
- Activity =  (ACTION_MAIN, CATEGORY_LAUNCHER)

## ShortcutInfo
- xml-v25-`<shortcuts>`

-  `android:shortcutShortLabel`  
<= 10 characters

- `android:shortcutLongLabel`  
<= 25 characters. 
 If there's enough space, the launcher displays this value instead of android:shortcutShortLabel. 

- `android:shortcutDisabledMessage`  
android:enabled =false, When when the user attempts to launch a disabled shortcut, show this message.  
测试未再现  

- `android:enabled`  
`android:enabled = false` + android:shortcutDisabledMessage, or Remove this shortcut

- `android:icon`  
Shortcut icons cannot include tints.

# 3. Create dynamic shortcuts
 - Android >=8.0 (API level 26) 
- 添加时，system 弹出自动dialog，only allow 才能添加。
- Aleady Added, 再次添加时Label信息不会更新。
- 删除app，pinned shortcut自动删除。
- id is stable

ShortcutManager.createShortcutResultIntent() : Android >=8.0 (API level 26) . But Support library APIs, Android >=7.1 (API level 25).

# 4. Create pinned shortcuts
- Android >=8.0 (API level 26) . But Support library APIs, Android >=7.1 (API level 25).

# 5. ShortcutManager is system service

# Refs
https://developer.android.google.cn/guide/topics/ui/shortcuts