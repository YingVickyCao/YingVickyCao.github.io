# Head First Design Parttern

中文：Head First 设计模式  
作者：O'Reilly

- 设计即生活。  
  思考：设计 即显化需求
- 设计模式的经典书籍：  
   《Design Patterns》（设计模式），经典但难懂。作者是四人组（Gang of Four，GoF）：Gamma, Johnson, Helm, Vlissides。  
   《设计模式之禅》
  http://yuedu.baidu.com/ebook/d7260e63844769eae109ed60?fr=aladdin&key=

- 《Head First 设计模式》，可以看作是《Design Patterns》的注释版/ 白话版/漫画版/搞笑版，涵盖了 24 个设计模式。  
  特点：易懂、简单、有趣。  
  可以作为设计模式的入门。
- 设计模式适合任何 OO 语言
- 采用“类” UML 图，而非 UML 类图。
- 没有包含所有的设计模式  
  设计模式有很多：Gof 的基础模式、Sun 的 J2EE 模式、JSP 模式、架构模式、游戏设计模式  
  书中焦点是 Gof 的重要模式，Gof 的其他模式在附录中概略介绍
- 书中“组合（Composition）”，指 OO 一般概念中的组合 Composition，不是 UML 严格定义的 Composition
- Book Code  
  https://www.wickedlysmart.com/head-first-design-patterns/

- 设计模式是针对一些特定场景的、比较通用的解决方案。
- 学习设计模式  
  使用场景、方案（即用途：它解决了什么问题）、优点、缺点、与相似的模式之间的区别
- 使用设计模式  
  最好的方式：“把设计模式装进脑袋里，然后在设计和已有的应用中使用，寻找何处可以使用它们。”以往是代码复用，现在是经验复用。  
  优先考虑使用场景以及要解决的问题，其次考虑各种解决方案之间的优劣对比，最后——其实压根也不用去考虑——到底要使用模式 A 还是模式 B。

# 设计工具箱中内的工具

## OO 基础

抽象  
封装  
多态  
继承

## [OO 原则（设计原则）（10）](设计原则.md)

- [原则 1：封装变化](策略模式.md#design_principles_1)
- [原则 2：多用组合，少用继承](策略模式.md#design_principles_2)
- [原则 3：针对接口编程，而不是针对实现编程](策略模式.md#design_principles_3)
- [原则 4：松耦合](观察者模式.md#design_principles_4)
- [原则 5: 开放-关闭原则](装饰者模式.md#Open_Close_Principle)
- [原则 6: 依赖倒置原则](工厂模式.md#Depency_Inverse_Principle)
- [原则 7: 最少知识原则](外观模式.md#（Least_Knowledge_Principle)
- [原则 8: 好莱坞原则](模版方法模式.md#Hollywood_Principle)

## OO 模式（设计模式）(10+)

- [策略模式(Strategy Pattern)](策略模式.md)
- [观察者模式(Observer Pattern)](观察者模式.md)
- [装设者模式（Decorator Pattern）](装饰者模式.md)
- [工厂模式（Factory Pattern)](工厂模式.md)  
  [简单工厂(Simple Factory)](工厂模式.md#Simple_Factory) ：不是模式  
  [工厂方法模式(Factory Method Pattern)](工厂模式.md#F actory_Method_Pattern)  
  [抽象工厂模式(Abstact Factory Pattern)](工厂模式.md#Abstact_Factory_Pattern)
- [单件模式 (Singleton Pattern)](单例模式.md)
- [命令模式(Command Pattern)](命令模式.md#Command_Pattern)
- [空对象(NULL Object)](命令模式.md#NULL_Object)
- [适配器模式 (Adapter Pattern）](适配器模式.md)  
  类适配器模式  
  对象适配器模式
- [外观模式( Facade Pattern)](外观模式.md)
- [模版方法模式(Template Method Pattern)](模版方法模式.md)  
  钩子
- 迭代模式
- 组合模式
- 状态模式
- 代理模式
- 复合模式
- 真实世界中的模式

# Refs

- [Design Patterns](https://sourcemaking.com/design_patterns)
