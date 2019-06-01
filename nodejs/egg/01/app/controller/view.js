const Controller = require('egg').Controller;

class ViewController extends Controller {
    async show () {
        this.ctx.body = {
            name: 'egg',
            category: 'framework',
            language: 'Node.js'
        }
    }

    async page () {
        this.ctx.body = '<html><h1>hello</h1></html>'
    }
}

module.exports = ViewController