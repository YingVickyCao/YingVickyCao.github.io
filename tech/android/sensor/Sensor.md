# 传感器
- 传感器 = 硬件 + 系统提供了驱动程序
- 传感器检测到外部环境变化 -> 数据 -> Android 系统 -> 监听器
- 简化Androd 开发人员的开发传感器：设置监听器  
```
SensorManager.registerListener(SensorEventListener listener, Sensor sensor,int rate)

rate:速度递减   
SENSOR_DELAY_FASTEST - 最快。极为耗电。不推荐  
SENSOR_DELAY_GAME - 适合游戏。适合对实时性要求较高的app   
SENSOR_DELAY_NORMAL - 正常频率。适合对实时性要求不高的app   
SENSOR_DELAY_UI - 延迟较大，省电。适合普通app。  

SensorManager.unregisterListener(SensorEventListener listener)
```
```
SensorEventListener{
// 传感器数值发生变化
void onSensorChanged(SensorEvent event);
// 传感器的精度发生变化
void onAccuracyChanged(Sensor sensor, int accuracy);
```
# 1. Check if have one sensor?
```
List<Sensor> = SensorManager.getSensorList(Sensor.TYPE_ALL)
Sensor = SensorManager.getDefaultSensor(Sensor.TYPE_GRAVITY)
```
# 2 传感器的种类
- Type 1 加速度传感器(Accelerometer)
- Type 2 陀螺仪传感器(gyroscope)
- Type 3 磁场传感器(magnetic field)
- Type 4 重力传感器 (Gravity)
- Type 5 线性加速度传感器(Linear Accelerometer)
- Type 6 温度传感器(ambient temperature)
- Type 7 光传感器(ambient light)
- Type 8 压力传感器(ambient air pressure)
- Type 9 接近传感器(proximity)
- Type 10 湿度传感器relative ambient humidity
- Type 11 旋转矢量传感器/旋转方向感应/旋转传感器（rotation vector）
- Type 12 心率传感器
Android >=5.0
- Type 13 方向传感器(orientation)

## Type 1 加速度传感器(Accelerometer)
- TYPE_ACCELEROMETER
- 返回在X，Y，Z方向上的加速度
- 返回的三个值:
```
1 = X
2 = Y
3 = Z
```
- 实现手机摇一摇
### 传感器的坐标器  
传感器的坐标器与屏幕的坐标器不同。   
传感器的坐标：   
X：沿着屏幕向右   
Y：沿着屏幕向上   
Z：沿着屏幕向外   

