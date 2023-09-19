# ES6 从 6 入门到 10 放弃 :smile:

语法本身并不重要，怎么解决问题！怎么更好的解决问题才是本质

ES6 --> ES7、8、9、10 利用新技能拓宽解决问题的思路

- #### 全新的 JavaScript 体系

- #### 字符串模板（直接赋值变量，支持表达式）

- #### 监听数据

- #### 自定义数据结构，遍历

ES7 --> ES10 全新体系,改变 JS 书写习惯

学习方法

- 体验乐趣 1 天
- 进入状态 10 天
- 养成习惯 1 个月后
- 收获知识 3 个月后
- 行程思维习惯 5 个月后

## ES6 基础语法 \_作用域

- ## Let & Const

- 全局作用域

  ```javasc
  var abc = 1234       (全局变量)
  abcd = 2345         （全局作用域）（作为window属性使用,可被删除）
  window.delete abcd   // true
  ```

- 函数作用域 - 块状作用域

  ```javascript
  function test() {
    var a = 3;
    函数作用域;
    if (true) {
      块状作用域;
    }
    function test2() {
      var b = 4;
      let c = 4; // let 当前{}块状作用域
      return a + b;
    }
    //作用域链,向上找
    test2();
    函数作用域;
  }
  ```

- #### 动态作用域

  ```javascript
  window.a = 3;
  
  function test() {
    console.log(this.a);
  }
  // this 动态作用域变量
  test();
  test.bind({ a: 100 })();
  ```

* Const 常量

  ```javascript
  const a
  a = 3
  
  const a = 3
  a = 4
  // two error example
  ```

- 附加阅读

  - 什么是作用域
  - JavaScript 词法作用域 和 动态作用域
  - 深入理解 JS 中声明提升、作用域链和 this 关键字

## 数组 *遍历 *转换 *生成 *查找

- ES5 中有多少种遍历的方法?
  优势缺点？数组? object?

```javascript
	const arr = [1,2,3,4,5]
	// 第一种
	for(let i=1,i<=arr.lenght,i++){
		console.log(arr[i])
	}
	// 第二种 不支持 break,continue
	arr.foreach(function item(){
		console.log(item)
	})
	// 第三种 可return false 跳出循环
	arr.every(function item(){
    console.log(item)
    return true
  })
	// 第四种 for in （瑕疵:为对象而设计）
	arr.8 = 6
	for (let index in arr) {
    if(index === 2){
      continue; //不会起作用  === 既检查值,也检查类型
    }
    if(index * 1 === 2){
      continue; // 起作用,index转换为数值类型
    }
    if(index == 2){
      continue; // 起作用 == 只检查值,不检查类型
    }
    // 所以index是字符串类型
    console.log(index, arr[index])
	}

	continue,break

```

Ps: 数组是对象，数组是可遍历的。

for in 的缺点

- ES6 遍历方法
  ES6 中有多少种遍历的方法?

```javascript
// for of  优点：可遍历自定义数组，缺点是什么？？
for (const item of arr) {
  console.log(item);
}
```

### Array.from

ES5 将伪数组转换为数组的方法 例如 nodelist (遍历所有 Dom)

ES6 如何转换？

```javascript
// ES5 转换方法
// 转换arguments --> Collection
let args = [].slice.call(arguments);
// 找到所有img图片 --> NodeList
let imgs = [].slice.call(document.querySelectorAll["img"]);

// ES6 方法 Array.prototype.from
let args2 = Array.from(arguments);
let imgs2 = Array.from(document.querySelectorAll["img"]);

// example 创建一个集合 长度5 内容为1
// ES5 写法
let arrs = Array(5);

for (let i = 1, len = arrs.lenght; i < len; i++) {
  arrs[i] = 1;
}

// ES6 Array.from(arrayLike,mapFn,thisArg)
// arrayLike 伪数组 含有lenght属性的对象就可以称为伪数组 例如 {'a':1,'b':2,lenght:2}
let arrs = Array.from({ lenght: 5 }, function () {
  return 1;
});
```

### Array.of-fill

ES5 创建一个新数组改怎么做

ES6 如何实现？

```javascript
// ES5 新建数组
let arrs = Array(5);
let arrs = ["", ""];
arrs.push();
// ES6 [from,of,fill]方法
let Array = Array.of(1, 2, 3, 4, 5);
// Array.prototype.fill 填充数组  Array.from 升级版
// Array.fill(value,start,end)
let arrs = Array(5).fill(5);
// 修改数组
Array.fill(4, 2, 4);
```

### Find & FindIndex

ES5 如何查找一个元素

ES6 的查找方法？

```javascript
// ES5 的查找元素方法 filter 拿到所有返回符合条件的元素
// 没有验证是否存在某个元素的方法
let find = arrs.filter(function (item) {
  return item === 2;
});
console.log(find);

// ES6 的查找方法
// 有符合条件的元素，返回该元素,满足条件的第一个值
// 无符合条件，返回undefind
let find = arrs.find(function (item) {
  return item === 2;
});
// Array.prototype.findindex
// 返回索引
let find = arrs.findIndex(function (item) {
  return item === 2;
});
```

- 思考
  - JavaScript 中有哪儿些元素是可以遍历的
  - 如何给数据结构自定义遍历
  - find() 和 ES5_fillter() 有什么区别
