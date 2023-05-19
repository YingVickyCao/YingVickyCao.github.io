# Web -> App(Uri)

# In Chrome html page,Click `openApp` button to open android app.

Mock OpenApp: Open link url from Chrome App to open Other App Activity.

- A1 app:`TestAccessRemoteActivity.java`, `web_open_app.html`
- B1 app:`TestReceiveImplicitIntentActivity.java`

only mock Case1

```
If not Good Access, Case1
   String url ="intent://jump?anything#Intent;scheme=android_about_demos_b;package=com.hades.example.android.b;end"
Then Case2:
  String url =android_about_demos_b://jump?anything#Intent;scheme=android_about_demos_b;package=com.hades.example.android.b;end
 window.location=url
```

## 1. Open by Chrome

Put `web_open_app.html` to `/sdard/`, and open in Chrome,

### Way1: Click button "Open App"

=> **_Can jump_**  
=> **_web_open_app2.html can jump_**

### Way2: chrome://inspect/#devices

Console:

```
window.location="intent://jump?anything#Intent;scheme=android_about_demos_b;package=com.hades.example.android.b;end"
```

=> **_Can jump_**

Tip:

- When Inspect, Google must be accessed in Chrome. Because first time, must download some required 组件 from Google.

### Way3: Put below url to 搜索框 :

```
intent://jump?anything#Intent;scheme=android_about_demos_b;package=com.hades.example.android.b;end
```

**_Can not jump_**

## 2. Open by android WebView Widget

Put `web_open_app.html` to android `asserts dir`, then Show it in WebView Widget.  
Click button "Open App"

```
<!Doctype html>
<html>

    <head>
        <title>Web access app</title>
        <script>
            function openApp() {
                window.location="intent://jump?anything#Intent;scheme=android_about_demos_b1;package=com.hades.example.android.b1;end"
            }
        </script>
    </head>

    <body>
        <button onclick="openApp()" value="Open App">Open app</button>
    </body>

</html>
```

=> **_Can not jump_**
