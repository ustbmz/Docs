# MongDB

> 使用 docker-compose 安装 mongdb

````
version: "3.1"

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

> 进入docker mongodb容器执行sql

```
> docker exec -it mongo_mongo_1 mongo

_ > use admin
_ > db.auth('root','pwd')
_ > use testDB
- > db.createUser('test')


root / admin123
```
````

````