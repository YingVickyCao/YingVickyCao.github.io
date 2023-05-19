# xmlns

```
<CustomView 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/window_background">
</CustomView >

```

## xmlns = XML namespace.   

## xmlns目的
HTML中的标签是预定义。   
与 HTML不同的是，XML中的标签不是预定义的,是由开发者定义的，当两个不同的文档使用相同的元素名时，就会发生命名冲突。所以有时遇到命名冲突的问题。  
xmlns的目的是为了解决 XML中元素和属性命名冲突。

## XML命名空间定义语法
- XML命名空间定义语法为xmlns:namespace-prefix="namespaceURI"
```
xmlns：声明命名空间的保留字，其实就是XML中元素的一个属性；
namespace-prefix：命名空间的前缀，这个前缀与某个命名空间相关联； => android/tools/app
namespaceURI：命名空间的唯一标识符，一般就是一个URI引用。

```

## xmlns种类
android中一共有3种：

```
xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
xmlns:app="http://schemas.android.com/apk/res-auto"
```

- android   
Android 系统定义的属性
- app  
自定义属性
- tools  
根据官方定义，tools命名空间用于在 XML    文档记录一些，当应用打包的时候，会把这部分信息给过滤掉，不会增加应用的    size，这些属性是为IDE提供相关信息。  

# Refs
- [如何理解Android中的xmlns](https://www.jianshu.com/p/6fcaffaeffd2)