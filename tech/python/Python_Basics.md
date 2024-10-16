# Python Basics

# 注释

```
# 单行注释

'''
这是使用三个单引号的多行注释
'''

"""
这是使用三个双引号的多行注释
"""
```

# 1 变量

- Depressed 使用小写字母 l 和大写字母 O，因为会被误认为 1 和 0.
- Recommend：使用小写的变量名. etc, student_name.
- Recommend：文件名：使用小写字母+下划线. etc, simple_message.py.
- 使用变量时避免命名错误。  
  命名错误/使用前未赋值。Python 运行时报错误：`Traceback ：NameError: name 'num' is not defined` 。

# 2 数据类型

1 字符串  
2 数字：整型、浮点数  
3 列表  
4 tuple(元祖)  
5 布尔值  
6 字典(Dictionary),OrderedDict  
7 Set（集合）

## String

- 空白泛指任何非打印字符，如空格、制表符(\t)和换行符(\n)。
- 使用空白来组织输出， 以使其更易读。

## 整数

Python 2 ：整数相除，只包含整数部分，小数部分被删除  
Python 3 ：整数相除，包含整数部分+数部分

## 列表

- 记录添加顺序。

- 访问、修改、add、删除、size、如何避免索引错误
- 列表排序  
  永久性排序、临时排序、永久倒序。  
   字母顺序排序比较复杂。决定排列顺序时，有多种解读大写字母的方式，要指定准确的排列顺序，比较复杂。 大多数排序方式都基于本节介绍的的知识
- 创建数值列,可带步调 `range()`.

- 统计计算
- 列表解析
- for 遍历列表
- 切片(Segmentation)：处理列表的部分元素  
  负数索引  
  遍历切片
- 复制列表  
  得到列表的副本：整个/部分
- 设置引用

### VS: sort，sorted，reverse,reversed

| function                   | Desc     | modify origin list?                                     | 内置函数                                  |
| -------------------------- | -------- | ------------------------------------------------------- | ----------------------------------------- |
| list.sort()                | 正序排列 | 修改，永久性排序                                        | list 列表的内置函数                       |
| list.sort(reverse=True)    | 倒序排列 | 修改，永久性排序                                        | list 列表的内置函数                       |
| sorted(list)               | 正序排列 | 不修改，临时排序                                        | Python 内置函数。返回列表                 |
| sorted(list, reverse=True) | 倒序排列 | 不修改，临时排序                                        | Python 内置函数。返回列表                 |
| reverse()                  | 反转列表 | 修改，永久性反转。<br/>但通过再次调用恢复原来的排列顺序 | list 列表的内置函数                       |
| list(reversed(money))      | 反转列表 | 不修改，临时反转                                        | Python 内置函数,reversed 返回的都是迭代器 |

## tuple(元祖)

- 元组：不可变的列表 。  
  不可变：不能修改的值 。

- 不能修改组内的元素，但可修改指向。
- 相对于列表，Tuple 是更简单的数据结构 。
- 何时用？  
  需要存储的一组在程序的整个生命周期内都不变。

## Set（集合）

元素是唯一的。

## 布尔值

True/False  
布尔值通常用于记录条件。  
在跟踪程序状态或程序中重要的条件方面，布尔值提供了一种高效的方式。

## 字典(Dictionary)

不记录添加键—值对的顺序。  
要创建字典并记录其 中的键—值对的添加顺序，可使用模块 collections 中的 OrderedDict 类。OrderedDict 实例的行为 几乎与字典相同，区别只在于记录了键—值对的添加顺序。

Python 字典  
字典是一系列键—值对.  
使用键来访问与之 相关联的值。
类似 java map，但是 Python 中 key 类型任意，可以相同，也可以不同。
与键相关联的值可以是数字、字符串、列表乃至字典。可将任何 Python 对 象用作字典中的值。  
key: 大小写敏感、空格敏感 。

### 操作

1. 访问
2. 添加 key-value
3. 创建空字典  
   使用字典来存储用户提供的数据或在编写能自动生成大量键—值对的代码时，通常都需要先 定义一个空字典。
