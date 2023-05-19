# Homebrew Setup

Homebrew 是 Mac 系统的包管理器，用于安装 NodeJS 和一些其他必需的工具软件。

# 安装方式 1 (Depressed)

```
// Install Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew -v
brew help
```

## 问题 1：`Permission denied`

```
npm WARN checkPermissions missing write access to /usr/local/Homebrew/.git/branches/
ERROR: EACCESS:permission denied, access 'Permission denied'
```

- solution1: whoami

```
Step1: Account = Admin
Step2: sudo chown -R $(whoami) /usr/local/Homebrew
```

- solution2: sudo

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 问题 2：`can not reslove host:raw.githubusercontent.com`

https://blog.csdn.net/jameskaron/article/details/84923370

```
Step1: save as brew_install.rb
https://raw.githubusercontent.com/Homebrew/install/master/install

Step2: test curl
$ curl
curl: try 'curl --help' or 'curl --manual' for more information

Step3: Go to brew_install.rb dir. Run bellow.
ruby brew_install.rb
```

## 问题 3：`Could not resolve host: github.com`

```
fatal: unable to access 'https://github.com/Homebrew/brew/': Could not resolve host: github.com
Failed during: git fetch origin master:refs/remotes/origin/master --tags --force

```

```ini
# Ref: https://www.jianshu.com/p/f10ea7b96825

ping github.com  // 192.30.255.113
/
192.30.255.113   // 网站

# /etc/hosts
192.30.255.113 github.com
```

## 问题 4:`Installing Command Line Tools`

```
==> Installing Command Line Tools (macOS Mojave version 10.14) for Xcode-10.3
==> /usr/bin/sudo /usr/sbin/softwareupdate -i Command\ Line\ Tools\ (macOS\ Mojave\ version\ 10.14)\ for\ Xcode-10.3
Software Update Tool
```

Fix:  
「Xcode」-「Open Developer Tool」-「More Developer Tools」->登陆 appleID,Choose 对应版本的 Command Line Tools

![install_homebrew_4_Command_Line_Tools](/img/install_homebrew_4_Command_Line_Tools.jpg)

## 问题 5: `error: RPC failed; curl 18 transfer closed with outstanding read data remaining`

```
Press RETURN to continue or any other key to abort
==> Downloading and installing Homebrew...

remote: Enumerating objects: 128145, done.
error: RPC failed; curl 18 transfer closed with outstanding read data remaining
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
Failed during: git fetch origin master:refs/remotes/origin/master --tags --force
```

Reason 1: 因是项目太久，tag 资源文件太大. ->缓存区溢出  
Solution 1: `git config --global http.postBuffer 5242880000` (not fixed)

Reason 2: 网络下载速度缓慢
Solution 2:

```
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999

# 如果依旧clone失败，则首先浅层clone，然后更新远程库到本地
git clone http://gitlab.xxx.cn/yyy/zzz.git --depth=1
```

Solutioin 3: clone by HTTPS -> SSH

# 安装方式 2 (Depressed. brew command lives on Terminal temp window )

Refs:  
https://blog.csdn.net/liumiaocn/article/details/102961843  
https://docs.brew.sh/Homebrew-on-Linux

```
Step 1:
# Recommended
git clone git@github.com:Homebrew/brew.git ~/.linuxbrew/Homebrew
# Recommended
git clone git@gitee.com:YingVickyCao/brew.git ~/.linuxbrew/Homebrew
git clone https://github.com/Homebrew/brew ~/.linuxbrew/Homebrew
git clone git@github.com:YingVickyCao/brew.git ~/.linuxbrew/Homebrew

mkdir ~/.linuxbrew/bin
ln -s ~/.linuxbrew/Homebrew/bin/brew ~/.linuxbrew/bin
eval $(~/.linuxbrew/bin/brew shellenv)

Step 2:
brew -v
```

## 问题 1 ： `portable-ruby-2.6.3.mavericks.bottle.tar.gz curl: (56) LibreSSL SSL_read: SSL_ERROR_SYSCALL, errno 54`

