# Python

Python 是一种跨平台的编程语言。  
Python 是一种脚本语言。

# 1 Python 能干什么？

- 数据分析 - Python for Data Analysis(利用 Python 进行数据分析)
- 科学领域：学术研究和应用研究
- 自动化测试
- 爬虫
- 深度学习 Deep Learning
- 机器学习 Machine Learning
- 编程:游戏开发，Web 应用
- 算法

# 2 深度学习 vs 机器学习

https://www.oschina.net/translate/deep-learning-vs-machine-learning-2018  
http://baijiahao.baidu.com/s?id=1643448955362318471&wfr=spider&for=pc  
https://baike.baidu.com/item/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0/3729729?fr=aladdin

## 什么是机器学习？

使用机器学习，是为了实现人工智能。  
机器学习只关注解决现实问题。它还需要人工智能的一些想法。  
机器学习通过旨在模仿人类决策能力的神经网络。用机器算法来解析数据，学习数据，并从中做出理智的判定。  
决策树和线性/逻辑回归等机器学习算法主要用于工业中需要可解释性的场景。

有几种用于机器学习的算法：

- Find-S
- 决策树（Decision trees）
- 随机森林（Random forests）
- 人工神经网络（Artificial Neural Networks）

通常，有 3 类学习算法：

- 监督机器学习算法进行预测。
- 无监督机器学习算法
- 增强机器学习算法

## 什么是深度学习？

深度学习(DL, Deep Learning)是机器学习(ML, Machine Learning)领域中一个新的研究方向，它被引入机器学习使其更接近于最初的目标——人工智能(AI, Artificial Intelligence)。  
深度学习是机器学习领域的最新术语。这是实现机器学习的一种方式。  
深度学习是机器学习的子领域。  
深度学习用于创建可自我学习和可理智判定的人工“神经网络”。  
ML 工具和技术是两个主要的仅关注深度学习的窄子集.

## 人工智能 vs 机器学习？

| 略             | 机器学习                                   | 深度学习                                               |
| -------------- | ------------------------------------------ | ------------------------------------------------------ |
| 数据依赖       | 数据量较小的情况下，表现更好               | 据量增加，性能提高                                     |
| 硬件依赖       | 低端机器                                   | 依赖于高端机器                                         |
| 特征工程       | 由专家识别，然后根据域和数据类型手工编码。 | 从数据中学习更高级的特性                               |
| 解决问题的方法 | 将问题分为两个步骤：对象检测和对象识别     | 进行端到端的学习过程                                   |
| 执行时间       | 更少时间进行训练                           | 更多时间进行训练：参数                                 |
| 可解释性       | 很容易解释算法背后的推理                   | 无法对结果进解释。难以在工业中取得大规模应用的主要原因 |

数据依赖:  
![data_dependency_of_DeepLearning_and_MachineLearning](/img/data_dependency_of_DeepLearning_and_MachineLearning.jpeg)

# 3 为何使用 Python？

Python 是一种效率极高的语言。  
Python 应用广泛。
Python 社区非常重要。

# 4 如何学习书（适用于任何语言）

掌握通用的编程概念：适用于任何语言。  
打基础。  
养成良好习惯。
要理解新的编程概念，最佳方式是尝试在程序中使用它们。

# 5 通用的编程概念 Basics（适用于任何语言）

- 安装环境
- 数据类型
- 对象
- 数据集合：存储、遍历。  
  列表
- IO
- while
- break
- if
- 获取用户输入
- log
- 函数
- 异常处理
- 编写测试代码
- 注释

# 6 注释

编写注释的目的：阐述代码要做什么，以及是如何做。备忘：通过研究代码来确定各个部分的工作原理。但通过编写注释，以清晰的自然语言对解决方案进行概述，可节省很多时间。  
与专业程序员或其他程序猿合作，必须编写有意义的注释。  
从现在开始在程序中添加描述性注释 。  
在代码中编写清晰、简单的注释。  
是否要编写注释？若找到合理的解决方案之前，考虑了多个解决方案？ 那些， 编写注释对解决方案进行说明。  
删除多余的注释。

# 7 Python 之蝉

经验丰富的程序员提倡避繁就简。
分享其中的几个原则 。

```
$ python
>>>  import this
The Zen of Python, by Tim Peters

1 Beautiful is better than ugly.
# 代码可以编写漂亮和优雅。编程是要解决问题。设计良好、高效而漂亮的解决方案

2 Explicit is better than implicit.
# 命名规范与风格：简单明了

3 Simple is better than complex.
# 解决方案：简单，复杂。选择简单的：可维护性

4 Complex is better than complicated.
# 没有简单的解决方案，那么，选择其中 最简单的。

5 Flat is better than nested.
# 扁平胜于嵌套

6 Sparse is better than dense.
# 间隔胜于紧凑（优美的代码有适当的间隔，不要奢望一行代码解决问题）

7 Readability counts.
# 可读性：项目涉及复杂代码，要为代码编写有益的注释。

8 Special cases aren't special enough to break the rules.

9 Although practicality beats purity.
# 通过不断尝试找到最佳解决方案，而不是猜测

10 Errors should never pass silently.
# 精准地捕获异常

11 Unless explicitly silenced.

12 In the face of ambiguity, refuse the temptation to guess.
# 当存在多种可能，不要尝试去猜测

13 There should be one-- and preferably only one --obvious way to do it.
# 如果让两名Python程序员去解决同一个问题，他们提供的解决方案应大致相同。这并不是说 编程没有创意空间，而是恰恰相反!然而，大部分编程工作都是使用常见解决方案来解决简单的 小问题，
# 但这些小问题都包含在更庞大、更有创意空间的项目中。在你的程序中，各种具体细节 对其他Python程序员来说都应易于理解。

14 Although that way may not be obvious at first unless you're Dutch.
# 虽然这并不容易，因为你不是 Python 之父（这里的 Dutch 是指 Guido ）

15 Now is better than never.
# 你可以将余生都用来学习Python和编程的纷繁难懂之处，但这样你什么项目都完不成。不要 企图编写完美无缺的代码;先编写行之有效的代码，再决定是对其做进一步改进，还是转而去编 写新代码。

16 Although never is often better than *right* now.
# 动手之前要细思量

17 If the implementation is hard to explain, it's a bad idea.
# 如果你无法向人描述你的方案，那肯定不是一个好方案；反之亦然（方案测评标准）

18 If the implementation is easy to explain, it may be a good idea.
# 如果你很容易向人描述你的方案，那可能是一个好方案

19 Namespaces are one honking great idea -- let's do more of those!
# 命名空间是一种绝妙的理念，我们应当多加利用（倡导与号召）
>>>
```

# 8 TBD: 如何查看 Python 源码

# 9 TBD: 包结构

https://www.cnblogs.com/kuku0223/p/8975997.html  
https://jeffknupp.com/blog/2013/08/16/open-sourcing-a-python-project-the-right-way/  
https://blog.csdn.net/a1809032425/article/details/79810284

---
