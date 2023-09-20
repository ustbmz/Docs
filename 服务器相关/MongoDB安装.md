# 安装mongodb

## 配置yum源

```shell
$ cd /etc/yum.repos.d
$ vi /etc/yum.repos.d/mongodb.repo
```

```shell
[mongodb-org]
name=MongoDB Repository
baseurl=https://mirrors.tuna.tsinghua.edu.cn/mongodb/yum/el$releasever/
gpgcheck=0
enabled=1
```

## 安装

```shell
# 建立yum源缓存
$ yum makecache
# 查看所有mongodb版本
$ yum list | grep mongodb
# 安装org版本
$ yum install mongodb-org
```

## 启动mongodb 并设置开机启动

```shell
[root@localhost yum.repos.d]# systemctl status mongod
● mongod.service - MongoDB Database Server
   Loaded: loaded (/usr/lib/systemd/system/mongod.service; enabled; vendor preset: disabled)
   Active: inactive (dead)
     Docs: https://docs.mongodb.org/manual
[root@localhost yum.repos.d]# systemctl start mongod
[root@localhost yum.repos.d]# systemctl enable mongod
```

## 检查**MongoDB**的服务状态和端口监听信息

```shell
[root@mongodb ~]# systemctl status mongod.service
● mongod.service - MongoDB Database Server
   Loaded: loaded (/usr/lib/systemd/system/mongod.service; enabled; vendor preset: disabled)
   Active: active (running) since Fri 2020-12-18 23:17:49 CST; 16s ago
     Docs: https://docs.mongodb.org/manual
  Process: 930807 ExecStart=/usr/bin/mongod $OPTIONS (code=exited, status=0/SUCCESS)
  Process: 930804 ExecStartPre=/usr/bin/chmod 0755 /var/run/mongodb (code=exited, status=0/SUCCESS)
  Process: 930802 ExecStartPre=/usr/bin/chown mongod:mongod /var/run/mongodb (code=exited, status=0/SUCCESS)
  Process: 930800 ExecStartPre=/usr/bin/mkdir -p /var/run/mongodb (code=exited, status=0/SUCCESS)
 Main PID: 930809 (mongod)
   Memory: 57.7M
   CGroup: /system.slice/mongod.service
           └─930809 /usr/bin/mongod -f /etc/mongod.conf

Dec 18 23:17:48 mongodb.lianglab.cn systemd[1]: Starting MongoDB Database Server...
Dec 18 23:17:48 mongodb.lianglab.cn mongod[930807]: about to fork child process, waiting until server is ready for connections.
Dec 18 23:17:48 mongodb.lianglab.cn mongod[930807]: forked process: 930809
Dec 18 23:17:49 mongodb.lianglab.cn mongod[930807]: child process started successfully, parent exiting
Dec 18 23:17:49 mongodb.lianglab.cn systemd[1]: Started MongoDB Database Server


[root@mongodb ~]# netstat -anplt| grep mongod
tcp        0      0 127.0.0.1:27017         0.0.0.0:*               LISTEN      930809/mongod       
[root@mongodb ~]# ss -anplt | grep mongod
LISTEN    0         128              127.0.0.1:27017            0.0.0.0:*        users:(("mongod",pid=930809,fd=12))                                           
```



## 创建初始超级管理员用户

```sql
$ mongo
> use admin
> db.createUser({user:"admin",pwd:"admin123",roles:[{role:"dbOwner",db:"admin"}]})
```

## 创建操作用户

```sql
> use testdb
> db.createUser({user:"admin",pwd:"admin123",roles:[{role:"dbOwner",db:"testdb"}]})
```





## CentOS 8上为MongoDB创建SELinux策略：

根据[MongoDB文档](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)，如果您已将**SELinux**配置为**强制**模式，则必须为MongoDB创建SELinux策略。

检查当前的**SELinux**模式。

```shel
[root@mongodb ~]# getenforce
Enforcing
```

我们需要**checkpolicy**命令来验证自定义**SELinux**策略，因此我们正在使用**dnf**命令安装**checkpolicy**软件包。

```shell
[root@mongodb ~]#dnf install -y checkpolicy
CentOS-8 - AppStream                            4.0 kB/s | 4.3 kB     00:01
CentOS-8 - Base                                 3.0 kB/s | 3.8 kB     00:01
CentOS-8 - Extras                               2.7 kB/s | 1.5 kB     00:00
MongoDB Repository                              1.6 kB/s | 2.5 kB     00:01
Dependencies resolved.
================================================================================
 Package              Architecture    Version             Repository       Size
================================================================================
Installing:
 checkpolicy          x86_64          2.9-1.el8           BaseOS          348 k

Transaction Summary
================================================================================
Install  1 Package

Total download size: 348 k
Installed size: 1.7 M
Downloading Packages:
checkpolicy-2.9-1.el8.x86_64.rpm                7.5 kB/s | 348 kB     00:46
--------------------------------------------------------------------------------
Total                                           7.5 kB/s | 348 kB     00:46
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                        1/1
  Installing       : checkpolicy-2.9-1.el8.x86_64                           1/1
  Running scriptlet: checkpolicy-2.9-1.el8.x86_64                           1/1
  Verifying        : checkpolicy-2.9-1.el8.x86_64                           1/1

Installed:
  checkpolicy-2.9-1.el8.x86_64

Complete!
```

