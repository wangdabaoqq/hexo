---
title: '''Javascript数组方法(ES5-ES6)'''
date: 2017-9-20 22:30:12
comments: true
type: "Array"
tags:
     - javascript
     - Array方法
brief: "ES5-ES6"
reward: true
---
## join() ES5
join(speparator):将数组的元素组起一个字符串,spearator为分隔符,省略的话则用默认用逗号为分隔符,该方法只接收一个参数,即分隔符。
<!--more-->
```js
  var arr = [1,2,3];
  console.log(arr.join());
  console.log(arr.join('-'));
  console.log(arr);
```
通过join()方法可以重复字符串,只需传入字符串以及重复的次数,就能返回重复后的字符串,函数如下:
```js
function repeatString(str, n) {
  console.log(new Array(n + 1).join(str));
  return new Array(n + 1).join(str);
};
console.log(repeatString('abc', 3)); // abcabcabc
```

## push()和pop() ES5

push()：可以接收任意数量的参数，把他们逐个添加到数组末尾,并返回修改后数组的长度。
pop()：数组末尾移除最后,减少数组的length值,然后返回移除的项。
```js
var arr = ['mi', 'to', 'you'];
var count = arr.push('yao');
console.log(count);
console.log(arr);
var sd = arr.pop();
console.log(sd);
console.log(arr);
```

## shift()和unshift()

shift(): 删除原数组第一项,并返回删除元素的值,如果数组为空则返回undefind.
unshift():将参数添加到原数组开头,并返回数组的长度。
```js
var arr = ['ss', 'll', 'tt'];
var cc = arr.unshift('cc');
console.log(cc);
console.log(arr);
var ii = arr.shift();
console.log(ii);
console.log(arr);
```

## sort()

sort():按照升序数组项-即最小的值位于最前面,最大的值排在最后面。
在排序时,sort()方法会调用每个数组项的toString()转型方法,然后比较得到的字符串,以确定如何排序。即使数组中的每一项都是数值,sort()方法比较的也是字符串,因此会出现一下情况:
```js
var arr = ['a', 'b', 'c'];
console.log(arr.sort());
var arr1 = [2, 3, 7, 8];
console.log(arr1.sort());
console.log(arr1); // 原数组被改变
```

为了解决上述问题,sort()可以接收一个比较函数作为参数,以便我们指定哪个值位于哪个值的前面。比较函数接收两个参数,如果第一个参数应该位于第二个之前则返回一个负数,如果两个参数相等则返回0,如果第一个参数位于第二个之后则返回一个正数。
升序：
```js
function compare (value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
};
var arr2 = [23, 34, 37, 333];
console.log(arr2.sort(compare));
```
降序：
```js
function compare (value1, value2) {
  if (value1 < value2) {
    return 1;
  } else if (value1 > value2) {
    return -1;
  } else {
    return 0;
  }
};
var arr = [89, 23, 45, 99];
console.log(arr.sort(compare));
```

## reverse()

reserve():反转数组项的顺序
```js
var arr = [12, 34, 546, 333];
console.log(arr.reverse());
console.log(arr);   //  原数组改变
```

## concat()

concat()：将参数添加到原数组中。这个方法会先创建当前数组的一个副本,然后将接收到的参数添加这个副本的末尾,最后返回新构建的数组。在没有concat()方法传递参数的情况下,它只是复制当前数组并返回副本。
```js
var arr = [1, 5, 9];
var ss = arr.concat(98, [23, 78]);
console.log(ss);
console.log(arr);   //  原数组未改变
```
传入的不是数组,则直接把参数添加到原数组的后面,传入的数组也是添加到原数组的后面。
传入的二维数组？
```js
var cv = arr.concat([0, [11, 89]]);
console.log(cv);  //  [1, 5, 9, 0, [11, 89]];
console.log(cv[4]); //  [11, 89]
```

上述代码中,cv的第4项是一个包含两项的数组,也就是说concat方法只能将传入数组中的每一项添加到数组中,如果传入数组中有些项是数组,那么也会把这一数组项当作一项添加到cv中。

## slice()

