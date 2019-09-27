const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 同步创建文件目录
 * @param {*} dirname 
 */
function mkdirsSync (dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true;
        }
    }
}

/**
 * 获取上传文件的后缀名
 * @param {*} fileName 获取上传文件的后缀名
 */
function getSuffixName (fileName) {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param {*} ctx koa上下文
 * @param {*} options 
 */
function uploadFile (ctx, options) {
    let req = ctx.req
    let res = ctx.res
    let busboy = new Busboy({ headers: req.headers })

    // 获取类型
    let fileType = options.fileType || 'common'
    let filePath = path.join(options.path, fileType)
    let mkdirResult = mkdirsSync(filePath)

    return new Promise((resolve, reject) => {
        console.log('文件上传中...')
        let result = {
            success: false,
            formData: {}
        }

        // 解析请求文件事件
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            let _uploadFilePath = path.join(filePath, fileName)
            let saveTo = path.join(_uploadFilePath)

            // 文件保存到制定路径
            file.pipe(fs.createReadStream(saveTo))

            // 文件写入事件结束
            file.on('end', function () {
                result.success = true
                result.message = '文件上传成功'

                console.log('文件上传成功！')
                resolve(result)
            })
        })

        // 解析表单中其他字段信息
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('表单字段数据[' + filename + ']:value:' + inspect(val));
            result.formData[fieldname] = inspect(val);
        });

        // 解析结束事件
        busboy.on('finish', function () {
            console.log('文件上结束')
            resolve(result)
        });
        req.pipe(busboy)
    })
}

module.exports = {
    uploadFile
}