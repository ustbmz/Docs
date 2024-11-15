# 读卡器 (CardReader) 调用文档



## 初始化设备 (openDev)

**调用方式**: `CardReader.openDev()`

> **注意**: 设备初始化后，必须调用 `resetDevice` 进行设备重置。

- **参数**:  `LogicName 默认为CardReader`
  
   “CardReader”   吸入式读卡器
   “HDReader”    回单读卡器
   “BrushCard”    刷卡读卡器
   “ICCardReader”  IC卡读卡器
   
   ```ts
   logicName (string): 设备的逻辑名称，通常为 "CardReader"
   ```
   
- **返回值**

  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  // 返回示例
  {"code":0,"message":"OpenDev","data":{"__retvalue":"0"}}
  ```
  
- **说明:** 初始化读卡器设备。成功时返回 `code: 0`，`data: 'success'`。


------



## 重置设备 (resetDevice)

**调用方式**: `CardReader.resetDevice({ optionType: 0, timeout: 30000 })`

- **参数**  `开发阶段默认为 0 ， 生产模式需要传入 1 ， 2 基本不调用`

  ```javascript
  - optionType (number): 重置选项（0: 弹出卡，1: 吞卡，2: 无动作）
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
  
- **说明**: 重置读卡器设备。成功时返回 `code: 0`，`data: 'success'`。

------

## 获取设备状态 (getDeviceStatus)

**调用方式**: `CardReader.getDeviceStatus({ timeout: 30000 })`

> **调用场景**: 在读卡或吞卡前获取状态，确保状态正常再进行下一步操作。

- **参数**: `可不传入参`

  ```ts
  - timeout (number): 超时时间（毫秒），默认为 30000
  ```
  
- **返回值**

  ```js
  { 
    code: number, 
    message: string, 
    data: {
      __retvalue:返回码
      pStatus："0|0"   第一个0 为读卡设备状态 / 第二个 0 为读卡器吞卡数量
    } 
  }
  ```

- 返回示例

  ```js
  {"code":0,"message":"GetDeviceStatus","data":{"__retvalue":"0","pStatus":"0|0"}}
  ```

  

- **说明**

  : 获取读卡器设备的当前状态 ,成功时返回 `code: 0`，`data: 'success'`。


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

  返回示例
  
  ```js
  {
      "code": 0,
      "message": {
          "status": "Empty",
          "description": "媒介不存在"
      },
      "data": {
          "__retvalue": "0",
          "pStatus": "2"
      }
  }
  ```
  
  

------



## 退卡 (ejectIdenCard)

**调用方式**: `CardReader.ejectIdenCard({ timeout: 30000 })`

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
  
- **说明**: 尝试退出读卡器中的卡片。如果没有卡，返回 `code: -201`，`status: 'Has No Card'`。

------

## 吞卡 (retainCard)

**调用方式**: `CardReader.retainCard({ timeout: 30000 })`

- 参数 `可不传入参`

  ```tsx
  - timeout (number): 超时时间（毫秒），默认为 30000
  ```
  
- 返回值

  ```javascript
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```
  
- **说明**: 读卡器中的卡片吞入回收箱。成功时返回 `code: 0`，`data: 'success'`。

------

## 读取卡片 (readCard)

**调用方式**: `CardReader.readCard({ trackType: 7, timeout: 30000 })`

- 参数 `默认 trackType 使用  7 ，可不传入参`

  ```ts
  trackType (number): 读取类型 
  	- 3: 第3磁道，
  	- 7: 第2磁道和芯片，
  	- 8: 第1、2、3磁道，
  	- 11: 仅卡号
  timeout (number): 超时时间（毫秒），默认为 30000
  ```
  
- 返回值

  ```ts
  { code: 0 ,
  	message:"",
  	data:{
  		CardInfo:info
  	}
  }
  ```
  
- **说明**: 读取卡片信息，返回的 `info` 为CardInfo 对象（解析后的数据）

  >  CardInfo 返回数据

  ```ts
  {
    cardType:{ // 银行卡类型  
      "I":IC卡，
      "C":磁条卡,
      "G":国密卡,
      "O":他行卡
    }     
    cardNo     // 银行卡号
    track2Data // 银行卡二磁道信息
    arqc       // arqc 银行卡arqc 数据
    cardSerialNumber // 银行卡序列号
    field55Data      // 55 域芯片信息
  }
  
  
  ```

- 返回数据示例

  ```javascript
  {
    "code": 0,
    "message": "ReadCard",
    "data": {
      "__retvalue": "0",
      "cardInfo": {
        "cardType": "O",
        "mainAccount": "6217232902001086009",
        "balance1": 0,
        "balance2": 0,
        "track2Data": "6217232902001086009D25102207339991110F",
        "arqc": "76FD4FA56E1E3116",
        "cardSerialNumber": "00000000000000000000000001560000000000015699",
        "aid": "A000000333010101",
        "expirationDate": "00D0",
        "icData": "251031"
      },
      "pLen": "620"
    }
  }
  ```
  
  

------

## 取消插卡 (cancelInsert)

**调用方式**: `CardReader.cancelInsert()`

- 返回值

  ```
  { code: 0 ,
  	message:"",
  	data:"success"
  }
  ```
  
- **说明**: 取消插卡操作。成功时返回 `code: 0`，`data: 'success'`。

- **取消插卡返回示例**

  ```js
  {"code":0,"message":"CancelInsert","data":{"__retvalue":"0"}}
  ```

* **读卡返回取消成功示例数据 (代表读卡事件取消成功)**

  ```js
  {"code":0,"message":"ReadCard","data":{"__retvalue":"-4","pInfo":"","pLen":"51536800"}}
  ```

------

## 重置吞卡计数 (resetRetainCount)

**调用方式**: `CardReader.resetRetainCount()`

- 返回值

  ```
  { code: 0 ,
  	message:"",
  	data:"success"
  }
  ```
  
- **说明**: 重置吞卡计数器。成功时返回 `code: 0`，`data: 'success'`。

- 当吞卡箱满时。将无法进行读卡与吞卡操作，需要清楚吞卡数量

------

## 注意事项

1. 所有方法都可能抛出异常，使用时应进行适当的错误处理。
2. 使用设备前，必须调用 `openDev` `resetDevice` 方法初始化设备。
3. 操作完成后，无需调用 `closeDev` 方法关闭设备。
4. 若设备操作异常，建议使用 `resetDevice` 方法重置设备。
5. 大部分方法的 `timeout` 参数默认值为 30000 毫秒（30 秒）。
6. 读卡操作可能耗时较长，请根据实际情况合理设置超时时间。
