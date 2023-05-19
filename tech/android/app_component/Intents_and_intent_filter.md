# Intents and Intent Filters
Use Intent and IntentFilter to communication

## 设计Intent的目的
Intent，中文“意图”  
- 封装启动某个组件的意图：我要启动某个应用组件   
`startActivity(Intent)` vs `startActivity(Class)` : 解耦    
应用组件：  
`Activity`, `Service`, `BroadcastReceover`,`ContentProvider`

- Intent是应用组件之间通信的媒介。  
把数据封装成Bundle，使用Intent携带Bundle,来实现两个Activity的数据交换。

# PendintIntent 
- PendintIntent是对Intent的包装。
- 一般`PendintIntent.getActivity()`/`PendintIntent.getService()`/`PendintIntent.getBroadcast()`等获取PendintIntent。
- 与Intent不同，PendintIntent通常会传给其他应用组件，由其他应用程序来执行PendintIntent包装的`Intent`。

# Intent types
- Explicit intents 显式Intent
- Implicit intents 隐式Intent

## Explicit intents 显式Intent -> 特定
- 指定Component属性的Intent，已经明确它将要启动哪个组件。  
`Component` 

## Implicit intents 隐式Intent -> 非特定
- 没有指定Component属性的Intent，没有已经明确它将要启动哪个组件，将会按照Intent指定的规则去启动符合条件的组件，但具体是哪个组件则不确定。  
`Action,Category,Data,Type,Extra, and Flag`

类比：
女孩找男朋友的意图：  
显式Intent = 找“权书函”。    
隐式Intent=“高富帅”，是谁不重要，重要的是符合这三个条件即可。  

# Intent
`Component`,`Action`,`Category`,`Data`,`Type`,`Extra`, and `Flag`

## `Component` 
- 使用Component来启动组件
- 创建Component，需要指定目标组件的报名和类名，来唯一地确定一个组件类。

```
ComponentName(Context pkg, Class cls)
ComponentName(String pkg, String cls)
ComponentName(Context pkg, String cls)

Intent intent = new Intent();
intent.setComponent(comp);
    
```
Notes:  
- Context pkg = Activity/Application/其他类型Context，都可以
`pkg A Context for the package implementing the component, from which the actual package name will be retrieved.`  即context -> 提取出 Package  


`===`

```
Intent intent = new Intent(Context packageContext, Class<?> cls);

public Intent(Context packageContext, Class<?> cls) {
    mComponent = new ComponentName(packageContext, cls);
}
```

`===`

```
Intent.setClass(Context pkg, Class cls)
Intent.setClass(String pkg, String cls)
Intent.setClass(Context pkg, String cls)
```
## `Action`
```
Intent.setAction(String action)
```

## `Category`
`Category`为Action增加额外的附加类别信息

```
Intent.addCategory(String category)
```
### Test：action,category with Intent-Filter  
A-> B/C? 

