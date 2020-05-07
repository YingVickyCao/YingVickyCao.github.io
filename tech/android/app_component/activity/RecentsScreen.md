# Recents Screen

- The Recents screen (also referred to as the Overview screen, recent task list, or recent apps) is a system-level UI that lists recently accessed activities and tasks.
- Normally you should allow the system to define how your tasks and activities are represented in the Recents screen, and you don't need to modify this behavior.
- App can determine how and when activities appear in the Recents screen.  
  Way 1 : ActivityManager.AppTask class  
  Way 2 : the activity flags of the Intent class  
  Way 3 : the <activity> attributes

# 1 Adding Tasks to the Recents Screen

## Using the Intent flag to add a task

```java
FLAG_ACTIVITY_NEW_DOCUMENT
FLAG_ACTIVITY_MULTIPLE_TASK
```

| Intent flag                                                  | Clicked 3 time,<br/> Recents task num? | Test result                     |
| ------------------------------------------------------------ | -------------------------------------- | ------------------------------- |
| FLAG_ACTIVITY_NEW_DOCUMENT                                   | +1                                     | a new task, onNewIntent         |
| FLAG_ACTIVITY_NEW_DOCUMENT <br/> FLAG_ACTIVITY_MULTIPLE_TASK | +3                                     | more than one task              |
| FLAG_ACTIVITY_MULTIPLE_TASK                                  | 1                                      | 显示在 app 栈，并没有单独列出来 |

- Activities launched with the FLAG_ACTIVITY_NEW_DOCUMENT flag must have the android:launchMode="standard" attribute value (the default) set in the manifest.

## Using the activity attribute to add a task

`android:documentLaunchMode`
Specifies how a new instance of an activity should be added to a task each time it is launched.

| Value        | Description                                                                                                                                                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| intoExisting | FLAG_ACTIVITY_NEW_DOCUMENT                                                                                                                                                                                                              |
| always       | FLAG_ACTIVITY_NEW_DOCUMENT <br/> FLAG_ACTIVITY_MULTIPLE_TASK                                                                                                                                                                            |
| none         | The activity does not create a new task : a single task for the app                                                                                                                                                                     |
| never        | 1)FLAG_ACTIVITY_NEW_DOCUMENT + FLAG_ACTIVITY_MULTIPLE_TASK -> FLAG_ACTIVITY_NEW_DOCUMENT <br/> (2)FLAG_ACTIVITY_NEW_DOCUMENT -> FLAG_ACTIVITY_NEW_DOCUMENT <br/> (3)FLAG_ACTIVITY_MULTIPLE_TASK -> none <br/>(4) neither(1)~(3) -> none |

# 2 Removing Tasks

By default a document task is automatically removed from the Recents screen when its activity finishes.

You can override this behavior  
Way 1 : the ActivityManager.AppTask class  
Way 2 : an Intent flag  
Way 3: with an <activity> attribute.

- `android:excludeFromRecents`: exclude a task from the Recents screen.  
  If FLAG_ACTIVITY_NEW_DOCUMENT + FLAG_ACTIVITY_MULTIPLE_TASK / FLAG_ACTIVITY_NEW_DOCUMENT,与仅仅设置 FLAG_ACTIVITY_NEW_DOCUMENT 相同。
- `android:maxRecents`: maximum number of tasks that your app can include in the Recents screen.  
  [1,50/25 on low memory devices)].  
  default=16

## Using the AppTask class to remove tasks

```
// The document is no longer needed; remove its task.
finishAndRemoveTask();
```

## Retaining finished tasks

- `FLAG_ACTIVITY_RETAIN_IN_RECENTS`:retain a task in the Recents screen, even if its activity has finished.

```
Case 1: activity finished, but still retain the  task in the Recents screen
FLAG_ACTIVITY_RETAIN_IN_RECENTS
finish()
```

```
Case 2: activity finished, and remove the task in the Recents screen
FLAG_ACTIVITY_RETAIN_IN_RECENTS
finishAndRemoveTask()
```

- `android:autoRemoveFromRecents="false"`  
  ==**Not produced:**==
  To achieve the same effect, set the <activity> attribute android:autoRemoveFromRecents to false

```
Case 3: activity finished, and remove the task in the Recents screen
android:autoRemoveFromRecents="false"
finishAndRemoveTask()
```

```
Case 4: activity finished, and remove the task in the Recents screen
android:autoRemoveFromRecents="false"
finish()
```

# Ref：

- https://developer.android.google.cn/guide/components/activities/recents
- https://developer.android.google.cn/guide/components/activities/tasks-and-back-stack?hl=en
- https://github.com/android/user-interface-samples/tree/master/DocumentCentricApps
- https://developer.android.google.cn/guide/topics/manifest/activity-element
