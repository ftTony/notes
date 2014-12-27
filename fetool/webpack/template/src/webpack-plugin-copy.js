const fs = require("fs-extra");
const globby = require("globby");
class CopyDirWebpackPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        const opt = this.options;
        compiler.plugin('done', (stats) => {
            if (process.env.NODE_ENV === 'production') {

            }
        })
    }
}