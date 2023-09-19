# Linux 必备指令摘要一般用户指令

## /bin

| **指令** | **功能说明**               | **范例**                          |
| -------- | -------------------------- | --------------------------------- |
| bash     | GNU Bouren-Again Shell     | bash shell_script                 |
| cat      | 观看一般文本文件           | cat file.txt                      |
| chgrp    | 更改群组                   | chgrp groupname file              |
| chmod    | 更改文件权限               | chmod 755 file                    |
| chown    | 更改文件 owner             | chown username file               |
| cp       | 复制文件                   | cp file1 file2                    |
| date     | 显示日期与时间             | date                              |
| dd       | disk dump                  | dd if=input of=output             |
| df       | 显示磁盘使用空间           | df -m                             |
| dmesg    | 显示启动信息               | dmesg \| more                     |
| echo     | 显示文字                   | echo “Hello World”                |
| ed       | 最普通的 Editor            | ed textfile                       |
| egrep    | 类似 grep 的字符串搜索工具 | egrep keyword file                |
| grep     | 字符串搜索工具             | grep keyword file                 |
| gunzip   | 解压缩.gz 工具             | gunzip file.gz                    |
| gzip     | 压缩文件                   | gzip file                         |
| hostname | 显示主机名称               | hostname                          |
| kill     | 删除 process               | kill <PID>                        |
| ln       | link file                  | ln -s file linkfile               |
| ls       | 显示目录与文件             | ls -l /                           |
| mail     | 收／发电子邮件             | mail                              |
| mkdir    | 建立空目录                 | mkdir -p /tmp/usr/who             |
| mknod    | 产生硬件装置文件           | mknod /dev/dsp0c290               |
| more     | file perusal filter        | more long_file                    |
| mount    | 挂接文件系统               | mount -t iso9660 /dev/cdrom/cdrom |



| **指令** | **功能说明**                   | **范例**                         |
| -------- | ------------------------------ | -------------------------------- |
| mv       | 移动文件                       | mv file1 file2                   |
| netstat  | 监看网络状态                   | netstat -ns                      |
| ping     | 查询远程主机连线状态           | ping linux.ee.nctu.edu.tw        |
| ps       | 显示系统 process status        | ps -aux                          |
| pwd      | 显示目前工作目录               | pwd                              |
| rm       | 删除文件                       | rm -rf                           |
| rmdir    | 删除目录                       | rmdir -p /tmp/user               |
| rpm      | RPM pachage 管理程序           | rpm -ivh xxx.i386.rpm            |
| stty     | 改变或查看 terminal 的显示模式 | stty -a                          |
| sh       | GNU Bourne Shell               | sh shell_script                  |
| su       | Switch User                    | su root                          |
| sync     | 将在内存的数据写回硬盘         | sync;sync;sync                   |
| tar      | GNU tar 文件压缩程序           | tar zcvf tar.file.gz dir_source/ |
| tcsh     | extended C-shell               | tcsh shell_script                |
| touch    | 改变文件时间                   | touch file                       |
| umount   | 卸下文件系统                   | umount /cdrom                    |
| uname    | 显示 OS 版本                   | uname -r                         |
| vi       | Visual Editor                  | vi file                          |
| zcat     | 观看.gz 压缩文件内容           | zcat textfile.gz                 |

 

 

 

 

## **/usr/bin**

| **指令** | **功能说明**           | **范例**             |
| -------- | ---------------------- | -------------------- |
| alias    | 设置别名               | alias dir=”ls -alF”  |
| apropos  | 查询指令用法           | apropos ls           |
| as       | portable GNU assembler | as                   |
| at       | 工作行程排定程序       | at -f job_file 20:54 |
| atq      | 查询 at 已经排定的工作 | atq                  |
| atrm     | 删除 at 排定的工作     | atrm jobnumber       |