创建一个定制的**SELinux**策略文件。

```
[root@mongodb ~]# vi mongodb_cgroup_memory.te
```

并在其中添加以下指令。

```
module mongodb_cgroup_memory 1.0;

require {
    type cgroup_t;
    type mongod_t;
    class dir search;
    class file { getattr open read };
}

#============= mongod_t ==============
allow mongod_t cgroup_t:dir search;
allow mongod_t cgroup_t:file { getattr open read };
```

编译并应用此SELinux策略。

```shell
[root@mongodb ~]# checkmodule -M -m -o mongodb_cgroup_memory.mod mongodb_cgroup_memory.te
[root@mongodb ~]# semodule_package -o mongodb_cgroup_memory.pp -m mongodb_cgroup_memory.mod
[[root@mongodb ~]# semodule -i mongodb_cgroup_memory.pp
```

## 创建admin账号

```shell
[root@localhost ~]# mongo
MongoDB shell version v4.4.6
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("2df728ce-2a97-4635-b9c5-81e0f00923c6") }
MongoDB server version: 4.4.6
---
The server generated these startup warnings when booting: 
        2021-06-29T20:42:30.610+08:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
        2021-06-29T20:42:30.611+08:00: /sys/kernel/mm/transparent_hugepage/enabled is 'always'. We suggest setting it to 'never'
---
---
        Enable MongoDB's free cloud-based monitoring service, which will then receive and display
        metrics about your deployment (disk utilization, CPU, operation statistics, etc).

        The monitoring data will be available on a MongoDB website with a unique URL accessible to you
        and anyone you share the URL with. MongoDB may use this information to make product
        improvements and to suggest MongoDB products and deployment options to you.

        To enable free monitoring, run the following command: db.enableFreeMonitoring()
        To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
> use admin;
switched to db admin
> db.createUser(
...   {
...     user: "admin",
...     pwd: "liang123",
...     roles: [ { role: "userAdminAnyDatabase",db: "admin" } ]
...   }
... )
Successfully added user: {
	"user" : "admin",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	]
}
> show users
{
	"_id" : "admin.admin",
	"userId" : UUID("91c06ceb-0dc4-4687-a467-679a9a8c75fa"),
	"user" : "admin",
	"db" : "admin",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	],
	"mechanisms" : [
		"SCRAM-SHA-1",
		"SCRAM-SHA-256"
	]
}
> exit
bye
[root@localhost ~]# 
```

## MongoDB服务器中启用访问控制：

最初，访问控制在MongoDB服务器中被禁用。因此，任何具有CentOS 8服务器操作系统级访问权限的用户都可以连接到MongoDB实例并在数据库上执行管理操作。这就是为什么我们能够在上一步中创建**管理员**用户而无需任何身份验证的原因。

要为MongoDB服务器启用**访问控制**，我们需要为**mongod.service**编辑**systemd**单元文件。

```shell
[root@mongodb ~]# vi /usr/lib/systemd/system/mongod.service
```

在此文件中找到以下行。

```shell
Environment="OPTIONS=-f /etc/mongod.conf"
```

并将其替换为以下行。

```shell
Environment="OPTIONS=--auth -f /etc/mongod.conf"
```

我们已经使用文本编辑器显式地编辑了**systemd**单位文件。因此，我们需要执行以下命令来通知**systemd**有关此更改。

```shell
[root@mongodb ~]# systemctl daemon-reload
```

重新启动**MongoDB**服务以应用更改。

```shell
[root@mongodb ~]# systemctl restart mongod.service
```

要检查访问控制，请连接**MongoDB** shell并执行一些管理命令。

```shell
[root@localhost ~]# mongo
MongoDB shell version v4.4.6
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("d07e43a9-d2f5-4884-b9df-962f76fa7b77") }
MongoDB server version: 4.4.6
> use admin;
switched to db admin
> show users;
uncaught exception: Error: command usersInfo requires authentication :
_getErrorWithCode@src/mongo/shell/utils.js:25:13
DB.prototype.getUsers@src/mongo/shell/db.js:1659:15
shellHelper.show@src/mongo/shell/utils.js:914:9
shellHelper@src/mongo/shell/utils.js:819:15
@(shellhelp2):1:1
> 
```

