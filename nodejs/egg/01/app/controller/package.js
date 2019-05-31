const Controller = require('egg').Controller
class PackageController extends Controller {
    async detail () {
        this.ctx.body = `package:${ctx.params[0]}`
    };
}

module.exports = PackageController