slice(): 返回从原数组中指定开始下标和结束下标之间的项组成的新数组。slice()方法可以接受一或两个参数,即要返回项的起始和结束位置。在只有一个参数的情况下,slice()方法返回从该参数指定位置开始到当前数组的末尾的所有项,如果有两个参数,该方法返回起始位置和结束位置之间的项-但不包括结束的位置的项。
```js
var arr = [1, 3, 4, 90, 81];
var count = arr.slice(1);
console.log(count);
var count1 = arr.slice(1, 4);
console.log(count1);
var count2 = arr.slice(1, -2);
console.log(count2);
var count3 = arr.slice(-2, -1);
console.log(count3);
```
count只设置了一个参数,也就是起始下标为1,所以返回的数组为下标,(包括下标)开始到数组的最后。

count2只设置了两个参数,返回起始下标(包括1)开始到终止下标(不包括4)。

count3只设置了两个参数,终止下标为负数,当出现负数时,将负数加上数组的长度的值(5)来替换该位置的数,因此就是1开始到3。
count4中两个参数都是负数,所以都加上数组的长度5转换成正数,因此相当于slice(3, 4);

##  splice()

splice()：很强大的数组方法,它有很多用法,可以实现删除，插入和替换。

删除：可以删除任意数量的项,它只需指定两个参数,要删除的第一项的位置和要删除的项数,例如,splice(0, 2)会删除数组中的前两项。

插入:可以向指定位置插入任意数量的项,只需提供两个参数：其实位置,0(要删除的项数)和要插入的项。例如,splice(2, 0, 4, 6)会从当前的位置2开始插入4和6。

替换:可以向指定位置插入任意数量的项,且同时删除任意数量的项,只需指定3个参数,起始位置,要删除的项数和要插入的任意数量的项,插入的项数不必与删除的项数相等。例如,splice(2, 1, 4, 6)会删除当前数组位置2的项,然后再从位置2开始插入4和6.
splice()方法始终都会返回一个数组,该数组中包含从原始数组中删除的项, 如果没有删除任何项,则返回一个空数值。

```js
var arr = [1, 3, 4, 9, 90, 45];
var ss = arr.splice(0, 2);
console.log(arr);
console.log(ss);
var ss1 = arr.splice(2, 0, 4, 6);
console.log(arr); //原数组已经改变
console.log(ss1);
var count3 = arr.splice(1, 1, 2, 4);
console.log(arr);
console.log(count);
```

## indexOf()和lastIndexOf()

indexof():接收两个参数：要查找的项和(可选的)表示查找起点的位置的索引。其中,从数组的开头(位置0)开始向后查找。

lastIndexOf():接收两个参数：要查找的项和(可选的)表示查找起点位置的索引。其中,从数组的末尾开始向前查找。

这两个方法都返回要查找的项在数组中的位置,或者在没找到的情况下返回-1,在比较第一个参数与书中的每一项时,会使用全等操作符。

```js
var arr = [1, 2, 5, 9, 23, 5];
console.log(arr.indexOf(5));
console.log(arr.lastIndexOf(5));
console.log(arr.indexOf(5, 2));
console.log(arr.indexOf(5, 5));
console.log(arr.lastIndexOf(5, 3));
console.log(arr.indexOf(6));
```

##  forEach()

forEach(): 对数组进行遍历循环,对数组的每一项进行给定函数。这个方法没有返回值。参数function类型,默认有传参,参数分别为：遍历的数组内容，对应的数组索引，数组本身。
```js
var arr = ['wa', 'ng', 'li', 'si'];
arr.forEach(function(currentValue, index, li){
console.log(item);
console.log(index);
console.log(li);
});
```

## map()

map():指'映射',对数组中的每一项运行给定函数,返回每次函数调用的结果组成的数组。
```js
var arr = [1, 3, 5, 8];
var arr2 = arr.map(function(item) {
return item * item;
});
console.log(arr2);
```

## filter()

fliter():'过滤'功能,数组中的每一项运行给定函数,返回满足过滤条件组成的数组。

