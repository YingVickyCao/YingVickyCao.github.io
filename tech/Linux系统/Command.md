# Linux 命令

- 命令行（Command Line）： （Linux 作为服务方）相当于我们请求服务使用的专业术语。  
- CLI and GUI    
CLI（command-line interface，命令行界面）        
GUI（Graphical User Interface，图形用户接口/图形用户界面）        
“图形用户界面让简单的任务更容易完成， 而命令行界面使完成复杂的任务成为可能”    
- Platform    
Unix / Linux / MacOS X / Windows  


# 1 用户与密码

管理员账户：
OS 默认有一个系统管理员，它的权限很大，它拥有最高的操作权限，可以在系统上干任何事。  
 Linux 默认有一个 Root，Windows 有 Administrator。

系统是有分组的。
Windows 有 “Administrator 组” / “Guests 组” / “Power User 组”
Linux 中也有分组。创建用户时，没有说加入哪个组，默认会创建一个同名的组。

- Linux 的使用模式：“命令行 + 文件”模式。
  Windows 是 “图形化界面 + 菜单”
- 查看命令 :-h / man

```
e.g.,

useradd -h
/
man useradd
```

- 命令行开头

```
// normal account
[cos@localhost ~]$

// root account
[root@localhost ~]#
```

- `passwd` : Change password

```
$ passwd
Changing password for user cos.
Current password:
New password:
```

- `useradd` : Use root to create another account

```
useradd test
```

创建的用户，放在 /etc/passwd. 组的信息，放在/etc/group

```
$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
...
cos:x:1000:1000:cos:/home/cos:/bin/bash
```

x 的地方应该是密码。密码没有显示在这里。
接下来的是用户 ID 1000 和 组 ID 1000。
/root 和 /home/cos，是 root 用户和 cos 用户的主目录。什么是主目录？主目录是用户登陆进去后默认的路径。类似，Windows，C:\Users\cos
/bin/bash 的位置是用于配制登陆后的默认交互命令行。Linux 登陆后的交互命令行是一个解析脚本的程序，这里配置的是/bin/bash。不同的是，Windows，登陆进去是界面，也就是程序 explorer.

```
$ cat /etc/group
root:x:0:
...
cos:x:1000:
```

# 2 浏览文件

- cd : change directory，切换目录
  Windows，同 cd。

```
cd .  切换到当前目录
cd .. 切换到上一级
```

## ls: list,列出目录下的文件

Windows，dir。

```
$ ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos

// 以列表的方式列出文件


$ ls -l
total 4
-rw-r--r--. 1 cos cos 7 Jan 12 21:26 1.txt

# ls -l
total 40
-rw-r--r--. 1 cos  cos  29290 Jan 12 21:56 1.txt
-rw-r--r--. 1 root root    12 Jan 17 21:29 hello.txt
-rw-r--r--. 1 cos  cos     54 Jan 17 21:36 out.file.txt
```

分析 ls -l：  
（1）第一个字段的第一个字符：文件类型。  
“-”表示普通文件。  
“d”表示目录  
（2）第一个字段的剩下 9 个字符是模式，即“权限位”（access permission bits）。
3 个一组，每一组表示“读（r，read）”“写（w，write）”“执行（x，execute）”。如果是字母，有这个权限；如果是横向，没有这个权限。  
这三组分别表示文件所属的用户权限、文件所属的组权限、其他用户的权限。  
更改权限，用 chmod。  
（3）第 2 个字段是硬连接（hard link）数目  
（4）第 3 个字段是所属用户  
（5）第 4 个字段是所属组  
（6）第 5 个字段是文件的大小  
（7）第 6 个字段是文件被修改的日期  
（8）最后一个是文件名

```
]# ls -lh
total 40K
-rw-r--r--. 1 cos  cos  29K Jan 12 21:56 1.txt
-rw-r--r--. 1 root root  12 Jan 17 21:29 hello.txt
-rw-r--r--. 1 cos  cos   54 Jan 17 21:36 out.file.txt
```

