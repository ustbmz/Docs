# 账户UAT测试数据

## 4937070002367731

### WSCashOutGetUnitInfoEx

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "action": "WSCashOutGetUnitInfoEx",
        "deviceid": "cashout_gwi",
        "errorcode": 0,
        "retcode": 0,
        "retmsg": "{\"__retvalue\": \"0\",\"lppInfo\": \"1-1-3-1001-0-5-5-10-2800-0-PHY1A|2-1-3-1000-1-2-1-50-2800-0-PHY2A|3-1-4-1000-0-0-0-50-2800-0-PHY3A|4-5-0-2-0-1-1-0-2800-0-PHY4A|5-5-4-0-0-0-0-0-2800-0-PHY6A\"}"
    }
}
```

### Readcard:

```json
{
    "code": "0",
    "msg": "",
    "data": {
        "__retvalue": "0",
        "pInfo": "I|4937070002367731|0.00|0.00|4937070002367731D29112230000001103100F|69B733D83CA8BE65|00000000000000000000000001560000000000015699|A000000541000102|02E6|291130|0FA505A000C0000000000000000000000F000000000000000000000000000000|8000040000|00|9F02060000000000005F2A0207029A032304059C0101950580000400009F3704653944495F34010057134937070002367731D29112230000001103100F9F260869B733D83CA8BE659F2701809F10200FA505A000C0000000000000000000000F0000000000000000000000000000009F360202E6820218009F1A0207029F03060000000000009F34030203008408A0000005410001029F330360402050044F4342439F350114|9B026000950580000400009F260869B733D83CA8BE659F2701809F10200FA505A000C0000000000000000000000F000000000000000000000000000000|",
        "pLen": "695"
    }
}
```

### token/generate 

```json
{
    "code": 0,
    "message": "success",
    "data": {
        "status": "SUCCESS",
        "data": {
            "expiresTime": "600",
            "tokenType": "Bearer",
            "cardType": "PREM",
            "cardStatus": "ACTV",
            "cifNo": "1300217003",
            "corpOrPersonal": "P",
            "debitOrCredit": "A",
            "cardOpeate": "0",
            "productId": "",
            "cardName": "",
            "cardNameCN": "",
            "employeeCifNumber": "0"
        },
        "errorCode": null,
        "errorDescription": null,
        "errorInfo": null
    },
    "params": []
}
```







### cardAndActQuery

```json
{
    "code": 0,
    "message": "success",
    "data": ,
    "params": []
}
```



###  Checkin

```json
{
    "code": "0",
    "msg": "",
    "data": {
        "__retvalue": "0",
        "pInfo": "I|4937070002367731|0.00|0.00|4937070002367731D29112230000001103100F|69B733D83CA8BE65|00000000000000000000000001560000000000015699|A000000541000102|02E6|291130|0FA505A000C0000000000000000000000F000000000000000000000000000000|8000040000|00|9F02060000000000005F2A0207029A032304059C0101950580000400009F3704653944495F34010057134937070002367731D29112230000001103100F9F260869B733D83CA8BE659F2701809F10200FA505A000C0000000000000000000000F0000000000000000000000000000009F360202E6820218009F1A0207029F03060000000000009F34030203008408A0000005410001029F330360402050044F4342439F350114|9B026000950580000400009F260869B733D83CA8BE659F2701809F10200FA505A000C0000000000000000000000F000000000000000000000000000000|",
        "pLen": "695"
    }
}

