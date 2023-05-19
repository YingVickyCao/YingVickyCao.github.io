# Certificate (证书)

# 1 证书/数字证书(Digital certificate)

是一个意思  
CA 认证的文档(.cert)。  
过程：使用对称加密 产生公钥和私钥。私钥 CA 自己保存。把公钥、包括 host name、签名公司、、加密算法、Hash 算法、到日日期等存入一个.cert 文件（证书）中。这就是签名。

英文缩写 Cert  
英文全称 certificate

# X.509

X.509 是由国际电信联盟(ITU-T)制定的数字证书标准,First introduced in 1988
https://baike.so.com/doc/989919-1046498.html

# 2 [数字证书原理 △](数字证书原理.md)

# 3 [证书锁定 Certificate Pinning / 验证签名](https://www.cnblogs.com/daxueba-ITdaren/p/6495468.html)

证书锁定 是 SSL/TLS 加密的额外保证手段。它会将服务器的证书公钥预先保存在客户端。
在建立安全连接的过程中，客户端会将预置的公钥和接受的证书做比较。如果一致，就建立连接，否则就拒绝连接。

# 4 Signature 签名/数字摘要 / 数字签名

一个意思。  
对签名的信息，使用某种 加密 和 Hash 算法，得到的 Hash 值。

# 5 算法

非对称加密：RSA  
Hash ： SHA-256

# 6 如何查看签名？

Chrome -> 点击 小锁。也可以保存。

导出 https 网站上的证书？  
导出的证书，只能进行学习研究，不要用于商业用途

- Mac  
  https://blog.csdn.net/lllkey/article/details/17526323
- Windows  
  https://blog.csdn.net/c5113620/article/details/80384660

# 7 HTTP vs HTTPS

| -      | https                                                          | http                         |
| ------ | -------------------------------------------------------------- | ---------------------------- |
| 协议   | Hyper Text Transfer Protocol over SecureSocket Layer(SSL+HTTP) | Hyper Text Transfer Protocol |
| 证书   | 申请证书                                                       |
| 安全性 | 加密                                                           | 明文传输                     |
| 连接   | 有状态                                                         | 无状态                       |
| 端口   | 443                                                            | 80                           |

# 8 为什么身份验证对于确保 SSL / TLS 实际上提供有意义的安全性至关重要?（摘录）

SSL / TLS 协议用于通过互联网将数据从一台设备安全传输到另一台设备。为了简洁起见，似乎 SSL 通常被解释为“加密”。但是请不要忘记 SSL 还提供身份验证。SSL 证书文件的任务是提供身份验证所需的必要信息。换句话说，SSL 证书将特定的公钥绑定到身份。

SSL / TLS 协议使用非对称加密来促进连接。这意味着有两个加密密钥，每个都处理一半的过程：一个用于加密的公共密钥和一个用于解密的私有密钥。每个 SSL 证书都包含一个公用密钥，客户端可以使用该公用密钥来加密数据，并且该 SSL 证书的所有者将私有密钥安全地存储在其服务器上，供他们用来解密该数据并使之可读。

最终，这种非对称加密的主要目的是安全密钥交换。由于非对称密钥需要计算能力，因此将更小的对称密钥用于连接的实际通信部分更为实用（并且仍然很安全）。因此，客户端生成一个会话密钥，然后将其副本加密，然后将其发送到服务器，在服务器上可以对其进行解密，并在整个连接期间（或直到其被淘汰）用于通信。

数字签名是 SSL 证书如何提供身份验证的重要组成部分。颁发证书时，该证书由您选择作为证书提供者的证书颁发机构（CA）进行数字签名（例如 Sectigo，DigiCert 等）。该签名提供了加密证明，证明 CA 已签署 SSL 证书，并且该证书尚未被修改或复制。更重要的是，它的真实签名是密码证明，证明证书中包含的信息已由可信的第三方验证。

为了使计算机更容易快速，更安全地创建和检查这些签名，CA 首先对证书文件进行哈希处理，并对生成的哈希进行签名。这比签署整个证书更有效。

数字签名非常敏感-文件的任何更改都会导致签名更改。  
 这使得攻击者无法修改合法证书或创建看起来合法的欺诈证书。不同的哈希表示签名将不再有效，并且您的计算机在对 SSL 证书进行身份验证时会知道这一点。如果您的计算机遇到无效的签名，它将触发错误并完全阻止安全连接。

# 9 SSL 证书

> HTTPS 核心的一个部分是数据传输之前的握手，握手过程中确定了数据加密的密码。在握手过程中，网站会向浏览器发送 SSL 证书，SSL 证书和我们日常用的身份证类似，是一个支持 HTTPS 网站的身份证明，SSL 证书里面包含了网站的域名，证书有效期，证书的颁发机构以及用于加密传输密码的公钥等信息，由于公钥加密的密码只能被在申请证书时生成的私钥解密，因此浏览器在生成密码之前需要先核对当前访问的域名与证书上绑定的域名是否一致，同时还要对证书的颁发机构进行验证，如果验证失败浏览器会给出证书错误的提示。在这一部分我将对 SSL 证书的验证过程以及个人用户在访问 HTTPS 网站时，对 SSL 证书的使用需要注意哪些安全方面的问题进行描述。

## SSL 证书验证失败有以下三点原因：

Case 1 : SSL 证书不是由受信任的 CA 机构颁发的  
Case 2 :证书过期  
Case 3 : 访问的网站域名与证书绑定的域名不一致

