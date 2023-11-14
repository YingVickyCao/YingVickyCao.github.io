# 享元模式 / 绳量模式(Flyweight Pattern)

# 1 定义

> 享元模式：想让某个类的一个实例用来题提供许多“虚拟实例”

尝试重用现有的同类对象，如果未找到匹配的对象，则创建新对象

# 2 场景

1、系统有大量相似对象。  
2、需要缓冲池的场景。

## Example : 一个 景观设计应用中，可以增加树作为点缀。当用户添加了很多树后，程序变得很卡

![Flyweight_Pattern](https://yingvickycao.github.io/img/Flyweight_Pattern.jpg)

## 应用实例

1、JAVA 中的 String，如果有则返回，如果没有则创建一个字符串保存在字符串缓存池里面。  
2、数据库的数据池。

# 3 How to Use

一种树类型只用一个树实例，一个客户对象维护“所有”树的状态。

# 4 优点

减少运行时对象实例的个数，节省内存。  
将许多“虚拟”对象的状态集中管理。

# 5 用途

当一个类有许多的实例，而这些实例能够被同一方法控制，此时可以使用该模式。

# 6 缺点

一旦实现了它，那么单个的逻辑实例将无法拥有独立而不同的行为。

# Refs

- https://www.runoob.com/design-pattern/flyweight-pattern.html