| **指令** | **功能说明**                  | **范例**                   |
| -------- | ----------------------------- | -------------------------- |
| bzip2    | 压缩程序，压缩文件.bz2        | bzip2 file                 |
| bzless   | 观看使用 bzip2 压缩的文本文件 | bzless text.bz2            |
| cal      | calendar 日历                 | cal 11 1999                |
| cc       | gNU C Compiler                | cc -o output_file source.c |
| chfn     | 改变用户数据                  | chfn                       |
| chsh     | change Shell                  | chsh                       |
| clear    | 清除屏幕画面                  | clear                      |
| cmp      | 比较两个文件                  | cmp file1 file2            |
| compress | 压缩程序，压缩文件.Z          | compress file              |
| corntab  | 比at 强大的行程排定程序       | crontab -e                 |
| diff     | 文本文件比较程序              | diff file1 file2           |
| dir      | 功能和 ls 一样                | dir                        |
| du       | 查询目录文件使用空间          | du -sm dir                 |
| egcs     | 新版的 g++与 gcc              | egcs file.cpp or file.c    |
| eject    | 退出光盘                      | eject                      |
| elm      | 电子邮件程序                  | elm                        |
| emacs    | emacs 编辑器                  | emacs -nw                  |
| env      | 显示 Shell 环境变量           | env                        |
| expr     | 计算表达式                    | expr 1+4                   |
| file     | 显示文件类别                  | file filename              |
| find     | 文件搜索工具                  | find ./-name pattern       |
| finger   | 查询本地或远程机器用户信息    | finger username            |
| ftp      | 文件传输程序                  | ftp ftp.nctu.edu.tw        |
| ftpwho   | 查看目前 FTP 上网人数         | ftpwho                     |
| head     | 显示文件头                    | head -20 logfile           |
| g++      | gNU C++ Compiler              | g++ -o execute file.cpp    |
| gcc      | gNU C Compiler                | gcc -o execute file.c      |
| gzip     | gNU zip,压缩文件.gz           | gzip file                  |
| ispell   | 英文拼写检查程序              | ispell article             |
| joe      | 类似 PE2 的文本编辑器         | job file.txt               |



| **指令**  | **功能说明**                        | **范例**                       |
| --------- | ----------------------------------- | ------------------------------ |
| last      | 查看系统登录记录                    | lash -100                      |
| less      | 一页一页显示文本文件                | less longfile                  |
| locale    | 显示 Shell 的地方化设置             | locale                         |
| locate    | 文件搜索指令                        | locate keyword                 |
| lpr       | 将文件放进 printer queue 中等候打印 | lpr -Plp0 file                 |
| lpq       | 显示 printer queue 的内容           | lpq -Plp0                      |
| lprm      | 删除 lpr 送出的打印工作             | lprm jobnumber                 |
| make      | 可让一堆程序同时编译的工具          | make                           |
| man       | 网上文件                            | man make                       |
| man2html  | 可将 man 文件转成 html 文件         | man2html /usr/man/ls.1>ls.html |
| mc        | Midnight commander 文件管理员       | mc                             |
| ncftp     | 支持续传功能的 ftp 程序             | ncftp ftp.nctu.edu.tw          |
| nslookup  | 查询主机 DNS 名称或 IP Address      | nslookup 140.113.1.1           |
| passwd    | 更改用户密码                        | passwd username                |
| pdftops   | 将PDF 文件转成 PS 文件              | pdftops PDF-file PS-file       |
| pdftotext | 将PDF 文件转成 text 文件            | pdftotext PDF-file text-file   |
| pico      | 功能强大的电子邮件程序              | pico textfile                  |
| pine      | 功能强大的电子邮件程序              | pine                           |
| ps2ascii  | 将PS 文件转成 text 文件             | ps2ascii input.ps outpub.txt   |
| ps2pdf    | 将PS 文件转成 PDF 文件              | ps2pdf input.ps outpub.pdf     |
| quota     | 查看用户硬盘使用空间                | quota -v                       |
| rtin      | News 阅读程序                       | trin                           |
| tail      | 显示文件尾                          | tail -f message.log            |
| talk      | 网上交谈指令                        | talk username                  |
| telnet    | 远程登录                            | telnet bbs.ee.nctu.edu.tw      |
| tin       | News 阅读程序                       | tin                            |
| top       | 系统资源监控程序                    | top                            |
| unarj     | .arj 压缩文件解压程序               | unarj file.arj                 |



| **指令** | **功能说明**               | **范例**       |
| -------- | -------------------------- | -------------- |
| unzip    | .zip 压缩文件解压程序      | unzip file.zip |
| uptime   | 显示系统开机多久           | uptime         |
| w        | 查看目前网上用户           | w              |
| wc       | 计算文本文件的字数         | wc -w article  |
| whatis   | 网上查询工具               | whatis keyword |
| whereis  | 指令搜索指令               | whereis passwd |
| whoami   | 显示用户名称               | whoami         |
| zip      | zip 压缩程序，压缩文件.zip | zip file       |
| zless    | 可查看 zip 压缩的文本文件  | zless file.zip |

 

 

系统管理者指令

