# `brew info nginx-full`

```
$ brew info nginx-full

denji/nginx/nginx-full: stable 1.17.9, HEAD
HTTP(S) server, reverse proxy, IMAP/POP3 proxy server
https://nginx.org/
Conflicts with:
  nginx (because nginx-full symlink with the name for compatibility with nginx)
/usr/local/Cellar/nginx-full/1.17.9 (8 files, 1MB) *

  Built from source on 2020-04-14 at 20:47:52 with: --with-upload-module
From: https://github.com/denji/homebrew-nginx/blob/master/Formula/nginx-full.rb
==> Dependencies
Required: pcre ✔, openssl@1.1 ✔

Optional: gd ✘, geoip ✘, gperftools ✘, passenger ✘, imlib2 ✘
==> Options
--with-accept-language-module
	Build with Accept Language support
--with-accesskey-module
	Build with HTTP Access Key support
--with-addition
	Build with HTTP Addition support
--with-ajp-module
	Build with AJP-protocol support
--with-anti-ddos-module
	Build with Anti-DDoS support
--with-array-var-module
	Build with Array Var support
--with-auth-digest-module
	Build with Auth Digest support
--with-auth-ldap-module
	Build with Auth LDAP support
--with-auth-pam-module
	Build with Auth PAM support
--with-auth-req
	Build with HTTP Auth Request support
--with-auto-keepalive-module
	Build with Auto Disable KeepAlive support
--with-autols-module
	Build with Flexible Auto Index support
--with-brotli-module
	Build with Brotli compression support
--with-cache-purge-module
	Build with Cache Purge support
--with-captcha-module
	Build with Captcha support
--with-counter-zone-module
	Build with Realtime Counter Zone support
--with-ctpp2-module
	Build with CT++ support
--with-dav-ext-module
	Build with HTTP WebDav Extended support
--with-debug
	Build with debug log
--with-degredation
	Build with HTTP Degredation support
--with-dosdetector-module
	Build with detecting DoS attacks support
--with-echo-module
	Build with Echo support
--with-eval-module
	Build with Eval support
--with-extended-status-module
	Build with Extended Status support
--with-fancyindex-module
	Build with Fancy Index support
--with-flv
	Build with FLV support
--with-gd
	Build with gd support
--with-geoip
	Build with geoip support
--with-geoip2-module
	Build with GeoIP2 support
--with-google-perftools
	Build with Google Performance Tools support
--with-gperftools
	Build with gperftools support
--with-gunzip
	Build with Gunzip support
--with-gzip-static
	Build with Gzip static support
--with-headers-more-module
	Build with Headers More support
--with-healthcheck-module
	Build with Healthcheck support
--with-homebrew-libressl
	Include LibreSSL instead of OpenSSL via Homebrew
--with-http-accounting-module
	Build with HTTP Accounting support
--with-http-flood-detector-module
	Build with Var Flood-Threshold support
--with-http-remote-passwd-module
	Build with Remote Basic Auth Password support
--with-http2
	Build with HTTP/2 support
--with-image-filter
	Build with Image Filter support
--with-imlib2
	Build with imlib2 support
--with-log-if-module
	Build with Log-if support
--with-lua-module
	Build with LUA support
--with-mail
	Build with Mail support
--with-mail-ssl
	Build with Mail SSL/TLS support
--with-mod-zip-module
	Build with HTTP Zip support
--with-mogilefs-module
	Build with HTTP MogileFS support
--with-mp4
	Build with MP4 support
--with-mp4-h264-module
	Build with HTTP MP4/H264 support
--with-mruby-module
	Build with MRuby support
--with-naxsi-module
	Build with Naxsi support
--with-nchan-module
	Build with Nchan support
--with-no-pool-nginx
	Build without nginx-pool (valgrind debug memory)
--with-notice-module
	Build with HTTP Notice support
--with-passenger
	Build with passenger support
--with-pcre-jit
	Build with JIT in PCRE
--with-perl
	Build with Perl support
--with-php-session-module
	Build with Parse PHP Sessions support
--with-push-stream-module
	Build with HTTP Push Stream support
--with-random-index
	Build with Random Index support
--with-realip
	Build with Real IP support
--with-realtime-req-module
	Build with Realtime Request support
--with-redis-module
	Build with Redis support
--with-redis2-module
	Build with Redis2 support
--with-rtmp-module
	Build with RTMP support
--with-secure-link
	Build with Secure Link support
--with-set-misc-module
	Build with Set Misc support
--with-slice
	Build with Slice support
--with-small-light-module
	Build with Small Light support
--with-status
	Build with Stub Status support
--with-stream
	Build with TCP/UDP proxy support
--with-stream-geoip
	Build with Stream GeoIP support
--with-stream-realip
	Build with Stream RealIP support
--with-stream-ssl
	Build with Stream SSL/TLS support
--with-stream-ssl-preread
	Build with Stream without terminating SSL/TLS support
--with-sub
	Build with HTTP Sub support
--with-subs-filter-module
	Build with Substitutions Filter support
--with-tarantool-module
	Build with Tarantool upstream support
--with-tcp-proxy-module
	Build with TCP Proxy support
--with-txid-module
	Build with Sortable Unique ID support
--with-unzip-module
	Build with UnZip support
--with-upload-module
	Build with Upload support
--with-upload-progress-module
	Build with Upload Progress support
--with-upstream-order-module
	Build with Order Upstream support
--with-ustats-module
	Build with Upstream Statistics (HAProxy style) support
--with-var-req-speed-module
	Build with Var Request-Speed support
--with-vod-module
	Build with VOD on-the-fly MP4 Repackager support
--with-vts-module
	Build with virtual host traffic status support
--with-webdav
	Build with WebDAV support
--with-websockify-module
	Build with Websockify support
--with-xslt
	Build with XSLT support
--with-xsltproc-module
	Build with XSLT Transformations support
--HEAD
	Install HEAD version
==> Caveats
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

- Tips -
Run port 80:
 $ sudo chown root:wheel /usr/local/opt/nginx-full/bin/nginx
 $ sudo chmod u+s /usr/local/opt/nginx-full/bin/nginx

Reload config:
 $ nginx -s reload

Reopen Logfile:
 $ nginx -s reopen

Stop process:
 $ nginx -s stop

Waiting on exit process
 $ nginx -s quit

To have launchd start denji/nginx/nginx-full now and restart at login:
  brew services start denji/nginx/nginx-full
Or, if you don't want/need a background service you can just run:
  nginx
```
