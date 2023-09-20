一， -y 自动执行安装

二， package 包名/软件名，以下命令中凡是出现package需要自行替换。

三， apt-get 无效时可更换为 apt 反之同理。

四，某些情况下可以不用输入 sudo

1.更新源

sudo apt-get update -y  
2.更新已安装的包

sudo apt-get upgrade -y  
3.升级系统

sudo apt-get dist-upgrade -y  
4.使用 dselect 升级

sudo apt-get dselect-upgrade -y  
5.了解使用依赖

sudo apt-cache depends package  
6.查看该包被哪些包依赖

sudo apt-cache rdepends package  
7.安装相关的编译环境

sudo apt-get build-dep package  
8.下载该包的源代码

sudo apt-get source package  
9.清理无用的包

sudo apt-get clean && sudo apt-get autoclean  
10.检查是否有损坏的依赖

sudo apt-get check  
11.清理所有软件缓存（即缓存在/var/cache/apt/archives目录里的deb包）

sudo apt-get clean  
12.搜索包

sudo apt-cache search package  
13.获取包的相关信息，如说明、大小、版本等

sudo apt-cache show package  
14.安装包

sudo apt-get install package  
15.重新安装包

sudo apt-get install package - - reinstall  
16.修复安装”-f = –fix-missing”

sudo apt-get -f install  
17.删除包

sudo apt-get remove package  
18.删除包，包括删除配置文件等

sudo apt-get remove package - - purge  
19.安装wget下载工具

