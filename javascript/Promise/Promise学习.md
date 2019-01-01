# Promise模式学习

Promise 为异步编程提供统一的解决方案，比传统的回调和事件更加合理有效。
多重嵌套的回调函数，代码是横向发展，不是纵向发展，容易乱成一团，不便管理，称之为”callback hell”，回调地狱或回调恶梦。
Promise就是为了解决这个问题而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的横向加载，改成纵向加载。

## 内容

* 状态
* 初始化
* then / catch
* resolve() / reject()
* all() / race()
* done / finally

## 状态

Promise的三个状态：Pending 进行中 / Resolved 已成功 / Rejected 已失败

状态改变方式:

Pending => Resolved

Pending => Rejected

将异步操作以同步的操作编程表达出来，避免了层层嵌套的回调函数。

## 缺点

* 一旦新建它就会立即执行，无法中途取消
* 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
* 当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

## 实例化

```
var promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

```

* Promise接收一个函数作为参数，函数的两个参数resolve, reject是两个函数，用于对promise对象的状态改变
* resove 将未完成变成已完成 pending => resolved
* reject 将未完成变成已失败 pending => rejected

## then 与 catch


```
Promise.prototype.then()

```

then方法接收两个函数参数，第一个表示resove 已成功的回调，第二个表示reject 已失败的回调

## 用法

```
var p = new Promise(function(resolve, reject){ ... })
p.then(function(){}, function(){})
p.then().catch();

```

## 异步加载图片

```
unction loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };
    image.src = url;
  });
}
loadImagesAsync('//img.static.com/xxx.jpg').then(function(img){
	//加载成功 显示图片
}, function(err){
	//加载失败 提示失败
})

```

## 异步加载数据

使用promise包装一个异步请，返回一个promise对象，使用then和catch的方式对返回结果进行处理

```
var getJSON = function(url){
	return new Promise((resolve, reject)=>{
		var client = new XMLHttpRequest();
		client.open('GET', url);
		client.onreadystatechange = callback;
		client.send();
		function callback(){
			if(this.readyState !== 4) return;
			if(this.status === 200){
				resolve(this.response)
			}else{
				reject(new Error(this.statusText))
			}
		}
	})
}
getJSON('/api/getList').then(function(data){
	//获取请求的数据
}, function(err){
	//请求失败错误处理
});

```

## 执行顺序

Promise 在实例化的时候就会执行，是一条执行语句

```
var p1 = new Promise(function (resolve, reject) {
	console.log('p1 start')
})
var p2 = new Promise(function (resolve, reject) {
	console.log('p2 start')
})
// 输出：
// p1 start
// p2 start

```

## 嵌套

Promise 嵌套，状态改变由最内层的promise对象决定

```
var st, res = true;
var p1 = ()=> new Promise(function (resolve, reject) {
	console.log('p1 start')
  setTimeout(() => {
  	if(res){
  		resolve(Date.now() - st +' P1 success')
  	}else{
  		reject(new Error(Date.now() - st +' P1 fail'));
  	}
  }, 3000)
})
var p2 = ()=> new Promise(function (resolve, reject) {
	st = Date.now()
	console.log('p2 start')
  setTimeout(() => {
  	if(res){
  		resolve(p1())
  	}else{
  		reject(new Error(Date.now() - st + ' P2 fail'));
  	}
  }, 1000)
})
p2()
	.then(result => console.log(result))
	.catch(error => console.log(error.message))
// 输出：
// p2 start
// Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
// p1 start
// 4002 P1 success

```

## then的调用

前一个then的返回结果，可以再后一then的回调中获取

```
var p3 = ()=> new Promise((resolve, reject)=>{
	resolve('{"name":"jack", "age":28}')
});
p3()
	.then(res => JSON.parse(res))
	.then(data => Object.assign(data, {name:'rose'}))
	.then(data => console.log(data))
// 输出：{name: "rose", age: 28}
var p4 = ()=>{
	var st = Date.now();
	getJSON('data1.json?delay=1000')
		.then(data => {
			console.log(Date.now()-st, data);
			return getJSON('data2.json?delay=2000')
		})
		.then(data => console.log(Date.now()-st, data))
		.catch(err => console.log(err.message))
}
p4();
// 1016 "{"status":"0"}"
// 3028 "{"status":"1"}"

```

## Catch

`
Promise.prototype.catch
`

p.catch()用于处理promise中rejected状态的回调，与p.then(resolveFn, rejectFn)中 rejectFn的作用相同

```
var p = new Promise(function(resolve, reject){ ... });
p.then(function(){}, function(){});
等同于
p.then(function(){}).catch(function(){});

```
reject(‘error’) 与 throw new Error(‘…’) 都能被catch捕获

```
new Promise((resolve, reject) => { 
	throw new Error('some error1');
}).catch(err =>  console.log(err.message))
// 等同于
new Promise((resolve, reject) => { 
	reject('some error2')
}).catch(err => console.log(err))
//输出
// some error1
// some error2

```
## 异常捕获

promise对象的错误，具有 冒泡 性质，会一直向后传递，直到被捕获

