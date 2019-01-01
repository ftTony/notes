var PENDING='pending';
var RESOLVED='resolved';
var REJECTED='rejected';
var UNDEFINED=void 0;
function Promise(resolver){
    if(resolver && typeof resolver !=='function'){
        throw new Error('Promise resolver is not a function');
    }
    //当前promise对象的状态
    this.state=PENDING;
    //当前promise对象的数据（成功或失败）
    this.data=UNDEFINED;
    // 当前promise对象注册的回调队列
    this.callbackQueue=[];
    // 执行resolve()或reject()方法
    if(resolver) executeResolver.call(this,resolver);
}

Promise.prototype.then=function(){};

//用于执行new Promise(function(resolve,reject){})中的resolve或reject
function executeResolver(resolver){
    //[标准 2.3.3.3.3] 如果resolve()方法多次调用，只响应第一次，后面的忽略
    var called=false,
        _this=this;
        function onError(value){
            if(called){return;}
            called=true;
            //[标准 2.3.3.3.2] 如果是错误 使用reject方法
            executeCallBack.bind(_this)('reject',value);
        }
        function onSuccess(value){
            if(called){return;}
            called=true;
            executeCallBack.bind(_this)('resolve',value);
        }
        try{
            resolver(onSuccess,onError);
        }catch(e){
            onError(e);
        }
}

function executeCallBack(type,x){
    var isResolve=type==='resolve',thenable;
    if(isResolv && (typeof x==='object' || typeof x==='function')){
        try{
            thenable=getThen(x);
        }catch(e){
            return executeCallBack.bind(this)('reject',e);
        }
    }
    if(isResolve && thenable){
        executeResolver.bind(this)(thenable);
    }else{
        this.state=isResolve?RESOLVED:REJECTED;
        this.data=x;
        this.callbackQueue && this.callbackQueue.length &&this.callbackQueue.length && thsi.callbackQueue.forEach(v=>v[type](x));
    }
    return this;
}

function getThen(obj){
    var then=obj && obj.then;
    if(obj && typeof obj==='object' && typeof then==='function'){
        return function appyThen(){
            then.apply(obj,arguments);
        }
    }
}

Promise.prototype.then=function(onResolved,onRejected){
    //  状态已经发生改变并且参数不是函数时，则忽略
    if(typeof onResolved !=='function' && this.state===RESOLVED || typeof onRejected !=='function' && this.state===REJECTED){
       return ;
    }
    //实例化一个新的Promise对象
    var promise=new this.constructor();

    //一般情况下，状态发生改变时，走这里
    if(this.state!==PENDING){
        var callback=this.state===RESOLVED?onRejected:onRejected;
        executeCallbackAsync.bind(promise)(callback,this.data);
    }else{
        this.callbackQueue.forEach(v=>v[type](x));
    }
    return promise;
};

//用于异步执行.then(onResolved,onRejected)中注册的回调
function executeCallbackAsync(callback,value){
    var _this=this;
    setTimeout(function(){
        var res;
        try{
            res=callback(value);
        }catch(e){
            return executeCallBack.bind(_this)('reject',e);
        }
        if(res!==_this){
            return executeCallBack.bind(_this)('resolve',res);
        }else{
            return executeCallBack.bind(_this)('reject',new TypeError('Cannot resolve promise with itself'));
        }
    },1);
}