# Background Execution Limits
- To improve the user experience, Android 8.0 (API level 26) imposes limitations on what apps can do while running in the background. 
- target Android 8.0 (API level 26) or higher
- Include   
Background Service Limitations   
Broadcast Limitations   


---

# Background Service Limitations

Android 8.0 (API level 26) or higher

## foreground app
1. It has a visible activity, whether the activity is started or paused.  
2. It has a foreground service.  
3. Another foreground app is connected to the app 

- Bound services are not affected

## background app
Otherwise above.

## Background in whitelist
Under certain circumstances, a background app is placed on a temporary whitelist for several minutes. While an app is on the whitelist, it can launch services without limitation, and its background services are permitted to run. An app is placed on the whitelist when it handles a task that's visible to the user, such as:

- Handling a high-priority Firebase Cloud Messaging (FCM) message.
- Receiving a broadcast, such as an SMS/MMS message.
- Executing a PendingIntent from a notification.
- Starting a VpnService before the VPN app promotes itself to the foreground.

## To migrate to Android 8.0?
- IntentService  -> JobIntentService
-  If the service is not doing something immediately noticeable to the user, background services  -> JobScheduler  jobs
- If app needs to create a foreground service while the app is in the background, use `startForegroundService()` instead of startService().
- If the service is noticeable by the user, make it a foreground service. Use `startForegroundService()` instead of startService().

Prior to Android 8.0, the usual way to create a foreground service was to create a background service, then promote that service to the foreground. With Android 8.0, there is a complication; the system doesn't allow a background app to create a background service. For this reason, Android 8.0 introduces the new method startForegroundService() to start a new service in the foreground. After the system has created the service, the app has five seconds to call the service's startForeground() method to show the new service's user-visible notification. If the app does not call startForeground() within the time limit, the system stops the service and declares the app to be ANR.

- Defer background work until the application is naturally in the foreground.
- Use FCM to selectively wake your application up when network events occur, rather than polling in the background.


---

# Broadcast Limitations
- Apps that target Android 8.0 or higher can no longer register broadcast receivers for implicit broadcasts in their manifest. An implicit broadcast is a broadcast that does not target that app specifically. For example, ACTION_PACKAGE_REPLACED is an implicit broadcast, since it is sent to all registered listeners, letting them know that some package on the device was replaced. However, ACTION_MY_PACKAGE_REPLACED is not an implicit broadcast, since it is sent only to the app whose package was replaced, no matter how many other apps have registered listeners for that broadcast.

- Apps can continue to register for explicit broadcasts in their manifests.
- Context.registerReceiver():implicit or explicit.
- Broadcasts that require a signature permission are exempted from this restriction, since these broadcasts are only sent to apps that are signed with the same certificate, not to all the apps on the device.

## To migrate to Android 8.0?
- Manifest register => Context.registerReceiver()
- Use a scheduled job to check for the condition that would have triggered the implicit broadcast.

# Refs
- [Background Execution Limits](https://developer.android.google.cn/about/versions/oreo/background)