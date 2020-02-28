# 网络通信

# 1. 如何实现基于TCP的网络通信？
- Android支持JDK本身的TCP、UDP网络通信API
- 使用Socket、ServerSocket建立基于TCP/IP的网络通信
- 使用DatagramSocket、Datagrampacket、MulticastSocket 建立基于UDP的网络通信


## 基于TCP/IP协议的网络通信
TCP/IP 通信协议是一种可靠的网络协议，它在通信的两端建立一个Socket，从而建立网络虚拟链路。网络虚拟链路建立成功后，两端的程序就可以通信了。

### `IP协议 = 打包、拆分包（通信的同一种语言）`
IP = Internet Protocol，即Internet 协议，是Internet一个关键协议。     

IP的作用：  
- 通过IP协议，允许Internet连接不同的计算机和不同操作系统。 
要彼此通信的两个终端设备使用同一种“语言”,IP协议保证能终端能发送和接受分组数据。    
IP负责将消息从一个主机传送到另一个主机，消息在传送的过程中被分成一个个小包。   

- 计算通过安装IP软件，保证计算机之间可以接受和发送数据，但不能解决数据分组在传输过程中可能出现的问题。    
通过安装TCP协议来提供可靠、无差错的通信服务，解决可能出现的问题（丢失、次序混乱等）。  

### `TCP协议 = 建立双向传送带、收集、排序、接收、还原`
TCP协议是一种段对端协议。    

TCP作用：   
当两台计算机之间建立连接时，建立用于发送和接受数据的虚拟链路。    
TCP负责收集信息包，并排次序发送。在接受端收到后再将其正确还原。TCP保证数据包在传输中正确。

TCP使用重发机制：  
A->B.A需要收到B的确认信息。如果没有收到B的确认信息，则会再次重复发信息给B。   
通过重发机制，TCP体用可靠的通信连接，使它能够适应各种变化。即使在Internet暂时堵塞，TCP也能保证通信可靠。

