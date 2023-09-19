```json
{"code":"0","msg":"","data":{"__retvalue":"0","pInfo":"O|6225758258688828|0.00|0.00|6225758258688828D280420115690505|BB08A6CA9D0EDE07|00000000000000000000000001560000000000015699|A000000333010102|003F|280430|07010103A0A800040A010000000000E8865D76|8000040000|01|9F02060000000000005F2A0207029A032303289C0101950580000400009F3704498131145F34010157106225758258688828D2804201156905059F2608BB08A6CA9D0EDE079F2701809F101307010103A0A800040A010000000000E8865D769F3602003F82027C009F1A0207029F03060000000000009F34030203008408A0000003330101029F330360402050044F4342439F350114|9B026000950580000400009F2608BB08A6CA9D0EDE079F2701809F101307010103A0A800040A010000000000E8865D76|","pLen":"605"}}
```

```
{"code":"0","msg":"","data":{"__retvalue":"0","pInfo":"O||6226097806387206=49121201370300788406|996226097806387206=1561560500050000001015788406214000049120=7806387206=000000000=05000000755000000000000","pLen":"146"}}
```

```
"code":0,"msg":"","data":{"action":"ReadCard","deviceid":"cdr_gwi","errorcode":0,"retcode":0,"retmsg":"{\"__retvalue\":\"0\",\"pInfo\":\"O||6226097559248811=49121200130300642919|996226097559248811=1561560500050000001015642919214000049120=7559248811=000000000=06000000755000000000000\",\"pLen\":\"146\"}"}}
```



```
{
        "code": 0,
        "msg": "",
        "data": {
            "action": "WSDispenseByHand",
            "deviceid": "cashout_gwi",
            "errorcode": 0,
            "retcode": 0,
            "retmsg": "{\"__retvalue\": \"0\",\"pOut\": \"50|PHY1A=0|PHY2A=1|PHY3A=0|PHY4A=0|PHY6A=0\"}"
        }
    }
```



> 取款失败，冲正 WSDispenseByHand

```
{"code":0,"msg":"","data":{"action":"WSDispenseByHand","deviceid":"cashout_gwi","errorcode":0,"retcode":0,"retmsg":"{\"__retvalue\": \"-306\",\"pOut\": \"FAILED\"}"}} 
```



```
"code":0,"msg":"","data":{"action":"NdcWithdrawReverse","deviceid":"comm_ndc","errorcode":387383296,"retcode":0,"retmsg":"{\"__retvalue\": \"0\",\"lCardFlag\":\"0\",\"pNextState\":\"348\",\"pScreenNumber\":\"000\",\"pOut\":\"&CARD#: 4937010030838816      S/N: 2623&TX: FASTCASH     AMT:   $ 0.00&FROM    201073475001       &22/03/2023    10:31:43&RESP: **** DISP ERROR         (041)&SELECT W/O RCPT&\"}"}}
```





> NdcEnterSuperMode 

```
{"code":0,"msg":"","data":{"action":"NdcEnterSuperMode","deviceid":"comm_ndc","errorcode":372516624,"retcode":0,"retmsg":"{\"__retvalue\": \"0\"}"}}
```

