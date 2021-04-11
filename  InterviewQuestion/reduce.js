Array.prototype.reduce2 = function(callback,initialValue){
    if(this===null){
        throw new TypeError('this is null or not defined');
    }
    if(typeof callback !== "function"){
        throw new TypeError(callback + ' is not a function');
    }
    const O = Object(this);
}