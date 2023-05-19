# ngrok - 内网穿透

内网穿透: Expose 内网或局域网的 server 到外网

# Mac (macOS 12.6.2)

Step 1 : `npm install -g ngrok`

Step 2 : Signup https://dashboard.ngrok.com/ if no account  
Download ngrok for mac, unzip it , then put `ngrok` to your target folder

Step 3 : 本地绑定授权令牌  
After login https://dashboard.ngrok.com/, copy the token from https://dashboard.ngrok.com/get-started/setup  
`ngrok authtoken you_token`

Step 4 : start local server, such as use "http-server" to mock start a local server

Step 5 : 内网穿透  
Expose your local server to extermal

```
// Your local server has started as 8080 port.
Mac:http_server hades$ ngrok http 8080

https://ngrok.com/docs
ngrok by @inconshreveable (Ctrl+C to quit)

Session Status online
Account Hi123097657 (Plan: Free)
Version 2.3.40
Region United States (us)
Web Interface http://127.0.0.1:4040
Forwarding http://6c04-114-87-148-43.ngrok.io -> http://localhost:8080
Forwarding https://6c04-114-87-148-43.ngrok.io -> http://localhost:8080

Connections ttl opn rt1 rt5 p50 p90
0 0 0.00 0.00 0.00 0.00
```

**Note：（1）连暴露后到 url 要用 VPN （2）ngrok http 命令 每次 forward 的外网地址都是不同的。**

Step 6 : 测试 exposed server，such as `http://6c04-114-87-148-43.ngrok.io/`.

http://127.0.0.1:4040/inspect/http 看访问历史

# Ref:

- https://www.jianshu.com/p/7ffc40fc4013
- https://www.npmjs.com/package/ngrok#auth-token
- https://dashboard.ngrok.com/
- https://dashboard.ngrok.com/get-started/setup
- https://blog.csdn.net/weixin_42449715/article/details/107671849
- https://ngrok.com/docs
- https://blog.csdn.net/weixin_42449715/article/details/107671849
