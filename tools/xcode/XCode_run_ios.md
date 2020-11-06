# XCode run ios app

## Step1: Click test.xcodeproj

## Step2: 注册开发者账号

开发者账号：  
免费注册。若发布 app 到 app store，购买开发者证书（99 美元/年）  
https://developer.apple.com -> account

## Step3: Add account

Add account -> Team  
Trust

![iod_build_error_4_trust_iphone.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_project_setting_add_team.jpg)

### ERROR: bundle identifier is too long

![ios_project_setting_4_error_4_bundle_identifier_is_too_long.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_project_setting_4_error_4_bundle_identifier_is_too_long.jpg)

```
Failed to create provisioning profile.
The app ID "org.reactjs.native.example.test" cannot be registered to your development team. Change your bundle identifier to a unique string to try again.

No profiles for 'org.reactjs.native.example.test' were found
Xcode couldn't find any iOS App Development provisioning profiles matching 'org.reactjs.native.example.test'.
```

Reason:  
bundle identifier 名字太长

Fix:  
缩短  
全部小写  
重启 XCode/重新打开 test.xcodeproj

## Step4: Select device

## Step5:run build, and auto install apk into device

### ERROR:This iPhone 6s Plus is running iOS 12.4 (16G77), which may not be supported by this version of Xcode.

![ios_build_error_4_xcode_overdue_1.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_build_error_4_xcode_overdue_1.jpg)

原因：IPhone 升级到 12.4 后，Xcode 不支持。  
Fix：

- 方法 1:下载/Copy 12.14 真机包，放到 DeviceSupport 目录  
  https://github.com/iGhibli/iOS-DeviceSupport

Applications -> Xcode.app -> Contents -> Developer -> Platforms -> iPhoneOS.platform -> DeviceSupport  
(/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport)  
![ios_build_error_4_xcode_overdue_2.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_build_error_4_xcode_overdue_2.jpg)

提示需要：12.4 (16G77)  
实际 donwload：12.4 (16G73)  
测试结果：正常 work

- 方法 2：升级 XCode

### ERROR：Please try rebooting and reconnecting the device. (0xE8000076)

![ios_build_error_4_reboold_4_reconnect_iphone.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_build_error_4_reboold_4_reconnect_iphone.jpg)

Fix：  
重启 device/重连 device

### ERROR：Xcode will continue when iPhone is finished.

![ios_build_error_4_when_iphone_finished.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_build_error_4_when_iphone_finished.jpg)

Fix：  
删除 build，reconnet iphone，重新打开 test.xcodeproj

### ERROR：Verify the Developer App certificate for your account is trusted on your device. Open Settings on iPhone and navigate to General -> Device Management, then select your Developer App certificate to trust it.

![iod_build_error_4_trust_iphone.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/iod_build_error_4_trust_iphone.jpg)

Fix：  
IPhone -> General -> Device Management -> Trust

### ERROR：codesign access keychain

![ios_build_4_need_chain.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_build_4_need_chain.jpg)

Fix:  
mac login pwd
