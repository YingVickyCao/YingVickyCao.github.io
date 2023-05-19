# GPS
- GPS = Global Positing System（全球定位系统），作用是是为全球的物体提供定位功能。

- GPS定位系统的由3部分组成。   
1：GPS卫星组成的空间部分，覆盖于全球上空。  
2：N多地球站组成的控制部分。  
3：普通用户的接受机。手机就是其中一种接收机。  

- GPS定位需要手机的硬件支持GPS功能。  
- Android 为支持GPS提供了LocationManager类，LocationManager管理类和产生GPS相关的类。
- Android >= 6.0, 运行时权限 Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION
- GPS 与地图结合。 GPS把位置信息显示在地图上 -> 导航系统

# 1 API

## LocationManager
```
//  获取 Location Provider
List<String> getAllProviders() 
List<String> getProviders(boolean enabledOnly)
LocationProvider getProvider(String name)
List<String> getProviders(Criteria criteria, boolean enabledOnly) // Criteria设置是选择Location Provider的条件
String getBestProvider(Criteria criteria, boolean enabledOnly)

// 获取最近一次Location
Location getLastKnownLocation(String provider)
Location getLastLocation()

GpsStatus getGpsStatus(GpsStatus status)
boolean addGpsStatusListener(GpsStatus.Listener listener)
void removeGpsStatusListener(GpsStatus.Listener listener)

boolean isProviderEnabled(String provider)

LocationListener:接受不断传来的信息
LocationRequest：接受通过合并各种源的信息
PendingIntent：接受信息后，执行延迟动作
void requestLocationUpdates(LocationRequest request, PendingIntent intent)
void requestLocationUpdates(..., LocationRequest, LocationListener)
void requestLocationUpdates(....,  LocationRequest, PendingIntent)
void requestLocationUpdates(....,  LocationListener)
removeLocationUpdates(...)

// 临近警告：手机不断接近临近指定固定点。当与该点距离小于执行范围时，触发 PendingIntent 处理 => 没有再现
void addProximityAlert(double latitude, double longitude, float radius, long expiration,PendingIntent)
void removeProximityAlert(PendingIntent)
```

![gps_proximity_alert.jpg](https://yingvickycao.github.io/img/android/gps/gps_proximity_alert.jpg)

### Location Provider 种类
#### String NETWORK_PROVIDER = "network" 网络定位
基于Wifi/基站等信息定位

- 基于无线网络WiFi定位

使用无线网络WiFi接入点提供位置信息---比GPS硬件更省电

1、每一个无线AP（路由器）都有一个全球唯一的MAC地址,并且一般来说无线AP在一段时间内不会移动；  
2、设备在开启Wi-Fi的情况下,即可扫描并收集周围的AP信号，无论是否加密,是否已连接，甚至信号强度不足以显示在无线信号列表中，都可以获取到AP广播出来的MAC地址；  
3、设备将这些能够标示AP的数据发送到位置服务器,服务器检索出每一个AP的地理位置,并结合每个信号的强弱程度,计算出设备的地理位置并返回到用户设备；  
4、位置服务商要不断更新、补充自己的数据库，以保证数据的准确性。  

- 基于基站定位   
第一种基站定位和GPS类似使用三角定位。移动设备通过电磁波在三个基站中转所需时间计算出设备所在坐标（基站的位置是固定的）  
第二种则是利用获取最近的基站的信息，其中包括基站 id，location area code、mobile country code、mobile network code和信号强度，将这些数据发送到google的定位web服务里，就能拿到当前所在的位置信息，误差一般在几十米到几百米之内。其中信号强度这个数据很重要。

#### String GPS_PROVIDER = "gps" GPS定位
- 传统GPS ：同步 
利用多个GPS卫星到接收器的距离，确定当前的位置（经度、维度、海拔等）。  
优点：精确  
缺点：定位耗时长，耗电，不能有遮盖物（室内不可以使用）  

- A-GPS (Assisted GPS,辅助全球卫星定位系统)    
GSM / GPRS  + 传统卫星定位   

    A-GPS基本思想是通过在卫星信号接收效果较好的位置上设置若干参考GPS接收机，并利用AGPS服务器通过与终端的交互获得终端的粗位置，然后通过移动网络将该终端需要的星历和时钟等辅助数据发送给终端，由终端进行GPS定位测量。测量结束后，终端可自行计算位置结果或者将测量结果发回到AGPS服务器，服务器进行计算并将结果发回给终端。同时后台SP可获取位置信息为其它服务应用。  
    
    优点：精确，定位快，耗电，不能有遮盖物（室内可以使用）      

#### String PASSIVE_PROVIDER = "passive" 被动定位
从其他应用中获得请求得到的位置信息

#### String FUSED_PROVIDER = "fused" 组合定位    
This provider combines inputs for all possible location sources to provide the best possible Location fix. It is implicitly used for all API's that involve the {@link LocationRequest} object.

## LocationProvider
```
boolean supportsAltitude()  // 高度
boolean supportsSpeed()     // 速度 
boolean supportsBearing()   // 方向

boolean requiresNetwork()   // 网络数据
boolean requiresSatellite() // 访问基于GPS定位系统？
boolean requiresCell()      // 网络基站

 boolean hasMonetaryCost()  // 收费？
 
 int getAccuracy()          // 精度？
```

## Location
```
boolean hasAccuracy()  // 精度？
boolean hasAltitude()  // 高度？
boolean hasSpeed()     // 速度？ 
boolean hasBearing()   // 方向？
```

## Criteria

# 2 常见使用
```
 Samsung SM-G9730: Not Produced
 Android emulator：send mock data，Produced
```      
- last Location // 最近一次
- requestLocationUpdates    // 持续接受
- addProximityAlert // 临近警告。手机 and emulator 

# 3 Migrate
framework location APIs -> Google Play services - Fused Location Provider API  
目前两种方式都能使用。

# Refs:
- https://developers.google.cn/location-context/
- https://developers.google.cn/location-context/fused-location-provider/
- https://developer.android.google.cn/guide/topics/location/migration?hl=en