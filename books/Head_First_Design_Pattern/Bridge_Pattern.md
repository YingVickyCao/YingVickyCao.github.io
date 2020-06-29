# Bridge Pattern

# 1 定义

> 桥接模式: 使用桥接模式，不仅仅改变实现，也改变抽象.  
> Decouple an abstraction from its implementation so that the two can vary independently

# 2 场景

## Example : Shape

Old Design:  
![Bridge-Interface-Hierarchy-450x248](https://cdn.journaldev.com/wp-content/uploads/2013/07/Bridge-Interface-Hierarchy-450x248.png)

Desin using Bridget Pattern:  
![bridge-design-pattern](https://cdn.journaldev.com/wp-content/uploads/2013/07/bridge-design-pattern.png)

## Example : Bridge between devices and remote controls

遥控器会改变，电视机也会改变

![Bridge_Pattern_1](https://yingvickycao.github.io/img/Bridge_Pattern_1.jpg)

![Bridge_Pattern_2](https://yingvickycao.github.io/img/Bridge_Pattern_2.jpg)

## Example 3: How DB servers / APIs to communicate with cross-platform app

```
                                     _______________________________________
multiple types of DB servers / APIs 			Bridge							cross-platform app
                                     _______________________________________
```

![bridge-2-en-2x](https://refactoring.guru/images/patterns/content/bridge/bridge-2-en-2x.png)

# 3 How to use?

抽象 和 实现 都在改变。  
使用桥接模式把实现和抽象放在两个不同的层次中而使它们可以独立改变。  
Decouple abstraction from it's implements, and hiding implements details from client. Then abstraction and implements can very independently.

Before -> After :
![bridge-3-en-2x](https://refactoring.guru/images/patterns/content/bridge/bridge-3-en-2x.png)

After :  
![structure-en-2x](https://refactoring.guru/images/patterns/diagrams/bridge/structure-en-2x.png)

# 4 优点

- 将实现解耦，让它和界面之间不再永久绑定。
- 抽象和实现可以独立扩展，不会影响到对方。
- 对于“具体的抽象”所做的改变，不会影响客户。

# 5 用途

- 适合使用在需要跨越多个平台的图形和窗口系统上
- 当需要用不同的方式改变接口和实现时，发现桥接模式很有用。

# 6 缺点

增加了复杂度

# Refs

- www.refactoring.guru/design-patterns/bridge/java/example
- https://www.journaldev.com/1491/bridge-design-pattern-java


