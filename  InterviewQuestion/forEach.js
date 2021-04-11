/**
 * forEach文档https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * @param {*} callback 
 * @param {*} thisArg 
 */

Array.prototype.forEach2 = function(callback,thisArg){
    if(this == null){
        throw new TypeError('this is null or not defined');
    }
    if(typeof callback !== 'function'){
        throw new TypeError(callback + 'is not a function');
    }
    const O = Object(this); // this 就是当前的数组
    const len = O.length >>> 0; 
    let k = 0;
    while(k<len){
        if(k in O){
            callback.call(thisArg,O[k],k,O);
        }
        k++;
    }
}

/**
 * O.length >>> 0 是什么操作？就是无符号右移 0 位，那有什么意义嘛？就是为了保证转换后的值为正整数。其实底层做了 2 层转换，第一是非 number 转成 number 类型，第二是将 number 转成 Uint32 类型。
 */