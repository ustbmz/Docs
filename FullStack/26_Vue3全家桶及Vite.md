# Vue3全家桶及Vite

## Vue3 Router的变化

> $router 的属性将会被编码，以下行为的编码格式将保持与浏览器一致

* push
* resolve
* replace

```js
## vue2
this.$router.push({name:''})

## vue3
router.push({
    name:'not-found',
    params:{
		pathMatch:'not/found'   
    }
})
```

> 编码后为 not%2found

想保持浏览器正常显示url地址

```js
## 改写push方法中的pathMatch传参
router.push({
    name:'not-found',
    params:{
		pathMatch:['not','found']
    }
})

## 改写 router.index.js 中的通配规则
## router.js
{
	path:'.pathMatch(.*)*'
	components:NotFound
}

#### 或 ####
## 改写push中的参数后缀增加url 
router.push({
    name:'not-found',
    params:{
		pathMatch:'/not/found/url'
    }
})

## 这样做 router.js 中不用正则匹配数组
{
	path:'.pathMatch(.*)'
	components:NotFound
}
```



> vue3 使用具名路由时，如果不存在，不会通配到not-found ，也不会跳转至根路径
>
> 而是会抛出异常



Vue3 在默认路径为空的情况下，不会加上 '/'



![image-20210916004836174](https://gitee.com/cnmz/images/raw/master/mdpic/image-20210916004836174.png)

> vuex 的变化

* 使用createstore创建store实例
* 在setup是使用 useStore 来引用store对象
* createLogger 单独抽离，其他方法保持 OptionsAPI 一致



完成项目

![image-20210917203911395](https://gitee.com/cnmz/images/raw/master/mdpic/image-20210917203911395.png)





# Vite



* npm init vite-app <project-name>
* vite 支持热更新，冷启动
* vite 提供打包构建语言，按需进行打包



![image-20210917205716356](https://gitee.com/cnmz/images/raw/master/mdpic/image-20210917205716356.png)



![image-20210917205749102](https://gitee.com/cnmz/images/raw/master/mdpic/image-20210917205749102.png)

# RollUP

Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。



![image-20210917205833911](https://gitee.com/cnmz/images/raw/master/mdpic/image-20210917205833911.png)



![image-20210917205848889](https://gitee.com/cnmz/images/raw/master/mdpic/image-20210917205848889.png)





![image-20210917210622774](https://gitee.com/cnmz/images/raw/master/mdpic/image-20210917210622774.png)



