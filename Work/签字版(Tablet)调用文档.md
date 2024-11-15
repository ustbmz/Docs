# 签字版(Tablet)设备调用文档

## 公共方法

### 	初始化设备 (openDev)

### 	关闭设备 (closeDev)

### 	获取设备状态 (getDeviceStatus)

### 	重置设备 (resetDevice)



## 打开预览窗口 (openWindow)

**调用方式**: `tablet.openWindow(params)`

- **参数**: 
  
  ```typescript
  {
    lMode?: number,   // 0显示预览窗口, 1销毁预览窗口, 4重写，默认为0
    lWidth: number,   // 预览界面宽度
    lHeight: number,  // 预览界面高度
    lX: number,       // 预览界面左上角X坐标
    lY: number,       // 预览界面左上角Y坐标
    lTimeOut?: number // 超时时间（毫秒），默认为30000
  }
  ```
  
  `入参示例`:
  
  ```js
  {
    lWidth: item.lWidth || 560,
    lHeight: item.lHeight || 320,
    lX: item.lX || 350,
    lY: item.lY || 520
  }
  ```
  
- 关于多辨率适配问题方案，通过嵌套外层 div
  
  - 获取签字版外层 DOM 宽度高度，通过offset 计算x,y 轴坐标点，动态传入签字版相关入参
  
  ```ts
  function calculateSignaturePadPosition() {
      // 获取外层 div 的 DOM 元素
      const signDiv = document.querySelector('.sign-container');
  
      // 获取外层 div 的宽高
      const outerDivWidth = signDiv.offsetWidth - 20;
      const outerDivHeight = signDiv.offsetHeight - 20;
  
      // 获取外层 div 的 X 和 Y 坐标相对于整个文档（页面）的左上角位置
      const rect = signDiv.getBoundingClientRect();
      const offsetX = rect.left + 10;
      const offsetY = rect.top + 10;
  
      // 返回宽高和 X、Y 坐标
      return {
          lWidth: outerDivWidth,
          lHeight: outerDivHeight,
          lX: offsetX,
          lY: offsetY
      };
  }
  ```
  
- **返回值**

  ```typescript
  Result // 包含状态码、消息和数据的对象
  ```

- **说明**: 打开签字版预览窗口。返回结果对象，包含操作状态。

------



## 关闭预览窗口 (closeWindow)

**调用方式**: `tablet.closeWindow()`

- **返回值**
  ```typescript
  Promise<Result> // 包含状态码、消息和数据的对象
  ```

- **说明**: 关闭签字版预览窗口。返回一个 Promise，解析为结果对象。

------



## 获取签名数据 (getSignedData)

**调用方式**: `tablet.getSignedData(options?)

- **参数**: ``使用默认值，入参可不传``
  
  ```typescript
  {
    pData?: string, // 预留参数，默认为空字符串
    pPath?: string   // 签名图片保存路径，默认为''C:\\pSign.jpg'
  }
  ```
  
  示例:
  
  ```js
  {
  	pData:"",
  	pPath:"C:\\pSign.jpg"
  }
  ```
  
  
  
- **返回值**
  
  ```typescript
  {
    code:0,
    message:'',
    data:{
      signedData: 'base64 签名图片Base64数据'
    }
  }
  ```
  
- **说明**: 获取签名数据并保存为图片。返回结果对象，包含操作状态和可能的签名数据。

------

## 注意事项

1. 所有方法都会在控制台输出操作结果，便于调试。

4. 使用设备前，必须调用 `openDev` 方法初始化设备。

5. 若设备操作异常，可以尝试使用 `resetDevice` 方法重置设备。

6. 大部分方法的超时时间默认为 30000 毫秒（30秒）。

7. 在使用 `getSignedData` 方法时，确保指定的保存路径是可写的。

   
