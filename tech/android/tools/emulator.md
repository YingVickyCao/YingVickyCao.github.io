# emulator

Mac

- `emulator -version`
- `emulator -help`
- `emulator -list-avds`
- `emulator -avd avd_name`

# ERROR

- `emulator -avd error : [4454155776]:ERROR:android/android-emu/android/qt/qt_setup.cpp:28:Qt library not found at ../emulator/lib64/qt/lib`

```
$ emulator -avd P7_24
/
$ emulator -avd P7_24 -http-proxy http://192.168.1.5:8888
[4454155776]:ERROR:android/android-emu/android/qt/qt_setup.cpp:28:Qt library not found at ../emulator/lib64/qt/lib
Could not launch '/Users/hades/../emulator/qemu/darwin-x86_64/qemu-system-x86_64': No such file or directory
```

Reason :  
调用了$ANDROID_HOME/tools 目录下的 emulator

Fix:
$ANDROID_HOME/emulator 中的 emulator

```
ANDROID_HOME="/Users/yourname/Library/Android/sdk"
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools

alias emulator=${ANDROID_HOME}/emulator/emulator
```
