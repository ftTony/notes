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
    
}

module.exports = {
    uploadPicture
}