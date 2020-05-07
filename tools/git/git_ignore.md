# Git ignore

`.gitignore`

# 1 Sample

```
.DS_Store     # cache file in OS

*.a               # All files with suffix '.a' are ignored
core.*            # All files with preffix 'core.' are ignored

# Office cache files
# doc/Book1.xlsx    Traceable
# doc/~$Book1.xlsx  Ignored
# Any excel temp files in any dir of this repo will be ignored.
~$*.xls
~$*.xlsx

~$*.docx
~$*.ppt
~$*.pptx

tools/       # Ignore tools dir
log/*        # Ignore all files in log dir, but not log dir itself

/log.log     # Only ignore log.log file in root repo dir, not ignore in other dir

# 最后两条的顺序很重要，必须要先屏蔽所有的，然后才建立特殊不屏蔽的规则
readme.md       # Ignore all files named readme.md
!/readme.md     # Under above ignore rule, not ignore readme.md in root repo dir
```

# 2 文件格式规范

- 所有空行或#开头的行都会被忽略
- 可以使用标准的 glob 模式匹配
- `/文件(或目录)` : 仓库根目录的对应文件
- `匹配模式/`: 忽略的是目录
- `!匹配模式`:特殊不忽略某个文件或目录
- `*` : 匹配零或多个任意字符
- `[abc]` : 匹配任何一个列在方括号中的字符（匹配一个 a，or 匹配一个 b，or 匹配一个 c）
- `[字符1-字符2]` : 所有在这两个字符范围内的都可以匹配.  
  e.g. `[0-9]`=匹配所有 0 到 9 的数字
- `?` : 只匹配一个任意字

# 3 `.gitignore` Samples in Open Source

https://github.com/github/gitignore

# Refs:

- https://github.com/github/gitignore
- gitignore 文件屏蔽规则 https://www.jianshu.com/p/13612fb4b224
- git 配置忽略文件 https://blog.csdn.net/YYtomorrow/article/details/80866695
