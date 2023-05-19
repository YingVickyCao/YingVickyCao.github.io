# RSA

- 理解非对称加密

```
我有两把锁和两把对应的钥匙：
私钥A、公锁A
私锁B、公钥B
私钥A可以开公锁A，公钥B可以开公锁B
公锁A和公钥B放到了门外，所有人都可以拿
私钥A和私锁B，我自己藏着不让人知道
```

- key size = 推荐 1024 位 0
- RSA 的输入和输出的 Block 的大小 (摘录)  
  RSA 的输入和输出的 Block 的大小是不一样的，Block 的大小依赖于所使用的 RSA Key 的长度和 RSA 的 padding 模式。
  在测试用例中，分别对 RSA 设置三种长度的 Key（768,1024,2048）和 2 种 padding 模式（PKCS 1.5 和 OAEP）。测试:  
  RSA |InBlock 大小 | OutBlock 大小 (单位，字节)|
  ---|---|---|
  768bit/PKCS |85 | 96|
  1024bit/PKCS|117 | 128|
  2048bit/PKCS|245 | 256|
  768bit/OAEP |54 | 96|
  1024bit/OAEP|86 | 128|
  2048bit/OAEP|214 | 256|

- QA : ERROR:javax.crypto.IllegalBlockSizeException: Data must not be longer than 117 bytes

```java
// encrypt
// ERROR:javax.crypto.IllegalBlockSizeException: Data must not be longer than 117 bytes
byte[] encrypted = cipher.doFinal(inputs);
```

```java
// decrypt
// ERROR:javax.crypto.IllegalBlockSizeException: Data must not be longer than 128 bytes
byte[] decrypted = cipher.doFinal(inputs);
```

Reason:  
一个 1024 位的密钥只能加密 117 位字节数据，解密 128 位，否则程序异常

Q:  
Way 1 : RSA 结合 AES  
首先通过 RSA 加密传输得到对称加密密钥（AES），然后通过使用 AES 来加密数据 (Recommend) 通信。  
与单独使用 AES 加密相比：更安全。  
与单独使用 RSA 相比：速度更快

Way 2 : 分段进行加密数据  
安全,但加密解密太慢

- 规范：公钥用来加密，私钥用来签名

  RSA 算法中，私钥公钥是完全对等的，一个用作加密，另一个就可以解密。根据加密的内容 和 方向不同，形成了 加密和 签名等用法。

  **加密 / 解密：防止信息被窃取**：

  ```
  明文--公钥加密---密文--私钥解密---明文
  ```

  每次密文不同。更安全。  
  目的：为了防止明文消息被第三方获取（私密性）  
  游戏数据加密经常用 RSA 配合 AES.  
  加密过程会填充随机 padding，以确保同一个数据，每次 RSA 加密的结果不同，提高破解难度。

  **签名 / 验签：防止数据被篡改**：

  ```
  明文--私钥加密---密文--公钥解密---明文
  ->
  明文的哈希--私钥加密---签名---公钥解密----明文的哈希
  ```

  每次密文相同。  
  目的：为了方便消息接收方确认消息没有被篡改（完整性）  
  私钥签名（加密）和公钥验证签名（解密）是数字签名的基础，必然是可以保证安全性的：若哈希值和明文的哈希值相同，则证明 明文的发送者，是私钥的持有者。每次结果都有一致性，已判断保护的数据块是否被篡改。  
  加密内容是数字摘要。  
  验签的时候对比的不是原始数据，而是消息摘要。  
  签名有有效期，到期要续签。

  实践：  
  UAT 的不同环境签名不同，签名由专门人管理。

# Refs

- [为什么 RSA 公钥每次加密得到的结果都不一样？](https://www.jianshu.com/p/e300f7735c87)
- [padding 填充方式的描述](https://tools.ietf.org/html/rfc2313#section-8.1)
- [RSA ERROR:Data must not be longer than 117 bytes](http://www.manongjc.com/article/57382.html)