![tcp_1.jpg](https://yingvickycao.github.io/img/android/network_communication/tcp_1.jpg)

### TCP/IP?   
![tcp_2.jpg](https://yingvickycao.github.io/img/android/network_communication/tcp_2.jpg)

TCP和IP两个协议功能不同，也可以分开单独使用。  
但它们在同一个时期作为一个协议来设计的，并且在功能互补。至于两者两者结合才能保证在Internet在复杂环境下正确运行。连接到Internet上的计算机，都同时安装和使用这两个协议，因此实际中常把这连个协议统称为TCP/IP协议。

## 使用 Socket 和 ServerSocket 创建TCP客户端和服务器

### ServerSocket 服务器端
```
1. ServerSocket(int port)   // 指定端口,0~65535。 Recommend：port>1024,避免与其他应用程序的通用接口冲突。
ServerSocket(int port, int backlog) // backlog:改变队列长度
ServerSocket(int port, int backlog, InetAddress bindAddr) // bindAddr:PC存在多个IP地址时，指定绑定的IP地址。否则默认绑定IP地址

2. Socket socket = ServerSocket.accept(); // 一直处于等待状态，接受到Socket请求后，返回一个Socket。
3. close() 

4. InputStream getInputStream()   // 返回Socket的输入流，该输入流从Socket取数据，[接受]Socket->内存
5. OutputStream getOutputStream() // 返回Socket的输出流，该输出流向Socket输数据，[发送]内存 -> Socket
```
- 服务器端通常运行到固定IP地址的服务器上，PC也可以。很少运行在手机上，因为手机IP地址通常是由移动运营公司动态分配，一般不会有自己固定的IP地址。
- 当客户端、服务器端产生了对应了Socket之后，程序无须区分客户端和服务器端，通过各自的Socket进行通信（接受
、发送）。之所以区分客户端、服务器端，是因为在建立连接时，一方是等待连接，另一方是主动连接。

- Android网络通信还是依赖于JDK `java.net`,`java.io`的API
- 使用`UTF_8`字符集消除字符编码差异带来的读取乱码问题  
Widnow：默认GBK  
Linus：默认使用UTF_8    
当编写跨屏他的网络通信程序时，使用`UTF_8`字符集进行编码和解码是一种较好的解决方案。 

### Socket 客户端
```
// address:远程主机的IP地址；port：远程主机的端口号。默认使用本机的默认IP地址，以及系统动态分配的端口。
Socket(String/InetAddress address, int port) 

// 当本地主机有多个IP地址时，localAddr：指定本机IP地址,localPort：指定本地端口号
Socket(String/InetAddress address, int port, InetAddress localAddr, int localPort)

InputStream getInputStream()
OutputStream getOutputStream() 
```
```
Socket socket = new Socket();
socket.connect(new InetSocketAddress(SERVER_ADDRESS, SERVER_PORT), 1000); // 10s,设置连接超时时间

Socket socket = new Socket(SERVER_ADDRESS, SERVER_PORT);
socket.setSoTimeout(10000);  // 10s, 设置连接后，读写超时时间
```

### 聊天app？
- 排序
- UIF-8
- 多线程
- 缓存：三级缓存、服务器存储
- 重连（超时处理）
- 通知
- 分页
- 协议
- 性能
- 安全性：加密、解密等
- 剔除

# 2. 如何实现基于UDP的网络通信？
- Android支持JDK本身的TCP、UDP网络通信API
- 使用DatagramSocket、Datagrampacket、MulticastSocket 建立基于UDP的网络通信

# 3. URL
## URL
- URL = Uniform Resource Locator  
代表统一资源定位器，指向互联网“资源”的指针。资源可以简单的文件或目录，也可以是更复杂的对象的引用，例如，数据库或索引引擎的查询。

- URL格式= 协议名+主机+资源
```
http://www.abc.com:8080/index.php  
http://:协议  
www.abc.com：域名。指定访问的网站。域名是固定的。  
index.php：网站资源部分。当访问者需要访问不同资源时，此部分动态改变。  
```
- InputStream is = URL.openStream();
- URL no close API 。但  InputStream must close.    
- URL == InputStream Read    -----> OutStream: Save to Disk, etc.
- Default run on UI Thread, SO -> New Thread
- 支持目标源类型：图片、文件等....
-  URL 中必须有一个协议名称.   
常用的协议有 `HTTP`、`HTTPS` 和 FTP 

## URI
- URI = Uniform Resource Identifiers   
URI的实例代表一个统一资源标识符。   

## URI VS URL。 
JAVA的URI不能用于定位任何资源.它的唯一作用是解析。  

Java的URL包含一个可打开可达该资源的输入流，因此，可将URL理解成URI的特例。

## URL API
```
getFile()  // 要获取此URL的资源名
getHost()); // 主机名
getPath()); 
getPort());
getProtocol()); // 协议名称
getAuthority());
getContent());
getRef());
getQuery());
getDefaultPort());
getUserInfo());

InputStream openStream() // 打开该URL的连接，并返回InputStream来读取该URL资源
URLConnection openConnection()  // 返回一个URLConnecttion对象，它表示与该URL的连接
```

## URLConnection API
```
setAllowUserInteraction(bool)
setRequestProperty() // 设置请求头
```

## URL - InputStream openStream() vs URLConnection openConnection() 
```
// 默认直接拿资源
public final InputStream openStream() throws java.io.IOException {
    return openConnection().getInputStream();
}

// URLConnection表示应用程序和URL之间的通信连接。最常见：HTTP(s)-Get/Post。
// Hi, 我是服务器，我发送了XXXX，你要按预定格式返回给我数据。于是，服务器返回了我想要的数据。
// URLConnection.getOutputStream().write()；从服务器端获得字节输出流
// URLConnection.getInputStream().read(); 总是使用conn.getInputStream()获取服务端的响应，因此默认值是true

public URLConnection openConnection() throws java.io.IOException {
    return handler.openConnection(this);
}
```
## URL的实现方式？
网络上说是socket。  
Java JDK 源码中有Sokcket一些代码，故推测是Socket。

```
URl.java
InetSocketAddress

URLConnection.java
SocketTimeoutException
Permission getPermission(): // Permission:--->java.net.SocketPermission@ceed424
```

# 4. HTTP / HTTPs
```
GET         // 最常用
POST        // 最常用
HEAD 
PUT
DELETE
OPTIONS
CONNECT
```