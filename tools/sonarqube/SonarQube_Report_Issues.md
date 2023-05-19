# Issues

# Report Issues

https://article.itxueyuan.com/nWlwnO
https://blog.csdn.net/lizz861109/article/details/124708712

- 问题类型 Type :
  高 -> 低：
  Bug（立即修复）
  Vulnerability（漏洞）
   Code Smell（要重构）

- 问题严重级别 Severity :
  Blocker：最高  -  修改
   Critical：高 -  修改
   Major：中   - 修改
   Minor：低  
   Info：最低

  ```
  // SonarQube服务器上的严重性设置映射到Visual Studio规则集设置
  SonarQube   Visual Studio
  ---------   -------------
  Blocker   = Error
  Critical  = Error
  Major     = Error
  Minor     = Warning
  Info      = Info
  ```

- Resolution 处理结果
  Unresolved：未处理
  False Positive：假问题
  Fixed：已处理
  Removed：移除
  Won't Fix：不用处理

# Issues

- Refactor this function to reduce its Cognitive Complexity from 40 to the 15 allowed
  Fix:
  现在复杂度是 40，要求降到 15
  https://blog.csdn.net/Q505410276/article/details/123636612

- Change this "try" to a try-with-resources
  Fix：
  https://zhuanlan.zhihu.com/p/368052061

```

```
