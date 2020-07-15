# Debug RN

- Device + Emulator
- In debug RN mode, 设备可以访问到运行在 PC 的开发服务器的代码.
- 从 RN >=0.46 版本，RN 项目集成了 boost 编译库
- PC and device：使用同一个 Wifi/USB 连线

# Step 1 : Open USB debug

# Step 2 : Connect android device.

```
// must num = 1
adb devices
```

# Step 3 : Prepare react-native project

## Way 1 : Create new project

```
react-native init AwesomeProject
react-native init AwesomeProject --version 0.59.9
cd AwesomeProject
```

### 问题 1：`react-native init AwesomeProject`失败

当前目录不能已存在 `AwesomeProject` dir.

### 问题 2: When react-native init,下载依赖很慢

Fix：  
替换 npm 官方的源。  
npm 要设置 npm 镜像，否则，这个下载非常慢

```
#~/.npmrc
#  npm config set registry=http://registry.npm.taobao.org/
registry=http://registry.npm.taobao.org/
```

- 没有安装 yarn，提示安装 yarn => 忽略，下载继续，最终成功。

## Way 2 : Exist project

Git clone

```
npm install
```

### 问题 1：react-native run-android, BUILD SUCCESSFUL，但 app 界面出现红色错误：The development server returned response error code: 500

# Step 4 : Enable code syncing (PC -> Phone)

socket

```
Method 1:
// Android 5.0 >=,Then Shake device.
# defalut is 8081 port
adb reverse tcp:8081 tcp:8081		            // 1台android设备
adb -s <device_id> reverse tcp:8081 tcp:8081 .  // 多台android设备
```

```
Method 2:
// Android 5.0 <： 使用同一个Wi-Fi连接本地开发服务器(Debug server host for device)。
摇晃设备 / adb shell input keyevent 82
Dev Settings -> Debug server host for device -> 输入电脑的IP地址和端口号（10.0.1.1:8081/localhost:8081）
```

- 即使 Android >= 5.0,Method 1 和 Method 2 都设置。For some device, if only Method 1， crash when `react-native run-android` or reload code.

- adb reverse：adb 反向代理端口。  
  将调试电脑的 8081 端口反向代理 device，即电脑的某个端口映射到 Android 系统。  
  https://blog.csdn.net/omnispace/article/details/80018734

  手机中访问  
  http://localhost:8081  
  http://localhost:8081/debugger-ui/

# Step 5 : Start JS Server

```
# Start JS Server + install apk

# react native run-android 中封装了 adb reverse，默认 8081。
react-native run-android

react-native run-ios

react-native run-android --port 8092
react-native run-ios --port 8092
```

```
# Start JS Server + opened apk

// ios + android
react-native start
npm start
react-native start --port 8092

// Rest Metro Bundler cache
react-native start --reset-cache
npm start --reset-cache
```

- Run and Debug RN Android app

```
首次Android运行RN项目
react native run-android

再次Android运行RN项目
adb reverse tcp:8081 tcp:8081 + localhost:8081
run-native start
```

react-native start  
运行 React Packager（JS websocket server）  
已经安装 RN 应用，直接打开即可。

- Run and Debug RN IOS app

```
首次IOS运行RN项目
XCode

再次IOS运行RN项目
run-native start
```

- Android / IOS：  
  修改 RN 后，不需要编译，直接在手机上运行原来编译安装的项目。然后马上更新代码。=> 减少等待时间，提高开发调试效率  
  变更原生代码，要重新编译运行项目。  
  IP 地址变更后，要用编译项目一次。

- Metro Bundler JS Server  
  Running Metro Bundler (node) on port 8081 by default.  
  Keep Metro running while developing on any JS projects.

```
/node_modules/metro/src/index.js
/node_modules/ws/lib/WebSockerServer.js

# help
react-native start --help
react-native --help
```

- Menu / Refresh

```
Android:
Menu: Cmd + M
Refresh: R + R

Ios:
Menu: Cmd + D
Refresh: Cmd + R
```

