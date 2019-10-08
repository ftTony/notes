const http = require('http')
const Emitter = require('events')

class WebServer extends Emitter {
    constructor() {
        super();
        this.middleware = [];
        this.context = Object.create({});
    }

    /**
     * 
     * @param  {...any} args 
     */
    listen (...args) {
        const server = http.createServer(this.callback());
        return server.listen(...args);
    }

    /**
     * 注册使用中间件
     * @param {*} fn 
     */
    use (fn) {
        if (typeof fn === 'function') {
            this.middleware.push(fn)
        }
    }

    /**
     * 中间件总回调方法
     */
    callback () {
        let that = this;
    }

    /**
     * 异常处理监听
     * @param {*} err 
     */
    onerror (err) {
        console.log(err)
    }

    /**
     * 创建通用上下文
     * @param {*} req 
     * @param {*} res 
     */
    createContext (req, res) {
        let context = Object.create(this.context);
        context.req = req
        context.res = res;
        return context;
    }
}

module.exports = WebServer