```
// 显示隐藏文件
# ls -al
total 32
drwx------. 14 cos  cos  4096 Jan 13 23:10 .
drwxr-xr-x.  3 root root   17 Jan  5 13:54 ..
-rw-r--r--.  1 cos  cos    18 Nov 24 22:20 .bash_logout
-rw-r--r--.  1 cos  cos   492 Nov 24 22:20 .bashrc
drwxr-xr-x. 11 cos  cos  4096 Jan 13 08:38 .cache
...
```

```
// Long format list sorted by size (descending)
# ls -lS
total 40
-rw-r--r--. 1 cos  cos  29290 Jan 12 21:56 1.txt
-rw-r--r--. 1 cos  cos     54 Jan 17 21:36 out.file.txt
-rw-r--r--. 1 root root    12 Jan 17 21:29 hello.txt

```

```
// Long format list of all files, sorted by modification date (oldest first)
 # ls -ltr
total 40
-rw-r--r--. 1 cos  cos  29290 Jan 12 21:56 1.txt
-rw-r--r--. 1 root root    12 Jan 17 21:29 hello.txt
-rw-r--r--. 1 cos  cos     54 Jan 17 21:36 out.file.txt

```

- chmod：更改文件权限

```
chmod 711 Downloads
```

# 3 安装软件

## 没有软件管家的情况

- 下载列表

```
Product/File Description  |    Download
--------------------------------------
Linux                         .deb
Linux                         .rpm
Linux                         .tar.gz
Windows                       .exe
Windows                       .zip
```

- Linux 的软件安装包可以下载 rpm 或 deb。  
  Linux 常用的有两大体系，CentOS 用 rpm，Ubuntu 用 deb。

- Linux 上安装软件不能通过双击安装，用命令。

```
// -i，install
rpm  -i XXX.rpm
dpkg -i XXX.deb
```

- Linux 上查看安装的软件列表

```
// -q,query; a,all
rpm -qa

/// -l, list
dpkg -l
```

Example:

```
$ rpm -qa
...
libertas-sd8787-firmware-20221214-129.el9.noarch
netronome-firmware-20221214-129.el9.noarch
dejavu-serif-fonts-2.37-18.el9.noarch
google-noto-emoji-color-fonts-20211102-1.el9.noarch
jomolhari-fonts-0.003-34.el9.noarch
julietaula-montserrat-fonts-7.210-6.el9.noarch
khmer-os-system-fonts-5.0-36.el9.noarch
...
```

输出结果是一个非常长的列表，很难找到你安装的软件。  
如果知道安装的软件包含某个关键字，用 搜索工具 grep。

Example:

```
// | 是管道，用于连接两个程序
// rpm -qa 的输出放到管道里面，然后作为grep的输入，grep将在里面进行搜索带关键字google的行，并输出出来
$ rpm -qa | grep google
google-noto-fonts-common-20201206-4.el9.noarch
google-noto-cjk-fonts-common-20201206-4.el9.noarch
```

Example:同理 dpkg 也能找到。

```
$ dpkg -l| grep google
```

Example : 如果不知道关键字，还可以将很长的结果分页展示出来，分页找。

```
$ rpm -qa | more
```

- 删除软件

```
// e, erase
rpm -e
/
// r,rmove
dpkg -r
```

## 有软件管家的情况

- Linux 有软件管家。CentOS 有 yum，Ubuntu 有 apt-get
- 根据关键字搜索 `yum search` / `apt-cache search`
  Example : 搜索 jdk

```
yum search jdk
/
apt-cache search jdk
```

