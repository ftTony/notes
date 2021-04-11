/**
 * 
什么是偏函数？偏函数就是将一个 n 参的函数转换成固定 x 参的函数，剩余参数（n - x）将在下次调用全部传入。
 */

// 第一版
var _ = {};

function partial(fn){
    var args = [].slice.call(arguments,1);
    return function(){
        var position = 0,len = args.length;
        for(var i=0;i<len;i++){
            args[i] = args[i] === _?arguments[position++]:args[i];
        }
        while(position<arguments.length) args.push(arguments[position++]);
        return fn.apply(this,args);
    }
}

// 第二版
function partial(fn,...args){
    return (...arg) =>{
        return fn.call(this,...args,...arg);
    }
}