# Nginx

- Install  
  /usr/local/Cellar/nginx-full/1.17.9
- 配置文件  
  /usr/local/etc/nginx/nginx.conf  
  默认端口是 8080
- nginx 服务器根目录所在位置  
  /usr/local/var/www

- Reload config:

```
$ nginx -s reload
```

- Reopen Logfile:

```
$ nginx -s reopen
```

- Start process

```
// 8080
nginx
```

http://localhost:8080

```
Run port 80:
 $ sudo chown root:wheel /usr/local/opt/nginx-full/bin/nginx
 $ sudo chmod u+s /usr/local/opt/nginx-full/bin/nginx

```

- Stop process:

```
$ nginx -s stop
```

- Waiting on exit process

```
$ nginx -s quit
```
