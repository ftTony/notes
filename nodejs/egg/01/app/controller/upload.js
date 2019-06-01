const Controller = require('egg').Controller;
const fs = require('mz/fs');

module.exports = class extends Controller {
    async upload () {
        const { ctx } = this;
        let result;
        for (const file of ctx.request.files) {
            try {
                result = await ctx.oss.put('egg-multipart-test/' + file.filename, file.filepath);
            } finally {
                // 需要删除临时文件
                await fs.unlink(file.filepath);
            }
        }
        ctx.body = {
            url: result.url,
            // 获取所有的字段值
            requestBody: ctx.request.body
        }
    }
}