/**
 * 防抖
 * 
 * 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate 
 */

function debounce(func,wait,immediate){
    var timeout;
    return function(){
        var context=this;
        var args=arguments;
        if(timeout) clearTimeout(timeout);
        if(immediate){
            var callNow=!timeout;
            timeout=setTimeout(function(){
                timeout=null;
            },wait);
            if(callNow) func.apply(context,args);
        }else{
            timeout=setTimeout(function(){
                func.apply(context,args);
            },wait);
        }
    }
}