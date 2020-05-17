module.exports = function (content) {
    return content.replace(new RegExp(/([\$_\w\.]+\?\.)/, g), function (res) {
        let str = res.replace(/\?\./, '')
        let arrs = str.split('.')
    })
}