- 附加阅读
  - 数组 Array

## Class 类 *声明 *属性 *方法 *继承

ES5 中如何声明一个类

ES6 声明类的方法

Ps: 按照 java 类的定义，更容易理解，ES6 就是对 ES5 类的语法糖，并未更改其本质行为。

```javascript
//ES5 方法，声明一个类(当成一个构造函数去使用)
let Animal = function (type) {
  this.type = type;
  this.eat = function () {
    console.log("eat food");
  };
};
// 实例对象
let dog = new Animal("dog");
let cat = new Animal("cat");

dog.eat = function () {
  console.log("error");
};

dog.eat();
cat.eat();

// 违背继承原则,只能改变自己
// 优化，把eat方法挂载到实例链上

let Animal = function (type) {
  this.type = type;
};

Animal.prototype.eat = function () {
  console.log("i eat food");
};
// 子类修改父类方法
dog.constructor.prototype.eat = function () {
  console.log("error");
};

// ES6 方法,如果理解不了原型链的写法，直接用es6的类即可
class Animal {
  constructor(type) {
    this.type = type;
  }

  eat() {
    Console.log("i eat food");
  }
}

let dog = new Animal("dog");
let cat = new Animal("cat");

dog.eat();

// 何如看出es5 与 es6类的区别(class与es5使用原型链生成的类 区别就是语法糖，没区别!)
console.log(typeof Animal);
// result type is function
```

### Setter & Getter (如何读写属性)

```javascript
//ES5 无法实现读写属性
//闭包的方式，实现私有属性 _age
let _age = 4
class Animal {
    constructor(type){
        this.type = type
    }
		// 方法
    eat(){
        Console.log('i eat food')
    }
		// setter getter
  	// age 为属性，不是方法
  	get age (){
      return _age
    }
  	set age(val){
      if(){
          // 满足条件赋值私有属性
          _age = val
      }else{
        // 控制setter
      }
    }
}
let dog = new Animal('dog')
dog.age = 8
console.log(dog.age)
```

### Static Methods 静态方法

- 对象实例的方法
- 类的静态方法

```javascript
//ES5 静态方法
let Animal = function (type) {
  this.type = type;
};
//ES5 实例方法,挂载在原型链上
Animal.prototype.eat = function () {
  Animal.walk();
  Console.log("i eat food");
};
//ES5 静态方法 不是挂载在原型链上的,而是挂载在类上
Animal.walk = function () {
  console.log("i m walking");
};
//ES6 静态方法
class Animal {
  constructor(type) {
    this.type = type;
  }
  // 方法
  eat() {
    // 引用静态方法
    Animal.walk();
    Console.log("i eat food");
  }
  // setter getter
  // age 为属性，不是方法
  get age() {
    return 4;
  }
  set age(val) {
    this.realage = val;
  }

  static walk() {
    console.log("i m walking");
  }
}
```

### Sub Classes 继承类

ES5 如何继承一个类

ES6 如何实现

Ps: 面向对象 之所以强大，就是因为继承 : )

```javascript
//ES5 继承方法(其中一种方法)
let Dog = function () {
    //初始化父类的构函数
    //用call 是改变 this 的指针
    // dog 就是父类的参数
    Animal.call(this, 'dog')
    this.run = function () {
        console.log('i cant run')
    }
}
//把原型链指向父类的原型链
//值类型 引用类型
//不指向无法获取父类原型链上的方法
Dog.prototype = Animal.prototype


//ES6 继承方法 (语法糖)
Class Dog extends Animal {
    //构造函数
    //显示 隐示
    constructor(type) {
        super(type)
        this.age = 8
    }
}

let dog = new Dog('type')
dog.eat()
```

- 附加阅读

  - 类

  - ES6 Class

## 函数 *默认值 *形参 \_箭头函数

### 函数的默认值

ES5 中怎么处理函数处理的默认值

ES6 处理函数默认值

```javascript
//参数默认值
function f(x, y, z) {
  if (y == undefined) {
    y = 7;
  }
  if (z == undefined) {
    z = 7;
  }
  return x + y + z;
}

console.log(f(1, 2));

//ES6
function f(x, y = 7, z = 8) {
  //consolo.log(argu)
  return x + y + z;
}
console.log(f(1, undefined, 43));
```

### 函数不确定参数的处理

ES5 中使用 argments 处理不确定参数

ES6 无法使用，如何处理

```javascript
// 1 可以用arguments获取所有参数
// 2 arguments是伪数组，可以用原型链call对它进行遍历
function sum() {
    let num = 0
    // ES5的获取方法
    Array.prototype.forEach.call(arguments.forEach(item) {
        num += item * 1
    })
    // ES6
    Array.from(arguments.forEach(item) {
        num += item * 1
    })
    console.log(sum(12, 3, 4, 5))
}
//ES6 无法使用，如何处理
//... Rest parameter 代表所有参数都存在于nums中
function sum(...nums) {
    let num = 0
    nums.forEach(function (item) {
        num += item * 1
    })
    return num
}
console.log(sum(1, 2, 3))

//Rest参数(...) 是获取所有参数
//...nums 是数组,不是伪数组
//输入参数，可以拆开，把所有不确定参数放于Rest数组里
function sum(base, ...nums) {
    let num = 0
    nums.forEach(function (item) {
        num += item * 1
    })
    return base * 2 + num
}
console.log(sum(1, 2, 3))
```

