# Kotlin

JetBrains 2011/7 月开发了 Kotlin,以公司附近的一座小岛 Kotlin 命名。  
Google I/O 2017 被 Google 定义为 android 开发第一语言.

# Introduce Kotlin to Android Project

https://developer.android.google.cn/kotlin/add-kotlin

```Groovy
// Project build.gradle file.
buildscript {
   ext.kotlin_version = '1.8.0'
    dependencies {
      /// Add Android Kotlin Plugin to android project
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}
```

```Groovy
// Case 1 : Inside each module(app , android library) using kotlin, START
plugins {
    ...
    id 'kotlin-android'
}
/
apply plugin: 'kotlin-android'
// Case 1 : Inside each module(app , android library) using kotlin, END

// Case 2 : Inside each module(Java library) using kotlin,START
plugins {
    ...
    id 'kotlin'
}
/
apply plugin: 'kotlin'
// Case 2 : Inside each module(Java library) using kotlin,END

...

dependencies {
  // Depresseed org.jetbrains.kotlin:kotlin-stdlib-jdk7 and org.jetbrains.kotlin:kotlin-stdlib-jdk8
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
}


// By default, new Kotlin files are saved in src/main/java/. But also can custom the location of kotlin files
android {
    sourceSets {
        main.java.srcDirs += 'src/main/kotlin'
    }
}
```

- 1 学习重点：
  Kotlin 基础语法
  Kotlin 与 java 互调 ：包括 迁移 Java 到为 Kotlin，
  常见使用问题 s

- 2 IDE
  IDEA
- 3 How to see the Kotlin generated code :IDEA -> Tools -> Kotlin -> "Show Kotlin bytecode"

# 1 Basic

## 常量 、 变量

常量 val (value)
变量 var (variable)

```kotlin
var age: Int = 18
val num = 10
```

## 语句

一条语句，不用加`;`

# 2 数据类型

- Octal literals are not supported in Kotlin.
- Numbers, characters and booleans can be represented as primitive values at runtime
- Signed and unsigned  
   e.g., Int, UInt  
  Don't do : signed <-> unsigned

- 自动类型识别

For Integer types :  
If it is not exceeding the range of Int, the type is Int. If it exceeds, the type is Long

```kotlin
var age: Int = 18   // Int
val threeBillion = 3000000000 // Long
var age2 = 18 // Int
```

For Floating types :
Default is double.

## Type representation on the JVM

```java
val a:Int = 100
val boxedA: Int? = a
val anotherBoxedA: Int? = a
println(boxedA === anotherBoxedA)    // true

val b:Int = 10000
val boxedB: Int? = b
val anotherBoxedB: Int? = b
println(boxedB === anotherBoxedB)    // false
println(boxedB == anotherBoxedB)     // true
```

- on JVM runtime, numbers ares stores as primitive types.

  | Kotlin Type | Kotlin boxed Java Primitive Type |
  | ----------- | -------------------------------- |
  | Byte        | byte                             |
  | Short       | short                            |
  | Int         | int                              |
  | Long        | long                             |
  | Bool        | bool                             |
  | Char        | char                             |

- on JVM runtime, nullable number reference are boxed in java classes.  
  If value in [-128,127] , `Int?` -> java `Integer` -> `int`.  
  If not in [-128,127] , then `Int?` -> java `Integer`

| Kotlin Type | Kotlin boxed Java Class | cached ranged in Java Class | If value in cached ranged, stores as Java Primitive Type |
| ----------- | ----------------------- | --------------------------- | -------------------------------------------------------- |
| Byte?       | Byte                    | [-128,127]                  | byte                                                     |
| Short?      | Short                   | [-128,127]                  | short                                                    |
| Int?        | Int                     | [-128,127]                  | int                                                      |
| Long?       | Long                    | [-128,127]                  | long                                                     |
| Bool?       | Bool                    | true/false                  | bool                                                     |
| Char?       | Char                    | [0,127]                     | char                                                     |

- check  
  === : check object reference
  == : check value

- All number types support conversions to other types: e.g., b.toInt (byte -> Int)

## 空安全类型(Null safety)

(1) non-null type, 不能赋值 null . e.g., String  
(2) nullable type (null / not null) .e.g., String?  
(3) non-null type cannot= nullable typ, but can force nameOfNon_null = nameOfNullable!!

```kotlin
var nameOfNon_null: String = "Vicky"
var nameOfNullable: String? = null

nameOfNon_null = nameOfNullable!!   // wrong

if (null != nameOfNullable) {       // right
 nameOfNon_null = nameOfNullable!!
}
```

(4) nullable type can= non-null type

## Integer

| Signed Integer | Size (bits) | Min value               | Max value                  |
| -------------- | ----------- | ----------------------- | -------------------------- |
| Byte           | 8           | -2<sup>37</sup>(-128)   | 2<sup>7</sup> - 1 (127)    |
| Short          | 16          | -2<sup>15</sup>(-32768) | 2<sup>15</sup> - 1 (32767) |
| Int            | 32          | -2<sup>31</sup>         | 2<sup>31</sup> - 1         |
| Long           | 64          | -2<sup>63</sup>         | 2<sup>63</sup> - 1         |

