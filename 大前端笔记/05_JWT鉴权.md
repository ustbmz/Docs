# Week05 JWT鉴权

![image-20210520092655673](https://gitee.com/cnmz/images/raw/master/imgs/20210520092655.png)



**鉴权方式:**

	* jwt  无状态
	* session / cookie
	* oAuth 2.0 ( 常见于第三方登陆 )



**登陆鉴权**

* 鉴权 

  * 基础鉴权

  * JWT  [json web token][https://jwt.io/introduction]

    * 优点：

      * 易扩展
      * 支持移动设备
      * 跨应用调用
      * 安全
      * 承载信息丰富

      缺点：

      * 刷新与过期处理
      * Payload不易过大 ( 造成网络资源压力 )
      * 中间人攻击 ( 非法获取token后，在token有效期内，都可以使用 )

  * Session (服务器)/ cookie (客户端)

    * 优点：易扩展，简单
    * 缺点：
      * 安全性低
      * 性能低，使用服务器存储
      * 多服务器同步困难 （ 需要借助redis等服务 ）
      * 跨平台困难

  * Oauth

    * 优点：开放，安全，简单，权限指定
    * 缺点：
      * 需要增加授权服务器
      * 增加网络请求

* 算法 / 加密 对传输的数据进行加密

  * Base64
  * MD5 / SHA-1
  * DES / AES
  * RSA / ECC

* HTTPS. 对通信通道进行加密  （ SSL+HTTP ）

  * SSL
  * HTTP协议
  * 数据篡改
  * 敏感信息
  * 中间人

## 什么是JWT

什么是JWT   一个jwt通常由三部分组成

### **Header** （头部）

> 定义了token使用的加密方式及类型

```json
{
	"alg":"HS256",
	"type":"JWT"
}
```



### Payload （载客）

> token中包括的一些信息 例如过期时间，用户信息等

```json
{
	"sub":"2021-05-20",
	"name":"username",
	"admin":true,
}
```



### Signature （签名）

> ​	通过header payload base64或其他加密算法生成的签名
>
> ​	jwt验证就是对比前后端签名信息是否一致

```json
HMACSHA256{
	base64URLEncode(header)
	base64URLEncode(payload)
	secret ( 自定义的密钥 )
}
```



## JWT的特点

* 防止CSRF ( 主要是伪造请求，带上cookie )
* 适合移动端应用
* 无状态，编码数据

### 一个标准的jwt.  

```jwt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.       ----> header 请求头 带token
eyJzdWIiOiIyMDIwLTA1LTIwIiwibmFtZSI6IkpXVCIsImFkbWluIjp0cnVlfQ.    -----> token  用户数据
JlNOZFGNNCtadC6_l-Ljb16SWxOsPO5KafutBDdho_k         ---- sercet  自定义密钥
```

### 解码后的数据

```json
## HEADER:ALGORITHM & TOKEN TYPE
{
  "alg": "HS256",
  "typ": "JWT"
}
## PAYLOAD:DATA
{
  "sub": "2020-05-20",
  "name": "JWT",
  "admin": true
}
## VERIFY SIGNATURE
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
	sercet
)
```

## JWT的工作原理

![image-20210520091048395](https://gitee.com/cnmz/images/raw/master/imgs/20210520091055.png)



> 安全性: 并没有绝对的安全，中间人如果拿到token，在token的有效期内，都可以使用用户信息

加强安全性：进行通道加密https , 即使中间人拿到token，也无法破解用户信息



### 算法和加密 

> 数据加密就是通过一段算法，使其变为一段密文。从而达到保护数据的目的。

对称加密:  加密与解密方 加密密钥与解密密钥是同一密钥

非对称加密： 加密与解密方 加密密钥与解密密钥是两套密钥



### HTTPS 安全传输协议

> **超文本安全传输协议**

​		**在https通信之前，会有一次握手的过程，这个时候服务器端和客户端就有了一个对称的密钥，后面的传输过程就是一个对称的加密解密的过程**



### API安全设计

* 通信信道加密：使用HTTPS
* 数据加密:  密文 + 加密关键数据
* 通信安全策略 ：授权中间层，尝试次数，过期策略......  ( 牺牲用户体验 , 按需取用 )



## 前端项目使用Veevalidata 4.x

TODO 



## AXIOS封装

**使用 Interceptors** （拦截器）[GitHub axios API][https://github.com/axios/axios#interceptors]

> **在请求或响应被 then 或 catch 处理之前截获报文进行统一处理**

### **配置axios入口拦截器**

#### 初步封装**axios.js**

```javascript
// 封装axios 返回重新封装后的报文数据
// 进行异常处理
import axios from 'axios'
import errorHandle from './errorHandle'

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: 10000,
})
// Add a request interceptor
// 发送请求拦截
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log(config);
    return config
  },
  (err) => {
    // Do something with request error
    
    errorHandle(err)
    return Promise.reject(err)
  }
)

// Add a response interceptor
// 响应拦截
instance.interceptors.response.use(
  (res) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  },
  (err) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    debugger
    errorHandle(err)
    return Promise.reject(err)
  }
)
export default instance
```

#### 使用ES6 语法封装axios.js

```javascript
// 封装axios 返回重新封装后的报文数据
// 进行异常处理
import axios from 'axios'
import errorHandle from './errorHandle'

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  // 获取配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      timeout: 10000,
    }
    return config
  }
  // 设置拦截器
  interceptors(instance) {
    // Add a request interceptor
    // 发送请求拦截
    instance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        console.log(config)
        return config
      },
      (err) => {
        // Do something with request error

        errorHandle(err)
        return Promise.reject(err)
      }
    )
    // Add a response interceptor
    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (res.status === 200) {
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      },
      (err) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        debugger
        errorHandle(err)
        return Promise.reject(err)
      }
    )
  }
  // 创建实例
  request(options) {
    const instance = axios.create()
    //Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    // return instance.request(newOptions)
    return instance(newOptions)
  }
  get (url, config) {
    const options = Object.assign({
      method: "get",
      url:url
    }, config)
    return this.request(options)
  }
  post (url, data, config) {
    const options = Object.assign(
      {
        method: 'get',
        url: url,
        data:data
      },
      config
    )
    return this.request(options)
  }
}
export default HttpRequest
```

#### **Request.js**

```javascript
import HttpRequest from './axios';
import config from '../config/index'
const baseUrl = process.env.NODE_ENV === 'development' ? config.basrUrl.dev : config.basrUrl.pro
const axios = new HttpRequest(baseUrl)

export default axios
```

#### Config/**index.js**

```javascript
export default {
  basrUrl: {
    dev: 'http://localhost:3000',
    pro: 'http://www.ustbmz.com:80',
  },
}
```





### 前端登陆页面生成uuid 

login js**引入uuid v4**

```javascript
import { v4 as uuidv4 } from 'uuid';
mounted () {
    console.log("login mounted");
    let sid = ''
    if(localStorage.getItem('sid')){
      sid = localStorage.getItem('sid')
    }else{
      sid = uuidv4()
      localStorage.setItem('sid',sid)
    }
  	// 使用vuex保存
    this.$store.commit('setSid', sid)
    console.log(sid);
    this._getCode()
  },
```





### 提高jwt安全性的策略

* https
* 服务器存储jwt的sercet,动态sercet
* 设置短期的token,设置刷新token



#### 使用koa-jwt依赖包来进行鉴权

官方api实例 [koa-jwt][https://www.npmjs.com/package/koa-jwt]

配置index.js. 项目入口文件，引用koa-jwt (使koa具有jwt的功能,但jwt鉴权还是需要jasonwebtoken库来运行)

```javascript
import koa from 'koa'
import JWT from 'koa-jwt'
import path from 'path'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routes/routes'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import cors from '@koa/cors'
import compose from 'koa-compose'
import compress from 'koa-compress'
import config from './config/index'
import errorHandle from './common/ErrorHandle'

const app = new koa()

const isDevMode = process.env.NODE_ENV === 'production' ? false : true

// 定义公共路径，不需要jwt鉴权
const jwt = JWT({ secret: config.JWT_SECRET }).unless({ path: [/^\/public/, /\/login/] })

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet(),
  ## 使用errorHandle处理所有异常报错
  errorHandle,
  jwt
])

if (!isDevMode) {
  app.use(compress())
}

app.use(middleware)
app.use(router())

app.listen(3000)
```






### **配置异常处理公共方法**

> 使用koa-jwt 处理jwt鉴权报错

```javascript
// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});
```

> 处理其他异常报错

```javascript
export default (ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: 'Protected resource, use Authorization header to get access\n'
      }
    } else {
      ## 处理鉴权失败之外的其他报错
      ## 统一返回500 错误码
      ctx.status = err.status || 500
      ctx.body = Object.assign({
        code: 500,
        msg: err.message,
      }, process.env.NODE_ENV === 'development' ?
        { 
        ## 如果是dev环境，则返回具体异常
        ## 否则返回空
        	stack: err.stack 
        } : {})
      // console.log(err.stack);
    }
  });
}
```



### 调试项目 - Vscode 支持 alisa

安装vscode 插件.  Node_modules_resolve

> 添加并配置 jsconfig.json 文件，项目根目录

```json
{
    "compilerOptions": {
      "target": "es2017",
      "allowSyntheticDefaultImports": false,
      "baseUrl": "./",
      "paths": {
        "@/*": ["src/*"]
      }
    },
    "exclude": ["node_modules", "dist"]
}
```

更多参数说明：见vscode官方文档对于 jsconfig 的说明



### 调试项目 -  Vscode 配置 debug 启动脚本

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "npm",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "runtimeArgs": ["run-script", "dev"],
      "port": 9229
    }
  ]
}
```

### HomeWork - 登录鉴权之单点登录及Node实现

```
讨论题】登录鉴权之单点登录及Node实现方案讨论
讨论描述：
登录鉴权的方式，我们课程中采用的是JWT的方案，而在一些大型的系统中，会考虑cookie/session + 单点登录的方案。什么是单点登录？

单点登录（Single Sign On），简称为SSO，是比较流行的企业业务整合的解决方案之一。 SSO的定义是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统。

如果用Node来实现单点登录，我们需要考虑什么？

思路和点拨：
首页，我们应该了解单点登录解决的问题是什么，应用场景是什么？

公司项目中如果有单点登录的场景，与后台人员讨论单点登录的原理。之后，针对 Node服务来设计单点登录时，应该考虑的技术栈，从koa&express这些基础的框架出发，看看有没有比较成熟的技术栈，然后再从上层框架Egg.js，nestjs等，来选择合适的方案。确定方案后，构建最小的闭环，测试单点登录的实现。

常见的坑点：
a. 前端无法访问cookie
b. 如何透传cookie
c. 多个域名如何解决跨域问题

单点登录失败的原因：
a.跨域请求被浏览器拦截
b.服务器未及时响应（超时）
c.请求被浏览器插件拦截
d.该数据直接采用了缓存，并没有发送请求
```

### END 登陆鉴权总结

# Week05  Vue深入

## MVVM设计模式

TODO

## Vue-CLI入门



> JavaScript 小知识

```javascript
list.push(this.utils)
## 这时的utils只是做了一个指向
## 如果this.utils被清空,list里的内容会push一个空的utils 

## 使用...扩展运算符
list.push({...this.utils})
## let obj = new Object{}
## obj.name = this.utils.name
## 改写为 {...Object}写法后。相当于 new Object{this.utils}
```

