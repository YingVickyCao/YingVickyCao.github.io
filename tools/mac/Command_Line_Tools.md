# Command Line Tools

# 1 什么是 Command Line Tools ？

Command Line Tools 是 Mac OS 中的命令行工具，是一个安装包，提供在终端使用的很多常见工具，实用程序和编译器。包括 svn，git，make，GCC，clang，perl，size，strip，strings，libtool，cpp，what 以及其他很多能够在 Linux 默认安装中找到的有用的命令。

# 2 如何安装？

安装 Xcode 时，默认不会安装 Command Line Tools.  
Xcode 依赖 Command Line Tools，安装 Xcode 的时候会弹出 Command Line Tools 的安装请求从而解决这个依赖。

Way 1 :

```
// 安装
xcode-select --install
// 使用默认设置
sudo xcode-select --reset
// 查看版本
xcode-select --version
```

出了问题需要卸载，然后重新安装时

```
// 卸载
rm -rf /Library/Developer/CommandLineTools
// 如果权限不够，加sudo
sudo rm -rf /Library/Developer/CommandLineTools
```

Way 2 :  
https://developer.apple.com/download/more/?=xcode  
Search "xcode 10.3"  
"Command Line Tools (macOS 10.14) for Xcode 10.3"
