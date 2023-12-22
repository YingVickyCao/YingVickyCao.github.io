# Kotlin

# [1 Basic](./1_Basic.md)

# [2 数据类型](./2_data_type.md)

# [3 control flow](./3_control_flow.md)

# [4 Classes and Objects](./_4_Classes_and_Objects.md)


# 5 Function(函数)

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


# 10 Operator

- Elvis operator

x?:y                              // yield x  if x is not null, y otherwise
x?:throw exception`               // yield x  if x is not null ,throw exception  otherwise

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


# Ref

https://developer.android.google.cn/kotlin/add-kotlin  
https://book.kotlincn.net/text/keyword-reference.html  
