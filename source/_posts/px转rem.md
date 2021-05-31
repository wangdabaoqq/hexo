---
title: css3
date: 2017-07-22 13:57:48
tags:
	- 综合
	- css3
---
Sass基础——Rem与Px的转换
rem是CSS3中新增加的一个单位值，他和em单位一样，都是一个相对单位。不同的是em是相对于元素的父元素的font-size进行计算；rem是相对于根元素html的font-size进行计算。这样一来rem就绕开了复杂的层级关系，实现了类似于em单位的功能。
<!--more-->
<h2>Rem的使用</h2>

前面说了em是相对于其父元素来设置字体大小的，这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小，在我们多次使用时，就会带来无法预知的错误风险。而rem是相对于根元素<html>，这样就意味着，我们只需要在根元素确定一个参考值，这个参考值设置为多少，完全可以根据您自己的需求来定。

假设就使用浏览器默认的字号16px，来看一些px单位与rem之间的转换关系：

							
							|  px  |     rem       |
							------------------------
							|  12  | 12/16 = .75   |
							|  14  | 14/16 = .875  |
							|  16  | 16/16 = 1     |
							|  18  | 18/16 = 1.125 |
							|  20  | 20/16 = 1.25  |
							|  24  | 24/16 = 1.5   |
							|  30  | 30/16 = 1.875 |
							|  36  | 36/16 = 2.25  |
							|  42  | 42/16 = 2.625 |
							|  48  | 48/16 = 3     |
							-------------------------        
如果你要设置一个不同的值，那么需要在根元素<html>中定义，为了方便计算，时常将在<html>元素中设置font-size值为62.5%:

	html {
	    font-size: 62.5%; /* 10 ÷ 16 × 100% = 62.5% */
	}

相当于在<html>中设置font-size为10px，此时，上面示例中所示的值将会改变：

							|  px  |     rem        |
							-------------------------
							|  12  | 12/10 = 1.2    |
							|  14  | 14/10 = 1.4    |
							|  16  | 16/10 = 1.6    |
							|  18  | 18/10 = 1.8    |
							|  20  | 20/10 = 2.0    |
							|  24  | 24/10 = 2.4    |
							|  30  | 30/10 = 3.0    |
							|  36  | 36/10 = 3.6    |
							|  42  | 42/10 = 4.2    |
							|  48  | 48/10 = 4.8    |
							-------------------------        