### Rest 数组的逆运算 spread

```javascript
//参数确定,入参为不确定的数组
let data = [1, 2, 3];
function sum(x = 1, y = 2, z = 4) {
  return x + y + z;
}
//ES5
sum.apply(this, data);
//ES6写法 spread 操作
sum(...data);
```

### !箭头函数 ( ) => {}

```javascript
//ES6箭头函数    ( 参数 )=>{ 函数体 }
//无function关键字
let hello = (name) => {
    console.log('this is a function' + name)
}
//有且只有一个参数的时候，（）可以省略
//无参不可省略（）
let hello = name => {
    console.log('this is a function' + name)
}

// 1.如果返回一个表达式 {}及return可以省略
let sum = (x, y, z) => x + y + z
sum(1, 2, 3)
// 2.如果返回一个对象，需要在函数体加小括号({ })
// 小括号的含义???
let sum = (x, y, z) => ({
    x: x,
    y: y,
    z: z
})
// 无法理解，可按这种方式书写
let sum = (x, y, z) => {
    return {
        x: x,
        y: y,
        z: z
    }
}
// ES5中 谁调用this，就指向谁
// 箭头函数的 this
let test ={
    name : 'test'
    say : function(){
        console.log(this.name)
    }
}
test.say() //指向test
// 在ES6中，this指向谁?
let test ={
    name : 'test'
    say : () => {
        console.log(this.name)
    }
}
console.log(test.say())
//指向window
```

- 练习

  - 如何用箭头函数实现一个数组的排列
  - 箭头函数对 this 的处理 还有什么作用

- 阅读

  - 箭头函数

  - 默认参数值

  - Three dots ( … ) in JavaScript

    ```url
    Three dots ( … ) in JavaScript
    https://dev.to/sagar/three-dots---in-javascript-26ci
    ```

## 对象 Object

### Object Property

ES5 中 object 属性可以简写吗？

ES6 可以吗

```javascript
let x = 1,y=2,z=3
let obj = {
    a:x,
    b:y,
    hello:function(){
        console.log('hello')
    }
    //ES5不允许增加异步函数
}

//ES5 对象增加元素
obj[z]=5

//ES6 key支持变量和表达式
let obj = {
    x,
    y,
    [z]:5,
    hello(){
        console.log('直接写hello() ')
    }
    //ES6 新增 可以在obj中增加异步方法
    * hello2(){
        console.log('直接写hello() ')
    }
}

//异步函数
function* functionName(){

}
```

### Set 数据结构

```javascript
// 使用方法 增删改查   改:先删 后增 靠谱~
let s = new Set();
s.add("one");
s.delete("one");
s.forEach((item) => {
  console.log(item);
});
for (let item of s) {
  console.log(item);
}
```

### Map 数据结构

```javascript
// 字典  传入可遍历对象 entry object
// key可以是任意值

let map = new map();
// 新增
map.set(1, 2);
map.set(2, 3);
// 修改
map.set(1, 3);

map.delete(1);
map.clear(); //清空

map.size; //长度
map.has(1); //boolean
map.get(1); //返回value
// map 遍历 先value 后key
map.forEach((value, key) => {
  console.log(value, key);
});
// forof 只能遍历 可遍历对象!
for (let [key, value] of map) {
  console.log(key, value);
}
// map 键的类型可以是任意的
let o = () => {
  console.log("0");
};
map.set(o, 4);
// 性能  Map > Object
```

### Object.assign

把一个对象拷贝到另外一个对象

```javascript
//ES5拷贝对象的方法，遍历循环赋值

//ES6使用新增API
Object.assign(target,source)

//缺陷: 浅复制 (引用类型会丢失原始数据)
target 对象
source 对象
```

- 思考

  - 如果源对象或者目标对象参数为 undefind 或者 null,会发生什么?
  - WeakSet,WeakMap,Set,Map (同样的 API) 有什么区别

## 正则 RegExp

### Y 修饰符

```javascript
//正则表达式
// g会跳字节匹配 只要可以匹配到
const a = "aaaa_aa_a";
const r1 = /a+/g;
const r2 = /a+/y;

console.log(r1.exec(a));
console.log(r2.exec(a));

//sticky 粘连的语法,会连续匹配
console.log(r1.exec(a));
console.log(r2.exec(a));
```

### U 修饰符

ES5 如何用正则处理中文呢

ES6 升级了什么

```javascript
//unicode 需要深入了解字符编码

例如我的名字
'吉'的异形字 𠮷 unicode编码为 U+20BB7

let s = '𠮷'
let s2 = '\uD842 \uDFB7'
// ES5  s是否为字符,返回false
console.log(/^.$/.test(s))
// 加U返回 true
console.log(/^.$/u.test(s))
// true
console.log(/^\uD842/.test(s2))
// false
console.log(/^\uD842/u.test(s2))

// 加u 可以使用unicode编码值来正则匹配字符
const a = 'a'
console.log( /^\u{61}/u.test('a'))

总结：
遇到中文，加U没错~
```