![intent-filter_actiion_and_category](https://yingvickycao.github.io/img/android/app_component/intent_filter/Intent_Filter_Action_and_Category.jpg)


- Action & Category = true 时，才能找到Activity，否则ActivityNotFoundException
- <intent-filter>中包含 `0~N`个<action>,`0~N`个<data>,`0~N`个<cateogry>
```
<intent-filter>
    <action />
    <category />
    <data />
</intent-filter>
```
- 某个组件满足要求打于或等于Intent所指定的要求，Intent就能启动该组件。其中action 必须设置，且Category 必须是子集.
- Intent通过指定Action，与具体的Activity分离，从而提供更高的解耦。   
这种设计思路与Struts2 -Action 类似。 

- <intent-filter> 也可以用在<service>,<receive>.  TBD：<provider>?

- 一个Intent对象最多包含一个Action，必须包含一个Action
- `<category android:name="android.intent.category.DEFAULT" />`不是默认的，必须配置在AndroidManifest后才能使用，否则 `ActivityNotFoundException`。

## `Data`
```
<intent-filter>
    <action android:name="action3" />
    <category android:name="android.intent.category.DEFAULT" />
    <data
        android:scheme="@string/scheme_3"
        android:host="@string/host_1"
        android:port="@string/port_1"
        android:path="@string/path_2"
        android:mimeType="@string/mime_type_1"
         />
</intent-filter>

Uri uri = Uri.parse("scheme3://com.hades/path2");
intent.setDataAndType(uri, getString(R.string.mime_type_1));
```

### `<data>`
- 向<action>属性提供操作的数据
- `<data>`接受一个Uri对象.  

### Uri   
- android app页面跳转协议。  
最常见的形式: Web url -> app
-  [Use implict intent to Open app activity from Chrome html page](https://YingVickyCao.github.io/doc/android/app_component/web_open_app.md)

- Uri = <data> - scheme,host ,port, path  
- Uri格式：   
Example:   
```
形式1：scheme://host:part/path

scheme3://com.hades:1000/path1 // 基本形式
scheme = scheme3
host = com.hades
port = 1000
path = `/path1`

形式2：[scheme:][//authority][path][?query][#fragment]
形式3：[scheme:][//host:port][path][?query][#fragment]

http://www.hades:8080/yourpath/fileName.htm?stove=10&path=32&id=4#harvic
scheme = http
scheme-specific-part = //www.hades:8080/yourpath/fileName.htm?stove=10&path=32&id=4 ,包含在scheme和fragment之间的部分
fragment = harvic

拆分：scheme-specific-part
query=stove=10&path=32&id=4
authority = www.hades:8080 = host:port
host = www.hades
port = 8080
path = /yourpath/fileName.htm
```

- `java.net.URI`(Web) vs `android.net.Uri`(Only Android) ?  
URI = Uniform Resource 通用资源标志符  

Uri是URI的“扩展”，以适应Android系统的需要  
Uri类是一个不可改变的URI引用。   
Uri类对无效的行为不敏感，对于无效的输入没有定义相应的行为，如果没有另外制定，它将返回垃圾而不是抛出一个异常。  
A URI reference includes a URI and a fragment  

- 判断Uri室友有效?
```
List<ResolveInfo> activities = getActivity().getPackageManager().queryIntentActivities(intent, PackageManager.MATCH_ALL);
if (activities.size() > 1) {
    // Valid
} 
```


### android:scheme  
android中的一种页面内跳转协议   

### android:path   
非必须

### android:port  
非必须

## `Type`

### android:mimeType  
非必须  
Intent.setType() == `android:mimeType`    
MIME类型 = 自定义/通用标识
- <data> = Uri + Type
```
Intent setDataAndType(@Nullable Uri data, @Nullable String type) 
```
Intent先设置Type，后设置Uri，则scheme会覆盖scheme属性  
Intent先设置Uri，后设置Type，则Type会覆盖scheme属性  
setDataAndType()设置的Intent既有Uri也有Type属性  

### Test： Uri data,Type with Intent-Filter  
`.app_component._intent_and_intent_filter._data.A`  
android.xls - Page `Intent-Filter_Data_Type`  

```
intent.setData(uri);
intent.addCategory(Intent.CATEGORY_DEFAULT);
intent.setAction("action1");

<intent-filter>
    <category android:name="android.intent.category.DEFAULT" />
    <data android:scheme="@string/scheme_1" />
</intent-filter>
```
- <category>-Intent.CATEGORY_DEFAULT是必须含有，名字不任意，<action> must have，名字任意，android:scheme 名字任意  
=> 至少配置一个`<action value=system>`，`<data>`才会起作用
- VS Intent设置(Uri,Type)，<intent-filter>-<data/>(host,scheme,path and mimeType) 一一对应相等，该组件才能被启动
- VS Intent设置(Uri Type,and action)，<intent-filter>-<data/> & action, 该组件才能被启动

![Intent-Filter - data and type](https:/YingVickyCao.github.io/img/android/app_component/intent_filter/Intent-Filter_Data_Type.jpg)

## `Extra`
## `Flag`

# intent-filter
## Intent matching  
System how to handle an `implicit intent` to start an activity?
- Action.
- Data (both URI and data type).
- Category.

## Refs
- https://developer.android.google.cn/reference/android/content/Intent.html
- [Intents and Intent Filters](https://developer.android.google.cn/guide/components/intents-filters#Types)
- Uri https://blog.csdn.net/harvic880925/article/details/44679239#
- Uri https://blog.csdn.net/baidu_31956557/article/details/79900311