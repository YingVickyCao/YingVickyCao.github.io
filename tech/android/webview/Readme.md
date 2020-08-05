# Android Webview

- [1 How to open app from Android web browser](android_web_browser_open_app.md)

- [2 Debug app WebView page](Debug_android_web_in_browser.md)

# Basic

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

## 3 Support JS

```
WebSettings.setJavaScriptEnabled(true);
```

## 4 Java <-> JS

## Java invoke JS

```html
function sum_alert(n1, n2){ alert(n1 + n2); }
```

```java
WebSettings webSettings = mWebView.getSettings();
if (null != webSettings) {
    webSettings.setJavaScriptEnabled(true);
    webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
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

## JS invoke Java

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
    webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
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

# TBD

- TBD : loadData() vs loadDataWithBaseURL

# Refs

- https://developer.android.google.cn/guide/webapps
