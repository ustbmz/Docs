# 密码键盘 (PinPad) 调用文档

## 初始化设备 (openDev)

**调用方式**: `PinPad.openDev(LogicName)`

> **注意**: 设备初始化后，必须调用 `resetDevice` 进行设备重置。

- **参数**:  `LogicName 默认为PinPad`
  
   ```ts
   logicName (string): 设备的逻辑名称，通常为 "PinPad"
   ```
   
- 返回值

  ```js
  { 
    code: number, 
    message: string, 
    data: boolean 
  }
  ```
  
- 说明: 初始化密码键盘设备。成功时返回 `code: 0`，`data: true`。

------

## 重置设备 (resetDevice)

**调用方式**: `PinPad.resetDevice({ timeout: 30000 })`

- 参数

  ```typescript
  {
    timeout: number // 超时时间（毫秒），默认为 30000
  }
  ```
  
- 返回值

  ```js
  { 
    code: number, 
    message: string, 
    data: boolean 
  }
  ```
  
- **说明**: 重置密码键盘设备成功时返回 `code: 0`，`data: true`。

------

## 获取设备状态 (getDeviceStatus)

**调用方式**: `PinPad.getDeviceStatus({ timeout: 30000 })`

- 参数: `可不传入参`

  ```ts
  {
    timeout: number // 超时时间（毫秒），默认为 30000
  }
  ```
  
- 返回值

  ```js
  { 
    code: number, 
    message: string, 
    data: boolean 
  }
  ```
  
- 说明: 获取密码键盘设备的当前状态。成功时返回 `code: 0`，`data: true`。

------

## 输入密码 (inputPassword)

**调用方式**: `PinPad.inputPassword({ minLength: 0, maxLength: 6, timeout: 30000 })`

- 参数

  ```typescript
  {
    minLength: number, // 最小密码长度，默认为 6
    maxLength: number, // 最大密码长度，默认为 12
    timeout: number    // 超时时间（毫秒），默认为 30000
  }
  ```
  
- 返回值

  ```js
  { 
    code: number, 
    message: string, 
    data: {
      encryptedPin: string
    }
  }
  ```
  
- **说明**: 启动密码输入过程。返回加密后的密码。

------

## 取消密码输入 (cancelInput)

**调用方式**: `PinPad.cancelInput()`

- 返回值

  ```js
  { 
    code: number, 
    message: string, 
    data: boolean 
  }
  ```
  
- **说明**: 取消当前的密码输入过程。成功时返回 `code: 0, message:"", data: 'success'`。

------

## 注意事项

1. 所有方法都可能抛出异常，使用时应进行适当的错误处理。
2. 使用设备前，必须调用 `openDev` 和 `resetDevice` 方法初始化设备。
3. 操作完成后，无需调用 `closeDev` 方法关闭设备。
4. 若设备操作异常，建议使用 `resetDevice` 方法重置设备。
5. 大部分方法的 `timeout` 参数默认值为 30000 毫秒（30 秒）。
6. 密码输入过程可能需要用户交互，请设置合适的超时时间。
7. 出于安全考虑，密码始终以加密形式返回，切勿在应用中存储或显示明文密码。