4. 修改 value
5. 删除 key-value
6. 遍历字典  
   可遍历字典的所有键—值对、键或值。

   遍历 key-values：  
    即便遍历字典时，键—值对的返回顺序也与存储顺序不同。Python 不关心键—值对的存 储顺序，而只跟踪键和值之间的关联关系。  
    Good : 所有 key 用途一致，所有 value 作用一致，使用具体含义的名字，而不是 key 和 value，这让人更容易明白循环的作用。

   遍历 keys：  
    Good : 遍历字典时，会默认遍历所有的键.显示使用 `.keys()`，让代码更易理解

   遍历 values：  
    `.values()`：  
    使用 Set 去重复

7. 嵌套  
   将一系列字典存储在列表中，或将列表作为值存储在字典中，这称为嵌套。  
   列表中嵌套字典  
   字典中嵌套列表  
   字典中嵌套字典

   列表中嵌套字典  
    用途：  
    经常需要在列表中包含大量的字典，而其中每个字典都包含特定对象的众多信息。  
    例如，可能需要为网站的每个用户创建一个字典，并将这些字典存储在 一个名为 users 的列表中。  
    在这个列表中，所有字典的结构都相同，因此可以遍历这个列表， 并以相同的方式处理其中的每个字典。

## OrderedDict

兼具列表和字典的主要优点(在将信息关联起来的同时保留原来的顺序)

# 3 loop

## for 遍历

避免缩进错误:
Python 根究缩进来判断代码与前一个代码行的关系。  
Python 通过使用缩进让代码整洁而结构清晰，更易读。  
在较长的程序中， 缩进程度不相同的代码块，让对程序的结构有很大的认识。

- 错误 1 ： 忘记缩进
  Python 没有找到期望缩进的代码块，执行报错。 语法错误

```
magicians = ['alice', 'david', 'carolina']
for magician in magicians:
print(magician)
```

```
File "magicians.py", line 3
print(magician)
^
IndentationError: expected an indented block
```

- 错误 2 ：忘记缩进额外的代码行
  执行不报错，但结果出乎意料。 逻辑错误

```
magicians = ['alice', 'david', 'carolina']
for magician in magicians:
print(magician.title() + ", that was a great trick!")
 print("I can't wait to see your next trick, " + magician.title() + ".\n")
```

- 错误 3 ： 不必要的缩进 。
  执行报错。

```
message = "Hello Python world!"
print(message)
```

```
File "hello_world.py", line 2
print(message)
^
IndentationError: unexpected indent
```

- 错误 4 ： 循环后不必要的缩进 。
  多数情况下， 逻辑错误。少数情况下， 语法错误。

```
magicians = ['alice', 'david', 'carolina']
for magician in magicians: 16
print(magician.title() + ", that was a great trick!")
print("I can't wait to see your next trick, " + magician.title() + ".\n")
print("Thank you everyone, that was a great magic show!")
```

```
Alice, that was a great trick!
I can't wait to see your next trick, Alice.

Thank you everyone, that was a great magic show!
David, that was a great trick!
I can't wait to see your next trick, David.

Thank you everyone, that was a great magic show! Carolina, that was a great trick!
I can't wait to see your next trick, Carolina.

Thank you everyone, that was a great magic show!
```

- 错误 5 ：遗漏了冒号
  语法错误

```
magicians = ['alice', 'david', 'carolina']
for magician in magicians
         print(magician)
```

## while

- Python vs Java  
  Python while：条件满足才执行。 至少执行 0 次。  
  Java while：条件满足才执行。 至少执行 1 次。
- 作用：while 循环让程序在用户愿意时不断地运行 -> 有条件死循环
- Good : 使用标记  
  在更复杂的程序中，很多不同的事件都会导致程序停止运行;在这种情况下，该怎么办呢?  
  在要求很多条件都满足才继续运行的程序中，可定义一个变量，用于判断整个程序是否处于 活动状态。这个变量被称为标志，充当了程序的交通信号灯。可让程序在标志为 True 时继续运行，并在任何事件导致标志的值为 False 时让程序停止运行。这样，在 while 语句中就只需检查一 个条件——标志的当前值是否为 True，并将所有测试(是否发生了应将标志设置为 False 的事件) 都放在其他地方，从而让程序变得更为整洁。

## break

使用 break 退出循环  
break 语句用于控制程序流程  
在任何 Python 循环中都可使用 break 语句。例如，可使用 break 语句来退出遍历列表或字典 的 for 循环。

## continue

