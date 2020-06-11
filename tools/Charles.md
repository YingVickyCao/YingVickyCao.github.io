# Charles

- Charles v4.5.6
- Mac OS 10.14.6
- Samsung SM-T830 (Android 9 )  
  与 Mac 连接同一个 Wifi
- Iphone 6S Plus with Software Version is `12.4.1`  
  与 Mac 连接同一个 Wifi

# 1 Charles 在 Mac 上抓 http/https 协议的包

## 1.1 Help -> SSL Proxying -> Install Charles Root Certificate

![Charles_config_4_mac_1](https://yingvickycao.github.io/img/Charles_config_4_mac_1.jpg)

如果装完后提示证书不信任，则点击 CA 证书那一项，更改为都信任

![Charles_config_4_mac_2](https://yingvickycao.github.io/img/Charles_config_4_mac_2.png)

## 1.2 Proxy Setting

点击 1，直接开启抓包。
![Charles_config_4_mac_6](https://yingvickycao.github.io/img/Charles_config_4_mac_6.png)

或者

点击 2，详细配置 Mac Proxy Setting.  
在 Menu 选择 Proxy->SSL Proxying Setting，选,在 Locations 里面添加要使用 SSL 代理的网站.  
`*`= 拦截 Https 的数据包

![Charles_config_4_mac_4](https://yingvickycao.github.io/img/Charles_config_4_mac_4.png)

![Charles_config_4_mac_3](https://yingvickycao.github.io/img/Charles_config_4_mac_3.png)

![Charles_config_4_mac_5](https://yingvickycao.github.io/img/Charles_config_4_mac_5.jpg)

经过以上步骤，可以正常抓取 Mac 的 http/https 协议的包。

# 2 Charles 在 Android Device 上抓 http/https 协议的包

## 2.1 Config Proxy at Android ( Enabel HTTP )

Step 1 : 设置 手机 Wifi Proxy
Android -> 设置 -> Connections -> Selecte Connected Wifi -> Advanced -> Proxy , Manual->

```
# Proxy host name = Mac IP
192.168.0.102

# Proxy Port = Charles Proxy Port
8888
```

![Charles_config_4_android_5](https://yingvickycao.github.io/img/Charles_config_4_android_5.jpg)

## 2.2 Install Charles Certificate at Android ( Enable HTTPS )

If not set 2.2, https of Android in Charles is showed `unknown`

Charles 抓取 手机 Https 包出现 Unknown. Reason :  
(1) 手机在未安装证书  
(2) 接口响应超时或者响应失败的情况

### Way 1:

Step1 : Charles -> Help -> SSL Proxying -> Save Charles Root Certificate, save as `.pem` files, e.g., Charles.pem

![Charles_config_4_android_1](https://yingvickycao.github.io/img/Charles_config_4_android_1.jpg)

Step2 : Push Charles.pem to android Device

Step 3 : Click Charles.pem to install it, and name the Certificate, e.g., Charles.

![Charles_config_4_android_2](https://yingvickycao.github.io/img/Charles_config_4_android_2.jpg)

若安装成功，提示 “Charles installed”, 说明证书已经装好

### Way 2 : 使用手机浏览器 下载 Charles Certificate，并安装

Step1 : Help -> SSL Proxying -> Install Charles Root Certificate on a Mobile Device or Remote Browser

![Charles_config_4_android_3](https://yingvickycao.github.io/img/Charles_config_4_android_3.jpg)

![Charles_config_4_android_4](https://yingvickycao.github.io/img/Charles_config_4_android_4.jpg)

![Charles_config_4_android_6](https://yingvickycao.github.io/img/Charles_config_4_android_6.jpg)

Step 2 : 手机浏览器 输入`chls.pro/ssl`  
询问是否下载证书，点击 Downlaod

Step 3 : same as `2.2 - Way 1 - Step 3`

# 3 Charles 在 Android Emulator 上抓 http/https 协议的包

# 4 Charles 在 iPhone 上抓 http/https 协议的包

## 4.1 设置手机代理

Iphone -> Settings -> Wifi -> Choose selected Wifi -> HTTP PROXY, "Configure Proxy" -> "Manual"

```
# Server = Mac IP
192.168.0.102

# Port = Charles Proxy Port
8888
```

## 4.2 Install Charles Certificate at IPhone

Step1 : Charles -> Help -> SSL Proxying -> Install Charles Root Certificate on a Mobile Device or Remote Browser

![Charles_config_4_android_3](https://yingvickycao.github.io/img/Charles_config_4_android_3.jpg)

![Charles_config_4_android_4](https://yingvickycao.github.io/img/Charles_config_4_android_4.jpg)

![Charles_config_4_android_6](https://yingvickycao.github.io/img/Charles_config_4_android_6.jpg)

Step 2 : 手机浏览器 输入`chls.pro/ssl`  
![Charles_config_4_IPhone_1](https://yingvickycao.github.io/img/Charles_config_4_IPhone_1.png)

![Charles_config_4_IPhone_2](https://yingvickycao.github.io/img/Charles_config_4_IPhone_2.jpg)

Step 3 : 信任证书  
IPhone -> Settings -> General -> About -> Certificate Trust Settings ->  
PS : 没有出来信任证书，最后也能抓 Htpps 包。但理论上是不能抓 Htpps 包。

![Charles_config_4_IPhone_3](https://yingvickycao.github.io/img/Charles_config_4_IPhone_3.jpg)

# 5 Charles 在 iPhone Emulator 上抓 http/https 协议的包

# Refs

- https://www.jianshu.com/p/703998ae4e78
- https://www.jianshu.com/p/4635aa405568
