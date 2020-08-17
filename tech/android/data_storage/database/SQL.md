# SQL

# 1 SQL Language

[数据库必会必知 之 SQL 四种语言：DDL DML DCL TCL](https://www.cnblogs.com/Alandre/p/5572720.html)

![SQL language](https://yingvickycao.github.io/img/android/DataAcess/database/sql.png)

## DDL

- Data Definition Language
- 数据库定义语言：定义数据库的结构
- Include: CREATE,ALTER,DROP

## DML

- Data Manipulation Language == CRUD
- 数据库操作语言：SQL 中处理数据库中的数据

## DCL

- Data Control Language
- 数据库控制语言：授权，角色控制等
- Include: GRANT,REVOKE

## TCL

- Transaction Control Language
- 事务控制
- Include: COMMIT,SAVEPOINT,ROLLBACK,SET TRANSACTION

# 2 事务(Transaction)

- 什么是事务？  
  将多件事情当作一件事情来做。

  e.g.,  
  Account A -> B 转账：先扣款 A，再充值 B。

- 好处？  
   (1) 提高处理速度  
   e.g.,  
  不使用事务：默认每一条插入是一个事务，那么 5000 条数据，读写磁盘 5000 次。  
  使用事务： 插入 5000 条是一个事务，读写磁盘 1 次。

  (2) 保证数据一致性  
   让一个事务中的所有操作都成功执行，或者失败，或者所有操作回滚。  
   e.g., 使用 for 循环 insert 大量数据，只有所有数据插入成功才提交事务;否则不提交事务，自动撤销已插入内容。

# 3 When use DB?

Saving data to a database is ideal for repeating or structured data

# 4 Store data

## How to store bitmap or large file?

- save bitmap or large -> file, store path in db.

# Refs

- [数据库必会必知 之 SQL 四种语言：DDL DML DCL TCL](https://www.cnblogs.com/Alandre/p/5572720.html)
