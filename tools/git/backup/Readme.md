# Git

- 分布式的版本控制工具
- Linux 内核的代码用 Git 管理的

# 背景

- 版本管理系统（VCS）

VCS 出现之前，用文件夹管理 -> 集中式 VCS,例如 SVN -> 分布式 VCS，例如 Git，Mercurial

集中式 VCS：（CVCS，全称 Centralizes VCS）  
客户端没有完整的版本历史。

分布式 VCS （DVCS，全称 Distributed Version Control System）
客户端有完整的版本历史。

- Git 的优点  
  Git  
  支持离线操作。  
  很容易做备份。  
  最有大存储能力。

- 支持 Git 的平台  
  GitHub / GitLab  
  GitLab：公司用来做代码平台二次开发

# 1 查看 git version

```
$ git --version
git version 2.38.1
```

# 1 初始化 Respository

```
$ git init
```

# 2 Mofdify Remote Repo Address

- 直接修改 config 文件
- git 修改远程仓库地址

```
$ git remote origin set-url [新地址]

$ git remote rm origin

```

```
#  git remote add origin [url]

// Use SSH
$ git remote add origin git@github.com:YingVickyCao/TestAndroidAppBundle.git

// Use HTTPS
$ git remote add origin https://github.com/YingVickyCao/TestAndroidAppBundle.git
```

## Push the local repository to GitHub?

```
…or create a new repository on the command line
echo "# GitTest" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/YingVickyCao/GitTest.git
git push -u origin master

…or push an existing repository from the command line
git remote add origin https://github.com/YingVickyCao/GitTest.git
git push -u origin master
```

# 3 Config priority (override) from highest to lowest

## Repo level 工作目录配置

- 当前仓库级别
- `respo/.git/config`

```
$ git config -e
$ git config --local --list
$ git config user.name
```

## User level

- （当前）用户级别
- `~/.gitconfig`

```
$ git config --global --list
$ git config --global user.name
```

## System level TBD

- 系统级别
- `/etc/gitconfig`
- admin 只做一次

```
git config --system --list
```

# 4 Check where git install

```
$ which git
/usr/local/bin/git

$ type git
$ command -v git
$ whereis git
```

# 5 Merge conflict

## 形式 1：文件冲突

原因：修改同一文件的同一区域  
解决：文件合并

### Use merge tool to fix merge conflict

`git mergetool <conflict_file>`

#### vim

跟 Beyond Compare 界面几乎一样。不同的是 vim 使用的是命令行

- Local - Local
- Base - 共同修改
- Remote - Remote。
- 通过箭头，或者手动修改来解决冲突。
- 同时，生成临时文件 s。解决冲突后，关闭文件，临时文件 s 自动删除

![git_fix_merge_conflict_use_vim.JPG](/img/git_fix_merge_conflict_use_vim.png)

#### Beyond Compare

![git_fix_merge_conflict_use_beyond_compare_1](/img/git_fix_merge_conflict_use_beyond_compare_1.png)  
![git_fix_merge_conflict_use_beyond_compare_2](/img/git_fix_merge_conflict_use_beyond_compare_2.png)  
![git_fix_merge_conflict_use_beyond_compare_3](/img/git_fix_merge_conflict_use_beyond_compare_3.png)

- Beyond Compare 的比较设计理念来源于 vim

### Mannual fix conflict

## 形式 2：树冲突

原因：同时对一个文件进行了重命名  
解决：树合并

Solution 1: 使用 mergetool 修复冲突  
Solution 2: 使用 git rm 删除想删除的文件

# 6 Git difftool Tools

Mac OS:Beyond Compare,vimdiff  
Win7: Beyond Compare, winmerge

## 默认比较工具

```
git diff <–cached> <file_name / None>

# 工作目录 VS 本地库HEAD
$ git diff <file_name / None>

# 暂存区 VS 本地库HEAD
$ git diff –cached <file_name / None>
```

## 第三方比较工具

```
# 查看系统支持哪些 Git Diff 工具
$ git difftool --tool-help


# 使用第三方工具对比
$ git difftool
```

# 7 Git 代码托管平台

