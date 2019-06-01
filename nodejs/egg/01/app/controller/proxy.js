const Controller = require('egg').Controller;

class ProxyController extends Controller {
    async proxy () {
        const ctx = this.ctx
        const result = await ctx.curl(url, {
            streaming: true
        })
        ctx.set(result.header);
        ctx.body = result.res;
    }
}

module.exports = ProxyController