```js
var arr = [1, 3, 5, 7, 9];
var arr2 = arr.filter(function(x, index) {
// console.log(x);
// console.log(index);
return index % 3 == 0 || x >= 6;
});
console.log(arr2);
```

## every() 

every():判断数组中的每一项都是否满足条件,只有所有满足条件,才会返回true.

```js
var arr = [1, 2, 3, 4];
var arr2 = arr.every(function(x) {
  return x < 1;
});
console.log(arr2);
var arr3 = arr.every(function(x) {
  return x < 10;
});
console.log(arr3);
```

## some()

some(): 判断数组中是否存在满足条件的项,只要有一项满足条件,就会返回true.

```js
var arr = [1, 2, 3];
var arr2 = arr.some(function(x) {
  return x < 2;
});
console.log(arr2);
var arr3 = arr.some(function(x) {
  return x < 1;
});
console.log(arr3);
```

## reduce()和reduceRight()

这两个方法都会实现迭代数组的所有项,然后构建一个最终返回的值。reduce()方法从数组的第一项开始,逐个遍历到最后。而reduceRight()则从数组的最后一项开始,向前遍历到第一项。
这两个方法都接收两个参数:一个在每一项上调用的函数和(可选的)作为归并基础的初始值。

传给reduce()和reduceRight()的函数接收4个参数:前一个值,当前值,项的索引和数组对象。这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项,因此第一个参数是数组的第一项,第二个参数就是数组的第一项。

```js
var arr = [1, 2, 3, 4];
var sum = arr.reduceRight(function(p, c, i, a) {
console.log('prev', p);
console.log('c', c);
console.log('i', i);
console.log('a', a);    
return p + c;
}, 10);
console.log(sum);
```

##  数组的扩展

## 扩展运算符

扩展运算符(spread)是三个点(...).它好比reset参数的逆运算,将一个数组转为用逗号分隔的参数序列。
```js
console.log(...[1, 2, 3]);
console.log(1, ...[2, 3, 4], 5);
[...document.querySelectorAll('div')]
```

该运算符用于函数的调用

```js
function push(array, ...items) {
  array.push(...items);    
}
function add(x, y) {
  return x + y;
}
var numbers = [3, 4];
add(...numbers) // 7
```

上面代码中,array.push(...items)和add(...numbers)这两行,都是函数的调用,它们都使用了扩展运算符,该运算将一个数组,变为参数序列。

扩展运算符与正常的函数参数可以结合使用,非常灵活。
```js
function f(z, x, c, v) {}
var args = [0, 1];
f(-1, ...args, 2 ...[3]);
```

扩展运算符后面还可以放置表达式。

`const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',    
];`

如果扩展运算符后面是一个空数组,则不产生任何效果。

`[...[], 1]`

## 替代数组的apply方法

由于扩展运算符可以展开数组,所以不再需要apply方法,将数组转为函数的参数了。
```js
 // ES5的写法
 function f(x, y, z) {
}
var args = [0, 1, 2];
f.apply(null, args);
//  ES6的写法
function f(x, y, z) {   
}
var args = [0, 1, 2, 3];
f(...args);
```

下面是扩展运算符取代apply方法的一个实例的例子,应用Math.max方法,简化求出一个数组最大元素的写法。

```js
//  ES5的写法
Math.max.apply(null, [14, 3, 77])
// ES6的写法
Math.max(...[14, 3, 77])
// 等同于
Math.max(14, 3, 77);
```

上面的代码中,由于javascript不提供数组最大元素的函数,所以只能套用Math.max函数,将数组转为一个参数序列,然后求最大值。有了扩展运算符以后,就可以直接用Math.max了。

另一个例子是通用push函数,将一个数组添加到另一个数组的尾部。

```js
//  ES5的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4 ,5];
Array.protype.push.apply(arr1, arr2);
//  ES6的写法
var arr1 = [1, 2, 3];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
```

上面代码的ES5写法中,push方法的参数不能是数组,所以只好通过apply方法变通使用push方法。

有了扩展运算符,就可以直接将数组传入push方法。

`new (Date.bind.apply(Date, [null, 2015, 1, 1]));`

`new Date(...[2015, 1, 1]);`

## 扩展运算符的应用

### 合并数组