- GitHub
- Bitbucket: 免费支持 5 个开发成员的团队创建无限私有代码托管库
- Gitlab https://about.gitlab.com/
- coding.net https://coding.net/home.html
- Gitee https://gitee.com/
- Gitorious http://gitorious.org/
  http://repo.or.cz/

# 8 使用 git 与他人合作

- 建立共享仓库:Git 服务器
- 代码托管平台

# 9 内部工作机制

![git_work_flow.png](https://yingvickycao.github.io/img/tools/git/git_work_flow.png)

- `.git`
- `.git 是裸仓库`
- 远程仓库通常只是一个裸仓库（bare repository），仓库里存放的仅仅是 Git 的数据 (TBD)

## Work flow

### Part 1 :Directory

目录

### Part 2: WorkSpace / working directory

- 工作空间，持有实际文件
- Modified

### Part 3: Index/Stage

- 缓存区，临时保存改动
- Staged / Tracked

### Part 4 : Local resposory

- 本地仓库，一个存放在本地的版本库,HEAD 指向当前的开发分支
- Commited

#### HEAD

HEAD 是 commit history 图，HEAD 是一个指针，它指向正在工作的 branch，指向最新一次 commit 的引用

```
$ git log --oneline
1c9cc64 (HEAD -> master, origin/master, origin/HEAD) Create git_work_flow.png
3d537ac Create git_win7_supoort_paste.png
...
```

### Part 5 : Stash

- 工作状态保存栈，用于保存/恢复 WorkSpace 中的临时状态

## 分布式

- local 和 remote branch 是并行、独立
- Clone 代码后，在每个分支上所做操作有独立的记录，不会相互干涉

# Git vs SVN

- Git
  ![git_repo.png](https://yingvickycao.github.io/img/tools/git/git_repo.png)

- SVN  
  ![svm_repo.png](https://yingvickycao.github.io/img/tools/git/svm_repo.png)

# 10 Git Advantage

- 分布式模式  
   Git 跟 SVN 一样有自己的集中式版本库或服务器。但 Git 更倾向于被使用于分布式模式——即每个开发人员从中心版本库的服务器上 chect out 代码后会在自己的机器上克隆一个版本库，它拥有中心版本库上所有的东西，例如标签、分支、版本记录等
- 离线工作, 速度快  
   大部分操作在本地,最终提交远程
- 原子提交  
  每次提交都会对所有代码创建一个唯一的 commit id,而不是每个文件有一个 commit id.  
  全部成功提交或合并，或不变
- 切换 branch 没有多余的目录
- 内容完整性  
   内容存储使用的是 SHA-1 哈希算法——确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏

# 11 Git about branch

- trunk  
  开发.  
  e.g. develop, feature/XXXX, bugfix/XXXX,

- Branches  
  发布的稳定版本. e.g. release/2.0.1  
  masters 是一个特殊的 branch

- tags  
   只可读，不可写.  
   release

# 12 Help

以 commit 为例

```
$ git commit --h

$ git commit --help

$ git help commit

// man是系统的帮助命令。有时候会失效，取决于git所以来的系统内核是否按照该帮助命令
$ man git commit
```

形式
git commit --h
command 格式
git commti --help
=
git help commit
HTML 格式
man git commit
man 是系统的帮助命令。
有时候会失效，取决于 git 所以来的系统内核是否按照该帮助命令

# 13 `git init` 创立本地仓库

对大多数项目来说，git init 只需要在创建中央仓库时执行一次。开发者通常不会使用 git init 来创建本地仓库，往往使用 git clone 拷贝已存在的仓库到他们的机器中

- 本地

```
$ cd dest_path
$ git init
```

- 服务器

```
// 1 用SSH连入存放中央仓库的服务器。
$ ssh <user>@<host>

// 2 存放项目的地方
$ cd dest_path

// 3. 用—bare标记来创建一个中央存储仓库。开发者会将my-project.git 克隆到本地的开发环境中
$ git init --bare my-project.git
```

# 14 `git branch --set-upstream` 建立追踪关系

- git clone 后自动建立 local 和 remote branch 的 一种追踪关系(tracking) ，即 master 分支自动 ”追踪” origin/master 分支。
- Git 允许手动建立追踪关系

```
// 手动建立追踪关系: master 分支追踪 origin/dev 分支
$ git branch --set-upstream master origin/dev
```

# 15 `git clone`

## `git clone url [local dir ]`

- 从远程主机克隆一个版本库到本机
- 不指定本地目录时，默认=远程主机的版本库名
- 默认在本地建立 master 分支
- 克隆版本库时，远程主机自动被命名为 origin

```
$ git remote
origin
```

```
$ git remote -v
origin	https://github.com/YingVickyCao/YingVickyCao.github.io.git (fetch)
origin	https://github.com/YingVickyCao/YingVickyCao.github.io.git (push)
```

`repo/.git/config`

```
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[submodule]
	active = .
[remote "origin"]
	url = https://github.com/YingVickyCao/GitTest.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
[branch "dev2"]
	remote = origin
	merge = refs/heads/dev2
```

### git clone 做了什么？

- master:本地分支
- origin/master 远程分支(远程仓库名/分支名)  
  origin = 远程仓库名  
  origin/master = remotes/origin/master 指向

验证

```
$ git remote -v
origin	https://github.com/YingVickyCao/YingVickyCao.github.io.git (fetch)
origin	https://github.com/YingVickyCao/YingVickyCao.github.io.git (push)
```

```
$ git branch -vv
* master b7140de [origin/master] Git about branch
```

```
// remote master vs remote master
$ git difftool origin/master remotes/origin/master

// remote master vs remote A1
$ git difftool origin/master remotes/origin/A1
```

```
$ git push origin A1
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 258 bytes | 258.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/YingVickyCao/GitTest.git
   fd85dac..a6dd3d5  A1 -> A1
```

### git clone 支持多种协议

- HTTP  
  `git clone http://example.com/path/to/repo.git`
- HTTPs （Common）  
  `git clone https://example.com/path/to/repo.git`

- SSH （Common）  
  `git clone ssh://example.com/path/to/repo.git`  
  `git clone user@example.com:path/to/repo.git`

- git  
  Git 协议下载速度最快

```
$ git clone git://example.com/path/to/repo.git/
```

```
// https://github.com/YingVickyCao/GitTest
git clone git@github.com:YingVickyCao/GitTest.git
```

- 本地协议（Local protocol）

```
git clone /opt/git/project.git
git clone file:///opt/git/project.git
```

- ftp  
  `git clone ftp[s]://example.com/path/to/repo.git/`

- rsync（Depressed)
  `git clone rsync://example.com/path/to/repo.git/`

## `git clone -o`

用 git clone 的-o 选项指定其他的主机名

```
$ git clone https://github.com/jquery/jquery.git

$ git remote
origin
```

```
$ git clone -o jQuery https://github.com/jquery/jquery.git

$ git remote
jQuery
```

# 17 git branch

## Check branch info

```
$ git branch            // List local branches
$ git branch -r         // List remote branches
$ git branch -vv
```

```
$ git branch -a
* master    // current local branch
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```

## Create and swith branch

- create local branch dev3, base on current local branch

```
$ git branch dev3   // create local branch dev3, base on  current  local branch

```

- switch to local branch

```
// switch to local branch dev8.
// Both local and remote not have dev8, error
$ git checkout dev8
error: pathspec 'dev8' did not match any file(s) known to git.
```

- Create one local branch based on current local branch, and auto switch to this local branch

```
// Create local branch, and auto switch to the branch
// local dev8 based on current dev7
$ git checkout -b dev8
```

- Check one local branch based on remote branch, and auto swith to this local branch
  使用 checkout 命令来把远程分支取到本地，并自动建立 tracking

```
// remote has dev5
$ git pull
// 创建与远程同名的本地分支，并切换到新分支. If already exist local branch, error:
$ git checkout dev5
==
$ git checkout -b dev5 origin/dev5
```

e.g.

```
$ git pull
From https://github.com/YingVickyCao/GitTest
 * [new branch]      dev5       -> origin/dev5
Already up to date.

$ git checkout dev5
Branch 'dev5' set up to track remote branch 'dev5' from 'origin'.
Switched to a new branch 'dev5'

$ git branch -vv
  dev4   fce4ce9 [origin/dev4] modify 1
* dev5   fce4ce9 [origin/dev5] modify 1
  master fce4ce9 [origin/master] modify 1
```

- 使用 checkout 命令来把远程分支取到本地，并自动建立 tracking

```
git checkout -t origin/dev  // 使用-t 参数，它默认在本地建立一个和远程分支名字一样的分支
```

## Delete branch

```
git branch -d <branch_name>  // 删除分支
git branch -D <branch_name>  // 强制删除分支
```

## Rename branch

- Rename local branch

```
# m:modify， git branch -a
# local A3 <-> origin/A3 => local A3_2 <-> origin/A3
$ git branch -m A3 A3_2
```

- Rename remote branch  
  在 git 中重命名远程分支, 就是先删除远程分支，然后重命名本地分支，再重新提交一个远程分支.

  推荐：修改远程 branch 名称，然后 checkout

```
# rename remote dev  -> develop
$git push --delete origin dev  // 删除远程分支：
$git branch -m dev develop     // 重命名本地分支：
$git push origin develop       // 推送本地分支：
```

## 18 Delete file

- rm file : 仅仅删除文件
- git rm file:删除文件，and Staged

## 19 Remote

- 查看远程仓库的别名

```
$ git remote
origin
```

- 查看远程仓库每个别名的实际链接地址

```
$ git remote -v
origin	https://github.com/YingVickyCao/GitTest.git (fetch)
origin	https://github.com/YingVickyCao/GitTest.git (push)
```

- 删除本地仓库与远程仓库的关联  
  `git remote remove origin dev`

- 查看该主机的详细信息

```
$ git remote show origin
* remote origin
  Fetch URL: https://github.com/YingVickyCao/GitTest.git
  Push  URL: https://github.com/YingVickyCao/GitTest.git
  HEAD branch: master
  Remote branches:
    A1     tracked
    A2     tracked
    B1     tracked
    master tracked
  Local branches configured for 'git pull':
    A1     merges with remote A1
    master merges with remote master
  Local refs configured for 'git push':
    A1     pushes to A1     (up to date)
    master pushes to master (up to date)

```

- 添加远程主机  
  `git remote add <主机名> <网址>`  
   e.g.

```
git remote add origin XXX.git    // 将本地仓库关联到远程仓库
git pull -u origin master        // 关联本地仓库和远程仓库后：将本地仓库 master 第一次推送到远程分支
```

- 删除远程主机  
  `git remote rm <主机名>`

- 修改远程主机名  
  `git remote rename <原主机名> <新主机名>`

# 20 Clear screen

```
clear
```

# 21 Log

```
$ git log --help

# Can not view deleted commit records
$ git log

# git log -[length]  :显示指定条数的日志
$ git log -2

# 每行输出一条日志的少量信息
$ git log --oneline

# git log --oneline -[length] : 显示指定条数的日志
$ git log --oneline -2
```

```
# git log -- [file_name]  : view commit record
$ git log -- A.txt                     # file
$ git log -- doc/New_tech.txt          # file
$ git log -- doc                       # doc is dir
```

```
# git log -p [file_name]  : view all diff commit
$ git log -p A.txt

# git log -p -1 [file_name] : view commit diff only of the lastest one
$ git log -p -1 A.txt                     # file
$ git log -p -1 doc/New_tech.txt          # file
$ git log -p -1 doc                       # doc is dir
```

```
# 搜索

# git log --grep [Key_Words] 按关键字 搜索
$ git log --grep 1

# git log --author [author]  按作者 搜索
$ git log --author Vicky
author Vicky <ying.vicky.cao@outlook.com> 1540964377 +0800
```

```
$ git log --pretty=raw           # 显示每次提交的更多信息
```

- `git reflog`  
  查看所有分支的所有操作记录, 包括 commit 和 reset 的操作，已被删除的 commit 记录

```
$ git reflog
a2f5b90  (HEAD -> dev4, origin/dev4) HEAD@{0}: pull: Fast-forward
396b782  HEAD@{1}: commit: Test git push in dev4
fce4ce9   (origin/master, origin/dev1, origin/HEAD, master, dev6, dev5, dev1) HEAD@{2}:
               checkout: moving from dev3 to dev4
a5d047e  (dev3) HEAD@{3}: commit: Test git push in dev3
```

- `git show [commit_id][file_name]`  
  查看某次 commit id 提交时该文件的变化

```
$ git reflog
3d2bd73 (HEAD -> master) HEAD@{0}: commit: temp abc
5f22be6 (origin/master, origin/HEAD) HEAD@{1}: commit: temp 123
eec41f1 HEAD@{2}: commit: git pushl
200a987 HEAD@{3}: commit: git pull

$ git show 3d2bd73 temp.txt
commit 3d2bd7346534b3e0d6e0695508cce98aa021ba09 (HEAD -> master)
Author: Vicky <ying.vicky.cao@outlook.com>
Date:   Fri Oct 18 07:50:57 2019 +0800

    temp abc

diff --git a/temp.txt b/temp.txt
index d800886..48b83b8 100644
--- a/temp.txt
+++ b/temp.txt
@@ -1 +1 @@
-123
\ No newline at end of file
+ABC
\ No newline at end of file

```

# 22 Check local files status

```
$ git status
```

Recording Changes to the Repository

- https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository

Figure 8. The lifecycle of the status of your files.  
 ![lifecycle.png](https://git-scm.com/book/en/v2/images/lifecycle.png)

# 23 Git Pull

```
git pull <remote host name> <src>:<dst>

# src = remote branch name
# dst = local branch name

# 取回远程主机分支的更新，再与本地分支合并
# 1. src 不存在，报错。
# 2. dst 不存在，自动创建对应的 remote branch
# 3. src = dst, 冒号后面的部分可以省略
# 4. git pull = git fetch + git merge
```

## Usages

- `git pull origin dev` (Most Used)

```
$ git pull origin dev:dev     # remote dev  =>  local dev
$ git pull origin dev         # remote dev  =>  local dev

===

git fetch origin dev
git merge origin/dev

```

- `git pull origin dev2:dev`

```
$ git pull origin dev2:dev    # remote dev2  => local dev
```

- `git pull`  
  取回远程主机所有分支更新，并自动与本地对应 tracked 分支 merge

```
# remote 更新了dev4 和 dev6。current branch = dev4

$ git pull

remote: Enumerating objects: 10, done.
remote: Counting objects: 100% (10/10), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 6 (delta 2), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (6/6), done.
From https://github.com/YingVickyCao/GitTest
   396b782..a2f5b90  dev4       -> origin/dev4
   e7bd634..6b387f8  dev6       -> origin/dev6
Updating 396b782..a2f5b90
Fast-forward
 1.txt | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)
```

- `git pull origin`
  取回远程主机 origin 所有分支更新，并自动与本地对应 tracked 分支 merge

```
remote 更新了dev5 和 dev6。current branch = dev4

$ git pull origin
remote: Enumerating objects: 10, done.
remote: Counting objects: 100% (10/10), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 6 (delta 2), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (6/6), done.
From https://github.com/YingVickyCao/GitTest
   dcc6b03..e5126db  dev5       -> origin/dev5
   6b387f8..218109d  dev6       -> origin/dev6
Already up to date.
```

# 24 Git Push

```
git push <remote host name> <src>:<dst>

# src = local branch name
# dst = remote branch name

# 将本地分支的更新，推送到远程主机
# 1. 当dest 远程分支不存在时，在自动创建对应本地分支的远程分支
```

## Usages

```
$ git push origin dev3           # local dev3 => remote dev3,remote dev3 没有时，自动创建
$ git push origin dev3:dev3      # local dev3 => remote dev3,remote dev3 没有时，自动创建
```

```
$ git push origin dev3:dev2      # local dev3 => remote dev2
```

```
$ git push origin                # 将当前分支推送到origin主机的对应分支
```

```
$ git push origin :dev4          # 空 => remote dev4. Delete remote dev4
```

```
$ git push origin --delete dev4  # Delete remote dev4
```

```
# 如果当前分支与多个主机存在追踪关系，则使用-u选项指定一个默认主机
# 将local dev推送到origin主机 remote dev，同时指定origin为默认主机。
# 后面不加任何参数使用git push
$ git push -u origin dev

# 已指定默认主机，即使A(current) 和 B 有修改，仅仅 local A => remote A
$ git push
```

```
# 将所有本地分支都推送到origin主机
$ git push --all origin
```

```
# git push不会推送标签(tag)，除非使用–tags选项
# git push origin --tags
```

# 26 Diff Files

- Local vs remote

```
# Local master vs remote A3
# diff / difftool, origin/A3 = remotes/orign/A3
git diff master origin/A3
```

- WorkSpace vs Stage

```
git diff
/
git difftool
```

把更新 add 到 Stage 中，diff 就不会有任何输出了

- WorkSpace vs INDEX

```
git diff HEAD
/
 git difftool HEAD
```

- 查看某两个版本之间的差异

```
git diff ffd98b291e0caa6c33575c1ef465eae661ce40c9 b8e7b00c02b95b320f14b625663fdecf2d63e74c
```

- 查看某两个版本的某个文件之间的差异

```
git diff ffd98b291e0caa6c33575c1ef465eae661ce40c9:filename b8e7b00c02b95b320f14b625663fdecf2d63e74c:filename
```

# 27 Compare Files

# 28 Git add

Add files to Index or Stage
添加至暂存区

```
# Add all files to Index
$ git add .
$ git add -A
$ git add *


$ git add 1.txt
$ git add 1.txt 2.txt
```

# 29 Git commit

- commit changes from Index to HEAD

```
# commit changes from Index to HEAD
$ git commit -m "comment"
```

- git add + git commit

```
# git add  + git commit.
# tracked files: Work dir -> Index -> Head
# 新增文件不能使用——Git 还没有使用 git add  来 track it
$ git commit -a -m "commit"
```

- Modify lastest commit  
  `git commit --amend -m "A3_4.txt"`

```
$ git log
commit 5a6c1e667e2a6b684a1514435d1c2f21eca2d55b (HEAD -> A3)
Author: Vicky <ying.vicky.cao@outlook.com>
Date:   Mon Oct 28 12:57:16 2019 +0800

    A3_4

commit 8085bb9dab9ec114cfa4850bea522ab3e5c9d773 (origin/A3)
Merge: c9a04f6 1a60966
Author: Vicky <ying.vicky.cao@outlook.com>
Date:   Tue Oct 22 09:05:44 2019 +0800

    Merge branch 'A3' of https://github.com/YingVickyCao/GitTest into A3



$ git commit --amend -m "A3_4.txt"
[A3 681c4fd] A3_4.txt
 Date: Mon Oct 28 12:57:16 2019 +0800
 1 file changed, 1 insertion(+)
 create mode 100644 A3_4.txt


$ git log
commit 681c4fd1eef7270ec98738b25e7a125e396f4aed (HEAD -> A3)
Author: Vicky <ying.vicky.cao@outlook.com>
Date:   Mon Oct 28 12:57:16 2019 +0800

    A3_4.txt

commit 8085bb9dab9ec114cfa4850bea522ab3e5c9d773 (origin/A3)
Merge: c9a04f6 1a60966
Author: Vicky <ying.vicky.cao@outlook.com>
Date:   Tue Oct 22 09:05:44 2019 +0800

    Merge branch 'A3' of https://github.com/YingVickyCao/GitTest into A3
```

- Git checkout by commit id

```
Step 1 :
git checkout commit_id
/
git checkout -b branch_1 commit_id (Tested)
Step 2 : In branch_1, modify file. Then branch_1 -> remote branch_1.
Step 3 : branch_1 -> master.  Fix merge conflict. push master -> remote master.
```

# 30 版本控制软件相互比较

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

# 31 Git fetch

- 取回所有 branch 更新

```
$ git fetch --all
```

- 将某远程主机更新，全部取回本地

```
# git fetch <远程主机名>
$ git fetch origin
```

- 取回远程主机的指定分支

```
# git fetch <远程主机名> <分支名>
# remote dev7 -> local dev7

$ git fetch origin dev7
```

# 32 git merge

```
# merge local dev3 -> current branch
$ git merge dev3

# merge local dev2 and  dev3 -> current branch
$ git merge dev2 dev3

# current branch is dev4
# merge remote dev5 -> local dev5  =>  dev4
git merge origin/dev5
```

# 33 撤销修改

## discard changes in working directory

撤销后，没有办法再找回修改

```
# 撤销单个文件修改
git checkout -- <file>

# 撤销文件夹内所有更改
git checkout -- folder/.
```

## unstage

把 State 更新移出到 WorkSpace

```
git reset HEAD <file>
```

## 撤销 commit TBD

# 34 Stashing

cache 工作目录的中间状态(修改过的被追踪的文件和暂存的变更, modified, but not commited) before switching to other branch.  
在未 add 之前才能执行 stash.

- `$ git stash`

```
$ git stash
Saved working directory and index state WIP on master: 3ef2d17 add B.txt
```

- `git stash list`

```
$ git stash list
stash@{0}: WIP on master: 3ef2d17 add B.txt
```

- `git stash show`

```
$ git stash show
 A1.txt | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)
```

- `git stash pop`  
  只能恢复一次

```
$ git stash pop                    // Popup stash@{0}, index = 0
$ git stash pop stash@{index}      // Popup index
```

- `git stash drop`

```
$ git stash drop                    // Delete stash@{0}, index = 0
$ git stash drop stash@{index}      // Delete index
```

- `git stash clear` // Delete all

# 35 submodule

- Add Submodule  
  `git submodule add 仓库地址 路径`

- Clone Repo With Auto Clone Submodules  
  `git clone --recursive git://github.com/foo/bar.git`

- Update Submodule Code  
  `git submodule update --init --recursive`

- Delete Submodule  
  Step 1 : Remove from `.gitsubmodule`  
  Step 2 : Remove from `.git/config`  
  Step 3 : `git rm --cached submodule_path`  
  e.g.  
  img  
  git rm --cached img

- Update Submodule  
  Step 1 : Update from `.gitsubmodule`  
  Step 2 : Update from `.git/config`  
  Step 3 : `git submodule sync`

# 36 cherry-pick：recommited from branch A to B

- atlassian.com/git/tutorials/cherry-pick
- git-scm.com/docs/cherry-pick

options:

```
// 编辑提交信息 before applying the cherry-pick operation
-edit
-e

// 不自动commit
--no-commit

// 退出当前的cherry-pick序列
// e.g, 如果发生冲突，该命令把当前分支中未冲突的内容状态为modified
--quit

// 取消当前的cherry-pick序列，恢复当前分支
--abort


// 继续当前的cherry-pick序列
// e.g, 如果发生冲突，首先先解决冲突，通过git add 标记为已解决，然后使用该命令来继续cherry-pick
--continue

// 允许空提交
--allow-empty
```

## `git cherry-pick <commit_id A> <commit_id C>`

其中 A、C 2 个 commit id 被 added.

E.g., recommited from branch Feature to branch R1

```
// Feature -> R1
// current branch = R1; 1e28011 = f, in branch Feature
Step 1: $ git cherry-pick 1e28011
conflict (go 2), or success(go 3)

Step 2
2.1  fix conflict,then repeat Step 1
  $ git add/rm
  $ git cherry-pick --continue
  Then repeat Step 1

Step 3 : git commit
Step 4 : git push
```

```
a - b - c - d               R1
         \
           e - f - g        Feature
```

```
a - b - c - d - f           R1
     \
       e - f - g            Feature
```

## `git cherry-pick [commit_id_1...commit_id_100]`

e.g., copy commit e and f from branch Feature to branch R2

```
// Feature -> R2
// current branch = R2; e=5328c8b, 0c3f04c = f, in branch Feature
$ git cherry-pick 5328c8b^...0c3f04c
On branch r2
Your branch is up to date with 'origin/r2'.

Cherry-pick currently in progress.

nothing to commit, working tree clean
The previous cherry-pick is now empty, possibly due to conflict resolution.
If you wish to commit it anyway, use:

    git commit --allow-empty

and then use:

    git cherry-pick --continue

to resume cherry-picking the remaining commits.
If you wish to skip this commit, use:

    git cherry-pick --skip

$ git commit --allow-empty

// Feature -> R2, current branch = R2
$ git cherry-pick --continue
```

```
a - b - c - d               r2
         \
           e - f - g        feature
```

```
a - b - c - d - e- f        r2
     \
       e - f - g            feature
```

## `git cherry-pick (commit_id_1...commit_id_100]`

# Refs

- Gerrit Code Review https://www.gerritcodereview.com/
- https://git-scm.com/docs
- https://www.jianshu.com/p/a080c8649015
- Git Book https://git-scm.com/book/en/v2
- <https://git-scm.com/docs/git-submodule>
- <https://git-scm.com/docs/git-clone>
