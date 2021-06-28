# XCode

# 1 Install XCode

- XCode Version - IOS SDK Version - Mac OS version

| XCode Version | IOS Version | Ipad OS | tvOS | watchOS | Mac OS version | Swift | DESC |
| ------------- | ----------- | ------- | ---- | ------- | -------------- | ----- | ---- |
| XCode 12.1    | 14          |         | 14   | 7       | 10.15.6        | 5.3   |      |
| XCode 12.0    | 14          |         | 14   | 7       | 10.15.6        | 5.3   |      |
| XCode 11.7    | 13.7        |         | 13.4 | 6.2     | 10.15.6        |       |      |
| XCode 11.6    | 13.6        |         | 13.4 | 6.2     | 10.15.6        |       |      |
| XCode 11.5    | 13.5        |         | 13.4 | 6.2     | 10.15.4        |       |      |
| XCode 11      | 13          |         |      |         |                |       |      |
| XCode 10.3    | 12.4        |         | 12.4 | 5.3     | 10.14.6        | 5.0.1 |      |

- 开发者账号
- Download Version  
   Search "xcode 10.3"  
   "Xcode 10.3"  
  https://download.developer.apple.com/Developer_Tools/Xcode_10.3/Xcode_10.3.xip

- 真机调试 不需要开发者账号  
  果你学习之后是要作为一个独立开发者发布 app ，那么这 $99/y 的入场费是必须的，如果没有这方面的需求而是加入某一公司之类的，就没啥必要  
  淘宝可以买 关键字：“ ios 真机调试证书”

- 格式化
Ctrl + i
## Swift

- check swift version

```
$ xcrun swift -version
Apple Swift version 5.0.1 (swiftlang-1001.0.82.4 clang-1001.0.46.5)
Target: x86_64-apple-darwin18.7.0
```

- check swift postion

```
$ xcrun --find swift
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/swift
```

- List swift versions in project
  Project -> Build Settings -> search "switch"

# FAQ

## 1 The archive "XCode_10.1.xip" does not come from apple.

- Reason:  
  The zip is downloade long long ago, so certification is expired .

```
s$ xip -x Xcode_10.1.xip
xip: signing certificate was "Software Update" (validation not attempted)
xip: error: The archive “Xcode_10.1.xip” does not come from Apple.
hades4mac:Downloads hades$ pkgutil --check-signature Xcode_10.1.xip
Package "Xcode_10.1.xip":
   Status: signed by a certificate that has since expired
   Certificate Chain:
    1. Software Update
       SHA1 fingerprint: 1C 34 E3 91 C6 44 32D7 DD 24 BE 59 B1 66 7B 2F DA 09 76 E1 FD
       -----------------------------------------------------------------------------
    2. Apple Software Update Certification Authority
       SHA1 fingerprint: FA 02 10 0F CE 9D 93 00 89 C8 C2 51 0B BC 50 C8 85 8E 6F C10
       -----------------------------------------------------------------------------
    3. Apple Root CA
       SHA1 fingerprint: AC 1E 78 66 2C 59 3A 08 FF 58 D1 99 E2 24 52 D1 98 DF 80 60
```

- Fix:  
  Re-download, then re-install.

- Refs:  
  https://developer.apple.com/downloads/  
  https://developer.apple.com/download/more/  
  https://download.developer.apple.com/Developer_Tools/Xcode_10.1/Xcode_10.1.xip
