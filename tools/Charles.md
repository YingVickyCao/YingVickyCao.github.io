# Charles

- Charles v4.5.6
- Mac OS 10.14.6
- Samsung SM-T830 (Android 9 )  
  与 Mac 连接同一个 Wifi
- Iphone 6S Plus with Software Version is `12.4.1`  
  与 Mac 连接同一个 Wifi
- Wifi 重连，Charles 重新打开，都需要重新设置。

# 1 Charles 在 Mac 上抓 http/https 协议的包

## 1.1 Help -> SSL Proxying -> Install Charles Root Certificate

![Charles_config_4_mac_1](https://yingvickycao.github.io/img/Charles_config_4_mac_1.jpg)

如果装完后提示证书不信任，则点击 CA 证书那一项，更改为都信任

![Charles_config_4_mac_2](https://yingvickycao.github.io/img/Charles_config_4_mac_2.png)

## 1.2 Proxy Setting

点击 1，直接开启抓包。
![Charles_config_4_mac_6](https://yingvickycao.github.io/img/Charles_config_4_mac_6.png)

或者

点击 2，详细配置 Mac Proxy Setting.  
在 Menu 选择 Proxy->SSL Proxying Setting，选,在 Locations 里面添加要使用 SSL 代理的网站.  
`*`= 拦截 Https 的数据包

![Charles_config_4_mac_4](https://yingvickycao.github.io/img/Charles_config_4_mac_4.png)

![Charles_config_4_mac_3](https://yingvickycao.github.io/img/Charles_config_4_mac_3.png)

经过以上步骤，可以正常抓取 Mac 的 http/https 协议的包。

# 2 Charles 在 Android Device 上抓 http/https 协议的包

## 2.1 Config Proxy at Android ( Enabel HTTP )

Step 1 : 设置 手机 Wifi Proxy
Android -> 设置 -> Connections -> Selecte Connected Wifi -> Advanced -> Proxy , Manual->

```
# Proxy host name = Mac IP
192.168.0.102

# Proxy Port = Charles Proxy Port
8888
```

![Charles_config_4_android_5](https://yingvickycao.github.io/img/Charles_config_4_android_5.jpg)

## 2.2 Install Charles Certificate at Android ( Enable HTTPS )

If not set 2.2, https of Android in Charles is showed `unknown`

Charles 抓取 手机 Https 包出现 Unknown. Reason :  
(1) 手机在未安装证书  
(2) 接口响应超时或者响应失败的情况

在手机上安装的证书在哪里？  
Setting ->Search "查看安全证书"  
安装一次就可以。

### Way 1:

Step1 : Charles -> Help -> SSL Proxying -> Save Charles Root Certificate, save as `.pem` files, e.g., Charles.pem

![Charles_config_4_android_1](https://yingvickycao.github.io/img/Charles_config_4_android_1.jpg)

Step2 : Push Charles.pem to android Device

Step 3 : Click Charles.pem to install it, and name the Certificate, e.g., Charles.

![Charles_config_4_android_2](https://yingvickycao.github.io/img/Charles_config_4_android_2.jpg)

若安装成功，提示 “Charles installed”, 说明证书已经装好

### Way 2 : 使用手机浏览器 下载 Charles Certificate，并安装

Step1 : Help -> SSL Proxying -> Install Charles Root Certificate on a Mobile Device or Remote Browser

![Charles_config_4_android_3](https://yingvickycao.github.io/img/Charles_config_4_android_3.jpg)

![Charles_config_4_android_4](https://yingvickycao.github.io/img/Charles_config_4_android_4.jpg)

![Charles_config_4_android_6](https://yingvickycao.github.io/img/Charles_config_4_android_6.jpg)

Step 2 : 手机浏览器 输入`chls.pro/ssl`  
询问是否下载证书，点击 Downlaod

Step 3 : same as `2.2 - Way 1 - Step 3`

# 3 Charles 在 Android Emulator 上抓 http/https 协议的包

```
emulator -avd <device name> -http-proxy http://本地地址:8888
```

# 4 Charles 在 iPhone 上抓 http/https 协议的包

## 4.1 设置手机代理

Iphone -> Settings -> Wifi -> Choose selected Wifi -> HTTP PROXY, "Configure Proxy" -> "Manual"

```
# Server = Mac IP
192.168.0.102

# Port = Charles Proxy Port
8888
```

## 4.2 Install Charles Certificate at IPhone

Step1 : Charles -> Help -> SSL Proxying -> Install Charles Root Certificate on a Mobile Device or Remote Browser

![Charles_config_4_android_3](https://yingvickycao.github.io/img/Charles_config_4_android_3.jpg)

![Charles_config_4_android_4](https://yingvickycao.github.io/img/Charles_config_4_android_4.jpg)

![Charles_config_4_android_6](https://yingvickycao.github.io/img/Charles_config_4_android_6.jpg)

Step 2 : 手机浏览器 输入`chls.pro/ssl`  
![Charles_config_4_IPhone_1](https://yingvickycao.github.io/img/Charles_config_4_IPhone_1.png)

![Charles_config_4_IPhone_2](https://yingvickycao.github.io/img/Charles_config_4_IPhone_2.jpg)

Step 3 : 信任证书  
IPhone -> Settings -> General -> About -> Certificate Trust Settings ->  
PS : 没有出来信任证书，最后也能抓 Htpps 包。但理论上是不能抓 Htpps 包。

![Charles_config_4_IPhone_3](https://yingvickycao.github.io/img/Charles_config_4_IPhone_3.jpg)

# 5 Charles 在 iPhone Emulator 上抓 http/https 协议的包

# 6 ERROR

## Q : https : certificate_unknown

```
SSL handshake with client failed: An unknown issue occurred processing the certificate(certificate_unknown)

You may need to configure your browser or application to trust the Charles Root Certificate. See SSL Proxying in the Help menu.
```

```

E/CONSCRYPT: ------------------Untrusted chain: ----------------------
E/CONSCRYPT: == Chain0 ==

E/CONSCRYPT:  AuthorityKeyIdentifier:   481cf3081cc8014fd4efccabbf0b9f1452486a509433a81e1a6dedca181aba481a83081a53136303406035504030c2d436861726c65732050726f787920434120283131204a756e20323032302c203139322e3136382e302e3130322931253023060355040b0c1c68747470733a2f2f636861726c657370726f78792e636f6d2f73736c3111300f060355040a0c08584b3732204c74643111300f06035504070c084175636b6c616e643111300f06035504080c084175636b6c616e64310b3009060355040613024e5a82060172a29c6402
E/CONSCRYPT:  SubjectKeyIdentifier:   4160414172a04ab20b53f25d9c9718b5767b9bd1b0d79dd
E/CONSCRYPT:  Serial Number:   172a2a1072b
E/CONSCRYPT:  SubjectDN:   CN=*.gitee.com
E/CONSCRYPT:  IssuerDN:   C=NZ, ST=Auckland, L=Auckland, O=XK72 Ltd, OU=https://charlesproxy.com/ssl, CN="Charles Proxy CA (11 Jun 2020, 192.168.0.102)"
E/CONSCRYPT:  Get not before:   Mon Mar 16 08:00:00 GMT+08:00 2020
E/CONSCRYPT:  Get not after:   Tue Mar 16 20:00:00 GMT+08:00 2021
E/CONSCRYPT:  Sig ALG name:   SHA256withRSA
E/CONSCRYPT:  Signature:   -6eb93a95824e906dc4b0bcf9e898a93afe8a54193f26e56b9a7ebacfed20dcca5bcc7b89f70bcefa23e34db3afd82803c65a6b4aa76d4869c09a102fe0bd633266982afdc1c151d03ee594480a4e7189d8b9b3335e9cd3e699491642b7acdb7fbb7b2989886d835e6cc9495654b18c9c2f43107d0c077f5cd21378e26cded2d9288425523c5b016cd9c87041292c43aeba7bf052f18804d80836f878ecd9027cc145d07ff2fb75a68ea828c46e853bbebf1a583e61b75d1d89a1ebbefd4ffd6e045249aca18ff952250530c5f83653d04d94fd089573209b134de117059a20eff08ed22fda44bbe7b4889544e8789f3d42b947914a63d945b7d531c8c6ca4178
E/CONSCRYPT:  Public key:

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
     Version:   3
E/CONSCRYPT:  SubjectKeyIdentifier:   4160414fd4efccabbf0b9f1452486a509433a81e1a6dedc
E/CONSCRYPT:  Serial Number:   172a29c6402
E/CONSCRYPT:  SubjectDN:   C=NZ, ST=Auckland, L=Auckland, O=XK72 Ltd, OU=https://charlesproxy.com/ssl, CN="Charles Proxy CA (11 Jun 2020, 192.168.0.102)"
E/CONSCRYPT:  IssuerDN:   C=NZ, ST=Auckland, L=Auckland, O=XK72 Ltd, OU=https://charlesproxy.com/ssl, CN="Charles Proxy CA (11 Jun 2020, 192.168.0.102)"
E/CONSCRYPT:  Get not before:   Sat Jan 01 08:00:00 GMT+08:00 2000
E/CONSCRYPT:  Get not after:   Sun Aug 08 17:00:57 GMT+08:00 2049
E/CONSCRYPT:  Sig ALG name:   SHA256withRSA
E/CONSCRYPT:  Signature:   4ff1d210fea7a917d8d7da8ccc5cc88ba7775d243947f554eead55ca22c05f2e07378227ae13cb1147aa355de71975143f63231fd8a8f16dc97ef1c8f394dc7dd3f458db78a85e9d85031e8e11902a230eb7a7c5eca284682ac57c09278d7083b94279ebae186db8c554880bc71e4d549a338df4c0d76badb529896fb6a52b48f3ca06db4ca027d9f759381b5431135bac63ddecf98270120e45dab6ac26b52739fa52e96c0ba9b4be763c3a6efe02c00b3e2bee82ee69c6c099498b22292b54bc664feeaed517999cdeb7ccf27c379ee86d876a70f922a2696b19124bc1cd653ddd17f3615091cebbf6b1477ff2299000ce987e2196d75f501210de73cab6c9
E/CONSCRYPT:  Public key:

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
        at okhttp3.internal.connection.RealConnection.connectTls(RealConnection.java:336)
        at okhttp3.internal.connection.RealConnection.establishProtocol(RealConnection.java:300)
        at okhttp3.internal.connection.RealConnection.connect(RealConnection.java:185)
        at okhttp3.internal.connection.ExchangeFinder.findConnection(ExchangeFinder.java:224)
        at okhttp3.internal.connection.ExchangeFinder.findHealthyConnection(ExchangeFinder.java:108)
        at okhttp3.internal.connection.ExchangeFinder.find(ExchangeFinder.java:88)
        at okhttp3.internal.connection.Transmitter.newExchange(Transmitter.java:169)
        at okhttp3.internal.connection.ConnectInterceptor.intercept(ConnectInterceptor.java:41)
        at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:142)
        at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:117)
        at okhttp3.internal.cache.CacheInterceptor.intercept(CacheInterceptor.java:94)
        at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:142)
        at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:117)
        at okhttp3.internal.http.BridgeInterceptor.intercept(BridgeInterceptor.java:93)
        at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:142)
        at okhttp3.internal.http.RetryAndFollowUpInterceptor.intercept(RetryAndFollowUpInterceptor.java:88)
        at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:142)
        at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:117)
        at okhttp3.RealCall.getResponseWithInterceptorChain(RealCall.java:229)
        at okhttp3.RealCall.execute(RealCall.java:81)
        at retrofit2.OkHttpCall.execute(OkHttpCall.java:188)
        at retrofit2.adapter.rxjava.CallExecuteOnSubscribe.call(CallExecuteOnSubscribe.java:40)
        at retrofit2.adapter.rxjava.CallExecuteOnSubscribe.call(CallExecuteOnSubscribe.java:24)
        at rx.Observable.unsafeSubscribe(Observable.java:10327)
        at rx.internal.operators.OperatorSubscribeOn$SubscribeOnSubscriber.call(OperatorSubscribeOn.java:100)
        at rx.internal.schedulers.CachedThreadScheduler$EventLoopWorker$1.call(CachedThreadScheduler.java:230)
        at rx.internal.schedulers.ScheduledAction.run(ScheduledAction.java:55)
        at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:462)
        at java.util.concurrent.FutureTask.run(FutureTask.java:266)
        at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:301)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1167)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:641)
        at java.lang.Thread.run(Thread.java:919)
     Caused by: java.security.cert.CertificateException: java.security.cert.CertPathValidatorException: Trust anchor for certification path not found.
        at com.android.org.conscrypt.TrustManagerImpl.verifyChain(TrustManagerImpl.java:688)
        at com.android.org.conscrypt.TrustManagerImpl.checkTrustedRecursive(TrustManagerImpl.java:557)
        at com.android.org.conscrypt.TrustManagerImpl.checkTrustedRecursive(TrustManagerImpl.java:623)
        at com.android.org.conscrypt.TrustManagerImpl.checkTrusted(TrustManagerImpl.java:513)
        at com.android.org.conscrypt.TrustManagerImpl.checkTrusted(TrustManagerImpl.java:432)
        at com.android.org.conscrypt.TrustManagerImpl.getTrustedChainForServer(TrustManagerImpl.java:360)
        at android.security.net.config.NetworkSecurityTrustManager.checkServerTrusted(NetworkSecurityTrustManager.java:94)
        at android.security.net.config.RootTrustManager.checkServerTrusted(RootTrustManager.java:89)
        at com.android.org.conscrypt.Platform.checkServerTrusted(Platform.java:224)
E/MainActivity:     at com.android.org.conscrypt.ConscryptFileDescriptorSocket.verifyCertificateChain(ConscryptFileDescriptorSocket.java:430)
        at com.android.org.conscrypt.NativeCrypto.SSL_do_handshake(Native Method)
        at com.android.org.conscrypt.NativeSsl.doHandshake(NativeSsl.java:387)
        at com.android.org.conscrypt.ConscryptFileDescriptorSocket.startHandshake(ConscryptFileDescriptorSocket.java:234)
        	... 33 more
     Caused by: java.security.cert.CertPathValidatorException: Trust anchor for certification path not found.
        	... 46 more

```

**Reason** :

- 证书校验原理:  
  https://www.cnblogs.com/lulianqi/p/11380794.html

  无论 Fiddler 或 Charles 都使用中间人攻击的方式替换 tls 链路证书，解密报文然后再加密发送给真实服务器。

```
When not use Charles:
APP -> 真正服务器

When Use Charles
APP -> Charles （中间人） -> 真正服务器
```

- Android < 7.0, 在手机上安装了抓包工具的证书后，就能抓取 https 请求。
- Android >=7.0 (API 24)之后默认不信任用户添加到系统的 CA 证书，因此，即使在手机上安装了抓包工具的证书，也无法抓取 https 请求。

**A** ：  
 Way 1 : 用低版本的测试机

Way 2 : 强制使用 Charles 的证书 替代 真正的证书信息与真正服务器进行 SSL 认证。

- res/raw/charles_ssl_proxying_certificate.pem  
  Charles -> Help -> SSL Proxing -> Save Charles Root Certificate

- HostnameVerifier verify always return true

```java
public class MyHostnameVerifier implements HostnameVerifier {
  @Override
    public boolean verify(String hostname, SSLSession session) {
      return true;
    }
}
```

- AndroidManifest.xml

```xml
android:networkSecurityConfig="@xml/network_security_config_4_charles"
```

log:  
NetworkSecurityConfig: Using Network Security Config from resource network_security_config debugBuild: true

- network_security_config_4_charles.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">*.gitee.com</domain>
        <trust-anchors>
            <certificates src="@raw/charles_ssl_proxying_certificate"/>
        </trust-anchors>
    </domain-config>
</network-security-config>
```

# Refs

- https://www.jianshu.com/p/703998ae4e78
- https://www.jianshu.com/p/4635aa405568
- https://developer.android.google.cn/training/articles/security-config?hl=en
- https://www.cnblogs.com/lulianqi/p/11380794.html
