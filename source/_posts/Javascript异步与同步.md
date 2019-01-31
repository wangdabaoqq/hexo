---
title: '''Javascript异步与同步'''
date: 2018-04-23 14:24:00
comments: true
type: "Javascript"
tags:
     - js
     - 事件
brief: "async"
reward: true
---
<!--more-->
## Javascipt异步与同步
  > 我们都知道Javascript语言执行环境是`单线程`的,所谓`单线程`在程序执行时,按照前面先执行,后面再去执行的顺序,也就是所谓的先进先出。但是这样一来,如果某个任务的执行时间很久,那么后面的所有任务都要去等着前面任务执行完毕。可能会出现浏览器卡死。作为浏览器语言,Javascript的主要用途是与用户互动,以及操作DOM。

  在开始之前我还是要明确下何为异步,何为同步。
  举个栗子：
  ```js
  console.log('同步1')
  console.log('同步2')
  ```
  按照的JavaScript语言执行顺序,最终的打印顺序为`同步1`然后`同步2`。
  栗子2：
  ```js
  setTimeout(function() {
    console.log('完成')
  }, 0);
  console.log('结束')
  ```
  我们都知道setTimeout是起到延迟器的作用,那么这里他的执行打印顺序为结束-完成。
  这里可能有些迷惑,setTimeout不是0吗?为什么会是这样的打印结果。这里涉及到了一个关键词
  `Event Loop`关于这个关键词目前我太不适于去讲。以后单开一篇文章,单独去讲。
  这里我简单说下原理,我理解是这样的,javascript是单线程也是主线程,当出现异步操作时,它会等待主线程完成。然后进入。那么这时要等待执行console.log('结束'),然后再去执行setTimeout。  

  我在使用jquery ajax异步请求时面临到了这样一个问题：  
  ```html
   <div id="content">
  ```
  ```js
  var ccc = $("#content")
  $.ajax({
    url: 'https://cnodejs.org/api/v1/topics',
    type: 'GET',
    dataType: 'json',
    success: function(res) {
      ccc.html(res.data[0].content);
    }
  })
  var con = $("#con")
  con.click(function(){
    console.log();
  });
  ```
  这种情况下我想给返回的数据里的某个id为con的添加点击事件,这种情况下肯定是会报错了,原因是`jquery-ajax`默认是异步的,哪这种情况下当执行到获取dom元素时,是获取不到的,因为ajax的没有执行。
  我想到的解决办法是:
  + 改为同步(把`async`: `false`)这样的话,就会按照顺序执行,从而获取到id为con的dom元素。可是这样又会面临一个问题: `阻塞`,如果返回的数据量很大的情况下,就会一直等待数据的返回,导致页面的卡顿。 哪有没有即是异步又可以获取dom的元素的呢。下面说第二种方法:

  +  jquery中有如下事件可以实现:
      - on
      - delegate
      - bind
      - live(最新jquery已删除)
      ##### 其中只测试了bind与on事件(如有其他需要请自行测试)  
      ```js
      $('#content').on('click','#con',function() {
        console.log('成功获取#con')
      });
      ```
  + 如果我不想使用jquey的on或者其他事件,我可以实现吗？答案是当然可以。我查了下jquery的on的实现,提到了两个关键词`事件代理`或`事件委托`。当然上面的事件用的是事件委托。关于事件委托我简单说下:
  事件委托就是利用了事件冒泡的原理。举个栗子:  

  ```html
    <ul id="ul1">
      <li>111</li>
      <li>222</li>
      <li>333</li>
      <li>444</li>
    </ul>
  ```

  ```js
  window.onload = function(){
    var oUl = document.getElementById("ul1");
    oUl.onclick = function(ev) {
      var ev = ev || window.event;
      var target = ev.target || ev.srcElement;
      if (target.nodeName.toLowerCase() == 'li') {
        alert(target.innerHTML);  
      }  
    }
  }
  ```

  简单的就是这样,我会再开一篇关于事件的文章。更系统的说下关于js的事件。  
  其实关于异步我觉得更多的关注点还是要放在Event Loop上。如果你能够明白Event Loop
  那么异步也就不在话下。  
  这篇文章就到这了。

