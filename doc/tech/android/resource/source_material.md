# 原始资源

原始资源：类似于声音以及其他各种类型的文件，Android并没有提供

# 1. 何时使用？  
大文件

# 2. 原始资源有2种: `/res/raw/`and `/assets`

# 3. `/res/raw/`
- 并列 `/res/` 
- 原生资源
- 视频
- 音频
- 访问
```
R.raw.file_name
getResources().openRawResource(int id)
=> AssetFileDescriptor afd = Resources.openRawResourceFd(int resid);

Uri uri = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.mp4_2);
```

# 4. `/assets`
## 原生资源?  
- 配置文件
- 资源文件:WebView本地资源:html5、javascript
- 图片
- 多媒体
- 存放任何文件夹

## 访问
- 不能直接访问     
在编译时不会编译assets下的资源文件，不在R文件中生成对应的资源ID

- 不能通过绝对路径去访问  
apk安装后会放在/data/app/**.apk目录下，以apk形式存在，asset/res和被绑定在apk里,并不会解压到/data/data/YourApp目录下去，无法直接获取到assets的绝对路径，因为它们根本就没有。  

- 通过AssertManager访问  
用AssertManager 以二进制流的形式读取资源  

```
方法1：
InputStream AssetManager.open(String fileName) // 根据文件名获取原始资源对应的输入流

方法2：
AssetFileDescriptor AssetManager.openFd(String fileName) // 根据文件名获取原始资源对应的AssetFileDescriptor。
```

- 访问实际资源对象  
```
// 加载assets目录下的网页,与网页有关的css，js，图片等文件也会的加载
mWebView.loadUrl("file:///android_asset/web/maven.html")

context.getClass().getClassLoader().getResourceAsStream("assets/"+资源名)
```

## Other method
```
// 获取AssertManager
getAsserts()

// 回当前目录下面的所有文件以及子目录的名称, 通过递归遍历整个文件目录，实现所有资源文件的访问
final String[] list(String path)
	
```

## 创建assert目录
- 手动创建
- 自动创建  
右键，New -> Folder -> Asserts Folder

# 5. AssetFileDescriptor
AssetFileDescriptor 代表了一项原始资源的描述，应用程度可通过AssetFileDescripto获取原始资源.
在AssetManager中一项的文件描述符,提供打开的FileDescriptor可用于读取的数据，以及在文件中的偏移量和长度的该项的数据。  
AssetFileDescriptor 返回 FileDescriptor. 