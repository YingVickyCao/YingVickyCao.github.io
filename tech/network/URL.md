# URL

- URL = Uniform Resource Locator  
  代表统一资源定位器，指向互联网“资源”的指针。资源可以简单的文件或目录，也可以是更复杂的对象的引用，例如，数据库或索引引擎的查询。

- URL 格式= 协议名+主机+资源

```
http://www.abc.com:8080/index.php
http://:协议
www.abc.com：域名。指定访问的网站。域名是固定的。
index.php：网站资源部分。当访问者需要访问不同资源时，此部分动态改变。
```

- InputStream is = URL.openStream();
- URL no close API 。但 InputStream must close.
- URL == InputStream Read -----> OutStream: Save to Disk, etc.
- Default run on UI Thread, SO -> New Thread
- 支持目标源类型：图片、文件等....
- URL 中必须有一个协议名称.  
  常用的协议有 `HTTP`、`HTTPS` 和 FTP

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

// URLConnection 表示应用程序和URL之间的通信连接。最常见：HTTP(s)-Get/Post。
// Hi, 我是服务器，我发送了XXXX，你要按预定格式返回给我数据。于是，服务器返回了我想要的数据。
// URLConnection.getOutputStream().write()；从服务器端获得字节输出流
// URLConnection.getInputStream().read(); 总是使用conn.getInputStream()获取服务端的响应，因此默认值是true

public URLConnection openConnection() throws java.io.IOException {
    return handler.openConnection(this);
}
```

## URL 的实现方式？

网络上说是 socket。  
Java JDK 源码中有 Sokcket 一些代码，故推测是 Socket。

```
URl.java
InetSocketAddress

URLConnection.java
SocketTimeoutException
Permission getPermission(): // Permission:--->java.net.SocketPermission@ceed424
```
