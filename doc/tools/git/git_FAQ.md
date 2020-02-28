# Git FAQ

# 1 ERROR: git push, `Reject for behind`.Then git pull,`refusing to merge unrelated histories`

```
$ git push origin master
To https://github.com/YingVickyCao/TestAndroidAppBundle.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://github.com/YingVickyCao/TestAndroidAppBundle.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
192:TestAndroidAppBundle hades$

$ git pull
fatal: refusing to merge unrelated histories
192:TestAndroidAppBundle hades$
```

Reason：

```
Step1: git init                             // Local create repo
Step2: GitHub create remote repo TestAndroidAppBundle
Step3: git remote add origin https://github.com/YingVickyCao/TestAndroidAppBundle.git
Step4: ERROR: git push origin master -> git pull
```

两个不同的项目，要合并. since git 2.9.2, 要添加 `--allow-unrelated-histories` 告诉 git 允许合并不同项目的不相关历史

Fix:
Fix:

```
$ git --version
git version 2.16.2

$ git pull origin master --allow-unrelated-histories  # 告诉 git 允许合并不同项目的不相关历史
$ git push origin master
```

# 2 ERROR:.git/index.lock

```
$git checkout -b origin/dev dev
fatal: cannot update paths and switch to branch 'origin/dev' at the same time.
Do you intend to checkout 'dev' which can not be resolved as commit?
```

Fix:

```
$git checkout -b dev origin/dev
fata;:unable to create 'XXX/.git/index.lock': File exists.
```

remove index.lock, and try again

# 3 ERROR: Push rejected for repository size exceeds limit

```
remote: This repository(including wiki) size 1032.92 MB, exceeds 1024.00 MB.
remote: Push rejected for repository size exceeds limit.
```

Solution 1 : Remove big files

```
# List big files
$ git rev-list --objects --all | grep -E `git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -10 | awk '{print$1}' | sed ':a;N;$!ba;s/\n/|/g'`
grep: e539f27d4e36c143872170162886b9147313a644: No such file or directory

# Check name for big file
$ git rev-list --objects --all | grep e539f27d4e36c143872170162886b9147313a644
/doc/A.xmind

# Xmind 另存为 -> Delete -> 重新提交
# Dele files from all histroy records in all trees
git log --pretty=oneline --branches -- /doc/A.xmind
```

Solution 2 : Re-create repo, reducing size of git history.

Solution 3 : Clean local git garbage collect

```
# garbage collect
$ git gc

# 本地 git 库进行更彻底清理和优化
$ git gc --aggressive
```

- https://gitee.com/help/articles/4232#article-header0
- https://blog.csdn.net/luchengtao11/article/details/82531044

# ERROR:`$ git push origin master`,Access denied: Repository Not Found

```
Access denied: Repository Not Found
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

Solution:
Check remote repository = .git/config
