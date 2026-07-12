/**
 * 场景：前端页面中需要同时发送20个请求，但服务端有限制，需要前端控制并发数，保证最多只能同时发送10个请求
 * 
 * 要求：
 * 1. 最多同时执行的任务数为10个
 * 2. 当前任务执行完成后，释放队列空间，自动执行下一个任务
 * 3. 所有任务添加到任务队列后，自动开始执行任务
 */
// function createTask(i) {
//     return () => {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve(i);
//             }, 2000)
//         });
//     }
// }

// class TaskQueue {
//     constructor() {
//         this.max = 10;
//         this.taskList = [];
//         setTimeout(()=>{
//             this.run();
//         });
//     }
//     addTask(task) {
//         this.taskList.push(task);
//     }
//     run() {
//         const length = this.taskList.length;
//         if(!length){
//             return;
//         }
//         const min = Math.min(length,this.max);
//         for(let i =0;i<min;i++){
//             this.max--;
//             const task = this.taskList.shift();
//             task().then(v=>console.log(v),r=>console.log(r)).finally(()=>{
//                 this.max++;
//                 this.run();
//             });
//         }
//     }
// }

// const taskQueue = new TaskQueue();
// for (let i = 0; i < 20; i++) {
//     const task = createTask(i);
//     taskQueue.addTask(task);
// }

class SuperTask{
    constructor(parallelCount=2){
        this.tasks = [];
        this.parallelCount = parallelCount;
        this.runningCount = 0;
    }
    add(task){
        return new Promise((resolve,reject)=>{
            this.tasks.push({task,resolve,reject});
            this._run();
        });
    }
    // 依次运行tasks队列的所有任务
    _run(){
        while(this.runningCount<this.parallelCount && this.tasks.length){
            const {task,resolve,reject} = this.tasks.shift();
            this.runningCount++;
            task().then(resolve,reject).finally(()=>{
                this.runningCount--;
                this._run();
            })
        }
    }
}

const timeout = (time)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },time);
    })
}

const superTask = new SuperTask();
function addTask(time,name){
    superTask.add(()=>timeout(time)).then(()=>{
        console.log(`任务${name}完成`);
    })
}

addTask(10000,1);   // 10000ms后输出：任务1完成
addTask(5000,2);    // 5000ms后输出：任务2完成
addTask(3000,3);    // 3000ms后输出：任务3完成
addTask(4000,4);    // 12000ms后输出：任务4完成
addTask(5000,5);    // 15000ms后输出：任务5完成