这次“ **show user”**命令引发身份验证错误，它确认在我们的MongoDB服务器中已启用**访问控制**。

现在，以**管理员**用户身份连接。

```shell
> db.auth("admin",passwordPrompt())
Enter password: 
1
> show users
{
	"_id" : "admin.admin",
	"userId" : UUID("91c06ceb-0dc4-4687-a467-679a9a8c75fa"),
	"user" : "admin",
	"db" : "admin",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	],
	"mechanisms" : [
		"SCRAM-SHA-1",
		"SCRAM-SHA-256"
	]
}
> 
```

已成功使用特权用户执行命令**“显示用户”**。

MongoDB数据库的**访问控制**已启用。

## 配置MongoDB服务以进行网络访问：

此步骤是可选的。如果您打算通过网络访问MongoDB数据库，则必须执行以下配置。

默认情况下，MongoDB服务在**本地主机**接口上运行。因此，要使其能够从网络访问，我们需要在所有接口上运行MongoDB服务。

使用**vim**编辑器编辑MongoDB配置文件

```shell
vi /etc/mongod.conf

# network interfaces
net:
  port: 27017
#  bindIp: 127.0.0.1  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.
  bindIp: 0.0.0.0  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.
```

## 重新启动MongoDB服务以应用更改。

```shell
[root@localhost ~]# systemctl restart mongod.service
```

## 防火墙设置

设置如果我们启动了防火墙策略，还需要允许Linux防火墙中的MongoDB服务传入流量。

```
[root@mongodb ~]#firewall-cmd --permanent --add-service=mongodb
success
[root@mongodb ~]# firewall-cmd --reload
success
```

您现在可以从网络访问MongoDB数据库服务。

## MongoDB数据和日志目录：

以下是两个目录，对MongoDB数据库管理员来说非常重要。

- **/var/lib/mongo-**数据目录（默认）
- **/var/log/mongodb-**日志目录（默认）

我们可以通过在**/etc/mongodb.conf**文件中设置以下参数来自定义以上目录。

- **storage.dbPath-**指定新的数据目录路径
- **systemLog.path-**指定新的日志文件路径

## 基本用法

### 查看

show dbs 查看数据库

use dbname 进入数据库

show users 查看当前数据库用户权限

### **创建用户**

db.createUser({user:"usertest",pwd:"passtest",roles:[ {role:"clusterAdmin", db:"admin" }, {role:"readAnyDatabase",db:"admin" }, {role:"readWrite",db:"testDB" } ]})

### **权限详解**

#### 内建角色：

数据库用户角色：read、readWrite；

数据库管理角色：dbAdmin、dbOwner、userAdmin；

集群管理角色： clusterAdmin、clusterManager、clusterMonitor、hostManager；

备份恢复角色： backup、restore；

所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase

超级用户角色： root； 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）

内部角色： __system；

\------------------------------------------------------------------------------------------

#### 角色说明：

Read： 允许用户读取指定数据库

readWrite： 允许用户读写指定数据库

dbAdmin： 允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile

userAdmin： 允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户

dbOwner： 允许在当前DB中执行任意操作

readAnyDatabase： 赋予用户所有数据库的读权限，只在admin数据库中可用

readWriteAnyDatabase： 赋予用户所有数据库的读写权限，只在admin数据库中可用

userAdminAnyDatabase：赋予用户所有数据库管理User的权限，只在admin数据库中可用

dbAdminAnyDatabase： 赋予管理所有数据库的权限，只在admin数据库中可用

root： 超级账号，超级权限，只在admin数据库中可用。

\------------------------------------------------------------------------------------------

#### 集群管理角色：

clusterAdmin： 赋予管理集群的最高权限，只在admin数据库中可用

clusterManager： 赋予管理和监控集群的权限

clusterMonitor： 赋予监控集群的权限，对监控工具具有readonly的权限

hostManager： 赋予管理Server

### **修改密码**

方法1：db.changeUserPassword("usertest","changepass");

方法2：db.updateUser("usertest",{pwd:"changepass1"})；

### **修改权限**

db.updateUser("usertest",{roles:[ {role:"read",db:"testDB"} ]})

注：updateuser它是完全替换之前的值，如果要新增或添加roles而不是代替它

则使用方法： db.grantRolesToUser() 和 db.revokeRolesFromUser(）

\------------------------------------------------------------------------------------------

db.grantRolesToUser("usertest", [{role:"readWrite", db:"testDB"},{role:"read", db:"testDB"}]) # 修改权限

db.revokeRolesFromUser("usertest",[{role:"read", db:"testDB"}]) # 删除权限：

### **删除用户**

db.dropUser('usertest')

参考：

https://jingyan.baidu.com/article/dca1fa6f0428a4f1a440522e.html

https://www.cnblogs.com/lianglab/p/14157585.html