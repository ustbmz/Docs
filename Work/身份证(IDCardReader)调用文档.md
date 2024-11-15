# 身份证身份证读卡器 (IDIDCardReader) 调用文档



## 初始化设备 (openDev)

**调用方式**: `IDCardReader.openDev(LogicName)`

> **注意**: 设备初始化后，必须调用 `resetDevice` 进行设备重置。

- **参数**:  `LogicName 默认为IDCardReader`

  ```ts
  logicName (string): 设备的逻辑名称，通常为 "IDCardReader"
  ```

- 返回值

  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  // 返回示例
  {"code":0,"message":"OpenDev","data":{"__retvalue":"0"}}
  ```

- 说明

  : 初始化身份证读卡器设备。成功时返回 `code: 0`，`data: 'success'`。


------



## 重置设备 (resetDevice)

**调用方式**: `IDCardReader.resetDevice({timeout: 30000 })`

- 参数 `可不传参`

  ```javascript
  - timeout (number): 超时时间（毫秒），默认为 30000
  ```
  
- 返回值

  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  // 返回示例
  {"code":0,"message":"OpenDev","data":{"__retvalue":"0"}}
  ```

- **说明**: 重置身份证读卡器设备。成功时返回 `code: 0`，`data: 'success'`。

  

------

## 获取设备状态 (getDeviceStatus)

**调用方式**: `IDCardReader.getDeviceStatus({ timeout: 30000 })`

> **调用场景**: 得到身份证读卡器状态（同步函数）

- 参数: `可不传入参`

  ```ts
  - timeout (number): 超时时间（毫秒），默认为 30000
  ```

- 返回值

  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  // 返回示例
  {"code":0,"message":"GetDeviceStatus","data":{"__retvalue":"0","pStatus":"0"}}
  ```

- 说明:  获取身份证读卡器设备的当前状态 ,成功时返回 `code: 0`，`data: 'success'`。

  


------

## 查询设备内和卡口是否有卡 (getHaveCard)

**调用方式**: `IDCardReader.getHaveCard({ timeout: 30000 })`

- 参数 `可不传入参` 

  ```ts
  - timeout (number): 超时时间（毫秒），默认为 30000
  ```

- 返回值

  ```js
  { 
    code: number, 
    message: string, 
    data: {
      status:"HasCard",
      description:'媒介存在设备内'
    } 
  }
  -----------------------------------
  // 返回示例
  {
      "code": 0,
      "message": {
          "status": "MediaAtEntrance",
          "description": "媒介处于入口"
      },
      "data": {
          "__retvalue": "0",
          "pStatus": "6"
      }
  }
  ```

- **说明**: 检查身份证读卡器中是否有卡，`status` 主要为

  - `Empty`（无卡）
  - `HasCard`（有卡）
  - `MediaAtEntrance`（媒介处于入口）
  
  > 所有返回值
  
  ```json
  { status: 'HasCard', description: '媒介存在设备内' }
  { status: 'Empty', description: '媒介不存在' }
  { status: 'MediaJammed', description: '媒介被卡住，堵塞' }
  { status: 'StatusNotSupported', description: '不支持查媒介状态' }
  { status: 'StatusUnknown', description: '状态未知' }
  { status: 'MediaAtEntrance', description: '媒介处于入口' }
  { status: 'MediaLocked', description: '媒介存在并被锁定。这表示可对卡的芯片进行操作' }
  { status: 'Error', description: '未知错误状态' }
  ```
  

------

## 退卡 (ejectIdenCard)

**调用方式**: `IDCardReader.ejectIdenCard({ timeout: 30000 })`

> **注意**: *调用退卡前，需要使用getHaveCard 判断是否有卡*

- 参数` 可不传入参`

  ```ts
  - timeout (number): 超时时间（毫秒），默认为 30000
  ```

- 成功时返回 `code: 0`，`data: 'success'`。

- 失败时返回

  ```typescript
  { 
  	code: number, 
  	message: string, 
  	data: { status: string } 
  }
  // 返回示例
  {"code":0,"message":"EjectIdenCard","data":{"__retvalue":"0"}}
  ```

- **说明**: 尝试退出身份证读卡器中的卡片。如果没有卡，返回 `code: -201`，`status: 'Has No Card'`。

  

------

## 读取卡片 (ReadIdenCardXJ)

**调用方式**: `IDCardReader.readIdenCardXJ({timeout: 30000 })`

- 参数 `默认 trackType 使用  7 ，可不传入参`

  ```ts
  - timeout (number): 超时时间（毫秒），默认为 30000
  ```
  
- 返回值

  ```js
  { 
    code: 0 ,
  	message:"",
  	data:{
  		IDCardInfo:{
       	...
      }
  	}
  }
  ```

- **说明**: 读取卡片信息，返回的 `info` 为IDCardInfo 对象（解析后的数据）

  >  IDCardInfo 返回数据

  二代证IDCardInfo返回的数据格式：
  
  ```ts
  {
    name     	// 姓名
    sex  		 	// 性别
    nation   	// 名族
    brithDay 		 	// 出生日期
    homeAddress  	// 家庭住址
    idNumber 	// 身份证号码
    issuingAuthority	// 开立分局
    validPeriod // 身份证开立日-身份证到期日
    head  // 身份证人像绝对路径
    front		// 身份证正面绝对路径
    back		// 身份证反面绝对路径
  }
  ```
  
- 返回数据示例

  ```javascript
  {
    code: 0,
    message: 'success',
    data: {
      IDCardInfo: {
        name: 'xxx',
        sex: '男',
        nation: '汉',
        birthday: '19970901',
        hoemAddress: 'xxx市xxx区xxx苑13-3-302号',
        idNumber: '64010219970901031x',
        issuingAuthority: 'xxx市公安局xxx分局',
        validPeriod: '20150624-20350624',
        head: 'c://tmp//IDhead.jpg',
        front: 'c://tmp//IDfront.jpg',
        back: 'c://tmp//IDback.jpg'
      }
    }
  }
  ```
  
  

------

## 取消请求 (cancelInsert)

**调用方式**: `IDCardReader.cancelInsert()`

- 返回值

  ```js
  { 
    code: 0 ,
  	message:"",
  	data:"success"
  }
  ```

- **说明**: 取消插卡操作。成功时返回 `code: 0`，`data: 'success'`。



------

## 注意事项

1. 所有方法都可能抛出异常，使用时应进行适当的错误处理。
2. 使用设备前，必须调用 `openDev` `resetDevice` 方法初始化设备。
3. 操作完成后，无需调用 `closeDev` 方法关闭设备。
4. 若设备操作异常，建议使用 `resetDevice` 方法重置设备。
5. 大部分方法的 `timeout` 参数默认值为 30000 毫秒（30 秒）。
6. 读卡操作可能耗时较长，请根据实际情况合理设置超时时间。
