# Network

# 1 Force auto 302,and get location from 302

Way 1 : HttpURLConnection  
从 Android4.4 开始 HttpURLConnection 的底层实现采用的是 okHttp

Way 2 :HttpClient4.5 : Depressed

```
implementation group: 'org.apache.httpcomponents', name: 'httpclient', version: '4.5.13'
```

Way 3 : OkHttp

Code :
https://gitee.com/YingVickyCao/Retrofit2/tree/master/src/main/java/com/hades/example/retrofit2/_6_302/v2_get_location

# 2 Network Method

| Name              | Package          |                                     |
| ----------------- | ---------------- | ----------------------------------- |
| HttpURLconnection | java.NET         |                                     |
| HttpClient        | org.appache.http | Depressed. Android API 23 remove it |
| OkHttp3           |                  |                                     |
| Retrofit2         |                  |                                     |
