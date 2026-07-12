// type Task<T> = ()=>Promise<T>;
// 方法一
// const pLimit = (maxConcurrecy:number)=>{
//     // 当前正在执行的任务数量
//     let running = 0;

//     // 等待队列：存放待执行任务resolve
//     const queue: Array<() => void> = [];

//     return function limit<T>(task:Task<T>): Promise<T>{
//         return new Promise((resolve)=>{
//             // 封装执行逻辑
//             const runTask = async()=>{
//                 running++;
//                 try{
//                     const res = await task();
//                     resolve(res);
//                 }finally{
//                     running--;
//                     // 队列有任务，取出一个执行
//                     if(queue.length>0){
//                         const next = queue.shift()!;
//                         next();
//                     }
//                 }
//             }

//             // 未达并发上限，直接执行；否则进队列等待
//             if(running<maxConcurrecy){
//                 runTask();
//             }else{
//                 queue.push(runTask);
//             }
//         });
//     }
// }

// ;(async () => {
//   // 最大并发2
//   const limit = pLimit(2);

//   // 每个任务内部携带参数，不要传给limit第二个参数
//   const input = [
//     limit(() => fetchFn(1000)),
//     limit(() => fetchFn(2000)),
//     limit(() => fetchFn(3000)),
//   ];

//   function fetchFn(n: number) {
//     return new Promise((r) => {
//       setTimeout(r, n, n / 1000);
//     });
//   }

//   console.time();
//   const result = await Promise.all(input);
//   console.log(result); // [1, 2, 3]
//   console.timeEnd(); // 约5000ms
// })();

// 面试题
// ; (async () => {

//     const limit = pLimit(2)

//     const input = [
//         limit(() => fetchFn(1000), 1),
//         limit(() => fetchFn(2000), 2),
//         limit(() => fetchFn(3000), 3),
//     ]

//     function fetchFn(n: number) {
//         return new Promise((r) => {
//             setTimeout(r, n, n / 1000)
//         })
//     }
//     console.time()
//     const result = await Promise.all(input)
//     console.log(result) // [1, 2, 3]
//     console.timeEnd() // 4000ms 左右
// })()

// 方法二
const pLimit = (concurrency: number) => {
    if (!Number.isInteger(concurrency) || concurrency < 1) {
        throw new TypeError('Expected `concurrency` to be a number from 1 and up');
    }

    let activeCount = 0;
    const queue: Array<{ fn: () => Promise<any>, resolve: (value: any) => void, reject: (reason?: any) => void }> = [];

    const next = () => {
        Promise.resolve().then(() => {
            if (activeCount < concurrency && queue.length > 0) {
                const entry = queue.shift()!;
                activeCount++;
                entry.fn().then((value) => {
                    entry.resolve(value);
                }, (reason) => {
                    entry.reject(reason);
                }).finally(() => {
                    activeCount--;
                    next();
                });
            }
        });
    }

    const limit = (fn: () => Promise<any>) => {
        return new Promise((resolve, reject) => {
            queue.push({ fn, resolve, reject });
            next();
        });
    }

    limit.activeCount = () => activeCount;
    limit.pendingCount = () => queue.length;
    limit.clearQueue = () => {
        queue.length = 0;
    }
    return limit;
}
function fetchFn(n: number) {
    return new Promise((r) => {
        setTimeout(r, n, n / 1000)
    })
}
const limit = pLimit(2); // 最大并发 2
const tasks = [1, 2, 3, 4, 5].map(i =>
    limit(() => fetchFn(1000 * i))
);

Promise.all(tasks).then(results => console.log(results));

