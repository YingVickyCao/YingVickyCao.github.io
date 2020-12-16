# 循环（Loop）

循环，适用于快速完成重复任务。

| Loop         | Desc                                                            |
| ------------ | --------------------------------------------------------------- |
| for          | Recommend。最简单地显示初始化程序，退出条件和最终表达式，易查错 |
| while        | -                                                               |
| do ... while | -                                                               |

# 1 for

```
for (initializer; exit-condition; final-expression) {
  // code to run
}

for (let i = 1; i < 21; i++) {
    console.log(i);
}
```

| for 循环的输入值/参数 | -      |
| --------------------- | ------ |
| A start value         | i=1    |
| An exit condition     | i < 21 |
| An incrementor        | i++    |

- 至少执行 0 次循环：If 第一次执行时条件不满足，不进入循环体

# 2 while

```
initializer
while (exit-condition) {
  // code to run

  final-expression
}
```

- 至少执行 0 次循环：If 第一次执行时条件不满足，不进入循环体

# 3 `do...while`

```
initializer
do {
  // code to run

  final-expression
} while (exit-condition)
```

- 至少执行 1 次循环：If 第一次执行时条件不满足，进入循环体.

# 4 break

# 5 continue
