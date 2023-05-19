# git 基础知识

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

# 2 .git 目录

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

# 3 HEAD : 正在工作哪个分支

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

# 4 config : local 的配置文件

# 5 refs

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

# 6 objects

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

# 7 commit、tree 和 blob 三个对象之间的关系

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

# 8 将 Git 仓库备份到本地

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
