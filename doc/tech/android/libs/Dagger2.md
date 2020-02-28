# Dagger2
Version:2.17

# 用途
- 依赖注入框架
- 解耦:依赖注入
- Dagger2 + MVP
- 技术:预编译，不是反射  
Dagger 2 是基于 JSR-330 - Java Specification Request 330标准。  

# 优缺点
优点：  
- 编译期生成代码，编译器报错  
大部分:编译期  
小部分:运行时  
- 不使用反射
- 语法简洁

缺点:  
- 使用不灵活
- 入门难
- 调试难  
非人能懂的Build error

# 控制反转 (Inversion of Control，缩写为 IoC)
- 面向对象编程中的一种设计原则，用以降低计算机代码之间耦合度。

- 依赖  
`Man{Car b}`:  
Man是依赖者，Man对Car有一个依赖  
Car是被依赖  

- 基本思想   
借助“第三方”实现具有依赖关系的对象之间的解耦。   
一开始是对象 A 对 对象 B 有个依赖，对象 A 主动地创建对象 B，对象 A 有主动控制权。  
实现了 Ioc 后，对象 A 依赖于 Ioc 容器，对象 A 被动地接受容器提供的对象 B 实例，由主动变为被动

## 方式
### 依赖注入（Dependency Injection，简称 DI）  
- 用于实现 `IoC` 最常见的方式之一
- 组件只管依赖，依赖的具体实现由容器去决定  
![Dagger2_DI_IoC](https://yingvickycao.github.io/img/android/libs/Dagger2_DI_IoC.png)


### 依赖查找（Denpendency Lookup）

# 语法

## 提供依赖
- 方式  

    方式1 : @inject Constructor  
    1. 不推荐:  
    2. 只能标记一个构造函数  
    3. 不能标记不能修改的类:第三方库  
    
    方式2 : @Provides
    1. 推荐:灵活组合 + 可读性
    2. 提供依赖实例
    3. 名字任意:推荐provide前缀

- 优先级  
先@Provides ，后@Inject  

- @Inject修饰的类的构造方法个数 = provideXXX()/@inject Constructor个数	


## @Inject
- 提供依赖
- 需要实例

### 提供依赖
@injects构造方法

### 需要实例
- 属性注入  
`@Inject A mA;`  

- 方法注入
```
A mA;

public void setBus(A a){mA=a
)
```
---

## Inject方法
- Inject without Module 
- Inject using Module 

### Inject without Module 
- 分类
构造函数无参数  
构造函数参数  

- 用法  
`@inject Constructor`

- 单例  
@Singleton 类

### Inject using Module 

- 分类
构造函数无参数    
构造函数参数  

- 用法
`@Module - @Provides`  

- 单例
```
@Singleton
@Component

/

@Singleton
@Provides
```
---

## @Component
- 中文：组件/构件， = 容器
- 它定义了依赖图，并负责向其他类中注入依赖。
- Component是注入者和被注入者之间联系的桥梁

`Component.create().inject(this)`:  
1. Component没有声明module  
2. Component声明Module，但没有使用Module提供的依赖  

`Component.builder().aActivityModule(new AActivityModule()).build()`:  
有module

- After Build, Dagger+
- @Module Build出来的实例放在Component

- `@Component`  
标注接口  
标注抽象类  
self只能包含一种scope   

- `modules`  
指向module
	
- void inject(目标类）
1. 注入目标类
2. 表示Component与目标类关联，为目标类注入
3. 名字任意:推荐inject
4. 目标类是self，不能是父类

- Component 的Scope必须与对应的Module一致，若@module没有Scope，则不影响

### Component之间的关系
1. @Component - dependencies（依赖）
2. @SubComponent(包含)
3. extends(继承)

#### @Component - dependencies（依赖）
- Scope:  
它的Scope有作用  

- 作用:  
使用dependencies的对象中的实例

#### @SubComponent(包含)
- 作用  
它的作用域不起作用，作用与包含它的Component的作用域一致，因为在使用之前，已经被Component创建好  
需要父组件全部的提供对象，不需要父组件显示暴露对象就可以拿到父组件所有对象  
父@Component负责维护共享数据，@SubComponent封装不同部分。  

- 适合  
App plus Activity  
Activity plus Fragment  

- @SubComponent不会在编译后生成Dagger前缀的容器类，是@Component的私有内部类
- 使用subcomponents表示全部开放依赖给@SubComponent
- 可被继承
- 不能使用dependencies
- 父@Component只能有@SubComponent实例，不能使用@SubComponent的依赖


#### extends(继承)
- Scope  
=Sum(modules)    

- 作用:  
仅仅组合module，生成对象是不是同一个实例？跟extends没有影响

---

## Annotation
- 作用:作用域
- 默认:@Singleton
- component提供依赖的生命周期 = component 生命周期 = Component关联Module的生命周期
- 同一个Component最多使用一个scope

### @Singleton
- 单例  
单例是局部的，不是全局的  
单例的生命周期 = Component 生命周期 = app/activity/fragment    

- 方式
```
@Singleton
@Provides
+
@Singleton
@Component
```
```
@Singleton 类
```

- @Singletone没有创建单例的能力，!= 常规单例

    常规单例:  
    虚拟机中只有一个对象
    
    @Singletone:  
    Component同一个实例 - Module同一个实例  - 提供唯一对象    
    Component的不同实例 - Module 不同实例 - 提供不同对象  
	
- 多个activity使用一个实例
    
    Type1: @Component 抽象类是虚拟机单例  
    退出activity后，activity被销毁，不会泄露activity：Activity_MembersInjector -> 仅仅=    
    仅仅activity共用，而非global  
    	
    Type2: 多个activity使用一个实例      
    @Singleton app 级别

### 自定义Scope
- 自定义Scope = Singleton相同，作用域没区别,，名字不同仅仅是为了可读性
- 常见
```
@ApplicationScope/Singleton
@ActivityScope
@FragmentScope
```
- Rename @Singletone

### 继承关系
- 父类与子类之间不能相同
- 父类有多个子类，子类之间可以相同

---

## @Qualifier
- 限定符/修饰符
类的类型不足以表示一个依赖  

- 例子  

    Context:  
    @ApplicationScope  
    @ActivityScope 
    
    Person有两个构造函数

- 已存在:@Named
- 自定义:Rename @Named

---

## Lazy
get():同一个对象

---

## Provider
get():不同对象

---

## @Module
- @Module:管理
- @Provide

---

## @SubComponent

# 使用场景
- Case1 ：每次得到一个实例：unscope

- Case2： app共用实例  
@Singletone -> appModule：参考@Component - dependencies  

- Case3 : 不同Actiivty不同实例，但依赖app共用实例  
参考@Component - dependencies  
数据存储在app共用数据  

- Case4: 不同Actiivty同一个实例
参照singleton“多个activity使用一个实例”  

- Case4: Activity和Fragment共用一个实例
- Case5: 一个界面使用多个module
```
1. @Module - incudes
2. @Component -  modules
3. @Component -  dependencies
4. @SubComponent
5. Component extends
```

# ERROR

## ERROR：unscoped cannot depend on scoped components
@Component - dependencies

## ERROR：Caused by: org.gradle.api.internal.tasks.compile.CompilationFailedException: Compilation failed; see the compiler error output for details.

## ERROR：:  has conflicting scopes

## module lib使用dagger2，app 使用module lib，则app build.gradle  must 包含依赖 dagger2

---
# Dagger1->Dagger2

## Use shadow to rename Dagger1
### dagger1 -> Renamed Dagger2 with shadow
- Mutiple steps
- dagger1 lives together  with Renamed Dagger2
- Renamed Dagger2 and Dagger2 can not live together
- project outer module can not replace.

### Dagger1 -> Koin?
- Mutiple steps
- Koin  
Inject 语法复杂  
inject modules in application  
For singleton, loadModules() in activity has BeanOverridedException  
For Scope, invoke close()  

### third party  lib
urgent

## 案例
### 问题
1. current project = dagger1, 要使用的第三方lib中使用的是dagger2
2. dagger1和dagger2不兼容
3. 不能一次性升级dagger1到dagger2


### 分析
- 若shadowJar dagger2，与第三方库lib不兼容:  
shadowJar dagger2操作不兼容 gradle 3.x，不能生成liib，不知原因

- 若shadowJar dagger1操作不兼容 gradle 2.x， dan shadowed dagger1  在gradle 3.x正常运行

### 方案
使用shadowjar dagger1（包含javax），使dagger1和dagger2共存，然后逐步升级到dagger2

### 技术
When gradle 2.x,  shadowJar

### 步骤
1. gradle 2.x时，使用shadowJar rename dagger1
2. 复制renamed dagger1  到gradle 3.x工程。
3. 在gradle 3.x工程，按shadowJar relocate 的配置，重命名dagger1和javax内容
4. 引入dagger2
5. dagger1和dagger2能共存了，慢慢升级dagger1到dagger2

### 说明
- Shadowjar要在gradle 2.x环境才能成功
- shadowJar的module是`apply plugin: 'java'`
- 在app中关联shadowJar module，才能成功重命名jar包
```
compile project(path: ':shadow-dagger1', transitive: false)
apt project(path: ':shadow-dagger-compiler1', transitive: false)
```

- Shadowed jar的依賴不能在被识别（help->dependencices），即无法依赖传递。
因此，在Build/生成apk时容易出现依赖版本冲突：不同的group含有相同的包名而冲突

![ShadowJar_Dagger1](https://yingvickycao.github.io/img/android/libs/ShadowJar_Dagger1.png)

# Refs
- https://google.github.io/dagger/users-guide
- https://google.github.io/dagger/dagger-1-migration
- https://github.com/android10/two-daggers
- https://github.com/johnrengelman/shadow


- [Dagger 2 完全解析（三），Component 的组织关系与 SubComponent](https://www.jianshu.com/p/2ac2f39cb25f)
- [自定义Scope](https://www.cnblogs.com/tiantianbyconan/archive/2016/01/02/5095426.html)
- [Dagger1迁移Dagger2指南](https://blog.csdn.net/io_field/article/details/70228551)