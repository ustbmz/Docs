# Nginx

 

Nginx 映射本地目录 ，后续只修改本地目录文件即可

```
- /home/nginx/data/nginx/html:/usr/share/nginx/html
- /home/nginx/data/nginx/logs:/var/log/nginx
- /home/nginx/data/nginx/nginx.conf/:/etc/nginx/nginx.conf
- /home/nginx/data/nginx/conf.d:/etc/nginx/conf.d
```



这里不能用相对路径进行挂载，不知道为啥！

```shell
services:
  nginx:
    restart: always
    container_name: nginx
    image: nginx
    ports:
      - 80:80
      - 443:443
    volumes:
      - /home/nginx/data/html:/usr/share/nginx/html
      - /home/nginx/data/www:/var/www
      - /home/nginx/data/logs:/var/log/nginx
      - /home/nginx/data/nginx.conf/:/etc/nginx/nginx.conf
      - /home/nginx/data/etc/cert:/etc/nginx/cert
      - /home/nginx/data/conf.d:/etc/nginx/conf.d
    environment:
      - NGINX_PORT=80
      - TZ=Asia/Shanghai
```

