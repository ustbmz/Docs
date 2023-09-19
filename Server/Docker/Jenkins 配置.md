# Jenkins 配置

> docker-compose.yml 配置文件

```
version: "3"
services:
  jenkins:
    container_name: "jenkins"
    image: jenkins/jenkins:lts
    restart: always
    user: root:992
    ports:
      - "10080:8080"
      - "50000:50000"
      - "10051:10051"
    volumes:
      - /home/jenkins/data:/var/jenkins_home
      - /usr/bin/docker:/usr/bin/docker
      - /var/run/docker.sock:/var/run/docker.sock

```

命令启动

```
> docker run -d -u root -p 10080:8080 -p 50000:50000 -v /home/jenkins/data:/var/jenkins_home --name jenkins/jenkins:lts
```

### 权限问题

user: root:992

如果是以root用户执行  ， 请查看root gid   ~ user配置为root:GID

```
chown -R 1000:1000 /home/jenkins
```

> Jenkins构建shell脚本


```
#!/bin/bash

CONTAINER=${container_name}
PORT=${port}

#完成镜像的构建
echo 'start build docker image'

docker build --no-cache -t ${image_name}:${tag} .

docker run -itd --name $CONTAINER -p $PORT:80 ${image_name}:${tag}

echo 'build complete'
```

> 强制重新创建jenkens镜像

```
> docker-compose up --force-recreate -d
```

> 删除images

```
docker rmi images_hash_id
```


