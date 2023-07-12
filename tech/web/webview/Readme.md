# Android Webview

#[1 How to open app from Android web browser](1_1_android_web_browser_open_app.md)

# 2 Debug app's web page
 - [Debug Android web page](2_Debug_android_web_page.md)    
 - [Debug iOS web page](2_Debug_ios_web_page.md)  

# 3 [Android WebView](./3_Android_Webview.md)

# 4 WebChromeClient

# 5 WebViewClient

## WebChromeClient vs WebViewClient

WebView 负责解析、渲染，其他工作交给 WebChromeClient 和 WebViewClient

- WebViewClient：  
  帮助 WebView 处理事件请求、各种通知  
  最基本的渲染效果

- WebChromeClient：  
  辅助 WebView 处理对话框、标题、加载条等  
  更丰富的渲染效果。

# TBD

- TBD : loadData() vs loadDataWithBaseURL
- 选择合适的 WebView 缓存

# Refs

- https://developer.android.google.cn/guide/webapps
- https://developer.android.google.cn/reference/androidx/webkit/package-summary
- https://juejin.im/entry/6844903444008927245
- https://www.jianshu.com/p/6b7af574eb90
- https://www.cnblogs.com/ourLifes/p/7992648.html
- https://www.cnblogs.com/yaowen/p/5654168.html
