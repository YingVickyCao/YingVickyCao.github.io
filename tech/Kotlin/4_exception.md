# 4 Exceptions

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
