/**
 * 第一版
 */

// function sub_curry(fn) {
//     var args = [].slice.call(arguments, 1);
//     return function () {
//         return fn.apply(this, args.concat([].slice.call(arguments)));
//     }
// }

// function curry(fn, length) {
//     length = length || fn.length
//     var slice = Array.prototype.slice;
//     return function () {
//         if (arguments.length < length) {
//             var combined = [fn].concat(slice.call(arguments));
//             return curry(sub_curry.apply(this, combined), length - arguments.length);
//         } else {
//             return fn.apply(this, arguments);
//         }
//     }
// }

// 第二版

// function curry(fn, args) {
//     var length = fn.length;
//     args = args || [];
    
//     return function(){
//         var _args=args.slice(0),
//                _args=_args.concat([].slice.call(arguments));
//             if(_args.length<length){
//                 return curry.call(this,fn,_args);
//             }else{
//                 return fn.apply(this,_args);
//             }
//     }
// }

// var fn=curry(function(a,b,c){
//     console.log([a,b,c]);
// });

// fn("a", "b", "c") // ["a", "b", "c"]
// fn("a", "b")("c") // ["a", "b", "c"]
// fn("a")("b")("c") // ["a", "b", "c"]
// fn("a")("b", "c") // ["a", "b", "c"]

//es6 写法

var curry=fn=>judge=(...args)=>args.length===fn.length?fn(...args):(arg)=>judge(...args,arg)