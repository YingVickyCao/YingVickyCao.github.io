# Setup RN 4 Android

MacOS = 10.14.5

# Part 1 : Installation

## 1 [Install Homebrew](/doc/tools/Homebrew/Homebrew_Setup.md)

## 2 Instal Node

- https://nodejs.org/en/download/
- https://nodejs.org/en/download/releases/

```
1 brew install node
node -v

2 node.js.pkg 安装

3 升级Node
Step1:brew uninstall node --force
Step2:Download pkg, then install.
// Pkg安装方式，自动配置环境变量
// 不能使用brew install node安装，否则 "You shold change ownership and permissions of usr/local to your account

4 设置npm镜像，加速包下载
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

### 问题 1： for `brew install node`

```
Error: The following directories are not writable by your user:
/usr/local/share/zsh
/usr/local/share/zsh/site-functions

You should change the ownership of these directories to your user.
  sudo chown -R $(whoami) /usr/local/share/zsh /usr/local/share/zsh/site-functions

And make sure that your user has write permission.
  chmod u+w /usr/local/share/zsh /usr/local/share/zsh/site-functions
```

```
Step1: sudo chown -R $(whoami) /usr/local/share/zsh /usr/local/share/zsh/site-functions
Step2: chmod u+w /usr/local/share/zsh /usr/local/share/zsh/site-functions
```

### 问题 2：npm 5.6.0 -> 6.1.0

```
npm -v
5.6.0
-> 6.1.0 ?

node -v
v8.11.2
```

- solution1:

```
npm install -g npm@6.1.0   // solution
npm install -g npm@latest  // upgradle to latest version of npm
npm install -g npm@next    // upgradle to most recent release of npm
```

- solution2: remove and re-install right version node.js.  
  https://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x

Fully remove node.js:  
`sudo rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/{npm*,node*,man1/node*}`  
`sudo rm -rf /usr/local/bin/npm /usr/local/share/man/man1/node* /usr/local/lib/dtrace/node.d ~/.npm ~/.node-gyp`  
`sudo rm -rf /opt/local/bin/node /opt/local/include/node /opt/local/lib/node_modules`  
`sudo rm -rf /usr/local/bin/npm /usr/local/share/man/man1/node.1 /usr/local/lib/dtrace/node.d`

```
// delete any node and node_modules:
1 brew uninstall node
2 /usr/local/lib
3 /usr/local/include
4 /usr/local/bin
5 check Home directory for local or lib or include
```

node-v8.11.2.pkg(npm 5.6.0) -> node-v10.7.0.pkg(npm 6.1.0)  
https://nodejs.org/en/download/releases/

# 3. Install Watchman

```
brew install watchman
```

### 问题 1：`Permission denied`

```
cp: /usr/local/Cellar/openssl/./1.0.2s: Permission denied
sudo chown -R $(whoami) /usr/local/Cellar
```

### 问题 2：`Error: An exception occurred within a child process:RuntimeError: /usr/local/opt/gdbm not present or broken`

```
Updating Homebrew...
==> Installing dependencies for watchman: python
==> Installing watchman dependency: python
==> Downloading https://homebrew.bintray.com/bottles/python-3.7.3.mojave.bottle.tar.gz
==> Downloading from https://akamai.bintray.com/25/25e0099852136c4ef1efd221247d0f67aa71f7b624211b98898f8b46c612f40d?__gda__=exp=1560847337~hmac=09d3cfee425c7315dd19515a6c0fd63912589f5ebdd9cce28b18d
#                                                                          2.0%
curl: (56) LibreSSL SSL_read: SSL_ERROR_SYSCALL, errno 54
Error: Failed to download resource "python"
Download failed: https://homebrew.bintray.com/bottles/python-3.7.3.mojave.bottle.tar.gz
Warning: Bottle installation failed: building from source.
==> Installing dependencies for python: pkg-config
==> Installing python dependency: pkg-config
==> Downloading https://homebrew.bintray.com/bottles/pkg-config-0.29.2.mojave.bottle.tar.gz
==> Downloading from https://akamai.bintray.com/85/85e5bbffb3424f22cd1bf54b69161110481bab100f9abea54e0a0f00fcf761b9?__gda__=exp=1560847753~hmac=3dffe4f4c6567a6376c62d6eb32096f6f0cb1815fe098390a36ee
######################################################################## 100.0%
==> Pouring pkg-config-0.29.2.mojave.bottle.tar.gz
🍺  /usr/local/Cellar/pkg-config/0.29.2: 11 files, 627.2KB
Error: An exception occurred within a child process:
  RuntimeError: /usr/local/opt/gdbm not present or broken
Please reinstall gdbm. Sorry :(
```

```
Step1: brew cleanup gdbm
Step2: brew install gdbm
    Warning: gdbm 1.18.1 is already installed, it's just not linked
    You can use `brew link gdbm` to link this version
Step3:brew link gdbm
```

# 4. Install React Native command line interface

```
npm install -g react-native-cli
```

# 5. Install Java

JDK >= 1.8

# 6. Install WebStorm / Visual Studio Code

# 7. Install Android Studio

# 8. Install Gradle

# Refs:

- https://reactnative.cn/docs/running-on-device/
- [Homebrew](https://brew.sh/)
- [ReactNative ](http://facebook.github.io/react-native/)
- [ReactNative cn](https://reactnative.cn/)
- [ Android studio 升级 3.0 后 ReactNative 打包报错 Could not find com.android.tools.build:gradle:3.0.0.](https://blog.csdn.net/qq_22653803/article/details/78380172)
