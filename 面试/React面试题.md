# 项目一

**BVOX区块链交易平台** 

**项目介绍**：

BVOX交易平台的主要业务是提供加密货币交易平台，让用户买卖各种加密货币，并提供多种交易工具和衍生品。

此外，BVOX还提供多种金融服务，如理财产品、Launchpad、，以及币币交易、法币交易、杠杆交易、合约交易

等多种交易方式。

**技术栈**：

React、Vue、ES6、Ant-design、View-design、html5等。

**日常任务:**

1、负责交易平台的现货交易、合约交易、活动推广、招新等功能的开发、并及时解决线上问题和突发情况，并根据

用户反馈完成系统代码和性能优化；

2、使用Vue.js或ReactJS开发高效、可重用的前端组件和应用程序；

3、与设计团队紧密合作，将设计稿转化为功能性的前端代码；

4、对现有应用进行维护和优化，提升性能和用户体验；

5、解决跨浏览器兼容性问题和响应式设计的挑战。



1. ##### 在 BVOX 交易平台的核心交易流程开发中，涉及杠杆调整、保证金计算等复杂状态逻辑，你是选择 `useState` 还是 `useReducer` 管理状态？为什么？能否举例说明你是如何设计状态更新逻辑的？

   ```
   在 BVOX 交易的杠杆 / 保证金逻辑中，我选择 useReducer，因为状态依赖关系复杂（如保证金变化会影响仓位、强平价格等多个子状态）。
   设计：将状态抽象为 { position: {}, margin: 0, leverage: 5, liquidationPrice: 0 }，通过 UPDATE_MARGIN ADJUST_LEVERAGE 等 action 统一管理更新逻辑，便于调试和复用，避免 useState 嵌套更新导致的混乱。
   ```

2. ##### 项目中提到 “将页面初次渲染时长缩短 50%”，除了`useMemo`，还使用了哪些 React 层面的优化手段？（例如组件拆分、虚拟列表、`React.memo`等）请结合交易盘口页面具体说明。

   ```
   - 方案：
     - 代码分割：用 `React.lazy` + `Suspense` 拆分交易模块，首屏只加载核心盘口组件；
     - 虚拟列表：用 `react-window` 优化历史订单列表，只渲染可视区域内的条目；
     - 减少重渲染：用 `useMemo` 缓存 K 线计算结果，`useCallback` 固定回调函数引用。
   - 衡量工具：Chrome DevTools 的 Performance 面板录制渲染过程，对比优化前后的 Layout/Paint 耗时；Lighthouse 检测首屏加载时间。
   ```

3. ##### 在处理 “客户端内存占用过大” 问题（如 BVOX 项目中将内存从 2GB 优化至 250MB）时，React Hook 的使用可能存在哪些潜在问题（如闭包导致的内存泄漏、不合理的依赖数组）？你是如何排查并解决的

   ```
   - 常见原因：`useEffect` 中未清理的定时器 / 事件监听（如 WebSocket 连接）、闭包引用旧状态导致的内存残留。
   - 解决：在交易平台的实时行情组件中，`useEffect` 清理函数取消 WebSocket 订阅；用 `useRef` 存储最新状态，避免闭包陷阱；通过 Chrome Memory 面板快照分析，定位未释放的 DOM 节点和事件监听。
   ```

4. ##### 如果你需要为团队制定 React Hook 使用规范（如简历中提到的 “整理代码规范文档”），请列出 3-5 条核心规范，并说明原因（如避免状态冗余、优化性能等）。

   ```
   React 项目专属手段：
   
   - 按需加载：用 `babel-plugin-import` 配置 Ant-design，只引入使用的组件和样式；
   - 代码分割：拆分 `node_modules` 为 `vendor` chunk，利用浏览器缓存；
   - 压缩优化：用 `TerserPlugin` 压缩 JS，`MiniCssExtractPlugin` 提取 CSS 并压缩；
   - Tree-shaking：开启 production 模式，移除未使用的 React 组件和函数。
   
   
   ```

   监控平台需要展示大量告警数据（如分级告警、日志列表），并支持 “告警事件的发现、通知、处置” 全流程。请说明：

   - 如何使用`useReducer`管理告警状态的复杂变更(状态流转)。
   - 如何在组件卸载时清理未完成的通知任务？

   

#####         5.  你在项目中有使用TypeScript吗 ? 请问在 React Hook 中如何结合 TS 进行类型定义？例如为`useState`定义复杂类型（如交易订单类型），或为自定义 Hook 添加泛型约束。


