 # Bridge Pattern

#  1 定义
> Decouple an abstraction from its implementation so that the two can vary independently

- When use it?   
不仅仅改变实现，也改变抽象.  
Decouple abstraction from it's implements,  and hiding implements details from client. Then abstraction and implements can very independently.  
e.g., 
```
                                     _______________________________________
multiple types of DB servers / APIs 			Bridge							cross-platform app
                                     _______________________________________

```

![bridge-2-en-2x](https://refactoring.guru/images/patterns/content/bridge/bridge-2-en-2x.png)  

- 类图  
Before ->  After : 
![bridge-3-en-2x](https://refactoring.guru/images/patterns/content/bridge/bridge-3-en-2x.png)

After :  
![structure-en-2x](https://refactoring.guru/images/patterns/diagrams/bridge/structure-en-2x.png)

# 2 Example 
## Example : Shape
Old Design:  
![Bridge-Interface-Hierarchy-450x248](https://cdn.journaldev.com/wp-content/uploads/2013/07/Bridge-Interface-Hierarchy-450x248.png) 

Desin using Bridget Pattern:  
![bridge-design-pattern](https://cdn.journaldev.com/wp-content/uploads/2013/07/bridge-design-pattern.png)

## Example : Bridge between devices and remote controls
![example-en-2x](https://refactoring.guru/images/patterns/diagrams/bridge/example-en-2x.png)


# Refs
- www.refactoring.guru/design-patterns/bridge/java/example
- https://www.journaldev.com/1491/bridge-design-pattern-java