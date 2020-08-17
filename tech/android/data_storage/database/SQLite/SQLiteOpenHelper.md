# SQLiteOpenHelper

# `SQLiteDatabase.java`

- SQLiteDatabase 的帮助类 SQLiteOpenHelper

## `CRUD`

`CRUD` = create, retrieve,update, delete

create = insert()  
retrieve = rawQuery/query()  
update = update()  
delete = delete()

### Insert

```
// @1. Insert the new row, returning the primary key value of the new row
// @2: Tells the framework what to do in the event that the ContentValues is empty
public long insert(String table, String nullColumnHack, ContentValues values)
```

### Query

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

#### Query total row num?

Use: `"SELECT count(*) FROM table_name"`  
Not Use: `"SELECT * FROM table_name"`

### Update

`int update(String table, ContentValues values, String whereClause, String[] whereArgs)`

### Delete

`int delete(String table, String whereClause, String[] whereArgs)`

## Link

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

## Sqlite Transaction 事务处理

```
beginTransaction() // 开启一个事务
setTransactionSuccessful() // 设置事务的标志为成功
endTransaction() // 结束事务. 检查事务的标志是否为成功? Yes则提交事务，No则回滚事务。
```

### When use Transaction?

- 批量的向 Sqlite 中插入大量数据.

单独的使用添加方法导致应用响应缓慢.  
原因：sqlite 插入数据的时候默认一条语句就是一个事务，有多少条数据就有多少次磁盘操作。如初始 8000 条记录也就是要 8000 次读写磁盘操作。同时也是为了保证数据的一致性，避免出现数据缺失等情况。

- 多个步骤要么同时成功,要么同时失败  
  经典例子：  
  升级数据库时，删除旧数据和添加新数据的操作必须一起完成，否则就还要继续保留原来的旧数据。

```
try{
    db.beginTransaction();
    db.execSQL(update_sql1);
    db.execSQL(insert_sql2);
    db.setTransactionSuccessful();
}finally{
    db.endTransaction();
    db.close();
}

```

## execSQL

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
   `android.xlsx` - DB page  
   `TestSQLiteActivity.java`

## Create table with PRIMARY KEY AUTOINCREMENT

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

## SQLiteStatement

CRUD 最终调用方法？

```
SQLiteDatabase.insert() ->SQLiteStatement.executeInsert()
SQLiteDatabase.querry/rawQuery() -> .SQLiteCursorDriver.query()
SQLiteDatabase.update() -> SQLiteStatement.executeUpdateDelete()
SQLiteDatabase.delete() -> SQLiteStatement.executeUpdateDelete()
```

---

# SQLiteOpenHelper

## `void onCreate(SQLiteDatabase db)`

- Thread = = Thread runing `getWritableDatabase()`/`getReadableDatabase()`
- Called when the database is created for the first time

## `void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion)`

### How to update DB?

If change the database schema, must increment the database version. Then auto call `onUpgrade`

```
public static final int DATABASE_VERSION = 1;  => 2
void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // This database is only a cache for online data, so its upgrade policy is to simply to discard the data and start over
        Log.d(TAG, "onUpgrade: oldVersion=" + oldVersion + ",newVersion=" + newVersion);
        db.execSQL(SQL_DELETE_ENTRIES);
        onCreate(db);
    }
```

## `void onDowngrade(SQLiteDatabase db, int oldVersion, int newVersion)`

## `getWritableDatabase()`/ `getReadableDatabase()`

- can be long-running => called in background thread.

- 同一个/不同 Context 实例，每次通过 SQLiteOpenHelper..getWritableDatabase() / getReadableDatabase()拿到的 SQLiteDatabase 同一个实例吗?  
   1 SQLiteOpenHelper 保存的 SQLiteDatabase 实例存在，且满足判定条件时，才不会重新=.  
   2 SQLiteOpenHelper 不是单例

- `getWritableDatabase()` vs `getReadableDatabase()`  
   getReadableDatabase:  
   First 以读写方式打开 DB.If 磁盘空间满了，重新尝试以只读方式打开 DB。

  getWritableDatabase:  
   直接以读写方式打开 DB. If 磁盘空间满了，直接报错。