由于rem是CSS3中的一个属性，很多人首先关注的就是浏览器对他的支持度，我截了一张caniuse对rem属性的兼容表：
![CSS](http://www.w3cplus.com/sites/default/files/styles/print_image/public/blogs/2013/sass/sass-px-rem-1.jpg)
从上图可以清楚的知道，rem在众多浏览器中都已得到很好的支持，如果您的项目不用考虑IE低版本的话，你就可以放心的使用了，如果您的项目在IE低版本中还占有不少的比例，那么你还在担心使用rem不能兼容，而不敢使用。其实是没有必要的，可以针对低版本的IE浏览器做一定的处理：

		html { font-size: 62.5%; } 
		body { font-size: 14px; font-size: 1.4rem; } /* =14px */
		h1   { font-size: 24px; font-size: 2.4rem; } /* =24px */	

这样一来解决了IE低版本的不能兼容的问题，但生出另一个不足地方，就是增加了代码量。必竟鱼和熊掌很多时候不能兼得嘛。
<div>
如果你想更深入的了解rem如何使用，建议您阅读：
<br>
 <a href="http://www.w3cplus.com/css3/define-font-size-with-css3-rem">CSS3的REM设置字体大小</a>——viaw3cplus

 <a href="http://snook.ca/archives/html_and_css/font-size-with-rem">FONT SIZING WITH REM</a>——viaJonathan Snook

 <a href="http://css-tricks.com/theres-more-to-the-css-rem-unit-than-font-sizing/">There’s more to the CSS rem unit than font sizing</a>——viacss-tricks

 <a href="http://techtime.getharvest.com/blog/in-defense-of-rem-units">In Defense Of Rem Units</a>——viaMatthew Lettini

 <a href="http://csswizardry.com/2011/05/font-sizing-with-rem-could-be-avoided/">Font sizing with rem could be avoided</a>——viaHarry

 <a href="http://ued.taobao.com/blog/2013/05/rem-font-size/">响应式十日谈第一日：使用 rem 设置文字大小</a>——via一丝
</div>

<h2>为什么要使用rem</h2>

像em单位一样，在Responsive设计中使用rem单位非常有用。虽然他们都是相对单位，但使用rem单位可以避开很多层级的关系。因为em是相对于他的父元素的font-size，而rem是相对于根元素<html>。比如说h1设置了font-size为1rem之后，只要不重置html的font-size大小，无论他的父元素设置多大，对h1都不会有任何的影响。

<h4>Sass中rem的使用</h4>

在CSS中，实现px和rem转换非常简单，但每次使用都需进行计算。虽然在html中设置font-size:62.5%;会给大家带来便利，但终究有些烦人，也不是长远之计。既然我们学习了Sass，就应该思考如何让Sass来帮助我们做这些计算的工作。接下来介绍如何使用Sass实现px和rem之间的计算。

rem在@function中的使用

Sass中也可以像使用em一样，实现px转换为rem。这个过程也同样是通过Sass的@function方法来实现。

根据rem的使用原理，可以知道px转rem需要在html根元素设置一个font-size值，因为rem是相对于html根元素。在Sass中定义一个px转rem的函数，先要设置一个默认变量：

$browser-default-font-size: 16px !default;//变量的值可以根据自己需求定义
而且需要在html根元素中显示的声明font-size：
			
			html {
			    font-size: $browser-default-font-size;
			}
然后通过@function来实现px转为rem计算：

			@function pxTorem($px){//$px为需要转换的字号
			    @return $px / $browser-default-font-size * 1rem;
			}
定义好@function之后，实际使用中就简单多了：

			//SCSS
			html {
			    font-size: $browser-default-font-size;
			}
			.header {
			    font-size: pxTorem(12px);
			}
			
			//CSS
			html {
			  font-size: 16px; }
			
			.header {
			  font-size: 0.75rem; }
不过定义的这个函数pxTorem()虽然实现了px转换成rem的计算，但不能同时服务于多个属性值的计算：

		.header {
		    font-size: pxTorem(12px);
		    margin: pxTorem(5px 10px);//同时计算多个值将报错
		}
如果这样使用，编译的时候将会报错：

		>>> Change detected to: /Users/airen/Sites/testSass/style.scss
		      error style.scss (Line 4: Undefined operation: "5px 10px/16px times 1rem".)
		这也就是说，如果样式同时需要设置多个属性值的时候，pxTorem()变得就局限性太大，换句话说，这个函数仅适合运用在具有单个属性值的属性上，例如font-size。如果要强行使用，只能同时使用多个pxTorem()：
<pre>
//SCSS
.header {
    font-size: pxTorem(12px);
    margin: pxTorem(5px) pxTorem(10px) pxTorem(15px);
    border: pxTorem(1px) solid #f36;
}

//CSS
.header {
  font-size: 0.75rem;
  margin: 0.3125rem 0.625rem 0.9375rem;
  border: 0.0625rem solid #ff3366; }
</pre>

<h2>Sass中mixin实现rem</h2>

除了使用@function实现px转换成rem之外，还可以使用Sass中的mixin实现px转rem功能。

font-size是样式中常见的属性之一，我们先来看一个简单mixin，用来实现font-size的px转rem：

		@mixin font-size($target){
		    font-size: $target;
		    font-size: ($target / $browser-default-font-size) * 1rem;
		}
在实际使用中，可以通过@include调用定义好的@mixin font-size:

		//SCSS
		.footer {
		    @include font-size(12px);
		}
		
		//CSS
		.footer {
		  font-size: 12px;
		  font-size: 0.75rem; }
可实际中，这个mixin太弱小了，根本无法实现我们需要的效果，因为我们很多样式属性中他可不只一个属性。为了实现多个属性能设置多值，就需要对mixin做出功能扩展：

			@mixin remCalc($property, $values...) {
			  $max: length($values);//返回$values列表的长度值
			  $pxValues: '';
			  $remValues: '';
			
			  @for $i from 1 through $max {
			    $value: strip-units(nth($values, $i));//返回$values列表中的第$i个值，并将单位值去掉
			    $browser-default-font-size: strip-units($browser-default-font-size);
			    $pxValues: #{$pxValues + $value * $browser-default-font-size}px;
			
			    @if $i < $max {
			      $pxValues: #{$pxValues + " "};
			    }
			  } 
			
			  @for $i from 1 through $max {
			    $value: strip-units(nth($values, $i));
			    $remValues: #{$remValues + $value}rem;
			
			    @if $i < $max {
			      $remValues: #{$remValues + " "};
			    }
			  } 
			
			  #{$property}: $pxValues; 
			  #{$property}: $remValues; 
			}
在这个remCalc()中定义了两个参数$property和$values...。其中$property表示的是样式属性，而$values...表示一个或者多个属性值。

注：在上面定义的remCalc中使用了下自定义的函数strip-units，主要用来去除单位，详细的请参阅Sass基础——PX to EM Mixin和@function一文中的strip-units函数定义方法。

px转rem的mixin定义完成后，就可以通过@include来引用：

	//SCSS
	.wrapper {
	    @include remCalc(width,45);
	    @include remCalc(margin,1,.5,2,3);
	}
	
	//CSS
	.wrapper {
	  width: 720px;
	  width: 45rem;
	  margin: 16px 8px 32px 48px;
	  margin: 1rem 0.5rem 2rem 3rem; }
在实际使用中取值有一点非常重要在remCalc()取的$values值为rem值。

总结

在这篇文章中，简单介绍了在Sass中如何定义@function和@mixin来实现px转换成rem的计算。希望大家能在这篇文章中找到自己需要的灵感。


 <a href="http://www.w3cplus.com/preprocessor/sass-px-to-rem-with-mixin-and-function.html">转载自© w3cplus.com
								
