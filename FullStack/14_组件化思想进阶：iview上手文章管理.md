## 14周 组件化思想进阶：iview上手文章管理

**本周进入到后台管理系统开发，从项目整体架构去考虑中后台应用的开发路径。学习iview-admin 框架工作原理，自定义表格组件，完成文章管理开发。**

## 后台系统图示例

![image-20210728172945625](https://gitee.com/cnmz/images/raw/master/images/20210728172950.png)



## 服务需求分析

![image-20210728173502324](https://gitee.com/cnmz/images/raw/master/images/20210728173502.png)



### 封装模块

components.  业务模块

module 这个组件可以用在任何框架里

Plugin    项目全局使用





### Vuex 中 module 用法 

[Module | Vuex (vuejs.org)](https://vuex.vuejs.org/zh/guide/modules.html)

> 项目复杂到一定程度，才考虑使用module



## ivew - api





Render 写法 [#](http://v1.iviewui.com/components/table#Render_XF)

通过给 `columns` 数据的项，设置一个函数 `render`，可以自定义渲染当前列，包括渲染自定义组件，它基于 Vue 的 Render 函数。

`render` 函数传入两个参数，第一个是 h，第二个是对象，包含 `row`、`column` 和 `index`，分别指当前单元格数据，当前列数据，当前是第几行。

[ 学习 Render 函数的内容](https://segmentfault.com/ls/1650000011074057)



### VUE - jS 搭配 ivew Render 实现数据格式化

[][]

### [深入数据对象](https://cn.vuejs.org/v2/guide/render-function.html#深入数据对象)

有一点要注意：正如 `v-bind:class` 和 `v-bind:style` 在模板语法中会被特别对待一样，它们在 VNode 数据对象中也有对应的顶层字段。该对象也允许你绑定普通的 HTML attribute，也允许绑定如 `innerHTML` 这样的 DOM property (这会覆盖 `v-html` 指令)。

```js
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```

格式化tableData

```js
## 格式化日期
render: (h, params) => {
  return h('div', [
    h('span', dayjs(params.row.created).format('YYYY-MM-DD HH:mm:ss'))
  ])
},
## 使用vue 数据对象重写dom元素
render: (h, params) => {
  return h('div', [
    h('Tag', {
      class: 'test',
      props: {
        ## ivew 官方自定义颜色样式
        color: params.row.status === '0' ? 'success' : 'error'
      },
      ## domProps innerHTML 
      domProps: {
        innerHTML: params.row.status === '0' ? 'on' : 'off'
      }
    })
  ])
},
## 格式化数组标签
render: (h, params) => {
  return h('div', [
    h('span', params.row.tags.map((o) => o.name).join(',') || '')
  ])
},
```



