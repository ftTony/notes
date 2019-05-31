const Controller = require('egg').Controller

class UserController extends Controller {
    async fetch () {
        this.ctx.body = this.app.cache.get(this.ctx.query.id);
    }
}

module.exports = UserController