| Unsigned Integer | Size (bits) | Min value | Max value                  |
| ---------------- | ----------- | --------- | -------------------------- |
| UByte            | 8           | 0         | 2<sup>8</sup> - 1 (255)    |
| UShort           | 16          | 0         | 2<sup>16</sup> - 1 (65535) |
| UInt             | 32          | 0         | 2<sup>32</sup> - 1         |
| ULong            | 64          | 0         | 2<sup>64</sup> - 1         |

## Floating-point types

TODO :小数位 与 整数位  
https://kotlinlang.org/docs/numbers.html#floating-point-types

## Char

### Special character

Special character starts with `\`.

| Special character | DESC                  |
| ----------------- | --------------------- | --- |
|                   |                       | tab |
| \b                | backspace             |
| \n                | new line (LF)         |
| \r                | carriage return (CR)  |
| \'                | single quotation mark |
| \"                | double quotation mark |
| \\                | backslash             |
| \$                | dollar sign           |

## String

- String is immutable
- contact  
  `+`
- string literals

  Escaped string :`"`  
   包含以`\`开头的特殊字符，同 [Char -Special character ](#special-character)
  <br/>

  Raw string:`"""`
  每行缩进 2 个 tab;  
  Use `trimMargin()` to remove leading whitespace from raw strings.

- string template : 如何嵌入到 string  
  `$`

## Arrays

### Array

Array can be used for any type

### primitive type array

TODO:`it`  
 `IntArray`, `ByteArray`, `ShortArray`

# 2 Type checks and casts

## check type

`is ` / `!is`

## Smart Cast

Auto cast on compiler only when the variable won't change between the check and usage

(1)`is ` / `!is` check  
 (2) right-hand-size of `||` or `&&`  
 (3)`when` expression  
 (4)`while` loop

## Unsafe Cast

`as`

```kotlin
Wrong : Nullable/NonNullable to NonNullable
// x can be null / not null
val y: String = x as String
```

```kotlin
Should : Nullable to Nullable
// x can be null / not null
 val y: String? = x as String
```

## Safe Cast

`as?`

```kotlin
// x can be null / not null
val y: String? = x as? String   // return null on failure
```

## Generics type checks and casts : TODO

# 3 Control Flow

## 3.1 Conditions

### If

- 没有三目运算符，因为可以用 if 代替
- if / else / else if
- if 可以用在单独的语句或 expression 中

### When

- similar to `Swith` in C-like language
- key word :`when`, `->` , `else`

## 3.2 Loops

### for / whille / do while

for : key word : `in`

while vs do while : the same as java  
whle :  
(1) first checks the condition, then executes the body.  
(2) At least executes the body 0 time.

do whle :  
(1) first executes the body, then checks the condition.  
(2) At least executes the body 1 time.

## 3.4 Jumps

- return / break / continue expressions is the `Nothing type`
  TODO:`Nothing type`
- Label in Kotlin starts with `@`

### Break in loop

(1) unlabled break : terminates the nearest enclosing loop.  
(2) labeled break : terminates the desired loop (can be an outer loop)

### Continue in loop

(1) unlabled continue : skips the current iteration of the nearest enclosing loop.  
(2) labeled continue : skips the iteration if the desired loop (can be an outer loop)

### Return in funcion

(1) unlabled return : returns from the nearest enclosing function.  
(2) labeled return : label can be an explicit/implicit label.  
a)、returns from the nearest enclosing anonymous function.  
b)、returns from the lambda expression / function block by using an label.

## 3.5 Exceptions

- Exception class is a java class
- throw => try - (catch or finally)
- **Try is an expression, so it can return value from try block or catch block, finally block not affect the result of the expression.**

```kotlin
val result: Int? = try {
    throwAnException()
    2
} catch (ex: Exception) {
    3
}
finally {
    4
}
// => 3
```

- Checked exception : Kotlin does not have checked exceptions.
- throw is an expression in Kotlin, so can use it as part of an expression
- Nothing type : throw expression has the type Nothing.  
  This Nothing type has no values and is used to mark code locations that can never be reached

```kotlin
fun fail(): Nothing {
    throw IllegalArgumentException("Name required")
}
```

```kotlin
val x = null        // x has the type  Nothing?
val list = listOf(null) // list has the type  List<Nothing?>
```

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

# 7 Class

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

- [1] Kotlin classes has a common supoerlcass,`Any`(equals()/hashCode()/toString())
- [2] By default, Kotlin classes are `final` - can not be inherited. To make a class inherited, use `open` keyword.

```kotlin
open class Example { // Example is final


}

open class Example2 { // class is open for inheritance

}

class Sub : Example2() {

}
```

- [3] Derived class can declare an explicit supertype, and init the base class

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

## Abstract Classes

`_2_Abstract_Classes.kt`
Same as Java

## Companon objects

# 8 函数

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

# 4 Java 与 Kotlin 互相调用

// TODO:性能 java vs kotl

# Ref

https://developer.android.google.cn/kotlin/add-kotlin