/**sbin**

| **指令** | **功能说明**                               | **范例**                              |
| -------- | ------------------------------------------ | ------------------------------------- |
| arp      | 显示网络装置设置与 MAC address             | arp                                   |
| cfdisk   | 磁盘分割工具                               | cfdisk                                |
| clock    | 设置系统时间                               | clock –set –data=”9/22/98 16:45:11”   |
| depmod   | 设置自动载入 Kernel modules                | depmod -a                             |
| dumpe2fs | 显示 ext2 文件系统的磁盘信息               | dumpe2fs /dev/hda5                    |
| e2fsck   | ext2 filesystem check                      | e2fsck /dev/sda1                      |
| e2label  | 设置 ext2 partition 的label name           | e2label /dev/sda1 lable_name          |
| fdisk    | 任何 Linux Distribution 都有的磁盘分割工具 | fdisk /dev/hdb                        |
| halt     | 系统开机指令                               | halt -p                               |
| hdparm   | 查询硬盘信息                               | hdparm -i /dev/hda                    |
| ifconfig | 设置网络装置                               | ifconfig                              |
| init     | 改变系统执行 runlevel                      | init 3                                |
| insmod   | 插入 Kernel modules                        | inmod/lib/modules/2.2.113/net/tulip.o |



| **指令**   | **功能说明**                        | **范例**                               |
| ---------- | ----------------------------------- | -------------------------------------- |
| idconfig   | 设置系统执行需要 link 的linrary     | ldconfig -v -v -v                      |
| lilo       | Linux Loader                        | lilo -v -v -v                          |
| lsmod      | 显示目前载入的 Kernel Modules       | lsmod                                  |
| mke2fs     | 将 partition 格式化成 ext2 文件系统 | mke2fs /dev/hdb2                       |
| mkinitrd   | 产生各版本 Kernel 的initrd ramdisk  | mkinitrd initrd.img 2.2.13             |
| mkswap     | 格式化成 swap 文件系统格式          | mkswap /dev/hdb7                       |
| modprobe   | 自动载入 Kernel 模块                | modprobe -all/lib/modules/2.2.13/net/* |
| quotacheck | 检查系统 quota 设置                 | quotacheck -auvg                       |
| quotaon    | 启动系统 quota 限制硬盘使用空间     | quoton -auvg                           |
| quotaoff   | 关闭系统 quota                      | quotoff -auvg                          |
| reboot     | 重新启动电脑                        | reboot                                 |
| rmmod      | 删除载入的 Kernel modules           | rmmod module_name                      |
| runlevel   | 显示目前系统执行的 runlevel         | runlevel                               |
| sfdisk     | 磁盘分割工具                        | sfdisk /dev/hdc                        |
| shutdown   | 开机指令                            | shutdonw -r now                        |
| swapon     | 启动 swap                           | swapon -a                              |
| swapoff    | 关闭 swap                           | swapoff -a                             |

 

 

## /usr/sbin

| **指令**   | **功能说明**                   | **范例**           |
| ---------- | ------------------------------ | ------------------ |
| apmd       | 能源管理 BIOS daemon           | apmd -v            |
| atd        | at 程序的 deamon               | atd -s             |
| crond      | ccrontab 程序的 dearmon        | crond              |
| dip        | 手工拨号工具                   | dip -tv            |
| edquota    | 编辑用户或群组 quota           | edquota -u wzyang  |
| httpd      | Apache web server deamon       | httpd -f http.conf |
| in.ftpd    | ftp service                    | in.ftpd -l -a      |
| in.telnetd | Telnet service                 | in.telnetd         |
| inetd      | 总管所有网络 service 的 deamon | inetd              |



| **指令**       | **功能说明**                                   | **范例**                      |
| -------------- | ---------------------------------------------- | ----------------------------- |
| lpd            | 打印复务器                                     | lpd                           |
| makewhatis     | 产生 whatis 数据库                             | makewhatis                    |
| mkdict         | 产生 spell 的词库                              | mkdict                        |
| pnprobe        | 自动检测系统 PNP 硬件装置                      | pnpprobe                      |
| pppd           | ppp daemon                                     | pppd /dev/modem 115200        |
| pppstats       | 显示 ppp 装置连线状态                          | pppstats                      |
| pwconv         | 将/etc/passwd 使用 Shadow 加密转成／etc/shadow | pwconv                        |
| dynquotastatus | 显示 quota 设置状态                            | quotastatus                   |
| rdev           | 设置 image root device                         | rdev -R /dev/fd0              |
| routed         | routing deamon                                 | routed -g                     |
| sendmail       | 电子邮件服务器                                 | sendmail -bd -q30m            |
| syslogd        | 记录系统运行所有信息的 deamon                  | syslogd                       |
| tcpd           | Internet TCP/IP 网络最重要的 deamon            | tcpd in.ftpd                  |
| useradd        | 新增系统用户                                   | useradd -g groupname username |
| userdel        | 删除系统用户                                   | userdel username              |
| lynx           | 文本浏览器                                     | lynx                          |

 

