# 摄像头 (Camera) 调用文档

## 初始化设备 (openDev)

**调用方式**: `Camera.openDev()`

- **返回值**
  ```typescript
  Result // 包含状态码、消息和数据的对象
  ```

- **说明**: 初始化摄像头设备。返回结果对象，包含操作状态。

------

## 获取设备状态 (getDeviceStatus)

**调用方式**: `Camera.getDeviceStatus()`

- **返回值**
  ```typescript
  Promise<Result> // 包含状态码、消息和数据的对象
  ```

- **说明**: 获取摄像头设备的当前状态。返回一个 Promise，解析为结果对象。

------

## 重置设备 (resetDevice)

**调用方式**: `Camera.resetDevice()`

- **返回值**
  ```typescript
  Result // 包含状态码、消息和数据的对象
  ```

- **说明**: 重置摄像头设备。返回结果对象，包含操作状态。

------

## 打开预览窗口 (openWindow)

**调用方式**: `Camera.openWindow(options)`

- **参数**:  **``摄像头预览界面宽,高，x , y 定位轴为必传参数``**
  
  ```typescript
  {
    ScanSize?: number, // 传1代表人脸，默认为0
    lShowOpt?: number, // 0显示预览窗口，1销毁预览窗口，2暂停，3恢复，默认为0
    lWidth: number,    // 预览界面宽
    lHeight: number,   // 预览界面高
    lX: number,        // 预览界面左上角X坐标
    lY: number,        // 预览界面左上角Y坐标
    lTimeOut?: number  // 超时时间（毫秒），默认为30000
  }
  ```
  
- **返回值**
  ```typescript
  Result // 包含状态码、消息和数据的对象
  ```

- **说明**: 打开摄像头预览窗口。返回结果对象，包含操作状态。

------

## 关闭预览窗口 (closeWindow)

**调用方式**: `Camera.closeWindow()`

- **返回值**
  ```typescript
  Promise<Result> // 包含状态码、消息和数据的对象
  ```

- **说明**: 关闭摄像头预览窗口。返回一个 Promise，解析为结果对象。

------

## 拍照 (takePicture)

**调用方式**: `Camera.takePicture(ScanSize, pPath, lTimeOut)`

- **参数**:
  ```typescript
  ScanSize?: number, // 默认为0
  pPath?: string,    // 照片保存路径，默认为'C:\\face.jpg'
  lTimeOut?: number  // 超时时间（毫秒），默认为30000
  ```

- **返回值**
  ```typescript
  pOut:	Base64数据
  pOutSmall: 人脸特征图片base64数据
  ```
  
- **说明**: 使用摄像头拍照并保存。返回一个 Promise，解析为结果对象。

------

## 注意事项

1. 所有方法都可能抛出异常，使用时应进行适当的错误处理。
2. 使用设备前，必须调用 `openDev` 方法初始化设备。
3. 若设备操作异常，可以尝试使用 `resetDevice` 方法重置设备。
4. 大部分方法的超时时间默认为 30000 毫秒（30秒）。
5. 在使用 `takePicture` 方法时，确保指定的保存路径是可写的。

