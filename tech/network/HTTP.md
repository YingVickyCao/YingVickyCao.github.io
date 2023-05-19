# HTTP

# 1 HTTP

- HTTP  
  HyperText Transfer Protocol

- Method

```
GET         // 最常用
POST        // 最常用
HEAD
PUT
DELETE
OPTIONS
CONNECT
```

# 2 HTTPS

![HTTPS](https://ooo.0o0.ooo/2016/09/08/57d0d32b664c0.png)

| -        | https                                                          | http                         |
| -------- | -------------------------------------------------------------- | ---------------------------- |
| 协议     | Hyper Text Transfer Protocol over SecureSocket Layer(SSL+HTTP) | Hyper Text Transfer Protocol |
| 证书     | CA 申请证书                                                    |
| 安全性   | 加密后传输                                                     | 明文传输                     |
| 连接     | 有状态                                                         | 无状态                       |
| 默认端口 | 443                                                            | 80                           |
| Level    | HTTPS 运行在 SSL/TLS 之上,SSL/TLS 运行在 TCP 之上              | HTTP 协议运行在 TCP 之上     |

# 3 HTTP/1.x

| -        | HTTP 1.x                          | HTTP 2.0                 | HTTP 3.0        |
| -------- | --------------------------------- | ------------------------ | --------------- |
| protocal | http/1.0: 1989 <br/>http/1.1:1997 | HTTP/2:2005, <br/>h2/h2c | HTTP/3 : 2020.8 |

- HTTP/1.1 vs HTTP/2

| Differences                 | HTTP/1.1                                                                                 | HTTP/2                                         |
| --------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Divery Models               | Pipelining and Head-of-Line Blocking                                                     | Binary Framing Layer:Stream Prioritization     |
| Buffer Overflow             | flow relies on underlying TCP connection:buffer space                                    | Application layer controls data flow.          |
| Predicting Resource Request | Resource inling                                                                          | Sever Push                                     |
| Commpression                | Message - data:gzip<br/>Message - Header:plain text. cookies may make header much larger | Message - data:gzip<br/>Message - Header:HPACK |

# 3 HTTP/2

- HTTP/2 , base on Google SPDY.
- h2  
  `HTTP/2 over TLS`.  
  基于 TLS 之上构建的 HTTP/2，作为 ALPN 的标识符,即 https
- h2c  
  `HTTP/2 without TLS, over TCP`  
   直接在 TCP 之上构建的 HTTP/2，缺乏安全保证，即 http。  
   h2c 是 h2 的明文版本。  
  适合后台服务之间的通讯。

# 4 HTTP/3

# 5 SSL

安全套接层（Secure Sockets Layer，缩写 SSL）

- SSL 协议位于 TCP/IP 协议与各种应用层协议之间。
- SSL 用于 client 和 server 之间的利用数据加密、身份验证和消息完整性验证机制，保证网络上传输数据的安全性。
- 继任者是 TLS

# 6 TLS

传输层安全性协议（Transport Layer Security，缩写 TLS）

- TLS 是 SSL 的一个新版本  
  现在谈论的 SSL，事实上说的应该是 TLS。但是，大部分人仍习惯说 SSL 而不是 TLS.  
  TLS 是更为安全的升级版 SSL。由于 SSL 这一术语更为常用，因此我们仍然将我们的安全证书称作 SSL。

  SSL 1.0 未知  
   SSL 2.0 1995  
   SSL 3.0 1996  
   TLS 1.0 1999  
   TLS 1.1 2006  
   TLS 1.2 2008  
   TLS 1.3 2018

# 7 模型

## OSI 七层模型

## TCP/IP 四层模型

从实质上讲，只有上边三层，网络接口层没有什么具体的内容
![tcp_ip 1](https://upload-images.jianshu.io/upload_images/2537311-7d312d486baaa07c.png)

![tcp_ip 2](https://upload-images.jianshu.io/upload_images/2537311-fdf87516e9d471f9.png)

## 五层体系结构

![vs](https://upload-images.jianshu.io/upload_images/2537311-58b3a7677d02db6e.png)

![vs 2](https://upload-images.jianshu.io/upload_images/2537311-b22ceca55652e141.png)

软件通信有七层结构:
下三层结构偏向与数据通信，  
上三层更偏向于数据处理，  
中间的传输层则是连接上三层与下三层之间的桥梁.  
每一层都做不同的工作，上层协议依赖与下层协议。基于这个通信结构的概念。

# Refs

- HTTPS https://www.jianshu.com/p/2fa5ffd889ce
- TCL https://baike.baidu.com/item/TLS/2979545
- HTTP/2 https://www.cnblogs.com/zlingh/p/5887143.html
- OSI https://www.jianshu.com/p/5c6bc8b48b09
