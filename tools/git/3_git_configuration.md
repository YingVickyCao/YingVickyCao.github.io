# Git 配置

# 1 Configure Git

## Config priority (override) from highest to lowest

- Repo level (High)    
 `respo/.git/config`  
	```
	// open configure
	$ git config -e
	```

- User level (Middle)    
（当前）用户级别    
`~/.gitconfig`  

- System level TBD (Lowest)    
系统级别  
`/etc/gitconfig`  
admin 只做一次  

## Set configuration

config 的三个作用域：

```
$ git config --local     // For the  respository, Default
$ git config --global    // For current user, often used
$ git config --system    // For all login users in system, Never
$ git config --global init.defaultBranch <name>   // set default branch name when create a repo
```

Example：

```bash
// 配置用户名和邮箱，表示谁做了代码的变更
$ git config --global user.name 'your_name'
$ git config --global user.email 'your_email@domain.com'
```

```
// configure when init a respository, the name for the initial branch. Names commonly chosen are 'main', 'trunk' and 'development'.
$ git config --global init.defaultBranch main
```

## Show configuration

```
$ git config --list            // All : local + global + system
$ git config --list --local
$ git config --list --global
$ git config --list --system
```

## 以 local config 为例

```
// Open local 的配置文件
$ code .git/config
```

```
// set
$ git config --local user.name "hello"
$ git config --local user.email "hello.abc@abc.com"
```

```
// get
// 查看local的所有配置
$ git config --local --list
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
core.ignorecase=true
core.precomposeunicode=true
user.name=hello
user.email=hello.abc@abc.com
init.defaultbranch=main    // default branch when create a repo
```

```
// get
// 只查看local的name
$ git config --local user.name
hello
```

# 2 Diff and Merge Tool

## 2.1 Beyond Compare as Diff and Merge Tool

Beyond Compare 4  
macOS 10.14