![Figure 1. Coordinate system (relative to a device) that's used by the Sensor API.](https://developer.android.google.cn/images/axis_device.png)  
Figure 1. Coordinate system (relative to a device) that's used by the Sensor API.

## Type 2 陀螺仪传感器(gyroscope)
- TYPE_GYROSCOPE.
- 作用是感知手机的围绕X/Y/X轴的旋转速度。
- 单位 = 弧度/秒。 正值代表逆时针旋转。负值代表顺时针旋转
- 返回的三个值:
```
1 = X
2 = Y
3 = Z
```
- 陀螺仪传感器的坐标系系统 = 加速度传感器坐标系统

## Type 3 磁场传感器(magnetic field)
- TYPE_MAGNETIC_FIELD
- 用于读取手机外部的磁场强度。即使周围没有任何直接的磁场，手机也始终处于地球磁场中。随之手机设备摆放状态的改变，周围磁场在手机的X/Y/Z方向上的影响也会变化。          
- 单位 = 微特斯拉(ut)
- 返回的三个值:
```
1 = X
2 = Y
3 = Z
```
## Type 4 重力传感器 (Gravity)
- TYPE_GRAVITY
- 用于显示手机在X/Y/Z方向上的重力强度。随之手机设备摆放状态的改变，周围磁场在手机的X/Y/Z方向上的影响也会变化。
- 返回的三个值:
```
1 = X
2 = Y
3 = Z
```
## Type 5 线性加速度传感器(Linear Accelerometer)
- TYPE_LINEAR_ACCELERATION
- 返回手机在X/Y/Z方向上的加速度。不包含重力加速度。   
加速度传感器 = 重力传感器 + 线性加速度传感器
- 返回的三个值:
```
1 = X
2 = Y
3 = Z
```
- 线性加速度传感器的坐标系系统 = 加速度传感器坐标系统

## Type 6 温度传感器(ambient temperature)
- TYPE_LINEAR_ACCELERATION
- 用于感知手机周围环境的温度
- 单位 = 摄氏度
- 返回的一个值

## Type 7 光传感器(ambient light)
- TYPE_LIGHT
- 用于获取手机周围环境的光强度
- 单位 = 勒克斯(lux)
- 返回的一个值

## Type 8 压力传感器(ambient air pressure)
- TYPE_PRESSURE
- 用于获取手机周围的压力
- 返回的一个值

## Type 12 心率传感器
- TYPE_HEART_RATE
- 用于获取佩戴该设备的人心跳数
- 单位 = 次数/每分钟
- 需要 BODY_SENSORS permission，否则 `SensorManager.getSensorList(Sensor.TYPE_ALL)` and `SensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE)` 不能获取该传感器
```
<uses-permission android:name="android.permission.BODY_SENSORS"/>
```
## Type 13 方位传感器(orientation)
- TYPE_ORIENTATION.
- 用于感应手机设备的摆放状态。
- 单位 = 度
- 返回的三个值:
```
1 = Z [0,360]
2 = X [-180,180]
3 = Y [-90,90]
```
- 借助于方向传感器，开发出指南针，水平仪等。

![TYPE_ORIENTATION_1.JPG](https://yingvickycao.github.io/img/android/sensor/TYPE_ORIENTATION_1.JPG)

![TYPE_ORIENTATION_2.JPG](https://yingvickycao.github.io/img/android/sensor/TYPE_ORIENTATION_2.JPG)


![TYPE_ORIENTATION_X.JPG](https://yingvickycao.github.io/img/android/sensor/TYPE_ORIENTATION_X.JPG)

![TYPE_ORIENTATION_Y.JPG](https://yingvickycao.github.io/img/android/sensor/TYPE_ORIENTATION_Y.JPG)

![TYPE_ORIENTATION_Z.JPG](https://yingvickycao.github.io/img/android/sensor/TYPE_ORIENTATION_Z.JPG)

### 指南针
方向传感器 - Z

### 水平仪
- 计算气泡的x和y坐标
```
X轴 - 上下旋转 -> x坐标
Y轴 - 左右旋转 -> y坐标
```
- 自定义View  
绘制透明圆盘和气泡。根据计算出的气泡的x和y坐标动态改变气泡位置。

# 3 Sensor TYPE
`Sensor.java`
```
TYPE_ALL = -1：所有的传感器 

=> 34

TYPE_ACCELEROMETER = 1：加速度计 
TYPE_MAGNETIC_FIELD = 2：磁场传感器 
TYPE_ORIENTATION = 3：方向传感器，在API8中已弃用 
TYPE_GYROSCOPE = 4：陀螺仪 
TYPE_LIGHT = 5：光照强度传感器 
TYPE_PRESSURE = 6：压力传感器
TYPE_TEMPERATURE = 7
TYPE_PROXIMITY = 8：距离传感器 
TYPE_GRAVITY = 9：重力传感器 
TYPE_LINEAR_ACCELERATION = 10：线性加速度计 
TYPE_ROTATION_VECTOR = 11：旋转矢量传感器
TYPE_RELATIVE_HUMIDITY = 12：相对湿度传感器 
TYPE_AMBIENT_TEMPERATURE = 13：环境温度 
TYPE_MAGNETIC_FIELD_UNCALIBRATED = 14：未校准的磁场传感器 
TYPE_GAME_ROTATION_VECTOR = 15：未校准的旋转矢量传感器 
TYPE_GYROSCOPE_UNCALIBRATED = 16 未校准的陀螺仪 
TYPE_SIGNIFICANT_MOTION = 17：重要运动触发传感器 
TYPE_STEP_DETECTOR = 18：计步检测器
TYPE_STEP_COUNTER = 19：计步计数器 
TYPE_GEOMAGNETIC_ROTATION_VECTOR = 20：地磁旋转矢量传感器 
TYPE_HEART_RATE = 21：心率传感器 
TYPE_TILT_DETECTOR = 22 倾斜探测器，隐藏的systemApi
TYPE_WAKE_GESTURE = 23  唤醒手势传感器，隐藏的systemApi
TYPE_GLANCE_GESTURE = 24 快速手势，隐藏的systemApi
TYPE_PICK_UP_GESTURE = 25 设备抬起手势，隐藏的systemApi
TYPE_WRIST_TILT_GESTURE = 26 腕关节抬起手势，隐藏的systemApi
TYPE_DEVICE_ORIENTATION = 27 设备方向传感器，隐藏的systemApi
TYPE_POSE_6DOF = 28：具有6个自由度的姿势传感器 
TYPE_STATIONARY_DETECT = 29 静止状态传感器 
TYPE_MOTION_DETECT = 30：运动检测传感器 
TYPE_HEART_BEAT = 31：运动检测传感器 
TYPE_DYNAMIC_SENSOR_META = 32   传感器动态添加和删除，隐藏的systemApi
no 33 
TYPE_LOW_LATENCY_OFFBODY_DETECT = 34    低延迟身体检测传感器
TYPE_ACCELEROMETER_UNCALIBRATED = 35    加速度传感器(未经校准)
```

# 4 Tip
- 别忘记注销。
- 不要阻塞onSensorChanged方法。
- 避免使用过时的方法或传感器类型。
- 在使用前先验证传感器是否存在。
- 谨慎选择传感器延时。

# Refs
- https://developer.android.google.cn/guide/topics/sensors/sensors_overview?hl=en
- https://www.2cto.com/kf/201412/359292.html
- https://www.jianshu.com/p/bce739130a2e
- https://www.cnblogs.com/jack2010/p/6182329.html