const Controller = require('egg').Controller;
const fs = require('mz/fs');

module.exports = class extends Controller {
    async upload () {
        const { ctx } = this;
        const file = ctx.request.files[0];
        const name = 'egg-multipart-test/' + path.basename(file.filename)
        let result;
        try {
            result = await ctx.oss.put(name, file.filepath);
        } finally {
            // 需要删除临时文件
            await fs.unlink(file.filepath);
        }

        ctx.body = {
            url: result.url,
            // 获取所有的字段值
            requestBody: ctx.request.body
        }
    }
}