# MAC 常见配置

# 1. Mac OS 如何更改文件的默认打开方式

https://jingyan.baidu.com/article/b87fe19eb386f052183568a2.html

---

# 2. 给普通账户增加 sudo 权限

- root != 管理员账户

- 使用`root`账户给普通账户增加 sudo 权限

Step1:切换`root`账户  
[如何在 Mac 上启用 root 用户或更改 root 密码](https://support.apple.com/zh-cn/HT204012)  
[如何为 Mac OS X 启用 Root 账户](https://jingyan.baidu.com/article/49711c619e7620fa441b7ca8.html)

Step2:`/etc/sudoers`  
`"root ALL=(ALL) ALL"`，在下面加一行`“XXX ALL=(ALL) ALL”`，`“XXX”`是用户名

```
// admin 和abc账户均添加了sudo权限
root	ALL = (ALL) ALL
%admin	ALL = (ALL) ALL
abc		ALL = (ALL) ALL
```

[给普通用户授予 sudo 权限](https://blog.csdn.net/lizhiyuan_eagle/article/details/80495755)  
https://bingozb.github.io/59.html

- Notes：

1. `hades is not in the sudoers file. This incident will be reported.`  
   **_非 root 不能修改/etc/sudoers。_**  
   为了保护系统安全，sudoers 的权限一旦修改后，任何 sudo 命令都会被拒绝。  
   一旦更改，必须进入 recovery mode，将 sudoers 的权限修改回来。  
   https://blog.csdn.net/tuzhutuzhu/article/details/21286893

2.

```
sudo: /etc/sudoers is owned by uid 501, should be 0
sudo: no valid sudoers sources found, quitting
```

普通用户编辑了 `/etc/sudoers`,导致 root 用户无法调用 sudo 这个命令。  
使用下面网址后恢复后，sudo 正常  
https://blog.csdn.net/u013583789/article/details/71173247

---

# 3. Unix

- Linux：  
  指的是内核
- Mac OS  
  基于 Unix 内核的图形化操作系统

---

# 4. mac 静音

https://jingyan.baidu.com/article/bad08e1efbe8ce09c951216d.html

## 关闭电脑启动音“咚”（开机声音）

```
较新的mac版本
	关闭
		sudo nvram BootAudio=%00
	恢复
		sudo nvram BootAudio=%01
较旧的mac版本
	关闭
		sudo nvram SystemAudioVolume=%80
	恢复
		sudo nvram -d SystemAudioVolume
```

## 静音

F10 静音

## sound 静音

![sound静音Step1](https://yingvickycao.github.io/img/tools/mac/soud_mute_1.png)  
![sound静音Step2](https://yingvickycao.github.io/img/tools/mac/soud_mute_2.png)  
![sound静音Step3](https://yingvickycao.github.io/img/tools/mac/soud_mute_3.png)

---

# 5. 苹果系统自带的桌面壁纸

`Finder -> mac os磁盘 -> /Library/Desktop Pictures`

# 6. 开启或关闭显示隐藏文件命令?

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

# 7. Finder 标题栏显示当前文件夹完整路径?

```
// 显示文件夹完整路径
defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES

// 隐藏文件夹完整路径
defaults write com.apple.finder _FXShowPosixPathInTitle -bool NO
```

# 8. Finder 中 选中 File，Finder 下边显示路径

Finder -> View -> Show Path Bar.

# 9. 修改 Fn 键盘

Setting -> Keyboard -> Keyboard, Check "Use F1, F2,etc. keys as standard function keys"

- https://sanwen8.cn/p/69551Cy.html

# 10 Terminal

- `history`

# 11 Mac downlaod gitbub resource very slowly?

https://fastly.net.ipaddress.com => Copy IP Address

```
# etc/hosts
52.216.227.88 github-cloud.s3.amazonaws.com
140.82.114.3  github.com
192.30.253.120 codeload.github.com
```

// 刷新 DNS 缓存  
`sudo killall -HUP mDNSResponder`

# 12 Gitee 被停止域名解析

http://www.itbear.com.cn/html/2019-10/360525.html

Fix:

```
# etc/hosts
212.64.62.174 gitee.com
```

- 尽量不要 hosts 文件中绑定了 IP 地址。 通过 DNS 自动获取更新后的 IP 地址。  
  https://www.oschina.net/news/110786/gitee-unbind-ip?from=gitee  
  ![hosts_bound_ip](https://static.oschina.net/uploads/space/2019/1023/235058_I3rc_12.png)

# 14 Mac download

- Security & Privary  
  General, uncheck “Require password ” after sleep or screen saver begins
- Enegry Saver  
  Battery = Never  
  Power Adapter = Never
- Screen light = 0

# 15 同一个网络转接口，IP address 和 mac address 相同。

| 转接口-MAC | IP address     | mac address       |
| ---------- | -------------- | ----------------- |
| BK-A       | 10.115.188.161 | 00:e5:4c:19:87:9a |
| BK-B       | 10.115.188.161 | 00:e5:4c:19:87:9a |
| Apple-A    | 10.115.188.141 | bc:29:4b:ab:cf:bd |
