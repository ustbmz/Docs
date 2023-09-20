## Git基础命令

### 常见的git平台

* gitlab
* github
* gitea
* gitee

### git 基础命令

```shell
查看本地镜像git状态
> git -status

克隆一个git仓库
> git clone git@gitAddress.git
相当于同时执行了
> git init & git remove & git pull

拉取远程git仓库，更新代码并比较，如果有冲突提示
> git pull
> git merge

提交代码
> git add
错误提交后回退,gitlog查看提交日志,通过hash值回退
> git reset
回退至 22c73c git版本
> git reset --hard 22c7f3c
> get checkout

提交至本地仓库
> git commit -m 'init project'

修改提交信息
> git commit --amend
:wq 修改完后保存退出

新建分支
> git remote add oraign git@gitAddress.get

查看所有分支
> git remote -v


查看git提交日志
> git log
查看git所有提交日志(包含回退版本记录、分支日志)
> git reflog

查看git全局配置 & 配置用户名邮箱
> git config --global --list
> git config --global user.name 'ustbmz'
> git config --global user.email 'ustbmz@163.com'


查看当前分支
> git branch
创建分支dev
> git branch dev
切换分支
> git checkout dev
创建并切换至dev分支
> git checkout -b dev


暂时不提交当前diff ，加入缓存
stash &&apply
> git stash
取出缓存
> git stash apply


```

> #### 如何修改提交中包含需要忽略的文件
```
删除当前所有缓存文件
> git rm --cached -r .
编辑 .gitignore 添加忽略文件目录
重新add提交即可
> git add .
```

####  

>  创建一个新的git项目并初始化

```
echo "# git" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:ustbmz/git.git
git push -u origin master
```

>  添加一个已经存在的git项目

```
git remote add origin git@github.com:ustbmz/git.git
git push -u origin master
```

## Git Flow

* ####  上游分支向下游发展

  > Master --> PRE-Production  --> Production

  Bug -->  new Brunch --> Master --> pre branch  --> target branch



* ####  Master分支为主,主要玩master,production上合并

  > master -- Stable  -- new Branch  -- bug fix  --  Version

### Git常用命令

```
拉取远程仓库代码
> git pull origin dev

查看远程dev分支有哪儿些更新
此命令不会把有冲突的代码拉取到本地
> git fetch origin dev
合并有冲突的代码
> git merge FETCH_HEAD
查看当前dev分支与远程仓库feature的更新区别
> git fetch origin feature:dev


合并dev1分支至当前dev分支
> git merge dev1

回退至上一次提交
> git reset --hard head^
> git reset --hard head~1
回退至某个版本
> git reset --hard [hashValue]

给当前的提交打上版本号
> git tag v1.0.0
推送tag
> git push origin master --tags
删除远程仓库tags
> git push origin :refs/tags/v1.0.0
删除本地tag
> git tag -d v1.0.0
查看本地所有tags
> git tag --list

删除本地dev1分支
> git branch -D dev1
删除远程分支dev1
> git push origin :dev1

抛弃add但未commit的文件
> git reset HEAD [filename]
抛弃add但未commit的所有文件 !谨慎使用，会抛弃所有未提交的文件
> git reset --hard head

```

### Git合并多次提交

* 合并之前的3次提交

  ```
  > git add .
  > git commit -m ''
  
  合并之前的三次提交
  > git rebase -i head~3
  ```