根据条件测试结果决定是否继续执行循环 / 返回到循环开头

## 避免编写无限循环

① 退出条件。  
② 每次循环，至少有个地方检测条件测试

## 使用循环处理列表和字典

for 循环是一种遍历列表的有效方式，但在 for 循环中不应修改列表，否则将导致 Python 难以跟踪其中的元素。

要在遍历列表的同时对其进行修改（移动/删除元素），可使用 while 循环。通过将 while 循环同列表和字典结合起来使用，可收集、存储并组织大量输入，供以后查看和显示。  
Good ： Removing / moving item when loop,use `whil`e, not `for`.

# 4 代码格式设置约定

- 目的：为确保所有人编写的代码的结构大致一致。

- 格式设置指南  
  若要提出 Python 语言修改建议，需要编写 Python 改进提案(Python Enhancement Proposal， PEP)。PEP 8 是最古老 PEP 之一，它向 Python 程序员提供了代码格式设置指南。PEP 8 的篇幅很 长，但大都与复杂的编码结构相关。  
  代码被阅读的次数比编写次数多 。  
  让代码易于编写 vs 让代码易于阅读？让代码易于阅读。

- 缩进  
  PERP8 建议每次缩进使用 4 个空格 。  
  每款文本编辑器都提供了一种 设置，可将输入的制表符转换为指定数量的空格。在编写代码时应该使用制表符键，但一定要 对编辑器进行设置，使其在文档中插入空格而不是制表符。

- 行长  
  每行 <= 80 字符：让屏幕上并排打开两三个文件时能同时看到各个文件的完整行。  
  注释长度 <= 72 字符：因为有些工具为大型项目自动生成文档时，会在每行注释开头添加格式化字符。  
  一条竖线效果：提示不能越界。

- 空行  
  一个空行：隔开两个不同处理块。  
  不要在程序文件中过多地使用空行。  
  空行不会影响代码的运行，但会影响代码的可读性。Python 解释器根据水平缩进情况来解读代码，但不关心垂直间距。

- PEP 8 指南  
  See https://python.org/dev/peps/pep-0008/ , 查看更复杂的 Python 结构  
  `VSCode : autopep8`

# 5 if 语句

## 条件测试

每条 if 语句的核心都是一个值为 True 或 False 的表达式，这种表达式被称为条件测试。 结果 = True/False

- 比较数字和字符串：  
  = :数字/字符串
  != :数字/字符串

  > =:数字
  > <:数字
  > <=:数字

- 检查多个条件？`and`, `or`
- 检查特定值是否包含在列表中？`in`。 大小写、空格敏感
- 检查特定值是否不包含在列表中？`not in`。 大小写、空格敏感

## 布尔表达式

布尔表达式，是条件测试的别名. 结果 = True/False

## if 语句

1 简单的 if 语句

2 if-else

3 if-elif-else

4 使用多个 elif 代码块

5 省略 else 代码块  
else 是一条包罗万象的语句，只要不满足任何 if 或 elif 中的条件测试，其中的代码就会执行，这可能会引入无效甚至恶意的数据。
Good: 使用一个 elif 代码块来 代替 else 代码块

6 测试多个条件 。  
如果只想执行一个代码块，就使用 if-elif-else 结构;如果要运行多个代码块，就 使用一系列独立的 if 语句。  
一点点 drink：加糖，加柠檬，加冰，加牛奶

# 6 用户输入

- 接受用户输入

  Python 3  
  input()

  Python 2.7  
   raw_input() ✓  
   input() ✗

  Python 2.7 也包含函数 input()，但它将用户输入解读为 Python 代码，并尝试运行它们。因此，最好的结果是出现错误，指出 Python 不明白输入的代码;而最糟的结果是，将运行原本无意运行的代码。

- 函数 input()的工作原理  
  函数 input()让程序暂停运行，等待用户输入一些文本。获取用户输入后，Python 将其存储在 一个变量中，并 return。  
  Good : 使用 input()时，应该提供清晰而明白的提示，准确地指出希望用户提供什么信息。 通过在提示末尾(通常是冒号后面)包含一个空格，将提示和输入分开，让用户清楚知道其输入始于何处。  
  Good : 多行提示，将提示存储在变量中，再将变量传递给 input()，这样 input()语句也非常清晰。  
  将数值输入用于计算和比较前，务必将其转换为数值表示。  
  int(string_of_num): 数字的字符串 -> 数值

