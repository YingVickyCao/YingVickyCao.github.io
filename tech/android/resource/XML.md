# XML

## xml 原始资源
`/res/xml/`

### 解析方式
1. SAX解析器

2. DOM解析器

3. PULL 解析器 
- Android 内置
- 推荐
- 解析方式   
Resource的两个方法
```
XmlResourceParser getXml(int id)
InputStream openRawResource(int id)
```

# Refs:
- https://developer.android.google.cn/training/basics/network-ops/xml?hl=zh_cn