# Git 常见 场景

# 1 分离头指针 (detached HEAD)

分离头指针，是指做变更时，没有基于某个 branch 或 tag 做变更。也就是当前工作没有与任何对 branch 或 tag 挂钩

```
$ git log
commit 8ea04c3b431787adb3f8b8f34b286a95cba9f122 (HEAD -> main)
Author: your_name <your_email@domain.com>
Date:   Mon Dec 26 22:52:29 2022 +0800

    add 1.txt

// 基于一个commit，作为修改
$ git checkout 8ea04c3b431787adb3f8b8f34b286a95cba9f122
Note: switching to '8ea04c3b431787adb3f8b8f34b286a95cba9f122'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 8ea04c3 add 1.txt

$ ls
1.txt

$ code 1.txt

$ git status
HEAD detached at 8ea04c3
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   1.txt

no changes added to commit (use "git add" and/or "git commit -a")


// 不经过暂存区，直接提交
$ git commit -am "add hi"
[detached HEAD 44d4abf] add hi
 1 file changed, 3 insertions(+), 1 deletion(-)

$ git branch
* (HEAD detached from 8ea04c3)
  branch_1
  main

// 切换到main时，git提示为刚才的commit 创建分支。因为如果不为它创建分支或tag，git认为它不重要，以后会被当作垃圾清除掉。
$ git checkout main
Warning: you are leaving 1 commit behind, not connected to
any of your branches:

  44d4abf add hi

If you want to keep it by creating a new branch, this may be a good time
to do so with:

 git branch <new-branch-name> 44d4abf

Switched to branch 'main'


// 为一个commit创建分支
$ git branch add_hi 44d4abf
$ git branch
  add_hi
  branch_1
* main
```

总结：如何基于一个 commit id 创建分支？

```
git branch <new-branch-name> 8ea04c3b431787adb3f8b8f34b286a95cba9f122
/

git checkout 8ea04c3b431787adb3f8b8f34b286a95cba9f122
git switch -c <new-branch-name>
```

# 2 怎么删除不需要的分支？

# 3 怎么修改最新的 commit 的 message？`git commit --amend`

```
$ git log -1
commit 895e9844529a4d7d4cf61ad4fda8e4e909d0d14f (HEAD -> main)
Author: Vicky <your_email@domain.com>
Date:   Wed Mar 1 20:23:49 2023 +0800

    1.txt

$ git commit --amend
[main 57afd7c] I have create 1.txt
 Date: Wed Mar 1 20:23:49 2023 +0800
 1 file changed, 1 insertion(+)
 create mode 100644 1.txt

$ git log -1
commit 57afd7cd45d1983115625f65c2b01c88d7359e5c (HEAD -> main)
Author: Vicky <your_email@domain.com>
Date:   Wed Mar 1 20:23:49 2023 +0800

    I have create 1.txt

```

# 4 怎么修改老旧的 commit 的 message？`git rebase -i <parent of target commit id>`

只适合：rebase 适合 在自己的分支进行变更，还没有 push 到 server。
Example：想修改 comment “add 2.txt” 为 “I create 2.txt at 3/1/2023”。

```
s$ git log
commit 66fcaeb9bfa40348cdc0fbcafbd524de8c05a6ae (HEAD -> main)
Author: Vicky <your_email@domain.com>
Date:   Wed Mar 1 20:28:37 2023 +0800

    add 3.txt

commit 217a52bed6cd0490b349dba00871dc523885d140
Author: Vicky <your_email@domain.com>
Date:   Wed Mar 1 20:28:05 2023 +0800

    add 2.txt

commit 57afd7cd45d1983115625f65c2b01c88d7359e5c
Author: Vicky <your_email@domain.com>
Date:   Wed Mar 1 20:23:49 2023 +0800

    I have create 1.txt

```

```
$ git rebase -i 57afd7c
[detached HEAD 9248df8] I create 2.txt at 3/1/2023
 Date: Wed Mar 1 20:28:05 2023 +0800
 1 file changed, 1 insertion(+)
 create mode 100644 2.txt
Successfully rebased and updated refs/heads/main.
```

