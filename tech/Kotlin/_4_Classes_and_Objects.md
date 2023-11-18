# Classes and Objects


# 1 Class

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
# 4 Interfaces
# 5 Functional (SAM) interfaces
# 6 Visibility modifiers
# 7 Extensions
# 8 Data classes
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