# 7 method

- 函数作用：  
  ① 重复使用  
  ② 程序组织更有序，可读性更强  
  ② 更易扩展  
  ④ 更易维护  
  ⑤ 让程序更易测试和调试

- 每个函数只负责一个项具体的工作。  
  编写函数时，如果发现它执行的任务太多，尝试将代码划分到两个函数中。这有助于将复杂的任务划分为一系列的步骤。

- 定义函数  
  docstring（文档字符串）:Python 使用它们生成程序中函数的文档

```
    """ Just say hi """
```

- 函数名  
  不支持同名（函数名相同，但参数不同）
- 形参、实参
- 返回值  
  函数可返回任何类型的值，包括列表和字典等复杂的数据结构 。

## 传递实参

- 传递实参的方式  
  ① 位置实参

  ② 关键字实参
  关键字实参是传递给函数的名称—值对。
  传递实参时 不会混淆。  
   无需考虑函数调用中的实参顺序，还清楚地指出了函数调用中各个值的用途。  
   使用关键字实参时，务必准确地指定函数定义中的形参名。

  ③ 默认值  
  使用默认值时，在形参列表中必须先列出没有默认值的形参，再列出有默认值的实参。 这让 Python 依然能够正确地解读位置实参。  
  When 全部参数都有默认值，顺序任意。  
  Good: 使用默认参数，让实参变得可选 。

  等效的函数调用：①，②， ③

- 避免实参错误：执行错误

- 向函数传递列表
- 传递列表  
  ① 在函数中修改列表  
  向函数传递列表的原件

  ② 禁止函数修改列表  
  向函数传递列表的副本，而不是原件。  
  虽然向函数传递列表的副本可保留原始列表的内容，但除非有充分的理由需要传递副本，否则还是应该将原始列表传递给函数，因为让函数使用现成列表可避免花时间和内存创建副本，从而提高效率，在处理大型列表时尤其如此。

- 传递任意数量的实参  
  ① `*` 让 Python 为形参创建一个空元组，用来接受所有值。  
  ② 结合使用位置实参和任意数量实参  
  如果要让函数接受不同类型的实参，必须在函数定义中将接纳任意数量实参的形参放在最 后。Python 先匹配位置实参和关键字实参，再将余下的实参都收集到最后一个形参中。  
  ③ 使用任意数量的关键字实参  
  需要接受任意数量的实参，但预先不知道传递给函数的会是什么样的信息。在这种情况下，可将函数编写成能够接受任意数量的键—值对

## 将函数存储在模块中

模块，指的是把代码封装在一个`.py` 文件

导入模块?

① 导入整个模块

```
# 导入整个模块
import pizza

pizza.make_pizza('A')  # ('A',)
pizza.make_pizza('C', 'D', "E")  # ('C', 'D', 'E')
```

② 导入特定的函数

```
# 导入特定的函数
from module_1 import function_2, function_3

function_2()  # function_2
function_3()  # function_3
```

③ 使用 as 给函数指定别名
如果要导入的函数的名称可能与程序中现有的名称冲突，或者函数的名称太长，可指定简短而独一无二的别名——函数的另一个名称，类似于外号.

```
# 使用 as 给函数指定别名
from module_1 import function_4 as f4

f4() # function_4
```

④ 使用 as 给模块指定别名  
给模块指定别名。通过给模块指定简短的别名(如给模块 pizza 指定别名 p)，让能够更轻松地调用模块中的函数。  
目的：简洁代码，让不再关注模块名，而专注于描述性的函数名。

```
# 使用 as 给模块指定别名
import pizza as p

print("\n")
p.make_pizza('A') # ('A',)
p.make_pizza('C', 'D', "E") # ('C', 'D', 'E')
```

⑤ 导入模块中的所有函数  
使用星号(\*)运算符可让 Python 导入模块中的所有函数:  
import 语句中的星号让 Python 将模块 pizza 中的每个函数都复制到这个程序文件中。由于导入了每个函数，可通过名称来调用每个函数，而无需使用句点表示法。  
然而，使用并非自己编写的 大型模块时，最好不要采用这种导入方法:如果模块中有函数的名称与你的项目中使用的名称相 同，可能导致意想不到的结果:Python 可能遇到多个名称相同的函数或变量，进而覆盖函数，而不是分别导入所有的函数。

