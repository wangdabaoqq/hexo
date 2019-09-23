---
title: '''this的值到底是什么？'''
date: 2018-03-02 13:54:48
comments: true
type: "this"
tags:
     - 关于this
reward: true
---
##  题目
  ```js
    var ob = {
      foo: function () {
        console.log(this);
      }
    }
    var bar = obj.foo;
    obj.foo();  //  打印的this为obj
    bar();  //  打印的this为window
  ```
  请解释最后两行函数的值为什么不一样。
<!--more-->
  初学者关于this的理解一直很模糊。今天这篇文章就要一次讲清楚了。
  而且这个解释, 你在别的地方看不到。看懂这篇文章, 所有关于this的面试题, 都是小菜。

##  函数调用
  首先需要从函数的调用开始讲起。
  JS(ES5)里面有这种函数调用形式:
  ```js
    func(p1, p2);
    obj.child.methods(p1, p2);
    func.call(context, p1, p2);
  ```
  一般, 初学者都知道前两种形式, 而且认为前两种形式优于第三种形式。
  从看到这篇文章起, 你一定要记住, 第三种调用形式, 才是正常调用形式:
  ```js
    func.call(context, p1, p2);
  ```
  其他两种形式都是语法糖, 可以等价地变为call形式:

  ```js
    func(p1, p2) 等价于
    func.call(undefined, p1, p2)
    obj.child.method(p1, p2) 等价于
    obj.child.method.call(obj.child, p1, p2);
  ```

  请记下来。(我们称次代码为转换代码, 方便下文引用)
  至此我们的函数调用只有一种形式:
  ```js
    func.call(context, p1, p2)
  ```
## this
this, 就是上面代码中的context。就这么简单。
this是你call一个函数时的context, 由于你从来不用call形式的函数调用,所以你一直不知道。
  
  ### 先看func(p1, p2)中的this如何确定:  
  当你写下面代码时
```js
  function func () {
    console.log(this);
  }
  func();
```
等价于
```js
  function func () {
    console.log(this);
  }
  func.call(undefined);
```
按理说打印出来的this应该就是undefined了吧, 但是浏览器里有一条规则:
如果你传的context就null或者undefined, 那么window对象就是默认的context(严格模式下默认context是undefined)
因此上面的打印结果是window。
如果你希望这里的this不是window, 很简单:
```
  func.call(obj)  //  那么里面的this就是obj对象了
```
再看obj.child.method(p1, p2)的this如何确定
```js
  var obj = {
    foo: function () {
      console.log(this)
    }
  }
  obj.foo()
```
按照转换代码, 我们将obj.foo()转换为
```
  obj.foo.call(obj)
```
好了, this就是obj。

回到题目
```js
  var obj = {
    foo: function () {
      console.log(this)
    }
  }
  var bar = ob.foo
  obj.foo(); 转换为obj.foo.call(obj) this就是obj
  bar() 转换为bar.call() 不传默认为undefined 所以指向window
```
##  总结
1. this 就是你 call 一个函数时，传入的 context。
2. 如果你的函数调用形式不是 call 形式，请按照「转换代码」将其转换为 call 形式。

转载自[掘金](https://juejin.im/post/5857dad461ff4b00686cf97a)
原作者`方应杭在饥人谷`
