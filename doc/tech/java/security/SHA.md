# SHA

| SHA   | Version |
| ----- | ------- |
| SHA-1 | 1       |
| SHA-2 | 2       |
| SHA-3 | 3       |

SHA-1 :

| SHA-1 | Encoded bytes |
| ----- | ------------- |
| SHA-1 | 20            |

SHA-2 : SHA-X bit === (X / 8) bytes  
| SHA-2 | Encoded bytes |
| ------- | ------------- |
| SHA-256 | fixed-size 32 |
| SHA-384 | fixed-size 48 |
| SHA-512 | fixed-size 64 |

SHA-3 :

| SHA-3    | Encoded bytes |
| -------- | ------------- |
| SHA3-256 | fixed-size 32 |

- SHA (Secure Hash Algorithm)
  The SHA (Secure Hash Algorithm) is one of the popular cryptographic hash functions.

- SHA-2 == SHA-256 == SHA-256 位

- SHA-3  
  vs SHA-2: provides a different approach to generate a unique one-way hash and more faster .  
  JDK 9 avaiable

# Digital Signatures ( 数字签名)

- HTTPS 协议和 HTTP 协议的区别：  
  https 协议需要到 ca 申请证书，一般免费证书很少，需要交费。
  http 是超文本传输协议，信息是明文传输，https 则是具有安全性的 ssl 加密传输协议。
  http 和 https 使用的是完全不同的连接方式用的端口也不一样,前者是 80,后者是 443。
  http 的连接很简单,是无状态的 。
  HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议， 要比 http 协议安全。

- 为什么身份验证对于确保 SSL / TLS 实际上提供有意义的安全性至关重要?  
  SSL / TLS 协议用于通过互联网将数据从一台设备安全传输到另一台设备。为了简洁起见，似乎 SSL 通常被解释为“加密”。但是请不要忘记 SSL 还提供身份验证。SSL 证书文件的任务是提供身份验证所需的必要信息。换句话说，SSL 证书将特定的公钥绑定到身份。

  SSL / TLS 协议使用非对称加密来促进连接。这意味着有两个加密密钥，每个都处理一半的过程：一个用于加密的公共密钥和一个用于解密的私有密钥。每个 SSL 证书都包含一个公用密钥，客户端可以使用该公用密钥来加密数据，并且该 SSL 证书的所有者将私有密钥安全地存储在其服务器上，供他们用来解密该数据并使之可读。

  最终，这种非对称加密的主要目的是安全密钥交换。由于非对称密钥需要计算能力，因此将更小的对称密钥用于连接的实际通信部分更为实用（并且仍然很安全）。因此，客户端生成一个会话密钥，然后将其副本加密，然后将其发送到服务器，在服务器上可以对其进行解密，并在整个连接期间（或直到其被淘汰）用于通信。

  数字签名是 SSL 证书如何提供身份验证的重要组成部分。颁发证书时，该证书由您选择作为证书提供者的证书颁发机构（CA）进行数字签名（例如 Sectigo，DigiCert 等）。该签名提供了加密证明，证明 CA 已签署 SSL 证书，并且该证书尚未被修改或复制。更重要的是，它的真实签名是密码证明，证明证书中包含的信息已由可信的第三方验证。

  为了使计算机更容易快速，更安全地创建和检查这些签名，CA 首先对证书文件进行哈希处理，并对生成的哈希进行签名。这比签署整个证书更有效。

  数字签名非常敏感-文件的任何更改都会导致签名更改。  
  这使得攻击者无法修改合法证书或创建看起来合法的欺诈证书。不同的哈希表示签名将不再有效，并且您的计算机在对 SSL 证书进行身份验证时会知道这一点。如果您的计算机遇到无效的签名，它将触发错误并完全阻止安全连接。

- SSL 证书
  HTTPS 核心的一个部分是数据传输之前的握手，握手过程中确定了数据加密的密码。在握手过程中，网站会向浏览器发送 SSL 证书，SSL 证书和我们日常用的身份证类似，是一个支持 HTTPS 网站的身份证明，SSL 证书里面包含了网站的域名，证书有效期，证书的颁发机构以及用于加密传输密码的公钥等信息，由于公钥加密的密码只能被在申请证书时生成的私钥解密，因此浏览器在生成密码之前需要先核对当前访问的域名与证书上绑定的域名是否一致，同时还要对证书的颁发机构进行验证，如果验证失败浏览器会给出证书错误的提示。在这一部分我将对 SSL 证书的验证过程以及个人用户在访问 HTTPS 网站时，对 SSL 证书的使用需要注意哪些安全方面的问题进行描述。

- SSL 证书验证失败有以下三点原因：

Case 1 : SSL 证书不是由受信任的 CA 机构颁发的  
Case 2 :证书过期  
Case 3 : 访问的网站域名与证书绑定的域名不一致

- 中间人攻击  
  对 HTTPS 最常见的攻击手段就是 SSL 证书欺骗或者叫 SSL 劫持
- 网上交易一定要证书受信任才可以

- 自我描述过程：app 判断 UAT 服务器的域名不合法

```
  app 发送 https 请求到 服务器。在建立 SSL 过程中，
  Step 1 ：公司花钱为某个服务器向 CA 申请证书(.cert)。
  Step 2 ：CA 批准，制作完成后，把证书文件发给 公司，公司会部署在服务器上。
  Step 3 ：公司还会把证书发给 mobile 组，
  Step 4 ：mobile 组从证书中提取 public key，然后 得到 public key 的 hash value。
          并 在代码中把 host name 和 hash value 写入 map。
  Step 5 ：app 向服务器发送 含域名的https 请求。
          服务器返回数据时，https的低层实现自动把证书的相关信息，包括 public key ，返回。
  Step 6 ：app 收到 response时，判断 response 带 的public key 的 hash 值 与 map 中public key 的 hash value
          是否一致。如果不一致，说明有问题，报错。
```

- 如果是服务器的证书过期了，会怎么样？
  Step 1 ： 客户端发送请求到服务器。
  Step 2 ： 服务器收到后，https 低层实现自动把证书中的带的域名、签名机构等信息提取出来，然后向该签名机构发送请求验证：当前签名的信息（e.g,到期日期）是否与在该机构中注册的一致？如果不一致，说明当前服务器是伪装的服务器，握手失败。 如果一致，继续与客户端握手。

# Refs

- [Hash fucntions](https://cryptii.com/pipes/hash-function)
- https://www.baeldung.com/sha-256-hashing-java
- https://www.thesslstore.com/blog/difference-sha-1-sha-2-sha-256-hash-algorithms/
- [Descriptions of SHA-256, SHA-384, and SHA-512](http://iwar.org.uk/comsec/resources/cipher/sha256-384-512.pdf)
- https://www.runoob.com/w3cnote/https-ssl-intro.html