```javascript
	为useState定义复杂类型（以交易订单为例）
在 BVOX 区块链交易平台的订单管理场景中，交易订单包含订单号、类型、金额等多种属性，可通过interface定义复杂类型并为useState指定类型：
typescript
// 定义交易订单类型
interface TradeOrder {
  orderId: string;
  type: 'spot' | 'contract'; // 现货/合约订单
  amount: number;
  price: number;
  status: 'pending' | 'completed' | 'cancelled';
  timestamp: number;
}

// 在组件中使用useState并指定类型
const [currentOrder, setCurrentOrder] = useState<TradeOrder | null>(null);

// 正确赋值示例（符合TradeOrder类型约束）
setCurrentOrder({
  orderId: 'ORD123456',
  type: 'contract',
  amount: 10,
  price: 30000,
  status: 'pending',
  timestamp: Date.now()
});

通过明确类型，TypeScript 会在开发阶段校验订单数据的结构和字段合法性，避免因类型错误导致的运行时问题。

2. 为自定义 Hook 添加泛型约束
在封装可复用的自定义 Hook（如简历中提到的 “二次封装 Request”）时，通过泛型约束可使其支持多种数据类型，以请求交易数据的 Hook 为例：
typescript
// 定义请求返回数据的通用结构
interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

// 带泛型约束的自定义请求Hook
function useTradeRequest<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json() as Promise<ApiResponse<T>>)
      .then(response => {
        if (response.code === 200) {
          setData(response.data);
        }
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}

// 使用时指定具体类型（如合约交易数据）
interface ContractData {
  position: number;
  margin: number;
  liquidationPrice: number;
}

// 调用Hook时传入泛型参数，自动约束返回数据类型
const { data: contractInfo, loading } = useTradeRequest<ContractData>('/api/contract');
泛型约束使该 Hook 可复用在现货交易、合约交易等不同场景，同时保证返回数据类型的准确性。
3. 为useReducer定义状态和动作类型
在处理复杂状态逻辑（如交易平台的仓位调整）时，通过useReducer结合 TS 类型定义，可明确状态结构和允许的动作类型：
typescript
// 定义状态类型
interface PositionState {
    amount: number;
    leverage: number;
    margin: number;
}

// 定义动作类型
type PositionAction =
  | { type: 'ADJUST_LEVERAGE'; payload: number }
  | { type: 'ADD_MARGIN'; payload: number }
  | { type: 'REDUCE_POSITION'; payload: number };

//  reducer函数（自动校验动作类型和状态更新逻辑）
function positionReducer(state: PositionState, action: PositionAction): PositionState {
  switch (action.type) {
    case 'ADJUST_LEVERAGE':
      return { ...state, leverage: action.payload };
    case 'ADD_MARGIN':
      return { ...state, margin: state.margin + action.payload };
    case 'REDUCE_POSITION':
      return { ...state, amount: state.amount - action.payload };
    default:
      throw new Error('Invalid action type');
  }
}

// 在组件中使用
const [state, dispatch] = useReducer(positionReducer, {
  amount: 0,
  leverage: 1,
  margin: 0
});
通过类型约束，可避免因传入错误的动作类型或 payload 格式导致的状态更新错误，尤其适合简历中提到的 “杠杆调整、合约保证金调节” 等核心业务场景。
这些方式既能利用 TypeScript 的类型检查提升代码健壮性，又能适配前端开发中复杂的业务场景，与管维强在项目中 “优化实时下单逻辑、处理跨浏览器兼容性” 等需求相契合
```






# 项目二

**项目介绍**：

交通银行业务(港行)系统是香港交通银行集 visa 卡、银联卡、信用卡等业务为一体的操作平台，包括注册、申请卡

账、发行卡片、转账、取款、挂账、冲销、分期等业务

**技术栈：**

React、Vue3、ES6、Ant-design、ivew、css、guip、git 等

**日常任务:**

我负责本系统的客服平台，负责与各业务平台（如：核心、信审、反欺诈、积分权益、参数等）沟通业务、生成可

视化界面和可操作平台，与相关业务老师和第三方老师进行接口联调并测试相关交易。

**主要成绩：**

1、在港行原有基础上进行二次开发了 guip 框架，避免反复跳转造成的页面白屏；

2、完成了卡张客信息维护业务、信用卡:业务（支票还款、支票还款冲正、现金取款、抹账、转账、清算、抹账

等）分期业务（月接单分期、商户分期、消费分期、现金分期等）；

3、协同部门组长使用 webpack 插件优化打包代码资源，约定编写规范，实现规范统一、缩减 40%打包资源



##### 题目一：

1. ##### 在交通银行业务系统中，你需要与多个业务平台（核心、信审、反欺诈等）联调接口，是否使用过 `useContext` 或状态管理库共享跨组件数据？如果多个组件依赖同一批接口数据，你是如何设计数据缓存或状态共享方案的？

