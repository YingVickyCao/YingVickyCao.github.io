# gpg

- Mac
- 用处  
  加密数据、邮件等

# Part 1 : Install

https://gpgtools.org/

# Part 2 : Usages

## 2.1 generate a key

```
gpg --gen-key
/
GPG Keychain -> New
```

## 2.2 Generate Revoke Certificate

生成一张"撤销证书"，以备以后密钥作废时，可以请求外部的公钥服务器撤销你的公钥。

```
gpg --gen-revoke [用户ID] // 用户ID = 邮件地址/Hash字符串
/
GPG Keychain -> Generate Revoke Certificate
```

## 2.3 See the created key's information

```
$ gpg --list-keys
/Users/account/.gnupg/pubring.kbx
-------------------------------

pub   rsa4096 2019-10-05 [SC] [expires: 2023-10-05]
      RUQ1MDNGRTg3NTBGNEY2QTI4RThEODUzODEwNzg1
uid           [ultimate] UserName <yourmail@email.com>
sub   rsa4096 2019-10-05 [E] [expires: 2023-10-05]
```

```
GPG Keychain:Main list page
```

`PUBLIC_KEY_ID` = 8-digits hexadecimal value = `ODEwNzg1`  
命令行：pub 后 8 位 .  
图形界面：FingerPrint 后 8 位

## 2.4 Upload the public key to keyservers to make it useful

```
gpg --keyserver hkp://pool.sks-keyservers.net --send-keys PUBLIC_KEY_ID
/
GPG Keychain -> Send Public key to Key Server
```

## 2.5 Export both public key and private key as ASCII armor format

```
gpg -a --export yourmail@email.com > public_key_sender.asc              // public key
gpg -a --export-secret-key yourmail@email.com > private_key_sender.asc  // private key

/
GPG Keychain -> Copy    // public key
/
GPG Keychain -> Export  // public key
```

# Ref：

- http://www.ruanyifeng.com/blog/2013/07/gpg.html
- https://gpgtools.org/
