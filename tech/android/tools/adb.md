# adb

```
# Nexus 5X =  Press 电源键+音量键（下） 2s
$ adb pull /sdcard/Pictures/Screenshots Screenshots

# SamSung Galaxy S8
# SamSung Galaxy S10
$ adb pull /sdcard/DCIM/Screenshots Screenshots

# SamSung T819C
$ adb pull /storage/emulated/0/DCIM/Screenshots Screenshots
```

# adb command

| adb command                                                                                                                                                                                           | Desc                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------- |
| `adb shell cat /proc/cpuinfo`                                                                                                                                                                         | 查看 CPU 信息                                                                      |
| `adb shell getprop`                                                                                                                                                                                   | 查看系统所有的配置信息                                                             |
| `adb shell getprop                                                                                                                                                                                    | grep arm`                                                                          | 查看 CPU 处理器类型 |
| `adb shell getprop ro.product.cpu.abi`                                                                                                                                                                | Check CPU abi 信息                                                                 |
| `adb shell getprop ro.product.cpu.abilist`                                                                                                                                                            | CPU 支持的 abi 列表                                                                |
| `adb shell getprop                                                                                                                                                                                    | grep density`<br/>`adb shell getprop ro.sf.lcd_density`<br/>`adb shell wm density` | 查看屏幕密度        |
| `adb shell wm size`                                                                                                                                                                                   | 查看屏幕尺寸                                                                       |
| `adb shell getprop ro.product.device`<br/>`adb shell getprop ro.product.model` <br/> `adb shell getprop ro.product.name`<br/>`adb shell getprop ro.serialno`<br/>`adb shell getprop ro.product.brand` | 查看手机型号等相关信息                                                             |
| `adb shell dumpsys battery`                                                                                                                                                                           | 电池状况                                                                           |
| `adb shell dumpsys window displays`                                                                                                                                                                   | 显示屏参数                                                                         |
| `ro.build.version.sdk`                                                                                                                                                                                | SDK 版本                                                                           |
| `ro.build.version.release`                                                                                                                                                                            | Android 系统版本                                                                   |
| `ro.build.version.security_patch`                                                                                                                                                                     | Android 安全补丁程序级别                                                           |
| `adb shell getprop dalvik.vm.heapsize`                                                                                                                                                                | 每个应用程序的内存上限                                                             |
| `adb shell cat /proc/meminfo`                                                                                                                                                                         | 内存信息                                                                           |
| `adb shell settings get secure android_id`                                                                                                                                                            | 查看 android_id                                                                    |

- ABI  
  ABI（Application Binary Interface，应用程序二进制接口）：应用程序二进制接口，描述了应用程序和操作系统之间。  
  ABI 定义编译好的目标代码与系统之间的接口。

- API  
  应用程序接口（Application Programming Interface，API），又称为应用编程接口.  
  API 定义了源代码和库之间的接口.

# `adb shell cat /proc/cpuinfo`

```
# Pixel 3
# processor0～7:处理器是8核;手机架构看CPU architecture项，8表示是arm64-v8a。
# Processor:CPU architecture(手机架构)是AArch64,对应arm64-v8a

$ adb shell cat /proc/cpuinfo
Processor	: AArch64 Processor rev 12 (aarch64)
processor	: 0
BogoMIPS	: 38.00
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0x7
CPU part	: 0x803
CPU revision	: 12

processor	: 1
BogoMIPS	: 38.00
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0x7
CPU part	: 0x803
CPU revision	: 12

processor	: 2
BogoMIPS	: 38.00
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0x7
CPU part	: 0x803
CPU revision	: 12

processor	: 3
BogoMIPS	: 38.00
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0x7
CPU part	: 0x803
CPU revision	: 12

processor	: 4
BogoMIPS	: 38.00
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0x6
CPU part	: 0x802
CPU revision	: 13

processor	: 5
BogoMIPS	: 38.00
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0x6
CPU part	: 0x802
CPU revision	: 13

processor	: 6
BogoMIPS	: 38.00
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0x6
CPU part	: 0x802
CPU revision	: 13

processor	: 7
BogoMIPS	: 38.00
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0x6
CPU part	: 0x802
CPU revision	: 13

# Qualcomm = 美国高通公司
Hardware	: Qualcomm Technologies, Inc SDM845
```

