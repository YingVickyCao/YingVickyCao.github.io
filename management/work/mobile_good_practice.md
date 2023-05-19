# Mobile Good Practice

# 1 Page load slowly, >2 minutes.

```
app -> 1 url -> sum N porlets porlets results -> back to app
=>
app -> 1 url -> N porlets url -> app -> app separate to load  every porlet url
```

# 2 UAT server always shuts down

QA  
DEV  
UAT

# 3 android build slowly

reduce modules.  
lib: not always chang code.

# 4 最小文档

- API List
- Contact
- New Developer
- 发布
- 打包
- configure

# 5 Menu seperate

# 6 工具和 lib 版本升级

定期升级 lib、sdk、gradle  
引入可能的 feature。

# 7 引入跨平台语言：

一份代码，支持 2 个平台，减少投入资源。  
升级周期短。

# 8 模块划分代码

# 9 配置化

menu  
menu configure  
theme

# 10 提高 app 质量的方法

- UI Design ： Improve UI flow
- PO List
- 重构
- 互测
- 结对轮流执行流程
- 过程改进
- log error code： wiki page

# 11 API change

- Which version plan to old retire?
- If API changed, what is the effect on old version?
  api ?/ api param? / api response value?
- Is it need to keep campibility half year ?