{
    "deviceId": 3,
    "orgNo": "SG001",
    "orgName": "xjpbranch",
    "deviceNo": "S6A08904CY",
    "deviceType": "DAS",
    "maintainTel": "a9006672",
    "maintainPhone": "11012131314",
    "installDate": "2022-10-20",
    "installAdrr": null,
    "deviceStatus": "0",
    "onlineStatus": "1",
    "ipAddress": "10.68.30.53",
    "macAddress": "12-13-14-15-16",
    "version": "gray",
    "deviceTime": "2023-04-05 15:02:51",
    "shellVer": "1.0",
    "frontEndVer": "1.0",
    "ndcIp": "10.103.35.199",
    "ndcPort": "6010",
    "localPort": "6010",
    "batchNo": "000081",
    "paramMap": {
        "prompt_page_timeout": "10000",
        "per_withdrawal_limit_number_50": "200",
        "BOAutoLogout": "6000000",
        "transaction_timeout": "60000",
        "over_limit_withdrawal_claim_timeout": "45000",
        "per_withdrawal_limit_amount": "10000",
        "scan_id_for_beyond_withdrawal": "Y",
        "task_refresh_time": "10000",
        "tablet_inactive": "600000",
        "show_greeting": "Y",
        "per_withdrawal_limit_number_10": "20",
        "per_deposit_max_notes": "200",
        "call_staff_pending_timeout": "120000",
        "tablet_login_out": "120000",
        "per_deposit_max_amount": "20000",
        "card_retention_timeout": "60000",
        "days_inactivity": "10",
        "call_staff_claim_timeout": "30000",
        "per_withdrawal_limit_number": "200",
        "banknote_retention_timeout": "60000",
        "page_inactivity_timeout": "60000",
        "add_cash": "{\"PHY1A\":\"1000\",\"PHY2A\":\"1000\",\"PHY3A\":\"1000\",\"PHY4A\":\"0\",\"PHY5A\":\"0\",\"PHY6A\":\"0\"}",
        "over_limit_withdrawal_pending_timeout": "120000"
    },
    "urlLinkMap": {
        "allRoleList": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal//role/all/inquiry",
        "getCardDetail1": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-account-control-sg/v1/internal/card/detailInfo/retrieve",
        "actSignConditionCreate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/account/signCondition/create",
        "staffInsert": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/staff/create",
        "staffUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/staff/update",
        "deviceCheckIn": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/device/deviceCheckIn",
        "accountStatusDelete": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/accountStatus/delete",
        "roleSelectList": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/role/inquiry",
        "msUrlCreate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/url/create",
        "staffDetails": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/staff/retrieve",
        "accountStatusUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/accountStatus/update",
        "queryCurBatchAndAddCashInfo": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/device-management-sg/v1/internal/cashHandle/curBatchAndAddCashInfo/retrieve",
        "accountStatusInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/accountStatus/inquiry",
        "actDepLimitRetrieve": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-limit-control-sg/v1/internal/card/limit/retrieve",
        "staffLogin": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/staffLogin/login",
        "paramCreate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/param/create",
        "cashAddNoteAndCoin": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/device-management-sg/v1/internal/cashHandle/cashAddNote/create",
        "paramDelete": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/param/delete",
        "versionUploadInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/version/upload/inquiry",
        "msUrlInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/url/inquiry",
        "staffDelete": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/staff/delete",
        "organiztionUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/org/update",
        "deviceDelete": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/device/delete",
        "selectOverLimitBusiness": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/overLimitApply/inquiry",
        "ejDetailQuery": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-account-control-sg/v1/internal/ej/ejFileDetailQuery",
        "versionUploadCreate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/version/upload/create",
        "holidayDelete": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/holiday/delete",
        "organiztionDelete": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/org/delete",
        "aifRuleDelete": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/accountAifRule/delete",
        "actDepLimitRetrieve1": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-account-control-sg/v1/internal/card/account/deposit/limit/retrieve",
        "retrieveCustomerProfile": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-account-control-sg/v1/internal/customer/profile/retrieve",
        "deviceStatusUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/device/deviceStatus/update",
        "getAccountListUnderCif": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-account-control-sg/v1/internal/card/customer/account/list/inquiry",
        "paramUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/param/update",
        "insertOverLimitApply": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/overLimitApply/create",
        "queryCurBatchCashDetail": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/device-management-sg/v1/internal/cashHandle/curBatchCashDetail/retrieve",
        "organiztionInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/org/inquiry",
        "staffSelect": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/staff/inquiry",
        "actNonCardDepLimitRetrieve": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-limit-control-sg/v1/internal/card/limit/retrieve",
        "roleRightList": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/rightList/inquiry",
        "deposit": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/transaction-record-sg/v1/internal/deposit/record/create",
        "orgDeviceInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/overLimitApply/orgDeviceInquiry",
        "existOverLimitRight": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/overLimitApply/existOverLimitRight",
        "actSignConditionDelete": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/account/signCondition/delete",
        "organiztionInsert": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/org/create",
        "msUrlDelete": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/url/delete",
        "roleDelete": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/role/delete",
        "ejLogQuery": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-account-control-sg/v1/internal/ej/ejFileQuery",
        "roleInsert": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/role/create",
        "updateOverLimitStatus": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/apply/status/update",
        "roleUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/role/update",
        "actSignConditionInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/account/signCondition/inquiry",
        "businessHoursInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/businessHours/inquiry",
        "validDay": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/callStaff/day/valid",
        "callStaffApplyResultQuery": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/callStaff/apply/result/retrieve",
        "deviceCreate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/device/create",
        "staffServiceOrg": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/staffOrg/updateStaffLoginOnline",
        "taskDetail": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/overLimitApply/taskDetail/retrieve",
        "cardAndActQuery": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-account-control-sg/v1/internal/card/cardAndActInfo/inquiry",
        "businessHoursDelete": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/businessHours/delete",
        "accountStatusCreate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/accountStatus/create",
        "paramInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/param/inquiry",
        "getCardListUnderCif": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-account-control-sg/v1/internal/card/customer/card/list/inquiry",
        "versionDistributeInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/version/distribute/inquiry",
        "businessHoursUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/businessHours/update",
        "custUpdateSave": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/overLimitApply/custUpdateSave",
        "roleSelectDetails": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/role/retrieve",
        "transactionConfirm": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/transaction-record-sg/v1/internal/tradeDetail/transactionConfirm",
        "ejLogUpload": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-account-control-sg/v1/internal/ej/ejFileUpload",
        "holidayUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/holiday/update",
        "callStaffApply": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/callStaff/apply/create",
        "organiztionRetrieve": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/org/retrieve",
        "businessHoursCreate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/businessHours/create",
        "aifRuleUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/accountAifRule/update",
        "deviceUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/device/update",
        "staffLogout": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/staffOrg/updateStaffLogoutOnline",
        "withdrawal": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/transaction-record-sg/v1/internal/withdraw/record/create",
        "aifRuleInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/accountAifRule/inquiry",
        "holidayInqiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/holiday/inquiry",
        "getCardDetail": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-limit-control-sg/v1/internal/card/limit/retrieve",
        "msUrlUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/url/update",
        "actSignConditionUpdate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/account/signCondition/update",
        "selectOverLimitStatus": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/overLimitApply/overLimitStatus/retrieve",
        "holidayCreate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/holiday/create",
        "orgInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/branch-notification-sg/v1/internal/overLimitApply/orgInquiry",
        "deviceInquiry": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/device/inquiry",
        "versionDistributeCreate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/version/distribute/create",
        "getOpaqueToken": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/teller-security-sg/v1/internal/token/generate",
        "aifRuleCreate": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/accountAifRule/create",
        "tradeDetailQuery": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/transaction-record-sg/v1/internal/tradeDetail/inquiry",
        "evevateOpaqueToken": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/teller-security-sg/v1/internal/token/elevate",
        "deviceStatusRetrieve": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/atm-management-sg/v1/internal/device/deviceStatus/retrieve",
        "refreshToken": "/mscp-uat.ocbcgroup.ocbc.com:8843/api/teller-security-sg/v1/internal/token/refresh"
    },
    "headerMap": {
        "allRoleList": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "getCardDetail1": "{\"API_KEY\":\"09497e09-c52c-4d07-abb6-3896c9e4b721\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "actSignConditionCreate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "staffInsert": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "staffUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "deviceCheckIn": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "accountStatusDelete": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "roleSelectList": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "msUrlCreate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "staffDetails": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "accountStatusUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "queryCurBatchAndAddCashInfo": "{\"API_KEY\":\"a552af15-278e-4e70-8493-e16fc847a838\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "accountStatusInquiry": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "actDepLimitRetrieve": "{\"API_KEY\":\"ec2fb1b4-e562-4f73-9238-cc08a3f78dff\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "staffLogin": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "paramCreate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "cashAddNoteAndCoin": "{\"API_KEY\":\"a552af15-278e-4e70-8493-e16fc847a838\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "paramDelete": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "versionUploadInquiry": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "msUrlInquiry": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "staffDelete": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "organiztionUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "deviceDelete": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "selectOverLimitBusiness": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "ejDetailQuery": "{\"API_KEY\":\"09497e09-c52c-4d07-abb6-3896c9e4b721\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "versionUploadCreate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "holidayDelete": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "organiztionDelete": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "aifRuleDelete": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "actDepLimitRetrieve1": "{\"API_KEY\":\"09497e09-c52c-4d07-abb6-3896c9e4b721\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "retrieveCustomerProfile": "{\"API_KEY\":\"09497e09-c52c-4d07-abb6-3896c9e4b721\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "deviceStatusUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "getAccountListUnderCif": "{\"API_KEY\":\"09497e09-c52c-4d07-abb6-3896c9e4b721\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "paramUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "insertOverLimitApply": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "queryCurBatchCashDetail": "{\"API_KEY\":\"a552af15-278e-4e70-8493-e16fc847a838\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "organiztionInquiry": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "staffSelect": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "actNonCardDepLimitRetrieve": "{\"API_KEY\":\"ec2fb1b4-e562-4f73-9238-cc08a3f78dff\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "roleRightList": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "deposit": "{\"API_KEY\":\"61246f6d-c625-4e5a-afa3-97d2d7fe54b3\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "orgDeviceInquiry": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "existOverLimitRight": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "actSignConditionDelete": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "organiztionInsert": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "msUrlDelete": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "roleDelete": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "ejLogQuery": "{\"API_KEY\":\"09497e09-c52c-4d07-abb6-3896c9e4b721\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "roleInsert": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "updateOverLimitStatus": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "roleUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "actSignConditionInquiry": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "businessHoursInquiry": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "validDay": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "callStaffApplyResultQuery": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "deviceCreate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "staffServiceOrg": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "taskDetail": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "cardAndActQuery": "{\"API_KEY\":\"09497e09-c52c-4d07-abb6-3896c9e4b721\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"ATM\"}",
        "businessHoursDelete": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "accountStatusCreate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "paramInquiry": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "getCardListUnderCif": "{\"API_KEY\":\"09497e09-c52c-4d07-abb6-3896c9e4b721\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "versionDistributeInquiry": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "businessHoursUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "custUpdateSave": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "roleSelectDetails": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "transactionConfirm": "{\"API_KEY\":\"61246f6d-c625-4e5a-afa3-97d2d7fe54b3\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "ejLogUpload": "{\"API_KEY\":\"09497e09-c52c-4d07-abb6-3896c9e4b721\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "holidayUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "callStaffApply": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "organiztionRetrieve": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "businessHoursCreate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "aifRuleUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "deviceUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "staffLogout": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "withdrawal": "{\"API_KEY\":\"61246f6d-c625-4e5a-afa3-97d2d7fe54b3\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "aifRuleInquiry": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "holidayInqiry": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "getCardDetail": "{\"API_KEY\":\"ec2fb1b4-e562-4f73-9238-cc08a3f78dff\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "msUrlUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "actSignConditionUpdate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "selectOverLimitStatus": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "holidayCreate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "orgInquiry": "{\"API_KEY\":\"b11a1d99-8789-4487-bd03-437eb738c208\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "deviceInquiry": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "versionDistributeCreate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "getOpaqueToken": "{\"API_KEY\":\"eb5caaa5-aa14-4bc9-ae62-24ab63f1c86a\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "aifRuleCreate": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "tradeDetailQuery": "{\"API_KEY\":\"61246f6d-c625-4e5a-afa3-97d2d7fe54b3\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "evevateOpaqueToken": "{\"API_KEY\":\"eb5caaa5-aa14-4bc9-ae62-24ab63f1c86a\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}",
        "deviceStatusRetrieve": "{\"API_KEY\":\"f8ab7251-8bac-4627-a377-c20d26cb4308\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"INB\"}",
        "refreshToken": "{\"API_KEY\":\"eb5caaa5-aa14-4bc9-ae62-24ab63f1c86a\",\"x-correlation-id\":\"SH64vqs4EtP0Dpggwikhrqwib4svya36\",\"x-source-country\":\"SG\",\"x-source-id\":\"BO\"}"
    }
}
```

