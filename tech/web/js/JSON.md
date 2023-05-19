# JSON

- JSON

JSON stands for JavaScript Object Notation. It is data saved in a .json file, and consists of a series of key/value pairs

JSON 是一种数据格式，按 JavaScript 对象语法的 String。  
 JSON 对象就是基于 JavaScript 对象.  
 它独立于 JavaScript，因此许多程序环境能够读取（解读）和生成 JSON。
JSON 是一种纯数据格式，它只包含属性，没有方法。  
 不像 JavaScript 标识符可以用作属性，在 JSON 中，只有字符串才能用作属性。

| JSON      | -                  |
| --------- | ------------------ |
| 扩展名    | `.json`            |
| MIME type | `application/json` |

- 转换 json string and 对象

```js
const str = JSON.stringify(obj); // obj -> json string
const obj2 = JSON.parse(str); // json string -> obj
```

- JSONLint 检验 JSON  
  https://jsonlint.com/
