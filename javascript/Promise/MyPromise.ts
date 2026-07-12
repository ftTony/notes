import { resolve } from "path";

enum PromiseStatus {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected",
}

// then 回调类型
type OnFulfilled<T, R> = ((value: T) => R | PromiseLike<R>) | null | undefined;
type OnRejected<R> = ((reason: unknown) => R | PromiseLike<R>) | null | undefined;

interface CallbackQueueItem<T, R> {
    onFulfilled: OnFulfilled<T, R>;
    onRejected: OnRejected<R>;
    resolve: (value: R | PromiseLike<R>) => void;
    reject: (reason?: unknown) => void;
}

class MyPromise<T> {
    private status: PromiseStatus = PromiseStatus.PENDING;
    // 成功值, 失败原因
    private value?: T | PromiseLike<T>;
    private reason?: unknown;
    // 回调队列，支持多次then
    private callbackQueue: CallbackQueueItem<any, any>[] = [];

    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: unknown) => void) => void) {
        const resolve = (value: T | PromiseLike<T>) => {
            resolvePromise(this, value, this._resolve, this._reject);
        };
        const reject = (reason?: unknown) => {
            this._reject(reason);
        };
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }

    }

    // 内部真正修改成功状态
    private _resolve = (value: T | PromiseLike<T>) => {
        if (this.status !== PromiseStatus.PENDING) return;
        this.status = PromiseStatus.FULFILLED;
        this.value = value;
        this.flustQueue();
    }

    // 内部真正修改失败状态
    private _reject = (reason?: unknown) => {
        if (this.status !== PromiseStatus.PENDING) return;
        this.status = PromiseStatus.REJECTED;
        this.reason = reason;
        this.flustQueue();
    }

    // 批量执行队列中所有回调
    private flustQueue() {
        while (this.callbackQueue.length) {
            const item = this.callbackQueue.shift()!;
            queueMicrotask(() => {
                const { onFulfilled, onRejected, resolve, reject } = item;
                if (this.status === PromiseStatus.FULFILLED) {
                    if (typeof onFulfilled === 'function') {
                        try {
                            const result = onFulfilled(this.value!);
                            resolve(result);
                        } catch (err) {
                            reject(err);
                        }
                    } else {
                        resolve(this.value!);
                    }
                } else {
                    if (typeof onRejected === 'function') {
                        try {
                            const result = onRejected(this.reason);
                            resolve(result);
                        } catch (err) {
                            reject(err);
                        }
                    } else {
                        reject(this.reason);
                    }
                }

            });
        }
    }

    then<R>(onFulfilled?: OnFulfilled<T, R>, onRejected?: OnRejected<R>): MyPromise<R> {
        return new MyPromise<R>((resolve, reject) => {
            this.callbackQueue.push({ onFulfilled, onRejected, resolve, reject });
        });
    }
    // catch 语法糖
    catch<R>(onRejected: (reason: unknown) => R | PromiseLike<R>): MyPromise<R> {
        return this.then(null, onRejected);
    }

    // finally 无论成功失败都执行，不改变返回值
    finally(onFinally: () => void): MyPromise<T> {
        return this.then(
            (value) => MyPromise.resolve(onFinally()).then(() => value) as PromiseLike<T> | T,
            (reason) => MyPromise.resolve(onFinally()).then(() => { throw reason }) as PromiseLike<T> | T
        );
    }


    static resolve<T>(value: T | PromiseLike<T>): MyPromise<T> {
        return new MyPromise((resolve) => resolve(value));
    }

    static reject<T>(reason?: unknown): MyPromise<T> {
        return new MyPromise((_, reject) => reject(reason));
    }

    /**
     * Promise.all 方法接收一个可迭代对象（通常是一个数组）作为输入，并返回一个新的 Promise 实例。该新的 Promise 实例在所有输入的 Promise 实例都成功时才会被解决，并且其解决值是一个包含所有输入 Promise 实例解决值的数组。如果任何一个输入的 Promise 实例被拒绝，则新的 Promise 实例会立即被拒绝，并返回第一个被拒绝的 Promise 实例的拒绝原因。
     * @param promises 一个可迭代对象，通常是一个数组，包含多个 Promise 实例或普通值。
     * @returns 一个新的 Promise 实例，该实例在所有输入的 Promise 实例都成功时被解决，或者在任何一个输入的 Promise 实例被拒绝时立即被拒绝。
     * @example
     * const promise1 = Promise.resolve(3);
     * const promise2 = 42;
     * const promise3 = new Promise((resolve, reject) => {
     *   setTimeout(resolve, 100, 'foo');
     * });
     *
     * Promise.all([promise1, promise2, promise3]).then((values) => {
     *   console.log(values); // [3, 42, "foo"]
     * });
     * @example
     * const promise1 = Promise.resolve(3);
     * const promise2 = new Promise((resolve, reject) => {
     *   setTimeout(reject, 100, 'bar');
     * });
     */
    static all<T>(promises: Array<T | PromiseLike<T>>): MyPromise<T[]> {
        return new MyPromise((resolve, reject) => {
            const results: T[] = [];
            let count = 0;
            const len = promises.length;
            if (len === 0) {
                return resolve([]);
            }
            promises.forEach((p, index) => {
                MyPromise.resolve(p).then((value) => {
                    results[index] = value;
                    count++;
                    if (count === len) {
                        resolve(results);
                    }
                }).catch(reject);
            });
        })
    }
    /**
     * Promise.race 方法接收一个可迭代对象（通常是一个数组）作为输入，并返回一个新的 Promise 实例。该新的 Promise 实例会在任何一个输入的 Promise 实例被解决或拒绝时立即被解决或拒绝。
     * @param promises 一个可迭代对象，通常是一个数组，包含多个 Promise 实例或普通值。
     * @returns 一个新的 Promise 实例，该实例会在任何一个输入的 Promise 实例被解决或拒绝时立即被解决或拒绝。
     */
    static race<T>(promises: Array<T | PromiseLike<T>>): MyPromise<T[]> {
        return new MyPromise((resolve, reject) => {
            promises.forEach((p) => {
                MyPromise.resolve(p).then(resolve as (value: T | PromiseLike<T>) => void).catch(reject);
            });
        });
    }

    /**
     * Promise.allSettled 方法接收一个可迭代对象（通常是一个数组）作为输入，并返回一个新的 Promise 实例。该新的 Promise 实例会在所有输入的 Promise 实例都被解决或拒绝时被解决，其解决值是一个包含所有输入 Promise 实例状态信息的数组。
     * @param promises 一个可迭代对象，通常是一个数组，包含多个 Promise 实例或普通值。
     * @returns 一个新的 Promise 实例，该实例会在所有输入的 Promise 实例都被解决或拒绝时被解决，其解决值是一个包含所有输入 Promise 实例状态信息的数组。
     * @example
     * const promise1 = Promise.resolve(3);
     * const promise2 = new Promise((resolve, reject) => {
     *   setTimeout(reject, 100, 'bar');
     * });
     *
     * Promise.allSettled([promise1, promise2]).then((results) => {
     *   console.log(results);
     *   // [
     *   //   { status: 'fulfilled', value: 3 },
     *   //   { status: 'rejected', reason: 'bar' }
     *   // ]
     * });  
     */
    static allSettled<T>(promises: Array<T | PromiseLike<T>>): MyPromise<Array<PromiseSettledResult<T>>> {
        return new MyPromise((resolve) => {
            const res: Array<PromiseSettledResult<T>> = [];
            let count = 0;
            const len = promises.length;
            if (len === 0) return resolve([]);
            promises.forEach((p, idx) => {
                MyPromise.resolve(p).then((value) => {
                    res[idx] = { status: "fulfilled", value };
                }).catch((reason) => {
                    res[idx] = { status: "rejected", reason };
                }).finally(() => {
                    count++;
                    if (count === len) {
                        resolve(res);
                    }
                });
            });

        })
    }

    /**
     * any第一个成功就返回成功，全部失败才返回失败
     * @param promises 
     * @returns
     */
    static any<T>(promises: Array<T | PromiseLike<T>>): MyPromise<T> {
        return new MyPromise((resolve, reject) => {
            const errors: unknown[] = [];
            let count = 0;
            const len = promises.length;
            if (len === 0) {
                return reject(new AggregateError([], "All promises were rejected"));
            }

            promises.forEach((p, idx) => {
                MyPromise.resolve(p).then(resolve).catch((err) => {
                    errors.push(err);
                    count++;
                    if (count === len) reject(new AggregateError([], "All promises were rejected"));
                })
            });
        })
    }
}

/**
 * Promise/A+ 核心规范函数 resolvePromise
 * @param  promise 当前then返回的新Promise
 * @param x then回调返回值
 * @param resolve 新promise resolve
 * @param reject 新promise reject
 */
function resolvePromise<T>(promise: MyPromise<T>, x: unknown, resolve: (val: T | PromiseLike<T>) => void, reject: (reason?: unknown) => void) {
    if (promise === x) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let called = false;
        try {
            const then = (x as PromiseLike<T>).then;
            if (typeof then === 'function') {
                then.call(x, (y: unknown) => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise, y, resolve, reject);
                }, (r: unknown) => {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                resolve(x as T);
            }
        } catch (err) {
            resolve(x as T);
        }
    } else {
        resolve(x as T)
    }
}