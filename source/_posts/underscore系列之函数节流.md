---
title: '''underscore系列之throttle"'''
date: 2018-07-25 19:37:00
comments: true
type: "underscore"
tags:
     - underscore.js
brief: "async"
reward: true
---
##  underscore函数节流
<!--more-->
### 前言
>  在说underscore函数节流之前, 还是明确概念, 什么是函数节流。函数节流简单来说就是`'开源节流'`, 什么意思呢？就是减少某个函数调用的太频繁, 降低频次。一般来讲, 对于dom的频繁操作会引起浏览器的重绘或者重排, 这个时候我们就可以来使用节流不要让他过快的操作dom, 从而页面渲染起来也会更加流畅。
  举个场景: dom元素的移动与拖拽, 我默认都做过这个功能。对于dom元素的频繁拖拽, 对于一些性能不太好的浏览器(说的就是你`IE`)会有很大的损耗, 这个时候我们就可以适当的去降低这个事件的调用频次。 当然调用的频次也要有一个合适的阈值。不然也会引出意外的问题。。。
##  underscore函数throttle
  上面提到了函数调用频次, 这个频次也就是调用时间, 所以在underscore中关于throttle函数是基于定时器与时间差来调用函数运行的频次。还有就是throttle函数接收三个参数, 关于最后一个参数我到最后再讲。
  我们看下源码: 
  ```js
  var now = Date.now || function() {
    return new Date().getTime();
  };
  var throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    var throttled = function() {
      var now = this.now();
      if (!previous && options.leading === false) previous = now;
      // console.log(previous)
      var remaining = wait - (now - previous);
      // console.log(remaining);
      // console.log(remaining)
      context = this;
      args = arguments;
      //  remaining > wait 表示客户端系统时间被调整过
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
          //  timeout = null设置为null，不仅仅是为了防止内存泄漏，而是clearTimeout(timeout)后，timeout的值并不会清空，如果不设置为null，就不能根据!timeout设置下次的timeout
        }
        previous = now;
        result = func.apply(context, args);
        // console.log(result)
        if (!timeout) context = args = null;  //  这里不太明白, timeout 不是已经赋值为null了吗
        //  context = args = null; 引用值为空, 防止内存泄露。
      } else if (!timeout && options.trailing !== false) {
        // console.log(remaining);
        timeout = setTimeout(later, remaining);
        // console.log(later, remaining)
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };
    var func = function () {
    console.log('wangdaye')
  }
  window.onscroll = throttle(func, 1000);
  ```
  我从自己的角度分析下: 首先滚动进入`throttle`函数携带两个参数, 函数内定义变量先不管, 直接说`throttled`函数, 首先要获取当前时间, 然后就是计算时间差, 当然第一次调用我们肯定是不希望要延迟加载, 所以变量remaining一定是负值, 获取最新时间戳, 然后调用函数。当连续调用时, 变量remaining是一个正值, 然后定时器延迟调用`later`方法, 刷新时间戳, timeout为null。当等待一秒钟再次调用时remaining为负值, 且已经存在timeout, 所以清空上一次定时器, timeout并为null。
  
  我再说说关于第三个参数, 第三个参数有两种调用方式, 第一种是, **{leading: false}**, 当传递的方式的为{leading: false}就会忽略scroll开始前的回调。第二种方式是, **{trailing: false}**, 当传递方式为{trailing: false}时, scroll结束时会被忽略。

  最后我还是希望可以**debugger**或者**console.log**下, 自己多去理解下, 我相信就会更加明白关于函数节流的知识点。
  就到这了。。。。

### 参考
  - [underscore 函数节流的实现-hanzichi](https://github.com/hanzichi/underscore-analysis/issues/22)
  - [浅谈javascript的函数节流](http://www.alloyteam.com/2012/11/javascript-throttle/)
  
