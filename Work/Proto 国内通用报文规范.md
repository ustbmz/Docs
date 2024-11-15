```json
// 公共报文头
TermUid: "{t.h_busiuid}",
TransCode: "{t.h_transcode}", // 交易码
CtlType: "{t.h_ctltype}", // 控件类型
ExSerial: "{g.seqno}", // C端流水号
CnSerial: "{t.h_cnserial}", // P流水号
Acctoper: "{g.acctoper}", // 虚拟柜员
TradeType: "{t.h_tradetype}", // 交易类型
BranchNo: "{g.selfServiceBankId}", // 银行号
Channel: "{g.h_channel}", // 渠道
TermNo: "{g.terminalId}", // 终端号
TermType: "{g.terminalType}", // 终端类型
TermMac: "{g.strMacAddr}", // 终端MAC地址
TransDate: "{t.h_transdate}", // 终端年月日
TransTime: "{t.h_transtime}", // 终端时间
```



1. 链路心跳检测 （配合后端管理系统监控使用）

   ```json
   body: {
       updatetime: "{g.c2h_updatetime}",
       pattern: "0",
     },
   // 返回数据
   body: {
       updatetime: "g.c2h_updatetime",
       pattern: "g.c2h_updatetime",
     },
   ```
   
2. 插卡报文 （ 使用返回的卡类型与卡号，本行卡与他行卡的区分需要通过 6 位卡 BIN 行方给判断 ）

   ```json
   // 插卡报文
   body: {
       Track2: "{t.track2data}",
       Track3: "{t.track3data}",
       Param: "{g.cardin_param}",
     },
   
   // 返回报文
   
   body: {
       AcctNo: "t.c2h_account",
       CardType: "t.CardType",
       CardName: "t.CardName",
       SvcInfo: "t.h2c_servicefunc",
    },
   ```
   
3. 验密报文 (入参)

   ```json
   body: {
     AcctNo: "{t.c2h_account}",
     CardSeq: '{t.c2h_icserial}', // 卡序列号 
     IcData: "{p.c2h_icdata}", // 基于PBOC的IC
     // IcData: '9F2608E03CD1C3618AB9C59F2701809F101307050103A0A000010A010000000000BCFE55849F37040285136A9F360201D6950580800460009A032110189C01009F02060000000000005F2A02015682027C009F1A0201569F03060000000000009F3303E040209F34030203009F3501149F1E0836393232343020208408A0000003330101019F090200209F41030929329F631030353432363930300000000000000000', // 基于PBOC的IC
     Ccno: "{p.c2h.ccno}", // 存折类型
     // CardType: '{t.emv_is_emvcard}',
     CardType: "1",
     CardFlag: "1", // 卡类别标志
     PinBlock: "{t.c2h_pinblock}",
   },
   ```

   返回

   ```json
   body: 
   {
     CustNo: "{t.CustNo}",
     AcctName: "{t.acct_name}", // 客户姓名
     IdNo: "{p.IdCard_Code}", // 证件号码
     Sex: "{p.IdCard_Sex}",
     AcctOpenBranchId: "{t.acct_open_branch_id}", // 开户机构号
     IdType: "{p.id_type}", // 证件类型
   }
   ```

4. 交易明细查询报文

   ```json
   body: {
     AcctNo: "{t.c2h_account}", // 客户账号
     AcctType: "1", // 账户类型 1-卡 3-定期一本通 5-存单
     StartDate: "{t.inq_start_date}",
     EndDate: "{t.inq_end_date}",
     Flag: "1",
   },
   ```

   返回:

   ```json
   {
    	RecMsg: "{t.inDetailList}", // 账户数组
    	RecNum: "{t.RecNum}",
   }
   ```

5. 余额查询

   ```json
   {
       qry_tp: "0", //	查询类型
       AcctNo: "{t.c2h_account}", //	客户账号
       sub_acct_serl_num: "{t.seqNo}", // 子账户序号
       ccy_code_num: "156", //	货币代号
       ecrpt_seed: "{t.c2h_account}", // 验密
       // org_code: '{t.c2h_account}', //	机构代码
       // acct_cash_rmtc_flg: '{t.c2h_account}', //	账户钞汇标志
       PinBlock: "{t.c2h_pinblock}", // 查询密码
       // lblty_acct_num: 'a00156010202120000005', //	负债账号
       pswd_catg: "2", // 密码种类
   }
   ```

   返回:

   ```json
   {
     acct_bal: "{t.h2c_account_balance}",
     // aval_bal: '{t.h2c_acct_bal}',
     aval_lmt: "{t.h2c_acct_bal}",
     prcpl_int_in_cust_acct_num: "{p.prcpl_int_in_cust_acct_num}",
     acct_ste: "{t.acct_ste}",
     acct_attr: "{t.acct_attr}", // 账户等级
     acct_nm: "{t.acct_nm}", // 账户名称
     // cust_num: '{t.client_no}',
     open_acct_dt: "{p.open_acct_dt}",
     acct_rtan_min_bal: "{t.acct_rtan_min_bal}", // 账户最小留存金额 用于部分支取
     open_acct_org: "{p.open_acct_org}",
     open_acct_amt: "{t.open_acct_amt}",
     lblty_acct_num: "{t.lblty_acct_num}", // 负债账号
     cust_acct_num_tp: "{t.cust_acct_num_tp}", // 卡类型
     docs_catg: "{p.docs_catg}",
     docs_num: "{p.docs_num}",
     vchr_serl_num: "t.vchr_serl_num", // 凭证序号
     vchr_btch_num: "t.vchr_btch_num", // 凭证批号
     sub_acct_serl_num: "t.sub_acct_serl_num", // 子账号序号
     vchr_catg: "t.vchr_catg", // 凭证种类
     listnm01: "t.listnm01_1020",
     dly_unused_alwc_draw: "t.dly_unused_alwc_draw", // 日累计剩余限额(支取)
   }
   ```