```
$ brew -v
==> Downloading https://homebrew.bintray.com/bottles-portable-ruby/portable-ruby-2.6.3.mavericks.bottle.tar.gz
####                                                                       5.7%
curl: (56) LibreSSL SSL_read: SSL_ERROR_SYSCALL, errno 54
Error: Checksum mismatch.
Expected: ab81211a2052ccaa6d050741c433b728d0641523d8742eef23a5b450811e5104
  Actual: 72aafbfea166db678b988fef82569e92a5a05e50d09715e5d5a8ec326f2042f5
 Archive: /Users/account/Library/Caches/Homebrew/portable-ruby-2.6.3.mavericks.bottle.tar.gz
To retry an incomplete download, remove the file above.
Error: Failed to install vendor Ruby.

$ brew -v
==> Downloading https://homebrew.bintray.com/bottles-portable-ruby/portable-ruby-2.6.3.mavericks.bottle.tar.gz
Already downloaded: /Users/account/Library/Caches/Homebrew/portable-ruby-2.6.3.mavericks.bottle.tar.gz
Error: Checksum mismatch.
Expected: ab81211a2052ccaa6d050741c433b728d0641523d8742eef23a5b450811e5104
  Actual: 72aafbfea166db678b988fef82569e92a5a05e50d09715e5d5a8ec326f2042f5
 Archive: /Users/account/Library/Caches/Homebrew/portable-ruby-2.6.3.mavericks.bottle.tar.gz
To retry an incomplete download, remove the file above.
Error: Failed to install vendor Ruby.
```

Reason :

