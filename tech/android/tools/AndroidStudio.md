# Android Studio

# 1 [Logcat](as_logcat.md)

# 2 Delete Mac Android Studio

```
rm -Rf /Applications/Android\ Studio.app
rm -Rf ~/Library/Preferences/AndroidStudio*
rm -Rf ~/Library/Preferences/com.google.android.*
rm -Rf ~/Library/Preferences/com.android.*
rm -Rf ~/Library/Application\ Support/AndroidStudio*
rm -Rf ~/Library/Logs/AndroidStudio*
rm -Rf ~/Library/Caches/AndroidStudio*
rm -Rf ~/.AndroidStudio*
```

Delete all Android Studio projects (optional):

```
rm -Rf ~/AndroidStudioProjects
```

Delete Gradle files/cache:

```
rm -Rf ~/.android
```

Delete SDK tools:

```
rm -Rf ~/Library/Android*
```

# 3 配置

## Set proxy

Setting dialog -> search "proxy" , HTTP Proxy.  
Saved on
`User-Home/Library/Preferences/AndroidStudio/options/proxy.setting.xml`

## Change font size

![android_studio_change_font_sizes](https://yingvickycao.github.io/img/tools/android_studio/android_studio_change_font_sizes.jpg)

## 设置 Android Studio 行尾结束符

Editor -> Code Style -> Window = `\r\n` = CRLF`

## 设置注释的颜色

Preferences -> Editor -> Color Scheme -> Language Defaults -> "Comments", Block Comment / Line Comments, `#77B767`

## Android device is slow when debugging

- Set memory size  
  Android Studio -> Preferences -> Search "memory" -> Memory Settings. set max heep size.
- Set Gradle is offline work  
  Android Studio -> Preferences -> Build, Execution, Deployment -> Gradle -> Check "Offline work"
- Not use network.

## Speed up Android Studio

1 Check offf not usable plugins
2 K

# 4 Plugin

- [GsonFormat](https://github.com/zzz40500/GsonFormat)
- GitToolBox : 显示代码变动历史
- Markdown Preview Enhanced: Markdow 预览插件
  https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced  
  https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/
