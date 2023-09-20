# WEEK06 团队协作

## 文档管理 MarkDown

### 认识MarkDown

> 省略

## 安装ShowDoc. (接口API管理)

官方中文安装文档[Docker方式安装][https://www.showdoc.com.cn/help?page_id=65610]

```shell
# 原版官方镜像安装命令(中国大陆用户不建议直接使用原版镜像，可以用后面的加速镜像)
> docker pull star7th/showdoc 
# 中国大陆镜像安装命令（安装后记得执行docker tag命令以进行重命名）
> docker pull registry.cn-shenzhen.aliyuncs.com/star7th/showdoc
> docker tag registry.cn-shenzhen.aliyuncs.com/star7th/showdoc:latest star7th/showdoc:latest 

## 在macos中新建showdoc目录
> mkdir -p /Users/mew/Docker/showdoc/html
## 增加权限
> chmod -R 777 /Users/mew/Docker/showdoc

## 启动showDoc
> docker run -d --name showdoc -p 13500:80 -v /home/showdoc/html/:/var/www/html/ star7th/showdoc

```

**PS : M1 无法使用此方法安装show doc**



## 缺陷管理

Code Reiw



## 缺陷控制之质量管理工具

### ESLint 安装及配置使用