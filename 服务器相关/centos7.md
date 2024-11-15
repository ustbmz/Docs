# 1. 备份当前的yum源配置文件
sudo cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

# 2. 下载新的CentOS官方源配置文件
# 如果是CentOS 7
sudo curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.163.com/.help/CentOS7-Base-163.repo
# 或者如果是CentOS 8
sudo curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.163.com/.help/CentOS8-Base-163.repo

# 3. 清理缓存并生成新的缓存
sudo yum clean all
sudo yum makecache

# 4. 可以尝试更新系统
sudo yum update