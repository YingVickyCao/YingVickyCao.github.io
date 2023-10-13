# 3 Control Flow

# 1 Conditions

## If

- 没有三目运算符，因为可以用 if 代替
- if / else / else if
- if 可以用在单独的语句或 expression 中

## When

- similar to `Swith` in C-like language
- key word :`when`, `->` , `else`

# 2 Loops

## for / whille / do while

for : key word : `in`

while vs do while : the same as java  
whle :  
(1) first checks the condition, then executes the body.  
(2) At least executes the body 0 time.

do whle :  
(1) first executes the body, then checks the condition.  
(2) At least executes the body 1 time.

# 3 Jumps

- return / break / continue expressions is the `Nothing type`
  TODO:`Nothing type`
- Label in Kotlin starts with `@`

## Break in loop

(1) unlabled break : terminates the nearest enclosing loop.  
(2) labeled break : terminates the desired loop (can be an outer loop)

## Continue in loop

(1) unlabled continue : skips the current iteration of the nearest enclosing loop.  
(2) labeled continue : skips the iteration if the desired loop (can be an outer loop)

## Return in funcion

(1) unlabled return : returns from the nearest enclosing function.  
(2) labeled return : label can be an explicit/implicit label.  
a)、returns from the nearest enclosing anonymous function.  
b)、returns from the lambda expression / function block by using an label.

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
