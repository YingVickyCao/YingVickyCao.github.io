# FAQ

## [1]Error: This command has to be run with superuser privileges (under the root user on most systems).

```
[cos@localhost ~]$ yum  install zip.x86_64
Error: This command has to be run with superuser privileges (under the root user on most systems).
```

Fix:
当前的用户是普通用户，需要切换为超级用户（root 用户）

```
// 普通用户 -> 超级用户
[cos@localhost ~]$ su root
Password:

// 超级用户 -> 普通用户
[root@localhost cos]# exit
exit
[cos@localhost ~]$

```
