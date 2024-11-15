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
  
  // 数据示例
  {"code":0,"message":"OpenDev","data":{"__retvalue":"0"}}
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
  
  // 数据示例
  {"code":0,"message":"ResetDevice","data":{"__retvalue":"0"}}
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
  
  // 数据示例
  {"code":0,"message":"GetDeviceStatus","data":{"__retvalue":"0"}}
  ```
  
- 说明: 获取密码键盘设备的当前状态。成功时返回 `code: 0`，`data: true`。

------

## 输入密码 (XfsStartPin)

**调用方式**:  `明文示例` 

```ts
PinPad.XfsStartPin({ 
    bEncy: 0, 
		sFormat: 0, 
		sPadding: 0,
		pKeyName:'',
		sLen:0,
		pCardNO:'',
		sAutoEnter:0 ,
		lTimeOut:30000
  })
```

- 参数

  ```ts
  {
    bEncy: number,			//是否加密 1=加密  0=不加密，明文输入。
  	sFormat: number,		//sFormat指加密的模式，默认为0（WFS_PIN_FORM3624）
  	sPadding: number, 	//只在密文输入时才有效，明文输入时值为NULL。
    pKeyName:	string,		//指参与加密的工作密钥名称即在导入密钥时自定义的名称。明文输入时值无效
    sLen:	number,				//输入密文的长度
    pCardNO	:number,		//需要关联密码校验的卡号。明文输入时值无效
    sAutoEnter:	number,	//是否自动提交(0不自动提交  1自动提交)
    lTimeOut:	number,		//超时时间
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

- 注意：输入结束后，必须调用取消输入事件

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

- 取消输入后密码键盘输入事件返回示例

  ```js
  {
      "code": 0,
      "message": "XfsStartPin",
      "data": {
          "__retvalue": "-4",
          "Value": "",
          "pValueLen": "52128408"
      }
  }
  ```

  

------

## 注意事项

1. 所有方法都可能抛出异常，使用时应进行适当的错误处理。
2. 使用设备前，必须调用 `openDev` 和 `resetDevice` 方法初始化设备。
3. 操作完成后，无需调用 `closeDev` 方法关闭设备。
4. 若设备操作异常，建议使用 `resetDevice` 方法重置设备。
5. 大部分方法的 `timeout` 参数默认值为 30000 毫秒（30 秒）。
6. 密码输入过程可能需要用户交互，请设置合适的超时时间。
7. 出于安全考虑，密码始终以加密形式返回，切勿在应用中存储或显示明文密码。
