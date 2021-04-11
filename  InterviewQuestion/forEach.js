Array.prototype.forEach2 = function(callback,thisArg){
    if(this == null){
        throw new TypeError('this is null or not defined');
    }
    if(typeof callback !== 'function'){
        throw new TypeError(callback + 'is not a function');
    }
}