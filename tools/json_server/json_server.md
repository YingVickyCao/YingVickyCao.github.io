# Json Server

https://www.npmjs.com/package/json-server
用途：启动一个模拟的 server，该 server 支持增删改查

# 1 安装 Json Server

npm install json-service

# 2 启动 Json Server

- `touch server.json`
- 启动 Json Server

```
json-server server.json
```

```
log:
  Resources
  http://localhost:3000/posts
  http://localhost:3000/comments
  http://localhost:3000/profile

  Home
  http://localhost:3000
```

- 对外暴露出 server?  
  localhost -> ip
