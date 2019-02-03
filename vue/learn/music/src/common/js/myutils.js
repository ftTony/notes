export const myDOM = {
    /**
     * 判断是否有该class
     * @param {*} el 
     * @param {*} className 
     */
    hasClass(el, className) {
        let reg = new RegExp('(^|\\s)' + className + '(\\s|S)')
        return reg.test(el.className)
    },
    /**
     * 添加class
     * @param {*} el 
     * @param {*} className 
     */
    addClass(el, className) {
        if (this.hasClass(el, className)) return
        let newClass = el.className.split(' ')
        newClass.push(className)
        el.className = newClass.join(' ')
    },
    /**
     * 获取/设置 自定义属性 data-${name}=val
     * 如果传入了val就设置自定义属性`data-${name}`的值为val
     * 如果没有传入了val就获取自定义属性`data-${name}`的值
     * 
     * @param {*} el 
     * @param {*} name 
     * @param {*} val 
     */
    customAttribute(el, name, val) {
        if (val) {
            return el.setAttribute(`data-${name}`, val);
        } else {
            return el.getAttribute(`data-${name}`)
        }
    },
    /**
     * 去抖(节流)
     * @param {*} fn 
     * @param {*} delay 
     */
    debounce(fn, delay) {
        let timer = null

        return function (...args) {
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
    }
};

export const myTime = {
    /**
     * 格式化时间戳（分：秒）
     * @param {*} timestamp 
     */
    format(timestamp) {
        timestamp = Math.floor(timestamp)

        let minute = (Math.floor(timestamp / 60)).toString().padStart(2, '0')
        let second = (timestamp % 60).toString().padStart(2, '0')
        return `${minute}:${second}`
    }
}

export const myNumber = {
    /**
     * 返回一个[min,max]之间的随机整数
     * @param {*} min 
     * @param {*} max 
     */
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

export const myArray = {
    /**
     * 克隆数组
     * @param {*} arr 
     */
    cloneArr(arr) {
        //从第一个字符就开始copy
        return arr.slice(0)
    },
    /**
     * 洗牌函数
     * @param {*} arr 
     * @param {*} flag 
     */
    shuffle(arr, flag = false) {
        let newArr = []
        flag ? (newArr = arr) : (newArr = this.cloneArr(arr))

        for (let i = 0; i < newArr.length; i++) {
            let j = myNumber.getRandom(0, i)
            let temp = newArr[i]
            newArr[i] = newArr[j]
            newArr[j] = temp
        }
        return newArr
    },
    /**
     * 随机获取数组成员
     * @param {*} arr 
     */
    randomMember(arr){
        return arr[Math.floor(Math.random()*arr.length)]
    }
}