Good: 要么只导入需要使用的函数，要么导入整个模块并使用句点表示法。这能让代码更清晰，更容易阅读和理解。

```
# 导入模块中的所有函数
from module_1 import \*

function_1() # function_1
```

## 函数编写指南

- 函数名/模块名：  
  描述性文字  
  小写 and `_`

- 给形参指定默认值时，等号两边不要有空格

- 对于函数调用中的关键字实参，等号两边不要有空格
- 函数采用文档字符串格式，添加功能阐述注释
- When 函数定义超过 79 字符，将形参分行并缩进。
- 所有的 import 语句都应放在文件开头，唯一例外的情形是，在文件开头使用了注释来描述整个程序。

<!-- # 8 运算符 -->

# 8 类

- 定义类

```
# 与类相关联的方法调用都会自动传入实参 self，它是一个指向实例本身的引用，让实例能够访问类中的属性和方法.self会自传递，不需要传递它
# 方法 __init__()不显式包含return语句，Python 自动返回一个实例
def __init__(self, name, age):
    self.name = name
    self.age = age
    # 给属性设置默认值
    self.type_name = 'normal'
```

- 实例化：根据类来创建对象
- 了解类背后的概念可培养逻辑思维，让你能够通过编写程序来解决遇到的几乎任何问题。与其他程序员基于同样的逻辑来编写代码，更好理解其人代码，以及自己的代码被他人理解。
- 使用类几乎可以模拟任何东西  
  方法- 行为：类中的函数称  
  属性 - 信息：通过实例访问的变量
- 类名：首字母大写
- 实例：小写
- 定义类
- 访问属性
- 调用方法
- 给属性设置默认值
- 直接/通过函数来修改属性值
- 继承  
  父类,也称为超类 superclass  
  子类  
  创建子类时，父类必须包含在当前文件中，且位于子类前面。
  给子类定义属性和方法  
  重写父类的方法  
  将实例用作属性：提取类

## 模拟实物

从较高的逻辑层，而不是语法层考虑。考虑的不是 Python，而是如何使用代码来表示实物。到达这种境界后，你经常会发现，现实世界的建模方法并没有对错之分。有些方法的效率更高，但要找出效率最高的表示法。
需要经过一定的实践。只要代码像你希望的那样运行，就说明你做得很好!即便你发现自己不得 不多次尝试使用不同的方法来重写类，也不必气馁;要编写出高效、准确的代码，都得经过这样 的过程。

## 导入类

- 导入单个类

```
# car.py
class Car

# my_car.py
from car import Car
```

- 在一个模块中存储多个类

```
# car.py
class Car
class ElectricCar(Car)

# my_electric_car.py
from car import ElectricCar
```

- 从一个模块中导入多个类

```
# my_cars.py
from car import Car, ElectricCar
```

- 导入整个模块 (Good)

```
# my_cars.py
import car

# 访问类
module_name.class_name
```

- 导入模块中的所有类 (Bad)

```
# Depressed
from module_name import *
```

- 在一个模块中导入另一个模块

将类存储在多个模块中时，可能一个模块中的类依赖于另一个模块中的类。在这种情况 下，可在前一个模块中导入必要的类。

```
# electric_car.py
from car import Car
class ElectricCar(Car)
```

## 自定义工作流程

- 在组织大型项目的代码方面，Python 提供了很多选项。熟悉所有这些选项很重要，这样才能确定哪种项目组织方式是最佳的，并能理解别人开发的项目。
- 一开始应让代码结构尽可能简单。先尽可能在一个文件中完成所有的工作，确定一切都能正确运行后，再将类移到独立的模块中。
  如喜欢模块和文件的交互方式，可在项目开始时就尝试将类存储到模块中。先找出让你能够编写出可行代码的方式，再尝试让代码更为组织有序。

## 类编码风格