扩展运算符提供了数组合并的新写法
```js
//  [1, 2].concat(more)
//  [1, 2, ...more]
var arr1 = ['a', ,'c'];
var arr2 =  ['c'];
var arr3 = ['d', 'e'];
//  ES5的合并数组
arr1.concat(arr2, arr3);
//  ['a', 'b', 'c', 'd', 'e']
//  ES6的合并数组
[...arr1, ...arr2, ...arr3]
// ['a', 'b', 'c', 'd', 'e']
```

### 与结构赋值结合

扩展运算符可以解构赋值结合起来,用于生成数组
```js
// ES5
a = list[0], rest = list.slice(1)
//  ES6
[a, ...rest] = list
```

下面是另一些例子

```js
const [first, ...rest] = [1, 2, 3, 4, 5];
first   //  1
rest    //  [2, 3, 4, 5]
const   [first, ...rest] = [];
first   //  undefined
rest    //  []
const [first, ...rest] = ['foo'];
console.log(first);
console.log(rest);
```

如果扩展运算符用于数组赋值,只能放在参数的最后一位,否则会报错。

```js
const [...butLast, last] = [1, 2, 4, 5];
//  报错
const [first, ...middle, last] = [1, 2, 4, 5];
// 报错
const [first, last,  ...middle] = [1, 2, 3, 4, 5];
console.log(first);
console.log(last);
console.log(middle);
//  不抱错
```

### 函数的返回值

javascript的函数只能返回一个值,如果需要返回多个值,只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法.

 `var dateFields = readDateFields(database); `  
  `var d = new Date(...dateFields);`

 上面代码从数据库取出一行数据,通过扩展运算符,直接将其传入构造函数的Date.

 ### 字符串

 扩展运算符还可以将字符串转为真正的数组
```js
 console.log([...'hello']);
 // [ "h", "e", "l", "l", "o" ]
``` 
 上面的写法,有一个重要的好处,那就是能够正确识别32位的Unicode字符。

 ```js
 'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
```

上面代码的第一种写法，JavaScript会将32位Unicode字符，识别为2个字符，采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数，可以像下面这样写。

```js
function length(str) {
  return [...str].length;
}
```

`length('x\uD83D\uDE80y') // 3`

凡是涉及到操作32位 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。

```js
let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'
```

上面代码中，如果不用扩展运算符，字符串的reverse操作就不正确。

### 实现了 Iterator 接口的对象

任何 Iterator 接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。

`var nodeList = document.querySelectorAll('div');`

`var array = [...nodeList];`

上面代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 。

对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。

```js
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};
// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```

上面代码中，arrayLike是一个类似数组的对象，但是没有部署 Iterator 接口，扩展运算符就会报错。这时，可以改为使用Array.from方法将arrayLike转为真正的数组。

### Map 和 Set 结构，Generator 函数

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。

```js
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```

Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

```js
var go = function*(){
  yield 1;
  yield 2;
  yield 3;
};
[...go()] // [1, 2, 3]
```

上面代码中，变量go是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。

```js
var obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
```

## Array.from()

Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。

下面是一个类似数组的对象,Array.from将他转为真正的数组。

```js
 let arrays = {
  '0': 'a',
  '1': 'c',
  length: 2
};
//  ES5
var arr1 = [].slice.call(arrays);
console.log(arr1);
//  ES6
let arr2 = Array.from(arrays);
console.log(arr2);
```

实际应用中,常见的类似数组的对象是DOM操作返回的NodeList集合,以及函数内部的arguments对象。

Array.from 都可以将他们转为真正的数组。

```js
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});
// arguments对象
function foo() {
  var args = Array.from(arguments);
}

```

上面代码中,querySelectorAll方法返回的是一个类似数组的对象,可以将这个对象转为真正的数组,在使用forEach方法。

只要是部署了Iterator接口的数据结构,Array.from都能将其转为数组。

```js
console.log(Array.from('hello'));
//  ["h", "e", "l", "l", "o"]
let nameSet = new Set(['a', 'b']);
console.log(Array.from(nameSet));
// (2) ["a", "b"] 
```

