# Classes and Objects


# 1 Class
https://kotlinlang.org/docs/classes.html 
## Constructors﻿

### Primary constructor  
- 关键字 constructor，当没有annotations or visibility modifiers时，可以被省略。 
- private constructor() 表示不可见public constructor。

### Secondary constructors
- 关键字 constructor
- 可以有多个
- 没有提供任何constructor时，会自动生成 public primary constructor with no arguments

## Initializer blocks
- 关键字 ： init

## Property initializers

- 初始化的顺序？    
Primary constructor -> (Initializer blocks and Property initializers,按在body中的声明顺序 ) ->  Secondary constructors


## Abstract classes
- 关键字`abstract`
- Can override a non-abstract `open` member with an abstract one
- 关键字`open` 表示这个class 或 functions 可以被override

## Companion objects : TO DO 

# 2 Inheritance
https://kotlinlang.org/docs/inheritance.html

- Root class？  
All classes in Kotlin have a common superclass, `Any`

- 如何可以被继承？  
  By default, Kotlin classes are final – they can't be inherited.    
  Use `open` keyword to make a class inheritable.      
  final class 不可以被继承。

- 构造函数？    
  How derived class to initialize the base type?    
If the derived class has a primary constructor, the base class must be initialized in that primary constructor.    
If the derived class has no primary constructor, then each secondary constructor has to initialize the base type using the `super` keyword  

- Overriding methods？  
 `override` modifier 来重写`open` keyword 标注的fun。    
open 修饰符对final class 无效。    
用`final`修饰fun可以防止被重写。    

- Overriding properties?  
`override` modifier  

- Derived class initialization order  
first, the base class initialization is done as the first step :   
base class - Primary constructor    
->  base class - {Initializer blocks and Property initializers according to  defined order }   
-> base class - Secondary constructors      
then , derived class is  initialized:  
derived class - Primary constructor  
-> derived class - {Initializer blocks and Property   initializers according to  defined order }  
-> derived class - Secondary constructors  

-  Calling the superclass implementation  
`super` keyword.    
调用外部类的superclass implementation，用`super@Outer`。    
当 class 继承了多个实现时，用`super<Base>`指定 supertype name。    

# 3 Properties
https://kotlinlang.org/docs/properties.html#compile-time-constants

- Backing fields : 用 field identifier  
- Backing properties  

- Compile-time constants: 用`const val`.   
a top-level property, or a member of an object declaration or a companion object.    
https://www.jianshu.com/p/1fbba238cfa5 

  top-level property ?    
  把属性的声明不写在 class 里面。    

  top-level function?   
  把函数的声明不写在 class 里面。  

- Late-initialized properties and variables : 用 `lateinit var`   
 `::属性名称.isInitialized`用来 检查属性是否初始化。
 https://cloud.tencent.com/developer/article/2254148     

# 4 Interfaces
https://kotlinlang.org/docs/interfaces.html 
- keyword `interface`
- Interfaces中可以定义Properties

# 5 Functional (SAM) interfaces
- An interface with only one abstract method is called a `functional interface``, or a `Single Abstract Method (SAM) interface``.   
- `fun interface`  
TODO

# 6 Visibility modifiers
- visibility modifiers in Kotlin: private < protected < internal < and public(default).


# 7 Extensions
- Extension functions: 不使用继承的情况来一个类或一个接口的函数。    
- extension properties：不使用继承的情况来一个类或一个接口的属性。    
- Companion object extensions

# 8 Data classes  
https://kotlinlang.org/docs/data-classes.html

- 使用`data class`
- 默认实现了    
.equals()/.hashCode() pair    
.componentN() functions    
.toString()  
.copy()  

# 9 Sealed classes and interfaces
# 10 Generics: in, out, where
# 11 Nested and inner classes
# 12 Enum classes
# 13 Inline value classes
# 14 Object expressions and declarations

## Companion objects
- `companion object` 相当于  factory method
- 
# 15 Delegation
# 16 Delegated properties
# 17 Type aliases