### 1、查看Python版本

```
python -V
```

### 2、更新[yum](https://so.csdn.net/so/search?q=yum&spm=1001.2101.3001.7020)源

```
yum update
```

### 3、安装依赖

```
yum install yum-utils
yum-builddep python
```

### 4、下载python

```
wget https://www.python.org/ftp/python/3.8.0/Python-3.8.0.tgz
```

### 5、安装Python相关依赖

```
yum -y install zlib-devel bzip2-devel openssl-devel ncursesdevelsqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel
```

### 6、安装c，c++

```
yum -y install gcc g++
```

### 7、创建安装目录

```
mkdir /usr/local/python3
```

### 8、解压

```
tar xf Python-3.7.5.tgz
```

### 9、编译

```
cd Python-3.7.5/
./configure --prefix=/usr/local/python3
make
```

### 10、安装

```
make install
```

### 11、配置环境变量

```
vim ~/.bash_profile # 建议使用此命令
PATH=$PATH:$HOME/bin:/usr/local/python3/bin:/usr/local/python/bin
source ~/.bash_profile
```

### 完整替换python2.7

需要以上步骤中出现创建python文件改为 python，不使用python3 和 python3.8，即在bin/local/目录下创建为python文件夹，以下两步发生变化：

```
mkdir /usr/local/python
```

#### 接下来还需要两步：

cd到python文件夹下复制两份文件pip3 和 python3.8

```
cp pip3 pip
cp python3.8 python
```

#### 备份旧版本

```
mv /usr/bin/python /usr/bin/python2.7
```

#### 做软连接替换

```
ln -s /usr/local/python3/bin/python3 /usr/bin/python -f
ln -s /usr/local/python3/bin/pip3 /usr/bin/pip -f
```

#### 调整yum配置和软件安装配置文件

```
修改yum文件，因为升级了版本以后，yum就会报错
vi /usr/bin/yum
#!/usr/bin/python 修改为 #!/usr/bin/python2.7
在安装软件的时候又会报错误
vi /usr/libexec/urlgrabber-ext-down
#!/usr/bin/python 修改为#!/usr/bin/python2.7
```

这一步看具体情况，有些不需要有些需要，执行软连替换有些就直接可以生效，例如我的做完软连直接自动替换过来。
![在这里插入图片描述](D:\Docs\Server\assets\20201124003803971.png#pic_center)