# 数据类型

# 1 Primitive type

- Numbers, characters and booleans can be represented as primitive values at runtime  

## Integer

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

## Floating-point types

TODO :小数位 与 整数位  
https://kotlinlang.org/docs/numbers.html#floating-point-types

- 自动类型识别      
浮点类型默认为Double 类型。    
Float 类型，要加 f 或 F 后缀。  


## Char

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

## Integer types/boolean/Characters Type representation on the JVM

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

# 2 Object

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

Array can be used for any type

- primitive type array

TODO:`it`  
 `IntArray`, `ByteArray`, `ShortArray`

## enum

## 自定义的class

# 3 空安全类型(Null safety)

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

# 4 Type checks and casts

## check type

`is ` / `!is`

# Smart Cast

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
Way 1 : 
// x can be null / not null
val y: String? = x as? String   // return null on failure


Way 2 :
if (null != nameOfNullable) {       // right
 nameOfNon_null = nameOfNullable!!
}
```

## Generics type checks and casts : TODO