6. 查询账户信息 （ 通过卡号查询客户证件信息 ）

   ```json
   body: {
     CardType: "{t.CardType}", // 卡类型
     Ccy: "{g.c2h_currency}", // 币种
     AcctNo: "{t.c2h_account}", // 账号
   },
   ```

   返回:

   ```json
   body: {
     CertNo: "t.CertNo", // 证件号码
     CertType: "t.CertType", // 证件类型
     CustNo: "t.CustNo", // 用户编号
     CustName: "t.CustName", // 账号姓名
   },
   ```

7.  查账用户信息，转账用 （ 转账查询收款方账户状态 ， 账号与姓名是否一致 ）

   ```json
   body: {
     AcctNo: "{p.c2h_account}", // 账号
   },
   ```

   返回报文
   ```json
   body: {
     AcctName: "t.CustName", // 帐户户名
     CertType: "t.cert_type", // 凭证种类
     CertNo: "t.cert_number", // 凭证号码
     OpenBranch: "t.open_branch", // 开户机构
     AcctStatus: "t.account_state_info", // 帐户状态
     ClntAcctStField: "t.inAccount_stateField", // 客户账户状态字段
     ForbidInAcctFlag: "t.acct_forbidFlg", // 禁止转入户
   },
   ```

8. 转账报文

   ```json
   body: {
       Flag: "{t.c2h_flag}", // 1-本行 2-跨行转账
       AcctNo: "{t.c2h_account}", // 付款人账号
       Amt: "{p.c2h_amount|0.00}", // 交易金额
       InAcctNo: "6217550180067886", // 收款人账号
       PayerAcctName: "{t.cust_name}", // 付款人账户名称t.cust_name
       PayerAcctType: "1", // 付款人账户类型
       Track2: "{t.track2data}", // 2磁道信息
       // PayeeAcctName: '{p.h2c_custName}', // 收款人账户名称
       PayeeAcctName: "蒋林松",
       Remark: "备注", // 备注
       TradeType: "{t.trade_type}", // 交易方式
       // TradeType: '2', // 交易方式
       PinBlock: "{t.c2h_pinblock}", // 密码
       // PayeeAcOpBankName: '{t.payee_ac_op_bank_name}', // 收款人开户银行名称
       PayeeAcOpBankName: "", // 收款人开户银行名称
       // AcceptTellerNo: '{t.accept_teller_no}', // 交易柜员
       // PayeeAcctType: '{t.payee_acct_type}', // 收款人账户类型
       PayeeAcctType: "1", // 收款人账户类型
       // PayeeAcOpBankId: '{p.payee_ac_op_bank_id}' // 收款人开户银行号
     }
   }
   ```

   ```json
   body: {
      BookingSeqNo: "{p.c2h_booking_seq_no}", // 记账流水号
      Balance: "{p.c2h_bal}", // 账户余额 Bal
      free: "{p.c2h_free}", // 手续费
    } 

 9. 改密码

    ```json
    body: {
      AcctNo: "{t.c2h_account}", // 账号
      ACCT_TYPE: "1", // 账号类型
      PWD_CHECK_MODE: "2", // 密码校验方式
      OLD_PASSWORD: "{t.h_oldPin}", // 旧密码吗
      PASSWORD: "{t.h_newPin}", // 新密码
    },
    ```

    返回

    ```json
    body: {
      AcctNo: "{t.c2h_account}", //
      phoneNumber: "{t.Mobile}", //
      format: "01", //
      identifiyCard: "{t.IdCard_Code_1}", //
      pwd: "{t.h_newPin}", //
    },
    ```

 10. 密码重置

     ```json
     body: {
       AcctNo: "{t.c2h_account}", //	客户账号
       docs_catg: "102", //	证件种类
       pswd_catg: "11", //	密码种类
       docs_num: "{t.h2c_docs_num}", //	证件号码
       pswd_ciptxt: "{t.h_newPin}", //	原交易密码
       PinBlock: "{t.h_newPin}", //	新密码
     },
     ```

     返回

     ```json
     body: {
       AcctNo: "{t.c2h_account}", //	客户账号
       cust_num: "{t.CustNo}", //	客户号
       docs_catg: "102", //	证件种类
       pswd_catg: "11", //	密码种类
       docs_num: "{t.h2c_docs_num}", //	证件号码
       PinBlock: "{t.c2h_pinblock}", //	原密码
     },
     ```

     