# 指纹仪(Finger)调用文档

## 初始化设备 (openDev)

**调用方式**: `Finger.openDev()`

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```

- **说明:** 初始化指纹仪设备。成功时返回 `code: 0`，`data: 'success'`。

------

## 重置设备 (resetDevice) 

`已弃用`

**调用方式**: `Finger.resetDevice()`

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: string 
  }
  ```

- **说明**: 重置指纹仪设备。成功时返回 `code: 0`，`data: 'success'`。

------

## 读取指纹信息 (GetFingerFeatureSP)

**调用方式**: `Finger.GetFingerFeatureSP()`

- **参数**: `可不传入参`
  ```ts
  - timeout (number): 超时时间（毫秒），默认为 0
  ```

- **返回值**
  ```js
  { 
    code: number, 
    message: string, 
    data: {
      fingerFeature: string // 指纹特征数据
    }
  }
  ```

- **说明**: 获取指纹特征信息。成功时返回 `code: 0` 和指纹特征数据。

------

## 注意事项

1. 所有方法都可能抛出异常，使用时应进行适当的错误处理。
2. 使用设备前，必须调用 `openDev` 方法初始化设备。
3. 若设备操作异常，建议使用 `resetDevice` 方法重置设备。
4. 读取指纹信息时，需要确保用户正确放置手指。
5. 指纹读取可能需要多次尝试才能获取到清晰的特征数据。

## 使用示例

```typescript
// 初始化指纹仪
const finger = useFinger()

// 打开设备
await finger.openDev()

// 重置设备
await finger.resetDevice()

// 读取指纹特征
const fingerFeature = await finger.GetFingerFeatureSP()

// 处理指纹特征数据
if (fingerFeature.code === 0) {
  // 处理成功获取的指纹特征
  console.log('指纹特征数据:', fingerFeature.data)
} else {
  // 处理错误
  console.error('获取指纹特征失败:', fingerFeature.message)
}
```
