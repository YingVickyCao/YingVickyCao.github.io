# NSArray

- 可以添加任意对象(继承 NSObject)
- 以 nil 结尾
- 数组中存储的，即数组中的每一个对象，是该 index 对应对象的地址。  
  C 语言中 字符串数组的首地址，对应一个字符串。
- NSLog(@"%@",s) 打印的是对象的 description()方法返回值。

```
- (NSString *)description{
    return @"This is S ";
}

S *s = [[S alloc] init];
NSLog(@"%@",s);
```
