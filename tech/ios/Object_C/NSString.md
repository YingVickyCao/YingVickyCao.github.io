# 1 NSString

```
NSString *s2 = “abc”:指向一个不可变的地址.
```

- NString <=> UTF-8 NSdata（二进制）：用于提交服务器，或者文件读写。服务器接受的数据一般是 UTF-8。

## 查

- 判断是否相等
- 比较大小  
  与 C 语言一样，按位比较
- get substring  
  substringFromIndex:[index,end]  
  substringToIndex:[0,index)  
  substringWithRange:[index, index + len -1 ]
- 是否包含 string  
  rangeOfString

# 2 NSMutableString

- 可变
- 常见操作  
  增  
  删  
  改  
  查:同 NString
