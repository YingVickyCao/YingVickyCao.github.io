# Dagger1
# Usage
依赖注入

# 目的
解耦

# 技术
预编译，不是反射

# 原理   
![Dagger1_principle.png](https://yingvickycao.github.io/img/android/libs/Dagger1_principle.png.png)  

# Libs
```
javax.inject.Injec
com.squareup.dagger:dagger-compiler
com.squareup.dagger:dagger
```

# 使用
## JSR-330
- @Inject  
@injects 构造方法  
@injects 解成员变量  
	
- @Qualifier
- @Scope
- @Named

## Object provided by
Object provided by:
1. @Inject constructor
2. @Provides-annotated method

### @Inject constructor

- @Inject doesn’t work everywhere
1. Interfaces can’t be constructed.
2. Third-party classes can’t be annotated.
3. Configurable objects must be configured!

- @injects 构造方法 + @Inject 对象名 + No module,  not added any module:  
无论哪一种，must @Inject 构造方法:  
1. 该类的类对象变量依赖其他module，@inject 变量名能实现依赖。
2. @Singleton修饰有效
3. build自动生成module，关联Inject他们的类。


### @Provides-annotated method
```
@Module
@Provides
```

## @Inject 对象名
To Create an instance

## 创建图 Building the Graph
- 建立依赖关系的对象图
- 完整的依赖注入图的构建机制:由ObjectGraph反射构成
- 方式

`ObjectGraph objectGraph = ObjectGraph.create(new MainActivityModule())`:创建依赖关系的对象图，提供模块类或实例的列表

`objectGraph.inject(this（MainActivity）)`:启动依赖注入，开始用起来

子图 : 从现有图形创建新图形的机制

被依赖的类，Must have @injects 构造方法
```
objectGraph.plus(new TwoModule())
objectGraph.plus(getModule())
```

## @Lazy
`LazyNum.java`

Lazy Injections
- 延迟实例化
- 对象在使用时实例化
- @Singletons 修饰有效


## @Module

### @Module : 提供的模块名

### @Provides : 提供的对象

### includes : 包含依赖的module

### injects : 注入的类

### staticInjects

### `overrie = true`
允许被重写

场景
- 单元测试时，用一个模拟的实现替换一个真是的实现
- 在开发时，用一个模拟的认证替换一个真实的认证。

### `library=true/false` 
编译阶段的校验

true :   
`ERROR:Set library=true in your module to disable this check.`  
module有可能被injects 列表以外的类使用的  

### `complete=true/false`
编译阶段的校验

false:允许丢失的依赖

## @Singletons
- 全局单例:多线程中共享

- Only Use
```
@Singleton
@Provides
```

```
@Singleton 类名
```
	
## @ForActivity

## @ForApplication

## 不支持方法注入

## @MemberInjector

## property

# 案例

问题：FileUtil是下载工具类， 含static方法（类很早就存在）。注入，造成2个实例。  
解决：FileUtil 去掉注入，直接使用static单利

问题：Config是是注入使用，只在Application中调用，在Application初始化完成之前就已经初始化完了，造成一些缓存信息等没有读到  
解决：Config 去掉注入，直接使用static单利  

# Refs
- http://square.github.io/dagger/
- [Dagger1](https://blog.csdn.net/kevinscsdn/article/details/78862958)
- [Dagger 官方文档之Dagger1（译文）](https://blog.csdn.net/kevinscsdn/article/details/78862958)
- [Dagger：快速的依赖注入for 安卓&Java](https://www.cnblogs.com/leo-lsw/p/dagger.html)
- [Android Dagger依赖注入框架浅析](https://blog.csdn.net/ljphhj/article/details/37663071)