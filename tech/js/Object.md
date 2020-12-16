# JavaScript Object（对象）

JavaScript 中一切都是对象。  
对象是存储在单个分组中的相关功能的集合。

- 对象类型
  | 对象类型 |
  | ---------------- |
  | 自定义对象 |
  | 浏览器内置的对象 |

# 1 对象（Object）

## OOP

面向对象编程(object-oriented programming)

## 对象

对象是一个包含相关数据和方法的集合（通常由一些变量和函数组成，称之为对象里面的属性和方法）

| 对象           | 对象之外 |
| -------------- | -------- |
| 属性(property) | 变量     |
| 方法(method)   | 函数     |

JavaScript ("一切皆对象 most things are objects").  
一个对象由许多的成员组成.  
成员 = name:value.

封装：有结构的存储  
抽象：为了编程目的，利用事物的重要特征把复杂的事物简单化。  
类（class）：描述对象，是定义对象特质的模版。  
命名空间  
多态：多个对象拥有实现共同方法的能力。

## 创建一个对象

| 创建一个对象           | 对象                  |
| ---------------------- | --------------------- |
| 手动的写出对象的内容   | 对象的字面量(literal) |
| 使用函数创建一个对象   | -                     |
| 使用 Object() 构造函数 | -                     |
| 使用 create() 方法     | -                     |
| 实例化                 | 对象                  |

- literal

```js
let person = {
  name: "Tom Jerry",
  name2: {
    first: "Tom",
    last: "Jerry",
  },
  age: 19,
  interests: ["music", "skiing"],
  info: function () {
    console.log(
      this.name +
        "  " +
        this.age +
        "  " +
        this.interests[0] +
        "  " +
        this.interests[1]
    );
  },
};
```

- 实例化  
  用类的构造器动态创建一个对象：TBD：通过原形链的参考链链接过去。  
  实例化：实例对象被类实例化。

## 访问对象的属性和方法

| 访问对象的属性和方法 | 动态设置对象成员的值 | 动态设置对象成员的 value |
| -------------------- | -------------------- | ------------------------ |
| 点表示法             | Supprot              | Not support              |
| 括号表示法           | Support              | Support                  |

- 对象之间通过消息传递来通信  
  当一个对象想要另一个执行某种动作时，它通常会通过那个对象的方法给其发送一些信息，并且等待回应，即返回值。

## namespace

对象的名字表现为一个命名空间(namespace)  
不同的类是不同的命名空间。

- 命名空间

```js
person.name;
```

- 子命名空间

```js
person.name2.first;
```

## this

"this"指向了当前代码运行时的对象( the current object the code is being written inside )——这里指 person 对象。  
"this"保证了当代码的上下文(context)改变时变量的值的正确性  
（比如：不同的 person 对象拥有不同的 name 这个属性，保证每个 person 对象使用它自己的 name）。

```js
info: function () {
    console.log(this.name + "  " + this.age + "  " + this.interests[0] + "  " + this.interests[1]);
}
```

## 好处

存储一些相关联的数据和函数：
效率高，  
放置同名，  
对象使我们将一些信息安全地锁在了它们自己的包内，防止它们被损坏。

# 2 对象原型

https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes

## 原型链

构造器本身就是函数
函数也是一个对象类型

JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（它是**proto**属性，是从构造函数的 prototype 属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法。

| 对象.**proto**属性   | 构造函数的 prototype 属性 |
| -------------------- | ------------------------- |
| 每个实例上都有的属性 | 构造函数的属性            |

对象的原型:通过 Object.getPrototypeOf(obj)或者已被弃用的**proto**属性获得.  
Object.getPrototypeOf(new Foobar())和 Foobar.prototype 指向着同一个对象。

## Javascript 中的原型

每个函数都有一个特殊的属性叫作原型（prototype）

## 理解原型对象

原型链的运作机制  
原型链中的方法和属性没有被复制到其他对象——它们被访问需要通过前面所说的“原型链”的方式。  
person1.**proto** 和 person1.**proto**.**proto**

```js
function Person(first, last, age, gender, interests) {
  // 属性与方法定义
}

var person1 = new Person("Bob", "Smith", 32, "male", ["music", "skiing"]);
```

![MDN-Graphics-person-person-object-2](https://mdn.mozillademos.org/files/13891/MDN-Graphics-person-person-object-2.png)

## prototype 属性:继承成员被定义的地方

prototype 属性包含（指向）一个对象，在这个对象中定义需要被继承的成员。

### create()

create() 实际做的是从指定原型对象创建一个新的对象

```
var person2 = Object.create(person1);
person2.__proto__
```

## constructor 属性

每个实例对象都从原型中继承了一个 constructor 属性，该属性指向了用于构造此实例对象的构造函数。

# 3 原型式的继承

https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance

JavaScript 使用了另一套实现方式，继承的对象函数并不是通过复制而来，而是通过原型链继承（通常被称为 原型式继承 —— prototypal inheritance）。

每一个函数对象（Function）都有一个 prototype 属性，并且只有函数对象有 prototype 属性，因为 prototype 本身就是定义在 Function 对象下的属性。当输入类似 var person1=new Person(...)来构造对象时，JavaScript 实际上参考的是 Person.prototype 指向的对象来生成 person1。  
Person()函数是 Person.prototype 的构造函数:Person===Person.prototype.constructor

- 原型和继承:复杂，但灵活
- 需要继承时才使用，否则只会增加代码复杂性。
- 在使用继承时，建议您不要使用过多层次的继承，并仔细追踪定义方法和属性的位置。  
  过多的继承会在调试代码时给您带来无尽的混乱和痛苦。
- 对象是另一种形式的代码重用。  
  如果只需要一个单一的对象实例，使用对象常量，不需要使用继承。
