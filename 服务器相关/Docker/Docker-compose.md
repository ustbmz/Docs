# Docker-compose

安装地址

```shell
$ sudo curl -L "https://github.com/docker/compose/releases/download/v2.30.1/docker-compose-Linux-x86_64" -o /usr/local/bin/docker-compose
```



> 下载太慢可手动下载

[docker-2.30.1]:https://github.com/docker/compose/releases/download/v2.30.1/docker-compose-Linux-x86_64

移动并更名为  /usr/local/bin/docker-compose



测试是否安装成功

```shell
$ docker-compose --version
```



> 检查配置文件配置是否正确

```shell
$ docker-compose -f /home/nginx/docker-compose.yml config
```

