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
