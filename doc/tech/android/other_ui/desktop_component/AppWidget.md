# APP Widget

# Part1: Build an App Widget
- app widget 可添加多个，摆放不同位置，每个= single instance = single int appWidgetId.
- 直接在桌面看到程序的运行界面。
- app widget 与app是一个进程吗？  
不是。  
app widget 运行在remote = desktop ( a app widget host)  
AppWidgetProvider 运行在app进程。  
AppWidgetProvider -> Remote views  -> refresh app widget in desktop.  

- App widget principle    
![app_widget.jpg](https://yingvickycao.github.io/img/android/other_ui/desktop_component/app_widget.jpg)

Flow that occurs in an app widget that uses collections when updates occur.    
![Keeping Collection Data Fresh](https://developer.android.google.cn/images/appwidgets/appwidget_collections.png)

## 1. Build an App Widget Step
1. layout
2. AppWidgetProvider is a BroadcastReceiver
3. manifest register AppWidgetProvider
```
 <receiver
    android:name="AppWidgetProvider"
    android:icon="@drawable/ic_launcher"
    android:label="@string/basic_app_widget">
    <intent-filter>
        <!-- action specifies that the AppWidgetProvider accepts the ACTION_APPWIDGET_UPDATE broadcast -->
        <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
    </intent-filter>
    <meta-data
        android:name="android.appwidget.provider"
        android:resource="@xml/appwidget_provider_info_4_base" />
</receiver>
```
4. AppWidgetProviderInfo - res/xml/`<appwidget-provider>`  
config app widget.

## 2. AppWidgetProviderInfo

### `android:updatePeriodMillis`
- defines how often the App Widget framework should request an update from the AppWidgetProvider by calling the onUpdate() callback method.
- allow the user to adjust the frequency in a configuration—update every 15 minutes, or maybe only four times a day.
- The actual update is not guaranteed to occur exactly on time with this value and we suggest updating as infrequently as possible—perhaps no more than once an hour to conserve the battery

- app widget 刷新？    
If the device is asleep when it is time for an update (as defined by updatePeriodMillis),   then the device will wake up in order to perform the update.    
If `<=1次 /1h`, no problem for  life.Recommended.   
If `>1次/1h`, not need to update while the device is asleep. AlarmManager(ELAPSED_REALTIME/RTC) , not waking the device, only deliver the alarm when the device is awake. and set updatePeriodMillis = 0

API >= 21:  
后台app无法长时保存 -> system 自动杀死。 Jobservice：1/15 or 20 minutes;      
foreground app,可刷新频繁，1/1s也没有关系。

### `androoid:configure `
- configure settings when adds a new App Widget  

Activty: 
- The App Widget host calls the configuration Activity and the configuration Activity should always return a result.
 App Widget ID = EXTRA_APPWIDGET_ID
- auto update the App Widget when configuration is complete
/ Do so by requesting an update directly from theAppWidgetManager.
- Activity is declared with a fully-qualified namespace, because it will be referenced from outside your package scope.

### `android:previewImage`
a preview when when selecting the app widget。

### `android:resizeMode`
make homescreen widgets resizeable—horizontally, vertically, or on both axes? 

### `android:widgetCategory`
`Android >= 5.0,  home screen (home_screen).`  
`Androd <5.0, lock screen (keyguard) +  home screen (home_screen).`  

### `android:minWidth,android:minHeight`
`android:minWidth,android:minHeight`: the default widget size.  

### `android:minResizeWidth, android:minResizeHeight`
resize size: minResizeWidth <= minWidth <= 4 x 4 cells.  
If size < minResizeWidth, App Widget would be illegible or otherwise unusable. 

## 3. Support widget

```
// Layout
FrameLayout
LinearLayout
RelativeLayout
GridLayout

AnalogClock
Button
Chronometer
ImageButton
ImageView
ProgressBar
TextView
ViewFlipper

// Collections
ListView        
GridView        
StackView        
AdapterViewFlipper

ViewStub

```

- Not support View


## 4. Adding margins to App Widgets

```
Android>=4.0 (>=14), 0dp: auto margin to provide better alignment with other widgets and icons on the user's home screen
Android <4.0 (<14), set 8dp

layout:
<FrameLayout android:padding="@dimen/widget_margin">
</FrameLayout>
```

## 5. AppWidgetProvider
- onUpdate():    
AppWidgetProviderInfo - updatePeriodMillis, added      
ACTION_APPWIDGET_UPDATE  
 
- onAppWidgetOptionsChanged():    
first placed and any time the widget is resized.    
ACTION_APPWIDGET_OPTIONS_CHANGED 

- onDeleted:    
called every time an App Widget is deleted from the App Widget host
ACTION_APPWIDGET_DELETED

- onEnabled(Context):    
Only called when the app Widget first instance crreated.  
==  
Only called the first time.      
Perform some setup, such as  Database.    
ACTION_APPWIDGET_ENABLED   

- onDisabled(Context): 
called when the last instance of your App Widget is deleted from the App Widget host.    
clean up any work done in onEnabled(Context), such as Database.  
ACTION_APPWIDGET_DISABLED  

- onReceive(Context, Intent):
No need to implement. because aleady  filtered.  

## 6.Using App Widgets with Collections

- `+` RemoteViewsService `===` adapter    
Persisting data:  
not store any data in your RemoteViewsService (unless it is static).  Use ContentProvider instread.   

- AppWidgetProvider   
`+` RemoteViews.setRemoteAdapter(R.id.list_view, intent)  
`+` RemoteViews.setEmptyView(R.id.list_view, R.id.empty_view)   

- click action        
AppWidgetProvider.java
RemoteViews.setOnClickPendingIntent():btn,etc    
`->`  
AppWidgetProvider.java, RemoteViews.setPendingIntentTemplate():collections     
RemoteViewsService.java,RemoteViews.setOnClickFillInIntent() : individual list items:     

# Part2: Build an App Widget host
Android Home screen is default App Widget Host

# Refs
- https://developer.android.google.cn/reference/android/appwidget/AppWidgetProvider.html?hl=en
- https://developer.android.google.cn/guide/topics/appwidgets/index.html?hl=en#AppWidgetProvider
- App Widget Design Guidelines    https://developer.android.google.cn/guide/practices/ui_guidelines/widget_design.html#anatomy_determining_size
- https://www.jianshu.com/p/17ec9bd6ca8a
