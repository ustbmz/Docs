# Grid网格布局

**CSS网格是一个用于web的二维布局系统。利用网格，你可以把内容按照行与列的格式进行排版。另外，网格还能非常轻松**
**地实现一些复杂的布局**



> 例如

 ![image-20220303001025265](https://gitee.com/cnmz/images/raw/master/md_imgs/image-20220303001025265.jpg)




> **Grid容器**

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291048610.png" alt="image-20220303001446467" style="zoom: 25%;" />
> **Grid子项**

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291048406.png" alt="image-20220303001538247" style="zoom: 25%;" />
> **定义网格及fr单位**

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291048197.png" alt="image-20220303001751040" style="zoom:50%;" />



## Grid容器属性 

> 基于网格行和列的维度,去定义网格线的名称和网格轨迹的尺寸大小

* grid-templete-rows. 行
* grid-templete-columns  列



代码示例:

```css
.main{
  width: 500px;
  height: 500px;
  background-color: antiquewhite;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  /* 三种赋值方式 */
  grid-template-columns: 10% 1fr 2fr;
  grid-template-rows: 20% 2fr 1fr;
}

.main div{
  background-color: aqua;
}
```

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291049611.png" alt="image-20220303003209118" style="zoom: 25%;" />



### 合并网格及网格命名

> 使用命名方式定义网格区域，需配合`grid-area`属性使用

* **grid-templete-areas** :  "a1 a1 a2" 

  ​						  				"a1 a1 a2" 

  ​										  "a3 a3 a3";  



```css
.main {
  width: 500px;
  height: 500px;
  background-color: antiquewhite;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    'a1 a1 a2'
    'a1 a1 a2'
    'a3 a3 a3';
}

.main div {
  background-color: aqua;
  border: 1px solid rebeccapurple;
}

.main div:nth-of-type(1) {
  grid-area: a1;
}
.main div:nth-of-type(2) {
  grid-area: a2;
}
.main div:nth-of-type(3) {
  grid-area: a3;
}
```

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291049934.png" alt="image-20220303004956094" style="zoom:50%;" />


> grid-templete 是以上三个的缩写 [][][grid-template-rows] [grid-template-columns] [grid-templete-areas]

* grid-templete 

```css
.main {
  
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    'a1 a1 a2'
    'a1 a1 a2'
    'a3 a3 a3';
  
  /* 使用简写  */
  /* 等同于上方写法 */
  grid-template:
    'a1 a1 a2' 1fr
    'a1 a1 a2' 1fr
    'a3 a3 a3' 1fr
    /1fr 1fr 1fr;
}

```



### 网格间隙及简写

> 用来设置元素行列之间的

* grid-row-gap. 行间距
* grid-columns-gap 列检局
* grid-gap（已废弃）  推荐使用 gap : [row] [column]

PS: 这四个属性还适用于一般布局以及弹性布局

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291049711.png" alt="image-20220304213030613" style="zoom:50%;" /> 



### 网格对齐方式及简写

**如果单元格子项不小于单元格 或 单元格不小于容器，一下排列方式无意义**

1、**子项小于单元格的对齐方式**

* align-items 
* justify-items 
* place-items:  [align-items] [justify-items] 以上两个属性的缩写 

2、**单元格小于容器的时候 整个grid的对齐方式**

* align-content
* justify-content
* place-content : [align-content] [justify-content] 以上两个属性的缩写 

```css
.main {
  width: 500px;
  height: 500px;
  background-color: antiquewhite;
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  /* 子项小于单元格的对齐方式 
  justify-items: start;
  align-items: end;
  place-items: end start;
	*/
  /* 对整个grid元素的对齐方式 */
  align-content: end;
  justify-content: space-evenly;
  place-content: end space-evenly;
}

.main2 {
  width: 500px;
  height: 500px;
  background-color: antiquewhite;
  display: grid;
  grid-template-columns:1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  /* 子项小于单元格的对齐方式 */
  justify-items: start;
  align-items: end;
  /* 缩写 */
  place-items: end start;

  /* 对整个grid元素的对齐方式 */
  /* align-content: end;
  justify-content: space-evenly;
  place-content: end space-evenly; */
}

.main div {
  width: 100px;
  height: 100px;
  background-color: aqua;
  border: 1px solid rebeccapurple;
}
```

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291049551.png" alt="image-20220305012538264" style="zoom: 25%;" /><img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291049430.png" alt="image-20220305012700671" style="zoom: 25%;" />





### 显示网格与隐式网格

> 指示在显示网格之外的隐式网格如何排列及尺寸大小

```css
.main {
  width: 300px;
  height: 300px;
  background-color: antiquewhite;
  display: grid;
  grid-template-columns:100px;
  grid-template-rows:100px 100px 100px;
  /* 这两个属性设置隐式网格的排列方式及大小 */
  grid-auto-flow: column;
  grid-auto-columns: 100px;
  /* 这两个属性设置隐式网格的排列方式及大小 */

}

.main div {
  background-color: aqua;
  border: 1px solid rebeccapurple;
}

.main2 {
  width: 300px;
  height: 300px;
  background-color: antiquewhite;
  display: grid;
  grid-template-rows:100px;
  grid-template-columns:100px 100px 100px;
  /* 这两个属性设置隐式网格的排列方式及大小 */
  grid-auto-flow: row;
  /* 如果不写宽度，则默认拉伸 */
  /* grid-auto-rows: 100px; */
  /* 这两个属性设置隐式网格的排列方式及大小 */

}

.main2 div {
  background-color: aqua;
  border: 1px solid rebeccapurple;
}
```

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291049217.png" alt="image-20220305014932135" style="zoom: 50%;" /><img src="C:/Users/Mew/Documents/Docs/CSS/assets//image-20220305015011348.png" alt="image-20220305015011348" style="zoom:50%;" />

设置起始位置，并进行补位

* grid-column-start : [ 1 2 3 ]   第一个元素的起始排列位置
* grid-auto-flow: row dense;    dense 紧凑布局，对自动进行补位

 <img src="C:/Users/Mew/Documents/Docs/CSS/assets//image-20220305015704851.png" alt="image-20220305015704851" style="zoom:50%;" /><img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291049739.png" alt="image-20220305015740102" style="zoom:50%;" />



## Grid子项属性

### 基于线的元素放置

> 表示grid子项所占据区域的起始位置与结束位置，包括水平及垂直方向

* grid-column-start  : line-number
* grid-column-end   : line-number
* grid-row-start :  line-number
* grid-row-end   :  line-number
* grid-column (缩写) :  [grid-column-start ] [grid-column-end]
* grid-row  (缩写) :  [grid-row-start ] [grid-row-end]
* grid-area (缩写) :  [grid-row-start ] [grid-column-start ] [grid-row-end] [grid-column-end]

```css
.main {
    width: 300px;
    height: 300px;
    background-color: antiquewhite;
    display: grid;
    grid-template-columns:1fr 1fr 1fr;
    grid-template-rows:1fr 1fr 1fr;
}

.main div {
    width: 100px;
    height: 100px;
    background-color: pink;
    border: 1px solid rebeccapurple;
}

.main div:nth-of-type(1){
  /* grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3; */
  /* 简写 */
  /* grid-column: 2 / 3;
  grid-row: 2 / 3; */

  /* 四个属性的简写 */
  grid-area: 1 / 2 / 3 / 3;
}
```

**如图**

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291049542.png" alt="image-20220305072811883" style="zoom:50%;" />



### 子项的对齐方式

> 与place-items 用法一致, 针对子项进行对齐

* justify-self
* align-self
* place-self (缩写) : [justify-self] [align-self]

**示例代码**

```css
.main {
  margin: 100px;
  width: 300px;
  height: 300px;
  background-color: antiquewhite;
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}

.main div {
  width: 50px;
  height: 50px;
  background-color: pink;
  border: 1px solid rebeccapurple;
}

.main div:nth-of-type(1) {
  justify-self: center;
  align-self: center;
  /* 四个属性的简写 */
  grid-area: 2 / 2 / 3 / 3;
}
```

**实例效果**

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291050055.png" alt="image-20220305182152736" style="zoom:50%;" />





### repeat() 与 minmax()

* repeat0 方法及 auto-fill 可选值，指定可重复的数值

* minmax() 设置最小和最大值的范围

  ```css
  .main {
    background-color: antiquewhite;
    display: grid;
    /* 搭配使用 */
    grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
    /* 显示网格 */
    grid-template-rows: 100px;
    /* 隐式网格 */
    grid-auto-rows: 100px;
    gap: 20px 20px;
  }
  .main div {
    background-color: pink;
    border: 1px solid black;
  }
  ```
  
   <img src="/Users/mew/Documents/Mar-05-2022%2023-31-01.gif" alt="Mar-05-2022 23-31-01" style="zoom:50%;" />



## Grid常见布局方案解析

### 比定位更方便的叠加布局

![image-20220305233534786](https://gitee.com/cnmz/images/raw/master/md_imgs/202203291051631.jpg)

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
        background-color: antiquewhite;
        display: grid;
        color: white;
      }
      .main img {
        width: 100%;
        grid-area: 1/1/1/1;
      }
      .main span {
        grid-area: 1/1/1/1;
        justify-self: end;

      }
      .main p {
        margin: 0;
        grid-area: 1/1/1/1;
        align-self: end;
        background-color:rgba( 0,0,0,0.5);
      }
    </style>
  </head>
  <body>
    <div class="main">
      <img src="/Users/mew/Pictures/wallhaven-wqw3j6.jpeg">
      <span>桌面</span>
      <p>正在热播中</p>
    </div>
  </body>
</html>
```

**示例图**

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291051897.png" alt="image-20220306025013009" style="zoom:50%;" />



### 多种组合排列布局

![image-20220306025222839](https://gitee.com/cnmz/images/raw/master/md_imgs/202203291052712.jpg)



```css
.main {
  width: 300px;
  height: 300px;
  background-color: antiquewhite;
  display: grid;
  color: white;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}
.main div {
  background-color: pink;
}

.main div:nth-of-type(1) {
  grid-area: 1/1 / span 2 / span 2;
}
```

**效果图**

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291052097.png" alt="image-20220306030228959" style="zoom:50%;" />



### 实现栅格布局

>  **行栅格**

```
.row {
  background-color: antiquewhite;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 100px;
  grid-auto-rows: 100px;
  gap: 5px;
}
.row div {
  background-color: pink;
  border: 1px solid black;
}

.row .col-1 {
  grid-area: auto/auto/auto/span 1;
}
.row .col-2{
  grid-area: auto/auto/auto/span 2;
}
.row .col-3 {
  grid-area: auto/auto/auto/span 3;
}
.row .col-4 {
  grid-area: auto/auto/auto/span 4;
}
.row .col-5 {
  grid-area: auto/auto/auto/span 5;
}
.row .col-6 {
  grid-area: auto/auto/auto/span 6;
}
.row .col-7 {
  grid-area: auto/auto/auto/span 7;
}
.row .col-8 {
  grid-area: auto/auto/auto/span 8;
}
.row .col-9 {
  grid-area: auto/auto/auto/span 9;
}
.row .col-10 {
  grid-area: auto/auto/auto/span 10;
}
.row .col-11 {
  grid-area: auto/auto/auto/span 11;
}
.row .col-12 {
  grid-area: auto/auto/auto/span 12;
}
```

**示例图**

<img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291052902.png" alt="image-20220306134303399" style="zoom:50%;" />



> **列栅格**

```css
.row {
  background-color: antiquewhite;
  display: inline-grid;
  grid-template-columns:100px;
  grid-template-rows: repeat(3, 1fr);;
  grid-auto-columns: 100px;
  grid-auto-flow: column;
  gap: 5px;
}
.row div {
  background-color: pink;
  border: 1px solid black;
}
```

示例图

 <img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291052706.png" alt="image-20220306135306958" style="zoom:50%;" />



### 实现百度热词示例

 <img src="C:/Users/Mew/Documents/Docs/CSS/assets//image-20220306140535521.png" alt="image-20220306140535521" style="zoom:25%;" /><img src="https://gitee.com/cnmz/images/raw/master/md_imgs/202203291052046.png" alt="image-20220306141250708" style="zoom:50%;" />



```css
.main {
  margin: 100px;
  height: 352px;
  width: 300px;
  background-color: antiquewhite;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: repeat(4,1fr);
  grid-template-areas: 
  'a1 a3 a3'
  'a2 a3 a3'
  'a4 a4 a5'
  'a6 a7 a7';
  gap: 8px;
}
.main div {
  background-color: pink;
  border: 1px solid black;
}

.main div:nth-of-type(1) {
  grid-area: a1;
}
.main div:nth-of-type(2) {
  grid-area: a2;
}
.main div:nth-of-type(3) {
  grid-area: a3;
}
.main div:nth-of-type(4) {
  grid-area: a4;
}
.main div:nth-of-type(5) {
  grid-area: a5;
}
.main div:nth-of-type(6) {
  grid-area: a6;
}
.main div:nth-of-type(7) {
  grid-area: a7;
}
```



### 小米商品导航菜单

![image-20220306141559686](https://gitee.com/cnmz/images/raw/master/md_imgs/202203291054573.jpg)



**实现**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./iconfont.css" />
    <link rel="stylesheet" href="./reset.css" />
    <style>
      .nav {
        position: relative;
        background-color: #fff;
        border: 1px solid #ff6a00;
        width: 263px;
        height: 60vh;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      .nav > li:hover {
        background: #ff6801;
      }
      .nav li {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin: 10px;
        line-height: 45px;
      }
      .nav-menu {
        position: absolute;
        left: 265px;
        top: 0;
        background-color: #fff;
        display: none;
        grid-template-rows: repeat(5, 1fr);
        grid-template-columns: 200px;
        grid-auto-columns: 200px;
        grid-auto-flow: column;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        gap: 20px;
      }

      .nav > li:hover .nav-menu {
        display: grid;
      }

      .nav-menu li {
        width: 200px;
        height: 60px;
      }
    </style>
  </head>
  <body>
    <ul class="nav">
      <li>
        <div>
          <a href="#">手机</a>
        </div>
        <i class="iconfont icon-right-arrow"></i>
        <ul class="nav-menu">
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
          <li>K40</li>
        </ul>
      </li>
      <li>
        <div>
          <a href="#">电视</a>
        </div>
        <i class="iconfont icon-right-arrow"></i>
      </li>
    </ul>
  </body>
</html>
```

![image-20220306145126152](https://gitee.com/cnmz/images/raw/master/md_imgs/202203291054381.jpg)
