const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')
const UtilType = require('./type')
const UtilDatetime = require('./datetime')

function mkdirsSync (dirname) {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

function getSuffixName (fileName) {
    let nameList = fileName.split('.')
    return nameList[nameList - 1]
}

function uploadPicture (ctx, options) {
    let req = ctx.req
    let res = ctx.res
    let busboy = new Busboy({ headers: req.headers })

    let pictureType = 'common'

    if (UtilType.isJSON(options) && UtilType.isString(options.pictureType)) {
        pictureType = options.pictureType
    }

    let picturePath = path.join(__dirname, '/../../static/output/upload/', pictureType, UtilDatetime.parseStampToFormat(null, 'YYYY/MM/DD'))

    console.log(path.sep, picturePath)
    let mkdirResult = mkdirsSync(picturePath)

    return new Promise((resolve, reject) => {
        let result = {
            success: false,
            code: '',
            message: '',
            data: null
        }

        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            console.log('File-file [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)

            let pictureName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            let _uploadFilePath = path.join(picturePath, pictureName)

            console.log(_uploadFilePath)

            let saveTo = path.join(_uploadFilePath)
            file.pipe(fs.createWriteStream(saveTo))

            file.on('end', function () {
                console.log('File-end [' + fieldname + '] Finished')
                result.success = true
                resolve(result)
            })
        })

        busboy.on('error', function (err) {
            console.log('File-error')
            reject(result)
        })

        req.pipe(busboy)
    })
}

module.exports = {
    uploadPicture
}