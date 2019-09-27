const fs = require('fs')

/**
 * 读取文件方法
 * @param {*} filePath 文件本地的绝对路径
 */
function file (filePath) {
    let content = fs.readFileSync(filePath, 'binary')
    return content
}

module.exports = file