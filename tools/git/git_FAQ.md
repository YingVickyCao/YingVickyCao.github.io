# Git FAQ

# 1 ERROR: git push, `Reject for behind`.Then git pull,`refusing to merge unrelated histories`

```
$ git push origin master
To https://github.com/USERNAME/REPO.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://github.com/USERNAME/REPO.git'
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
Step3: git remote add origin https://github.com/USERNAME/REPO.git
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

# 4 ERROR:`$ git push origin master`,Access denied: Repository Not Found

```
Access denied: Repository Not Found
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

Solution:
Check remote repository = .git/config

# 5 ERROR:`Bitbucket: Unauthorized`

```
git push
Unauthorized
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

Step 1 : Delete 公钥 from REPO.  
REPO -> Repository Settings -> Access keys  
**Use access keys to gain read-only access to this repository.**

Step 2 : Add 公钥 to profile  
Your profile -> Personal Settings -> SSH-Keys

# 6 [Github] Github pushed error:`Authentication failed. Some common reasons includes`

Reason 1:

```
$ ssh -T git@github.com
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:uNiVztksCsDhcc0u9e8BujQXVUpKZIDTMczCvj3tD2s.
Please contact your system administrator.
Add correct host key in /Users/account/.ssh/known_hosts to get rid of this message.
Offending RSA key in /Users/account/.ssh/known_hosts:1
Host key for github.com has changed and you have requested strict checking.
Host key verification failed.
```

Fix:  
clear `/Users/account/.ssh/known_hosts`, then use GithubDesktop to push, and `known_hosts` will be auto written.

Solution 2:

```
$ ssh -T git@github.com
git@github.com: Permission denied (publickey)
=> SSH error
```

Fix :  
Generate SSH key, then upload to github

```
$ ssh -T git@github.com
Hi User! You've successfully authenticated, but GitHub does not provide shell access.
=> worked
```

# 7 git push to Github failed, error "Support for password authentication was removed on August 13, 2021."

```
$ git push origin master
Username for 'https://github.com': USERNAME
Password for 'https://USERNAME@github.com':
remote: Support for password authentication was removed on August 13, 2021.
remote: Please see https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls for information on currently recommended modes of authentication.
fatal: Authentication failed for 'https://github.com/USERNAME/REPO.git'
```

Fix :

First,genetate new token for your account (https://github.com/settings/tokens -> "Personal access tokens").  
Then, then input you token when uses git command.

```
// For example
$ git clone https://github.com/USERNAME/REPO.git
Username: YOUR_USERNAME
Password: YOUR_TOKEN
```

Ref:  
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#using-a-personal-access-token-on-the-command-line


# 8 每次git pull 提示"Enter passphrase for key `/Users/account/.ssh/id_rsa'`?

Reason : create SSH key时，设置本地的SSH 密码。    
Fix:    
删除 ~/.ssh 文件夹，重新设置SSH，设置时不要设置任何密码，直接回车。     