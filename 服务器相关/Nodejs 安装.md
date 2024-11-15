## NodeJS 安装与 PM2 后台启动

```shell
$ cd /opt
# 获取nodejs从阿里源,nodejs版本与开发版本保持一致
$ wget https://nodejs.org/download/release/v18.20.4/node-v18.20.4-linux-x64.tar.gz
# 解压
$ tar -zxvf node-v14.18.1-linux-x64.tar.gz
# 重命名文件夹为nodejs
$ mv node-v14.18.1-linux-x64/ nodejs
```

ln指令用于创建关联

**执行以下命令**

```shell
$ ln -s /opt/nodejs/bin/node /usr/bin/node
$ ln -s /opt/nodejs/bin/npm /usr/bin/npm
$ ln -s /opt/nodejs/bin/npx /usr/bin/npx
```



## 安装 PM2

首先需要安装pm2：

```undefined
npm install -g pm2
```

运行：

```css
pm2 start app.js
```

### 查看运行状态

我们可以通过简单的命令查看应用的运行状态：

```cpp
pm2 list
```

### 追踪资源运行情况

```undefined
pm2 monit
```

###  实时运行情况

如果我们想要查看一个应用详细的运行状态，比如`ANodeBlog`的状态，可以运行：

```undefined
pm2 describe 3
```

### 强健的API

在项目中运行：

```undefined
pm2 web
```

然后浏览器访问[http://localhost:9615](https://link.jianshu.com?t=http://localhost:9615) 你会有惊喜！

### 预定义运行配置文件

我们可以预定义一个配置文件，然后制定运行这个配置文件，比如我们定义一个文件`process.json`，内容如下：



```json
{
  "apps": [
    {
      "name": "ANodeBlog",
      "script": "bin/www",
      "watch": "../",
      "log_date_format": "YYYY-MM-DD HH:mm Z"
    }
  ]
}
```

然后可以通过

```css
pm2 start process.json
```

### 查用命令:

```shell
npm install -g pm2
# 启动应用
pm2 start app.js
# 列出所有应用
pm2 list
# 查看资源消耗
pm2 monit
# 查看应用详细部署状态
pm2 describe [app id]
# 查看所有日志
pm2 logs
# 重启应用
pm2 restart [app id]
# 停止应用
pm2 stop [app id]
# 开启api访问
pm2 web
```

更多pm2内容请参考官方文档：[http://pm2.keymetrics.io/docs/usage/quick-start](https://link.jianshu.com?t=http://pm2.keymetrics.io/docs/usage/quick-start)

