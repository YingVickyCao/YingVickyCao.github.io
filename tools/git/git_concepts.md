# Git Concepts

HEAD, master, branch, origin

# 1 `origin, origin/master,origin/HEAD`

- origin = 远程仓库的别名. default name = origin, but can ne any name.  
  `git remote –v`  
  `git remote`  
  `repo/.git/config`

```
$ git remote
origin

$ git remote -v
origin	https://github.com/YingVickyCao/GitTest.git (fetch)
origin	https://github.com/YingVickyCao/GitTest.git (push)

$ git remote -v
gitee	https://gitee.com/YingVickyCao/YingVickyCao.github.io.git (fetch)
gitee	https://gitee.com/YingVickyCao/YingVickyCao.github.io.git (push)
github	https://github.com/YingVickyCao/YingVickyCao.github.io.git (fetch)
github	https://github.com/YingVickyCao/YingVickyCao.github.io.git (push)
origin	https://github.com/YingVickyCao/YingVickyCao.github.io.git (fetch)
origin	https://github.com/YingVickyCao/YingVickyCao.github.io.git (push)
origin	https://gitee.com/YingVickyCao/YingVickyCao.github.io.git (push)
```

- (远程仓库名)/(分支名) = 远程分支  
  `remotes/origin/master` / `origin/master` is remote master branch  
  `master` is local master branch

```
$ git branch -r     // r = remote branch
  origin/A1
  origin/B1
  origin/HEAD -> origin/master
  origin/master

$ git branch        // local branch
  A1
* master

$ git branch -a     // a = all = local branch + remote branch
  A1
* master
  remotes/origin/A1
  remotes/origin/B1
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```

# 2 引用(Reference)

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

![Git_head_master_origin](/img/Git_head_master_origin.jpg)

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

# 3 HEAD

- HEAD：当前 commit 的引用。因此，用 HEAD 来操作当前 commit
- 当前 commit：当前工作目录所对应的 commit。
- 当使用 checkout、reset 等指令手动指定改变当前 commit 的时候，HEAD 也会一起跟过去。

# 4 branch

- HEAD 除了可以指向 commit，还可以指向一个 branch。  
  当它指向某个 branch 的时候，会通过这个 branch 来间接地指向某个 commit；  
  当 HEAD 在提交时自动向前移动的时候，它会像一个拖钩一样带着它所指向的 branch 一起移动。

![git_head_master](/img/git_head_master.png)

```
git commit

```

![git_head_master_update](/img/git_head_master_update.png)

## 理解 branch?

### 理解 1：branch 是一个指向 commit 的引用

### 理解 2：branch 是从初始 commit 到 branch 所指向的 commit 之间的所有 commits 的一个串，即所有路径。

![git_branch_ref_one_commit](/img/git_branch_ref_one_commit.png)

- 所有的 branch 之间都是平等的。

```
1. `branch1` 是 `1` `2` `5` `6` 的串，而不要理解为 `2` `5` `6` 或者 `5` `6` 。
2. 起点在哪里并不是最重要的，重要的是所有 `branch` 之间是平等的，
3. `master` 并不比其他 `branch` 高级。
```

![git_branch_is_equal_1](/img/git_branch_is_equal_1.png)

![git_branch_is_equal_2](/img/git_branch_is_equal_2.png)

- branch 包含了从初始 commit 到它的所有路径，而不是一条路径。并且，这些路径之间也是彼此平等的。

```
1. `master` 在合并了 `branch1` 之后，从初始 `commit` 到 `master` 有了两条路径。这时，`master` 的串就包含了 `1` `2` `3` `4` `7` 和 `1` `2` `5` `6` `7` 这两条路径。
2. 这两条路径是平等的，`1` `2` `3` `4` `7` 这条路径并不会因为它是「原生路径」而拥有任何的特别之处。
```

![git_branch_is_equal_3](/img/git_branch_is_equal_3.png)

## branch 的创建

```
git branch feature1
```

![git_branch_create](/img/git_branch_create.png)

## branch 的切换

- 新建的 branch 并不会自动切换，HEAD 在这时依然是指向 master 的。  
  用 checkout 来主动切换到新 branch,然后 HEAD 就会指向新建的 branch:

```
# git checkout -b 名称  =  创建 + 切换branch
git checkout feature1
```

![git_branch_checkout](/img/git_branch_checkout.png)

- 在切换到新的 branch 后，再次 commit 时 HEAD 就会带着新的 branch 移动了：

```
git commit
```

![git_head_updated_after_commit](/img/git_head_updated_after_commit.png)

- 再切换到 master 去 commit，出现分叉。

```
git checkout master
...
git commit
```

![git_head_updated_4_commit_after_checkout](/img/git_head_updated_4_commit_after_checkout.png)

## branch 的删除

```
git branch -d feature1
```

![git_branch_delete](/img/git_branch_delete.png)

- HEAD 指向的 branch 不能删除。要删除 HEAD 指向的 branch，需要先用 checkout 把 HEAD 指向其他地方。
- 由于 Git 中的 branch 只是一个引用，所以删除 branch 的操作也只会删掉这个引用，并不会删除任何的 commit。（不过如果一个 commit 不在任何一个 branch 的「路径」上，或者换句话说，如果没有任何一个 branch 可以回溯到这条 commit），那么在一定时间后，它会被 Git 的回收机制删除掉。）

- 出于安全考虑，没有被合并到 master 过的 branch 在删除时会失败（因为怕你误删掉「未完成」的 branch  
  `-d`: ask  
  `-D`:Force delete，no ask

# 5 master

master is git default branch, main branch.

- 新创建的 repository 是没有任何 commit 的。但在它创建第一个 commit 时，会把 master 指向它，并把 HEAD 指向 master。  
  ![git_head_after_master_first_commit](/img/git_head_after_master_first_commit.png)
- git clone 时，除了从远程仓库把.git 这个仓库目录下载到工作目录中，还会 checkout master.  
  checkout?  
  把某个 commit 作为当前 commit，把 HEAD 移动过去，并把工作目录的文件内容替换成这个 commit 所对应的内容）。  
  ![git_head_when_clone_and_checkout.png](/img/git_head_when_clone_and_checkout.png)

# Refs

- https://www.jianshu.com/p/308d2cdf5b99
