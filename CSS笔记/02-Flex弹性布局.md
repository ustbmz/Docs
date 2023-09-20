# Flex弹性布局

**弹性概念**

按行按列布局元素的一维布局方法,元素可以**膨胀以填充额外空间,收缩以适应更小空间**



## 主轴与交叉轴
>  **图解**

![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070857891.png) 

* flex容器: flex-container 

* flex子项: flex-item

* 主轴: main axis 
* 交叉轴: cross axis



### flex容器与felx子项


![image-20220227133936472](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070849412.png)

 

主轴对齐方式: justify-content

交叉轴对齐方式:   align-items / align-content

![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070849561.png) 



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .main {
        display: flex;
        background-color: antiquewhite;
        width: 500px;
        height: 700px;
        flex-wrap: wrap;
        align-content: space-around;
        /* 行内对齐样式 baseline 文字对齐 */
        align-items: baseline;
      }
      .main div {
        width: 100px;
        /* stretch 如果没有高度，则自动拉伸 */
        /* height: 100px; */
        margin: 10px;
        background-color: skyblue;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="1">1</div>
      12321321
      <div class="1">2</div>
      <div class="1">3</div>
      <div class="1">5</div>
      <div class="1">6</div>
      <div class="1">7</div>
    </div>
  </body>
</html>
```

图示：


![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070849135.png) 




## 内联与块的上下左右居中布局

### 内联元素居中

```css
.box {
  display: flex;
  background-color: aquamarine;
  align-items: center;
  width: 200px;
  height: 200px;
}
.box2 {
  display: flex;
  background-color: pink;
  width: 200px;
  height: 200px;
  flex-wrap: wrap;
  align-content: center;
}
/* 奇淫巧技 */
.main {
  display: flex;
  background-color: aquamarine;
  width: 400px;
  height: 400px;
}
.box {
  width: 100px;
  height: 150px;
  background-color: palevioletred;
  margin: auto;
}
```

 **图示**

![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070849408.png) 



**不使用弹性布局使内联元素居中**

```scss
/* 只能用于一行文字居中 */
.box3 {
  display: flex;
  background-color: pink;
  width: 200px;
  height: 200px;
  line-height: 200px;
}
/* 多行文字居中 */
.box4 {
  display: flex;
  background-color: pink;
  width: 200px;
  height: 200px;
  display: table-cell;
  vertical-align: middle;
}
```

### 块级元素居中

```scss
.main {
  display: flex;
  background-color: aquamarine;
  width: 400px;
  height: 400px;
  justify-content: center;
  align-items: center;
}
.box {
  width: 100px;
  height: 150px;
  background-color: palevioletred;
}
```

*不使用弹性布局 块级元素居中*

```scss
.main {
  background-color: aquamarine;
  width: 400px;
  height: 400px;
  position: relative;
}
/* 常规思路 */
.box {
  width: 100px;
  height: 150px;
  background-color: palevioletred;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* 奇淫技巧 */
.box {
  width: 100px;
  height: 150px;
  background-color: palevioletred;
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  bottom:0
  margin:auto;
}
```

效果图:


![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070849807.png) 



## 不定项居中布局

```html
<div class="box">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```



```scss
.box {
  width: 400px;
  height: 200px;
  background-color: burlywood;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.box div {
  width: 40px;
  height: 40px;
  background-color: brown;
  border-radius: 50%;
  margin: 10px;
}
```

效果图:

![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070850139.png) 


**不使用弹性布局实现不定项居中**

```html
<div class="box">
  <section>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </section>
</div>
```



```scss
.box {
  width: 400px;
  height: 200px;
  background-color: burlywood;
  position: relative;
}

.box section {
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 0;
  font-size: 0;
}

.box div {
  width: 40px;
  height: 40px;
  background-color: brown;
  border-radius: 50%;
  display: inline-block;
  margin: 5px;
}
```





## 均分列布局

```html
<div class="box">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```



```scss
.box {
  width: 400px;
  height: 200px;
  background-color: burlywood;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.box div {
  width: 40px;
  height: 40px;
  background-color: brown;
  border-radius: 50%;
  margin: 10px;
}
```

图示:

![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070850691.png) 


不使用弹性布局实现：

​	 // TODO



## 子项分组布局

```css
.box {
  height: 200px;
  background-color: burlywood;
  display: flex;
  justify-content: center;
}

.box div {
  width: 100px;
  background-color: brown;
  margin-left: 10px;
}

.box div:nth-of-type(1) {
  margin-right: auto;
}
```

图示

![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070850961.png) 



### flex-grow扩展比例

> 默认为0，表示不占用剩余空间扩展自身宽度

```css
/* 0 (默认)  不占用剩余空间  */ 
flex-grow:0

/* 1 占用剩余全部空间*/
flex-grow:1

/* 按比例分配剩余空间 */
flex-grow:0.1
flex-grow:0.2

flex-grow:1
flex-grow:2
```

 





### flex-shrink 收缩比例

```css
flex-sharink : 1 (默认收缩，保持和容器大小相同)

flex-sharink : 0 (不进行收缩)
flex-sharink : 0.5 (按比例收缩)

/* 多个元素收缩 */
flex-sharink : 2 (容器宽度 - 2/3(width))
flex-sharink : 1 (容器宽度 - 1/3(width))
```


![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070850661.png) 


### flex-basis

> flex-basis 默认值为auto,指定了flex元素在主轴方向上的初始大小 
>
> flex-basis 值会覆盖主轴上的宽度

```
.box{
	width:200px;
	flex-basis:400px;
}
```

**可选值:  0%、 auto、200px、100%** 



### flex 缩写

​	`flex`: [` flex-grow`] [ `flex-shrink` ] [`flex-basis`]

 ```css
 flex: 0 1 auto
 ```



### order 

**更改某一个flex子项的排序位置**

```css
/* 默认0 */
order:1
order:-1
```



### align-self

align-items  针对整体flex元素

align-self 针对一个flex子项

控制某一个子元素的垂直对齐方向

对应父元素的 align-items

取值于align-items相同 

```
align-self:auto (默认值)
```





## 布局示例

### 等高布局

> 无论哪儿个元素的高度发生变化，另外一个也会保持高度一致

![image-20220301213047083](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070850891.png)

弹性布局：默认子项为拉伸

```html
 <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 500px;
        background-color: burlywood;
        display: flex;
        justify-content: space-between;
      }

      .box div {
        width: 100px;
        background-color: brown;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
      </div>
      <div>
      </div>
    </div>
  </body>
</html>
```

**不使用弹性布局，障眼法**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 500px;
        background-color: burlywood;
        overflow: hidden;
      }

      .box div {
        width: 100px;
        background-color: brown;
        float: left;
        margin-bottom: -2000px;
        padding-bottom: 2000px;
      }
      .box div:nth-of-type(2) {
        float: right;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
      </div>
      <div>
      </div>
    </div>
  </body>
</html>
```

### 二列与三列布局

> 使用flex-grow自动扩展宽度

```css
.box {
  width: 100%;
  height: 100vh;
  background-color: burlywood;
  display: flex;
  flex-flow: row nowrap;
}

.box div {
  width: 200px;
  height: 60%;
  background-color: brown;
}
.box div:nth-of-type(2) {
  flex-grow: 1;
  height: 100%;
  background-color: blueviolet;
}
```

示例:
 
![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070851766.png) 

**不使用弹性布局，实现**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body{
        margin: 0;
      }
      .box {
        height: 100vh; 
        background-color: burlywood;
      }

      .col1  {
        width: 200px;
        height: 60%;
        background-color: brown;
        float: left;
      }
      .col2 {
        height: 100%;
        background-color: blueviolet;
        /* 常规方法 */
        /* margin-left: 200px; */
        /* BFC */
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="col1"></div>
      <div class="col2"></div>
    </div>
  </body>
</html>
```

### Sticky Footer布局

> 使用flex-grow扩展实现

```css
body{
  margin: 0;
}
.main {
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
}

.header  {
  height: 100px;
  background-color: goldenrod;
}
.content {
  flex-grow: 1;
  background-color: blanchedalmond;
}
.footer{
  height: 80px;
  background-color: brown;
}
```

### 溢出项布局

> 使用flex-shrink 为0  关闭自动缩放

```css
body{
  margin: 0;
}
.main {
  height: 100px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background: gray;
}

.main div  {
  width: 200px;
  height: 80px;
  margin: 20px;
  background-color: goldenrod;
  flex-shrink: 0;
}
```

### 实现一个Swiper

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sticky Footer布局</title>
    <style>
      body{
        margin: 0;
      }
      .main {
        width: 100%;
        height: 100px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background: gray;
      }

      .main div  {
        width: 200px;
        height: 80px;
        margin: 20px;
        background-color: goldenrod;
        flex-shrink: 0;
      }
      
    </style>
  </head>
  <body>
    <div class="main">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
    </div>
  </body>
</html>
```

### 实现知乎导航

![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070851594.png) 

![img](https://gitee.com/cnmz/images/raw/master/md_imgs/202204070851659.png) 

