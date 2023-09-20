# Week04 NoSQL数据库设计与集成

## NOSQL数据库设计原则

* 易扩展(数据结构不固定)
* 高性能 （高并发）
* 高可用
* 较容易引射的复杂数据
* 无事务特性要求（ACDI特性）

关系性数据库

> 采用了关系模型（类似一个类）来组织数据的数据库

**NoSQL是不同于传统的关系数据库的数据存储系统**

### NOSQL设计

1. **内嵌**

   > 存在管理关系的文档存在同一文档中，以数组的形式存放

   * 减少了关联的查询
   * 适合单类需要描述的属性
   * 不经常变化的属性（扩展，嵌套关联）

2. 父子引用

   > 父引用是指一对多的情况中，放在同一文档，以数据的形式存放
   >
   > 子引用是指一对非常多的情况中，由于数据库存放限制，进行反向引用

   * 引用数据内容是否非常多
   * 引用数据量是非非常大
   * 数据是否需要单独访问

3. 反范式

   > 范式指按照既定的用法，形成一种公认的模型或模式
   >
   > 反范式，不走寻常路

   * 是否有提升性能的区间
   * 数据量的变化是否非常庞大
   * 先考虑读写比，再考虑反范式

**设计原则**

* 优先考虑内嵌，如果单独访问，则不合适
* 数据不应该无限增长
* 考虑读写比，考虑反范式，考虑应用场景



## MongoDB

### Mongo的安装

Docker-compose文件安装方式

```shell
# Use root/example as user/password credentials
version: "3.1"

services:
  mongo:
    image: mongo
    restart: always
    container_name: "mongo"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: admin123
    ports:
      - 27017:27017
    volumes:
      - /Users/mew/Docker/mongo:/data/db
```

### MongoDB GridFS介绍

- GridFS 用于存储和恢复那些超过16M（BSON文件限制）的文件(如：图片、音频、视频等)。
- GridFS 也是文件存储的一种方式，但是它是存储在MonoDB的集合中。
- GridFS 可以更好的存储大于16M的文件。
- GridFS会将大文件对象分割成多个小的chunk(文件片段),一般为256k/个,每个chunk将作为MongoDB的一个文档(document)被存储在chunks集合中。
- GridFS 用两个集合来存储一个文件：fs.files与fs.chunks。
- 每个文件的实际内容被存在chunks(二进制数据)中,和文件有关的meta数据(filename,content_type,还有用户自定义的属性)将会被存在files集合中。

#### GridFS 添加文件

现在我们使用 GridFS 的 put 命令来存储 mp3 文件。 调用 MongoDB 安装目录下bin的 mongofiles.exe工具。
打开命令提示符，进入到MongoDB的安装目录的bin目录中，找到mongofiles.exe，并输入下面的代码：

```
>mongofiles.exe -d gridfs put song.mp3                                                        
```

`-d gridfs` 指定存储文件的数据库名称，如果不存在该数据库，MongoDB会自动创建。如果不存在该数据库，MongoDB会自动创建。Song.mp3 是音频文件名。
使用以下命令来查看数据库中文件的文档：

```
>db.fs.files.find()                        
```

### MongoDB新建用户及设置权限

> 终端中命令方式进行

```
docker exec -it [mongo容器名称] mongo

docker run -d -p 27017:27017 --name mongo --restart=always -e  MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 mongo

```

进入**mongo交互终端**，如图

<img src="https://gitee.com/cnmz/images/raw/master/images/20210628095016.png" alt="image-20210515111054939"  />

```shell
## 连接admin数据库
> use admin
## 登陆admin数据库
> db.auth('root','password')
## 查看数据库
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

## 新建 testdb 数据库
> use testdb
## 创建用户
> db.createUser({user:'test',pwd:'123456',roles:[{role:'dbOwner',db:'testdb'}]})
## 创建成功后返显
Successfully added user: {
	"user" : "test",
	"roles" : [
		{
			"role" : "dbOwner",
			"db" : "testdb"
		}
	]
}
## 使用新建用户登陆testdb
> use testdb
> db.auth('testdb','123456')
## 连接成功返回 1
1
```

### MongoDB增删改查

