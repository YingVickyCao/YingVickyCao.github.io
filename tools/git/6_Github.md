# Github

# 1 配置 Github 公钥、私钥

https://docs.github.com/en

# 2 把本地仓库同步到 Github

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

- main 8ea04c3 add 1.txt
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
