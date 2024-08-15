# Kotlin

# 1 Basic 
JetBrains 2011/7 月开发了 Kotlin,以公司附近的一座小岛 Kotlin 命名。  
Google I/O 2017 被 Google 定义为 android 开发第一语言.

## Introduce Kotlin to Android Project

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

## 程序入口
```kotlin
fun main(args: Array<String>) {
}

fun main() {
    println("hi")
}
```

## Package and imports
Yes

https://kotlinlang.org/docs/packages.html

- If package is not specified, uses the default package with no name.


## Imports

https://kotlinlang.org/docs/packages.html

- Default imports can be imported into each Kotlin file by default or depending on target platform.
- Us as to rename clashing name.

```
import org.example.Message
import org.test.Message as TestMessage
```

## 语句

一条语句，不用加`;`

## 文件名

- kotlin_name.kt -> kotlin_nameKt.class having kotlin_nameKt
- 只有fun在.kt时，那么生成的fun是static

```kotlin
//Main.kt
fun main() {
    Test.message("welcome")
}


MainKt.kt -> MainKt.class having class MainKt
/**
 * public final class MainKt {
 *    public static final void main() {
 *       Test.INSTANCE.message("welcome");
 *    }
 *
 *    // $FF: synthetic method
 *    public static void main(String[] var0) {
 *       main();
 *    }
 * }
 */
```

- 如何修改生成的文件名和class 名？

```kotlin
//Main.kt
@file:JvmName("LoginUtils")

MainKt.kt -> LoginUtils.class having class LoginUtils
```

```kotlin
// Utils1.kt
@file:JvmName("MyUtils")
@file:JvmMultifileClass

// Utils2.kt
@file:JvmName("MyUtils")
@file:JvmMultifileClass

MyUtils.class
Utils1.kt -> MyUtils__Utils1Kt.class having MyUtils__Utils1Kt
Utils2.kt -> MyUtils__Utils2Kt.class having MyUtils__Utils2Kt
```
## Java 与 Kotlin 互相调用

// TODO:性能 java vs kotl

## 常量 、 变量

常量 val (value)  
变量 var (variable)

```kotlin
var age: Int = 18
val num = 10
```

# 2 数据类型

## 2.1 Primitive type

- Numbers, characters and booleans can be represented as primitive values at runtime  

### Integer

- 支持的进制  
二进制  
十进制  
十六进制  

  不支持八进制。  

- 自动类型识别    
For Integer types :  
If it is not exceeding the range of Int, the type is Int. If it exceeds, the type is Long

  ```kotlin
  var age: Int = 18   // Int
  val threeBillion = 3000000000 // Long
  var age2 = 18 // Int
  ```

- Signed and unsigned   
   e.g., Int, UInt  
  Don't do : signed <-> unsigned


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

### Floating-point types

TODO :小数位 与 整数位  
https://kotlinlang.org/docs/numbers.html#floating-point-types

- 自动类型识别      
浮点类型默认为Double 类型。    
Float 类型，要加 f 或 F 后缀。  


### Char

- Special character  
  Special character starts with `\`.

  | Special character | DESC                  ||
  | ----------------- | --------------------- | --- |
  |                   |                      | tab |
  | \b                | backspace             ||
  | \n                | new line (LF)         ||
  | `\r`               | carriage return (CR)  ||
  | `\'`              | single quotation mark ||
  | `\"`                | double quotation mark ||
  | `\\`               | backslash             ||
  | `\$`               | dollar sign           ||

### Integer types/boolean/Characters Type representation on the JVM

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

- nullable number  
on JVM runtime, nullable number reference are boxed in java classes.  
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
Kotlin 中，判断值相等，用==, 等价于且最终调用 java `equals()`  
Kotlin 中，判断对象相等，用===, 等价于 java ==  

- All number types support conversions to other types: e.g., b.toInt (byte -> Int)  

## 2.2 Object

### String

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

### Arrays

Array can be used for any type

- primitive type array

TODO:`it`  
 `IntArray`, `ByteArray`, `ShortArray`

### enum

### 自定义的class

## 2.3 空安全类型(Null safety)

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

