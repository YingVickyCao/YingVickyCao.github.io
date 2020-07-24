# Debug APK webview page

# 1 Chekc android apk web request

方法 1：Debug app web page in Chrome (Recommended)

```
chrome://inspect
```

方法 2： android studio logcat  
方法 3：Charles

# 2 ERROR: After Chrome app inspected app webview pages, says "HTTP/1.1 404 Not Found"

https://www.cnblogs.com/matric/p/10407783.html

**Try**：

| Mac Google Chrome | Android Google Chrome         | Android System WebView        | Result                        |
| ----------------- | ----------------------------- | ----------------------------- | ----------------------------- |
| 80.0.3987.87      | 76.0.3809.132                 | 76.0.3809.132                 | says "HTTP/1.1 404 Not Found" |
| 80.0.3987.87      | 76.0.3809.132 -> 80.0.3987.87 | 76.0.3809.132                 | says "HTTP/1.1 404 Not Found" |
| 80.0.3987.87      | 76.0.3809.132 -> 80.0.3987.87 | 76.0.3809.132 -> 80.0.3987.87 | OK                            |

Google Chrome
https://apkpure.com/google-chrome-fast-secure/com.android.chrome/versions?posts=1
Chrome_v80.0.3987.87_apkpure.com.apk

Android System WebView  
https://apkpure.com/android-system-webview/com.google.android.webview/versions  
Android_System_WebView_v80.0.3987.87_apkpure.com.apk  
[Chose Architecture](../../../tools/sdk/adb/adb.md#adb_abi) ? arm64-v8a = phone CPU Architecture

```
# Pixel 3

# chrome://inspect page
Pixel 3 #8CAX1LCYY
Chrome (76.0.3809.132)
WebView in uat (76.0.3809.132)  # Android System WebView(76.0.3809.132)

# says "HTTP/1.1 404 Not Found"
```

```
# Pixel 3

# chrome://inspect page
Pixel 3 #8CAX1LCYY
Chrome (76.0.3809.132)  -> Chrome (80.0.3987.87)
WebView in uat (76.0.3809.132)  # Android System WebView(76.0.3809.132)

# says "HTTP/1.1 404 Not Found"
```

```
# Pixel 3

# chrome://inspect page
Pixel 3 #8CAX1LCYY
Chrome (76.0.3809.132)  -> Chrome (80.0.3987.87)
WebView in uat (80.0.3987.87) # Android System WebView(80.0.3987.87)

# OK
```

```
# SM-T830

# chrome://inspect page
SM-T830 #CE021822D0CC3001017E
com.sec.android.app.sbrowser (67.0.3396.87) # 默认浏览器的内核不是Android System WebView
WebView in uat (72.0.3626.121) # Android System WebView(72.0.3626.121)

# says "HTTP/1.1 404 Not Found"
```

Reason：  
When inspect，使用的是 Android System WebView 与 Mac Google Chrome 进行通讯。
当 android < mac, 404.

Fix：  
Keep Mac Google Chrome 与 Android System WebView 版本一致。  
Method 1 ：Upgrade Android System WebView (Recommened)  
Method 2 ：Downgrade Mac Google Chrome
