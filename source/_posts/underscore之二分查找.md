---
title: '''underscore算法之二分查找"'''
date: 2020-03-26 10:00:00
comments: true
type: "underscore"
tags:
     - underscore.js
brief: "async"
reward: true
---
## 二分查找
> 最近一直在看underscore.js, 刚好有看到我比较感兴趣的地方, 里面涉及到了二分查找, 索性拿出来记录下。

## underscore.js之sortedIndex
```js
_.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };
```
## 介绍
**二分查找关键在于首先要保证要查找的元素是(有序的, 数组)！！**
二分查找比平常的按照顺序的方式查找效率更高(不用对去全部的元素进行遍历), 二分查找是选取一个中间值一分为二, 对中间值跟要查找的元素比对来决定向左或者向右查找, 如果当前值小于查找元素, 则向右查找, 当前值大于或者等于查找元素, 则向左查找。
直到条件不满足 => 返回
## 举例子
```js 
  var sortArr = [1, 2, 5, 10, 12]
  查找元素是 8
  var low = 0 初始值
  let high = sortArr.length
  while(low < high) 循环执行直到条件不满足
  while内进行一分为二, 
  向下取整获取中间值, let mid = Math.floor((low + high) / 2) mid = 2
  sortArr(mid) => 5
  条件判断(sortArr(mid) < 进行查找的元素 => 8) 
  执行三遍
  第一遍 5 < 8 low = 3
  第二遍 12 < 8 high = 4
  第三遍 10 < 8 high = 3
  最后 返回 所在位置
```