![git_rebase](https://yingvickycao.github.io/img/tools/git/git_rebase.webp)  
reword / r

```
$ git log -n5 --graph
* commit 6a5449443c575d4804dc598d1d729d797f141b4c (HEAD -> main)
| Author: Vicky <your_email@domain.com>
| Date:   Wed Mar 1 20:28:37 2023 +0800
|
|     add 3.txt
|
* commit 9248df8eb74dbd0254f648e5c13dfc1b29b928ee
| Author: Vicky <your_email@domain.com>
| Date:   Wed Mar 1 20:28:05 2023 +0800
|
|     I create 2.txt at 3/1/2023
|
* commit 57afd7cd45d1983115625f65c2b01c88d7359e5c
  Author: Vicky <your_email@domain.com>
  Date:   Wed Mar 1 20:23:49 2023 +0800

      I have create 1.txt
```

# 5 怎么把连续的多个 commit 整理成 1 个. `git rebase -i <parent of target commit id>`

只适合：rebase 适合 在自己的分支进行变更，还没有 push 到 server。
Example : 把 comment "I create 2.txt at 3/1/2023","add 3.txt", "add 4.txt"，合并成 1 个 comment "create 2.txt, 3.txt, 4.txt"

```
$ git log --oneline
08eebc5 (HEAD -> main) add 5.txt
3268680 add 4.txt
6a54494 add 3.txt
9248df8 I create 2.txt at 3/1/2023
57afd7c I have create 1.txt
```

```
$ git rebase -i 57afd7c
[detached HEAD 6260e96] create 2.txt, 3.txt, 4.txt
 Date: Wed Mar 1 20:28:05 2023 +0800
 3 files changed, 3 insertions(+)
 create mode 100644 2.txt
 create mode 100644 3.txt
 create mode 100644 4.txt
Successfully rebased and updated refs/heads/main.
```

![git_rebase](https://yingvickycao.github.io/img/tools/git/git_rebase_2.webp)  
squash / s

```
$ git log --oneline
99e8a4e (HEAD -> main) add 5.txt
6260e96 create 2.txt, 3.txt, 4.txt
57afd7c I have create 1.txt
```

# 6 怎样把间隔的几个 commit 整理成 1 个？

Example ： 想要把 index 0(0f6271c) 和 index 2(948347a)的 comment 合并成一个 comment"create a Readme.md at 3/1/2023"

```
$ git log --oneline
948347a (HEAD -> main) modify Readme.md
c378953 1.txt
0f6271c add Readme.md

$ git log --graph
* commit 948347a99110042a23e77c5b83d9e9e69a851d77 (HEAD -> main)
| Author: Vicky <your_email@domain.com>
| Date:   Wed Mar 1 22:31:24 2023 +0800
|
|     modify Readme.md
|
* commit c3789531e49c0ed62632d1f73168b27a22d14c67
| Author: Vicky <your_email@domain.com>
| Date:   Wed Mar 1 22:30:37 2023 +0800
|
|     1.txt
|
* commit 0f6271c8f1b4302538a3ba2bdc1e7449ceaabf6a
  Author: Vicky <your_email@domain.com>
  Date:   Wed Mar 1 22:30:02 2023 +0800

      add Readme.md
```

```
$ git rebase -i 0f6271c
The previous cherry-pick is now empty, possibly due to conflict resolution.
If you wish to commit it anyway, use:

    git commit --allow-empty

Otherwise, please use 'git rebase --skip'
interactive rebase in progress; onto 0f6271c
Last command done (1 command done):
   pick 0f6271c
Next commands to do (2 remaining commands):
   squash 948347a modify Readme.md
   pick c378953 1.txt
  (use "git rebase --edit-todo" to view and edit)
You are currently rebasing branch 'main' on '0f6271c'.
  (all conflicts fixed: run "git rebase --continue")

nothing to commit, working tree clean
Could not apply 0f6271c...
```

![git_rebase](https://yingvickycao.github.io/img/tools/git/git_rebase_3_1.webp)

```
$ git rebase --continue
[detached HEAD a7552f0] create a Readme.md at 3/1/2023
 Date: Wed Mar 1 22:30:02 2023 +0800
 1 file changed, 1 insertion(+)
 create mode 100644 Readme.md
Successfully rebased and updated refs/heads/main.
```

![git_rebase](https://yingvickycao.github.io/img/tools/git/git_rebase_3_2.webp)

```
$ git log --oneline
9d8eebd (HEAD -> main) 1.txt
a7552f0 create a Readme.md at 3/1/2023

$ git log --graph
* commit 9d8eebd33cbba54d0952846ad3ea48c861793a94 (HEAD -> main)
| Author: Vicky <your_email@domain.com>
| Date:   Wed Mar 1 22:30:37 2023 +0800
|
|     1.txt
|
* commit a7552f0dafa1e0fdb3789887ff9d9e74a921f262
  Author: Vicky <your_email@domain.com>
  Date:   Wed Mar 1 22:30:02 2023 +0800

      create a Readme.md at 3/1/2023

      add Readme.md

      modify Readme.md
```

# 7 怎么比较暂存区和 HEAD 所含文件的差异？`git diff --cached`/`git difftool --cached`

用途：git add 后 vs 之前已经 git commit 的
目的：在 git commit 之前，确认变更是否有问题。

midify file, then `git diff ` or `git difftool`

```
Step 1 : Modify 1.txt

Step 2 :
$ git add 1.txt

Step 3 :
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   1.txt

Step 4 :
$ git difftool --cached
```

# 8 怎么比较工作区和暂存区所含文件的差异？`git diff`/`git difftool`

含义：比较修改了什么？

```
Step 1 : Modify 1.txt, 2.txt

Step 2 :
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   1.txt
  modified:   Readme.md


no changes added to commit (use "git add" and/or "git commit -a")

Step 3 :
$ git diff            // List all changes
/
git diff -- 1.txt     // Only list che change of 1.txt
```

# 9 如何让暂存区恢复成和 HEAD 的一样？`git restore --staged <file>`

```
Step 1 : Modify 1.txt, 2.txt

Step 2 :
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   1.txt
	modified:   Readme.md

$ git add 1.txt Readme.md

$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   1.txt
	modified:   Readme.md


Step 3 : git restore --staged 1.txt Readme.md
$ git status
On branch main
Changes not staged for commit:
(use "git add <file>..." to update what will be committed)
(use "git restore <file>..." to discard changes in working directory)
modified: 1.txt
modified: Readme.md

no changes added to commit (use "git add" and/or "git commit -a")

$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   1.txt
	modified:   Readme.md
```

# 10 如何让工作区的文件恢复为和暂存区一样？`git restore <file>`

```
Step 1 : Modify 1.txt, 2.txt

Step 2 :
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   1.txt
	modified:   Readme.md

no changes added to commit (use "git add" and/or "git commit -a")

$ git restore 1.txt Readme.md

$ git status
On branch main
nothing to commit, working tree clean
```

# 11 消除最近的几次提交 `git reset --hard <commit id>`

注意：这个命名很危险，慎用。一旦执行，commit id 之后的内容就没有了。而且头指针的位置也变了。

```

$ git log --oneline
1c875ca (HEAD -> main) 1.txt
7faa254 1.txt
9d8eebd 1.txt
a7552f0 create a Readme.md at 3/1/2023

$ git log --graph

- commit 1c875ca60dad22ebfde57664527900f6d79db017 (HEAD -> main)
  | Author: Vicky <your_email@domain.com>
  | Date: Thu Mar 2 21:07:13 2023 +0800
  |
  | 1.txt
  |
- commit 7faa2542f29233f0483885d97026f4a3092a2500
  | Author: Vicky <your_email@domain.com>
  | Date: Thu Mar 2 20:59:22 2023 +0800
  |
  | 1.txt
  |
- commit 9d8eebd33cbba54d0952846ad3ea48c861793a94
  | Author: Vicky <your_email@domain.com>
  | Date: Wed Mar 1 22:30:37 2023 +0800
  |
  | 1.txt
  |
- commit a7552f0dafa1e0fdb3789887ff9d9e74a921f262
  Author: Vicky <your_email@domain.com>
  Date: Wed Mar 1 22:30:02 2023 +0800

      create a Readme.md at 3/1/2023

      add Readme.md

      modify Readme.md

$ git reset --hard a7552f0
HEAD is now at a7552f0 create a Readme.md at 3/1/2023

$ git log --graph

- commit a7552f0dafa1e0fdb3789887ff9d9e74a921f262 (HEAD -> main)
  Author: Vicky <your_email@domain.com>
  Date: Wed Mar 1 22:30:02 2023 +0800
  create a Readme.md at 3/1/2023

        add Readme.md

        modify Readme.md

  $ git log --oneline
  a7552f0 (HEAD -> main) create a Readme.md at 3/1/2023
```

# 12 看看不同提交的指定文件的差异 `git diff <branch/commit_id> <branch/commit_id> [-- target_file]`

Example : 比较 branch，查看所有文件的差异

```
$ git diff feature/1 main
```

Example : 比较 branch，查看指定文件的差异

```
$ git diff feature/1 main -- Readme.md
diff --git a/Readme.md b/Readme.md
index 04835c3..a96879d 100644
--- a/Readme.md
+++ b/Readme.md
@@ -1 +1 @@
-Readme in feature/1
+This is an example of readme file
```

Example : 比较 commit id，查看所有文件的差异

```
$ git log --oneline
d8332d0 (HEAD -> feature/1) add 1.txt and modify readme
a7552f0 (main) create a Readme.md at 3/1/2023

$ git diff d8332d0 a7552f0
diff --git a/1.txt b/1.txt
deleted file mode 100644
index a96879d..0000000
--- a/1.txt
+++ /dev/null
@@ -1 +0,0 @@
-This is an example of readme file
diff --git a/Readme.md b/Readme.md
index 04835c3..a96879d 100644
--- a/Readme.md
+++ b/Readme.md
@@ -1 +1 @@
-Readme in feature/1
+This is an example of readme file
```

Example : 比较 commit id，查看指定文件的差异

```
$ git log --oneline
d8332d0 (HEAD -> feature/1) add 1.txt and modify readme
a7552f0 (main) create a Readme.md at 3/1/2023

$ git diff d8332d0 a7552f0 -- Readme.md
diff --git a/Readme.md b/Readme.md
index 04835c3..a96879d 100644
--- a/Readme.md
+++ b/Readme.md
@@ -1 +1 @@
-Readme in feature/1
+This is an example of readme file
```

## 13 正确删除文件的方法 `git rm <file>`

```
$ git rm Readme.md
```

## 14 开发中临时加塞了紧急任务怎么处理？`git stash -> git stash apply/pop`

Step 1 : git stash
Step 2 : git stash apply / git statsh pop

git stash apply vs git statsh pop ?

git stash apply:
(1)从暂存区的缓冲区 -> 工作区
(2)暂存区的缓冲区 list 还有

git statsh pop:
(1)从暂存区的缓冲区 -> 工作区
(2)从暂存区的缓冲区 list 中删除

```
// 保存工作区的修改到缓冲区
$ git stash
Saved working directory and index state WIP on feature/1: d8332d0 add 1.txt and modify readme


// 把缓冲区的修改恢复到工作区，但不从缓冲区的列表中删除
$ git stash apply
On branch feature/1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   1.txt

no changes added to commit (use "git add" and/or "git commit -a")

$ git status
On branch feature/1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   1.txt

no changes added to commit (use "git add" and/or "git commit -a")

$ git stash list
stash@{0}: WIP on feature/1: d8332d0 add 1.txt and modify readme
```

```
$ git stash
Saved working directory and index state WIP on feature/1: d8332d0 add 1.txt and modify readme

// 把缓冲区的修改恢复到工作区，但从缓冲区的列表中删除
$ git stash pop
On branch feature/1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   1.txt

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (f76f831c9cccd7ae7c2513201e32463e098a0a49)


$ git status
On branch feature/1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   1.txt

no changes added to commit (use "git add" and/or "git commit -a")

$ git stash list
```

# 15 如何指定不需要 Git 管理的文件？`.gitignore`

https://github.com/github/gitignore

`*.d`:任何以.d 为结尾的文件都不纳入版本管理
`*.dSYM/`：例如 A.dSYM 's children 不纳入版本管理
`*.dSYM`：例如 A.dSYM 这个文件纳入/这个文件夹以及它的 children 不纳入版本管理

Example:

```
.gitignore
doc/

那么，
doc(folder)   X
doc/1.txt     X
/
doc(file)     OK
```

```
.gitignore
doc

那么，
doc(folder)   X
doc/1.txt     X
/
doc(file)     X
```

# 16 如何将 Git 仓库备份到本地？`git clone -> git push / git fetch`

备份时，

- clone 时，带工作区 `git clone <respository> <folder name>`

```
// 无进度
$ git clone /Users/hades/Downloads/gitExample/.git case2
Cloning into bare repository 'case2'...
done.
```

```
// 有%进度
$ git clone file:///Users/hades/Downloads/gitExample/.git case2
/
$ git clone file:///Users/hades/Downloads/gitExample case2
Cloning into bare repository 'case3'...
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 6 (delta 0), reused 0 (delta 0), pack-reused 0

$ git branch -a
* feature/1
  remotes/origin/HEAD -> origin/feature/1
  remotes/origin/feature/1
  remotes/origin/main
```

- clone 时，不带工作区 `git clone --bare <remote respository> <folder name>`

```
$ git clone --bare /Users/hades/Downloads/gitExample/.git case2
```

- add remote 远程仓库 `git remote add <name for remote> <remote respository>`

```
$ git remote -v
origin	file:///Users/hades/Downloads/gitExample (fetch)
origin	file:///Users/hades/Downloads/gitExample (push)

// 实际上不用remote add 远程仓库，因为已经有origin。此处是为了练习
$ git remote add gitExample file:///Users/hades/Downloads/gitExample/.git

$ git remote -v
gitExample	file:///Users/hades/Downloads/gitExample/.git (fetch)
gitExample	file:///Users/hades/Downloads/gitExample/.git (push)
origin	file:///Users/hades/Downloads/gitExample (fetch)
origin	file:///Users/hades/Downloads/gitExample (push)

// 这三种命令效果一样
$ git push --set-upstream gitExample feature/1    // To push the current branch and set the remote as upstream
$ git push gitExample feature/1
$ git push origin feature/1
```

- why push failed?

```
$ git push --set-upstream gitExample feature/1
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 310 bytes | 310.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
remote: error: refusing to update checked out branch: refs/heads/feature/1
remote: error: By default, updating the current branch in a non-bare repository
remote: is denied, because it will make the index and work tree inconsistent
remote: with what you pushed, and will require 'git reset --hard' to match
remote: the work tree to HEAD.
remote:
remote: You can set the 'receive.denyCurrentBranch' configuration variable
remote: to 'ignore' or 'warn' in the remote repository to allow pushing into
remote: its current branch; however, this is not recommended unless you
remote: arranged to update its work tree to match what you pushed in some
remote: other way.
remote:
remote: To squelch this message and still keep the default behaviour, set
remote: 'receive.denyCurrentBranch' configuration variable to 'refuse'.
To file:///Users/hades/Downloads/gitExample/.git
 ! [remote rejected] feature/1 -> feature/1 (branch is currently checked out)
error: failed to push some refs to 'file:///Users/hades/Downloads/gitExample/.git'
```

Reason: remote current branch is also feature/1  
Fix : remote switches to another branch

# 18 | 不同人修改了不同文件如何处理？`git fetch -> git merge -> git push / git pull -> git push`

git pull = git fetch + git merge

Example ： 同一个 branch，一个人了文件并 push 到 remote。第二个人同样修改了文件，那么他 git commit 后怎么处理？

方法 1 ：`git fetch -> git merge -> git push`

```
$ git fetch origin
/
$ git fetch origin feature/add_git_comments
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0
Unpacking objects: 100% (3/3), 249 bytes | 124.00 KiB/s, done.
From github.com:YingVickyCao/GitTest
   8b741d9..0c5fbad  feature/add_git_comments -> origin/feature/add_git_comments

$ git status
On branch feature/add_git_comments
Your branch is behind 'origin/feature/add_git_comments' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)


// [behind 1] 说明remote比当前的local多一个commit
$ git branch -av
* feature/add_git_comments                8b741d9 [behind 1] modify Readme.md
  master                                  7878ace add test files
  remotes/origin/HEAD                     -> origin/master
  remotes/origin/feature/add_git_comments 0c5fbad readme add date
  remotes/origin/master                   7878ace add test files

// merge 后跟remote branch 或 跟remote的commit id，效果是一样的。
$ git merge origin/feature/add_git_comments
/
git merge 0c5fbad

Updating 8b741d9..0c5fbad
Fast-forward
 README.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

$ git push origin feature/add_git_comments
Everything up-to-date
```

方法 2 ：`git pull -> git push`

```
$ git pull origin feature/add_git_comments
$ git push origin feature/add_git_comments
```

# 19 | 不同人修改了同文件的不同区域如何处理？

同 18

# 36 | 不同人修改了同文件的同一区域如何处理？ Ref 文件冲突

```
$ git pull origin  feature/add_git_comments

// fix conflict, then

$ git commit <files>
$ git push origin feature/add_git_comments
```

# 37 | 同时变更了文件名和文件内容如何处理？

正常处理，没有冲突

# 38 | 把同一文件改成了不同的文件名如何处理？Ref 树冲突

# 39 | 禁止向集成分支执行 push -f 操作

```
$ git log --oneline
0c5fbad (HEAD -> feature/add_git_comments, origin/feature/add_git_comments) readme add date
8b741d9 modify Readme.md
7878ace (origin/master, origin/HEAD, master) add test files
c72ee36 add c.txt
89637df add b.txt
62e49d8 add a.txt
338479a Initial commit

// 本地有位童鞋不小心把HEAD指向了之前的commmit
$ git reset --hard 62e49d8
HEAD is now at 62e49d8 add a.txt

// 可以看到git push是安全的，它会提示(non-fast-forward)
$ git push origin feature/add_git_comments
To github.com:YingVickyCao/GitTest.git
 ! [rejected]        feature/add_git_comments -> feature/add_git_comments (non-fast-forward)
error: failed to push some refs to 'github.com:YingVickyCao/GitTest.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

$ git log --oneline
62e49d8 (HEAD -> feature/add_git_comments) add a.txt
338479a Initial commit

// 可以看到git push -f 是不安全的，不提示(non-fast-forward)，而是push remote 成功。那么remote的HEAD就指向了之前的commit，不显示最新的修改。
$ git push -f origin feature/add_git_comments
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:YingVickyCao/GitTest.git
 + 0c5fbad...62e49d8 feature/add_git_comments -> feature/add_git_comments (forced update)

// 恢复到原来正确的HEAD
$ git reset --hard 0c5fbad
HEAD is now at 0c5fbad readme add date

$ git push -f origin feature/add_git_comments
Enumerating objects: 8, done.
Counting objects: 100% (8/8), done.
Delta compression using up to 8 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 542 bytes | 542.00 KiB/s, done.
Total 6 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 1 local object.
To github.com:YingVickyCao/GitTest.git
   62e49d8..0c5fbad  feature/add_git_comments -> feature/add_git_comments
```

那么代码托管平台有没有提供禁止 push -f 功能？

# 40 | 禁止向集成分支执行变更历史的操作

模拟场景：for branch develop_content  
Step 1:user1 pull 到本地。  
Step 2:user1 通过变基（rebase）行为修改了某一个 commit 的 message。  
Step 3:user2 pull 到本地  
Step 4:user1 push 到了远端。  
Step 5:user2 做了一些更改。  
Step 6:user2 push 时失败，提示(non-fast-forward)。

对于多人合作的集成分支，不能变基（rebase）来修改变更历史，因为其他人正在基于之前的旧 commit 做变更，一旦 rebase 了 remote，其他人会 push 失败。

记住：对于多人合作的集成分支，不能修改历史，只能增加历史往前走。


# 41 ｜ 如何清楚git中历史提交记录？
目的：删除不需要的提交历史，可以减少仓库的大小。

```
// Current branch is master
Step 1 : 使用--orphan创建一个分支，该分支没有任何提交记录
git checkout --orphan main
Step 2 : commit files
git add .
git commit -m "init"
Step 3 : Delete origin master branch
git branch -D master
Step 4 : Rename current branch to master branch
git branch -m master
Step 5 : git push -f origin master // 有些仓库有 main分支保护，不允许强制 push，需要在远程仓库项目里暂时把项目保护关掉才能推送。
```


# 42 把本地仓库同步到 Github

一个本地仓库，还没有远程的仓库建立联系。如何建立联系，并把本地代码同步到远程？

```

$ git remote add origin git@github.com:YingVickyCao/git-example.git

$ git remote -v
origin git@github.com:YingVickyCao/git-example.git (fetch)
origin git@github.com:YingVickyCao/git-example.git (push)

// 本地首次同步 remote 时，发现除了 default 分支，其他都是成功同步了的。
// 因为本地的 main 分支，和 远程的 main，没有共同的祖先，是 2 颗独立的树。因此不能同步成功。需要把 remote 和本地关联后，才能同步成功。
$ git push origin --all
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (9/9), 648 bytes | 648.00 KiB/s, done.
Total 9 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), done.
To github.com:YingVickyCao/git-example.git

- [new branch] add_hi -> add_hi
- [new branch] branch_1 -> branch_1
- [new branch] xyz -> xyz
  ! [rejected] main -> main (fetch first)
  error: failed to push some refs to 'github.com:YingVickyCao/git-example.git'
  hint: Updates were rejected because the remote contains work that you do
  hint: not have locally. This is usually caused by another repository pushing
  hint: to the same ref. You may want to first integrate the remote changes
  hint: (e.g., 'git pull ...') before pushing again.
  hint: See the 'Note about fast-forwards' in 'git push --help' for details.

$ git fetch origin main
From github.com:YingVickyCao/git-example

- branch main -> FETCH_HEAD

// remote 和 local，两颗独立的树
$ git log --all --graph

- commit aa2036682fcf7e03b24e7fc4730ad102a0e0f27b (origin/main) => remote 树
  Author: Vicky <your_email@domain.com>
  Date: Wed Dec 28 22:28:10 2022 +0800

      Initial commit

- commit 44d4abfe2b6046e737f8cabcd4923abe937e3535 (origin/xyz, origin/add_hi, xyz, add_hi) => 本地树
  | Author: your_name <your_email@domain.com>
  | Date: Wed Dec 28 17:47:20 2022 +0800
  |
  | add hi
  |
  | \* commit f89b9a8bd50d342e135b69686aa3f9bd410232ce (origin/branch_1, branch_1)
  |/ Author: your_name <your_email@domain.com>
  | Date: Mon Dec 26 23:31:28 2022 +0800
  |
  | add 2.txt, 1.txt -> Readme.md
  |
- commit 8ea04c3b431787adb3f8b8f34b286a95cba9f122 (HEAD -> main)
  Author: your_name <your_email@domain.com>
  Date: Mon Dec 26 22:52:29 2022 +0800

      add 1.txt

$ git branch -av
add_hi 44d4abf add hi
branch_1 f89b9a8 add 2.txt, 1.txt -> Readme.md
main 8ea04c3 add 1.txt
xyz 44d4abf add hi
remotes/origin/add_hi 44d4abf add hi
remotes/origin/branch_1 f89b9a8 add 2.txt, 1.txt -> Readme.md
remotes/origin/main aa20366 Initial commit
remotes/origin/xyz 44d4abf add hi

$ git merge origin/main
fatal: refusing to merge unrelated histories
Hades-Mac:git-example hades$ git merge
fatal: No remote for the current branch.

$ git merge --help

$ git merge origin/main --allow-unrelated-histories
Merge made by the 'ort' strategy.
LICENSE | 21 +++++++++++++++++++++
README.md | 1 +
2 files changed, 22 insertions(+)
create mode 100644 LICENSE
create mode 100644 README.md

// 合成了 1 颗独立的树
$ git log --all --graph

- commit f21f4f0a50db8e7160f8becc6e38a88b7f009eee (HEAD -> main)
  |\ Merge: 8ea04c3 aa20366
  | | Author: your*name <your_email@domain.com>
  | | Date: Fri Dec 30 16:33:21 2022 +0800
  | |
  | | Merge remote-tracking branch 'origin/main'
  | |
  | * commit aa2036682fcf7e03b24e7fc4730ad102a0e0f27b (origin/main)
  | Author: your*name <your_email@domain.com>
  | Date: Wed Dec 28 22:28:10 2022 +0800
  |
  | Initial commit
  |
  | * commit 44d4abfe2b6046e737f8cabcd4923abe937e3535 (origin/xyz, origin/add_hi, xyz, add_hi)
  |/ Author: your_name <your_email@domain.com>
  | Date: Wed Dec 28 17:47:20 2022 +0800
  |
  | add hi
  |
  | \* commit f89b9a8bd50d342e135b69686aa3f9bd410232ce (origin/branch_1, branch_1)
  |/ Author: your_name <your_email@domain.com>
  | Date: Mon Dec 26 23:31:28 2022 +0800
  |
  | add 2.txt, 1.txt -> Readme.md
  |
- commit 8ea04c3b431787adb3f8b8f34b286a95cba9f122
  Author: your_name <your_email@domain.com>
  Date: Mon Dec 26 22:52:29 2022 +0800

      add 1.txt

$ git push origin main
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (2/2), 353 bytes | 353.00 KiB/s, done.
Total 2 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:YingVickyCao/git-example.git
aa20366..f21f4f0 main -> main
```

总结：

- git pull = git fetch ，然后 merge with local branch  
- 同名的 branch，如果 local 和 remote 是 2 颗独立的树，remote 和 本地 没有关联，因此本地不能同步成功到远程。  
  如何把 remote 和本地 branch 关联起来？     
  方法 1 : rebase。  
  方法 2 : merge。（此处：由 2 颗树合并一个颗树）  


Ref : Push the local repository to GitHub?

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


