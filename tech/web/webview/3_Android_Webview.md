
# Android Webview

## 1 Load Web page

- Online

```java
WebView.loadUrl("https://www.cnblogs.com/chhom/p/4758103.html")
```

- Assert

```java
// assets/web/maven.html
WebView.loadUrl("file:///android_asset/web/maven.html");
```

- SD Card

```java
mWebView.loadUrl("file:///sdcard/yc/full/index.html");
```

- HTML String

```java
String unencodedHtml = "<html><body>'%28' is the code for '('</body></html>";
WebView.loadData(unencodedHtml, "text/html", "UFT-8");
```

```java
String unencodedHtml = "<html><body>'%28' is the code for '('</body></html>";
String encodedHtml = Base64.encodeToString(unencodedHtml.getBytes(), Base64.NO_PADDING);
WebView.loadData(encodedHtml, "text/html", "base64");
```

## 2 Pause and Resume WebView

- 当页面被失去焦点被切换到后台不可见状态，需要执行 onPause: 通知内核暂停所有的动作，比如 DOM 的解析、plugin 的执行、JavaScript 执行。

```
WebView.onPause();
```

- 激活 WebView 为活跃状态，能正常执行网页的响应

```
WebView.onResume();
```

## 3 WebSettings : TBD

```java
// Support JS
WebSettings.setJavaScriptEnabled(true);

//支持通过JS打开新窗口
webSettings.setJavaScriptCanOpenWindowsAutomatically(true);

// 缩放
webSettings.setBuiltInZoomControls(true);   // 设置内置的缩放控件。若为false，则该WebView不可缩放
webSettings.setSupportZoom(true);           // 当setBuiltInZoomControls(true)前提下，支持缩放
webSettings.setDisplayZoomControls(false);  // 隐藏原生的缩放控件. 默认：不隐藏
webSettings.setTextZoom(200);               // 设置文本的缩放倍数，默认为 100

// 字体
webSettings.setDefaultFontSize(30);//设置 WebView 字体的大小，默认大小为 16
webSettings.setMinimumFontSize(12);//设置 WebView 支持的最小字体大小，默认为 8

/**
 * 设置标准的字体族，默认”sans-serif”。font-family 规定元素的字体系列。
 * font-family 可以把多个字体名称作为一个“回退”系统来保存。如果浏览器不支持第一个字体，
 * 则会尝试下一个。也就是说，font-family 属性的值是用于某个元素的字体族名称或/及类族名称的一个
 * 优先表。浏览器会使用它可识别的第一个值。
 */
setStandardFontFamily(String font)
// 设置混合字体族。默认”monospace”
setFixedFontFamily(String font)
 // 设置SansSerif字体族。默认”sans-serif”
setSansSerifFontFamily(String font)
 // 设置SerifFont字体族，默认”sans-serif”
setSerifFontFamily(String font)
// 设置CursiveFont字体族，默认”cursive”
setCursiveFontFamily(String font)
 // 设置FantasyFont字体族，默认”fantasy”
setFantasyFontFamily(String font)

/**
 * 是否需要用户手势来播放Media，默认true
 */
setMediaPlaybackRequiresUserGesture(boolean require)

// TBD : 文件权限
// 是否允许访问WebView内部文件，默认true
setAllowFileAccess(boolean allow)
setAllowFileAccessFromFileURLs(true);   // 是否允许获取WebView的内容URL ，可以让WebView访问ContentPrivider存储的内容。 默认true
/**
 * 是否允许Js访问任何来源的内容。包括访问file scheme的URLs。考虑到安全性，
 * 限制Js访问范围默认禁用。注意：该方法只影响file scheme类型的资源，其他类型资源如图片类型的，
 * 不会受到影响。ICE_CREAM_SANDWICH_MR1版本以及以下默认为true，JELLY_BEAN版本
 * 以上默认为false
 */
setAllowUniversalAccessFromFileURLs(boolean flag)
// 是否允许获取WebView的内容URL ，可以让WebView访问ContentPrivider存储的内容。 默认true
setAllowContentAccess(boolean allow)

// 自适应
// 是否支持ViewPort的meta tag属性，如果页面有ViewPort meta tag 指定的宽度，则使用meta tag指定的值，否则默认使用宽屏的视图窗口
setUseWideViewPort(boolean use)
setLoadWithOverviewMode(true);          // 是否启动概述模式浏览界面，当页面宽度超过WebView显示宽度时，缩小页面适应WebView。默认false
setDefaultTextEncodingName("utf-8");//设置编码格式
setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN); //支持内容重新布局
setLoadsImagesAutomatically(true);      //支持自动加载图片n overview)

// 是否保存表单数据，默认false
setSaveFormData(boolean save)

// 是否支持多窗口，如果设置为true ，WebChromeClient#onCreateWindow方法必须被主程序实现，默认false
setSupportMultipleWindows(boolean support)

/**
 * 指定WebView的页面布局显示形式，调用该方法会引起页面重绘。默认LayoutAlgorithm#NARROW_COLUMNS
 */
setLayoutAlgorithm(LayoutAlgorithm l)

/**
 * 设置最小字体，默认8. 取值区间[1-72]，超过范围，使用其上限值。
 */
setMinimumFontSize(int size)

/**
 * 设置最小逻辑字体，默认8. 取值区间[1-72]，超过范围，使用其上限值。
 */
setMinimumLogicalFontSize(int size)

/**
 * 设置默认字体大小，默认16，取值区间[1-72]，超过范围，使用其上限值。
 */
setDefaultFontSize(int size)

/**
 * 设置默认填充字体大小，默认16，取值区间[1-72]，超过范围，使用其上限值。
 */
setDefaultFixedFontSize(int size)

/**
 * 设置是否加载图片资源，注意：方法控制所有的资源图片显示，包括嵌入的本地图片资源。
 * 使用方法setBlockNetworkImage则只限制网络资源图片的显示。值设置为true后，
 * webview会自动加载网络图片。默认true
 */
setLoadsImagesAutomatically(boolean flag)

/**
 * 是否加载网络图片资源。注意如果getLoadsImagesAutomatically返回false，则该方法没有效果。
 * 如果使用setBlockNetworkLoads设置为false，该方法设置为false，也不会显示网络图片。
 * 当值从true改为false时。WebView会自动加载网络图片。
 */
setBlockNetworkImage(boolean flag)

/**
 * 设置是否加载网络资源。注意如果值从true切换为false后，WebView不会自动加载，
 * 除非调用WebView#reload().如果没有android.Manifest.permission#INTERNET权限，
 * 值设为false，则会抛出java.lang.SecurityException异常。
 * 默认值：有android.Manifest.permission#INTERNET权限时为false，其他为true。
 */
setBlockNetworkLoads(boolean flag)

/**
 * 设置是否允许执行JS。
 */
setJavaScriptEnabled(boolean flag)



/**
 * 是否允许Js访问其他file scheme的URLs。包括访问file scheme的资源。考虑到安全性，
 * 限制Js访问范围默认禁用。注意：该方法只影响file scheme类型的资源，其他类型资源如图片类型的，
 * 不会受到影响。如果getAllowUniversalAccessFromFileURLs为true，则该方法被忽略。
 * ICE_CREAM_SANDWICH_MR1版本以及以下默认为true，JELLY_BEAN版本以上默认为false
 */
setAllowFileAccessFromFileURLs(boolean flag)

/**
 * 设置存储定位数据库的位置，考虑到位置权限和持久化Cache缓存，Application需要拥有指定路径的
 * write权限
 */
setGeolocationDatabasePath(String databasePath)

/**
 * 是否允许Cache，默认false。考虑需要存储缓存，应该为缓存指定存储路径setAppCachePath
 */
setAppCacheEnabled(boolean flag)

/**
 * 设置Cache API缓存路径。为了保证可以访问Cache，Application需要拥有指定路径的write权限。
 * 该方法应该只调用一次，多次调用自动忽略。
 */
setAppCachePath(String appCachePath)

/**
 * 是否允许数据库存储。默认false。查看setDatabasePath API 如何正确设置数据库存储。
 * 该设置拥有全局特性，同一进程所有WebView实例共用同一配置。注意：保证在同一进程的任一WebView
 * 加载页面之前修改该属性，因为在这之后设置WebView可能会忽略该配置
 */
setDatabaseEnabled(boolean flag)

/**
 * 是否存储页面DOM结构，默认false。
 */
setDomStorageEnabled(boolean flag)

/**
 * 是否允许定位，默认true。注意：为了保证定位可以使用，要保证以下几点：
 * Application 需要有android.Manifest.permission#ACCESS_COARSE_LOCATION的权限
 * Application 需要实现WebChromeClient#onGeolocationPermissionsShowPrompt的回调，
 * 接收Js定位请求访问地理位置的通知
 */
setGeolocationEnabled(boolean flag)

/**
 * 是否允许JS自动打开窗口。默认false
 */
setJavaScriptCanOpenWindowsAutomatically(boolean flag)

/**
 * 设置页面的编码格式，默认UTF-8
 */
setDefaultTextEncodingName(String encoding)

// 设置WebView代理，默认使用默认值
setUserAgentString(String ua)

/**
 * 通知WebView是否需要设置一个节点获取焦点当
 * WebView#requestFocus(int,android.graphics.Rect)被调用的时候，默认true
 */
setNeedInitialFocus(boolean flag)
mWebView.requestFocusFromTouch();   // 获取焦点

/**
 * 基于WebView导航的类型使用缓存：正常页面加载会加载缓存并按需判断内容是否需要重新验证。
 * 如果是页面返回，页面内容不会重新加载，直接从缓存中恢复。setCacheMode允许客户端根据指定的模式来
 * 使用缓存。
 * LOAD_DEFAULT 默认加载方式.根据cache-control决定是否从网络上取数据。
 * LOAD_CACHE_ELSE_NETWORK 只要本地有，无论是否过期，或者no-cache，都使用缓存中的数据。
 * LOAD_NO_CACHE 不使用缓存,只从网络获取数据.
 * LOAD_CACHE_ONLY 只使用缓存
 */
setCacheMode(int mode)

/**
 设置加载不安全资源的WebView加载行为。
 Android5.0 WebView中Http和Https混合问题
 在Android 5.0上 Webview 默认不允许加载 Http 与 Https 混合内容
 KITKAT版本以及以下默认为MIXED_CONTENT_ALWAYS_ALLOW方式，LOLLIPOP默认MIXED_CONTENT_NEVER_ALLOW。强烈建议：使用MIXED_CONTENT_NEVER_ALLOW
 */
setMixedContentMode(int mode)
```