上面代码中,字符串和Set结构都具有Iterator接口,因此可以被Array.from转为真正的数组。

如果参数是一个真正的数组,Array.from会返回一个一模一样的新数组。

```js
Array.from([1, 2, 3])
// [1, 2, 3]
值的提醒的是,扩展运算符(...)也可以将某些数据结构转为数组。
// arguments对象
function foo() {
  var args = [...arguments];
}
// NodeList对象
[...document.querySelectorAll('div')]
```

扩展运算符背后调用的是遍历器接口(Symbol.iterator),如果一个对象没有部署这个接口,就无法转换。Array.from方法还可以支持数组的对象。所谓类似数组的对象,本质特征只有一点,即必须有length属性。因此,任何length属性的对象,都可以通过Array.from方法转为数组,而此时扩展运算符就无法转换。

```js 
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
```

上面的代码中,Array.from返回了一个具有三个成员的数组,每个位置的值都是undefind。扩展运算符转换不了这个对象。

对于还没有部署该方法的浏览器,可以用Array.prototype.slice方法替代。

```js
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
```

Array.from 还可以接受第二个参数,作用类似与数组的map方法,用来对每个元素进行处理,将处理后的值放入返回的数组。

```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
console.log(Array.from([1, 2, 3], (x) => x * x))
```

下面的例子是取出一组Dom节点的文本内容。

```js
let spans = document.querySelectorAll('span.name');

// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
let names2 = Array.from(spans, s => s.textContent)
```

下面的例子将数组中布尔值为false的成员转为0。

```js
 console.log(Array.from([1, , , 2], (n) => n || 0));
```

 另一个例子是返回各种数据的类型。

```js
function typeOf () {
  return Array.from(arguments, value => typeof value)
}
console.log(typeOf(null, [], NaN))
//  ["object", "object", "number"]
```

如果map函数里面用到了this关键字,还可以传入Array.from的第三个参数,用来绑定this.

Array.from()可以将各种值转为真正的数组,并且还提供map功能。这实际上意味着,只要有一个原始的数据结构,你就可以先对它的值进行处理,然后专程规范的数组结构,进而就可以使用数量众多的数组方法。

```js
console.log(Array.from({ length: 2}, () => 'jack'))
// ['jack', 'jack']
```

上面的代码中,Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法非常灵活。

Array.from()的另一个应用是,将字符串转为数组,然后返回字符串的长度。因为它能正确处理各种Unicode字符,可以避免Javascript将大于\uFFFF的Unicode字符,算做两个字符的bug.

```js
function countSymbols(string) {
  return Array.from(string).length;
}
```

## Array.of()

Array.of方法用于将一组值,转换为数组。

```js
console.log(Array.of(3, 11, 8));
console.log(Array.of(1));
console.log(Array.of(1).length);
```

这个方法的目的,是弥补数组构造函数的Array()的不足.因为参数个数的不同,会导致Array()行为差异。

```js
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

上面的代码中,Array方法没有参数,一个参数,三个参数时,返回的结果都不一样。只有当参数不小于2个时,Array()才会返回由参数组成的新数组,参数个数只有一个时,实际上是指定数组的长度。

Array.of基本上可以替代Array()或new Array(),并且不存在由于参数不同而导致的重载.它的行为非常统一。

```js
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```

Array.of总是返回参数组成的数组。如果没有参数,就返回一个空数组。

Array.of方法可以用下面的代码模拟实现。

```js
function ArrayOf(){
  return [].slice.call(arguments);
}
```

### 数组实例的 copyWithin()

数组实例的copyWithin方法,在当前数组内部,将指定位置的成员复制到其他位置(会覆盖原有成员),然后返回当前数组。也就是说,使用这个方法,会修改当前数组。
```js
 Array.prototype.copyWithin(target, start = 0, end = this.length)
 它接受三个参数。
  - target(必需): 从该位置开始替换数据。
  - start(可选): 从该位置开始读取数据,默认是0.如果为负值,表示倒数。
  - end(可选):到该位置前停止读取数据,默认等于数组长度,如果为负值,表示倒数。 
