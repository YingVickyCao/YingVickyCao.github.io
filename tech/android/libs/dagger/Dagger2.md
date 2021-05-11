# Dagger2

Version:2.17

# 1 basic

## 1.1 用途

- 依赖注入框架
- 解耦:依赖注入
- Dagger2 + MVP
- 技术:预编译，不是反射  
  Dagger 2 是基于 JSR-330 - Java Specification Request 330 标准。

## 1.2 优缺点

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
  非人能懂的 Build error

## 1.3 控制反转 (Inversion of Control，缩写为 IoC)

- 面向对象编程中的一种设计原则，用以降低计算机代码之间耦合度。

- 依赖  
  `Man{Car b}`:  
  Man 是依赖者，Man 对 Car 有一个依赖  
  Car 是被依赖

- 基本思想  
  借助“第三方”实现具有依赖关系的对象之间的解耦。  
  一开始是对象 A 对 对象 B 有个依赖，对象 A 主动地创建对象 B，对象 A 有主动控制权。  
  实现了 Ioc 后，对象 A 依赖于 Ioc 容器，对象 A 被动地接受容器提供的对象 B 实例，由主动变为被动

### 方式

#### 依赖注入（Dependency Injection，简称 DI）

- 用于实现 `IoC` 最常见的方式之一
- 组件只管依赖，依赖的具体实现由容器去决定  
  ![Dagger2_DI_IoC](https://yingvickycao.github.io/img/android/libs/Dagger2_DI_IoC.png)

#### 依赖查找（Denpendency Lookup）

# 2 语法

## 2.1 提供依赖

- 方式

  方式 1 : @inject Constructor

  1. 不推荐:
  2. 只能标记一个构造函数
  3. 不能标记不能修改的类:第三方库

  方式 2 : @Provides

  1. 推荐:灵活组合 + 可读性
  2. 提供依赖实例
  3. 名字任意:推荐 provide 前缀

- 优先级  
  先@Provides ，后@Inject

- @Inject 修饰的类的构造方法个数 = provideXXX()/@inject Constructor 个数

## @Inject

- 提供依赖
  @injects 构造方法

- 需要实例

  属性注入  
   `@Inject A mA;`

  方法注入

  ```
  A mA;

  public void setBus(A a){mA=a
  )
  ```

## 2.2 Inject 方法

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

## 2.3 @Component

- 中文：组件/构件 = 容器 =
- Define a graph of the dependencies，并负责向其他类中注入依赖。
- Component 是注入者和被注入者之间联系的桥梁

`Component.create().inject(this)`:

1. Component 没有声明 module
2. Component 声明 Module，但没有使用 Module 提供的依赖

`Component.builder().aActivityModule(new AActivityModule()).build()`:  
有 module

- After Build, Dagger+
- @Module Build 出来的实例放在 Component

- `@Component`  
  标注接口  
  标注抽象类  
  self 只能包含一种 scope

- `modules`  
  指向 module
- void inject(目标类）

1. 注入目标类
2. 表示 Component 与目标类关联，为目标类注入
3. 名字任意:推荐 inject
4. 目标类是 self，不能是父类

- Component 的 Scope 必须与对应的 Module 一致，若@module 没有 Scope，则不影响

### Component 之间的关系

1. @Component - dependencies（依赖）
2. @SubComponent(包含)
3. extends(继承)

#### @Component - dependencies（依赖）

- Scope:  
  它的 Scope 有作用

- 作用:  
  使用 dependencies 的对象中的实例

#### @SubComponent(包含)

- 作用  
  它的作用域不起作用，作用与包含它的 Component 的作用域一致，因为在使用之前，已经被 Component 创建好  
  需要父组件全部的提供对象，不需要父组件显示暴露对象就可以拿到父组件所有对象  
  父@Component 负责维护共享数据，@SubComponent 封装不同部分。

- 适合  
  App plus Activity  
  Activity plus Fragment

- @SubComponent 不会在编译后生成 Dagger 前缀的容器类，是@Component 的私有内部类
- 使用 subcomponents 表示全部开放依赖给@SubComponent
- 可被继承
- 不能使用 dependencies
- 父@Component 只能有@SubComponent 实例，不能使用@SubComponent 的依赖

#### extends(继承)

- Scope  
  =Sum(modules)

- 作用:  
  仅仅组合 module，生成对象是不是同一个实例？跟 extends 没有影响

---

## 2.4 Qualifier

- 作用:作用域
- 默认:@Singleton
- component 提供依赖的生命周期 = component 生命周期 = Component 关联 Module 的生命周期
- 同一个 Component 最多使用一个 scope

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

- @Singletone 没有创建单例的能力，!= 常规单例

  常规单例:  
   虚拟机中只有一个对象

  @Singletone:  
   Component 同一个实例 - Module 同一个实例 - 提供唯一对象  
   Component 的不同实例 - Module 不同实例 - 提供不同对象

- 多个 activity 使用一个实例
  Type1: @Component 抽象类是虚拟机单例  
   退出 activity 后，activity 被销毁，不会泄露 activity：Activity_MembersInjector -> 仅仅=  
   仅仅 activity 共用，而非 global

  Type2: 多个 activity 使用一个实例  
   @Singleton app 级别

- 父 Component 与 SubComponent 之间不能相同
- 父 Component 有多个子 SubComponent，子 SubComponent 之间可以相同

### 自定义 Scope

- 自定义 Scope = Singleton 相同，作用域没区别,，名字不同仅仅是为了可读性
- 常见

```
// should be named depending on its lifetime
@ApplicationScope/Singleton
@ActivityScope
@FragmentScope
```

- Rename @Singletone

## 2.6 Lazy

get():同一个对象

## 2.7 Provider

get():不同对象

## 2.8 @Module

- @Module:管理
- @Provide

## 2.9 @SubComponent

# 使用场景

- Case1 ：每次得到一个实例：unscope

- Case2： app 共用实例  
  @Singletone -> appModule：参考@Component - dependencies

- Case3 : 不同 Actiivty 不同实例，但依赖 app 共用实例  
  参考@Component - dependencies  
  数据存储在 app 共用数据

- Case4: 不同 Actiivty 同一个实例
  参照 singleton“多个 activity 使用一个实例”

- Case4: Activity 和 Fragment 共用一个实例
- Case5: 一个界面使用多个 module

```
1. @Module - incudes
2. @Component -  modules
3. @Component -  dependencies
4. @SubComponent
5. Component extends
```

# 3 ERROR

## ERROR：unscoped cannot depend on scoped components

@Component - dependencies

## ERROR：Caused by: org.gradle.api.internal.tasks.compile.CompilationFailedException: Compilation failed; see the compiler error output for details.

## ERROR：: has conflicting scopes

## module lib 使用 dagger2，app 使用 module lib，则 app build.gradle must 包含依赖 dagger2

---

# Dagger1->Dagger2

## Use shadow to rename Dagger1

### dagger1 -> Renamed Dagger2 with shadow

- Mutiple steps
- dagger1 lives together with Renamed Dagger2
- Renamed Dagger2 and Dagger2 can not live together
- project outer module can not replace.

### Dagger1 -> Koin?

- Mutiple steps
- Koin  
  Inject 语法复杂  
  inject modules in application  
  For singleton, loadModules() in activity has BeanOverridedException  
  For Scope, invoke close()

### third party lib

urgent

## 案例

### 问题

1. current project = dagger1, 要使用的第三方 lib 中使用的是 dagger2
2. dagger1 和 dagger2 不兼容
3. 不能一次性升级 dagger1 到 dagger2

### 分析

- 若 shadowJar dagger2，与第三方库 lib 不兼容:  
  shadowJar dagger2 操作不兼容 gradle 3.x，不能生成 liib，不知原因

- 若 shadowJar dagger1 操作不兼容 gradle 2.x， dan shadowed dagger1 在 gradle 3.x 正常运行

### 方案

使用 shadowjar dagger1（包含 javax），使 dagger1 和 dagger2 共存，然后逐步升级到 dagger2

### 技术

When gradle 2.x, shadowJar

### 步骤

1. gradle 2.x 时，使用 shadowJar rename dagger1
2. 复制 renamed dagger1 到 gradle 3.x 工程。
3. 在 gradle 3.x 工程，按 shadowJar relocate 的配置，重命名 dagger1 和 javax 内容
4. 引入 dagger2
5. dagger1 和 dagger2 能共存了，慢慢升级 dagger1 到 dagger2

### 说明

- Shadowjar 要在 gradle 2.x 环境才能成功
- shadowJar 的 module 是`apply plugin: 'java'`
- 在 app 中关联 shadowJar module，才能成功重命名 jar 包

```
compile project(path: ':shadow-dagger1', transitive: false)
apt project(path: ':shadow-dagger-compiler1', transitive: false)
```

- Shadowed jar 的依賴不能在被识别（help->dependencices），即无法依赖传递。
  因此，在 Build/生成 apk 时容易出现依赖版本冲突：不同的 group 含有相同的包名而冲突

![ShadowJar_Dagger1](https://yingvickycao.github.io/img/android/libs/ShadowJar_Dagger1.png)

# Refs

- https://google.github.io/dagger/users-guide
- https://google.github.io/dagger/dagger-1-migration
- https://github.com/android10/two-daggers
- https://github.com/johnrengelman/shadow

- [Dagger 2 完全解析（三），Component 的组织关系与 SubComponent](https://www.jianshu.com/p/2ac2f39cb25f)
- [自定义 Scope](https://www.cnblogs.com/tiantianbyconan/archive/2016/01/02/5095426.html)
- [Dagger1 迁移 Dagger2 指南](https://blog.csdn.net/io_field/article/details/70228551)
