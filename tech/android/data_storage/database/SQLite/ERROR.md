# ERROR When Android DB OPs

# 1 `java.lang.IllegalStateException: getDatabase called recursively`

https://blog.csdn.net/adayabetter/article/details/44516217

```
public void onCreate(SQLiteDatabase db) {
        Log.d(TAG, "onCreate: " + LogHelper.getThreadInfo()); // ,[thread =2,main]
        db.execSQL(SQL_CREATE_ENTRIES);

        // Use db instread of db2
        // SQLiteDatabase db2 = getReadableDatabase();

    }
```

# 2 `java.lang.NullPointerException: Attempt to invoke virtual method 'android.database.sqlite.SQLiteDatabase android.content.Context.openOrCreateDatabase(...)`

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

# 3 `SQLiteDatabase: Error inserting _id=1 col2=City col3=1 android.database.sqlite.SQLiteConstraintException: UNIQUE constraint failed: table1._id (code 1555)`

Reason:  
插入数据时，主键重复.  
正确的做法：插入数据时，不插入主键，主键为自动

# 4 CursorWindow: Window is full: requested allocation 404 bytes, free space 321 bytes, window size 2097152 bytes

100000 条的单表：无条件查询时出现此 wrong。  
一般开发中会加很多条件，不会一次性查询这么多条数据。

# 5 android.database.sqlite.SQLiteException: no such column: A (code 1): , while compiling: UPDATE table1 SET col2= 1553048517967 WHERE col2=A

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

# 5 android.database.sqlite.SQLiteException: no such table: news (code 1)

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
