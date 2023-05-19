# git 基础知识

-git   
分布式的版本控制工具  
Linux 内核的代码用 Git 管理的  

- 总结

```
 git 中一共有 3 种类型：commit/tree/blob。也是 3 种核心对象
 git cat-file -t 看类型
 git cat-file -p 看内容
 hash 值，可长可短。只要唯一区分就行。
```

```
HEAD
objects  => git的核心3个对象类型：Commit/blob文件
refs  : tag/branch 信息
config
```

# 1 背景

- 版本管理系统（VCS）

VCS 出现之前，用文件夹管理 -> 集中式 VCS,例如 SVN -> 分布式 VCS，例如 Git，Mercurial

VCS 出现前：
有一台 server。
用目录拷贝区分不同版本。
公共文件容易被覆盖
成员沟通成本很高
代码集成效率低下。

集中式 VCS：（CVCS，全称 Centralizes VCS）
有集中的版本管理服务器。  
具备文件版本管理和分支管理能力。  
集成效率很高。  
客户端没有完整的版本历史。因此，客户端必须和服务器相连。

分布式 VCS （DVCS，全称 Distributed Version Control System）  
客户端和服务器都有完整的版本历史。  
脱离服务端，客户端照样可以管理版本。  
查看版本历史和版本比较等很多操作，不再需要访问服务器。  
与 CVCS 相比，更能提高版本管理效率。

- Git 的优点  
  支持离线操作。  
  很容易做备份。  
  最有大存储能力。

- Git 的重点掌握内容：
  Git、GitHub、GitLab  
  GitLab：有一个社区版本，公司用来做代码平台二次开发


- 官网

Git 官方文档地址：
https://git-scm.com/book/zh/v2

下载 git 的 macOS 版本
https://git-scm.com/download/mac



## Git Advantage

- 分布式模式  
   Git 跟 SVN 一样有自己的集中式版本库或服务器。但 Git 更倾向于被使用于分布式模式——即每个开发人员从中心版本库的服务器上 chect out 代码后会在自己的机器上克隆一个版本库，它拥有中心版本库上所有的东西，例如标签、分支、版本记录等。    
local 和 remote branch 是并行、独立  
Clone 代码后，在每个分支上所做操作有独立的记录，不会相互干涉  

- 离线工作, 速度快  
   大部分操作在本地,最终提交远程
- 原子提交  
  每次提交都会对所有代码创建一个唯一的 commit id,而不是每个文件有一个 commit id.  
  全部成功提交或合并，或不变
- 切换 branch 没有多余的目录
- 内容完整性  
   内容存储使用的是 SHA-1 哈希算法——确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏


##  版本控制软件相互比较

- 版本库模型（Repository model）  
  描述了多个源码版本库副本间的关系.

  分类:客户端/服务器,分布式

  客户端/服务器:  
  每一用户通过客户端访问位于服务器的主版本库，每一客户机只需保存它所关注的文件副本，对当前工作副本（working copy）的更改只有在提交到服务器之后，其它用户才能看到对应文件的修改

  分布式:  
  源码版本库副本间是对等的实体，用户的机器出了保存他们的工作副本外，还拥有本地版本库的历史信息

- 并发模式（Concurrency model）  
   描述了当同时对同一工作副本/文件进行更改或编辑时，如何管理这种冲突以避免产生无意义的数据

  分类:排它锁,合并模式

  排它锁:  
   只有发出请求并获得当前文件排它锁的用户才能对对该文件进行更改

  合并模式:  
  用户可以随意编辑或更改文件，但可能随时会被通知存在冲突（两个或多个用户同时编辑同一文件)。  
  版本控制工具或用户需要合并更改以解决这种冲突.  
  几乎所有的分布式版本控制软件采用合并方式解决并发冲突

- 历史模式（History model）  
  描述了如何在版本库中存贮文件的更改信息  
  分类:快照,改变集

  快照:  
  版本库会分别存储更改发生前后的工作副本

  改变集:  
  版本库除了保存更改发生前的工作副本外，只保存更改发生后的改变信息

