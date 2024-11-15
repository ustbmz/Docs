# MongDB

使用 docker-compose 安装 mongdb

```shell
services:
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: admin123
    ports:
      - 27017:27017
    volumes:
      - /home/mongo:/data/db
```

进入docker mongodb容器执行sql


```shell
> docker exec -it mongo_mongo_1 mongo

_ > use admin
_ > db.auth('root','pwd')
_ > use testDB
- > db.createUser('test')
```

初始化操作

```sql
$ mongosh
> use admin
> db.auth('root','admin123')
```

创建管理员

```sql
> use codestation
> db.createUser({user:"admin",pwd:"admin123Four",roles:[{role:"dbOwner",db:"codestation"}]})
```

插入测试数据

```sql
> db.users..insertMany([
    { name: "Bob", age: 30, city: "San Francisco" },
    { name: "Carol", age: 27, city: "Chicago" },
    { name: "Dave", age: 22, city: "Los Angeles" }
])
```

