# Promise

```js
setTimeout(()=>{
	console.log(1)
},1000)

console.log(2)
```



## event loop

```js
#回调地狱 
setTimeout(()=>{
	console.log(1)
	setTimeout(()=>{
		console.log(2)
	})
},1000)
```



## Promise

```js
new Promise((resolve,reject)=>{
  setTimeout(()=>{
    console.log(1)
    resolve()
  },1000)
}).then(()=>{
  console.log(2)
})
```



## Promise.all()

```js
const p1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    console.log('p1')
    resolve('p1')
  },1000)
})

const p2 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    console.log('p2')
    reject('p2')
  },2000)
})

Promise.all([p1,p2]).then((res)=>{
  console.log(res)
}).catch((err)=>{
  console.log('err')
})

Promise.race([p1,p2]).then((res)=>{
   console.log(res)
})
```