- 类名应采用驼峰命名法
- 实例名 和模块名都采用小写格式，并在单词之间加上下划线。
- 每个类，都应紧跟在类定义后面包含一个文档字符串。这种文档字符串简要地描述类的 功能，并遵循编写函数的文档字符串时采用的格式约定。每个模块也都应包含一个文档字符串， 对其中的类可用于做什么进行描述。
- 在类中，可使用一个空行来分隔方法;而在模块中，可使用两个空行来分隔类。
- 需要同时导入标准库中的模块和你编写的模块时，先编写导入标准库模块的 import 语句，再添加一个空行，然后编写导入你自己编写的模块的 import 语句。在包含多条 import 语句的程序中， 这种做法让人更容易明白程序使用的各个模块都来自何方。

# 9 文件（IO）

处理文件：让程序能够快速地分析大量的数据  
处理文件和保存数据可让程序使用起来更容易

## 读

- open():Python 在当前执行的文件所在的目录(不包括子目录)中查找指定的文件  
  Good：关键字 with:在不再需要访问文件后将其关闭。  
  Drepressed：使用 open()和 close()来打开和关闭文件。

  如果程序存 在 bug，导致 close()语句未执行，文件将不会关闭。但未妥善地关闭文件可能 会导致数据丢失或受损。
  如果在程序中过早地调用 close()，你会发现需要使用文件时它已关闭(无法访问)，这会导致更多的错误。  
  并非在任何情况下都能轻松确定关闭文件的恰当时机，但通过使用 with，可让 Python 去确定:你只管打开文件，并在需要时使用它，Python 自会 在合适的时候自动将其关闭。

- read()到达文件末尾时返回一个空字符串

- 读取整个文件
- 逐行读取
- 文件路径

  相对文件路径:让 Python 到指定的位置去查找，位置是相对于当前运行的程序文件所在目录的。  
  最简单的做法是，要么将数据文件存储在程序文件所在的目录，要么将其存储在程序文件所在目录下的一个文件夹(如 text_files)中。

  绝对文件路径:文件在计算机中的准确位置. 与当前运行的程序存储的位置无关。通过使用绝对路径，可读取系统任何地方的文件。

  Recommend：相对文件路径

- 读取文本文件时，Python 将其中的所有文本都解读为字符串。如果读取的是数字，并要将其作为数值使用，就必须使用函数 int()将其转换为整数，或使用函数 float()将其转 换为浮点数。

- 对于可处理的数据量，Python 没有任何限制;只要系统的内存足够多，你想处理多少数据都可以。

## 写

- 写入模式：  
  ① 读取模 式('r') （默认）  
  ② 写入模式('w')：打开文件时，若不存在，则新建文件。若存在，则清空文件。  
  ③ 附加模式('a')：打开文件时，若不存在，则新建文件。若存在，则写入到文件的行添加到文件末尾。  
  ④ 读取和写入文件的模式('r+')
- Python 只能将字符串写入文本文件。要将数值数据存储到文本文件中，必须先使用函数 str()将其转换为字符串格式。
- 函数 write()不会写入自动在文本末尾自动添加换行符，需要手动添加 `write("w\n")`

# 10 异常

- 错误处理：避免程序在面对意外情形时崩溃
- 异常
  它们是 Python 创建的特殊对象，用于管理程序运行时出现的错误。  
  每当发生让 Python 不知 所措的错误时，它都会创建一个异常对象。

  异常处理的好处：  
   ① 避免让用户看到 traceback ，显示编写的友好的错误消息  
   ② 通过预测可能发生错误的代码，可编写健壮的程序，帮助应对异常情形。避免崩溃，程序能继续运行  
   ③ 抵御无意的用户错误和恶意的攻击。

- try-except 代码块  
  异常是使用 try-except 代码块处理的。  
  try-except 代码块让 Python 执行指定的操作，同时告诉 Python 发生异常时怎么办。

* else 代码块

* 失败时一声不吭  
  但并非每次捕获到异常时都需要告诉用 户，有时候希望程序在发生异常时一声不吭，就像什么都没有发生一样继续运行。要让程序在 失败时一声不吭，可像通常那样编写 try 代码块，但在 except 代码块中明确地告诉 Python 什么都不要做。

  例子： 打印 5 个文件。  
  处理：其中一个文件不见了。不见的文件不报错，也没有 traceback。记录在 missing_files.txt。用户看不到这个文件，但程序可以读取这个文件，进而处理所有文件找不到的问题。

* 常见异常  
  ZeroDivisionError  
  FileNotFoundError

