# Charles 在 iPhone/Emulator 上抓包

# 1 iPhone

- Step 1 : 设置手机代理:
  Iphone -> Settings -> Wifi -> Choose selected Wifi -> HTTP PROXY, "Configure Proxy" -> "Manual"

  ```
  # Server = Charles Local IP Address
  192.168.1.8

  # Port = Charles Proxy Port
  8888
  ```

  Help -> Local IP Address  
  ![charles_Local_IP_Address](https://yingvickycao.github.io/img/tools/charles/charles_Local_IP_Address.png)

  => Enable HTTP

- Step 2 : 安装证书，并信任证书

  (1) 安装证书  
  Charles -> Help -> SSL Proxying -> Install Charles Root Certificate on a Mobile Device or Remote Browser.  
  手机浏览器 输入`chls.pro/ssl`.  
  IPhone -> Settings -> General -> Profile & Device Management -> Install 证书

  (2) 信任证书  
  IPhone -> Settings -> General -> About -> Certificate Trust Settings.  
  PS : 没有出来信任证书，最后也能抓 Htpps 包。但理论上是不能抓 Htpps 包。

=> Enable HTTPS

## 若抓包 Iphone Safari，还要继续下面的步骤。

(1) Maybe need setup Iphone Safari  
![charles_safari](https://yingvickycao.github.io/img/tools/charles/charles_safari.jpg)

(2) Charles -> Proxy -> SSL Proxying Settings -> Enable SSL Proxying , 添加要抓的 host 和 port。

# 2 iPhone Emulator

TBD