## 中间人攻击

对 HTTPS 最常见的攻击手段就是 SSL 证书欺骗或者叫 SSL 劫持

网上交易一定要证书受信任才可以

## 自我描述过程：app 判断 UAT 服务器 response 的域名不合法？

```
  app 发送 https 请求到 服务器。在建立 SSL 过程中，
  Step 1 ：公司花钱为某个服务器向 CA 申请证书(.cert)。
  Step 2 ：CA 批准，制作完成后，把证书文件发给 公司，公司会部署在服务器上。
          一个证书可能对多个DNS name。
  Step 3 ：公司还会把证书发给 mobile 组，
  Step 4 ：mobile 组从证书中提取 public key，然后 得到 public key 的 hash value。
          并 在代码中把 host name 和 hash value 写入 map。
  Step 5 ：app 向服务器发送 含域名的https 请求。
          服务器返回数据时，https的低层实现自动把证书的相关信息，包括 public key ，返回。
  Step 6 ：app 收到 response时，判断 response 带 的public key 的 hash 值 与 map 中public key 的 hash value
          是否一致。如果不一致，说明有问题，报错。
```

## 如果是服务器的证书过期了，会怎么样？

Step 1 ： 客户端发送请求到服务器。  
Step 2 ： 服务器收到后，https 低层实现自动把证书中的带的域名、签名机构等信息提取出来，然后向该签名机构发送请求验证：当前签名的信息（e.g,到期日期）是否与在该机构中注册的一致？如果不一致，说明当前服务器是伪装的服务器，握手失败。 如果一致，继续与客户端握手。

- The SSL industry has picked [SHA](SHA.md) as its hashing algorithm for digital signatures

  网站的 SSL 证书的 SHA-1 和 SHA-2 哈希值:  
  ![Hash of www.thesslstore.com certificate](https://www.thesslstore.com/blog/wp-content/uploads/2016/07/SHA1SHA2.png)

  证书第 1 代：SHA-1  
  SHA-1 被认为是不安全的，因为由于其大小和构造，产生碰撞是可行的。已经被淘汰。  
  SHA-1 证书在浏览器会被警告：  
  ![certifacte with SHA-1 is showed wrong in Chrome](https://www.thesslstore.com/blog/wp-content/uploads/2016/07/SHA1BadSSL.png)

  证书第 2 代：SHA-2  
  正在使用

# 10

# 10 Check certificate

## HostnameVerifier

```java
// Way 1 :
HttpsURLConnection.setHostnameVerifier(new MyHostnameVerifier());

// Way 2 :
new OkHttpClient.Builder() .hostnameVerifier(new MyHostnameVerifier());
```

## Pinning / Certificate Pinning

又叫 SSL Pinning/TLS Pinning，中文为证书锁定。  
最大的作用就是用来抵御针对 CA 的攻击。e.g., man-in-the-middle（中间人攻击）。

### Get Pin of Certificate

Way 1 : value = Base64(SHA-256(PublicKey))  
 因为 Base 64 算法的填充值不同，计算结果与 javax Base64 值不同

```java
// OkHttp:CertificatePinner
public static String pin(Certificate certificate) {
if (!(certificate instanceof X509Certificate)) {
  throw new IllegalArgumentException("Certificate pinning requires X509 certificates");
}
return "sha256/" + sha256((X509Certificate) certificate).base64();
}

static ByteString sha256(X509Certificate x509Certificate) {
  return ByteString.of(x509Certificate.getPublicKey().getEncoded()).sha256();
}
```

Way 2: [SSL Lab](https://www.ssllabs.com/ssltest/analyze.html)

Way 3 : OkHttp  
先填写一个错的 hash 值，然后根据随后的 exception 的 stack trace message，得到对应的 hash 值。

### Set Pin of Certificate

Way 1:

```xml
<!-- network_security_config.xml -->
<pin-set expiration="2020-03-16">
    <pin digest="SHA-256">i6zSAujxX6KALeLg5tcKnvOIn+PsoUXIgED2TG3QYJg=</pin>
</pin-set>

<!-- AndroidManifest.xml -->
  android:networkSecurityConfig="@xml/network_security_config"
```

Way 2: OkHttp

```java
new OkHttpClient.Builder().certificatePinner(certificatePinner)
```

# Refs

- [Hash fucntions](https://cryptii.com/pipes/hash-function)
- https://www.baeldung.com/sha-256-hashing-java
- https://www.thesslstore.com/blog/difference-sha-1-sha-2-sha-256-hash-algorithms/
- [Descriptions of SHA-256, SHA-384, and SHA-512](http://iwar.org.uk/comsec/resources/cipher/sha256-384-512.pdf)
- https://www.runoob.com/w3cnote/https-ssl-intro.html
- https://baike.so.com/doc/989919-1046498.html
- https://www.ssl.com/faqs/what-is-an-x-509-certificate
- https://www.codebyamir.com/blog/java-developers-guide-to-ssl-certificates
- https://zhuanlan.zhihu.com/p/58308036
- https://www.jianshu.com/p/dcfb61720413
- [Security with HTTPS and SSL](https://developer.android.google.cn/training/articles/security-ssl?hl=en)
- [Network security configuration](https://developer.android.google.cn/training/articles/security-config?hl=en)
- https://blog.csdn.net/pcsxk/article/details/103057491
