# SQLite

- Test Android Device:`Android 8.0`
- `android.xlsx` - DB page
- `TestSQLiteActivity.java`

# 1 SQLite

- Android Use sqlite3
- 跨平台
- Android 运行时集成了 SQLite，每个应用都可以使用
- 支持基本 SQL 语法
- 轻量级数据库：  
  1）少量量数据  
  2）一个数据库文件
- 支持 ACID 关系型数据库管理系统
- 开源
- 嵌入的数据库引擎
- 安全性  
  通过数据库级的共享锁来独立处理事务。对于同一个数据库，多个进程可以同时读，但只能有一个写。
- 事务处理

## SQLite database file formart is B Tree

- 多个多重 Btree => .db file
- 索引采用 B-tree, 表采用 B+tree

## SQLite VS Other SQL database

**Other SQL database:**

- Most SQL database engines uses static, rigid typing.
- With static typing, the datatype of a value is determined by its container - the particular column in which the value is stored.

**SQLite:**

- SQLite uses a more general dynamic type system
  In SQLite, the datatype of a value is associated with the value itself, not with its container.
- The dynamic type system of SQLite is backwards compatible with the more common static type systems of other database engines in the sense
- the dynamic typing in SQLite allows it to do things which are not possible in traditional rigidly typed databases.

## SQLite Storage Classes and Datatypes

### Storage Classes

Five：  
NULL,INTEGER,REAL,TEXT,BLOB

- REAL: float point value
- A storage class:for store in disk

## Database debuggin

- sqlite3 is in SDK dir
- use adb shell to start sqlite3

### Datatypes

- a datatype: for memory processing
- When load into memory, storage class =>(max size) datatype

### Boolean Datatype

SQLite does not have a separate Boolean storage class.  
=> INTEGER:0 (false) and 1 (true)

### Date and Time Datatype

SQLite does not have a storage class set aside for storing dates and/or times.  
=> INTEGER,REAL,TEXT

# 2 Android Access SQLite databases API

**_highly recommend using Room instead of SQLite_**

### 1. SQLite: Depressed

**_android.database.sqlite_**

- time consuming
- no compile-time verification of raw SQL querie

### 2. Room：highly recommend

- Easy use：object-mapping abstraction layer
- compile-time verification of raw SQL querie

# 3 android.database vs android.database.sqlite

## android.database

explore data returned through a content provider.

## android.database.sqlite

manage private databases With / Not with Content Providers

# 4 Where is SQLite batabase file?

`/data/user/0/<package_name>/databases/<database_name>.db`

- private  
  Android stores your database in your app's private folder.
- secure  
  Your data is secure, because by default this area is not accessible to other apps or the user.

# [5 SQLiteDatabase](SQLiteDatabase.md)

- SQLiteDatabase 的帮助类 SQLiteOpenHelper

# [6 SQLiteOpenHelper](SQLiteOpenHelper.md)

# [7 ERROR](ERROR.md)

# Refs

- [Room](https://developer.android.google.cn/training/data-storage/room)
- [Save data using SQLite](https://developer.android.google.cn/training/data-storage/sqlite.html)
- [Data and file storage overview-Database](https://developer.android.google.cn/guide/topics/data/data-storage#db)
- [android.database](https://developer.android.google.cn/reference/android/database/package-summary)
- [android.database.sqlite](https://developer.android.google.cn/reference/android/database/sqlite/package-summary)
- [Datatypes In SQLite Version 3](https://www.sqlite.org/datatype3.html)
- [Command Line Shell For SQLite](https://www.sqlite.org/cli.html)
- https://blog.csdn.net/justwanttofly/article/details/78912701
- https://blog.csdn.net/fantianheyey/article/details/9199235
- https://blog.csdn.net/qq_42672839/article/details/81584172
- https://blog.csdn.net/adayabetter/article/details/44516217
- [SQLite 事务、升级数据库](https://www.cnblogs.com/orlion/p/5350683.html)
- [SQLite 数据库的增删改查和事务(transaction)调用](https://www.cnblogs.com/amosli/p/3784998.html)
- [Andrioid SQLite 操作与 SQLiteStatement 关系](https://blog.csdn.net/wangbole/article/details/43196067)
- [SQLite 之 SQLiteStatement](https://blog.csdn.net/u012643122/article/details/45932157)
- [Android 入门(十二)SQLite 事务、升级数据库](https://www.cnblogs.com/orlion/p/5350683.html)
