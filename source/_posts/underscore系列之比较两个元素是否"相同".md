---
title: '''underscore系列之比较两个元素是否"相同"'''
date: 2018-07-09 13:37:00
comments: true
type: "underscore"
tags:
     - underscore.js
brief: "async"
reward: true
---
![BlackCat](https://wangdabaoqq.github.io/hexo-back-up/assets/img/blackCat.jpg)
<!--more-->
##    比较两个元素是否相同
  ###   前言  
    > 之前就说过要读一下关于`underscore.js`的源码, 我就想先从某个函数开始读,  正好在github文章中(这里的文章我会在最后放上地址)提到了`underscore`中关于如何比较两个元素的是否相同, 我看完之后觉得很好玩。那么对于如何判断两个元素是否是相同呢？那么在什么程度上才算是相同, 举个例子: `1与1是相等的(当然他们前提是类型是一样的)`那么`1`和 `new Number(1)`也应该相等。
    underscore中有这么一个函数`_.isEqual`对没错, 就是这个。接下来我会以自己的知识来解释下, 这个函数的涉及的知识点。 如果有解释的不好的点, 请大家给我留言我一定改正。话不多说直接开始。
##  分析_.isEqual 
  ### Number类型判断 
  `console.log( _.isEqual(a, b));` 

  我首先在 `_.isEqual`中传入了两个参数a, b。首先明确两个概念: 其一是a, b都是基本类型, 那么两个基本类型的值相同。其二是两个是引用类型, 那么引用类型相同。如果a === b为true, 我们是否可以说a和b是相等的。但是这里有个特殊的就是0, -0。0与-0被浏览器认为是相等的。正确来讲0与-0是不相等的(关于这里我是看了文章里面有提到, 我在控制台打印了下, 发现很神奇)。关于这里`_.isEqual`这样处理的。
  ```js
    if (a === b) return a !== 0 || 1 / a === 1 / b;
  ```
  我理解是这样的: 这里过滤了99%情况, 但是没有过滤掉0与-0的情况。但是return里面如果a是0, 直接就return false结束。还有就是a如果为-0呢？第一个条件满足, 我们看第二个 `1 / a(-0) === -Infinity`而`1 / b(0) === Infinity`;所以第二个条件也不满足, 那么直接返回return false. ------游戏结束。上面这种判断处理就是针对0与-0这种情况。
  接下来就是 a !== b
  如果a或者b其中有一个为`null`或者是`undefined`特殊处理。
  ```js
    if (a === null || b === null) return a === b;
  ```
  文章中说这里的这里的判断条件有点多余, 因为根据上面的判断条件 a === b肯定返回false。关于这里我想了想也对, 如果a === b 直接在上面的判断条件哪里直接就返回了。 所以把return a === b 替换成 retun false, 会更加清晰吧。
  接下来用到了`Object.prototype.toString.call`, 如果判断的参数的类型不一样, 那么直接就返回return false。
  ```js
    var className = toString.call(a)
    if (className !== toString.call(b)) return false;
  ```
  如果a或者b都是Number类型, 但是这里又有一个特例就是`not a number`也就是`NaN`。这里我举个栗子: 
  `var number = new Number('s')`
  `var number2 = new Number('s');`
  `console.log(_.isEqual(number, number2));`
  这里的`number`与`number2`的值都是`Number{NaN}`,而且又都是`[object Number]`。 理应来讲`number`与`number2`应该是相等的, 因为都是NaN嘛。所以这里专门针对`NaN`的情况做了判断, 看case里的第一个判断条件: 如果+a不等于+a那么a就是NaN, 因为`NaN === NaN为false`。同理b也一样如果b为NaN那么返回为true。证明a, b相等(都为NaN)。如果+b === +b 返回false, 说明a, b不相等。
  下面的return这里又有一个特殊处理, 是关于0的。举个例子:
  `var s = new Number(-0);`
  `var a = new Number(0); `
  `console.log(_.isEqual(s, a));`
  首先上面已经说过了0 === -0为true, 所以第一个条件为false。正确。同理把-0换成1, 走第二个条件也是一样, 返回false, 很明显不相等。
  ```js
  case '[object Number]':
      // console.log('1')
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // console.log(+b !== +b);
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
  ```
关于对于Number类型的判断就到这里结束了。
### 正则RegExp和String类型判断
举个例子:
`var a = /a/;`
`var b = new RegExp('a')`
`consolo.log(_.isEqual(s, a));`
我们看下是如何处理这种情况的, 首先还是老样子判断属于什么类型, 发现是`RegExp`进入return 转换为字符串进行比较-也就是a与a进行比较为true。
`String`也一样, 
`var a = new String('s');`
`var b = new String('s');`
同上。
```js
case '[object RegExp]':
  // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
case '[object String]':
  // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
  // equivalent to `new String("5")`.
  return '' + a === '' + b;
```
### Date与Boolean类型判断
举个栗子: 
还是根据数据类型选择进入: 
`var a = new Date(1);`
`var b = 1`
这样进行判断就会发现通过使用`+new Date()`或者`+new Date`转换成1。这样就会发现返回true;
当然我觉得布尔类型也是如此, 
`var a = true;`
`var b = new Boolean(false);`
a为true, 我们也知道true == 1, true为布尔类型进入进行隐士类型转换, b也是如此, 如果相等返回true, 否则反之。
```js
  case '[object Date]':
  case '[object Boolean]':
    // Coerce dates and booleans to numeric primitive values. Dates are compared by their
    // millisecond representations. Note that invalid dates with millisecond representations
    // of `NaN` are not equivalent.
    return +a === +b;
```