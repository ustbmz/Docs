# Jenkins 安装及自动化部署



1 注释mirrorlist

```
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*.repo
```
2 指向baseurl至vault.epel.cloud存储库

```
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.epel.cloud|g' /etc/yum.repos.d/CentOS-*.repo
``````

3 升级系统至Centos 8.5

安装

```shell
$ wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo
$ rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
$ yum upgrade
$ yum install epel-release java-11-openjdk-devel
$ yum install jenkins
$ systemctl daemon-reload
```

### 启动

You can start the Jenkins service with the command:

```shell
$ systemctl start jenkins
```

You can check the status of the Jenkins service using the command:

```shell
$ systemctl status jenkins
```

If everything has been set up correctly, you should see an output like this:

```shell
Loaded: loaded (/etc/rc.d/init.d/jenkins; generated)
Active: active (running) since Tue 2018-11-13 16:19:01 +03; 4min 57s ago
...
```

|      | If you have a firewall installed, you must add Jenkins as an exception. You must change `YOURPORT` in the script below to the port you want to use. Port `8080` is the most common.`YOURPORT=8080 PERM="--permanent" SERV="$PERM --service=jenkins" firewall-cmd $PERM --new-service=jenkins firewall-cmd $SERV --set-short="Jenkins ports" firewall-cmd $SERV --set-description="Jenkins port exceptions" firewall-cmd $SERV --add-port=$YOURPORT/tcp firewall-cmd $PERM --add-service=jenkins firewall-cmd --zone=public --add-service=http --permanent firewall-cmd --reload` |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

## Post-installation setup wizard

After downloading, installing and running Jenkins using one of the procedures above, the post-installation setup wizard begins.

This setup wizard takes you through a few quick "one-off" steps to unlock Jenkins, customize it with plugins and create the first administrator user through which you can continue accessing Jenkins.

### Unlocking Jenkins

When you first access a new Jenkins instance, you are asked to unlock it using an automatically-generated password.

1. Browse to `http://localhost:8080` (or whichever port you configured for Jenkins when installing it) and wait until the **Unlock Jenkins** page appears.

   ![Unlock Jenkins page](https://www.jenkins.io/doc/book/resources/tutorials/setup-jenkins-01-unlock-jenkins-page.jpg)

2. From the Jenkins console log output, copy the automatically-generated alphanumeric password (between the 2 sets of asterisks).

   ![Copying initial admin password](https://www.jenkins.io/doc/book/resources/tutorials/setup-jenkins-02-copying-initial-admin-password.png)
   **Note:**

   - The command: `sudo cat /var/lib/jenkins/secrets/initialAdminPassword` will print the password at console.
   - If you are running Jenkins in Docker using the official `jenkins/jenkins` image you can use `sudo docker exec ${CONTAINER_ID or CONTAINER_NAME} cat /var/jenkins_home/secrets/initialAdminPassword` to print the password in the console without having to exec into the container.

3. On the **Unlock Jenkins** page, paste this password into the **Administrator password** field and click **Continue**.
   **Notes:**

   - You can always access the Jenkins console log from the Docker logs ([above](https://www.jenkins.io/doc/book/installing/linux/#accessing-the-jenkins-console-log-through-docker-logs)).
   - The Jenkins console log indicates the location (in the Jenkins home directory) where this password can also be obtained. This password must be entered in the setup wizard on new Jenkins installations before you can access Jenkins’s main UI. This password also serves as the default admininstrator account’s password (with username "admin") if you happen to skip the subsequent user-creation step in the setup wizard.

### Customizing Jenkins with plugins

After [unlocking Jenkins](https://www.jenkins.io/doc/book/installing/linux/#unlocking-jenkins), the **Customize Jenkins** page appears. Here you can install any number of useful plugins as part of your initial setup.

Click one of the two options shown:

- **Install suggested plugins** - to install the recommended set of plugins, which are based on most common use cases.
- **Select plugins to install** - to choose which set of plugins to initially install. When you first access the plugin selection page, the suggested plugins are selected by default.

|      | If you are not sure what plugins you need, choose **Install suggested plugins**. You can install (or remove) additional Jenkins plugins at a later point in time via the [**Manage Jenkins**](https://www.jenkins.io/doc/book/managing) > [**Manage Plugins**](https://www.jenkins.io/doc/book/managing/plugins/) page in Jenkins. |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

The setup wizard shows the progression of Jenkins being configured and your chosen set of Jenkins plugins being installed. This process may take a few minutes.

### Creating the first administrator user

Finally, after [customizing Jenkins with plugins](https://www.jenkins.io/doc/book/installing/linux/#customizing-jenkins-with-plugins), Jenkins asks you to create your first administrator user.

1. When the **Create First Admin User** page appears, specify the details for your administrator user in the respective fields and click **Save and Finish**.
2. When the **Jenkins is ready** page appears, click **Start using Jenkins**.
   **Notes:**
   - This page may indicate **Jenkins is almost ready!** instead and if so, click **Restart**.
   - If the page does not automatically refresh after a minute, use your web browser to refresh the page manually.
3. If required, log in to Jenkins with the credentials of the user you just created and you are ready to start using Jenkins!



## 更改 Jenkins 插件阿里更新源

插件管理 > 高级 

 ```shell
 https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
 ```

![image-20211118133719740](https://gitee.com/cnmz/images/raw/master/mdpic/202111181337837.png)





## 配置 Gitee hook 自动打包构建

### jenkins 安装 gitee 插件

![image-20211118131433919](https://gitee.com/cnmz/images/raw/master/mdpic/202111181314040.png)

### Gitee 设置中添加 私人令牌

> https://gitee.com/profile/personal_access_tokens

![](https://gitee.com/cnmz/images/raw/master/mdpic/202111181315622.png)

1. Jenkins 系统管理->系统配置->Gitee配置 添加Gitee(私人令牌)链接配置

   <img src="https://gitee.com/cnmz/images/raw/master/mdpic/202111181331658.png" alt="image-20211118133126522" style="zoom:50%;" />

2. **Jenkins 配置 项目构建**

   * **源码管理 选择 Git , 使用配置好的凭据**

   ![image-20211118132928834](https://gitee.com/cnmz/images/raw/master/mdpic/202111181329958.png)

   * **构建触发器 - 勾选Gitee webhook**

   ![image-20211118132516612](https://gitee.com/cnmz/images/raw/master/mdpic/202111181325687.png)

   * **生成webhook密码**

   ![屏幕截图 2021-11-18 132837](https://gitee.com/cnmz/images/raw/master/mdpic/202111181328986.png)

3. **Gitee 项目中 管理- webhook   填入生成的 url 及 webhook 密码**

4. **Jenkins 最后配置构建shell，完成触发后的打包编译发布**

   ```shell
   npx yarn
   npx yarn build
   
   rm -rf /usr/share/nginx/v3bbs/*
   cp -rf /var/lib/jenkins/workspace/front-dev/dist/* /usr/share/nginx/v3bbs/
   ```

5. **提交，测试是否可以成功挂起**