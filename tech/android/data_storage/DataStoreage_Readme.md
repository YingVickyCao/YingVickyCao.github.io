# Data Storage

- sensitive data  
When storing sensitive data—data that shouldn't be accessible from any other app—use internal storage, preferences, or a database.   

- Device File Explorer    

# 1 Internal Storage  (App-specific storage)      
Store private information that other apps shouldn't access within the internal storage.         
Internal storage has limited space for app-specific data => Small data.


## [Security library](https://developer.android.google.cn/topic/security/data)

## Query the free space

## Persistent files and Cache files

- Cache files    
When the device is low on internal storage space, Android may delete these cache files to recover space

# 2 External Storage(Shared storage)    
Store public information within the shared external storage.  
大量数据

## Permissions
- READ_EXTERNAL_STORAGE : Deprecated when targets Android 11 (API level 30) 
- WRITE_EXTERNAL_STORAGE: Deprecated when targets Android 11 (API level 30) 
- MANAGE_EXTERNAL_STORAGE: Introducted when Android 11 (API level 30)

 
## Internal Storage vs External Storage ?  
相同：   
API行为相同.

不同：  
External Storage能存储更多数据。    
内部存储的文件默认只能创建文件的应用可以访问；外部存储的文件所有应用可以访问；        
内部存储在应用卸载后，数据也一起删除。      
应用默认安装在内部存储。使用manifest `android:installLocation="preferExternal"` 指定应用安装到外部存储      


# 3 Preferences    
Store private, primitive data in key-value pairs    
少量数据  

## [SharedPreferences](./SharedPreferences.md)

# 4 Databases  
Store structured data in a private database.    
大量数据    


# Ref
https://developer.android.google.cn/training/data-storage#pref
