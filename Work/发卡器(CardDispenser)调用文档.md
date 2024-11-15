# 发卡器(CardDispenser)调用文档

## 初始化设备 (openDev)

**调用方式**: `CardDispenser.openDev()`

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```

- **说明:** 初始化发卡器设备。成功时返回 `code: 0`，`data: 'success'`。

------

## 关闭设备 (closeDev)

**调用方式**: `CardDispenser.closeDev()`

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```

- **说明**: 关闭发卡器设备。成功时返回 `code: 0`，`data: 'success'`。

------

## 获取设备状态 (getDeviceStatus)

**调用方式**: `CardDispenser.getDeviceStatus({ timeout: 30000 })`

- **参数**: `可不传入参`
  ```ts
  - timeout (number): 超时时间（毫秒），默认为 30000
  ```

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```

- **说明**: 获取发卡器设备的当前状态。成功时返回 `code: 0`，`data: 'success'`。

------

## 重置设备 (resetDevice)

**调用方式**: `CardDispenser.resetDevice(optionType)`

- **参数**
  ```ts
  optionType (number): 重置选项
    - 0: 如果卡槽中有卡，则将卡退出
    - 1: 如果卡槽中有卡，则将卡吞入
    - 2: 无动作（默认值）
  timeout (number): 超时时间（毫秒），默认为 30000
  ```

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```

- **说明**: 重置发卡器设备。成功时返回 `code: 0`，`data: 'success'`。

------

## 退卡 (ejectIdenCard)

**调用方式**: `CardDispenser.ejectIdenCard({ timeout: 30000 })`

- **参数**: `可不传入参`
  ```ts
  - timeout (number): 超时时间（毫秒），默认为 30000
  ```

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```

- **说明**: 将卡片退出。成功时返回 `code: 0`，`data: 'success'`。

------

## 获取卡箱信息 (getCardUnitInfo)

**调用方式**: `CardDispenser.getCardUnitInfo({ timeout: 30000 })`

- **参数**: `可不传入参`
  ```ts
  - timeout (number): 超时时间（毫秒），默认为 30000
  ```

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```

- **说明**: 获取卡箱状态信息。成功时返回 `code: 0`，`data: 'success'`。

------

## 吞卡 (retainCard)

**调用方式**: `CardDispenser.retainCard(cardNo)`

- **参数**
  ```ts
  cardNo (number): 卡号
  timeout (number): 超时时间（毫秒），默认为 30000
  ```

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```

- **说明**: 将卡片吞入回收箱。成功时返回 `code: 0`，`data: 'success'`。

------

## 设置卡箱信息 (setCardUnitInfo)

**调用方式**: `CardDispenser.setCardUnitInfo(lppList)`

- **参数**
  ```ts
  lppList (string): 卡箱列表
  timeout (number): 超时时间（毫秒），默认为 30000
  ```

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```

- **说明**: 设置卡箱信息。成功时返回 `code: 0`，`data: 'success'`。

------

## 发卡 (dispenseCard)

**调用方式**: `CardDispenser.dispenseCard(cardUnit)`

- **参数**
  ```ts
  cardUnit (number): 卡箱编号
  timeout (number): 超时时间（毫秒），默认为 30000
  ```

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```

- **说明**: 从指定卡箱发出一张卡。成功时返回 `code: 0`，`data: 'success'`。

------

## 注意事项

1. 所有方法都可能抛出异常，使用时应进行适当的错误处理。
2. 使用设备前，必须调用 `openDev` 方法初始化设备。
3. 操作完成后，建议调用 `closeDev` 方法关闭设备。
4. 若设备操作异常，建议使用 `resetDevice` 方法重置设备。
5. 大部分方法的 `timeout` 参数默认值为 30000 毫秒（30 秒）。
6. 发卡操作前建议先获取设备状态，确保设备工作正常。

## 使用示例

```typescript
// 初始化发卡器
const cardDispenser = useCardDispenser()

// 打开设备
await cardDispenser.openDev()

// 获取设备状态
const status = await cardDispenser.getDeviceStatus()

// 从指定卡箱发卡
await cardDispenser.dispenseCard(1)

// 退卡
await cardDispenser.ejectIdenCard()

// 关闭设备
await cardDispenser.closeDev()