# File

# 1 File Path

https://docs.oracle.com/javase/tutorial/essential/io/pathOps.html  
https://blog.csdn.net/u011983531/article/details/48443195

File file1 = new File("./file1.txt");

| Print Path               | Value                                                                    | DESC                 |
| ------------------------ | ------------------------------------------------------------------------ | -------------------- |
| Path of Project JVM      | /Users/account/Documents/project/testAndroidLibs/Retrofit2/              | Project JVM 绝对路径 |
| file1.getParent()        | .                                                                        | Project JVM 相对路径 |
| file1.getPath()          | `./file1.txt`                                                            | 相对路径             |
| file1.getAbsolutePath()  | `/Users/account/Documents/project/testAndroidLibs/Retrofit2/./file1.txt` | 绝对路径             |
| file1.getCanonicalPath() | `/Users/account/Documents/project/testAndroidLibs/Retrofit2/file1.txt`   | 绝对路径             |
| file1.getName()          | file1.txt                                                                | File name            |
| file1.getParentFile()    | {File@1923} "."                                                          |

```
file1.getParentFile() = {File@1923} "."
 0 = {File@1927} "./README.md"
 1 = {File@1928} "./gradle"
 2 = {File@1929} "./gradlew"
 3 = {File@1930} "./.gitignore"
 4 = {File@1931} "./build.gradle"
 5 = {File@1932} "./.gradle"
 6 = {File@1933} "./build"
 7 = {File@1934} "./gradlew.bat"
 8 = {File@1935} "./settings.gradle"
 9 = {File@1936} "./.idea"
10 = {File@1937} "./src"
```

- 相对路径: 相对于 project JVM 的启动路径
- 绝对路径：相对于 OS 的路径