[Using Beyond Compare with Version Control Systems under OS X](https://www.scootersoftware.com/support.php?zz=kb_vcs_osx)

Step 1 : 安装 Beyond Compare 命令工具  
Beyond Compare -> Install Command Line Tools
首先安装 Beyond Compare 命令工具，否则报错

```
The diff tool bc3 is not available as 'bcompare'
fatal: external diff died, stopping at plugins/PushPlugin.m
```

Step 2 : Terminal

```
/ As diff tool
git config --global diff.tool bc3
git config --global difftool.bc3.trustExitCode true   // ?
git config --global difftool.prompt false             // Launch 'bc3' [Y/N]

// As Merge tool
git config --global merge.tool bc3
git config --global mergetool.bc3.trustExitCode true  // ?
git config --global mergetool.prompt false            // Launch 'bc3' [Y/N]
git config --global mergetool.keepBackup false        // Merge confict.  删除解决冲突后生成的备份文件 (*.orig)
```

## 2.2 Vim as Diff and Merge Tool

```
git config --global diff.tool vimdiff
git config --global difftool.prompt false

git config --global merge.tool vimdiff
git config --global mergetool.prompt false

git difftool --tool=vimdiff --no-prompt
```

## 2.3 Android Studio as Diff and Merge Tool

https://gist.github.com/polbins/42a39cb3234e3acfba79

Step 1 : Create Android Studio Command-line Launcher  
Android Studio -> Tools > Create Command-line Launcher,Leave as default, Press OK  
`/usr/local/bin/studio`

Step 2 : Configure Git to use Android Studio as default Diff Tool

```
# ~/.gitconfig
[diff]
   tool = studio
[difftool "studio"]
   cmd = studio diff $(cd $(dirname "$LOCAL") && pwd)/$(basename "$LOCAL") $(cd $(dirname "$REMOTE") && pwd)/$(basename "$REMOTE")

[merge]
   tool = studio
[mergetool "studio"]
   cmd = studio merge $(cd $(dirname "$LOCAL") && pwd)/$(basename "$LOCAL") $(cd $(dirname "$REMOTE") && pwd)/$(basename "$REMOTE") $(cd $(dirname "$BASE") && pwd)/$(basename ~"$BASE") $(cd $(dirname "$MERGED") && pwd)/$(basename "$MERGED")
   trustExitCode = true
```

Step 3:

```
// As diff tool
git config --global diff.tool studio
git config --global difftool.studio.trustExitCode true      // ?
git config --global difftool.prompt false                   // Launch 'bc3' [Y/N]

// As Merge tool
git config --global merge.tool studio
git config --global mergetool.studio.trustExitCode true  	// ?
git config --global mergetool.prompt false            		// Launch 'studio' [Y/N]
git config --global mergetool.keepBackup false  		    // Merge confict.  删除解决冲突后生成的备份文件 (*.orig)
```

Finally:

```
[diff]
	tool = studio
[difftool "studio"]
   cmd = studio diff $(cd $(dirname "$LOCAL") && pwd)/$(basename "$LOCAL") $(cd $(dirname "$REMOTE") && pwd)/$(basename "$REMOTE")
	trustExitCode = true
[difftool]
	prompt = false

[merge]
	tool = studio
[mergetool "studio"]
   cmd = studio merge $(cd $(dirname "$LOCAL") && pwd)/$(basename "$LOCAL") $(cd $(dirname "$REMOTE") && pwd)/$(basename "$REMOTE") $(cd $(dirname "$BASE") && pwd)/$(basename "$BASE") $(cd $(dirname "$MERGED") && pwd)/$(basename "$MERGED")
	trustExitCode = true
[mergetool]
	prompt = false
	keepBackup = false
```

# 3 GitHub 添加 SSH Key

https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/

SSH key 让你在电脑和 Code 服务器之间建立安全的加密连接。  
使用 SSH 协议，可以连接和验证远程服务器和服务。  
使用 SSH 密钥，可以连接到 GitHub，而无需在每次访问时提供您的用户名或密码。

## 查看本地是否存在公钥

```
$ cat ~/.ssh/id_rsa.pub

OR
$ ls ~/.ssh
id_rsa id_rsa.pub
```

没有要生成公钥

## 生成公钥

```
$ ssh-keygen
/
$ ssh-keygen -t rsa -C "youremail" // 执行后创建`~/.ssh` 文件夹

$ ls ~/.ssh
id_rsa				id_rsa.pub			known_hosts
```

## 将 SSH Key 添加到 ssh-agent

- To start the agent

```
// To start the agent
$ eval $(ssh-agent -s)
Agent pid 81996

OR

$ eval `ssh-agent`
Agent pid 81996
```

- Enter ssh-add

```
Linux
$ ssh-add ~/.ssh/id_rsa
Identity added: /Users/account/.ssh/id_rsa (/Users/account/.ssh/id_rsa)

MacOS
ssh-add -K ~/.ssh/id_rsa
```

- MacOS So that your computer remembers your password each time it restarts, open (or create) the ~/.ssh/config file and add these lines to the file:

```
Host *
  UseKeychain yes
```

## 复制公钥

```
clip < ~/.ssh/id_rsa.pub    // 复制到剪贴板 Win7
cat ~/.ssh/id_rsa.pub	    // 复制到剪贴板 Linux
pbcopy < ~/.ssh/id_rsa.pub  // 复制到剪贴板 Mac
/
~/id_rsa.pub                // 打开，then Copy
```

## 添加公钥到相应的 Code 服务器上。

github -> setings--> SSH and GPG keys -> New SSH Key  
https://github.com/settings/keys

github -> setings--> Security Settings -> SSH Key -> Add key  
https://gitee.com/profile/sshkeys

## Verify configuration and username

```
$ ssh -T git@bitbucket.org
$ ssh -T git@github.com
$ ssh -T git@gitee.com
```

- Config config

```
# ~/.ssh/config

# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa

# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
```

- Before Adding SSH Key to GitHub/Gitee

```
$ ssh -T git@github.com
The authenticity of host 'github.com (140.82.114.3)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'github.com,140.82.114.3' (RSA) to the list of known hosts.
git@github.com: Permission denied (publickey).
```

- After Adding SSH Key to GitHub/Gitee

```
$ git clone git@gitee.com:YingVickyCao/ExoPlayer.git
Cloning into 'ExoPlayer'...
The authenticity of host 'gitee.com (212.64.62.174)' can't be established.
ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
Are you sure you want to continue connecting (yes/no)? yes

```

```
$ ssh -T git@github.com
Hi User! You've successfully authenticated, but GitHub does not provide shell access.  // 表示已成功连上github
```

```
$ ssh -T git@gitee.com
Hi user! You've successfully authenticated, but GITEE.COM does not provide shell access.
```

# 4 Configure the submitter information : username, email

要是把本地仓库传到 github 上去，在此之前还要设置 username 和 email，这样 github 每次 commit 都会记录这两项信息。

```
$ git config --global user.name  <username>
$ git config --global user.email <email>
```

# 5 Enable git command color shown

```
$ git config --global color.ui true
```

# 6 Git Push 避免用户名和密码

# 方式 1: Enable command 方式避免用户名和密码

- Edit ~/.git-credentials

```
$ touch .git-credentials

$open .git-credentials
// Input：
https://{user}:{password}@github.com

```

- `$ git config --global credential.helper store`

- Check ~/.gitconfig

```
[credential]
helper = store
```

## 方式 2

使用 Client，例如 GitHUb / SourceTree，避免每次输入

# 7 Git ignore  
`.gitignore`

## Sample

```
.DS_Store     # cache file in OS

*.a               # All files with suffix '.a' are ignored
core.*            # All files with preffix 'core.' are ignored

# Office cache files
# doc/Book1.xlsx    Traceable
# doc/~$Book1.xlsx  Ignored
# Any excel temp files in any dir of this repo will be ignored.
~$*.xls
~$*.xlsx

~$*.docx
~$*.ppt
~$*.pptx

tools/       # Ignore tools dir
log/*        # Ignore all files in log dir, but not log dir itself

/log.log     # Only ignore log.log file in root repo dir, not ignore in other dir

# 最后两条的顺序很重要，必须要先屏蔽所有的，然后才建立特殊不屏蔽的规则
readme.md       # Ignore all files named readme.md
!/readme.md     # Under above ignore rule, not ignore readme.md in root repo dir
```

## 文件格式规范

- 所有空行或#开头的行都会被忽略
- 可以使用标准的 glob 模式匹配
- `/文件(或目录)` : 仓库根目录的对应文件
- `匹配模式/`: 忽略的是目录
- `!匹配模式`:特殊不忽略某个文件或目录
- `*` : 匹配零或多个任意字符
- `[abc]` : 匹配任何一个列在方括号中的字符（匹配一个 a，or 匹配一个 b，or 匹配一个 c）
- `[字符1-字符2]` : 所有在这两个字符范围内的都可以匹配.  
  e.g. `[0-9]`=匹配所有 0 到 9 的数字
- `?` : 只匹配一个任意字

## 3 `.gitignore` Samples in Open Source

https://github.com/github/gitignore

## Refs:

- https://github.com/github/gitignore
- gitignore 文件屏蔽规则 https://www.jianshu.com/p/13612fb4b224
- git 配置忽略文件 https://blog.csdn.net/YYtomorrow/article/details/80866695


# 8 Win7 Git 设置鼠标支持复制粘贴

![git_win7_supoort_paste.png](https://yingvickycao.github.io/img/tools/git/git_win7_supoort_paste.png)

## 9 Git push two repo

http://gist.github.com/rvl/c3f156e117e22a25f242

```
# repo/.git/config

# HttPS. HttPS or SSH
$ git remote add github https://github.com/YingVickyCao/YingVickyCao.github.io.git
$ git remote add gitee https://gitee.com/YingVickyCao/YingVickyCao.github.io.git

$ git remote set-url --add --push origin https://github.com/YingVickyCao/YingVickyCao.github.io.git
$ git remote set-url --add --push origin https://gitee.com/YingVickyCao/YingVickyCao.github.io.git

# Usage
# Github desktop only can push to GitHub, because push by API.
# Github + Gitee
$ git push origin master

# Github
$ git push github master

$ Gitee
$ git push gitee master

$ git pull github master
$ git pull gitee master
```

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
	url = https://github.com/YingVickyCao/YingVickyCao.github.io.git
	fetch = +refs/heads/*:refs/remotes/origin/*

[branch "master"]
	remote = origin
	merge = refs/heads/master
```

`->`

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
	url = https://github.com/YingVickyCao/YingVickyCao.github.io.git
	fetch = +refs/heads/*:refs/remotes/origin/*
	pushurl = https://github.com/YingVickyCao/YingVickyCao.github.io.git
	pushurl = https://gitee.com/YingVickyCao/YingVickyCao.github.io.git

[remote "github"]
	url = https://github.com/YingVickyCao/YingVickyCao.github.io.git
	fetch = +refs/heads/*:refs/remotes/github/*

[remote "gitee"]
	url = https://gitee.com/YingVickyCao/YingVickyCao.github.io.git
	fetch = +refs/heads/*:refs/remotes/gitee/*

[branch "master"]
	remote = origin
	merge = refs/heads/master

```
