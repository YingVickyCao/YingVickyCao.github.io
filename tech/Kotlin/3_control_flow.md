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

