// 类实现
class ConcurrentExecutor {
    private maxConcurrency: number;
    private running = 0;    // 当前正在执行的任务数
    private queue: Array<{
        task: () => Promise<any>
    }>

}

// interface TaskHandler {
//     (): Promise<void>;
// }

// interface TaskItem {
//     task: TaskHandler;
//     resolve: (value?: any) => void;
//     reject: (reason?: any) => void;
// }

// function timeout(time: number): Promise<void> {
//     return new Promise((resolve) => {
//         setTimeout(() => resolve(), time)
//     })
// }

// class SuperTask {
//     private tasks: TaskItem[] = [];
//     private paralleCount: number;
//     private runningCount: number;
//     constructor(paralleCount: number = 2) {
//         this.tasks;
//         this.runningCount = 0;
//         this.paralleCount = paralleCount;
//     }

//     add(task: TaskHandler): Promise<any> {
//         return new Promise((resolve, reject) => {
//             this.tasks.push({ task, resolve, reject });
//             this._run();
//         });
//     }
//     _run() {
//         while (this.runningCount < this.paralleCount && this.tasks.length > 0) {
//             const { task, reject, resolve } = this.tasks.shift()!;
//             this.runningCount++;
//             task().then(resolve, reject).finally(() => {
//                 this.runningCount--;
//                 this._run();
//             });
//         }
//     }
// }

// type TaskCallback = () => Promise<void>
// type Task = {
//     doing: boolean,
//     process: TaskCallback,
//     complete: (value: void | PromiseLike<void>) => void,
// }

// // 写法二
// class SuperTask {
//     private queue: Task[] = [];
//     private concurrecy: number;

//     constructor(concurrecy = 2) {
//         this.concurrecy = concurrecy;
//     }

//     add(taskCallback: TaskCallback) {
//         return new Promise((resolve) => {
//             const task = { doing: false, process: taskCallback, complete: resolve }
//             this.queue.push(task);
//             if (this.queue.length - 1 < this.concurrecy) {
//                 this.next(task);
//             }
//         });
//     }

//     private async next(task?: Task) {
//         if (task) {
//             task.doing = true;
//             task.process().finally(() => {
//                 this.remove(task);
//                 this.next(this.queue.find(task => !task.doing))
//             });
//         }
//     }
//     private async remove(task: Task) {
//         task?.complete();
//         const i = this.queue.indexOf(task);
//         if (i > -1) {
//             this.queue.splice(i, 1);
//         }
//     }
// }


// const superTask = new SuperTask();
// function addTask(time: number, name: any) {
//     superTask.add(() => timeout(time)).then(() => {
//         console.log(`任务${name}完成`);
//     })
// }

// addTask(10000, 1);   // 10000ms后输出：任务1完成
// addTask(5000, 2);    // 5000ms后输出：任务2完成
// addTask(3000, 3);    // 3000ms后输出：任务3完成
// addTask(4000, 4);    // 12000ms后输出：任务4完成
// addTask(5000, 5);    // 15000ms后输出：任务5完成