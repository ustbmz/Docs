# 指示灯 (SIU) 调用文档

## 初始化设备 (openDev)

**调用方式**: `SIU.openDev()`

- **返回值**

  ```typescript
  number // WOSA 代码
  ```

- **说明**: 初始化凭条打印设备。返回 WOSA 代码，0 表示成功。

------



## 关闭设备 (closeDev) 

> 暂无调用场景

**调用方式**: `SIU.closeDev()` 

- **返回值**

  ```typescript
  number // WOSA 代码
  ```

- **说明**: 关闭凭条打印设备。返回 WOSA 代码，0 表示成功。

  

------



## 重置设备 (resetDevice)

**调用方式**: `SIU.resetDevice()`

- **参数**: `可不传入参`

  ```typescript
  {
    timeout: number // 超时时间（毫秒），默认为 30000
  }
  ```

- **返回值**

  ```typescript
  number // WOSA 代码
  ```

- **说明**: 重置凭条打印设备。返回 WOSA 代码，0 表示成功

------


## 设置灯光状态 (SetGuidLight)

**调用方式**: `SIU.setGuidLight({ logicName: 'CardReader',action:'ON' })`

- **参数**: 超时事件可默认不传

  ```javascript
  {
    logicName:string,
    action:string
  }
  ```
  
  - logicName ：传入对应硬件的逻辑名
  
       ```shell
       IDCardReader -- 身份证
       CardReader   -- 读卡器
       PinPad       -- 密码键盘
       Receipt      -- 凭条
       Finger       -- 指纹仪
       ```
  
       >  源码
  
       ```ts
       case 'CardReader':
         return SetGuidLight(0, status, timeout)
       case 'IDCardReader':
         return SetGuidLight(15, status, timeout)
       case 'PinPad':
         return SetGuidLight(1, status, timeout)
       case 'Finger':
         return SetGuidLight(14, status, timeout)
       case 'Receipt':
         return SetGuidLight(4, status, timeout)
       default:
         // 如果匹配不到逻辑名，关闭所有灯光
         return SetGuidLight(0, 0, timeout)
         
       ```
       
       
       
  - action 码值对应灯光状态
	
	     ```shell
    'ON':开灯
    'OFF':关灯   
  
- **返回值**

  ```typescript
  { 
    code: number,
    message: string,
    data: “success”
  }
  ```
  
- **说明**：查询纸张状态。返回对象包含状态码、消息和状态数据。

- **待办**：**``后续添加闪烁状态**``



------

## 注意事项

1. 所有方法都可能抛出异常，使用时应进行适当的错误处理。
2. 使用设备前，必须调用 `openDev` `resetDevice` 方法初始化设备。
4. 若设备操作异常，可以尝试使用 `resetDevice` 方法重置设备。
5. 大部分方法的 `timeout` 参数默认值为 30000 毫秒（30秒）。
7. **开启设备亮灯后，其他硬件调用成功后必须关闭亮灯**
