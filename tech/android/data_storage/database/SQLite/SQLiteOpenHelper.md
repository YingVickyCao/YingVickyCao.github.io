# SQLiteOpenHelper

# 1 DB OP

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

# 2 `Cursor.java`

## cursor.getColumnIndexOrThrow

## cursor.getColumnIndex

## cursor.getInt(int) // int: colum index. >=0
