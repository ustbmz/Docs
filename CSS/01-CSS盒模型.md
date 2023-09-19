

## CSS 框模型

所有 HTML 元素都可以视为方框。在 CSS 中，在谈论设计和布局时，会使用术语“盒模型”或“框模型”。

CSS 框模型实质上是一个包围每个 HTML 元素的框。它包括：外边距、边框、内边距以及实际的内容。下图展示了框模型：

![CSS 框模型](https://s2.loli.net/2022/04/08/ZpSxvA3OTmtFsdY.png)

对不同部分的说明：

- *内容* - 框的内容，其中显示文本和图像。
- *内边距* - 清除内容周围的区域。内边距是透明的。
- *边框* - 围绕内边距和内容的边框。
- *外边距* - 清除边界外的区域。外边距是透明的。

<img src="https://s2.loli.net/2022/04/08/OYoARlSi9mcBe8q.jpg" alt="image-20220226143924235" style="zoom:50%;" />





## Css盒模型注意点

### padding 不能为负值，而margin可以

```css
.g-box {
  width: 100px;
  height: 100px;
  background: red;
  padding: 20px;
  border: 1px solid black;
  margin: -20px;
}

.g-box2 {
  width: 100px;
  height: 100px;
  background: burlywood;
}
```



图示:

​	<img src="https://s2.loli.net/2022/04/08/B4RX3l9YzrDpCSu.png" alt="image-20220226144734213" style="zoom:50%;" />

​		

### 背景色会平铺到非margin区域

```css
.g-box {
    width: 100px;
    height: 100px;
    background: red;
    padding: 20px;
    border: 10px solid rgba(0, 0, 0, 0);
    margin: 20px;
  }
```

图示: 
	<img src="https://s2.loli.net/2022/04/08/k7vTrsioelxPMdn.png" alt="image-20220226145145026" style="zoom:50%;" />

​	

### Margin-top传递的现象及解决方案

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box1 {
      width: 200px;
      height: 200px;
      background-color: pink;
    }

    .box2 {
      width: 100px;
      height: 100px;
      background-color: brown;
      margin-top: 130px;
    }
  </style>
</head>

<body>
  <div class="box1">
    <div class="box2">
    </div>
  </div>
</body>
</html>
```

图示:<img src="https://s2.loli.net/2022/04/08/DwgFMXWqa8ZBvTc.png" alt="image-20220226150119621" style="zoom:50%;" />

**解决办法**

* 换为 padding
* 给父元素设置边框
* BFC格式化上下文 (了解BFC)
* 使用弹性布局(flex)或网格布局(grud)



图示:<img src="https://s2.loli.net/2022/04/08/sIpOmletE573Drg.png" alt="image-20220226150422942" style="zoom:50%;" />

 

### margin 上下叠加的现象

> 两者之间都有margin间距，则取最大

处理办法：

只加一个margin-bottom 或者只加 margin-top





## 块级盒子与内联盒子

块级盒子 block-box 

> div , p , h1 ....

内联盒子 inline-box

> span , a , strong ...

### 块级盒子的特性

* 独占一行
* 支持所有样式
* 不写宽度，宽度与父容器相同
* 所占区域为一个矩形

### 内联盒子的特性 (不建议使用内联盒子做布局)

* 盒子不会产生换行 。左右排列
* 有些样式不支持,例如 width height
* 不写宽度，宽度由内容决定
* 所占区域不一定是矩形
* 内连标签之间是有空隙的



## 自适应盒模型

当盒子**不设置宽度**时，盒模型相关组成部分的处理方式是如何的

```css
<style>
.box1 {
  width: 200px;
  height: 200px;
  background-color: pink;
}

.box2 {
  height: 100px;
  background-color: brown;
  padding: 10px;
  border: 1px solid black;
  margin: 10px;
}
</style>
```



## 标准盒模型与怪异盒模型



<img src="https://s2.loli.net/2022/04/08/ydNBr4J6IfQopxL.png" alt="image-20220226163948409" style="zoom:50%;" />

<img src="https://s2.loli.net/2022/04/08/hnAiB2EYksUyWrK.png" alt="image-20220226163925792" style="zoom:50%;" />





### Box-sizing 属性

标准盒模型:   Content-box : width, height --> content。 

怪异盒模型：Border-box:  width, height --> content + padding + border



利用怪异盒模型：

* 量取尺寸时不用计算padding 及 border 值
* 解决一些需要设置百分比和盒模型值

​	

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>怪异盒模型</title>
  <style>
    .box1 {
      width: 200px;
      height: 200px;
      background-color: pink;
    }

    .box2 {
      width: 200px;
      height: 100px;
      background-color: brown;
      padding: 10px;
      border: 1px solid black;
      /* 怪异盒模型 */
      box-sizing: border-box;
    }

    input {
      width: 100%;
      padding: 10px;
      /* 怪异盒模型  加上padding后整体宽度不会超过100% */
      box-sizing: border-box;
    }
  </style>
</head>

<body>
  <div class="box1">
    <div class="box2">
      自适应盒子
    </div>
  </div>
  <input type="input">
  </input>
</body>

</html>
```

图示:

![image-20220226165122018](https://s2.loli.net/2022/04/08/BTugfovLOH5ZXJK.png)



## 浮动样式详解

> Float 属性

**清除浮动的方式**

* clear属性

  ```css
  .box1 {
    width: 100px;
    height: 100px;
    background-color: pink;
    float: left;
  }
  
  .box2 {
    width: 200px;
    height: 200px;
    background-color: brown;
    clear: both;
  }
  ```

* BFC

* 空标签

  ```html
  <div class="box1">
    <div class="box2"></div>
    <div style="clear: both"></div>
  </div>
  ```

* .clearfix::after{}

  ```html
  <div class="box1 clearfix">
    <div class="box2"></div>
  </div>
  <style>
    .box1 {
      width: 200px;
      background-color: pink;
      border: 1px solid black;
    }
    .box2 {
      width: 100px;
      height: 100px;
      background-color: brown;
      float: left;
    }
    .clearfix::after {
      content: '';
      display: block;
      clear: both;
    }
  </style>
  ```

  

### 浮动的特性

* 浮动只会影响后面的元素

  ```css
  .box1 {
    width: 100px;
    height: 100px;
    background-color: pink;
  }
  .box2 {
    width: 200px;
    height: 200px;
    background-color: skyblue;
    float: left;
  }
  .box3 {
    width: 300px;
    height: 300px;
    background-color: blue;
  } 
  ```


* 文本不会被浮动元素覆盖 (图文混排)
* 块级标签浮动后具备内联盒子的特性: 宽度由内容决定
* 内联标签浮动后具有块级盒子的特性: 支持所有样式
* 浮动放不下，会自动换行



##  定位样式详解

> Css Postion 属性用于指定一个元素在文档中的定位方式，left,top,right,bootom决定了改元素的最终位置

 Postion:

* static (默认)
* relative (相对)
  * 正常位置偏移给定的值
  * 不影响到其他元素布局（因为处于正常文档流）
  * 相对于自身进行偏移
* absolute (绝对)
  * 脱离文档流，不占据空间
  * 具备内联盒子特性：**宽度由内容决定**
  * 内联标签具有块级盒子的特性: **支持所有样式**
  * 绝对定位相对于最近的非static祖元素定位，不存在这样的祖元素时，则相对于可视区定位
* stickey (固定)
  * 与绝对定位相似，但会固定在可视区内
  * 具备内联盒子特性：**宽度由内容决定**
  * 内联标签具有块级盒子的特性: **支持所有样式**
  * 固定定位不受祖先元素影响
* 粘性定位 > 固定定位和相对定位的混合，元素在跨越特定阀值前为相对定位，之后为固定定位
* Fixed (弹性)



