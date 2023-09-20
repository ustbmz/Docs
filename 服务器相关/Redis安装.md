# Centos7安装Redis

一、安装gcc依赖

由于 redis 是用 C 语言开发，安装之前必先确认是否安装 gcc 环境（gcc -v），如果没有安装，执行以下命令进行安装

二、下载并解压安装包

```shell
$ wget http://download.redis.io/releases/redis-6.2.7.tar.gz
$ tar -zxvf redis-6.2.7.tar.gz
# cd切换到redis解压目录下，执行编译
$ cd redis-6.2.7
$ make
# 安装并指定安装目录
$ make install PREFIX=/usr/local/redis
```

五、启动服务

5.1前台启动

```shell
$ cd /usr/local/redis/bin
$ ./redis-server
```

5.2后台启动

从 redis 的源码目录中复制 redis.conf 到 redis 的安装目录

修改 redis.conf 文件，把 daemonize no 改为 daemonize yes

```shell
$ cp redis.conf /usr/local/redis/bin/
$ vi redis.conf
```



![img](https://gitee.com/cnmz/images/raw/master/mdpic/202111131721768.png)

```shell
# 配置redis 后台启动
> daemonize yes
# 配置redis 访问密码
> requirepass xxxxxx
```





后台启动

```shell
$ ./redis-server redis.conf
```



![img](https://gitee.com/cnmz/images/raw/master/mdpic/202111131752950.png)

 

六、设置开机启动

添加开机启动服务

```shell
$ vi /etc/systemd/system/redis.service
```



复制粘贴以下内容：

```
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/bin/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

注意：ExecStart配置成自己的路径 

 

设置开机启动

```shell
$ systemctl daemon-reload
$ systemctl start redis.service
$ systemctl enable redis.service
```





创建 redis 命令软链接

```shell
ln -s /usr/local/redis/bin/redis-cli /usr/bin/redis
```



测试 redis

![img](https://gitee.com/cnmz/images/raw/master/mdpic/202111131721791.png)

 

服务操作命令

systemctl start redis.service  #启动redis服务

systemctl stop redis.service  #停止redis服务

systemctl restart redis.service  #重新启动服务

systemctl status redis.service  #查看服务当前状态

systemctl enable redis.service  #设置开机自启动

systemctl disable redis.service  #停止开机自启动