```
# SM-T830
$ adb shell cat /proc/cpuinfo
Processor	: AArch64 Processor rev 4 (aarch64)
processor	: 0
BogoMIPS	: 38.40
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0xa
CPU part	: 0x801
CPU revision	: 4

processor	: 1
BogoMIPS	: 38.40
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0xa
CPU part	: 0x801
CPU revision	: 4

processor	: 2
BogoMIPS	: 38.40
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0xa
CPU part	: 0x801
CPU revision	: 4

processor	: 3
BogoMIPS	: 38.40
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0xa
CPU part	: 0x801
CPU revision	: 4

processor	: 4
BogoMIPS	: 38.40
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0xa
CPU part	: 0x800
CPU revision	: 1

processor	: 5
BogoMIPS	: 38.40
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0xa
CPU part	: 0x800
CPU revision	: 1

processor	: 6
BogoMIPS	: 38.40
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0xa
CPU part	: 0x800
CPU revision	: 1

processor	: 7
BogoMIPS	: 38.40
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32
CPU implementer	: 0x51
CPU architecture: 8
CPU variant	: 0xa
CPU part	: 0x800
CPU revision	: 1

Hardware	: Qualcomm Technologies, Inc MSM8998
```

# `adb shell getprop|grep arm`

```
$ adb shell getprop|grep arm
# 等价于
# $ adb shell
# $ getprop|grep arm

# Pixel 3

[dalvik.vm.isa.arm.features]: [default]
[dalvik.vm.isa.arm.variant]: [kryo385]
[dalvik.vm.isa.arm64.features]: [default]
[dalvik.vm.isa.arm64.variant]: [kryo385]
[ro.build.host]: [abfarm834]
[ro.config.alarm_alert]: [Bright_morning.ogg]
[ro.product.cpu.abi]: [arm64-v8a]
[ro.product.cpu.abilist]: [arm64-v8a,armeabi-v7a,armeabi]
[ro.product.cpu.abilist32]: [armeabi-v7a,armeabi]
[ro.product.cpu.abilist64]: [arm64-v8a]
blueline:/ $
```

```
# SM-T830
$ adb shell
gts4lwifichn:/ $ getprop|grep arm
[dalvik.vm.isa.arm.features]: [default]
[dalvik.vm.isa.arm.variant]: [cortex-a73]
[dalvik.vm.isa.arm64.features]: [default]
[dalvik.vm.isa.arm64.variant]: [generic]
[persist.sys.omc.alarm]: []
[ro.config.alarm_alert]: [Morning_Glory.ogg]
[ro.config.notification_sound_2]: [S_Charming_Bell.ogg]
[ro.product.cpu.abi]: [arm64-v8a]
[ro.product.cpu.abilist]: [arm64-v8a,armeabi-v7a,armeabi]
[ro.product.cpu.abilist32]: [armeabi-v7a,armeabi]
[ro.product.cpu.abilist64]: [arm64-v8a]
[ro.vendor.product.cpu.abilist]: [arm64-v8a,armeabi-v7a,armeabi]
[ro.vendor.product.cpu.abilist32]: [armeabi-v7a,armeabi]
[ro.vendor.product.cpu.abilist64]: [arm64-v8a]
gts4lwifichn:/ $
```

<h1 id="adb_abi">adb shell getprop ro.product.cpu.abi</h1>

```
# Pixel 3
$ adb shell getprop ro.product.cpu.abi
arm64-v8a
```

```
# SM-T830
$ adb shell getprop ro.product.cpu.abi
arm64-v8a
```

# CPU 支持的 abi 列表

```
# Pixel 3
$ adb shell getprop ro.product.cpu.abilist
arm64-v8a,armeabi-v7a,armeabi
```

# 查看屏幕密度

```
# Pixel 3
$ adb shell getprop ro.sf.lcd_density
440

$ adb shell getprop | grep density
[ro.sf.lcd_density]: [440]

// get
$ adb shell wm density
Physical density: 440

// reset
$ adb shell wm density reset

// set.不改变app运行时要使用哪个文件夹：layout/layout-xlarge/layout-large.仅改变显示效果
$ adb shell wm density 600
```

# 查看屏幕尺寸

```
# Pixel 3

// get
$ adb shell wm size
Physical size: 1080x2160

// reset
$ adb shell wm size reset

// set.不改变app运行时要使用哪个文件夹：layout/layout-xlarge/layout-large.仅改变显示效果
$ adb shell wm size 1920x2560
```

# 查看手机型号等相关信息

```
# Pixel 3

# 设备名称
$ adb shell getprop ro.product.device
blueline

# 设备名称
$ adb shell getprop ro.product.name
blueline

# 设备内部代号
$ adb shell getprop ro.product.model
Pixel 3

# 设备序列号
$ adb shell getprop ro.serialno
8CAX1LCYY

# 手机品牌
$ adb shell getprop ro.product.brand
google
```

# 电池状况

