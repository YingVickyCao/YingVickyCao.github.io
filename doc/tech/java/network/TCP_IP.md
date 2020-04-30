# TCP/IP

# 1. 如何实现基于 TCP 的网络通信？

- Android 支持 JDK 本身的 TCP、UDP 网络通信 API
- 使用 Socket、ServerSocket 建立基于 TCP/IP 的网络通信
- 使用 DatagramSocket、Datagrampacket、MulticastSocket 建立基于 UDP 的网络通信

## 基于 TCP/IP 协议的网络通信

TCP/IP 通信协议是一种可靠的网络协议，它在通信的两端建立一个 Socket，从而建立网络虚拟链路。网络虚拟链路建立成功后，两端的程序就可以通信了。

### `IP协议 = 打包、拆分包（通信的同一种语言）`

IP = Internet Protocol，即 Internet 协议，是 Internet 一个关键协议。

IP 的作用：

- 通过 IP 协议，允许 Internet 连接不同的计算机和不同操作系统。
  要彼此通信的两个终端设备使用同一种“语言”,IP 协议保证能终端能发送和接受分组数据。  
  IP 负责将消息从一个主机传送到另一个主机，消息在传送的过程中被分成一个个小包。

- 计算通过安装 IP 软件，保证计算机之间可以接受和发送数据，但不能解决数据分组在传输过程中可能出现的问题。  
  通过安装 TCP 协议来提供可靠、无差错的通信服务，解决可能出现的问题（丢失、次序混乱等）。

### `TCP协议 = 建立双向传送带、收集、排序、接收、还原`

TCP 协议是一种段对端协议。

TCP 作用：  
当两台计算机之间建立连接时，建立用于发送和接受数据的虚拟链路。  
TCP 负责收集信息包，并排次序发送。在接受端收到后再将其正确还原。TCP 保证数据包在传输中正确。

TCP 使用重发机制：  
A->B.A 需要收到 B 的确认信息。如果没有收到 B 的确认信息，则会再次重复发信息给 B。  
通过重发机制，TCP 体用可靠的通信连接，使它能够适应各种变化。即使在 Internet 暂时堵塞，TCP 也能保证通信可靠。

![tcp_1.jpg](https://yingvickycao.github.io/img/android/network_communication/tcp_1.jpg)

### TCP/IP?

![tcp_2.jpg](https://yingvickycao.github.io/img/android/network_communication/tcp_2.jpg)

TCP 和 IP 两个协议功能不同，也可以分开单独使用。  
但它们在同一个时期作为一个协议来设计的，并且在功能互补。至于两者两者结合才能保证在 Internet 在复杂环境下正确运行。连接到 Internet 上的计算机，都同时安装和使用这两个协议，因此实际中常把这连个协议统称为 TCP/IP 协议。

## 使用 Socket 和 ServerSocket 创建 TCP 客户端和服务器

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

- 服务器端通常运行到固定 IP 地址的服务器上，PC 也可以。很少运行在手机上，因为手机 IP 地址通常是由移动运营公司动态分配，一般不会有自己固定的 IP 地址。
- 当客户端、服务器端产生了对应了 Socket 之后，程序无须区分客户端和服务器端，通过各自的 Socket 进行通信（接受
  、发送）。之所以区分客户端、服务器端，是因为在建立连接时，一方是等待连接，另一方是主动连接。

- Android 网络通信还是依赖于 JDK `java.net`,`java.io`的 API
- 使用`UTF_8`字符集消除字符编码差异带来的读取乱码问题  
  Widnow：默认 GBK  
  Linus：默认使用 UTF_8  
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

### 聊天 app？

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