```shell
## 测试插入数据
> db.user.insertOne({name:'test',age:30,email:'test@mongo.com'})
## 成功后返显
{
	"acknowledged" : true,
	"insertedId" : ObjectId("609f3e97bde395dd7444deee")
}
## 显示所有collection
> show collection
system.users
system.version
user
## 查询user所有数据
> db.user.find()
{ "_id" : ObjectId("609f3e97bde395dd7444deee"), "name" : "test", "age" : 30, "email" : "test@mongo.com" }

## 更新一条
> db.user.updateOne({查询key:'查询value'},{更新key:'更新value'})
## 删除一条
> db.user.deleteOne({查询key:'查询value'},{更新key:'更新value'})
```

PS：更新CURD命令查看 [MongoDB官方CURD文档][https://docs.mongodb.com/manual/crud/]



### MongDB的备份与恢复

```
## 备份
docker exec -it mongo mongodump -h localhost -u root -p admin123 /tmp/backup
## 恢复
docker exec -it mongo mongorestore -h localhost -u root -p admin123 --dir /tmp/backup
```

#### TODO Docker 命令熟悉与CP命令的使用



## Moogoose 

### 关系性数据库 与 MongDB 以及 Mongoose 的区别

![image-20210515130644028](https://gitee.com/cnmz/images/raw/master/imgs/20210515130644.png)

### Moogoose的使用

> elegant [mongodb](https://www.mongodb.com/) object modeling for [node.js](https://nodejs.org/en/)
>
> Mongoose为模型提供了一种直接的，基于scheme结构去定义你的数据模型。它内置数据验证， 查询构建，业务逻辑钩子等，开箱即用。

```shell
## 安装mongoose 
npm install -S mongoose
```

> App.js

```javascript
## 引用
const mongoose = require('mongoose')

## 连接数据库
mongoose.connect('mongodb://test:123456@localhost:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology:true
})
## 新建Schema
const User = mongoose.model('users', {
  name: String,
  age: Number,
  email: String,
})
## 新建 User
const imooc = new User({
  name: "imooc",
  age: 20,
  email:"cnnn@163.com"
})
## 保存操作
imooc.save().then(() => {
  console.log('save suucess');
})
```

**Mongoose  [官方文档API][https://mongoosejs.com/docs/guide.html]**

### Mongoose 在项目中的实际运用

* **配置数据库连接文件 DBHelper.js**

  ```javascript
  import mongoose from 'mongoose'
  import config from './index'
  
  mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
  mongoose.connection.on('connected', () => {
    console.log('mongoose connected open to:'+config.DB_URL);
  })
  
  mongoose.connection.on('err', (err) => {
    console.log('mongoose connected errinfo:' + err)
  })
  
  mongoose.connection.on('disconnected', (err) => {
    console.log('mongoose connected disconnected:')
  })
  
  export default mongoose
  ```

* **配置实体类 Schema**

  ```javascript
  import mongoose from '../config/DBHelper'
  
  const TestSchema = mongoose.Schema({
    'name': { type: String },
    'age': { type: Number },
    'email': { type: String }
  })
  
  const TestModel = mongoose.model('users', TestSchema)
  
  export default TestModel
  ```

* **操作实体类 使用Model进行增删改查**

  ```javascript
  import User from './testSchema'
  
  const user = {
    name: 'test',
    age: 180,
    email:'api@imooc.com'
  }
  
  // 新增
  const insertMethods = async () => {
    const data = new User(user)
    const result = await data.save()
    console.log(result);
  }
  
  // 查询
  const findMethods = async () => {
    const result = await User.find()
    console.log(result)
  }
  
  // 更新
  const updateMethods = async () => {
    const result = await User.updateOne({name:'test'},{email:"update@163.com"})
    console.log(result)
  }
  
  // 删除
  
  const deleteMethods = async () => {
    const result = await User.deleteOne({ name: 'test' })
    console.log(result)
  }
  
  
  deleteMethods()
  ```

  

## Redis

### Redis的特点

* 高性能，持久化
* Key-value结构，支持复杂数据存储
* 支持事务，数据的原子性（要么全做/不做）

### Redis应用场景 （在内存中进行操作）

* 缓存 （读写性能优异）
* 计数/消息系统 （高并发，发布/订阅阻塞队列功能）(播放数据，浏览量)
* 分布式会话 & session & 分布式锁 （秒杀，刷票）

### Redis VS mongodb

* 存储方式 ： key-value  VS document
* 使用方式&可靠性：mongodb sql & ACQI 支持
* 应用场景 ： 高性能缓存 VS 海量数据分析

### Redis 安装

方式一：使用docker-compose 安装Redis

```shell
version: "3.1"
services:
  redis:
    image: "redis"
    restart: always
    container_name: "redis"
    ports:
      - 15001:6379
    volumes:
      - /Users/mew/Docker/redis:/data
    command: ["redis-server", "--requirepass", "123456"]

```

方式二: 使用命令行启动Redis

```02
docker run -itd --restart=always --name redis-test -p 15001:6379 -v /Users/mew/Docker/redis:/data redis redis-server --requirepass 123456
```

### Redis CLI

进行redis 交互终端

```shell
## 进入容器shell环境
> docker exec -it redis /bin/bash
## 进入redis 交互终端
> redis-cli
## 鉴权登陆 输入设置的鉴权密码
> auth 123456
```

### Redis 常用命令 [常用命令参考][http://doc.redisfans.com/]

* [SET](http://doc.redisfans.com/string/set.html) & [GET](http://doc.redisfans.com/string/get.html)

* [HSET](http://doc.redisfans.com/hash/hset.html) & [HGET](http://doc.redisfans.com/hash/hget.html)

* [HMSET](http://doc.redisfans.com/hash/hmset.html) & [HMGET][http://doc.redisfans.com/hash/hmget.html]


### Redis 订阅/发布模式

* [PUBLISH](http://doc.redisfans.com/pub_sub/publish.html)

  ```shell
  ## 发布
  publish test 'hello from test'
  publish test1 'hello from test01'
  ```

* [SUBSCRIBE](http://doc.redisfans.com/pub_sub/subscribe.html)

  ```shell
  ## 订阅 等待消息上送
  subscribe test test1
  ```

<img src="https://gitee.com/cnmz/images/raw/master/imgs/20210515202225.png" alt="image-20210515202219718" style="zoom:50%;" />

### Redis 服务维护

* [CLIENT LIST](http://doc.redisfans.com/server/client_list.html) 查看客户端连接状态
* [CONFIG SET](http://doc.redisfans.com/server/config_set.html#id1) 命令可以动态地调整 Redis 服务器的配置(configuration)而无须重启
* [SLOWLOG](http://doc.redisfans.com/server/slowlog.html)   是 Redis 用来记录查询执行时间的日志系统
* [FLUSHALL](http://doc.redisfans.com/server/flushall.html)   清空整个 Redis 服务器的数据(删除所有数据库的所有 key )
* [BGSAVE](http://doc.redisfans.com/server/bgsave.html)       后台异步(Asynchronously)保存当前数据库的数据到磁盘,客户端可以通过 [*LASTSAVE*](http://doc.redisfans.com/server/lastsave.html#lastsave) 命令查看相关信息，判断命令是否执行成功。



### redis的常见命令及用法 -- key操作命令

Redis数据类型相关的命令，如String、List、Set、Hashes和Sorted-Set。这些命令都具有一个共同点，即所有的操作都是针对与Key关联的Value的。本篇文章主要讲述与Key相关的Redis命令。学习这些命令对于学习Redis是非常重要的基础，也是能够充分挖掘Redis潜力的利器。

* **获取所有键**

> 语法：keys pattern

```
127.0.0.1:6379> keys *
1) "toimc"
```

`*`表示通配符，表示任意字符，会遍历所有键显示所有的键列表，时间复杂度O(n)，在生产环境不建议使用。

* **获取键总数**

> 语法：dbsize

```
127.0.0.1:6379> dbsize
(integer) 6
```

获取键总数时不会遍历所有的键，直接获取内部变量，时间复杂度O(1)。

* **查询键是否存在**

> 语法：exists key [key …]

```
127.0.0.1:6379> exists toimc java
(integer) 2                                                    
```

查询查询多个，返回存在的个数。

* **删除键**

> 语法：del key [key …]

```
127.0.0.1:6379> del java toimc
(integer) 1                                                    
```

可以删除多个，返回删除成功的个数。

* **查询键类型**

> 语法： type key

```
127.0.0.1:6379> type toimc
string                                                   
```

* **移动键**

> 语法：move key db

如把toimc移到2号数据库。

```
127.0.0.1:6379> move toimc 2
(integer) 1
127.0.0.1:6379> select 2
OK
127.0.0.1:6379[2]> keys *
1) "toimc"                                                 
```

* **查询key的生命周期（秒）**

> 秒语法：ttl key
> 毫秒语法：pttl key

```
127.0.0.1:6379[2]> ttl toimc
(integer) -1                                                      
```

-1：永远不过期。

* **设置过期时间**

> 秒语法：expire key seconds
> 毫秒语法：pexpire key milliseconds

```
127.0.0.1:6379[2]> expire toimc 60
(integer) 1
127.0.0.1:6379[2]> ttl toimc
(integer) 55                                                       
```

* **设置永不过期**

> 语法：persist key

```
127.0.0.1:6379[2]> persist toimc
(integer) 1                                                         
```

* **更改键名称**

> 语法：rename key newkey

```
127.0.0.1:6379[2]> rename toimc toimc123
OK                                                        
```

### redis的常见命令及用法 -- 字符串操作命令

字符串是Redis中最基本的数据类型，单个数据能存储的最大空间是512M。

* **存放键值**

> 语法：set key value [EX seconds] [PX milliseconds] [NX|XX]

nx：如果key不存在则建立，xx：如果key存在则修改其值，也可以直接使用setnx/setex命令。

```
127.0.0.1:6379> set toimc 666
OK                                                     
```

* **获取键值**

```
379[2]> get toimc
"666"                                                       
```

* **值递增/递减**

如果字符串中的值是数字类型的，可以使用incr命令每次递增，不是数字类型则报错。

> 语法：incr key

```
127.0.0.1:6379[2]> incr toimc
(integer) 667                                                     
```

一次想递增N用incrby命令，如果是浮点型数据可以用incrbyfloat命令递增。
同样，递减使用decr、decrby命令。

* **批量存放键值**

> 语法：mset key value [key value …]

```
127.0.0.1:6379[2]> mset java1 1 java2 2 java3 3
OK                                                          
```

* **获取获取键值**

> 语法：mget key [key …]

```
127.0.0.1:6379[2]> mget java1 java2
1) "1"
2) "2"                                                       
```

Redis接收的是UTF-8的编码，如果是中文一个汉字将占3位返回。

* **获取值长度**

> 语法：strlen key

```
127.0.0.1:6379[2]> strlen toimc
(integer) 3                                                        
```

* **追加内容**

> 语法：append key value

```
127.0.0.1:6379[2]> append toimc hi
(integer) 5                                                           
```

向键值尾部添加，如上命令执行后由666变成666hi

* **获取部分字符**

> 语法：getrange key start end

```
> 127.0.0.1:6379[2]> getrange toimc 0 4
"javas"                                                        
```

### redis的常见命令及用法 -- 数据库相关

#### 1. 数据库相关命令

Redis数据库的数量是固定的，并在配置文件中设置。默认情况下，你有16个数据库。每个数据库都由一个数字（而不是名称）来标识。

你可以使用以下命令`CONFIG GET databases`来了解数据库的数量：

```
CONFIG GET databases
1) "databases"
2) "16"
```

也可以使用以下命令`INFO`或者`INFO keyspace`列出定义了某些键的数据库：

```
INFO
# Server
redis_version:5.0.8
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:ce75a617c591114f
redis_mode:standalone
os:Linux 3.10.0-1062.4.1.el7.x86_64 x86_64
arch_bits:64
multiplexing_api:epoll
atomicvar_api:atomic-builtin
gcc_version:8.3.0
process_id:1
run_id:75ea4375ee7a6f41697f721e268d148dc8af24e8
tcp_port:6379
uptime_in_seconds:7316762
uptime_in_days:84
hz:10
configured_hz:10
lru_clock:2935552
executable:/data/redis-server
config_file:
​
# Clients
connected_clients:4
client_recent_max_input_buffer:2
client_recent_max_output_buffer:0
blocked_clients:0
​
# Memory
used_memory:925608
used_memory_human:903.91K
used_memory_rss:12644352
used_memory_rss_human:12.06M
used_memory_peak:3896552
used_memory_peak_human:3.72M
used_memory_peak_perc:23.75%
used_memory_overhead:892348
used_memory_startup:791296
used_memory_dataset:33260
used_memory_dataset_perc:24.76%
allocator_allocated:917808
allocator_active:1163264
allocator_resident:3743744
total_system_memory:16637751296
total_system_memory_human:15.50G
used_memory_lua:37888
used_memory_lua_human:37.00K
used_memory_scripts:0
used_memory_scripts_human:0B
number_of_cached_scripts:0
maxmemory:0
maxmemory_human:0B
maxmemory_policy:noeviction
allocator_frag_ratio:1.27
allocator_frag_bytes:245456
allocator_rss_ratio:3.22
allocator_rss_bytes:2580480
rss_overhead_ratio:3.38
rss_overhead_bytes:8900608
mem_fragmentation_ratio:14.31
mem_fragmentation_bytes:11760736
mem_not_counted_for_evict:0
mem_replication_backlog:0
mem_clients_slaves:0
mem_clients_normal:100460
mem_aof_buffer:0
mem_allocator:jemalloc-5.1.0
active_defrag_running:0
lazyfree_pending_objects:0
​
# Persistence
loading:0
rdb_changes_since_last_save:7989
rdb_bgsave_in_progress:0
rdb_last_save_time:1606231526
rdb_last_bgsave_status:ok
rdb_last_bgsave_time_sec:-1
rdb_current_bgsave_time_sec:-1
rdb_last_cow_size:0
aof_enabled:0
aof_rewrite_in_progress:0
aof_rewrite_scheduled:0
aof_last_rewrite_time_sec:-1
aof_current_rewrite_time_sec:-1
aof_last_bgrewrite_status:ok
aof_last_write_status:ok
aof_last_cow_size:0
​
# Stats
total_connections_received:4006
total_commands_processed:81735
instantaneous_ops_per_sec:0
total_net_input_bytes:3084119
total_net_output_bytes:22777832
instantaneous_input_kbps:0.00
instantaneous_output_kbps:0.00
rejected_connections:0
sync_full:0
sync_partial_ok:0
sync_partial_err:0
expired_keys:759
expired_stale_perc:0.00
expired_time_cap_reached_count:0
evicted_keys:0
keyspace_hits:63631
keyspace_misses:2192
pubsub_channels:0
pubsub_patterns:0
latest_fork_usec:0
migrate_cached_sockets:0
slave_expires_tracked_keys:0
active_defrag_hits:0
active_defrag_misses:0
active_defrag_key_hits:0
active_defrag_key_misses:0
​
# Replication
role:master
connected_slaves:0
master_replid:7e9137e98814fa2b756aff0e339de997cc1309a1
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
​
# CPU
used_cpu_sys:8093.459923
used_cpu_user:4547.190025
used_cpu_sys_children:0.011915
used_cpu_user_children:0.003634
​
# Cluster
cluster_enabled:0
​
# Keyspace
db0:keys=7,expires=1,avg_ttl=177400

```

查看单个片区：

```
INFO keyspace
# Keyspace
db0:keys=10,expires=0
db1:keys=1,expires=0
db3:keys=1,expires=0
12345
                                
代码块                                                            
```

或者使用redis的GUI工具来查看：

#### 2. 推荐redis学习文档

更多redis的命令可以参考如下网址：

[1] http://doc.redisfans.com/

[2] http://www.redis.cn/



### 项目中redis实现CURD

> 配置RedisConfig.js

```javascript
import redis from 'redis'
import config from '../config/index'

const options = {
  host: config.Redis.host,
  port: config.Redis.port,
  password: config.Redis.password,
  detect_buffers: true,
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted')
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  },
}

const client = redis.createClient(options)
// 监听连接状态
client.on('error', (err) => {
  console.log('Redis is open fail errinfo:' + err)
})

const setValue = (key, value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return
  }
  if (typeof value === 'string') {
    client.set(key, value)
  }
  if (typeof value === 'object') {
    // { key1:value1 , key2,value2}
    Object.keys(value).forEach((item) => {
      client.hset(key, item, value[item], redis.print)
    })
  }
}
const { promisify } = require('util')
const getAsync = promisify(client.get).bind(client)

const getValue = (key) => {
  return getAsync(key)
}

const getHValue = (key) => {
  return promisify(client.hgetall).bind(client)(key)
}

const delValue = (key) => {
  return client.del(key, redis.print)
}

export { client, setValue, getValue, getHValue, delValue }
```

> 测试demo JS

```javascript
import { setValue, getValue, getHValue, delValue } from '../config/RedisConfig'

setValue('setJS', 'this data is from api project')

getValue('setJS').then((res) => {
  console.log(res)
})

delValue('setJS')

setValue('setHvalue', { name: 'imooc', age: 20, email: 'imooc@imooc.com' })

getHValue('setHvalue').then((res) => {
  console.log(JSON.stringify(res))
})
```

