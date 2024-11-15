## **API类（-1~-58）**

| ***\*错误代码\****            | ***\*错误码\**** | ***\*说明\****                                               |
| ----------------------------- | ---------------- | ------------------------------------------------------------ |
| WFS_ERR_ALREADY_STARTED       | -1               | 应用程序已经发出了***\*WFSStartUp\****，没有***\*WFSCleanUp\****介入。 |
| WFS_ERR_API_VER_TOO_HIGH      | -2               | 应用程序请求的XFS API支持版本范围高于此XFS管理器工具支持的所有版本。 |
| WFS_ERR_API_VER_TOO_LOW       | -3               | 应用程序请求的XFS API支持版本范围低于此XFS管理器工具支持的所有版本。 |
| WFS_ERR_CANCELED              | -4               | 请求被***\*WFSCancelAsyncRequest\*******\*或\*******\*WFSCancelBlockingCall\****取消。 |
| WFS_ERR_CFG_INVALID_HKEY      | -5               | 指定的**hKey**参数不对应当前的打开键。                       |
| WFS_ERR_CFG_INVALID_NAME      | -6               | 指定的键中不存在**lpszValueName**参数指定的值。              |
| WFS_ERR_CFG_INVALID_SUBKEY    | -7               | **lpszSubKey**指定的键不存在。                               |
| WFS_ERR_CFG_INVALID_VALUE     | -8               | 在指定的打开键中不存在指定的值。                             |
| WFS_ERR_CFG_KEY_NOT_EMPTY     | -9               | 指定的键下有无法删除的子键。必须先删除这些子键。             |
| WFS_ERR_CFG_NAME_TOO_LONG     | -10              | 将要返回的名称长度超过缓冲区的长度。                         |
| WFS_ERR_CFG_NO_MORE_ITEMS     | -11              | 没有可返回的子键（**iSubKey**参数大于上一个子键的指数）。    |
| WFS_ERR_CFG_VALUE_TOO_LONG    | -12              | 将要返回的键值长度超过缓冲区的长度。                         |
| WFS_ERR_DEV_NOT_READY         | -13              | 函数必须的设备访问，但设备尚未准备好或已超时。               |
| WFS_ERR_HARDWARE_ERROR        | -14              | 函数必须的设备访问，但设备出错。                             |
| WFS_ERR_INTERNAL_ERROR        | -15              | XFS子系统内发生的内部不一致或其他异常错误。                  |
| WFS_ERR_INVALID_ADDRESS       | -16              | **lpvOriginal**参数不指向先前分配的缓冲区。                  |
| WFS_ERR_INVALID_APP_HANDLE    | -17              | 指定的应用程序句柄无效，即，不是由先前的创建调用创建的。     |
| WFS_ERR_INVALID_BUFFER        | -18              | **lpvData**参数不是已分配缓冲结构的指针。                    |
| WFS_ERR_INVALID_CATEGORY      | -19              | 此服务类别不支持发出的**dwCategory**。                       |
| WFS_ERR_INVALID_COMMAND       | -20              | 此服务类别不支持发出的**dwCommand**。                        |
| WFS_ERR_INVALID_EVENT_CLASS   | -21              | **dwEventClass**参数指定服务不支持的一个或多个事件类别。     |
| WFS_ERR_INVALID_HSERVICE      | -22              | **hService**参数是无效的服务句柄。                           |
| WFS_ERR_INVALID_HPROVIDER     | -23              | **hProvider**参数是无效的提供程序句柄。                      |
| WFS_ERR_INVALID_HWND          | -24              | **hWnd**参数是无效的窗口句柄。                               |
| WFS_ERR_INVALID_HWNDREG       | -25              | **hWndReg**参数是无效的窗口句柄。                            |
| WFS_ERR_INVALID_POINTER       | -26              | 指针参数不指向可访问内存。                                   |
| WFS_ERR_INVALID_REQ_ID        | -27              | **RequestID**参数不符合对服务的未处理请求。                  |
| WFS_ERR_INVALID_RESULT        | -28              | **lpResult**参数不是已分配WFSRESULT结构的指针。              |
| WFS_ERR_INVALID_SERVPROV      | -29              | 含有服务提供程序的文档无效或损坏。                           |
| WFS_ERR_INVALID_TIMER         | -30              | **hWnd**参数和**usTimerID**参数没有对应的当前处于激活状态的计时器。 |
| WFS_ERR_INVALID_TRACELEVEL    | -31              | 参数**dwTraceLevel**没有对应的有效跟踪层或层组。             |
| WFS_ERR_LOCKED                | -32              | 服务被另一个**hService**锁定。                               |
| WFS_ERR_NO_BLOCKING_CALL      | -33              | 指定的线程没有未处理的阻塞调用。                             |
| WFS_ERR_NO_SERVPROV           | -34              | 含有服务提供程序的文件不存在。                               |
| WFS_ERR_NO_SUCH_THREAD        | -35              | 指定线程不存在。                                             |
| WFS_ERR_NO_TIMER              | -36              | 无法创建计时器。                                             |
| WFS_ERR_NOT_LOCKED            | -37              | 请求解锁服务的应用程序此前没有成功执行***\*WFSLock\****或***\*WFSAsyncLock\*******\*。\**** |
| WFS_ERR_NOT_OK_TO_UNLOAD      | -38              | XFS管理器无法卸载服务提供程序DLL。                           |
| WFS_ERR_NOT_STARTED           | -39              | 应用程序此前还没有成功的执行***\*WFSStartUp\****。           |
| WFS_ERR_NOT_REGISTERED        | -40              | 指定的**hWndReg**窗口没有注册用于接收任何事件类别的消息。    |
| WFS_ERR_OP_IN_PROGRESS        | -41              | 在该线程上有一个阻塞操作正在进行；此时只允许***\*WFSCancelBlockingCall\****和***\*WFSIsBlocking\****。 |
| WFS_ERR_OUT_OF_MEMORY         | -42              | 没有足够的可用内存，无法满足请求。                           |
| WFS_ERR_SERVICE_NOT_FOUND     | -43              | 逻辑名称不是有效的服务提供程序名称。                         |
| WFS_ERR_SPI_VER_TOO_HIGH      | -44              | XFS管理器请求的XFS SPI支持版本范围高于服务提供程序对正在打开的逻辑服务支持的所有版本。 |
| WFS_ERR_SPI_VER_TOO_LOW       | -45              | XFS管理器请求的XFS SPI支持版本范围低于服务提供程序对正在打开的逻辑服务支持的所有版本。 |
| WFS_ERR_SRVC_VER_TOO_HIGH     | -46              | 应用程序请求的服务专用接口支持版本范围高于服务提供程序对正在打开的逻辑服务支持的所有版本。 |
| WFS_ERR_SRVC_VER_TOO_LOW      | -47              | 应用程序请求的服务专用接口支持版本范围低于服务提供程序对正在打开的逻辑服务支持的所有版本。 |
| WFS_ERR_TIMEOUT               | -48              | 超时周期到期。                                               |
| WFS_ERR_UNSUPP_CATEGORY       | -49              | 尽管发出的**dwCategory**对此服务类别有效，但此服务提供程序不支持发出的**dwCategory**。 |
| WFS_ERR_UNSUPP_COMMAND        | -50              | 尽管发出的**dwCommand**对此服务类别有效，但此服务提供程序或设备不支持发出的**dwCommand**。 |
| WFS_ERR_VERSION_ERROR_IN_SRVC | -51              | 在服务内部发生两个模块的版本不匹配。                         |
| WFS_ERR_INVALID_DATA          | -52              | 作为输入参数传递的数据结构含有无效数据。                     |
| WFS_ERR_SOFTWARE_ERROR        | -53              | 函数必须的配置信息访问，但软件出错。                         |
| WFS_ERR_CONNECTION_LOST       | -54              | 与服务的连接丢失。                                           |
| WFS_ERR_USER_ERROR            | -55              | 用户在阻止设备的正确操作。                                   |
| WFS_ERR_UNSUPP_DATA           | -56              | 尽管作为输入参数传递的数据结构对此服务类别有效，但此服务提供程序或设备不支持该数据结构。 |
| WFS_ERR_FRAUD_ATTEMPT         | -57              | 一些设备能够识别试图欺骗获得重要信息或媒介的恶意物理攻击。在这些情况下，将返回此错误代码，显示用户试图对该设备采取欺骗行为。 |
| WFS_ERR_SEQUENCE_ERROR        | -58              | 此时被请求的操作无效，或在设备当时的状态下，被请求的操作无效。 |