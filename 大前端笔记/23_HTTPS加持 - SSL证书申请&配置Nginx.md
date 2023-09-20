#  HTTPS加持 - SSL证书申请&配置Nginx

> 基本步骤

* 安装Docker --> Docker-Compose --> Nginx
* Docker - Compose 启动 Nginx
* 创建 docker https 网络 --> jenkins ,api ...
* 配置 nginx.conf  --> 创建conf.d --> vhost.conf
* 安装ssl 证书
* docker-compose up -d  运行nginx 容器 -->  测试 cron定时任务脚本

## 步骤一 : 申请证书

安装 ACME 获取证书 

Github  https://github.com/acmesh-official/acme.sh

> 安装 acme  

**Clone this project and launch installation:**

```shell
$ git clone https://github.com/acmesh-official/acme.sh.git
$ cd ./acme.sh
$ ./acme.sh --install -m cnmz@msn.com
```

## 使用Dnsapi  

* DNSPod 只能使用 dnspod token


> 官方说明 https://github.com/acmesh-official/acme.sh/wiki/dnsapi
>
> DSNPod Token https://console.dnspod.cn/account/token/token#

```shell
## export CF_Key="sdfsdfsdfljlbjkljlkjsdfoiwje"
## export CF_Email="xxxx@sss.com"

$ export DP_Id="270900"
$ export DP_Key="6eb6daa99d13bcf01f321aa79284deeb"

$ acme.sh --issue --dns dns_dp -d ustbmz.com -d *.ustbmz.com
```

## 步骤二 :  Dcoker - Compose 配置  Nginx

> 生成nginx 密钥 ,  提高 nginx 安全性

```shell
# 创建 keys存放文件夹
$ mkdir -p /home/keys
# 生成nginx密钥
$ openssl dhparam -out /home/keys/dhparam.pem 2048
```


> 证书安装至指定目录 
```
acme.sh --install-cert -d ustbmz.com \
--key-file       /home/keys/key.pem  \
--fullchain-file /home/keys//cert.pem \
--reloadcmd     " systemctl restart nginx"
```

> 执行命令 创建 docker https 网络

**使https网络内容器应用可相互通信**

```shell
$ docker network create https
```


>  Nginx --  docker-compose.yml

```dockerfile
version: "3"
services:
  web:
    image: nginx:latest
    container_name: "some-nginx"
    restart: always
    volumes:
      - /home/nginx/nginx.conf:/etc/nginx/nginx.conf
      - /home/nginx/conf.d:/etc/nginx/conf.d
      - /home/keys:/home/keys
      # blog
      # - /home/blog:/var/www
    ports:
      - "80:80"
      - "443:443"

# docker network create https
networks:
  default:
    external:
      name: https

```



> 创建 nginx.conf 配置文件

```shell
user nginx;
worker_processes auto;
pid /run/nginx.pid;
worker_rlimit_nofile 65535;

events {
  # 设置事件驱动模型，是内核2.6以上支持
  use epoll;
  worker_connections 65535;
  accept_mutex off;
  multi_accept off;
}

http {
  # Basic Settings
  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  send_timeout 120;
  keepalive_timeout 300;
  client_body_timeout 300;
  client_header_timeout 120;

  proxy_read_timeout 300;
  proxy_send_timeout 300;
  #tcp_nopush on;
  types_hash_max_size 4096;
  client_header_buffer_size 16m;
  client_max_body_size 4096m;

  include /etc/nginx/mime.types;
  include /etc/nginx/conf.d/*.conf;
  # include /usr/share/nginx/modules/*.conf;

  default_type application/octet-stream;
  # Logging Settings
  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;
  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';
  # 开启gzip
  gzip on;
  # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
  gzip_min_length 1k;
  # gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
  gzip_comp_level 2;
  # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png font/ttf font/otf image/svg+xml;
  # 是否在http header中添加Vary: Accept-Encoding，建议开启
  gzip_vary on;
  # 禁用IE 6 gzip
  gzip_disable "MSIE [1-6]\.";
}
```

> 启动 Nginx --> docker-compose

```
$ docker-compose up -d  
```



## 静态资源自定义blog.conf   位于 /home/nginx/conf.d 自动加载

>  blog.conf    

