# Git Commands

# 1 Check where git install

```
$ which git
/usr/local/bin/git

$ type git
$ command -v git
$ whereis git
```

# 2 查看 git version

`$ git --version`


# 3 创建仓库 git init

`$ git init` 创立本地仓库

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
$ git init --bare my-project.git      // --bare : 不带工作区
```

# 4 Help

以 commit 为例

```
$ git commit --h

$ git commit --help

$ git help commit

// man是系统的帮助命令。有时候会失效，取决于git所以来的系统内核是否按照该帮助命令
$ man git commit
```
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
```

# 5  git remote

```
查看远程仓库的别名
git remote

// 查看远程仓库每个别名的实际链接地址
$ git remote -v
origin	https://github.com/YingVickyCao/GitTest.git (fetch)
origin	https://github.com/YingVickyCao/GitTest.git (push)

// add remote repro address
git remote add origin <respository>

// 修改远程主机名  
git remote rename <原主机名> <新主机名>

// 删除本地仓库与远程仓库的关联  
$ git remote remove origin dev

// 删除远程主机 : git remote rm <主机名>
$ git remote rm origin
```

```
// Modify remote repo address
Way 1 : 直接修改 config 文件
Way 2 : 
$ git remote origin set-url [新地址]

```
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


# 6 git clone 
```
git clone <respository> [<folder name>]
git clone --bare <remote respository> <folder name>   //  --bare : 不带工作区
```

从远程主机克隆一个版本库到本机.  
不指定本地目录时，默认=远程主机的版本库名  
默认在本地建立 master/main 分支  
克隆版本库时，远程主机自动被命名为 origin

```
// repo/.git/config
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

- git clone 做了什么？
master:本地分支
origin/master 远程分支(远程仓库名/分支名)  
origin = 远程仓库名  
origin/master = remotes/origin/master 指向

```
$ git clone https://github.com/jquery/jquery.git

$ git remote
origin

$ git remote -v
origin	https://github.com/YingVickyCao/YingVickyCao.github.io.git (fetch)
origin	https://github.com/YingVickyCao/YingVickyCao.github.io.git (push)

// -o 选项指定其他的主机名
$ git clone -o jQuery https://github.com/jquery/jquery.git
$ git remote
jQuery
```

- git clone 支持多种协议
```
git clone http://example.com/path/to/repo.git     // HTTP 
git clone https://example.com/path/to/repo.git    // HTTPS
git clone ssh://example.com/path/to/repo.git      // SSH
git clone user@example.com:path/to/repo.git       // SSH
git clone git@github.com:YingVickyCao/GitTest.git // SSH
git clone git://example.com/path/to/repo.git     // Git 协议,下载速度最快
git clone /opt/git/project.git                    // 本地协议（Local protocol）
git clone file:///opt/git/project.git             // git clone file:///opt/git/project.git
git clone ftp[s]://example.com/path/to/repo.git    // ftp
git clone rsync://example.com/path/to/repo.git     // rsync（Depressed)
```

# 7 git pull
git pull = git fetch + git merge
```
git pull
/
git pull oriign <branch name>
```


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


- `git pull origin dev` (Most Used)

```
$ git pull origin dev         # remote dev  =>  local current branch
```


- `git pull origin dev2:dev`

```
$ git pull origin main:dev    # remote main  => local dev

$ git pull origin dev:dev     # remote dev  =>  local dev
==
git fetch origin dev
git merge origin/dev
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
# 8 git fetch
```
// 取回所有 branch 更新
$ git fetch --all

// git fetch <远程主机名> : 将某远程主机更新，全部取回本地
$ git fetch origin

# git fetch <远程主机名> <分支名> : 取回远程主机的指定分支
$ git fetch origin dev7         // remote dev7 -> local dev7
```

# 9 git merge
```
// merge origin main -> local main -> current branch
git merge origin/main
/
git merge 0c5fbad
/
git merge origin/main --allow-unrelated-histories    // 由 2 颗树合并一个颗树
```

