# Mac command

# Command Line Tools

## 什么是 Command Line Tools ？

Command Line Tools 是 Mac OS 中的命令行工具，是一个安装包，提供在终端使用的很多常见工具，实用程序和编译器。包括 svn，git，make，GCC，clang，perl，size，strip，strings，libtool，cpp，what 以及其他很多能够在 Linux 默认安装中找到的有用的命令。

## 如何安装？

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

# 1 mkdir

```
# p:parents.
# If not exit, create d/c => current dir/d/c
$ mkdir -p d/c
```

```
# If mkdir exit with 0, then run rm
# rm: remove all files in ios folder
$ mkdir -p _build/bundle/ios && rm -rf _build/bundle/ios/*
```

# 2 rm (Remove)

```
# -r: recycle; -f:force, no asking to user
# d/c/a.txt. Delete d and its children.

$ rm -rf d
```

# 3 IP address

```
$ ifconfig | grep "inet " | grep -v 127.0.0.1

inet 192.168.9.5489 netmask 0xffffff00 broadcast 192.168.9.7890
// inet 后面 192.168.9.5489 = IP

$ ifconfig
ifconfig显示网络接口的各种网络参数，但直接输入会显示许多不需要的数据，所以用grep进行过滤。
```

Mac 即使插入  网线不同，只要是同一个网络转接器，IP 地址相同。

# 4 sh

- `.sh`：Linux/unix 脚本文件
- `.bat`: 批处理（Batch），Dos/Windows, CMD.exe

```
# a.sh
ls

# a.sh is in current dir

$./a.sh
-bash: ./a.sh: Permission denied

$ chmod +x a.sh . // Add execute permission to a.sh

$ ./a.sh
a.sh	temp.txt	timg.jpeg
$ sh a.sh
a.sh hello.sh temp.txt timg.jpeg
```

# 5 `type -a`

Find full path of one command

```
$ type -a python
# python3.7
python is /Users/hades/opt/anaconda3/bin/python

# Python 2.7.10 (default installed in macOS )
python is /usr/bin/python
```

```
$ python --version
Python 3.7.4
```

# 6 chmod

权限管理命令 change the permissions mode of a file  
https://www.runoob.com/linux/linux-comm-chmod.html

- [u]user, [g]group, [o]others. [a]all
- +:增加权限、-:取消权限、=:唯一设定权限。
- r:可读，w:可写，x:可执行，X:只有当该文件是个子目录或者该文件已经被设定过为可执行。

```
# 对当前用户当前目录下的 file.sh 文件增加可执行权限。。
chmod u+x file.sh
```

# Refs

- https://www.runoob.com/linux/linux-shell.html