sudo apt-get install wget -y  
20.[安装git](https://so.csdn.net/so/search?q=%E5%AE%89%E8%A3%85git&spm=1001.2101.3001.7020)

sudo apt-get install git -y  
21.安装curl

sudo apt-get install curl -y  
22.[安装Nginx](https://so.csdn.net/so/search?q=%E5%AE%89%E8%A3%85Nginx&spm=1001.2101.3001.7020)

apt-get install nginx

#输入以下命令查看是否可以正常访问, 顺便验证下安装是否成功.  
curl -I 127.0.0.1

#若输出类似如下内容, 那么说明安装没问题咯.  
HTTP/1.1 200 OK  
Server: nginx/1.10.3  
Date: [Sat](https://so.csdn.net/so/search?q=Sat&spm=1001.2101.3001.7020), 14 Mar 2020 05:36:45 GMT  
Content-Type: text/html  
Content-Length: 612 Last-Modified: Sat, 14 Mar 2020 05:36:27 GMT  
Connection: keep-alive  
ETag: “5e6c6d5b-264”  
Accept-Ranges: bytes  
　　Nginx绑定域名

22.1配置文件/etc/nginx/conf.d/\*\*.conf

22.2为每一个域名建立一个单独的配置文件时输入以下内容：

server  
{  
listen 80; #监听端口设为 80。  
server\_name blog.tgae.xyz; #绑定您的域名。  
index index.htm index.html index.php; #指定默认文件。  
root /var/www/html/hlzspace; #指定网站根目录。  
include location.conf; #当您需要调用其他配置文件时才粘贴此项，如无需要，请删除此项。  
}  
　　22.3将多个域名规则写进一个共同的配置文件时输入以下内容：

server  
{  
listen 80; #监听端口设为 80。  
server\_name blog.tgae.xyz; #绑定您的域名。  
index index.htm index.html index.php; #指定默认文件。  
root /var/www/html/hlzspace; #指定网站根目录。  
include location.conf; #当您需要调用其他配置文件时才粘贴此项，如无需要，请删除此项。  
}  
server  
{  
listen 80; #监听端口设为 80。  
server\_name blog.tgae.xyz; #绑定您的域名。  
index index.htm index.html index.php; #指定默认文件。  
root /var/www/html/hlz2space; #指定网站根目录。  
include location.conf; #当您需要调用其他配置文件时才粘贴此项，如无需要，请删除此项。  
}  
　　22.4为无 WWW 前缀的域名配置规则并加 301 跳转时输入以下内容：

server  
{  
listen 80;  
server\_name tgae.xyz;  
rewrite ^/(.\*) http://www.tgae.xyz/$1 permanent;  
}  
　　22.5需要为域名添加 404 提示时输入以下内容：

server  
{  
listen 80; #监听端口设为 80。  
server\_name blog.tgae.xyz; #绑定您的域名。  
index index.htm index.html index.php; #指定默认文件。  
root /var/www/html/hlzspace; #指定网站根目录。  
include location.conf; #当您需要调用其他配置文件时才粘贴此项，如无需要，请删除此项。  
error\_page 404 #/404.html;  
}  
　　22.6重启nginx

$ service nginx restart  
23.安装screen

sudo apt-get install screen -y  
#使用方法，使用时注意(space)空格  
screen -S 创建新窗口例：screen -S lnmp  
screen -ls 列出所有窗口，直接输入。  
screen -r 恢复窗口例：screen -r lnmp 或者是 通过-ls命令获取的窗口前数字列：screen -r 1234

#There is no screen to be resumed matching  
#解决方法：  
screen -D -r 18352  
#解释：-D -r 先删除前一用户再登陆。

24.安装Firewalld  
UFW、firewall、iptables防火墙配置 常见的linux系统防火墙有：UFW、firewall、iptables，其中，UFW是Debian系列的默认防火墙，firewall 是红帽系列7及以上的防火墙（如CentOS7.x），iptables是红帽系列6及以下（如CentOS6.x）的防火墙。

事实上，他们很可能同时安装在同一个系统上，并且相互作用影响！  
首先，iptables是最底层、最古老的防火墙系统，所有系统都会存在此防火墙，但一般而言只需保证该防火墙处于完全开放状态即可，其他不用管他，更不需要复杂的配置。而ufw和firewall都是较新linux系统上的替代iptables的工具，当他们同时安装在服务器上时，两者之间就会存在冲突。

24.1—firewall  
sudo apt-get install firewalld -y  
#使用方法  
　　1.查看所有开放的端口 (服务器已开放的端口)  
　　　　firewall-cmd --zone=public --list-ports  
　　　　firewall-cmd --list-ports  
　　2.查询是否开启80端口  
　　　　firewall-cmd --query-port=80/tcp  
　　3.开放端口  
　　　　3.1临时放行，服务器重启后失效  
　　　　　　firewall-cmd --zone=public --add-port=80/tcp  
　　　　3.2在public中放行，永久生效，服务器重启后不会失效  
　　　　　　firewall-cmd --zone=public --add-port=80/tcp --permanent  
　　　　3.3永久 放行连续的端口 1000-2000  
　　　　　　firewall-cmd --zone=public --add-port=1000-2000/tcp --permanent  
　　　　3.4永久放行不连续的端口 9000,9001  
　　　　　　firewall-cmd --zone=public --add-port=9000/tcp --add-port=9001/tcp --permanent  
　　4.删除端口  
　　　　4.1临时删除，服务器重启后自动添加  
　　　　　　firewall-cmd --zone=public --remove-port=80/tcp  
　　　　4.2在public中删除，永久生效，服务器重启后不会自动添加  
　　　　　　firewall-cmd --zone=public --remove-port=80/tcp --permanent  
　　　　4.3永久删除 连续的端口(1000-2000  
　　　　　　firewall-cmd --zone=public --remove-port=1000-2000/tcp --permanent  
　　　　4.4永久删除不连续的端口(9000,9001  
　　　　　　firewall-cmd --zone=public --remove-port=9000/tcp --remove-port=9001/tcp --permanent  
　　5.禁Ping设置规则  
　　　　5.1临时 禁Ping规则  
　　　　　　firewall-cmd --add-rich-rule=‘rule protocol value=icmp drop’  
　　　　5.2永久 禁Ping规则  
　　　　　　firewall-cmd --permanent --add-rich-rule=‘rule protocol value=icmp drop’  
　　　　5.3临时 删除禁Ping规则  
　　　　　　firewall-cmd --remove-rich-rule=‘rule protocol value=icmp drop’  
　　　　5.4永久 删除禁Ping规则  
　　　　　　firewall-cmd --permanent --remove-rich-rule=‘rule protocol value=icmp drop’  
　　6.http与https通讯  
　　　　6.1永久开放http  
　　　　　　firewall-cmd --permanent --add-service=http  
　　　　6.2永久允许http通信  
　　　　　　firewall-cmd --permanent --zone=public --add-service=http  
　　　　6.3永久允许https通信  
　　　　　　firewall-cmd --permanent --zone=public --add-service=https  
　　更新防火墙规则：firewall-cmd --reload

重启： systemctl restart firewalld

启动： systemctl start firewalld

状态： systemctl status firewalld

停止： systemctl disable firewalld

禁用： systemctl stop firewalld

开机启动：systemctl enable firewalld.service

开机禁用：systemctl disable firewalld.service

查看版本： firewall-cmd --version

查看帮助： firewall-cmd --help

显示状态： firewall-cmd --state

查看所有打开的端口： firewall-cmd --zone=public --list-ports

查看区域信息: firewall-cmd --get-active-zones

查看指定接口所属区域： firewall-cmd --get-zone-of-interface=eth0

拒绝所有包：firewall-cmd --panic-on

取消拒绝状态： firewall-cmd --panic-off

查看是否拒绝： firewall-cmd --query-panic

重新加载配置 (不管是添加或是删除端口都需要重新加载配置并重启firewall)

24.2—ufw  
1.启用  
sudo ufw enable # 开启了防火墙，并在系统启动时自动开启  
sudo ufw default deny # 关闭所有外部对本机的访问，但本机访问外部正常。  
2.关闭  
sudo ufw disable  
3.查看状态  
sudo ufw status  
4.  
sudo ufw allow 80 # 允许外部访问80端口  
sudo ufw delete allow 80 # 禁止外部访问80端口  
sudo ufw allow from 192.168.1.1 # 允许此IP访问所有的本机端口  
sudo ufw deny smtp # 禁止外部访问smtp服务  
sudo ufw delete allow/deny smtp # 删除上面建立的smtp的规则，上面建立的规则为allow，这里就删除allow；为deny，这里就删除deny  
sudo ufw deny proto tcp from 10.0.0.0/8 to 192.168.0.1 port 22 # 要拒绝所有的TCP流量从10.0.0.0/8 到 192.168.0.1地址的22端口

25.安装unzip

apt-get install unzip

#把文件解压到当前目录下  
unzip file.zip

#把文件解压到指定的目录下，需要用到-d参数  
unzip -d ./tmp/ file.zip

#解压的时候，有时候不想覆盖已经存在的文件，那么可以加上-n参数  
unzip -n file.zip  
unzip -n -d ./tmp/ file.zip

#只看一下zip压缩包中包含哪些文件，不进行解压缩  
unzip -l file.zip

#查看显示的文件列表还包含压缩比率  
unzip -v file.zip

#检查zip文件是否损坏  
unzip -t file.zip

#将压缩文件file.zip在指定目录tmp下解压缩，如果已有相同的文件存在，要求unzip命令覆盖原先的文件  
unzip -o file.zip -d ./tmp