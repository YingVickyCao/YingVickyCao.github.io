# Kotlin

# [1 Basic](./1_Basic.md)

# [2 数据类型](./2_data_type.md)

# [3 control flow](./3_control_flow.md)

# [4 Exception](./4_exception.md)

# 5 Packages

https://kotlinlang.org/docs/packages.html

- If package is not specified, uses the default package with no name.

# 6 Imports

https://kotlinlang.org/docs/packages.html

- Default imports can be imported into each Kotlin file by default or depending on target platform.
- Us as to rename clashing name.

```
import org.example.Message
import org.test.Message as TestMessage
```

# 7 Function(函数)

```kotlin
fun printCourse(course: String): String {
    println("String is $course")
    return course
}
```

- param of functioon is val

```kotlin
// While.kt
// param is val. if you need to modify it, pass an object to wrapper it
fun while_loops(x: Int) {
   while (x > 0) {
       x -= 1  // Error : compile error - Val cannot be reassigned
   }
}
```

## Destructuring declarations


# 8 Class



## class declation

`_1_classes.kt`
(1) class name  
 (2) class header (Optional) :the type parameter, the primary constructor, some other thing
(3) class body (Optional) : one or more secondary constructors
the one or more initializer blocks `init`

## the primary constructor

`_1_classes.kt`

## the secondary constructors

`_1_classes.kt`

## Create instance of classes : no `new`

`_1_classes.kt`

## Class members: // TODO

(1) constructor and inittializer blocks  
(2) Functions  
(3) Properties  
(4) Nested and inner classes  
(5) Object delarations`

## Inheritance

`_3_Inheritance.kt`

- [1] Kotlin classes has a common superlcass,`Any`(equals()/hashCode()/toString())
- [2] By default, Kotlin classes are `final` - can not be inherited. To make a class inherited, use `open` keyword.

```kotlin
open class Example { // Example is final


}

open class Example2 { // class is open for inheritance

}

class Sub : Example2() {

}
```

- [3] Constructor : Derived class can declare an explicit supertype, and init the base class

```kotlin
open class Base(n: Int) {

}

// Derived class has a primary constructor, so the base class must be inited in that primary constructor according to it's parameters
class Derived(n: Int) : Base(n) {

}

// If Derived class has no primary constructor, then each secondary constructor has to init the base type using `super` keyword or it has delegate to another
class Derived2 : Base { constructor which does.
    constructor(n: Int) : super(n)
    constructor(n: Int, name: String) : super(n)
}
```

- [4] Overriding methods     
- [6] Derived class initialization order
```
First, Base class - Constructor -> init blocks -> property initializer
Then,  Derived class - Constructor -> init blocks -> property initializer
```
- [7] Calling superclass implementation  
`super`

## Abstract Classes

`_2_Abstract_Classes.kt`
Same as Java


## Properties 
`_4_Properties.kt`  
https://kotlinlang.org/docs/properties.html  


val : only get  
val : (1) set and get. (2) set can be private (3) set and get can be custom

- Kotlin provides an implicit backing field for a property
- Developer can provide an explicit backing field for a property
- [Compile-time constants](https://kotlinlang.org/docs/properties.html#compile-time-constants)    
`const val`  0000 
- [Overriding properties](https://kotlinlang.org/docs/inheritance.html#overriding-properties)      
`override`  
- Delegated properties : //TODO


## Visibility modifiers  
`private < protected < internal < public`  

https://kotlinlang.org/docs/visibility-modifiers.html


## Extension  
https://kotlinlang.org/docs/extensions.html    
(1) Extension function : receiver type, and receiver object  
Nullable receiver 
(2) Extension properties     
(3) Companion object extensions      
(4) Declaring extensions as members      
multiple implicit receivers  : extension receiver > a dispatch receiver  

## data class  
https://kotlinlang.org/docs/data-classes.html   
`data class` 


- default auto generated function
```kotlin
                                    explicit implementation
equals()/hashCode() pair          : enable
toString()                        : enable
componentN()                      : disable
copy()                            : disable
```

## Companon objects 

## Sealed class

## Sealed interface


## enum classes
the set of values for an enum type is also restricted, but each enum constant exists only as a single instance,

# 9 Interface
https://kotlinlang.org/docs/interfaces.html  

`interface`
- class can be derived from multiple interface

## Functional (SAM) interface : // TODO
https://kotlinlang.org/docs/fun-interfaces.html  



# 10 Operator

- Elvis operator

x?:y                              // yield x  if x is not null, y otherwise
x?:throw exception`               // yield x  if x is not null ,throw exception  otherwise


# Ref

https://developer.android.google.cn/kotlin/add-kotlin
