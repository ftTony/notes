const Subscription = require('egg').Subscription;
class UpdateCache extends Subscription {

    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule () {
        return {
            interval: '1m',
            type: 'all'
        }
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe () {
        const res = await this.ctx.curl('http://www.api.com/cache', {
            dataType: 'json'
        });
        this.ctx.app.cache = res.data;
    }
}
module.exports = UpdateCache;