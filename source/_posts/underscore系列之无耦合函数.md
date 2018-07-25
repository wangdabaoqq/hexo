---
title: '''underscore系列之无耦合函数"'''
date: 2018-07-09 13:37:00
comments: true
type: "underscore"
tags:
     - underscore.js
brief: "async"
reward: true
---
![qingse](https://wangdabaoqq.github.io/hexo-back-up/assets/img/qingse.jpg)
<!--more-->
##  无耦合函数
> 无耦合函数: 叫无耦合函数可能不太准确, 之所以叫无耦合函数, 我想的是把underscore函数方法没有在其他函数中调用的方法, 所以就先暂时叫无耦合函数. 如果这样理解我在订正.

##  判断传入的参数是否为数组
```js
  //  当如果支持es5时, 采用Array.isArray。反之采用第二次。
  var isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  }
```
### 判断为DOM元素
```js
  var isElement = function (obj) {
    //  当obj为undefined或者null或者为空是, 转换为false返回。
    //  nodeType === 1时代表为一个元素节点如`<p></p>`和`<div></div>`
    return !!(obj && obj.nodeType === 1);
  }
```
