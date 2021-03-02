/**
 * 
什么是偏函数？偏函数就是将一个 n 参的函数转换成固定 x 参的函数，剩余参数（n - x）将在下次调用全部传入。
 */

// 第一版
var _ = {};

function partial(fn){
    var args = [].slice.call(arguments,1);
    
}

// 第二版
function partial(fn,...args){
    return (...arg) =>{
        return fn.call(this,...args,...arg);
    }
}