```
# merge local dev3 -> current branch
$ git merge dev3

# merge local dev2 and  dev3 -> current branch
$ git merge dev2 dev3
```

## Merge conflict

### 形式 1：文件冲突

原因：修改同一文件的同一区域  
解决：文件合并  

Way 1 : Mannual fix conflict  


Way 2 : Use merge tool to fix merge conflict   
`git mergetool <conflict_file>`  
- vim    
  跟 Beyond Compare 界面几乎一样。不同的是 vim 使用的是命令行.    

  Local - Local  
  Base - 共同修改  
  Remote - Remote。  
  通过箭头，或者手动修改来解决冲突。  
  同时，生成临时文件 s。解决冲突后，关闭文件，临时文件 s 自动删除  

  ![git_fix_merge_conflict_use_vim.JPG](https://yingvickycao.github.io/img/tools/git/git_fix_merge_conflict_use_vim.png)  

- Beyond Compare  
Beyond Compare 的比较设计理念来源于 vim  
![git_fix_merge_conflict_use_beyond_compare_1](https://yingvickycao.github.io/img/tools/git/git_fix_merge_conflict_use_beyond_compare_1.png)  

![git_fix_merge_conflict_use_beyond_compare_2](https://yingvickycao.github.io/img/tools/git/git_fix_merge_conflict_use_beyond_compare_2.png) 

![git_fix_merge_conflict_use_beyond_compare_3](https://yingvickycao.github.io/img/tools/git/git_fix_merge_conflict_use_beyond_compare_3.png)

### 形式 2：树冲突 

原因：同时对一个文件进行了重命名    
解决：树合并

Solution 1: 使用 mergetool 修复冲突  
Solution 2: 使用 git rm 删除想删除的文件

# 10 git push
```
$ git push origin <remote branch>   // local current branch -> remote branch
```


```
git push <remote host name> <src>:<dst>

# src = local branch name
# dst = remote branch name
# 将本地分支的更新，推送到远程主机
# 当dest 远程分支不存在时，在自动创建对应本地分支的远程分支
```

```
# git push origin <remote branch>   // local current branch -> remote branch
$ git push origin dev3              // local current branch => remote dev3
```
```
$ git push origin dev3:dev3      # local dev3 => remote dev3
$ git push origin dev3:dev2      # local dev3 => remote dev2
$ git push origin                # 将当前分支推送到origin主机的对应分支
```

```
$ git push origin :dev4          # 空 => remote dev4. Delete remote dev4
$ git push origin --delete dev4  # Delete remote dev4
```

```
# 如果当前分支与多个主机存在追踪关系，则使用-u选项指定一个默认主机
# 将local dev推送到origin主机 remote dev，同时指定origin为默认主机。
# 后面不加任何参数使用git push
$ git push -u origin dev

# 已指定默认主机，即使A(current) 和 B 有修改，仅仅 local A => remote A
$ git push                    // local current branch -> remote branch
```

```
# 将所有本地分支都推送到origin主机
$ git push --all origin
$ git push origin --all
```

```
# git push不会推送标签(tag)，除非使用–tags选项
# git push origin --tags
```

# 11 rebase
```
git rebase -i 57afd7c
git rebase --continue
```

# 12 文件操作 - s查看文件状态
```
$ git status
```

## 工作区
```
// 清除工作区的改变
$ git restore 1.txt Readme.md
```

## 暂存区
- 添加到暂存区
```
$ git add 1.txt  
$ git add 1.txt  Readme.md  
$ git add .         // add all files
$ git add -A        // add all files
$ git add *         // add all files
$ git add -u        // -u : update.  add all changed files to staged
```

```
// 清除暂存区的改变
git restore --staged 1.txt Readme.md


// clear all changes from 工作目录 和暂存区
// 危险的操作
git reset --hard
```

## Index
- 清除已经提交的改变
```
// 危险的操作
git reset --hard <commit id>
```

# 13 文件操作 - 提交变更

- git commit -m : 从暂存区，提交

```
$ git commit -m "add 1.txt"             // commit changes from Index to HEAD

// git add  + git commit : 不经过暂存区，直接提交
$ git commit -am "add hi"
$ git commit -a -m "commit"   新增文件不能使用
```

- 不经过暂存区，直接提交

```
$ git commit -am "add hi"
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

# 14 文件操作 - Rename file : git mv

通过测试，发现 git add 能够直接识别到文件名的修改。

- 测试 1 ：笨办法，git add , git rm

```
$ mv readme.txt readme.md
$ git add readme.md
$ git rm readme.txt
```

- 测试 2 ：笨办法。git add 能够直接识别到文件名的修改。

```
// 在文件系统中，修改1.txt 为 Readme.md
$ git add 1.txt  Readme.md  
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	renamed:    1.txt -> Readme.md
```

- 测试 3 ：聪明的办法。用 git mv 把几个步骤合成 1 个。

```
$ git mv 1.txt Readme.md
```

## 15 文件操作 - Delete file

- rm file : 仅仅删除文件
- git rm file:删除文件，and Staged

# 16 分支操作 - 创建 branch
```
// 使用 checkout 命令来把远程分支取到本地，并自动建立 tracking
git checkout -t origin/dev  // 使用-t 参数，它默认在本地建立一个和远程分支名字一样的分支

// create branch f1 based on current local branch, then switch to branch f1
$ git branch f1
$ git checkout f1
```
```
// git pull后，自动创建 与 remote branch 对应的local branch
$ git pull
From https://github.com/YingVickyCao/GitTest
 * [new branch]      dev5       -> origin/dev5
Already up to date.

$ git checkout dev5
Branch 'dev5' set up to track remote branch 'dev5' from 'origin'.
Switched to a new branch 'dev5'

$ git branch -vv
* dev5   fce4ce9 [origin/dev5] modify 1
  master fce4ce9 [origin/master] modify 1
```
```
// Create local branch f1 based on current branch, and auto switch to the branch
$ git checkout -b f1

// 基于当前branch，创建并切换到new branch. 那么他们有相同的commit 记录
# git checkout -b <new branch>

// 基于指定branch，创建并切换到new branch
# git checkout -b <new branch> <based branch>
$ git checkout -b f1 origin/f1     // create new branch f1 based on remote f1
```

```
// 创建一个新分支，该分支没有任何提交信息
git checkout --orphan <new branch name>
```

```
// 如何基于一个 commit id 创建分支？
方法 1 :
$ git branch <new-branch-name> <commit id>
/
方法 2 :
$ git checkout <commit id>
$ git switch -c <new-branch-name>
```

# 17、分支操作 - How to rename a branch

```

git branch -m <name>
```

- Rename local branch

```
# m:modif
$ git branch -m <new branch name>                    // current branch -> new branch name
$ git branch -m <branch>  <new branch name>          // branch -> new branch name
```

- Rename remote branch    
  在 git 中重命名远程分支, 就是先删除远程分支，然后重命名本地分支，再重新提交一个远程分支.   
  推荐：修改远程 branch 名称，然后 checkout  

```
$git push --delete origin dev  // 删除远程分支：
$git branch -m dev develop     // 重命名本地分支
$git push origin develop       // 推送本地分支：
```
# 18、分支操作 - 删除分支

- $ git branch -d ： 安全删除 branch。当无法删除时，不会删除，会报错。

```
$ git branch -d feature1
Deleted branch feature1 (was 8ea04c3).
```

- git branch -D ： 强制删除 branch

```
$ git branch -D feature1
Deleted branch feature1 (was 8ea04c3).
```

```
git branch -d feature1
```

![git_delete](https://yingvickycao.github.io/img/tools/git/git_branch_delete.png)

- HEAD 指向的 branch 不能删除。   
要删除 HEAD 指向的 branch，需要先用 checkout 把 HEAD 指向其他地方。
- 由于 Git 中的 branch 只是一个引用，所以删除 branch 的操作也只会删掉这个引用，并不会删除任何的 commit。（不过如果一个 commit 不在任何一个 branch 的「路径」上，或者换句话说，如果没有任何一个 branch 可以回溯到这条 commit），那么在一定时间后，它会被 Git 的回收机制删除掉。）

- 出于安全考虑，没有被合并到 master 过的 branch 在删除时会失败（因为怕你误删掉「未完成」的 branch  
  `-d`: ask  
  `-D`:Force delete，no ask

# 19、分支操作 - 查看分支：git branch

- 查看本地分支

```
$ git branch
  branch_1
* master
```

- 查看本地分支，并显示分支的最新 commit 信息

```
$ git branch -v
  branch_1 f89b9a8 add 2.txt, 1.txt -> Readme.md
* master     8ea04c3 add 1.txt

$ git branch -av
* branch_1 8ea04c3 add 1.txt
  main     8ea04c3 add 1.txt
```

- 查看本地分支，并简单显示分支的最新 commit 信息

```
// -a | --all
$ git branch -av
* branch_1 8ea04c3 add 1.txt
  master     8ea04c3 add 1.txt
```

```
 % git branch -a               
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```
# 20、分支操作 - 切换 branch ： git checkout

- git checkout branch_name

```
$ git branch
* branch_1
  main

$ git checkout main
Switched to branch 'main'

$ git branch
  branch_1
* main
```


# 21 分支操作 -  `git branch --set-upstream` 建立追踪关系

- git clone 后自动建立 local 和 remote branch 的 一种追踪关系(tracking) ，即 master 分支自动 ”追踪” origin/master 分支。
- Git 允许手动建立追踪关系

```
// 手动建立追踪关系: master 分支追踪 origin/dev 分支
$ git branch --set-upstream master origin/dev
```

# 22 查看版本历史：git log

git help --web log

- git log : view all history of current branch

```
$ git branch
  branch_1
* main


// 显示的是完整commit id
$ git log
commit 8ea04c3b431787adb3f8b8f34b286a95cba9f122 (HEAD -> main)
Author: your_name <your@email>
Date:   Mon Dec 26 22:52:29 2022 +0800

    add 1.txt
....

```

- --all : view all history of all branch

```
$ git branch
  branch_1
* main


$ git log --all
commit f89b9a8bd50d342e135b69686aa3f9bd410232ce (branch_1)
Author: your_name <your@email>
Date:   Mon Dec 26 23:31:28 2022 +0800

    add 2.txt, 1.txt -> Readme.md

commit 8ea04c3b431787adb3f8b8f34b286a95cba9f122 (HEAD -> main)
Author: your_name <your@email>
Date:   Mon Dec 26 22:52:29 2022 +0800

    add 1.txt
```

```
// 注意：指定了all 后面再指定特定分支不起作用，以all优先。

$ git log --oneline --all main
f89b9a8 (branch_1) add 2.txt, 1.txt -> Readme.md
8ea04c3 (HEAD -> main) add 1.txt

$ git log --oneline branch_1
f89b9a8 (branch_1) add 2.txt, 1.txt -> Readme.md
8ea04c3 (HEAD -> main) add 1.txt
```

- --oneline ： 简单查看

```
// 与 git log 相比，log在一行显示，而且显示内容比较简单。
$ git log --oneline
b5e9167 (HEAD -> main) rename readme
57de259 update styles
9351641 add js
2456eb5 add styles
ddcfc60 add index.html
3468f73 readme
```

- -n ： 简单查看指定条数

```
// n后面跟想要的条数
// 简单查看当前分支的提交，此处是2条
$ git log -n2 --oneline
b5e9167 (HEAD -> main) rename readme
57de259 update styles


// 简单查看所有分支的提交，此处是4条
$ git log --oneline --all -n4
c2bcb9a (HEAD -> branch_1) branch 1 changed readme file
b5e9167 (main) rename readme
```

- --graph ： 查看版本的演进历史 ： 显示 commit 的父子关系

```
$ git log --all --graph
* commit 44d4abfe2b6046e737f8cabcd4923abe937e3535 (HEAD -> add_hi)
| Author: your_name <your_email@domain.com>
| Date:   Wed Dec 28 17:47:20 2022 +0800
|
|     add hi
|
| * commit f89b9a8bd50d342e135b69686aa3f9bd410232ce (branch_1)
|/  Author: your_name <your_email@domain.com>
|   Date:   Mon Dec 26 23:31:28 2022 +0800
|
|       add 2.txt, 1.txt -> Readme.md
|
* commit 8ea04c3b431787adb3f8b8f34b286a95cba9f122 (main, fix_me)
  Author: your_name <your_email@domain.com>
  Date:   Mon Dec 26 22:52:29 2022 +0800

      add 1.txt
```

```
$ git log --oneline --all -n3 --graph
* 44d4abf (HEAD -> add_hi) add hi
| * f89b9a8 (branch_1) add 2.txt, 1.txt -> Readme.md
|/
* 8ea04c3 (main, fix_me) add 1.txt
```

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

# 23 比较版本历史：git diff/git difftool

```
git diff (默认工具)  
$ git diff                         // 使用默认工具对比

git difftool（第三方比较工具）： e.g., Beyond Compare  
$ git difftool                    // 使用第三方工具对比
$ git difftool --tool-help        // 查看系统支持哪些 Git Diff 工具
```

```
// 暂存区 VS HEAD :在 git commit 之前，确认变更是否有问题
$ git diff --cached                 // vs all files
$ git diff --cached [<file name>]   // only vs 1.txt


// 工作区 VS 暂存区
$ git diff                // List all changes
$ git diff HEAD
$ git diff -- 1.txt       // Only list che change of 1.txt


// 比较 branch，查看所有文件的差异
$ git diff f1 main                                      // local f1 vs local main
$ git diff main origin/main                             // local main vs remote main
$ git difftool origin/master remotes/origin/master      // remote master vs remote master
$ git difftool origin/master remotes/origin/A1          // remote master vs remote A1
$ git difftool origin/master origin/A1                  // remote master vs remote A1
```
```
// 比较 branch，查看指定文件的差异
$ git diff feature/1 main -- Readme.md
```

```
// Example : 比较 commit id，查看所有文件的差异
$ git diff d8332d0 a7552f0
diff --git a/1.txt b/1.txt


变体：
// 查看，与 index=1相比，index=0有哪些变化 ？
$ git diff 44d4abf 8ea04c3
等价于
$ git diff HEAD HEAD^
等价于
$ git diff HEAD HEAD~1

// 查看，与 index=2相比，index=0有哪些变化 ？
$ git diff HEAD HEAD^^
等价于
$ git diff HEAD HEAD~2
```

```
// Example : 比较 commit id，查看指定文件的差异
$ git diff d8332d0 a7552f0 -- Readme.md
$ git diff d8332d0:filename a7552f0:filename
```


# 24 【Depressed】gitk : not working on git version 2.38.1

gitk 是 图形化版本历史工具。

```
$ gitk
DEPRECATION WARNING: The system version of Tk is deprecated and may be removed in a future release. Please don't rely on it. Set TK_SILENCE_DEPRECATION=1 to suppress this warning.
Error in startup script: can't invoke "tk" command:  application has been destroyed
    while executing
"tk windowingsystem"
    invoked from within
"if {[tk windowingsystem] eq "win32"} {
    focus -force .
}"
    (file "/usr/local/bin/gitk" line 12697)
```


# 25 Git stash
```
git stash
git stash apply
/
git stash pop
git stash list
```

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

# 26 cherry-pick：recommited from branch A to B

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

# 27 submodule

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


# Ref
- Gerrit Code Review https://www.gerritcodereview.com/
- https://git-scm.com/docs
- https://www.jianshu.com/p/a080c8649015
- Git Book https://git-scm.com/book/en/v2
- https://git-scm.com/docs/git-submodule
- https://git-scm.com/docs/git-clone
