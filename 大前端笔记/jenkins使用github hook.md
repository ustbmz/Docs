

### 配置 Github 项目 Settings -- Webhooks





### Jenkins 配置触发选项

**勾选 GitHub hook trigger for GITScm polling**



### 配置Jenkins 执行Shell

```shell
#!/bin/bash

CONTAINER=${container_name}
PORT=${port}

echo "== Step One ==> Shell logs : delete jenkins none images"
## 删除none镜像
docker stop $(docker ps -a | grep "Exited" | awk '{print $1 }')
docker rm $(docker ps -a | grep "Exited" | awk '{print $1 }')
docker rmi $(docker images | grep "none" | awk '{print $3}')

echo "== Step Two ==>Shell logs : Starting Buliding API Project"
## 完成了镜像的构建
docker build --no-cache -t ${image_name}:${tag} .

echo "== Step Three ==>Shell logs : Check image is running or not"
## 判断docker镜像是否已存在
RUNNING=${docker --inspect --formate=" .{{ .State.Running}}" $CONTAINER 2 > /dev/null}

## 判断容器已存在
if [ ! -n RUNNING ]; then
  echo "$CONTAINER does not exits"
  return 1
fi
## 判断容器已存在
if [ "RUNNING" == "false" ]; then
  echo "$CONTAINER is not running"
  return 2
else
  echo "$CONTAINER is running"
  ## 删除同名容器
  matchingStarted=$(docker ps --filter="name=$CONTAINER" -q | xargs)
  if [ -n $matchingStarted ]; then
  	docker stop $matchingStarted
  fi
  
  matching=$(docker ps -a --filter="name=$CONTAINER" -q | xargs)
  if [ -n $matching ]; then
  	docker rm $matching
  fi
fi

echo "API RUNNING IS $RUNNING"

echo "== Step Four ==>Shell logs : Docker Runing API build image"
## 启动镜像 -itd 后台启动
docker run -itd --name $CONTAINER -p $PORT:12005 ${image_name}:${tag}
```



### 项目中构建 Dockerfile

```dockerfile
## 打包使用的node版本
FROM node:lts-alpine as build-stage
## auth
LABEL maintainer="cnmz@msn.com"
## 创建工作目录
WORKDIR /app
## 复制项目文件至镜像目录
COPY . .
## 构建项目  

RUN npm install
## RUN yarn install --registry https://registry.npm.taobao.org
COPY . .
RUN npm run build

## 打包环节结束
# production stage
## 发布资源
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

