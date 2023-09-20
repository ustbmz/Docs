# 12周 WebSocket

**浏览器端**

**`WebSocket` 对象提供了用于创建和管理 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API) 连接，以及可以通过该连接发送和接收数据的 API**

MongoDB 中聚合(aggregate)主要用于处理数据(诸如统计平均值，求和等)，并返回计算后的数据结果。

[ webSocket API ] https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket

[ scoket.io doc ] https://socket.io/docs/v4

**服务器端** 

```

## ws https://www.npmjs.com/package/ws
npm install -s ws
```

### Homework

#### 基础讨论：如何理解socket与websocket？





### websocket鉴权

* 协议本身在握手阶段不提供鉴权方案
* 浏览器：url传参,message主动消息( jsonwebtoken ),session/cookie
* Nodejs: 直接使用jet



### WebSocket 缓存设计



![image-20210713160032946](https://gitee.com/cnmz/images/raw/master/images/20210713160038.png)





4.3 开发我的消息组件



### mongoose 联合查询

方法一：嵌套查询 aggregate [ 官方api ] https://docs.mongodb.com/manual/aggregation/

**使用聚合管道执行聚合操作。管道允许用户通过一系列基于阶段的操作来处理来自集合或其他源的数据。**

```sql
db.getCollection('comments').aggregate([
    {$match:{_id:ObjectId("60e804e120b537172d3589e4")}},
    {$addFields:{pid:{$toObjectId:"$tid"}}},
    {   $lookup:{ from:"posts",localField:"pid",foreignField:"_id",as:"post" }}
])
```

使用let改写

```sql
db.getCollection('comments').aggregate([
{$match:{_id:ObjectId("60e804e120b537172d3589e4")}},
{   $lookup:
		let: { pid:{$toObjectId:"$tid"}},
    pipeline:[
    	{$match:{$expr:{$eq::["$_id":"$$pid"]}}},
    	{$project:{_id:1,uid:1,content:1}}
    ]
])
```

最终联合查询sql语句
```sql
db.getCollection('comments').aggregate([
{   
    $lookup:{
        from:"posts",
        let: { pid:{$toObjectId:"$tid"}},
        pipeline:[
            { $match: {$expr: {$eq: ["$_id","$$pid"]}} },
            { $project: { _id:1, uid:1, content:1}}
        ],
        as:"post"
    }
},
## 替换数组 post 0下标作为根数据
{
    $replaceRoot : {
        newRoot:{
            $mergeObjects : [{ $arrayElemAt : ['$post', 0 ]},"$$ROOT" ]
        }
    }    
    
},
## 更改别名
{ $addFields:{ userId : {$toObjectId : "$uid" }}},
## 使用别名查询 users 表数据 ，结果为tuid的array数组
{ $lookup: {from:"users",localField:"userId",foreignField:"_id",as:"tuid"}},
{ $unwind:"$tuid"},
{ $addFields:{ fuserid : {$toObjectId : "$cuid" }}},
{ $lookup: {from:"users",localField:"fuserid",foreignField:"_id",as:"fuid"}},
{ $unwind:"$fuid"},
{ $project:{ post: 0 ,tuid:{username:0,password:0}, fuid:{username:0,password:0},userId:0,fuserId:0, tid:0,cuid:0  }},
{ $match:  {uid:"60e51b45f355191164534e24"} },
])
```





方法二:  通过冗余换时间

> 在comments表中增加帖子作者字段 关联user表

```js
const result = await Comments.find({ uid: obj.id, cuid: { $ne: obj.id } })
      ## 帖子作者
			.populate({
        path: 'uid',
        select: '_id name'
      })
			## 评论用户
      .populate({
        path: 'cuid',
        select: '_id name'
      })
			## 帖子标题
      .populate({
        path: 'tid',
        select: '_id title'
      }).sort({ created: -1 })

```



## 消息组件集成 websocket  在vuex中进行调用

### 前端初始化websocker客户端 

```js
import store from "@/store/index"

class WebSocketClient {
  constructor(config = {}) {
    const defaultConfig = {
      url: '127.0.0.1',
      port: '3001',
      protocol: 'ws'
    }
    const finalConfig = { ...defaultConfig, ...config }
    this.wc = {}
    this.url = finalConfig.url
    this.port = finalConfig.port
    this.protocol = finalConfig.protocol
  }

  init () {
    this.wc = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = this.onOpen
    this.ws.onmessage = this.onMessage
    this.ws.onclose = this.onClose
    this.ws.onerror = this.onError
  }

  onOpen () {
    console.log('open:' + this.ws.readyState)
    // 发起鉴权请求
    this.ws.send(
      JSON.stringify({
        event: 'auth',
        message: 'Bearer ' + this.$store.state.token,
      })
    )
  }
  onMessage (event) {
    // 当用户未进入聊天室，则不接收消息
    if (this.isShow) {
      return
    }
    // 接收服务端发送过来的消息
    var obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'noauth':
        // 鉴权失败
        // 路由跳转到 /login 重新获取token
        console.log('noauth');
        break
      case 'heartbeat':
        //this.checkServer() // timeInterval + t
        // 可以注释掉以下心跳状态，主动测试服务端是否会断开客户端的连接
        this.ws.send(
          JSON.stringify({
            event: 'heartbeat',
            message: 'pong',
          })
        )
        break
      default:
        store.dispatch(obj.event, obj)
    }
  }
  onClose () {
    // 当链接主动断开的时候触发close事件
    console.log('close:' + this.ws.readyState)
    console.log('已关闭websocket')
    this.ws.close()
  }
  onError () {
    // 当连接失败时，触发error事件
    console.log('error:' + this.ws.readyState)
    console.log('websocket连接失败！')
    // 连接失败之后，1s进行断线重连！
    setTimeout(function () {
      this.init()
    }, 30 * 1000)
  }
}

export default WebSocketClient
```



### 后端配置WebSocket服务 

> 使用ws库，考虑降级IE兼容性等因素可使用socketio库

```js
import WebSocket from 'ws'
import { getJWTPayload } from '@/common/Utils'

class WebSocketServer {
  constructor (config = {}) {
    const defaultConfig = {
      port: 3001,
      timeInterval: 30 * 1000,
      isAuth: true
    }
    // 最终的配置
    const finalconfig = { ...defaultConfig, ...config }
    this.wss = {}
    this.interval = finalconfig.timeInterval
    this.port = finalconfig.port
    this.isAuth = finalconfig.isAuth
  }

  // 初始化websocket服务
  init () {
    this.wss = new WebSocket.Server({
      port: this.port, ...this.options
    })

    // 连接信息
    this.wss.on('connection', (ws) => {
      ws.isAlive = true
      ws.on('message', (msg) => this.onMessage(ws, msg))
      ws.on('close', (msg) => this.onClose(ws))
    })
  }

  onMessage (ws, msg) {
    // 用户鉴权
    const msgObj = JSON.parse(msg)

    const events = {
      auth: async () => {
        try {
          const obj = await getJWTPayload(msgObj.message)
          if (obj) {
            ws.isAuth = true
            ws._id = obj.id
            ws.send(JSON.stringify({
              event: 'auth',
              message: 'auth is ok'
            }))
          }
        } catch (error) {
          ws.send(JSON.stringify({
            event: 'noauth',
            message: 'auth is fail'
          }))
        }
      },
      heartbeat: () => {
        if (msgObj.message === 'pong') {
          ws.isAlive = true
        }
      },
      message: () => {
        if (!ws.isAuth && this.isAuth) {
          return
        }
        this.wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN && client._id === ws._id) {
            this.send(msg)
          }
        })
      }
    }
    events[msgObj.event]()

    // 心跳检测
    // 消息发送
  }

  send (uid, msg) {
    this.wss.clients.forEach((client) => {
      ## 如果客户端在线，则发送消息通知
      if (client.readyState === WebSocket.OPEN && client._id === uid) {
        client.send(msg)
      }
    })
  }

  broadcast (msg) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg)
      }
    })
  }

  onClose (ws) {

  }

  heartbeat () {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.wss.clients.forEach((ws) => {
        if (!ws.isAlive) {
          return ws.terminate()
        }
        // 主动发送心跳检测请求
        // 当客户端返回了消息之后，主动设置flag为在线
        ws.isAlive = false
        ws.send(JSON.stringify({
          event: 'heartbeat',
          message: 'ping'
        }))
      })
    }, this.timeInterval)
  }
}

export default WebSocketServer

```

### **开启websocket 服务**

index.js中启用websocket服务

```js
// 初始化websocket
const ws = new WebSocketServer()
ws.init()
## 配置全局对象
global.ws = ws
```

#### **在评论接口代码中调用websocket发送消息功能**. commentsController.js

```js
global.ws.send(post.uid, JSON.stringify({
      event: 'message',
      message: counts
    }))
```

### VUEX  -  dispatch 

进入路由时，使用store.commit('initWebSocket',{}) 初始化ws客户端。准备接受服务器分发的消息

### 分发Action, 接受服务器消息

Action 通过 `store.dispatch` 方法接受websocket消息

```js
import Vue from 'vue'
import Vuex from 'vuex'
import WebSocketClient from '../utils/websocket';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    isHide: false,
    ws: null,
    num: 0
  },
  mutations: {
    initWebSocket (state, config) {
      state.ws = new WebSocketClient(config)
      state.ws.init()
    },
    setSid (state, value) {
      state.sid = value
    },
    setToken (state, value) {
      if (value === '') return
      state.token = value
      localStorage.setItem('token', value)
    },
    // 设置用户的基本信息
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      // 本地存储用户的基本信
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置isLogin的状态
    setIsLogin (state, value) {
      state.isLogin = value
    },
    setHide (state, value) {
      state.isHide = value
    },
    setMessage (state, value) {
      state.num = value.message ? value.message : 0
    }
  },
  actions: {
    message ({ commit }, msg) {
      commit('setMessage', msg)
    }
  },
  modules: {
  }
})
```



