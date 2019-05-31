const Controller = require('egg').Controller

class UserController extends Controller {
    async fetch () {
        this.ctx.body = this.app.cache.get(this.ctx.query.id);
    }

    async info () {
        const { ctx } = this
        ctx.body = {
            name: `{ctx.params.id}`
        }
    }
}

module.exports = UserController