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


# Ref

https://developer.android.google.cn/kotlin/add-kotlin
