### 取最新版的 Redis 镜像

这里我们拉取官方的最新版本的镜像：

```
$ docker pull redis:latest
```

[![img](https://s2.loli.net/2025/02/17/p8cIPWwrVMvTnkA.png)](https://www.runoob.com/wp-content/uploads/2016/06/docker-redis3.png)

### 3、查看本地镜像

使用以下命令来查看是否已安装了 redis：

```
$ docker images
```

[![img](https://s2.loli.net/2025/02/17/Te8xPfXIR2GSyYz.png)](https://www.runoob.com/wp-content/uploads/2016/06/docker-redis4.png)

在上图中可以看到我们已经安装了最新版本（latest）的 redis 镜像。

### 4、运行容器

安装完成后，我们可以使用以下命令来运行 redis 容器：

```
$ docker run -itd --name redis-test -p 6379:6379 redis
```

参数说明：

- **-p 6379:6379**：映射容器服务的 6379 端口到宿主机的 6379 端口。外部可以直接通过宿主机ip:6379 访问到 Redis 的服务。

[![img](https://s2.loli.net/2025/02/17/MHvRb3rf2jkKxsh.png)](https://www.runoob.com/wp-content/uploads/2016/06/docker-redis5.png)

### 5、安装成功

最后我们可以通过 **docker ps** 命令查看容器的运行信息：

[![img](https://s2.loli.net/2025/02/17/FWjRbehcINloa68.png)](https://www.runoob.com/wp-content/uploads/2016/06/docker-redis6.png)

接着我们通过 redis-cli 连接测试使用 redis 服务。

```
$ docker exec -it redis-test /bin/bash
```

[![img](https://s2.loli.net/2024/09/29/Xbkc1CDWlGQoEpZ.png)](https://www.runoob.com/wp-content/uploads/2016/06/docker-redis7.png)