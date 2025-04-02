# 安全

# 1 使用本地广播（LocalBroadcast） 代替 全局广播

# 2 Sensitive Data Protective

- What is Sensitive Data ?  
  name, email,  
  user name / login id, and password, e.g., destkop, apps, banking ,  
  phone number, and address,  
  Credit card ID  
  Debit card ID  
  other IDs and passwords.  
  Bank recording history.  
  shopping recording history, e.g., JingDong app,  
  passort number

# 2 Data in Transit

## 2.1 TLS  
  TLS Man-in-Middle Attacher

## 2.2 Forbid  
  Appache HTTP - SSLSocketFactory - AllowAllHostnameVerfier  

## 2.3 HTTPS compatibled with TLS    
  HTTPS - TLS -Certificate  

## 2.4 Use HttpsURLConnection instead of HttpURLConnection.  

Android >=24, Android's SSLEngine use secure ciphe suites and protocols by default.

```java
URL url = new URL(URL);
 HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
```

Android <= 23,Android API still enbale insecure algorithms such as RC4 by default. So, use NetCipher.  
RC4 ： 对称加密

## 2.5 NetCipher : set TLS version  
https://guardianproject.info/code/netcipher/
https://www.it1352.com/1922502.html

```java
HttpsURLConnection connection = NetCipher.getHttpsURLConnection(sourceUrl);
```

```java
public class StrongConstants {

   /**
    * Ordered to prefer the stronger cipher suites as noted
    * http://op-co.de/blog/posts/android_ssl_downgrade/
    */
   public static final String ENABLED_CIPHERS[] = {
           "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA",
           "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA",
           "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA",
           "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA",
           "TLS_DHE_RSA_WITH_AES_128_CBC_SHA",
           "TLS_DHE_RSA_WITH_AES_256_CBC_SHA",
           "TLS_DHE_DSS_WITH_AES_128_CBC_SHA",
           "TLS_ECDHE_RSA_WITH_RC4_128_SHA", // X
           "TLS_ECDHE_ECDSA_WITH_RC4_128_SHA",  // X
"TLS_RSA_WITH_AES_128_CBC_SHA",
           "TLS_RSA_WITH_AES_256_CBC_SHA",
"SSL_RSA_WITH_3DES_EDE_CBC_SHA", // X
           "SSL_RSA_WITH_RC4_128_SHA", // X
"SSL_RSA_WITH_RC4_128_MD5"// X};

   /**
    * Ordered to prefer the stronger/newer TLS versions as noted
    * http://op-co.de/blog/posts/android_ssl_downgrade/
    */
   public static final String ENABLED_PROTOCOLS[] = {
"TLSv1.2",
"TLSv1.1",
        "TLSv1"  // X };

   private StrongConstants() {
       // this is a utility class with only static methods
   }
}
```

## 2.6 Android Shared Preferences  
  can not store senstive data.

## 2.7 Android Network Security Configuatin

```xml
android:networkSecurityConfig="@xml/network_security_config"
```

(1)help against TLS Man-in-Middle ttacks for validateing TLS Certificates.  
(2)spefify CA / Certificate that app should trust.

```xml
<network-security-config>
    <certificates src="@raw/XXX">
    <certificates src="system">
<network-security-config/>
```

- Certfacte Pinning  
  add te hash of server's Certificates

```xml
<network-security-config>
    <pin digest="SHA256">XXX</pin>
<network-security-config/>
```

X509TrustManager : check publick key, and host name

- Android N's Security Configuration  
  Never use in PROC app:  
  Debug only override  
  cleartext traffic opt-out, e.g, log/requests

## 2.8 Verify domain for every reqeust  

OkHttp can verify domain 
## 2.9 Data At-Rest

- Store sensitive data in server, not in device.
- When store in device, use an eccrypthin Key derived from KEK or DEK to decrypt data.

  KEK vs DEK vs MEK ?  
  https://security.stackexchange.com/questions/93886/dek-kek-and-master-key-simple-explanation

  DEK: Data Encryption Key  
  the key used to encrypt data  
  e.g. Key: 1234 with AES 128 as encryption algorithem - 1234 is the DEK

  KEK: Key Encryption Key  
  the key used to encrypt other crypto key.  
  e.g. Encrypt (from DEK above) 1234 with 9999; 9999 is the KEK

  MEK:Master Key - Master Encryption Key  
  This key is used to encrypt/decrypt DEK and KEK in transit; usually used for KEK not for DEK.

# 3 Server Side Controls

- Service Side do what?  
  Identfication/Authentication  
  Authorization  
  Input Validation  
  Output Escaping(开启输出转义 )  
  Database Security  
  Senditive Data Protection  
  Denialof-Service Protections  
  Error Handling  
  Logging

- OWASP Top 10

# 4 Authentication（身份验证） and Authorization

- Authentication : Who is requesting ?

    Way 1 :

  ```
  Username
  Password
  ```

  Way 3 : Two factor authentication

  ```
  Token / PIN
  Password
  ```

  Way 3 : Biometrics  
  Way 4 : Single Sign On , such as SiteMinder

- can not save authenticatiob info in device, must in Server.
- Access Control - Sandbox  
  Not grant too much permission, only min needed.  

- 定期（比如三个月）强制改密码
- 登陆连续失败3次后，锁住账户
- 解锁、修改密码机制
- URL 访问控制架构
- Only user in  the group, can visit or seee the resouce, such url/ menu/feature      
# 5 Session Management

```
Session ID init.
Session ID rotation:check auth regularly.
Session destruction upon timeout / logout.
```

- Session ID timeout

```
Client app -----> server
Client app <--Session ID--- server
```

Way 1 : App can receive and handle timeout

```
Client app -----> server
Client app <--Session time out--- server

Don't: to refresh session
Client app --Session ID---> server
```

Way 2 : app use it's own idle timeout equalling with server's.

- Login out -> session is invalid， clear related data /  cookie from memory cache and phone cache. 
- Session storage  
  in server, not in device.

- Native apps do have built-in cookie management. app maintain state (session) by:  
  HTTP Cookies : with expired timestamp.  
  OAuth tokens : e.g.,with expired timestamp.  
  SSO Services : e.g., login in api.

# 6 Crptograhpy

## 6.1 Hashing :
s
- Add 128-bits salts
- use a key derived from function, e.g.,对称加密,非对称加密,PBKDF2
  https://vimsky.com/examples/detail/java-method-javax.crypto.SecretKeyFactory.getInstance.html  
推荐使用 PBKDF2
```

API>= 4.4(19)
SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1And8bit")

API <4.4(19)
SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1")

```
- 6.1.1 SHA256 is more strong than Base64  
Example ： After downloading apk, verify hash number to see if the file is completed or not modified.  

## 6.2 Encrypthion

- 对称加密:AES with CBC/CFB/GCM module
  非对称加密 RSA/ECDSA

- Key size
  AES - 128/256

- Key Storage
  server

## 6.3 Random number  
Use : java.security.SecureRandom    
Not Use : java.until.Random  

## 7 Android Manifest

## 7.1 `tools:remove`:移除 app 中由第三方 sdk 引入的权限

## 7.1 `android:exported=true` only when needed  

# 8  Having logout btn in each screen is easy user to log out.

# 9 Screen overlay to hiding datas when app is not visile to users

# 10 Vulnerabilities scanning
- Blackduck (IBM): paied   
- Sonarqube scan: 
- VA testing: paied, API(header/cookie/receiver data), limited scope/full scope.  

# 11 Info user to update SDK, then plan to update SDK reguly

# 12 Keep update libraries 


# Tools
## Android Studio - Lint
## Android Studio - Run analysis 