```
$ yum search jdk
CentOS Stream 9 - BaseOS                                                                                                                                          3.4 MB/s | 6.0 MB     00:01
CentOS Stream 9 - AppStream                                                                                                                                       5.8 MB/s |  16 MB     00:02
CentOS Stream 9 - Extras packages                                                                                                                                 9.2 kB/s |  10 kB     00:01
Last metadata expiration check: 0:00:01 ago on Fri 13 Jan 2023 08:27:08 AM CST.
================================================================================== Name & Summary Matched: jdk ===================================================================================
copy-jdk-configs.noarch : JDKs configuration files copier
java-1.8.0-openjdk.x86_64 : OpenJDK 8 Runtime Environment
java-1.8.0-openjdk-demo.x86_64 : OpenJDK 8 Demos
java-1.8.0-openjdk-devel.x86_64 : OpenJDK 8 Development Environment
java-1.8.0-openjdk-headless.x86_64 : OpenJDK 8 Headless Runtime Environment
java-1.8.0-openjdk-javadoc.noarch : OpenJDK 8 API documentation
java-1.8.0-openjdk-javadoc-zip.noarch : OpenJDK 8 API documentation compressed in a single archive
java-1.8.0-openjdk-src.x86_64 : OpenJDK 8 Source Bundle
java-11-openjdk.x86_64 : OpenJDK 11 Runtime Environment
java-11-openjdk-demo.x86_64 : OpenJDK 11 Demos
java-11-openjdk-devel.x86_64 : OpenJDK 11 Development Environment
java-11-openjdk-headless.x86_64 : OpenJDK 11 Headless Runtime Environment
java-11-openjdk-javadoc.x86_64 : OpenJDK 11 API documentation
java-11-openjdk-javadoc-zip.x86_64 : OpenJDK 11 API documentation compressed in a single archive
java-11-openjdk-jmods.x86_64 : JMods for OpenJDK 11
java-11-openjdk-src.x86_64 : OpenJDK 11 Source Bundle
java-11-openjdk-static-libs.x86_64 : OpenJDK 11 libraries for static linking
java-17-openjdk.x86_64 : OpenJDK 17 Runtime Environment
java-17-openjdk-demo.x86_64 : OpenJDK 17 Demos
java-17-openjdk-devel.x86_64 : OpenJDK 17 Development Environment
java-17-openjdk-headless.x86_64 : OpenJDK 17 Headless Runtime Environment
java-17-openjdk-javadoc.x86_64 : OpenJDK 17 API documentation
java-17-openjdk-javadoc-zip.x86_64 : OpenJDK 17 API documentation compressed in a single archive
java-17-openjdk-jmods.x86_64 : JMods for OpenJDK 17
java-17-openjdk-src.x86_64 : OpenJDK 17 Source Bundle
java-17-openjdk-static-libs.x86_64 : OpenJDK 17 libraries for static linking
maven-openjdk11.noarch : OpenJDK 11 binding for Maven
maven-openjdk17.noarch : OpenJDK 17 binding for Maven
maven-openjdk8.noarch : OpenJDK 8 binding for Maven
slf4j-jdk14.noarch : SLF4J JDK14 Binding

```

搜索出很多可以安装的 jdk 软件。如果数目太多，可以通过管道 grep、more、less 来进行过滤。

```
$ yum search jdk | grep 11
Last metadata expiration check: 0:07:15 ago on Fri 13 Jan 2023 08:27:08 AM CST.
java-11-openjdk.x86_64 : OpenJDK 11 Runtime Environment
java-11-openjdk-demo.x86_64 : OpenJDK 11 Demos
java-11-openjdk-devel.x86_64 : OpenJDK 11 Development Environment
java-11-openjdk-headless.x86_64 : OpenJDK 11 Headless Runtime Environment
java-11-openjdk-javadoc.x86_64 : OpenJDK 11 API documentation
java-11-openjdk-javadoc-zip.x86_64 : OpenJDK 11 API documentation compressed in a single archive
java-11-openjdk-jmods.x86_64 : JMods for OpenJDK 11
java-11-openjdk-src.x86_64 : OpenJDK 11 Source Bundle
java-11-openjdk-static-libs.x86_64 : OpenJDK 11 libraries for static linking
maven-openjdk11.noarch : OpenJDK 11 binding for Maven
```

- 安装软件

```
yum install java-11-openjdk.x86_64
/
apt-get install openjdk-9-jdk
```

```
// jdk 安装成功
java --version
openjdk 11.0.17 2022-10-18 LTS
OpenJDK Runtime Environment (Red_Hat-11.0.17.0.8-2.el9) (build 11.0.17+8-LTS)
OpenJDK 64-Bit Server VM (Red_Hat-11.0.17.0.8-2.el9) (build 11.0.17+8-LTS, mixed mode, sharing)

```

