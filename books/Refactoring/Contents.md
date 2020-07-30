# 目录

- [第 1 章 重构，第一个案例](C1.md)  
  1.1 起点  
  1.2 重构的第一步  
  1.3 分解并重组 Statemen  
  1.4 运用多态取代与价格相关的条件逻辑  
  1.5 结语

- [第 2 章 重构原则](C2.md)  
  2.1 何谓重构  
  2.2 为何重构  
  2.3 何时重构  
  2.4 怎么对经理说  
  2.5 重构的难题  
  2.6 重构与设计  
  2.7 重构与性能  
  2.8 重构起源何处

- [第 3 章 代码的坏味道](C3.md)  
  3.1 Duplicated Code（重复的代码）  
  3.2 Long Method（过长函数）  
  3.3 Large Class（过大类）  
  3.4 Long Parameter List（过长参数列）  
  3.5 Divergent Change（发散式变化）  
  3.6 Shortgun Surgery（霰弹式修改）  
  3.7 Feature Envy（依恋情结）  
  3.8 Data Clumps（数据泥团）  
  3.9 Primitive Obsession（基本型别偏执）  
  3.10 Switch Statements（switch 惊悚现身）  
  3.11 Parallel Inheritance Hierarchies（平行继承体系）  
  3.12 Lazy Class（冗赘类）  
  3.13 Speculative Generality（夸夸其谈未来性）  
  3.14 Temporary Field（令人迷惑的暂时值域）  
  3.15 Message Chai （过度耦合的消息链）  
  3.16 Middle Man（中间转手人）
  3.17 Inappropriate Intimacy（狎昵关系）  
  3.18 Alternative Classes with Different Interfaces（异曲同工的类）  
  3.19 Incomplete Library Class（不完善的程序库类）  
  3.20 Data Class（纯稚的数据类）  
  3.21 Refused Bequest（被拒绝的遗赠）  
  3.22 Comments（过多的注释）

  [第 4 章 建立测试体系](C4.md)  
  4.1 自我测试码的价值  
  4.2 JUnit 测试框架  
  4.3 添加更多测试

  [第 5 章 重构名录](C5.md)  
  5.1 重构的记录格式  
  5.2 寻找引用点  
  5.3 这些重构准则有多成熟

  [第 6 章 重新组织你的函数](C6.md)  
  6.1 Extract Method（提炼函数）  
  6.2 Inline Method（将函数内联化）  
  6.3 Inline Temp（将临时变量内联化）  
  6.4 Replace Temp With Query（以查询取代临时变量）  
  6.5 Introduce Explaining Variable（引入解释性变量）  
  6.6 Split Temporary Variable（剖解临时变量）  
  6.7 Remove Assignments to Paramete （移除对参数的赋值动作）  
  6.8 Replace Method with Method Object（以函数对象取代函数）  
  6.9 Substitute Algorithm（替换你的算法）

  [第 7 章 在对象之间移动特性](C7.md)
  7.1 Move Method（搬移函数）  
  7.2 Move Field（搬移值域）  
  7.3 Extract Class（提炼类）  
  7.4 Inline Class（将类内联化）  
  7.5 Hide Delegate（隐藏「委托关系」）  
  7.6 Remove Middle Man（移除中间人）  
  7.7 Introduce Foreign Method（引入外加函数）  
  7.8 Introduce Local Exte ion（引入本地扩展）

  [第 8 章 重新组织你的数据](C8.md)  
  8.1 Self Encapsulate Field（自封装值域）  
  8.2 Replace Data Value with Object（以对象取代数据值）  
  8.3 Change Value to Reference（将实值对象改为引用对象）  
  8.4 Change Reference to Value（将引用对象改为实值对象）  
  8.5 Replace Array with Object（以对象取代数组）  
  8.6 Duplicate Observed Data（复制「被监视数据」）  
  8.7 Change Unidirectional Association to Bidirectional（将单向关联改为双向）  
  8.8 Change Bidirectional Association to Unidirectional（将双向关联改为单向）  
  8.9 Replace Magic Number with Symbolic Co tant （以符号常量/字面常量 取代魔法数）  
  8.10 Encapsulate Field（封装值域）  
  8.11 Encapsulate Collection（封装群集）  
  8.12 Replace Record with Data Class（以数据类取代记录）  
  8.13 Replace Type Code with Class（以类取代型别码）  
  8.14 Replace Type Code with Subclasses （以子类取代型别码）  
  8.15 Replace Type Code with State/Strategy （以 State/Strategy 取代型别码）  
  8.16 Replace Subclass with Fields（以值域取代子类）

  [第 9 章 简化条件表达式](C9.md)  
  9.1 Decompose Conditional（分解条件式）  
  9.2 Co olidate Conditional Expression（合并条件式）  
  9.3 Co olidate Duplicate Conditional Fragments （合并重复的条件片段）  
  9.4 Remove Control Flag（移除控制标记）  
  9.5 Replace Nested Conditional with Guard Clauses （以卫语句取代嵌套条件式）  
  9.6 Replace Conditional with Polymorphism（以多态取代条件式）  
  9.7 Introduce Null Object（引入 Null 对象）  
  9.8 Introduce Assertion（引入断言）

  [第 10 章 简化函数呼叫](C10.md)  
  10.1 Rename Method（重新命名函数 ）  
  10.2 Add Parameter（添加参数）  
  10.3 Remove Parameter（移除参数）  
  10.4 Separate Query from Modifier（将查询函数和修改函数分离）  
  10.5 Parameterize Method（令函数携带参数）  
  10.6 Replace Parameter with Explicit Methods（以明确函数取代参数）  
  10.7 Preserve Whole Object（保持对象完整）  
  10.8 Replace Parameter with Method（以函数取代参数）  
  10.9 Introduce Parameter Object（引入参数对象）  
  10.10 Remove Setting Method（移除设值函数）  
  10.11 Hide Method（隐藏你的函数）  
  10.12 Replace Co tructor with Factory Method（以工厂方法取代构造函数）  
  10.13 Encapsulate Downcast（封装「向下转型」动作）  
  10.14 Replace Error Code with Exception（以异常取代错误码）  
  10.15 Replace Exception with Test（以测试取代异常）

  [第 11 章 处理概括关系](C11.md)  
  11.1 Pull Up Field（值域上移）  
  11.2 Pull Up Method（函数上移）  
  11.3 Pull Up Co tructor Body（构造函数本体上移）  
  11.4 Push Down Method（函数下移）  
  11.5 Push Down Field（值域下移）  
  11.6 Extract Subclass（提炼子类）
  11.7 Extract Superclass（提炼超类）  
  11.8 Extract Interface（提炼接口）  
  11.9 Collapse Hierarchy（折叠继承体系）  
  11.10 Form Template Method（塑造模板函数）  
  11.11 Replace Inheritance with Delegation（以委托取代继承）  
  11.12 Replace Delegation with Inheritance（以继承取代委托）

  [第 12 章 大型重构](C12.md)  
  12.1 Tease Apart Inheritance（疏理并分解继承体系）  
  12.2 Convert Procedural Design to Objects（将过程化设计转化为对象设计）  
  12.3 Separate Domain from Presentation（将领域和表述/显示分离）  
  12.4 Extract Hierarchy（提炼继承体系）

  [第 13 章 重构，复用，与现实](C13.md)  
  13.1 现实的检验  
  13.2 为什么开发者不愿意重构他们的程序  
  13.3 再论现实的检验  
  13.4 重构的资源和参考数据  
  13.5 从重构联想到软件复用和技术传播  
  13.6 结语  
  13.7 参考文献

  [第 14 章 重构工具](C14.md)  
  14.1 使用工具进行重构  
  14.2 重构工具的技术标准  
  14.3 重构工具的实用标准  
  14.4 小结

  [第 15 章 总结](C15.md)
  参考书目  
  要点列表  
  索引