```
# Pixel 3
$ adb shell dumpsys battery
Current Battery Service state:
  AC powered: true
  USB powered: false
  Wireless powered: false
  Max charging current: 1500000
  Max charging voltage: 5000000
  Charge counter: 2996000
  status: 5
  health: 2
  present: true
  level: 100
  scale: 100
  voltage: 4371
  temperature: 215
  technology: Li-ion
```

# 显示屏参数

```
# Pixel 3
$ adb shell dumpsys window displays
WINDOW MANAGER DISPLAY CONTENTS (dumpsys window displays)
  Display: mDisplayId=0
    init=1080x2160 440dpi cur=1080x2160 app=1080x2028 rng=1080x1014-2028x1962
    deferred=false mLayoutNeeded=false mTouchExcludeRegion=SkRegion((0,0,1080,2160))

#  mDisplayId 为 显示屏编号，
# init 是初始分辨率和屏幕密度，app 的高度比 init 里的要小，表示屏幕底部有虚拟按键，高度为 2160 - 2028 = 132px 合 45dp
```

# SDK 版本

```
# Pixel 3
$ adb shell getprop ro.build.version.sdk
29
```

# Android 系统版本

```
# Pixel 3
$ adb shell getprop ro.build.version.release
10
```

# Android 安全补丁程序级别

```
# Pixel 3
$ adb shell getprop ro.build.version.security_patch
2019-10-05
```

# 每个应用程序的内存上限

```
# Pixel 3
$ adb shell getprop dalvik.vm.heapsize
512m
```

# 内存信息

```
# Pixel 3
$ adb shell cat /proc/meminfo
MemTotal:        3631712 kB
MemFree:          160668 kB
MemAvailable:    1987920 kB
Buffers:          191156 kB
Cached:          1747812 kB
SwapCached:        14472 kB
Active:           846360 kB
Inactive:        1355248 kB
Active(anon):     160744 kB
Inactive(anon):   306124 kB
Active(file):     685616 kB
Inactive(file):  1049124 kB
Unevictable:      202276 kB
Mlocked:          202276 kB
SwapTotal:       2097148 kB
SwapFree:        1497156 kB
Dirty:               280 kB
Writeback:             0 kB
AnonPages:        459388 kB
Mapped:           593028 kB
Shmem:              2640 kB
Slab:             272148 kB
SReclaimable:      84184 kB
SUnreclaim:       187964 kB
KernelStack:       44832 kB
ShadowCallStack:    2804 kB
PageTables:        62556 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
ION_heap:         226960 kB
ION_page_pool:    123744 kB
WritebackTmp:          0 kB
CommitLimit:     3913004 kB
Committed_AS:   74763360 kB
VmallocTotal:   263061440 kB
VmallocUsed:           0 kB
VmallocChunk:          0 kB
CmaTotal:         204800 kB
CmaFree:              64 kB
```

# 查看 android_id

```
# Pixel 3
$ adb shell settings get secure android_id
a7a81e6eef8408e7
```

# adb shell getprop

# print log to terminal

```
adb logcat -v time
adb logcat -v time > D:\log.txt
adb logcat -c
```

# `adb shell dumpsys package queries`

https://blog.csdn.net/wenzhi20102321/article/details/81058196
System packages that are visible automatically  
https://developer.android.google.cn/training/package-visibility

# open link to test if can reslove to app

- `adb shell am start -a android.intent.action.VIEW -d "https://6c04-114-87-148-43.ngrok.io/recipe/"`

# `aapt dump badging xxx.apk` List permission of app

# Query the verification state of the domains

`adb shell pm get-app-links --user cur PACKAGE_NAME`
Ref:  
https://domain.name/.well-known/assetlinks.json  
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://domain.name&relation=delegate_permission/common.handle_all_urls

# FAQ

- Q : `add install app-debug.apk` adb: failed to install app-debug.apk: Failure [INSTALL_FAILED_TEST_ONLY: installPackageLI]

  Why : 为什么 Android Studio 直接部署 debug apk，但是 adb install 就有问题呢？  
  Android Studio 直接部署 debug apk，会自动在 AndroidManifest.xml 的 application 标签自动添加 android:debuggable="true" 和 android:testOnly="true”，在安装时加上了-t flag。  
  android:testOnly=“true” 用来标记测试用的，所以带这个标记的 adb install 不能安装上。

  解决：  
  Way 1 : -t：允许安装测试 APK (Recommended)

  ```
  add install -t app-debug.apk
  ```

  Way 2 : 禁止 android studio 3.0 自动添加 android:testOnly=“true”

  ```xml
  <!-- gradle.properties -->
  android.injected.testOnly = false
  ```

  https://blog.csdn.net/u011489043/article/details/100063606