* 决定报告哪些错误  
  向用户显示他不想看到的信息可能会降低程序的可用性。
  Python 的错误处理结构让你能够细致地 控制与用户分享错误信息的程度，要分享多少信息由你决定。

  编写得很好且经过详尽测试的代码不容易出现内部错误，如语法或逻辑错误，但只要程序依赖于外部因素，如用户输入、存在指定的文件、有网络链接，就有可能出现异常。凭借经验可判断该在程序的什么地方包含异常处理块，以及出现错误时该向用户提供多少相关的信息。

# 11 存储数据

- 程序都把用户提供的信息存储在列表和字典等数据结构中。用户关闭程序时，要保存他们提供的信息;一种简单的方式是使用模块 json 来存储数据。

  好处？  
  ① 模块 json 让你能够将简单的 Python 数据结构转储到文件中，并在程序再次运行时加载该文件中的数据。  
  ② 使用 json 在 Python 程序之间分享数据。  
  ③JSON 数据格式并非 Python 专用的，这让能够将以 JSON 格式存储的数据与使用其他编程语言的人分享。  
  ④ 这是一种轻便格 式，很有用，也易于学习。

- JSON(JavaScriptObjectNotation)格式最初是为 JavaScript 开发的，但随后成了一种常见 格式，被包括 Python 在内的众多语言采用。

# 12 测试代码

- 编写测试的好处？  
  编写函数或类时，还可为其编写测试。  
  通过测试，可确定代码 面对各种输入都能够按要求的那样工作。  
  测试让你信心满满，深信即便有更多的人使用你的程序，它也能正确地工作。  
  在程序中添加新代码时，也可以对其进行测试，确认它们不会破坏程序既有的行为。  
  程序员都会犯错，因此每个程序员都必须经常测试其代码， 在用户发现问题前找出它们。

```
并非必须为尝试的所有项目编写测试; 但参与工作量较大的项目时，应对自己编写的函数和类的重要行为进行测试。这样就能够更加确定自己所做的工作不会破坏项目的其他部分，你就能够随心所欲地改进既有代码了。如果不小心破坏了原来的功能，你马上就会知道，从而能够轻松地修复问题。相比于等到不满意的用户 报告 bug 后再采取措施，在测试未通过时采取措施要容易得多。
```

- Python 标准库中的模块 unittest 提供了代码测试工具。
- `单元测试`用于核实函数的某个方面没有问题
- `测试用例`是一组单元测试，这些单元测试一起核实函数在各种情形下的行为都符合要求。  
  良好的测试用例考虑到了函数可能收到的各种输入，包含针对所有这些情形的测试。
- `全覆盖式测试`用例包含一整套单元测试，涵盖了各种可能的函数使用方式。对于大型项目，要实现全覆盖可 能很难。通常，最初只要针对代码的重要行为编写测试即可，等项目被广泛使用时再考虑全覆盖。
- 在项目早期，不要试图去编写全覆盖的测试用例.

- 如何编写测试  
  使用模块 unittest 中的工具来为函数和类编写测试  
  断言方法

- 测试未通过时怎么办呢?  
  未通过的测试让得知新代码破坏了函数原来的行为。

  如果检查的条件没错，测试通过了意味着函数的行为是对的，而测试未通过意味着你编写的新代码有错。因此，测试未通过时，不要修改测试，而应修复导致测试不能通过的代码:检查刚对函数所做的修改，找出导致函数行为不符合预期的修改。

- 测试分类  
  函数的测试 - 编写针对单个函数的测试 NameTestCase  
  类的测试 - 编写针对类的测试 TestStudent

- setUp()  
  unittest.TestCase 类包含方法 setUp()，让只需创建这些对象一次，并在每个测试方法中使用它们。  
  如在 TestCase 类中包含了方法 setUp()，Python 将先运行它，再运行各个以 test\_打头的方法。在编写的每个测试方法中都可使用在方法 setUp() 中创建的对象了。

- 运行测试  
  ① 运行整个类：main / 类  
   运行 test_name_function.py 时，所有以 test\*打头的方法都将自动运行

  ```
  # 理解为是一个主函数，当前这个Python文件的入口
  if __name__ == "__main__":
  unittest.main()
  ```

  ```
  (python_3_7_4) 192:src hades$ python 12_test_code/test_name_function.py
  ```

  ② 运行单个函数

# TBD
