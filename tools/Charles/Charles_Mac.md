# 1 Charles 在 Mac 抓包

## HTTP

- Step 1 : 开启在 Mac 的 抓包。`Proxy-> maxOS Proxy`
  <br/>
  <br/>
  Charles 默认抓包的是 http 和 Sockes.  
  发现 MacoS 的 HTTP 和 HTTPS 代理被自动设置为本地代理，端口号为 8888.  
  之后可以抓包 http 和 Socket 请求了。  
  ![charles_macOS_proxy](https://yingvickycao.github.io/img/tools/charles/charles_macOS_proxy.jpg)

- Step 2 : Proxy->Proxying Settings. 端口号的默认设置  
  ![charles_Proxying_Settings_1](https://yingvickycao.github.io/img/tools/charles/charles_Proxying_Settings_1.jpg)

  ![charles_Proxying_Settings_2](https://yingvickycao.github.io/img/tools/charles/charles_Proxying_Settings_2.jpg)

# HTTPS

Charles 抓包 https 需要单独开启 SSL 设置。

- Step 1 ： 安装 charles 证书  
  `Help -> SSL Proxying -> Install Charles Root Certificate`.  
  如果装完后提示证书不信任，则点击 CA 证书那一项，更改为都信任

- Step 2 : `Proxy->SSL Proxying Setting-> Locations`。 配置添加要抓包的域名。

  `*`= 拦截 Https 的数据包  
  ![charles_SSL_Proxying_Setting](https://yingvickycao.github.io/img/tools/charles/charles_SSL_Proxying_Setting.png)

Step 3 : `Proxy -> Recording Settings`. 过滤抓包地址.  
![Recording Settings](https://yingvickycao.github.io/img/tools/charles/charles_Recording_Settings.png)

## 把远程服务器上的请求映射到本地进行调试 `Toos -> Map Remote`

如何定位服务器 线上问题？  
Way 1 : tomcat 的远程 debug,在服务器启动脚本中增加参数。
Way 2 : 使用 Charles 将线上的请求映射到本地，进行调试  
点击 add 后，将服务器上进程的地址和端口映射到 local，然后在本地启动服务，进行 debug 即可。

# FAQ

- Q： mac 上关闭 charles 后，电脑无法上网问题
  A： 取消选中 Wifi -> Proxies -> 所有选中取消。