```
new Promise((resolve, reject) => { 
	throw new Error('some error1');
}).then().then().then().catch(err =>  console.log(err.message))
```

推荐使用 catch 代替then(null, rejectFn)中的rejectFn

```
// bad
new Promise(function(resolve, reject){}).then(resolveFn, rejectFn)
// good
new Promise(function(resolve, reject){
}).then(resoveFn).catch(rejectFn)

```

原因是：catch可以捕获前面then函数返回的错误信息，也更接近同步的写法

promise对象的错误，如果不指定catch来捕获错误，那么错误不会被传递到外层代码（chrome浏览器例外）

catch 返回的是一个promise对象，后面同样可以调用then、catch
前面的catch中错误可以被后面的catch捕获

```
Promise.reject('err1')
	.catch(err => console.log(err))
	.then(() => console.log('success'));
// err1
// success
Promise.reject('err1')
	.catch(err => {console.log(err); x+1})
	.then(() => console.log('success'));
Promise.reject('err1')
	.catch(err => {console.log(err); x+1})
	.catch(err => console.log(err.message));
// err1
// x is not defined
Promise.resolve('success1')
	.catch(err => console.log(err))
	.then(msg => console.log(msg));
// success1

```

## all 与 race

`Promise.all([])`与`Promise.race([])`

* 接收一个数组做为参数，参数中的每个元素为promise实例，
* 如果元素不是promise实例，则会调用Promise.resolve()转换为promise的实例
* 将多个promise对象包装为一个新的promise对象

## Promise.all()

* 当p1、p2、p3的状态全部为resolved时，才能将p的状态改为resolved
* 当p1、p2、p3其中一个状态变成rejected时，就会将p的状态变成rejected

```
var p = Promise.all([Promise.resolve('1'), Promise.resolve('2'), 
Promise.resolve('3')]);
p.then(data => console.log(data)) //["1", "2", "3"]
var p1 = Promise.all([Promise.resolve('1'), Promise.reject('2'), 
Promise.resolve('3')]);
p1.then(data => console.log(data)).catch(err => console.log(err)) // 2

```

## Promise.race()

当p1、p2、p3其中一个状态发生改变时，就相应的触发p的状态发生变化

```
var p1 = new Promise((resolve, reject)=>setTimeout(()=>resolve('p1 success'), 2000))
var p2 = new Promise((resolve, reject)=>setTimeout(()=>reject('p2 error'), 1000))
var p3 = new Promise((resolve, reject)=>setTimeout(()=>resolve('p3 success'), 3000))
var p = Promise.race([p1, p2, p3]);
p.then(data => console.log(data)).catch(err => console.log(err)); //p2 error

```

## Promise.resolve() 与 Promise.reject()

将普通对象转换为Promise对象

```
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

```

Pormise.resolve()的四种参数

1. promise实例，则会返回这个实例
2. 含有then方法的对象，则先执行then方法，再返回promise对象
3. 参数是基本类型的值，数据或字符串，则直接resolve这个值
4. 不带参数执行，则返回一个resolved的promise对象

Promise.reject()与之类似

Promise.reject()返回一个rejected的promise对象

## defer

Promise.defer 延迟对象，返回一个Promise的实例、resolve、reject方法

defer风格的Promise

```
function doSth() {
    var defer = Promise.defer();
    setTimeout(function(){
        defer.resolve();
    },1000)
    return defer.promise;
}
等同于
doSth = ()=> new Promise((resolve, reject) => setTimeout( ()=> resolve('success'), 1000) )

```

## done 与 finally

添加两个ES6的Promise扩展方法 done()、finally()

## done

done方法: 用于任何可能出现的错误，并向全局抛出。

由于Promise的错误不会冒泡到全局，如果在promise对象的最终then或catch方法中有报错，则无法捕获到。

done()用于promise()尾端调用，可捕获前面未捕获的错误

```
Promise.prototype.done = function(onResolved, onRejected){
	this
		.then(onResolved, onRejected)
		.catch(function(err){
			setTimeout(() => { throw err}, 0); //抛出一个全局错误
		})
}
var p = ()=>new Promise((resolve, reject) => resolve('success'));
p()
  .then(data => {console.log(data); x+1;})
  .catch(err => {console.log(err.message); y+2;})
  .then(data => console.log(data))
  .done();
  
```
  
##   finally

finally方法：用于指定不管Promise对象最后状态如何，都会执行的操作

```
Promise.prototype.finally = function (callback) {
	'use strict';
	let P = this.constructor;
	return this.then(
		value => P.resolve(callback(value)),
		err => P.resolve(callback(err))
	);
};
var p = () => new Promise((resolve, reject) => resolve('success'));
p()
	.then(data => {console.log(data); x+1;})
	.catch(err => {console.log(err.message); y+2;})
	.then(data => console.log(data))
	.finally(data => console.log(data));
```

参考资料：
	
[ES6笔记 - Promise模式](http://coderlt.coding.me/2016/07/17/ES6-promise/)

[Promise对象](http://es6.ruanyifeng.com/#docs/promise)
