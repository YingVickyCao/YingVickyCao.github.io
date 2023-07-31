# 6 安装包大小的优化

# 1 代码混淆 [Proguard](../tools/Proguard.md)

# 2 资源文件最小化

## 2.1 使用一套图、一套布局、多套dimens.xml文件，使用最小资源来解决多分辨率适配。    
## 2.2 使用轻量级的第三方库
## 2.3 减少项目中预置图片。    
预置图片改成从服务器请求，尽可能地将程序与资源分离。  
## 2.4 避免重复功能的类库    
## 2.5 插件化   
把插件放到服务器上，在需要时再下载。
适合：使用率不高的功能模块，或使用预加载  

# 3 删除无用的资源
```groovy
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
    }
}
```
Ref https://zhuanlan.zhihu.com/p/582314791

# 4 图片优化
## 4.1 尽量使用一套图片资源。  
- 在图片在不同分辨率手机上差异很大时再考虑不通文件夹下放入特定图片
- 单色图使用android:tint改变颜色，代替 放入多个颜色的图。    

## 4.2 图片格式      
（1）WebP  ： Android >= 4.2.2  
（2）svg    
（3）.9.png    
（4）画的.xml     
（5）PNG  ： 支持透明  
（6）JPG  ： 不支持透明  

    如何选择？  
    通常，（1）～（4）> （5）、（6）             
    单色图片：（2）、（4）、 （1）     
    多色图片：(1) 、 （6） 、 5）     
    非透明的大图:(1) > （6） > 5）。对于非透明的大图，JPG会比PNG文件小，通常会减少到一半以上   
    透明的大图:  (1) > （5


## 4.3 PNG and  JPG : 降低图片色彩位数  
## 4.4 压缩P NG  
[压缩工具 - PNGoo](https://pngquant.org/)   
压缩工具 - Zopfli    


# 优化工具
## 1 Appdome  
Appdome wrapper apk时，通过对混淆、对齐等技术较少apk的体积。      
release apk 90MB => after wrappered,65MB       

## 2 Android Studio -> Build -> Analyze APK
主要优化这4类：assets/lib(.so)/res/classes.dex

移动端大部分基于ARM或ARM-V7a架构，因此大部分包含ARM和ARM-V7a的.so  

## 3 Android Lint 删除无用的资源
Android Studio -> Run Inspection by Name -> "Unused reources"  
Android Studio 不分析 asserts 文件夹下的资源，因为asserts通过文件名直接访问，不通过具体的引用。     