Brew is dependent on ruby (`portable-ruby-2.6.3.mavericks.bottle.tar.gz`).  
When everytime using brew, brew auto checks updating iteself.( [ruby 2.6.0](https://github.com/Homebrew/brew/tree/master/Library/Homebrew/vendor/bundle/ruby/2.6.0) -> 2.6.3 )
See

Solution 1 :[更新]

```
$ rm /Users/account/Library/Caches/Homebrew/portable-ruby-2.6.3.mavericks.bottle.tar.gz

$ brew -v
==> Downloading https://homebrew.bintray.com/bottles-portable-ruby/portable-ruby-2.6.3.mavericks.bottle.tar.gz
######################################################################## 100.0%
==> Pouring portable-ruby-2.6.3.mavericks.bottle.tar.gz
Homebrew 2.2.0-70-g2fe99bd
Homebrew/homebrew-core N/A

$ brew -v
Homebrew 2.2.0-70-g2fe99bd
Homebrew/homebrew-core N/A
```

```
# portable-ruby-2.6.3.mavericks.bottle.tar.gz is installed on:
# ~/.linuxbrew/Homebrew⁩/⁨Library⁩/⁨Homebrew⁩/⁨vendor⁩/⁨portable-ruby⁩/2.6.3/
# ~/.linuxbrew/Homebrew⁩/⁨Library⁩/⁨Homebrew⁩/⁨vendor⁩/⁨portable-ruby⁩/2.6.3/bin

# vs

$ ruby -v
ruby 2.3.7p456 (2018-03-28 revision 63024) [universal.x86_64-darwin18]
# mac default installed ruby
# /System/Library/Frameworks/Ruby.framework/Versions/Current
# /System/Library/Frameworks/Ruby.framework/Versions/Current(2.3)/usr/bin
```

Solution 2 : [不更新] Control + C 取消更新  
中断更新，中断之后安装继续

```
$ brew install automake
Updating Homebrew...
^C

==> Installing dependencies for automake: autoconf
==> Installing automake dependency: autoconf
==> Downloading https://homebrew.bintray.com/bottles/autoconf-2.69.high_sierra.bottle.4.tar.gz
...省略
==> Caveats
==> autoconf
Emacs Lisp files have been installed to:
  /usr/local/share/emacs/site-lisp/autoconf

```

Solution 3 : [不更新] 临时禁用 Homebrew 更新

```
$ export HOMEBREW_NO_AUTO_UPDATE=true
$ brew install automake
Warning: automake 1.16.1 is already installed and up-to-date
To reinstall 1.16.1, run `brew reinstall automake`
```

# uninstall Homebrew

```
ruby -e "\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
```

# 安装方式 3 (Recommended)

https://www.jianshu.com/p/6523d3eee50d

- Step 1 ：Get install file from command

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew

Press RETURN to continue or any other key to abort
==> Downloading and installing Homebrew...
==> Downloading and installing Homebrew...
remote: Enumerating objects: 34, done.
remote: Counting objects: 100% (34/34), done.
remote: Compressing objects: 100% (31/31), done.
remote: Total 129566 (delta 12), reused 10 (delta 3), pack-reused 129532
Receiving objects: 100% (129566/129566), 30.93 MiB | 31.00 KiB/s, done.
Resolving deltas: 100% (95077/95077), done.
From https://github.com/Homebrew/brew
```

Press any key to to abort

`->`

```
cd ~
curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install >> brew_install
```

`/`  
Put https://raw.githubusercontent.com/Homebrew/install/master/install in Chrome, and save as brew_install

`/`

[brew_install](brew_install)

- Step 2 : Edit brew_install  
  替换 homebrew 源

```
# brew_install
BREW_REPO = "https://github.com/Homebrew/brew".freeze
```

`->`

```
# BREW_REPO = "https://github.com/Homebrew/brew".freeze
# BREW_REPO = "git@github.com:Homebrew/brew.git".freeze
BREW_REPO = "git@gitee.com:YingVickyCao/brew.git".freeze
```

- Step 3 : Install `$/usr/bin/ruby ~/brew_install`  
  When Cloning `homebrew-core`, Press `Ctrl+C` to abort

```
$/usr/bin/ruby ~/brew_install
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew

Press RETURN to continue or any other key to abort
==> Downloading and installing Homebrew...
From gitee.com:YingVickyCao/brew
 + 701616736...2fe99bd98 master     -> origin/master  (forced update)
HEAD is now at 2fe99bd98 Merge pull request #6820 from vitorgalvao/cask-version-mmp-regex
==> Tapping homebrew/core
Cloning into '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core'...
^C
/Users/account/brew_install:67:in `system': Interrupt
	from /Users/account/brew_install:67:in `system'
	from /Users/account/brew_install:349:in `block in <main>'
	from /Users/account/brew_install:331:in `chdir'
	from /Users/account/brew_install:331:in `<main>'
```

- Step 4 : Clone `homebrew-core`  
  替换 homebrew-core 源  
  `/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core`

```
cd /usr/local/Homebrew/Library/Taps/homebrew/
/
cd "$(brew --repo)/Library/Taps/homebrew"

# git clone git@github.com:Homebrew/homebrew-core.git       (Recommended)
# git clone https://github.com/Homebrew/homebrew-core.git   (Depressed)
git clone git@gitee.com:YingVickyCao/homebrew-core.git      (Recommended)
```

- Step 5 : Retry Install `$/usr/bin/ruby ~/brew_install`  
  Install success

```
$ /usr/bin/ruby ~/brew_install
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew

Press RETURN to continue or any other key to abort
==> Downloading and installing Homebrew...
HEAD is now at 2fe99bd98 Merge pull request #6820 from vitorgalvao/cask-version-mmp-regex
Already up-to-date.
==> Installation successful!

==> Homebrew has enabled anonymous aggregate formulae and cask analytics.
Read the analytics documentation (and how to opt-out) here:
  https://docs.brew.sh/Analytics

==> Homebrew is run entirely by unpaid volunteers. Please consider donating:
  https://github.com/Homebrew/brew#donations
==> Next steps:
- Run `brew help` to get started
- Further documentation:
    https://docs.brew.sh
```

```
$ brew -v
Homebrew 2.2.1
Homebrew/homebrew-core (git revision 77cdb; last commit 2019-12-09)
```

- Step 6 : 设置 bintray 镜像

```
$ brew install hg
==> Installing dependencies for mercurial: gdbm, openssl@1.1, readline, sqlite, xz and python
==> Installing mercurial dependency: gdbm
==> Downloading https://homebrew.bintray.com/bottles/gdbm-1.18.1.mojave.bottle.1.tar.gz
Already downloaded: /Users/account/Library/Caches/Homebrew/downloads/440b98240182d9fb5393666ca9f5411d864e84cbe189634ead14754dc3dd3712--gdbm-1.18.1.mojave.bottle.1.tar.gz
==> Pouring gdbm-1.18.1.mojave.bottle.1.tar.gz
🍺  /usr/local/Cellar/gdbm/1.18.1: 20 files, 586.8KB
==> Installing mercurial dependency: openssl@1.1

# Ctrl + C
^C
```

[设置 bintray 镜像](Homebrew_Basics.md#Hbrew_set_bintray_mirrors)

```
$ brew install hg
==> Installing dependencies for mercurial: openssl@1.1, readline, sqlite, xz and python
==> Installing mercurial dependency: openssl@1.1
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/openssl@1.1-1.1.1d.mojave.bottle.tar.gz
######################################################################## 100.0%
==> Pouring openssl@1.1-1.1.1d.mojave.bottle.tar.gz
==> Caveats
A CA file has been bootstrapped using certificates from the system
keychain. To add additional certificates, place .pem files in
  /usr/local/etc/openssl@1.1/certs

and run
  /usr/local/opt/openssl@1.1/bin/c_rehash

openssl@1.1 is keg-only, which means it was not symlinked into /usr/local,
because openssl/libressl is provided by macOS so don't link an incompatible version.

If you need to have openssl@1.1 first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"' >> ~/.bash_profile

For compilers to find openssl@1.1 you may need to set:
  export LDFLAGS="-L/usr/local/opt/openssl@1.1/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl@1.1/include"

==> Summary
🍺  /usr/local/Cellar/openssl@1.1/1.1.1d: 7,983 files, 17.9MB
==> Installing mercurial dependency: readline
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/readline-8.0.1.mojave.bottle.tar.gz
######################################################################## 100.0%
==> Pouring readline-8.0.1.mojave.bottle.tar.gz
==> Caveats
readline is keg-only, which means it was not symlinked into /usr/local,
because macOS provides the BSD libedit library, which shadows libreadline.
In order to prevent conflicts when programs look for libreadline we are
defaulting this GNU Readline installation to keg-only.

For compilers to find readline you may need to set:
  export LDFLAGS="-L/usr/local/opt/readline/lib"
  export CPPFLAGS="-I/usr/local/opt/readline/include"

==> Summary
🍺  /usr/local/Cellar/readline/8.0.1: 48 files, 1.5MB
==> Installing mercurial dependency: sqlite
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/sqlite-3.30.1.mojave.bottle.tar.gz
######################################################################## 100.0%
==> Pouring sqlite-3.30.1.mojave.bottle.tar.gz
==> Caveats
sqlite is keg-only, which means it was not symlinked into /usr/local,
because macOS provides an older sqlite3.

If you need to have sqlite first in your PATH run:
  echo 'export PATH="/usr/local/opt/sqlite/bin:$PATH"' >> ~/.bash_profile

For compilers to find sqlite you may need to set:
  export LDFLAGS="-L/usr/local/opt/sqlite/lib"
  export CPPFLAGS="-I/usr/local/opt/sqlite/include"

==> Summary
🍺  /usr/local/Cellar/sqlite/3.30.1: 11 files, 3.9MB
==> Installing mercurial dependency: xz
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/xz-5.2.4.mojave.bottle.tar.gz
######################################################################## 100.0%
==> Pouring xz-5.2.4.mojave.bottle.tar.gz
🍺  /usr/local/Cellar/xz/5.2.4: 92 files, 1MB
==> Installing mercurial dependency: python
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/python-3.7.5.mojave.bottle.tar.gz
######################################################################## 100.0%
==> Pouring python-3.7.5.mojave.bottle.tar.gz
==> /usr/local/Cellar/python/3.7.5/bin/python3 -s setup.py --no-user-cfg install --force --verbose --install-scripts=/usr/local/Cellar/python/3.7.5/bin --install-lib=/usr/local/lib/python3.7/site-packag
==> /usr/local/Cellar/python/3.7.5/bin/python3 -s setup.py --no-user-cfg install --force --verbose --install-scripts=/usr/local/Cellar/python/3.7.5/bin --install-lib=/usr/local/lib/python3.7/site-packag
==> /usr/local/Cellar/python/3.7.5/bin/python3 -s setup.py --no-user-cfg install --force --verbose --install-scripts=/usr/local/Cellar/python/3.7.5/bin --install-lib=/usr/local/lib/python3.7/site-packag
==> Caveats
Python has been installed as
  /usr/local/bin/python3

Unversioned symlinks `python`, `python-config`, `pip` etc. pointing to
`python3`, `python3-config`, `pip3` etc., respectively, have been installed into
  /usr/local/opt/python/libexec/bin

If you need Homebrew's Python 2.7 run
  brew install python@2

You can install Python packages with
  pip3 install <package>
They will install into the site-package directory
  /usr/local/lib/python3.7/site-packages

See: https://docs.brew.sh/Homebrew-and-Python
==> Summary
🍺  /usr/local/Cellar/python/3.7.5: 3,972 files, 60.7MB
==> Installing mercurial
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/mercurial-5.2_1.mojave.bottle.tar.gz
######################################################################## 100.0%
==> Pouring mercurial-5.2_1.mojave.bottle.tar.gz
==> Caveats
Bash completion has been installed to:
  /usr/local/etc/bash_completion.d

zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
🍺  /usr/local/Cellar/mercurial/5.2_1: 638 files, 10.4MB
==> Caveats
==> openssl@1.1
A CA file has been bootstrapped using certificates from the system
keychain. To add additional certificates, place .pem files in
  /usr/local/etc/openssl@1.1/certs

and run
  /usr/local/opt/openssl@1.1/bin/c_rehash

openssl@1.1 is keg-only, which means it was not symlinked into /usr/local,
because openssl/libressl is provided by macOS so don't link an incompatible version.

If you need to have openssl@1.1 first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"' >> ~/.bash_profile

For compilers to find openssl@1.1 you may need to set:
  export LDFLAGS="-L/usr/local/opt/openssl@1.1/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl@1.1/include"

==> readline
readline is keg-only, which means it was not symlinked into /usr/local,
because macOS provides the BSD libedit library, which shadows libreadline.
In order to prevent conflicts when programs look for libreadline we are
defaulting this GNU Readline installation to keg-only.

For compilers to find readline you may need to set:
  export LDFLAGS="-L/usr/local/opt/readline/lib"
  export CPPFLAGS="-I/usr/local/opt/readline/include"

==> sqlite
sqlite is keg-only, which means it was not symlinked into /usr/local,
because macOS provides an older sqlite3.

If you need to have sqlite first in your PATH run:
  echo 'export PATH="/usr/local/opt/sqlite/bin:$PATH"' >> ~/.bash_profile

For compilers to find sqlite you may need to set:
  export LDFLAGS="-L/usr/local/opt/sqlite/lib"
  export CPPFLAGS="-I/usr/local/opt/sqlite/include"

==> python
Python has been installed as
  /usr/local/bin/python3

Unversioned symlinks `python`, `python-config`, `pip` etc. pointing to
`python3`, `python3-config`, `pip3` etc., respectively, have been installed into
  /usr/local/opt/python/libexec/bin

If you need Homebrew's Python 2.7 run
  brew install python@2

You can install Python packages with
  pip3 install <package>
They will install into the site-package directory
  /usr/local/lib/python3.7/site-packages

See: https://docs.brew.sh/Homebrew-and-Python
==> mercurial
Bash completion has been installed to:
  /usr/local/etc/bash_completion.d

zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
```

[Check Python verson](/doc/tech/python/setup/Python_Setup.md#check_python_version)

## ERROR:

```
$ Install $/usr/bin/ruby ~/brew_install

xcode-select: error: invalid developer directory ‘/Library/Developer/CommandLineTools’
Failed during: /usr/bin/sudo /usr/bin/xcode-select --switch /Library/Developer/CommandLineTools
```

**Reason**:  
need git: _/Library/Developer/CommandLineTool_ is not exist, or it does not have git.

**Fix**:

Way 1 :Install tools.

xcode-select --install  
/  
https://developer.apple.com/download/more/

Way 2 :

```
$ xcode-select -p
/Applications/Xcode.app/Contents/Developer

# brew_install
/Library/Developer/CommandLineTools
->
/Applications/Xcode.app/Contents/Developer
```

Way 3 :

```
$ which git
/usr/bin/git

# brew_install
/Library/Developer/CommandLineTools
->
/usr/bin/git
```
