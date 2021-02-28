// https://segmentfault.com/a/1190000016389127
function asyncPool(poolLimit,array,iteratorFn){
    let i = 0;
    const ret = [];
    const executing = [];
    const enqueue = function(){
        // 边界处理，array为空数组
        if(i===array.length){
            return Promise.resolve();
        }
        // 每调一次enqueue，初始化一个promise
        const item = array[i++];
        const p = Promise.resolve().then(()=>iteratorFn(item,array));
        // 放入promise数组
    }
}