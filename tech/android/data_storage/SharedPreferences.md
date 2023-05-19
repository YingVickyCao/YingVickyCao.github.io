# SharedPreferences

## 1 使用场景

存储少量的格式简单的数据。  
通常用于存储软件的配置信息。
Use Simple, and Save is high speed。

## 2 基本知识

- .xml
- 存储格式是基于 key-value 的 Map

```xml
<!-- /data/data/<package_name>/shared_prefs/file_name.xml  -->
<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<map>
    <int name="random" value="34" />
    <float name="key_float" value="1.5" />
    <string name="key_string">Wed Dec 29 21:49:18 GMT+08:00 2021</string>
    <int name="key_int" value="79" />
    <set name="key_string_set">
        <string>abc</string>
        <string>xyz</string>
    </set>
    <boolean name="key_bool" value="true" />
</map>
```

- `/data/data/<package_name>/shared_prefs/<file_name>.xml`
- Value Type  
  存储类型与 Java 中 Map 不同。  
  ![Value Type](https://gitee.com/YingVickyCao/img/raw/main/android/DataAcess/SharedPreferences/sf_value_type.png)
- final class SharedPreferencesImpl implements SharedPreferences
- 创建模式
  创建模式 | Note
  ---|---
  Context.MODE_PRIVATE | 默认操作模式。私有，即只能当前程序访问
  Context.MODE_APPEND | 追加。没有则创建，有则追加。
  Context.MODE_WORLD_READABLE|@Deprecated.跨程序读模式。因为允许其他程序访问
  Context.MODE_WORLD_WRITEABLE|@Deprecated. 跨程序写模式。因为允许其他程序访问
  Context.MODE_MULTI_PROCESS|@Deprecated.<br/>(1)跨进程模式.因为允许多个进程访问同一个 SharedPrecferences 对象.<br/>(2)<= Android 2.3，标志位默认开启的.<br/>(3)夸进程时应该使用 ContentProvider instead。

## 3 工作原理

## SharedPreferences instance 是线程安全

(1) SharedPreferences instances are singletons within a process  
(2) Each put() ,get(), apply(), commit() lock SharedPreferences instances  
(3) getSharedPreferences()获取对应的的文件, 文件内容 -> Map<String, Object> mMap，之后的读取操作都是直接对应内存 mMap.

## 4 commmit() VS apply()

### commit()

### apply()

- asynchronous,线程安全
- First SharedPreferences.commitToMemory() => Memory, then Runnable Memory-> Disk
- commitToMemory()锁定 SharedPreferences 对象。
- If another editor on this SharedPreferences does a regular commit while a apply is still outstanding, the commit will block until all async commits are completed as well as the commit itself
- You don't need to worry about Android component lifecycles and their interaction with apply() writing to disk. The framework makes sure in-flight disk writes from apply() complete before switching states.