```
# listen on HTTP2/SSL
server {
  listen 443 ssl http2;
  server_name www.ustbmz.com;
  # ssl certs from letsencrypt
  # ssl on;
  ssl_certificate /home/keys/cert.pem;
  ssl_certificate_key /home/keys/key.pem;
  # dhparam.pem
  ssl_dhparam /home/keys/dhparam.pem;

  ssl_session_cache shared:SSL:50m;
  ssl_session_timeout 30m;
  ssl_session_tickets off;

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  # ciphers chosen for forward secrecy and compatibility
  # http://blog.ivanristic.com/2013/08/configuring-apache-nginx-and-openssl-for-forward-secrecy.html
  ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';

  ssl_prefer_server_ciphers on;

  add_header Strict-Transport-Security "max-age=31536000; includeSubdomains; preload";

  location / {
    root /var/www/;
    index index.html;
    proxy_set_header Host $host:$server_port;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

# redirect HTTP and handle let's encrypt requests
server {
  listen 80;
  server_name www.ustbmz.com;
  location / {
    return 301 https://$host$request_uri;
  }
}
```

> 强制重写创建docker容器

```shell
$ docker-compose up --force-recreate -d
```





## API 接口容器使用https  

在本地进行 docker save > save.tar

服务器端进行 docker load < save.tar

> docker-compose.api.yml  集成 mongodb readis

```shell
version: '3'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        Version: 1.0
    image: api_online:1.0
    container_name: api_online
    restart: always
    # env_file: .env
    environment:
      - DB_USER=admin
      - DB_PASS=admin123
      - DB_HOST=mongo
      - DB_PORT=27017
      - DB_NAME=community
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - REDIS_PASS=123456
    ports:
      - '10030:3000'
      - '10031:3001'
    volumes:
      - /home/imooc/online:/app/public

  mongo:
    image: mongo
    container_name: 'mongodb'
    restart: always
    volumes:
      - /home/imooc/db:/data/db
      - /home/imooc/db/initdb.d:/docker-entrypoint-initdb.d/
      # .sh & .js
    ports:
      - '27017:27017'
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
      MONGO_INITDB_DATABASE: testdb
      MONGO_INITDB_USERNAME: admin
      MONGO_INITDB_PASSWORD: admin123

  redis:
    image: redis
    container_name: 'redis'
    restart: always
    ports:
      - '6379:6379'
    command: redis-server --requirepass 123456

networks:
  default:
    external:
      name: https

```

> 本地进行 docker build

```shell
docker-compose -f `docker-compose.api.yml` build web
```

> 保存容器镜像

```
docker save api_online:1.0 > ./save.tar
```



> 备份原 mongodb 数据库  -- > testdb

```shell
## 备份 testdb 使用 test 用户至mongodb容器内 ./tmp 目录
$ docker exec -it mongodb mongodump -u test -d testdb -o ./tmp/

## 拷贝容器内备份的数据库文件至宿主机tmp目录
$ docker cp {容器ID}:/tmp/testdb /tmp

## 拷贝备份库至新的容器并进行恢复
$ docker exec -it mongodb mongorestore -u test -d testdb /tmp/testdb

## 拷贝备份库至新的容器并进行恢复
$ docker exec -it mongodb mongorestore -u test -d testdb /tmp/testdb
```



`拷贝save.tar至服务器目录`

> 加载 上传后的服务器容器

```shell
$ docker load < save.tar
```



> 在 /home/nginx/conf.d 目录下新建api.conf

```shell
version: '3'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        Version: 1.0
    image: api_online:1.0
    container_name: api_online
    restart: always
    # env_file: .env
    environment:
      - DB_USER=admin
      - DB_PASS=admin123
      - DB_HOST=mongo
      - DB_PORT=27017
      - DB_NAME=testdb
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - REDIS_PASS=123456
    ports:
      - '10030:3000'
      - '10031:3001'
    volumes:
      - /home/api/online:/app/public

  mongo:
    image: mongo
    container_name: 'mongodb'
    restart: always
    volumes:
      - /home/db:/data/db
      - /home/db/initdb.d:/docker-entrypoint-initdb.d/
      # .sh & .js
    ports:
      - '27017:27017'
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: admin123
      MONGO_INITDB_DATABASE: testdb
      MONGO_INITDB_USERNAME: admin
      MONGO_INITDB_PASSWORD: admin123

  redis:
    image: redis
    container_name: 'redis'
    restart: always
    ports:
      - '6379:6379'
    command: redis-server --requirepass 123456

networks:
  default:
    external:
      name: https
```









