const fs = require('fs')
const walkFile = require('./walk-file')

/**
 * 
 */
function getSqlMap () {
    let basePath = __dirname
    basePath = basePath.replace(/\\/g, '\/')

    let pathArr = basePath.split('\/')
    pathArr = pathArr.splice(0, pathArr.length - 1)
    basePath = pathArr.join('/') + '/sql/'
    let fileList = walkFile(basePath, 'sql')
    return fileList
}

module.exports = getSqlMap