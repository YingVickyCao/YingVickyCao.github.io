# Encrypting(加密和解密) and Hashing

# 1 Encrypting(加密和解密)

## 密码(cipher)

一种用于加密或者解密的算法

## 密钥(key)

密钥是一种参数，它是在使用密码（cipher）算法过程中输入的参数。  
同一个明文在相同的密码算法和不同的密钥计算下会产生不同的密文。  
密钥才是决定密文是否安全的重要参数，通常密钥越长，破解的难度越大。  
密钥分为对称密钥与非对称密钥。

### 对称密钥 (Symmetric-key algorithm)

又称为`共享密钥加密`。  
 对称密钥在加密和解密的过程中使用同一个密钥。

常见的对称加密算法有 DES、3DES、AES、RC5、RC6。

优点：计算速度快  
 缺点：  
 1 安全性差。  
 2 密钥管理难。  
 因为密钥需要在通讯的两端共享：  
 如果所有客户端都共享同一个密钥，那么这个密钥能破解所有人的密文了。
如果每个客户端与服务端单独维护一个密钥，那么服务端需要管理的密钥将是成千上万，这会给服务端带来噩梦。

### 非对称密钥（public-key cryptography）

- 又称为`公开密钥加密`.

- 服务端会生成一对密钥，一个`私钥`保存在服务端，仅自己知道，另一个是`公钥`，公钥可以自由发布供任何人使用。  
  算法不需要公布，算法大家都知道。
- 非对称密钥在加密和解密的过程的使用的密钥是不同的密钥，加密和解密是不对称的.  
  即：一方加密的内容可以由并且只能由对方进行解密。  
  (1) 公钥加密,私钥解密。  
  (2) 私钥加密,公钥解密。

  与对称密钥加密相比，非对称加密无需在客户端和服务端之间共享密钥，只要私钥不发给任何用户，即使公钥在网上被截获，也无法被解密，仅有被窃取的公钥是没有任何用处的。

- 优点  
  安全性强
- 缺点  
  计算速度慢。

- 常见的非对称加密有 RSA，

- 非对称加解密的过程：  
  1.服务端生成配对的公钥和私钥  
  2.私钥保存在服务端，公钥发送给客户端  
  3.客户端使用公钥加密明文传输给服务端  
  4.服务端使用私钥解密密文得到明文

## 明文（plaintext）, 密文（ciphertext）

明文是加密之前的数据。  
密文是通过密码（cipher）运算后得到的结果成为密文（ciphertext）

## 何为 加密 和 解密 ？

加密：把传入的内容，经过一定的算法，变成内容  
解密：传入变后的内容，经过一定的算法，还原成原来的内容

<h3 id="symmetric_encryption">对称加密(Symmetric Cryptography)</h3>
  加密与解密用的是对称密钥。

### 非对称加密（Asymmetric Cryptography）

加密时使用非对称密钥。  
组合使用 对称加密和非对称加密：  
利用非对称加密来加密对称加密的密钥，然后用对称加密的密钥加密整个网络交互的数据包  
 ![Combine_Asymmetric_and_Symmetric_cryptography_4_newwork.png](https://yingvickycao.github.io/img/Combine_Asymmetric_and_Symmetric_cryptography_4_newwork.png)

## 一个加密通信过程的演化

e.g. RSA

# 2 Hash

A hashing algorithm is a mathematical function that condenses data to a fixed size

## 信息摘要（Message Digests）/ 摘要:

对信息使用某种 Hash 算法，得到的 Hash 值

# 3 碰撞(collision )攻击

抗碰撞性是相对与碰撞攻击讲，碰撞攻击指两个不同的原数据在算法加密 / hash 后得到了相同的值。

> collision: if two different values or files can produce the same hash, you create what we call a collision.

# 4 Hash vs Encrypting

Hashing is a one way function  
Encrypting is a proper (two way) function.

## Encrypting

| 对称加密      |
| ------------- |
| [Dec](Dec.md) |
| 3DES          |
| [AES](AES.md) |
| RC6           |

---

| 非对称加密    |
| ------------- |
| [RSA](RSA.md) |

## Hashing

| Hashing              | Encoded bytes |
| -------------------- | ------------- |
| [MD5](MD5.md)        | 16            |
| [Base 64](Base64.md) |
| [SHA](SHA.md)        |               |

- A cryptographic hash can be used to make a signature for a text or a data file.
- There are hundreds of hashing algorithms out there and they all have specific purposes – some are optimized for certain types of data, others are for speed, security, etc.
- cryptographic hash algorithms produce irreversible and unique hashes

### 特点

- 强抗碰撞
- produces unique hashes  
  determinism :
  Same content -> same hash value  
  Different content -> different hash value

  ![determinism](https://www.thesslstore.com/blog/wp-content/uploads/2018/08/Hashing.png)

- one-way hash  
  不可逆(irreversible).不能通过 Hash 值反推出原始数据的值

### 使用场景

- 一致性验证:监测文件是否被篡改：  
  使用 MD5 checksum 校验下载后的软件包是否被修改

- 一致性验证:监测数据完整性：  
   服务器使用 MD5 验证收到的数据是否完整

  ![MD5_server_check_user_info](https://yingvickycao.github.io/img/MD5_server_check_user_info.png)

- 数字签名
- 安全访问认证  
  操作系统的登陆认证：hashed 并存储用户设置的密码。当用户下次登录时，MD5 Hash 密码，判断与 saved 是否一致。
- 秒传  
  网盘在用户上传文件时，根据文件的 Hash 值监测网盘是否已上传。  
  若没有，则上传； b
  若已上传，则共享。  
  目的：服务器文件去重，降低服务器负载，减少服务器存储占用

# 6 签名(signature)

什么是签名？
签名是信息对应的某种 Hash 值 被加密后的值

```
信息 -> hash值(hash1) -> 加密 -> 获取 hash值，即签名(hash2)

发送方                  接受方
签名 + 信息     ->      信息 -> hash 值（hash3），
                       解密hash2后获取hash1，
                       If hash1 != hash3,则信息被篡改，或收到的信息不完整
```

- 使用不同的 hash 算法，得到的 hash 值不同。
- 信息发送时经常被加密。接受方在收到后先解密信息，才能进行接下来的校验步骤。

# 5 [证书](Certificate.md)

# QA

- Q `error: package javax.xml.bind does not exist import javax.xml.bind.DatatypeConverter;`  
  A :
  https://www.cnblogs.com/it-tsz/p/11749651.html
  When Java > 8, `javax.xml.bind` package is excluded.

  How to Fix?  
  Way 1 : Change JDK to JDK 8  
  Way 2 : Add jar dependency

  ```
  javax.xml.bind:jaxb-api:2.3.0
  ```

- Q : `java.net.UnknownServiceException: CLEARTEXT communication to gitee.com not permitted by network security policy`

# Refs

- [Difference between Hashing a Password and Encrypting it](https://stackoverflow.com/questions/326699/difference-between-hashing-a-password-and-encrypting-it)
- https://www.cnblogs.com/btgyoyo/p/6245618.html
- https://www.cnblogs.com/JeffreySun/archive/2010/06/24/1627247.html
