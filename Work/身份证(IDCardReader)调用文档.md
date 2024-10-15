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
  ```

- 说明

  : 获取身份证读卡器设备的当前状态 ,成功时返回 `code: 0`，`data: 'success'`。
  
  


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
      status:"Empty|NotEmpty|Error"
    } 
  }
  ```

- **说明**: 检查身份证读卡器中是否有卡。`status` 可能为 `'Empty'`（无卡）或 `'NotEmpty'`（有卡）。

  

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

  ```ts
  { code: 0 ,
  	message:"",
  	data:{
  		IDCardInfo:info
  	}
  }
  ```

- **说明**: 读取卡片信息，返回的 `info` 为IDCardInfo 对象（解析后的数据）

  >  IDCardInfo 返回数据

  二代证pInfo返回的数据格式：
  
  IDType=0|Name=李明|Sex=男|Nation=汉|Born=19850101|Address=北京东城区建国门内大街 69 号|IDCardNO=622727199011111111| GrantDept=X 市公安局 X 分局|UserLifeBegin=20110101| UserLifeEnd=20310101|PhotoFileName=C:\photo.bmp
  
  ```ts
  {
    IDType   	// 身份证类型
    Name     	// 姓名
    Sex  		 	// 性别
    Nation   	// 名族
    Born 		 	// 出生日期
    Address  	// 家庭住址
    IDCardNO 	// 身份证号码
    GrantDept	// 开立分局
    UserLifeBegin // 身份证开立日
    UserLifeEnd   // 身份证到期日
    pFront  // 身份证正面base64 图片
    pBack		// 身份证反面base64 图片
    pFace		// 身份证人像base64 图片
  }
  ```
  
- 返回数据示例

  ```javascript
  {
    code: 0,
    message: 'success',
    data: {
      IDCardInfo: {
        name: 'XXX',
        gender: '男',
        nation: '汉',
        birthDate: '20080101',
        address: '广州深圳市宇信科技大楼100',
        idNumber: '640102xxxxx129',
        error: '',
        head: 'YwA6AFwAdABtAHAAXABJAEQAZg==',
        front: 'YwA6AFwAdABtAHAAXABJAEQAZg==',
        back: ''
      }
    }
  }
  ```
  
  

------

## 取消请求 (cancelInsert)

**调用方式**: `IDCardReader.cancelInsert()`

- 返回值

  ```
  { code: 0 ,
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