- 阅读

  - unicode 及编码方式概述 <a>https://www.ibm.com/developerworks/cn/java/unicode-programming-language/index.html

  - Unicode 与 JavaScript 详解 <a>https://coding.imooc.com/lesson/389.html#mid=29198

## Template

### 字符串

字符串换行、包含变量表达式、包含逻辑运算符如何处理

ES6 有更好的办法吗

```javascript
const a = 20;
const b = 10;
const c = "javascript";
//es5
const str = "my age is " + (a + b) + "i hate" + c;
//es6 拼接
const str = `my age is ${a + b} and i hate ${c}`;

// 字符串模板
const retailPrice = 20;
const wholeSalePrice = 16;
let showTxt = "";
let type = "retail";
if ((type = "retail")) {
  showTxt = "您购买产品的单价为：" + retailPrice;
} else {
  showTxt = "您购买产品的批发价为：" + retailPrice;
}
console.log(showTxt);

//ES6 使用Tag 函数,字符串模板
let Price = (Strings, type) => {
  let s1 = Strings[0];
  const retailPrice = 20;
  const wholeSalePrice = 16;
  let showTxt;
  if ((type = "retail")) {
    showTxt = "单价为：" + retailPrice;
  } else {
    showTxt = "批发价为：" + retailPrice;
  }
  return `${s1}${showTxt}`;
};

let showTxt = Price`您购买产品的${retail}`;
console.log(showTxt);

//字符串换行
let s = `我是第一行
我是第二行`;
console.log(s);
```

- 附加阅读
  - 模板字符串

## Destructure

### 从一个复杂的数组中提取数据

```javascript
let arr = ["s1", "s2"];
//解构赋值
let [n1, n2] = arr;
console.log(n1, n2);

// Array || Object
let arr = ["a", "b", "c", "d"];
let [n1, , , n4] = arr;
// 字符串为什么可以
let arr = "abcd";
// 左边等式必须为中括号
let [n1, , , n4] = arr;
// 右边为 所有可遍历的对象
let [n1, , , n4] = new Set([1, 2, 3, 4]);
```

### 给对象的属性重新赋值

```javascript
let user = ([(name: "name"), (surname: "sname")][
  //对象属性赋值
  (user.name, user.surname)
] = [1, 2]);
console.log(user);

//隐式赋值
//[k,v]也是一种解构赋值
for (const [k, v] of Object.entries(user)) {
  console.log(k, v);
}

// 未赋值的数据去哪儿了？
// 根据浏览器垃圾回收机制，长时间未使用的数据会被回收
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let [one, two] = arr;
// arr里如果无数据，one two为undefind
// 剩下的变量赋值进others
let [one, two, ...others] = arr;
```

### Object 解构赋值

```javascript
// 复杂 Object 解构赋值
let options = {
    style: {
        width: '200',
        height: '200',
    },
    other: 'shi',
    item: ['item1', 'item2']
}

let {
    style: {
        width,
        height
    },
    other,
    item[item1, item2]
} = options

console.log(width,height,item1)
```

- 推荐阅读
  - 解构赋值

## 异步操作

### Promise

```javascript
// Promise
// ES5异步加载
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload() = () => {
    callback();
  };
  document.head.append(script);
}

function test() {
  console.log("test");
}
// ES5的回调地狱 a>b->c->d
// 回调地狱
loadScript("1.js", function () {
  loadScript("2.js", function () {
    loadScript("3.js", function () {});
  });
});

// 使用ES6 异步操作
// 执行 Promise pending状态为undefind
// pending 状态为不可逆的
function loadScript(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = src;
    script.onload() = () => resolve(); // fulfilled result
    script.onerror() = () => reject(); // rejected error
    document.head.append(script);
  });
}

loadScript("./1.js").then(loadScript("./2.js")).then(loadScript("./3.js"));
```

### Then

```javascript
// then语法
Promise.then(onFulfilled, onRejected);
// 分别对应 Promise 对象的 resolve,reject 方法
// 所以为了处理error方法要改为
// .then如果参数为表达式，会返回一个新的Promise对象
loadScript("./1.js")
  .then(
    () => {
      // ERROR 返回的是一个新的Promise对象
      loadScript("./2.js");
      // 返回的是执行后的 resolve
      return loadScript("./2.js");
    },
    (err) => {
      console.log(err);
    }
  )
  .then(
    () => {
      loadScript("./3.js");
    },
    (err) => {
      console.log(err);
    }
  );
```

### Resolve && Reject

```javascript
// 返回 一个数字的resolve值
// 返回 Error事件
function test(bool) {
  if (bool) {
    return new Promise.reject(new Error("ss"));
  } else {
    return (new Promise() = () => {
      resolve(42);
    });
  }
}
test(1).then(
  () => {
    console.log("ok");
  },
  (err) => {
    console.log(err);
  }
);
```

### Catch

```javascript
// 更改处理错误的方法
loadScript("./1.js")
  .then(() => {
    // ERROR 返回的是一个新的Promise对象
    loadScript("./2.js");
    // 返回的是执行后的 resolve
    return loadScript("./2.js");
  })
  .then(() => {
    loadScript("./3.js");
  })
  // 捕获 pending == reject 时候的方法
  .catch((err) => {
    console.log(err);
  });
// 不要用 throw方法去捕获pending的reject状态
throw new Error();
```

### Promise.All()

