---
title: windows-ubuntu
date: 2017-6-29 13:30:48
tags:
	- 综合
	- 服务器
---
<!--more-->
前段时间从windows服务器换到了ubuntu服务器,讲道理ubuntu是真的比
windows好用,当然linux的也是类似的,没用过就不多BB,我强烈推荐一波,如果说你正好要买服务器,考虑下linux的系统的服务器,当然你说不会什么shell命令什么都没有关系,跟着视频撸一遍,这样下来新鲜感十足,如有神助。
可能我bb一通,还是觉得没有实例来的痛快,我说下我用的ubuntu的部署的node项目。之前我用的也是windows的服务器,windows服务器本身是没有什么问题的。(只是对我而言)在windows上我采用的是本地更改项目代码然后通过ftp或者qq邮箱(呵呵)但是这两种方式,无论是哪一种都要去远程连接服务器,然后去重启服务,我觉得很麻烦,登来登去的很烦,很偶然看到ubuntu可以通过pm2部署,这样我给大家看下我pm2的代码
<pre>
ecosystem.jsons  
{
	"apps":[{  
		"name":"xiaomo",    
		"script":"app.js",  
		"env":{
			"COMMON_VARIABLE":"true"
		},
		"env_production":{
			"NODE_ENV":"production"
		}
	}
	],
	"deploy":{
		"production":{
			"user":"wangdabao",
			"host":["47.94.153.153"],
			"ref":"origin/master",
			"repo":"git@git.oschina.net:wangdabaoqq/node-millet.git",
			"path":"/www/xiao/production",
			"ssh_options":"StrictHostKeyChecking=no",
			"post-deploy":"npm install --registry=https://registry.npm.taobao.org && pm2 startOrRestart ecosystem.json --env production",
			"env":{
				"NODE_ENV":"production"
			}
		}
	}
}
</pre>   
    
当然我也是按照pm2官网的进行的编写,具体里面代表的意思可以看下pm2官网的部署<a href="http://pm2.keymetrics.io/docs/usage/deployment/">http://pm2.keymetrics.io/docs/usage/deployment/</a>我也贴下链接,如果有兴趣的可以看下,当然这个必须要配合的是github或者是码云,coding等等我在这里也不说了,因为可以从上面的代码中看到我们的代码是从码云拉取的所以,到这里又有一个问题了私钥或者公钥,当然关于私钥和公钥是和git有关系的,如果你没有配置或者生成可以百度下非常简单,生成完以后要把私钥放到git或者码云的ssh上面,这样写完以后还要在服务器上添加私钥和公钥,一上弄完以后,我们就可以通过命令
<pre>
git add .
git commit -m 'update'
git push origin master
由于你是第一次使用所有要先
git remote add origin +上你的ssh或者https的git项目地址
第一次进行上传
pm2 deploy ecosystem.json production setup
以后每次都可以直接
pm2 deploy ecosystem.json production setup
</pre>
<pre>
<img src="https://qn.tyty.me/Screenshot.png">
</pre>
最后我推荐个慕课网上的一个视频叫<h3><a href="http://coding.imooc.com/class/95.html">Node.js项目的线上服务器部署与发布</a></h3><i style="font-weight:bold">看完以后你会有一个全新的了解与认识。</i>

<b style="font-size:14px; color:red;">↓↓
打下广告各位看官老爷们动动小手指给个start,我会继续努力让你们不喜欢的,先谢谢爸爸们,告辞.</b>
<h1><a href="https://github.com/wangdabaoqq/node-millet">传送门</a></h1>
