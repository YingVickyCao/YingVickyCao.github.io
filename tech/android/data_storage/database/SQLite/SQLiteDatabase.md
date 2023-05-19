# SQLiteDatabase

- SQLiteDatabase 的帮助类 SQLiteOpenHelper

# 1 CRUD

`CRUD` = create, retrieve,update, delete

create = insert()  
retrieve = rawQuery/query()  
update = update()  
delete = delete()

## Insert

```
// @1. Insert the new row, returning the primary key value of the new row
// @2: Tells the framework what to do in the event that the ContentValues is empty
public long insert(String table, String nullColumnHack, ContentValues values)
```

## Query

```
Cursor rawQuery(String sql, String[] selectionArgs)


// @2: The array of columns to return (pass null to get all)
// @3 selection:The columns for the WHERE clause
// @4 selectionArgs:The values for the WHERE clause
Cursor query(String table, String[] columns, String selection,  String[] selectionArgs, String groupBy, String having, String orderBy)
```

- WHERE = selection and selectionArgs
- rawQuery vs query  
   rawQuery:  
   直接使用 SQL 语句进行查询  
   不推荐。拼接时容易拼错

  query:  
   Android 封装的查询 API.  
   推荐。封装了拼接，简化了拼接，不易出错。

  PS:  
   网上评测：rawQuery 性能效率比 query 要快不少。  
   实际测试：单表的 10000 条/100000 条 SearchAll/FuzzySearch，使用时间几乎一样.=>不进行该条优化

- Cursor.close()  
  call close() on the cursor to release its resources

### Query total row num?

Use: `"SELECT count(*) FROM table_name"`  
Not Use: `"SELECT * FROM table_name"`

## Update

`int update(String table, ContentValues values, String whereClause, String[] whereArgs)`

## Delete

`int delete(String table, String whereClause, String[] whereArgs)`

# 2 Link

`CRUD` 操作中`RUD`

- Link =  
  等于

- Like ?  
  模糊查询

```
SQL模糊查询，使用like比较字，加上SQL里的通配符，请参考以下：
1、LIKE'Mc%' 将搜索以字母 Mc 开头的所有字符串（如 McBadden）。
2、LIKE'%inger' 将搜索以字母 inger 结尾的所有字符串（如 Ringer、Stringer）。
3、LIKE'%en%' 将搜索在任何位置包含字母 en 的所有字符串（如 Bennet、Green、McBadden）。
4、LIKE'_heryl' 将搜索以字母 heryl 结尾的所有六个字母的名称（如 Cheryl、Sheryl）。
5、LIKE'[CK]ars[eo]n' 将搜索下列字符串：Carsen、Karsen、Carson 和 Karson（如 Carson）。
6、LIKE'[M-Z]inger' 将搜索以字符串 inger 结尾、以从 M 到 Z 的任何单个字母开头的所有名称（如 Ringer）。
7、LIKE'M[^c]%' 将搜索以字母 M 开头，并且第二个字母不是 c 的所有名称（如MacFeather）。
```

# 3 Sqlite Transaction 事务处理

```
beginTransaction() // 开启一个事务
setTransactionSuccessful() // 设置事务的标志为成功
endTransaction() // 结束事务. 检查事务的标志是否为成功? Yes则提交事务，No则回滚事务。
```

### When use Transaction?

- 批量的向 Sqlite 中插入大量数据.  
  单独的使用添加方法导致应用响应缓慢.  
  原因：  
  sqlite 插入数据的时候默认一条语句就是一个事务，有多少条数据就有多少次磁盘操作。  
  如初始 8000 条记录也就是要 8000 次读写磁盘操作。  
  同时也是为了保证数据的一致性，避免出现数据缺失等情况。

- 多个步骤,要么同时成功,要么同时失败  
  经典例子：  
  升级数据库时，删除旧数据和添加新数据的操作必须一起完成，否则就还要继续保留原来的旧数据。

```java
try{
    db.beginTransaction();
    // or execSQL in for
    db.execSQL(update_sql1);
    db.execSQL(insert_sql2);
    db.setTransactionSuccessful();
} catch (Exception ex) {
    Log.e(TAG, "insert items: " + ex);
} finally {
    db.endTransaction();
}
```

```java
try{
    db.beginTransaction();
    long result = 0;
    for(Item bean:list){
        if(-1 == db.insert(...)){
          result = -1;
        }
    }
    if(-1 != result){
        db.setTransactionSuccessful();
    }
} catch (Exception ex) {
  Log.e(TAG, "insert items: " + ex);
}
finally{
    db.endTransaction();
}
```

```java
try{
    db.beginTransaction();
    long result = 0;
    for(Item bean:list){
        if(-1 == db.insert(...)){
          trow SQLException
        }
    }
    db.setTransactionSuccessful();
} catch (Exception ex) {
  Log.e(TAG, "insert items: " + ex);
}
finally{
    db.endTransaction();
}
```

# 2 execSQL

```
void execSQL(String sql) throws SQLException
void execSQL(String sql, Object[] bindArgs) throws SQLException
```

- Execute a single SQL statement that is NOT a SELECT/INSERT/UPDATE/DELETE
- execSQL vs CRUD？  
   使用 Transaction 后，execSQL 与 CRUD 的性能差不多，而 CRUD 的可读性和可维护性更高。  
   So：  
   Use Transaction + CRUD instead of Transaction + execSQL

  测试结论：  
   `DB.xlsx` - DB page  
   `TestSQLiteActivity.java`

# 3 Create table with PRIMARY KEY AUTOINCREMENT

```
Case1:
insert key=1
insert key=2
Delete all records in this table.
insert key=3, not 1. // DB record it

Case2:
insert key=1
insert key=2
Delete the DB file.
insert key=1
```

# 4 SQLiteStatement

CRUD 最终调用方法？

```
SQLiteDatabase.insert() ->SQLiteStatement.executeInsert()
SQLiteDatabase.querry/rawQuery() -> .SQLiteCursorDriver.query()
SQLiteDatabase.update() -> SQLiteStatement.executeUpdateDelete()
SQLiteDatabase.delete() -> SQLiteStatement.executeUpdateDelete()
```

# 5 db.update 多条件参数

```java
private void delete_multiple_condition() {
    SQLiteDatabase db = dbHelper.getWritableDatabase();
    String whereClause = Table1ReaderContract.TableEntry._ID + "=? OR " + Table1ReaderContract.TableEntry.COL3 + ">?";
    String[] whereArgs = new String[]{"5", "10"};
    db.delete(Table1ReaderContract.TableEntry.TABLE_NAME, whereClause, whereArgs);
}
```

```
// String[] whereArgs
int delete(String table, String whereClause, String[] whereArgs)
int update(String table, ContentValues values, String whereClause, String[] whereArgs)
```