- 卸载软件

```
yum erase java-11-openjdk.x86_64
/
apt-get purge openjdk-9-jdk
```

- Linux 配置可以从哪里下载这些软件
  对于 CentOS 来讲，配置文件在/etc/yum.repos.d/CentOS-Base.repo

```

[base]
name=CentOS-$releasever - Base - 163.com
baseurl=http://mirrors.163.com/centos/$releasever/os/$basearch/
gpgcheck=1
gpgkey=http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-7
```

对于 CentOS Stream，配置文件在 /etc/yum.repos.d

```
ls /etc/yum.repos.d
centos-addons.repo  centos.repo
```

```
$ cat centos.repo
[baseos]
name=CentOS Stream $releasever - BaseOS
metalink=https://mirrors.centos.org/metalink?repo=centos-baseos-$stream&arch=$basearch&protocol=https,http
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
gpgcheck=1
repo_gpgcheck=0
metadata_expire=6h
countme=1
enabled=1

[baseos-debuginfo]
name=CentOS Stream $releasever - BaseOS - Debug
metalink=https://mirrors.centos.org/metalink?repo=centos-baseos-debug-$stream&arch=$basearch&protocol=https,http
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
gpgcheck=1
repo_gpgcheck=0
metadata_expire=6h
enabled=0

[baseos-source]
name=CentOS Stream $releasever - BaseOS - Source
metalink=https://mirrors.centos.org/metalink?repo=centos-baseos-source-$stream&arch=source&protocol=https,http
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
gpgcheck=1
repo_gpgcheck=0
metadata_expire=6h
enabled=0

...
```

对于 Ubuntu，配置文件在/etc/apt/source.list

```

deb http://mirrors.163.com/ubuntu/ xenial main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-backports main restricted universe multiverse
```

- 软件安装后，配置文件在哪里？

对于 Windows，软件安装后，配置文件在 C:\Program Files 下面的一个文件夹以及注册表里面的一些配置。  
对应 Linux，主执行文件会放在 /usr/bin 或者 /usr/sbin 下面，其他的库文件会放在 /var 下面，配置文件会放在 /etc 下面。

- 免安装软件

压缩模式  
Windows，.zip  
Linux，.tar.gz

如何下载？
Linux，wget，后面加上链接。

解压缩？
Windows，winzip  
Linux，默认有 tar 程序，如果解压 zip 包，需要另行安装。

```
tar xvzf jdk-XXX_linux-x64_bin.tar.gz
```

```
yum install zip.x86_64 unzip.x86_64
apt-get install zip unzip
```

- 解压后，配置环境变量
  Windows，略。
  Linux

```
export JAVA_HOME=/root/jdk-XXX_linux-x64
export PATH=$JAVA_HOME/bin:$PATH
```

```
ls -la
source ~/.bashrc
```

~/.bash_profle 是系统配置存储文件，是所有用户共用的。

```
# cat .bash_profile
# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
	. ~/.bashrc
fi

# User specific environment and startup programs
```

~/.bashrc 是个人的配置信息存储文件，只对单用户有效。配置了/.bashrc，切换用户后可能需要重新配置系统变量。

### 运行程序

#### 运行程序的第一种方式

Windows，.exe,双进运行

Linux，不是根据后缀名来执行的。它的执行条件：只要文件有 x 执行权限，都能到文件所在的目录下，通过./filename 运行这个程序。当然，如果放在 PATH 里设置的路径下面，就不用./ 了，直接输入文件名就可以运行了，Linux 会帮你找。

这是 Linux 执行程序最常用的一种方式，通过 shell 在交互命令行里面运行。
优点：适合运行一些简单的命令。可能需要和用户进行交互。
缺点：程序霸占命令行。一旦当前的交互命令行退出，程序就停止运行了。

```
Example :通过 date 获取当前时间
$ date
Tue Jan 17 09:31:36 PM CST 2023
$
```