```javascript
// 聚合所有异步操作返回的数据
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

Promise.all([p1, p2, p3]).then((values) => {
  console.log(values);
});
```

### Promise.Race()

```javascript
// 并行异步操作
const p1 = () => {
  return (new Promise() = (resolve, reject) => {
    setTimeout(() => {
      console.log("1");
    }, 1000);
  });
};
const p2 = () => {
  return (new Promise() = (resolve, reject) => {
    setTimeout(() => {
      console.log("1");
    }, 500);
  });
};
// 两个异步，竞速关系
Promise.race([p1(), p2()]).then((values) => {
  console.log(values);
});
```

- 推荐阅读
  - Promise

## Reflect 反射机制

Java 的反射机制 ，在编译时不知道哪儿个类被加载，而是运行时才加载、执行

```javascript
Math.floor.apply(null, [7.45]);
Math.ceil.apply(null, [8.89]);

let price = "123.6";
if (price > 100) {
  Reflect.apply(Math.floor, null, [price]);
} else {
  Reflect.apply(Math.ceil, null, [price]);
}

console.log(Promise.apply(price > 100 ? Math.floor : Math.ceil, null, price));

// 反射 构造函数
let d = Reflect.construct(Date, []);
// d instanceof Date 判断d是否为Date的实例
console.log(d.getTime(), d instanceof Date);

const student = {};
// 两者的区别，在于返回值不同
// Object 返回该对象
// Reflect 返回布尔值
const r = Object.defineProperty(student, "name", {
  value: "name2",
});
const r = Reflect.defineProperty(student, "name", {
  value: "name2",
});
console.log(student, r);

const r = Object.deleteProperty(student, "name");
const r = Reflect.deleteProperty(student, "name");
console.log(student, r);

const r = Reflect.get(student, "name");

const r = Reflect.getOwnPropertyDescriptor(student, "name");
const r = Object.getOwnPropertyDescriptor(student, "name");
console.log(r);
value: 1;
wirtable: true;
enumerable: true;
configurable: true;

const d = new Date();
const r = Reflect.getPrototypeOf(d);

// 查询是否含有此属性
const r = Reflect.has(student, "name");
// 禁止对象进行扩展
Reflect.preventExtensions(student);
// 查看此对象是否可扩展
Reflect.isExtensible(student);

// 修改对象 赋值数据
const a = ["1", "2", "3"];
Reflect.set(a, 2, "editValue");

// 修改原型链对象
console.log(Reflect.getPrototypeOf(a));
Reflect.setPrototypeOf(a, Syting.property);
a.sort();
console.log(Reflect.getPrototypeOf(a));
```

## Proxy 代理

强大的代理功能如何使用

```javascript
// 原始信息
let o = {
  name: "xiaoxiao",
  price: 1900,
  size: 120,
};
// Proxy基础语法
let d = Proxy(o, {
  // 读取数据
  get(target, key) {
    if (key == "price") {
      return target[key] + 20;
    } else {
      return target[key];
    }
  },
});
// 代理的对象不允许赋值
let d = Proxy(o, {
  // 读取数据
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    return false;
  },
});
//赋值操作被拦截，数据不会被修改
d.price = 300;
console.log(d.price, d.name);

//ES5 如何实现只读功能
//修改原型链方法
for (const [key] of Object.entries(o)) {
  Object.defineProperties(o, key, {
    writable: false,
  });
}
o.price = 300;
console.log(o.name, o.price);
```

### Schema Vaildation

```javascript
// 例子： 如果使用代理验证数据
// 验证数据
let o = {
  name: "haha",
  price: "880",
};
let p = new Proxy(o, {
  get(target, key) {
    return target[key] || "";
  },
  set: vaildator,
});
// 解耦 单独拿出验证方法
let vaildator = (target, key, value) => {
  if (Reflect.has(target, key)) {
    if (key === "price") {
      if (value > 800) {
        return false;
      } else {
        return (target[key] = value);
      }
    } else {
      return (target[key] = value);
    }
  } else {
    return false;
  }
};

//随机ID
class test {
  constructor() {
    this.proxy = new Proxy(
      {
        id: Math.random().toString(36).splce(-8),
      },
      {}
    );
  }

  get id() {
    return this.proxy.id;
  }
}

let comm = new test();
console.log(comm.id);

let comm2 = new test();
console.log(comm2.id);
```

### Revocable Proxy

```javascript
// 可撤销代理（临时代理）
let d = Proxy.revocable(o, {
  // 读取数据
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    return false;
  },
});
// 返回revoke 对象
console.log(d);
// 撤销代理操作
d.revoke();
// 阅后即焚的实现方式
```

- Thinking

  - 临时代理有哪儿场景
  - 组件初始化的时候赋值一个可随机的 ID
  - 如何把接口数据用代理进行包装

- 阅读

  - ES6 Proxies in Depth

## Generator

### Syntax 如何让遍历“停”下来

