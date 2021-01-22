# Android Errors

# 1 ERROR: gradle sync error

```
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights
```

Fix:

`--stacktrace --info --debug` , then Gradle task tree ->run agian

# 2 ERROR: gradle sysnc error, `AndroidJUnit4 is Depressed'

```
AndroidJUnit4 is Depressed. use androidx.test.ext.junit.runners.AndroidJUnit4 instead.
```

Fix:

```groovy
androidTestImplementation 'androidx.test:runner:1.2.0'
->
androidTestImplementation 'androidx.test.ext:junit:1.1.1'

androidx.test.runner.AndroidJUnit4;
->
androidx.test.ext.junit.runners.AndroidJUnit4
```

# 3 ERROR： `can't create handler inside thread that has not called Looper.prepare()`, and page is empty.

Reason: In Activity onCreate(), one Dialog is showd in RxJava2 thread ,causing code RxJava2-onError, so UI is not inited.

[TestCase1.java](https://gitee.com/YingVickyCao/AndroidAboutDemos/blob/master/soruce/AndroidLibs/RxJava2/app/src/main/java/com/hades/android/example/rxjava2/_subscribeOn_vs_observeOn/TestCase1.java)

# 4 ERROR: `CLEARTEXT communication to "XXX domain" not permitted by network`

Reason : Android >=28(9.0) 网络访问安全策略升级，限制了非加密的流量请求。

Fix:

Way 1 : targetSdkVersion 27

Way 2 :Explicitly saying that accept clear text for some host

```xml
<application
    android:networkSecurityConfig="@xml/network_security_config">
</application>
```

```xml
<!-- res/xml/network_security_config.xml  -->
<?xml version="1.0" encoding="utf-8"?>
    <network-security-config>
        <domain-config cleartextTrafficPermitted="true">
            <domain includeSubdomains="true">localhost</domain>
        </domain-config>
    </network-security-config>
</xml>
```

OR

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```

Way 3 : app and server : http -> https (TBD)

Way 4 : Accept certificates from given Certificate Authority

```xml
<!-- res/xml/network_security_config.xml -->

<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <debug-overrides>
        <trust-anchors>
        <!-- /raw/debug_cert.dem -->
            <certificates src="@raw/debug_cert"/>
        </trust-anchors>
    </debug-overrides>
</network-security-config>
```

# 5 java.net.ConnectException: Failed to connect to localhost/127.0.0.1:7777

Reason:
Way 1 ：  
模拟器默认把 127.0.0.1 和 localhost 当做本身了。  
在模拟器上用 10.0.2.2 代替 127.0.0.1 和 localhost。

Way 2 ： 在局域网环境可以用 192.168.0.x 或者 192.168.1.x 连接本机。

Fix：  
10.0.2.2

Refs:  
http://www.douevencode.com/articles/2018-07/cleartext-communication-not-permitted/

https://blog.csdn.net/cpcpcp123/article/details/108063189