- 变更范围（Scope of change）  
  描述了版本编号是针对单个文件还是整个目录树

- 网络协议（Network protocols）  
   描述了多个版本库间进行同步时采用的网络协议

- 原子提交性（Atomic commit）  
  描述了在提交更改时，能否保证所有更改要么全部提交或合并，要么不会发生任何改变

- 部分克隆（Partial checkout/clone）  
  是否支持只拷贝版本库中特定的子目录

## Git vs SVN  
![git_repo.png](https://yingvickycao.github.io/img/tools/git/git_repo.png)    
![git_repo.png](https://yingvickycao.github.io/img/tools/git/git_repo2.png)  

![svm_repo.png](https://yingvickycao.github.io/img/tools/git/svm_repo.png)      
![svm_repo.png](https://yingvickycao.github.io/img/tools/git/svm_repo2.png)    


# 2 git 内部工作机制
![git_work_flow.png](https://yingvickycao.github.io/img/tools/git/git_work_flow.png)    

![git_work_flow.png](https://yingvickycao.github.io/img/tools/git/git_work_flow2.png)  

- Directory  

- WorkSpace / working directory  
工作空间，持有实际文件  
Modified   

- Index/Stage    
缓存区，临时保存改动    
Staged / Tracked  

- Local resposory  
本地仓库，一个存放在本地的版本库,HEAD 指向当前的开发分支  

- Stash  
工作状态保存栈，用于保存/恢复 WorkSpace 中的临时状态  

Unstage (Untracked)（工作目录） -> Stage（暂存区） ->Commited （版本历史，加入版本管理）      
/  
Unstage (Untracked) （工作目录）<- Stage（暂存区）

- unstage/untracked
  新增一个文件，或修改一个文件后，unstage/untracked 状态。

- Recording Changes to the Repository  
https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository  
  Figure 8. The lifecycle of the status of your files.    
  ![lifecycle.png](https://git-scm.com/book/en/v2/images/lifecycle.png)  

# 3 .git 目录

```
// .git
$ tree
.
├── HEAD
├── config
├── index
├── info
│   └── exclude
├── logs
│   ├── HEAD
│   └── refs
│       └── heads
│           ├── branch_1
│           └── main
├── objects
│   ├── 05
│   │   └── b03f4fbc575bba34097eea57020cb985517727
│   ├── 66
│   │   └── a2029874828a701017226515fb1caa13a88189
└── refs
    ├── heads
    │   ├── branch_1
    │   └── main
    └── tags
```


# 4 `origin`

- origin = 远程仓库的default 别名. but can ne any name.  
  `repo/.git/config`

```
$ git remote
origin

$ git remote -v
origin	https://github.com/YingVickyCao/GitTest.git (fetch)
origin	https://github.com/YingVickyCao/GitTest.git (push)
```

- (远程仓库名)/(分支名) = 远程分支    
  `remotes/origin/master` 或 `origin/master` is remote master branch  
  `master` is local master branch

```
$ git branch -r     // r = remote branch
  origin/HEAD -> origin/master
  origin/master

$ git branch        // local branch
  A1
* master

$ git branch -a     // a = all = local branch + remote branch
  A1
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```


# 5 config : local 的配置文件

# 6 refs

heads : 分支
tags : 创建的 tag，表示里程碑

```
$ cd .git/refs/heads

$ ls
branch_1	main

$ cat main
8ea04c3b431787adb3f8b8f34b286a95cba9f122


// -t :查类型
// -p :看内容
// 表明 main 这个文件，它包含了一个长的hash值，该hash值是一个commit类型
// hash值，可长可短。只要唯一区分就行。

$ git cat-file -t 8ea04c3b43
commit

$ git cat-file -t 8ea04c3b431787adb3f8b8f34b286a95cba9f122
commit
```

# 7 objects

```
$ cd objects/

$ pwd
～/Desktop/git-example/.git/objects

$ tree
.
├── 05
│   └── b03f4fbc575bba34097eea57020cb985517727
├── 66
│   └── a2029874828a701017226515fb1caa13a88189
├── 67
│   └── 57339cac0a67e64bdcc143cf7e317dde35deab
├── 6a
│   └── 3c340cd5936d1231fe5f4bfebf8bbb38089da4
├── 8e
│   └── a04c3b431787adb3f8b8f34b286a95cba9f122
├── f8
│   └── 9b9a8bd50d342e135b69686aa3f9bd410232ce
├── info
└── pack

8 directories, 6 files

$ cd 66

$ ls
a2029874828a701017226515fb1caa13a88189

// 结合文件夹+hash值，用git cat-file 查看这个hash值的类型和内容
$ git cat-file -t 66a2029874828a701017226515fb1caa13a88189
tree

// blob，含义是 二进制文件，表示是一个文件
$ git cat-file -p 66a2029874828a701017226515fb1caa13a88189
100755 blob 6757339cac0a67e64bdcc143cf7e317dde35deab	2.txt
100755 blob 6a3c340cd5936d1231fe5f4bfebf8bbb38089da4	Readme.md


$ git cat-file -t 6757339cac0a67e64bdcc143cf7e317dde35deab
blob

// 内容是2.txt
$ git cat-file -p 6757339cac0a67e64bdcc143cf7e317dde35deab
2.txt

// 验证一下：6757339cac0a67e64bdcc143cf7e317dde35deab 确实 和 2.txt的内容一致
$ git branch
* branch_1
  main

$ ls
2.txt		Readme.md	hello

$ cat 2.txt
2.txt
```

# 8 commit、tree 和 blob 三个对象之间的关系    
![git_commit_tree_blob.png](https://yingvickycao.github.io/img/tools/git/git_commit_tree_blob.png)  

commit:每次提交。一次 commit 只对应一个树。当提交时，以树的形式，对一个文件夹的快照。  
blod ：文件。即使文件名字不同，那么文件内容相同，就是一个东西。节省存储空间。

```
$ git log
commit 8ea04c3b431787adb3f8b8f34b286a95cba9f122 (HEAD -> main)
Author: your_name <your_email@domain.com>
Date:   Mon Dec 26 22:52:29 2022 +0800

add 1.txt

$ git cat-file -p 8ea04c3b431787adb3f8b8f34b286a95cba9f122
tree 05b03f4fbc575bba34097eea57020cb985517727  => 后面没有列出文件夹名，说明它就是git 仓库的根目录
author your_name <your_email@domain.com> 1672066349 +0800
committer your_name <your_email@domain.com> 1672066349 +0800

add 1.txt

$ git cat-file -p 05b03f4fbc575bba34097eea57020cb985517727
100755 blob 6a3c340cd5936d1231fe5f4bfebf8bbb38089da4	1.txt

$ git cat-file -p 6a3c340cd5936d1231fe5f4bfebf8bbb38089da4
example 1Hades-Mac:git-example hades$ cat 1.txt
```

验证一下：git-example 仓库，里面只有一个文件 1.txt

```
git-example hades$ tree
.
└── 1.txt

0 directories, 1 file


$ cat 1.txt
example 1
```

# 10 引用(Reference)

```
# current branch = master
$ git log
commit 6715eb5a57ee8c8884a3a4e3faa61dc0bfb17a68 (HEAD -> master, origin/master, origin/HEAD)
Merge: 4964803 77b43e2
Author: user <user@email.com>
Date:   Wed Nov 21 17:51:31 2018 +0800

    Merge branch 'B1'

commit 4964803a076b871276a3f38bbb129566d23c6421
Merge: f99ac88 fd85dac
Author: user <user@email.com>
Date:   Wed Nov 21 17:45:40 2018 +0800

    Merge pull request #1 from uesr/A1

    add A1.txt
```

```
# current branch = master
$ git add B.txt
$ git commit -m "add B.txt"
$ git log
commit 3ef2d17f6a0aa95d1e02f018dac06af8074bfacb (HEAD -> master)
Author: user <user@email.com>
Date:   Thu Oct 24 20:21:38 2019 +0800

    add B.txt

commit 6715eb5a57ee8c8884a3a4e3faa61dc0bfb17a68 (origin/master, origin/HEAD)
Merge: 4964803 77b43e2
Author: user <user@email.com>
Date:   Wed Nov 21 17:51:31 2018 +0800

    Merge branch 'B1'
```

```
$ git push origin master
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (2/2), 229 bytes | 229.00 KiB/s, done.
Total 2 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/user/pro.git
   6715eb5..3ef2d17  master -> master


$ git log
commit 3ef2d17f6a0aa95d1e02f018dac06af8074bfacb (HEAD -> master, origin/master, origin/HEAD)
Author: user <user@email.com>
Date:   Thu Oct 24 20:21:38 2019 +0800

    add B.txt

commit 6715eb5a57ee8c8884a3a4e3faa61dc0bfb17a68
Merge: 4964803 77b43e2
Author: user <user@email.com>
Date:   Wed Nov 21 17:51:31 2018 +0800

    Merge branch 'B1'

commit 4964803a076b871276a3f38bbb129566d23c6421
Merge: f99ac88 fd85dac
Author: user <user@email.com>
Date:   Wed Nov 21 17:45:40 2018 +0800

    Merge pull request #1 from user/A1

    add A1.txt
```

![Git_head_master_origin](https://yingvickycao.github.io/img/tools/git/git_head_master_origin.jpg)

```
# current branch = A1
$ git push origin A1
Everything up-to-date

$ git log
commit 69cb81a20816242902c5efe5cbe91b947d1d9991 (HEAD -> A1, origin/A1)
Author: Vicky <ying.vicky.cao@outlook.com>
Date:   Tue Oct 22 08:39:49 2019 +0800

    add A2

commit b3ae19eec8364d95c72f996e1f0d3ffc97366727
Author: Vicky <ying.vicky.cao@outlook.com>
Date:   Tue Oct 22 08:36:46 2019 +0800

    A1:A10
```

- Git 的引用的机制：使用固定的字符串作为引用，指向某个 commit，作为操作 commit 时的快捷方式。  
  每一个 commit 都有一个它唯一的指定方式,即它的 SHA-1 校验和.  
  两个 SHA-1 值的重复概率极低，故可用该 SHA-1 值来指代 commit。  
  `69cb81a = 69cb81a20816242902c5efe5cbe91b947d1d9991 = HEAD@{1} = HEAD@{4}`
- git 中引用有 2 种：HEAD，branch(分支)  
  引用的本质：字符串。  
  引用是 commit 的快捷方式.  
  这个字符串可以是一个 commit 的 SHA-1 码,e.g. `69cb81a20816242902c5efe5cbe91b947d1d9991`,也可以是一个 branch, e.g. `ref: refs/heads/feature1`
- Git 中的 HEAD 和每一个 branch 以及其他的引用，是以文本文件的形式存储在本地仓库 .git 目录中，而 Git 在工作的时候，就是通过这些文本文件的内容来判断这些「引用」是指向谁。  
  `git reflog`

```
$ git reflog
3ef2d17 (HEAD -> master, origin/master, origin/HEAD) HEAD@{0}: checkout: moving from A1 to master
69cb81a (origin/A1, A1) HEAD@{1}: checkout: moving from master to A1
3ef2d17 (HEAD -> master, origin/master, origin/HEAD) HEAD@{2}: commit: add B.txt
6715eb5 HEAD@{3}: checkout: moving from A1 to master
69cb81a (origin/A1, A1) HEAD@{4}: checkout: moving from master to A1
6715eb5 HEAD@{5}: checkout: moving from A3 to master
8085bb9 (origin/A3, A3) HEAD@{6}: pull: Merge made by the 'recursive' strategy.
c9a04f6 HEAD@{7}: commit: delete A3_1
41788e5 HEAD@{8}: reset: moving to 41788e5
1a60966 HEAD@{9}: pull: Fast-forward
41788e5 HEAD@{10}: reset: moving to 41788e5
1a60966 HEAD@{11}: commit: Create A3_3.txt
```

- (HEAD -> master, origin/master, origin/HEAD):几个指向这个 commit 的引用

# 11 HEAD

- HEAD：当前 commit 的引用。因此，用 HEAD 来操作当前 commit
HEAD 是 commit history 图，HEAD 是一个指针，它指向正在工作的 branch，指向最新一次 commit 的引用
- 当前 commit：当前工作目录所对应的 commit。
- 当使用 checkout、reset 等指令手动指定改变当前 commit 的时候，HEAD 也会一起跟过去。  

```
$ git log --oneline
1c9cc64 (HEAD -> master, origin/master, origin/HEAD) Create git_work_flow.png
3d537ac Create git_win7_supoort_paste.png
...
```

```
$ cat HEAD
ref: refs/heads/main

$ git branch
  branch_1
* main
```

- 切换 branch 后，HEAD 指向也会改变。

```
s$ git log
commit 8ea04c3b431787adb3f8b8f34b286a95cba9f122 (HEAD -> main)
Author: your_name <your_email@domain.com>
Date:   Mon Dec 26 22:52:29 2022 +0800

    add 1.txt

$ git checkout -b fix_me main
Switched to a new branch 'fix_me'

$ git log
commit 8ea04c3b431787adb3f8b8f34b286a95cba9f122 (HEAD -> fix_me, main)
Author: your_name <your_email@domain.com>
Date:   Mon Dec 26 22:52:29 2022 +0800

    add 1.txt

$ git branch
  add_hi
  branch_1
* fix_me
  main

// 当切换了branch，HEAD也跟着改变，那么HEAD文件的内容也改变了
$ cat .git/HEAD
ref: refs/heads/fix_me
```

- HEAD 指向一个 commit/branch/tag。
  不管 HEAD 处于游离头指针状态，或指向一个分支、tag，HEAD 总是指向一个 commit。

```
// HEAD指向fix_me branch
$ cat .git/refs/heads/fix_me
8ea04c3b431787adb3f8b8f34b286a95cba9f122

$ git cat-file -t 8ea04c3b431787adb3f8b8f34b286a95cba9f122
commit
```

```
// HEAD处于游离头指针状态
$ git checkout 8ea04c3b431787adb3f8b8f34b286a95cba9f122

$ cat .git/HEAD
8ea04c3b431787adb3f8b8f34b286a95cba9f122

$ git status
HEAD detached at 8ea04c3

$ git branch
* (HEAD detached from 8ea04c3)
  branch_1
  main
```

# 11 branch

- HEAD 除了可以指向 commit，还可以指向一个 branch。  
  当它指向某个 branch 的时候，会通过这个 branch 来间接地指向某个 commit；  
  当 HEAD 在提交时自动向前移动的时候，它会像一个拖钩一样带着它所指向的 branch 一起移动。

![git_head_master](https://yingvickycao.github.io/img/tools/git/git_head_master.png)

```
git commit

```

![git_head_master_update](https://yingvickycao.github.io/img/tools/git/git_head_master_update.png)

## 理解 branch?

### 理解 1：branch 是一个指向 commit 的引用

### 理解 2：branch 是从初始 commit 到 branch 所指向的 commit 之间的所有 commits 的一个串，即所有路径。

![git_branch_ref_one_commit](https://yingvickycao.github.io/img/tools/git/git_branch_ref_one_commit.png)

- 所有的 branch 之间都是平等的。

```
1. `branch1` 是 `1` `2` `5` `6` 的串，而不要理解为 `2` `5` `6` 或者 `5` `6` 。
2. 起点在哪里并不是最重要的，重要的是所有 `branch` 之间是平等的，
3. `master` 并不比其他 `branch` 高级。
```

![git_branch_is_equal_1](https://yingvickycao.github.io/img/tools/git/git_branch_is_equal_1.png)

![git_branch_is_equal_2](https://yingvickycao.github.io/img/tools/git/git_branch_is_equal_2.png)

- branch 包含了从初始 commit 到它的所有路径，而不是一条路径。并且，这些路径之间也是彼此平等的。

```
1. `master` 在合并了 `branch1` 之后，从初始 `commit` 到 `master` 有了两条路径。这时，`master` 的串就包含了 `1` `2` `3` `4` `7` 和 `1` `2` `5` `6` `7` 这两条路径。
2. 这两条路径是平等的，`1` `2` `3` `4` `7` 这条路径并不会因为它是「原生路径」而拥有任何的特别之处。
```

![git_branch_is_equal_3](https://yingvickycao.github.io/img/tools/git/git_branch_is_equal_3.png)

## branch 的创建

```
git branch feature1
```

![git_branch_create]https://yingvickycao.github.io/img/tool/git/git_branch_create.png）

## branch 的切换

- 新建的 branch 并不会自动切换，HEAD 在这时依然是指向 master 的。  
  用 checkout 来主动切换到新 branch,然后 HEAD 就会指向新建的 branch:

```
# git checkout -b 名称  =  创建 + 切换branch
git checkout feature1
```

![git_branch_checkout](https://yingvickycao.github.io/img/tools/git/git_branch_checkout.png)

- 在切换到新的 branch 后，再次 commit 时 HEAD 就会带着新的 branch 移动了：

```
git commit
```

![git_head_updated_after_commit](https://yingvickycao.github.io/img/tools/git/git_head_updated_after_commit.png)

- 再切换到 master 去 commit，出现分叉。

```
git checkout master
...
git commit
```

![git_head_updated_4_commit_after_checkout](https://yingvickycao.github.io/img/tools/git/git_head_updated_4_commit_after_checkout.png)



# 12 master

master is git default branch, main branch.

- 新创建的 repository 是没有任何 commit 的。但在它创建第一个 commit 时，会把 master 指向它，并把 HEAD 指向 master。  
  ![git_head_after_master_first_commit](/img/git_head_after_master_first_commit.png)
- git clone 时，除了从远程仓库把.git 这个仓库目录下载到工作目录中，还会 checkout master.  
  checkout?  
  把某个 commit 作为当前 commit，把 HEAD 移动过去，并把工作目录的文件内容替换成这个 commit 所对应的内容）。  
  ![git_head_when_clone_and_checkout.png](https://yingvickycao.github.io/img/tools/git/git_head_when_clone_and_checkout.png)

# 13 将 Git 仓库备份到本地

## 传输协议

哑协议与智能协议的区别？  
（1）传输进度：智能协议可见，而哑协议不可见。  
（2）传输速度：智能协议比哑协议快。因为智能协议传输时会压缩。  

![git_transport_protocol](https://yingvickycao.github.io/img/tools/git/git_transport_protocol.webp)

## 备份方式？

(1)多处备份  
(2)clone 后，git push / git fetch 同步代码  

git push vs git fetch ?

```
git push:
local ← remote

git fetch:
firt, local → remote
then, local ← remote
```

![git_backup](https://yingvickycao.github.io/img/tools/git/git_backup.webp)


# 14 Git 代码托管平台

- GitHub
- Bitbucket: 免费支持 5 个开发成员的团队创建无限私有代码托管库
- Gitlab https://about.gitlab.com/
- Gitee https://gitee.com/
- Gitorious http://gitorious.org/
  http://repo.or.cz/

# 15 使用 git 与他人合作

- 建立共享仓库:Git 服务器
- 代码托管平台



# 16 GitFlow

| Branch Type        | Branch Name         | DESC                                                                                        |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------- |
| Development branch | master/develop/main |                                                                                             |
| Production branch  | tag/                | After done release, create tag branch based on release branch.                              |
| Feature branch     | feature/            | Tech/feature/improvement. PR this -> develop                                                |
| Release branch     | release/            | Release task or long-term maintenance versions.                                             |
| Bugfix branch      | bugfix/             | To fix current release branch. PR this -> release + develop                                 |
| Hotfix branch      | hotfix/             | To quickly fix a Production branch. PR this -> older release + new release + develop branch |

- trunk  
  开发.  
  e.g. develop, feature/XXXX, bugfix/XXXX,

- Branches  
  发布的稳定版本. e.g. release/2.0.1  
  masters 是一个特殊的 branch

- tags    
   只可读，不可写.    
   release  