```
- 在交通银行业务系统中，用 `useContext` 封装了用户信息上下文（如登录状态、权限），避免在客服平台、积分系统等多层组件中传递 props。
- 数据缓存：对接口数据用 `useReducer` 结合 `localStorage` 缓存，设计 `FETCH_SUCCESS` `FETCH_FAILED` 等 action，组件通过 `useContext` 获取数据时先读缓存，减少重复请求。

```



2. ##### 简历中提到 “二次开发 guip 框架避免页面白屏”，请解释在 React 项目中，页面白屏可能由哪些原因导致（从组件渲染、Hook 使用角度分析）？你是如何通过 Hook 优化解决的？



# 项目三

2**019-08 ~ 2022-07** 

**中国光大银行统一监控平台** 

**WEB前端开发**

**项目介绍**：

UMP 统一监控平台是光大科技自主研发的企业级一站式监控平台，包括对存储、硬件、数据库、网络设备和应用等各 层面的统一监控管理、统一处理、统一告警外发、统一查看。支持告警事件的发现、通知、处置、跟踪、关闭、分析、 性能查看等一 站式操作。

**技术栈**：

React、ES6、Ant-design、css、aHooks、git、mock 等 日常任务。

**日常任务：**

我负责 UMP 前端开发，历时 2 年，主导完成监控对象与相关策略、告警阀值之间的绑定，通过特定公式计算成监控实例，下 发到 zabbix 上，采集告警信息，并将告警存储于 UMDB 数据库中，接着请求告警和日志，并将告警分级展 示在前端页面，同 时也通过发送短信、电话、光大 E 信的方式通知给 操作人员进行告警处理。

**主要成绩：**

1、负责首页、列表的页面组件拆分， 以及页面优化编码组件，列表通过 UseMemo以及其他自定义 Hooks 进行优化；

2、负责开发了轮播图多功能组件、卡片列表组件、跳转组件 ...,极大节省重复开发和代码阅读以及后期维护的方便性 :

3、进行二次封装 Request 支持 Promise 、控制台日志信息、日志采集、节流请求以及请求报文配置等等；

4、引入 MockJs 技术，方便前后端分离并实现了同步开发，极大的节省了对接成本；

5、使用 markDown 技术为后来的前端同学整理了快速熟悉并接手项目的开发文档和日常代码规范



## 题目一：

1. ##### 用 `useMemo` 和自定义 Hooks 优化列表渲染，能具体说明一下 `useMemo` 解决了什么问题吗？在什么场景下你会选择使用 `useMemo` 而非 `React.memo`？

```
- `useMemo` 用于缓存**计算结果**，解决渲染阶段的重复计算问题（如交易平台中实时计算的 K 线指标）。例如在监控平台的列表中，用 `useMemo` 缓存筛选后的告警数据，避免每次渲染重新过滤。
- 区别：`React.memo` 是高阶组件，缓存**组件本身**，防止父组件重渲染时子组件无辜更新（适用于纯展示组件）；而 `useMemo` 聚焦值的缓存，当组件内部有复杂计算时优先使用。
```

2. ##### 你二次封装了 Request 工具并支持节流请求，结合 React 场景，节流、防抖这类优化手段通常用于处理什么问题？在 React 中实现节流时需要注意哪些细节（比如依赖项、组件卸载时的清理）

```
- 用途：处理高频触发事件，如交易平台的价格输入框防抖（避免输入过程中频繁校验）、监控平台的滚动加载节流（减少请求频率）。
- 注意点：在 `useEffect` 中定义节流函数时，需用 `useCallback` 缓存函数引用，避免依赖变化导致节流失效；组件卸载时要清除定时器（如 `useEffect` 清理函数中取消未执行的节流任务）
```

3. ##### 你在多个项目中同时使用了 React 和 Vue，能否对比一下 React 的虚拟 DOM 和 Vue 的虚拟 DOM 在实现或优化逻辑上的差异？你在实际开发中是如何利用虚拟 DOM 特性提升性能的？

```
- **差异**：React 虚拟 DOM 是 JavaScript 对象描述的 DOM 结构，通过 Fiber 架构实现增量更新和优先级调度；Vue 虚拟 DOM 在 3.x 中引入了编译时优化，会对模板进行静态标记，跳过静态节点的 Diff 过程。
- **实践**：在 BVOX 交易平台的盘口优化中，我利用 React 虚拟 DOM 的 Diff 特性，通过 `React.memo` 缓存列表项组件，只在交易数据变化时更新对应节点；同时用 `key` 绑定唯一交易 ID，避免列表重排时的 DOM 复用错误，减少不必要的渲染。
```

