# Charles 在 Android Device/Emulator 抓包

若仅仅抓包 Android，不用抓包 Mac，  
(1)关闭`Proxy-> maxOS Proxy`;  
(2)Charles 设置取消 http host 为 `*`.

# 1 Android Device

- Step 1 : 设置手机代理

Android -> 设置 -> Connections -> Selecte Connected Wifi -> Advanced -> Proxy , Manual->Proxy host name/Proxy Port

```
# Proxy host name = Charles Local IP Address
192.168.1.5

# Proxy Port = Charles Proxy Port
8888
```

Help -> Local IP Address  
![charles_Local_IP_Address](https://yingvickycao.github.io/img/tools/charles/charles_Local_IP_Address.png)

=> Enable HTTP

- Step 2 : 安装 charles 证书

浏览器输入 `chls.pro/ssl` 来下载证书。

Settings -> Search "User certifications" ->  `Install from device storrage` ->  `WLAN certificate`  
Other :  `Clear credentials`, `User certificates` to view installed certs.

=> Enable HTTPS

If 没有设置此步骤, https of Android in Charles is showed `unknown`.

<br/>

Charles 抓取 手机 Https 包出现 Unknown. Reason :  
(1) 手机在未安装证书  
(2) 接口响应超时或者响应失败的情况

<br/>
用户安装的证书，是用户证书，位于/system/etc/security/cacerts。

如何查看安装后的证书？通过 openssl 计算证书 hash 值。

```xml
//.cer 格式证书
openssl x509 -inform DER -subject_hash_old -in cacert.cer
//.pem 格式证书
openssl x509 -inform PEM -subject_hash_old -in cacert.pem
```

E.g., 87af7a0e -> 安装后的名字为 87af7a0e.0

生成证书文件（加上".0"），也可以手动重命名。

```
//cer 格式
openssl x509 -inform DER -text -in xxx.cer > hash 值.0

//pem 格式
openssl x509 -inform PEM -text -in xxx.pem > hash 值.0
```

- Step 3 : If Root 后的>=Android7.0

拷贝用户证书，到系统证书位置：`/system/etc/security/cacerts/`
https://blog.csdn.net/weixin_42081389/article/details/121019793

# 2 Android Emulator (Not work)

```
emulator -avd <device name> -http-proxy http://本地地址:8888
```

# FAQ

- https : certificate_unknown

```
SSL handshake with client failed: An unknown issue occurred processing the certificate(certificate_unknown)

You may need to configure your browser or application to trust the Charles Root Certificate. See SSL Proxying in the Help menu.
```

```
E/CONSCRYPT: ------------------Untrusted chain: ----------------------
E/CONSCRYPT: == Chain0 ==

E/CONSCRYPT: AuthorityKeyIdentifier: 481cf3081cc8014fd4efccabbf0b9f1452486a509433a81e1a6dedca181aba481a83081a53136303406035504030c2d436861726c65732050726f787920434120283131204a756e20323032302c203139322e3136382e302e3130322931253023060355040b0c1c68747470733a2f2f636861726c657370726f78792e636f6d2f73736c3111300f060355040a0c08584b3732204c74643111300f06035504070c084175636b6c616e643111300f06035504080c084175636b6c616e64310b3009060355040613024e5a82060172a29c6402
E/CONSCRYPT: SubjectKeyIdentifier: 4160414172a04ab20b53f25d9c9718b5767b9bd1b0d79dd
E/CONSCRYPT: Serial Number: 172a2a1072b
E/CONSCRYPT: SubjectDN: CN=\*.gitee.com
E/CONSCRYPT: IssuerDN: C=NZ, ST=Auckland, L=Auckland, O=XK72 Ltd, OU=https://charlesproxy.com/ssl, CN="Charles Proxy CA (11 Jun 2020, 192.168.0.102)"
E/CONSCRYPT: Get not before: Mon Mar 16 08:00:00 GMT+08:00 2020
E/CONSCRYPT: Get not after: Tue Mar 16 20:00:00 GMT+08:00 2021
E/CONSCRYPT: Sig ALG name: SHA256withRSA
E/CONSCRYPT: Signature: -6eb93a95824e906dc4b0bcf9e898a93afe8a54193f26e56b9a7ebacfed20dcca5bcc7b89f70bcefa23e34db3afd82803c65a6b4aa76d4869c09a102fe0bd633266982afdc1c151d03ee594480a4e7189d8b9b3335e9cd3e699491642b7acdb7fbb7b2989886d835e6cc9495654b18c9c2f43107d0c077f5cd21378e26cded2d9288425523c5b016cd9c87041292c43aeba7bf052f18804d80836f878ecd9027cc145d07ff2fb75a68ea828c46e853bbebf1a583e61b75d1d89a1ebbefd4ffd6e045249aca18ff952250530c5f83653d04d94fd089573209b134de117059a20eff08ed22fda44bbe7b4889544e8789f3d42b947914a63d945b7d531c8c6ca4178
E/CONSCRYPT: Public key:

      30 82 01 22 30 0d 06 09 2a 86 48 86 f7 0d 01 01 01 05 00 03
      82 01 0f 00 30 82 01 0a 02 82 01 01 00 96 d6 0e b4 a6 f9 e7
      1b 48 49 d7 a3 eb 2e 90 9a 8d a6 e9 6e 49 47 45 ba 2a 28 4d
      38 3b e3 6f a1 19 bd 52 a4 67 f9 c8 f1 19 ea 97 94 43 d6 13
      e1 2e 12 f9 17 8f c6 6c dd a1 8f 61 f4 b8 9a 12 c7 51 4b b0
      79 53 80 95 ba ce fb d7 94 0e f4 28 9b f1 c7 f3 1d 97 61 1f
      0c a4 c0 1c 48 03 e6 a5 71 34 9e 50 9d 85 96 ab 21 34 8f 00
      95 db c5 2b 62 fe 7f 7f 54 95 a4 a6 94 74 52 15 d9 32 66 70
      f9 ee 69 78 39 0e 5e 7f 12 c5 c8 14 09 0b 5c 9b c6 d6 1e 28
      ae ec d0 aa e2 bb 1f 93 12 77 0a e5 a6 ab e8 16 19 4f b0 64
      e5 c4 df 29 ce 19 7c 8b ed ea dc 9c cc 13 96 25 9f 20 24 fe
      f0 94 73 1a 49 6b 35 e4 94 83 39 8e cd 1b 23 0f fd 46 66 da
      0a 28 31 bf ec 28 f0 d1 d0 84 4a 5a 9e d3 1e e7 f0 7e 65 50
      94 fd ea 46 1e f5 e2 fe 62 16 34 f2 de 84 ec 40 0c 10 ca cf
      bd 09 a6 88 17 bb dc bd cf 02 03 01 00 01

E/CONSCRYPT: == Chain1 ==
Version: 3
E/CONSCRYPT: SubjectKeyIdentifier: 4160414fd4efccabbf0b9f1452486a509433a81e1a6dedc
E/CONSCRYPT: Serial Number: 172a29c6402
E/CONSCRYPT: SubjectDN: C=NZ, ST=Auckland, L=Auckland, O=XK72 Ltd, OU=https://charlesproxy.com/ssl, CN="Charles Proxy CA (11 Jun 2020, 192.168.0.102)"
E/CONSCRYPT: IssuerDN: C=NZ, ST=Auckland, L=Auckland, O=XK72 Ltd, OU=https://charlesproxy.com/ssl, CN="Charles Proxy CA (11 Jun 2020, 192.168.0.102)"
E/CONSCRYPT: Get not before: Sat Jan 01 08:00:00 GMT+08:00 2000
E/CONSCRYPT: Get not after: Sun Aug 08 17:00:57 GMT+08:00 2049
E/CONSCRYPT: Sig ALG name: SHA256withRSA
E/CONSCRYPT: Signature: 4ff1d210fea7a917d8d7da8ccc5cc88ba7775d243947f554eead55ca22c05f2e07378227ae13cb1147aa355de71975143f63231fd8a8f16dc97ef1c8f394dc7dd3f458db78a85e9d85031e8e11902a230eb7a7c5eca284682ac57c09278d7083b94279ebae186db8c554880bc71e4d549a338df4c0d76badb529896fb6a52b48f3ca06db4ca027d9f759381b5431135bac63ddecf98270120e45dab6ac26b52739fa52e96c0ba9b4be763c3a6efe02c00b3e2bee82ee69c6c099498b22292b54bc664feeaed517999cdeb7ccf27c379ee86d876a70f922a2696b19124bc1cd653ddd17f3615091cebbf6b1477ff2299000ce987e2196d75f501210de73cab6c9
E/CONSCRYPT: Public key:

      30 82 01 22 30 0d 06 09 2a 86 48 86 f7 0d 01 01 01 05 00 03
      82 01 0f 00 30 82 01 0a 02 82 01 01 00 93 80 b7 bc e6 fb 54
      73 10 05 f7 8e 4f e9 48 04 89 d4 7d 87 4d 98 27 92 c1 9e c4
      4d 7f 2f e6 bf 74 e6 69 a3 ce 60 70 30 06 78 cb 55 11 ef 39
      75 d0 a1 38 dd 41 bd 46 24 11 b3 8e 02 62 7b 4e e5 bb e0 c7
      85 9f bf ce 73 30 66 17 b5 4c 60 1a df e9 39 36 3c 06 6e 79
      3f fd 15 5f 12 2a c7 fa 52 8d 02 de 39 8c 89 5c fc d7 df a3
      2c bc 3f 1e 80 09 d7 18 3b d4 cc 7e b9 a2 7d 77 25 15 08 9b
      61 b4 cc 5e a6 7b 3a ae 92 f1 ee fe 9c bb f8 44 1b 43 7f f7
      3e 9a 71 16 f0 5d 41 2e 74 07 37 2a 5f 50 d8 14 30 d8 8d 91
      bc 45 f2 70 85 80 de bb bd eb 17 8a fd c0 c9 05 34 36 ae 1a
      b1 27 b1 22 3b ed 69 29 4a 30 fd 78 c6 cf 0d c2 a9 8a 7e e0
      d0 f0 c2 27 02 f0 fc 97 f5 24 8d 0a 1d 5f 69 95 c5 92 c6 30
      06 e8 da a4 46 44 c8 7e 2d 55 84 b5 36 99 06 73 be 09 b1 ba
      e0 64 6f 2d f0 bf 77 6b 7f 02 03 01 00 01

E/MainActivity: onError:
javax.net.ssl.SSLHandshakeException: java.security.cert.CertPathValidatorException: Trust anchor for certification path not found.
at com.android.org.conscrypt.ConscryptFileDescriptorSocket.startHandshake(ConscryptFileDescriptorSocket.java:239)

```

**Reason** :

(1) 证书校验原理:
https://www.cnblogs.com/lulianqi/p/11380794.html

无论 Fiddler 或 Charles 都使用中间人攻击的方式替换 tls 链路证书，解密报文然后再加密发送给真实服务器。

```

When not use Charles:
APP -> 真正服务器

When Use Charles
APP -> Charles （中间人） -> 真正服务器

```

(2) Android < 7.0, 在手机上安装了抓包工具的证书后，就能抓取 https 请求。
(3) Android >=7.0 (API 24)之后默认不信任用户添加到系统的 CA 证书，因此，即使在手机上安装了抓包工具的证书，也无法抓取 https 请求。

Fix :
Way 1 : 用低版本的测试机
Way 2 : 强制使用 Charles 的证书 替代 真正的证书信息与真正服务器进行 SSL 认证。

```java
// MyHostnameVerifier。java
public class MyHostnameVerifier implements HostnameVerifier {
  @Override
    public boolean verify(String hostname, SSLSession session) {
      return true;
    }
}
```

```xml
<!-- AndroidManifest.xml -->
android:networkSecurityConfig="@xml/network_security_config_4_charles"
```

```xml
<!-- res/xml/network_security_config_4_charles.xml -->
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <!-- Android 6.0 -->
    <!-- <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">*.gitee.com</domain>
        <trust-anchors>
            <certificates src="@raw/charles_ssl_proxying_certificate"/>
        </trust-anchors>
    </domain-config> -->

<!-- Android >=7.0 debug 信任用户证书 -->
    <debug-overrides>
        <trust-anchors>
            <certificates src="@raw/charles_ssl_proxying_certificate"/>
        </trust-anchors>
    </debug-overrides>
</network-security-config>
```

# Refs:

- https://developer.android.google.cn/training/articles/security-config

```

```
