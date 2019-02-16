/**
 * 没有循环下
 * @param {*} obj 
 */

// function deepCopy(obj){
//     if(typeof obj !=='object') return obj;
//     if(typeof window !=='undefined' && window.JSON){
//         return JSON.parse(JSON.stringify(obj));
//     }else{
//         var newObj=obj instanceof Array ?[]:{};
//         for(var key in obj){
//             if (obj.hasOwnProperty(key)) {
//                 newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
//             }
//         }
//         return newObj;
//     }
// }
function isObject(obj) {
    return typeof obj === 'object' && obj != null;
}

function cloneDeep3(source, hash = new WeakMap) {
    if (!isObject(source)) return source;
    if (hash.has(source)) return hash.get(source);

    var target = Array.isArray(source) ? [] : {};
    hash.set(source, target);
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if(isObject(source[key])){
                target[key]=cloneDeep3(source[key],hash);
            }else{
                target[key]=source[key];
            }
        }
    }
    return target;
}