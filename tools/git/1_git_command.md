# 4 Create Git respository

```
// If 没有配置 defaultbranch 时，创建仓库时，默认创建的branch name是master。

$ cd ~/Desktop/git-example/

$ git init
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint:
hint:     git config --global init.defaultBranch <name>
hint:
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint:
hint:     git branch -m <name>
```

```
// 配置 defaultbranch 为main后，创建仓库时，默认创建的branch name是 main。

$ git config --global --list
init.defaultbranch=main

$ cd ~/Desktop/git-example/

$ git init
Initialized empty Git repository in /Users/your_account/Desktop/git-example/.git/
```

# 5 文件的状态变化

Unstage (Untracked)（工作目录） -> Stage（暂存区） ->Commited （版本历史，加入版本管理）
/
Unstage (Untracked) （工作目录）<- Stage（暂存区）

- unstage/untracked
  新增一个文件，或修改一个文件后，unstage/untracked 状态。

```
$ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	1.txt

nothing added to commit but untracked files present (use "git add" to track)
```

- stage
  git add 后，unstage/untracked -> stage

```
$ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   1.txt

```

- committed
  git commit 后， staged ->committed

```
$ git commit -m "add 1.txt"
[main (root-commit) 8ea04c3] add 1.txt
 1 file changed, 1 insertion(+)
 create mode 100755 1.txt

```

- unstage/untracked <- staged
  撤销更改

```
git restore --staged
```

- clear all changes from 工作目录 和暂存区

```
// 危险的操作
git reset --hard
```

# 7 git status

# 6 git add

添加到暂存区

- 一次 add 一个文件

```
$ git add 1.txt
```

- 一次 add 多个文件。用一个空格或多个空格隔开

```
$ git add 1.txt  Readme.md
```

- -u : add all changed files to staged

```
// -u : update.
// 当文件已经被管理时，文件有更新时，可以通过-u一次性提交所有文件的更新
$ git add -u

$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
    modified:   index.html
    modified:   styles/style.css
```

# 7 git commit

提交变更

- git commit -m : 从暂存区，提交

```
$ git commit -m "add 1.txt"
[main (root-commit) 8ea04c3] add 1.txt
 1 file changed, 1 insertion(+)
 create mode 100755 1.txt

```

- 不经过暂存区，直接提交

```
$ git commit -am "add hi"
```

# 8 Rename file : git mv

通过测试，发现 git add 能够直接识别到文件名的修改。

- 测试 1 ：笨办法，git add , git rm

```
$ mv readme.txt readme.md

$ git status
On branch main
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
    deleted:    readme.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    readme.md

no changes added to commit (use "git add" and/or "git commit -a")

$ git add readme.md

$ git rm readme.txt
rm 'readme.txt'

$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
    renamed:    readme.txt -> readme.md
```

- 测试 2 ：笨办法。git add 能够直接识别到文件名的修改。

```
// 在文件系统中，修改1.txt 为 Readme.md

$ git status
On branch main
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	deleted:    1.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	Readme.md

no changes added to commit (use "git add" and/or "git commit -a")


$ git add 1.txt  Readme.md

$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	renamed:    1.txt -> Readme.md
```

- 测试 3 ：聪明的办法。用 git mv 把几个步骤合成 1 个。

```
$ git status
On branch main
nothing to commit, working tree clean

$ git mv 1.txt Readme.md

$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	renamed:    1.txt -> Readme.md

```

# 9 How to rename a branch

```
git branch -m <name>
```

# 11 创建 branch

- git checkout -b 创建并切换到 branch

```
// 基于当前branch（main），创建branch_1，并切换到 branch_1 。
// 那么，现在，branch_1 用于 与 based branch相同的 commit id。

$ git checkout -b branch_1
Switched to a new branch 'branch_1'

$ git branch -av
* branch_1 8ea04c3 add 1.txt
  main     8ea04c3 add 1.txt
```

```
// 基于add_hi，创建branch xyz，并切换到 xyz
$ git checkout -b xyz add_hi
Switched to a new branch 'xyz'
```

- 如何基于一个 commit id 创建分支？ Ref：[分离头指针](#15.1)

```
$ git log
commit 8ea04c3b431787adb3f8b8f34b286a95cba9f122 (HEAD -> main)
Author: your_name <your_email@domain.com>
Date:   Mon Dec 26 22:52:29 2022 +0800

    add 1.txt

方法 1 :
$ git branch <new-branch-name> 8ea04c3b431787adb3f8b8f34b286a95cba9f122
/
方法 2 :
$ git checkout 8ea04c3b431787adb3f8b8f34b286a95cba9f122
$ git switch -c <new-branch-name>
```

# 12 删除分支

- $ git branch -d ： 安全删除 branch。当无法删除时，不会删除，会报错。

```
$ git branch -d fix_me
Deleted branch fix_me (was 8ea04c3).
```

- git branch -D ： 强制删除 branch

```
$ git branch -D fix_me
Deleted branch fix_me (was 8ea04c3).
```

# 10 查看分支：git branch

- 查看本地分支

```
$ git branch
  branch_1
* main
```

- 查看本地分支，并显示分支的最新 commit 信息

```
$ git branch -v
  branch_1 f89b9a8 add 2.txt, 1.txt -> Readme.md
* main     8ea04c3 add 1.txt
```

- 查看本地分支，并简单显示分支的最新 commit 信息

```
// -a | --all
$ git branch -av
* branch_1 8ea04c3 add 1.txt
  main     8ea04c3 add 1.txt
```

# 11 切换 branch ： git checkout

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

# 12 查看版本历史：git log

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
57de259 update styles
9351641 add js
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

# 14 比较版本历史： git diff/git difftool

```
$ git log --oneline
44d4abf (HEAD -> add_hi) add hi     => index=0
8ea04c3 (main, fix_me) add 1.txt    => index=1
...
```

```
// 查看，与 index=1相比，index=0有哪些变化 ？
$ git diff 44d4abf 8ea04c3
等价于
$ git diff HEAD HEAD^
等价于
$ git diff HEAD HEAD~1
```

```
// 查看，与 index=2相比，index=0有哪些变化 ？
$ git diff HEAD HEAD^^
等价于
$ git diff HEAD HEAD~2
```

# 13 【Depressed】gitk : not working on git version 2.38.1

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