```javascript
// Generator how to stop then function
// ES5 loop function

function loop() {
  for (let i = 0; i <= 5; i++) {
    console.log(i);
  }
}

loop();

// ES6 loop function
// Generator 自定义遍历器
function* loop() {
  for (let i = 0; i <= 5; i++) {
    yield console.log(i);
  }
}

const l = loop();
l.next();
l.next();
l.next();

// Syntax
// Generator 是一个函数，比普通函数多 * 号
// yield 控制程序停下来
// next 恢复执行，next返回当前的状态
function* gen() {
  let val;
  // yie
  val = yield* [1, 2, 3];
  console.log(val);
}

const i = gen();
console.log(i.next());
console.log(i.next());

// next 传参方法
console.log(i.next(10));
// Syntax 结束循环
i.return();
// 抛出异常结束循环

function* gen() {
  try {
    yield 1;
  } catch (e) {
    console.log(e.message);
  }
}

gen.next();
gen.throw(new Error("ss"));
gen.next();
```

### Scene Pratice

实现一个案例: 年终抽奖

```javascript
// ES5做法
function draw(first = 1, second = 2, third = 3) {
  let fristPrize = ["1a", "1b", "1c", "1d", "1e", "1f", "1g", "1h"];
  let secondPrize = ["2a", "2b", "2c", "2d", "2e", "2f", "2g", "2h"];
  let thirdPrize = ["3a", "3b", "3c", "3d", "3e", "3f", "3g", "3h"];

  let result = [];
  let random;

  for (let i = 0; i < first; i++) {
    random = Math.floor(Math.random() * fristPrize.lenght);
    result = result.concat(fristPrize.splice(random, 1));
  }
  for (let i = 0; i < second; i++) {
    random = Math.floor(Math.random() * secondPrize.lenght);
    result = result.concat(secondPrize.splice(random, 1));
  }
  for (let i = 0; i < third; i++) {
    random = Math.floor(Math.random() * thirdPrize.lenght);
    result = result.concat(thirdPrize.splice(random, 1));
  }
  alert(result);
  return result;
}

let t = draw();
for (const value of t) {
  console.log(value);
}

//ES6 使用Generator 实现抽奖案例
function* draw(first = 1, second = 2, third = 3) {
  let fristPrize = ["1a", "1b", "1c", "1d", "1e", "1f", "1g", "1h"];
  let secondPrize = ["2a", "2b", "2c", "2d", "2e", "2f", "2g", "2h"];
  let thirdPrize = ["3a", "3b", "3c", "3d", "3e", "3f", "3g", "3h"];
  let count = 0;
  let random;

  while (1) {
    if (count < first) {
      random = Math.floor(Math.random() * fristPrize.length);
      yield fristPrize[random];
      fristPrize.splice(random, 1);
      count++;
    } else if (count < first + second) {
      random = Math.floor(Math.random() * secondPrize.length);
      yield secondPrize[random];
      secondPrize.splice(random, 1);
      count++;
    } else if (count < first + second + third) {
      random = Math.floor(Math.random() * thirdPrize.length);
      yield thirdPrize[random];
      thirdPrize.splice(random, 1);
      count++;
    } else {
      return false;
    }
  }
}

let d = draw();
console.log(d.next().value);
console.log(d.next().value);
console.log(d.next().value);
console.log(d.next().value);
console.log(d.next().value);
console.log(d.next().value);
console.log(d.next().value);

// 由此可想出 es5中处理无线循环的方法
// 由此可想出 es5中处理无线循环的方法
function* count(x = 1) {
  while (1) {
    if (x % 3 === 0) {
      yield x;
    }
    x++;
  }
}

let n = count();
// 调用一次 取一次值
console.log(n.next().value);
console.log(n.next().value);
console.log(n.next().value);
```

- 推荐阅读

  - 斐波那契数列
  - Generators <a>https://exploringjs.com/es6/ch_generators.html

- Thinking
  - 使用 Generators 实现一个斐波那契数列

## Iterator 可遍历接口

### 如何让自定义数据结构支持可遍历

```javascript
// 自定义数据结构如何支持遍历
let author = {
  allauthor: {
    indexs: ['1', '2', '3', '4'],
    names: ['dsa', 'jack', 'jordn', 'park'],
    other: ['dsass', 'asdsa', 'dsddd']
  }
}

let r = []
// 遍历获取 value值   Object.entries
for (let [, v] of Object.entries(author.allauthor)) {
  r = r.concat(v)
}
console.log(r)


// ES6使用 iterator方法 手写迭代器协议
authors[Symbol.iterator] = function () {
  let allAuthor = this.allauthor
  let keys = Reflect.keys(allAuthor)
  let values = []
  return {
    next(){
      if(!values.length){
        if(keys.length){
          values = allAuthor[keys[0]]
          keys.shift()
        }
        return{
          // done true||false 控制是否输出
          done:!values.length,
          value:values.shift()
        }
      }
    }
  }
}

let r1 = []
for (const value of authors) {
  r.push[value]
}

// 可迭代协议 部署格式  使用Generator
authors[Symbol.iterator] = function * (){
  let allAuthor = this.allauthor
  let keys = Reflect.keys(allAuthor)
  let values = []
  return {
    next(){
      if(!values.length){
        if(keys.length){
          values = allAuthor[keys[0]]
          keys.shift()
          yield values.shift()
        }else{
          return false
        }
      }else{
        yield values.shift()
      }
    }
  }
}

let r2 = []
for (const value of authors) {
  r.push[value]
}
```

- Thinking

  - 什么是自定义遍历，复杂的自定义数据结构如何使用自定义遍历？
  - 什么是迭代协议，什么是可迭代协议？
  - Generator 和 iterator 的关联关系?

