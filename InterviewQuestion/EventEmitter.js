/**
 * 事件总线（发布订阅模式）
 * 死磕 36 个 JS 手写题（搞懂后，提升真的大）
 * https://juejin.cn/post/6946022649768181774
 */

class EventEmitter{
    constructor(){
        this.cache = {}
    }
    on(name,fn){
        if(this.cache[name]){
            this.cache[name].push(fn);
        }else{
            this.cache[name] = [fn];
        }
    }
    off(name,fn){
        let tasks = this.cache[name]
        if(tasks){
            const index = tasks.findIndex(f=>f===fn || f.callback === fn)
            if(index >=0){
                tasks.splice(index,1);
            }
        }
    }
    emit(name,once = false,...args){
        if(this.cache[name]){
            // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
            let tasks = this.cache[name].slice();
            for(let fn of tasks){
                fn(...args)
            }
            if(once){
                delete this.cache[name]
            }
        }
    }
}

class Events{
    constructor(){
        this.events = new Map();
    }

    addEvent(key,fn,isOnce,...args){
        const value = this.events.get(key) ? this.events.get(key):this.events.set(key,new Map().get(key));
        value.set(fn,(...args1)=>{
            fn(...args,...args1);
            isOnce && this.off(key,fn);
        });
    }

    on(key,fn,...args){
        if(!fn){
            console.error('没有传入回调函数！');
            return   
        }
        this.addEvent(key,fn,false,...args);
    }

    fire(key,...args){
        if(!this.events.get(key)){
            console.warn(`没有${key}事件`);
            return;
        }
        for(let [,cb] of this.events.get(key).entries()){
            cb(...args);
        }
    }

    off(key,fn){
        if(this.events.get(key)){
            this.events.get(key).delete(fn);
        }
    }

    once(key,fn,...args){
        this.addEvent(key,fn,true,...args);
    }
}