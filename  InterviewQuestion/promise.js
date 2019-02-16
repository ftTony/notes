/**
 * 参考资料：https://github.com/xieranmaya/blog/issues/3
 *  */

function Promise(executor){
    var self=this;
    self.status='pending'   //Promise当前的状态
    self.data=undefined;    //  Promise的值
    self.onResolvedCallback=[]; //Promise resolve时的回调函数集，因为Promise结束之前有可能有多个回调添加到它上面
    self.onRejectedCallback=[]; //Promise reject时回调函数数集，因为在Promise结束之前有可能有多个回调添加到它上面

    function resolve(value){

    }

    function reject(reason){

    }

    try{    
        executor(resolve,reject);
    }catch(e){
        reject(e);
    }
}