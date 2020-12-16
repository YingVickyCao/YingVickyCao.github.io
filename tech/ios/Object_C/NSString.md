# NSString

# 1 创建 NSString

# 2 常见操作

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
