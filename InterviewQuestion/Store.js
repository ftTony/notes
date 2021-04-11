// 基于 Localstorage 设计一个 1M 的缓存系统，需要实现缓存淘汰机制
class Store {
    constructor() {
        let store = localStorage.getItem('cache')
        if (!store) {
            store = {
                maxSize: 1024 * 1024,
                size: 0
            }
            this.store = store
        } else {
            this.store = JSON.parse(store)
        }
    }
    set (key, value, expire) {
        this.store[key] = {
            date: Date.now(),
            expire,
            value
        }
        let size = this.sizeOf(JSON.stringify(this.store[key]))
        if (this.store.maxSize < size + this.store.size) {
            console.log('超了------------------');
            var keys = Object.keys(this.store);
            // 时间排序
            keys = keys.sort((a, b) => {
                let item1 = this.store[a], item2 = this.store[b];
                return item2.date - item1.date;
            })
            while (size + this.store.size > this.store.maxSize) {
                let index = keys[keys.length - 1]
                this.store.size -= this.size(JSON.stringify(this.store[index]))
                delete this.store[index]
            }
        }
        this.store.size += size

        localStorage.setItem('cache', JSON.stringify(this.store))
    }
    get (key) {
        let d = this.store[key]
        if (!d) {
            console.log('找不到该属性')
            return
        }

        if (d.expire > Date.now) {
            console.log('过期删除');
            delete this.store[key]
            localStorage.setItem('cache', JSON.stringify(this.store))
        } else {
            return d.value
        }
    }
    sizeOf (str, charset) {
        var total = 0,
            charCode,
            i,
            len;
        charset = charset ? charset.toLowerCase() : '';
        if (charset === 'utf-16' || charset === 'utf16') {
            for (i = 0, len = str.length; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode <= 0xffff) {
                    total += 2;
                } else {
                    total += 4;
                }
            }
        } else {
            for (i = 0, len = str.length; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode <= 0x007f) {
                    total += 1;
                } else if (charCode <= 0x07ff) {
                    total += 2;
                } else if (charCode <= 0xffff) {
                    total += 4;
                }
            }
        }
        return total;
    }
}