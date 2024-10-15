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

**调用方式**: `SIU.resetDevice({ timeout: 30000 })`

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

**调用方式**: `SIU.getMediaStatus({ timeout: 30000 })`

- **参数**: 超时事件可默认不传

  ```typescript
  {
    type:number,    // lTYpe
    status:number,  // lStatus:             
    timeout: number // 超时时间（毫秒），默认为 30000
  }
  ```
  
  - type 码值映射硬件 (待验证)
  
       ```shell
       0---身份证|WFS_SIU_SCANNER
       1---电动磁卡读卡器|WFS_SIU_CARDUNIT
       2---凭条|WFS_SIU_RECEIPTPRINTER
       3---Ukey|WFS_SIU_ENVDISPENSER
       4---密码键盘|WFS_SIU_PINPAD
       5---存折打印机|WFS_SIU_PASSBOOKPRINTER
       6---指纹指示灯|14
       7---激光打印机指示灯|WFS_SIU_NOTESDISPENSER
       8---非接|13
       9---票据扫描|WFS_SIU_BILLACCEPTOR
       10--票据发售|WFS_SIU_COINDISPENSER
       ```
  
  - status 码值对应灯光状态
  
      ```shell
      0---关灯
      1---慢闪
      2---中闪
      3---快闪
      4---常亮
      ```
      
      
  
- **返回值**

  ```typescript
  { 
    code: number,
    message: string,
    data: “success”
  }
  ```
  
- **说明**: 查询纸张状态。返回对象包含状态码、消息和状态数据。



------

## 注意事项

1. 所有方法都可能抛出异常，使用时应进行适当的错误处理。
2. 使用设备前，必须调用 `openDev` `resetDevice` 方法初始化设备。
4. 若设备操作异常，可以尝试使用 `resetDevice` 方法重置设备。
5. 大部分方法的 `timeout` 参数默认值为 30000 毫秒（30秒）。
7. **开启设备亮灯后，其他硬件调用成功后必须关闭亮灯**