## 6 WebView.setDownloadListener():TBD
## 7 Java <=> JS
### Java invoke JS

```html
function sum_alert(n1, n2){ alert(n1 + n2); }
```

```java
WebSettings webSettings = mWebView.getSettings();
if (null != webSettings) {
    webSettings.setJavaScriptEnabled(true);
}

 mWebView.setWebChromeClient(new WebChromeClient() {
    @Override
    public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
        return super.onJsAlert(view, url, message, result);
    //                return onJsAlert_custom_by_android(view, url, message, result);
    }

    private boolean onJsAlert_custom_by_android(WebView view, String url, String message, JsResult result) {
        AlertDialog.Builder b = new AlertDialog.Builder(getActivity());
        b.setTitle("Alert");
        b.setMessage(message);
        b.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                result.confirm();
            }
        });
        b.setCancelable(false);
        b.create().show();
        return true;
        }
    });
 }
mWebView.loadUrl("javascript:sum_alert(2,5)");
```

### JS invoke Java

```html
<script language="JavaScript">
  function callAndroid() {
    android.showToast("JS 唤起 Android Toast");
  }

  <button type="button" id="button1" onclick="callAndroid()">
    show Android toast
  </button>;
</script>
```

```java
WebSettings webSettings = mWebView.getSettings();
if (null != webSettings) {
    webSettings.setJavaScriptEnabled(true);
}
mWebView.addJavascriptInterface(new JavaObject(getActivity()), "android");
```

```java
public class JavaObject {
    private final Context mContext;

    public JavaObject(Context context) {
        mContext = context;
    }

    @JavascriptInterface
    public void showToast(String msg) {
        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
    }
}
```

# QA

## Q : Webview goes blank(white) after page loads finished

A:

```java
@Override
public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
    mWebView.loadUrl(request.getUrl().toString());
    return true;
}
```

=>

```java
@Override
public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
    return super.shouldOverrideUrlLoading(view, request);
}
```