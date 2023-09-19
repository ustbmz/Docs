# 大钱端之REDIS

* 缓存 （读写性能优异）
* 计数 & 消息系统 （ 高并发、发布 & 订阅阻塞队列功能 ）
* 分布式会话 session &  分布式锁 （秒杀）

## 安装方式

> 使用docker-compose 安装redis

```
version: "3.1"
services:
  redis:
    image: "redis"
    restart: always
    container_name: "redis"
    ports:
      - 15001:6379
    volumes:
      - /home/redis:/data
    command: ["redis-server", "--requirepass", "123456"]

```

> 使用docker run 命令启动redis

```
> docker run -itd --restart=always --name redis -p 15001:6379 -v - /home/redis:/data redis redis-server --requirepass 123456
```

## Redis CLi

> 进入容器终端   [RedisFans Doc](http://doc.redisfans.com/)

```
> docker exec -it redis /bin/bash
[root@706a75fbbc20:/data#] > redis-cli
or can use
> docker exec -it redis redis-cli
> auth 123456
```

#### 配置 redis Server 信息

```
const DB_URL = "mongodb://admin:admin123@118.25.150.195:27017/testdb"

const Redis = {
  host: '118.25.150.195',
  port: '150001',
  password: '123456'
}

export default {
  DB_URL,
  Redis
}
```

#### 配置 redisConfig.js   实现增删改查

```
import redis from 'redis'
import {
  promisifyAll
} from 'bluebird'
import config from './index'


const options = {
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
}


const client = promisifyAll(redis.createClient(options))

client.on('error', (err) => {
  console.log('redis connect errinfo :' + err)
})

const setValue = (key, value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return
  }
  if (typeof value === 'string') {
    return client.set(key, value)
  }
  if (typeof value === 'object') {
    Object.keys(value).forEach((item) => {
      client.hset(key, item, value[item], redis.print)
    })
  }
}

const getValue = (key) => {
  return client.getAsync(key)
}


const getHValue = (key) => {
  // use bluebird
  return client.hgetAsync(key)
}

const delValue = (key) => {
  // use bluebird
  return client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successful');
    } else {
      console.log('delete fail info:' + err);
    }
  })
}

export default {
  setValue,
  getValue,
  getHValue,
  delValue
}
```