#### 运行程序的第二种方式，后台运行。

Linux 运行程序的第二种方式，后台运行。
nohup 命令（no hang up（不挂起）），即，当前交互命令行退出的时候，程序还要在。
最后加一个 &，就表示后台运行。
优点：程序不能霸占交互命令行，而是应该在后台运行。

Linux 如何关闭后台进程？

```
// 假设启动的程序中包含某个关键字
ps -ef |grep 关键字  |awk '{print $2}'|xargs kill -9

解析：
ps -ef 可以单独执行，列出所有正在运行的程序
grep 通过关键字找到刚才启动的程序。
awk '{print $2}'是指第二列的内容，是运行的程序 ID
通过 xargs 传递给 kill -9，也就是发给这个运行的程序一个信号，让它关闭。
```

如果已经知道运行的程序 ID，可以直接使用 kill 关闭运行的程序。

- 安装文本编译器 vi

```
yum install vi
apt-get install vi
```

- 安装文本编译器 vim

```
yum install vim
apt-get install vim
```

#### 程序的第三种方式，以服务的形式

在 Windows 里面还有一种程序，称为服务。这是系统启动的时候就在的，可以通过控制面板的服务管理启动和关闭它。
systemd

Example ： 数据库 MySQL，使用的就是这种方式进行的。
Ubuntu 中通过命令 `apt-get install mysql-server`进行安装。
然后命令 `systemctl start mysql` 启动 MySQL。  
通过 `systemctl enable mysql` 设置开机启动。之所以成为服务并且能够开机启动，是因为在 `/lib/systemd/system` 目录下会创建一个 XXX.service 的配置文件，里面定义了如何启动、如何关闭。

在 CentOS 里有些特殊，MySQL 被 Oracle 收购后，因为担心授权问题，改为使用 MariaDB，它是 MySQL 的一个分支。
通过命令 `yum install mariadb-server mariadb` 进行安装，
命令 `systemctl start mariadb` 启动，
命令 `systemctl enable mariadb` 设置开机启动。同理，会在 `/usr/lib/systemd/system` 目录下，创建一个 XXX.service 的配置文件，从而成为一个服务。

## systemd 的机制十分复杂 // TODO

## 关机:shutdown

```
// 现在关机
shutdown -h now
```

## 重启:root

```
reboot
```

# 3 其他命令

- ｜ ：管道机制  
   一个命令的输出，作为另一个命令的输入。
  常见的，上一个命令的结果通过管道 grep、more、less 来进行过滤。

- grep：搜索工具，包含某个关键字  
  grep 支持正则表达式.  
  grep 加上管道，是一个很常用的模式。

- more : 分页。只能往后看翻页。 翻到最后一页自动结束返回命令行。 输入 q（quit） 返回命令行。

```
$ more 1.txt

利用管道机制
$ more 1.txt | grep google
```

- less : 分页。往前往后翻页。 输入 q（quit） 返回命令行。

```
$ less 1.txt

利用管道机制
$ less 1.txt | grep google
```

- tar ： 解压

```
tar xvzf jdk-XXX_linux-x64_bin.tar.gz
```

- date 获取当前时间

```
# date
Tue Jan 17 09:29:22 PM CST 2023
```

- awk ： // TODO
  灵活地对文本进行处理

- xargs // TODO

- ps // TODO

```
$ ps -ef
UID          PID    PPID  C STIME TTY          TIME CMD
root           2       0  0 20:41 ?        00:00:00 [kthreadd]
...
```

- kill // TODO

# 文本编译器 vi

# 文本编译器 vim

- 打开一个文件,没有，则自动创建一个。

```
vim hello.txt
```

如果文件有内容，就会显示出来。移动光标的位置，通过上下左右键就行。

- i, insert,进入编辑模式

```
// 进入编辑模式
i

// 退出编辑模式
esc
```

- ：进入命令模式

```
// w, write, 保存编辑的文本
:w

// q, quite, 退出vim
:q

// 退出vim，且保存文本
:wq

// 退出vim，且不保存
:q!
```
