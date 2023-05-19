# Merge
## 好处
- 减少 APK 大小
- 提高复用率
	
## 不能使用  
不能在 ViewStub 中使用 Merge 标签，无attachToRoot 设置  

## 使用
- Merge 只能用在布局 XML 文件的根元素。
- 使用 Merge 加载一个布局，必须指定一个 ViewGroup 作为其父布局，并且要设置加载的 attchToRoot = true(inflate(int ,ViewGroup,true))