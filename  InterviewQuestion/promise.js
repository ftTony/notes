/**
 * 参考资料：https://github.com/xieranmaya/blog/issues/3
 *  */

try {
    module.exports = Promise
} catch (e) {}

function Promise(executor) {
    var self = this;
    self.status = 'pending' //Promise当前的状态
    self.data = undefined; //  Promise的值
    self.onResolvedCallback = []; //Promise resolve时的回调函数集，因为Promise结束之前有可能有多个回调添加到它上面
    self.onRejectedCallback = []; //Promise reject时回调函数数集，因为在Promise结束之前有可能有多个回调添加到它上面

    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(function () {
            if (self.status === 'pending') {
                self.status = 'resolved';
                self.data = value;
                for (var i = 0; i < self.onResolvedCallback.length; i++) {
                    self.onResolvedCallback[i](value);
                }
            }
        })

    }

    function reject(reason) {
        setTimeout(function () {
            if (self.status === 'pending') {
                self.status = 'rejected'
                self.data = reason;
                for (var i = 0; i < self.onRejectedCallback.length; i++) {
                    self.onRejectedCallback[i](reason);
                }
            }
        })

    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

function resolvePromise(promise2,x,resolve,reject){
    var then
    var thenCallOrThrow=false

    if(promise2 ===x){
        return reject(new TypeError('Chaining cycle detected for promise!'))
    }

    if(x instanceof Promise){
        if(x.status==='pending'){
            x.then(function(v){
                resolvePromise(promise2,v,resolve,reject)
            },reject)
        }else{
            x.then(resolve,reject)
        }
        return
    }

    if((x!==null) && ((typeof x==='object') || (typeof x==='function'))){
        try{
            then=x.then
            if(typeof then==='function'){
                then.call(x,function rs(y){
                    thenCallOrThrow=true
                    return resolvePromise(promise2,y,resolve,reject)
                },function rj(r){
                    if(thenCallOrThrow) return
                    thenCallOrThrow=true
                    return reject(r)
                })
            }
        }catch(e){
            if(thenCallOrThrow) return
            thenCallOrThrow=true
            return reject(e)
        }
    }else{
        resolve(x)
    }
}


Promise.prototype.then = function (onResolved, onRejected) {
    var self = this;
    var promise2

    onResolved = typeof onResolved === 'function' ? onResolved : function (v) {}
    onRejected = typeof onRejected === 'function' ? onResolved : function (r) {}

    if (self.status === 'resolved') {
        return promise2 = new Promise(function (resolve, reject) {
            try {
                var x = onResolved(self.data)
                resolvePromise(promise2,x,resolve,reject)
            } catch (e) {
                reject(e) //如果出错，以捕获到的错误做为promise2的结果
            }
        })
    }

    if (self.status === 'rejected') {
        return promise2 = new Promise(function (resolve, reject) {
            try {
                var x = onRejected(self.data)
               resolvePromise(promise2,x,resolve,reject)
            } catch (e) {
                reject(e)
            }
        })
    }

    if (self.status === 'pending') {
        // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolve还是onRejected,
        // 只等到Promise的状态确定后，才能确实如何处理
        // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
        // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
        return promise2 = new Promise(function (resolve, reject) {
            try {
                self.onResolvedCallback.push(function (value) {
                    try {
                        var x = onResolved(self.data);
                        resolvePromise(promise2,x,resolve,reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                self.onRejectedCallback.push(function (reason) {
                    try {
                        var x = onRejected(self.data)
                        resolvePromise(promise2,x,resolve,reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            } catch (e) {
                reject(e)
            }
        })
    }
}

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

Promise.deferred=Promise.defer=function(){
    var dfd={}
    dfd.promise=new Promise(function(resolve,reject){
        dfd.resolve=resolve
        dfd.reject=reject
    })
    return dfd
}