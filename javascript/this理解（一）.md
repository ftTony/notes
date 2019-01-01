# this深入理解

函数的几种调用方式：

1. 全局&调用普通函数
1. 作为对象方法来调用
1. 作为构造函数来调用
1. 使用apply/call/bind方法来调用
1. 构造函数 prototype 属性
2. DOM event this
1. es6箭头函数

## 全局&调用普通函数

```
function person(){
        this.name="xl";
        console.log(this);
        console.log(this.name);
 }
 person();  //输出  window  xl   
```

在这段代码中person函数作为普通函数调用，实际上person是作为全局对象window的一个方法来进行调用的,即window.person();

所以这个地方是window对象调用了person方法,那么person函数当中的this即指window,同时window还拥有了另外一个属性name,值为xl.

```
var name="xl";
 function person(){
     console.log(this.name);
  }
person(); //输出 xl

```
   
同样这个地方person作为window的方法来调用，在代码的一开始定义了一个全局变量name，值为xl,它相当于window的一个属性,即window.name="xl",又因为在调用person的时候this是指向window的，因此这里会输出xl.

## 作为对象方法来调用

如果函数作为对象的方法时，方法中的 this 指向该对象。

```
var obj = {
    x: 10,
    foo: function () {
        console.log(this);        //Object
        console.log(this.x);      //10
    }
};
obj.foo();

```

注意：若是在对象方法中定义函数，那么情况就不同了。

```
var obj = {
    x: 10,
    foo: function () {
        function f(){
            console.log(this);      //Window
            console.log(this.x);    //undefined
        }
        f();
    }
}
obj.foo();

```

可以这么理解：函数 f 虽然是在 obj.foo 内部定义的，但它仍然属于一个普通函数，this 仍指向 window。

在这里，如果想要调用上层作用域中的变量 obj.x，可以使用 self 缓存外部 this 变量。

在这里，如果想要调用上层作用域中的变量 obj.x，可以使用 self 缓存外部 this 变量。

```
var obj = {
    x: 10,
    foo: function () {
        var self = this;
        function f(){
            console.log(self);      //{x: 10}
            console.log(self.x);    //10
        }
        f();
    }
}
obj.foo();

```

如果 foo 函数不作为对象方法被调用：

```
var obj = {
    x: 10,
    foo: function () {
        console.log(this);       //Window
        console.log(this.x);     //undefined
    }
};
var fn = obj.foo;
fn();

```

obj.foo 被赋值给一个全局变量，并没有作为 obj 的一个属性被调用，那么此时 this 的值是 window。

另一种形式：

```
var personA={
    name:"xl",
    showName:function(){
        console.log(this.name);
    }
}
var personB={
    name:"XL",
    sayName:personA.showName
}
personB.sayName();  //输出 XL
//虽然showName方法是在personA这个对象中定义，但是调用的时候却是在personB这个对象中调用，因此this对象指向

```

## 作为构造函数来调用

所谓的构造函数就是由一个函数 new 出来的对象，一般构造函数的函数名首字母大写，例如像 Object，Function，Array 这些都属于构造函数。

```
function Foo(){
    this.x = 10;
    console.log(this);    //Foo {x:10}
}
var foo = new Foo();
console.log(foo.x);      //10

```

上述代码，如果函数作为构造函数使用，那么其中的 this 就代表它即将 new 出来的对象。

但是如果直接调用 Foo 函数，而不是 new Foo()，那就变成情况1，这时候 Foo() 就变成普通函数。

```
function Foo(){
    this.x = 10;
    console.log(this);    //Window
}
var foo = Foo();
console.log(foo.x);      //undefined
```

## 使用apply/call/bind方法来调用

```
var obj = {
    x: 10
}
function foo(){
    console.log(this);     //{x: 10}
    console.log(this.x);   //10
}
foo.call(obj);
foo.apply(obj);
foo.bind(obj)();
```
当一个函数被 call、apply 或者 bind 调用时，this 的值就取传入的对象的值。

## 构造函数 prototype 属性

```
function Foo(){
    this.x = 10;
}
Foo.prototype.getX = function () {
    console.log(this);        //Foo {x: 10, getX: function}
    console.log(this.x);      //10
}
var foo = new Foo();
foo.getX();
```
在 Foo.prototype.getX 函数中，this 指向的 foo 对象。不仅仅如此，即便是在整个原型链中，this 代表的也是当前对象的值。

## DOM event this

在一个 HTML DOM 事件处理程序里，this 始终指向这个处理程序所绑定的 HTML DOM 节点：

```
function Listener(){   
    document.getElementById('foo').addEventListener('click', this.handleClick);     //这里的 this 指向 Listener 这个对象。不是强调的是这里的 this
}
Listener.prototype.handleClick = function (event) {
    console.log(this);    //<div id="foo"></div>
}
var listener = new Listener();
document.getElementById('foo').click();
```
这个很好理解，就相当于是给函数传参，使 handleClick 运行时上下文改变了，相当于下面这样的代码：

```
var obj = {
    x: 10,
    fn: function() {
        console.log(this);         //Window
        console.log(this.x);       //undefined
    }
};
function foo(fn) {
    fn();
} 
foo(obj.fn);

```

你也可以用通过 bind 切换上下文:

```
function  Listener(){
    document.getElementById('foo').addEventListener('click',this.handleClick.bind(this));      
}
Listener.prototype.handleClick = function (event) {
    console.log(this);    //Listener {}
}
var listener = new Listener();
document.getElementById('foo').click();
```

总结一句话为： this 指向调用该方法的对象。

## es6箭头函数

es6里面this指向固定化，始终指向外部对象，因为箭头函数没有this,因此它自身不能进行new实例化,同时也不能使用call, apply, bind等方法来改变this的指向

``` 
function Timer() {
        this.seconds = 0;
        setInterval( () => this.seconds ++, 1000);
    } 
    var timer = new Timer();
    setTimeout( () => console.log(timer.seconds), 3100);
    // 3
    在构造函数内部的setInterval()内的回调函数，this始终指向实例化的对象，并获取实例化对象的seconds的属性,每1s这个属性的值都会增加1。否则最后在3s后执行setTimeOut()函数执行后输出的是0
```

参考资料：

[全面解析 Javascript - this](https://zhuanlan.zhihu.com/p/25294187)

[JS 中 this 关键字详解](https://segmentfault.com/a/1190000003046071?_ea=1200802)

[详解js和jquery里的this关键字](https://segmentfault.com/a/1190000000660679)