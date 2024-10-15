# 凭条打印 (Receipt) 调用文档

## 初始化设备 (openDev)

**调用方式**: `Receipt.openDev()`

- **返回值**

  ```typescript
  number // WOSA 代码
  ```

- **说明**: 初始化凭条打印设备。返回 WOSA 代码，0 表示成功。

------

## 关闭设备 (closeDev)

**调用方式**: `Receipt.closeDev()`

- **返回值**

  ```typescript
  number // WOSA 代码
  ```

- **说明**: 关闭凭条打印设备。返回 WOSA 代码，0 表示成功。

------

## 获取纸张状态 (getMediaStatus)

**调用方式**: `Receipt.getMediaStatus({ timeout: 30000 })`

- **参数**: `可不传入参`

  ```typescript
  {
    timeout: number // 超时时间（毫秒），默认为 30000
  }
  ```

- **返回值**

  ```typescript
  { 
    code: number,
    message: string,
    data: {
      status: string
    }
  }
  ```

- **说明**: 查询纸张状态。返回对象包含状态码、消息和状态数据。

------

## 重置设备 (resetDevice)

**调用方式**: `Receipt.resetDevice({ timeout: 30000 })`

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

- **说明**: 重置凭条打印设备。返回 WOSA 代码，0 表示成功。

------

## 切纸 (paperCutting)

**调用方式**: `Receipt.paperCutting({ timeout: 30000 })`

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

- **说明**: 执行切纸操作。返回 WOSA 代码，0 表示成功。

------

## 打印数据 (dataPrint)

**调用方式**: `Receipt.dataPrint({ data: string, timeout?: number })`

- **参数**:

  ```typescript
  {
    data: string,    // 要打印的数据
    timeout?: number // 超时时间（毫秒），默认为 30000
  }
  ```

- **返回值**

  ```typescript
  number // WOSA 代码
  ```

- **说明**: 
  - 打印指定的数据。
  - `data` 必须是字符串类型。
  - 支持 '\r\n' 换行。
  - 如果数据以 '@DATA@' 开头，表示文本打印。
  - 如果数据以 '@PIC@' 开头，表示图片打印（后跟图片路径）。
  - 返回 WOSA 代码，0 表示成功。

> **注意**: 确保传入的 `data` 参数是字符串类型，否则可能会导致错误。

------

## 打印表单 (printForm)

**调用方式**: `Receipt.printForm(formName, mediaName, mediaCtrl, fields, { timeout: 30000 })`

- **参数**:

  ```typescript
  formName: string   // 表单名称
  mediaName: string  // 媒体表单名称
  mediaCtrl: number  // 1: 打印后切纸, 0: 打印后无动作
  fields: string     // 表单字段，格式为 "字段名=字段值"，用 '|' 分隔，以 '|' 结尾
  {
    timeout: number  // 超时时间（毫秒），默认为 30000
  }
  ```

- **返回值**

  ```typescript
  number // WOSA 代码
  ```

- **说明**: 打印指定的表单。返回 WOSA 代码，0 表示成功。

------

## 注意事项

1. 所有方法都可能抛出异常，使用时应进行适当的错误处理。
2. 使用设备前，必须调用 `openDev` 方法初始化设备。
4. 若设备操作异常，可以尝试使用 `resetDevice` 方法重置设备。
5. 大部分方法的 `timeout` 参数默认值为 30000 毫秒（30秒）。
6. 打印操作可能需要较长时间，请根据实际情况设置合适的超时时间。
7. 在使用 `dataPrint` 方法时，注意数据格式的特殊要求（如 '@DATA@' 和 '@PIC@' 前缀）。
