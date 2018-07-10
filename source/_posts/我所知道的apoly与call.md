---
title: '''我所知道的apply与call'''
date: 2018-06-13 14:24:00
comments: true
type: "Javascript"
tags:
     - js
     - 方法
brief: "async"
reward: true
---
<!--more-->
##  我所知道的apply与call
  > 在我打算写这篇文章之前我徘徊了两分钟(没错就是两分钟), 徘徊的原因是我觉得以我当前的对于`js儿子-call与apply`的掌握, 还不足以我能够很好的去解释给自己或者读者去听, 尤其是在看了一些书里面讲到了很多关于apply与call的妙用. 很神奇没有想到还能这么用. 但写了这篇文章的一个原因是我蛮久没有写了博客, 也该写了(尽力微笑...). 另一个原因是我想通过我的角度去说下我对于apply和call的看法. 其实在刚刚认识call或者apply的时候, 我在想这两个货是到底干嘛的, 在没有认识他们之前, 我也完成了某些功能的开发呀, 这两个货色的作用到底是什么, 我觉得我有必要去好好了解下. 
##  开始认识call与apply
  我打开了熟悉的`mdn`恩, 他好像挂了. 算了我用手机打开吧. 其中描述中这样的说道: 可以让call或者apply中的对象调用当前
  对象所有的function. 你可以使用call()来实现继承: 写一个方法, 然后让另一个新的对象来继承它(而不是在新对象中再写一次这个方法). 
  难道是这样: 

    ```js
      var foo = {
        name: 'wangdaye',
        showName: function () {
          console.log(this.name);
        }
      }
      var bar = {
        name: 'liayi'
      }
      foo.showName.call(bar);
    ```
    我觉得这个栗子(栗子是我抄的_-_), 想表达的其实和上面描述里面提到的, 其实是一回事, 我觉得是这样, `bar`这个人想看下自己家的房产证名字写的是谁的, 但是没有梯子, 因为房产证放在需要梯子才能够到的地方, 所以他问了邻居foo, 嘿我用下你家梯子(showNmae方法), 行用吧, 然后就看到了自己的房产证是"老婆的名字". 大概的的意思是, bar这个家伙没有自己方法, 但是他又想用, 怎么办那就借用了foo的方法. 就是这样. 
##  apply与apply的异同
  同: `apply`与`call` 方法的第一个参数是在运行指定的`this`值. 需要注意的是, 指定的`this`值并不一定是该函数执行时真正的`this`值, 如果这个函数的处于非严格模式下, 则指定为`null`与`undefined`的`this`值会自动指向全局对象(浏览器中就是`window`对象), 同时值为原始值(数字, 字符串, 布尔值)的`this`会指向该原始值的自动包装对象.
  关于这句话, 我再举个栗子: 
  ```js
    var max = Math.max.apply(null,array)
  ```
  我在稍微说下: 这个栗子就很好的解释了上面提到的如果`apply`或者`call`的第一个参数, 我传递了`null`或者`undefined`那么这个时候`this`的指的就是上面提到的`window`, 而`window`里面有`Math.max`.
  再举个栗子: 
  
  异: `call`参数是这样的形式(this, num1, num2, ....)
      `apply`参数是这样的形式(this, []) 