- 推荐阅读

  - ES6 迭代器：Iterator, Iterable 和 Generator

## Modules

### Export Import 模块化设计

```javascript
lesson2 - 15 - mod.js;

//导出变量常量
export const name = "HELLO";
export let addr = "dsa";
export let list = ["1", "2", "3"];
//第二种方式
const name = "HELLO";
let addr = "dsa";
let list = ["1", "2", "3"];

export { addr, list };
// 默认导出
export default name;
```

```javascript
lesson 2-15.js
//导入变量常量
import (name,addr,list) from 'lesson2-15-mod'

// 导入默认值
import name,(addr,list) from 'lesson2-15-mod'
// 导出变量改名
import name,(addr as addr2 ,list as list2) from 'lesson2-15-mod'
// 只导入默认值 可以省略括号
import name from 'lesson2-15-mod'
// 只导入默认值 可以自定义导入名称
// 默认值有且最多只能有一个
// 不要讲为什么，就是这么设计的 (rush!)
import name2 from 'lesson2-15-mod'

console.log(name,addr)

```

### 如何导出函数

```javascript
// 导出函数
export function say(content){
  console.log(content)
}

export function run(){
  console.log('runing away')
}

export default defaff(){
  console.log('this is default function')
}

// 最后导出
const say = (content)=>{
   console.log(content)
}
const run = ( )=>{
   console.log('runing away')
}
export default say
export {
	run
}

```

### 如何导出对象

```javascript
const data = {
  age: 12,
  addr: "beijing",
};
const data2 = {
  age: 18,
  addr: "shanghai",
};
// 对象的导出只能用default方式
export default {
  data,
  data2,
};

// 导入
import obj from "lesson2-15-mod";
// 解构赋值
let { date, data2 } = obj;
console.log(data, data2);
```

### 如何导出一个类

```javascript
class Test{
  constructor(){
    this.id = 2
  }
}

export{
  Test
}

// 默认导出
export default Test
import Test form 'lesson2-15-mod'

// 不带类名使用default导出导入
export default class {
  constructor(){
    this.id = 2
  }
}
import { Test } form 'lesson2-15-mod'

// 把所有导出对象使用Mod来引用
import * as Mod form 'lesson2-15-mod'
let Test = new Mod.Test()
console.log(Test.id)
```

- 推荐阅读
  - Modules

# ES7 \_includes \_pow

### includes 数组中如何判断元素是否存在

```javascript
// arr数组是否包含40
arr.includes("40");
```

Math.pow

```javascript
// 乘方
console.log(Math.pow(2, 5));
// 简写乘方
console.log(2 ** 5);
```

# ES8 \_promise \_object \_string

### Async

有没有比 promise 更优雅的方法

```javascript
//ES6 如何使用异步方法
//实例化一个promise对象
//通过实例 .then方法调用

//ES8 增加async关键字
async function firstAsync() {
  //可以理解为 renturn Promise.resolve(27)
  return 27;
}

// 返回一个Promise对象
console.log(firstAsync());
// 验证是否为promise对象
console.log(firstAsync() instanceof Promise);

firstAsync().then((val) => {
  console.log(val);
});
```

- Thinking:
  - Async 与普通 function 有什么区别

### Await

如何保证以下的异步函数是按顺序执行的

```javascript
async function firstAsync() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("now is none");
    }, 1000);
  });
  promise.then((val) => {
    console.log(val);
  });
  console.log("2");
  return Promise.resolve("3");
}

firstAsync().then((val) => {
  console.log(val);
});
```

```javascript
async function firstAsync() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("now is none");
    }, 1000);
  });
  // promise.then(val=>{
  //   console.log(val);
  // })
  // await的返回值 就是promise的返回值
  let result = await promise;
  console.log(result);
  //相当于await Promise.resolve(30)
  //await 必须配合async使用，外层必须是async函数
  console.log(await 30);
  console.log("2");
  return Promise.resolve("3");
}

firstAsync().then((val) => {
  console.log(val);
});
```

**Async Await 就是 Promise 的语法糖,本质上还是 promise 的工作原理**

### Object

//ES8 对 keys 的遍历

```javascript
let grade = {
  lilei: 66,
  "han meimei": 99,
};
let result = [];
for (const k in grade) {
  result.push[k];
}
console.log(result);
console.log(Object.keys(grade));
```

//es8 对 keys, values 筛选条件

```javascript
let grade = {
  lilei: 66,
  "han meimei": 99,
};
let result = [];
for (const k in grade) {
  if (k === "lilei") {
    result.push[k];
  }
}
console.log(result);

console.log(Object.keys(grade).filter((item) => item === "lilei"));
console.log(Object.values(grade).filter((item) => item > 66));
```

把对象变成可遍历对象 Object.entries

```javascript
for (const [k, v] of Object.entries(grade)) {
  console.log(k, v);
}
```

Object 获取数据的描述符

```javascript
const data = {
  dsadsa: "55/44",
  dsdsa: "66/44",
  ddsaa: "77/44",
};

Object.defineProperties(data, "dsdsa", {
  enumerable: false,
  writable: false,
});

console.log(Object.keys(data));
//利用描述符拿到数据的所有信息
console.log(Object.getOwnPropertyDescriptors(data));
//拿到某一项数据的所有描述信息
console.log(Object.getOwnPropertyDescriptor(data, "dsdsa"));
```

