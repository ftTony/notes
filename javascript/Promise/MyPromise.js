class MyPromise {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";
    constructor(exector) {
        this.status = MyPromise.PENDING;
        this.value;
        this.reason;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (v) => {
            if (this.status === MyPromise.PENDING) {
                this.value = v;
                this.status = MyPromise.FULFILLED;
                this.onFulfilledCallbacks.forEach(fn => fn());
            }
        }

        const reject = (r) => {
            if (this.status === MyPromise.PENDING) {
                this.reason = r;
                this.status = MyPromise.PENDING;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        exector(resolve, reject);
    }

    then(onF, onR) {
        const onFulfilled = typeof onF === "function" ? onF : (v) => v;
        const onRejected = typeof onR === "function" ? onR : err => {
            throw err
        }

        const p2 = new MyPromise((resolve, reject) => {
            const success = () => {
                queueMicrotask(() => {
                    const result = onFulfilled(this.value);
                    resolvePromise(p2, result, resolve, reject);
                });
            }
            const fail = () => {
                queueMicrotask(() => {
                    const result = onRejected(this.reason);
                    resolvePromise(p2, result, resolve, reject);
                });
            }
            if (this.status === MyPromise.FULFILLED) {
                success();
            } else if (this.status === MyPromise.REJECTED) {
                fail();
            } else {
                this.onFulfilledCallbacks.push(success);
                this.onRejectedCallbacks.push(fail);
            }
        });

        return p2;
    }
    catch (onR) {
        return this.then(null, onR);
    }

    // 无论成功失败都执行，不改变返回值
    finally(callback) {
        return this.then(val => MyPromise.resolve(callback()).then(() => val), err => MyPromise.reject(callback()).then(() => {
            throw err
        }))
    }

    static race(promiseArr) {
        return new MyPromise((resolve, reject) => {
            promiseArr.forEach(p => {
                MyPromise.resolve(p).then(resolve).catch(reject);
            })
        })
    }

    // 静态resolve
    static resolve(value) {
        // 如果是MyPromise实例直接返回
        if (value instanceof MyPromise) return value;
        return new MyPromise(resolve => resolve(value));
    }

    // 静态reject
    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }

    static all(promiseArr) {
        return new MyPromise((resolve, reject) => {
            let count = 0;
            const resArr = [];
            const len = promiseArr.length;
            if (len === 0) resolve([]);
            promiseArr.forEach((p, index) => {
                MyPromise.resolve(p).then(val => {
                    resArr[index] = val;
                    count++;
                    if (count === len) resolve(resArr)
                })
            });
        })
    }
}

/**
 * 
 */
function resolvePromise(newPromise, x, resolve, reject) {
    // 禁止循环引用：自己return自己
    if (newPromise === x) {
        return reject(new TypeError("Chaining cycle detected for promise"));
    }
    if (x === null || typeof x !== "object" && typeof x !== "function") {
        return resolve(x);
    }

    let called = false; // 防止多次调用resolve/reject
    const then = x.then;
    if (typeof then === "function") {
        then.call(x, y => {
            if (called) return;
            called = true;
            resolvePromise(newPromise, y, resolve, reject);
        }, r => {
            if (called) return;
            called = true;
            reject(r);
        });
    } else {
        resolve(x);
    }
}