这三个参数都应该是数值,如果不是,会自动转换为数值。  
``` 

```js
console.log([1, 2, 3].copyWithin(0, 1));
//  [2, 3, 3]
```

上面的代码表示将从3号位直到数组结束的成员(4和5),复制到从0号位开始的位置,结果覆盖了原来了1和2.

下面是更多的例子

```js
console.log([1, 2, 3].copyWithin(0, 1, 2))
//  [2, 2, 3]

// -2相当于3号位，-1相当于4号位
console.log([1, 2, 3, 4, 5].copyWithin(0, -2, -1));
[4, 2, 3, 4, 5]

// 没有理解如下:
// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]

```

### 数组实例的find()和findIndex()

数组实例的find方法,用于找出第一个符合条件的数组成员.它的参数是一个回调函数,所有的数组成员依次执行该回调函数,直到找出第一个返回值为true的成员,然后返回该成员。如果没有符合条件,则返回undefined.

```js
let ss = [1, 4, -5, 10].find((n) => n < 0)
console.log(ss);
// -5
```

上面代码找出数组中第一个小于0的成员。

```js
let arr = [1, 4, -5, 10].find(function(value, index, arr) {
  return value > 9;
})
console.log(arr);
//  9
```

上面代码中,find方法的回调函数可以接受三个参数,以此为当前的值,当前的位置和原数组。

数组实例的findIndex方法的用法与find方法类似,返回第一个符合条件的数组成员的位置,如果所有成员都不符合条件,则返回-1.

```js
let arr = [1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
})
console.log(arr)
// 2
```

这两个方法都可以接受第二个参数,用来绑定回调函数的this对象
另外,这两个方法都可以发现NaN,弥补了数组的IndexOf方法的不足。

```js
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```

上面的代码中,indexOf方法无法识别数组的NaN成员,但是findIndex方法可以借助Object.is方法做到。

### 数组实例的fill()

```js
let arr = ['a', 'b', 'c'];
console.log(arr.fill(7));
//  [7, 7, 7]
console.log(new Array(3).fill(7));
//  [7, 7, 7]
```

上面代码表明,fill方法用于空数组的初始化非常方便.数组中已有的元素,会被全部抹去。

fill方法还可以接受第二个参数和第三个参数,用于指定填充起始位置和结束位置.

```js
let arr = ['a', 'b', 'c'];
console.log(arr.fill(7, 1, 2));
//  ["a", 7, "c"]
```

上面代码表示,fill方法从1号位开始,向原数组填充7,到2号位之前结束。

### 数组实例的entries(),keys()和values()

ES6提供了三个新的方法--entries(),keys()和values()--用于遍历数组.它们都返回一个遍历器对象(详见《Iterator》一章),可以用for...of循环进行遍历,唯一的区别是keys()是对键名的遍历,entries()是对键值对的遍历。

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
//  ["a","b"].values(...) is not iterable
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
//  0 "a"
//  1 "b"
```

如果不使用for...of循环,可以手动调用循环遍历器对象的next方法,进行遍历。

```js
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value);
console.log(entries.next().value);
console.log(entries.next().value);
//  [0, "a"]
//  [1, "b"]
//  [2, "c"]
```

### 数组实例的includes()

Array.prototype.includes方法返回一个布尔值,表示某个数组是否包含给定的值,与字符串的includes方法类似。ES2016引入了该方法。
```js
console.log([1, 2, 3].includes(2));
console.log([1, 2, 3].includes(4));
console.log([1, 2, NaN].includes(NaN)); 
//  true
//  false
//  true
```

该方法的第二个参数的表搜索的起始位置,默认为0。如果第二个参数为负数,则表示倒数的位置。如果这时它大于数组的长度(比如第二个参数为-4,但数组长度为3)则会重置它从0开始。

```js
console.log([1, 2, 3].includes(3, 3)); // false
console.log([1, 2, 3].includes(3, -1)); // true
```

没有该方法之前,我们通常使用数组的indexOf方法,检查是否包含某个值。

```js
if (arr.indexOf(el) !== -1) {
}
```

