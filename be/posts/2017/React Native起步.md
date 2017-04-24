### 前言

本文主要记录跟着React Native官网教程搭建环境过程中遇到的一些坑，开发平台为windows，React Native版本为0.43


---
### Android Studio

官网要求Android Studio 2.0 or higher。目前最新版本为2.3，但此处存在一个问题，就是在2.3版本中Android SDK Manager被取消了
![Android SDK Manager](http://oor6ix2xo.bkt.clouddn.com/RNSTART-1.PNG)
目前大部分代理设置都是对Android SDK Manager进行设置，所以为了安装方便，建议安装版本2.2.3

### Genymotion
模拟器我选择的是Genymotion，Genymotion需要依赖VirtualBox虚拟机，下载要注意选择包含VirtualBox
选择Android 6.0-API 23模拟器
![Genymotion](http://oor6ix2xo.bkt.clouddn.com/RNSTART-5.PNG)

### 初始化
#### 无法连接开发服务器
![bug](http://oor6ix2xo.bkt.clouddn.com/RNSTART-%202.PNG)
#### 解决方法
* 确保模拟器wifi打开，与电脑处在相同局域网内
* 在模拟器开发者菜单修改IP和端口
 1. F1或ctrl+M打开开发者菜单
 2. 打开Dev Settings
 3. 打开Debug server host & port for device
 4. 填写本机IP，端口默认为8081，具体可查看react包管理器
![port](http://oor6ix2xo.bkt.clouddn.com/RNSTART-3.PNG)

---
### 最后
![Hello](http://oor6ix2xo.bkt.clouddn.com/RNSTART-4.PNG)
之后会进行实际案例的开发。

