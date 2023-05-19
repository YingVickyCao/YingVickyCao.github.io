# 配置

# 1 Configure Git

## Set configuration

config 的三个作用域：

```
$ git config --local     // For the  respository, Default
$ git config --global    // For current user, often used
$ git config --system    // For all login users in system, Never
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
```

```
// get
// 只查看local的name
$ git config --local user.name
hello
```
