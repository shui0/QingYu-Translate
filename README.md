# QingYu-Translate
一款pc端实时翻译软件

## 主要模块
- get_img: 主模块，获取翻译窗口图片，翻译图片，保存翻译结果图片到本地
- uniapp-vue: 以app方式发送到移动端数据(uniapp)
- show： 开启本地服务器(node.js)

## 安装环境
(PC端)
1. 安装python 
2. 安装node.js
3. 安装uniapp
4. 安装winspy
5. 进入get_img文件夹，python运行

 ``pip install -r requirements.txt``

(移动端)
1. 安装app


## 运行程序：
1. 开放电脑8080端口（推荐）或关闭防火墙（不推荐）
2. 进入show文件夹，终端输入`node app.js`
3. 进入get_img文件夹,运行`start.py`
4. 手机开启热点，电脑连接手机的热点
5. 终端输入ipconfig获取电脑ipv4地址
6. 打开手机app,输入电脑ipv4地址,点击start开始使用

## 软件使用方法
1. 登录网易有道官网，注册账号(会有50元体验金)，申请网易有道图片翻译api翻译
2. 点击输入密钥，在软件上填写密钥
3. 使用winspy获取你要翻译的窗口信息(title和class)
4. 点击新建翻译窗口，填写窗口信息(title和class)
5. 选择你要翻译的窗口
6. 点击开始翻译


## 要求：
- nodejs版本 >= 16.0.0
- uniapp版本 >= 3.6.0
- python版本 >= 3.10.0

## 项目进度
目前使用网易有道api进行翻译功能的实现，后续还会添加其他api，并使用自己的翻译模型,如果对本项目有建议，请联系qq2156856355


## 项目地址
[github](https://github.com/shui0/QingYu-Translate)


## 开发者

| ----------- | ----------- | ----------- |
 |开发者:|shui0 |supercpq |
 |profile:|[github(shui0)](https://github.com/shui0)| [github(supercpq)](https://github.com/supercpq)|
 |qq:|2156856355| 2962285639|
 |blog:|[shui0.top](shui0.top)| [掘金](https://juejin.cn/user/3171425354782893/posts)|

- 待补充