- Do what when `react native run-android`?  
  ① 编译项目。第一次编译要下载依赖包，比较慢。  
  ② 将编译号的安装包安装到手机或模拟器中。  
  ③ 下载编译依赖包 gradle  
  `/android/gradle/wrapper/gradle-wrapper.properties`

## 问题 1 :`react-native run-android` always download gradle?

`\Users\yout_account\.gradle\wrapper\dists\⁨gradle-5.1.1-all\⁨97z1ksx6lirer3kbvdnh7jtjg⁩`

cancel `react-native run-android`,put gradle-5.1.1-all.zip

```
gradle-5.1.1-all.zip // Put
gradle-5.1.1-all.zip.lck
gradle-5.1.1-all.zip.part
```

Run again `react-native run-android`

```
gradle-5.1.1
gradle-5.1.1-all.zip.ok

gradle-5.1.1-all.zip  // unzip to gradle-5.1.1, then jump download
gradle-5.1.1-all.zip.lck
gradle-5.1.1-all.zip.part
```

## 问题 2: 8081 端口被占用(Error: listen EADDRINUSE)

```
error listen EADDRINUSE:address already in use :::8081, Run CLI with -- verbose flag fir more details
Error: Command failed:./gradlew app:installDebug -PreactNativeDevServerPort=8081
```

**Solution 1 : Check which process is using and kill it by pid**

```
// 查看当前用户的8081端口进程
lsof -i tcp:8081
// 查看当前用户的所有进程
lsof -PiTCP -sTCP:LISTEN
// 查看所有用户的所有进程，包含root
sudo lsof -PiTCP -sTCP:LISTEN

kill -9 pid
```

- 有时使用`lsof -i tcp:8081` 查不到谁在占用，就要用`sudo lsof -PiTCP -sTCP:LISTEN`查看。
- sunproxyadmin is [MaAFee](https://www.mcafee.com/consumer/en-us/store/m0/index.html?PIFld=-1&rfhs=1&ctst=1)  
  https://stackoverflow.com/questions/49877762/what-is-sunproxyadmin-service?r=SearchResults

**Solution 2 : Use another port**

```
react-native start --port 8092
```

## 问题 3：第一次使用`react-native run-android`运行成功，再使用 android studio 运行 app 成功。然后再次使用`react-native run-android`运行错误：

按照提示信息，依次消除各个 warning。

### 问题 4: `Application a has not been registered.`

app.js name = used ComponentName.

```
app.js
{
  "name": "test",
  "displayName": "test"
}
```

```
MainActivity.java
public class MainActivity extends ReactActivity {
    @Override
    protected String getMainComponentName() {
    //  return "a";   // ERROR: Application a has not been registered.
        return "test";
    }
}
```

# Step 6 : 打开“显示悬浮窗”的权限

## 问题 1 ：ERROR:某些 android 手机在初始化项目运行时出现`白屏`？

Reason:  
debug 需要打开“显示悬浮窗”的权限。初次打开时，手机会提示打开“显示悬浮窗””，要去用户同意。但因为某些手机对 Android 操作系统做了修改，在开发模式下不出现询问，导致程序运行时出现白屏。

Fix：  
手动打开“显示悬浮窗”的权限。  
显示悬浮窗口权限是为了调试应用而需要的权限。运行 release 版本，不需要此权限，

# Step 7 : Enable debug local code

- IOS 调试  
  `Command + T`:启用慢镜头调试动画，刷新界面很慢。再按一次，关闭该功能

# Refs:

- https://reactnative.cn/docs/running-on-device/
- [Homebrew](https://brew.sh/)
- [ReactNative ](http://facebook.github.io/react-native/)
- [ReactNative cn](https://reactnative.cn/)
- [Android studio 升级 3.0 后 ReactNative 打包报错 Could not find com.android.tools.build:gradle:3.0.0.](https://blog.csdn.net/qq_22653803/article/details/78380172)
