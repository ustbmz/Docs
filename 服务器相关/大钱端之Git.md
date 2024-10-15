# Git基础

## Git 基础命令

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

#### 如何修改提交中包含需要忽略的文件

```
删除当前所有缓存文件
> git rm --cached -r .
编辑 .gitignore 添加忽略文件目录
重新add提交即可
> git add .
```

####  

#### 创建一个新的git项目并初始化

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



# 删除提交以及提交记录

在 Git 中，如果你想删除最近的三次提交，你可以使用以下步骤和命令。注意，这些命令会影响提交历史，因此在使用之前请确保你了解其作用，尤其是在公共分支上执行这些操作时，其他开发者可能已经基于这些提交做了工作。



### 方法1：使用 `git reset`（适用于本地仓库，强制修改历史）

1. 查看提交日志，找到你想保留的最后一个提交的哈希值：

   ```bash
   git log
   ```

   找到你想保留的最后一个提交（即第 4 个提交）的哈希值。

2. 重置到保留的提交：

   ```bash
   git reset --hard <保留的提交哈希值>
   ```

   例如，如果你想删除最近的三次提交，并保留倒数第 4 个提交的哈希值是 `abc123`，你可以运行：

   ```bash
   git reset --hard abc123
   ```

   这将会删除最近的三次提交。

3. 如果你已经将这些提交推送到了远程仓库，你还需要强制推送修改：

   ```bash
   git push origin <分支名> --force
   ```

### 方法2：使用 `git rebase -i`（交互式删除特定提交）

1. 启动交互式 rebase：

   ```bash
   git rebase -i HEAD~4
   ```

   这个命令会打开一个交互式编辑器，其中会显示最近的 4 次提交（包括你要删除的 3 次提交和要保留的第 4 次提交）。

2. 在打开的编辑器中，找到你想要删除的 3 个提交，将其前面的 `pick` 改为 `drop` 或者直接删除对应的行。

3. 保存并退出编辑器。Git 会自动执行 rebase，删除那些提交。

4. 如果你已经推送到远程仓库，也需要强制推送：

   ```bash
   git push origin <分支名> --force
   ```

### 方法3：使用 `git revert`（适用于删除已经推送的提交，不破坏提交历史）

如果你想保留提交历史而不是删除提交记录，可以使用 `git revert`。

1. 回滚最近的三次提交：

   ```
   bash
   
   
   Copy code
   git revert HEAD~3..HEAD
   ```

   这会创建三个新的提交，分别逆转之前的三次提交，而不会修改提交历史。

2. 推送到远程仓库：

   ```
   bash
   
   
   Copy code
   git push origin <分支名>
   ```

------

这几种方法根据实际情况不同有所区别，`git reset --hard` 会完全删除提交，`git rebase -i` 可以交互式修改历史，而 `git revert` 则会保留历史但撤销更改。



## git commit后，如何撤销commit

```bash
$ git reset --soft HEAD^
```



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

```bash
$ ssh-keygen -t rsa -C 'cnmz@msn.com' -f ~/.ssh/gitee_id_rsa
```

1. 生成一个github用的SSH-Key

```bash
$ ssh-keygen -t rsa -C 'cnmz@msn.com' -f ~/.ssh/github_id_rsa
```

1. 在  目录下新建一个config文件，添加如下内容（其中Host和HostName填写git服务器的域名，IdentityFile指定私钥的路径）

```sh
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

```bash
$ ssh -T git@gitee.com
$ ssh -T git@github.com
```

## Git拉取远程分支到本地

#### 步骤：

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

#### 一、查看远程分支

使用如下git命令查看所有远程分支：

```
git branch -r
```

#### 二、拉取远程分支并创建本地分支

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

#### 创建标签

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

#### 删除标签

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

#### 根据标签创建新分支

```shell
$ git branch newbranch v1.0.0
```

当前代码版本切换至标签代码

```
$ git checkout -d v1.0.0
```



## 将本地已有项目添加到git仓库

由于历史原因，我们往往会先创建好一个项目，然后再有git仓库地址，这时候就需要我们将本地的项目添加到git仓库

1、先进入项目根目录

```bash
$ git init
```

2、添加远程git仓库地址

```bash
$ git remote add origin [git@gitee.com](mailto:git@gitee.com):yourusername/yourproject.git
```

3、先将远程git仓库拉到本地

```bash
$ git pull  
这一步有可能会需要你设置一下  
git branch --set-upstream-to=origin/<branch> master  
```

4、再将代码添加到本地git

```bash
$ git add .  
```

5、将代码提交到本地代码库

```bash
$ git commit -m "xxxx"
```

6、最后将本地git推到远程上

```bash
$ git push origin master
```





## Git仓库管理忽略 DS_Store 文件



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



