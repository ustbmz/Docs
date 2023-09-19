### Docker 配置镜像加速器

> 针对 Docker 客户端版本大于 1.10.0 的用户
> 您可以通过修改 daemon 配置文件/etc/docker/daemon.json 来使用加速器

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://m11p8yub.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 如果遇到无法删除的 images,删除命令无效，显示无此 imagehashid

```
> rm -rf /var/lib/docker/image/overlay2/imagedb/content

> rm -rf /var/lib/docker/image/overlay2/layerdb/sha256
```

连接容器执行命令

```
docker exec -it     [container_name]    [command]
```

删除多余的 无用的 tag 为 noe 的镜像

```
docker rmi -f  `docker images | grep <none>`
```

### 删除多余的容器及镜像

```
> docker rm -v $(docker ps -a -q -f status=exited)

> docker rmi $(docker images -f "dangling=true" -q)

> docker run -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker:/var/lib/docker --rm martin/docker-cleanup-volumes


```

