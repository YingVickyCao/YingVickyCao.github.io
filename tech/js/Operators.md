# 运算符

| Type                 | Items                                                                           |
| -------------------- | ------------------------------------------------------------------------------- | --- | ------------- |
| 算术运算符           | `+, -, *, /, %, **(幂，指数)`                                                   |
| 赋值运算符           | =                                                                               |
| Increment operators  | ++                                                                              |
| Dsecrement operators | --                                                                              |
| 复合赋值运算符       | `+=, -=, *=, /=, %=`,<br/> `**=`,<br/> `<<=`, `>>=`, `>>>=`, <br/>`&=`, `^=`, ` | =`  |
| Comparison operators | `===(Strict equality), !==(Strict-non-equality), <, >, <=, >=`                  |
| Logical operators    | `&&(AND),                                                                       |     | (OR), !(NOT)` |

# 1 复合赋值运算符

复合赋值运算符:变量使用前，必须初始化，否则`ERROR:undefine`

```js
// let name;
// name += "say hello"; // ERROR:"undefinedsay hello"
// console.log(name);

let name = "";
name += "say hello";
console.log(name);
```

# 2 比较运算符

TBD:==
TBD:===
