# Logcat

# ERROR:`/eglCodeCommon: glUtilsParamSize:unkown param ox000085b5`

- Solution 1 : 模拟器的“使用主机 GPU”设置
- Solution 2 : Logcat 过滤器过滤掉错误,不显示。`^(?! eglCodecCommon)`

http://www.voidcn.com/article/p-podhuaji-bsk.html
