# Finder

# 1. 开启或关闭显示隐藏文件命令?

打开终端，输入：  
方式 1:

```
// 显示隐藏文件
defaults write com.apple.finder AppleShowAllFiles -bool true

// 关闭显示隐藏文件
defaults write com.apple.finder AppleShowAllFiles -bool false

命令运行之后需要重新加载Finder：
快捷键option+command+esc，选中Finder，重新启动即可
```

- https://zhidao.baidu.com/question/1989088190789705787.html
- http://jingyan.baidu.com/article/86fae346947c453c48121a66.html

方式 2:
`Shift + Command + .`

# 2. Finder 标题栏显示当前文件夹完整路径?

Way 1 ：

```
// 显示文件夹完整路径
defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES

// 隐藏文件夹完整路径
defaults write com.apple.finder _FXShowPosixPathInTitle -bool NO
```

Way 2 ：
Finder 中 选中 File，Finder 下边显示路径  
Finder -> View -> Show Path Bar.

# 3 Pressed 空格：预览
