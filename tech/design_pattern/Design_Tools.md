# 设计工具箱中内的工具

# 1 OO 基础

抽象  
封装  
多态  
继承

## 2 OO 原则（设计原则）（10）

| 原则                                                                                                     | 描述                             |
| -------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [原则 1：封装变化](策略模式.md#design_principles_1)                                                      | -                                |
| [原则 2：多用组合，少用继承](策略模式.md#design_principles_2)                                            | -                                |
| [原则 3：针对接口编程，而不是针对实现编程](策略模式.md#design_principles_3)                              | -                                |
| [原则 4：松耦合](观察者模式.md#design_principles_4)                                                      | 为交互对象之间的松耦合设计而努力 |
| [原则 5: 开放-关闭原则 (Open Close Principle)](装饰者模式.md#Open_Close_Principle)                       | 类应该对扩展开放，对修改关闭     |
| [原则 6: 依赖倒置原则 (Depency Inverse Principle)](工厂模式.md#Depency_Inverse_Principle)                | 依赖抽象，不依赖具体类           |
| [原则 7: 最少知识原则 (（Least Knowledge Principle)：](外观模式.md#（Least_Knowledge_Principle)          | 只和朋友谈                       |
| [原则 8: 好莱坞原则 (Hollywood Principle)：别找我，我会找你](模版方法模式.md#Hollywood_Principle)        | 别找我，我会找你                 |
| [原则 9: 单一责任原则 (Single Responsibility Principle) ](迭代器模式.md#Single_Responsibility_Principle) | 类应该只有一个改变的理由         |

# 3 OO 模式 （24+）

## 创建型 (6)

创建型模式涉及到将对象实例化，这类模式都提供一个方法，将客户从所需要实例化的对象中解耦。

| Creational                                              | 中文                            | DESC                                           | Short DESC             |
| ------------------------------------------------------- | ------------------------------- | ---------------------------------------------- | ---------------------- |
| [Singleton](单例模式.md)                                | 单例模式                        | 确保有且只有一个对象被创建                     | 封装对象创建           |
| [Abstract Factory](工厂模式.md#Abstact_Factory_Pattern) | 工厂模式 - 抽象工厂模式         | 允许客户创建对象的家族，而无需指定他们的具体类 | 封装对象创建           |
| [Factory method ](工厂模式.md#Factory_Method_Pattern)   | 工厂模式 - 工厂方法模式         | 由子类决定要创建的具体类是哪一个               | 封装对象创建           |
| [Simple Factory](工厂模式.md#Simple_Factory)            | 工厂模式 - 不是模式，但经常使用 |                                                | 封装对象创建           |
| [Builder](Build_Pattern.md)                             | 生成器模式                      | 按步骤构造一个产品                             | 封装一个产品的构造过程 |
| [Prototype](Prototype_Pattern.md)                       | 原型模式                        | 根据给定实例快速创建一个对象                   | 封装一个产品的构造过程 |

## 行为模式 (12)

涉及到类和对象如何交互以及分配指责。  
目的：对象之间的沟通与互连。

| Behavioral                               | 中文         | DESC                                                           | Short DESC     |
| ---------------------------------------- | ------------ | -------------------------------------------------------------- | -------------- |
| [Command](命令模式.md)                   | 命令模式     | 封装请求成为对象                                               | 封装调用       |
| [NULL Object](命令模式.md#NULL_Object)   | 空对象       | -                                                              |
| [Observer](观察者模式.md)                | 观察者模式   | 让对象能够在状态改变时被通知                                   | 让对象知悉现状 |
| [State](状态模式.md)                     | 状态模式     | 封装基于状态的行为，使用委托在行为之间切换                     | 事物的状态     |
| [Strategy](策略模式.md)                  | 策略模式     | 封装可互换的行为，然后使用委托（对象组合）来决定采用哪一个行为 | 封装算法       |
| [Template Method△](模版方法模式.md)      | 模版方法模式 | 由子类决定如何实现算法中的步骤                                 | 封装算法       |
| [Iterator](迭代器模式.md)                | 迭代器模式   | 提供一个方式来遍历集合，而无需暴露集合的实现                   | 管理集合       |
| [Chain of Responsibility](责任链模式.md) | 责任链模式   | 按次序处理某件事                                               | 封装调用       |
| [Visitor](Visitor_Pattern.md)            | 访问者模式   | 不破坏现有结构时，提供访问信息                                 |
| [Mediator](Mediator_Pattern.md)          | 中介者模式   | 中间人集中控制和沟通逻辑                                       |
| [Interpreter](Interpreter_Pattern.md)    | 解释器模式   | 为语言创建解释器                                               |
| [Memento](Mementor_Pattern.md)           | 备忘录模式   | 撤销与读档                                                     |

- 模版方法模式  
  钩子

## 结构型 (7)

把类或对象组合到更大的结构中。  
目的：用来描述类和对象如何被组合以建立新的结构或新的功能。

| Structural                        | 中文                | DESC                                   | Short DESC           |
| --------------------------------- | ------------------- | -------------------------------------- | -------------------- |
| [Decorator](装饰者模式.md)        | 装饰者模式          | 包装一个对象，以提供新的行为           | 包装对象             |
| [Facade](外观模式.md)             | 外观模式            | 简化一群类的接口                       | 包装对象，以简化接口 |
| [Composite](组合模式.md)          | 组合模式            | 客户用一致的行为处理对象集合和单个对象 | 管理集合             |
| [Proxy △](代理模式.md)            | 代理模式            | 包装对象，以控制对此对象的访问         | 控制对象访问         |
| [Adapter △](适配器模式.md)        | 适配器模式          | 封装对象，并提供不同的接口             | 包装对象，以转换接口 |
| [Bridge](Bridge_Pattern.md)       | 桥接模式            | 可以改变接口和实现                     |
| [Flyweight](Flyweight_Pattern.md) | 享元模式 / 绳量模式 | 共享实例                               |

- 适配器模式  
  类适配器模式  
  对象适配器模式

- 代理模式
  | 代理模式 (9) |
  | ------------------------------------- |
  | 远程代理(Remote Proxy) |
  | 虚拟代理(Virtual Proxy) |
  | 保护代理(Protection Proxy) |
  | 防火墙代理(Firewall Proxy) |
  | 智能引用代理(Smart Reference Proxy) |
  | 缓存代理（Caching Proxy） |
  | 同步代理(Synchronization Proxy) |
  | 复杂隐藏代理(Complexity Hiding Proxy) | |
  | 写入时复制代理(Copy-On-Write Proxy) |

## 复合模式:模式中的模式

- [MVC(Model View Controller)](MVC.md)
