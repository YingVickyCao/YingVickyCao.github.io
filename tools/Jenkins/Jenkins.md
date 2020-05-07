# Jenkins

# 1 Concepts

## 持续部署（Continuous Deployment, CD / Continuous Release , CR）

问题  
各个模块部署到服务器上不能正常运行。

如何做？

关注点:  
项目功能部署到服务器后能运行，为下一步测试或最终用户使用做好准备。

## 持续集成（Continuous Integration，CI）

集成测试：整合所有模块后测试.

问题  
各个模块单独是好的，但集成测试却发现很多问题。要解决问题就必须把所有代码重写，且仍然有可能有问题。并且时间已经不够了，可能导致产品发布延迟。

如何做？  
尽早地、经常、频繁地集成模块，做集成测试。发现一个改动影响了其他代码，立刻通知团队，发现并尽早解决。

关注点  
尽早发现项目整体运行问题，尽早解决。

## 持续交付（Continuous Delivery, CD）

面向最终用户。

问题  
版本发布间隔过长，不能及时根据用户反馈进行调整，无法精确改善用户体验，导致用户流失严重。

如何做？  
小版本、快速迭代，以收集用户反馈，及时作出调整。

关注点  
最新代码尽快让最终用户体验到。

## 总体目标

- 好处 1: 降低风险  
  快速集成，快速测试，有助于今早发现 bug，并解决；今早获得反馈。
- 好处 2 ：减少重复过程  
  产生重复过程的原因：  
  第 1 ：编译、测试、打包、部署等固定操作。  
  第 2 ：一个缺陷没有发现导致后面的开发方向也是错误，那么要修复问题，就要重新调整受影响的所有代码

- 好处 3 ： 任何时间、任何地点能生成可部署的软件。

- 好处 4 ： 增强项目的可见性  
  持续集成系统 对项目构建状态 可视化；对品质指标提供数据

- 好处 5 :建立团队对开发产品的信心  
  每次构建都能知道本次改动对整体有什么影响。

# 2 持续集成工具

- 自动化部署工具  
  Hudson（Sun -> 甲骨文） 与 Jenkins（Sun -> 开源社区） 同源。

- 技术组合  
  Jenkins / Hudson 可以整合 Github huo Subversion

# 3 部署 JavaEE 项目

## 手动部署

![manual_deploy_javaee_project](https://yingvickycao.github.io/img/manual_deploy_javaee_project.png)

## 自动化部署

![auto_deploy_javaee_project](https://yingvickycao.github.io/img/auto_deploy_javaee_project.png)

自动化的体现：  
当代码库更新代码后，应用服务器上自动部署，用户或测试人员使用的马上就是最新的应用程序。

搭建的持续构成环境：  
整个构建、部署过程自动化。程序员把代码提交上去后，服务器上（用户看到的）运行的马上就是最新版本。

需要知识：  
Linux 基本操作命令、Vim  
Maven 的项目构建管理  
Git /Github/Subversion

# References

- https://www.bilibili.com/video/av59639803?p=3
