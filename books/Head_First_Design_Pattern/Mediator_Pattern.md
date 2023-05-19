# 中介者模式（Mediator Pattern）

# 1 定义

> 使用该模式来集中相关对象之间复杂的沟通和控制方式

| 角色              | Name       | DESC                                               |
| ----------------- | ---------- | -------------------------------------------------- |
| Mediator          | 抽象中介者 | 定义一个接口用于与各同事对象之间进行通信           |
| ConcreteMediator  | 具体中介者 | 持有各个同事的引用，协调各个同事来实现协作行为     |
| Colleague         | 抽象同事类 | 持有对 Mediator 的引用，子类可以通过该引用进行通讯 |
| ConcreteColleague | 具体同事类 | -                                                  |

![Mediator_Pattern_1](https://yingvickycao.github.io/img/Mediator_Pattern_1.png)

![Mediator_Pattern_2](https://yingvickycao.github.io/img/Mediator_Pattern_2.png)

# 2 场景

![Mediator_Pattern_5](https://yingvickycao.github.io/img/Mediator_Pattern_5.jpg)

在没有中介者之前，对象之间紧耦合：所有对象都需要认识其他对象。

## 实际应用

- Chat ：User1 -> 中间中专服务器 -> User 2
- MVC：C（控制器）是 M（模型）和 V（视图）的中介者
- PC

Before:  
![Mediator_Pattern_3](https://yingvickycao.github.io/img/Mediator_Pattern_3.jpg)

After:  
![Mediator_Pattern_4](https://yingvickycao.github.io/img/Mediator_Pattern_4.jpg)

# 3 How to use

在系统中加入中介者，使沟通变得简单：

- 每个对象都会在状态改变时，告诉中介者。
- 每个对象都会对中介者发出的请求作出回应

![Mediator_Pattern_6](https://yingvickycao.github.io/img/Mediator_Pattern_6.jpg)

有了中介者后，对象之间彻底解耦。

中介者包含了整个系统的控制逻辑。当某装置需要一个新规则时，或者是一个新的装置被加入系统内，其所有需要用到的逻辑也都会被加入中介者内。

# 4 优点

- 通过将对象之间彼此解耦，可增加对象的复用性。
- 通过将控制逻辑集中，简化系统维护。
- 将对对象之间所传递的信息变得简单、大幅度减少

# 5 用途

中介者常常被用来协调相关的 GUI 组件

# 6 缺点

- 如果设计不当，中介者对象本身会变得过于复杂

# Refs

- https://refactoring.guru/design-patterns/mediator/java/example
- https://howtodoinjava.com/design-patterns/behavioral/mediator-pattern/
- https://www.runoob.com/design-pattern/mediator-pattern.html
