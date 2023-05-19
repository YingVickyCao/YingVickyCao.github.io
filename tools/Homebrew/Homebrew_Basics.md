# Homebrew Basics

# [1 Homebrew Install](Homebrew_Setup.md)

# 2 Homebew Uninstall

- Method 1 :

```
/usr/bin/ruby -e "\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
```

- Method 2 : Run downloaded uninstall script.  
  Download the uninstall script and run ./uninstall --help to view more uninstall options.

```
cd ~
curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall>> brew_uninstall
```

OR  
 https://raw.githubusercontent.com/Homebrew/install/master/uninstall

OR  
 [brew_uninstall](brew_uninstall)

```
$ cd ~
$ ./uninstall
$/usr/bin/ruby brew_uninstall
```

# 3 Homebew Usages

## Where does stuff get downloaded?

```
$ brew --cache
~/Library/Caches/Homebrew
```

## Install package

```
brew install wget
```

- Homebrew installs packages to their own directory and then symlinks their files into /usr/local.

```
$ cd /usr/local
$ find Cellar
Cellar/wget/1.16.1
Cellar/wget/1.16.1/bin/wget
Cellar/wget/1.16.1/share/man/man1/wget.1

$ ls -l bin
bin/wget -> ../Cellar/wget/1.16.1/bin/wget

```

- ERROR: Your Xcode (10.1) is too outdated.

```
$ brew install hg
Error: Your Xcode (10.1) is too outdated.
Please update to Xcode 10.2.1 (or delete it).
Xcode can be updated from the App Store.
```

Reason :  
`Command line for XCode 10.1` for `XCode 10.1` is outdated.

Fix:  
Uninstall XCode 10.1.  
Install XCode 10.2.1.  
Install `Command line for XCode 10.2.1`

## Uninstall package

```
brew uninstall wget
```

- uninstall old versions of a formula (formula means package)
  Homebrew’s default behaviour automatically uninstalls old versions of a formula every 30 days.

To remove them manually, simply use:

```
brew cleanup <formula>
```

or clean up everything at once:

```
brew cleanup
```

or to see what would be cleaned up:

```
brew cleanup -n
```

or to disable automatic brew cleanup:

```
export HOMEBREW_NO_INSTALL_CLEANUP=1
```

## Search avaiable package

```
brew search wget
```

## 查看已安装包列表

```
$ brew list
```

## 查看任意包信息

```
$ brew info wget

# 用浏览器打开官方网页查看软件信息
$ brew home wget
```

## Update Homebrew iteself

```
# First update the formulae and Homebrew itself:
# 更新 Homebrew 自己，包括它所依赖的包

$ brew update
```

## Update my local packages

```
# Update all local packages
$ brew upgrade

# Update a specific local package
$ brew upgrade wget
```

## Find out what is outdated in my local packages

```
brew outdated
```

## Stop certain formulae from being updated

```
# To stop something from being updated/upgraded:
$ brew pin wget

# To allow that formulae to update again:
$ brew unpin wget

```

## Check Homebrew version

```
$ brew -v
```

## Homebrew Help info

```
$ brew -h
```

# 4 设置 Homebrew 镜像

```
$ brew --repo
/usr/local/Homebrew

$ brew --repo homebrew/core
/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core

$ brew --repo homebrew/cask
/usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask
```

| Homebrew 镜像    | Origin                                        | tsinghua                                                            | ustc                                          |
| ---------------- | --------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------- |
| brew             | https://github.com/Homebrew/brew.git          | https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git          | https://mirrors.ustc.edu.cn/brew.git          |
| homebrew/core    | https://github.com/Homebrew/homebrew-core.git | https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git | https://mirrors.ustc.edu.cn/homebrew-core.git |
| homebrew/cask    | https://github.com/Homebrew/homebrew-cask.git | https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git | https://mirrors.ustc.edu.cn/homebrew-cask.git |
| Homebrew-bottles | https://homebrew.bintray.com/bottles          | https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles               | https://mirrors.ustc.edu.cn/homebrew-bottles  |

## Origin

### Homebrew 的 formula 索引的镜像

```
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git

brew update
```

### Homebrew-bottles 镜像

```
Step 1:
$ open ~/.bash_profile

Step 2: Remove HOMEBREW_BOTTLE_DOMAIN
# .bash_profile
# HOMEBREW_BOTTLE_DOMAIN

Step 3 :
$ source ~/.bash_profile
```

## tsinghua

### Homebrew 的 formula 索引的镜像

```
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git

brew update
```

<h3 id='brew_set_bintray_mirrors'>Homebrew-bottles 镜像</h3>

Homebrew-bottles 镜像.  
该镜像是 Homebrew 二进制预编译包的镜像

- 临时替换

```
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
```

- 长期替换

```
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

# 5 Taps(third-party-repositories)

```
#  添加第三方仓库
$ brew tap <gihhub_user/repo>
e.g. brew tap denji/homebrew-nginx
```

```
# Update and List tapped repos
$ brew tap
denji/nginx
homebrew/core	// Default repo
```

```
# Remove installed repo
brew untap <gihhub_user>/<repo>
```

# Refs

- [Homebrew GitHub](https://github.com/Homebrew/brew)
- [Homebrew WebSite](https://brew.sh/)
- [uninstall Homebrew](https://docs.brew.sh/FAQ#how-do-i-uninstall-homebrew)
- [Bottles (binary packages)](https://homebrew.bintray.com/bottles)
  https://docs.brew.sh/Bottles.html
  https://bintray.com/homebrew
- [Homebrew 镜像使用帮助](https://mirror.tuna.tsinghua.edu.cn/help/homebrew/)
- [ustc Homebrew 源使用帮助](https://mirrors.ustc.edu.cn/help/brew.git.html)
- https://blog.csdn.net/jt521xlg/article/details/47129869
- https://blog.csdn.net/huangdingsheng/article/details/83385992
- [Taps](https://github.com/Homebrew/brew/blob/master/docs/Taps.md)