- 根据 DB 版本号,auto invork onDowngrade/onUpgrade to downgrade/upgrade db

```
SQLiteDatabase getDatabaseLocked(boolean writable){
    ...
    final File filePath = mContext.getDatabasePath(mName);
    SQLiteDatabase.OpenParams params = mOpenParamsBuilder.build();
    try {
        db = SQLiteDatabase.openDatabase(filePath, params);
        // Keep pre-O-MR1 behavior by resetting file permissions to 660
        setFilePermissionsForDb(filePath.getPath());
    } catch (SQLException ex) {
        if (writable) {
            throw ex;
        }
        Log.e(TAG, "Couldn't open " + mName
                + " for writing (will try read-only):", ex);
        params = params.toBuilder().addOpenFlags(SQLiteDatabase.OPEN_READONLY).build();
        db = SQLiteDatabase.openDatabase(filePath, params);
    }

    ...

    if (version > mNewVersion) {
        onDowngrade(db, version, mNewVersion);
    } else {
        onUpgrade(db, version, mNewVersion);
    }
    ...
}
```

## close()

- called in onDestroy() of Activity/Fragment/Application subclass

# `Cursor.java`

## cursor.getColumnIndexOrThrow

## cursor.getColumnIndex

## cursor.getInt(int) // int: colum index. >=0

# ERROR

## FIXED_ERROR:`java.lang.IllegalStateException: getDatabase called recursively`

https://blog.csdn.net/adayabetter/article/details/44516217

```
public void onCreate(SQLiteDatabase db) {
        Log.d(TAG, "onCreate: " + LogHelper.getThreadInfo()); // ,[thread =2,main]
        db.execSQL(SQL_CREATE_ENTRIES);

        // Use db instread of db2
        // SQLiteDatabase db2 = getReadableDatabase();

    }
```

## FIXED_ERROR: `java.lang.NullPointerException: Attempt to invoke virtual method 'android.database.sqlite.SQLiteDatabase android.content.Context.openOrCreateDatabase(...)`

Reason:  
Context is prepared well until onCreate() finished.

```
public class TestSQLiteActivity extends Activity {

//  private FeedSQLiteOpenHelper dbHelper = new FeedSQLiteOpenHelper(getContext());
    private FeedSQLiteOpenHelper dbHelper;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        dbHelper = new FeedSQLiteOpenHelper(this);
    }
```

## FIXED_ERROR: `SQLiteDatabase: Error inserting _id=1 col2=City col3=1 android.database.sqlite.SQLiteConstraintException: UNIQUE constraint failed: table1._id (code 1555)`

Reason:  
插入数据时，主键重复.  
正确的做法：插入数据时，不插入主键，主键为自动

## CursorWindow: Window is full: requested allocation 404 bytes, free space 321 bytes, window size 2097152 bytes

100000 条的单表：无条件查询时出现此 wrong。  
一般开发中会加很多条件，不会一次性查询这么多条数据。

## FIXED_ERROR:android.database.sqlite.SQLiteException: no such column: A (code 1): , while compiling: UPDATE table1 SET col2= 1553048517967 WHERE col2=A

Reason:  
String 在直接拼接时要用单引号

```
// String sql = "UPDATE table1 SET col2= 1553048517967 WHERE col2=A "; // error

// Way1:
String sql = "UPDATE table1 SET col2= '1553048517967' WHERE col2='A' "; // ok
db.execSQL(sql);

// Way2:
db.execSQL("UPDATE table1  SET col2=?  WHERE col2 = ?", new Object[]{String.valueOf(System.currentTimeMillis()), "A"}); // ok
```

## FIXED_ERROR: android.database.sqlite.SQLiteException: no such table: news (code 1)

在插入数据时 not 建立 table news

## java.lang.IllegalStateException: attempt to re-open an already-closed object: SQLiteQuery: SELECT \* FROM table1

```
error use:
Cusor.close();
Cusor.get();
```

## java.lang.IllegalStateException: attempt to re-open an already-closed object: SQLiteDatabase: /data/user/0/com.hades.example.android/databases/FeedReader.db

```
error use:
SQLiteDatabase.close()
SQLiteDatabase db = dbHelper.getWritableDatabase()
```