## 2.4 Type checks and casts

## check type

`is ` / `!is`

## Smart Cast

Auto cast on compiler only when the variable won't change between the check and usage

(1)`is ` / `!is` check  
 (2) right-hand-size of `||` or `&&`  
 (3)`when` expression  
 (4)`while` loop

### Unsafe Cast

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

### Safe Cast

`as?`

```kotlin
Way 1 : 
// x can be null / not null
val y: String? = x as? String   // return null on failure


Way 2 :
if (null != nameOfNullable) {       // right
 nameOfNon_null = nameOfNullable!!
}
```

### Generics type checks and casts : TODO

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

do whie :  
(1) first executes the body, then checks the condition.  
(2) At least executes the body 1 time.

## 3.3 Jumps

- return / break / continue expressions is the `Nothing type`
  TODO:`Nothing type`
- Label in Kotlin starts with `@`

### Break in loop

(1) unlabled break : terminates the nearest enclosing loop.  
(2) labeled break : terminates the desired loop (can be an outer loop)

### Continue in loop

(1) unlabled continue : skips the current iteration of the nearest enclosing loop.  
(2) labeled continue : skips the iteration if the desired loop (can be an outer loop)

### Return in function

(1) unlabled return : returns from the nearest enclosing function.  
(2) labeled return : label can be an explicit/implicit label.  
a)、returns from the nearest enclosing anonymous function.  
b)、returns from the lambda expression / function block by using an label.

## 3.4 Exceptions

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


# [4 Classes and Objects](./_4_Classes_and_Objects.md)


# 5 Function(函数)
https://book.kotlincn.net/text/functions.html

https://kotlinlang.org/docs/functions.html#tail-recursive-functions

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

## Functional (SAM) interface : // TODO
https://kotlinlang.org/docs/fun-interfaces.html  

## Lambdas
- Each Lambdas function is an object, and it captures a closure. 
- lambda 表达式中无法使用return该关键字。相反，函数中最后一个表达式的结果将成为返回值。

## Inline functions
- inline
- noinline

# 6 Null safety

nullable :   
check if (a != null)  
 `?.`  
 `?.let`  

- Elvis operator

x?:y                              // yield x  if x is not null, y otherwise    
x?:throw exception`               // yield x  if x is not null ,throw exception  otherwise

- not-null assertion operator (!!)   
not-null assertion operator (!!) converts any value to a non-nullable type and throws an exception if the value is null. 


# 7 Equality
 
- Structural equality (==) :   
1 the class which manually or automatically override (data class / value calss) the equals() function       
2 primitive types's === check is equivalent to the == check  

- Referential equality (===) : the class which not manually and automatically override the equals() function   
When overriding the equals() function, you should also override the hashCode() function to keep consistency between equality and hashing and ensure a proper behavior of these functions.

- Floating-point numbers equality

- Array equality   
To compare whether two arrays have the same elements in the same order, use contentEquals().  


# 8 This expressions


# 10 Operator

- Elvis operator

- not-null assertion operator (!!) 


# 11 符号

## `!!` 加在变量名后
如果对象为null，那么系统一定会报异常！
```kotlin
_binding!!   
```

## `?` 加在变量名后
使用 ？时，程序会进行非空判断，如为空，则返回 null ，不会造成程序报错。
```kotlin
myList!!.size
// myList 为null 的时候直接打印出null ，不会抛出 NullPointerException 。  
```


## ` ?：`
当 ?: 前面的对象为空时，返回后面的值
```kotlin
val roomList: ArrayList<Room>? = null
val mySize= roomList?.size ?: 0  
// 当roomList为空时，返回0，否则返回它的size。
```

## `::`
把方法当作一个参数，传递到另一个方法中使用，即引用一个方法。

## `->`
函数类型 (R, T) -> R


## `=== `

== 表示比较对象地址

## `==`
== 表示比较两个值大小。

# 12 创建问题

- Kotlin:Java里的static在Kotlin里如何实现？  
https://www.jianshu.com/p/2869d660ef75


# Ref

https://developer.android.google.cn/kotlin/add-kotlin  
https://book.kotlincn.net/text/keyword-reference.html  
