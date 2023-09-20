# 16 WebApp页面设计与开发
## 基础组件开发

### svg-sprite-loader

SvgIcon / index.vue

```vue
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="symbolName" />
  </svg>
</template>

<script>
const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
export default {
  name: 'svg-icon',
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    symbolName () {
      return `#icon-${this.icon}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

### 动态加载components下index.vue文件

```js
import Vue from 'vue'
// import Header from '@/components/Header'
// Vue.component('my-header', Header)

const componentsContext = require.context('@/components', true, /index.vue$/)
console.log('componentsContext', componentsContext)
componentsContext.keys().forEach((component) => {
  const componentsConfig = componentsContext(component).default
  console.log('componentsConfig', componentsConfig)
  Vue.component(componentsConfig.name, componentsConfig)
})
```

### 全局样式方案 Normalize 和 Reset

安装依赖 **postcss-px-to-viewport**  

配置文件 **postcss.config.js**

```
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/(\/|\\)(node_modules)(\/|\\)/]
      // landscape: false, // 横屏配置
      // landscapeUnit: 'vw',
      // landscapeWidth: 568
    }
  }
}

```

### Vue共享全局变量

> 官方api : https://vue-loader.vuejs.org/zh/guide/pre-processors.html#%E5%85%B1%E4%BA%AB%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F

**sass-loader` 也支持一个 `additionalData` 选项，这个选项允许你在所有被处理的文件之间共享常见的变量，而不需要显式地导入它们**：

```js
// webpack.config.js -> module.rules
{
  test: /\.scss$/,
  use: [
    'vue-style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        // 你也可以从一个文件读取，例如 `variables.scss`
        // 如果 sass-loader 版本 = 8，这里使用 `prependData` 字段
        // 如果 sass-loader 版本 < 8，这里使用 `data` 字段
        additionalData: `$color: red;`
      }
    }
  ]
}
```

### 移动端分辨率适配 postcss-px-to-viewport

> npmjs https://www.npmjs.com/package/postcss-px-to-viewport

```js
# postcss.config.js
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/(\/|\\)(node_modules)(\/|\\)/]
      // landscape: false, // 横屏配置
      // landscapeUnit: 'vw',
      // landscapeWidth: 568
    }
  }
}
```





## 解决微信下拉黑边问题

### forbidScroll.js

```js
export const forbidScroll = (elem) => {
  let flag = false

  elem.addEventListener('touchstart', (evt) => {
    // 是否包含传入的dom
    if (elem.contains(evt.target)) {
      flag = true
    } else {
      flag = false
    }
  }, false)
  elem.addEventListener('touchmove', (evt) => {
    evt.prop = flag
  })
}
// 阻止touchmove事件
const handler = (evt) => {
  if (evt.prop) {
    evt.preventDefault()
  }
}
// 解决重复调用
// passive: true 会忽略handle 
document.body.removeEventListener('touchmove', handler, { passive: false })
document.body.addEventListener('touchmove', handler, { passive: false })
```

### App.vue 引用 forbidScroll

```vue
<script>
import { forbidScroll } from '@/utils/forbidScroll'

export default {
  mounted () {
    window.forbidScroll = forbidScroll
  }
}
</script>
```

### 在顶部 底部单个vue组件中，引用forbidScroll

```vue
mounted () {
    const elem = this.$refs.footer
    window.forbidScroll(elem)
}
```





## 移动端html Meta标签配置

![image-20210905160720129](https://gitee.com/cnmz/images/raw/master/mdpic/image-20210905160720129.png)

```js
<head>
  <meta charset="utf-8">
  <!-- meta 参数说明 使用IE最新的版本进行渲染 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- meta 参数说明 minimum-scale 最小缩放级别 -->
  <!-- meta 参数说明 maximum-scale 最大缩放级别 -->
  <!-- meta 参数说明 user-scable 用户双手缩放 ：no 禁止 -->
  <meta name="viewport"
    content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scable=no">
  <!-- meta 参数说明 HandheldFriendly 针对用户手持设备 不识别viewport所作的设置 老旧机型 例如黑莓 -->
  <meta name="HandheldFriendly" content="true">
  <!-- meta 参数说明 apple-mobile-web-app-capable 如果为ios设备，全屏模式下不启用工具栏及菜单栏 -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <!-- meta 参数说明 apple-touch-fullscreen ios设备webapp模式下，全屏进行展示 -->
  <meta name="apple-touch-fullscreen" content="yes">
  <!-- meta 参数说明 app-mobile-web-app-title ios设备展示的title -->
  <meta name="app-mobile-web-app-title" content="西蒙社区">
  <!-- meta 参数说明 apple-touch-fullscreen ios设备webapp模式下，顶部栏颜色为黑色 -->
  <meta name="appp-mobile-web-app-status-bar-style" content="black">
  <!-- meta 参数说明 formate-detectio 禁止可点击电话与邮箱 -->
  <meta name="formate-detection" content="telphone=no,email=no">
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  <title>
    <%= htmlWebpackPlugin.options.title %>
  </title>
</head>
```

### 检测用户是否横屏，进行提示

```js
mounted () {
    const _this = this
    window.forbidScroll = forbidScroll

    window.addEventListener('onorientationchange' in window ? 'orientation' : 'resize', function () {
      if (window.orientation === 90 || window.orientation === -90) {
        _this.$Toast('请在竖屏模式下进去浏览')
      }
    }, false)
}
```

## 移动端竖屏兼容CSS

方式一：使用window监听事件实现

```js
const _this = this
window.addEventListener(
  'onorientationchange' in window ? 'orientation' : 'resize',
  function () {
    if (window.orientation === 90 || window.orientation === -90) {
      _this.$Toast('请在竖屏模式下进去浏览')
    }
  },
  false
)
```

方式二：使用css实现

```scss
@media (min-width: $break-super) and (orientation: landscape) {
  html::before {
    background: #333;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
    top: 0;
    left: 0;
    content: '';
  }
  body:before {
    background-image: url('./assets/images/orientation.png');
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -140px 0 0 -50px;
    z-index: 9999;
    color: #fff;
    height: 200px;
    width: 100px;
    content: '';
  }
  body:after {
    content: '\4e3a\4e86\66f4\597d\7684\4f53\68c0\ff0c\8bf7\5c06\624b\673a\7ad6\5c4f\6d4f\89c8';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 30px;
    z-index: 9999;
    color: #fff;
    margin-top: 40px;
    text-align: center;
    font-size: 18px;
  }
}
```



### VUE Transition 动画与过度

包裹需要过度动画的组件

```vue
<transition :name="direction">
   <router-view> </router-view>
</transition>
```

使用meta参数 判断路由是否需要过度动画

> router.js

```js
watch: {
    $route (to, from) {
      if (from.name === null) {
        return
      }
      if (to.meta.index < from.meta.index) {
        this.direction = 'slide-right'
      } else {
        if (!to.meta.index) {
          this.direction = ''
          return
        }
        this.direction = 'slide-left'
      }
    }
}
```

css 实现部分

```scss
<style>
.slide-right-enter-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.5s;
  will-change: transform;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active,
.slide-right-leave-to {
  transform: translateX(100%);
}
.slide-right-enter-to,
.slide-right-leave {
  transform: translateX(0);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active,
.slide-left-leave-to {
  transform: translateX(-100%);
}
.slide-left-enter-to,
.slide-left-leave {
  transform: translateX(0);
}
</style>
```