indexOf方法有两个缺点,一是不够语义化,它的含义是找到参数值的第一个出现位置,所以要去比较是否不等于-1,表达起来不够直观。二是,它内部使用严格相等运算符(===)进行判断,这会导致NaN的误判。

```js
[NaN].index(NaN)
//  -1
```
includes使用的是不一样的判断算法,就没有这个问题。

```js
[NaN].includes(NaN)
//  true
```
下面代码用来检查当前环境是否支持该方法,如果不支持,部署一个简易的替代版本。

```js
const = contains = (() => 
  Array.prototype.includes ? (arr, value) => arr.includes(value) : (arr, value) => arr.some(el => el ===value))();
  contains(['foo', 'bar'], 'baz');
  //  false
```

另外,Map和Set数据结构有一个has方法,需要注意includes区分。
```js
  -Map结构的has方法,用来查找键名的,比如Map.prototype.has(key)
  webkMap.prototype.has(key),Reflect.has(target, prototypeKey).
  -Set结构的has方法,用来查找值的,比如Set.prototype.has(value),
  WeakSet.prototype.has(value).
```

##  数组的空位
数组的空位指,数组的某一位置没有任何值。比如,Array构造函数返回的数组都是空位。

```js
console.log(Array(3))
//  [empty × 3]
```

上面代码中,Array(3)返回一个具有3个空位的数组。
注意,空位不是undefined,一个位置等于undefined,依然是有值的。空位是没有任何值,in运算符可以说明这一点。

```js
console.log(0 in [undefined, undefined, undefined]) //  true
console.log(0 in [, , ,]) //  false
```

上面代码说明,第一个数组的0号位置是有值的,第二个数组的0号位置。
ES5对空位的处理,已经很不一致,大多数情况下会忽略空位。

```js
  - forEach(), filter(), every()和some()都会跳过空位。
  - map()会跳过空位,但会保留这个值
  - join()和toString()会将空位视为undefined,而undefined和null会被处理成空字符串。
```

```js
//  forEach方法
[, 'a'].forEach((x, i) => {
  console.log(i); //  1
});
//  filter方法
 console.log(['a', , 'b'].filter(x => true)); //   ["a", "b"]
//  every方法
console.log([, 'a'].every(x => x === 'a')) // true
//  some方法
console.log([, 'a'].some(x => x!== 'a'))  //false
//  map方法
console.log([, 'a'].map(x => 1)) // [empty × 1, 1]
//  join方法
console.log([, 'a', undefined, null].join('#')) //  #a##
//  toString方法
console.log([, 'a', undefined, null].toString()) //  ,a,, 
```

ES6则是明确将空位转为undefined.
Array.from方法会将数组的空位,转为undefined,也就是说,这个方法不会忽略空位。

```js
 console.log(Array.from(['a', , 'b']))
 // ["a", undefined, "b"]
```

扩展运算符(...['a' , , 'b'])也会把空位转为undefined.

```js
console.log([...['a', , 'b']]) // ["a", undefined, "b"]
```

copyWithin()会连空位一起拷贝。

```js
console.log([, 'a', 'b', ,].copyWithin(2, 0))
//  [empty × 1, "a", empty × 1, "a"]
```

fill()会将空位视为正常的数组位置。

```js
console.log(new Array(3).fill('a'))
```

for...of循环也会遍历空位。

```js
let arr = [, ,];
for (let i of arr) {
  console.log(i); //  undefined*2
}
```

上面代码中,数组arr有两个空位,for...of并没有忽略他们。如果改成map方法遍历,空位是会跳过。
entries(),keys(),values(),find()和findIndex()会将空位处理成undefined.
```js
//  entries()
console.log([...[, 'a'].entries()]) //  [0, undefined] [1, "a"]
//  keys()
console.log([...[, 'a'].keys()])  //  [0, 1]
//  values()
console.log([...[,'a'].values()] ) // [(intermediate value),"a"].values(...) is not iterable
//  find()
console.log([, 'a'].find(x => true)) //  undefined
//  findIndex()
console.log([, 'a'].findIndex(x => true)) //  0
```

由于空位的处理规则非常不统一,所以建议避免出现空位。

纯手打,没有任何机打痕迹。