### String.补白

padStart padEnd 对 string 补白的方式

```javascript
//es5 原始写法
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    console.log(`0${i}`);
  } else {
    console.log(i);
  }
}
//5位补0
for (let i = 1; i <= 31; i++) {
  console.log(i.toString().padStart(5, "0"));
}
for (let i = 1; i <= 310203; i += 1000) {
  console.log(i.toString().padStart(6, "*#"));
}
for (let i = 1; i <= 310203; i += 1000) {
  console.log(i.toString().padEnd(6, "*#"));
}
```

# ES9 新增内容

### for await of

异步操作集合是如何遍历的

```javascript
function gen(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

async function test() {
  let arr = [gen(1000), gen(5000), gen(3000)];
  for (const item of arr) {
    // 同步执行所有异步函数
    console.log(Date.now(), item.then(console.log()));
  }
}

//如何等待上一个异步结束，执行下一个异步函数
for (const item of arr) {
  // 同步执行所有异步函数
  console.log(Date.now(), await item.then(console.log()));
}

//输出结果不符合预期
for await (const item of arr) {
  // 同步执行所有异步函数
  console.log(Date.now(), item);
}

// 异步自定义数据遍历
const obj = {
  count: 0,
  Gen: function (time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ done: false, value: time });
      }, time);
    });
  },
  [Symbol.asyncIterator]() {
    let self = this;
    return {
      next() {
        self.count++;
        if (self.count < 4) {
          return self.Gen(Math.random() * 1000);
        } else {
          return Promise.resolve({
            done: true,
            value: "",
          });
        }
      },
    };
  },
};

async function test() {
  for await (const item of obj) {
    console.log(Date.now(), item);
  }
}
```

### Promise.finally

promise 如何进行兜底操作的,类似 java 无论什么结果都会执行 finally 里的函数

```javascript
function Gen(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (time < 500) {
        reject(time);
      } else {
        resolve(time);
      }
    }, time);
  });
}

Gen(Math.random() * 1000)
  .then((val) => console.log("resolve", val))
  .catch((val) => console.log("reject", val))
  .finally((val) => console.log("finish"));
```

### Object rest spread

```javascript
//spread
const input = {
  a: 1,
  b: 2,
  c: 3,
};

const output = {
  ...input,
  d: 4,
};

console.log(input, output);
input.a = 4;
//只改变input  out无变化
console.log(input, output);

//rest
const input = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
};
//解耦赋值
const { a, b, ...rest } = input;
console.log(a, b, rest);
```

```javascript
剩余新增为正则内容，略
```

# ES10 新增内容

对原型对象的能力进行了升级，对语法进行了修正

### JSON String

```javascript
JSON.stringify("\u{D800}");
//此编码之内的字符无法转编译
0xd800 - 0xdfff;
//ES10进行了修正

JSON.stringify("\u{D800}");
//此编码之内的字符无法转编译
0xd800 - 0xdfff;
//ES10进行了修正

//字符串操作
//ES5 使用正则 去除起始于结尾空格符号
let str = "   fpr    ";
str.replace(/^\s+|s+$/g, "");
//ES10 新增api去除空格
str.trimStart();
//trimStart 别名 trimLeft
str.trimLeft();
str.trimEnd();
//trimEnd 别名 trimRight
str.trimRight();
//or U can use trim
str.trim();
```

### Object

```javascript
//Object 新增api
Object.flat();
Object.flatMap();

//
const arr = [
  ["a", 1],
  ["b", 2],
];
console.log(arr[1][0]);

const obj = Object.fromEntries(arr);
console.log(obj.bar);

// 只获取key的长度为3的数据
const obj = {
  abc: 1,
  bnc: 2,
  asdsd: 5,
};

const res = Object.fromEntries(
  //Object.entries 转为数组后 就可以使用数组的方法去判断key的长度
  Object.entries(obj).filter(([key, val]) => key.length === 3)
);

console.log(res);

//Object.fromEntries 转为对象
//Object.entries     转为数组
```

### 如何从字符串中获取所有符合条件的字符

```javascript
//如何获取字符串所有满足条件的字符
let str = `"first" and "mid" and "end"`;
//ES5使用正则实现
const select = (regExp, str) => {
  const matchs = [];
  while (true) {
    const match = RegExp.exec(str);
    if (match === null) break;
    matchs.push[match[1]];
  }
};

console.log(select(/"([^"]*)"/g, str));

//ES5 replace方法实现
const select = (regExp, str) => {
  const matchs = [];
  str.replace(regExp, function (all, first) {
    matchs.push[first];
  });
  return matchs;
};

console.log(select(/"([^"]*)"/g, str));

//使用es10新增api实现
const select = (regExp, str) => {
  const matchs = [];
  //捕获所有符合正则的字符
  for (const item of str.matchAll(regExp)) {
    matchs.push[item[1]];
  }
  return matchs;
};
console.log(select(/"([^"]*)"/g, str));
```

大于 2^53 的数字,新增类型 BigInt

```javascript
// 数字后面加n 为bigint类型
let a = 11n
console.log(typeof(a))

!! ESlint 暂不支持11n的写法
```

