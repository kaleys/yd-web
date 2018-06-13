# 1. 请写出弹出值，并解释为什么。
```javascript
+function() {
  alert(a);             //function(){console.log(2)}
  a();                  //2
  var a = function(){
    console.log(1);
  }

  function a(){
    console.log(2)
  }

  alert(a);             //function
  a();                  //1
  var c = d = a;
}();
alert(d);               //function(){console.log(2)}
alert(c);               //c is not defined
```
### 解释
1. 在javascript中变量声明和函数声明都具有变量提升的功能，但是函数声明高于变量声明.
2. 执行方法
3. a通过函数表达式的方式重新赋值了
3. 执行方法
4. 在块级作用域下如果没有var声明，将变成全局变量。表达式从右往左解析。d = a; var c = d;

### 考点
变量声明，函数声明，函数表达式如何解析。


# 2. 如下代码，点击li时，正确的打印li的索引值？如果li的动态添加的，如何保证点击事件有效.
```html
<ul>
  <li>1</li><li>2</li><li>3</li>
</ul>
```

### 解释
第一点： 可以除了闭包外，可以采用let。问深一点，var，let的区别，如果回答let有作用域，那再问下js里的作用域是什么。其实就是用{}包含的块就有作用域.
```javascript
// 闭包
var lis = document.getElementByTabName('li);
for(var i=0; i<lis.length; i++) {
  lis[i].onclick = (function(i){
    return function(){
      console.log(i)
    }
  })(i)
}

//let
for(let i=0; i<lis.length; i++) {
  lis[i].onclick = funciton(){console.log(i)}
}
```
第二点：答到事件代理的点上就行。就是将事件绑定到ul上，jquery的代码就是`$('ul').on('li', funciton(){})`;

### 考点
闭包，事件代理

# 3. 请写出如下的输出值，并写出将注释去掉后输入的值，并解析为什么？再问点bind，apply,call的区别，this就完了
```javascript
this.a = 20;
var test = {
  a: 40,
  init: () => {
    console.log(this.a);
    function go(){
      //this.a = 60;
      console.log(this.a);
    }
    go.prototype.a = 50;
    return go;
  }
}

// var p = test.init();
// p();
new(test.init())();
```
### 结果
40 50
注释去掉之后
20 60


### 考点
this的指向

#4. 如下代码,求 #test的paddingTop的像素值
```html
<div id="container" style="width: 900px; height: 500px; marign: 0 auto;">
  <div id="test" style="padding-top: 30%"></div>
</div>
```
### 答案
900 * 0.3 = 270

### 考点
css padding-top的百分比是按父元素的宽度百分之多少来算的。

# 5. 都知道css动画的效率比平时用js改变width,height,top效率来的高，解释下为什么
### 解答
html渲染分为三个步骤： 排列, 绘制，合成
根据dom结构与css生成一个渲染树，然后给每个dom树在分配一个位置，这个为排列。
然后沉浸颜色，背景等，这个叫绘制。
cpu将这些处理好的渲染树生成为位图，将他上传到GPU里面。GPU会跟据不同的css属性会生成不同的layers，将这些不同的layers合成起来，最终呈现给用户，这个称之为合成。

平时用js通过改变css属性，如width,height,top等来做动画会依次触发以上的三个步骤，导致dom树不停的重排重绘。而css的动画开启的硬件加速，即动画效果直接在GPU里完成，不会导致dom树的重排重绘，而且GPU运算这些动画的效率也比CPU要高。

### 说明
如果只回答到了GPU加速，估计也不太解底层，自己判断行不行

# 6. 前端脚手架工具有很多gulp, webpack等。前端脚手架解决了什么问题？他们有什么区别？webpack的基本配置有哪些？webpack的loader和plugin有什么区别？
### 解答
一、优化前端的工作流程，很多流程可以能过脚本来做，比如压缩文件，打包，压缩图片等。 二、方便代码维护。
webpack和gulp最大的区别就是webpack可以将多个模块合成一个文件。
webpack配置： entry, output, module(rules), plugins，
最后一点自由说吧。


# 7. 对于性能优化有什么理解？http的缓存原理
## 网络方面
启用http缓存 请求头cache-control, max-age, etag等
## 请求方面
1. 压缩合并静态资源
2. dns预解析<link rel="dns-prefetch" href="//g.alicdn.com" />
3. preload prefetch 加载静态资源
4. 静态资源放到dns服务器上（可以问为什么？回答的方向是浏览器并行下载数有限、减少请求大小[不会带上主域名的cookie信息]）
## 代码方面
1. 尽量避免造成流星器的重排绘
2. 随便说吧

http缓存原理自己搜吧,几占，etag,max-age, no-cache

# 8. vue的生命周期有哪些，双向数据的原理又是什么?
生命周期参考官网，双向数据的原理看他自己说吧，关键字:Object.defineProperty, Observer, Watcher, Dep, Compiler等