* 修改 git-rebase-todo文件 (

  > pick 为选中的合并版本, s 合并的版本

  ```
  pick 9b69a0f bug config fixs3
  s b634f5c git merge master
  s 47adc84 git merge master
  
  # Rebase db22ccc..47adc84 onto db22ccc (3 commands)
  #
  # Commands:
  # p, pick <commit> = use commit
  # r, reword <commit> = use commit, but edit the commit message
  # e, edit <commit> = use commit, but stop for amending
  # s, squash <commit> = use commit, but meld into previous commit
  # f, fixup <commit> = like "squash", but discard this commit's log message
  # x, exec <command> = run command (the rest of the line) using shell
  # b, break = stop here (continue rebase later with 'git rebase --continue')
  # d, drop <commit> = remove commit
  # l, label <label> = label current HEAD with a name
  # t, reset <label> = reset HEAD to a label
  # m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
  # .       create a merge commit using the original merge commit's
  # .       message (or the oneline, if no original merge commit was
  # .       specified). Use -c <commit> to reword the commit message.
  #
  # These lines can be re-ordered; they are executed from top to bottom.
  #
  # If you remove a line here THAT COMMIT WILL BE LOST.
  #
  # However, if you remove everything, the rebase will be aborted.
  #
  ```

* push 记录

  ```
  > git push origin circleci-project-steup
  ```

### branch创建原则

* 按需创建
* 重要版本管理
* 学会使用tags




### 将开发分支代码合入到master中

```
git checkout dev           #切换到dev开发分支
git pull
git checkout master
git merge dev              #合并dev分支到master上
git push origin master     #将代码推到master上
```

 merge方法：保证主干提交线干净(可以安全回溯)

```
git checkout master
git pull
git checkout dev
git merge master
git pull origin dev
```




## Git配置多个SSH-Key

[SSH Key](https://gitee.com/help/labels/19)

#### 背景

当有多个git账号时，比如：

a. 一个gitee，用于公司内部的工作开发；
b. 一个github，用于自己进行一些开发活动；

#### 解决方法

1. 生成一个公司用的SSH-Key

```
$ ssh-keygen -t rsa -C 'cnmz@msn.com' -f ~/.ssh/gitee_id_rsa
```

1. 生成一个github用的SSH-Key

```
$ ssh-keygen -t rsa -C 'cnmz@msn.com' -f ~/.ssh/github_id_rsa
```

1. 在  目录下新建一个config文件，添加如下内容（其中Host和HostName填写git服务器的域名，IdentityFile指定私钥的路径）

```
# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitee_id_rsa
# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_id_rsa
```

4.用ssh命令分别测试

```
$ ssh -T git@gitee.com
$ ssh -T git@github.com
```

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCrRpSN29UGKCXWvZPYzVUyMj+dwuYtV3lK42TQuCMn4HMZrTc8TXCEBcf9DcQnCDvt/JlLHfWCDO+J10OHH/gbU8ccRi1L67amkii8JqeWK7mOLtziNgWRWAF/vntlvtSx1pRu0/vzBpuxjvxTvuAwHPlf7jOAjy0bC9xqhbzNYr8vi6qWRaoI4yMDNFTore9NQBWr9XYM0Zwv/zq7my+QIKNmu3zeuqRgi+lPkrgQv/ESXIsCC+sg/BvCb0BWvnRhjrmgPPFd4XOW3vo2kt26Z5FOb2YVP0/q9NokGN9y8PT38NynOYilPJPtdoxRMR632TASztb8oWDz8aY01sy8OvAc8f9jeNvhqiEaGkMtA9hAUJJXaj+JseYiv8sC4hLxGGeSsMjuLsuUMMMKZZ80KUOOWl5+i+hrU94dlG8Ro0PlGpXy11diu/V+Vnvk2tr0+KOvbIueV1WQEfGaz34c2ceJhAcpTeyWwmJsnFMJBlcaSnnDeiFNFTtLrJGX/Tk= cnmz@msn.com

```





这里以gitee为例，成功的话会返回下图内容

![输入图片说明](https://images.gitee.com/uploads/images/2018/0921/161137_b71ef6be_967230.png)



## Git pull的完整语法格式是：

```javascript
$ git pull <远程库名> <远程分支名>:<本地分支名>
```

默认情况下，如果我们的本地分支名与远程分支名是一样的，且已经建立追踪，直接使用

```javas
$ git pull
```

如果本地分支名与远程分支名是不一样的，例如：

```javascript
$ git pull origin master
```

上面就是从将master分支代码拉取到我本地分支



## Git拉取远程分支到本地

### 步骤：

```shell
#查看远程分支
$ git branch -r
#查看本地分支
$ git branch
#拉取远程分支
$ git checkout -b 本地分支 origin/远程分支
#拉取远程分支
$ git pull origin 远程分支
#建立分支
$ git branch --set-upstream-to origin/远程分支名 本地分支名
#拉取分支git pull
#遇到本地冲突，先删除本地分支，再重新拉取远程分支
$ git branch -D 本地分支名称
```

### 一、查看远程分支

使用如下git命令查看所有远程分支：

```
git branch -r
```

### 二、拉取远程分支并创建本地分支

#### 方法一

使用如下命令：

```
git checkout -b 本地分支名x origin/远程分支名x
```

使用该方式会在本地新建分支x，并自动切换到该本地分支x。

> 采用此种方法建立的本地分支会和远程分支建立映射关系。

#### 方式二

使用如下命令：

```
git fetch origin 远程分支名x:本地分支名x
```

使用该方式会在本地新建分支x，但是不会自动切换到该本地分支x，需要手动checkout。

> 采用此种方法建立的本地分支不会和远程分支建立映射关系。

### 三、本地分支和远程分支建立映射关系的作用

```
git branch --set-upstream-to origin/远程分支名  本地分支名
```

### 四、切换分支

```
git checkout 本地分支名
```

### 五、合并分支

```
git merge 本地分支名称
```





## Git 标签上线版本管理

### 创建标签

在 Git 中创建附注标签十分简单。 最简单的方式是当你在运行 `tag` 命令时指定 `-a` 选项：

```shell
## 创建标签
$ git tag -a v1.0.0 -m "初始化上线版本 v1.0.0"

## 查看管理标签
$ git tag
v0.1
v1.4
```

通过使用 `git show` 命令可以看到标签信息和与之对应的提交信息：

```shell
## 显示具体标签内容
$ git show v1.4
tag v1.4
```

### 删除标签

要删除掉你本地仓库上的标签，可以使用命令 `git tag -d <tagname>`。 例如，可以使用以下命令删除一个轻量标签：

```shell
$ git tag -d v1.4-lw
Deleted tag 'v1.4-lw' (was e7d5add)
```

注意上述命令并不会从任何远程仓库中移除这个标签，你必须用 `git push <remote> :refs/tags/<tagname>` 来更新你的远程仓库：

第一种变体是 `git push <remote> :refs/tags/<tagname>` ：

```shell
$ git push origin :refs/tags/v1.4-lw
To /git@github.com:schacon/simplegit.git
 - [deleted]         v1.4-lw
```

上面这种操作的含义是，将冒号前面的空值推送到远程标签名，从而高效地删除它。

第二种更直观的删除远程标签的方式是：

```shell
$ git push origin --delete <tagname>
```

### 根据标签创建新分支

```shell
$ git branch newbranch v1.0.0
```

当前代码版本切换至标签代码

```
$ git checkout -d v1.0.0
```



# 将本地已有项目添加到git仓库

由于历史原因，我们往往会先创建好一个项目，然后再有git仓库地址，这时候就需要我们将本地的项目添加到git仓库

1、先进入项目根目录

> $ git init

  

2、添加远程git仓库地址

> $ git remote add origin [git@gitee.com](mailto:git@gitee.com):yourusername/yourproject.git

  

3、先将远程git仓库拉到本地

> $ git pull  
> 这一步有可能会需要你设置一下  
> git branch --set-upstream-to=origin/<branch> master

  

4、再将代码添加到本地git

> $ git add .

  

5、将代码提交到本地代码库

> $ git commit -m "xxxx"

  

6、最后将本地git推到远程上

> $ git push origin master



### Git仓库管理忽略 DS_Store 文件

作为一名使用Mac的开发者，在日常开发过程中，经常会使用Git来对代码文件夹进行版本控制。而在默认情况下，Git会把 DS_Store 文件带入版本控制的范围内。所以，可以手动将其踏入 Git 的版本管理忽略列表。

1. 将 . DS_Store 加入全局的 .gitignore 文件，执行命令：

```text
echo .DS_Store >> ~/.gitignore_global
```

2. 将这个全局的 .gitignore 文件加入Git的全局config文件中，执行命令：

```text
git config --global core.excludesfile ~/.gitignore_global
```

哦了，. DS_Store 再也不会出现在你项目的Git代码仓库中了！
