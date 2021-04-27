// https://segmentfault.com/a/1190000016389127
// https://mp.weixin.qq.com/s/yWOPoef9ixuSBWApZQhjIg

// es6
// function asyncPool(poolLimit,array,iteratorFn){
//     let i = 0;
//     const ret = [];
//     const executing = [];
//     const enqueue = function(){
//         // 边界处理，array为空数组
//         if(i===array.length){
//             return Promise.resolve();
//         }
//         // 每调一次enqueue，初始化一个promise
//         const item = array[i++];
//         const p = Promise.resolve().then(()=>iteratorFn(item,array));
//         // 放入promise数组
//         ret.push(p);
//         // promise执行完毕，从executing数组中删除
//         const e = p.then(() =>executing.splice(executing.indexOf(e),1));
//         // 插入executing数字，表示正在执行的promise
//         executing.push(e);
//         // 使用promise.rece，每当executing数组中promise数量低于poolLimit，就实例化新的promise并执行
//         let r = Promise.resolve();
//         if(executing.length >=poolLimit){
//             r = Promise.race(executing);
//         }
//         // 递归，直到遍历完array
//         return r.then(()=>enqueue());
//     };
//     return enqueue().then(()=>Promise.all(ret));
// }

// const timeout = i => new Promise(resolve=>setTimeout(resolve(i),i))
// asyncPool(2,[1000,5000,3000,2000],timeout).then(results=>{
//     console.log(results);
// })

// es7
async function asyncPool(poolLimit,array,iteratorFn){
    const ret = [];
    const executing = [];
    for(const item of array){
        // 调用iteratorFn函数创建异步任务
        const p = Promise.resolve().then(()=>iteratorFn(item,array));
        ret.push(p);    // 保存新的异步任务

        // 当poolLimit值小于或等于总任务个数时，进行并发控制
        if(poolLimit<=array.length){
            // 当任务完成后，从正在执行的任务数组中移除已完成的任务
            const e = p.then(()=>iteratorFn(item,array));
            ret.push(p);   // 保存新的异步任务

            // 当poolLimit值小于或等于总任务个数时，进行并发控制
            if(poolLimit <= array.length){
                // 当任务完成后，从正在执行的任务数组中移除已完成的任务
                const e = p.then(()=>executing.splice(executing.indexOf(e),1));
                executing.push(e);  // 保存正在执行的异步任务
                if(executing.length>=poolLimit){
                    await Promise.race(executing);  // 等待较快的任务执行完成
                }
            }
        }
        return Promise.all(ret);
    }
}