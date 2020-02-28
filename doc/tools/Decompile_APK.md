# Decompile APK

# 工具

## apktool
- 资源文件获取
- https://bitbucket.org/iBotPeaches/apktool/downloads
- 使用方法
```
java -jar apktool_2.3.4.jar d -f app-release.apk -o app-release
```	 
----

## dex2jar
- 将apk反编译成java源码（classes.dex转化成jar文件）
- http://sourceforge.net/projects/dex2jar/files/

- 使用方法  
编译的APK后缀名改为.rar或者 .zip，并解压，得到其中的classes.dex文件  
不要用自带解压文件解压

    `./d2j-dex2jar.sh classes.dex` 

    错误：
    d2j_invoke.sh: Permission denied
    
    原因：
    Permission Denied ，哪个文件报就修改对应文件权限
    
    解决：
    ```
    chmod 777 d2j_invoke.sh
    ```

---

## d-gui
- 查看APK中classes.dex转化成出的jar文件，即源码文件
- http://jd.benow.ca/

# Refs
- [APK反编译](https://blog.csdn.net/s13383754499/article/details/78914592)
- [MAC下反编译APK步骤](https://blog.csdn.net/tl792814781/article/details/80503042)