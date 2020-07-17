# Tool JIRA

# 1. Created Task Type？

`Type = Epic/Product Issue/Task/Story/Sub-task`

## 1.1 Type = bug

- When?  
  当前 task 引入的 bug/regression bug / product bug
- 尽量当前 Sprint 修复。否则移入下一个修复？

## 1.2 Type = Task：

- When?  
  其他 team Epic 引入的 task / POC/探测(不确定)

### 1.2.1 tech：探测

- tech 在一个 release 中不要太多。因为是 feature 驱动
- Name? [Tech]
- type = task

## 1.3 Type = Epic

- When? 跨 Team task

## 1.4 Type = Story

- 用户故事 + 验收标准
- 用户故事如何描述?  
  As a <Role>, I want to <Activity>, so that <Business Value>.
- 验收标准？  
  Given - When - Then

# 2 Tab Backlog(产品未完成事项)

- BA 建立的 Sprint，包含 release:例如

```
Created Task的属性 [Sprint] Mobile_April Release_2.3/2.10   (IOS/Android)
对应于
Created Task的属性[Fix Versions/s] Mobile_2.10(Fix Versions)
```

# 3 Tab Release（发布计划）

- Version 对应于 Created Task 的属性[`Fix Versions/s`]
- Release date  
  发布日期：应该设置提前设置  
  mobile 的发布日期： 真正发布日期直到走完流程才能确定，是事后补填。

# Search

- How to find issues I am watching

```
watcher = currentUser () AND asignee != currentUser() AND resolution = Unresolved ORDER BY priority DESC, updated DESC
```
